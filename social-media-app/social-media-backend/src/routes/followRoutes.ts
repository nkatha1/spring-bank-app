export const followUser = async (req: Request, res: Response) => {
    const { followingId } = req.body;
    const { userId } = req.user; // From JWT
  
    try {
      const existingFollow = await prisma.follow.findUnique({
        where: {
          followerId_followingId: { followerId: userId, followingId },
        },
      });
  
      if (existingFollow) {
        return res.status(400).json({ error: "Already following this user" });
      }
  
      const newFollow = await prisma.follow.create({
        data: {
          followerId: userId,
          followingId,
        },
      });
  
      res.status(201).json(newFollow);
    } catch (error) {
      res.status(500).json({ error: "Error following user" });
    }
  };  