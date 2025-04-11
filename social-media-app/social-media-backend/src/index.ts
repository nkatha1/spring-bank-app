import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import dotenv from 'dotenv';
import { gql } from 'apollo-server-express';
import { authResolvers } from './authResolvers';  // Assuming your resolvers are correctly imported
import { loadFiles } from '@graphql-tools/load-files';  // Importing the loadFiles function
import { mergeTypeDefs } from '@graphql-tools/merge';  // Importing the mergeTypeDefs function

dotenv.config();

const app: express.Application = express();

// Load the GraphQL schema from the .graphql file
// Make sure you use async/await properly here since loading files is async
const loadGraphQLSchema = async () => {
  const files = await loadFiles('./src/schema.graphql');
  return mergeTypeDefs(files);
};

const startServer = async () => {
  // Ensure the GraphQL schema is loaded
  const typeDefs = await loadGraphQLSchema();

  // Apollo Server Setup
  const server = new ApolloServer({
    typeDefs,
    resolvers: authResolvers,  // Use the resolvers imported
    context: ({ req }) => {
      // Optional auth middleware logic (you can implement authentication logic here)
      return { req };
    },
  });

  // Apply Apollo middleware to the Express app
  await server.start();  // Ensure the Apollo Server is started
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });
};

startServer();