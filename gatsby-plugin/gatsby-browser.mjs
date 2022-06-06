import SmoothScrollbar from 'smooth-scrollbar';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollTriggerPlugin from './plugins/scrolltrigger.mjs';

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
  scrollbarIns = SmoothScrollbar.init(scrollbarTarget, {
    delegateTo: document,
    plugins,
    ...scrollbarOptions
  });
  console.log(scrollbarIns);
  window.smoothScrollbar = scrollbarIns;
  ScrollTrigger.defaults({
    scroller: scrollbarTarget,
    pinType: "transform"
  });
};
const onInitialClientRender = (_, { scrollbarOptions }) => {
  if (document.querySelector(".gsap-marker-scroller-start")) {
    const markers = gsap.utils.toArray('[class *= "gsap-marker"]');
    console.log(markers);
    scrollbarIns.addListener(({ offset }) => {
      console.log(offset);
      gsap.set(markers, { marginTop: -offset.y });
    });
  }
};
const onRouteUpdate = ({ location, prevLocation }, scrollbarOptions) => {
};
const onRouteUpdateDelayed = ({ location, prevLocation }, scrollbarOptions) => {
};
const shouldUpdateScroll = ({
  routerProps: { location },
  getSavedScrollPosition
}, scrollbarOptions) => {
  scrollbarIns.update();
  return false;
};

export { onClientEntry, onInitialClientRender, onRouteUpdate, onRouteUpdateDelayed, shouldUpdateScroll, wrapRootElement };
