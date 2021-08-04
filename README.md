# A Vue3 UI library template

[中文文档](https://github.com/zouhangwithsweet/vuecomponent-seed/blob/master/README.zh-CN.md)

Help you quickly create a component library.

- :rocket: dev with `Vite`
- :airplane: build with `esbuild`
- :helicopter: generate types with `ts-morph`

## Docs

- [doc example](https://zouhangwithsweet.github.io/vuecomponent-seed/)

## Feature

- :rainbow: Speedy dev & build
- :fireworks: Customize friendly
- :pencil: More beautiful doc, support `Chinese` and `English`. Support `Dark Mode` by [vueuse](https://github.com/vueuse/vueuse)
- :lollipop: Rich scripts, inspired by [esbuild-plugin-vue](https://github.com/egoist/esbuild-plugin-vue) & [vue-dts-gen](https://github.com/egoist/vue-dts-gen)
- :yum: Type friendly
- :truck: `ESM` & `CJS` product

## How to use

[Generate a repository by vuecompoent-seed](https://github.com/zouhangwithsweet/vuecomponent-seed/generate)

### Install

```bash
yarn
```

### Dev

> Benefited from  [`vite-plugin-pages`](https://github.com/hannoeru/vite-plugin-pages), the `src/pages/index.vue` is the entry page for development. You can visit `/[component-name]/demo` to check component, like `http://localhost:3000/#/button/demo`.

```bash
yarn dev
```

### Build

```bash
yarn build
```

### Test

```bash
yarn test
```

### Generate entry point

> The entry file is the `input` option for rollup.

```bash
yarn gen-entry
```

### Generate Component

> A component's name is required for this command.

```bash
yarn gen [component\'s name]
```

### Generate dts

```bash
npx esno ./scripts/gen-dts.ts
```

### Release

> This command will add git tag、generate changelog. You can test your lib with argument `--dry`

```bash
yarn release [--dry]
```

## Build Docs

> :exclamation: Noted: you should run `yarn build:lib` before run this command. Because the docs need the build bundle.

### Docs dev

```bash
yarn docs:dev
```

### Docs build

```bash
yarn docs:build
```

### Docs deploy

Here is a git [action](https://github.com/zouhangwithsweet/vuecomponent-seed/blob/master/.github/workflows/build.yml). When you push the code to the `master` branch, the document will be automatically deployed on `gh-pages` branch.
Then you can set the Github Pages's source on the `gh-pages` branch.

### Use demo code in doc

Take button as an example.

In `button.md`, insert the following code

```html
<demo-wrapper
  src="src/packages/button/demo"
  :demos="demos"
/>

<script setup>
const demos = import.meta.globEager('../../../src/packages/button/demo/demo*.vue')
</script>
```

There is a global component [`DemoWrapper`](https://github.com/zouhangwithsweet/vuecomponent-seed/blob/master/docs/.vitepress/theme/DemoWrapper.vue) to display all demos.
This is currently the only way to show demo. [More info](https://github.com/zouhangwithsweet/vuecomponent-seed/blob/master/docs/.vitepress/plugins/demo.js).

### Custom doc style

You can add the `class` in frontmatter, then the `<Content>` would inherit the `class`. Of course, the `windicss` can be used here.

```markdown
---
class: 'custom-class'
---
```

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://github.com/johnsoncodehk/volar).

### If Using `<script setup>`

[`<script setup>`](https://github.com/vuejs/rfcs/pull/227) is a feature that is currently in RFC stage. To get proper IDE support for the syntax, use [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) instead of Vetur (and disable Vetur).

## Credits

- [esbuild-plugin-vue](https://github.com/egoist/esbuild-plugin-vue)
- [vue-dts-gen](https://github.com/egoist/vue-dts-gen)
- [vueuse](https://github.com/vueuse/vueuse)
- [vitepress-for-component](https://github.com/dewfall123/vitepress-for-component)
- [windicss](https://github.com/windicss/windicss)
- [Element Plus](https://github.com/element-plus/element-plus)

## Thanks

| [<img src="https://avatars.githubusercontent.com/u/73626725?v=4" width="75px;"/><br/><sub>eeeeelle</sub>](https://github.com/eeeeelle) |
| :---: |
