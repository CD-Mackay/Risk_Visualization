/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
  experimental: {
    appDir: true,
    largePageDataBytes: 956 * 100000,
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    config.resolve.alias = {
      ...config.resolve.alias,
        path: require.resolve('path-browserify'),
        public: path.resolve(__dirname, './public'),
        src: path.resolve(__dirname, './src'),
    }
    return config;
  },
};

module.exports = nextConfig;
