"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import { CategoryRow } from "@/components/category-row"
import { TopTenRow } from "@/components/top-ten-row"
import { BillboardAd } from "@/components/billboard-ad"
import { FeaturedShowcase } from "@/components/featured-showcase"
import { GenreSelector } from "@/components/genre-selector"
import { ContinueWatchingRow } from "@/components/continue-watching-row"

export default function BrowsePage() {
  const searchParams = useSearchParams()
  const [category, setCategory] = useState<string | null>(null)
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null)

  useEffect(() => {
    const currentCategory = searchParams.get("category")
    setCategory(currentCategory)

    // Reset selected genre when category changes
    setSelectedGenre(null)
  }, [searchParams])

  const handleGenreChange = (genre: string | null) => {
    setSelectedGenre(genre)
  }

  return (
    <main className="min-h-screen bg-black">
      {/* Hero Section */}
      <Suspense fallback={<div className="h-[70vh] bg-gray-900" />}>
        <FeaturedShowcase />
      </Suspense>

      {/* Browse Content */}
      <div className="px-4 sm:px-6 lg:px-8 pb-20 -mt-16 relative z-10">
        {/* Genre Selector */}
        <GenreSelector onGenreChange={handleGenreChange} selectedGenre={selectedGenre} category={category} />

        {/* Continue Watching */}
        <div className="mt-6">
          <ContinueWatchingRow />
        </div>

        {/* Popular Categories */}
        <div className="mt-12">
          <TopTenRow />
        </div>

        {/* Movie Categories */}
        <div className="mt-12 space-y-12">
          <CategoryRow title="Popular on Netclicks" category="popular" />
          <CategoryRow title="New Releases" category="new" />
          <CategoryRow title="Action & Adventure" category="action" />
          <CategoryRow title="Comedies" category="comedy" />
          <CategoryRow title="Documentaries" category="documentary" />
          <CategoryRow title="Dramas" category="drama" />
        </div>

        {/* Ad Section */}
        <div className="mt-16">
          <BillboardAd />
        </div>
      </div>
    </main>
  )
}
