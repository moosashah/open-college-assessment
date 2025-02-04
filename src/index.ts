import express from "express";
import cors from "cors";

import { runMigrations } from "./db";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { resolvers, typeDefs } from "./graphql";

const init = async () => {
  await runMigrations();
};

const bootstrapServer = async () => {
  await init();

  const port = process.env.PORT || 4000;
  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use(cors());
  app.use(express.json());

  app.get("/", (_req, res) => {
    res.send("Hello World");
  });

  app.use("/graphql", expressMiddleware(server));

  app.listen({ port }, () => {
    console.log(`Server ready at http://localhost:${port}`);
    console.log(`Graphql ready at http://localhost:${port}/graphql`);
  });
};

bootstrapServer();
