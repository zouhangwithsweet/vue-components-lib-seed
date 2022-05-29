<script setup lang="ts">
import { shallowReactive } from 'vue'
import { useClipboard } from '@vueuse/core'
import { useData } from 'vitepress'
import { submitCodepen } from '../utils'

const data = useData() as any
const codepen = data.theme.value.codepen
const lib = data.lib?.value || {}

const props = defineProps({
  demo: { type: Object, default: undefined },
  template: { type: String, default: '' },
  script: { type: String, default: '' },
  styles: { type: String, default: '' },
  htmlStrs: { type: String, default: '' },
  codeStrs: { type: String, default: '' },
  src: { type: String, default: undefined },
})

const demoInfo = shallowReactive({
  title: '',
  describe: '',
  ...props.demo,
  showCodeExample: false,
  copied: false,
})

const demoHTML = decodeURIComponent(
  props.htmlStrs.replace(/\&/g, "'")
)

const codepenHandler = () => {
  submitCodepen(props, lib)
}

const copyHandler = () => {
  const { copy, isSupported } = useClipboard({
    source: decodeURIComponent(
      props.codeStrs.replace(/\&/g, "'")
    ),
  })

  isSupported && copy()

  if (demoInfo.copied) return

  demoInfo.copied = true
  globalThis.setTimeout(() => {
    demoInfo.copied = false
  }, 1200)
}
</script>
<template>
  <ClientOnly>
    <div
      class="flex flex-col my-4 rounded-lg border-1 border-gray-200 border-solid last:mb-0 divide-y divide-gray-200"
    >
      <!-- title -->
      <div
        class="flex justify-between items-center text-sm py-2 px-2 <sm:text-md select-none"
      >
        <p class="!m-0">{{ demoInfo.title || '基础' }}</p>
        <!-- operation -->
        <div
          class="relative flex px-2 text-center"
          :class="'justify-end'"
        >
          <img
            v-show="codepen"
            src="https://api.iconify.design/la:codepen.svg"
            alt=""
            class="text-md cursor-pointer <sm:text-sm"
            @click="codepenHandler"
          />
          <img
            src="https://api.iconify.design/ph:copy-thin.svg"
            alt=""
            class="text-md cursor-pointer ml-2 <sm:text-sm"
            @click="copyHandler"
          />
          <img
            src="https://api.iconify.design/ph:code.svg"
            alt=""
            class="text-md cursor-pointer ml-2 <sm:text-sm"
            :class="[
              demoInfo.showCodeExample ? 'active-code' : '',
            ]"
            @click="
              demoInfo.showCodeExample =
                !demoInfo.showCodeExample
            "
          />
        </div>
      </div>
      <div
        v-if="demoInfo.describe"
        class="text-xs my-1 <sm:text-xs <sm:my-1"
        v-text="demoInfo.describe"
      ></div>
      <!-- demo -->
      <div class="demo-component p-4px">
        <component :is="demo"></component>
      </div>
      <div
        v-if="demoInfo.showCodeExample"
        class="example-code language-vue relative"
      >
        <transition name="fade">
          <span
            v-show="demoInfo.copied"
            class="block absolute left-1/2 top-8 text-xs text-blue-500 bg-blue-gray-50 rounded-md shadow-sm"
            style="
              padding: 4px 10px;
              z-index: 9999;
              transform: translate(-50%, -80%);
            "
            >复制成功!</span
          >
        </transition>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="demoHTML" />
      </div>
    </div>
  </ClientOnly>
</template>

<style>
.border-bottom {
  border-bottom: 1px dotted rgba(229, 231, 235, 1);
}

.border-top-dotted {
  border-top-style: dotted;
}

.active-code {
  color: var(--c-brand);
}

.example-code {
  margin: 0 auto !important;
  width: 100%;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0.01;
}
.fade-enter-active {
  transition: opacity 300ms
    cubic-bezier(0.215, 0.61, 0.355, 1);
}
.fade-leave-active {
  transition: opacity 250ms linear;
}
</style>
