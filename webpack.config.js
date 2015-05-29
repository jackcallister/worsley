var path = require('path');

module.exports = {
  entry: {
    main: "./src/worsley",
    container: "./src/addons/container"
  },

  output: {
    path: path.join(__dirname, './dist'),
    filename: "worsley.[name].js",
    library: ["Worsley", "[name]"],
    libraryTarget: "umd"
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  }
};

