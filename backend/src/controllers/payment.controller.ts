import { Request, Response } from "express";
import { prisma } from "../utils/prisma";
import { asyncHandler } from "../utils/asyncHandler";
import { createError } from "../middleware/errorHandler";

// Process payment
export const processPayment = asyncHandler(async (req: Request, res: Response) => {
    const { orderId, method, transactionId } = req.body;

    if (!orderId || !method) {
        throw createError("Order ID and payment method are required", 400);
    }

    // Get order
    const order = await prisma.order.findUnique({
        where: { id: orderId },
        include: { payment: true },
    });

    if (!order) {
        throw createError("Order not found", 404);
    }

    if (order.payment) {
        throw createError("Payment already exists for this order", 400);
    }

    // Create payment record
    const payment = await prisma.payment.create({
        data: {
            orderId,
            method,
            transactionId,
            amount: order.total,
            status: "COMPLETED", // In real app, this would be PENDING until confirmed
        },
    });

    // Update order status to PAID
    await prisma.order.update({
        where: { id: orderId },
        data: { status: "PAID" },
    });

    // Get order with download links
    const paidOrder = await prisma.order.findUnique({
        where: { id: orderId },
        include: {
            items: {
                include: {
                    jersey: {
                        select: {
                            id: true,
                            name: true,
                            player: true,
                            image: true,
                            downloadUrl: true,
                        },
                    },
                },
            },
            payment: true,
            user: true,
        },
    });

    res.status(201).json({
        success: true,
        data: {
            payment,
            order: paidOrder,
            downloadLinks: paidOrder?.items.map((item) => ({
                jerseyId: item.jersey.id,
                name: item.jersey.name,
                downloadUrl: item.jersey.downloadUrl,
            })),
        },
        message: "Payment successful! Download links are now available.",
    });
});

// Get payment by ID
export const getPaymentById = asyncHandler(async (req: Request, res: Response) => {
    const payment = await prisma.payment.findUnique({
        where: { id: req.params.id },
        include: {
            order: {
                include: {
                    items: { include: { jersey: true } },
                    user: true,
                },
            },
        },
    });

    if (!payment) {
        throw createError("Payment not found", 404);
    }

    res.json({
        success: true,
        data: payment,
    });
});
