import dotenv from 'dotenv'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import path from 'path'
import TerserPlugin from 'terser-webpack-plugin'
import webpack from 'webpack'
dotenv.config()

export default {
    mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
    entry: {
        chat: './client/index/index-chat.js',
        login: './client/index/index-login.js',
        register: './client/index/index-register.js',
        css: './client/index/index-css.js',
    },
    output: {
        filename: '[name].[contenthash].js',
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
            {
                test: /\.ejs$/,
                use: 'raw-loader',
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
            `...`,
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
        new webpack.EnvironmentPlugin(['SITE_URL', 'PORT']),
        new HtmlWebpackPlugin({
            template: '!!raw-loader!./client/views/chat.ejs',
            filename: 'views/chat.ejs',
            favicon: './client/public/assets/favicon.ico',
            chunks: ['chat', 'css'],
            inject: true,
        }),
        new HtmlWebpackPlugin({
            template: '!!raw-loader!./client/views/login.ejs',
            filename: 'views/login.ejs',
            favicon: './client/public/assets/favicon.ico',
            chunks: ['login', 'css'],
            inject: true,
        }),
        new HtmlWebpackPlugin({
            template: '!!raw-loader!./client/views/register.ejs',
            filename: 'views/register.ejs',
            favicon: './client/public/assets/favicon.ico',
            chunks: ['register', 'css'],
            inject: true,
        }),
        new MiniCssExtractPlugin({
            filename: 'styles/[name].[contenthash].css',
        }),
    ],
}
