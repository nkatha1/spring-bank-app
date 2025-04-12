import express from 'express';
import { ApolloServer } from '@apollo/server';  // Apollo Server 4.x import
import { typeDefs } from './schema';  // Assuming you have your schema exported here
import { resolvers } from './resolvers';  // Assuming you have resolvers defined
import { PrismaClient } from '@prisma/client';
import { json } from 'express';  // To handle JSON requests

// Initialize Prisma Client
const prisma = new PrismaClient();

// Initialize Express App
const app = express();

// Initialize Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Start the Apollo Server and apply middleware to Express
async function startServer() {
  await server.start(); // Start Apollo Server
  
  // Apply Apollo server handler as middleware
  app.use(json());  // Middleware to handle JSON requests

  // Apollo Server v4 requires using createHandler
  app.use('/graphql', server.createHandler());  // Use the createHandler method

  // Listen on a specific port
  app.listen(4000, () => {
    console.log(`Server is running on http://localhost:4000/graphql`);
  });
}

// Call the startServer function
startServer();