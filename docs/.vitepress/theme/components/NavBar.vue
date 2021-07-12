<script setup lang="ts">
import { defineEmits, defineProps, computed } from 'vue'
import { useWindowScroll } from '@vueuse/core'
import { useRepo } from '../composables/repo'
import NavBarTitle from './NavBarTitle.vue'
import NavLinks from './NavLinks.vue'
import ToggleSideBarButton from './ToggleSideBarButton.vue'
import GithubLink from './GithubLink.vue'
import DarkSwitch from './DarkSwitch.vue'
import LangSwitch from './LangSwitch.vue'

defineEmits(['toggle'])

defineProps({
  showSidebar: { type: Boolean, required: true },
})

const repo = useRepo()
const isGithub = () => repo.value?.text.toLowerCase() === 'github'

const { y } = useWindowScroll()
const shadowStyle = computed(() => {
  return {
    boxShadow: `0 0 5px rgb(10 16 20 / ${ y.value / 10 > 10 ? 10 : y.value / 10 }%)`
  }
})
</script>

<template>
  <header class="nav-bar" :class="[!showSidebar ? 'pl-1.5rem' : 'pl-16']" :style="shadowStyle">
    <ToggleSideBarButton v-show="showSidebar" @toggle="$emit('toggle')" />

    <NavBarTitle />

    <div class="flex-grow" />

    <div class="nav">
      <NavLinks />
    </div>

    <div class="nav-icons flex items-center gap-2">
      <GithubLink v-if="repo && isGithub()" :item="repo" />
      <DarkSwitch />
      <LangSwitch />
    </div>

    <slot name="search" />
  </header>
</template>

<style scoped>
.nav-bar {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: var(--z-index-navbar);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid transparent;
  padding-top: 0.7rem;
  padding-right: 1.5rem;
  padding-bottom: 0.7rem;
  height: var(--header-height);
  background-color: var(--c-bg);
}

.nav-bar.border-bottom {
  border-bottom: 1px solid var(--c-divider);
}

@media (min-width: 720px) {
  .nav-bar {
    padding: 0.7rem 1.5rem;
  }
}

.flex-grow {
  flex-grow: 1;
}

.nav {
  display: none;
}

@media (min-width: 720px) {
  .nav {
    display: block;
  }
}

.nav-icons {
  margin-left: 12px;
  padding-left: .5rem;
}
</style>
