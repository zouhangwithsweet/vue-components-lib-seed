/**
 * 组件生成脚本
 * 关键：
 * 1. export { XXComponent} export default XXComponent 都要存在，方便打包
 * 2. 出口 为 index.ts
 * 3. 自带一个 install 的方法，方便单独引用
 */

import path from 'path'
import chalk from 'chalk'
import { Plop, run } from 'plop'

const args = process.argv.slice(2)
const argv = require('minimist')(args)

/**
 * 生成模版
 */
function generateTemplate() {
  console.log(
    `${chalk.cyanBright.bold('Welcome to My lib!')}`
  )
  if (argv.name === true) {
    console.log(
      chalk.red('[ERROR] ') +
        '开发组件命令: yarn gen  [component name]'
    )
    return
  }
  Plop.launch(
    {
      configPath: path.resolve(__dirname, 'plopfile.js'),
    },
    (env) => run(env, undefined, true)
  )
}

generateTemplate()
