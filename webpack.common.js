const path = require("path");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const host = 'hofp.local';

module.exports = {
	entry: "./src/js/site.js",
	devtool: "source-map",
	devServer: {
		contentBase: "./dist",
		},
	plugins: [
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: "./css/[name].css",
			chunkFilename: '[id].css'
		}),
		new BrowserSyncPlugin({
			notify: false,
			host: host,
			proxy: {
				target: host,
				ws: true
			},
			port: 5000,
			open: 'external'
		})
	],
	output: {
		filename: "./js/site.js",
		path: path.resolve(__dirname, "dist/"),
		chunkFilename: "[name].[id].js"
	},
	optimization: {
		splitChunks: {
			chunks: "all"
		},
		minimizer: [new TerserJSPlugin({test: /\.js(\?.*)?$/i}), new OptimizeCSSAssetsPlugin({})],
	},
	module: {
		rules: [
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader",
					"sass-loader"
				]
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [{
					loader: 'file-loader',
					options: {
						outputPath: 'images/',
						name: '[name].[ext]'
					}
				},"img-loader"
			]
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: ["file-loader"]
			},
			{
				test: /\.(csv|tsv)$/,
				use: ["csv-loader"]
			},
			{
				test: /\.xml$/,
				use: ["xml-loader"]
			},
			{
				test: /\.bundle\.js$/,
				use: {
					loader: "bundle-loader",
					options: {
						name: "my-chunk"
					}
				}
			}
		]
	}
};
