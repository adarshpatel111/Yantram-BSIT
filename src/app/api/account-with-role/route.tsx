import { auth } from "@/lib/auth";
import { withRoleCheck } from "@/lib/withRoleCheck";
import { NextRequest, NextResponse } from "next/server";

async function createAccount(req: NextRequest) {
  const session = await auth.api.getSession({
    headers: req.headers,
  });

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { email, password, name, role, data } = await req.json();
  const newUser = await auth.api.createUser({
    body: { email, password, name, role, data },
  });

  return NextResponse.json({ user: newUser });
}

export const POST = withRoleCheck(["admin", "manager"])(createAccount);
