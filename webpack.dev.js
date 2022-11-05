const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.html$/,
        use:  [
          {
            loader: 'html-loader',
            options: { minimize: false },
          }
        ]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {loader: MiniCssExtractPlugin.loader}, 
          {loader: 'css-loader'}, 
          {loader: "postcss-loader"},
          {
            // First we transform SASS to standard CSS
            loader: "sass-loader",
            options: {
              implementation: require("sass")
            }
          }
        ],
      },
      {
        // Now we apply rule for images
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
               {
                 // Using file-loader for these files
                 loader: "file-loader",
  
                 // In options we can set different things like format
                 // and directory to save
                 options: {
                   outputPath: 'images'
                 }
               }
             ]
      },
      {
        // Apply rule for fonts files
        test: /\.(woff|woff2|ttf|otf|eot)$/,
        use: [
               {
                 // Using file-loader too
                 loader: "file-loader",
                 options: {
                   outputPath: 'fonts'
                 }
               }
             ]
      }
    ]
  },
  plugins: [
    new  HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
  devtool: 'inline-source-map',

  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 3000,
  },
};