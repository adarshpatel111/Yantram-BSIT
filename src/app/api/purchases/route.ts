import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { db } from "@/db/db";

export async function GET(request: NextRequest) {
  const session = await auth.api.getSession({ headers: request.headers });

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const purchases = db
    .collection("purchases")
    .find({ userId: new ObjectId(session.user.id) });

  return NextResponse.json(await purchases.toArray());
}

export async function POST(request: NextRequest) {
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
      paid: 0, //0 means not paid ,1 means paid change it later for admin
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
