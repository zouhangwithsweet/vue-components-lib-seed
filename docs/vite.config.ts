import path from 'path'
import WindiCSS from 'vite-plugin-windicss'
import { MarkdownTransform } from './.vitepress/plugins/md-transform'

console.log(process.cwd())
export default {
  resolve: {
    alias: {
      'my-lib/': `${path.resolve(
        __dirname,
        '../dist/es'
      )}/`,
    },
  },
  plugins: [
    MarkdownTransform(),
    WindiCSS({
      config: {
        extract: {
          include: [
            'docs/**/*.md',
            'docs/**/*.vue',
            `${process.cwd()}/**/*.md`,
            `${process.cwd()}/**/*.vue`,
          ],
        },
        preflight: true,
      },
    }),
  ],
}
