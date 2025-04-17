import NextAuth from "next-auth"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import clientPromise from "@/lib/mongodb"
import { connectToDatabase } from "@/lib/mongodb"

// Determine the base URL dynamically from available environment variables
const getBaseUrl = () => {
  // For Digital Ocean deployment
  if (process.env.DIGITAL_OCEAN_URL) {
    return process.env.DIGITAL_OCEAN_URL
  }
  
  // For Vercel or other cloud providers
  if (process.env.NEXTAUTH_URL) {
    return process.env.NEXTAUTH_URL
  }
  
  // Fallback for local development
  return "http://localhost:3000"
}

// Dynamically generated base URL
const baseUrl = getBaseUrl()

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      // Allow callbacks to be dynamic
      allowDangerousEmailAccountLinking: true,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
      // Allow callbacks to be dynamic
      allowDangerousEmailAccountLinking: true,
    }),
    // Add credentials sign in option
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          const { db } = await connectToDatabase()
          const user = await db.collection("users").findOne({
            email: credentials.email,
          })

          if (!user || !user.password) {
            return null
          }

          const passwordMatch = await bcrypt.compare(credentials.password, user.password)

          if (!passwordMatch) {
            return null
          }

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
          }
        } catch (error) {
          console.error("Auth error:", error)
          return null
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      if (token && session.user) {
        // Add user id to session
        session.user.id = token.sub || ""
      }
      return session
    },
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.uid = user.id
      }
      return token
    },
    // Enhanced redirect callback with Digital Ocean support
    async redirect({ url, baseUrl }) {
      // Log for debugging
      console.log(`Redirect requested to: ${url}`)
      console.log(`Base URL detected as: ${baseUrl}`)
      
      // Handle relative URLs
      if (url.startsWith('/')) {
        const redirectUrl = `${baseUrl}${url}`
        console.log(`Redirecting to relative path: ${redirectUrl}`)
        return redirectUrl
      }
      
      // Handle URLs on the same origin
      try {
        const urlOrigin = new URL(url).origin
        if (urlOrigin === baseUrl) {
          console.log(`Redirecting to same origin: ${url}`)
          return url
        }
        
        // Handle Digital Ocean URLs
        if (process.env.DIGITAL_OCEAN_URL && url.includes(process.env.DIGITAL_OCEAN_URL.replace(/https?:\/\//, ''))) {
          console.log(`Redirecting to Digital Ocean URL: ${url}`)
          return url
        }
      } catch (error) {
        console.error("Error parsing URL:", error)
      }
      
      // Fallback to base URL
      console.log(`Falling back to base URL: ${baseUrl}`)
      return baseUrl
    }
  },
  pages: {
    signIn: "/auth/signin",
    signUp: "/auth/signup",
    error: "/auth/error",
  },
  debug: process.env.NODE_ENV === "development",
  // Use the dynamically determined base URL
  trustHost: true,
})
