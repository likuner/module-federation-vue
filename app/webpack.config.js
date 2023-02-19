const path = require('path')
const dotenv = require('dotenv')
const dotenvExpand = require('dotenv-expand')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const EslintPlugin = require('eslint-webpack-plugin')
const FileManagerPlugin = require('filemanager-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const { ModuleFederationPlugin } = webpack.container

const { NODE_ENV, CHECK_MODE, BUILD_ZIP } = process.env
const isProd = NODE_ENV === 'production'

// write global variables to process.env
// priority: process.env > .env.** > .env
dotenvExpand.expand(dotenv.config({ path: `./.env.${NODE_ENV}` }))
dotenvExpand.expand(dotenv.config())

const config = {
  entry: './src/main.js',
  output: {
    clean: true,
    filename: 'js/[name].[contenthash].js',
    // chunkFilename: 'js/chunk.[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'auto',
    assetModuleFilename: 'assets/[name].[contenthash][ext][query]'
  },
  mode: isProd ? 'production' : 'development',
  devtool: isProd ? false : 'source-map',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
    extensions: ['.js', '.vue', '.less', '.css', '.json']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              '@babel/plugin-transform-runtime',
              [
                'import',
                { libraryName: 'view-ui-plus', libraryDirectory: 'src/components' },
                'view-ui-plus'
              ]
            ]
          }
        }
      },
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
          options: {
            compilerOptions: {
              isCustomElement: (tag) => ['lazy-img'].includes(tag)
            }
          }
        }
      },
      {
        test: /\.less$/,
        sideEffects: true,
        use: [
          MiniCssExtractPlugin.loader,
          // 'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  'autoprefixer'
                ]
              }
            }
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                modifyVars: {
                  hack: `true; @import "${path.resolve(__dirname, 'src/style/variable.less')}";`,
                }
              }
            }
          }
        ]
      },
      {
        test: /\.css$/,
        sideEffects: true,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  'autoprefixer'
                ]
              }
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp|mp3|mp4)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8192
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './public/index.html',
      inject: 'body',
      minify: false,
      title: 'VUE-TEMPLATE',
      externals: [
        'vendors/lazy-img.js'
      ],
      buildTime: new Date().toLocaleString()
    }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css'
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'public'),
          filter: (resourcePath) => !resourcePath.endsWith('/index.html')
        }
      ]
    }),
    new webpack.ProvidePlugin({
      consola: 'consola'
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false
    }),
    new EslintPlugin(),
    new ModuleFederationPlugin({
      name: 'app',
      filename: 'remoteEntry.js',
      remotes: {
        app1: 'app1@http://localhost:8081/remoteEntry.js'
      },
      exposes: {}
    })
  ],
  performance: {
    hints: false
  },
  devServer: {
    port: 8080,
    client: {
      overlay: false
    }
  }
}

if (CHECK_MODE) {
  config.plugins.push(new BundleAnalyzerPlugin())
}

if (BUILD_ZIP) {
  config.plugins.push(
    new FileManagerPlugin({
      events: {
        onEnd: {
          archive: [
            {
              source: './dist',
              destination: './dist.zip',
              format: 'zip'
            }
          ]
        }
      }
    })
  )
}

module.exports = config
