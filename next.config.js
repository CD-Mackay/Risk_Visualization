/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    largePageDataBytes: 956 * 100000,
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    config.resolve.alias = {
      ...config.resolve.alias,
      alias: {
        path: require.resolve('path-browserify'),
        public: path.resolve(__dirname, './public'),
        src: path.resolve(__dirname, './src'),
        elements: path.resolve(__dirname, './src/components/elements'),
        globalAssets: path.resolve(__dirname, './src/globalAssets'),
        globalConfig: path.resolve(__dirname, './src/globalConfig'),
        layouts: path.resolve(__dirname, './src/components/layouts'),
        modules: path.resolve(__dirname, './src/components/modules')
      },
    }
    return config;
  },
};

module.exports = nextConfig;
