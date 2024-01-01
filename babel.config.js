module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false, // false:es module
        targets: {
          browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 11'],
          node: 'current',
        },
      },
    ],
    [
      '@babel/preset-react',
      { runtime: 'automatic', importSource: '@emotion/react' },
    ],
    [
      '@babel/preset-typescript',
      {
        isTSX: true,
        allExtensions: true,
      },
    ],
  ],
  plugins: [
    '@emotion/babel-plugin',
    // [
    // 	"@babel/plugin-transform-typescript",
    // 	{
    // 		isTSX: true,
    // 	},
    // ],
    // A plugin that enables the re-use of Babel's injected helper code to save on codesize.
    // https://babeljs.io/docs/babel-plugin-transform-runtime
    ['@babel/plugin-transform-runtime'],
  ],
};
