/*
WARN: This file should not be in `main` - if it is, we've made a mistake.

To fix this, you can checkout branch `complete` and then copy the contents of `keystone-base.ts` into this file.
*/
import { Context } from ".keystone/types";
import { config } from "@keystone-6/core";
import { lists } from "./schema";
import { insertSeedData } from "./seed-data";

export default config({
  db: {
    provider: "sqlite",
    url: process.env.DATABASE_URL || "file:./keystone-example.db",
    async onConnect(context) {
      if (process.argv.includes("--seed-data")) {
        await insertSeedData(context as Context);
      }
    },
  },
  server: {
    port: 3001,
    cors: {
      origin: process.env.NODE_ENV === "development" && "*",
    },
  },
  lists,
});
