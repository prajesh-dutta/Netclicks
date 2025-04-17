"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface AnimatedTextProps {
  text: string
  className?: string
  highlight?: string
  highlightClass?: string
  delay?: number
}

export function AnimatedText({ text, className = "", highlight, highlightClass = "", delay = 0 }: AnimatedTextProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <h1 className={className}>{text}</h1>

  // Split the text into words
  const words = text.split(" ")
  
  // Variants for container animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { 
        staggerChildren: 0.12, 
        delayChildren: delay * i 
      },
    }),
  }
  
  // Variants for each word animation
  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  }

  return (
    <motion.h1
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      aria-label={text}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="inline-block mr-2 relative"
          variants={wordVariants}
        >
          {word.toLowerCase() === highlight?.toLowerCase() ? (
            <span className={`relative ${highlightClass}`}>
              {word}
              <motion.span 
                className="absolute -bottom-1 left-0 w-full h-1 bg-current" 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: (words.length * 0.12) + delay + 0.2, duration: 0.4 }}
              />
              <motion.span 
                className="absolute -inset-1 rounded-md bg-red-600/20 -z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: (words.length * 0.12) + delay + 0.6, duration: 0.8 }}
              />
            </span>
          ) : (
            word
          )}
          {index < words.length - 1 && " "}
        </motion.span>
      ))}
    </motion.h1>
  )
}
