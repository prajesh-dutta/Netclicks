"use client"

import { useEffect, useState, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MovieCard } from "@/components/movie-card"
import { Badge } from "@/components/ui/badge"
import type { Movie } from "@/lib/types"
import { motion } from "framer-motion"

interface NewReleasesRowProps {
  title: string
}

export function NewReleasesRow({ title }: NewReleasesRowProps) {
  const [movies, setMovies] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const rowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // In a real app, this would fetch from the API
        // const response = await fetch(`/api/movies?category=new&limit=10`)
        // if (!response.ok) throw new Error("Failed to fetch new releases")
        // const data = await response.json()

        // For demo, use placeholder data
        const placeholderMovies: Movie[] = Array(10)
          .fill(null)
          .map((_, i) => ({
            id: `new-${i + 1}`,
            title: `New Release ${i + 1}`,
            description: "Just added to Netclicks.",
            thumbnailUrl: "/placeholder.svg?height=400&width=600",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            genres: ["Action", "Drama", i % 2 === 0 ? "Sci-Fi" : "Comedy"],
            releaseYear: "2023",
            maturityRating: i % 2 === 0 ? "PG-13" : "R",
            duration: `${1 + (i % 2)}h ${30 + (i % 30)}m`,
            cast: ["Actor One", "Actor Two", "Actor Three"],
            trending: i < 5,
            isNew: true,
          }))

        setMovies(placeholderMovies)
      } catch (error) {
        console.error("Error fetching new releases:", error)
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
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-xl font-bold font-heading">{title}</h2>
        <Badge className="bg-netclicks-red text-white">NEW</Badge>
      </div>

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
          {movies.map((movie, index) => (
            <motion.div
              key={movie.id}
              className="flex-none w-[250px] snap-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <MovieCard movie={movie} isLoading={isLoading} showBadge={true} badgeText="NEW" />
            </motion.div>
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
