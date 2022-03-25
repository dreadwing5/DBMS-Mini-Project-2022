const path = require("path");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
  mode: "development",
  watchOptions: {
    ignored: "**/node_modules",
  },
  entry: {
    index: [
      "./public/js/controller.js",
      "./public/js/utils/MenuWindow.js",
      "./public/js/utils/Utils.js",
    ],
  },
  output: {
    filename: "[name].js",
    path: __dirname + "/dist",
    clean: true,
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [new BundleAnalyzerPlugin()],
};
