import express from "express";
import { createPost, getPosts } from "../controllers/postController";
import { authenticate } from "../middleware/authMiddleware"; // To protect routes

const router = express.Router();

router.post("/", authenticate, createPost); // Protect create post route
router.get("/", getPosts); // Get posts (public)

export default router;