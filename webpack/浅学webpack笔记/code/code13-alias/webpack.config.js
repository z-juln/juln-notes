const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

console.log(path.join(__dirname, './src'))

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.join(__dirname, './dist')
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, './src')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      inject: 'body'
    })
  ],
  devServer: {
    port: 3000,
    contentBase: path.join(__dirname, './dist')
  }
}