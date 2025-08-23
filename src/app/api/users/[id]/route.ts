import { NextRequest, NextResponse } from "next/server";
<<<<<<< Updated upstream
<<<<<<< Updated upstream

type Params = {
  params: {
    id: string;
  };
};

async function getUserDetails(request: NextRequest, { params }: Params) {
  const { id } = params;

  const item = { id, name: `Item ${id}` };

  return NextResponse.json(item);
}

async function deleteUserDetails(request: NextRequest, { params }: Params) {
  const { id } = params;

  return NextResponse.json({ message: `Item ${id} deleted` });
}

export const GET = getUserDetails;
export const DELETE = deleteUserDetails;
=======
=======
>>>>>>> Stashed changes
import { db } from "@/db/db";
import { auth } from "@/lib/auth";
import { withRoleCheck } from "@/lib/withRoleCheck";
import { ObjectId } from "mongodb";
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

export const PATCH = withRoleCheck(["admin", "manager"])(UpdateUser);
export const DELETE = withRoleCheck(["admin", "manager"])(DeleteUser);
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
