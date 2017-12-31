const path = require("path");
const CleanPlugin = require("clean-webpack-plugin");
const HtmlPlugin = require("html-webpack-plugin");

module.exports = {

  context: path.resolve(__dirname, "examples/src"),

  entry: "./index.js",

  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "examples/dist"),
    publicPath: "/"
  },

  devtool: "inline-source-map",
  devServer: {
    contentBase: path.resolve(__dirname, "examples/dist"),
    noInfo: true,
    clientLogLevel: "none",
    publicPath: "/",
    port: 9000
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: 'babel-loader'
      }
    ]
  },

  plugins: [
    new CleanPlugin([ "dist", "build" ]),
    new HtmlPlugin({
      template: "./index.html"
    })
  ]

};
