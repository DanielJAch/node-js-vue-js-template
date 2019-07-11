const webpack = require('webpack');
const merge = require('webpack-merge');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const baseWebpackConfig = require('./base.config');
const config = require('./config');

module.exports = merge(baseWebpackConfig('development'), {
  devtool: '#inline-source-map', // inline

  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.test.env,
      '_config.urls': config.test.urls
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsPlugin()
  ]
});
