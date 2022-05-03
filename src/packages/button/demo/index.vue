<template>
  <div class="mylib-nav">
    <p class="home" @click="$router.push('/')">Home</p>
    <p class="name">Button</p>
    <p class="name-zh"><del>组件中文名称</del></p>
  </div>
  <div class="mylib-example button">
    <section
      v-for="(demo, index) in demos"
      :key="index"
      class="mylib-example-section"
    >
      <div
        class="mylib-example-title"
        v-text="demo.title"
      ></div>
      <div
        class="mylib-example-describe"
        v-text="demo.describe"
      ></div>
      <div class="mylib-example-content">
        <component :is="demo"></component>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { createDemoModule } from '../../utils/index'

const demosRaw = import.meta.globEager('./demo*.vue')
const demos = Object.keys(demosRaw).map(
  (d) => demosRaw[d].default
)
</script>

<style lang="stylus"></style>
