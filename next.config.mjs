/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  output: 'standalone', // Add this for Docker compatibility
  images: {
    domains: [
      'placeholder.com',
      'images.unsplash.com',
      'i.imgur.com',
      'lh3.googleusercontent.com',
      'avatars.githubusercontent.com',
      'image.tmdb.org',
      'assets.nflxext.com',
      'occ-0-2705-34.1.nflxso.net'
    ],
    unoptimized: true,
  },
  // Add webpack configuration to handle Node.js modules
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Don't resolve 'fs' module on the client to prevent this error
      config.resolve.fallback = {
        fs: false,
        net: false,
        tls: false,
        dns: false,
        child_process: false,
        'mongodb-client-encryption': false,
        aws4: false,
        'util/types': false,
        kerberos: false,
        '@napi-rs/snappy-linux-x64-gnu': false,
        '@napi-rs/snappy-linux-x64-musl': false,
      }
    }
    return config
  },
  // Support for Digital Ocean environment
  serverRuntimeConfig: {
    PROJECT_ROOT: process.cwd(),
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    staticFolder: '/static',
  },
}

export default nextConfig
