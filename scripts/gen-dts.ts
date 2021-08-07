import path from 'path'
import fs from 'fs'
import { cwd } from 'process'
import { Project, SourceFile } from 'ts-morph'
import vueCompiler from '@vue/compiler-sfc'
import klawSync from 'klaw-sync'
import ora from 'ora'
import { parseComponentExports } from './gen-entry'

const TSCONFIG_PATH = path.resolve(cwd(), 'tsconfig.json')
const DEMO_RE = /\/demo\/\w+\.vue$/
const TEST_RE = /__test__/

/**
 * fork from https://github.com/egoist/vue-dts-gen/blob/main/src/index.ts
 */
const genVueTypes = async () => {
  const project = new Project({
    compilerOptions: {
      allowJs: true,
      declaration: true,
      emitDeclarationOnly: true,
      noEmitOnError: true,
      outDir: path.resolve(cwd(), 'dist'),
    },
    tsConfigFilePath: TSCONFIG_PATH,
    skipAddingFilesFromTsConfig: true,
  })

  const sourceFiles: SourceFile[] = []

  const entry = await parseComponentExports()
  const entrySourceFile = project.createSourceFile(
    path.resolve(cwd(), 'src/packages/my-lib.ts'),
    entry,
    { overwrite: true }
  )

  sourceFiles.push(entrySourceFile)

  const filePaths = klawSync(
    path.resolve(cwd(), 'src/packages'),
    {
      nodir: true,
    }
  )
    .map((item) => item.path)
    .filter((path) => !DEMO_RE.test(path))
    .filter((path) => !TEST_RE.test(path))

  await Promise.all(
    filePaths.map(async (file) => {
      if (file.endsWith('.vue')) {
        const content = await fs.promises.readFile(
          file,
          'utf-8'
        )
        const sfc = vueCompiler.parse(
          content as unknown as string
        )
        const { script, scriptSetup } = sfc.descriptor
        if (script || scriptSetup) {
          let content = ''
          let isTS = false
          if (script && script.content) {
            content += script.content
            if (script.lang === 'ts') isTS = true
          }
          if (scriptSetup) {
            const compiled = vueCompiler.compileScript(
              sfc.descriptor,
              {
                id: 'xxx',
              }
            )
            content += compiled.content
            if (scriptSetup.lang === 'ts') isTS = true
          }
          const sourceFile = project.createSourceFile(
            path.relative(process.cwd(), file) +
              (isTS ? '.ts' : '.js'),
            content
          )
          sourceFiles.push(sourceFile)
        }
      } else if (file.endsWith('.ts')) {
        const sourceFile = project.addSourceFileAtPath(file)
        sourceFiles.push(sourceFile)
      }
    })
  )

  const diagnostics = project.getPreEmitDiagnostics()

  console.log(
    project.formatDiagnosticsWithColorAndContext(
      diagnostics
    )
  )

  project.emitToMemory()

  for (const sourceFile of sourceFiles) {
    const emitOutput = sourceFile.getEmitOutput()
    for (const outputFile of emitOutput.getOutputFiles()) {
      const filepath = outputFile.getFilePath()

      await fs.promises.mkdir(path.dirname(filepath), {
        recursive: true,
      })

      await fs.promises.writeFile(
        filepath,
        outputFile.getText(),
        'utf8'
      )
    }
  }
}

const spinner = ora('Generate types...\n').start()

genVueTypes()
  .then(() => spinner.succeed('Success !\n'))
  .catch((e) => spinner.fail(`${e} !\n`))
