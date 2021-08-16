const klawSync = require('klaw-sync')
const path = require('path')

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

const REPO_BASE_URL = '/vuecomponent-seed/'

module.exports = {
  base: process.env.VERCEL_BUILD ? '/' : REPO_BASE_URL,
  title: 'vuecomponent-seed',
  description: 'vuecomponent-seed doc',
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

  lang: 'zh-CN',
  themeConfig: {
    i18n: true,
    repo: 'https://github.com/zouhangwithsweet/vuecomponent-seed', // replace the repo link
    docsBranch: 'master',
    editLinks: true,
    editLinkText: '为此文档提供修改建议',
    logo: '/logo.png',
    nav: [{ text: '组件', link: '/zh-CN/components/' }],
    navEn: [
      { text: 'Components', link: '/en-US/components/' },
    ],
    sidebar: {
      '/zh-CN/components/': [
        {
          text: '更新日志',
          link: '/zh-CN/components/',
        },
        {
          text: '快速开始',
          link: '/zh-CN/components/quick-start',
        },
        {
          text: '组件',
          children: zhComponentDocs,
        },
      ],
      '/en-US/components/': [
        {
          text: 'Changelog',
          link: '/en-US/components/',
        },
        {
          text: 'QuickStart',
          link: '/en-US/components/quick-start',
        },
        {
          text: 'COMPONENTS',
          children: enComponentDocs,
        },
      ],
    },
  },
}
