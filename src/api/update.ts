import { db } from "../db/db.js";
import {
  usersSchema,
  confessionChannelSchema,
  welcomeSchema,
} from "../db/schema.js";
import { and, eq, gt } from "drizzle-orm";
import { getUserInfoByID } from "./get.js";

export async function updateBalance(
  user_id: string,
  currentBalance: number = 0,
  add: number = 0
): Promise<{ success: boolean; message: string }> {
  await db
    .update(usersSchema)
    .set({ user_id: user_id, balance: Math.floor(currentBalance + add) })
    .where(eq(usersSchema.user_id, user_id));

  return {
    success: true,
    message: "user detail[s] has been updated successfully",
  };
}

export async function updateDaily(
  user_id: string,
  date: number = 0
): Promise<{ success: boolean; message: string }> {
  await db
    .update(usersSchema)
    .set({ user_id: user_id, daily: date })
    .where(eq(usersSchema.user_id, user_id));

  return {
    success: true,
    message: "user detail[s] has been updated successfully",
  };
}

export async function updateMonthly(
  user_id: string,
  date: number = 0
): Promise<{ success: boolean; message: string }> {
  await db
    .update(usersSchema)
    .set({ user_id: user_id, monthly: date })
    .where(eq(usersSchema.user_id, user_id));

  return {
    success: true,
    message: "user detail[s] has been updated successfully",
  };
}

export async function updateYearly(
  user_id: string,
  date: number = 0
): Promise<{ success: boolean; message: string }> {
  await db
    .update(usersSchema)
    .set({ user_id: user_id, yearly: date })
    .where(eq(usersSchema.user_id, user_id));

  return {
    success: true,
    message: "user detail[s] has been updated successfully",
  };
}

export async function updateConfessionChannel(
  server_id: string,
  channel_id: string
): Promise<{ success: boolean; message: string }> {
  await db
    .update(confessionChannelSchema)
    .set({ server_id: server_id, channel_id: channel_id })
    .where(eq(confessionChannelSchema.server_id, server_id));

  return {
    success: true,
    message: "user detail[s] has been updated successfully",
  };
}

export async function updateWelcomeChannel(
  server_id: string,
  channel_id: string|null
): Promise<{ success: boolean; message: string }> {
  await db
    .update(welcomeSchema)
    .set({ server_id: server_id, channel_id: channel_id })
    .where(eq(welcomeSchema.server_id, server_id));

  return {
    success: true,
    message: "user detail[s] has been updated successfully",
  };
}

export async function updateWelcomeRole(
  server_id: string,
  role_id: string|null
): Promise<{ success: boolean; message: string }> {
  await db
    .update(welcomeSchema)
    .set({ server_id: server_id, role_id: role_id })
    .where(eq(welcomeSchema.server_id, server_id));

  return {
    success: true,
    message: "user detail[s] has been updated successfully",
  };
}
