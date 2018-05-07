const webpack = require('webpack');
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	target: 'web',
	cache: true,
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ['babel-loader'],
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: ['eslint-loader'],
			},
			{
				test: /\.css$/,
				loader: 'style-loader/url!file-loader',
			},
			{
				test: /\.css$/,
				exclude: /node_modules/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					{
						loader: 'css-loader',
						options: {
							localIdentName: '[name]_[local]_[hash:base64]',
							sourceMap: true,
							minimize: true,
						},
					},
					{
						loader: 'postcss-loader',
					},
				],
			},
			{
				test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
				loader: 'file-loader?name=images/[name].[ext]',
			},
			{
				test: /\.html$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'html-loader',
						options: {
							minimize: true,
						},
					},
				],
			},
		],
	},
	resolve: {
		extensions: ['*', '.js', 'json', '.css', '.html'],
		alias: {
			leaflet_css: path.resolve(__dirname, '/node_modules/leaflet/dist/leaflet.css'),
			'./images/layers.png$': path.resolve(__dirname, '../node_modules/leaflet/dist/images/layers.png'),
			'./images/layers-2x.png$': path.resolve(__dirname, '../node_modules/leaflet/dist/images/layers-2x.png'),
			'./images/marker-icon.png$': path.resolve(__dirname, '../node_modules/leaflet/dist/images/marker-icon.png'),
			'./images/marker-icon-2x.png$': path.resolve(__dirname, '../node_modules/leaflet/dist/images/marker-icon-2x.png'),
			'./images/marker-shadow.png$': path.resolve(__dirname, '../node_modules/leaflet/dist/images/marker-shadow.png'),
		},
	},
	optimization: {
		minimizer: [
			new UglifyJsPlugin({
				cache: true,
				parallel: true,
				sourceMap: true,
				uglifyOptions: {
					compress: false,
					ecma: 6,
					mangle: true,
				},
			}),
		],
		splitChunks: {
			cacheGroups: {
				styles: {
					name: 'styles',
					test: /\.css$/,
					chunks: 'all',
					enforce: true,
				},
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'all',
				},
			},
		},
	},
	plugins: [
		new HtmlWebPackPlugin({
			template: './src/index.html',
			filename: './index.html',
		}),
		new webpack.HotModuleReplacementPlugin(),
		new MiniCssExtractPlugin({
			filename: '[name].css',
		}),
	],
	devtool: 'eval-source-map',
};
