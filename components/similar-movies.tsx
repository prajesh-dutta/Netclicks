"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { MovieCard } from "@/components/movie-card"
import type { Movie } from "@/lib/types"

interface SimilarMoviesProps {
  movieId: string
  genres: string[]
  limit?: number
}

export function SimilarMovies({ movieId, genres, limit = 6 }: SimilarMoviesProps) {
  const [similarMovies, setSimilarMovies] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchSimilarMovies = async () => {
      try {
        // In a real app, this would fetch from the API
        // const genreParam = genres.join(',')
        // const response = await fetch(`/api/movies?genres=${genreParam}&limit=${limit}&exclude=${movieId}`)
        // if (!response.ok) throw new Error("Failed to fetch similar movies")
        // const data = await response.json()

        // For demo, use placeholder data
        const placeholderMovies: Movie[] = Array(limit)
          .fill(null)
          .map((_, i) => ({
            id: `similar-${i + 1}`,
            title: `Similar Movie ${i + 1}`,
            description: "Similar to what you're watching now.",
            thumbnailUrl: "/placeholder.svg?height=400&width=600",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            genres: genres,
            releaseYear: `202${i % 3}`,
            maturityRating: i % 2 === 0 ? "PG-13" : "R",
            duration: `${1 + (i % 2)}h ${30 + (i % 30)}m`,
            cast: ["Actor One", "Actor Two", "Actor Three"],
            trending: i < 2,
          }))

        setSimilarMovies(placeholderMovies)
      } catch (error) {
        console.error("Error fetching similar movies:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSimilarMovies()
  }, [movieId, genres, limit])

  return (
    <motion.div
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {similarMovies.map((movie, index) => (
        <motion.div
          key={movie.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <MovieCard movie={movie} isLoading={isLoading} />
        </motion.div>
      ))}
    </motion.div>
  )
}
