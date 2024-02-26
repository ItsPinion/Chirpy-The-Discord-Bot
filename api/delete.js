const { eq } = require("drizzle-orm");
const { db } = require("../db/db");
const { confessionSchema } = require("../db/schema");

async function deleteConfession() {
  await db
    .delete(confessionSchema)
   
}

module.exports = { deleteConfession };
