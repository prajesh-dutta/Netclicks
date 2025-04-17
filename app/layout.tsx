import type React from "react"
import type { Metadata } from "next"
import { Inter, Montserrat } from "next/font/google"
import { Suspense } from "react"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/components/auth-provider"
import { Analytics } from "@/components/analytics"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
})

export const metadata: Metadata = {
  title: "Netclicks | Premium Streaming Experience",
  description: "Watch unlimited movies, TV shows, and more on Netclicks - the ultimate streaming platform",
  keywords: "streaming, movies, tv shows, watch online, netflix clone, netclicks",
  authors: [{ name: "Prajesh" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://netclicks.vercel.app",
    title: "Netclicks | Premium Streaming Experience",
    description: "Watch unlimited movies, TV shows, and more on Netclicks",
    siteName: "Netclicks",
  },
  generator: 'v0.dev'
}

function NavbarWithSuspense() {
  return (
    <Suspense fallback={<div className="h-16 bg-black dark:bg-black" />}>
      <Navbar />
    </Suspense>
  )
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${montserrat.variable} font-sans bg-white dark:bg-black text-black dark:text-white`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <AuthProvider>
            <NavbarWithSuspense />
            {children}
            <Toaster />
            <Analytics />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}