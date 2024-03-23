import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersSchema = sqliteTable("users", {
  user_id: text("user_id").primaryKey(),
  balance: integer("balance").notNull(),
  daily: integer("last_daily"),
  monthly: integer("last_monthly"),
  yearly: integer("last_yearly"),
});

export const confessionSchema = sqliteTable("confession", {
  message_id: integer("message_id").primaryKey(),
  user_id: text("user_id").notNull(),
  content: text("content").notNull(),
  targeted_user_id: text("targeted_user_id"),
  server_id: text("server_id").notNull(),
});

export const confessionResponsesSchema = sqliteTable("confessionResponses", {
  response_id: integer("response_id").primaryKey(),
  message_id: integer("message_id").notNull(),
  content: text("content").notNull(),
  response_time: integer("response_time").notNull(),
});

export const confessionChannelSchema = sqliteTable("confessionChannel", {
  server_id: text("server_id").primaryKey(),
  channel_id: text("channel_id").notNull(),
});

export const welcomeSchema = sqliteTable("welcome", {
  server_id: text("server_id").primaryKey(),
  channel_id: text("channel_id"),
  role_id: text("role_id")
});
