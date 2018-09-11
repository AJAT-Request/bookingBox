const path = require('path');

module.exports = {
  entry: path.join(__dirname, '/client/src/bookingBox.jsx'),
  output: {
    path: path.join(__dirname, '/client/dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: [
          path.join(__dirname, '/node_modules/'),
        ],
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react', '@babel/preset-env'], // babel-preset-airbnb not working
        },
      },
    ],
  },
};
