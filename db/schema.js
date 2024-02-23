const { integer, sqliteTable, text } = require("drizzle-orm/sqlite-core");

 const usersSchema = sqliteTable("user", {
  user_id: text("user_id").primaryKey(),
  balance: integer("balance"),
  daily: integer("last_daily"),
  monthly: integer("last_monthly"),
  yearly: integer("last_yearly"),
});

module.exports = {usersSchema};
