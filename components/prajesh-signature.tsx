"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function PrajeshSignature() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  if (!visible) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="text-center"
    >
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="h-px bg-gradient-to-r from-transparent via-netclicks-red to-transparent mb-3"
      />
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="text-sm text-gray-400"
      >
        Made with <span className="text-netclicks-red animate-pulse-slow inline-block">❤️</span> by Prajesh
      </motion.p>
    </motion.div>
  )
}
