/**
 * todo
 * 生成 bundle 的入口文件
 * 1. 读取 packages/index.ts 拿到导出 （es-module-lexer）
 * 2. 生成一个 entry.ts
 */
import path from 'path'
import fs from 'fs'
import { spawn } from 'child_process'
import klawSync from 'klaw-sync'
import { init, parse } from 'es-module-lexer'

import pkg from '../package.json'

const CWD = process.cwd()
const PACKAGES_PATH = path.resolve(
  __dirname,
  '../src/packages'
)

const componentEntrys = klawSync(PACKAGES_PATH, {
  nofile: true,
  depthLimit: 0,
})
  .filter(
    (dir) =>
      !dir.path.endsWith('utils') &&
      !dir.path.endsWith('directives') &&
      !dir.path.endsWith('locale') &&
      !dir.path.endsWith('composable')
  )
  .map((dir) => dir.path + '/index.ts')

async function parseComponentExports() {
  let str = ''
  const componentNames = []
  const version = pkg.version

  await init
  str += `import type { App } from 'vue'\n`

  /**
   * 遍历组件
   */
  for (const comp of componentEntrys) {
    const code = fs.readFileSync(comp, {
      encoding: 'utf-8',
    })
    const [_, exports] = parse(code)
    str += `import ${exports[0]} from '${comp
      .replace(/\.ts$/, '')
      .replace(`${CWD}/src/packages`, '.')}'\n`
    componentNames.push(exports[0])
  }
  str += '\n'
  str += `const components = [${componentNames.join(
    ', '
  )}]\n`

  /**
   * export default
   */
  str += `const version = '${version}'\n`
  str += `
    const install = (app: App) => {
      components.forEach((component) => {
        component.name && app.component(component.name, component)
      })
    }\n
  `
  /**
   * export const
   */
  str += `export { ${componentNames.join(', ')} }\n`

  str += `export default { version, install }\n`

  return str
}

async function writeEntry() {
  fs.writeFileSync(
    `${CWD}/src/packages/my-lib.ts`,
    await parseComponentExports()
  )
  /**
   * 格式化
   */
  spawn('eslint', ['./src/packages/my-lib.ts', '--fix'])
}

writeEntry()
