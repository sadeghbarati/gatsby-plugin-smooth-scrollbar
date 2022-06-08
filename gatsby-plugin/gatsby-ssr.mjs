import React__default from 'react';
import { getWindow, getDocument, extend, ssrDocument } from 'ssr-window';
import SmoothScrollbar from 'smooth-scrollbar';
import { W as WrapRootElement } from './chunks/provider.mjs';
import 'gsap';
import 'just-extend';
import 'gsap/ScrollTrigger';

const window = getWindow();
const document = getDocument();
const wrapRootElement = ({ element }, pluginOptions) => {
  extend(ssrDocument, {
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
        import('./plugins/scrolltrigger.mjs')
      ]).then(([gsap, ScrollTrigger, ScrollTriggerPlugin]) => {
        gsap.default.registerPlugin(ScrollTrigger.default);
        SmoothScrollbar.use(ScrollTriggerPlugin.default);
      });
    }
  }
  if (scrollbarOptions.plugins.overscroll ?? false) {
    if (typeof window !== "undefined") {
      import('smooth-scrollbar/plugins/overscroll').then((overscroll) => {
        SmoothScrollbar.use(overscroll.default);
      });
    }
  }
  return /* @__PURE__ */ React__default.createElement(WrapRootElement, {
    element,
    className: scrollbarClassName,
    scrollbarOptions
  });
};

export { wrapRootElement };
