'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development',
      webpack = require('webpack');

module.exports = {
    context: __dirname + '/scripts/dev',

    entry: {
        home: './home',
        about: './about'
    },

    output: {
        path: __dirname + '/scripts',
        filename: '[name].js',
        library: '[name]'
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

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            minChunks: 2
        })
    ]
};

if (NODE_ENV == 'production') {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true,
                unsafe: true
            }
        })
    );
}