'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development',
      webpack = require('webpack'),
      AssetsPlugin = require('assets-webpack-plugin');

function addHash(template, hash) {
    return NODE_ENV == 'production' ? template.replace(/\.[^.]+$/, `.[${hash}]$&`) : template;
}

module.exports = {
    context: __dirname + '/scripts/dev',

    entry: {
        home: './home',
        about: './about'
    },

    output: {
        path: __dirname + '/scripts',
        filename: addHash('[name].js', 'chunkhash'),
        library: '[name]'
    },

    devtool: NODE_ENV == 'development' ? 'inline-source-map' : false,

    watch: NODE_ENV == 'development',

    module: {
        loaders: [{
            test: /\.js$/,
            include: __dirname + '/scripts/dev',
            loader: 'babel-loader',
            query: {
                presets: ['es2015']
            }
        }],

        noParse: /\/jquery\/jquery.js/
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            minChunks: 2
        }),
        new AssetsPlugin({
            filename: 'assets.json'
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