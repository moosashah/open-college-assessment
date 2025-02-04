import {
  getCollection,
  listCollections,
} from "../services/collection.services";
import { getCourseByCollectionId } from "../services/courses.services";

export const collectionResolver = {
  Query: {
    async collection(_parent: any, { id }: { id: string }) {
      return await getCollection(+id);
    },
    async collections() {
      return await listCollections();
    },
  },
  Collection: {
    async courses(parent: any) {
      return await getCourseByCollectionId(parent.id);
    },
  },
};
