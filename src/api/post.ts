import { db } from "../db/db.js";
import {
  usersSchema,
  confessionSchema,
  confessionChannelSchema,
  welcomeSchema,
} from "../db/schema.js";
import { and, eq, gt } from "drizzle-orm";

export async function createUser(
  user_id: string
): Promise<{ success: boolean; message: string }> {
  await db.insert(usersSchema).values({
    user_id: user_id,
    balance: 0,
  });
  return {
    success: true,
    message: "successfully created a new user.",
  };
}

export async function createConfession(
  userID: string,
  targetedUserID: string | null,
  confession: string,
  server_id: string
): Promise<{ success: boolean; message: string }> {
  await db.insert(confessionSchema).values({
    user_id: userID,
    content: confession,
    targeted_user_id: targetedUserID,
    server_id: server_id,
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
    server_id: server_id,
    channel_id: channel_id,
  });

  return {
    success: true,
    message: "successfully created a new confession channel.",
  };
}


export async function createWelcome(
  server_id: string,
): Promise<{ success: boolean; message: string }> {
  await db.insert(welcomeSchema).values({
    server_id: server_id,
  });

  return {
    success: true,
    message: "successfully created a new confession channel.",
  };
}
