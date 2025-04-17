"use client"

import { useEffect, useState, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MovieCard } from "@/components/movie-card"
import type { Movie } from "@/lib/types"

interface CategoryRowProps {
  title: string
  category: string
}

export function CategoryRow({ title, category }: CategoryRowProps) {
  const [movies, setMovies] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const rowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(`/api/movies?category=${category}&limit=10`)
        if (!response.ok) throw new Error("Failed to fetch movies")

        const data = await response.json()
        // Extract the movies array from the response
        setMovies(data.movies || [])
      } catch (error) {
        console.error("Error fetching movies:", error)
        // On error, use placeholder data
        setMovies(placeholderMovies)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMovies()
  }, [category])

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

  // Placeholder data with real movie images
  const placeholderMovies: Movie[] = [
    {
      id: "placeholder-1",
      title: "Inception",
      description: "A thief who steals corporate secrets through the use of dream-sharing technology.",
      thumbnailUrl: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      genres: ["Action", "Sci-Fi"],
      releaseYear: "2010",
      maturityRating: "PG-13",
      duration: "2h 28m",
      cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt"],
      trending: true,
    },
    {
      id: "placeholder-2",
      title: "The Dark Knight",
      description: "When the menace known as the Joker wreaks havoc on Gotham City, Batman must accept one of the greatest psychological tests of his ability to fight injustice.",
      thumbnailUrl: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      genres: ["Action", "Crime", "Drama"],
      releaseYear: "2008",
      maturityRating: "PG-13",
      duration: "2h 32m",
      cast: ["Christian Bale", "Heath Ledger"],
      trending: true,
    },
    {
      id: "placeholder-3",
      title: "Interstellar",
      description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
      thumbnailUrl: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
      genres: ["Adventure", "Drama", "Sci-Fi"],
      releaseYear: "2014",
      maturityRating: "PG-13",
      duration: "2h 49m",
      cast: ["Matthew McConaughey", "Anne Hathaway"],
      trending: true,
    },
    {
      id: "placeholder-4",
      title: "Dune",
      description: "Feature adaptation of Frank Herbert's science fiction novel about the son of a noble family trying to avenge his father's death.",
      thumbnailUrl: "https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
      genres: ["Action", "Adventure", "Drama"],
      releaseYear: "2021",
      maturityRating: "PG-13",
      duration: "2h 35m",
      cast: ["Timothée Chalamet", "Rebecca Ferguson"],
      trending: true,
    },
    {
      id: "placeholder-5",
      title: "The Matrix",
      description: "A computer hacker learns about the true nature of reality and his role in the war against its controllers.",
      thumbnailUrl: "https://image.tmdb.org/t/p/w500/dXNAPwY7VrqMAo51EKhhCJfaGb5.jpg",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      genres: ["Action", "Sci-Fi"],
      releaseYear: "1999",
      maturityRating: "R",
      duration: "2h 16m",
      cast: ["Keanu Reeves", "Laurence Fishburne"],
      trending: true,
    },
    {
      id: "placeholder-6",
      title: "Avatar",
      description: "A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.",
      thumbnailUrl: "https://image.tmdb.org/t/p/w500/jRXYjXNq0Cs2TcJjLkki24MLp7u.jpg",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      genres: ["Action", "Adventure", "Fantasy"],
      releaseYear: "2009",
      maturityRating: "PG-13",
      duration: "2h 42m",
      cast: ["Sam Worthington", "Zoe Saldana"],
      trending: false,
    },
    {
      id: "placeholder-7",
      title: "Blade Runner 2049",
      description: "Young Blade Runner K's discovery of a long-buried secret leads him to track down former Blade Runner Rick Deckard.",
      thumbnailUrl: "https://image.tmdb.org/t/p/w500/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
      genres: ["Action", "Drama", "Mystery"],
      releaseYear: "2017",
      maturityRating: "R",
      duration: "2h 44m",
      cast: ["Ryan Gosling", "Harrison Ford"],
      trending: false,
    },
    {
      id: "placeholder-8",
      title: "Everything Everywhere All at Once",
      description: "An aging Chinese immigrant is swept up in an insane adventure, where she alone can save the world by exploring other universes.",
      thumbnailUrl: "https://image.tmdb.org/t/p/w500/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
      genres: ["Action", "Adventure", "Comedy"],
      releaseYear: "2022",
      maturityRating: "R",
      duration: "2h 19m",
      cast: ["Michelle Yeoh", "Stephanie Hsu"],
      trending: false,
    },
    {
      id: "placeholder-9",
      title: "Parasite",
      description: "Greed, class discrimination, and a mysterious interloper threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
      thumbnailUrl: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      genres: ["Comedy", "Drama", "Thriller"],
      releaseYear: "2019",
      maturityRating: "R",
      duration: "2h 12m",
      cast: ["Song Kang-ho", "Lee Sun-kyun"],
      trending: false,
    },
    {
      id: "placeholder-10",
      title: "The Shawshank Redemption",
      description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
      thumbnailUrl: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      genres: ["Drama"],
      releaseYear: "1994",
      maturityRating: "R",
      duration: "2h 22m",
      cast: ["Tim Robbins", "Morgan Freeman"],
      trending: false,
    }
  ];

  const displayMovies = isLoading || movies.length === 0 ? placeholderMovies : movies

  return (
    <div className="relative group">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
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
          {displayMovies.map((movie) => (
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
