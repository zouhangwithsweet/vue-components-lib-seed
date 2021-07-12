<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vitepress'
import { isZh, isEn } from '../composables/i18n'
const route = useRoute()

const enPath = computed(() => route.path.replace('/zh-CN/', '/en-US/'))
const zhPath = computed(() => route.path.replace('/en-US/', '/zh-CN/'))
</script>

<template>
  <button aria-label="Toggle Theme" class="nav-btn m-0 p-0">
    <a class="block" :href="zhPath">
      <uil:letter-chinese-a v-show="isEn(route.path)"/>
    </a>
    <a class="block" :href="enPath">
      <ri:english-input v-show="isZh(route.path)"/>
    </a>
  </button>
</template>

<style>
.nav-btn a {
  color: var(--c-text);
}
</style>
