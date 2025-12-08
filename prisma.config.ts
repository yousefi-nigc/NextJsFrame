// Only load dotenv in development or if DATABASE_URL is not set
if (!process.env.DATABASE_URL) {
  try {
    require("dotenv/config");
  } catch {
    // dotenv not available, which is fine if env vars are set
  }
}

import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasource: {
    url: env("DATABASE_URL"),
  },
});
