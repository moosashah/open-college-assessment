export type CourseInput = {
  title: string;
  description: string;
  duration: number;
  outcome: string;
  collectionId: number;
  ownerId: number;
};

export type Credentials = {
  username: string;
  password: string;
  role?: "USER" | "ADMIN";
};

export type SortOrder = "ASC" | "DESC";
