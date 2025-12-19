import { Request, Response } from "express";
import { prisma } from "../utils/prisma";
import { asyncHandler } from "../utils/asyncHandler";
import { createError } from "../middleware/errorHandler";

// Register user (used during checkout)
export const registerUser = asyncHandler(async (req: Request, res: Response) => {
    const { companyName, email, phone } = req.body;

    if (!companyName || !email || !phone) {
        throw createError("Company name, email, and phone are required", 400);
    }

    // Check if user exists
    let user = await prisma.user.findUnique({
        where: { email },
    });

    if (user) {
        // Return existing user
        return res.json({
            success: true,
            data: user,
            message: "User found",
        });
    }

    // Create new user
    user = await prisma.user.create({
        data: {
            companyName,
            email,
            phone,
            role: "USER",
        },
    });

    res.status(201).json({
        success: true,
        data: user,
        message: "User registered successfully",
    });
});

// Get user by ID
export const getUser = asyncHandler(async (req: Request, res: Response) => {
    const user = await prisma.user.findUnique({
        where: { id: req.params.id },
        include: {
            orders: {
                include: {
                    items: {
                        include: { jersey: true },
                    },
                    payment: true,
                },
            },
        },
    });

    if (!user) {
        throw createError("User not found", 404);
    }

    res.json({
        success: true,
        data: user,
    });
});
