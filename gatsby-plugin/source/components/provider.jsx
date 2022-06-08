import * as React from 'react'
import SmoothScrollbar from 'smooth-scrollbar'
import { gsap } from 'gsap'
import extend from 'just-extend'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export const SmoothScrollbarContext = React.createContext({ scrollbar: null })

export const WrapRootElement = ({ element, className, scrollbarOptions }) => {
  const smoothScrollbarEl = React.useRef()
  const [state, setState] = React.useState(null)

  React.useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    console.group('effectUSE')
    console.log(smoothScrollbarEl.current)

    // setState()
    const scrollbarVar = SmoothScrollbar.init(smoothScrollbarEl.current, extend(true, scrollbarOptions, {
      plugins: {
        scrollTrigger: {
          target: smoothScrollbarEl.current,
        },
      },
    }))

    // ScrollTrigger.update()

    console.log('SCROLL IN PROVIDER', ScrollTrigger.defaults())
    console.log(scrollbarVar)

    console.groupEnd()
  }, [])

  /*
  <SmoothScrollbarContext.Provider value={{ state, setState }}>
      <div className={className} ref={smoothScrollbarEl} data-gatsby-scrollbar>
        {element}
      </div>
    </SmoothScrollbarContext.Provider>
  */

  return (
    <div className={className} ref={smoothScrollbarEl} data-gatsby-scrollbar>
      {element}
    </div>
  )
}
