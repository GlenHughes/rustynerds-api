const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

const svgoOptions = {
  /* Some plugins must be disabled, otherwise the UI breaks. */
  plugins: [
    { removeUnknownsAndDefaults: false },
    { removeComments: true },
    { cleanupIDs: false },
    { removeTitle: true },
    { convertShapeToPath: false },
    { convertPathData: false },
    { removeViewBox: false },
  ],
}

const imagemin = require("imagemin-svgo")

module.exports = {
  context: path.join(process.cwd(), "src"),
  entry: "./index.js",
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      filename: "./index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: "babel-loader?cacheCompression",
          },
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "file-loader",
          },
          {
            loader: "img-loader",
            options: {
              plugins: [imagemin(svgoOptions)],
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".css", ".js"],
    modules: [path.join(process.cwd(), "src"), "node_modules"],
  },
}
