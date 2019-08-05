const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = (env) => {
  const minimizeCss = env === 'production';
  const chunkhash = env === 'development' ? '' : '.[chunkhash:7]';
  const hash = env === 'development' ? '' : '.[hash:7]';
  const bundleOutputDir = '../dist';
  const cssFileName = `site${chunkhash}.css`;

  function resolve(dir) {
    return path.join(__dirname, '..', dir);
  }

  function assetsPath(_path) {
    const assetsSubDirectory = 'static';

    return path.posix.join(assetsSubDirectory, _path);
  }

  return {
    stats: { modules: false },
    mode: env,

    entry: {
      'main': [
        resolve('/src/app.js'),
        resolve('../node_modules/bootstrap-vue/dist/bootstrap-vue.js'),
        resolve('/src/styles/core.scss')
      ]
    },

    output: {
      path: path.join(__dirname, bundleOutputDir),
      filename: `[name]${chunkhash}.js`,
      publicPath: '/dist/'
    },

    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    },

    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        'vue$': 'vue/dist/vue.js',
        '@': resolve('/src', true)
      }
    },

    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            'scss': 'vue-style-loader!css-loader!sass-loader',
            'sass': 'vue-style-loader!css-loader!sass-loader!indentedSyntax'
          }
        },
        {
          enforce: 'pre',
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'eslint-loader',
          options: {
            // eslint options (if necessary)
            formatter: require('eslint-friendly-formatter')
          }
        },
        {
          test: /\.(scss|sass|css)$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                minimize: minimizeCss,
                sourceMap: true
              }
            },
            'css-loader',
            'sass-loader'
          ]
        },
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 3000,
            name: assetsPath(`img/[name]${hash}.[ext]`)
          }
        },
        {
          test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: assetsPath(`media/[name]${hash}.[ext]`)
          }
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: assetsPath(`fonts/[name]${hash}.[ext]`)
          }
        }
      ]
    },

    plugins: [
      new MiniCssExtractPlugin({
        filename: cssFileName
      }),
      new VueLoaderPlugin(),
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: '',
        template: './client/src/index.html'
      })
    ]
  };
};
