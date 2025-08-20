import { auth } from "./auth";
import { BASE_URL } from "@/utilities/contants";
import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";
import { adminClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: BASE_URL,
  plugins: [
    adminClient(),
    inferAdditionalFields<typeof auth>({
      user: {
        phone: {
          type: "string",
        },
      },
    }),
  ],
});

export const { signIn, signUp, useSession } = createAuthClient();
