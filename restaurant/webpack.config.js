const path = require('path');

module.exports = {
  entry: './src/index.js',       // Your main JS file
  output: {
    filename: 'bundle.js',       // Name of the bundled file
    path: path.resolve(__dirname, 'dist'), // Output folder
    clean: true                  // Cleans dist before every build
  },
  module: {
    rules: [
      {
        test: /\.css$/,          // For CSS files
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  mode: 'development'            // Change to 'production' for production build
};
