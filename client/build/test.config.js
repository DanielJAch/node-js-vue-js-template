const webpack = require('webpack');
const merge = require('webpack-merge');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const config = require('../../config');
const baseWebpackConfig = require('./base.config');
const plugins = [
  new webpack.DefinePlugin({
    'process.env': config.test.env,
    '_config.urls': config.test.urls
  }),
  new webpack.NoEmitOnErrorsPlugin(),
  new FriendlyErrorsPlugin()
];

module.exports = merge(baseWebpackConfig('development'), {
  devtool: '#inline-source-map', // inline
  plugins
});
