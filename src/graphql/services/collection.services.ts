import { db } from "../../db";

export const listCollections = async () => {
  const result = await db.query.collections.findMany();
  return result;
};

export const getCollection = async (id: number) => {
  const collection = await db.query.collections.findFirst({
    where: (collections, { eq }) => eq(collections.id, id),
  });
  return collection;
};
