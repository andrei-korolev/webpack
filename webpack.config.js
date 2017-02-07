'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development',
      webpack = require('webpack');

module.exports = {
    entry: './home',
    output: {
        filename: 'build.js',
        library: 'home'
    },

    devtool: NODE_ENV == 'development' ? 'inline-source-map' : false,

    watch: NODE_ENV == 'development',

    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015']
            }
        }]
    },

    plugins: []
};

if (NODE_ENV == 'production') {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    );
}