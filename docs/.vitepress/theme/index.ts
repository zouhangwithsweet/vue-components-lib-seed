import 'virtual:windi.css'
import './styles/vars.css'
import './styles/layout.css'
import './styles/code.css'
import './styles/custom-blocks.css'
import './styles/sidebar-links.css'
import './styles/prism.css'
import('../../../dist/es/my-lib.min.css')

import { Theme } from 'vitepress'
import Layout from 'fisand-doc/dist/client/theme-default/Layout.vue'

const theme: Theme = {
  Layout,
  enhanceApp({ app }) {},
}

export default theme
