import type React from "react"
import type { Metadata } from "next"
import { Inter, Oswald, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SiteNavbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import "./globals.css"

const _inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const _oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "JERSEY VAULT | Premium Sports Jerseys",
  description: "Discover authentic sports jerseys from top leagues worldwide. NBA, NFL, Soccer & more.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased ${_inter.variable} ${_oswald.variable}`}>
        <SiteNavbar />
        <main className="min-h-screen bg-background">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
