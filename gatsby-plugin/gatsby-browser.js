'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const ssrWindow = require('ssr-window');
const SmoothScrollbar = require('smooth-scrollbar');
const gsap = require('gsap');
const ScrollTrigger = require('gsap/ScrollTrigger');
const plugins_scrolltrigger = require('./plugins/scrolltrigger.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e["default"] : e; }

const SmoothScrollbar__default = /*#__PURE__*/_interopDefaultLegacy(SmoothScrollbar);

const window = ssrWindow.getWindow();
const document = ssrWindow.getDocument();
if (typeof window !== "undefined")
  gsap.gsap.registerPlugin(ScrollTrigger.ScrollTrigger);
let scrollbarIns;
let scrollbarTarget;
const plugins = {};
const wrapRootElement = ({ element }, pluginOptions) => {
  scrollbarTarget = pluginOptions.html ?? false ? document.querySelector("[data-gatsby-scrollbar]") : document.body;
  console.log(scrollbarTarget);
  if (pluginOptions.gsap ?? false) {
    plugins.scrollTrigger = {
      target: scrollbarTarget
    };
    SmoothScrollbar__default.use(plugins_scrolltrigger);
  }
};
const onClientEntry = (_, pluginOptions) => {
  const { scrollbarOptions } = pluginOptions;
  SmoothScrollbar__default.detachStyle();
  scrollbarIns = SmoothScrollbar__default.init(scrollbarTarget, {
    delegateTo: document,
    plugins,
    ...scrollbarOptions
  });
  console.log(scrollbarIns);
  ssrWindow.extend(ssrWindow.ssrWindow, {
    smoothScrollbar: scrollbarIns
  });
  window.smoothScrollbar = scrollbarIns;
  ScrollTrigger.ScrollTrigger.defaults({
    scroller: scrollbarTarget,
    pinType: "transform"
  });
};
const onInitialClientRender = (_, { scrollbarOptions }) => {
  if (document) {
    if (document.querySelector(".gsap-marker-scroller-start")) {
      const markers = gsap.gsap.utils.toArray('[class *= "gsap-marker"]');
      if (window) {
        window.smoothScrollbar.addListener(({ offset }) => {
          gsap.gsap.set(markers, { marginTop: -offset.y });
        });
      }
    }
  }
};
const shouldUpdateScroll = ({
  routerProps: { location },
  getSavedScrollPosition
}, scrollbarOptions) => {
  scrollbarIns.update();
  console.log("shouldUpdateScroll");
  return false;
};

exports.onClientEntry = onClientEntry;
exports.onInitialClientRender = onInitialClientRender;
exports.shouldUpdateScroll = shouldUpdateScroll;
exports.wrapRootElement = wrapRootElement;
