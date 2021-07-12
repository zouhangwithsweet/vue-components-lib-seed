module.exports = {
  base: '/vuecomponent-seed/',
  title: 'vuecomponent-seed',
  description: 'vuecomponent-seed doc',
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/vuecomponent-seed/favicon.ico' }],
    ['link', { rel: 'dns-prefetch', href: 'https://fonts.gstatic.com' }],
    ['link', { rel: 'preconnect', crossorigin: 'anonymous', href: 'https://fonts.gstatic.com' }],
    ['link', { href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@200;400;500&family=Inter:wght@200;400;500;600', rel: 'stylesheet' }],
  ],

  markdown: {
    config: (md) => {
      md.use(require('./plugins/demo'))
    }
  }
}
