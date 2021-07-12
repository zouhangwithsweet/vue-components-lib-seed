/* eslint-disable @typescript-eslint/ban-types */

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare const __VP_HASH_MAP__: Record<string, string>
declare const __CARBON__: boolean
declare const __BSA__: boolean
declare const __ALGOLIA__: boolean

declare module '@siteData' {
  const data: string
  export default data
}

// this module's typing is broken
declare module '@docsearch/js' {
  function docsearch<T = any>(props: T): void
  export default docsearch
}

declare module '@docsearch/css' {
  const css: string
  export default css
}
