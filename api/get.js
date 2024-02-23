const { db } = require("../db/db.js");
const { usersSchema } = require("../db/schema.js");
const { and, eq, gt } = require("drizzle-orm");

async function readUserbyID(user_id) {
  const result = await db
    .select()
    .from(usersSchema)
    .where(eq(usersSchema.user_id, user_id));

  return result;
}

module.exports = { readUserbyID };
