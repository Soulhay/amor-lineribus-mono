const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * Monolithic reference implementation.
 *
 * This is the control group for the technical evaluation, not part of the
 * proposed solution. It implements the same screens, with the same design
 * tokens, as the micro-frontend version - but as a single application with
 * a single build and a single bundle. Any measured difference between the
 * two should therefore be attributable to the architecture rather than to
 * differences in scope or visual complexity.
 *
 * Deliberately no ModuleFederationPlugin here.
 */
module.exports = {
  entry: './src/index.js',
  mode: 'development',
  devServer: {
    port: 3001,
    historyApiFallback: true,
  },
  output: {
    publicPath: 'auto',
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