module.exports = {
  mode: 'development',
  entry: {
    index1: './resource/index1.js',
    index2: './resource/index2.js'
  },
  output: {
    path: require('path').join(__dirname, './bundle'),
    filename: '[name].[hash].js'
  }
}