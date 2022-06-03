// @ts-nocheck
import Scrollbar from 'smooth-scrollbar'

let scrollbarIns: Scrollbar

export const onClientEntry = (_, pluginOptions) => {
  if (pluginOptions.gsap && pluginOptions.gsap !== 'undefined') {
    import('./plugins/scrolltrigger').then(({ scrollTrigger }) => {
      Scrollbar.use(scrollTrigger.default)
    }).catch((err) => {
      console.error(err, 'GSAP ScrollTrigger err')
    })
  }

  const { scrollbarOptions } = pluginOptions

  if (scrollbarOptions.plugins.overscroll ?? false) {
    import('./plugins/overscroll').then((over) => {
      Scrollbar.use(over.OverscrollPlugin)
    }).catch((err) => {
      console.error(err, 'OverscrollPlugin err')
    })
  }
}

export const onInitialClientRender = (_, { scrollbarOptions }) => {
  scrollbarIns = Scrollbar.init(document.getElementById('___gatsby'), scrollbarOptions)
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
  // Scrollbar.get(document.getElementById('___gatsby')).update()

  scrollbarIns.update()

  return false
}
