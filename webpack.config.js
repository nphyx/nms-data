/* @noflow */
let path = require("path");

module.exports = {
  entry: {
    index: path.resolve(__dirname, "index.js")
  },
  mode: "production",
  output: {
    path: path.resolve(__dirname, "dist/"),
    filename: "[name].js"
  },
  watchOptions: {
    poll: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      },
    ]
  }
}
