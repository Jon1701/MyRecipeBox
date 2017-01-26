// Webpack.
var webpack = require('webpack');

// Module for building file paths.
var path = require('path');

// Folder paths
var PATHS = {
  SRC: path.join(__dirname, '/client/'),
  DEST: path.join(__dirname, 'dist'),
  MODULES: path.join(__dirname, 'node_modules/')
}

// Plugin for generating .html files.
var HtmlWebpackPlugin = require('html-webpack-plugin');

// Webpack config.
var config = {

  watch: true,

  // Starting point for JavaScript modules to be bundled together.
  entry: path.join(PATHS.SRC, 'index.js'),

  // Output directory and filename for bundled JavaScript.
  output: {
    path: PATHS.DEST,
    filename: '/js/app.js',
  },

  // Resolve paths to files and folders which can be used by Webpack.
  resolve: {

    // Set folders which Webpack can consider to be the application root folder.
    // (Where to find modules).
    root: [PATHS.SRC, PATHS.MODULES],

    // Automatically resolve module extensions for JavScript files.
    // Can assume imported files are JS or JSX.
    extensions: ['', '.js', '.jsx'],

    // Renames module paths.
    alias: {

      // Can easily access React components in the ./src/components directory.
      // Instead of import HelloWorld from './components/HelloWorld.jsx'
      // Use:       import HelloWorld from 'components/HelloWorld.jsx'
      'actions': path.join(PATHS.SRC, 'actions/'),
      'reducers': path.join(PATHS.SRC, 'reducers/'),
      'components': path.join(PATHS.SRC, 'components/'),
      'containers': path.join(PATHS.SRC, 'containers/'),
      'stylesheets': path.join(PATHS.SRC, 'stylesheets/'),
      'json': path.join(PATHS.SRC, 'media/data/'),
      'images': path.join(PATHS.SRC, 'media/images/'),
      'config': path.join(PATHS.SRC, 'config/'),
      'common': path.join(PATHS.SRC, 'common/'),

    }
  },

  module: {

    // File preprocessing.
    loaders: [

      //////////////////////////////////////////////////////////////////////////
      // Transpile ES6 to ES5, allow JSX syntax.
      //////////////////////////////////////////////////////////////////////////
      {
        test: /\.(js|jsx)$/,      // Apply transformations to .js and .jsx files.
        exclude: /node_modules/,  // Do not apply transformations to npm modules.
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'es2016', 'es2017'],
          cacheDirectory: true
        }
      },
      //////////////////////////////////////////////////////////////////////////

      //////////////////////////////////////////////////////////////////////////
      // Stylesheets
      //////////////////////////////////////////////////////////////////////////
      {
        test: /\.scss$/i,      // Apply transformations to .js and .jsx files.
        loaders: ['style', 'css', 'sass']
      },
      //////////////////////////////////////////////////////////////////////////

      //////////////////////////////////////////////////////////////////////////
      // Images
      //////////////////////////////////////////////////////////////////////////
      {
        test: /\.(jpe?g|png|gif)$/i,
        loader: 'file-loader?name=/media/images/[name].[ext]'
      },
      //////////////////////////////////////////////////////////////////////////

      //////////////////////////////////////////////////////////////////////////
      // JSON files.
      //////////////////////////////////////////////////////////////////////////
      {
        test: /\.json$/i,
        loader: 'json-loader?name=/media/data/[name].[ext]'
      },
      //////////////////////////////////////////////////////////////////////////

      //////////////////////////////////////////////////////////////////////////
      // Fonts.
      //////////////////////////////////////////////////////////////////////////
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'url-loader?limit=50000'
      },
      //////////////////////////////////////////////////////////////////////////

    ]
  },

  // Plugins used by Webpack.
  plugins: [

    // Generate index.html file.
    new HtmlWebpackPlugin({
      mobile: true,   // Responsive viewport.
      inject: false,  // Controls asset addition to the template.
                      // html-webpack-template will control injection.
      title: 'My Recipe Box', // <title/> tag
      appMountId: 'react-target', // Adds mount point for React apps: <div id="react-target"/>.
      template: require('html-webpack-template'),   // Module to control .html file injection.
      filename: 'index.html' // File name.
    }),

    // Switch React to Production Mode.
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    }),

    new webpack.NoErrorsPlugin()

  ]
};

// Add these plugings if in a production environment.
if (process.env.NODE_ENV === 'production') {
  config.plugins.push(

    // Compress and minify all JavaScript.
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      output: { comments: false }
    }),

    // Search for equal or similar files and deduplicate them in the
    // output.
    new webpack.optimize.DedupePlugin()

  );
};

// Export the configuration.
module.exports = config;
