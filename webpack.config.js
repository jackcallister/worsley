module.exports = {
  entry: './src/arc.js',

  output: {
    path: './dist',
    filename: 'arc.js'
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?stage=1&optional=runtime' }
    ]
  }
};
