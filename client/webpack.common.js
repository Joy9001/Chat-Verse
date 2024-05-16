import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import webpack from "webpack";
import * as fs from "node:fs";

const publicPath = path.resolve("../client/src/public/");
const ejsViewsPath = path.resolve("../client/src/views");
const views = fs.readdirSync(ejsViewsPath);
const viewsMap = views.map((view) => {
	return new HtmlWebpackPlugin({
		filename: `views/${view}`,
		template: `!!raw-loader!${ejsViewsPath}/${view}`,
		chunks: ["bundle"],
	});
});

export default {
	entry: {
		bundle: path.resolve("../client/src/index.js"),
	},
	output: {
		filename: "[name].js",
		path: path.resolve("dist"),
		clean: true,
		publicPath: "/",
	},
	stats: "errors-only",
	module: {
		rules: [
			{
				test: /\.(sass|css|scss)$/,
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader",
					{
						loader: "postcss-loader",
						options: {
							postcssOptions: {
								plugins: ["autoprefixer"],
							},
						},
					},
					"sass-loader",
				],
			},
			{
				test: /\.js$/i,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env"],
					},
				},
			},
			{
				test: /\.(png|svg|jpe?g|gif)$/i,
				type: "asset",
			},
		],
	},
	plugins: [
		// new CopyPlugin({
		// 	patterns: [
		// 		{
		// 			from: ejsViewsPath,
		// 			to: path.resolve("dist/views"),
		// 		},
		// 		{
		// 			from: publicPath,
		// 			to: path.resolve("dist/public"),
		// 		},
		// 	],
		// }),
		...viewsMap,
		new MiniCssExtractPlugin({
			filename: "[name].css",
			chunkFilename: "[id].css",
		}),
	],
};
