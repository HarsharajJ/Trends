"use client"

import { motion } from "framer-motion"
import { Shield, Download, RefreshCw, Award } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "100% Original",
    description: "Every design is unique and crafted with attention to detail for your team.",
  },
  {
    icon: Download,
    title: "Instant Digital Delivery",
    description: "Get your designs instantly via digital download. No waiting, no shipping delays.",
  },
  {
    icon: RefreshCw,
    title: "Free Revisions",
    description: "Not satisfied? We offer free revisions until you love your design.",
  },
  {
    icon: Award,
    title: "Premium Designs",
    description: "Professional-grade designs that make your team stand out on the field.",
  },
]

export function WhyChooseUs() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-card">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-[var(--font-oswald)] text-4xl sm:text-5xl font-bold text-foreground tracking-tight">
            WHY NU jerserys?
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            We're not just creating designs — we're crafting your team's identity.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-secondary mb-6 group-hover:bg-primary transition-colors duration-300">
                <feature.icon className="h-7 w-7 text-foreground group-hover:text-primary-foreground transition-colors duration-300" />
              </div>
              <h3 className="font-semibold text-lg text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 pt-12 border-t border-border"
        >
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-16 opacity-50">
            {["NBA", "NFL", "MLB", "MLS", "NHL"].map((league) => (
              <span
                key={league}
                className="font-[var(--font-oswald)] text-2xl sm:text-3xl font-bold text-muted-foreground"
              >
                {league}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
