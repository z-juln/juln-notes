module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: require('path').join(__dirname, './dist'),
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: 'css-loader'
      }
    ]
  }
}