import {
  confessionSchema,
  usersSchema,
  confessionChannelSchema,
  welcomeSchema,
  storySchema,
  storyChannelSchema,
  storyContributionSchema,
} from "../db/schema.js";
import { db } from "../db/db.js";
import { and, eq } from "drizzle-orm";

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

export async function getStoryByStoryID(story_id: string) {
  const result = await db
    .select()
    .from(storySchema)
    .where(eq(storySchema.story_id, story_id));

  return result;
}

export async function getStoryChannelByServerID(server_id: string) {
  const result = await db
    .select()
    .from(storyChannelSchema)
    .where(eq(storyChannelSchema.server_id, server_id));

  return result;
}


export async function getStoryContributionByStoryID(story_id: string) {
  const result = await db
    .select()
    .from(storyContributionSchema)
    .where(eq(storyContributionSchema.story_id, story_id));

  return result;
}