const path = require("path");
// 提取css文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// Node.js process 当前命令所在的目录
const cwd = process.cwd();
module.exports = {
	mode: "development", //开发模式
	devtool: false, //关闭生成sourceMap
	entry: {
		//入口文件
		andiui: "./src/index.js",
	},
	output: {
		path: path.resolve("dist"), //打包后的输出目录
		filename: "[name].js", //打包后的文件,andiui.js，name是entry的属性名andiui
		library: "andiui", //打包后库的名字
		libraryTarget: "umd", //打包后模块的格式
	},
	//组件库代码是不需要打包react和react-dom的
	// 外部依赖
	externals: {
		react: {
			root: "React",
			commonjs2: "react",
			commonjs: "react",
			amd: "react",
		},
		"react-dom": {
			root: "ReactDOM",
			commonjs2: "react-dom",
			commonjs: "react-dom",
			amd: "react-dom",
		},
	},
	resolve: {
		// 指定扩展名
		extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
	},
	module: {
		rules: [
			// 配置babel
			{
				test: /\.(j|t)sx?$/,
				exclude: /node_modules/,
				loader: "babel-loader",
			},
			{
				test: /\.css$/,
				use: [
					//把这些css收集起来，后面通过插件，写入单独的antd.css
					MiniCssExtractPlugin.loader,
					{
						// 处理@import和url
						loader: "css-loader",
						options: {
							sourceMap: true,
						},
					},
					{
						loader: "postcss-loader",
						options: {
							postcssOptions: {
								// 加厂商前缀
								plugins: ["autoprefixer"],
							},
							sourceMap: true,
						},
					},
				],
			},
			{
				test: /\.less$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: "css-loader",
						options: {
							sourceMap: true,
						},
					},
					{
						loader: "postcss-loader",
						options: {
							postcssOptions: {
								plugins: ["autoprefixer"],
							},
							sourceMap: true,
						},
					},
					{
						// 把less编译成css
						loader: "less-loader",
						options: {
							lessOptions: {
								javascriptEnabled: true,
							},
							sourceMap: true,
						},
					},
				],
			},
			{
				// 在webpack5里，file-loader/url-loader，已经废弃了
				test: /\.(png|jpg|jpeg|gif|svg)(\?v=\d+\.\d+\.\d+)?$/i,
				type: "asset", // 静态文件不再需要配置loader了
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "[name].css", //name是entry的属性名andiui
		}),
	],
};
