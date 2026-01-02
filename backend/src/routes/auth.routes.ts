import { Router } from "express";
import { registerUser, getUser, adminLogin } from "../controllers/auth.controller";

const router = Router();

// POST /api/auth/register - Register user during checkout
router.post("/register", registerUser);

// POST /api/auth/admin/login - Admin login
router.post("/admin/login", adminLogin);

// GET /api/auth/users/:id - Get user by ID
router.get("/users/:id", getUser);

export default router;

