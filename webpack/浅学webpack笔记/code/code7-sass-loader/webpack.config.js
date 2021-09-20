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
        test: /\.(css|sass|scss)$/i,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  }
}