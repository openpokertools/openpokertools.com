const path = require('path');
module.exports = {
  mode: 'production',
  entry: {
    'index': './src/index.js',
    'range-equity': './src/range-equity.js',
    'poker-odds': './src/poker-odds.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
};
