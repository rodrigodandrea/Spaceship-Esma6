var path = require('path');
var webpack = require('webpack');
const glob = require('glob');

//Plugins
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');



var extractPlugin = new ExtractTextPlugin({
  filename: 'main.css',
  // allChunks: true
})



module.exports = {
  entry: {
    app: './src/js/app.js',
  },
  output: {
    path: path.resolve(__dirname,'dist'),
    filename: '[name].bundle.js',
    // publicPath: '/dist'
  },
  module:{
    rules:[
      {
        test: /\.js$/,
        use:[
          {
            loader: 'babel-loader',
            options: {
              presets: ['es2015']
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: ['html-loader']
      },
      {
        test: /\.node$/,
        use: 'node-loader'
      },
      {
        test: /\.mp4$/,
        use: [
          {
            loader: 'file-loader',
            options:{
              name: 'video/[name].[ext]',
            },
          },
        ]
      },
      {
        test: /\.(OTF|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options:{
              name: 'fonts/[name].[ext]',
            },
          },
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options:{
              name: 'img/[name].[ext]',
              // outputFile: 'img/',
              // publicPath: 'img/',
              // useRelativePath: true,
            },
            // include: path.join(__dirname, 'src')
          },
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
              mozjpeg: {
                  progressive: true,
                  quality: 65
                },
                // optipng.enabled: false will disable optipng
                optipng: {
                  enabled: false,
                },
                pngquant: {
                  quality: '65-90',
                  speed: 4
                },
                gifsicle: {
                  interlaced: false,
                },
                // the webp option will enable WEBP
                webp: {
                  quality: 75
                }
            }
          }
        ],
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: [
               {
                   loader: 'css-loader?sourceMap',
               },
               {
                   loader: 'postcss-loader?sourceMap',
               },
               {
                  loader: 'sass-loader?sourceMap'
               }
            ]
        }),
      }
    ]
  },
  plugins:[
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    extractPlugin,
    new HtmlWebpackPlugin({
        hash: true,
        title: 'My Awesome application',
        myPageHeader: 'Hello World',
        template: './src/index.html',
        chunks: ['app'],
        filename: 'index.html' //relative to root of the application
    }),
    new CleanWebpackPlugin(['dist']),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    })
  ]
}