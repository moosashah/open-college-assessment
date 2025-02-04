import express from "express";
import cors from "cors";

import { runMigrations } from "./db";

const port = process.env.PORT || 4000;
const app = express();

const bootstrapServer = async () => {
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get("/", (_req, res) => {
    res.send("Hello World");
  });

  await runMigrations();

  app.listen({ port }, () => {
    console.log(`Server ready at http://localhost:${port}`);
  });
};

bootstrapServer();
