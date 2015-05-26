module.exports = {
  entry: './src/worsley.js',

  output: {
    path: './dist',
    filename: 'worsley.js'
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?stage=1&optional=runtime' }
    ]
  }
};
