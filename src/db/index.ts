import "dotenv/config";
import { drizzle } from "drizzle-orm/mysql2";
import { migrate } from "drizzle-orm/mysql2/migrator";
import * as schema from "./schema";

export const db = drizzle(process.env.DATABASE_URL!, {
  schema,
  mode: "default",
});

export const runMigrations = async () => {
  await migrate(db, {
    migrationsFolder: "./drizzle",
  });
};
