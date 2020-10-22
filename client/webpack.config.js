const HtmlWebpackPlugin = require("html-webpack-plugin")
const webpack = require("webpack")
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCssAssetWebpackPlugin = require("optimize-css-assets-webpack-plugin")
const TerserWebpackPlugin = require("terser-webpack-plugin")
const path = require("path")

const isDev = process.env.NODE_ENV === "development"
const isProd = process.env.NODE_ENV === "production"

const optimization = () => {
  const config = {
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all",
    },
  }
  if (isProd) {
    config.minimizer = [
      new OptimizeCssAssetWebpackPlugin(),
      new TerserWebpackPlugin(),
    ]
  }
  return config
}
module.exports = {
  entry: {
    main: path.join(__dirname, "src/index.tsx"),
  },
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "/",
    filename: "[name].bundle.js",
    chunkFilename: "[id].chunk.js",
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [{ loader: "ts-loader" }],
      },
      {
        test: /\s?css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev,
              reloadAll: true,
            },
          },
          { loader: "css-loader" },
          { loader: "sass-loader" },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff(2)?)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    alias: { "@": path.join(__dirname, "src") },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsPlugin(),
    new MiniCssExtractPlugin({ filename: "[name].css" }),
  ],
  mode: "development",
  devtool: isDev ? "eval-cheap-module-source-map" : "",
  optimization: optimization(),
  devServer: {
    compress: true,
    historyApiFallback: true,
    hot: isDev,
    open: true,
    overlay: true,
    port: 8000,
    stats: {
      normal: true,
    },
  },
}
