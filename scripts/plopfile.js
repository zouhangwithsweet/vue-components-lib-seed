import fs from 'fs'
import path from 'path'

module.exports = function (
  /** @type {import('plop').NodePlopAPI} */ plop
) {
  plop.setGenerator('component', {
    description: 'create a component',
    prompts: [
      {
        name: 'name',
        validate: function (name) {
          if (checkComponentName(name)) {
            return '组件名称请使用(kebab-case)方式命名'
          }
          if (checkComponentExist(name)) {
            return `组件库中已经存在名为${name}的组件！请仔细核对后重新创建`
          }
          return true
        },
      },
    ],
    actions: [
      {
        type: 'addMany',
        destination: '../src/packages/{{name}}/',
        base: `../scripts/_template`,
        templateFiles: `../scripts/_template/**/**`,
      },
    ],
  })
}

/**
 * 校验组件名称是否符合短横线命名
 * @type {(str: string) => boolean}
 */
const checkComponentName = (componentName) => {
  return !/^[a-z][a-z|-]*[a-z]$/.test(componentName)
}

/**
 * 校验组件是否已经创建
 * @type {(str: string) => boolean}
 */
const checkComponentExist = (componentName) => {
  return fs.existsSync(
    path.resolve(
      __dirname,
      `../src/packages/${componentName}`
    )
  )
}
