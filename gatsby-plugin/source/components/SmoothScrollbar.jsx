import * as React from "react"
import SmoothScrollbar from 'smooth-scrollbar'
import { gsap } from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)



export const SmoothScrollbar = ({ element, pluginOptions}) => {

  const { scrollbarClassName, scrollbarOptions } = pluginOptions

  const smoothScrollbarEl = React.useRef();


  React.useEffect(() => {
    SmoothScrollbar.init(smoothScrollbarEl.current, { ...scrollbarOptions, delegateTo: document })

    ScrollTrigger.defaults({
      scroller: smoothScrollbarEl.current,
      pinType: 'transform',
    })

    ScrollTrigger.update();

    console.log("SCROLL IN PROVIDER", ScrollTrigger.defaults())
  }, []);

  return (
    <>
      <div className={scrollbarClassName} ref={smoothScrollbarEl}>
        {element}
      </div>
    </>
  )
}
