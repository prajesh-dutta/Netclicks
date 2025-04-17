"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Play, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import type { Movie } from "@/lib/types"

interface ContinueWatchingItem extends Movie {
  progress: number
  timestamp: number
}

export function ContinueWatchingRow() {
  const [items, setItems] = useState<ContinueWatchingItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const rowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchContinueWatching = () => {
      try {
        // Get from localStorage
        const continueWatching = JSON.parse(localStorage.getItem("continueWatching") || "[]")
        
        if (continueWatching.length > 0) {
          setItems(continueWatching)
        } else {
          // Use sample data if nothing in localStorage
          setItems(sampleContinueWatching)
        }
      } catch (error) {
        console.error("Error fetching continue watching:", error)
        setItems(sampleContinueWatching)
      } finally {
        setIsLoading(false)
      }
    }

    fetchContinueWatching()
  }, [])

  const handleScroll = (direction: "left" | "right") => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current
      const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth

      rowRef.current.scrollTo({
        left: scrollTo,
        behavior: "smooth",
      })
    }
  }

  // Sample data with actual movie posters
  const sampleContinueWatching: ContinueWatchingItem[] = [
    {
      id: "continue-1",
      title: "The Witcher",
      description: "Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.",
      thumbnailUrl: "https://image.tmdb.org/t/p/w500/7vjaCdMw15FEbXyLQTVa04URsPm.jpg",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      genres: ["Fantasy", "Action", "Adventure"],
      releaseYear: "2019",
      maturityRating: "TV-MA",
      duration: "1h",
      cast: ["Henry Cavill", "Freya Allan"],
      progress: 45,
      timestamp: Date.now() - 1000 * 60 * 60,
    },
    {
      id: "continue-2",
      title: "Stranger Things",
      description: "When a young boy disappears, his mother, a police chief, and his friends must confront terrifying supernatural forces.",
      thumbnailUrl: "https://image.tmdb.org/t/p/w500/56v2KjBlU4XaOv9rVYEQypROD7P.jpg",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      genres: ["Drama", "Fantasy", "Horror"],
      releaseYear: "2016",
      maturityRating: "TV-14",
      duration: "50m",
      cast: ["Millie Bobby Brown", "Finn Wolfhard"],
      progress: 72,
      timestamp: Date.now() - 1000 * 60 * 60 * 3,
    },
    {
      id: "continue-3",
      title: "Money Heist",
      description: "Eight thieves take hostages in the Royal Mint of Spain as a criminal mastermind manipulates the police.",
      thumbnailUrl: "https://image.tmdb.org/t/p/w500/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      genres: ["Crime", "Drama"],
      releaseYear: "2017",
      maturityRating: "TV-MA",
      duration: "45m",
      cast: ["Úrsula Corberó", "Álvaro Morte"],
      progress: 23,
      timestamp: Date.now() - 1000 * 60 * 60 * 24,
    },
    {
      id: "continue-4",
      title: "The Queen's Gambit",
      description: "Orphaned at the tender age of nine, prodigious introvert Beth Harmon discovers and masters the game of chess.",
      thumbnailUrl: "https://image.tmdb.org/t/p/w500/zU0htwkhNvBQdVSwKhpWTRJ3WBM.jpg",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      genres: ["Drama"],
      releaseYear: "2020",
      maturityRating: "TV-MA",
      duration: "55m",
      cast: ["Anya Taylor-Joy", "Bill Camp"],
      progress: 86,
      timestamp: Date.now() - 1000 * 60 * 60 * 12,
    },
    {
      id: "continue-5",
      title: "Squid Game",
      description: "Hundreds of cash-strapped players accept a strange invitation to compete in children's games.",
      thumbnailUrl: "https://image.tmdb.org/t/p/w500/dDlEmu3EZ0Pgg93K2SVNLCjCSvE.jpg",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
      genres: ["Mystery", "Survival", "Drama"],
      releaseYear: "2021",
      maturityRating: "TV-MA",
      duration: "55m",
      cast: ["Lee Jung-jae", "Park Hae-soo"],
      progress: 35,
      timestamp: Date.now() - 1000 * 60 * 60 * 5,
    },
    {
      id: "continue-6",
      title: "Dark",
      description: "A family saga with a supernatural twist, set in a German town where the disappearance of two children exposes the relationships among four families.",
      thumbnailUrl: "https://image.tmdb.org/t/p/w500/apbrbWs8M9lyOpJYU5WXrpFbk1Z.jpg",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
      genres: ["Crime", "Drama", "Mystery"],
      releaseYear: "2017",
      maturityRating: "TV-MA",
      duration: "50m",
      cast: ["Louis Hofmann", "Oliver Masucci"],
      progress: 64,
      timestamp: Date.now() - 1000 * 60 * 60 * 8,
    }
  ]

  if (items.length === 0 && !isLoading) {
    return null
  }

  return (
    <div className="relative group">
      <h2 className="text-xl font-semibold mb-4">Continue Watching</h2>
      <div className="relative">
        {/* Left scroll button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => handleScroll("left")}
        >
          <ChevronLeft className="h-8 w-8" />
        </Button>

        {/* Movies row */}
        <div
          ref={rowRef}
          className="flex gap-2 overflow-x-auto scrollbar-hide pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {(isLoading ? [1, 2, 3, 4] : items).map((item, index) => (
            <div key={isLoading ? index : item.id} className="flex-none w-[250px]">
              {isLoading ? (
                <div className="animate-pulse space-y-1">
                  <div className="w-full h-[140px] bg-gray-800 rounded-md" />
                  <div className="h-1.5 bg-gray-700 rounded" />
                  <div className="h-4 w-2/3 bg-gray-800 rounded" />
                </div>
              ) : (
                <div className="space-y-1">
                  <div className="w-full h-[140px] relative rounded-md overflow-hidden group/item">
                    <Image
                      src={item.thumbnailUrl || "https://image.tmdb.org/t/p/w500/rYOzV1xPNjYJdmNYKpvscONvNBV.jpg"}
                      alt={item.title}
                      width={250}
                      height={140}
                      className="object-cover w-full h-full"
                    />
                    
                    <div className="opacity-0 group-hover/item:opacity-100 transition-opacity absolute inset-0 bg-black/40 flex items-center justify-center gap-4">
                      <Link href={`/watch/${item.id}`}>
                        <Button size="sm" className="rounded-full w-12 h-12 bg-white/30 hover:bg-white/40 backdrop-blur-sm">
                          <Play fill="white" className="h-6 w-6 text-white" />
                        </Button>
                      </Link>
                      
                      <Button variant="ghost" size="sm" className="rounded-full w-10 h-10 bg-black/30 hover:bg-black/40 backdrop-blur-sm">
                        <Info className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                  
                  <Progress value={item.progress} className="h-1.5 bg-gray-700" indicatorClassName="bg-netclicks-red" />
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium truncate pr-2">{item.title}</span>
                    <span className="text-gray-400 text-xs whitespace-nowrap">{formatWatchTime(item.timestamp)}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right scroll button */}
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

// Helper function to format the timestamp
function formatWatchTime(timestamp: number): string {
  const now = Date.now()
  const diff = now - timestamp
  
  // Less than an hour
  if (diff < 1000 * 60 * 60) {
    return 'Just now'
  }
  // Less than a day
  else if (diff < 1000 * 60 * 60 * 24) {
    const hours = Math.floor(diff / (1000 * 60 * 60))
    return `${hours}h ago`
  }
  // Less than a week
  else if (diff < 1000 * 60 * 60 * 24 * 7) {
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    return `${days}d ago`
  }
  // Otherwise show the date
  else {
    const date = new Date(timestamp)
    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
  }
}
