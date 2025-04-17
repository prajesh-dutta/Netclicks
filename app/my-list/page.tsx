"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { MovieCard } from "@/components/movie-card"
import { MovieGrid } from "@/components/movie-grid"
import type { Movie } from "@/lib/types"

export default function MyListPage() {
  const { data: session } = useSession()
  const [movies, setMovies] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        setIsLoading(true)
        // Try to fetch from API first
        const response = await fetch('/api/user/watchlist')
        
        if (response.ok) {
          const data = await response.json()
          setMovies(data.watchlist || [])
        } else {
          // Fallback to localStorage if API fails
          const watchlistIds = JSON.parse(localStorage.getItem('watchlist') || '[]')
          
          // For demo purposes, use placeholder data
          if (watchlistIds.length > 0) {
            // Create sample movies based on IDs in watchlist
            const placeholderMovies = watchlistIds.map((id: string, index: number) => ({
              id,
              title: `Saved Movie ${index + 1}`,
              description: "You added this to your list.",
              thumbnailUrl: `https://image.tmdb.org/t/p/w500/${
                [
                  "qJ2tW6WMUDux911r6m7haRef0WH.jpg",
                  "9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
                  "gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
                  "d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
                  "dXNAPwY7VrqMAo51EKhhCJfaGb5.jpg"
                ][index % 5]
              }`,
              videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
              genres: ["Action", "Adventure"],
              releaseYear: `202${index % 3}`,
              maturityRating: index % 2 === 0 ? "PG-13" : "R",
              duration: `${1 + (index % 2)}h ${30 + (index % 30)}m`,
              cast: ["Actor One", "Actor Two"],
              trending: index < 2,
            }))
            setMovies(placeholderMovies)
          }
        }
      } catch (error) {
        console.error("Error fetching watchlist:", error)
        // Show empty state if everything fails
        setMovies([])
      } finally {
        setIsLoading(false)
      }
    }

    if (session) {
      fetchWatchlist()
    } else {
      setIsLoading(false)
    }
  }, [session])

  if (!session) {
    return (
      <div className="min-h-screen bg-black pt-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Sign in to view your list</h1>
        <p className="text-gray-400 mb-6 text-center">
          Sign in to keep track of your favorite movies and TV shows.
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">My List</h1>
        
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {Array(10).fill(0).map((_, i) => (
              <div key={i} className="aspect-[2/3] bg-gray-800 rounded-md animate-pulse" />
            ))}
          </div>
        ) : movies.length > 0 ? (
          <MovieGrid movies={movies} />
        ) : (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-2">Your list is empty</h2>
            <p className="text-gray-400 mb-4">
              Add movies and TV shows to your list as you explore Netclicks.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}