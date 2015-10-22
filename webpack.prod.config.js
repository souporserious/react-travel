var path = require('path');
var webpack = require('webpack');
var TARGET = process.env.TARGET || null;

var config = {
  entry: {
    index: './src/react-travel.js',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: 'dist/',
    filename: 'react-travel.js',
    sourceMapFilename: 'react-travel.sourcemap.js',
    library: 'Travel',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      {test: /\.(js|jsx)/, loader: 'babel?stage=0'}
    ]
  },
  plugins: [],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'react/lib/shallowCompare': 'shallowCompare'
  },
};

if(TARGET === 'minify') {
  config.output.filename = 'react-travel.min.js';
  config.output.sourceMapFilename = 'react-travel.min.js';
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    },
    mangle: {
      except: ['React', 'ReactDOM', 'Travel']
    }
  }));
}

module.exports = config;