import { Request, Response } from "express";
import { prisma } from "../utils/prisma";
import { asyncHandler } from "../utils/asyncHandler";
import { createError } from "../middleware/errorHandler";

// Get all jerseys with filters
export const getAllJerseys = asyncHandler(async (req: Request, res: Response) => {
    const { categoryId, minPrice, maxPrice, search, page = 1, limit = 20 } = req.query;

    const where: any = {};

    if (categoryId) {
        where.categoryId = categoryId as string;
    }

    if (minPrice || maxPrice) {
        where.price = {};
        if (minPrice) where.price.gte = parseFloat(minPrice as string);
        if (maxPrice) where.price.lte = parseFloat(maxPrice as string);
    }

    if (search) {
        where.OR = [
            { name: { contains: search as string, mode: "insensitive" } },
            { player: { contains: search as string, mode: "insensitive" } },
        ];
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [jerseys, total] = await Promise.all([
        prisma.jersey.findMany({
            where,
            include: { category: true },
            skip,
            take: Number(limit),
            orderBy: { createdAt: "desc" },
        }),
        prisma.jersey.count({ where }),
    ]);

    res.json({
        success: true,
        data: jerseys,
        pagination: {
            page: Number(page),
            limit: Number(limit),
            total,
            totalPages: Math.ceil(total / Number(limit)),
        },
    });
});

// Get jersey by ID
export const getJerseyById = asyncHandler(async (req: Request, res: Response) => {
    const jersey = await prisma.jersey.findUnique({
        where: { id: parseInt(req.params.id) },
        include: { category: true },
    });

    if (!jersey) {
        throw createError("Jersey not found", 404);
    }

    res.json({
        success: true,
        data: jersey,
    });
});

// Create jersey (admin only)
export const createJersey = asyncHandler(async (req: Request, res: Response) => {
    const {
        name,
        player,
        price,
        originalPrice,
        image,
        downloadUrl,
        badge,
        badgeColor,
        categoryId,
    } = req.body;

    if (!name || !player || !price || !image || !downloadUrl || !categoryId) {
        throw createError("Required fields missing", 400);
    }

    const jersey = await prisma.jersey.create({
        data: {
            name,
            player,
            price,
            originalPrice,
            image,
            downloadUrl,
            badge,
            badgeColor,
            categoryId,
        },
        include: { category: true },
    });

    res.status(201).json({
        success: true,
        data: jersey,
    });
});

// Update jersey (admin only)
export const updateJersey = asyncHandler(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    const jersey = await prisma.jersey.update({
        where: { id },
        data: req.body,
        include: { category: true },
    });

    res.json({
        success: true,
        data: jersey,
    });
});

// Delete jersey (admin only)
export const deleteJersey = asyncHandler(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    await prisma.jersey.delete({
        where: { id },
    });

    res.json({
        success: true,
        message: "Jersey deleted",
    });
});
