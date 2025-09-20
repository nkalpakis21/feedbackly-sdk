const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProduction ? 'shiply.esm.min.js' : 'shiply.esm.js',
      library: {
        type: 'module',
      },
      environment: {
        module: true,
      },
    },
    experiments: {
      outputModule: true,
    },
    externals: {
      'react': 'react',
      'react-dom': 'react-dom'
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', {
                  modules: false,
                  targets: {
                    esmodules: true,
                  },
                }],
                '@babel/preset-react',
              ],
            },
          },
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
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
    devtool: isProduction ? 'source-map' : 'eval-source-map',
  };
};

