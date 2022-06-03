'use strict';

const require$$0 = require('path');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e["default"] : e; }

function _mergeNamespaces(n, m) {
	for (var i = 0; i < m.length; i++) {
		const e = m[i];
		if (typeof e !== 'string' && !Array.isArray(e)) { for (const k in e) {
			if (k !== 'default' && !(k in n)) {
				n[k] = e[k];
			}
		} }
	}
	return n;
}

const require$$0__default = /*#__PURE__*/_interopDefaultLegacy(require$$0);

function commonjsRequire (path) {
	throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}

var path = require$$0__default;

var currentPkg = function (from) {
	from = from || process.cwd();
	var fp = path.join(from, 'package.json');
	var result = {};
	try {
		var pkg = commonjsRequire(fp);
		result.pkg = pkg;
	} catch (error) {
		result.error = error;
	}
	return result
};

const index = /*#__PURE__*/_mergeNamespaces({
	__proto__: null,
	'default': currentPkg
}, [currentPkg]);

exports.index = index;
