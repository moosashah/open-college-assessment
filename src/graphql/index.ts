import { readFileSync } from "fs";
import path from "path";

import { courseResolver } from "./resolvers/course.resolver";
import { collectionResolver } from "./resolvers/collection.resolver";
import { userResolver } from "./resolvers/user.resolver";
export const courseSchema = readFileSync(
  path.join(__dirname, "schema", "course.graphql"),
  "utf8",
);

export const collectionSchema = readFileSync(
  path.join(__dirname, "schema", "collection.graphql"),
  "utf8",
);

export const userSchema = readFileSync(
  path.join(__dirname, "schema", "user.graphql"),
  "utf8",
);

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
