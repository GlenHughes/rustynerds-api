const path = require("path")
const webpack = require("webpack")
const Merge = require("webpack-merge")
const CommonConfig = require("./webpack.common.js")

const PORT = process.env.PORT || 4000

module.exports = Merge(CommonConfig, {
  devtool: "inline-source-map",
  mode: "development",
  optimization: {
    usedExports: true,
  },
  devServer: {
    publicPath: "/",
    port: PORT,
    historyApiFallback: true,
    contentBase: path.join(process.cwd(), "dist"), // static file location
    hot: true,
    disableHostCheck: true,
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
})
