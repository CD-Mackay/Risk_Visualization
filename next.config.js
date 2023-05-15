/**
 * @type {import('next').NextConfig}
 */
const path = require("path");

const nextConfig = {
  pageExtensions: ["mdx", "md", "jsx", "js", "tsx", "ts"],
  experimental: {
    appDir: true,
    largePageDataBytes: 956 * 100000,
  },
  webpack: (config, { isServer }) => {
    config.resolve.fallback = { fs: false };
    if (!isServer) config.resolve.fallback = {
      fs: false,
      path: false,
    }
    return config;
  },
};

module.exports = nextConfig;
