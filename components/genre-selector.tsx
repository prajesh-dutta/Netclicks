"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

export function GenreSelector() {
  const router = useRouter()
  const [currentGenre, setCurrentGenre] = useState("all")

  // Use useEffect to safely access searchParams on the client
  useEffect(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search)
      const genre = searchParams.get("genre") || "all"
      setCurrentGenre(genre)
    }
  }, [])

  const genres = [
    { id: "all", name: "All" },
    { id: "action", name: "Action" },
    { id: "comedy", name: "Comedy" },
    { id: "drama", name: "Drama" },
    { id: "horror", name: "Horror" },
    { id: "sci-fi", name: "Sci-Fi" },
    { id: "thriller", name: "Thriller" },
    { id: "romance", name: "Romance" },
    { id: "animation", name: "Animation" },
    { id: "documentary", name: "Documentary" },
    { id: "fantasy", name: "Fantasy" },
    { id: "crime", name: "Crime" },
    { id: "adventure", name: "Adventure" },
    { id: "family", name: "Family" },
    { id: "mystery", name: "Mystery" },
  ]

  const handleGenreClick = (genreId: string) => {
    const params = new URLSearchParams(window.location.search)

    if (genreId === "all") {
      params.delete("genre")
    } else {
      params.set("genre", genreId)
    }

    router.push(`/browse?${params.toString()}`)
    setCurrentGenre(genreId)
  }

  return (
    <ScrollArea className="w-full whitespace-nowrap">
      <div className="flex space-x-2 py-2">
        {genres.map((genre) => (
          <Button
            key={genre.id}
            variant={currentGenre === genre.id ? "default" : "outline"}
            size="sm"
            className="rounded-full"
            onClick={() => handleGenreClick(genre.id)}
          >
            {genre.name}
          </Button>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}
