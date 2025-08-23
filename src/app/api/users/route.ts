import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/db";
import { auth } from "@/lib/auth";
import { withRoleCheck } from "@/lib/withRoleCheck";
import { ObjectId } from "mongodb";

// GET /api/users?page=1&limit=10
async function GetUsers(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { role } = session.user ?? {};
  const branch = session.user?.branch;

  const page = Math.max(
    1,
    parseInt(req.nextUrl.searchParams.get("page") || "1")
  );
  const limit = Math.min(
    100,
    parseInt(req.nextUrl.searchParams.get("limit") || "10")
  );
  const skip = (page - 1) * limit;

  let query: Record<string, any> = {};

  if (role === "manager" && branch) {
    query.branch = branch;
    query.role = { $ne: "manager" };
  }

  const [users, count] = await Promise.all([
    db
      .collection("user")
      .find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray(),
    db.collection("user").countDocuments(query),
  ]);

  return NextResponse.json({
    data: users,
    meta: { page, limit, pages: Math.ceil(count / limit), count },
  });
}

// POST /api/users
async function CreateUser(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { role } = session.user ?? {};
  const sessionBranch = session.user?.branch;

  const body = await req.json();
  const { fullName, email, phone, role: newRole, branch, password } = body;

  if (!fullName || !email || !phone || !newRole || !password || !branch) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  // Managers can only create users in their branch
  if (role === "manager" && sessionBranch !== branch) {
    return NextResponse.json(
      { error: "Managers can only create users in their own branch" },
      { status: 403 }
    );
  }

  const existingUser = await db.collection("user").findOne({ email });
  if (existingUser)
    return NextResponse.json({ error: "User already exists" }, { status: 409 });

  const newUser = {
    fullName,
    email,
    phone,
    role: newRole,
    branch,
    password,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const result = await db.collection("user").insertOne(newUser);

  return NextResponse.json(
    { message: "User created", data: { _id: result.insertedId, ...newUser } },
    { status: 201 }
  );
}

// PATCH /api/users/:id
async function UpdateUser(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { role } = session.user ?? {};
  const sessionBranch = session.user?.branch;

  const { pathname } = new URL(req.url);
  const id = pathname.split("/").pop();
  if (!id)
    return NextResponse.json({ error: "Missing user ID" }, { status: 400 });

  const body = await req.json();
  body.updatedAt = new Date();

  // Restrict manager to updating users only in their branch
  const query: any = { _id: new ObjectId(id) };
  if (role === "manager" && sessionBranch) {
    query.branch = sessionBranch;
  }

  const result = await db.collection("user").updateOne(query, { $set: body });

  if (result.matchedCount === 0)
    return NextResponse.json(
      { error: "User not found or not permitted" },
      { status: 404 }
    );

  return NextResponse.json({ message: "User updated" });
}

// DELETE /api/users/:id
async function DeleteUser(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { role } = session.user ?? {};
  const sessionBranch = session.user?.branch;

  const { pathname } = new URL(req.url);
  const id = pathname.split("/").pop();
  if (!id)
    return NextResponse.json({ error: "Missing user ID" }, { status: 400 });

  const query: any = { _id: new ObjectId(id) };
  if (role === "manager" && sessionBranch) {
    query.branch = sessionBranch;
  }

  const result = await db.collection("user").deleteOne(query);
  if (result.deletedCount === 0)
    return NextResponse.json(
      { error: "User not found or not permitted" },
      { status: 404 }
    );

  return NextResponse.json({ message: "User deleted" });
}

export const GET = withRoleCheck(["user", "admin", "manager"])(GetUsers);
export const POST = withRoleCheck(["admin", "manager"])(CreateUser);
export const PATCH = withRoleCheck(["admin", "manager"])(UpdateUser);
export const DELETE = withRoleCheck(["admin", "manager"])(DeleteUser);
