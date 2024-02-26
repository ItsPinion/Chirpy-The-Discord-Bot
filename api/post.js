const { db } = require("../db/db.js");
const {
  usersSchema,
  confessionSchema,
  confessionChannelSchema,
} = require("../db/schema.js");
const { and, eq, gt } = require("drizzle-orm");

async function createUser(user_id) {
  await db.insert(usersSchema).values({
    user_id: user_id,
    balance: 0,
  });
  return {
    success: true,
    message: "successfully created a new user.",
  };
}

async function createConfession(userID, targatedUserID, confession, server_id) {
  await db.insert(confessionSchema).values({
    user_id: userID,
    content: confession,
    targeted_user_id: targatedUserID,
    server_id: server_id,
  });

  return {
    success: true,
    message: "successfully created a new confession.",
  };
}

async function createConfessionChannel(server_id, channel_id) {
  await db.insert(confessionChannelSchema).values({
    server_id: server_id,
    channel_id: channel_id,
  });

  return {
    success: true,
    message: "successfully created a new confession.",
  };
}

module.exports = { createUser, createConfession, createConfessionChannel };
