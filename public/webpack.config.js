const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');

const config = {
  entry: {
    index: './index.js',
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].bundle.js',
  },
  mode: 'development',
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
    ],
  },
  plugins: [
    new WebpackPwaManifest({
      fingerprints: false,
      name: 'Budget Tracker',
      short_name: 'Bdgt Trkr',
      description:
        'An application that allows you to add expenses and deposits to your budget.',
      background_color: '#808080',
      theme_color: '#317EFB',
      'theme-color': '#317EFB',
      start_url: '/',
      icons: [
        {
          src: path.resolve('icons/icon-512x512.png'),
          sizes: [96, 128, 192, 256, 384, 512],
          destination: path.join('icons'),
        },
      ],
    }),
  ],
};

module.exports = config;
