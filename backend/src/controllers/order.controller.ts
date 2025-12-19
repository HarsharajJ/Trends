import { Request, Response } from "express";
import { prisma } from "../utils/prisma";
import { asyncHandler } from "../utils/asyncHandler";
import { createError } from "../middleware/errorHandler";

// Create order from cart
export const createOrder = asyncHandler(async (req: Request, res: Response) => {
    const { companyName, email, phone } = req.body;

    if (!companyName || !email || !phone) {
        throw createError("Company name, email, and phone are required", 400);
    }

    // Find or create user
    let user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        user = await prisma.user.create({
            data: { companyName, email, phone, role: "USER" },
        });
    }

    // Get user's cart
    const cart = await prisma.cart.findUnique({
        where: { userId: user.id },
        include: {
            items: {
                include: { jersey: true },
            },
        },
    });

    if (!cart || cart.items.length === 0) {
        throw createError("Cart is empty", 400);
    }

    // Calculate totals
    const subtotal = cart.items.reduce(
        (sum, item) => sum + Number(item.jersey.price) * item.quantity,
        0
    );
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + tax;

    // Create order with items
    const order = await prisma.order.create({
        data: {
            userId: user.id,
            status: "PENDING",
            subtotal,
            tax,
            total,
            items: {
                create: cart.items.map((item) => ({
                    jerseyId: item.jerseyId,
                    quantity: item.quantity,
                    price: item.jersey.price,
                })),
            },
        },
        include: {
            items: {
                include: { jersey: true },
            },
            user: true,
        },
    });

    // Clear cart after order creation
    await prisma.cartItem.deleteMany({
        where: { cartId: cart.id },
    });

    res.status(201).json({
        success: true,
        data: order,
        message: "Order created successfully",
    });
});

// Get order by ID (with download links if paid)
export const getOrderById = asyncHandler(async (req: Request, res: Response) => {
    const order = await prisma.order.findUnique({
        where: { id: req.params.id },
        include: {
            items: {
                include: {
                    jersey: {
                        select: {
                            id: true,
                            name: true,
                            player: true,
                            image: true,
                            price: true,
                            // Only include downloadUrl if order is paid
                            downloadUrl: true,
                        },
                    },
                },
            },
            payment: true,
            user: true,
        },
    });

    if (!order) {
        throw createError("Order not found", 404);
    }

    // Hide download URLs if not paid
    const responseData = {
        ...order,
        items: order.items.map((item) => ({
            ...item,
            jersey: {
                ...item.jersey,
                downloadUrl: order.status === "PAID" ? item.jersey.downloadUrl : undefined,
            },
        })),
    };

    res.json({
        success: true,
        data: responseData,
    });
});

// Get user's orders
export const getUserOrders = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.id;

    const orders = await prisma.order.findMany({
        where: { userId },
        include: {
            items: {
                include: { jersey: true },
            },
            payment: true,
        },
        orderBy: { createdAt: "desc" },
    });

    res.json({
        success: true,
        data: orders,
    });
});
