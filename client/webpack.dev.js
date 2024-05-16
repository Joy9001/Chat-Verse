import { merge } from "webpack-merge";
import common from "./webpack.common.js";
import webpack from "webpack";

export default merge(common, {
	mode: "development",
	entry: {
		...common.entry,
		"webpack-hot-middleware/client":
			"webpack-hot-middleware/client?reload=true&overlayWarnings=true",
	},
	devtool: "source-map",
	devServer: {
		static: {
			directory: common.output.path,
		},
		port: 3000,
		open: true,
		hot: true,
		compress: true,
		historyApiFallback: true,
	},
	// plugins: [...common.plugins, new webpack.HotModuleReplacementPlugin()],
});
