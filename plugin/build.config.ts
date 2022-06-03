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
//       input: `src/${name}`,
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
    'src/gatsby-browser',
    'src/gatsby-node',
    'src/gatsby-ssr',
    {
      input: 'src/index',
    },
    {
      input: 'src/plugins/overscroll',
      name: 'plugins/overscroll',
    },
  ],
  outDir: './',
  declaration: true,
  clean: false,
  hooks: {
    // "build:done": async(ctx) => {
    //   await cpy([
    //     'src/gatsby-browser.js',
    //     'src/gatsby-node.js',
    //     'src/gatsby-ssr.js',
    //     'src/package.json',
    //   ], 'dist', {
    //     flat: true
    //   });
    // }

    // 'build:before': async () => {
    //   await del(['index.cjs', 'index.d.ts', 'index.mjs'])
    // },
  },
  rollup: {
    emitCJS: true,
  },
})
