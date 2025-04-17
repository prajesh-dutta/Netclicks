import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import { getServerSession } from "next-auth"

// Fallback movie data in case the database is not available
const fallbackMovies = [
  {
    id: "fallback-1",
    title: "Inception",
    description: "A thief who steals corporate secrets through dream-sharing technology is given the task of planting an idea into the mind of a C.E.O.",
    thumbnailUrl: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    genres: ["Action", "Sci-Fi", "Thriller"],
    releaseYear: "2010",
    maturityRating: "PG-13",
    duration: "2h 28m",
    cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt"],
    trending: true,
    popularity: 95
  },
  {
    id: "fallback-2",
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
    popularity: 94
  },
  {
    id: "fallback-3",
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
    popularity: 93
  },
  {
    id: "fallback-4",
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
    popularity: 92
  },
  {
    id: "fallback-5",
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
    popularity: 91
  },
  {
    id: "fallback-6",
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
    popularity: 89
  },
  {
    id: "fallback-7",
    title: "Pulp Fiction",
    description: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    thumbnailUrl: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    genres: ["Crime", "Drama"],
    releaseYear: "1994",
    maturityRating: "R",
    duration: "2h 34m",
    cast: ["John Travolta", "Uma Thurman"],
    trending: false,
    popularity: 85
  },
  {
    id: "fallback-8",
    title: "The Shawshank Redemption",
    description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    thumbnailUrl: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    genres: ["Drama"],
    releaseYear: "1994",
    maturityRating: "R",
    duration: "2h 22m",
    cast: ["Tim Robbins", "Morgan Freeman"],
    trending: false,
    popularity: 88
  },
  {
    id: "fallback-9",
    title: "The Godfather",
    description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    thumbnailUrl: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    genres: ["Crime", "Drama"],
    releaseYear: "1972",
    maturityRating: "R",
    duration: "2h 55m",
    cast: ["Marlon Brando", "Al Pacino"],
    trending: false,
    popularity: 87
  },
  {
    id: "fallback-10",
    title: "Fight Club",
    description: "An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more.",
    thumbnailUrl: "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    genres: ["Drama"],
    releaseYear: "1999",
    maturityRating: "R",
    duration: "2h 19m",
    cast: ["Brad Pitt", "Edward Norton"],
    trending: false,
    popularity: 86
  }
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const genre = searchParams.get("genre")
    const limit = Number.parseInt(searchParams.get("limit") || "20")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const search = searchParams.get("search")
    const skip = (page - 1) * limit

    try {
      const { db } = await connectToDatabase()

      // Build query based on parameters
      const query: any = {}

      if (category === "trending") {
        query.trending = true
      } else if (category === "new") {
        // Movies released in the last 3 months
        const threeMonthsAgo = new Date()
        threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3)
        query.releaseDate = { $gte: threeMonthsAgo }
      } else if (category === "popular") {
        query.popularity = { $gt: 70 }
      } else if (category === "top10") {
        // Will be sorted by popularity later
        query.popularity = { $gt: 85 }
      }

      if (genre) {
        query.genres = genre
      }

      if (search) {
        query.$or = [
          { title: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
          { cast: { $regex: search, $options: "i" } },
        ]
      }

      // Get total count for pagination
      const total = await db.collection("movies").countDocuments(query)

      // Sort options
      let sortOptions = {}
      if (category === "trending" || category === "top10") {
        sortOptions = { popularity: -1 }
      } else if (category === "new") {
        sortOptions = { releaseDate: -1 }
      } else {
        sortOptions = { title: 1 }
      }

      const movies = await db.collection("movies").find(query).sort(sortOptions).skip(skip).limit(limit).toArray()

      if (movies && movies.length > 0) {
        // Format the response with pagination info
        return NextResponse.json({
          movies,
          pagination: {
            total,
            page,
            limit,
            pages: Math.ceil(total / limit),
          },
        })
      }
      
      // If no movies found in DB, use fallback data
      throw new Error("No movies found in database");
      
    } catch (dbError) {
      console.error("Database error or no movies found:", dbError)
      
      // Filter and sort fallback movies to match the request parameters
      let filteredMovies = [...fallbackMovies]
      
      // Apply category filtering
      if (category === "trending") {
        filteredMovies = filteredMovies.filter(movie => movie.trending)
      } else if (category === "popular") {
        filteredMovies = filteredMovies.filter(movie => movie.popularity > 70)
      } else if (category === "top10") {
        filteredMovies = filteredMovies.filter(movie => movie.popularity > 85)
          .sort((a, b) => b.popularity - a.popularity)
          .slice(0, 10)
      }
      
      // Apply genre filtering if specified
      if (genre) {
        filteredMovies = filteredMovies.filter(movie => 
          movie.genres.some(g => g.toLowerCase() === genre.toLowerCase()))
      }
      
      // Apply search filtering if specified
      if (search) {
        const searchLower = search.toLowerCase()
        filteredMovies = filteredMovies.filter(movie =>
          movie.title.toLowerCase().includes(searchLower) ||
          movie.description.toLowerCase().includes(searchLower) ||
          movie.cast.some(actor => actor.toLowerCase().includes(searchLower))
        )
      }
      
      // Apply pagination
      const total = filteredMovies.length
      filteredMovies = filteredMovies.slice(skip, skip + limit)
      
      return NextResponse.json({
        movies: filteredMovies,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit),
        },
        fallback: true, // Indicate that this is fallback data
      })
    }
  } catch (error) {
    console.error("General API error:", error)
    // Return fallback data in case of any error
    return NextResponse.json({
      movies: fallbackMovies.slice(0, 10),
      pagination: {
        total: fallbackMovies.length,
        page: 1,
        limit: 10,
        pages: 1,
      },
      fallback: true,
    })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession()

    // Only admin users can add movies
    if (!session || !session.user || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const movieData = await request.json()

    // Validate required fields
    const requiredFields = [
      "title",
      "description",
      "thumbnailUrl",
      "videoUrl",
      "genres",
      "releaseYear",
      "maturityRating",
      "duration",
    ]
    for (const field of requiredFields) {
      if (!movieData[field]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    const { db } = await connectToDatabase()

    // Add timestamp and default values
    const newMovie = {
      ...movieData,
      createdAt: new Date(),
      updatedAt: new Date(),
      popularity: movieData.popularity || 50,
      trending: movieData.trending || false,
      views: 0,
      likes: 0,
    }

    const result = await db.collection("movies").insertOne(newMovie)

    return NextResponse.json({
      success: true,
      movieId: result.insertedId,
      message: "Movie added successfully",
    })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to add movie" }, { status: 500 })
  }
}
