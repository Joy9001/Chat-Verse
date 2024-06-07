import dotenv from 'dotenv'
dotenv.config()
import path from 'path'
import TerserPlugin from 'terser-webpack-plugin'
import webpack from 'webpack'

export default {
    mode: 'development',
    entry: {
        chat: './client/scripts/index.js',
        login: './client/scripts/components/login.js',
        register: './client/scripts/components/register.js',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve('./client/dist'),
        clean: true,
        publicPath: '/',
    },
    devtool: process.env.NODE_ENV === 'development' ? 'source-map' : false,
    module: {
        rules: [
            {
                test: /\.js$/i,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
        ],
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                exclude: /\/node_modules/,
                extractComments: false,
                terserOptions: {
                    format: {
                        comments: false,
                    },
                },
            }),
        ],
    },
    plugins: [new webpack.EnvironmentPlugin(['SITE_URL', 'PORT'])],
}
