# 快速开始

<!--以下内容为 vue-components-lib-seed 介绍，可以直接删除-->
## vue-components-lib-seed 介绍

帮助你快速创建组件库。

- :rocket: 使用 `Vite` 开发
- :airplane: 使用 `esbuild` 构建
- :helicopter: 用 `ts-morph` 生成类型

## 文档

- [文档示例](https://vuecomponent-seed.vercel.app/)

## 特点

- :rainbow: 快速开发和构建
- :fireworks: 自定义友好
- :pencil: 更漂亮的文档，支持`中文`和`英文`。 受益于[vueuse](https://github.com/vueuse/vueuse)，支持 `暗黑模式`。
- :lollipop: 丰富的脚本，灵感来自 [esbuild-plugin-vue](https://github.com/egoist/esbuild-plugin-vue) & [vue-dts-gen](https://github.com/egoist/vue-dts-gen)
- :yum: 类型友好
- :truck: `ESM` 和 `CJS` 产品

## 怎样使用

[通过 vuecompoent-seed 生成你的仓库](https://github.com/zouhangwithsweet/vue-components-lib-seed/generate)

### 检查项

- [ ] Replace all `my-lib` words with your libary name. Just search `my-lib` and replace them in VScode
  - `.gitignore`
  - `package.json`
  - `vite.config.ts`
  - `.vitepress`
  - `scripts` ...

### 安装

```bash
yarn
```

### 开发模式

> Benefited from  [`vite-plugin-pages`](https://github.com/hannoeru/vite-plugin-pages), the `src/pages/index.vue` is the entry page for development. You can visit `/[component-name]/demo` to check component, like `http://localhost:3000/#/button/demo`.

```bash
yarn dev
```

### 构建

```bash
yarn build
```

### 测试

```bash
yarn test
```

### 生成入口文件

> 入口文件是 rollup 的 `input` 选项。

```bash
yarn gen-entry
```

### 生成一个新的组件

> 您必须为此命令指定组件名称。

```bash
yarn gen [component\'s name]
```

### 生成 d.ts 文件

```bash
npx esno ./scripts/gen-dts.ts
```

### 发布你的组件库

> This command will add git tag、generate changelog. You can test your lib with argument `--dry`

```bash
yarn release [--dry]
```

## 文档的构建

> :exclamation: Noted: you should run `yarn build:lib` before run this command. Because the docs need the build bundle.

### 开发文档

```bash
yarn docs:dev
```

### 构建文档

```bash
yarn docs:build
```

### 部署文档

vuecompoent-seed 提供了一个 github [action](https://github.com/zouhangwithsweet/vue-components-lib-seed/.github/workflows/build.yml)。 当你将代码推送到 `master` 分支时，文档会自动部署在 `gh-pages` 分支上。然后你可以把 `gh-pages` 分支设置为 Github Pages 的来源。

### 在文档中使用组件 demo

以 `button` 组件为例。

在 `button.md` 文件中, 插入如下代码：

```html
<demo-wrapper
  src="src/packages/button/demo"
/>
```

vuecomponent-sedd 提供了一个全局组件 [`Demos`](https://github.com/zouhangwithsweet/fisand-doc/blob/feat_fisand_doc/src/client/app/components/Demos.vue) 用来展示所有的组件示例。
这也是当前展示组件实例的唯一方式。 [了解更多](https://github.com/zouhangwithsweet/fisand-doc/blob/feat_fisand_doc/src/node/markdown/plugins/demo.ts).

### 自定义文档样式

你可以在 `markdown` 文件的 `frontmatter` 新增 `class` 字段, 全局组件 `<Content>` 将会继承你定义的 `class`。 当然, `windicss` 也能在这里使用。

```markdown
---
class: 'custom-class'
---
```

## 推荐编辑器配置

[VSCode](https://code.visualstudio.com/) + [Volar](https://github.com/johnsoncodehk/volar).

### 如果你使用 `<script setup>`

[`<script setup>`](https://github.com/vuejs/rfcs/pull/227) is a feature that is currently in RFC stage. To get proper IDE support for the syntax, use [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) instead of Vetur (and disable Vetur).

## 此项目离不开以下开源项目

- [unplugin-vue](https://github.com/sxzz/unplugin-vue)
- [esbuild-plugin-vue](https://github.com/egoist/esbuild-plugin-vue)
- [vue-dts-gen](https://github.com/egoist/vue-dts-gen)
- [vueuse](https://github.com/vueuse/vueuse)
- [vitepress-for-component](https://github.com/dewfall123/vitepress-for-component)
- [windicss](https://github.com/windicss/windicss)
- [Element Plus](https://github.com/element-plus/element-plus)

## 特别感谢

| [<img src="https://avatars.githubusercontent.com/u/73626725?v=4" width="75px;"/><br/>eeeeelle<br/> <sub>:writing_hand: 发布脚本</sub>](https://github.com/eeeeelle) |
| :---: |
