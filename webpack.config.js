/* eslint-disable @typescript-eslint/no-var-requires */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
  configCSS,
  loadImages,
  loadTS,
  merge
} = require('@ryandur/webpack-configs');

module.exports = merge(
  loadTS(),
  configCSS({ sourceMap: true, production: true }),
  loadImages(),
  {
    devtool: 'source-map',
    mode: 'production',
    resolve: {
      extensions: ['.ts', '.js']
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Webpack demo',
        template: 'src/index.html',
        meta: {
          viewport:
            'width=device-width, ' +
            'user-scalable=no, ' +
            'initial-scale=1.0, ' +
            'maximum-scale=1.0, ' +
            'minimum-scale=1.0'
        }
      })
    ]
  }
);
