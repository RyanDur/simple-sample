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
          viewport: [
            'width=device-width', // sets the width of the page to follow the
            // screen-width of the device
            'initial-scale=1.0' // sets the initial zoom level when the page
            // is first loaded by the browser.

            // BELOW ARE NOT RECOMMENDED BECAUSE IT TAKES THE CONTROL AWAY FROM
            //                            THE USER
            // 'user-scalable=no,', // Allows the device to zoom in and out.
            // 'maximum-scale=1.0,', // The minimum amount the visitor can zoom
            // on the page. 1.0 does not zoom.
            // 'minimum-scale=1.0' // The maximum amount the visitor can zoom on
            // the page. 1.0 does not zoom.
          ].join(',')
        }
      })
    ]
  }
);
