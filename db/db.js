require("dotenv").config();
const { drizzle } = require("drizzle-orm/libsql");
const { createClient } = require("@libsql/client");

const client = createClient({
  url: process.env.TURSO_CONNECTION_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});
const db = drizzle(client);

module.exports = {db};
