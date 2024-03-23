import {
  confessionSchema,
  usersSchema,
  confessionChannelSchema,
  welcomeSchema,
} from "../db/schema.js";
import { db } from "../db/db.js";
import { and, eq, gt } from "drizzle-orm";

export async function getUserInfoByID(user_id: string) {
  const result = await db
    .select()
    .from(usersSchema)
    .where(eq(usersSchema.user_id, user_id));

  return result;
}

export async function getConfessionsByServer(server_id: string) {
  const result = await db
    .select()
    .from(confessionSchema)
    .where(eq(confessionSchema.server_id, server_id));

  return result;
}

export async function getConfessionsByUserID(
  user_id: string,
  server_id: string
) {
  const result = await db
    .select()
    .from(confessionSchema)
    .where(
      and(
        eq(confessionSchema.user_id, user_id),
        eq(confessionSchema.server_id, server_id)
      )
    );

  return result;
}

export async function getAllConfessions() {
  const result = await db.select().from(confessionSchema);
  return result;
}

export async function getConfessionsChannelByServerID(server_id: string) {
  const result = await db
    .select()
    .from(confessionChannelSchema)
    .where(eq(confessionChannelSchema.server_id, server_id));

  return result;
}

export async function getWelcomeInfoByServerID(server_id: string) {
  const result = await db
    .select()
    .from(welcomeSchema)
    .where(eq(welcomeSchema.server_id, server_id));

  return result;
}
