const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  context: path.resolve(__dirname, 'src'),

  entry: {
    app: './app.js'
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },

  module: {
    rules: [
      //babel-loader
      {
        test: /\.js$/,
        include: /src/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['env']
          }
        }
      },
      //html-loader
      { test: /\.html$/, use: ['html-loader'] },
      { test: /\.(png|jpe?g|otf)$/, use: 'base64-inline-loader'}
    ]
  },

  plugins: [
    new CleanWebpackPlugin(['dist']),
    //html-webpack-plugin instantiation
    new HtmlWebpackPlugin({
      template: 'index.html',
      inject: false
    })
  ],

  devServer: {
    contentBase: path.resolve(__dirname, "./dist/assets/media"),
    compress: true,
    port: 3000,
    stats: 'errors-only',
    open: true
  },

  devtool: 'inline-source-map'
}

module.exports = config;

