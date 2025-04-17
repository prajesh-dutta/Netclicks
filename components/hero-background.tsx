"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

export function HeroBackground() {
  const [backgroundIndex, setBackgroundIndex] = useState(0)
  
  // Array of background images to cycle through (using real movie backdrops)
  const backgroundImages = [
    "https://image.tmdb.org/t/p/original/707PhS3Vg4KviXVNPXm9X3nK7TW.jpg", // Interstellar backdrop
    "https://image.tmdb.org/t/p/original/hZkgoQYus5vegHoetLkCJzb17zJ.jpg", // Inception backdrop
    "https://image.tmdb.org/t/p/original/AbgEQO2mneCSOc8CSnOMa8pBS8I.jpg", // Dune backdrop
    "https://image.tmdb.org/t/p/original/5P8SmMzSNYikXpxil6BYzJ16611.jpg"  // Batman backdrop
  ]
  
  // Cycle through background images
  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundIndex((prev) => (prev + 1) % backgroundImages.length)
    }, 8000)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black z-20"></div>
      
      {/* Animated grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.2)_0.5px,transparent_0.5px),linear-gradient(90deg,rgba(0,0,0,0.2)_0.5px,transparent_0.5px)] bg-[size:40px_40px] opacity-30 z-10"></div>
      
      {/* Dynamic background images */}
      {backgroundImages.map((src, index) => (
        <motion.div
          key={index}
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: index === backgroundIndex ? 1 : 0,
            scale: index === backgroundIndex ? 1 : 1.1
          }}
          transition={{ 
            opacity: { duration: 1.5 }, 
            scale: { duration: 8 } 
          }}
        >
          <Image
            src={src}
            alt={`Movie backdrop ${index + 1}`}
            fill
            priority={index === 0}
            className="object-cover"
            onError={(e) => {
              // Fallback if image fails to load
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = `/placeholder.svg?height=1080&width=1920&text=Netclicks`;
            }}
          />
        </motion.div>
      ))}
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 z-10">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-70"
            initial={{ 
              x: `${Math.random() * 100}%`, 
              y: `${Math.random() * 100}%`, 
              opacity: Math.random() * 0.5 + 0.3
            }}
            animate={{ 
              x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`], 
              y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
              opacity: [Math.random() * 0.5 + 0.3, Math.random() * 0.5 + 0.3]
            }}
            transition={{ 
              duration: Math.random() * 20 + 20, 
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>
    </div>
  )
}
