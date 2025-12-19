import { Request, Response } from "express";
import { prisma } from "../utils/prisma";
import { asyncHandler } from "../utils/asyncHandler";
import { createError } from "../middleware/errorHandler";

// Get all categories
export const getAllCategories = asyncHandler(async (_req: Request, res: Response) => {
    const categories = await prisma.category.findMany({
        include: {
            _count: {
                select: { jerseys: true },
            },
        },
    });

    res.json({
        success: true,
        data: categories,
    });
});

// Get category by ID
export const getCategoryById = asyncHandler(async (req: Request, res: Response) => {
    const category = await prisma.category.findUnique({
        where: { id: req.params.id },
        include: {
            jerseys: true,
        },
    });

    if (!category) {
        throw createError("Category not found", 404);
    }

    res.json({
        success: true,
        data: category,
    });
});

// Create category (admin only)
export const createCategory = asyncHandler(async (req: Request, res: Response) => {
    const { id, name, image, description } = req.body;

    if (!id || !name || !image || !description) {
        throw createError("All fields are required", 400);
    }

    const category = await prisma.category.create({
        data: { id, name, image, description },
    });

    res.status(201).json({
        success: true,
        data: category,
    });
});
