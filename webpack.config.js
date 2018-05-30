var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: path.resolve(__dirname) + '/index.js',
    devtool: 'inline-source-map',
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.jsx?/,
                include: [
                    path.resolve(__dirname, 'src'),
                    path.resolve(__dirname, 'index.js'),
                ],
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react']
                    }
                }
            },
            {
                test: /\.less$/,
                include: path.resolve(__dirname, "src"),
                use: [
                    {
                        loader: "style-loader",
                        options: {
                            singleton: true,
                        }
                    },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: "less-loader",
                        options: {
                            sourceMap: true,
                            sourceMapFileInline: true,
                        }
                    },

                ]
            },
        ]
    },
    output: {
        path: path.resolve(__dirname, 'public/js'),
        filename: 'app.js',
        publicPath: '/js',
    },
};