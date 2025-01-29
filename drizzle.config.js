import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env" });

export default defineConfig({
  schema: "./configs/schema.js",
  //   out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://neondb_owner:npg_upQNhyJeC58b@ep-red-tooth-a81tlltj-pooler.eastus2.azure.neon.tech/neondb?sslmode=require",
  },
});
