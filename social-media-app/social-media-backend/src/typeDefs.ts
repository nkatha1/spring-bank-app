import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  # User type (represents a user in the system)
  type User {
    id: Int!
    email: String!
    name: String
    posts: [Post!]!
    followers: [User!]!
    following: [User!]!
  }

  # Post type (represents a post made by a user)
  type Post {
    id: Int!
    content: String!
    createdAt: String!
    user: User!
    likes: Int!
  }

  # Like type (to handle the likes on posts)
  type Like {
    id: Int!
    user: User!
    post: Post!
  }

  # Query type (for fetching data)
  type Query {
    me: User
    getUser(id: Int!): User
    getPosts: [Post!]!
    getPost(id: Int!): Post
    getUserPosts(userId: Int!): [Post!]!
    getUserFollowers(userId: Int!): [User!]!
    getUserFollowing(userId: Int!): [User!]!
  }

  # Mutation type (for modifying data)
  type Mutation {
    register(email: String!, password: String!, name: String): User!
    login(email: String!, password: String!): String!  # Returns a JWT token
    createPost(content: String!): Post!
    likePost(postId: Int!): Like!
    followUser(followingId: Int!): String!
    unfollowUser(followingId: Int!): String!
  }
`;