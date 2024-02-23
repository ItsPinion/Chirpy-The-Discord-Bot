const { db } = require("../db/db.js");
const { usersSchema } = require("../db/schema.js");
const { and, eq, gt } = require("drizzle-orm");
const { readUserbyID } = require("./get.js");

async function updateBalance(user_id, currentBalance = 0, add = 0) {
  await db
    .update(usersSchema)
    .set({ user_id: user_id, balance: Math.floor(currentBalance + add) })
    .where(eq(usersSchema.user_id, user_id));

  return {
    success: true,
    message: "user detail[s] has been updated successfully",
  };
}

async function updateDaily(user_id, date = 0) {
  await db
    .update(usersSchema)
    .set({ user_id: user_id, daily: date })
    .where(eq(usersSchema.user_id, user_id));

  return {
    success: true,
    message: "user detail[s] has been updated successfully",
  };
}

async function updateMonthly(user_id, date = 0) {
  await db
    .update(usersSchema)
    .set({ user_id: user_id, monthly: date })
    .where(eq(usersSchema.user_id, user_id));

  return {
    success: true,
    message: "user detail[s] has been updated successfully",
  };
}

async function updateYearly(user_id, date = 0) {
  await db
    .update(usersSchema)
    .set({ user_id: user_id, yearly: date })
    .where(eq(usersSchema.user_id, user_id));

  return {
    success: true,
    message: "user detail[s] has been updated successfully",
  };
}

module.exports = { updateBalance, updateDaily, updateMonthly, updateYearly };
