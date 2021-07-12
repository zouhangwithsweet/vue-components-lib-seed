<template>
  <button>click</button>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'Button',
  props: {
    type: {
      type: String as PropType<'default' | 'primary'>,
      default: 'default',
    },
  },
  setup() {},
})
</script>

<style lang="stylus"></style>
