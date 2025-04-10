import { Request, Response } from "express";
import { prisma } from "../prisma/client";

// Create Post
export const createPost = async (req: Request, res: Response) => {
  const { title, content } = req.body;
  const { userId } = req.user; // You’ll need to extract userId from JWT

  try {
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        userId,
      },
    });

    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: "Error creating post" });
  }
};

// Get All Posts
export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        user: true,
        comments: true,
        likes: true,
      },
    });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "Error fetching posts" });
  }
};