/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.discordapp.com',
      },
    ],
  },
  eslint: {
    // Disable ESLint during build - fix linting issues separately
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
