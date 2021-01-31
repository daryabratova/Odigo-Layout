const path = require("path");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const packageInfo = require("./package.json");

const { NODE_ENV = "production" } = process.env;

const getPublicPath = () => {
  const { homepage } = packageInfo;
  let prefix = new URL(homepage).pathname;

  if (NODE_ENV === "development") {
    prefix = "";
  }

  return `${prefix}/assets/`;
};

module.exports = {
  mode: "production",
  entry: "./src/app/entry",
  output: {
    path: path.resolve(__dirname, "./dist/assets"),
    filename: "[hash].js",
    publicPath: getPublicPath(),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/i,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.html$/i,
        use: ["html-loader"],
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.scss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(gif|jpe?g|png|svg|ico)$/i,
        use: ["file-loader"],
      },
      {
        test: /\.(ttf|eot|woff2?)$/i,
        use: ["file-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js"],
  },
  devtool: "source-map",
  devServer: {
    open: true,
    overlay: true,
    writeToDisk: true,
    contentBase: path.resolve(__dirname, "dist"),
  },
  target: "web",
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/app/index.html",
      filename: "../index.html",
      favicon: "./src/app/assets/images/favicon.ico",
    }),
  ],
};
