import { t as __commonJSMin } from "../_runtime.mjs";
//#region node_modules/buffer-indexof-polyfill/init-buffer.js
var require_init_buffer = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = function initBuffer(val) {
		return (process && process.version ? process.version : "v5.0.0").split(".")[0].replace("v", "") < 6 ? new Buffer(val) : Buffer.from(val);
	};
}));
//#endregion
//#region node_modules/buffer-indexof-polyfill/index.js
var require_buffer_indexof_polyfill = /* @__PURE__ */ __commonJSMin((() => {
	var initBuffer = require_init_buffer();
	if (!Buffer.prototype.indexOf) Buffer.prototype.indexOf = function(value, offset) {
		offset = offset || 0;
		if (typeof value === "string" || value instanceof String) value = initBuffer(value);
		else if (typeof value === "number" || value instanceof Number) value = initBuffer([value]);
		var len = value.length;
		for (var i = offset; i <= this.length - len; i++) {
			var mismatch = false;
			for (var j = 0; j < len; j++) if (this[i + j] != value[j]) {
				mismatch = true;
				break;
			}
			if (!mismatch) return i;
		}
		return -1;
	};
	function bufferLastIndexOf(value, offset) {
		if (typeof value === "string" || value instanceof String) value = initBuffer(value);
		else if (typeof value === "number" || value instanceof Number) value = initBuffer([value]);
		var len = value.length;
		offset = offset || this.length - len;
		for (var i = offset; i >= 0; i--) {
			var mismatch = false;
			for (var j = 0; j < len; j++) if (this[i + j] != value[j]) {
				mismatch = true;
				break;
			}
			if (!mismatch) return i;
		}
		return -1;
	}
	if (Buffer.prototype.lastIndexOf) {
		if (initBuffer("ABC").lastIndexOf("ABC") === -1) Buffer.prototype.lastIndexOf = bufferLastIndexOf;
	} else Buffer.prototype.lastIndexOf = bufferLastIndexOf;
}));
//#endregion
export { require_buffer_indexof_polyfill as t };
