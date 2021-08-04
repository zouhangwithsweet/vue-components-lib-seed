import { componentEntrys } from './esbuild'
import path from 'path'
import fs from 'fs'

function genDocs(lang = 'zh-CN') {
  const descDir = path.resolve(
    process.cwd(),
    `docs/${lang}/components`
  )

  fs.mkdirSync(descDir, {
    recursive: true,
  })
  fs.copyFileSync(
    path.resolve(
      process.cwd(),
      lang === 'zh-CN'
        ? 'CHANGELOG.zh-CN.md'
        : 'CHANGELOG.md'
    ),
    path.resolve(descDir, 'index.md')
  )
  fs.copyFileSync(
    path.resolve(
      process.cwd(),
      lang === 'zh-CN' ? 'README.zh-CN.md' : 'README.md'
    ),
    path.resolve(descDir, 'quick-start.md')
  )
  componentEntrys.forEach((item) => {
    const name = path.basename(path.dirname(item))
    fs.existsSync(
      path.resolve(
        path.dirname(item),
        lang === 'zh-CN' ? 'README.zh-CN.md' : 'README.md'
      )
    ) &&
      fs.copyFileSync(
        path.resolve(
          path.dirname(item),
          lang === 'zh-CN' ? 'README.zh-CN.md' : 'README.md'
        ),
        path.resolve(descDir, name + '.md')
      )
  })
}

genDocs()
genDocs('en-US')
