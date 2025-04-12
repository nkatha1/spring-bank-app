"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = exports.typeDefs = void 0;
const apollo_server_express_1 = require("apollo-server-express");
// Define the GraphQL schema (type definitions)
exports.typeDefs = (0, apollo_server_express_1.gql) `
  type Query {
    hello: String
  }
`;
// Define the resolvers for the schema
exports.resolvers = {
    Query: {
        hello: () => 'Hello, world!', // Resolver for the 'hello' query
    },
};
//# sourceMappingURL=graphql.js.map