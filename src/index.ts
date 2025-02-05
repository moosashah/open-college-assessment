import express from "express";
import cors from "cors";

import { runMigrations } from "./db";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { resolvers, typeDefs } from "./graphql";
import { createContext } from "./context";
import { seed } from "./scripts/seed";

const bootstrapServer = async () => {
  const port = process.env.PORT || 4000;
  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use(cors());
  app.use(express.json());

  app.get("/ping", (_req, res) => {
    res.send("pong");
  });

  app.post("/seed", async (_req, res) => {
    console.log("running seed");
    await runMigrations();
    seed()
      .then(() => {
        return res.send("database seeded successfully");
      })
      .catch((error) => {
        return res.send(`Error seeding data: ${error}`);
      });
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
