<script setup lang="ts">
import { defineProps, shallowReactive, computed } from 'vue'
import { useClipboard } from '@vueuse/core'
import { useData } from 'vitepress'

const props = defineProps({
  demos: { type: Object, required: true },
  htmlStrs: { type: String, required: true },
  codeStrs: { type: String, required: true },
})

const comps = props.demos
  ? Object
    .entries(props.demos)
    .map((demo) => (shallowReactive({
      component: demo[1].default,
      showCodeExample: false,
      copied: false,
    })))
  : []

const anchor = '&-&'

const decodedHtmlStrs = computed(() =>
  [...props.htmlStrs.split(anchor).map(html => decodeURIComponent(html.replace(/\&/g, "'")))]
)

const decodeCodeRaws = computed(() =>
  [...props.codeStrs.split(anchor).map(html => decodeURIComponent(html.replace(/\&/g, "'")))]
)

const copyHandler = (index: number) => {
  const { text, copy, copied, isSupported } = useClipboard({
    source: decodeCodeRaws.value[index]
  })

  isSupported && copy()

  if (comps[index].copied) return

  comps[index].copied = true
  globalThis.setTimeout(() => {
    comps[index].copied = false
  }, 2000)
}


const { frontmatter } = useData()
const name = frontmatter.value.component
</script>

<template>
  <ClientOnly>
    <article class="
      demo-wrapper flex flex-col m-auto 
      <lg:justify-center lg:justify-between"
      :class="`${name}-demo`"
      v-bind="$attrs"
    >
      <div
        v-for="(demo, index) in comps"
        :key="index"
        class="
          example-section
          flex flex-col
          mb-16 rounded-lg border-1 border-primary border-solid
          overflow-hidden
          last:mb-0
        "
      >
        <div
          class="
            example-title text-lg py-2 px-2 font-600
            <sm:text-md
          "
          v-text="demo.component.title"
        ></div>
        <div
          v-if="demo.component.describe"
          class="example-describe text-md my-1 <sm:text-xs <sm:my-1 "
          v-text="demo.component.describe"
        ></div>
        <div class="
            example-content
            flex-1 px-32 py-12
            <sm:p-4
          "
        >
          <div class="demo-component">
            <component :is="demo.component"></component>
          </div>
        </div>
        <div class="operations relative py-2 px-2 text-center">
          <fluent:clipboard-code-24-regular
            class="text-md cursor-pointer <sm:text-sm"
            @click="copyHandler(index)"
          />
          <ant-design:code-outlined
            class="text-md cursor-pointer ml-12 <sm:text-sm"
            :class="[ demo.showCodeExample? 'active-code' : '']"
            @click="demo.showCodeExample = !demo.showCodeExample"
          />

          <transition name="fade">
            <span
              v-show="demo.copied"
              class="
                block absolute left-1/2 top-0
                text-xs text-blue-500 bg-blue-gray-50
                rounded-md
                shadow-sm
              "
              style="padding: 4px 10px; z-index: 999; transform: translate(-96%, -80%);"
            >复制成功!</span>
          </transition>
        </div>
        <div
          v-if="demo.showCodeExample"
          class="example-code language-vue mx-0"
          v-html="decodedHtmlStrs[index]"
        >
        </div>
      </div>
    </article>
  </ClientOnly>
</template>

<style lang="stylus">
.demo-component {
  width: 750px;
  margin: 0 auto;
}

.example-title {
  border-bottom: 1px solid  #eee;
}

.example-code {
  margin: 0 auto !important;
  width: 100%;
}

.operations {
  border-top: 1px dashed  #eee;
}

.active-code {
  color: var(--c-brand);
}

@media (max-width: 640px) {
  .demo-wrapper {
    max-width: 100%;
  }

  .demo-wrapper > div {
    flex: 0 0 100%;
  }

  .demo-component {
    width: auto;
    margin: 0 auto;
  }
}

@media (min-width: 640px) and (max-width: 1024px) {
  .demo-wrapper > div {
    flex: 0 0 100%;
  }
}

.fade
  &-enter-from, &-leave-to
    opacity 0.01
  &-enter-active
    transition opacity 300ms cubic-bezier(0.215, 0.61, 0.355, 1)
  &-leave-active
    transition opacity 250ms linear
</style>
