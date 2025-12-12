"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

interface CategoryCardProps {
    id: string
    name: string
    image: string
    count: string
    color: string
    description?: string
    index?: number
}

export function CategoryCard({
    id,
    name,
    image,
    count,
    color,
    description,
    index = 0,
}: CategoryCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
        >
            <Link
                href={`/categories/${id}`}
                className="group block relative overflow-hidden rounded-xl aspect-[3/4] w-full"
            >
                <Image
                    src={image || "/placeholder.svg"}
                    alt={name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div
                    className={`absolute inset-0 bg-gradient-to-t ${color} via-transparent to-transparent opacity-60`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 text-left">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                        {count}
                    </span>
                    <h3 className="font-[var(--font-oswald)] text-2xl sm:text-3xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {name}
                    </h3>
                    {description && (
                        <p className="text-sm text-muted-foreground mt-1 hidden sm:block">
                            {description}
                        </p>
                    )}

                    {/* Arrow */}
                    <div className="mt-4 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground">
                            <ArrowUpRight className="h-5 w-5" />
                        </span>
                    </div>
                </div>
            </Link>
        </motion.div>
    )
}
