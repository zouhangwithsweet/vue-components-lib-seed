# A Vue3 UI library template

Help you quickly create a component library

## Docs

- [doc example](https://zouhangwithsweet.github.io/vuecomponent-seed/)

## Feature

- Speedy dev & build
- Customize friendly
- More Beautiful doc
- Rich scripts *wip*
- Type friendly
- `ESM` & `CJS` product

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://github.com/johnsoncodehk/volar).

### If Using `<script setup>`

[`<script setup>`](https://github.com/vuejs/rfcs/pull/227) is a feature that is currently in RFC stage. To get proper IDE support for the syntax, use [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) instead of Vetur (and disable Vetur).

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can use the following:
