<template>
  <button class="default">click</button>
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

<style lang="stylus">
.default
  color #101010
</style>
