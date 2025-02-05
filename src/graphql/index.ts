import { courseResolver } from "./resolvers/course.resolver";
import { collectionResolver } from "./resolvers/collection.resolver";
import { userResolver } from "./resolvers/user.resolver";
import userSchema from "./schema/user";
import courseSchema from "./schema/course";
import collectionSchema from "./schema/collection";

export const typeDefs = [courseSchema, collectionSchema, userSchema];

export const resolvers = {
  Query: {
    ...courseResolver.Query,
    ...collectionResolver.Query,
  },
  Mutation: {
    ...courseResolver.Mutation,
    ...userResolver.Mutation,
  },
  Collection: collectionResolver.Collection,
  Course: courseResolver.Course,
};
