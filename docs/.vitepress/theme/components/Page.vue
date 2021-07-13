<script setup lang="ts">
import { useData } from 'vitepress'
import { computed } from 'vue'
import PageFooter from './PageFooter.vue'
import NextAndPrevLinks from './NextAndPrevLinks.vue'

const { frontmatter } = useData()
const customClass = computed(() => frontmatter.value.class ?? '')
</script>

<template>
  <main class="page">
    <div class="container">
      <slot name="top" />

      <Content class="content" :class="customClass"/>
      <PageFooter />
      <NextAndPrevLinks />

      <slot name="bottom" />
    </div>
  </main>
</template>

<style scoped>
.page {
  padding-top: var(--header-height);
}

@media (min-width: 720px) {
  .page {
    margin-left: var(--sidebar-width);
  }
}

@media (min-width: 960px) {
  .page {
    margin-left: var(--sidebar-width);
  }
}

.container {
  margin: 0 auto;
  margin-right: var(--slug-width);
  padding: 0 1.5rem 4rem;
  max-width: calc(100% - var(--slug-width));
}

@media (max-width: 1280px) {
  .container {
    margin-right: auto;
    max-width: 100%;
  }
}

.content {
  padding-bottom: 1.5rem;
}

@media (max-width: 420px) {
  .content {
    /* fix carbon ads display */
    clear: both;
  }
}
</style>
