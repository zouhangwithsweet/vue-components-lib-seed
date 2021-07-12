import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'vite-plugin-components'
import Pages from 'vite-plugin-pages'
import createSvgSpritePlugin from 'vite-plugin-svg-sprite'
import Icons, { ViteIconsResolver } from 'vite-plugin-icons'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'example',
  },
  plugins: [
    vue(),
    createSvgSpritePlugin(),
    Pages({
      pagesDir: [
        { dir: 'src/pages', baseRoute: '' },
        {
          dir: 'src/packages',
          baseRoute: '',
        },
      ],
      exclude: [
        '*/*.vue',
        '*/test/*.vue',
        '*/demo/demo[0-9].vue',
      ],
      extensions: ['vue'],
    }),
    Components({
      dirs: ['src/packages'],
      customLoaderMatcher: (id) => id.endsWith('.md'),
      customComponentResolvers: [
        ViteIconsResolver({
          componentPrefix: '',
        }),
      ],
    }),
    Icons(),
  ],
  resolve: {
    alias: {
      'my-lib/':
        process.env.NODE_ENV !== 'preview'
          ? `${path.resolve(__dirname, './src/packages')}/`
          : `${path.resolve(__dirname, './dist/es')}/`,
      'dist/': `${path.resolve(__dirname, './dist/es')}/`,
    },
  },
})
