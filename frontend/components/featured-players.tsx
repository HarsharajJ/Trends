"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"

const players = [
  {
    name: "LeBron James",
    team: "Los Angeles Lakers",
    number: "23",

    stat: "40K+ Points",
  },
  {
    name: "Stephen Curry",
    team: "Golden State Warriors",
    number: "30",

    stat: "3PT King",
  },
  {
    name: "Kevin Durant",
    team: "Phoenix Suns",
    number: "35",

    stat: "Scoring Machine",
  },
  {
    name: "Giannis A.",
    team: "Milwaukee Bucks",
    number: "34",
    image: "/placeholder.svg?height=500&width=400",
    stat: "2x MVP",
  },
]

export function FeaturedPlayers() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-primary blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-accent blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-[var(--font-oswald)] text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">
            PLAYER SPOTLIGHT
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Shop jerseys from the biggest names in the game. Authentic gear worn by legends.
          </p>
        </motion.div>

        {/* Players Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {players.map((player, index) => (
            <motion.div
              key={player.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative rounded-xl overflow-hidden bg-card">
                {/* Player Image */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={player.image || "/placeholder.svg"}
                    alt={player.name}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                </div>

                {/* Player Number - Large Background */}
                <div className="absolute top-4 right-4 font-[var(--font-oswald)] text-7xl sm:text-8xl font-bold text-foreground/10 leading-none">
                  {player.number}
                </div>

                {/* Player Info */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                  <div className="inline-block px-2 py-1 rounded bg-primary/20 text-primary text-xs font-medium mb-2">
                    {player.stat}
                  </div>
                  <h3 className="font-[var(--font-oswald)] text-xl sm:text-2xl font-bold text-foreground">
                    {player.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{player.team}</p>
                </div>

                {/* Hover Arrow */}
                <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-primary flex items-center justify-center opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <ArrowUpRight className="h-5 w-5 text-primary-foreground" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
