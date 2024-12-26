const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");          
// It helps devlopers include all their webpack bundeles into body by using script-tag
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    static: path.join(__dirname, "./build"),
    port: 8007,
    open: true,
    historyApiFallback: true,
    headers: { "Access-Control-Allow-Origin": "*" },
    hot: true,
  },
  entry: path.resolve(__dirname, "./src/index.js"),
  output: {
    filename: "build.js",
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      inject: true,
      template: path.resolve(__dirname, "public", "index.html"),
      favicon: "./public/favicon.ico",
    }),

    new CleanWebpackPlugin(),
    new NodePolyfillPlugin(),
  ],
  resolve: {
    extensions: [".js", ".json", ".ts", ".tsx"],
  },
  module: {           //A loader Configuration
    rules: [
      {
        test: /\.css$/,         //Check for specific file types
        use: [                 //Use used to specify a list of loaders used for any specific file type
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['postcss-nested']
              }
            }
          }
        ]
      },
      {
        test: /\.(xml|config)$/,
        use: ["xml-loader"],
        resourceQuery: { not: [/url/] },
      },
      { test: /\.txt$/, use: "raw-loader" },
      {
        test: /\.(jpg|jpeg|gif|ico|png|config)$/,

        use: [
          {
            loader: "file-loader",
          },

          {
            loader: "image-webpack-loader",
          },
        ],

        // exclude: /node_modules/,              //Exclude helps devlopers decide which file shouls not be processed and Include helps to decide which file should be processed
      },

      {
        test: /\.svg$/i,
        type: "asset",
        resourceQuery: /url/, // *.svg?url
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: [/url/] }, // exclude react component if *.svg?url
        use: ["@svgr/webpack"],
      },

      {
        test: /\.(js|jsx|json)$/,
        exclude: /[\\/]node_modules[\\/]/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [['@babel/preset-env']]
            }
          },
          {
            loader: '@linaria/webpack5-loader',
            options: { preprocessor: 'none' }
          }
        ]
      },
    ],
  },
};
