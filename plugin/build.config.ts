import { defineBuildConfig } from 'unbuild'
// import cpy from 'cpy';
// import del from 'del'

export default defineBuildConfig({
  entries: [
    'src/index',
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
