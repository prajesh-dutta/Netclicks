"use client"

import { useEffect, useState, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MovieCard } from "@/components/movie-card"
import type { Movie } from "@/lib/types"

interface RecommendedRowProps {
  title: string
}

export function RecommendedRow({ title }: RecommendedRowProps) {
  const [movies, setMovies] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const rowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // In a real app, this would fetch from the API with user preferences
        // const response = await fetch(`/api/recommendations?limit=10`)
        // if (!response.ok) throw new Error("Failed to fetch recommendations")
        // const data = await response.json()

        // For demo, use placeholder data
        const placeholderMovies: Movie[] = Array(10)
          .fill(null)
          .map((_, i) => ({
            id: `rec-${i + 1}`,
            title: `Recommended Movie ${i + 1}`,
            description: "Based on your viewing history and preferences.",
            thumbnailUrl: "/placeholder.svg?height=400&width=600",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            genres: ["Action", "Drama", i % 2 === 0 ? "Sci-Fi" : "Comedy"],
            releaseYear: `202${i % 3}`,
            maturityRating: i % 2 === 0 ? "PG-13" : "R",
            duration: `${1 + (i % 2)}h ${30 + (i % 30)}m`,
            cast: ["Actor One", "Actor Two", "Actor Three"],
            trending: i < 5,
          }))

        setMovies(placeholderMovies)
      } catch (error) {
        console.error("Error fetching recommendations:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMovies()
  }, [])

  const handleScroll = (direction: "left" | "right") => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current
      const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth

      rowRef.current.scrollTo({
        left: scrollTo,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="relative group">
      <h2 className="text-xl font-bold mb-4 font-heading">{title}</h2>

      <div className="relative">
        {/* Left scroll button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => handleScroll("left")}
        >
          <ChevronLeft className="h-8 w-8" />
        </Button>

        {/* Movies row */}
        <div
          ref={rowRef}
          className="flex gap-2 overflow-x-auto scrollbar-hide snap-x scroll-px-4 pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {movies.map((movie) => (
            <div key={movie.id} className="flex-none w-[250px] snap-start">
              <MovieCard movie={movie} isLoading={isLoading} />
            </div>
          ))}
        </div>

        {/* Right scroll button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => handleScroll("right")}
        >
          <ChevronRight className="h-8 w-8" />
        </Button>
      </div>
    </div>
  )
}
