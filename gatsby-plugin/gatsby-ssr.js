'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const React = require('react');
const ssrWindow = require('ssr-window');
const SmoothScrollbar = require('smooth-scrollbar');
const provider = require('./chunks/provider.cjs');
require('gsap');
require('just-extend');
require('gsap/ScrollTrigger');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e["default"] : e; }

const React__default = /*#__PURE__*/_interopDefaultLegacy(React);
const SmoothScrollbar__default = /*#__PURE__*/_interopDefaultLegacy(SmoothScrollbar);

const window = ssrWindow.getWindow();
const document = ssrWindow.getDocument();
const wrapRootElement = ({ element }, pluginOptions) => {
  ssrWindow.extend(ssrWindow.ssrDocument, {
    body: {},
    querySelector() {
    }
  });
  console.log("onClientEntry");
  console.log(document.querySelector("#___gatsby").children);
  console.log(document.querySelector("#___gatsby").children[0]);
  console.log(document.querySelector("#___gatsby").childNodes);
  console.log(document.querySelector("#___gatsby").childNodes[0]);
  console.log(document.querySelector("#___gatsby").firstChild);
  console.log(document.querySelector("#___gatsby").firstElementChild);
  console.log(document.querySelector("#___gatsby").nextSibling);
  console.log(document.querySelector("#___gatsby").nextElementSibling);
  console.log(document.querySelector("#___gatsby"));
  const {
    scrollbarOptions,
    scrollbarClassName
  } = pluginOptions;
  if (pluginOptions.gsap ?? false) {
    if (typeof window !== "undefined") {
      Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
        import('./plugins/scrolltrigger.cjs')
      ]).then(([gsap, ScrollTrigger, ScrollTriggerPlugin]) => {
        gsap.default.registerPlugin(ScrollTrigger.default);
        SmoothScrollbar__default.use(ScrollTriggerPlugin.default);
      });
    }
  }
  if (scrollbarOptions.plugins.overscroll ?? false) {
    if (typeof window !== "undefined") {
      import('smooth-scrollbar/plugins/overscroll').then((overscroll) => {
        SmoothScrollbar__default.use(overscroll.default);
      });
    }
  }
  return /* @__PURE__ */ React__default.createElement(provider.WrapRootElement, {
    element,
    className: scrollbarClassName,
    scrollbarOptions
  });
};

exports.wrapRootElement = wrapRootElement;
