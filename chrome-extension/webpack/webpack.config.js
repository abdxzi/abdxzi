#!/usr/bin/env node

import { URL } from "url";
import webpack from "webpack";

export default {
  mode: "production", //process.env.NODE_ENV || "development",
  entry: "./output.js",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react"],
          },
        },
      },
    ],
  },
  output: {
    filename: "popup.js",
    path: "E:\\extension-build\\dist\\js",
  },
  devServer: {
    static: new URL("dist", import.meta.url).pathname,
  },
  experiments: {
    asyncWebAssembly: true,
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: "process/browser.js",
      Buffer: ['buffer', 'Buffer'],
    }),
  ],
  resolve: {
    // Add your custom resolution logic here
    // For example, to automatically resolve.mjs files:
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      // Example alias
      'stream': 'stream-browserify',
      // 'buffer': "Buffer"
    },
  },
};
