import express from "express";
import { registerUser, loginUser } from "../controllers/authController";

const router = express.Router();

// POST request to register a new user
router.post("/register", registerUser);

// POST request to login an existing user
router.post("/login", loginUser);

export default router;