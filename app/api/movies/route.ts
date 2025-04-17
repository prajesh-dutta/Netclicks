import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import { getServerSession } from "next-auth"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const genre = searchParams.get("genre")
    const limit = Number.parseInt(searchParams.get("limit") || "20")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const search = searchParams.get("search")
    const skip = (page - 1) * limit

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
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to fetch movies" }, { status: 500 })
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
