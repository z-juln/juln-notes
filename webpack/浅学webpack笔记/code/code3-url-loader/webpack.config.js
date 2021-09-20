module.exports = {
  mode: 'development',
  entry: './public/index.js',
  output: {
    path: require('path').join(__dirname, './dist'),
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.(jpg|png|jpeg|gif)$/i,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1024
          }
        }
      }
    ]
  }
}