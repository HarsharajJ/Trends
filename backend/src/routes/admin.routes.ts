import { Router } from "express";
import {
    getAllOrders,
    getAllPayments,
    getAllUsers,
    getDashboardStats,
} from "../controllers/admin.controller";
import {
    createJersey,
    updateJersey,
    deleteJersey,
} from "../controllers/jersey.controller";
import { createCategory } from "../controllers/category.controller";
import { authenticate, adminOnly } from "../middleware/auth.middleware";

const router = Router();

// All admin routes require authentication and admin role
router.use(authenticate, adminOnly);

// GET /api/admin/dashboard - Dashboard stats
router.get("/dashboard", getDashboardStats);

// GET /api/admin/orders - Get all orders
router.get("/orders", getAllOrders);

// GET /api/admin/payments - Get all payments
router.get("/payments", getAllPayments);

// GET /api/admin/users - Get all users
router.get("/users", getAllUsers);

// Jersey management
router.post("/jerseys", createJersey);
router.patch("/jerseys/:id", updateJersey);
router.delete("/jerseys/:id", deleteJersey);

// Category management
router.post("/categories", createCategory);

export default router;
