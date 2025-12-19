import { Router } from "express";
import {
    getAllCategories,
    getCategoryById,
    createCategory,
} from "../controllers/category.controller";
import { authenticate, adminOnly } from "../middleware/auth.middleware";

const router = Router();

// GET /api/categories - Get all categories
router.get("/", getAllCategories);

// GET /api/categories/:id - Get category by ID
router.get("/:id", getCategoryById);

// POST /api/categories - Create category (admin only)
router.post("/", authenticate, adminOnly, createCategory);

export default router;
