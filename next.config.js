/********
 * Next.js config
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {
      allowedOrigins: [process.env.APP_URL || 'http://localhost:3000']
    }
  },
  output: 'standalone'
}

module.exports = nextConfig
