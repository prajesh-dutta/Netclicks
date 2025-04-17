import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import { auth } from "@/lib/auth"

// Fallback watchlist movies in case database connection fails
const fallbackWatchlist = [
  {
    id: "fallback-wl-1",
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
    popularity: 88
  },
  {
    id: "fallback-wl-2",
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
  }
];

export async function GET() {
  try {
    // Get current user session
    const session = await auth()

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Unauthorized. Please sign in to access your watchlist." },
        { status: 401 }
      )
    }

    try {
      const { db } = await connectToDatabase()
      
      // Get user's watchlist entries
      const watchlistItems = await db
        .collection("watchlist")
        .find({ userId: session.user.id })
        .toArray()
        
      if (!watchlistItems || watchlistItems.length === 0) {
        // User has no watchlist items
        return NextResponse.json({ watchlist: [] })
      }
      
      // Get movie IDs from watchlist
      const movieIds = watchlistItems.map(item => item.movieId)
      
      // Fetch actual movie details
      const movies = await db
        .collection("movies")
        .find({ _id: { $in: movieIds } })
        .toArray()
        
      if (movies && movies.length > 0) {
        return NextResponse.json({ watchlist: movies })
      } else {
        // Movie data not found, return empty watchlist
        return NextResponse.json({ watchlist: [] })
      }
    } catch (dbError) {
      console.error("Database error:", dbError)
      // Return fallback watchlist
      return NextResponse.json({
        watchlist: fallbackWatchlist,
        fallback: true,
      })
    }
  } catch (error) {
    console.error("Error in watchlist API:", error)
    return NextResponse.json({
      watchlist: fallbackWatchlist,
      fallback: true,
    })
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth()

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { movieId } = await request.json()
    
    if (!movieId) {
      return NextResponse.json(
        { error: "Movie ID is required" },
        { status: 400 }
      )
    }

    const { db } = await connectToDatabase()

    // Check if movie exists
    const movie = await db.collection("movies").findOne({ _id: movieId })
    
    if (!movie) {
      return NextResponse.json(
        { error: "Movie not found" },
        { status: 404 }
      )
    }

    // Check if already in watchlist
    const existing = await db.collection("watchlist").findOne({
      userId: session.user.id,
      movieId,
    })

    if (existing) {
      return NextResponse.json(
        { error: "Movie already in watchlist", existing: true },
        { status: 200 }
      )
    }

    // Add to watchlist
    const result = await db.collection("watchlist").insertOne({
      userId: session.user.id,
      movieId,
      addedAt: new Date(),
    })

    return NextResponse.json({
      success: true,
      watchlistId: result.insertedId,
      message: "Added to watchlist",
    })
  } catch (error) {
    console.error("Error adding to watchlist:", error)
    return NextResponse.json(
      { error: "Failed to add to watchlist" },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await auth()

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const movieId = searchParams.get('movieId')
    
    if (!movieId) {
      return NextResponse.json(
        { error: "Movie ID is required" },
        { status: 400 }
      )
    }

    const { db } = await connectToDatabase()

    // Remove from watchlist
    const result = await db.collection("watchlist").deleteOne({
      userId: session.user.id,
      movieId,
    })

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: "Movie not found in watchlist" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: "Removed from watchlist",
    })
  } catch (error) {
    console.error("Error removing from watchlist:", error)
    return NextResponse.json(
      { error: "Failed to remove from watchlist" },
      { status: 500 }
    )
  }
}
