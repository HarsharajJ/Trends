import { Router } from "express";
import {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
} from "../controllers/cart.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

// All cart routes require authentication
router.use(authenticate);

// GET /api/cart - Get user's cart
router.get("/", getCart);

// POST /api/cart/items - Add item to cart
router.post("/items", addToCart);

// PATCH /api/cart/items/:id - Update cart item quantity
router.patch("/items/:id", updateCartItem);

// DELETE /api/cart/items/:id - Remove item from cart
router.delete("/items/:id", removeFromCart);

// DELETE /api/cart - Clear entire cart
router.delete("/", clearCart);

export default router;
