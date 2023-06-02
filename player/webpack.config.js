const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|gif|obj)$/,
                loader: 'url-loader'
            },
            {
                test: /\.json$/,
                loader: 'json-loader',
                type: 'javascript/auto',
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            }
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        clean: true,
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'player',
        libraryTarget: 'jsonp',
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                extractComments: false,
                terserOptions: {
                    format: {
                        comments: false,
                    },
                },
            }),
        ],
    }
};