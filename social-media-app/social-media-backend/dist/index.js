"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const typeDefs_1 = require("./typeDefs"); // Ensure these paths are correct
const resolvers_1 = require("./resolvers"); // Ensure these paths are correct
const app = (0, express_1.default)();
const server = new apollo_server_express_1.ApolloServer({
    typeDefs: typeDefs_1.typeDefs,
    resolvers: resolvers_1.resolvers,
});
// Wait for the server to start before applying the middleware
server.start().then(() => {
    server.applyMiddleware({ app });
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => console.log(`🚀 Server is running at http://localhost:${PORT}${server.graphqlPath}`));
});
//# sourceMappingURL=index.js.map