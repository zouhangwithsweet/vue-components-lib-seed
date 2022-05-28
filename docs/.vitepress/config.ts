import { defineConfig } from 'vitepress'
import klawSync from 'klaw-sync'
import path from 'path'

const basePath = '/zh-CN/components'
const componentDocs = klawSync(
  path.resolve(__dirname, '..' + basePath),
  {
    nodir: true,
  }
)
  .map((item) =>
    path.basename(item.path).replace('.md', '')
  )
  .filter(
    (path) =>
      !path.includes('index') &&
      !path.includes('quick-start')
  )
  .map((path) => ({
    text: path.replace(/\w/, ($0) => $0.toUpperCase()),
    link: path,
  }))

const zhComponentDocs = componentDocs.map((item) => ({
  ...item,
  link: '/zh-CN/components/' + item.link,
}))

const enComponentDocs = componentDocs.map((item) => ({
  ...item,
  link: '/en-US/components/' + item.link,
}))

const REPO_BASE_URL = '/vue-components-lib-seed/'

export default defineConfig({
  base: process.env.VERCEL_BUILD ? '/' : REPO_BASE_URL,
  title: 'VueCompsLibSeed',
  description: 'vue-components-lib-seed doc',
  head: [
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        href: REPO_BASE_URL + 'favicon.ico',
      },
    ],
    [
      'link',
      {
        rel: 'dns-prefetch',
        href: 'https://fonts.gstatic.com',
      },
    ],
    [
      'link',
      {
        rel: 'preconnect',
        crossorigin: 'anonymous',
        href: 'https://fonts.gstatic.com',
      },
    ],
    [
      'link',
      {
        href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@200;400;500&family=Inter:wght@200;400;500;600',
        rel: 'stylesheet',
      },
    ],
  ],

  lang: 'en-US',

  themeConfig: {
    logo: '/logo.png',
    nav: [{ text: '组件', link: '/zh-CN/components/' }],

    sidebar: {
      '/en-US/components/': [
        {
          text: 'How to use',
          collapsible: true,
          items: [
            {
              text: 'Changelog',
              link: '/en-US/components/',
            },
            {
              text: 'QuickStart',
              link: '/en-US/components/quick-start',
            },
          ],
        },
        {
          text: '组件',
          items: enComponentDocs,
        },
      ],
      '/zh-CN/components/': [
        {
          text: '使用',
          collapsible: true,
          items: [
            {
              text: '更新日志',
              link: '/zh-CN/components/',
            },
            {
              text: '快速开始',
              link: '/zh-CN/components/quick-start',
            },
          ],
        },
        {
          text: '组件',
          items: zhComponentDocs,
        },
      ],
    },

    editLink: {
      repo: 'vuejs/vitepress',
      branch: 'next',
      dir: 'docs',
      text: 'Edit this page on GitHub',
    },

    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/vuejs/vitepress',
      },
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2019-present Zou Hang',
    },
  },
})

function nav() {
  return [
    {
      text: 'Guide',
      link: '/guide/what-is-vitepress',
      activeMatch: '/guide/',
    },
    {
      text: 'Configs',
      link: '/config/introduction',
      activeMatch: '/config/',
    },
    {
      text: 'Changelog',
      link: 'https://github.com/vuejs/vitepress/blob/main/CHANGELOG.md',
    },
  ]
}

function sidebarGuide() {
  return [
    {
      text: 'Introduction',
      collapsible: true,
      items: [
        {
          text: 'What is VitePress?',
          link: '/guide/what-is-vitepress',
        },
        {
          text: 'Getting Started',
          link: '/guide/getting-started',
        },
        {
          text: 'Configuration',
          link: '/guide/configuration',
        },
        {
          text: 'Asset Handling',
          link: '/guide/asset-handling',
        },
        {
          text: 'Markdown Extensions',
          link: '/guide/markdown-extensions',
        },
        { text: 'Frontmatter', link: '/guide/frontmatter' },
        {
          text: 'Using Vue in Markdown',
          link: '/guide/using-vue',
        },
        { text: 'API Reference', link: '/guide/api' },
        { text: 'Deploying', link: '/guide/deploying' },
      ],
    },
    {
      text: 'Theme',
      collapsible: true,
      items: [
        {
          text: 'Introduction',
          link: '/guide/theme-introduction',
        },
        { text: 'Layout', link: '/guide/theme-layout' },
        { text: 'Homepage', link: '/guide/theme-homepage' },
        { text: 'Footer', link: '/guide/theme-footer' },
        {
          text: 'Carbon Ads',
          link: '/guide/theme-carbon-ads',
        },
      ],
    },
    {
      text: 'Migrations',
      collapsible: true,
      items: [
        {
          text: 'Migration from VuePress',
          link: '/guide/migration-from-vuepress',
        },
        {
          text: 'Migration from VitePress 0.x',
          link: '/guide/migration-from-vitepress-0',
        },
      ],
    },
  ]
}

function sidebarConfig() {
  return [
    {
      text: 'Config',
      items: [
        {
          text: 'Introduction',
          link: '/config/introduction',
        },
        {
          text: 'App Configs',
          link: '/config/app-configs',
        },
        {
          text: 'Theme Configs',
          link: '/config/theme-configs',
        },
        {
          text: 'Frontmatter Configs',
          link: '/config/frontmatter-configs',
        },
      ],
    },
  ]
}
