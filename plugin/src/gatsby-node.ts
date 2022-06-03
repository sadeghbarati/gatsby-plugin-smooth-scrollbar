// @ts-nocheck
export const pluginOptionsSchema = ({ Joi }) => {
  return Joi.object().keys({
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
  console.log(pluginOptions)
  // actions.setPluginStatus({ lastFetched: Date.now() })
  // const plugins = pluginOptions.scrollbarPlugins
  // delete pluginOptions.plugins
  // pluginOptions.plugins = plugins
  // delete pluginOptions.scrollbarPlugins
}
