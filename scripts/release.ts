/* eslint-disable @typescript-eslint/ban-ts-comment */
/**
 * modified from https://github.com/vuejs/vue-next/blob/master/scripts/release.js
 */
import execa from 'execa'
import path from 'path'
import fs from 'fs'
const args = require('minimist')(process.argv.slice(2))
import semver from 'semver'
import chalk from 'chalk'
import { prompt } from 'enquirer'

const pkgDir = process.cwd()
const pkgPath = path.resolve(pkgDir, 'package.json')

/**
 * @type {{ name: string, version: string }}
 */
const pkg = require(pkgPath)

const pkgName = pkg.name
const currentVersion = pkg.version

/**
 * @type {boolean}
 */
const isDryRun = args.dry

/**
 * @type {string}
 */
const preid = args.preid

/**
 * @type {string}
 */
const message = args.m

/**
 * @type {boolean}
 */
const skipBuild = args.skipBuild

/**
 * @type {string}
 */
const skipChangelog = args.skipChangelog

/**
 * @type {import('semver').ReleaseType[]}
 */
const formalVersionList = ['patch', 'minor', 'major']

const prereleaseVersionList = [
  'prerelease',
  'prepatch',
  'preminor',
  'premajor',
]

/**
 * @param {import('semver').ReleaseType} i
 */
const inc = (i) => semver.inc(currentVersion, i, preid)

/**
 * @param {string} bin
 * @param {string[]} args
 * @param {object} opts
 */
const run = (bin, args, opts = {}) =>
  execa(bin, args, { stdio: 'inherit', ...opts })

/**
 * @param {string} bin
 * @param {string[]} args
 * @param {object} opts
 */
const dryRun = (bin, args, opts = {}) =>
  console.log(
    chalk.blue(`[dryrun] ${bin} ${args.join(' ')}`),
    opts
  )

const runIfNotDry = isDryRun ? dryRun : run

/**
 * @param {string} msg
 */
const step = (msg) => console.log(chalk.cyan(msg))

async function main() {
  let targetVersion = args._[0]

  if (!targetVersion) {
    const versionIncrements = preid
      ? prereleaseVersionList
      : formalVersionList
    // no explicit version, offer suggestions
    /**
     * @type {{ release: string }}
     */
    const { release } = await prompt({
      type: 'select',
      name: 'release',
      message: 'Select release type',
      // @ts-ignore
      choices: versionIncrements
        .map((i) => `${i} (${inc(i)})`)
        .concat(['custom']),
    })

    if (release === 'custom') {
      /**
       * @type {{ version: string }}
       */
      const res = await prompt({
        type: 'input',
        name: 'version',
        message: 'Input custom version',
        initial: currentVersion,
      })
      targetVersion = res.version
    } else {
      targetVersion = release.match(/\((.*)\)/)[1]
    }
  }

  if (!semver.valid(targetVersion)) {
    throw new Error(
      `invalid target version: ${targetVersion}`
    )
  }

  const tag = `${targetVersion}`

  /**
   * @type {{ yes: boolean }}
   */
  const { yes } = await prompt({
    type: 'confirm',
    name: 'yes',
    message: `Releasing ${pkgName}: ${currentVersion} => ${targetVersion}. Confirm?`,
  })

  if (!yes) {
    return
  }

  step('\nUpdating package version...')
  updateVersion(targetVersion)

  step('\nBuilding package...')
  if (!skipBuild && !isDryRun) {
    await run('yarn', ['build'])
  } else {
    console.log(`(skipped)`)
  }

  step('\nGenerating changelog...')
  if (!skipChangelog) {
    await run('yarn', ['changelog'])
  } else {
    console.log(`(skipped)`)
  }

  const { stdout } = await run('git', ['diff'], {
    stdio: 'pipe',
  })
  if (stdout) {
    step('\nCommitting changes...')
    await runIfNotDry('git', ['add', '-A'])
    const commitMessage = message
      ? message
      : `chore(release): publish v${tag}`
    await runIfNotDry('git', [
      'commit',
      '-m',
      commitMessage,
    ])
  } else {
    console.log('No changes to commit.')
  }

  step('\nPublishing package...')
  await publishPackage(targetVersion, runIfNotDry)

  step('\nPushing to GitLab...')
  await runIfNotDry('git', ['tag', `v${targetVersion}`])
  await runIfNotDry('git', [
    'push',
    'origin',
    `refs/tags/v${targetVersion}`,
  ])
  await runIfNotDry('git', ['push'])

  if (isDryRun) {
    console.log(
      `\nDry run finished - run git diff to see package changes.`
    )
  }

  console.log()
}

/**
 * @param {string} version
 */
function updateVersion(version) {
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
  pkg.version = version
  fs.writeFileSync(
    pkgPath,
    JSON.stringify(pkg, null, 2) + '\n'
  )
}

/**
 * @param {string} version
 * @param {Function} runIfNotDry
 */
async function publishPackage(version, runIfNotDry) {
  const publicArgs = ['publish', '--access', 'public']
  if (preid) {
    publicArgs.push(`--tag`, preid)
  }
  try {
    await runIfNotDry('npm', publicArgs, {
      stdio: 'pipe',
    })
    console.log(
      chalk.green(
        `Successfully published ${pkgName}@${version}`
      )
    )
  } catch (e) {
    if (e.stderr.match(/previously published/)) {
      console.log(
        chalk.red(`Skipping already published: ${pkgName}`)
      )
    } else {
      throw e
    }
  }
}

main().catch((err) => {
  console.error(err)
})
