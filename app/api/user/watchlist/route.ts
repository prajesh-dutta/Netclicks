import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { connectToDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET() {
  try {
    const session = await getServerSession()

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { db } = await connectToDatabase()

    const user = await db.collection("users").findOne({
      email: session.user.email,
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const watchlistIds = user.watchlist || []

    // Convert string IDs to ObjectId
    const objectIds = watchlistIds.map((id: string) => new ObjectId(id))

    const watchlist = await db
      .collection("movies")
      .find({ _id: { $in: objectIds } })
      .toArray()

    return NextResponse.json({
      watchlist: watchlist.map(movie => ({
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
      })),
      count: watchlist.length,
    })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to fetch watchlist" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession()

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { movieId } = await request.json()

    if (!movieId) {
      return NextResponse.json({ error: "Movie ID is required" }, { status: 400 })
    }

    const { db } = await connectToDatabase()

    // Verify movie exists
    const movie = await db.collection("movies").findOne({
      _id: new ObjectId(movieId),
    })

    if (!movie) {
      return NextResponse.json({ error: "Movie not found" }, { status: 404 })
    }

    // Add movie to user's watchlist
    const result = await db
      .collection("users")
      .updateOne({ email: session.user.email }, { $addToSet: { watchlist: movieId } })

    // Track analytics
    await db.collection("analytics").insertOne({
      userId: session.user.id,
      movieId: movieId,
      action: "add_to_watchlist",
      timestamp: new Date(),
    })

    return NextResponse.json({
      success: true,
      updated: result.modifiedCount > 0,
    })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to update watchlist" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession()

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const movieId = searchParams.get("movieId")

    if (!movieId) {
      return NextResponse.json({ error: "Movie ID is required" }, { status: 400 })
    }

    const { db } = await connectToDatabase()

    // Remove movie from user's watchlist
    const result = await db
      .collection("users")
      .updateOne({ email: session.user.email }, { $pull: { watchlist: movieId } })

    // Track analytics
    await db.collection("analytics").insertOne({
      userId: session.user.id,
      movieId: movieId,
      action: "remove_from_watchlist",
      timestamp: new Date(),
    })

    return NextResponse.json({
      success: true,
      updated: result.modifiedCount > 0,
    })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to update watchlist" }, { status: 500 })
  }
}
