import * as React from "react"
import SmoothScrollbar from 'smooth-scrollbar'
import { gsap } from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)


export const Scroll = () => {

  React.useEffect(() => {
    let smoothScroll
    const scroller = document.querySelector('#___gatsby')

    smoothScroll = SmoothScrollbar.init(scroller, { delegateTo: document })
    ScrollTrigger.defaults({
      scroller,
      pinType: 'transform',
    })
    ScrollTrigger.update();

    console.log("SCROLL IN PROVIDER", ScrollTrigger.defaults())

    return () => {
      if (smoothScroll) smoothScroll.destroy()
    }
  }, []);

  return null
}
