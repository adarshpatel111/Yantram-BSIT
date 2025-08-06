import { BASE_URL } from "@/utilities/contants";
import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";
import { auth } from "./auth";
export const authClient = createAuthClient({
  baseURL: BASE_URL,
  plugins: [
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
