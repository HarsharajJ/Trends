"use client"

import { useState } from "react"
import { useParams, notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Star, Minus, Plus, ShoppingBag, Heart, Share2, ChevronRight, Truck, ShieldCheck, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getJerseyById, getJerseysByCategory } from "@/lib/data"
import { JerseyCard } from "@/components/jersey-card"

export default function JerseyPage() {
    const params = useParams()
    const id = params.id
    const jersey = getJerseyById(id as string)
    const [quantity, setQuantity] = useState(1)
    const [activeTab, setActiveTab] = useState("description")

    if (!jersey) {
        notFound()
    }

    const relatedJerseys = getJerseysByCategory(jersey.category)
        .filter((j) => j.id !== jersey.id)
        .slice(0, 4)

    const handleQuantityChange = (type: "increment" | "decrement") => {
        if (type === "decrement" && quantity > 1) {
            setQuantity(quantity - 1)
        } else if (type === "increment") {
            setQuantity(quantity + 1)
        }
    }

    return (
        <div className="min-h-screen bg-background pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Breadcrumb */}
                <nav className="flex items-center text-sm text-muted-foreground mb-8">
                    <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                    <ChevronRight className="h-4 w-4 mx-2" />
                    <Link href="/categories" className="hover:text-primary transition-colors">Categories</Link>
                    <ChevronRight className="h-4 w-4 mx-2" />
                    <Link href={`/categories/${jersey.category}`} className="hover:text-primary transition-colors uppercase">{jersey.category}</Link>
                    <ChevronRight className="h-4 w-4 mx-2" />
                    <span className="text-foreground font-medium truncate">{jersey.name}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                    {/* Left Column - Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="relative aspect-square bg-secondary/30 rounded-2xl overflow-hidden"
                    >
                        {jersey.badge && (
                            <div className="absolute top-4 left-4 z-10">
                                <Badge className={`${jersey.badgeColor} text-sm font-semibold px-3 py-1`}>
                                    {jersey.badge}
                                </Badge>
                            </div>
                        )}
                        <Image
                            src={jersey.image || "/placeholder.svg"}
                            alt={jersey.name}
                            fill
                            className="object-contain p-8 hover:scale-105 transition-transform duration-500"
                            priority
                        />
                    </motion.div>

                    {/* Right Column - Product Details */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex flex-col"
                    >
                        <h1 className="font-[var(--font-oswald)] text-4xl sm:text-5xl font-bold text-foreground tracking-tight mb-2">
                            {jersey.name}
                        </h1>
                        <p className="text-lg text-muted-foreground mb-4">{jersey.player}</p>

                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`h-5 w-5 ${i < Math.floor(jersey.rating) ? "fill-accent text-accent" : "fill-muted text-muted"}`}
                                    />
                                ))}
                            </div>
                            <span className="text-sm text-muted-foreground">
                                {jersey.rating} ({jersey.reviews} reviews)
                            </span>
                        </div>

                        <div className="flex items-center gap-4 mb-8">
                            <span className="text-3xl font-bold text-foreground">
                                ${jersey.price}
                            </span>
                            {jersey.originalPrice && (
                                <span className="text-xl text-muted-foreground line-through">
                                    ${jersey.originalPrice}
                                </span>
                            )}
                            {jersey.originalPrice && (
                                <Badge variant="destructive">
                                    Save ${jersey.originalPrice - jersey.price}
                                </Badge>
                            )}
                        </div>

                        <p className="text-muted-foreground mb-8 leading-relaxed">
                            Experience the authentic feel of the game with this premium quality jersey.
                            Designed for comfort and durability, it features breathable fabric and
                            official team colors. Perfect for game day or casual wear.
                        </p>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-8">
                            <div className="flex items-center border border-border rounded-md">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleQuantityChange("decrement")}
                                    disabled={quantity <= 1}
                                >
                                    <Minus className="h-4 w-4" />
                                </Button>
                                <span className="w-12 text-center font-medium">{quantity}</span>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleQuantityChange("increment")}
                                >
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>

                            <Button size="lg" className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                                <ShoppingBag className="h-5 w-5" />
                                Add to Cart
                            </Button>

                            <Button variant="outline" size="icon" className="h-11 w-11">
                                <Heart className="h-5 w-5" />
                            </Button>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground mb-8">
                            <div className="flex items-center gap-2">
                                <Truck className="h-4 w-4" />
                                <span>Free Shipping over $100</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="h-4 w-4" />
                                <span>Official Licensed Product</span>
                            </div>
                        </div>

                        <div className="border-t border-border pt-6 mt-auto">
                            <div className="flex gap-2 text-sm text-muted-foreground">
                                <span className="font-medium text-foreground">SKU:</span>
                                <span>JR-{jersey.id}00{jersey.id}</span>
                            </div>
                            <div className="flex gap-2 text-sm text-muted-foreground mt-1">
                                <span className="font-medium text-foreground">Category:</span>
                                <span className="capitalize">{jersey.category}</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Tabs Section */}
                <div className="mt-16 lg:mt-24">
                    <Tabs defaultValue="description" className="w-full">
                        <TabsList className="w-full justify-start border-b border-border bg-transparent p-0 mb-8 rounded-none">
                            <TabsTrigger
                                value="description"
                                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-2"
                            >
                                Description
                            </TabsTrigger>
                            <TabsTrigger
                                value="additional"
                                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-2"
                            >
                                Additional Information
                            </TabsTrigger>
                            <TabsTrigger
                                value="reviews"
                                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-2"
                            >
                                Reviews ({jersey.reviews})
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="description" className="animate-in fade-in-50 duration-500">
                            <div className="prose prose-invert max-w-none text-muted-foreground">
                                <p>
                                    Elevate your fan gear with this official {jersey.name}. Crafted with precision and passion,
                                    this jersey represents the spirit of the team and the dedication of the player.
                                    Made from high-performance moisture-wicking fabric, it keeps you cool and dry whether
                                    you're in the stands or on the court.
                                </p>
                                <ul className="list-disc pl-5 mt-4 space-y-2">
                                    <li>Official team graphics and player name/number</li>
                                    <li>Heat-sealed logos and details</li>
                                    <li>Rib-knit collar and armholes for enhanced durability</li>
                                    <li>Tailored fit for clearer movement</li>
                                    <li>Matrix mesh side panels for breathability</li>
                                </ul>
                            </div>
                        </TabsContent>
                        <TabsContent value="additional" className="animate-in fade-in-50 duration-500">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
                                <div className="flex justify-between py-2 border-b border-border">
                                    <span className="font-medium">Material</span>
                                    <span className="text-muted-foreground">100% Recycled Polyester</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-border">
                                    <span className="font-medium">Fit</span>
                                    <span className="text-muted-foreground">Standard Fit</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-border">
                                    <span className="font-medium">Care</span>
                                    <span className="text-muted-foreground">Machine wash, tumble dry low</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-border">
                                    <span className="font-medium">Origin</span>
                                    <span className="text-muted-foreground">Imported</span>
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="reviews">
                            <div className="text-center py-12 bg-secondary/20 rounded-lg">
                                <p className="text-muted-foreground">No reviews yet for this product.</p>
                                <Button variant="outline" className="mt-4">Write a Review</Button>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>

                {/* Related Products */}
                {relatedJerseys.length > 0 && (
                    <div className="mt-16 lg:mt-24">
                        <h2 className="font-[var(--font-oswald)] text-3xl font-bold mb-8">RELATED PRODUCTS</h2>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedJerseys.map((relatedJersey, index) => (
                                <JerseyCard key={relatedJersey.id} {...relatedJersey} index={index} />
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}
