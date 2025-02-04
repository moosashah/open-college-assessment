import "dotenv/config";
import { drizzle } from "drizzle-orm/mysql2";
import { migrate } from "drizzle-orm/mysql2/migrator";
export const db = drizzle(process.env.DATABASE_URL!);

export const runMigrations = async () => {
  await migrate(db, {
    migrationsFolder: "./drizzle",
  });
};
