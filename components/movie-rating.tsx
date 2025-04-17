"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { motion } from "framer-motion"

interface MovieRatingProps {
  currentRating: number | null
  onRate: (rating: number) => void
}

export function MovieRating({ currentRating, onRate }: MovieRatingProps) {
  const [hoverRating, setHoverRating] = useState<number | null>(null)

  const displayRating = hoverRating !== null ? hoverRating : currentRating

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-1 mb-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <motion.button
            key={star}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className="focus:outline-none"
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(null)}
            onClick={() => onRate(star)}
          >
            <Star
              className={`h-8 w-8 cursor-pointer ${
                displayRating !== null && star <= displayRating ? "text-yellow-400 fill-yellow-400" : "text-gray-500"
              } transition-colors`}
            />
          </motion.button>
        ))}
      </div>
      <p className="text-sm text-gray-400">
        {displayRating ? `You rated this ${displayRating} out of 5 stars` : "Rate this title"}
      </p>
    </div>
  )
}
