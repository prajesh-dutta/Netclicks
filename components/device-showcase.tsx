"use client"

import { useRef } from "react"
import Image from "next/image"
import { Laptop, Smartphone, Tablet } from "lucide-react"
import { motion, useInView } from "framer-motion"

export function DeviceShowcase() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const deviceVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  }

  return (
    <section ref={ref} className="py-16 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            className="relative order-2 md:order-1"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="relative z-10 rounded-lg overflow-hidden shadow-2xl">
              <Image
                src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/device-pile.png"
                alt="Multiple devices showing streaming content"
                width={600}
                height={400}
                className="w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

              {/* Video overlay */}
              <div className="absolute top-[34%] left-0 right-0 w-full flex justify-center items-center">
                <div className="w-[60%] relative">
                  <video autoPlay muted loop playsInline className="w-full">
                    <source
                      src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-devices.m4v"
                      type="video/mp4"
                    />
                  </video>
                </div>
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center gap-6 z-0">
              <motion.div
                custom={1}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={deviceVariants}
              >
                <Smartphone className="w-12 h-12 text-netclicks-red/20" />
              </motion.div>
              <motion.div
                custom={2}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={deviceVariants}
              >
                <Tablet className="w-16 h-16 text-netclicks-red/20" />
              </motion.div>
              <motion.div
                custom={3}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={deviceVariants}
              >
                <Laptop className="w-20 h-20 text-netclicks-red/20" />
              </motion.div>
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
                delay: 1,
              }}
            />
          </motion.div>
          <motion.div
            className="text-center md:text-left order-1 md:order-2"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">Watch everywhere</h2>
            <p className="text-lg md:text-xl text-gray-300">
              Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV without paying more.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
