import { Request, Response } from "express";
import { prisma } from "../utils/prisma";
import { asyncHandler } from "../utils/asyncHandler";
import { createError } from "../middleware/errorHandler";

// Get cart for user
export const getCart = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.id;

    let cart = await prisma.cart.findUnique({
        where: { userId },
        include: {
            items: {
                include: { jersey: true },
            },
        },
    });

    // Create cart if doesn't exist
    if (!cart) {
        cart = await prisma.cart.create({
            data: { userId },
            include: {
                items: {
                    include: { jersey: true },
                },
            },
        });
    }

    // Calculate totals
    const subtotal = cart.items.reduce(
        (sum, item) => sum + Number(item.jersey.price) * item.quantity,
        0
    );

    res.json({
        success: true,
        data: {
            ...cart,
            subtotal,
            itemCount: cart.items.reduce((sum, item) => sum + item.quantity, 0),
        },
    });
});

// Add item to cart
export const addToCart = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const { jerseyId, quantity = 1 } = req.body;

    if (!jerseyId) {
        throw createError("Jersey ID is required", 400);
    }

    // Get or create cart
    let cart = await prisma.cart.findUnique({
        where: { userId },
    });

    if (!cart) {
        cart = await prisma.cart.create({
            data: { userId },
        });
    }

    // Check if item already in cart
    const existingItem = await prisma.cartItem.findUnique({
        where: {
            cartId_jerseyId: {
                cartId: cart.id,
                jerseyId: parseInt(jerseyId),
            },
        },
    });

    let cartItem;
    if (existingItem) {
        // Update quantity
        cartItem = await prisma.cartItem.update({
            where: { id: existingItem.id },
            data: { quantity: existingItem.quantity + quantity },
            include: { jersey: true },
        });
    } else {
        // Add new item
        cartItem = await prisma.cartItem.create({
            data: {
                cartId: cart.id,
                jerseyId: parseInt(jerseyId),
                quantity,
            },
            include: { jersey: true },
        });
    }

    res.status(201).json({
        success: true,
        data: cartItem,
        message: "Item added to cart",
    });
});

// Update cart item quantity
export const updateCartItem = asyncHandler(async (req: Request, res: Response) => {
    const { quantity } = req.body;
    const itemId = req.params.id;

    if (quantity <= 0) {
        // Remove item if quantity is 0 or less
        await prisma.cartItem.delete({
            where: { id: itemId },
        });

        return res.json({
            success: true,
            message: "Item removed from cart",
        });
    }

    const cartItem = await prisma.cartItem.update({
        where: { id: itemId },
        data: { quantity },
        include: { jersey: true },
    });

    res.json({
        success: true,
        data: cartItem,
    });
});

// Remove item from cart
export const removeFromCart = asyncHandler(async (req: Request, res: Response) => {
    const itemId = req.params.id;

    await prisma.cartItem.delete({
        where: { id: itemId },
    });

    res.json({
        success: true,
        message: "Item removed from cart",
    });
});

// Clear cart
export const clearCart = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.id;

    const cart = await prisma.cart.findUnique({
        where: { userId },
    });

    if (cart) {
        await prisma.cartItem.deleteMany({
            where: { cartId: cart.id },
        });
    }

    res.json({
        success: true,
        message: "Cart cleared",
    });
});
