// @ts-nocheck
import path from 'node:path'
import { promises } from 'node:fs'

// export const onCreateWebpackConfig = ({
//   stage,
//   rules,
//   loaders,
//   plugins,
//   actions,
// }) => {
//   console.log('STAGE:', stage)
//   if (stage === 'build-html') {
//     actions.setWebpackConfig({
//       module: {
//         rules: [
//           {
//             test: /smooth-scrollbar/,
//             use: loaders.null(),
//           },
//         ],
//       },
//     })
//   }
// }

const htmlShadow = (className) => {
  const content = `import React from 'react'
  import PropTypes from 'prop-types'

  export default function HTML(props) {
    return (
      <html {...props.htmlAttributes}>
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          {props.headComponents}
        </head>
        <body {...props.bodyAttributes}>
          {props.preBodyComponents}
          <div className="${className}" data-gatsby-scrollbar>
            <div
              key={'body'}
              id="___gatsby"
              dangerouslySetInnerHTML={{ __html: props.body }}
            />
          </div>
          {props.postBodyComponents}
        </body>
      </html>
    )
  }

  HTML.propTypes = {
    htmlAttributes: PropTypes.object,
    headComponents: PropTypes.array,
    bodyAttributes: PropTypes.object,
    preBodyComponents: PropTypes.array,
    body: PropTypes.string,
    postBodyComponents: PropTypes.array,
  }
  `

  return content
}

export const pluginOptionsSchema = ({ Joi }) => {
  return Joi.object().keys({
    scrollbarClassName: Joi.string().default('gatsby-smooth-scrollbar'),
    gsap: Joi.boolean().description('Enable GSAP ScrollTrigger for smooth-scrollbar'),
    scrollbarOptions: Joi.object().keys({
      damping: Joi.number().integer().min(0).max(1).description('Momentum reduction damping factor, a float value between (0, 1). The lower the value is, the more smooth the scrolling will be (also the more paint frames).'),
      thumbMinSize: Joi.number().integer().description('Minimal size for scrollbar thumbs.'),
      renderByPixels: Joi.boolean().description('Render every frame in integer pixel values, set to true to improve scrolling performance.'),
      alwaysShowTracks: Joi.boolean().description('Keep scrollbar tracks visible.'),
      continuousScrolling: Joi.boolean().description('Set to true to allow outer scrollbars continue scrolling when current scrollbar reaches edge.'),
      delegateTo: Joi.any().description('Delegate wheel events and touch events to the given element. By default, the container element is used. This option will be useful for dealing with fixed elements.'),
      wheelEventTarget: Joi.any(),
      plugins: Joi.object().description('Options for plugins'),
    }),
  })
}

export const onPreInit = (_, pluginOptions) => {
  // fs.writeFile(path.join(process.cwd(), 'src'), htmlShadow('class-example'), (err) => {
  //   if (err)
  //     throw err

  //   console.log('HTML shadow created')
  // })

  // if (pluginOptions.html ?? false) {
  //   (async () => {
  //     try {
  //       await promises.writeFile(path.join(process.cwd(), 'src', 'html.js'), htmlShadow(pluginOptions.html.scrollbarClassName))
  //     }
  //     catch (error) {
  //       console.error(error)
  //     }
  //   })()
  // }

  import('read-pkg').then(async (pkg) => {
    const {
      dependencies,
    } = await pkg.readPackage()

    if (pluginOptions.gsap === true) {
      if (Object.prototype.hasOwnProperty.call(dependencies, 'gsap') === false) {
        console.error('Please install GSAP as dependencies then restart Gatsby server')
        return false
      }
    }
  })

  // actions.setPluginStatus({ lastFetched: Date.now() })
  // const plugins = pluginOptions.scrollbarPlugins
  // delete pluginOptions.plugins
  // pluginOptions.plugins = plugins
  // delete pluginOptions.scrollbarPlugins
}

