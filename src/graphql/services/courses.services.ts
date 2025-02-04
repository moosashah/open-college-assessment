import { db } from "../../db";
import { asc, desc, eq } from "drizzle-orm";
import { courses } from "../../db/schema";
import { CourseInput, SortOrder } from "../types";

export const listCourses = async (
  limit?: number,
  sortOrder: SortOrder = "ASC",
) => {
  const orderBy: Array<any> =
    sortOrder === "ASC" ? [asc(courses.id)] : [desc(courses.id)];
  const result = await db.query.courses.findMany({
    orderBy: orderBy,
    limit: limit,
  });
  return result;
};

export const getCourse = async (id: string) => {
  const course = await db.query.courses.findFirst({
    where: (courses, { eq }) => eq(courses.id, +id),
  });

  return course;
};

export const getCourseByCollectionId = async (collectionId: number) => {
  const course = await db.query.courses.findMany({
    where: (courses, { eq }) => eq(courses.collectionId, collectionId),
  });
  return course;
};

export const addCourse = async (input: CourseInput) => {
  const [course] = await db.insert(courses).values(input).$returningId();
  return await db.query.courses.findFirst({
    where: (courses, { eq }) => eq(courses.id, course.id),
  });
};

export const updateCourse = async (id: number, input: CourseInput) => {
  await db.update(courses).set(input).where(eq(courses.id, +id));
  return await db.query.courses.findFirst({
    where: (courses, { eq }) => eq(courses.id, id),
  });
};

export const deleteCourse = async (id: string) => {
  const [course] = await db.delete(courses).where(eq(courses.id, +id));
  return course.affectedRows > 0 ? true : false;
};
