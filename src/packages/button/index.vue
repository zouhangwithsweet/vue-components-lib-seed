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
  box-sizing border-box
  display inline-block
  padding 0px 1.375rem
  height 2.5rem
  line-height 2.5rem
  min-width 12.5rem
  width auto
  border-radius 5px
  font-weight 400
  font-size 0.875rem
  user-select none
  outline none
  text-transform capitalize
  -webkit-box-pack center
  justify-content center
  text-align center
  white-space nowrap
  transition background-color 200ms ease 0ms, box-shadow 200ms ease 0ms, border 200ms ease 0ms, color 200ms ease 0ms
  position relative
  overflow hidden
  color rgb(102, 102, 102)
  background-color rgb(255, 255, 255)
  border 1px solid rgb(234, 234, 234)
  cursor pointer
  pointer-events auto
  box-shadow none
  &:hover,&:focus
    color rgb(0, 0, 0)
    background-color rgb(255, 255, 255)
    border-color rgb(0, 0, 0)
    cursor pointer
    pointer-events auto
    box-shadow none
    transform translate3d(0px, 0px, 0px)
</style>
