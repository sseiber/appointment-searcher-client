const webpack = require('webpack');
const path = require('path');
const BaseConfig = require('./webpack.base.js');

module.exports = () => {
    const context = path.resolve(__dirname, '..');
    const config = BaseConfig(context);

    config.mode = 'development';
    config.devtool = 'source-map';
    config.output.publicPath = '/';
    config.resolve.alias = {
        'react-dom': '@hot-loader/react-dom'
    };

    config.devServer = {
        historyApiFallback: true,
        // contentBase: './client_dist', // Content base
        publicPath: '/',
        inline: true, // Enable watch and live reload
        host: 'localhost',
        port: 8200,
        stats: 'errors-only',
        hot: true,
        proxy: [
            {
                path: '/favicon.ico',
                target: 'http://localhost:9072',
                xfwd: true,
                secure: false,
                changeOrigin: true
            },
            {
                path: '/favicons/**',
                target: 'http://localhost:9072',
                xfwd: true,
                secure: false,
                changeOrigin: true
            },
            {
                path: '/static/**',
                target: 'http://localhost:9072',
                xfwd: true,
                secure: false,
                changeOrigin: true
            },
            {
                path: '/api/v1/search/**',
                target: 'http://localhost:9072',
                xfwd: true,
                secure: false,
                changeOrigin: true
            }
        ]
    };

    config.plugins.push(
        new webpack.DefinePlugin({ PRODUCTION: JSON.stringify(false) }),
        new webpack.HotModuleReplacementPlugin()
    );

    return config;
};
