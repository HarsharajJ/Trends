import { Request, Response } from "express";
import { prisma } from "../utils/prisma";
import { asyncHandler } from "../utils/asyncHandler";

// Get all orders (admin)
export const getAllOrders = asyncHandler(async (req: Request, res: Response) => {
    const { status, page = 1, limit = 20 } = req.query;

    const where: any = {};
    if (status) {
        where.status = status;
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [orders, total] = await Promise.all([
        prisma.order.findMany({
            where,
            include: {
                user: true,
                items: { include: { jersey: true } },
                payment: true,
            },
            skip,
            take: Number(limit),
            orderBy: { createdAt: "desc" },
        }),
        prisma.order.count({ where }),
    ]);

    res.json({
        success: true,
        data: orders,
        pagination: {
            page: Number(page),
            limit: Number(limit),
            total,
            totalPages: Math.ceil(total / Number(limit)),
        },
    });
});

// Get all payments (admin)
export const getAllPayments = asyncHandler(async (req: Request, res: Response) => {
    const { status, page = 1, limit = 20 } = req.query;

    const where: any = {};
    if (status) {
        where.status = status;
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [payments, total] = await Promise.all([
        prisma.payment.findMany({
            where,
            include: {
                order: {
                    include: {
                        user: true,
                        items: { include: { jersey: true } },
                    },
                },
            },
            skip,
            take: Number(limit),
            orderBy: { createdAt: "desc" },
        }),
        prisma.payment.count({ where }),
    ]);

    res.json({
        success: true,
        data: payments,
        pagination: {
            page: Number(page),
            limit: Number(limit),
            total,
            totalPages: Math.ceil(total / Number(limit)),
        },
    });
});

// Get all users (admin)
export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
    const { page = 1, limit = 20 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const [users, total] = await Promise.all([
        prisma.user.findMany({
            include: {
                _count: { select: { orders: true } },
            },
            skip,
            take: Number(limit),
            orderBy: { createdAt: "desc" },
        }),
        prisma.user.count(),
    ]);

    res.json({
        success: true,
        data: users,
        pagination: {
            page: Number(page),
            limit: Number(limit),
            total,
            totalPages: Math.ceil(total / Number(limit)),
        },
    });
});

// Get dashboard stats (admin)
export const getDashboardStats = asyncHandler(async (_req: Request, res: Response) => {
    const [
        totalUsers,
        totalOrders,
        totalJerseys,
        recentOrders,
        recentPayments,
        ordersByStatus,
    ] = await Promise.all([
        prisma.user.count(),
        prisma.order.count(),
        prisma.jersey.count(),
        prisma.order.findMany({
            take: 5,
            orderBy: { createdAt: "desc" },
            include: { user: true, payment: true },
        }),
        prisma.payment.findMany({
            take: 5,
            orderBy: { createdAt: "desc" },
            include: { order: { include: { user: true } } },
        }),
        prisma.order.groupBy({
            by: ["status"],
            _count: true,
        }),
    ]);

    // Calculate revenue
    const totalRevenue = await prisma.payment.aggregate({
        where: { status: "COMPLETED" },
        _sum: { amount: true },
    });

    res.json({
        success: true,
        data: {
            stats: {
                totalUsers,
                totalOrders,
                totalJerseys,
                totalRevenue: totalRevenue._sum.amount || 0,
                ordersByStatus,
            },
            recentOrders,
            recentPayments,
        },
    });
});
