const dotenv = require("dotenv");
dotenv.config();

export default {
  schema: "./db/schema.js",
  out: "./migrations",
  driver: "turso",
  dbCredentials: {
    url: process.env.TURSO_CONNECTION_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  },
};
