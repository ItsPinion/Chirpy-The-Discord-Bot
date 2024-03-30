import { db } from "../db/db.js";
import {
  usersSchema,
  confessionSchema,
  confessionChannelSchema,
  welcomeSchema,
  storySchema,
  storyContributionSchema,
  storyChannelSchema,
} from "../db/schema.js";

export async function createUser(
  user_id: string
): Promise<{ success: boolean; message: string }> {
  await db.insert(usersSchema).values({
    user_id,
    balance: 0,
  });
  return {
    success: true,
    message: "successfully created a new user.",
  };
}

export async function createConfession(
  user_id: string,
  targeted_user_id: string | null,
  confession: string,
  server_id: string
): Promise<{ success: boolean; message: string }> {
  await db.insert(confessionSchema).values({
    user_id,
    content: confession,
    targeted_user_id,
    server_id,
  });

  return {
    success: true,
    message: "successfully created a new confession.",
  };
}

export async function createConfessionChannel(
  server_id: string,
  channel_id: string
): Promise<{ success: boolean; message: string }> {
  await db.insert(confessionChannelSchema).values({
    server_id,
    channel_id,
  });

  return {
    success: true,
    message: "successfully created a new confession channel.",
  };
}

export async function createWelcome(
  server_id: string
): Promise<{ success: boolean; message: string }> {
  await db.insert(welcomeSchema).values({
    server_id,
  });

  return {
    success: true,
    message: "successfully created a new confession channel.",
  };
}

export async function createStory(
  story_id: string,
  title: string,
  created_by: string,
  created_at: number
): Promise<{ success: boolean; message: string }> {
  await db
    .insert(storySchema)
    .values({ title, created_by, created_at, story_id });

  return {
    success: true,
    message: "successfully created a new confession channel.",
  };
}

export async function createStoryContribution(
  content: string,
  contributor_id: string,
  contributed_at: number,
  story_id: string
): Promise<{ success: boolean; message: string }> {
  await db
    .insert(storyContributionSchema)
    .values({ content, contributed_at, contributor_id, story_id });

  return {
    success: true,
    message: "successfully created a new confession channel.",
  };
}

export async function createStoryChannel(
  server_id: string,
  channel_id: string
): Promise<{ success: boolean; message: string }> {
  await db.insert(storyChannelSchema).values({
    server_id,
    channel_id,
  });

  return {
    success: true,
    message: "successfully created a new confession channel.",
  };
}
