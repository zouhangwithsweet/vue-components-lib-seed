# A Vue3 UI library template

Help you quickly create a component library

## Docs

- [doc example](https://zouhangwithsweet.github.io/vuecomponent-seed/)

## Feature

- Speedy dev & build
- Customize friendly
- More Beautiful doc, support `Chinese` and `English`. Support `Dark Mode` by [vueuse](https://github.com/vueuse/vueuse)
- Rich scripts, inspired by [esbuild-plugin-vue](https://github.com/egoist/esbuild-plugin-vue) & [vue-dts-gen](https://github.com/egoist/vue-dts-gen)
- Type friendly
- `ESM` & `CJS` product

## How to use

### Init

```bash
yarn
```

### Dev

```bash
yarn dev
```

### Build

```bash
yarn build
```

### Generate entry point

```bash
yarn gen-entry
```

### Generate Component

```bash
yarn gen [component\'s name]
```

### Generate dts

```bash
npx esno ./scripts/gen-dts.ts
```

## Build Docs

### Docs dev

```bash
yarn docs:dev
```

### Docs build

```bash
yarn docs:build
```

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

There is a global component [`DemoWrapper`](./docs/.vitepress/theme/DemoWrapper.vue) to display all demos.
This is currently the only way to show demo. [More info](./docs/.vitepress/plugins/demo.js).

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://github.com/johnsoncodehk/volar).

### If Using `<script setup>`

[`<script setup>`](https://github.com/vuejs/rfcs/pull/227) is a feature that is currently in RFC stage. To get proper IDE support for the syntax, use [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) instead of Vetur (and disable Vetur).
