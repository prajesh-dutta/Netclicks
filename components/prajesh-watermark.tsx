"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function PrajeshWatermark() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true)

      // Hide after 5 seconds
      const hideTimer = setTimeout(() => {
        setVisible(false)
      }, 5000)

      return () => clearTimeout(hideTimer)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="fixed bottom-8 right-8 z-50"
        >
          <div className="glass-effect px-4 py-2 rounded-full border border-netclicks-red/30">
            <p className="text-sm text-white/80">
              Crafted by <span className="font-bold text-netclicks-red">Prajesh</span>
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
