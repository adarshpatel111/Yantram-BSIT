import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/db";

export async function GET(req: NextRequest) {
  const page = Math.max(parseInt(req.nextUrl.searchParams.get("page") || "1"));
  const limit = Math.max(
    parseInt(req.nextUrl.searchParams.get("limit") || "10")
  );
  const skip = (page - 1) * limit;
  const [purchases, count] = await Promise.all([
    db.collection("purchases").find({}).skip(skip).limit(limit).toArray(),
    db.collection("purchase").countDocuments(),
  ]);
  return NextResponse.json({
    data: purchases,
    meta: {
      page,
      limit,
      pages: Math.ceil(count / limit),
      count,
    },
  });
}
