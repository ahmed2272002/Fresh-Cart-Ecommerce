import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ecommerce.routemisr.com',
        port: '',
        pathname: '/**',
        search: '',
      },
    ],
  },


  /* config options here */
  async redirects() {
    return [
      // Basic redirect
      {
        source: '/profile',
        destination: '/profile/myAddress',
        permanent: true,
      },
    ]
  },

  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
