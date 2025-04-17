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

    return NextResponse.json({
      profiles: user.profiles || [],
    })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to fetch profiles" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession()

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { name, avatar, isKid } = await request.json()

    if (!name) {
      return NextResponse.json({ error: "Profile name is required" }, { status: 400 })
    }

    const { db } = await connectToDatabase()

    const user = await db.collection("users").findOne({
      email: session.user.email,
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Check if user already has 5 profiles
    const profiles = user.profiles || []
    if (profiles.length >= 5) {
      return NextResponse.json({ error: "Maximum number of profiles reached (5)" }, { status: 400 })
    }

    // Check if profile name already exists
    if (profiles.some((profile: any) => profile.name === name)) {
      return NextResponse.json({ error: "Profile name already exists" }, { status: 400 })
    }

    // Create new profile
    const newProfile = {
      id: new ObjectId().toString(),
      name,
      avatar: avatar || `/avatars/avatar-${Math.floor(Math.random() * 8) + 1}.png`,
      isKid: isKid || false,
      createdAt: new Date(),
    }

    // Add profile to user's profiles
    await db.collection("users").updateOne({ email: session.user.email }, { $push: { profiles: newProfile } })

    return NextResponse.json({
      success: true,
      profile: newProfile,
    })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to create profile" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession()

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { profileId, name, avatar, isKid } = await request.json()

    if (!profileId) {
      return NextResponse.json({ error: "Profile ID is required" }, { status: 400 })
    }

    const { db } = await connectToDatabase()

    // Update profile
    const result = await db.collection("users").updateOne(
      {
        email: session.user.email,
        "profiles.id": profileId,
      },
      {
        $set: {
          "profiles.$.name": name,
          "profiles.$.avatar": avatar,
          "profiles.$.isKid": isKid,
          "profiles.$.updatedAt": new Date(),
        },
      },
    )

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      updated: result.modifiedCount > 0,
    })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession()

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const profileId = searchParams.get("profileId")

    if (!profileId) {
      return NextResponse.json({ error: "Profile ID is required" }, { status: 400 })
    }

    const { db } = await connectToDatabase()

    // Remove profile from user's profiles
    const result = await db
      .collection("users")
      .updateOne({ email: session.user.email }, { $pull: { profiles: { id: profileId } } })

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      deleted: result.modifiedCount > 0,
    })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to delete profile" }, { status: 500 })
  }
}
