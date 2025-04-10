import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Follow a user
export const followUser = async (req: Request, res: Response) => {
  const { followerId, followingId } = req.body;

  try {
    // Check if the follower and following users exist
    const follower = await prisma.user.findUnique({ where: { id: followerId } });
    const following = await prisma.user.findUnique({ where: { id: followingId } });

    if (!follower || !following) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the user is already following
    const existingFollow = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: followerId,
          followingId: followingId,
        },
      },
    });

    if (existingFollow) {
      return res.status(400).json({ error: "You are already following this user" });
    }

    // Create a new follow relationship
    const follow = await prisma.follow.create({
      data: {
        followerId: followerId,
        followingId: followingId,
      },
    });

    return res.status(200).json(follow);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Unfollow a user
export const unfollowUser = async (req: Request, res: Response) => {
  const { followerId, followingId } = req.body;

  try {
    // Check if the follower and following users exist
    const follower = await prisma.user.findUnique({ where: { id: followerId } });
    const following = await prisma.user.findUnique({ where: { id: followingId } });

    if (!follower || !following) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the follow relationship exists
    const existingFollow = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: followerId,
          followingId: followingId,
        },
      },
    });

    if (!existingFollow) {
      return res.status(400).json({ error: "You are not following this user" });
    }

    // Delete the follow relationship
    await prisma.follow.delete({
      where: {
        followerId_followingId: {
          followerId: followerId,
          followingId: followingId,
        },
      },
    });

    return res.status(200).json({ message: "Unfollowed successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};