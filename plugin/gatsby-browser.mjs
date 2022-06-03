import Scrollbar from 'smooth-scrollbar';

const onClientEntry = (_, pluginOptions) => {
  console.log(pluginOptions);
  const { scrollbarOptions } = pluginOptions;
  if (scrollbarOptions.plugins.overscroll ?? false) {
    import('./plugins/overscroll.mjs').then((over) => {
      Scrollbar.use(over.OverscrollPlugin);
    }).catch((err) => {
      console.error(err);
    });
  }
};
const onInitialClientRender = (_, { scrollbarOptions }) => {
  Scrollbar.init(document.getElementById("___gatsby"), scrollbarOptions);
};
const onRouteUpdate = ({ location, prevLocation }, scrollbarOptions) => {
};
const shouldUpdateScroll = ({
  routerProps: { location },
  getSavedScrollPosition
}, scrollbarOptions) => {
  Scrollbar.get(document.getElementById("___gatsby")).update();
  return false;
};

export { onClientEntry, onInitialClientRender, onRouteUpdate, shouldUpdateScroll };
