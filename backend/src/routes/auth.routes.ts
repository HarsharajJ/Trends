import { Router } from "express";
import { registerUser, getUser } from "../controllers/auth.controller";

const router = Router();

// POST /api/auth/register - Register user during checkout
router.post("/register", registerUser);

// GET /api/auth/users/:id - Get user by ID
router.get("/users/:id", getUser);

export default router;
