import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    posts: [Post!]!
    followers: [User!]!
    following: [User!]!
  }

  type Post {
    id: ID!
    content: String!
    createdAt: String!
    author: User!
    likes: [User!]!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    me: User
    feed: [Post!]!
    user(id: ID!): User
  }

  type Mutation {
    register(username: String!, email: String!, password: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    createPost(content: String!): Post!
    toggleLike(postId: ID!): Post!
    follow(userId: ID!): User!
    unfollow(userId: ID!): User!
  }
`;