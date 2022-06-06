'use strict';

const SmoothScrollbar = require('smooth-scrollbar');
const gsap = require('gsap');
const ScrollTrigger = require('gsap/ScrollTrigger');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e["default"] : e; }

const gsap__default = /*#__PURE__*/_interopDefaultLegacy(gsap);
const ScrollTrigger__default = /*#__PURE__*/_interopDefaultLegacy(ScrollTrigger);

/*!
 * SmoothScrollbar GSAP ScrollTrigger Plugin
 *
 * @version 1.0.1
 * @author Artem Dordzhiev (Draft)
 */
gsap__default.registerPlugin(ScrollTrigger__default);
class ScrollTriggerPlugin extends SmoothScrollbar.ScrollbarPlugin {
  constructor(scrollbar, options) {
    super(scrollbar, options);
    this.setProxy();
  }
  setProxy() {
    const scrollbar = this.scrollbar;
    ScrollTrigger__default.scrollerProxy(this.options.target, {
      scrollTop(value) {
        if (arguments.length)
          scrollbar.scrollTop = value;
        return scrollbar.scrollTop;
      }
    });
    scrollbar.addListener(ScrollTrigger__default.update);
    console.log("SCrollBAR SCROLLTRIGGER");
  }
}
ScrollTriggerPlugin.pluginName = "scrollTrigger";

module.exports = ScrollTriggerPlugin;
