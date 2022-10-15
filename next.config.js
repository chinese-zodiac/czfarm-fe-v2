const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');

const nextConfig = {
  trailingSlash:true,
  assetPrefix: '.',
  webpack: function (config) {
    config.module.rules.push({
      test: /\.(eot|woff|woff2|ttf)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000,
          name: '[name].[ext]'
        }
      }
    })
    return config
  },
  images: {
    disableStaticImages: true,
  }
};

module.exports = withPlugins([withImages], nextConfig);
