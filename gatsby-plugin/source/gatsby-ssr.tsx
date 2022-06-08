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
        gsap.default.registerPlugin(ScrollTrigger.default)
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
