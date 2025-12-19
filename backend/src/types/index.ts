import { Request } from "express";

// API Response types
export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
}

// Pagination params
export interface PaginationParams {
    page?: number;
    limit?: number;
}

// Cart item input
export interface CartItemInput {
    jerseyId: number;
    quantity: number;
}

// Order input
export interface CreateOrderInput {
    companyName: string;
    email: string;
    phone: string;
}

// Payment input
export interface PaymentInput {
    orderId: string;
    method: string;
    transactionId?: string;
}

// Jersey filter params
export interface JerseyFilterParams extends PaginationParams {
    categoryId?: string;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
}
