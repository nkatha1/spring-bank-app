import { gql } from 'apollo-server-express';

// Define the GraphQL schema (type definitions)
export const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Define the resolvers for the schema
export const resolvers = {
  Query: {
    hello: () => 'Hello, world!', // Resolver for the 'hello' query
  },
};