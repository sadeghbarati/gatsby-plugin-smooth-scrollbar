// @ts-nocheck
import React from 'react'
import { getDocument, getWindow, ssrDocument, extend as ssrExtend } from 'ssr-window'
import SmoothScrollbar from 'smooth-scrollbar'

import { WrapRootElement } from './components/provider.jsx'

const window = getWindow()
const document = getDocument()

export const wrapRootElement = ({ element }, pluginOptions) => {
  ssrExtend(ssrDocument, {
    body: {},
    querySelector() {

    },
  })

  console.log('wrapRootElement')
  console.log(document.querySelector('#___gatsby').children)
  console.log(document.querySelector('#___gatsby').children[0])
  console.log(document.querySelector('#___gatsby').childNodes)
  console.log(document.querySelector('#___gatsby').childNodes[0])
  console.log(document.querySelector('#___gatsby').firstChild)
  console.log(document.querySelector('#___gatsby').firstElementChild)
  console.log(document.querySelector('#___gatsby').nextSibling)
  console.log(document.querySelector('#___gatsby').nextElementSibling)
  console.log(document.querySelector('#___gatsby'))

  const {
    scrollbarOptions, scrollbarClassName,
  } = pluginOptions

  if (pluginOptions.gsap ?? false) {
    if (typeof window !== 'undefined') {
      Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
        import('./plugins/scrolltrigger'),
      ]).then(([gsap, ScrollTrigger, ScrollTriggerPlugin]) => {
        SmoothScrollbar.use(ScrollTriggerPlugin.default)
      })
    }
  }

  if (scrollbarOptions.plugins.overscroll ?? false) {
    if (typeof window !== 'undefined') {
      import('smooth-scrollbar/plugins/overscroll').then((overscroll) => {
        SmoothScrollbar.use(overscroll.default)
      })
    }
  }

  return (
    <WrapRootElement element={element} className={scrollbarClassName} scrollbarOptions={scrollbarOptions}/>
  )
}

export const onClientEntry = (_, pluginOptions) => {
  console.log('onClientEntry')
  console.log(document.querySelector('#___gatsby').children)
  console.log(document.querySelector('#___gatsby').children[0])
  console.log(document.querySelector('#___gatsby').childNodes)
  console.log(document.querySelector('#___gatsby').childNodes[0])
  console.log(document.querySelector('#___gatsby').firstChild)
  console.log(document.querySelector('#___gatsby').firstElementChild)
  console.log(document.querySelector('#___gatsby').nextSibling)
  console.log(document.querySelector('#___gatsby').nextElementSibling)
  console.log(document.querySelector('#___gatsby'))

  const scrollTarget = document.querySelector('#___gatsby')
  console.log('SCROLLLLL TARGETTTTT', scrollTarget)

  if (pluginOptions.gsap ?? false) {
    import('gsap/ScrollTrigger').then((ScrollTrigger) => {
      gsap.default.registerPlugin(ScrollTrigger.default)
      ScrollTrigger.default.defaults({
        scroller: scrollTarget,
        pinType: 'transform',
      })
    })
  }

  // const scrollbarTarget = document.querySelector('[data-gatsby-scrollbar]') //null

  // console.log(scrollbarTarget)
  // const { scrollbarOptions } = pluginOptions

  // scrollbarIns = SmoothScrollbar.init(scrollbarTarget, {
  //   delegateTo: document,
  //   plugins,
  //   ...scrollbarOptions,
  // })

  // console.log(scrollbarIns)

  // extend(ssrWindow, {
  //   smoothScrollbar: scrollbarIns,
  // })

  // window.smoothScrollbar = scrollbarIns
}

export const onInitialClientRender = (_, { scrollbarOptions }) => {
  // if (document) {
  //   if (document.querySelector('.gsap-marker-scroller-start')) {
  //     const markers = gsap.utils.toArray('[class *= "gsap-marker"]')

  //     if (window) {
  //       window.smoothScrollbar.addListener(({ offset }) => {
  //         gsap.set(markers, { marginTop: -offset.y })
  //       })
  //     }
  //   }
  // }
}

// export const onRouteUpdate = ({ location, prevLocation }, scrollbarOptions) => {
//   console.log('onRouteUpdate')
// }

export const shouldUpdateScroll = ({
  routerProps: { location },
  getSavedScrollPosition,
}, scrollbarOptions) => {
  // const currentPosition = getSavedScrollPosition(location)
  // Scrollbar.get(document.getElementById('___gatsby')).update()

  // scrollbarIns.update()

  // console.log('shouldUpdateScroll')

  return false
}
