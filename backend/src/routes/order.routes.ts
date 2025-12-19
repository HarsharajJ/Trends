import { Router } from "express";
import {
    createOrder,
    getOrderById,
    getUserOrders,
} from "../controllers/order.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

// POST /api/orders - Create order (checkout)
router.post("/", createOrder);

// GET /api/orders/:id - Get order by ID
router.get("/:id", getOrderById);

// GET /api/orders - Get user's orders (requires auth)
router.get("/", authenticate, getUserOrders);

export default router;
