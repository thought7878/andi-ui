// module.exports = {
// 	presets: [
// 		[
// 			"@babel/preset-env",
// 			{ targets: { edge: "17", firefox: "60", chrome: "67", safari: "11.1" } },
// 		],
// 		"@babel/preset-react",
// 		"@babel/preset-typescript",
// 	],
// };

module.exports = {
	presets: [
		[
			"@babel/preset-env",
			{
				modules: "auto",
				targets: {
					browsers: ["last 2 versions", "Firefox ESR", "> 1%", "ie >= 11"],
					node: "current",
				},
			},
		],
		["@babel/preset-react", { runtime: "automatic" }],
		{ runtime: "automatic", importSource: "@emotion/react" },
	],
	plugins: [
		"@emotion/babel-plugin",
		[
			"@babel/plugin-transform-typescript",
			{
				isTSX: true,
			},
		],
		// A plugin that enables the re-use of Babel's injected helper code to save on codesize.
		// https://babeljs.io/docs/babel-plugin-transform-runtime
		["@babel/plugin-transform-runtime"],
	],
};
