'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const Scrollbar = require('smooth-scrollbar');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e["default"] : e; }

const Scrollbar__default = /*#__PURE__*/_interopDefaultLegacy(Scrollbar);

const onClientEntry = (_, pluginOptions) => {
  console.log(pluginOptions);
  const { scrollbarOptions } = pluginOptions;
  if (scrollbarOptions.plugins.overscroll ?? false) {
    import('./plugins/overscroll.cjs').then((over) => {
      Scrollbar__default.use(over.OverscrollPlugin);
    }).catch((err) => {
      console.error(err);
    });
  }
};
const onInitialClientRender = (_, { scrollbarOptions }) => {
  Scrollbar__default.init(document.getElementById("___gatsby"), scrollbarOptions);
};
const onRouteUpdate = ({ location, prevLocation }, scrollbarOptions) => {
};
const shouldUpdateScroll = ({
  routerProps: { location },
  getSavedScrollPosition
}, scrollbarOptions) => {
  Scrollbar__default.get(document.getElementById("___gatsby")).update();
  return false;
};

exports.onClientEntry = onClientEntry;
exports.onInitialClientRender = onInitialClientRender;
exports.onRouteUpdate = onRouteUpdate;
exports.shouldUpdateScroll = shouldUpdateScroll;
