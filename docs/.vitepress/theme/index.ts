import 'windi-base.css'
import 'windi-components.css'
import 'windi-utilities.css'
import './styles/vars.css'
import './styles/layout.css'
import './styles/code.css'
import './styles/custom-blocks.css'
import './styles/sidebar-links.css'
import './styles/prism.css'
import('../../../dist/es/my-lib.min.css')

import { Theme } from 'vitepress'
import Layout from './Layout.vue'
import NotFound from './NotFound.vue'
import DemoWrapper from './DemoWrapper.vue'

const theme: Theme = {
  Layout,
  NotFound,
  enhanceApp({ app }) {
    app.component('DemoWrapper', DemoWrapper)
  },
}

export default theme
