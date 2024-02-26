const {
  integer,
  sqliteTable,
  text,
  timestamp,
} = require("drizzle-orm/sqlite-core");

const usersSchema = sqliteTable("user", {
  user_id: text("user_id").primaryKey(),
  balance: integer("balance"),
  daily: integer("last_daily"),
  monthly: integer("last_monthly"),
  yearly: integer("last_yearly"),
});

const confessionSchema = sqliteTable("confession", {
  message_id: integer("message_id").primaryKey(),
  user_id: text("user_id"),
  content: text("content"),
  targeted_user_id: text("targeted_user_id"),
  server_id: text("server_id"),
});

const confessionResponsesSchema = sqliteTable("confessionResponses", {
  response_id: integer("response_id").primaryKey(),
  message_id: integer("message_id"),
  content: text("content"),
  response_time: integer("response_time"),
});

const confessionChannelSchema = sqliteTable("confessionChannel", {
  server_id: text("server_id").primaryKey(),
  channel_id: text("channel_id"),
});

module.exports = { usersSchema, confessionSchema, confessionResponsesSchema, confessionChannelSchema };
