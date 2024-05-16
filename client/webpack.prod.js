import { merge } from "webpack-merge";
import common from "./webpack.common.js";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";
import HtmlMinimizerPlugin from "html-minimizer-webpack-plugin";

export default merge(common, {
	mode: "production",
	devtool: "source-map",
	optimization: {
		minimize: true,
		minimizer: [
			"...",
			new CssMinimizerPlugin(),
			new TerserPlugin({
				test: /\.js(\?.*)?$/i,
				exclude: /node_modules/,
				parallel: true,
				minify: TerserPlugin.swcMinify,
				extractComments: false,
			}),
			new HtmlMinimizerPlugin({
				minify: HtmlMinimizerPlugin.minifyHtmlNode,
				minimizerOptions: {
					collapseWhitespace: true,
					removeComments: true,
					removeRedundantAttributes: true,
					removeScriptTypeAttributes: true,
					removeStyleLinkTypeAttributes: true,
					useShortDoctype: true,
				},
			}),
		],
	},
});
