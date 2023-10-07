import autoprefixer from "autoprefixer";
import { babel } from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";

import externals from "rollup-plugin-node-externals";
import path from "path";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import resolve from "@rollup/plugin-node-resolve";
import strip from "@rollup/plugin-strip";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";

// This is required to read package.json file when
// using Native ES modules in Node.js
// https://rollupjs.org/command-line-interface/#importing-package-json
import { createRequire } from "node:module";
const requireFile = createRequire(import.meta.url);
const packageJson = requireFile("./package.json");

// import pkg from "./package.json";

export default [
	{
		input: "./components/index.ts", // 入口文件
		output: [
			{
				// 出口文件
				// dir: path.dirname(pkg.module),
				dir: path.dirname("lib/es6"),
				format: "es", // 输出格式。es模块导出，支持按需加载
				name: "@andi/ui",
				exports: "named", // 指定导出模式（自动、默认、命名、无）
				preserveModules: true, // 保留模块结构
				preserveModulesRoot: "lib", // 将保留的模块放在根级别的此路径下
			},
			{
				file: packageJson.main,
				format: "cjs",
				sourcemap: true,
			},
			{
				file: packageJson.module,
				format: "esm",
				exports: "named",
				sourcemap: true,
			},
		],
		plugins: [
			peerDepsExternal(),
			terser(),
			babel({
				extensions: [".js", ".jsx", ".ts", ".tsx"],
				exclude: [
					"node_modules/**",
					"components/**/*.stories.{js,ts,jsx,tsx}",
					"components/**/*.test.{js,ts,jsx,tsx}",
					"components/**/__tests__/*",
				],
			}),

			// 处理外部依赖
			resolve(),
			// 自动将dependencies依赖声明为 externals
			externals({
				devDeps: false,
			}),
			// 支持基于 CommonJS 模块引入
			commonjs(),
			// 支持 typescript，并导出声明文件
			typescript({
				outDir: "lib",
				declaration: true,
				declarationDir: "lib",
			}),
			// 支持 scss，并添加前缀
			postcss({
				plugins: [autoprefixer()],
			}),
			// 清除调试代码
			strip(),
		],
	},
];
