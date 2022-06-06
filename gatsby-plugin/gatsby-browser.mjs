import { getWindow, getDocument, extend, ssrWindow } from 'ssr-window';
import SmoothScrollbar from 'smooth-scrollbar';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollTriggerPlugin from './plugins/scrolltrigger.mjs';

const window = getWindow();
const document = getDocument();
if (typeof window !== "undefined")
  gsap.registerPlugin(ScrollTrigger);
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
    SmoothScrollbar.use(ScrollTriggerPlugin);
  }
};
const onClientEntry = (_, pluginOptions) => {
  const { scrollbarOptions } = pluginOptions;
  SmoothScrollbar.detachStyle();
  scrollbarIns = SmoothScrollbar.init(scrollbarTarget, {
    delegateTo: document,
    plugins,
    ...scrollbarOptions
  });
  console.log(scrollbarIns);
  extend(ssrWindow, {
    smoothScrollbar: scrollbarIns
  });
  window.smoothScrollbar = scrollbarIns;
  ScrollTrigger.defaults({
    scroller: scrollbarTarget,
    pinType: "transform"
  });
};
const onInitialClientRender = (_, { scrollbarOptions }) => {
  if (document) {
    if (document.querySelector(".gsap-marker-scroller-start")) {
      const markers = gsap.utils.toArray('[class *= "gsap-marker"]');
      if (window) {
        window.smoothScrollbar.addListener(({ offset }) => {
          gsap.set(markers, { marginTop: -offset.y });
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

export { onClientEntry, onInitialClientRender, shouldUpdateScroll, wrapRootElement };
