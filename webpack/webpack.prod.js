const path = require("path")
const webpack = require("webpack")
const Merge = require("webpack-merge")
const CleanWebpackPlugin = require("clean-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const CompressionPlugin = require("compression-webpack-plugin")
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const CommonConfig = require("./webpack.common.js")

module.exports = Merge(CommonConfig, {
  mode: "production",
  devtool: "source-map",
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        exclude: [/\.min\.js$/gi], // skip pre-minified libs
      }),
    ],
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production"),
      },
    }),
    new CleanWebpackPlugin(["dist"], { root: process.cwd() }),
    new CompressionPlugin({
      filename: "[path].gz[query]",
      test: /\.js$|\.css$|\.html$/,
      cache: true,
      threshold: 10240,
    }),
    new CopyWebpackPlugin([
      {
        from: path.join(process.cwd(), "src/images"),
        to: "images",
      },
    ]),
  ],
  output: {
    filename: "[name].[hash].js",
    path: path.resolve(__dirname, "../dist"),
    publicPath: "",
    sourceMapFilename: "[name].map",
  },
})
