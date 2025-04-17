import type { Movie } from "./types"

// This function is safe to use in client components as it uses mock data
export async function getMovieById(id: string): Promise<Movie | null> {
  try {
    // For demo purposes, return placeholder data
    const movie = {
      _id: id, // Use the string ID directly instead of creating an ObjectId
      title: "Interstellar",
      description:
        "When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans. A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
      thumbnailUrl: "/placeholder.svg?height=400&width=600",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      genres: ["Sci-Fi", "Adventure", "Drama"],
      releaseYear: "2014",
      maturityRating: "PG-13",
      duration: "2h 49m",
      cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
      trending: true,
      popularity: 95,
    }

    return {
      id: movie._id.toString(),
      title: movie.title,
      description: movie.description,
      thumbnailUrl: movie.thumbnailUrl,
      videoUrl: movie.videoUrl,
      genres: movie.genres,
      releaseYear: movie.releaseYear,
      maturityRating: movie.maturityRating,
      duration: movie.duration,
      cast: movie.cast,
      trending: movie.trending,
    }
  } catch (error) {
    console.error("Error fetching movie:", error)
    return null
  }
}

// For demo purposes, return placeholder data
export async function getMovies(category?: string, limit = 10): Promise<Movie[]> {
  return Array(limit)
    .fill(null)
    .map((_, i) => ({
      id: `movie-${i}`,
      title: `Movie Title ${i + 1}`,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      thumbnailUrl: "/placeholder.svg?height=400&width=600",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      genres: ["Action", "Drama", i % 2 === 0 ? "Sci-Fi" : "Comedy"],
      releaseYear: `202${i % 3}`,
      maturityRating: i % 2 === 0 ? "PG-13" : "R",
      duration: `${1 + (i % 2)}h ${30 + (i % 30)}m`,
      cast: ["Actor One", "Actor Two", "Actor Three"],
      trending: i < 5,
    }))
}

export async function searchMovies(query: string, limit = 10): Promise<Movie[]> {
  if (!query || query.length < 3) return []

  // For demo purposes, return placeholder data
  return Array(Math.min(limit, 5))
    .fill(null)
    .map((_, i) => ({
      id: `search-${i}`,
      title: `Search Result: ${query} ${i + 1}`,
      description: `This is a search result for "${query}"`,
      thumbnailUrl: "/placeholder.svg?height=400&width=600",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      genres: ["Action", "Drama"],
      releaseYear: "2023",
      maturityRating: "PG-13",
      duration: "2h 15m",
      cast: ["Actor One", "Actor Two"],
      trending: false,
    }))
}
