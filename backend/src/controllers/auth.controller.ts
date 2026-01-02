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

// Admin login
export const adminLogin = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw createError("Email and password are required", 400);
    }

    // Find user by email
    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        throw createError("Invalid credentials", 401);
    }

    // Check if user is admin
    if (user.role !== "ADMIN") {
        throw createError("Access denied. Admin only.", 403);
    }

    // Check password (simple comparison for now - in production use bcrypt)
    if (user.password !== password) {
        throw createError("Invalid credentials", 401);
    }

    res.json({
        success: true,
        data: {
            id: user.id,
            email: user.email,
            companyName: user.companyName,
            role: user.role,
        },
        message: "Login successful",
    });
});

