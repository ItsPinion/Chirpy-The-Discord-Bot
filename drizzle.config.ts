import type { Config } from "drizzle-kit";
import dotenv from 'dotenv';
dotenv.config();

export default {
  schema: "./src/db/schema.ts",
  out: "./migrations",
  driver: "turso",
  dbCredentials: {
    url: process.env.TURSO_CONNECTION_URL as string,
    authToken: process.env.TURSO_AUTH_TOKEN,
  },
}satisfies Config;
