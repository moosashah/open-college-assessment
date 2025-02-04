import * as m from "drizzle-orm/mysql-core";

export const courses = m.mysqlTable("courses", {
  id: m.serial("id").primaryKey(),
  title: m.varchar("title", { length: 255 }).notNull(),
  description: m.text("description").notNull(),
  duration: m.int("duration").notNull(),
  outcome: m.text("outcome").notNull(),
  collectionId: m.int("collection_id").notNull(),
});

export const collections = m.mysqlTable("collections", {
  id: m.serial("id").primaryKey(),
  name: m.varchar("name", { length: 255 }).notNull(),
});
