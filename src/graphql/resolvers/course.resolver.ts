import { getCollection } from "../services/collection.services";
import {
  getCourse,
  listCourses,
  addCourse,
  updateCourse,
  deleteCourse,
} from "../services/courses.services";
import { CourseInput, SortOrder } from "../types";

export const courseResolver = {
  Query: {
    async course(_parent: any, { id }: { id: number }) {
      return await getCourse(id.toString());
    },
    async courses(
      _parent: any,
      { limit, sortOrder }: { limit: number; sortOrder: SortOrder },
    ) {
      return await listCourses(limit, sortOrder);
    },
  },
  Mutation: {
    async addCourse(_parent: any, { input }: { input: CourseInput }) {
      console.log("add course resolver", input);
      return await addCourse(input);
    },
    async updateCourse(_parent: any, args: { id: number; input: CourseInput }) {
      console.log("update course", args);
      const { id, input } = args;
      return await updateCourse(id, input);
    },
    async deleteCourse(_parent: any, { id }: { id: number }) {
      return await deleteCourse(id.toString());
    },
  },
  Course: {
    async collection(parent: any) {
      console.log("course resolver", parent);
      return await getCollection(parent.collectionId);
    },
  },
};
