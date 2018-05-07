const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')


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
		new HtmlWebpackPlugin({
			inject: true,
			template: 'src/index.html',
		}),
		new webpack.NoErrorsPlugin(),
		new webpack.optimize.AggressiveMergingPlugin(),
	],
};
