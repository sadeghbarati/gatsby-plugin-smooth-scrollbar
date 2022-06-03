import require$$0 from 'path';

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

function commonjsRequire (path) {
	throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}

var path = require$$0;

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

export { index as i };
