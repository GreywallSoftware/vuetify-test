'use strict'
const path = require('path')
const webpack = require('webpack')
const config = require('../config')
const { VueLoaderPlugin } = require('vue-loader')
const { VuetifyLoaderPlugin } = require('vuetify-loader')
const vueLoaderConfig = require('./vue-loader.conf')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const StylelintPlugin = require('stylelint-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

let publicPath = config.dev.assetsPublicPath
if (process.env.NODE_ENV === 'production') {
  publicPath = config.build.assetsPublicPath
}

const plugins = [
  new VueLoaderPlugin(),
  new VuetifyLoaderPlugin(),
  new webpack.ProvidePlugin({
    jQuery: 'jquery',
    $: 'jquery',
    jquery: 'jquery'
  }),
  new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en/),
  new LodashModuleReplacementPlugin({
    shorthands: true,
    collections: true
  })
]

if (config.dev.useEslint || process.env.ESLINT) {
  console.log('ESLINT: ENABLED')
  plugins.push(new ESLintPlugin({
    extensions: ['js', 'vue'],
    lintDirtyModulesOnly: true,
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.mobile.showEslintErrorsInOverlay
  }))
} else {
  console.log('ESLINT: DISABLED')
}

if (config.dev.useStylelint || process.env.STYLELINT) {
  console.log('STYLELINT: ENABLED')
  plugins.push(new StylelintPlugin({
    lintDirtyModulesOnly: true,
    cache: true,
    failOnError: false,
    extensions: ['css', 'sass', 'scss', 'vue'],
    threads: true
  }))
} else {
  console.log('STYLELINT: DISABLED')
}

if (process.env.NODE_ENV !== 'production') {
  plugins.push(new webpack.ProgressPlugin({
    activeModules: false,
    entries: true,
    modules: true,
    modulesCount: 5000,
    profile: false,
    dependencies: true,
    dependenciesCount: 10000,
    percentBy: null,
  }))
}

console.log(resolve('../veoci-shared/i18n/web/locales'))

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  context: path.resolve(__dirname, '../'),
  entry: {
    initbugsnag_head: './src/init-bugsnag.js',
    app: './src/main.js'
  },
  output: {
    path: config.mobile.assetsRoot,
    filename: '[name].js',
    publicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      // I don't quite understand what "resolve" does or why we need it here,
      // but if you don't use it, components in veoci-shared don't get vue loaded correctly
      vue$: resolve('node_modules/vue/dist/vue.runtime.esm-bundler.js'),
      '@': resolve('src'),
      '@store': resolve('src/veoci-store/veoci-store.js'),
      '@node': resolve('node_modules'),
      '@rootNode': resolve('../node_modules'),
      '@shared': resolve('../veoci-shared'),
      '@veocijs': resolve('../veoci-js/dist'),
    },
    fallback: {
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      assert: require.resolve('assert'),
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      os: require.resolve('os-browserify'),
      url: require.resolve('url'),
      path: require.resolve('path-browserify')
    }
  },
  module: {
    rules: [
      // ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
            options: vueLoaderConfig
          },
        ],
      },
      {
        oneOf: [
          {
            test: /\.(json5?|ya?ml)$/, // target json, json5, yaml and yml files
            type: 'javascript/auto',
            loader: '@intlify/vue-i18n-loader',
            include: [ // Use `Rule.include` to specify the files of locale messages to be pre-compiled
              resolve('../veoci-shared/i18n/web/locales')
            ]
          },
          {
            test: /\.js$/,
            use: [
              {
                // NOTE: this does NOT use the top level babelrc file.
                loader: 'babel-loader?cacheDirectory',
                options: {
                  plugins: [
                    'lodash',
                    '@babel/plugin-proposal-optional-chaining',
                    '@babel/plugin-syntax-dynamic-import',
                    '@babel/plugin-proposal-export-default-from',
                    '@babel/plugin-proposal-class-properties',
                  ],
                  presets: [['@babel/preset-env']],
                  retainLines: true,
                  compact: false,
                },
              },
            ],
            include: [
              resolve('src'),
              resolve('test'),
              resolve('node_modules/webpack-dev-server/client'),
              resolve('../node_modules/serialize-error'),
              resolve('../veoci-shared'),
              resolve('../veoci-js/dist'),
              /node_modules\/vuetify\/*/,
            ],
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        type: 'asset/resource',
        generator: {
          filename: 'img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        type: 'asset/resource',
        generator: {
          filename: 'media/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.css$/i,
        use: [{
          loader: process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'style-loader'
        }, {
          loader: 'css-loader',
        }]
      },
      {
        test: /\.sass$/i,
        use: [{
          // extract css into files - MiniCss
          loader: process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'style-loader'
        }, {
          loader: 'css-loader',
        }, {
          loader: 'resolve-url-loader',
        }, {
          loader: 'sass-loader',
          options: {
            sourceMap: true // <-- !!IMPORTANT!!
          }
        }, {
          loader: 'sass-resources-loader',
          options: {
            resources: require(path.join(process.cwd(), 'src/assets/css/sassUtils.js'))
          }
        }]
      },
      {
        test: /\.scss$/i,
        use: [{
          // extract css into files - MiniCss
          loader: process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'style-loader'
        }, {
          loader: 'css-loader',
        }, {
          loader: 'resolve-url-loader',
        }, {
          loader: 'sass-loader',
          options: {
            sourceMap: true, // <-- !!IMPORTANT!
          }
        }, {
          loader: 'sass-resources-loader',
          options: {
            resources: require(path.join(process.cwd(), 'src/assets/css/scssUtils.js')),
            hoistUseStatements: true
          }
        }]
      }
    ]
  },
  plugins
}
