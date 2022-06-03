'use strict';

const Scrollbar = require('smooth-scrollbar');
const gsap = require('gsap');
const ScrollTrigger = require('gsap/ScrollTrigger');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e["default"] : e; }

const Scrollbar__default = /*#__PURE__*/_interopDefaultLegacy(Scrollbar);
const gsap__default = /*#__PURE__*/_interopDefaultLegacy(gsap);
const ScrollTrigger__default = /*#__PURE__*/_interopDefaultLegacy(ScrollTrigger);

/*!
 * SmoothScrollbar GSAP ScrollTrigger Plugin
 *
 * @version 1.0.1
 * @author Artem Dordzhiev (Draft)
 */
gsap__default.registerPlugin(ScrollTrigger__default);
class ScrollTriggerPlugin extends Scrollbar__default.ScrollbarPlugin {
  constructor(scrollbar, options) {
    super(scrollbar, options);
    this.setProxy();
  }
  setProxy() {
    const scrollbar = this.scrollbar;
    ScrollTrigger__default.scrollerProxy(document.body, {
      scrollTop(value) {
        if (arguments.length)
          scrollbar.scrollTop = value;
        return scrollbar.scrollTop;
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      },
      pinType: "transform"
    });
    scrollbar.addListener(ScrollTrigger__default.update);
  }
}
ScrollTriggerPlugin.pluginName = "ScrollTrigger";

module.exports = ScrollTriggerPlugin;
