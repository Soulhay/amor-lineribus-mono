const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * Monolithic reference implementation - the control group for the technical
 * evaluation. Same screens, same tokens, single build, single bundle.
 * Deliberately no ModuleFederationPlugin.
 */
module.exports = (env, argv) => {
  const isProd = argv.mode === 'production';

  return {
    entry: './src/index.js',
    mode: isProd ? 'production' : 'development',
    devServer: {
      port: 3001,
      historyApiFallback: true,
    },
    output: {
      publicPath: isProd ? '/amor-lineribus-mono/' : 'auto',
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[contenthash].js',
      clean: true,
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    module: {
      rules: [
        { test: /\.jsx?$/, exclude: /node_modules/, use: 'babel-loader' },
        { test: /\.s?css$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({ template: './public/index.html' }),
    ],
  };
};