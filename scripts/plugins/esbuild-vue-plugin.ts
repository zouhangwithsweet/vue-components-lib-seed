/**
 * @deprecated
 * recommend unplugin-vue https://github.com/sxzz/unplugin-vue
 */
/**
 * fork from https://github.com/egoist/esbuild-plugin-vue
 */
import fs from 'fs'
import path from 'path'
import { Plugin } from 'esbuild'
import * as compiler from '@vue/compiler-sfc'
import hash from 'hash-sum'

const removeQuery = (p: string) => p.replace(/\?.+$/, '')

const genId = (filepath: string) =>
  hash(path.relative(process.cwd(), filepath))

export default (): Plugin => {
  return {
    name: 'vue',

    setup(build) {
      const absPath = path.resolve(
        process.cwd(),
        build.initialOptions.absWorkingDir || ''
      )

      const formatPath = (
        p: string,
        resolveDir: string
      ) => {
        if (p.startsWith('.')) {
          return path.resolve(resolveDir, p)
        }
        if (p.startsWith(absPath + '/')) {
          return p
        }
        return path.join(absPath, p)
      }

      build.onResolve({ filter: /\.vue$/ }, (args) => {
        return {
          path: formatPath(args.path, args.resolveDir),
          namespace: 'vue',
        }
      })

      build.onResolve(
        { filter: /\?vue&type=template/ },
        (args) => {
          return { path: args.path, namespace: 'vue' }
        }
      )

      build.onResolve(
        { filter: /\?vue&type=script/ },
        (args) => {
          return { path: args.path, namespace: 'vue' }
        }
      )

      build.onResolve(
        { filter: /\?vue&type=style/ },
        (args) => {
          return { path: args.path, namespace: 'vue' }
        }
      )
      /**
       * replace my-lib
       */
      build.onResolve({ filter: /^my-lib\/.*/ }, (args) => {
        return {
          path: args.path.replace('my-lib/', '../'),
          external: true,
        }
      })

      build.onLoad(
        { filter: /\.vue$/, namespace: 'vue' },
        async (args) => {
          const content = await fs.promises.readFile(
            args.path,
            'utf8'
          )
          const sfc = compiler.parse(content.toString())
          const filepath = args.path.replace(/\\/g, '/')

          let contents = ``

          if (sfc.descriptor.script) {
            contents += `
          import $$Component from "${filepath}?vue&type=script"
          `
          } else {
            contents += `var $$Component = {}`
          }

          if (sfc.descriptor.styles.length > 0) {
            contents += `
          import "${filepath}?vue&type=style"
          `
          }

          if (sfc.descriptor.template) {
            contents += `
          import { render } from "${filepath}?vue&type=template"
          export * from "${filepath}?vue&type=template"
          $$Component.render = render
          `
          }

          contents += `export default $$Component`

          return {
            contents,
            resolveDir: path.dirname(args.path),
          }
        }
      )

      build.onLoad(
        { filter: /\?vue&type=template/, namespace: 'vue' },
        async (args) => {
          const filepath = removeQuery(args.path)
          const source = await fs.promises.readFile(
            filepath,
            'utf8'
          )
          const { descriptor } = compiler.parse(
            source.toString()
          )
          if (descriptor.template) {
            const hasScoped = descriptor.styles.some(
              (s) => s.scoped
            )
            const id = genId(filepath)
            const compiled = compiler.compileTemplate({
              source: descriptor.template.content,
              filename: filepath,
              id,
              scoped: hasScoped,
              compilerOptions: {
                scopeId: hasScoped
                  ? `data-v-${id}`
                  : undefined,
              },
            })
            return {
              resolveDir: path.dirname(filepath),
              contents: compiled.code,
            }
          }
        }
      )

      build.onLoad(
        { filter: /\?vue&type=script/, namespace: 'vue' },
        async (args) => {
          const filepath = removeQuery(args.path)
          const source = await fs.promises.readFile(
            filepath,
            'utf8'
          )

          const { descriptor } = compiler.parse(
            source.toString(),
            {
              filename: filepath,
            }
          )
          if (descriptor.script) {
            const compiled = compiler.compileScript(
              descriptor,
              {
                id: genId(filepath),
              }
            )
            return {
              resolveDir: path.dirname(filepath),
              contents: compiled.content,
              loader: compiled.lang === 'ts' ? 'ts' : 'js',
            }
          }
        }
      )

      build.onLoad(
        { filter: /\?vue&type=style/, namespace: 'vue' },
        async (args) => {
          const filepath = removeQuery(args.path)
          const source = await fs.promises.readFile(
            filepath,
            'utf8'
          )
          const { descriptor } = compiler.parse(
            source.toString()
          )
          if (descriptor.styles.length > 0) {
            const id = genId(filepath)
            let content = ''
            for (const style of descriptor.styles) {
              /**
               * todo update vue or stylus parse
               */
              const compiled =
                await compiler.compileStyleAsync({
                  source: style.content,
                  filename: filepath,
                  id,
                  scoped: style.scoped,
                  preprocessLang: style.lang as any,
                  modules: !!style.module,
                })

              if (compiled.errors.length > 0) {
                throw compiled.errors[0]
              }

              content += compiled.code
            }

            return {
              resolveDir: path.dirname(filepath),
              contents: content,
              loader: 'css',
            }
          }
        }
      )
    },
  }
}
