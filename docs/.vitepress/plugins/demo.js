const { highlight } = require('vitepress/dist/node/markdown/plugins/highlight')
const fs = require('fs')
const klawSync =require('klaw-sync')
const anchor = '&-&'
/**
 * @type {(md: import('markdown-it')) => void}
 */
module.exports = function demoPlugin(md) {
  const RE = /^<(script|style)(?=(\s|>|$))/i
  const DEMO_RE = /^<demo-wrapper\s+.+\s+\/?/
  const DEMO_PATH_RE = /src=("|')src\/packages\/[A-z]+-?[A-z]+\/demo("|')/

  md.renderer.rules.html_block = (tokens, idx) => {
    const content = tokens[idx].content
    const data = md.__data
    const hoistedTags = data.hoistedTags || (data.hoistedTags = [])

    if (RE.test(content.trim())) {
      hoistedTags.push(content)
      return ''
    } else {
      if (DEMO_RE.test(content.trim())) {
        const { demoCodeStrs, demoCodeRaws } = demoFileHtmlStr(getDemoTruePath(content.trim()))
        return content.replace('<demo-wrapper', `
          <demo-wrapper
            htmlStrs=${demoCodeStrs.join(anchor)}
            codeStrs=${demoCodeRaws.join(anchor)}
        `)
      }
      return content
    }
  }

  /**
   * @type  {(content: string) => string}
   */
  function getDemoTruePath(content) {
    const demoPath = content.match(DEMO_PATH_RE)?.[0]?.split('"')[1]
    return demoPath
  }

  /**
   * @type  {(path: string) => { demoCodeStrs: string[], demoCodeRaws: string[] }}
   */
  function demoFileHtmlStr(path) {
    const demoEntries = klawSync(path, {
      nodir: true,
      depthLimit: 0,
    })
      .filter(p => !p.path.endsWith('index.vue'))
      .map(p => p.path)

    const demoCodeStrs = demoEntries.map(p => {
      const codeStr = fs.readFileSync(p, 'utf-8')
      const htmlStr = encodeURIComponent(highlight(codeStr, 'vue'))

      return htmlStr.replace(/\'/g, '&')
    })

    const demoCodeRaws = demoEntries.map(p => {
      return encodeURIComponent(fs.readFileSync(p, 'utf-8')).replace(/\'/g, '&')
    })

    return { demoCodeStrs, demoCodeRaws }
  }
}
