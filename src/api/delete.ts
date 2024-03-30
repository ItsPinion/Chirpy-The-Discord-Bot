import { eq } from "drizzle-orm";
import { db } from "../db/db";
import {
  confessionSchema,
  storyContributionSchema,
  storySchema,
  welcomeSchema,
} from "../db/schema";

export async function deleteConfession(): Promise<void> {
  await db.delete(confessionSchema);
}

export async function deleteWelcome(server_id: string): Promise<void> {
  await db.delete(welcomeSchema).where(eq(welcomeSchema.server_id, server_id));
}

export async function deleteStory(story_id: string): Promise<void> {
  await db.delete(storySchema).where(eq(storySchema.story_id, story_id));
}

export async function deleteAllStoryContributions(
  story_id: string
): Promise<void> {
  try {
    await db
    .delete(storyContributionSchema)
    .where(eq(storyContributionSchema.story_id, story_id));
  } catch (error) {
    console.error(error)
  }
}
