const path = require("path");

module.exports = {
  mode: "production",
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
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
