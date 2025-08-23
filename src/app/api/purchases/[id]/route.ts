import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/db";
import { ObjectId } from "mongodb";
import { withRoleCheck } from "@/lib/withRoleCheck";
import { auth } from "@/lib/auth";

// Helper to extract ID from URL
function getIdFromReq(req: NextRequest): string | null {
  const { pathname } = new URL(req.url);
  const id = pathname.split("/").pop();
  return id || null;
}

// GET /api/purchases/:id
// GET /api/purchases/:id
async function getPurchase(req: NextRequest, user: any) {
  const id = getIdFromReq(req);
  if (!id)
    return NextResponse.json({ error: "Missing purchase ID" }, { status: 400 });

  const role = user?.user?.role;
  const branch = user?.user?.branch;
  const userId = user?.user?.id;

  const pipeline: any[] = [
    { $match: { _id: new ObjectId(id) } },
    {
      $lookup: {
        from: "user",
        localField: "userId",
        foreignField: "_id",
        as: "userDetails",
      },
    },
    { $unwind: "$userDetails" },
    {
      $addFields: {
        userDetails: {
          _id: "$userDetails._id",
          name: "$userDetails.name",
          email: "$userDetails.email",
          phone: "$userDetails.phone",
          branch: "$userDetails.branch",
        },
      },
    },
  ];

  // Role-based access
  if (role === "manager" && branch) {
    pipeline.unshift({ $match: { branch: new RegExp(`^${branch}$`, "i") } });
  } else if (role === "user" && userId) {
    pipeline.unshift({ $match: { userId: new ObjectId(userId) } });
  }

  try {
    const purchase = await db
      .collection("purchases")
      .aggregate(pipeline)
      .next();

    if (!purchase) {
      return NextResponse.json(
        { error: "Purchase not found or access denied" },
        { status: 404 }
      );
    }

    return NextResponse.json(purchase);
  } catch (error) {
    console.error("Error fetching purchase:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// PATCH /api/purchases/:id
async function updatePurchase(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const id = getIdFromReq(req);
  if (!id)
    return NextResponse.json({ error: "Missing purchase ID" }, { status: 400 });

  let body: Record<string, any>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  body.updatedAt = new Date();

  const { role, branch: sessionBranch, id: userId } = session.user || {};
  const query: Record<string, any> = { _id: new ObjectId(id) };

  if (role === "manager" && sessionBranch) query.branch = sessionBranch;
  else if (role === "user") query.userId = new ObjectId(userId);

  const result = await db
    .collection("purchases")
    .updateOne(query, { $set: body });

  if (result.matchedCount === 0) {
    return NextResponse.json(
      { error: "Purchase not found or access denied" },
      { status: 404 }
    );
  }

  return NextResponse.json({ message: "Purchase updated successfully" });
}

// DELETE /api/purchases/:id
async function deletePurchase(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const id = getIdFromReq(req);
  if (!id)
    return NextResponse.json({ error: "Missing purchase ID" }, { status: 400 });

  const { role, branch: sessionBranch, id: userId } = session.user || {};
  const query: Record<string, any> = { _id: new ObjectId(id) };

  if (role === "manager" && sessionBranch) query.branch = sessionBranch;
  else if (role === "user") query.userId = new ObjectId(userId);

  const result = await db.collection("purchases").deleteOne(query);

  if (result.deletedCount === 0) {
    return NextResponse.json(
      { error: "Purchase not found or access denied" },
      { status: 404 }
    );
  }

  return NextResponse.json({ message: "Purchase deleted successfully" });
}

// Export secured handlers
export const GET = withRoleCheck(["admin", "manager", "user"])(getPurchase);
export const PATCH = withRoleCheck(["admin", "manager", "user"])(
  updatePurchase
);
export const DELETE = withRoleCheck(["admin", "manager", "user"])(
  deletePurchase
);
