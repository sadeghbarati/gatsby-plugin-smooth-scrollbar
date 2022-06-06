'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const path = require('node:path');
const node_fs = require('node:fs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e["default"] : e; }

const path__default = /*#__PURE__*/_interopDefaultLegacy(path);

const htmlShadow = (className) => {
  const content = `import React from 'react'
  import PropTypes from 'prop-types'

  export default function HTML(props) {
    return (
      <html {...props.htmlAttributes}>
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          {props.headComponents}
        </head>
        <body {...props.bodyAttributes}>
          {props.preBodyComponents}
          <div className="${className}" data-gatsby-scrollbar>
            <div
              key={'body'}
              id="___gatsby"
              dangerouslySetInnerHTML={{ __html: props.body }}
            />
          </div>
          {props.postBodyComponents}
        </body>
      </html>
    )
  }

  HTML.propTypes = {
    htmlAttributes: PropTypes.object,
    headComponents: PropTypes.array,
    bodyAttributes: PropTypes.object,
    preBodyComponents: PropTypes.array,
    body: PropTypes.string,
    postBodyComponents: PropTypes.array,
  }
  `;
  return content;
};
const pluginOptionsSchema = ({ Joi }) => {
  return Joi.object().keys({
    html: Joi.object().keys({
      scrollbarClassName: Joi.string().default("gatsby-smooth-scrollbar")
    }),
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
  (async () => {
    try {
      await node_fs.promises.writeFile(path__default.join(process.cwd(), "src", "html.js"), htmlShadow("class-example"));
    } catch (error) {
      console.error(error);
    }
  })();
  import('read-pkg').then(async (pkg) => {
    const {
      dependencies
    } = await pkg.readPackage();
    if (pluginOptions.gsap === true) {
      if (Object.prototype.hasOwnProperty.call(dependencies, "gsap") === false) {
        console.error("Please install GSAP as dependencies then restart Gatsby server");
        return false;
      }
    }
  });
};

exports.onPreInit = onPreInit;
exports.pluginOptionsSchema = pluginOptionsSchema;
