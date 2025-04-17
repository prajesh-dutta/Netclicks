"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useSession, signOut } from "next-auth/react"
import {
  Search,
  Bell,
  ChevronDown,
  Menu,
  X,
  Film,
  Tv,
  TrendingUp,
  Heart,
  User,
  LogOut,
  Settings,
  Sun,
  Moon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { ProfileSelector } from "@/components/profile-selector"
import { SearchDialog } from "@/components/search-dialog"
import { motion, AnimatePresence } from "framer-motion"
import { NetclicksLogoLink } from "@/components/netclicks-logo"
import { useTheme } from "next-themes"

export function Navbar() {
  const { data: session } = useSession()
  const pathname = usePathname()
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isProfileSelectorOpen, setIsProfileSelectorOpen] = useState(false)
  const [notifications, setNotifications] = useState(3)
  const [currentCategory, setCurrentCategory] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  const isHomePage = pathname === "/"
  const isAuthenticated = !!session

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Use useEffect to safely access URL parameters on the client side
  useEffect(() => {
    if (typeof window !== "undefined" && pathname === "/browse") {
      const params = new URLSearchParams(window.location.search)
      setCurrentCategory(params.get("category"))
    } else {
      setCurrentCategory(null)
    }
  }, [pathname])

  const handleSignOut = async () => {
    await signOut({ redirect: false })
    router.push("/")
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled || !isHomePage
          ? "bg-black/90 dark:bg-black/90 backdrop-blur-sm"
          : "bg-gradient-to-b from-black/80 to-transparent dark:from-black/80 dark:to-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Desktop Navigation */}
          <div className="flex items-center">
            <NetclicksLogoLink size="medium" />

            {isAuthenticated && (
              <nav className="hidden md:ml-6 md:flex md:space-x-1">
                <Link
                  href="/browse"
                  className={cn(
                    "text-white hover:text-gray-300 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    pathname === "/browse" && !currentCategory && "bg-white/10",
                  )}
                >
                  Home
                </Link>
                <Link
                  href="/browse?category=tv"
                  className={cn(
                    "text-white hover:text-gray-300 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    currentCategory === "tv" && "bg-white/10",
                  )}
                >
                  TV Shows
                </Link>
                <Link
                  href="/browse?category=movies"
                  className={cn(
                    "text-white hover:text-gray-300 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    currentCategory === "movies" && "bg-white/10",
                  )}
                >
                  Movies
                </Link>
                <Link
                  href="/browse?category=new"
                  className={cn(
                    "text-white hover:text-gray-300 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    currentCategory === "new" && "bg-white/10",
                  )}
                >
                  New & Popular
                </Link>
                <Link
                  href="/my-list"
                  className={cn(
                    "text-white hover:text-gray-300 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    pathname === "/my-list" && "bg-white/10",
                  )}
                >
                  My List
                </Link>
              </nav>
            )}
          </div>

          {/* Right side menu */}
          <div className="flex items-center">
            {/* Theme toggle */}
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                className="text-white mr-2"
                onClick={toggleTheme}
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            )}

            {isAuthenticated ? (
              <>
                <Button variant="ghost" size="icon" className="text-white mr-2" onClick={() => setIsSearchOpen(true)}>
                  <Search className="h-5 w-5" />
                </Button>

                <div className="relative mr-2">
                  <Button variant="ghost" size="icon" className="text-white">
                    <Bell className="h-5 w-5" />
                    {notifications > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-600 text-white">
                        {notifications}
                      </Badge>
                    )}
                  </Button>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2 text-white">
                      <Avatar className="h-7 w-7 border">
                        <AvatarImage src={session.user?.image || ""} />
                        <AvatarFallback>{session.user?.name?.charAt(0) || "U"}</AvatarFallback>
                      </Avatar>
                      <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>Profiles</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setIsProfileSelectorOpen(true)}>
                      <User className="mr-2 h-4 w-4" />
                      <span>Manage Profiles</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem asChild>
                        <Link href="/account">
                          <Settings className="mr-2 h-4 w-4" />
                          <span>Account Settings</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/my-list">
                          <Heart className="mr-2 h-4 w-4" />
                          <span>My List</span>
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sign out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link href="/auth/signin">
                  <Button variant="ghost" className="text-white">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button className="bg-red-600 hover:bg-red-700 text-white ml-2">Sign Up</Button>
                </Link>
              </>
            )}

            {/* Mobile menu button */}
            <div className="flex md:hidden ml-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-white"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && isAuthenticated && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-black/95 border-t border-gray-800"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/browse"
                className="flex items-center text-white hover:bg-gray-800 px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Film className="mr-2 h-5 w-5" />
                Home
              </Link>
              <Link
                href="/browse?category=tv"
                className="flex items-center text-white hover:bg-gray-800 px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Tv className="mr-2 h-5 w-5" />
                TV Shows
              </Link>
              <Link
                href="/browse?category=movies"
                className="flex items-center text-white hover:bg-gray-800 px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Film className="mr-2 h-5 w-5" />
                Movies
              </Link>
              <Link
                href="/browse?category=new"
                className="flex items-center text-white hover:bg-gray-800 px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <TrendingUp className="mr-2 h-5 w-5" />
                New & Popular
              </Link>
              <Link
                href="/my-list"
                className="flex items-center text-white hover:bg-gray-800 px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Heart className="mr-2 h-5 w-5" />
                My List
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Dialog */}
      <SearchDialog open={isSearchOpen} onOpenChange={setIsSearchOpen} />

      {/* Profile Selector */}
      <ProfileSelector open={isProfileSelectorOpen} onOpenChange={setIsProfileSelectorOpen} />
    </header>
  )
}
