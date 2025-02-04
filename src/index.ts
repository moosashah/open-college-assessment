import express from "express";
import cors from "cors";

import { runMigrations } from "./db";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { resolvers, typeDefs } from "./graphql";
import { createContext } from "./context";

const init = async () => {
  await runMigrations();
};

export const SUPER_SECRET_KEY = "SUPER_SECRET_KEY";

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

  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: createContext,
    }),
  );

  app.listen({ port }, () => {
    console.log(`Graphql ready at http://localhost:${port}/graphql`);
  });
};

bootstrapServer();
