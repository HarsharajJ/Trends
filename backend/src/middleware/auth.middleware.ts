import { Request, Response, NextFunction } from "express";
import { prisma } from "../utils/prisma";
import { createError } from "./errorHandler";

// Extend Express Request to include user
declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                email: string;
                role: "USER" | "ADMIN";
            };
        }
    }
}

// Simple auth middleware (for now just checks userId header)
// In production, use JWT or session-based auth
export const authenticate = async (
    req: Request,
    _res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.headers["x-user-id"] as string;

        if (!userId) {
            throw createError("Authentication required", 401);
        }

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { id: true, email: true, role: true },
        });

        if (!user) {
            throw createError("User not found", 401);
        }

        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
};

// Admin only middleware
export const adminOnly = (req: Request, _res: Response, next: NextFunction) => {
    if (req.user?.role !== "ADMIN") {
        return next(createError("Admin access required", 403));
    }
    next();
};
