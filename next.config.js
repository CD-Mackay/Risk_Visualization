/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    largePageDataBytes: 956 * 100000,
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    return config;
  },
};

module.exports = nextConfig;
