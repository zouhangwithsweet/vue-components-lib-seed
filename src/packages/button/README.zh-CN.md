---
class: 'button-doc'
---
# Button 按钮

## 引入

```javascript
import { Button } from 'my-lib'

Vue.creatApp().use(Button.name, Button)
```

## 案例

<demo-wrapper
  src="src/packages/button/demo"
  :demos="demos"
/>

<script setup>
const demos = import.meta.globEager('../../../src/packages/button/demo/demo*.vue')
</script>

## props

## event
