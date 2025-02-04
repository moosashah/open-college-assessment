import * as m from "drizzle-orm/mysql-core";

export const courses = m.mysqlTable("courses", {
  id: m.serial("id").primaryKey(),
  title: m.varchar("title", { length: 255 }).notNull(),
  description: m.text("description").notNull(),
  duration: m.int("duration").notNull(),
  outcome: m.text("outcome").notNull(),
  collectionId: m.int("collection_id").notNull(),
  ownerId: m.int("owner_id").notNull(),
});

export const collections = m.mysqlTable("collections", {
  id: m.serial("id").primaryKey(),
  name: m.varchar("name", { length: 255 }).notNull(),
});

export const users = m.mysqlTable("users", {
  id: m.serial("id").primaryKey(),
  username: m.varchar("username", { length: 255 }).unique().notNull(),
  password: m.varchar("password", { length: 255 }).notNull(),
  role: m.mysqlEnum("role", ["USER", "ADMIN"]).default("USER").notNull(),
  createdAt: m.timestamp("created_at").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
