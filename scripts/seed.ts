import "dotenv/config";
import { drizzle } from "drizzle-orm/mysql2";
import { courses, collections } from "../src/db/schema";

const db = drizzle(process.env.DATABASE_URL!);

const insertCollections = async () => {
  const result = await db
    .insert(collections)
    .values([
      { name: "Sciences" },
      { name: "Mathematics" },
      { name: "Humanities" },
    ])
    .$returningId();
  console.log("collections seeded successfully");

  return result;
};

const insertCourses = async (collectionIds: { id: number }[]) => {
  await db.insert(courses).values([
    {
      title: "Biology",
      description:
        "Learn the fundamentals of living organisms, including cell structure, genetics, evolution, and ecosystems. Perfect for beginners interested in life sciences.",
      duration: 600,
      outcome: "Outcome 1",
      collectionId: collectionIds[0].id,
      ownerId: 2,
    },
    {
      title: "Chemistry",
      description:
        "Explore atomic structure, chemical bonds, reactions, and basic laboratory techniques. Ideal introduction to the world of chemical sciences.",
      duration: 120,
      outcome: "Outcome 2",
      collectionId: collectionIds[0].id,
      ownerId: 2,
    },
    {
      title: "Physics",
      description:
        "Discover the basic laws governing matter and energy, including mechanics, waves, and thermodynamics. Great foundation for understanding the physical world.",
      duration: 60,
      outcome: "Outcome 3",
      collectionId: collectionIds[0].id,
      ownerId: 2,
    },
    {
      title: "Mathematics",
      description:
        "Master essential mathematical concepts including algebra, geometry, and basic calculus. Build problem-solving skills applicable across many fields.",
      duration: 120,
      outcome: "Outcome 4",
      collectionId: collectionIds[1].id,
      ownerId: 2,
    },
    {
      title: "History",
      description:
        "Journey through major world events, civilizations, and cultural developments. Understand how past events shape our present world.",
      duration: 60,
      outcome: "Outcome 5",
      collectionId: collectionIds[2].id,
      ownerId: 2,
    },
    {
      title: "Geography",
      description:
        "Study Earth's landscapes, environments, populations, and cultures. Learn how physical and human geography interact to shape our world.",
      duration: 60,
      outcome: "Outcome 6",
      collectionId: collectionIds[2].id,
      ownerId: 2,
    },
  ]);
  console.log("Courses seeded successfully");
};

const seed = async () => {
  try {
    const collectionIds = await insertCollections();
    await insertCourses(collectionIds);
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

seed()
  .then(() => {
    console.log("Data seeded successfully");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error seeding data:", error);
    process.exit(1);
  });
