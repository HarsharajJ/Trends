"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, CreditCard, Truck, ShieldCheck, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCart } from "@/context/cart-context"
import { Separator } from "@/components/ui/separator"

export default function CheckoutPage() {
    const router = useRouter()
    const { items, totalItems, totalPrice, updateQuantity, removeItem, clearCart } = useCart()
    const [isProcessing, setIsProcessing] = useState(false)

    const shipping = items.length > 0 ? 10 : 0
    const tax = totalPrice * 0.08
    const finalTotal = totalPrice + shipping + tax

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        cardNumber: "",
        cardName: "",
        expiryDate: "",
        cvv: "",
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handlePlaceOrder = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsProcessing(true)

        // Simulate order processing
        await new Promise((resolve) => setTimeout(resolve, 2000))

        // Clear cart and show success
        clearCart()
        alert("Order placed successfully! Thank you for your purchase.")
        router.push("/")
        setIsProcessing(false)
    }

    // Redirect if cart is empty
    if (items.length === 0 && !isProcessing) {
        return (
            <div className="min-h-screen bg-background pt-24 pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center justify-center py-16">
                        <h1 className="font-[var(--font-oswald)] text-4xl font-bold text-foreground mb-4">
                            Your Cart is Empty
                        </h1>
                        <p className="text-muted-foreground mb-8">
                            Add some items to your cart before checking out.
                        </p>
                        <Button
                            onClick={() => router.push("/")}
                            className="bg-primary hover:bg-primary/90 text-primary-foreground"
                        >
                            Continue Shopping
                        </Button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        href="/"
                        className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-4"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Continue Shopping
                    </Link>
                    <h1 className="font-[var(--font-oswald)] text-4xl sm:text-5xl font-bold text-foreground">
                        CHECKOUT
                    </h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Forms */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Contact Information */}
                        <div className="bg-secondary/30 rounded-xl p-6">
                            <h2 className="font-[var(--font-oswald)] text-2xl font-bold text-foreground mb-6">
                                Contact Information
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">
                                        First Name *
                                    </label>
                                    <Input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        required
                                        className="bg-background border-border"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">
                                        Last Name *
                                    </label>
                                    <Input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        required
                                        className="bg-background border-border"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">
                                        Email *
                                    </label>
                                    <Input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        className="bg-background border-border"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">
                                        Phone *
                                    </label>
                                    <Input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        required
                                        className="bg-background border-border"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Payment Information */}
                        <div className="bg-secondary/30 rounded-xl p-6">
                            <div className="flex items-center gap-2 mb-6">
                                <CreditCard className="h-5 w-5 text-primary" />
                                <h2 className="font-[var(--font-oswald)] text-2xl font-bold text-foreground">
                                    Payment Information
                                </h2>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">
                                        Card Number *
                                    </label>
                                    <Input
                                        type="text"
                                        name="cardNumber"
                                        value={formData.cardNumber}
                                        onChange={handleInputChange}
                                        placeholder="1234 5678 9012 3456"
                                        required
                                        className="bg-background border-border"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">
                                        Name on Card *
                                    </label>
                                    <Input
                                        type="text"
                                        name="cardName"
                                        value={formData.cardName}
                                        onChange={handleInputChange}
                                        required
                                        className="bg-background border-border"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">
                                            Expiry Date *
                                        </label>
                                        <Input
                                            type="text"
                                            name="expiryDate"
                                            value={formData.expiryDate}
                                            onChange={handleInputChange}
                                            placeholder="MM/YY"
                                            required
                                            className="bg-background border-border"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">
                                            CVV *
                                        </label>
                                        <Input
                                            type="text"
                                            name="cvv"
                                            value={formData.cvv}
                                            onChange={handleInputChange}
                                            placeholder="123"
                                            required
                                            className="bg-background border-border"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-secondary/30 rounded-xl p-6 sticky top-24">
                            <h2 className="font-[var(--font-oswald)] text-2xl font-bold text-foreground mb-6">
                                Order Summary
                            </h2>

                            {/* Cart Items */}
                            <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                                {items.map((item) => (
                                    <div key={item.id} className="flex gap-4">
                                        <div className="relative w-20 h-24 flex-shrink-0 rounded-md overflow-hidden bg-secondary">
                                            <Image
                                                src={item.image || "/placeholder.svg"}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-foreground text-sm line-clamp-1">
                                                {item.name}
                                            </h3>
                                            <p className="text-xs text-muted-foreground">{item.player}</p>
                                            <div className="flex items-center justify-between mt-2">
                                                <span className="text-xs text-muted-foreground">
                                                    Qty: {item.quantity}
                                                </span>
                                                <span className="font-bold text-sm text-foreground">
                                                    ${(item.price * item.quantity).toFixed(2)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <Separator className="my-4" />

                            {/* Price Breakdown */}
                            <div className="space-y-2 mb-6">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Subtotal</span>
                                    <span className="text-foreground font-medium">
                                        ${totalPrice.toFixed(2)}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Shipping</span>
                                    <span className="text-foreground font-medium">
                                        ${shipping.toFixed(2)}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Tax (8%)</span>
                                    <span className="text-foreground font-medium">
                                        ${tax.toFixed(2)}
                                    </span>
                                </div>
                                <Separator className="my-2" />
                                <div className="flex justify-between">
                                    <span className="font-bold text-lg">Total</span>
                                    <span className="font-bold text-lg text-primary">
                                        ${finalTotal.toFixed(2)}
                                    </span>
                                </div>
                            </div>

                            {/* Features */}
                            <div className="space-y-3 mb-6 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <ShieldCheck className="h-4 w-4 text-primary" />
                                    <span>Secure Payment</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Truck className="h-4 w-4 text-primary" />
                                    <span>Free Shipping over $100</span>
                                </div>
                            </div>

                            {/* Place Order Button */}
                            <Button
                                onClick={handlePlaceOrder}
                                disabled={isProcessing}
                                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base h-12"
                            >
                                {isProcessing ? "Processing..." : "Place Order"}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
