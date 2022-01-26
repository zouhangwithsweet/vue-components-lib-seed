import path from 'path'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'
import vue from 'unplugin-vue/rollup'
import alias from '@rollup/plugin-alias'
import esbuild from 'rollup-plugin-esbuild'
import replace from '@rollup/plugin-replace'

const outPubOptions = {
  globals: {
    vue: 'Vue',
  },
}

const input = 'src/packages/my-lib.ts'

const getPlugins = () => [
  replace({
    preventAssignment: true,
    values: {
      'import.meta.env.PROD': 'true',
    },
  }),
  nodeResolve(),
  vue({
    style: {
      preprocessLang: 'styl',
      preprocessOptions: {
        stylus: {
          additionalData: `@import '${process.cwd()}/src/styles/index.styl'`,
        },
      },
    },
  }),
  alias({
    entries: [
      {
        find: /^(my-lib\/)(.*)/,
        replacement: `${path.resolve(
          __dirname,
          '../src/packages'
        )}/$2/index.ts`,
      },
    ],
  }),
  esbuild({
    minify: true,
  }),
  // genCss(),
  postcss({
    extract: true,
  }),
]

const configs = []

configs.push({
  input,
  output: {
    file: `dist/es/my-lib.esm.js`,
    format: 'es',
    ...outPubOptions,
  },
  plugins: getPlugins(),
  external(id) {
    const reg = /^vue/.test(id) || /^@vue/.test(id)
    return reg
  },
})

configs.push({
  input,
  output: {
    file: `dist/lib/my-lib.umd.js`,
    format: 'umd',
    name: `my-lib`,
    ...outPubOptions,
  },
  plugins: getPlugins(),
  external(id) {
    const reg =
      /^vue/.test(id) ||
      /^@vue/.test(id) ||
      /^jpeg-js/.test(id)
    return reg
  },
})

export default configs
