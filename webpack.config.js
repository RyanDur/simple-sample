const HtmlWebpackPlugin = require("html-webpack-plugin")
const {loadCSS, loadImages, loadTS} = require("@ryandur/webpack-configs")
module.exports = {
  devtool: 'source-map',
  mode: "production",
  module: {
    rules: [
      loadTS(),
      loadCSS({sourceMap: true}),
      loadImages()
    ]
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  plugins: [new HtmlWebpackPlugin({
    template: "src/index.html",
    meta: {
      viewport: "width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
    }
  })]
}