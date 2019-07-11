const webpack = require('webpack');
const merge = require('webpack-merge');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const baseWebpackConfig = require('./base.config');
const config = require('./config');

module.exports = merge(baseWebpackConfig('production'), {
  devtool: config.common.productionSourceMap ? '#source-map' : false,

  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.staging.env,
      '_config.urls': config.staging.urls
    }),
    new TerserWebpackPlugin(),
    new CompressionWebpackPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(`\\.(${config.common.productionGzipExtensions.join('|')})$`),
      threshold: 10240,
      minRatio: 0.8
    })
  ]
});
