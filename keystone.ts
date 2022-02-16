/*
Welcome to the keystone config file! This file gives keystone its config to run with.

We'll be back here later.
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
  lists,
});
