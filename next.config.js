/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  // images: {
  //   domains: ['https://res.cloudinary.com/'],
  // },
  // images:{
  //   remotePatterns: [
  //     {
  //       protocol: 'https',
  //       hostname: 'example.com',
  //       port: '',
  //       pathname: '/account123/**',
  //     },
  //   ],
  // }
}

module.exports = nextConfig
