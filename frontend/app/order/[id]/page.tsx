"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { CheckCircle, Download, ArrowRight, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

interface OrderItem {
    id: string
    jerseyId: number
    quantity: number
    price: number
    jersey: {
        id: number
        name: string
        player: string
        image: string
        downloadUrl?: string
    }
}

interface Order {
    id: string
    status: string
    subtotal: number
    tax: number
    total: number
    items: OrderItem[]
    user: {
        companyName: string
        email: string
    }
    createdAt: string
}

export default function OrderConfirmationPage() {
    const params = useParams()
    const orderId = params.id as string
    const [order, setOrder] = useState<Order | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"
                const response = await fetch(`${API_BASE}/orders/${orderId}`)
                const data = await response.json()

                if (!response.ok) {
                    throw new Error(data.message || "Failed to fetch order")
                }

                setOrder(data.data)
            } catch (err: any) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchOrder()
    }, [orderId])

    if (loading) {
        return (
            <div className="min-h-screen bg-background pt-32 pb-16 px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <div className="animate-pulse space-y-6">
                        <div className="h-16 w-16 bg-secondary/50 rounded-full mx-auto" />
                        <div className="h-8 bg-secondary/50 rounded w-1/2 mx-auto" />
                        <div className="h-4 bg-secondary/50 rounded w-1/3 mx-auto" />
                    </div>
                </div>
            </div>
        )
    }

    if (error || !order) {
        return (
            <div className="min-h-screen bg-background pt-32 pb-16 px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <h1 className="font-[var(--font-oswald)] text-4xl font-bold text-foreground mb-4">
                        Order Not Found
                    </h1>
                    <p className="text-muted-foreground mb-8">{error || "The order could not be found."}</p>
                    <Link href="/">
                        <Button>Return Home</Button>
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background pt-32 pb-16 px-4">
            <div className="max-w-3xl mx-auto">
                {/* Success Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/20 mb-6">
                        <CheckCircle className="h-10 w-10 text-green-500" />
                    </div>
                    <h1 className="font-[var(--font-oswald)] text-4xl sm:text-5xl font-bold text-foreground mb-4">
                        ORDER CONFIRMED!
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        Thank you for your purchase, {order.user.companyName}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                        Order ID: <span className="font-mono text-foreground">{order.id}</span>
                    </p>
                </div>

                {/* Order Details Card */}
                <div className="bg-secondary/30 rounded-xl p-6 mb-8">
                    <div className="flex items-center gap-3 mb-6">
                        <Package className="h-5 w-5 text-primary" />
                        <h2 className="font-semibold text-lg text-foreground">Order Details</h2>
                    </div>

                    {/* Order Items */}
                    <div className="space-y-4 mb-6">
                        {order.items.map((item) => (
                            <div key={item.id} className="flex gap-4 p-4 bg-background/50 rounded-lg">
                                <div className="relative w-16 h-20 flex-shrink-0 rounded-md overflow-hidden bg-secondary">
                                    <Image
                                        src={item.jersey.image || "/placeholder.svg"}
                                        alt={item.jersey.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-foreground">{item.jersey.name}</h3>
                                    <p className="text-sm text-muted-foreground">{item.jersey.player}</p>
                                    <div className="flex items-center justify-between mt-2">
                                        <span className="text-xs text-muted-foreground">Qty: {item.quantity}</span>
                                        <span className="font-semibold text-foreground">₹{Number(item.price).toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <Separator className="my-4" />

                    {/* Price Summary */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Subtotal</span>
                            <span className="text-foreground">₹{Number(order.subtotal).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">GST (18%)</span>
                            <span className="text-foreground">₹{Number(order.tax).toFixed(2)}</span>
                        </div>
                        <Separator className="my-2" />
                        <div className="flex justify-between">
                            <span className="font-bold text-lg">Total</span>
                            <span className="font-bold text-lg text-primary">₹{Number(order.total).toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                {/* Download Notice */}
                <div className="bg-primary/10 border border-primary/20 rounded-xl p-6 mb-8">
                    <div className="flex items-start gap-4">
                        <div className="p-3 rounded-lg bg-primary/20">
                            <Download className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-foreground mb-2">Download Information</h3>
                            <p className="text-sm text-muted-foreground">
                                {order.status === "PAID"
                                    ? "Your design files are ready for download. Check your email for the download links."
                                    : "Once payment is confirmed, download links will be sent to your email at " + order.user.email
                                }
                            </p>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/">
                        <Button variant="outline" size="lg" className="w-full sm:w-auto">
                            Continue Shopping
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
