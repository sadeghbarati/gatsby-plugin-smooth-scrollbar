'use strict';

const SmoothScrollbar = require('smooth-scrollbar');
const gsap = require('gsap');
const ScrollTrigger = require('gsap/ScrollTrigger');

/*!
 * SmoothScrollbar GSAP ScrollTrigger Plugin
 *
 * @version 1.0.1
 * @author Artem Dordzhiev (Draft)
 */
gsap.gsap.registerPlugin(ScrollTrigger.ScrollTrigger);
class ScrollTriggerPlugin extends SmoothScrollbar.ScrollbarPlugin {
  constructor(scrollbar, options) {
    super(scrollbar, options);
    this.setProxy();
  }
  setProxy() {
    const scrollbar = this.scrollbar;
    ScrollTrigger.ScrollTrigger.scrollerProxy(this.options.target, {
      scrollTop(value) {
        if (arguments.length)
          scrollbar.scrollTop = value;
        return scrollbar.scrollTop;
      }
    });
    scrollbar.addListener(ScrollTrigger.ScrollTrigger.update);
    console.log("SCrollBAR SCROLLTRIGGER");
  }
}
ScrollTriggerPlugin.pluginName = "scrollTrigger";

module.exports = ScrollTriggerPlugin;
