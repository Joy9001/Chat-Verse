import dotenv from 'dotenv'
dotenv.config()
import path from 'path'

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
    devtool: 'source-map',
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
    plugins: [],
}
