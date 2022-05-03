/* istanbul ignore file */
import { DefineComponent, defineComponent } from 'vue'
// eslint-disable-next-line @typescript-eslint/ban-types
type component = DefineComponent<{}, {}, any>

export const createDemoModule = (
  name: string,
  demos: component[],
  comps?: component[]
) =>
  defineComponent({
    name: `${name}-demo`,
    setup() {
      return {
        demos,
      }
    },
  })
