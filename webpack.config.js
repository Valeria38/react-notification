const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              limit: 10000
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    alias: {
      utils: path.resolve(__dirname, 'src/utils/'),
      components: path.resolve(__dirname, 'src/components'),
      images: path.resolve(__dirname, 'src/images')
    }
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    library: 'library-name',
    libraryTarget: 'umd'
  },
  optimization: {
    minimize: true
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: './package.json', to: path.resolve(__dirname, 'dist') },
        { from: './README.md', to: path.resolve(__dirname, 'dist') }
      ]
    })
  ],
  externals: {
    react: 'react'
  }
};
