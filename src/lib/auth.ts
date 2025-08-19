import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { db } from "@/db/db";
import { nextCookies } from "better-auth/next-js";

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
  plugins: [nextCookies()],
});
