// Like Post
export const likePost = async (req: Request, res: Response) => {
    const { postId } = req.body;
    const { userId } = req.user; // From JWT
  
    try {
      const existingLike = await prisma.like.findUnique({
        where: {
          userId_postId: { userId, postId },
        },
      });
  
      if (existingLike) {
        return res.status(400).json({ error: "Post already liked" });
      }
  
      const newLike = await prisma.like.create({
        data: {
          userId,
          postId,
        },
      });
      res.status(201).json(newLike);
    } catch (error) {
      res.status(500).json({ error: "Error liking post" });
    }
  };  