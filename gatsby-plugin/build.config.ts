import type { BuildEntry } from 'unbuild'
import { defineBuildConfig } from 'unbuild'
import packageJSON from './package.json'
// import cpy from 'cpy';
// import del from 'del'

// const entries: BuildEntry[] = []
// const exportsList = packageJSON.exports
// const match = './lib/'

// Object.keys(exportsList).forEach((key) => {
//   if (key.slice(0, match.length) !== match)
//     return

//   const importValue = exportsList[key].import
//   if (importValue === `${key}.mjs`) {
//     const name = key.slice(match.length)
//     entries.push({
//       input: `source/${name}`,
//       name,
//     })
//   }
// })

// export default defineBuildConfig({
//   outDir: './',
//   entries,
//   clean: true,
//   declaration: true,
//   rollup: {
//     emitCJS: true,
//   },
// })

export default defineBuildConfig({
  entries: [
    {
      input: 'source/gatsby-browser',
      declaration: false,
      format: 'cjs',
    },
    {
      input: 'source/gatsby-node',
      declaration: false,
      format: 'cjs',
    },
    {
      input: 'source/gatsby-ssr',
      declaration: false,
      format: 'cjs',
    },
    {
      input: 'source/index',
      declaration: true,
    },
    {
      input: 'source/plugins/scrolltrigger',
      name: 'plugins/scrolltrigger',
      declaration: true,
    },
  ],
  outDir: './',
  clean: false,
  hooks: {
    // "build:done": async(ctx) => {
    //   await cpy([
    //     'source/gatsby-browser.js',
    //     'source/gatsby-node.js',
    //     'source/gatsby-ssr.js',
    //     'source/package.json',
    //   ], 'dist', {
    //     flat: true
    //   });
    // }

    // 'build:before': async () => {
    //   await del(['index.cjs', 'index.d.ts', 'index.mjs'])
    // },
  },
  externals: ['gsap', 'react', 'read-pkg'],
  rollup: {
    inlineDependencies: false,
    emitCJS: true,
  },
})
