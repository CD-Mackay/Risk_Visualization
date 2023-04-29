/** 
 * @type {import('next').NextConfig}
 */
const path = require('path')

const nextConfig = {
  pageExtensions: ['mdx', 'md', 'jsx', 'js', 'tsx', 'ts'],
  experimental: {
    largePageDataBytes: 956 * 100000,
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
};

module.exports = nextConfig;
