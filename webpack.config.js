const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const isDebug = process.env.NODE_ENV !== 'production';
const reScript = /\.jsx?$/;
const reStyle = /\.(css|scss)$/;
const reImage = /\.(bmp|gif|jpe?g|png|svg)$/;
const staticAssetName = isDebug ? '[path][name].[ext]?[hash:8]' : '[hash:8].[ext]';
const build = path.resolve(__dirname, 'build');
const cssModules = true;

const config = {
	entry: {
		client: isDebug ? [
			'react-hot-loader/patch',
			'babel-polyfill',
			'./src/index.js'
		] : [
			'babel-polyfill',
			'./src/index.js'
		],
		vendor: [
			'react', 'react-dom', 'antd'
		]
	},
	output: {
		path: build,
		filename: '[name].js',
		publicPath: "/public/",
	},
	plugins: [
		new CleanWebpackPlugin([build]),
		new ExtractTextPlugin("styles.css"),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': isDebug ? '"test"' : '"production"'
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			minChunks: Infinity
		}),
		new webpack.HotModuleReplacementPlugin(),
		...(isDebug ? [] : [
			new webpack.optimize.ModuleConcatenationPlugin(),
			new webpack.optimize.UglifyJsPlugin({
				sourceMap: true,
				compress: {
					screw_ie8: true,
					unused: true,
					dead_code: true,
				},
				mangle: {
					screw_ie8: true,
				},
				output: {
					comments: false,
					screw_ie8: true,
				},
			})
		])
	],
	module: {
		strictExportPresence: true,
		rules: [
			{
				test: reScript,
				include: path.resolve(__dirname, './src'),
				loader: 'babel-loader',
				options: {
					cacheDirectory: isDebug,
					babelrc: false,
					presets: [
						[
							'env',
							{
								targets: {
									browsers: [">1%", "last 4 versions", "Firefox ESR", "not ie < 9"],
									uglify: true,
								},
								modules: false,
								useBuiltIns: false,
								debug: false,
							},
						],
						'stage-2',
						'react',
						// ...(isDebug ? [] : ['react-optimize']),  antd 会报错
					],
					plugins: [
						...(isDebug ? ['transform-react-jsx-source'] : []),
						...(isDebug ? ['transform-react-jsx-self'] : []),
						["import", {
							"libraryName": "antd",
							"style": true,
							"css": true,
						}],
					],
				},
			},
			{
				test: reStyle,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: [
						{
							loader: 'css-loader',
							options: {
								importLoaders: 1,
								sourceMap: isDebug,
								modules: cssModules,
								localIdentName: isDebug ? '[name]-[local]-[hash:base64:5]' : '[hash:base64:5]',
								minimize: !isDebug,
								discardComments: {removeAll: true},
							}
						},
						{
							loader: 'postcss-loader',
							options: {
								config: {
									path: './postcss.config.js',
								},
							},
						},
						{
							loader: 'sass-loader',
						}
					]
				})
			},
			{
				test: /\.less$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: [
						{
							loader: 'css-loader',
							options: {
								importLoaders: 1,
								sourceMap: isDebug,
								modules: false,
								localIdentName: isDebug ? '[name]-[local]-[hash:base64:5]' : '[hash:base64:5]',
								minimize: !isDebug,
								discardComments: {removeAll: true},
							}
						},
						{
							loader: 'postcss-loader',
							options: {
								config: {
									path: './postcss.config.js',
								},
							},
						},
						{
							loader: 'less-loader',
							options: {
								modifyVars: {
									"@primary-color": "#fe4246",
									// "@primary-color": "#000000",
									"@border-color": "#DDDDDD"
								}
							}
						}
					]
				})
			},
			{
				test: reImage,
				oneOf: [
					{
						issuer: reStyle,
						oneOf: [
							{
								test: /\.svg$/,
								loader: 'svg-url-loader',
								options: {
									name: staticAssetName,
									limit: 4096, // 4kb
								},
							},
							{
								loader: 'url-loader',
								options: {
									name: staticAssetName,
									limit: 4096, // 4kb
								},
							},
						],
					},
					{
						loader: 'file-loader',
						options: {
							name: staticAssetName,
						},
					},
				],
			},
			...(isDebug
				? []
				: [
					{
						test: path.resolve(
							__dirname,
							'../node_modules/react-deep-force-update/lib/index.js',
						),
						loader: 'null-loader',
					},
				])
		],
	},
	bail: !isDebug,
	cache: isDebug,
	devtool: isDebug ? 'cheap-module-inline-source-map' : 'source-map',
	resolve: {
		modules: ["node_modules"],
	},
	devServer: {
		port: '3000',
		public: 'dev.xinhuazhiyun.com:3000',
		disableHostCheck: true,
		hot: true,
		compress: true,
		proxy: {
			'/api': {
				target: 'http://127.0.0.1:9400',
				secure: false
			}
		}
	},
	externals: {
		// 考虑兼容性问题，打包将移出
		// 'react': 'React',
		// 'react-dom': 'ReactDOM',
		// 'antd': 'antd',
	}
};
module.exports = config;
