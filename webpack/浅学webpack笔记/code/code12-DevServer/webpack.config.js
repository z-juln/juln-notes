const HtmlWebpackPlugin = require('html-webpack-plugin')
const output_path = require('path').join(__dirname, './dist')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: output_path,
    filename: 'index.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      title: 'hello wolrd',
      inject: 'body',
    })
  ],
  devServer: {
    port: 9000,
    contentBase: output_path
  },
}