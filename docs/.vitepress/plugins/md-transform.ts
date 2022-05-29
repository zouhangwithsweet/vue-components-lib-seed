import fs from 'fs'
import path from 'path'
import type { Plugin } from 'vite'

export function MarkdownTransform(): Plugin {
  return {
    name: 'element-plus-md-transform',
    enforce: 'pre',
    async transform(code, id) {
      if (!id.endsWith('.md')) return

      const componentId = path.basename(id, '.md')

      if (componentId !== 'button') return

      const append = {
        headers: [],
        footers: [],
        scriptSetups: [
          `const demos = import.meta.globEager('../../../src/packages/${componentId}/demo/demo*.vue')`,
        ],
      }

      code += `
<script setup>
${append.scriptSetups}
</script>   
`

      return {
        code,
      }
    },
  }
}
