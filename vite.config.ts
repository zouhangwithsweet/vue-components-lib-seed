import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import createSvgSpritePlugin from 'vite-plugin-svg-sprite'

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
  ],
})
