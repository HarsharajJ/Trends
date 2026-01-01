import {
    Category,
    CategoryWithJerseys,
    Jersey,
    JerseysResponse,
    ApiResponse,
    CreateOrderRequest,
    Order
} from "./types"

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

class ApiError extends Error {
    constructor(public status: number, message: string) {
        super(message)
        this.name = "ApiError"
    }
}

async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${API_BASE}${endpoint}`

    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            ...options?.headers,
        },
        ...options,
    })

    if (!response.ok) {
        const error = await response.json().catch(() => ({ message: "Request failed" }))
        throw new ApiError(response.status, error.message || "Request failed")
    }

    return response.json()
}

// ============================================
// Categories
// ============================================

export async function getCategories(): Promise<Category[]> {
    const response = await fetchApi<ApiResponse<Category[]>>("/categories")
    return response.data
}

export async function getCategoryById(id: string): Promise<CategoryWithJerseys> {
    const response = await fetchApi<ApiResponse<CategoryWithJerseys>>(`/categories/${id}`)
    return response.data
}

// ============================================
// Jerseys
// ============================================

interface GetJerseysParams {
    categoryId?: string
    search?: string
    minPrice?: number
    maxPrice?: number
    page?: number
    limit?: number
}

export async function getJerseys(params?: GetJerseysParams): Promise<JerseysResponse> {
    const searchParams = new URLSearchParams()

    if (params?.categoryId) searchParams.set("categoryId", params.categoryId)
    if (params?.search) searchParams.set("search", params.search)
    if (params?.minPrice) searchParams.set("minPrice", params.minPrice.toString())
    if (params?.maxPrice) searchParams.set("maxPrice", params.maxPrice.toString())
    if (params?.page) searchParams.set("page", params.page.toString())
    if (params?.limit) searchParams.set("limit", params.limit.toString())

    const query = searchParams.toString()
    const endpoint = query ? `/jerseys?${query}` : "/jerseys"

    return fetchApi<JerseysResponse>(endpoint)
}

export async function getJerseyById(id: number): Promise<Jersey> {
    const response = await fetchApi<ApiResponse<Jersey>>(`/jerseys/${id}`)
    return response.data
}

// ============================================
// Orders
// ============================================

export async function createOrder(data: CreateOrderRequest): Promise<Order> {
    const response = await fetchApi<ApiResponse<Order>>("/orders", {
        method: "POST",
        body: JSON.stringify(data),
    })
    return response.data
}

export { ApiError }
