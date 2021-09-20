const { DefinePlugin } = require('webpack')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: require('path').join(__dirname, './dist'),
    filename: 'index.js'
  },
  plugins: [
    new DefinePlugin({
      foo: "'juln'",
      "log": "console.log"
    })
  ]
}