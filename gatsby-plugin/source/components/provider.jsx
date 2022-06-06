import * as React from "react"
import SmoothScrollbar from 'smooth-scrollbar'
import { gsap } from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)


export const SmoothScrollbarContext = React.createContext({ scrollbar: null });

export const WrapRootElement = ({ element, scrollbarOptions}) => {
  const smoothScrollbarEl = React.useRef();
  const [state, setState] = React.useState(null);


  React.useEffect(() => {
    setState(SmoothScrollbar.init(smoothScrollbarEl.current, { ...scrollbarOptions, delegateTo: document }))
    ScrollTrigger.defaults({
      scroller: smoothScrollbarEl.current,
      pinType: 'transform',
    })
    ScrollTrigger.update();

    console.log("SCROLL IN PROVIDER", ScrollTrigger.defaults())
  }, []);

  return (
    <SmoothScrollbarContext.Provider value={{ state, setState }}>
      <div className="gatsby-smooth-scrollbar" ref={smoothScrollbarEl}>
        {element}
      </div>
    </SmoothScrollbarContext.Provider>
  )
}
