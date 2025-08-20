import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";

type Handler = (
  req: NextRequest,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any
) => Promise<NextResponse> | NextResponse | Promise<Response>;

export function withRoleCheck(allowedRoles: string[]) {
  return (handler: Handler) => async (req: NextRequest) => {
    // Handle public routes
    if (allowedRoles.includes("public")) {
      return handler(req, null);
    }

    const user = await auth.api.getSession({ headers: req.headers });

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Authorization check
    if (!allowedRoles.includes(user.user.role)) {
      return NextResponse.json(
        { error: "Forbidden: Insufficient permissions" },
        { status: 403 }
      );
    }

    return handler(req, user);
  };
}
