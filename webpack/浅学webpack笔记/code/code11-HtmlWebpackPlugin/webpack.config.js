const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: require('path').join(__dirname, './dist'),
    filename: 'index.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './assets/index.html',
      title: 'this is title',
      inject: 'body',
      foo: 'foo',
    })
  ],
  module: {
    rules: [

    ]
  }
}