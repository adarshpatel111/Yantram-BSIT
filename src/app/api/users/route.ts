import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/db";
import { auth } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const session = await auth.api.getSession({
    headers: req.headers,
  });

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

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
