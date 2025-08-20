import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { db } from "@/db/db";
import { nextCookies } from "better-auth/next-js";
import { admin } from "better-auth/plugins/admin";

export const auth = betterAuth({
  database: mongodbAdapter(db),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      phone: {
        type: "string",
        required: true,
        defaultValue: null,
        input: true,
      },
      role: {
        type: "string",
        required: true,
        defaultValue: "user",
        input: false,
      },
    },
  },
  session: {
    additionalFields: {
      phone: {
        type: "string",
        required: true,
        defaultValue: null,
        input: true,
      },
    },
  },
  plugins: [nextCookies(), admin()],
});
