import { getWindow, getDocument, extend, ssrDocument } from 'ssr-window';
import extend$1 from 'just-extend';
import SmoothScrollbar from 'smooth-scrollbar';
import OverscrollPlugin from 'smooth-scrollbar/plugins/overscroll';
import ScrollTriggerPlugin from './plugins/scrolltrigger.mjs';
import 'gsap';
import 'gsap/ScrollTrigger';

const window = getWindow();
const document = getDocument();
let scrollbarIns;
let scrollbarTarget;
const onClientEntry = (_, pluginOptions) => {
  extend(ssrDocument, {
    body: {}
  });
  const { scrollbarOptions } = pluginOptions;
  scrollbarTarget = pluginOptions.html ?? false ? document.querySelector("[data-gatsby-scrollbar]") : document.body;
  console.log(scrollbarTarget);
  if (pluginOptions.gsap ?? false) {
    console.log("gsap");
    SmoothScrollbar.use(ScrollTriggerPlugin);
    SmoothScrollbar.use(OverscrollPlugin);
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
    extend$1(true, scrollbarOptions, {
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
      SmoothScrollbar.use(overscroll.default);
    });
    console.log("overscroll");
  }
  console.log(scrollbarOptions);
  scrollbarIns = SmoothScrollbar.init(scrollbarTarget, {
    delegateTo: document,
    ...scrollbarOptions
  });
  window.smoothScrollbar = scrollbarIns;
  console.log(scrollbarIns);
};
const onInitialClientRender = (_, { scrollbarOptions }) => {
};
const shouldUpdateScroll = ({
  routerProps: { location },
  getSavedScrollPosition
}, scrollbarOptions) => {
  scrollbarIns.update();
  console.log("shouldUpdateScroll");
  return false;
};

export { onClientEntry, onInitialClientRender, shouldUpdateScroll };
