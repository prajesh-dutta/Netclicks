"use client"

import { motion } from "framer-motion"
import Link from "next/link"

interface NetclicksLogoProps {
  size?: "small" | "medium" | "large"
  withAnimation?: boolean
  variant?: "default" | "white"
}

export function NetclicksLogo({ 
  size = "medium", 
  withAnimation = false,
  variant = "default" 
}: NetclicksLogoProps) {
  const sizeClasses = {
    small: "text-xl md:text-2xl",
    medium: "text-2xl md:text-3xl",
    large: "text-3xl md:text-5xl",
  }

  const textColor = variant === "white" ? "text-white" : "text-red-600"

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3
      }
    })
  }

  // Stylish logo with letter animation
  const renderStylishLogo = () => {
    const letters = "NETCLICKS".split("");
    
    return (
      <div className={`font-bold font-montserrat ${sizeClasses[size]} ${textColor} flex items-center`}>
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            custom={index}
            initial={withAnimation ? "hidden" : "visible"}
            animate="visible"
            variants={letterVariants}
            className={`inline-block ${letter === 'T' ? 'text-white' : ''} hover:scale-110 hover:text-red-500 transition-all duration-200`}
            style={{ textShadow: '0 0 5px rgba(255, 0, 0, 0.3)' }}
          >
            {letter}
            {letter === 'N' && (
              <motion.span 
                className="absolute -mt-1 ml-0.5 text-red-500 opacity-80"
                animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                •
              </motion.span>
            )}
          </motion.span>
        ))}
      </div>
    );
  };

  if (withAnimation) {
    return (
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.5 }}
      >
        {renderStylishLogo()}
      </motion.div>
    );
  }

  return renderStylishLogo();
}

export function NetclicksLogoLink({ size = "medium", withAnimation = false, variant = "default" }: NetclicksLogoProps) {
  return (
    <Link href="/" className="inline-block">
      <NetclicksLogo size={size} withAnimation={withAnimation} variant={variant} />
    </Link>
  )
}
