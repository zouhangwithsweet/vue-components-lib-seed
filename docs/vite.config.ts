import { UserConfig } from 'vite'
import path from 'path'
import WindiCSS from 'vite-plugin-windicss'
import aspectRatio from 'windicss/plugin/aspect-ratio'

const config: UserConfig = {
  resolve: {
    alias: {
      'my-lib/': `${path.resolve(
        __dirname,
        '../dist/es'
      )}/`,
    },
  },
  plugins: [
    WindiCSS({
      config: {
        extract: {
          include: [
            '**/*.md',
            '.vitepress/theme/**/*.{md,vue}',
            `${process.cwd()}/node_modules/fisand-doc/**/*.md`,
            `${process.cwd()}/node_modules/fisand-doc/**/*.vue`,
          ],
        },
        attributify: true,
        plugins: [aspectRatio as any],
        preflight: false,
      },
    }),
  ],
  optimizeDeps: {
    exclude: ['vue-demi', '@vueuse/shared', '@vueuse/core'],
  },
  server: {
    hmr: {
      overlay: false,
    },
  },
}

export default config
