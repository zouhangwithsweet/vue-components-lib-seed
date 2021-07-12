<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, withBase } from 'vitepress'
import { isZh, isEn } from '../composables/i18n'
const route = useRoute()

const enPath = computed(() => route.path.replace('/zh-CN/', '/en-US/'))
const zhPath = computed(() => route.path.replace('/en-US/', '/zh-CN/'))

const hasNoBase = (path: string) => !path.startsWith('/zh-CN/') && !path.startsWith('/en-US/')
</script>

<template>
  <button aria-label="Toggle Theme" class="nav-btn m-0 p-0">
    <a class="block" :href="!hasNoBase(zhPath) ? withBase(zhPath) : zhPath">
      <uil:letter-chinese-a v-show="isEn(route.path)"/>
    </a>
    <a class="block" :href="!hasNoBase(enPath) ? withBase(enPath) : enPath">
      <ri:english-input v-show="isZh(route.path)"/>
    </a>
  </button>
</template>

<style>
.nav-btn a {
  color: var(--c-text);
}
</style>
