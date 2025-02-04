import * as m from "drizzle-orm/mysql-core";

export const courses = m.mysqlTable("courses", {
  id: m.serial("id").primaryKey(),
  title: m.varchar("title", { length: 255 }),
  description: m.text("description"),
  duration: m.int("duration"),
  outcome: m.text("outcome"),
});
