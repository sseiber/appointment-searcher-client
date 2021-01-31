const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (context) => {
    const config = {
        context,

        resolve: {
            extensions: ['.tsx', '.ts', '.js']
        },

        entry: {
            index: path.resolve(context, './src/index')
        },

        output: {
            filename: '[name].js',
            path: path.resolve(context, './client_dist')
        },

        optimization: {
            splitChunks: {
                cacheGroups: {
                    commons: {
                        chunks: 'initial',
                        minChunks: 2,
                        maxInitialRequests: 5, // The default limit is too small to showcase the effect
                        minSize: 0 // This is example is too small to create commons chunks
                    },
                    vendor: {
                        test: /node_modules/,
                        chunks: 'initial',
                        name: 'vendor',
                        priority: 10,
                        enforce: true
                    }
                }
            }
        },

        performance: {
            maxEntrypointSize: 650000,
            maxAssetSize: 650000
        },

        devtool: 'inline-source-map',

        module: {
            rules: [
                {
                    test: /\.(ts|tsx)$/,
                    exclude: /node_modules/,
                    use: 'ts-loader'
                },
                {
                    test: /\.(css|scss)$/,
                    use: [MiniCssExtractPlugin.loader, 'css-loader']
                },
                {
                    test: /\.woff$|\.ttf$|\.wav$|\.mp3$/,
                    type: 'asset/resource',
                    generator: {
                        filename: 'assets/[contenthash][ext][query]'
                    }
                },
                {
                    test: /\.jpe?g$|\.ico$|\.gif$|\.png$|\.svg$/,
                    type: 'asset',
                    generator: {
                        filename: 'assets/[contenthash][ext][query]'
                    },
                    parser: {
                        dataUrlCondition: {
                            maxSize: 25 * 1024 // 25kb
                        }
                    }
                },
                {
                    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                    type: 'asset',
                    parser: {
                        dataUrlCondition: {
                            maxSize: 10 * 1024 // 10kb
                        }
                    }
                },
                {
                    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                    type: 'asset/resource'
                },
                {
                    test: /\.json$/,
                    type: 'javascript/auto',
                    generator: {
                        filename: 'plugin-config/[contenthash][ext][query]'
                    }
                }]
        },

        plugins: [
            // Generate index.html in /client_dist => https://github.com/ampedandwired/html-webpack-plugin
            new HtmlWebpackPlugin({
                title: 'LoopBox Local Client',
                template: path.resolve(context, './src/index.html'),
                hash: true
            }),
            new CopyPlugin({
                patterns: [
                    {
                        from: './assets',
                        to: 'assets',
                        globOptions: {
                            ignore: ['__mocks__/**', 'index.ts']
                        }
                    }
                ]
            }),
            new MiniCssExtractPlugin({
                filename: '[contenthash].css[query]'
            })
        ]
    };

    return config;
};
