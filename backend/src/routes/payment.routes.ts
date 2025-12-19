import { Router } from "express";
import { processPayment, getPaymentById } from "../controllers/payment.controller";

const router = Router();

// POST /api/payments - Process payment
router.post("/", processPayment);

// GET /api/payments/:id - Get payment by ID
router.get("/:id", getPaymentById);

export default router;
