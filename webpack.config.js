global.Promise         = require('bluebird');

var webpack            = require('webpack');
var path               = require('path');
var ExtractTextPlugin  = require('extract-text-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var publicPath         = 'http://localhost:8050/public/assets';

var plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      BROWSER:  JSON.stringify(true),
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
    }
  }),

];

if (process.env.NODE_ENV === 'production') {
  plugins.push(
    new CleanWebpackPlugin([ 'public/assets/' ], {
      root: __dirname,
      verbose: true,
      dry: false
    })
  );
  plugins.push(new webpack.optimize.DedupePlugin());
  plugins.push(new webpack.optimize.OccurenceOrderPlugin());
}

module.exports = [{
  entry: ['babel-polyfill', './src/client.js'],
  debug: process.env.NODE_ENV !== 'production',
  resolve: {
    root:               path.join(__dirname, 'src'),
    modulesDirectories: ['node_modules'],
    extensions:         ['', '.js', '.jsx']
  },
  plugins,
  output: {
    path: `${__dirname}/public/assets/`,
    filename: 'bundle.js',
    publicPath
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: "react-hot!babel", exclude: [/node_modules/, ] },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
            presets: ['es2015', 'react', 'stage-0']
        }
      }
    ]
  },
  eslint: {
    configFile: path.resolve('.eslintrc')
  },
},
{
  name: 'styles',
  entry: {
      styles: './src/style/style.scss'
  },
  output: {
    path: `${__dirname}/public/assets/`,
    filename: 'styles.css',
    publicPath
  },
  devtool: 'source-map',
  module: {
      loaders: [
          {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract("style", "css")
          },
      ]
  },
  plugins: [
    new ExtractTextPlugin("[name].css", {allChunks: true}),
  ]
}];
