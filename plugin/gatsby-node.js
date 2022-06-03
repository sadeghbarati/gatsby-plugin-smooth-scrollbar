'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const path = require('node:path');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e["default"] : e; }

const path__default = /*#__PURE__*/_interopDefaultLegacy(path);

const currentPkgEs = (from) => {
  from = from || process.cwd();
  const fp = path__default.join(from, "package.json");
  const result = {};
  try {
    const pkg = require(fp);
    result.pkg = pkg;
  } catch (error) {
    result.error = error;
  }
  return result;
};
const pluginOptionsSchema = ({ Joi }) => {
  return Joi.object().keys({
    gsap: Joi.boolean().description("Enable GSAP ScrollTrigger for smooth-scrollbar"),
    scrollbarOptions: Joi.object().keys({
      damping: Joi.number().integer().min(0).max(1).description("Momentum reduction damping factor, a float value between (0, 1). The lower the value is, the more smooth the scrolling will be (also the more paint frames)."),
      thumbMinSize: Joi.number().integer().description("Minimal size for scrollbar thumbs."),
      renderByPixels: Joi.boolean().description("Render every frame in integer pixel values, set to true to improve scrolling performance."),
      alwaysShowTracks: Joi.boolean().description("Keep scrollbar tracks visible."),
      continuousScrolling: Joi.boolean().description("Set to true to allow outer scrollbars continue scrolling when current scrollbar reaches edge."),
      delegateTo: Joi.any().description("Delegate wheel events and touch events to the given element. By default, the container element is used. This option will be useful for dealing with fixed elements."),
      wheelEventTarget: Joi.any(),
      plugins: Joi.object().description("Options for plugins")
    })
  });
};
const onPreInit = (_, pluginOptions) => {
  const {
    pkg: {
      dependencies
    }
  } = currentPkgEs();
  console.log(typeof dependencies.gsap === "undefined");
  console.log(pluginOptions);
  if (pluginOptions.gsap === true && typeof dependencies.gsap === "undefined") {
    console.error("Please Install GSAP as dependencies or pass autoInstall true");
    return false;
  }
};

exports.onPreInit = onPreInit;
exports.pluginOptionsSchema = pluginOptionsSchema;
