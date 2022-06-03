const Scrollbar = require('./index.cjs')

exports.onClientEntry = (_, scrollbarOptions) => {

}

exports.onInitialClientRender = () => {
  Scrollbar.init(document.getElementById('___gatsby'))
}

exports.onRouteUpdate = ({ location, prevLocation }, scrollbarOptions) => {

}

// exports.onRouteUpdateDelayed = ({ location, prevLocation }, scrollbarOptions) => {
//   /**
//    * @todo hash scroll
//    */
// }

exports.shouldUpdateScroll = ({
  routerProps: { location },
  getSavedScrollPosition,
}, scrollbarOptions) => {
  // const currentPosition = getSavedScrollPosition(location)
  Scrollbar.get(document.getElementById('___gatsby')).update()
  return false
}
