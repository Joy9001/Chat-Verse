import dotenv from 'dotenv'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import path from 'path'
import TerserPlugin from 'terser-webpack-plugin'
import webpack from 'webpack'
import EjsWebpackPlugin from 'ejs-webpack-plugin'

dotenv.config()

export default {
    target: 'web',
    node: {
        global: true,
    },
    mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
    entry: {
        chat: './client/index/index-chat.js',
        login: './client/index/index-login.js',
        register: './client/index/index-register.js',
        base: './client/index/index-base.js',
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve('./client/dist'),
        clean: true,
        publicPath: '/',
    },
    resolve: {
        fallback: {
            fs: false,
            os: false,
            path: false,
            crypto: false,
            stream: false,
            vm: false,
        },
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
            {
                test: /\.ejs$/,
                use: {
                    loader: 'ejs',
                },
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
                type: 'asset/resource',
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
    plugins: [
        new webpack.EnvironmentPlugin(['DOMAIN', 'PORT']),
        new EjsWebpackPlugin({
            context: import.meta.dirname,
            entry: {
                './client/views/chat.ejs': {
                    js: ['chat'],
                    css: ['chat'],
                    output: './client/views/dist',
                },
                './client/views/login.ejs': {
                    js: ['login'],
                    css: ['base'],
                    output: './client/views/dist',
                },
                './client/views/register.ejs': {
                    js: ['register'],
                    css: ['base'],
                    output: './client/views/dist',
                },
                './client/views/404.ejs': {
                    css: ['chat'],
                    output: './client/views/dist',
                },
            },
        }),
        new MiniCssExtractPlugin({
            filename: 'styles/[name].[contenthash].css',
        }),
    ],
}
