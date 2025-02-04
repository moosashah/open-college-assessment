import { getCollection } from "../services/collection.service";
import {
  getCourse,
  listCourses,
  addCourse,
  updateCourse,
  deleteCourse,
} from "../services/course.service";
import { CourseInput, SortOrder } from "../types";

interface Context {
  user?: {
    id: number;
    username: string;
    password: string;
    role: "user" | "admin";
  };
}

export const courseResolver = {
  Query: {
    async course(_parent: any, { id }: { id: number }) {
      return await getCourse(id);
    },
    async courses(
      _parent: any,
      { limit, sortOrder }: { limit: number; sortOrder: SortOrder },
    ) {
      return await listCourses(limit, sortOrder);
    },
  },
  Mutation: {
    async addCourse(
      _parent: any,
      { input }: { input: CourseInput },
      context: Context,
    ) {
      if (context.user) {
        const course = await addCourse(input);
        if (
          context.user.role.toLowerCase() === "admin" ||
          course?.ownerId === context.user.id
        ) {
          return course;
        }
        throw new Error("Invalid credentials");
      }
      throw new Error("Invalid credentials");
    },
    async updateCourse(
      _parent: any,
      args: { id: number; input: CourseInput },
      context: Context,
    ) {
      const { id, input } = args;
      if (context.user) {
        const course = await getCourse(id);
        if (
          context.user.role.toLowerCase() === "admin" ||
          course?.ownerId === context.user.id
        ) {
          return await updateCourse(id, input);
        }
        throw new Error("Invalid credentials");
      }
      throw new Error("Invalid credentials");
    },
    async deleteCourse(_parent: any, { id }: { id: number }, context: Context) {
      if (context.user) {
        const course = await getCourse(id);
        if (
          context.user.role.toLowerCase() === "admin" ||
          course?.ownerId === context.user.id
        ) {
          return await deleteCourse(id);
        }
        throw new Error("Invalid credentials");
      }
      throw new Error("Invalid credentials");
    },
  },
  Course: {
    async collection(parent: any) {
      return await getCollection(parent.collectionId);
    },
  },
};
