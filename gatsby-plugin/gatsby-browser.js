'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const ssrWindow = require('ssr-window');
const extend = require('just-extend');
const SmoothScrollbar = require('smooth-scrollbar');
const OverscrollPlugin = require('smooth-scrollbar/plugins/overscroll');
const plugins_scrolltrigger = require('./plugins/scrolltrigger.cjs');
require('gsap');
require('gsap/ScrollTrigger');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e["default"] : e; }

const extend__default = /*#__PURE__*/_interopDefaultLegacy(extend);
const SmoothScrollbar__default = /*#__PURE__*/_interopDefaultLegacy(SmoothScrollbar);
const OverscrollPlugin__default = /*#__PURE__*/_interopDefaultLegacy(OverscrollPlugin);

const window = ssrWindow.getWindow();
const document = ssrWindow.getDocument();
let scrollbarIns;
let scrollbarTarget;
const onClientEntry = (_, pluginOptions) => {
  ssrWindow.extend(ssrWindow.ssrDocument, {
    body: {}
  });
  const { scrollbarOptions } = pluginOptions;
  scrollbarTarget = pluginOptions.html ?? false ? document.querySelector("[data-gatsby-scrollbar]") : document.body;
  console.log(scrollbarTarget);
  if (pluginOptions.gsap ?? false) {
    console.log("gsap");
    SmoothScrollbar__default.use(plugins_scrolltrigger);
    SmoothScrollbar__default.use(OverscrollPlugin__default);
    Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger')
    ]).then(([gsap, ScrollTrigger]) => {
      gsap.default.registerPlugin(ScrollTrigger.default);
      ScrollTrigger.default.defaults({
        scroller: scrollbarTarget,
        pinType: "transform"
      });
      console.log(ScrollTrigger.default.defaults());
    });
    extend__default(true, scrollbarOptions, {
      plugins: {
        scrollTrigger: {
          target: scrollbarTarget
        }
      }
    });
  }
  if (scrollbarOptions.plugins.overscroll ?? false) {
    import('smooth-scrollbar/plugins/overscroll').then((overscroll) => {
      console.log(overscroll.default);
      SmoothScrollbar__default.use(overscroll.default);
    });
    console.log("overscroll");
  }
  console.log(scrollbarOptions);
  scrollbarIns = SmoothScrollbar__default.init(scrollbarTarget, {
    delegateTo: document,
    ...scrollbarOptions
  });
  window.smoothScrollbar = scrollbarIns;
  console.log(scrollbarIns);
};
const onInitialClientRender = (_, { scrollbarOptions }) => {
  if (document) {
    import('gsap').then(({ default: gsap }) => {
      if (document.querySelector(".gsap-marker-scroller-start")) {
        const markers = gsap.utils.toArray('[class *= "gsap-marker"]');
        if (window) {
          window.smoothScrollbar.addListener(({ offset }) => {
            gsap.set(markers, { marginTop: -offset.y });
          });
        }
      }
    });
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
