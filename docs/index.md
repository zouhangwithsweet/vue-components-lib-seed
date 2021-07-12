---
navbar: false
sidebar: false
editLink: false
---

<script setup>
import { inBrowser, useRouter, withBase } from 'vitepress'
import { onMounted } from 'vue'

onMounted(() => {
  if (inBrowser) {
    window.location.replace(withBase('/zh-CN/'))
  } else {
    useRouter().go(withBase('/zh-CN/'))
  }
})
</script>
