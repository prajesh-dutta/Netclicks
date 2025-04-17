"use client"

import { useRef } from "react"
import { Check } from "lucide-react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"

export function SubscriptionPlans() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const plans = [
    {
      name: "Basic",
      price: "$8.99",
      features: ["Watch on 1 screen at a time", "Watch in HD", "Unlimited movies and TV shows", "Download on 1 device"],
      highlight: false,
    },
    {
      name: "Standard",
      price: "$13.99",
      features: [
        "Watch on 2 screens at a time",
        "Watch in Full HD",
        "Unlimited movies and TV shows",
        "Download on 2 devices",
        "Ad-free viewing",
      ],
      highlight: true,
    },
    {
      name: "Premium",
      price: "$17.99",
      features: [
        "Watch on 4 screens at a time",
        "Watch in Ultra HD and HDR",
        "Unlimited movies and TV shows",
        "Download on 6 devices",
        "Ad-free viewing",
        "Spatial Audio",
      ],
      highlight: false,
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <section ref={ref} className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">Choose the plan that's right for you</h2>
          <p className="text-lg text-gray-300">All plans include unlimited ad-free viewing on all your devices.</p>
        </div>

        <motion.div
          className="grid md:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              variants={item}
              className={`bg-gray-900 rounded-lg p-6 border ${
                plan.highlight ? "border-netclicks-red shadow-lg shadow-netclicks-red/20" : "border-gray-800"
              } hover:border-netclicks-red/70 transition-all duration-300 card-hover-effect`}
            >
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <p className="text-3xl font-bold mb-4">
                {plan.price}
                <span className="text-sm font-normal text-gray-400">/month</span>
              </p>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full ${
                  plan.highlight
                    ? "bg-netclicks-red hover:bg-netclicks-red/90 button-glow"
                    : "bg-white/10 hover:bg-white/20"
                }`}
              >
                Choose Plan
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
