// module.exports = {
//     entry: "./index.js", // Входной файл, в котором мы пишем свой код
//     output: {
//         filename: "index.js" // Выходной файл, который подключаем к HTML
// 					// Обратите внимание, сохранится он по пути "./dist/main.js"
//     }
// }
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./index.js", // Входной файл, в котором мы пишем свой код
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js", // Выходной файл, структура проекта сгенерируется в папке "dist"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      inject: "body",
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 5500,
  },
};
