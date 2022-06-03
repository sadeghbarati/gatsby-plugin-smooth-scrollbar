// @ts-nocheck
import Scrollbar from './index'

export const onClientEntry = (_, pluginOptions) => {
  console.log(pluginOptions)

  const { scrollbarOptions } = pluginOptions

  if (scrollbarOptions.plugins.overscroll ?? false) {
    import('./plugins/overscroll').then((over) => {
      Scrollbar.use(over.OverscrollPlugin)
    }).catch((err) => {
      console.error(err)
    })
  }
}

export const onInitialClientRender = (_, { scrollbarOptions }) => {
  Scrollbar.init(document.getElementById('___gatsby'), scrollbarOptions)
}

export const onRouteUpdate = ({ location, prevLocation }, scrollbarOptions) => {

}

// exports.onRouteUpdateDelayed = ({ location, prevLocation }, scrollbarOptions) => {
//   /**
//    * @todo hash scroll
//    */
// }

export const shouldUpdateScroll = ({
  routerProps: { location },
  getSavedScrollPosition,
}, scrollbarOptions) => {
  // const currentPosition = getSavedScrollPosition(location)
  Scrollbar.get(document.getElementById('___gatsby')).update()
  return false
}
