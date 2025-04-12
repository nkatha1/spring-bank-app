import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    me: async (_: any, __: any, { userId }: { userId: number }) => {
      if (!userId) throw new Error('Not authenticated');
      return await prisma.user.findUnique({
        where: { id: userId },
        include: { posts: true, followers: true, following: true }
      });
    },
    getUser: async (_: any, { id }: { id: number }) => {
      return await prisma.user.findUnique({
        where: { id },
        include: { posts: true, followers: true, following: true }
      });
    },
    getPosts: async () => {
      return await prisma.post.findMany({
        include: { user: true }
      });
    },
    getPost: async (_: any, { id }: { id: number }) => {
      return await prisma.post.findUnique({
        where: { id },
        include: { user: true }
      });
    },
    getUserPosts: async (_: any, { userId }: { userId: number }) => {
      return await prisma.post.findMany({
        where: { userId },
        include: { user: true }
      });
    },
    getUserFollowers: async (_: any, { userId }: { userId: number }) => {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { followers: true }
      });
      return user?.followers;
    },
    getUserFollowing: async (_: any, { userId }: { userId: number }) => {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { following: true }
      });
      return user?.following;
    }
  },

  Mutation: {
    register: async (_: any, { email, password, name }: { email: string, password: string, name?: string }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name
        }
      });
      return newUser;
    },

    login: async (_: any, { email, password }: { email: string, password: string }) => {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) throw new Error('User not found');

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) throw new Error('Invalid credentials');

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
      return token;
    },

    createPost: async (_: any, { content }: { content: string }, { userId }: { userId: number }) => {
      if (!userId) throw new Error('Not authenticated');

      const newPost = await prisma.post.create({
        data: {
          content,
          userId
        }
      });
      return newPost;
    },

    likePost: async (_: any, { postId }: { postId: number }, { userId }: { userId: number }) => {
      if (!userId) throw new Error('Not authenticated');

      const existingLike = await prisma.like.findUnique({
        where: { userId_postId: { userId, postId } }
      });

      if (existingLike) throw new Error('You already liked this post');

      const like = await prisma.like.create({
        data: {
          postId,
          userId
        }
      });
      return like;
    },

    followUser: async (_: any, { followingId }: { followingId: number }, { userId }: { userId: number }) => {
      if (!userId) throw new Error('Not authenticated');

      const existingFollow = await prisma.follow.findUnique({
        where: { followerId_followingId: { followerId: userId, followingId } }
      });

      if (existingFollow) throw new Error('Already following this user');

      await prisma.follow.create({
        data: {
          followerId: userId,
          followingId
        }
      });
      return 'Followed successfully';
    },

    unfollowUser: async (_: any, { followingId }: { followingId: number }, { userId }: { userId: number }) => {
      if (!userId) throw new Error('Not authenticated');

      await prisma.follow.delete({
        where: {
          followerId_followingId: { followerId: userId, followingId }
        }
      });
      return 'Unfollowed successfully';
    }
  },

  Post: {
    likes: async (parent: { id: number }) => {
      const likes = await prisma.like.count({
        where: { postId: parent.id }
      });
      return likes;
    }
  }
};