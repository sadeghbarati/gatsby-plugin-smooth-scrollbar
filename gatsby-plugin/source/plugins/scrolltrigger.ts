/*!
 * SmoothScrollbar GSAP ScrollTrigger Plugin
 *
 * @version 1.0.1
 * @author Artem Dordzhiev (Draft)
 */

import type Scrollbar from 'smooth-scrollbar'
import { ScrollbarPlugin } from 'smooth-scrollbar'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

class ScrollTriggerPlugin extends ScrollbarPlugin {
  static pluginName = 'scrollTrigger'

  constructor(scrollbar: Scrollbar, options: any) {
    super(scrollbar, options)
    this.setProxy()
  }

  setProxy() {
    const scrollbar = this.scrollbar

    ScrollTrigger.scrollerProxy(this.options.target, {
      scrollTop(value) {
        if (arguments.length)
          scrollbar.scrollTop = value!

        return scrollbar.scrollTop
      },
    })

    scrollbar.addListener(ScrollTrigger.update)

    console.log(this.options.target)

    console.log('SCrollBAR SCROLLTRIGGER')
  }
}

export default ScrollTriggerPlugin
