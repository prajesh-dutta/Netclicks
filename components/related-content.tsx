"use client"

import { useEffect, useState } from "react"
import { MovieCard } from "@/components/movie-card"
import type { Movie } from "@/lib/types"

interface RelatedContentProps {
  movieId: string
  genres: string[]
  limit?: number
}

export function RelatedContent({ movieId, genres, limit = 4 }: RelatedContentProps) {
  const [relatedMovies, setRelatedMovies] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchRelatedMovies = async () => {
      try {
        // In a real app, this would fetch from the API
        // const genreParam = genres.join(',')
        // const response = await fetch(`/api/movies?genres=${genreParam}&limit=${limit}&exclude=${movieId}`)
        // if (!response.ok) throw new Error("Failed to fetch related movies")
        // const data = await response.json()

        // For demo, use placeholder data
        const placeholderMovies: Movie[] = Array(limit)
          .fill(null)
          .map((_, i) => ({
            id: `related-${i + 1}`,
            title: `Related Movie ${i + 1}`,
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

        setRelatedMovies(placeholderMovies)
      } catch (error) {
        console.error("Error fetching related movies:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchRelatedMovies()
  }, [movieId, genres, limit])

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {relatedMovies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} isLoading={isLoading} />
      ))}
    </div>
  )
}
