<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useData } from 'vitepress'
import NavLink from './NavLink.vue'
import { mouseFollow } from '../effects/mouse-follow'

const { site, frontmatter } = useData()

const showHero = computed(() => {
  const {
    heroImage,
    heroText,
    tagline,
    actionLink,
    actionText
  } = frontmatter.value
  return heroImage || heroText || tagline || (actionLink && actionText)
})

const heroText = computed(() => frontmatter.value.heroText || site.value.title)

const container = ref<HTMLElement>()
const inner = ref<HTMLElement>()
onMounted(() => {
  mouseFollow(container.value, inner.value)
})
</script>

<template>
  <header v-if="showHero" class="home-hero">
    <section class="
        container
        mx-auto
        flex
        <lg:flex-row
        <lg:justify-center
        <md:flex-col
        <md:items-center
      "
    >
      <div ref="container" class="w-1/2 <sm:w-auto">
        <div ref="inner" class="inner">
          <img src="/banner.png" class="block">
        </div>
      </div>
      <div class="w-1/2 flex flex-col justify-center items-start p-16 <sm:w-full <sm:items-center <sm:p-0">
        <p v-if="heroText" class="relative font-sans text-6xl <md:text-3xl <md:text-center <md:w-full">
          {{ heroText }} <sub class="absolute top-0 -right-16 text-2xl animate-text <sm:text-sm <sm:right-12">seed</sub>
        </p>
        <p v-if="frontmatter.tagline" class="text-base text-gray-500 lg:text-left">
          {{ frontmatter.tagline }}
        </p>
        <div class="home-text-action <sm:w-full <sm:flex <sm:flex-col">
          <NavLink
            v-if="frontmatter.actionLink && frontmatter.actionText"
            :item="{ link: frontmatter.actionLink, text: frontmatter.actionText }"
            class="action overflow-hidden rounded-full"
          />

          <NavLink
            v-if="frontmatter.altActionLink && frontmatter.altActionText"
            :item="{
              link: frontmatter.altActionLink,
              text: frontmatter.altActionText
            }"
            class="action alt overflow-hidden rounded-full <md:ml-0 lg:ml-4"
          />
        </div>
      </div>
    </section>
  </header>
</template>

<style scoped>
.home-hero {
  margin: 2.5rem 0 2.75rem;
  padding: 0 1.5rem;
  text-align: center;
}

@media (min-width: 420px) {
  .home-hero {
    margin: 3.5rem 0;
  }
}

@media (min-width: 720px) {
  .home-hero {
    margin: 4rem 0 4.25rem;
  }
}

.figure {
  padding: 0 1.5rem;
}

.image {
  display: block;
  margin: 0 auto;
  width: auto;
  max-width: 100%;
  max-height: 280px;
}

.title {
  margin-top: 1.5rem;
  font-size: 2rem;
}

@media (min-width: 420px) {
  .title {
    font-size: 3rem;
  }
}

@media (min-width: 720px) {
  .title {
    margin-top: 2rem;
  }
}

.description {
  margin: 0;
  margin-top: 0.25rem;
  line-height: 1.3;
  font-size: 1.2rem;
  color: var(--c-text-light);
}

@media (min-width: 420px) {
  .description {
    line-height: 1.2;
    font-size: 1.6rem;
  }
}

.action {
  margin-top: 1.5rem;
  display: inline-block;
}

/* .action.alt {
  margin-left: 1.5rem;
} */

@media (min-width: 420px) {
  .action {
    margin-top: 2rem;
    display: inline-block;
  }
}

.action :deep(.item) {
  display: inline-block;
  border-radius: 6px;
  padding: 0 20px;
  line-height: 44px;
  font-size: 1rem;
  font-weight: 500;
  color: var(--c-bg);
  background-color: var(--c-brand);
  border: 1px solid var(--c-brand);
  border-radius: inherit;
  transition: background-color 0.1s ease;
}

.action.alt :deep(.item) {
  background-color: var(--c-bg);
  color: var(--c-brand);
}

.action :deep(.item:hover) {
  text-decoration: none;
  /* color: var(--c-bg);
  background-color: var(--c-brand-light); */
}

@media (min-width: 420px) {
  .action :deep(.item) {
    padding: 0 24px;
    line-height: 52px;
    font-size: 1.2rem;
    font-weight: 500;
  }
}
.font-sans {
  font-family: DINAlternate-Bold;
}
.rounded-full :deep(.item) {
  width: 140px;
}

.inner {
  transition: transform 0.5s;
}

.animate-text {
  animation: animate 2s linear infinite;
}
@keyframes animate {
  0%, 100% {
    text-shadow: -1px -1px 0 #0ff, 1px 1px 0 #f00;
  }
  25% {
    text-shadow: 1px 1px 0 #0ff, -1px -1px 0 #f00;
  }
  50% {
    text-shadow: 1px -1px 0 #0ff, 1px -1px 0 #f00;
  }
  75% {
    text-shadow: -1px 1px 0 #0ff, -1px 1px 0 #f00;
  }
}
</style>
