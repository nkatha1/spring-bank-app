import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { createToken } from './utils/auth';

const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    me: async (_: any, __: any, { user }: any) => {
      if (!user) throw new Error('Not Authenticated');
      return prisma.user.findUnique({ where: { id: user.userId } });
    },
    feed: async (_: any, __: any, { user }: any) => {
      if (!user) throw new Error('Not Authenticated');
      // Fetch posts by people user follows
      const following = await prisma.follows.findMany({
        where: { followerId: user.userId },
        select: { followingId: true },
      });

      const followingIds = following.map((f) => f.followingId);

      return prisma.post.findMany({
        where: {
          authorId: { in: followingIds },
        },
        include: {
          author: true,
          likes: true,
        },
        orderBy: { createdAt: 'desc' },
      });
    },
    user: (_: any, { id }: any) => prisma.user.findUnique({ where: { id } }),
  },

  Mutation: {
    register: async (_: any, args: any) => {
      const { username, email, password } = args;
      const hashed = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: { username, email, password: hashed },
      });
      const token = createToken(user);
      return { token, user };
    },

    login: async (_: any, { email, password }: any) => {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) throw new Error('No user found');
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) throw new Error('Invalid password');
      const token = createToken(user);
      return { token, user };
    },

    createPost: async (_: any, { content }: any, { user }: any) => {
      if (!user) throw new Error('Not Authenticated');
      return prisma.post.create({
        data: { content, authorId: user.userId },
        include: { author: true },
      });
    },

    toggleLike: async (_: any, { postId }: any, { user }: any) => {
      if (!user) throw new Error('Not Authenticated');
      const existing = await prisma.like.findUnique({
        where: {
          userId_postId: {
            userId: user.userId,
            postId,
          },
        },
      });

      if (existing) {
        await prisma.like.delete({ where: { id: existing.id } });
      } else {
        await prisma.like.create({
          data: { userId: user.userId, postId },
        });
      }

      return prisma.post.findUnique({
        where: { id: postId },
        include: { author: true, likes: true },
      });
    },

    follow: async (_: any, { userId }: any, { user }: any) => {
      if (!user) throw new Error('Not Authenticated');
      await prisma.follows.create({
        data: {
          followerId: user.userId,
          followingId: userId,
        },
      });
      return prisma.user.findUnique({ where: { id: userId } });
    },

    unfollow: async (_: any, { userId }: any, { user }: any) => {
      if (!user) throw new Error('Not Authenticated');
      await prisma.follows.delete({
        where: {
          followerId_followingId: {
            followerId: user.userId,
            followingId: userId,
          },
        },
      });
      return prisma.user.findUnique({ where: { id: userId } });
    },
  },

  Post: {
    likes: (parent: any) =>
      prisma.like
        .findMany({
          where: { postId: parent.id },
          include: { user: true },
        })
        .then((likes) => likes.map((like) => like.user)),
  },

  User: {
    posts: (parent: any) => prisma.post.findMany({ where: { authorId: parent.id } }),
    followers: (parent: any) =>
      prisma.follows
        .findMany({ where: { followingId: parent.id }, include: { follower: true } })
        .then((f) => f.map((r) => r.follower)),
    following: (parent: any) =>
      prisma.follows
        .findMany({ where: { followerId: parent.id }, include: { following: true } })
        .then((f) => f.map((r) => r.following)),
  },
};