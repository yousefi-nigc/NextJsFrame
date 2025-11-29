import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { db } from "./db";
import { nextCookies } from "better-auth/next-js";
import { admin } from "better-auth/plugins";
import { adminClient } from "better-auth/client/plugins";
import { hashPassword, verifyHash } from "./password";

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    password: {
      hash: hashPassword,
      verify: verifyHash,
    }
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        input: false
      }
    }
  },
  plugins: [admin(), adminClient(), nextCookies()],
});

