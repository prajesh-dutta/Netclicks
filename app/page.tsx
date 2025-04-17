"use client"

import { HeroBackground } from "@/components/hero-background"
import { Navbar } from "@/components/navbar"
import { AnimatedText } from "@/components/animated-text"
import { Button } from "@/components/ui/button"
import { FeaturedSection } from "@/components/featured-section"
import { DeviceShowcase } from "@/components/device-showcase"
import { DownloadSection } from "@/components/download-section"
import { FAQAccordion } from "@/components/faq-accordion"
import { Footer } from "@/components/footer"
import { SubscriptionPlans } from "@/components/subscription-plans"
import Link from "next/link"

export default function Home() {
  return (
    <>
      <main className="relative">
        {/* Hero Section */}
        <div className="relative min-h-screen flex flex-col">
          <div className="absolute inset-0">
            <HeroBackground />
          </div>

          <div className="flex-1 relative z-10 flex flex-col">
            <div className="flex-1 flex items-center justify-center text-center px-4 md:px-8">
              <div className="max-w-3xl mx-auto mt-16">
                <AnimatedText
                  text="Unlimited movies, TV shows, and more"
                  className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-heading"
                  highlight="movies"
                  highlightClass="text-netclicks-red"
                />

                <p className="text-lg md:text-xl mb-6 text-gray-300">
                  Watch anywhere. Cancel anytime. Ready to watch? Enter your email to create or restart your membership.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link href="/auth/signup" className="w-full sm:w-auto">
                    <Button size="lg" className="w-full bg-netclicks-red hover:bg-netclicks-red/90 text-white">
                      Get Started
                    </Button>
                  </Link>
                  <Link href="/auth/signin" className="w-full sm:w-auto">
                    <Button size="lg" variant="outline" className="w-full">
                      Sign In
                    </Button>
                  </Link>
                </div>

                <p className="mt-6 text-sm text-gray-400">
                  Ready to start? New members can try 30 days free.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-black text-white">
          <div className="border-t border-gray-800">
            <FeaturedSection />
          </div>
          
          <div className="border-t border-gray-800">
            <DownloadSection />
          </div>
          
          <div className="border-t border-gray-800">
            <DeviceShowcase />
          </div>
          
          <div className="border-t border-gray-800">
            <SubscriptionPlans />
          </div>

          <div className="border-t border-gray-800">
            <FAQAccordion />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
