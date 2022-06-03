import Scrollbar from 'smooth-scrollbar';

let scrollbarIns;
const onClientEntry = (_, pluginOptions) => {
  if (pluginOptions.gsap && pluginOptions.gsap !== "undefined") {
    import('./plugins/scrolltrigger.mjs').then(({ scrollTrigger }) => {
      Scrollbar.use(scrollTrigger.default);
    }).catch((err) => {
      console.error(err, "GSAP ScrollTrigger err");
    });
  }
  const { scrollbarOptions } = pluginOptions;
  if (scrollbarOptions.plugins.overscroll ?? false) {
    import('./plugins/overscroll.mjs').then((over) => {
      Scrollbar.use(over.OverscrollPlugin);
    }).catch((err) => {
      console.error(err, "OverscrollPlugin err");
    });
  }
};
const onInitialClientRender = (_, { scrollbarOptions }) => {
  scrollbarIns = Scrollbar.init(document.getElementById("___gatsby"), scrollbarOptions);
};
const onRouteUpdate = ({ location, prevLocation }, scrollbarOptions) => {
};
const shouldUpdateScroll = ({
  routerProps: { location },
  getSavedScrollPosition
}, scrollbarOptions) => {
  scrollbarIns.update();
  return false;
};

export { onClientEntry, onInitialClientRender, onRouteUpdate, shouldUpdateScroll };
