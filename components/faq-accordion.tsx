"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FAQAccordion() {
  const [openItem, setOpenItem] = useState<string | null>(null)

  const faqs = [
    {
      question: "What is Netclicks?",
      answer:
        "Netclicks is a premium streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices. You can watch as much as you want, whenever you want – all for one low monthly price.",
    },
    {
      question: "How much does Netclicks cost?",
      answer:
        "Watch Netclicks on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from $8.99 to $17.99 a month. No extra costs, no contracts, and no hidden fees.",
    },
    {
      question: "Where can I watch?",
      answer:
        "Watch anywhere, anytime. Sign in with your Netclicks account to watch instantly on the web at netclicks.com from your personal computer or on any internet-connected device that offers the Netclicks app, including smart TVs, smartphones, tablets, streaming media players and game consoles. You can also download your favorite shows with the iOS, Android, or Windows 10 app.",
    },
    {
      question: "How do I cancel?",
      answer:
        "Netclicks is flexible. There are no pesky contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime. We make it easy to join and even easier to cancel.",
    },
    {
      question: "What can I watch on Netclicks?",
      answer:
        "Netclicks has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netclicks originals, and more. Watch as much as you want, anytime you want. New titles are added every week, so there's always something new to discover!",
    },
    {
      question: "Is Netclicks good for kids?",
      answer:
        "The Netclicks Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and movies in their own space. Kids profiles come with PIN-protected parental controls that let you restrict the maturity rating of content kids can watch and block specific titles you don't want kids to see.",
    },
  ]

  const handleAccordionChange = (value: string) => {
    setOpenItem(value === openItem ? null : value)
  }

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      value={openItem || ""}
      onValueChange={handleAccordionChange}
    >
      {faqs.map((faq, index) => (
        <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-800 overflow-hidden">
          <AccordionTrigger className="text-lg font-medium py-5 px-6 bg-gray-900 hover:bg-gray-800 text-left transition-all">
            {faq.question}
          </AccordionTrigger>
          <AnimatePresence>
            {openItem === `item-${index}` && (
              <AccordionContent forceMount asChild>
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="py-5 px-6 bg-gray-900 text-gray-300">{faq.answer}</div>
                </motion.div>
              </AccordionContent>
            )}
          </AnimatePresence>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
