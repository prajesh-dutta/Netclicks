# Netclicks - Netflix Clone

A full-featured Netflix clone built with Next.js, TypeScript, Tailwind CSS, and MongoDB.

![Netclicks Screenshot](https://i.imgur.com/XYZ123.png)

## Features

- 🎬 Browse movies and TV shows
- 👤 User authentication with NextAuth.js (Email/Password, Google, GitHub)
- 🌓 Light and dark mode
- 📱 Fully responsive design
- 🎨 Beautiful UI with smooth animations
- 📺 Video playback with custom controls
- ❤️ Add to watchlist functionality
- 🔍 Search functionality
- 📊 Continue watching with progress tracking
- ⭐ Rating system
- 💬 Comments and reviews

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Next.js API Routes, MongoDB
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS, shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- MongoDB

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/yourusername/netclicks.git
cd netclicks
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Create a `.env.local` file in the root directory with the following variables:
\`\`\`
# MongoDB
MONGODB_URI=your_mongodb_uri

# NextAuth
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

# OAuth providers
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
\`\`\`

4. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

This project can be easily deployed to Vercel:

\`\`\`bash
npm install -g vercel
vercel
\`\`\`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Design inspired by Netflix
- Created with ❤️ by [Your Name]
\`\`\`

Finally, let's update the next.config.mjs file to ensure proper image loading:
