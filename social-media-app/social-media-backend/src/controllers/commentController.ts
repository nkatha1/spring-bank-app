// Create Comment
export const createComment = async (req: Request, res: Response) => {
    const { postId, text } = req.body;
    const { userId } = req.user; // From JWT
  
    try {
      const newComment = await prisma.comment.create({
        data: {
          text,
          userId,
          postId,
        },
      });
      res.status(201).json(newComment);
    } catch (error) {
      res.status(500).json({ error: "Error creating comment" });
    }
  };  