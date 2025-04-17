import Link from "next/link"
import { Twitter, Instagram, Facebook, Youtube } from "lucide-react"
import { NetclicksLogo } from "@/components/netclicks-logo"

export function Footer() {
  return (
    <footer className="bg-black text-gray-400 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <Link href="/" className="inline-block mb-6">
            <NetclicksLogo size="medium" />
          </Link>
          <p>
            Questions? Call{" "}
            <Link href="tel:1-800-123-4567" className="hover:underline text-red-600">
              1-800-123-4567
            </Link>
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="space-y-3">
            <Link href="#" className="block hover:underline hover:text-white transition-colors">
              FAQ
            </Link>
            <Link href="#" className="block hover:underline hover:text-white transition-colors">
              Investor Relations
            </Link>
            <Link href="#" className="block hover:underline hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="#" className="block hover:underline hover:text-white transition-colors">
              Speed Test
            </Link>
          </div>

          <div className="space-y-3">
            <Link href="#" className="block hover:underline hover:text-white transition-colors">
              Help Center
            </Link>
            <Link href="#" className="block hover:underline hover:text-white transition-colors">
              Jobs
            </Link>
            <Link href="#" className="block hover:underline hover:text-white transition-colors">
              Cookie Preferences
            </Link>
            <Link href="#" className="block hover:underline hover:text-white transition-colors">
              Legal Notices
            </Link>
          </div>

          <div className="space-y-3">
            <Link href="#" className="block hover:underline hover:text-white transition-colors">
              Account
            </Link>
            <Link href="#" className="block hover:underline hover:text-white transition-colors">
              Ways to Watch
            </Link>
            <Link href="#" className="block hover:underline hover:text-white transition-colors">
              Corporate Information
            </Link>
            <Link href="#" className="block hover:underline hover:text-white transition-colors">
              Only on Netclicks
            </Link>
          </div>

          <div className="space-y-3">
            <Link href="#" className="block hover:underline hover:text-white transition-colors">
              Media Center
            </Link>
            <Link href="#" className="block hover:underline hover:text-white transition-colors">
              Terms of Use
            </Link>
            <Link href="#" className="block hover:underline hover:text-white transition-colors">
              Contact Us
            </Link>
            <Link href="#" className="block hover:underline hover:text-white transition-colors">
              Redeem Gift Cards
            </Link>
          </div>
        </div>

        <div className="mt-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex space-x-4 mb-4 md:mb-0">
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              <Facebook className="h-5 w-5" />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              <Youtube className="h-5 w-5" />
              <span className="sr-only">YouTube</span>
            </Link>
          </div>

          <div className="text-sm">
            <p>© 2025 Netclicks, Inc. All rights reserved.</p>
            <p className="mt-1">
              Designed with <span className="text-red-600">❤️</span> by Prajesh
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
