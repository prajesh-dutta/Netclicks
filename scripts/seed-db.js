// This file is only used for local development and not in the browser
import { MongoClient } from "mongodb"
import * as dotenv from "dotenv"
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import { createRequire } from 'module'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const require = createRequire(import.meta.url)

// Load environment variables from .env.local file
dotenv.config({ path: resolve(__dirname, '..', '.env.local') })

// Sample movie data
const movies = [
  {
    title: "Interstellar",
    description:
      "When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans.",
    thumbnailUrl: "/placeholder.svg?height=400&width=600",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    genres: ["Sci-Fi", "Adventure", "Drama"],
    releaseYear: "2014",
    maturityRating: "PG-13",
    duration: "2h 49m",
    cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
    trending: true,
    popularity: 95,
  },
  {
    title: "The Shawshank Redemption",
    description:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    thumbnailUrl: "/placeholder.svg?height=400&width=600",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    genres: ["Drama"],
    releaseYear: "1994",
    maturityRating: "R",
    duration: "2h 22m",
    cast: ["Tim Robbins", "Morgan Freeman"],
    trending: true,
    popularity: 98,
  },
  {
    title: "Stranger Things",
    description:
      "When a young boy disappears, his mother, a police chief, and his friends must confront terrifying supernatural forces in order to get him back.",
    thumbnailUrl: "/placeholder.svg?height=400&width=600",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    genres: ["Drama", "Fantasy", "Horror"],
    releaseYear: "2016",
    maturityRating: "TV-14",
    duration: "50m",
    cast: ["Millie Bobby Brown", "Finn Wolfhard", "Winona Ryder"],
    trending: true,
    popularity: 92,
  },
  {
    title: "The Dark Knight",
    description:
      "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    thumbnailUrl: "/placeholder.svg?height=400&width=600",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    genres: ["Action", "Crime", "Drama"],
    releaseYear: "2008",
    maturityRating: "PG-13",
    duration: "2h 32m",
    cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
    trending: true,
    popularity: 96,
  },
  {
    title: "Inception",
    description:
      "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    thumbnailUrl: "/placeholder.svg?height=400&width=600",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    genres: ["Action", "Adventure", "Sci-Fi"],
    releaseYear: "2010",
    maturityRating: "PG-13",
    duration: "2h 28m",
    cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page"],
    trending: true,
    popularity: 94,
  },
  {
    title: "Breaking Bad",
    description:
      "A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family's future.",
    thumbnailUrl: "/placeholder.svg?height=400&width=600",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    genres: ["Crime", "Drama", "Thriller"],
    releaseYear: "2008",
    maturityRating: "TV-MA",
    duration: "49m",
    cast: ["Bryan Cranston", "Aaron Paul", "Anna Gunn"],
    trending: false,
    popularity: 97,
  },
]

// This function is only used for local development
async function seedDatabase() {
  // This code only runs in Node.js environment, not in the browser
  if (typeof window !== "undefined") {
    console.error("This script is meant to be run in a Node.js environment, not in the browser")
    return
  }

  const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/netclicks"
  const client = new MongoClient(uri)

  try {
    await client.connect()
    console.log("Connected to MongoDB")

    // Extract the database name from the connection string or use default
    const dbName = uri.split("/").pop()?.split("?")[0] || "netclicks"
    const db = client.db(dbName)
    const moviesCollection = db.collection("movies")

    // Check if movies already exist
    const existingMovies = await moviesCollection.countDocuments()

    if (existingMovies > 0) {
      console.log("Movies already exist in the database. Skipping seed.")
      return
    }

    // Insert movies
    const result = await moviesCollection.insertMany(movies)
    console.log(`${result.insertedCount} movies inserted into the database`)
  } finally {
    await client.close()
    console.log("Database connection closed")
  }
}

// Run the seed function
seedDatabase().catch(console.error)

export { movies }
