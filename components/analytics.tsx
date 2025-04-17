"use client"

import { useEffect } from "react"

export function Analytics() {
  useEffect(() => {
    // Track page views
    const url = window.location.pathname + window.location.search

    // In a real app, this would send analytics data to a service
    console.log(`Page view: ${url}`)

    // Example of how you would track with a real analytics service:
    // window.gtag('config', 'GA-MEASUREMENT-ID', {
    //   page_path: url,
    // })
  }, [])

  return null
}
