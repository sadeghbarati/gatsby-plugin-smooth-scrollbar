// @ts-nocheck
import { extend, getDocument, getWindow, ssrDocument, ssrWindow } from 'ssr-window'
import React from 'react'
import SmoothScrollbar from 'smooth-scrollbar'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ScrollTriggerPlugin from './plugins/scrolltrigger'

const window = getWindow()
const document = getDocument()

if (typeof window !== 'undefined')
  gsap.registerPlugin(ScrollTrigger)

let scrollbarIns
let scrollbarTarget
const plugins = {}

export const onClientEntry = (_, pluginOptions) => {
  extend(ssrDocument, {
    body: {

    },
  })

  const { scrollbarOptions } = pluginOptions

  scrollbarTarget = pluginOptions.html ?? false ? document.querySelector('[data-gatsby-scrollbar]') : document.body

  if (pluginOptions.gsap ?? false) {
    plugins.scrollTrigger = {
      target: scrollbarTarget,
    }

    SmoothScrollbar.use(ScrollTriggerPlugin)
  }

  scrollbarIns = SmoothScrollbar.init(scrollbarTarget, {
    delegateTo: document,
    plugins,
    ...scrollbarOptions,
  })

  console.log(scrollbarIns)

  extend(ssrWindow, {
    smoothScrollbar: scrollbarIns,
  })

  window.smoothScrollbar = scrollbarIns

  ScrollTrigger.defaults({
    scroller: scrollbarTarget,
    pinType: 'transform',
  })
}

export const onInitialClientRender = (_, { scrollbarOptions }) => {
  if (document) {
    if (document.querySelector('.gsap-marker-scroller-start')) {
      const markers = gsap.utils.toArray('[class *= "gsap-marker"]')

      if (window) {
        window.smoothScrollbar.addListener(({ offset }) => {
          gsap.set(markers, { marginTop: -offset.y })
        })
      }
    }
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
