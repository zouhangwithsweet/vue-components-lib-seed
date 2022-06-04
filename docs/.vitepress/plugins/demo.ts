import { resolve } from 'path'
import fs from 'fs'
import MarkdownIt from 'markdown-it'
import mdContainer from 'markdown-it-container'
import { highlight } from '../utils/highlight'
import type Token from 'markdown-it/lib/token'
import type Renderer from 'markdown-it/lib/renderer'
import glob from 'glob'

const localMd = MarkdownIt()
const anchor = '&-&'

const docRoot = ''

interface ContainerOpts {
  marker?: string | undefined
  validate?(params: string): boolean
  render?(
    tokens: Token[],
    index: number,
    options: any,
    env: any,
    self: Renderer
  ): string
}

export const mdPlugin = async (md: MarkdownIt) => {
  const highlightFn = await highlight()
  md.use(mdContainer, 'demo', {
    validate(params) {
      return !!params.trim().match(/^demo\s*(.*)$/)
    },

    render(tokens, idx) {
      const m = tokens[idx].info
        .trim()
        .match(/^demo\s*(.*)$/)
      if (
        tokens[idx].nesting ===
        1 /* means the tag is opening */
      ) {
        const description = m && m.length > 1 ? m[1] : ''
        const sourceFileToken = tokens[idx + 2]
        let source: string[] = []
        const sourceFile =
          sourceFileToken.children?.[0].content ?? ''
        source = getDemoSource(sourceFile).source

        if (!source)
          throw new Error(
            `Incorrect source file: ${sourceFile}`
          )

        return `<DemoWrapper :demos="demos" source="${source
          .map((s) =>
            encodeURIComponent(highlightFn(s, 'vue'))
          )
          .join(
            anchor
          )}" path="${sourceFile}" raw-source="${encodeURIComponent(
          source.join(anchor)
        )}" description="${encodeURIComponent(
          localMd.render(description)
        )}">`
      } else {
        return '</DemoWrapper>'
      }
    },
  } as ContainerOpts)
}

function getDemoSource(path: string) {
  const truePath =
    path.startsWith('./') || path.startsWith('../')
      ? resolve(docRoot, path)
      : resolve(process.cwd(), path)

  const demoEntries = glob.sync(truePath)
  const demoCodeRaws = demoEntries.map((p: string) => {
    return fs.readFileSync(p, 'utf-8')
  })

  return {
    source: demoCodeRaws,
    truePath,
  }
}
