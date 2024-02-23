const { db } = require("../db/db.js");
const { usersSchema } = require("../db/schema.js");
const { and, eq, gt } = require("drizzle-orm");

async function createUser(user_id) {
  
  await db.insert(usersSchema).values({
    user_id: user_id,
    balance: 0,
  });
  return {
    success: true,
    message: "Registration successful. Please log in to continue.",
  };
}

module.exports = { createUser };
