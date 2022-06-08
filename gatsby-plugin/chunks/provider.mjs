import * as React from 'react';
import SmoothScrollbar from 'smooth-scrollbar';
import { gsap } from 'gsap';
import extend from 'just-extend';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
React.createContext({ scrollbar: null });
const WrapRootElement = ({ element, className, scrollbarOptions }) => {
  const smoothScrollbarEl = React.useRef();
  React.useState(null);
  React.useEffect(() => {
    console.group("effectUSE");
    console.log(smoothScrollbarEl.current);
    const scrollbarVar = SmoothScrollbar.init(smoothScrollbarEl.current, extend(true, scrollbarOptions, {
      plugins: {
        scrollTrigger: {
          target: smoothScrollbarEl.current
        }
      }
    }));
    console.log("SCROLL IN PROVIDER", ScrollTrigger.defaults());
    console.log(scrollbarVar);
    console.groupEnd();
  }, []);
  return /* @__PURE__ */ React.createElement("div", {
    className,
    ref: smoothScrollbarEl,
    "data-gatsby-scrollbar": true
  }, element);
};

export { WrapRootElement as W };
