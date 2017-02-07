'use strict';

module.exports = {
    entry: './home',
    output: {
        filename: 'build.js',
        library: 'home'
    },

    devtool: 'inline-source-map',
    watch: true,

    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel-loader',
            query : {
                presets: [ 'es2015' ]
            }
        }]
    }
};