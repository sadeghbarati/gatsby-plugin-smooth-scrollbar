// @ts-nocheck
import { getDocument, getWindow, ssrDocument, extend as ssrExtend } from 'ssr-window'
import React from 'react'
import extend from 'just-extend'
import SmoothScrollbar from 'smooth-scrollbar'
import OverscrollPlugin from 'smooth-scrollbar/plugins/overscroll'
import scrolltriggerPlugin from './plugins/scrolltrigger'

const window = getWindow()
const document = getDocument()

let scrollbarIns
let scrollbarTarget

// export const wrapRootElement = ({ element }, pluginOptions) => {

// }

export const onClientEntry = (_, pluginOptions) => {
  ssrExtend(ssrDocument, {
    body: {},
  })

  const { scrollbarOptions } = pluginOptions

  scrollbarTarget = pluginOptions.html ?? false ? document.querySelector('[data-gatsby-scrollbar]') : document.body
  console.log(scrollbarTarget)
  if (pluginOptions.gsap ?? false) {
    console.log('gsap')

    SmoothScrollbar.use(scrolltriggerPlugin)
    SmoothScrollbar.use(OverscrollPlugin)
    Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger'),
    ]).then(([gsap, ScrollTrigger]) => {
      gsap.default.registerPlugin(ScrollTrigger.default)
      ScrollTrigger.default.defaults({
        scroller: scrollbarTarget,
        pinType: 'transform',
      })

      console.log(ScrollTrigger.default.defaults())
    })

    extend(true, scrollbarOptions, {
      plugins: {
        scrollTrigger: {
          target: scrollbarTarget,
        },
      },
    })
  }

  if (scrollbarOptions.plugins.overscroll ?? false) {
    import('smooth-scrollbar/plugins/overscroll').then((overscroll) => {
      console.log(overscroll.default)
      SmoothScrollbar.use(overscroll.default)
    })

    console.log('overscroll')
  }

  console.log(scrollbarOptions)

  scrollbarIns = SmoothScrollbar.init(scrollbarTarget, {
    delegateTo: document,
    ...scrollbarOptions,
  })
  window.smoothScrollbar = scrollbarIns
  console.log(scrollbarIns)
}

export const onInitialClientRender = (_, { scrollbarOptions }) => {
  if (document) {
    import('gsap').then(({ default: gsap }) => {
      if (document.querySelector('.gsap-marker-scroller-start')) {
        const markers = gsap.utils.toArray('[class *= "gsap-marker"]')

        if (window) {
          window.smoothScrollbar.addListener(({ offset }) => {
            gsap.set(markers, { marginTop: -offset.y })
          })
        }
      }
    })
  }
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

  scrollbarIns.update()

  console.log('shouldUpdateScroll')

  return false
}
