"use client"

import { useRef } from "react"
import Image from "next/image"
import { Tv } from "lucide-react"
import { motion, useInView } from "framer-motion"

export function FeaturedSection() {
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">Enjoy on your TV</h2>
            <p className="text-lg md:text-xl text-gray-300">
              Watch on Smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.
            </p>
          </motion.div>
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <div className="relative z-10 rounded-lg overflow-hidden shadow-2xl">
              <Image
                src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/tv.png"
                alt="TV with streaming content"
                width={600}
                height={400}
                className="w-full relative z-10"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

              {/* Video overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="absolute w-[80%] h-[70%] overflow-hidden rounded">
                  <video autoPlay muted loop playsInline className="w-full h-full object-cover">
                    <source
                      src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-tv-0819.m4v"
                      type="video/mp4"
                    />
                  </video>
                </div>
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center z-0">
              <Tv className="w-24 h-24 text-netclicks-red/20" />
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
