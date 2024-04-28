/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: []
  },
  async rewrites() {
    return process.env.NEXT_PUBLIC_APP_ENV === 'dev'
      ? [
          {
            source: '/api/:path*',
            destination: `${process.env.NEXT_PUBLIC_SERVER_URL}/:path*`,
          },
        ]
      : []
  },
}

module.exports = nextConfig
