import express from "express";
import { createComment, getComments, deleteComment } from "../controllers/commentController";

const router = express.Router();

// Route to create a comment
router.post("/comment", createComment);

// Route to get comments for a specific post
router.get("/comments/:postId", getComments);

// Route to delete a comment
router.delete("/comment/:commentId", deleteComment);

export default router;