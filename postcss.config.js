const plugins =
  process.env.NODE_ENV === 'build' ||
  process.argv[1].includes('vitepress')
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
