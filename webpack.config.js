module.exports = {
  entry: "./components/App.js",
  output: {
    filename: "example/bundle.js"
  },
  module: {
    loaders: [
      {test: /\.js$/, loader: 'jsx-loader'}
    ]
  }
};
