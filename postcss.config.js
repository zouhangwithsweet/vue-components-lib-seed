const plugins =
  process.env.NODE_ENV === 'build' ||
  process.argv[1].includes('vitepress') ||
  process.argv[1].includes('fisandoc') ||
  process.argv[1].includes('dev-docs.ts')
    ? {
        autoprefixer: {},
      }
    : {
        'postcss-pxtorem': {
          rootValue: 100,
          propWhiteList: [],
          minPixelValue: 2,
        },
        // to edit target browsers: use "browserslist" field in package.json
        autoprefixer: {},
      }

module.exports = {
  plugins,
}
