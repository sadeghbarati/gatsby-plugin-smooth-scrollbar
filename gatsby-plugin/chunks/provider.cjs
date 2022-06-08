'use strict';

const React = require('react');
const SmoothScrollbar = require('smooth-scrollbar');
const gsap = require('gsap');
const extend = require('just-extend');
const ScrollTrigger = require('gsap/ScrollTrigger');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e["default"] : e; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  const n = Object.create(null);
  if (e) {
    for (const k in e) {
      n[k] = e[k];
    }
  }
  n["default"] = e;
  return n;
}

const React__namespace = /*#__PURE__*/_interopNamespace(React);
const SmoothScrollbar__default = /*#__PURE__*/_interopDefaultLegacy(SmoothScrollbar);
const extend__default = /*#__PURE__*/_interopDefaultLegacy(extend);

gsap.gsap.registerPlugin(ScrollTrigger.ScrollTrigger);
React__namespace.createContext({ scrollbar: null });
const WrapRootElement = ({ element, className, scrollbarOptions }) => {
  const smoothScrollbarEl = React__namespace.useRef();
  React__namespace.useState(null);
  React__namespace.useEffect(() => {
    console.group("effectUSE");
    console.log(smoothScrollbarEl.current);
    const scrollbarVar = SmoothScrollbar__default.init(smoothScrollbarEl.current, extend__default(true, scrollbarOptions, {
      plugins: {
        scrollTrigger: {
          target: smoothScrollbarEl.current
        }
      }
    }));
    console.log("SCROLL IN PROVIDER", ScrollTrigger.ScrollTrigger.defaults());
    console.log(scrollbarVar);
    console.groupEnd();
  }, []);
  return /* @__PURE__ */ React__namespace.createElement("div", {
    className,
    ref: smoothScrollbarEl,
    "data-gatsby-scrollbar": true
  }, element);
};

exports.WrapRootElement = WrapRootElement;
