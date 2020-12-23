const path = require('path')

module.exports = {
  mode: 'production',
  entry: './src/GallerySlider.js',
  output: {
    path: path.resolve('build'),
    filename: 'GallerySlider.js',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  externals: {
    react: 'react',
  },
}
