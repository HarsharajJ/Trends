"use client"

import { useState } from "react"
import Link from "next/link"
import { ShoppingBag, Search, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavbarButton,
} from "@/components/ui/resizable-navbar"

const navLinks = [
  { name: "Categories", link: "/categories" },
  { name: "NBA", link: "/categories/nba" },
  { name: "NFL", link: "/categories/nfl" },
  { name: "Soccer", link: "/categories/soccer" },
  { name: "MLB", link: "/categories/mlb" },
]

export function SiteNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <Navbar>
      {/* Desktop Navigation */}
      <NavBody className="bg-background/80 dark:bg-background/80">
        {/* Logo */}
        <Link href="/" className="relative z-20 flex items-center gap-1">
          <span className="font-[var(--font-oswald)] text-2xl font-bold tracking-tight text-foreground">
            JERSEY
          </span>
          <span className="font-[var(--font-oswald)] text-2xl font-bold tracking-tight text-primary">
            VAULT
          </span>
        </Link>

        {/* Nav Items */}
        <NavItems items={navLinks} />

        {/* Right Actions */}
        <div className="relative z-20 flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-foreground">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-foreground">
            <User className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-foreground relative">
            <ShoppingBag className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
              3
            </span>
          </Button>
          <NavbarButton variant="gradient" className="hidden sm:inline-block">
            Shop Now
          </NavbarButton>
        </div>
      </NavBody>

      {/* Mobile Navigation */}
      <MobileNav className="bg-background/80 dark:bg-background/80">
        <MobileNavHeader>
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1">
            <span className="font-[var(--font-oswald)] text-xl font-bold tracking-tight text-foreground">
              JERSEY
            </span>
            <span className="font-[var(--font-oswald)] text-xl font-bold tracking-tight text-primary">
              VAULT
            </span>
          </Link>

          {/* Right side icons and toggle */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-foreground relative">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                3
              </span>
            </Button>
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </div>
        </MobileNavHeader>

        <MobileNavMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        >
          {navLinks.map((link, idx) => (
            <a
              key={`mobile-link-${idx}`}
              href={link.link}
              className="w-full text-lg font-medium text-foreground hover:text-primary transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <div className="flex w-full flex-col gap-4 pt-4">
            <NavbarButton
              variant="gradient"
              className="w-full"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Shop Now
            </NavbarButton>
          </div>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  )
}
