const {
  confessionSchema,
  usersSchema,
  confessionChannelSchema,
} = require("../db/schema.js");
const { db } = require("../db/db.js");
const { and, eq, gt } = require("drizzle-orm");

async function getUserInfoByID(user_id) {
  const result = await db
    .select()
    .from(usersSchema)
    .where(eq(usersSchema.user_id, user_id));

  return result;
}

async function getConfessionsByServer(server_id) {
  const result = await db
    .select()
    .from(confessionSchema)
    .where(eq(confessionSchema.server_id, server_id));

  return result;
}

async function getConfessionsByUserID(user_id, server_id) {
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

async function getAllConfessions() {
  const result = await db.select().from(confessionSchema);
  return result;
}

async function getConfessionsChannelByServerID(server_id) {
  const result = await db
    .select()
    .from(confessionChannelSchema)
    .where(eq(confessionChannelSchema.server_id, server_id));

  return result;
}

module.exports = {
  getUserInfoByID,
  getConfessionsByServer,
  getConfessionsByUserID,
  getConfessionsChannelByServerID,
  getAllConfessions
};