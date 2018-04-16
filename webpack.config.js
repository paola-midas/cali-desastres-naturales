const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	target: 'web',
	cache: true,
	resolve: {
		extensions: ['', '.html', '.js', '.json', '.scss', '.css'],
	},
	module: {
		loaders: [
			{ test: /\.js?$/, exclude: /node_modules/, loader: 'babel-loader' },
			{ test: /\.css?$/, loader: 'style-loader!css-loader!' },
			{ test: /\.(png|jpg)$/, loader: 'file-loader?name=images/[name].[ext]' },
		],
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin('common', 'common.js'),
		new HtmlWebpackPlugin({
			inject: true,
			template: 'src/index.html',
		}),
		new webpack.NoErrorsPlugin(),
	],
};
