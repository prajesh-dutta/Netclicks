"use client"

import { useEffect, useState, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TopTenCard } from "@/components/top-ten-card"
import type { Movie } from "@/lib/types"

interface TopTenRowProps {
  title?: string
}

export function TopTenRow({ title = "Top 10 in Your Country" }: TopTenRowProps) {
  const [movies, setMovies] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const rowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Simulate API fetch
    const fetchTopMovies = async () => {
      try {
        const response = await fetch(`/api/movies?category=trending&limit=10`)
        if (!response.ok) throw new Error("Failed to fetch trending movies")

        const data = await response.json()
        setMovies(data)
      } catch (error) {
        console.error("Error fetching trending movies:", error)
        // Use placeholder data on error
        setMovies(placeholderMovies)
      } finally {
        setIsLoading(false)
      }
    }

    // Wait a bit to simulate loading (remove in production)
    const timer = setTimeout(() => {
      fetchTopMovies()
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  const handleScroll = (direction: "left" | "right") => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current
      const scrollTo = direction === "left" ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2

      rowRef.current.scrollTo({
        left: scrollTo,
        behavior: "smooth",
      })
    }
  }

  // Placeholder trending movies with actual movie posters
  const placeholderMovies: Movie[] = [
    {
      id: "top-1",
      title: "Stranger Things",
      description: "When a young boy disappears, his mother, a police chief, and his friends must confront terrifying forces.",
      thumbnailUrl: "https://image.tmdb.org/t/p/w500/56v2KjBlU4XaOv9rVYEQypROD7P.jpg",
      genres: ["Drama", "Fantasy", "Horror"],
      releaseYear: "2016",
      maturityRating: "TV-14",
      duration: "50m",
      cast: ["Millie Bobby Brown", "Finn Wolfhard"],
    },
    {
      id: "top-2",
      title: "Squid Game",
      description: "Hundreds of cash-strapped players accept a strange invitation to compete in deadly children's games.",
      thumbnailUrl: "https://image.tmdb.org/t/p/w500/dDlEmu3EZ0Pgg93K2SVNLCjCSvE.jpg",
      genres: ["Action", "Mystery", "Drama"],
      releaseYear: "2021",
      maturityRating: "TV-MA",
      duration: "55m",
      cast: ["Lee Jung-jae", "Park Hae-soo"],
    },
    {
      id: "top-3",
      title: "Money Heist",
      description: "A criminal mastermind recruits eight people with unique abilities to carry out an elaborate bank heist.",
      thumbnailUrl: "https://image.tmdb.org/t/p/w500/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg",
      genres: ["Crime", "Drama"],
      releaseYear: "2017",
      maturityRating: "TV-MA",
      duration: "45m",
      cast: ["Úrsula Corberó", "Álvaro Morte"],
    },
    {
      id: "top-4",
      title: "The Witcher",
      description: "Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world.",
      thumbnailUrl: "https://image.tmdb.org/t/p/w500/7vjaCdMw15FEbXyLQTVa04URsPm.jpg",
      genres: ["Fantasy", "Action", "Adventure"],
      releaseYear: "2019",
      maturityRating: "TV-MA",
      duration: "1h",
      cast: ["Henry Cavill", "Anya Chalotra"],
    },
    {
      id: "top-5",
      title: "Wednesday",
      description: "Wednesday Addams attends Nevermore Academy, where she attempts to solve a murder mystery.",
      thumbnailUrl: "https://image.tmdb.org/t/p/w500/9PFonBhy4cQy7Jz20NpMygczOkv.jpg",
      genres: ["Comedy", "Fantasy", "Mystery"],
      releaseYear: "2022",
      maturityRating: "TV-14",
      duration: "45m",
      cast: ["Jenna Ortega", "Gwendoline Christie"],
    },
    {
      id: "top-6",
      title: "Bridgerton",
      description: "During the Regency era in England, eight close-knit siblings seek love and happiness in London high society.",
      thumbnailUrl: "https://image.tmdb.org/t/p/w500/6wkGRUhX9irZPJV4DUpJFRLZgm8.jpg",
      genres: ["Drama", "Romance"],
      releaseYear: "2020",
      maturityRating: "TV-MA",
      duration: "1h",
      cast: ["Regé-Jean Page", "Phoebe Dynevor"],
    },
    {
      id: "top-7",
      title: "The Crown",
      description: "Follows the political rivalries and romance of Queen Elizabeth II's reign and the events that shaped the second half of the 20th century.",
      thumbnailUrl: "https://image.tmdb.org/t/p/w500/dT0BCwhxq6gCpNdZ8jpYk8lQMW.jpg",
      genres: ["Drama", "History"],
      releaseYear: "2016",
      maturityRating: "TV-MA",
      duration: "1h",
      cast: ["Claire Foy", "Olivia Colman"],
    },
    {
      id: "top-8",
      title: "Ozark",
      description: "A financial adviser drags his family from Chicago to the Missouri Ozarks, where he must launder money to appease a drug boss.",
      thumbnailUrl: "https://image.tmdb.org/t/p/w500/oy7Peo5iFIt9sNM59lN6PrjGZyK.jpg",
      genres: ["Crime", "Drama", "Thriller"],
      releaseYear: "2017",
      maturityRating: "TV-MA",
      duration: "1h",
      cast: ["Jason Bateman", "Laura Linney"],
    },
    {
      id: "top-9",
      title: "The Queen's Gambit",
      description: "Orphaned at the tender age of nine, prodigious introvert Beth Harmon discovers and masters the game of chess.",
      thumbnailUrl: "https://image.tmdb.org/t/p/w500/zU0htwkhNvBQdVSwKhpWTRJ3WBM.jpg",
      genres: ["Drama"],
      releaseYear: "2020",
      maturityRating: "TV-MA",
      duration: "55m",
      cast: ["Anya Taylor-Joy", "Bill Camp"],
    },
    {
      id: "top-10",
      title: "Dark",
      description: "A family saga with a supernatural twist, set in a German town where the disappearance of two young children exposes the fractured relationships.",
      thumbnailUrl: "https://image.tmdb.org/t/p/w500/apbrbWs8M9lyOpJYU5WXrpFbk1Z.jpg",
      genres: ["Crime", "Drama", "Mystery"],
      releaseYear: "2017",
      maturityRating: "TV-MA",
      duration: "1h",
      cast: ["Louis Hofmann", "Lisa Vicari"],
    },
  ];

  const displayMovies = isLoading || movies.length === 0 ? placeholderMovies : movies;

  return (
    <div className="relative group mt-8 mb-12">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <span className="text-netclicks-red">{title}</span>
      </h2>
      <div className="relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => handleScroll("left")}
        >
          <ChevronLeft className="h-8 w-8" />
        </Button>

        <div
          ref={rowRef}
          className="flex gap-2 overflow-x-auto scrollbar-hide pb-10 snap-x scroll-px-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {displayMovies.map((movie, index) => (
            <div key={movie.id} className="flex-none snap-start">
              <TopTenCard movie={movie} index={index + 1} isLoading={isLoading} />
            </div>
          ))}
        </div>

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
