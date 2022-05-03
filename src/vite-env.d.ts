/// <reference types="vite/client" />

declare module 'virtual:generated-pages' {
  import { RouteRecordRaw } from 'vue-router'
  const routes: RouteRecordRaw[]
  export default routes
}

declare module '~icons/*' {
  const icon: any
  export default icon
}
