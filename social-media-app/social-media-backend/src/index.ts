import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();

// Define your schema (this is a simple example for posts)
const typeDefs = gql`
  type Post {
    id: Int!
    content: String!
    createdAt: String!
    user: User!
  }

  type User {
    id: Int!
    username: String!
  }

  type Query {
    posts: [Post!]!
  }
`;

// Define resolvers to fetch data from Prisma
const resolvers = {
  Query: {
    posts: async () => {
      return await prisma.post.findMany({
        include: {
          user: true, // include user info along with the posts
        },
      });
    },
  },
};

// Create an Apollo Server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function startServer() {
  await server.start(); // Start Apollo Server

  // Apply middleware to integrate Apollo with Express
  server.applyMiddleware({ app });

  // Set up Express to listen on port 4000
  app.listen({ port: 4000 }, () =>
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
  );
}

// Run the server
startServer();