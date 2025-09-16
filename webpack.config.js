const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProduction ? 'shiply.min.js' : 'shiply.js',
      library: {
        name: 'Shiply',
        type: 'umd',
        export: 'default',
      },
      globalObject: 'this',
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './examples/index.html',
        filename: 'index.html',
        inject: 'body',
      }),
    ],
    optimization: {
      minimize: isProduction,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: isProduction,
            },
          },
        }),
      ],
    },
    devServer: {
      static: {
        directory: path.join(__dirname, 'examples'),
      },
      compress: true,
      port: 3001,
      open: true,
      hot: true,
    },
    devtool: isProduction ? 'source-map' : 'eval-source-map',
  };
};
