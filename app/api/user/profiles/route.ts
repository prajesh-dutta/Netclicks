import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import { getServerSession } from "next-auth"
import { auth } from "@/lib/auth"

// Fallback profiles in case database connection fails
const fallbackProfiles = [
  {
    id: "profile-1",
    name: "Main Profile",
    avatar: "/placeholder-user.jpg",
    isKid: false,
  },
  {
    id: "profile-2",
    name: "Kids",
    avatar: "/placeholder-user.jpg",
    isKid: true,
  },
]

export async function GET() {
  try {
    // Get current user session
    const session = await auth()

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Unauthorized. Please sign in to access profiles." },
        { status: 401 }
      )
    }

    try {
      const { db } = await connectToDatabase()

      // Find profiles associated with the user's email
      const profiles = await db
        .collection("profiles")
        .find({ userId: session.user.id })
        .toArray()

      if (profiles && profiles.length > 0) {
        return NextResponse.json({ profiles })
      }

      // If no profiles found, create default ones
      const defaultProfiles = [
        {
          userId: session.user.id,
          name: session.user.name || "Main Profile",
          avatar: session.user.image || "/placeholder-user.jpg",
          isKid: false,
          createdAt: new Date(),
        },
        {
          userId: session.user.id,
          name: "Kids",
          avatar: "/placeholder-user.jpg",
          isKid: true,
          createdAt: new Date(),
        },
      ]

      // Insert default profiles
      await db.collection("profiles").insertMany(defaultProfiles)

      return NextResponse.json({ profiles: defaultProfiles })
    } catch (dbError) {
      console.error("Database error:", dbError)
      // Return fallback profiles
      return NextResponse.json({
        profiles: fallbackProfiles,
        fallback: true,
      })
    }
  } catch (error) {
    console.error("Error in profiles API:", error)
    return NextResponse.json({
      profiles: fallbackProfiles,
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

    const profileData = await request.json()
    
    // Validate profile data
    if (!profileData.name) {
      return NextResponse.json(
        { error: "Profile name is required" },
        { status: 400 }
      )
    }

    const { db } = await connectToDatabase()

    const newProfile = {
      userId: session.user.id,
      name: profileData.name,
      avatar: profileData.avatar || "/placeholder-user.jpg",
      isKid: !!profileData.isKid,
      createdAt: new Date(),
    }

    // Check number of profiles (limit to 5)
    const profileCount = await db
      .collection("profiles")
      .countDocuments({ userId: session.user.id })

    if (profileCount >= 5) {
      return NextResponse.json(
        { error: "Maximum number of profiles (5) reached" },
        { status: 400 }
      )
    }

    const result = await db.collection("profiles").insertOne(newProfile)

    return NextResponse.json({
      success: true,
      profileId: result.insertedId,
      profile: newProfile,
    })
  } catch (error) {
    console.error("Error creating profile:", error)
    return NextResponse.json(
      { error: "Failed to create profile" },
      { status: 500 }
    )
  }
}
