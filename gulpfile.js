const rimraf = require("rimraf");
const path = require("path");
const { src, dest, parallel, series } = require("gulp");
const babel = require("gulp-babel");
let ts = require("gulp-typescript");
const merge = require("merge2");
const babelConfig = require("./babel.config");
const { compilerOptions } = require("./tsconfig.json");
var postcss = require("gulp-postcss");

const tsConfig = {
	...compilerOptions,
	noUnusedParameters: true, //不能有未使用的参数
	noUnusedLocals: true, //不能有未使用的本地变量
	strictNullChecks: true, //严格null检查
	target: "es6", //编译的js版本
	jsx: "preserve", //如何编译jsx。preserve，保留不处理；react，编译成React.createElement()
	moduleResolution: "node", //模块的查找规则
	declaration: true, //生成声明文件 xxx.d.ts
	allowSyntheticDefaultImports: true, //允许默认导入
};

// 要编译的文件路径和文件名，要排除的目录和文件
const sourceFile = [
	"components/**/*.{js,ts,jsx,tsx}",
	"!components/**/*.stories.{js,ts,jsx,tsx}",
	"!components/**/__tests__/*",
	// "!components/**/e2e/*",
	// "!components/**/unit/*",
];

const componentsPath = path.join(process.cwd(), "components");
const es5Path = path.join(process.cwd(), "lib");
const es6Path = path.join(process.cwd(), "es");
const distPath = path.join(process.cwd(), "dist");

function compileToEs5() {
	const tsResult = src(sourceFile, { base: "components" }).pipe(ts(tsConfig));
	return merge([
		tsResult.js.pipe(babel(babelConfig)).pipe(dest(es5Path)),
		tsResult.dts.pipe(dest(es5Path)),
	]);
}
function compileToEs6() {
	const tsResult = src(sourceFile, { base: "components" }).pipe(ts(tsConfig));
	return merge([
		tsResult.js.pipe(dest(es6Path)),
		tsResult.dts.pipe(dest(es6Path)),
	]);
}

function compileCss() {
	return src("./components/**/*.css", { base: "components" })
		.pipe(postcss())
		.pipe(dest("./dest"));
}
function clean(done) {
	rimraf.sync(es5Path);
	rimraf.sync(es6Path);
	rimraf.sync(distPath);
	done();
}

const compile = series(clean, parallel(compileToEs5, compileToEs6));

module.exports = {
	compile,
	compileCss,
	clean,
};
