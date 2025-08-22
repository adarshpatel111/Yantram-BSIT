import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/db";
import { ObjectId } from "mongodb";
import { withRoleCheck } from "@/lib/withRoleCheck";
import { auth } from "@/lib/auth";

async function getPurchases(request: NextRequest, user: any) {
  console.log("Incoming user:", user);

  const page = Math.max(
    parseInt(request.nextUrl.searchParams.get("page") || "1"),
    1
  );
  const limit = Math.max(
    parseInt(request.nextUrl.searchParams.get("limit") || "10"),
    1
  );
  const skip = (page - 1) * limit;

  const role = user?.user?.role;
  const branch = user?.user?.branch;
  const userId = user?.user?.id;

  const pipeline: any[] = [
    { $skip: skip },
    { $limit: limit },
    {
      $lookup: {
        from: "user",
        localField: "userId",
        foreignField: "_id",
        as: "userDetails",
      },
    },
    { $unwind: "$userDetails" },
  ];

  if (role === "manager") {
    pipeline.unshift({
      $match: { branch: new RegExp(`^${branch}$`, "i") },
    });
  } else if (role === "user") {
    pipeline.unshift({
      $match: { userId: new ObjectId(userId) },
    });
  }

  pipeline.push({
    $addFields: {
      userDetails: {
        _id: "$userDetails._id",
        name: "$userDetails.name",
        email: "$userDetails.email",
        phone: "$userDetails.phone",
        branch: "$userDetails.branch",
      },
    },
  });

  console.log("Pipeline:", JSON.stringify(pipeline, null, 2));

  try {
    const purchases = await db
      .collection("purchases")
      .aggregate(pipeline)
      .toArray();

    let countPipeline: any[] = [
      {
        $lookup: {
          from: "user",
          localField: "userId",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      { $unwind: "$userDetails" },
    ];

    if (role === "manager") {
      countPipeline.unshift({
        $match: { branch: new RegExp(`^${branch}$`, "i") },
      });
    } else if (role === "user") {
      countPipeline.unshift({
        $match: { userId: new ObjectId(userId) },
      });
    }

    const totalDocs = await db
      .collection("purchases")
      .aggregate([...countPipeline, { $count: "total" }])
      .toArray();
    const total = totalDocs[0]?.total || 0;

    return NextResponse.json({
      data: purchases,
      meta: {
        page,
        limit,
        pages: Math.ceil(total / limit),
        count: total,
      },
    });
  } catch (error) {
    console.error("Error fetching purchases:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

async function createPurchases(request: NextRequest) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await request.json();

    if (body.productId === "solar-panel") {
      if (
        !body.fullName ||
        !body.consumerNumber ||
        !body.discom ||
        !body.kw ||
        !body.contactNumber ||
        !body.email
      ) {
        return NextResponse.json(
          { error: "Missing required solar panel fields" },
          { status: 400 }
        );
      }

      const solarPurchase = {
        userId: new ObjectId(session.user.id),
        productId: body.productId,
        fullName: body.fullName,
        consumerNumber: body.consumerNumber,
        discom: body.discom,
        kw: body.kw,
        latitude: body.latitude ?? null,
        longitude: body.longitude ?? null,
        contactNumber: body.contactNumber,
        email: body.email,
        aadharNumber: body.aadharNumber ?? null,
        variant: body.variant ?? null,
        files: body.files ?? {},
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const result = await db.collection("purchases").insertOne(solarPurchase);
      return NextResponse.json(
        { ...solarPurchase, _id: result.insertedId },
        { status: 201 }
      );
    }

    if (!body.branch || !body.productId) {
      return NextResponse.json(
        { error: "Branch and productId are required" },
        { status: 400 }
      );
    }

    const newPurchase = {
      userId: new ObjectId(session.user.id),
      branch: body.branch,
      productId: body.productId,
      name: body.name,
      model: body.model,
      selectedVariant: body.selectedVariant ?? null,
      paid: 0, // 0 = not paid ,1 = paid (admin can change later)
      quantity: body.quantity || 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection("purchases").insertOne(newPurchase);

    return NextResponse.json(
      { ...newPurchase, _id: result.insertedId },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export const GET = withRoleCheck(["user", "admin", "manager"])(getPurchases);
export const POST = withRoleCheck(["user", "admin", "manager"])(
  createPurchases
);
