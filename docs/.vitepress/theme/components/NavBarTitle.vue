<script setup lang="ts">
import { withBase, useData, useRoute } from 'vitepress'
import { computed } from 'vue'
const { site, theme, localePath } = useData()

const route = useRoute()

const currentPath = computed(() => {
  return route.path.includes('/zh-CN/') ? withBase('/zh-CN/') : withBase('/en-US/')
})
</script>

<template>
  <a
    class="nav-bar-title flex items-center"
    :href="currentPath"
    :aria-label="`${site.title}, back to home`"
  >
    <img
      v-if="theme.logo"
      class="logo"
      :src="withBase(theme.logo)"
      alt="Logo"
    />
    {{ site.title }}
  </a>
</template>

<style scoped>
.nav-bar-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--c-text);
}

.nav-bar-title:hover {
  text-decoration: none;
}

.logo {
  margin-right: 0.75rem;
  height: 1.3rem;
  vertical-align: bottom;
}
</style>
