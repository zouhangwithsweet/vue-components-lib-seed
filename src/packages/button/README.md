---
class: 'button-doc'
---
# Button

## use

```javascript
import { Button } from 'my-lib'

Vue.creatApp().use(Button.name, Button)
```

## demo

<demo-wrapper
  src="src/packages/button/demo"
  :demos="demos"
/>

<script setup>
const demos = import.meta.globEager('../../../src/packages/button/demo/demo*.vue')
</script>

## props

## event
