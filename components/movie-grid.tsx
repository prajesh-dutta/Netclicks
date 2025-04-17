"use client"

import { useState } from "react"
import { MovieCard } from "@/components/movie-card"
import { motion } from "framer-motion"
import type { Movie } from "@/lib/types"

interface MovieGridProps {
  movies: Movie[]
  title?: string
  showFilter?: boolean
}

export function MovieGrid({ movies, title, showFilter = false }: MovieGridProps) {
  const [filter, setFilter] = useState<string | null>(null)
  
  // Filter movies by genre if filter is set
  const filteredMovies = filter 
    ? movies.filter(movie => movie.genres && movie.genres.includes(filter))
    : movies

  // Get all unique genres from movies
  const allGenres = Array.from(
    new Set(
      movies.flatMap(movie => movie.genres || [])
    )
  ).sort()
  
  return (
    <div>
      {title && (
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
      )}
      
      {showFilter && allGenres.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            className={`px-3 py-1 rounded-full text-sm ${
              filter === null ? 'bg-red-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
            onClick={() => setFilter(null)}
          >
            All
          </button>
          {allGenres.map(genre => (
            <button
              key={genre}
              className={`px-3 py-1 rounded-full text-sm ${
                filter === genre ? 'bg-red-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
              onClick={() => setFilter(genre)}
            >
              {genre}
            </button>
          ))}
        </div>
      )}
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredMovies.map((movie, index) => (
          <motion.div
            key={movie.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <MovieCard movie={movie} />
          </motion.div>
        ))}
      </div>
      
      {filteredMovies.length === 0 && (
        <div className="text-center py-10">
          <h3 className="text-lg font-medium">No movies found</h3>
          <p className="text-gray-400 mt-2">
            {filter ? `No movies found in the ${filter} genre.` : 'No movies found matching your criteria.'}
          </p>
        </div>
      )}
    </div>
  )
}
