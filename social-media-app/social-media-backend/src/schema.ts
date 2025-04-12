import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type User {
    id: Int!
    email: String!
    name: String
    posts: [Post!]!
    followers: [Follow!]!
    following: [Follow!]!
  }

  type Post {
    id: Int!
    content: String!
    user: User!
    likes: Int!
  }

  type Follow {
    id: Int!
    followerId: Int!
    followingId: Int!
  }

  type Query {
    me: User
    getUser(id: Int!): User
    getPosts: [Post!]!
    getPost(id: Int!): Post
    getUserPosts(userId: Int!): [Post!]!
    getUserFollowers(userId: Int!): [Follow!]!
    getUserFollowing(userId: Int!): [Follow!]!
  }

  type Mutation {
    register(email: String!, password: String!, name: String): User!
    login(email: String!, password: String!): String!
    createPost(content: String!): Post!
    likePost(postId: Int!): String!
    followUser(followingId: Int!): String!
    unfollowUser(followingId: Int!): String!
  }
`;