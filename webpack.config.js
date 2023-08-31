
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

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
      // Добавьте эти правила для обработки файлов CSS:
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      inject: "body",
    }),
    // Добавьте данную строчку в список плагинов
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 5500,
    historyApiFallback: true, // Добавьте эту строку для корректной работы роутинга проекта
    hot: true, // Выставите значение true для горячей замены модулей (Hot module replacement)
  },
};








// module.exports = {
//   entry: "./index.js", // Входной файл, в котором мы пишем свой код
//   output: {
//     path: path.resolve(__dirname, "dist"),
//     filename: "index.js", // Выходной файл, структура проекта сгенерируется в папке "dist"
//   },
//   module: {
//     rules: [
//       {
//         test: /\.js$/,
//         exclude: /node_modules/,
//         use: {
//           loader: "babel-loader",
//         },
//       },
//     ],
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: "./index.html",
//       inject: "body",
//     }),
//   ],
//   devServer: {
//     contentBase: path.join(__dirname, "dist"),
//     compress: true,
//     port: 5500,
//   },
// };
