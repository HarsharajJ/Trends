import { Router } from "express";
import {
    getAllJerseys,
    getJerseyById,
    createJersey,
    updateJersey,
    deleteJersey,
} from "../controllers/jersey.controller";
import { authenticate, adminOnly } from "../middleware/auth.middleware";

const router = Router();

// GET /api/jerseys - Get all jerseys (with filters)
router.get("/", getAllJerseys);

// GET /api/jerseys/:id - Get jersey by ID
router.get("/:id", getJerseyById);

// POST /api/jerseys - Create jersey (admin only)
router.post("/", authenticate, adminOnly, createJersey);

// PATCH /api/jerseys/:id - Update jersey (admin only)
router.patch("/:id", authenticate, adminOnly, updateJersey);

// DELETE /api/jerseys/:id - Delete jersey (admin only)
router.delete("/:id", authenticate, adminOnly, deleteJersey);

export default router;
