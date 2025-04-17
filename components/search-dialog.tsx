"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface SearchDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  // Mock search results
  const mockResults = [
    {
      id: "1",
      title: "Stranger Things",
      thumbnailUrl: "/placeholder.svg?height=200&width=300",
      year: "2016",
      maturityRating: "TV-14",
      genres: ["Sci-Fi", "Horror", "Drama"],
    },
    {
      id: "2",
      title: "The Crown",
      thumbnailUrl: "/placeholder.svg?height=200&width=300",
      year: "2016",
      maturityRating: "TV-MA",
      genres: ["Drama", "History", "Biography"],
    },
    {
      id: "3",
      title: "Breaking Bad",
      thumbnailUrl: "/placeholder.svg?height=200&width=300",
      year: "2008",
      maturityRating: "TV-MA",
      genres: ["Crime", "Drama", "Thriller"],
    },
  ]

  useEffect(() => {
    if (searchQuery.length > 2) {
      setIsLoading(true)

      // Simulate API call
      const timer = setTimeout(() => {
        setSearchResults(mockResults.filter((item) => item.title.toLowerCase().includes(searchQuery.toLowerCase())))
        setIsLoading(false)
      }, 500)

      return () => clearTimeout(timer)
    } else {
      setSearchResults([])
    }
  }, [searchQuery])

  const handleClearSearch = () => {
    setSearchQuery("")
    setSearchResults([])
  }

  const handleResultClick = (id: string) => {
    onOpenChange(false)
    router.push(`/watch/${id}`)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl bg-gray-900 border-gray-800 p-0">
        <div className="flex items-center border-b border-gray-800 p-4">
          <Search className="w-5 h-5 text-gray-400 mr-2" />
          <Input
            type="search"
            placeholder="Search for movies, TV shows, genres..."
            className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
          />
          {searchQuery && (
            <Button variant="ghost" size="icon" className="text-gray-400" onClick={handleClearSearch}>
              <X className="w-5 h-5" />
            </Button>
          )}
        </div>

        <div className="max-h-[70vh] overflow-y-auto p-4">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : searchResults.length > 0 ? (
            <div className="grid gap-4">
              {searchResults.map((result) => (
                <div
                  key={result.id}
                  className="flex gap-4 cursor-pointer hover:bg-gray-800 p-2 rounded-md transition-colors"
                  onClick={() => handleResultClick(result.id)}
                >
                  <Image
                    src={result.thumbnailUrl || "/placeholder.svg"}
                    alt={result.title}
                    width={120}
                    height={68}
                    className="rounded-md object-cover w-[120px] h-[68px]"
                  />
                  <div>
                    <h3 className="font-semibold">{result.title}</h3>
                    <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                      <span>{result.year}</span>
                      <span className="border px-1">{result.maturityRating}</span>
                    </div>
                    <div className="text-xs text-gray-400 mt-1">{result.genres.join(" • ")}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : searchQuery.length > 2 ? (
            <div className="text-center py-8 text-gray-400">No results found for "{searchQuery}"</div>
          ) : searchQuery.length > 0 ? (
            <div className="text-center py-8 text-gray-400">Type at least 3 characters to search</div>
          ) : (
            <div className="text-center py-8 text-gray-400">Search for movies, TV shows, actors, or genres</div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
