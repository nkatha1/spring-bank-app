// server.ts
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { PrismaClient } from '@prisma/client';
import { gql } from 'graphql-tag';

const prisma = new PrismaClient();

// GraphQL Schema Definition
const typeDefs = gql`
  type User {
    id: Int!
    username: String!
    email: String!
    posts: [Post!]!
  }

  type Post {
    id: Int!
    content: String!
    user: User!
    createdAt: String!
  }

  type Query {
    allPosts: [Post!]!
    userProfile(id: Int!): User
  }

  type Mutation {
    createPost(userId: Int!, content: String!): Post!
  }
`;

// Resolvers
const resolvers = {
  Query: {
    allPosts: async () => {
      return await prisma.post.findMany({
        include: { user: true },
        orderBy: { createdAt: 'desc' },
      });
    },
    userProfile: async (_: any, args: { id: number }) => {
      return await prisma.user.findUnique({
        where: { id: args.id },
        include: { posts: true },
      });
    },
  },
  Mutation: {
    createPost: async (_: any, args: { userId: number; content: string }) => {
      return await prisma.post.create({
        data: {
          content: args.content,
          user: { connect: { id: args.userId } },
        },
        include: { user: true },
      });
    },
  },
  Post: {
    user: async (parent: any) => {
      return await prisma.user.findUnique({
        where: { id: parent.userId },
      });
    },
  },
  User: {
    posts: async (parent: any) => {
      return await prisma.post.findMany({
        where: { userId: parent.id },
      });
    },
  },
};

// Start Apollo Server
const startServer = async () => {
  const server = new ApolloServer({ typeDefs, resolvers });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀 Server ready at ${url}`);
};

startServer();