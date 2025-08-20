import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/db";

export async function GET(req: NextRequest) {
  const page = Math.max(
    1,
    parseInt(req.nextUrl.searchParams.get("page") || "1")
  );
  const limit = Math.min(
    100,
    parseInt(req.nextUrl.searchParams.get("limit") || "10")
  );
  const skip = (page - 1) * limit;

  const [users, count] = await Promise.all([
    db.collection("user").find({}).skip(skip).limit(limit).toArray(),
    db.collection("user").countDocuments(),
  ]);

  return NextResponse.json({
    data: users,
    meta: {
      page,
      limit,
      pages: Math.ceil(count / limit),
      count,
    },
  });
}
