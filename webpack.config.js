const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path');

module.exports = {
  entry: './src/telemetry.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'telemetry.bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      name: 'index.html',
      template: 'src/index.html',
      inject: 'head',
    }),
  ],
};
