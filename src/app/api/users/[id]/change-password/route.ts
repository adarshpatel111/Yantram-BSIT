// app/api/users/[id]/change-password/route.ts
import { NextResponse } from "next/server";
import { z } from "zod";
import { withRoleCheck } from "@/lib/withRoleCheck";
import { authClient } from "@/lib/auth-client";

const changePasswordSchema = z.object({
  currentPassword: z.string().min(6, "Current password is required"),
  newPassword: z.string().min(6, "New password must be at least 6 chars"),
  revokeOtherSessions: z.boolean().optional(),
});

export const POST = withRoleCheck(["admin", "user"])(
  async (req: Request, { params }: { params: { id: string } }) => {
    try {
      const body = await req.json();
      const { currentPassword, newPassword, revokeOtherSessions } =
        changePasswordSchema.parse(body);

      const { data, error } = await authClient.changePassword({
        currentPassword,
        newPassword,
        revokeOtherSessions: revokeOtherSessions ?? true,
      });

      if (error) {
        return NextResponse.json(
          { success: false, message: error.message },
          { status: 400 }
        );
      }

      return NextResponse.json(
        {
          success: true,
          message: "Password changed successfully",
          data,
        },
        { status: 200 }
      );
    } catch (err: any) {
      return NextResponse.json(
        { success: false, message: err.message ?? "Unexpected error" },
        { status: 500 }
      );
    }
  }
);
