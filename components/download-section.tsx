"use client"

import { useRef } from "react"
import Image from "next/image"
import { Download, Smartphone } from "lucide-react"
import { motion, useInView } from "framer-motion"

export function DownloadSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section ref={ref} className="py-16 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            className="text-center md:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">Download your shows to watch offline</h2>
            <p className="text-lg md:text-xl text-gray-300">
              Save your favorites easily and always have something to watch.
            </p>
          </motion.div>
          
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <div className="relative z-10">
              {/* Main Phone Image */}
              <Image
                src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/mobile-0819.jpg"
                alt="Mobile phone with Netflix app"
                width={500}
                height={750}
                className="w-full rounded-lg shadow-2xl mx-auto"
              />
              
              {/* Download Card */}
              <motion.div
                className="absolute left-1/2 transform -translate-x-1/2 bottom-8 bg-black rounded-lg border border-gray-700 p-3 flex items-center gap-3 w-[80%] shadow-xl"
                initial={{ y: 30, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <Image
                  src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/boxshot.png"
                  alt="Stranger Things poster"
                  width={45}
                  height={65}
                  className="rounded"
                />
                <div className="flex-1">
                  <p className="font-medium">Stranger Things</p>
                  <p className="text-sm text-blue-500">Downloading...</p>
                </div>
                <div className="animate-pulse">
                  <Download className="h-6 w-6 text-netclicks-red" />
                </div>
              </motion.div>
            </div>

            <div className="absolute inset-0 flex items-center justify-center z-0">
              <Smartphone className="w-24 h-24 text-netclicks-red/20" />
            </div>

            {/* Animated glow effect */}
            <motion.div
              className="absolute inset-0 bg-netclicks-red/5 rounded-lg blur-xl"
              animate={{
                opacity: [0.5, 0.8, 0.5],
                scale: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 4,
                ease: "easeInOut",
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
