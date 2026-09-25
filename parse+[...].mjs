import { i as __require, t as __commonJSMin } from "../../_runtime.mjs";
import { i as require_lodash_isfunction, n as require_lodash_escaperegexp, r as require_lodash_isnil } from "./format+[...].mjs";
//#region node_modules/@fast-csv/parse/build/src/ParserOptions.js
var require_ParserOptions = /* @__PURE__ */ __commonJSMin(((exports) => {
	var __importDefault = exports && exports.__importDefault || function(mod) {
		return mod && mod.__esModule ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ParserOptions = void 0;
	var lodash_escaperegexp_1 = __importDefault(require_lodash_escaperegexp());
	var lodash_isnil_1 = __importDefault(require_lodash_isnil());
	var ParserOptions = class {
		constructor(opts) {
			var _a;
			this.objectMode = true;
			this.delimiter = ",";
			this.ignoreEmpty = false;
			this.quote = "\"";
			this.escape = null;
			this.escapeChar = this.quote;
			this.comment = null;
			this.supportsComments = false;
			this.ltrim = false;
			this.rtrim = false;
			this.trim = false;
			this.headers = null;
			this.renameHeaders = false;
			this.strictColumnHandling = false;
			this.discardUnmappedColumns = false;
			this.carriageReturn = "\r";
			this.encoding = "utf8";
			this.limitRows = false;
			this.maxRows = 0;
			this.skipLines = 0;
			this.skipRows = 0;
			Object.assign(this, opts || {});
			if (this.delimiter.length > 1) throw new Error("delimiter option must be one character long");
			this.escapedDelimiter = lodash_escaperegexp_1.default(this.delimiter);
			this.escapeChar = (_a = this.escape) !== null && _a !== void 0 ? _a : this.quote;
			this.supportsComments = !lodash_isnil_1.default(this.comment);
			this.NEXT_TOKEN_REGEXP = new RegExp(`([^\\s]|\\r\\n|\\n|\\r|${this.escapedDelimiter})`);
			if (this.maxRows > 0) this.limitRows = true;
		}
	};
	exports.ParserOptions = ParserOptions;
}));
//#endregion
//#region node_modules/@fast-csv/parse/build/src/types.js
var require_types = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.isSyncValidate = exports.isSyncTransform = void 0;
	exports.isSyncTransform = (transform) => transform.length === 1;
	exports.isSyncValidate = (validate) => validate.length === 1;
}));
//#endregion
//#region node_modules/@fast-csv/parse/build/src/transforms/RowTransformerValidator.js
var require_RowTransformerValidator = /* @__PURE__ */ __commonJSMin(((exports) => {
	var __importDefault = exports && exports.__importDefault || function(mod) {
		return mod && mod.__esModule ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.RowTransformerValidator = void 0;
	var lodash_isfunction_1 = __importDefault(require_lodash_isfunction());
	var types_1 = require_types();
	exports.RowTransformerValidator = class RowTransformerValidator {
		constructor() {
			this._rowTransform = null;
			this._rowValidator = null;
		}
		static createTransform(transformFunction) {
			if (types_1.isSyncTransform(transformFunction)) return (row, cb) => {
				let transformed = null;
				try {
					transformed = transformFunction(row);
				} catch (e) {
					return cb(e);
				}
				return cb(null, transformed);
			};
			return transformFunction;
		}
		static createValidator(validateFunction) {
			if (types_1.isSyncValidate(validateFunction)) return (row, cb) => {
				cb(null, {
					row,
					isValid: validateFunction(row)
				});
			};
			return (row, cb) => {
				validateFunction(row, (err, isValid, reason) => {
					if (err) return cb(err);
					if (isValid) return cb(null, {
						row,
						isValid,
						reason
					});
					return cb(null, {
						row,
						isValid: false,
						reason
					});
				});
			};
		}
		set rowTransform(transformFunction) {
			if (!lodash_isfunction_1.default(transformFunction)) throw new TypeError("The transform should be a function");
			this._rowTransform = RowTransformerValidator.createTransform(transformFunction);
		}
		set rowValidator(validateFunction) {
			if (!lodash_isfunction_1.default(validateFunction)) throw new TypeError("The validate should be a function");
			this._rowValidator = RowTransformerValidator.createValidator(validateFunction);
		}
		transformAndValidate(row, cb) {
			return this.callTransformer(row, (transformErr, transformedRow) => {
				if (transformErr) return cb(transformErr);
				if (!transformedRow) return cb(null, {
					row: null,
					isValid: true
				});
				return this.callValidator(transformedRow, (validateErr, validationResult) => {
					if (validateErr) return cb(validateErr);
					if (validationResult && !validationResult.isValid) return cb(null, {
						row: transformedRow,
						isValid: false,
						reason: validationResult.reason
					});
					return cb(null, {
						row: transformedRow,
						isValid: true
					});
				});
			});
		}
		callTransformer(row, cb) {
			if (!this._rowTransform) return cb(null, row);
			return this._rowTransform(row, cb);
		}
		callValidator(row, cb) {
			if (!this._rowValidator) return cb(null, {
				row,
				isValid: true
			});
			return this._rowValidator(row, cb);
		}
	};
}));
//#endregion
//#region node_modules/lodash.isundefined/index.js
var require_lodash_isundefined = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* lodash 3.0.1 (Custom Build) <https://lodash.com/>
	* Build: `lodash modern modularize exports="npm" -o ./`
	* Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	* Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	* Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	* Available under MIT license <https://lodash.com/license>
	*/
	/**
	* Checks if `value` is `undefined`.
	*
	* @static
	* @memberOf _
	* @category Lang
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
	* @example
	*
	* _.isUndefined(void 0);
	* // => true
	*
	* _.isUndefined(null);
	* // => false
	*/
	function isUndefined(value) {
		return value === void 0;
	}
	module.exports = isUndefined;
}));
//#endregion
//#region node_modules/lodash.uniq/index.js
var require_lodash_uniq = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* lodash (Custom Build) <https://lodash.com/>
	* Build: `lodash modularize exports="npm" -o ./`
	* Copyright jQuery Foundation and other contributors <https://jquery.org/>
	* Released under MIT license <https://lodash.com/license>
	* Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	* Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	*/
	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;
	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = "__lodash_hash_undefined__";
	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;
	/** `Object#toString` result references. */
	var funcTag = "[object Function]";
	var genTag = "[object GeneratorFunction]";
	/**
	* Used to match `RegExp`
	* [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
	*/
	var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
	/** Used to detect host constructors (Safari). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;
	/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
	/** Detect free variable `self`. */
	var freeSelf = typeof self == "object" && self && self.Object === Object && self;
	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function("return this")();
	/**
	* A specialized version of `_.includes` for arrays without support for
	* specifying an index to search from.
	*
	* @private
	* @param {Array} [array] The array to inspect.
	* @param {*} target The value to search for.
	* @returns {boolean} Returns `true` if `target` is found, else `false`.
	*/
	function arrayIncludes(array, value) {
		return !!(array ? array.length : 0) && baseIndexOf(array, value, 0) > -1;
	}
	/**
	* This function is like `arrayIncludes` except that it accepts a comparator.
	*
	* @private
	* @param {Array} [array] The array to inspect.
	* @param {*} target The value to search for.
	* @param {Function} comparator The comparator invoked per element.
	* @returns {boolean} Returns `true` if `target` is found, else `false`.
	*/
	function arrayIncludesWith(array, value, comparator) {
		var index = -1, length = array ? array.length : 0;
		while (++index < length) if (comparator(value, array[index])) return true;
		return false;
	}
	/**
	* The base implementation of `_.findIndex` and `_.findLastIndex` without
	* support for iteratee shorthands.
	*
	* @private
	* @param {Array} array The array to inspect.
	* @param {Function} predicate The function invoked per iteration.
	* @param {number} fromIndex The index to search from.
	* @param {boolean} [fromRight] Specify iterating from right to left.
	* @returns {number} Returns the index of the matched value, else `-1`.
	*/
	function baseFindIndex(array, predicate, fromIndex, fromRight) {
		var length = array.length, index = fromIndex + (fromRight ? 1 : -1);
		while (fromRight ? index-- : ++index < length) if (predicate(array[index], index, array)) return index;
		return -1;
	}
	/**
	* The base implementation of `_.indexOf` without `fromIndex` bounds checks.
	*
	* @private
	* @param {Array} array The array to inspect.
	* @param {*} value The value to search for.
	* @param {number} fromIndex The index to search from.
	* @returns {number} Returns the index of the matched value, else `-1`.
	*/
	function baseIndexOf(array, value, fromIndex) {
		if (value !== value) return baseFindIndex(array, baseIsNaN, fromIndex);
		var index = fromIndex - 1, length = array.length;
		while (++index < length) if (array[index] === value) return index;
		return -1;
	}
	/**
	* The base implementation of `_.isNaN` without support for number objects.
	*
	* @private
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
	*/
	function baseIsNaN(value) {
		return value !== value;
	}
	/**
	* Checks if a cache value for `key` exists.
	*
	* @private
	* @param {Object} cache The cache to query.
	* @param {string} key The key of the entry to check.
	* @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	*/
	function cacheHas(cache, key) {
		return cache.has(key);
	}
	/**
	* Gets the value at `key` of `object`.
	*
	* @private
	* @param {Object} [object] The object to query.
	* @param {string} key The key of the property to get.
	* @returns {*} Returns the property value.
	*/
	function getValue(object, key) {
		return object == null ? void 0 : object[key];
	}
	/**
	* Checks if `value` is a host object in IE < 9.
	*
	* @private
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is a host object, else `false`.
	*/
	function isHostObject(value) {
		var result = false;
		if (value != null && typeof value.toString != "function") try {
			result = !!(value + "");
		} catch (e) {}
		return result;
	}
	/**
	* Converts `set` to an array of its values.
	*
	* @private
	* @param {Object} set The set to convert.
	* @returns {Array} Returns the values.
	*/
	function setToArray(set) {
		var index = -1, result = Array(set.size);
		set.forEach(function(value) {
			result[++index] = value;
		});
		return result;
	}
	/** Used for built-in method references. */
	var arrayProto = Array.prototype;
	var funcProto = Function.prototype;
	var objectProto = Object.prototype;
	/** Used to detect overreaching core-js shims. */
	var coreJsData = root["__core-js_shared__"];
	/** Used to detect methods masquerading as native. */
	var maskSrcKey = function() {
		var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
		return uid ? "Symbol(src)_1." + uid : "";
	}();
	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	/**
	* Used to resolve the
	* [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	* of values.
	*/
	var objectToString = objectProto.toString;
	/** Used to detect if a method is native. */
	var reIsNative = RegExp("^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
	/** Built-in value references. */
	var splice = arrayProto.splice;
	var Map = getNative(root, "Map");
	var Set = getNative(root, "Set");
	var nativeCreate = getNative(Object, "create");
	/**
	* Creates a hash object.
	*
	* @private
	* @constructor
	* @param {Array} [entries] The key-value pairs to cache.
	*/
	function Hash(entries) {
		var index = -1, length = entries ? entries.length : 0;
		this.clear();
		while (++index < length) {
			var entry = entries[index];
			this.set(entry[0], entry[1]);
		}
	}
	/**
	* Removes all key-value entries from the hash.
	*
	* @private
	* @name clear
	* @memberOf Hash
	*/
	function hashClear() {
		this.__data__ = nativeCreate ? nativeCreate(null) : {};
	}
	/**
	* Removes `key` and its value from the hash.
	*
	* @private
	* @name delete
	* @memberOf Hash
	* @param {Object} hash The hash to modify.
	* @param {string} key The key of the value to remove.
	* @returns {boolean} Returns `true` if the entry was removed, else `false`.
	*/
	function hashDelete(key) {
		return this.has(key) && delete this.__data__[key];
	}
	/**
	* Gets the hash value for `key`.
	*
	* @private
	* @name get
	* @memberOf Hash
	* @param {string} key The key of the value to get.
	* @returns {*} Returns the entry value.
	*/
	function hashGet(key) {
		var data = this.__data__;
		if (nativeCreate) {
			var result = data[key];
			return result === HASH_UNDEFINED ? void 0 : result;
		}
		return hasOwnProperty.call(data, key) ? data[key] : void 0;
	}
	/**
	* Checks if a hash value for `key` exists.
	*
	* @private
	* @name has
	* @memberOf Hash
	* @param {string} key The key of the entry to check.
	* @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	*/
	function hashHas(key) {
		var data = this.__data__;
		return nativeCreate ? data[key] !== void 0 : hasOwnProperty.call(data, key);
	}
	/**
	* Sets the hash `key` to `value`.
	*
	* @private
	* @name set
	* @memberOf Hash
	* @param {string} key The key of the value to set.
	* @param {*} value The value to set.
	* @returns {Object} Returns the hash instance.
	*/
	function hashSet(key, value) {
		var data = this.__data__;
		data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value;
		return this;
	}
	Hash.prototype.clear = hashClear;
	Hash.prototype["delete"] = hashDelete;
	Hash.prototype.get = hashGet;
	Hash.prototype.has = hashHas;
	Hash.prototype.set = hashSet;
	/**
	* Creates an list cache object.
	*
	* @private
	* @constructor
	* @param {Array} [entries] The key-value pairs to cache.
	*/
	function ListCache(entries) {
		var index = -1, length = entries ? entries.length : 0;
		this.clear();
		while (++index < length) {
			var entry = entries[index];
			this.set(entry[0], entry[1]);
		}
	}
	/**
	* Removes all key-value entries from the list cache.
	*
	* @private
	* @name clear
	* @memberOf ListCache
	*/
	function listCacheClear() {
		this.__data__ = [];
	}
	/**
	* Removes `key` and its value from the list cache.
	*
	* @private
	* @name delete
	* @memberOf ListCache
	* @param {string} key The key of the value to remove.
	* @returns {boolean} Returns `true` if the entry was removed, else `false`.
	*/
	function listCacheDelete(key) {
		var data = this.__data__, index = assocIndexOf(data, key);
		if (index < 0) return false;
		if (index == data.length - 1) data.pop();
		else splice.call(data, index, 1);
		return true;
	}
	/**
	* Gets the list cache value for `key`.
	*
	* @private
	* @name get
	* @memberOf ListCache
	* @param {string} key The key of the value to get.
	* @returns {*} Returns the entry value.
	*/
	function listCacheGet(key) {
		var data = this.__data__, index = assocIndexOf(data, key);
		return index < 0 ? void 0 : data[index][1];
	}
	/**
	* Checks if a list cache value for `key` exists.
	*
	* @private
	* @name has
	* @memberOf ListCache
	* @param {string} key The key of the entry to check.
	* @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	*/
	function listCacheHas(key) {
		return assocIndexOf(this.__data__, key) > -1;
	}
	/**
	* Sets the list cache `key` to `value`.
	*
	* @private
	* @name set
	* @memberOf ListCache
	* @param {string} key The key of the value to set.
	* @param {*} value The value to set.
	* @returns {Object} Returns the list cache instance.
	*/
	function listCacheSet(key, value) {
		var data = this.__data__, index = assocIndexOf(data, key);
		if (index < 0) data.push([key, value]);
		else data[index][1] = value;
		return this;
	}
	ListCache.prototype.clear = listCacheClear;
	ListCache.prototype["delete"] = listCacheDelete;
	ListCache.prototype.get = listCacheGet;
	ListCache.prototype.has = listCacheHas;
	ListCache.prototype.set = listCacheSet;
	/**
	* Creates a map cache object to store key-value pairs.
	*
	* @private
	* @constructor
	* @param {Array} [entries] The key-value pairs to cache.
	*/
	function MapCache(entries) {
		var index = -1, length = entries ? entries.length : 0;
		this.clear();
		while (++index < length) {
			var entry = entries[index];
			this.set(entry[0], entry[1]);
		}
	}
	/**
	* Removes all key-value entries from the map.
	*
	* @private
	* @name clear
	* @memberOf MapCache
	*/
	function mapCacheClear() {
		this.__data__ = {
			"hash": new Hash(),
			"map": new (Map || ListCache)(),
			"string": new Hash()
		};
	}
	/**
	* Removes `key` and its value from the map.
	*
	* @private
	* @name delete
	* @memberOf MapCache
	* @param {string} key The key of the value to remove.
	* @returns {boolean} Returns `true` if the entry was removed, else `false`.
	*/
	function mapCacheDelete(key) {
		return getMapData(this, key)["delete"](key);
	}
	/**
	* Gets the map value for `key`.
	*
	* @private
	* @name get
	* @memberOf MapCache
	* @param {string} key The key of the value to get.
	* @returns {*} Returns the entry value.
	*/
	function mapCacheGet(key) {
		return getMapData(this, key).get(key);
	}
	/**
	* Checks if a map value for `key` exists.
	*
	* @private
	* @name has
	* @memberOf MapCache
	* @param {string} key The key of the entry to check.
	* @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	*/
	function mapCacheHas(key) {
		return getMapData(this, key).has(key);
	}
	/**
	* Sets the map `key` to `value`.
	*
	* @private
	* @name set
	* @memberOf MapCache
	* @param {string} key The key of the value to set.
	* @param {*} value The value to set.
	* @returns {Object} Returns the map cache instance.
	*/
	function mapCacheSet(key, value) {
		getMapData(this, key).set(key, value);
		return this;
	}
	MapCache.prototype.clear = mapCacheClear;
	MapCache.prototype["delete"] = mapCacheDelete;
	MapCache.prototype.get = mapCacheGet;
	MapCache.prototype.has = mapCacheHas;
	MapCache.prototype.set = mapCacheSet;
	/**
	*
	* Creates an array cache object to store unique values.
	*
	* @private
	* @constructor
	* @param {Array} [values] The values to cache.
	*/
	function SetCache(values) {
		var index = -1, length = values ? values.length : 0;
		this.__data__ = new MapCache();
		while (++index < length) this.add(values[index]);
	}
	/**
	* Adds `value` to the array cache.
	*
	* @private
	* @name add
	* @memberOf SetCache
	* @alias push
	* @param {*} value The value to cache.
	* @returns {Object} Returns the cache instance.
	*/
	function setCacheAdd(value) {
		this.__data__.set(value, HASH_UNDEFINED);
		return this;
	}
	/**
	* Checks if `value` is in the array cache.
	*
	* @private
	* @name has
	* @memberOf SetCache
	* @param {*} value The value to search for.
	* @returns {number} Returns `true` if `value` is found, else `false`.
	*/
	function setCacheHas(value) {
		return this.__data__.has(value);
	}
	SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
	SetCache.prototype.has = setCacheHas;
	/**
	* Gets the index at which the `key` is found in `array` of key-value pairs.
	*
	* @private
	* @param {Array} array The array to inspect.
	* @param {*} key The key to search for.
	* @returns {number} Returns the index of the matched value, else `-1`.
	*/
	function assocIndexOf(array, key) {
		var length = array.length;
		while (length--) if (eq(array[length][0], key)) return length;
		return -1;
	}
	/**
	* The base implementation of `_.isNative` without bad shim checks.
	*
	* @private
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is a native function,
	*  else `false`.
	*/
	function baseIsNative(value) {
		if (!isObject(value) || isMasked(value)) return false;
		return (isFunction(value) || isHostObject(value) ? reIsNative : reIsHostCtor).test(toSource(value));
	}
	/**
	* The base implementation of `_.uniqBy` without support for iteratee shorthands.
	*
	* @private
	* @param {Array} array The array to inspect.
	* @param {Function} [iteratee] The iteratee invoked per element.
	* @param {Function} [comparator] The comparator invoked per element.
	* @returns {Array} Returns the new duplicate free array.
	*/
	function baseUniq(array, iteratee, comparator) {
		var index = -1, includes = arrayIncludes, length = array.length, isCommon = true, result = [], seen = result;
		if (comparator) {
			isCommon = false;
			includes = arrayIncludesWith;
		} else if (length >= LARGE_ARRAY_SIZE) {
			var set = iteratee ? null : createSet(array);
			if (set) return setToArray(set);
			isCommon = false;
			includes = cacheHas;
			seen = new SetCache();
		} else seen = iteratee ? [] : result;
		outer: while (++index < length) {
			var value = array[index], computed = iteratee ? iteratee(value) : value;
			value = comparator || value !== 0 ? value : 0;
			if (isCommon && computed === computed) {
				var seenIndex = seen.length;
				while (seenIndex--) if (seen[seenIndex] === computed) continue outer;
				if (iteratee) seen.push(computed);
				result.push(value);
			} else if (!includes(seen, computed, comparator)) {
				if (seen !== result) seen.push(computed);
				result.push(value);
			}
		}
		return result;
	}
	/**
	* Creates a set object of `values`.
	*
	* @private
	* @param {Array} values The values to add to the set.
	* @returns {Object} Returns the new set.
	*/
	var createSet = !(Set && 1 / setToArray(new Set([, -0]))[1] == INFINITY) ? noop : function(values) {
		return new Set(values);
	};
	/**
	* Gets the data for `map`.
	*
	* @private
	* @param {Object} map The map to query.
	* @param {string} key The reference key.
	* @returns {*} Returns the map data.
	*/
	function getMapData(map, key) {
		var data = map.__data__;
		return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
	}
	/**
	* Gets the native function at `key` of `object`.
	*
	* @private
	* @param {Object} object The object to query.
	* @param {string} key The key of the method to get.
	* @returns {*} Returns the function if it's native, else `undefined`.
	*/
	function getNative(object, key) {
		var value = getValue(object, key);
		return baseIsNative(value) ? value : void 0;
	}
	/**
	* Checks if `value` is suitable for use as unique object key.
	*
	* @private
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is suitable, else `false`.
	*/
	function isKeyable(value) {
		var type = typeof value;
		return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
	}
	/**
	* Checks if `func` has its source masked.
	*
	* @private
	* @param {Function} func The function to check.
	* @returns {boolean} Returns `true` if `func` is masked, else `false`.
	*/
	function isMasked(func) {
		return !!maskSrcKey && maskSrcKey in func;
	}
	/**
	* Converts `func` to its source code.
	*
	* @private
	* @param {Function} func The function to process.
	* @returns {string} Returns the source code.
	*/
	function toSource(func) {
		if (func != null) {
			try {
				return funcToString.call(func);
			} catch (e) {}
			try {
				return func + "";
			} catch (e) {}
		}
		return "";
	}
	/**
	* Creates a duplicate-free version of an array, using
	* [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	* for equality comparisons, in which only the first occurrence of each
	* element is kept.
	*
	* @static
	* @memberOf _
	* @since 0.1.0
	* @category Array
	* @param {Array} array The array to inspect.
	* @returns {Array} Returns the new duplicate free array.
	* @example
	*
	* _.uniq([2, 1, 2]);
	* // => [2, 1]
	*/
	function uniq(array) {
		return array && array.length ? baseUniq(array) : [];
	}
	/**
	* Performs a
	* [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	* comparison between two values to determine if they are equivalent.
	*
	* @static
	* @memberOf _
	* @since 4.0.0
	* @category Lang
	* @param {*} value The value to compare.
	* @param {*} other The other value to compare.
	* @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	* @example
	*
	* var object = { 'a': 1 };
	* var other = { 'a': 1 };
	*
	* _.eq(object, object);
	* // => true
	*
	* _.eq(object, other);
	* // => false
	*
	* _.eq('a', 'a');
	* // => true
	*
	* _.eq('a', Object('a'));
	* // => false
	*
	* _.eq(NaN, NaN);
	* // => true
	*/
	function eq(value, other) {
		return value === other || value !== value && other !== other;
	}
	/**
	* Checks if `value` is classified as a `Function` object.
	*
	* @static
	* @memberOf _
	* @since 0.1.0
	* @category Lang
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is a function, else `false`.
	* @example
	*
	* _.isFunction(_);
	* // => true
	*
	* _.isFunction(/abc/);
	* // => false
	*/
	function isFunction(value) {
		var tag = isObject(value) ? objectToString.call(value) : "";
		return tag == funcTag || tag == genTag;
	}
	/**
	* Checks if `value` is the
	* [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	* of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	*
	* @static
	* @memberOf _
	* @since 0.1.0
	* @category Lang
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is an object, else `false`.
	* @example
	*
	* _.isObject({});
	* // => true
	*
	* _.isObject([1, 2, 3]);
	* // => true
	*
	* _.isObject(_.noop);
	* // => true
	*
	* _.isObject(null);
	* // => false
	*/
	function isObject(value) {
		var type = typeof value;
		return !!value && (type == "object" || type == "function");
	}
	/**
	* This method returns `undefined`.
	*
	* @static
	* @memberOf _
	* @since 2.3.0
	* @category Util
	* @example
	*
	* _.times(2, _.noop);
	* // => [undefined, undefined]
	*/
	function noop() {}
	module.exports = uniq;
}));
//#endregion
//#region node_modules/lodash.groupby/index.js
var require_lodash_groupby = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = "Expected a function";
	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = "__lodash_hash_undefined__";
	/** Used to compose bitmasks for comparison styles. */
	var UNORDERED_COMPARE_FLAG = 1;
	var PARTIAL_COMPARE_FLAG = 2;
	var MAX_SAFE_INTEGER = 9007199254740991;
	/** `Object#toString` result references. */
	var argsTag = "[object Arguments]";
	var arrayTag = "[object Array]";
	var boolTag = "[object Boolean]";
	var dateTag = "[object Date]";
	var errorTag = "[object Error]";
	var funcTag = "[object Function]";
	var genTag = "[object GeneratorFunction]";
	var mapTag = "[object Map]";
	var numberTag = "[object Number]";
	var objectTag = "[object Object]";
	var promiseTag = "[object Promise]";
	var regexpTag = "[object RegExp]";
	var setTag = "[object Set]";
	var stringTag = "[object String]";
	var symbolTag = "[object Symbol]";
	var weakMapTag = "[object WeakMap]";
	var arrayBufferTag = "[object ArrayBuffer]";
	var dataViewTag = "[object DataView]";
	var float32Tag = "[object Float32Array]";
	var float64Tag = "[object Float64Array]";
	var int8Tag = "[object Int8Array]";
	var int16Tag = "[object Int16Array]";
	var int32Tag = "[object Int32Array]";
	var uint8Tag = "[object Uint8Array]";
	var uint8ClampedTag = "[object Uint8ClampedArray]";
	var uint16Tag = "[object Uint16Array]";
	var uint32Tag = "[object Uint32Array]";
	/** Used to match property names within property paths. */
	var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
	var reIsPlainProp = /^\w*$/;
	var reLeadingDot = /^\./;
	var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
	/**
	* Used to match `RegExp`
	* [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
	*/
	var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
	/** Used to match backslashes in property paths. */
	var reEscapeChar = /\\(\\)?/g;
	/** Used to detect host constructors (Safari). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;
	/** Used to detect unsigned integer values. */
	var reIsUint = /^(?:0|[1-9]\d*)$/;
	/** Used to identify `toStringTag` values of typed arrays. */
	var typedArrayTags = {};
	typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
	typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
	/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
	/** Detect free variable `self`. */
	var freeSelf = typeof self == "object" && self && self.Object === Object && self;
	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function("return this")();
	/** Detect free variable `exports`. */
	var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
	/** Detect free variable `module`. */
	var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
	/** Detect free variable `process` from Node.js. */
	var freeProcess = freeModule && freeModule.exports === freeExports && freeGlobal.process;
	/** Used to access faster Node.js helpers. */
	var nodeUtil = function() {
		try {
			return freeProcess && freeProcess.binding("util");
		} catch (e) {}
	}();
	var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
	/**
	* A specialized version of `baseAggregator` for arrays.
	*
	* @private
	* @param {Array} [array] The array to iterate over.
	* @param {Function} setter The function to set `accumulator` values.
	* @param {Function} iteratee The iteratee to transform keys.
	* @param {Object} accumulator The initial aggregated object.
	* @returns {Function} Returns `accumulator`.
	*/
	function arrayAggregator(array, setter, iteratee, accumulator) {
		var index = -1, length = array ? array.length : 0;
		while (++index < length) {
			var value = array[index];
			setter(accumulator, value, iteratee(value), array);
		}
		return accumulator;
	}
	/**
	* A specialized version of `_.some` for arrays without support for iteratee
	* shorthands.
	*
	* @private
	* @param {Array} [array] The array to iterate over.
	* @param {Function} predicate The function invoked per iteration.
	* @returns {boolean} Returns `true` if any element passes the predicate check,
	*  else `false`.
	*/
	function arraySome(array, predicate) {
		var index = -1, length = array ? array.length : 0;
		while (++index < length) if (predicate(array[index], index, array)) return true;
		return false;
	}
	/**
	* The base implementation of `_.property` without support for deep paths.
	*
	* @private
	* @param {string} key The key of the property to get.
	* @returns {Function} Returns the new accessor function.
	*/
	function baseProperty(key) {
		return function(object) {
			return object == null ? void 0 : object[key];
		};
	}
	/**
	* The base implementation of `_.times` without support for iteratee shorthands
	* or max array length checks.
	*
	* @private
	* @param {number} n The number of times to invoke `iteratee`.
	* @param {Function} iteratee The function invoked per iteration.
	* @returns {Array} Returns the array of results.
	*/
	function baseTimes(n, iteratee) {
		var index = -1, result = Array(n);
		while (++index < n) result[index] = iteratee(index);
		return result;
	}
	/**
	* The base implementation of `_.unary` without support for storing metadata.
	*
	* @private
	* @param {Function} func The function to cap arguments for.
	* @returns {Function} Returns the new capped function.
	*/
	function baseUnary(func) {
		return function(value) {
			return func(value);
		};
	}
	/**
	* Gets the value at `key` of `object`.
	*
	* @private
	* @param {Object} [object] The object to query.
	* @param {string} key The key of the property to get.
	* @returns {*} Returns the property value.
	*/
	function getValue(object, key) {
		return object == null ? void 0 : object[key];
	}
	/**
	* Checks if `value` is a host object in IE < 9.
	*
	* @private
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is a host object, else `false`.
	*/
	function isHostObject(value) {
		var result = false;
		if (value != null && typeof value.toString != "function") try {
			result = !!(value + "");
		} catch (e) {}
		return result;
	}
	/**
	* Converts `map` to its key-value pairs.
	*
	* @private
	* @param {Object} map The map to convert.
	* @returns {Array} Returns the key-value pairs.
	*/
	function mapToArray(map) {
		var index = -1, result = Array(map.size);
		map.forEach(function(value, key) {
			result[++index] = [key, value];
		});
		return result;
	}
	/**
	* Creates a unary function that invokes `func` with its argument transformed.
	*
	* @private
	* @param {Function} func The function to wrap.
	* @param {Function} transform The argument transform.
	* @returns {Function} Returns the new function.
	*/
	function overArg(func, transform) {
		return function(arg) {
			return func(transform(arg));
		};
	}
	/**
	* Converts `set` to an array of its values.
	*
	* @private
	* @param {Object} set The set to convert.
	* @returns {Array} Returns the values.
	*/
	function setToArray(set) {
		var index = -1, result = Array(set.size);
		set.forEach(function(value) {
			result[++index] = value;
		});
		return result;
	}
	/** Used for built-in method references. */
	var arrayProto = Array.prototype;
	var funcProto = Function.prototype;
	var objectProto = Object.prototype;
	/** Used to detect overreaching core-js shims. */
	var coreJsData = root["__core-js_shared__"];
	/** Used to detect methods masquerading as native. */
	var maskSrcKey = function() {
		var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
		return uid ? "Symbol(src)_1." + uid : "";
	}();
	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	/**
	* Used to resolve the
	* [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	* of values.
	*/
	var objectToString = objectProto.toString;
	/** Used to detect if a method is native. */
	var reIsNative = RegExp("^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
	/** Built-in value references. */
	var Symbol = root.Symbol;
	var Uint8Array = root.Uint8Array;
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;
	var splice = arrayProto.splice;
	var nativeKeys = overArg(Object.keys, Object);
	var DataView = getNative(root, "DataView");
	var Map = getNative(root, "Map");
	var Promise = getNative(root, "Promise");
	var Set = getNative(root, "Set");
	var WeakMap = getNative(root, "WeakMap");
	var nativeCreate = getNative(Object, "create");
	/** Used to detect maps, sets, and weakmaps. */
	var dataViewCtorString = toSource(DataView);
	var mapCtorString = toSource(Map);
	var promiseCtorString = toSource(Promise);
	var setCtorString = toSource(Set);
	var weakMapCtorString = toSource(WeakMap);
	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : void 0;
	var symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
	var symbolToString = symbolProto ? symbolProto.toString : void 0;
	/**
	* Creates a hash object.
	*
	* @private
	* @constructor
	* @param {Array} [entries] The key-value pairs to cache.
	*/
	function Hash(entries) {
		var index = -1, length = entries ? entries.length : 0;
		this.clear();
		while (++index < length) {
			var entry = entries[index];
			this.set(entry[0], entry[1]);
		}
	}
	/**
	* Removes all key-value entries from the hash.
	*
	* @private
	* @name clear
	* @memberOf Hash
	*/
	function hashClear() {
		this.__data__ = nativeCreate ? nativeCreate(null) : {};
	}
	/**
	* Removes `key` and its value from the hash.
	*
	* @private
	* @name delete
	* @memberOf Hash
	* @param {Object} hash The hash to modify.
	* @param {string} key The key of the value to remove.
	* @returns {boolean} Returns `true` if the entry was removed, else `false`.
	*/
	function hashDelete(key) {
		return this.has(key) && delete this.__data__[key];
	}
	/**
	* Gets the hash value for `key`.
	*
	* @private
	* @name get
	* @memberOf Hash
	* @param {string} key The key of the value to get.
	* @returns {*} Returns the entry value.
	*/
	function hashGet(key) {
		var data = this.__data__;
		if (nativeCreate) {
			var result = data[key];
			return result === HASH_UNDEFINED ? void 0 : result;
		}
		return hasOwnProperty.call(data, key) ? data[key] : void 0;
	}
	/**
	* Checks if a hash value for `key` exists.
	*
	* @private
	* @name has
	* @memberOf Hash
	* @param {string} key The key of the entry to check.
	* @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	*/
	function hashHas(key) {
		var data = this.__data__;
		return nativeCreate ? data[key] !== void 0 : hasOwnProperty.call(data, key);
	}
	/**
	* Sets the hash `key` to `value`.
	*
	* @private
	* @name set
	* @memberOf Hash
	* @param {string} key The key of the value to set.
	* @param {*} value The value to set.
	* @returns {Object} Returns the hash instance.
	*/
	function hashSet(key, value) {
		var data = this.__data__;
		data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value;
		return this;
	}
	Hash.prototype.clear = hashClear;
	Hash.prototype["delete"] = hashDelete;
	Hash.prototype.get = hashGet;
	Hash.prototype.has = hashHas;
	Hash.prototype.set = hashSet;
	/**
	* Creates an list cache object.
	*
	* @private
	* @constructor
	* @param {Array} [entries] The key-value pairs to cache.
	*/
	function ListCache(entries) {
		var index = -1, length = entries ? entries.length : 0;
		this.clear();
		while (++index < length) {
			var entry = entries[index];
			this.set(entry[0], entry[1]);
		}
	}
	/**
	* Removes all key-value entries from the list cache.
	*
	* @private
	* @name clear
	* @memberOf ListCache
	*/
	function listCacheClear() {
		this.__data__ = [];
	}
	/**
	* Removes `key` and its value from the list cache.
	*
	* @private
	* @name delete
	* @memberOf ListCache
	* @param {string} key The key of the value to remove.
	* @returns {boolean} Returns `true` if the entry was removed, else `false`.
	*/
	function listCacheDelete(key) {
		var data = this.__data__, index = assocIndexOf(data, key);
		if (index < 0) return false;
		if (index == data.length - 1) data.pop();
		else splice.call(data, index, 1);
		return true;
	}
	/**
	* Gets the list cache value for `key`.
	*
	* @private
	* @name get
	* @memberOf ListCache
	* @param {string} key The key of the value to get.
	* @returns {*} Returns the entry value.
	*/
	function listCacheGet(key) {
		var data = this.__data__, index = assocIndexOf(data, key);
		return index < 0 ? void 0 : data[index][1];
	}
	/**
	* Checks if a list cache value for `key` exists.
	*
	* @private
	* @name has
	* @memberOf ListCache
	* @param {string} key The key of the entry to check.
	* @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	*/
	function listCacheHas(key) {
		return assocIndexOf(this.__data__, key) > -1;
	}
	/**
	* Sets the list cache `key` to `value`.
	*
	* @private
	* @name set
	* @memberOf ListCache
	* @param {string} key The key of the value to set.
	* @param {*} value The value to set.
	* @returns {Object} Returns the list cache instance.
	*/
	function listCacheSet(key, value) {
		var data = this.__data__, index = assocIndexOf(data, key);
		if (index < 0) data.push([key, value]);
		else data[index][1] = value;
		return this;
	}
	ListCache.prototype.clear = listCacheClear;
	ListCache.prototype["delete"] = listCacheDelete;
	ListCache.prototype.get = listCacheGet;
	ListCache.prototype.has = listCacheHas;
	ListCache.prototype.set = listCacheSet;
	/**
	* Creates a map cache object to store key-value pairs.
	*
	* @private
	* @constructor
	* @param {Array} [entries] The key-value pairs to cache.
	*/
	function MapCache(entries) {
		var index = -1, length = entries ? entries.length : 0;
		this.clear();
		while (++index < length) {
			var entry = entries[index];
			this.set(entry[0], entry[1]);
		}
	}
	/**
	* Removes all key-value entries from the map.
	*
	* @private
	* @name clear
	* @memberOf MapCache
	*/
	function mapCacheClear() {
		this.__data__ = {
			"hash": new Hash(),
			"map": new (Map || ListCache)(),
			"string": new Hash()
		};
	}
	/**
	* Removes `key` and its value from the map.
	*
	* @private
	* @name delete
	* @memberOf MapCache
	* @param {string} key The key of the value to remove.
	* @returns {boolean} Returns `true` if the entry was removed, else `false`.
	*/
	function mapCacheDelete(key) {
		return getMapData(this, key)["delete"](key);
	}
	/**
	* Gets the map value for `key`.
	*
	* @private
	* @name get
	* @memberOf MapCache
	* @param {string} key The key of the value to get.
	* @returns {*} Returns the entry value.
	*/
	function mapCacheGet(key) {
		return getMapData(this, key).get(key);
	}
	/**
	* Checks if a map value for `key` exists.
	*
	* @private
	* @name has
	* @memberOf MapCache
	* @param {string} key The key of the entry to check.
	* @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	*/
	function mapCacheHas(key) {
		return getMapData(this, key).has(key);
	}
	/**
	* Sets the map `key` to `value`.
	*
	* @private
	* @name set
	* @memberOf MapCache
	* @param {string} key The key of the value to set.
	* @param {*} value The value to set.
	* @returns {Object} Returns the map cache instance.
	*/
	function mapCacheSet(key, value) {
		getMapData(this, key).set(key, value);
		return this;
	}
	MapCache.prototype.clear = mapCacheClear;
	MapCache.prototype["delete"] = mapCacheDelete;
	MapCache.prototype.get = mapCacheGet;
	MapCache.prototype.has = mapCacheHas;
	MapCache.prototype.set = mapCacheSet;
	/**
	*
	* Creates an array cache object to store unique values.
	*
	* @private
	* @constructor
	* @param {Array} [values] The values to cache.
	*/
	function SetCache(values) {
		var index = -1, length = values ? values.length : 0;
		this.__data__ = new MapCache();
		while (++index < length) this.add(values[index]);
	}
	/**
	* Adds `value` to the array cache.
	*
	* @private
	* @name add
	* @memberOf SetCache
	* @alias push
	* @param {*} value The value to cache.
	* @returns {Object} Returns the cache instance.
	*/
	function setCacheAdd(value) {
		this.__data__.set(value, HASH_UNDEFINED);
		return this;
	}
	/**
	* Checks if `value` is in the array cache.
	*
	* @private
	* @name has
	* @memberOf SetCache
	* @param {*} value The value to search for.
	* @returns {number} Returns `true` if `value` is found, else `false`.
	*/
	function setCacheHas(value) {
		return this.__data__.has(value);
	}
	SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
	SetCache.prototype.has = setCacheHas;
	/**
	* Creates a stack cache object to store key-value pairs.
	*
	* @private
	* @constructor
	* @param {Array} [entries] The key-value pairs to cache.
	*/
	function Stack(entries) {
		this.__data__ = new ListCache(entries);
	}
	/**
	* Removes all key-value entries from the stack.
	*
	* @private
	* @name clear
	* @memberOf Stack
	*/
	function stackClear() {
		this.__data__ = new ListCache();
	}
	/**
	* Removes `key` and its value from the stack.
	*
	* @private
	* @name delete
	* @memberOf Stack
	* @param {string} key The key of the value to remove.
	* @returns {boolean} Returns `true` if the entry was removed, else `false`.
	*/
	function stackDelete(key) {
		return this.__data__["delete"](key);
	}
	/**
	* Gets the stack value for `key`.
	*
	* @private
	* @name get
	* @memberOf Stack
	* @param {string} key The key of the value to get.
	* @returns {*} Returns the entry value.
	*/
	function stackGet(key) {
		return this.__data__.get(key);
	}
	/**
	* Checks if a stack value for `key` exists.
	*
	* @private
	* @name has
	* @memberOf Stack
	* @param {string} key The key of the entry to check.
	* @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	*/
	function stackHas(key) {
		return this.__data__.has(key);
	}
	/**
	* Sets the stack `key` to `value`.
	*
	* @private
	* @name set
	* @memberOf Stack
	* @param {string} key The key of the value to set.
	* @param {*} value The value to set.
	* @returns {Object} Returns the stack cache instance.
	*/
	function stackSet(key, value) {
		var cache = this.__data__;
		if (cache instanceof ListCache) {
			var pairs = cache.__data__;
			if (!Map || pairs.length < 199) {
				pairs.push([key, value]);
				return this;
			}
			cache = this.__data__ = new MapCache(pairs);
		}
		cache.set(key, value);
		return this;
	}
	Stack.prototype.clear = stackClear;
	Stack.prototype["delete"] = stackDelete;
	Stack.prototype.get = stackGet;
	Stack.prototype.has = stackHas;
	Stack.prototype.set = stackSet;
	/**
	* Creates an array of the enumerable property names of the array-like `value`.
	*
	* @private
	* @param {*} value The value to query.
	* @param {boolean} inherited Specify returning inherited property names.
	* @returns {Array} Returns the array of property names.
	*/
	function arrayLikeKeys(value, inherited) {
		var result = isArray(value) || isArguments(value) ? baseTimes(value.length, String) : [];
		var length = result.length, skipIndexes = !!length;
		for (var key in value) if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && (key == "length" || isIndex(key, length)))) result.push(key);
		return result;
	}
	/**
	* Gets the index at which the `key` is found in `array` of key-value pairs.
	*
	* @private
	* @param {Array} array The array to inspect.
	* @param {*} key The key to search for.
	* @returns {number} Returns the index of the matched value, else `-1`.
	*/
	function assocIndexOf(array, key) {
		var length = array.length;
		while (length--) if (eq(array[length][0], key)) return length;
		return -1;
	}
	/**
	* Aggregates elements of `collection` on `accumulator` with keys transformed
	* by `iteratee` and values set by `setter`.
	*
	* @private
	* @param {Array|Object} collection The collection to iterate over.
	* @param {Function} setter The function to set `accumulator` values.
	* @param {Function} iteratee The iteratee to transform keys.
	* @param {Object} accumulator The initial aggregated object.
	* @returns {Function} Returns `accumulator`.
	*/
	function baseAggregator(collection, setter, iteratee, accumulator) {
		baseEach(collection, function(value, key, collection) {
			setter(accumulator, value, iteratee(value), collection);
		});
		return accumulator;
	}
	/**
	* The base implementation of `_.forEach` without support for iteratee shorthands.
	*
	* @private
	* @param {Array|Object} collection The collection to iterate over.
	* @param {Function} iteratee The function invoked per iteration.
	* @returns {Array|Object} Returns `collection`.
	*/
	var baseEach = createBaseEach(baseForOwn);
	/**
	* The base implementation of `baseForOwn` which iterates over `object`
	* properties returned by `keysFunc` and invokes `iteratee` for each property.
	* Iteratee functions may exit iteration early by explicitly returning `false`.
	*
	* @private
	* @param {Object} object The object to iterate over.
	* @param {Function} iteratee The function invoked per iteration.
	* @param {Function} keysFunc The function to get the keys of `object`.
	* @returns {Object} Returns `object`.
	*/
	var baseFor = createBaseFor();
	/**
	* The base implementation of `_.forOwn` without support for iteratee shorthands.
	*
	* @private
	* @param {Object} object The object to iterate over.
	* @param {Function} iteratee The function invoked per iteration.
	* @returns {Object} Returns `object`.
	*/
	function baseForOwn(object, iteratee) {
		return object && baseFor(object, iteratee, keys);
	}
	/**
	* The base implementation of `_.get` without support for default values.
	*
	* @private
	* @param {Object} object The object to query.
	* @param {Array|string} path The path of the property to get.
	* @returns {*} Returns the resolved value.
	*/
	function baseGet(object, path) {
		path = isKey(path, object) ? [path] : castPath(path);
		var index = 0, length = path.length;
		while (object != null && index < length) object = object[toKey(path[index++])];
		return index && index == length ? object : void 0;
	}
	/**
	* The base implementation of `getTag`.
	*
	* @private
	* @param {*} value The value to query.
	* @returns {string} Returns the `toStringTag`.
	*/
	function baseGetTag(value) {
		return objectToString.call(value);
	}
	/**
	* The base implementation of `_.hasIn` without support for deep paths.
	*
	* @private
	* @param {Object} [object] The object to query.
	* @param {Array|string} key The key to check.
	* @returns {boolean} Returns `true` if `key` exists, else `false`.
	*/
	function baseHasIn(object, key) {
		return object != null && key in Object(object);
	}
	/**
	* The base implementation of `_.isEqual` which supports partial comparisons
	* and tracks traversed objects.
	*
	* @private
	* @param {*} value The value to compare.
	* @param {*} other The other value to compare.
	* @param {Function} [customizer] The function to customize comparisons.
	* @param {boolean} [bitmask] The bitmask of comparison flags.
	*  The bitmask may be composed of the following flags:
	*     1 - Unordered comparison
	*     2 - Partial comparison
	* @param {Object} [stack] Tracks traversed `value` and `other` objects.
	* @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	*/
	function baseIsEqual(value, other, customizer, bitmask, stack) {
		if (value === other) return true;
		if (value == null || other == null || !isObject(value) && !isObjectLike(other)) return value !== value && other !== other;
		return baseIsEqualDeep(value, other, baseIsEqual, customizer, bitmask, stack);
	}
	/**
	* A specialized version of `baseIsEqual` for arrays and objects which performs
	* deep comparisons and tracks traversed objects enabling objects with circular
	* references to be compared.
	*
	* @private
	* @param {Object} object The object to compare.
	* @param {Object} other The other object to compare.
	* @param {Function} equalFunc The function to determine equivalents of values.
	* @param {Function} [customizer] The function to customize comparisons.
	* @param {number} [bitmask] The bitmask of comparison flags. See `baseIsEqual`
	*  for more details.
	* @param {Object} [stack] Tracks traversed `object` and `other` objects.
	* @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	*/
	function baseIsEqualDeep(object, other, equalFunc, customizer, bitmask, stack) {
		var objIsArr = isArray(object), othIsArr = isArray(other), objTag = arrayTag, othTag = arrayTag;
		if (!objIsArr) {
			objTag = getTag(object);
			objTag = objTag == argsTag ? objectTag : objTag;
		}
		if (!othIsArr) {
			othTag = getTag(other);
			othTag = othTag == argsTag ? objectTag : othTag;
		}
		var objIsObj = objTag == objectTag && !isHostObject(object), othIsObj = othTag == objectTag && !isHostObject(other), isSameTag = objTag == othTag;
		if (isSameTag && !objIsObj) {
			stack || (stack = new Stack());
			return objIsArr || isTypedArray(object) ? equalArrays(object, other, equalFunc, customizer, bitmask, stack) : equalByTag(object, other, objTag, equalFunc, customizer, bitmask, stack);
		}
		if (!(bitmask & PARTIAL_COMPARE_FLAG)) {
			var objIsWrapped = objIsObj && hasOwnProperty.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty.call(other, "__wrapped__");
			if (objIsWrapped || othIsWrapped) {
				var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
				stack || (stack = new Stack());
				return equalFunc(objUnwrapped, othUnwrapped, customizer, bitmask, stack);
			}
		}
		if (!isSameTag) return false;
		stack || (stack = new Stack());
		return equalObjects(object, other, equalFunc, customizer, bitmask, stack);
	}
	/**
	* The base implementation of `_.isMatch` without support for iteratee shorthands.
	*
	* @private
	* @param {Object} object The object to inspect.
	* @param {Object} source The object of property values to match.
	* @param {Array} matchData The property names, values, and compare flags to match.
	* @param {Function} [customizer] The function to customize comparisons.
	* @returns {boolean} Returns `true` if `object` is a match, else `false`.
	*/
	function baseIsMatch(object, source, matchData, customizer) {
		var index = matchData.length, length = index, noCustomizer = !customizer;
		if (object == null) return !length;
		object = Object(object);
		while (index--) {
			var data = matchData[index];
			if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) return false;
		}
		while (++index < length) {
			data = matchData[index];
			var key = data[0], objValue = object[key], srcValue = data[1];
			if (noCustomizer && data[2]) {
				if (objValue === void 0 && !(key in object)) return false;
			} else {
				var stack = new Stack();
				if (customizer) var result = customizer(objValue, srcValue, key, object, source, stack);
				if (!(result === void 0 ? baseIsEqual(srcValue, objValue, customizer, 3, stack) : result)) return false;
			}
		}
		return true;
	}
	/**
	* The base implementation of `_.isNative` without bad shim checks.
	*
	* @private
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is a native function,
	*  else `false`.
	*/
	function baseIsNative(value) {
		if (!isObject(value) || isMasked(value)) return false;
		return (isFunction(value) || isHostObject(value) ? reIsNative : reIsHostCtor).test(toSource(value));
	}
	/**
	* The base implementation of `_.isTypedArray` without Node.js optimizations.
	*
	* @private
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	*/
	function baseIsTypedArray(value) {
		return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[objectToString.call(value)];
	}
	/**
	* The base implementation of `_.iteratee`.
	*
	* @private
	* @param {*} [value=_.identity] The value to convert to an iteratee.
	* @returns {Function} Returns the iteratee.
	*/
	function baseIteratee(value) {
		if (typeof value == "function") return value;
		if (value == null) return identity;
		if (typeof value == "object") return isArray(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value);
		return property(value);
	}
	/**
	* The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
	*
	* @private
	* @param {Object} object The object to query.
	* @returns {Array} Returns the array of property names.
	*/
	function baseKeys(object) {
		if (!isPrototype(object)) return nativeKeys(object);
		var result = [];
		for (var key in Object(object)) if (hasOwnProperty.call(object, key) && key != "constructor") result.push(key);
		return result;
	}
	/**
	* The base implementation of `_.matches` which doesn't clone `source`.
	*
	* @private
	* @param {Object} source The object of property values to match.
	* @returns {Function} Returns the new spec function.
	*/
	function baseMatches(source) {
		var matchData = getMatchData(source);
		if (matchData.length == 1 && matchData[0][2]) return matchesStrictComparable(matchData[0][0], matchData[0][1]);
		return function(object) {
			return object === source || baseIsMatch(object, source, matchData);
		};
	}
	/**
	* The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
	*
	* @private
	* @param {string} path The path of the property to get.
	* @param {*} srcValue The value to match.
	* @returns {Function} Returns the new spec function.
	*/
	function baseMatchesProperty(path, srcValue) {
		if (isKey(path) && isStrictComparable(srcValue)) return matchesStrictComparable(toKey(path), srcValue);
		return function(object) {
			var objValue = get(object, path);
			return objValue === void 0 && objValue === srcValue ? hasIn(object, path) : baseIsEqual(srcValue, objValue, void 0, 3);
		};
	}
	/**
	* A specialized version of `baseProperty` which supports deep paths.
	*
	* @private
	* @param {Array|string} path The path of the property to get.
	* @returns {Function} Returns the new accessor function.
	*/
	function basePropertyDeep(path) {
		return function(object) {
			return baseGet(object, path);
		};
	}
	/**
	* The base implementation of `_.toString` which doesn't convert nullish
	* values to empty strings.
	*
	* @private
	* @param {*} value The value to process.
	* @returns {string} Returns the string.
	*/
	function baseToString(value) {
		if (typeof value == "string") return value;
		if (isSymbol(value)) return symbolToString ? symbolToString.call(value) : "";
		var result = value + "";
		return result == "0" && 1 / value == -Infinity ? "-0" : result;
	}
	/**
	* Casts `value` to a path array if it's not one.
	*
	* @private
	* @param {*} value The value to inspect.
	* @returns {Array} Returns the cast property path array.
	*/
	function castPath(value) {
		return isArray(value) ? value : stringToPath(value);
	}
	/**
	* Creates a function like `_.groupBy`.
	*
	* @private
	* @param {Function} setter The function to set accumulator values.
	* @param {Function} [initializer] The accumulator object initializer.
	* @returns {Function} Returns the new aggregator function.
	*/
	function createAggregator(setter, initializer) {
		return function(collection, iteratee) {
			var func = isArray(collection) ? arrayAggregator : baseAggregator, accumulator = initializer ? initializer() : {};
			return func(collection, setter, baseIteratee(iteratee, 2), accumulator);
		};
	}
	/**
	* Creates a `baseEach` or `baseEachRight` function.
	*
	* @private
	* @param {Function} eachFunc The function to iterate over a collection.
	* @param {boolean} [fromRight] Specify iterating from right to left.
	* @returns {Function} Returns the new base function.
	*/
	function createBaseEach(eachFunc, fromRight) {
		return function(collection, iteratee) {
			if (collection == null) return collection;
			if (!isArrayLike(collection)) return eachFunc(collection, iteratee);
			var length = collection.length, index = fromRight ? length : -1, iterable = Object(collection);
			while (fromRight ? index-- : ++index < length) if (iteratee(iterable[index], index, iterable) === false) break;
			return collection;
		};
	}
	/**
	* Creates a base function for methods like `_.forIn` and `_.forOwn`.
	*
	* @private
	* @param {boolean} [fromRight] Specify iterating from right to left.
	* @returns {Function} Returns the new base function.
	*/
	function createBaseFor(fromRight) {
		return function(object, iteratee, keysFunc) {
			var index = -1, iterable = Object(object), props = keysFunc(object), length = props.length;
			while (length--) {
				var key = props[fromRight ? length : ++index];
				if (iteratee(iterable[key], key, iterable) === false) break;
			}
			return object;
		};
	}
	/**
	* A specialized version of `baseIsEqualDeep` for arrays with support for
	* partial deep comparisons.
	*
	* @private
	* @param {Array} array The array to compare.
	* @param {Array} other The other array to compare.
	* @param {Function} equalFunc The function to determine equivalents of values.
	* @param {Function} customizer The function to customize comparisons.
	* @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
	*  for more details.
	* @param {Object} stack Tracks traversed `array` and `other` objects.
	* @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
	*/
	function equalArrays(array, other, equalFunc, customizer, bitmask, stack) {
		var isPartial = bitmask & PARTIAL_COMPARE_FLAG, arrLength = array.length, othLength = other.length;
		if (arrLength != othLength && !(isPartial && othLength > arrLength)) return false;
		var stacked = stack.get(array);
		if (stacked && stack.get(other)) return stacked == other;
		var index = -1, result = true, seen = bitmask & UNORDERED_COMPARE_FLAG ? new SetCache() : void 0;
		stack.set(array, other);
		stack.set(other, array);
		while (++index < arrLength) {
			var arrValue = array[index], othValue = other[index];
			if (customizer) var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
			if (compared !== void 0) {
				if (compared) continue;
				result = false;
				break;
			}
			if (seen) {
				if (!arraySome(other, function(othValue, othIndex) {
					if (!seen.has(othIndex) && (arrValue === othValue || equalFunc(arrValue, othValue, customizer, bitmask, stack))) return seen.add(othIndex);
				})) {
					result = false;
					break;
				}
			} else if (!(arrValue === othValue || equalFunc(arrValue, othValue, customizer, bitmask, stack))) {
				result = false;
				break;
			}
		}
		stack["delete"](array);
		stack["delete"](other);
		return result;
	}
	/**
	* A specialized version of `baseIsEqualDeep` for comparing objects of
	* the same `toStringTag`.
	*
	* **Note:** This function only supports comparing values with tags of
	* `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	*
	* @private
	* @param {Object} object The object to compare.
	* @param {Object} other The other object to compare.
	* @param {string} tag The `toStringTag` of the objects to compare.
	* @param {Function} equalFunc The function to determine equivalents of values.
	* @param {Function} customizer The function to customize comparisons.
	* @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
	*  for more details.
	* @param {Object} stack Tracks traversed `object` and `other` objects.
	* @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	*/
	function equalByTag(object, other, tag, equalFunc, customizer, bitmask, stack) {
		switch (tag) {
			case dataViewTag:
				if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) return false;
				object = object.buffer;
				other = other.buffer;
			case arrayBufferTag:
				if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array(object), new Uint8Array(other))) return false;
				return true;
			case boolTag:
			case dateTag:
			case numberTag: return eq(+object, +other);
			case errorTag: return object.name == other.name && object.message == other.message;
			case regexpTag:
			case stringTag: return object == other + "";
			case mapTag: var convert = mapToArray;
			case setTag:
				var isPartial = bitmask & PARTIAL_COMPARE_FLAG;
				convert || (convert = setToArray);
				if (object.size != other.size && !isPartial) return false;
				var stacked = stack.get(object);
				if (stacked) return stacked == other;
				bitmask |= UNORDERED_COMPARE_FLAG;
				stack.set(object, other);
				var result = equalArrays(convert(object), convert(other), equalFunc, customizer, bitmask, stack);
				stack["delete"](object);
				return result;
			case symbolTag: if (symbolValueOf) return symbolValueOf.call(object) == symbolValueOf.call(other);
		}
		return false;
	}
	/**
	* A specialized version of `baseIsEqualDeep` for objects with support for
	* partial deep comparisons.
	*
	* @private
	* @param {Object} object The object to compare.
	* @param {Object} other The other object to compare.
	* @param {Function} equalFunc The function to determine equivalents of values.
	* @param {Function} customizer The function to customize comparisons.
	* @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
	*  for more details.
	* @param {Object} stack Tracks traversed `object` and `other` objects.
	* @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	*/
	function equalObjects(object, other, equalFunc, customizer, bitmask, stack) {
		var isPartial = bitmask & PARTIAL_COMPARE_FLAG, objProps = keys(object), objLength = objProps.length;
		if (objLength != keys(other).length && !isPartial) return false;
		var index = objLength;
		while (index--) {
			var key = objProps[index];
			if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) return false;
		}
		var stacked = stack.get(object);
		if (stacked && stack.get(other)) return stacked == other;
		var result = true;
		stack.set(object, other);
		stack.set(other, object);
		var skipCtor = isPartial;
		while (++index < objLength) {
			key = objProps[index];
			var objValue = object[key], othValue = other[key];
			if (customizer) var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
			if (!(compared === void 0 ? objValue === othValue || equalFunc(objValue, othValue, customizer, bitmask, stack) : compared)) {
				result = false;
				break;
			}
			skipCtor || (skipCtor = key == "constructor");
		}
		if (result && !skipCtor) {
			var objCtor = object.constructor, othCtor = other.constructor;
			if (objCtor != othCtor && "constructor" in object && "constructor" in other && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) result = false;
		}
		stack["delete"](object);
		stack["delete"](other);
		return result;
	}
	/**
	* Gets the data for `map`.
	*
	* @private
	* @param {Object} map The map to query.
	* @param {string} key The reference key.
	* @returns {*} Returns the map data.
	*/
	function getMapData(map, key) {
		var data = map.__data__;
		return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
	}
	/**
	* Gets the property names, values, and compare flags of `object`.
	*
	* @private
	* @param {Object} object The object to query.
	* @returns {Array} Returns the match data of `object`.
	*/
	function getMatchData(object) {
		var result = keys(object), length = result.length;
		while (length--) {
			var key = result[length], value = object[key];
			result[length] = [
				key,
				value,
				isStrictComparable(value)
			];
		}
		return result;
	}
	/**
	* Gets the native function at `key` of `object`.
	*
	* @private
	* @param {Object} object The object to query.
	* @param {string} key The key of the method to get.
	* @returns {*} Returns the function if it's native, else `undefined`.
	*/
	function getNative(object, key) {
		var value = getValue(object, key);
		return baseIsNative(value) ? value : void 0;
	}
	/**
	* Gets the `toStringTag` of `value`.
	*
	* @private
	* @param {*} value The value to query.
	* @returns {string} Returns the `toStringTag`.
	*/
	var getTag = baseGetTag;
	if (DataView && getTag(new DataView(/* @__PURE__ */ new ArrayBuffer(1))) != dataViewTag || Map && getTag(new Map()) != mapTag || Promise && getTag(Promise.resolve()) != promiseTag || Set && getTag(new Set()) != setTag || WeakMap && getTag(new WeakMap()) != weakMapTag) getTag = function(value) {
		var result = objectToString.call(value), Ctor = result == objectTag ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : void 0;
		if (ctorString) switch (ctorString) {
			case dataViewCtorString: return dataViewTag;
			case mapCtorString: return mapTag;
			case promiseCtorString: return promiseTag;
			case setCtorString: return setTag;
			case weakMapCtorString: return weakMapTag;
		}
		return result;
	};
	/**
	* Checks if `path` exists on `object`.
	*
	* @private
	* @param {Object} object The object to query.
	* @param {Array|string} path The path to check.
	* @param {Function} hasFunc The function to check properties.
	* @returns {boolean} Returns `true` if `path` exists, else `false`.
	*/
	function hasPath(object, path, hasFunc) {
		path = isKey(path, object) ? [path] : castPath(path);
		var result, index = -1, length = path.length;
		while (++index < length) {
			var key = toKey(path[index]);
			if (!(result = object != null && hasFunc(object, key))) break;
			object = object[key];
		}
		if (result) return result;
		var length = object ? object.length : 0;
		return !!length && isLength(length) && isIndex(key, length) && (isArray(object) || isArguments(object));
	}
	/**
	* Checks if `value` is a valid array-like index.
	*
	* @private
	* @param {*} value The value to check.
	* @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	* @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	*/
	function isIndex(value, length) {
		length = length == null ? MAX_SAFE_INTEGER : length;
		return !!length && (typeof value == "number" || reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
	}
	/**
	* Checks if `value` is a property name and not a property path.
	*
	* @private
	* @param {*} value The value to check.
	* @param {Object} [object] The object to query keys on.
	* @returns {boolean} Returns `true` if `value` is a property name, else `false`.
	*/
	function isKey(value, object) {
		if (isArray(value)) return false;
		var type = typeof value;
		if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol(value)) return true;
		return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
	}
	/**
	* Checks if `value` is suitable for use as unique object key.
	*
	* @private
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is suitable, else `false`.
	*/
	function isKeyable(value) {
		var type = typeof value;
		return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
	}
	/**
	* Checks if `func` has its source masked.
	*
	* @private
	* @param {Function} func The function to check.
	* @returns {boolean} Returns `true` if `func` is masked, else `false`.
	*/
	function isMasked(func) {
		return !!maskSrcKey && maskSrcKey in func;
	}
	/**
	* Checks if `value` is likely a prototype object.
	*
	* @private
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	*/
	function isPrototype(value) {
		var Ctor = value && value.constructor;
		return value === (typeof Ctor == "function" && Ctor.prototype || objectProto);
	}
	/**
	* Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
	*
	* @private
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` if suitable for strict
	*  equality comparisons, else `false`.
	*/
	function isStrictComparable(value) {
		return value === value && !isObject(value);
	}
	/**
	* A specialized version of `matchesProperty` for source values suitable
	* for strict equality comparisons, i.e. `===`.
	*
	* @private
	* @param {string} key The key of the property to get.
	* @param {*} srcValue The value to match.
	* @returns {Function} Returns the new spec function.
	*/
	function matchesStrictComparable(key, srcValue) {
		return function(object) {
			if (object == null) return false;
			return object[key] === srcValue && (srcValue !== void 0 || key in Object(object));
		};
	}
	/**
	* Converts `string` to a property path array.
	*
	* @private
	* @param {string} string The string to convert.
	* @returns {Array} Returns the property path array.
	*/
	var stringToPath = memoize(function(string) {
		string = toString(string);
		var result = [];
		if (reLeadingDot.test(string)) result.push("");
		string.replace(rePropName, function(match, number, quote, string) {
			result.push(quote ? string.replace(reEscapeChar, "$1") : number || match);
		});
		return result;
	});
	/**
	* Converts `value` to a string key if it's not a string or symbol.
	*
	* @private
	* @param {*} value The value to inspect.
	* @returns {string|symbol} Returns the key.
	*/
	function toKey(value) {
		if (typeof value == "string" || isSymbol(value)) return value;
		var result = value + "";
		return result == "0" && 1 / value == -Infinity ? "-0" : result;
	}
	/**
	* Converts `func` to its source code.
	*
	* @private
	* @param {Function} func The function to process.
	* @returns {string} Returns the source code.
	*/
	function toSource(func) {
		if (func != null) {
			try {
				return funcToString.call(func);
			} catch (e) {}
			try {
				return func + "";
			} catch (e) {}
		}
		return "";
	}
	/**
	* Creates an object composed of keys generated from the results of running
	* each element of `collection` thru `iteratee`. The order of grouped values
	* is determined by the order they occur in `collection`. The corresponding
	* value of each key is an array of elements responsible for generating the
	* key. The iteratee is invoked with one argument: (value).
	*
	* @static
	* @memberOf _
	* @since 0.1.0
	* @category Collection
	* @param {Array|Object} collection The collection to iterate over.
	* @param {Function} [iteratee=_.identity]
	*  The iteratee to transform keys.
	* @returns {Object} Returns the composed aggregate object.
	* @example
	*
	* _.groupBy([6.1, 4.2, 6.3], Math.floor);
	* // => { '4': [4.2], '6': [6.1, 6.3] }
	*
	* // The `_.property` iteratee shorthand.
	* _.groupBy(['one', 'two', 'three'], 'length');
	* // => { '3': ['one', 'two'], '5': ['three'] }
	*/
	var groupBy = createAggregator(function(result, value, key) {
		if (hasOwnProperty.call(result, key)) result[key].push(value);
		else result[key] = [value];
	});
	/**
	* Creates a function that memoizes the result of `func`. If `resolver` is
	* provided, it determines the cache key for storing the result based on the
	* arguments provided to the memoized function. By default, the first argument
	* provided to the memoized function is used as the map cache key. The `func`
	* is invoked with the `this` binding of the memoized function.
	*
	* **Note:** The cache is exposed as the `cache` property on the memoized
	* function. Its creation may be customized by replacing the `_.memoize.Cache`
	* constructor with one whose instances implement the
	* [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
	* method interface of `delete`, `get`, `has`, and `set`.
	*
	* @static
	* @memberOf _
	* @since 0.1.0
	* @category Function
	* @param {Function} func The function to have its output memoized.
	* @param {Function} [resolver] The function to resolve the cache key.
	* @returns {Function} Returns the new memoized function.
	* @example
	*
	* var object = { 'a': 1, 'b': 2 };
	* var other = { 'c': 3, 'd': 4 };
	*
	* var values = _.memoize(_.values);
	* values(object);
	* // => [1, 2]
	*
	* values(other);
	* // => [3, 4]
	*
	* object.a = 2;
	* values(object);
	* // => [1, 2]
	*
	* // Modify the result cache.
	* values.cache.set(object, ['a', 'b']);
	* values(object);
	* // => ['a', 'b']
	*
	* // Replace `_.memoize.Cache`.
	* _.memoize.Cache = WeakMap;
	*/
	function memoize(func, resolver) {
		if (typeof func != "function" || resolver && typeof resolver != "function") throw new TypeError(FUNC_ERROR_TEXT);
		var memoized = function() {
			var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
			if (cache.has(key)) return cache.get(key);
			var result = func.apply(this, args);
			memoized.cache = cache.set(key, result);
			return result;
		};
		memoized.cache = new (memoize.Cache || MapCache)();
		return memoized;
	}
	memoize.Cache = MapCache;
	/**
	* Performs a
	* [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	* comparison between two values to determine if they are equivalent.
	*
	* @static
	* @memberOf _
	* @since 4.0.0
	* @category Lang
	* @param {*} value The value to compare.
	* @param {*} other The other value to compare.
	* @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	* @example
	*
	* var object = { 'a': 1 };
	* var other = { 'a': 1 };
	*
	* _.eq(object, object);
	* // => true
	*
	* _.eq(object, other);
	* // => false
	*
	* _.eq('a', 'a');
	* // => true
	*
	* _.eq('a', Object('a'));
	* // => false
	*
	* _.eq(NaN, NaN);
	* // => true
	*/
	function eq(value, other) {
		return value === other || value !== value && other !== other;
	}
	/**
	* Checks if `value` is likely an `arguments` object.
	*
	* @static
	* @memberOf _
	* @since 0.1.0
	* @category Lang
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is an `arguments` object,
	*  else `false`.
	* @example
	*
	* _.isArguments(function() { return arguments; }());
	* // => true
	*
	* _.isArguments([1, 2, 3]);
	* // => false
	*/
	function isArguments(value) {
		return isArrayLikeObject(value) && hasOwnProperty.call(value, "callee") && (!propertyIsEnumerable.call(value, "callee") || objectToString.call(value) == argsTag);
	}
	/**
	* Checks if `value` is classified as an `Array` object.
	*
	* @static
	* @memberOf _
	* @since 0.1.0
	* @category Lang
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is an array, else `false`.
	* @example
	*
	* _.isArray([1, 2, 3]);
	* // => true
	*
	* _.isArray(document.body.children);
	* // => false
	*
	* _.isArray('abc');
	* // => false
	*
	* _.isArray(_.noop);
	* // => false
	*/
	var isArray = Array.isArray;
	/**
	* Checks if `value` is array-like. A value is considered array-like if it's
	* not a function and has a `value.length` that's an integer greater than or
	* equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	*
	* @static
	* @memberOf _
	* @since 4.0.0
	* @category Lang
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	* @example
	*
	* _.isArrayLike([1, 2, 3]);
	* // => true
	*
	* _.isArrayLike(document.body.children);
	* // => true
	*
	* _.isArrayLike('abc');
	* // => true
	*
	* _.isArrayLike(_.noop);
	* // => false
	*/
	function isArrayLike(value) {
		return value != null && isLength(value.length) && !isFunction(value);
	}
	/**
	* This method is like `_.isArrayLike` except that it also checks if `value`
	* is an object.
	*
	* @static
	* @memberOf _
	* @since 4.0.0
	* @category Lang
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is an array-like object,
	*  else `false`.
	* @example
	*
	* _.isArrayLikeObject([1, 2, 3]);
	* // => true
	*
	* _.isArrayLikeObject(document.body.children);
	* // => true
	*
	* _.isArrayLikeObject('abc');
	* // => false
	*
	* _.isArrayLikeObject(_.noop);
	* // => false
	*/
	function isArrayLikeObject(value) {
		return isObjectLike(value) && isArrayLike(value);
	}
	/**
	* Checks if `value` is classified as a `Function` object.
	*
	* @static
	* @memberOf _
	* @since 0.1.0
	* @category Lang
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is a function, else `false`.
	* @example
	*
	* _.isFunction(_);
	* // => true
	*
	* _.isFunction(/abc/);
	* // => false
	*/
	function isFunction(value) {
		var tag = isObject(value) ? objectToString.call(value) : "";
		return tag == funcTag || tag == genTag;
	}
	/**
	* Checks if `value` is a valid array-like length.
	*
	* **Note:** This method is loosely based on
	* [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
	*
	* @static
	* @memberOf _
	* @since 4.0.0
	* @category Lang
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	* @example
	*
	* _.isLength(3);
	* // => true
	*
	* _.isLength(Number.MIN_VALUE);
	* // => false
	*
	* _.isLength(Infinity);
	* // => false
	*
	* _.isLength('3');
	* // => false
	*/
	function isLength(value) {
		return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}
	/**
	* Checks if `value` is the
	* [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	* of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	*
	* @static
	* @memberOf _
	* @since 0.1.0
	* @category Lang
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is an object, else `false`.
	* @example
	*
	* _.isObject({});
	* // => true
	*
	* _.isObject([1, 2, 3]);
	* // => true
	*
	* _.isObject(_.noop);
	* // => true
	*
	* _.isObject(null);
	* // => false
	*/
	function isObject(value) {
		var type = typeof value;
		return !!value && (type == "object" || type == "function");
	}
	/**
	* Checks if `value` is object-like. A value is object-like if it's not `null`
	* and has a `typeof` result of "object".
	*
	* @static
	* @memberOf _
	* @since 4.0.0
	* @category Lang
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	* @example
	*
	* _.isObjectLike({});
	* // => true
	*
	* _.isObjectLike([1, 2, 3]);
	* // => true
	*
	* _.isObjectLike(_.noop);
	* // => false
	*
	* _.isObjectLike(null);
	* // => false
	*/
	function isObjectLike(value) {
		return !!value && typeof value == "object";
	}
	/**
	* Checks if `value` is classified as a `Symbol` primitive or object.
	*
	* @static
	* @memberOf _
	* @since 4.0.0
	* @category Lang
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
	* @example
	*
	* _.isSymbol(Symbol.iterator);
	* // => true
	*
	* _.isSymbol('abc');
	* // => false
	*/
	function isSymbol(value) {
		return typeof value == "symbol" || isObjectLike(value) && objectToString.call(value) == symbolTag;
	}
	/**
	* Checks if `value` is classified as a typed array.
	*
	* @static
	* @memberOf _
	* @since 3.0.0
	* @category Lang
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	* @example
	*
	* _.isTypedArray(new Uint8Array);
	* // => true
	*
	* _.isTypedArray([]);
	* // => false
	*/
	var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
	/**
	* Converts `value` to a string. An empty string is returned for `null`
	* and `undefined` values. The sign of `-0` is preserved.
	*
	* @static
	* @memberOf _
	* @since 4.0.0
	* @category Lang
	* @param {*} value The value to process.
	* @returns {string} Returns the string.
	* @example
	*
	* _.toString(null);
	* // => ''
	*
	* _.toString(-0);
	* // => '-0'
	*
	* _.toString([1, 2, 3]);
	* // => '1,2,3'
	*/
	function toString(value) {
		return value == null ? "" : baseToString(value);
	}
	/**
	* Gets the value at `path` of `object`. If the resolved value is
	* `undefined`, the `defaultValue` is returned in its place.
	*
	* @static
	* @memberOf _
	* @since 3.7.0
	* @category Object
	* @param {Object} object The object to query.
	* @param {Array|string} path The path of the property to get.
	* @param {*} [defaultValue] The value returned for `undefined` resolved values.
	* @returns {*} Returns the resolved value.
	* @example
	*
	* var object = { 'a': [{ 'b': { 'c': 3 } }] };
	*
	* _.get(object, 'a[0].b.c');
	* // => 3
	*
	* _.get(object, ['a', '0', 'b', 'c']);
	* // => 3
	*
	* _.get(object, 'a.b.c', 'default');
	* // => 'default'
	*/
	function get(object, path, defaultValue) {
		var result = object == null ? void 0 : baseGet(object, path);
		return result === void 0 ? defaultValue : result;
	}
	/**
	* Checks if `path` is a direct or inherited property of `object`.
	*
	* @static
	* @memberOf _
	* @since 4.0.0
	* @category Object
	* @param {Object} object The object to query.
	* @param {Array|string} path The path to check.
	* @returns {boolean} Returns `true` if `path` exists, else `false`.
	* @example
	*
	* var object = _.create({ 'a': _.create({ 'b': 2 }) });
	*
	* _.hasIn(object, 'a');
	* // => true
	*
	* _.hasIn(object, 'a.b');
	* // => true
	*
	* _.hasIn(object, ['a', 'b']);
	* // => true
	*
	* _.hasIn(object, 'b');
	* // => false
	*/
	function hasIn(object, path) {
		return object != null && hasPath(object, path, baseHasIn);
	}
	/**
	* Creates an array of the own enumerable property names of `object`.
	*
	* **Note:** Non-object values are coerced to objects. See the
	* [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	* for more details.
	*
	* @static
	* @since 0.1.0
	* @memberOf _
	* @category Object
	* @param {Object} object The object to query.
	* @returns {Array} Returns the array of property names.
	* @example
	*
	* function Foo() {
	*   this.a = 1;
	*   this.b = 2;
	* }
	*
	* Foo.prototype.c = 3;
	*
	* _.keys(new Foo);
	* // => ['a', 'b'] (iteration order is not guaranteed)
	*
	* _.keys('hi');
	* // => ['0', '1']
	*/
	function keys(object) {
		return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
	}
	/**
	* This method returns the first argument it receives.
	*
	* @static
	* @since 0.1.0
	* @memberOf _
	* @category Util
	* @param {*} value Any value.
	* @returns {*} Returns `value`.
	* @example
	*
	* var object = { 'a': 1 };
	*
	* console.log(_.identity(object) === object);
	* // => true
	*/
	function identity(value) {
		return value;
	}
	/**
	* Creates a function that returns the value at `path` of a given object.
	*
	* @static
	* @memberOf _
	* @since 2.4.0
	* @category Util
	* @param {Array|string} path The path of the property to get.
	* @returns {Function} Returns the new accessor function.
	* @example
	*
	* var objects = [
	*   { 'a': { 'b': 2 } },
	*   { 'a': { 'b': 1 } }
	* ];
	*
	* _.map(objects, _.property('a.b'));
	* // => [2, 1]
	*
	* _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
	* // => [1, 2]
	*/
	function property(path) {
		return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
	}
	module.exports = groupBy;
}));
//#endregion
//#region node_modules/@fast-csv/parse/build/src/transforms/HeaderTransformer.js
var require_HeaderTransformer = /* @__PURE__ */ __commonJSMin(((exports) => {
	var __importDefault = exports && exports.__importDefault || function(mod) {
		return mod && mod.__esModule ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.HeaderTransformer = void 0;
	var lodash_isundefined_1 = __importDefault(require_lodash_isundefined());
	var lodash_isfunction_1 = __importDefault(require_lodash_isfunction());
	var lodash_uniq_1 = __importDefault(require_lodash_uniq());
	var lodash_groupby_1 = __importDefault(require_lodash_groupby());
	var HeaderTransformer = class {
		constructor(parserOptions) {
			this.headers = null;
			this.receivedHeaders = false;
			this.shouldUseFirstRow = false;
			this.processedFirstRow = false;
			this.headersLength = 0;
			this.parserOptions = parserOptions;
			if (parserOptions.headers === true) this.shouldUseFirstRow = true;
			else if (Array.isArray(parserOptions.headers)) this.setHeaders(parserOptions.headers);
			else if (lodash_isfunction_1.default(parserOptions.headers)) this.headersTransform = parserOptions.headers;
		}
		transform(row, cb) {
			if (!this.shouldMapRow(row)) return cb(null, {
				row: null,
				isValid: true
			});
			return cb(null, this.processRow(row));
		}
		shouldMapRow(row) {
			const { parserOptions } = this;
			if (!this.headersTransform && parserOptions.renameHeaders && !this.processedFirstRow) {
				if (!this.receivedHeaders) throw new Error("Error renaming headers: new headers must be provided in an array");
				this.processedFirstRow = true;
				return false;
			}
			if (!this.receivedHeaders && Array.isArray(row)) {
				if (this.headersTransform) this.setHeaders(this.headersTransform(row));
				else if (this.shouldUseFirstRow) this.setHeaders(row);
				else return true;
				return false;
			}
			return true;
		}
		processRow(row) {
			if (!this.headers) return {
				row,
				isValid: true
			};
			const { parserOptions } = this;
			if (!parserOptions.discardUnmappedColumns && row.length > this.headersLength) {
				if (!parserOptions.strictColumnHandling) throw new Error(`Unexpected Error: column header mismatch expected: ${this.headersLength} columns got: ${row.length}`);
				return {
					row,
					isValid: false,
					reason: `Column header mismatch expected: ${this.headersLength} columns got: ${row.length}`
				};
			}
			if (parserOptions.strictColumnHandling && row.length < this.headersLength) return {
				row,
				isValid: false,
				reason: `Column header mismatch expected: ${this.headersLength} columns got: ${row.length}`
			};
			return {
				row: this.mapHeaders(row),
				isValid: true
			};
		}
		mapHeaders(row) {
			const rowMap = {};
			const { headers, headersLength } = this;
			for (let i = 0; i < headersLength; i += 1) {
				const header = headers[i];
				if (!lodash_isundefined_1.default(header)) {
					const val = row[i];
					if (lodash_isundefined_1.default(val)) rowMap[header] = "";
					else rowMap[header] = val;
				}
			}
			return rowMap;
		}
		setHeaders(headers) {
			var _a;
			const filteredHeaders = headers.filter((h) => !!h);
			if (lodash_uniq_1.default(filteredHeaders).length !== filteredHeaders.length) {
				const grouped = lodash_groupby_1.default(filteredHeaders);
				const duplicates = Object.keys(grouped).filter((dup) => grouped[dup].length > 1);
				throw new Error(`Duplicate headers found ${JSON.stringify(duplicates)}`);
			}
			this.headers = headers;
			this.receivedHeaders = true;
			this.headersLength = ((_a = this.headers) === null || _a === void 0 ? void 0 : _a.length) || 0;
		}
	};
	exports.HeaderTransformer = HeaderTransformer;
}));
//#endregion
//#region node_modules/@fast-csv/parse/build/src/transforms/index.js
var require_transforms = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.HeaderTransformer = exports.RowTransformerValidator = void 0;
	var RowTransformerValidator_1 = require_RowTransformerValidator();
	Object.defineProperty(exports, "RowTransformerValidator", {
		enumerable: true,
		get: function() {
			return RowTransformerValidator_1.RowTransformerValidator;
		}
	});
	var HeaderTransformer_1 = require_HeaderTransformer();
	Object.defineProperty(exports, "HeaderTransformer", {
		enumerable: true,
		get: function() {
			return HeaderTransformer_1.HeaderTransformer;
		}
	});
}));
//#endregion
//#region node_modules/@fast-csv/parse/build/src/parser/Token.js
var require_Token = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Token = void 0;
	var Token = class {
		constructor(tokenArgs) {
			this.token = tokenArgs.token;
			this.startCursor = tokenArgs.startCursor;
			this.endCursor = tokenArgs.endCursor;
		}
		static isTokenRowDelimiter(token) {
			const content = token.token;
			return content === "\r" || content === "\n" || content === "\r\n";
		}
		static isTokenCarriageReturn(token, parserOptions) {
			return token.token === parserOptions.carriageReturn;
		}
		static isTokenComment(token, parserOptions) {
			return parserOptions.supportsComments && !!token && token.token === parserOptions.comment;
		}
		static isTokenEscapeCharacter(token, parserOptions) {
			return token.token === parserOptions.escapeChar;
		}
		static isTokenQuote(token, parserOptions) {
			return token.token === parserOptions.quote;
		}
		static isTokenDelimiter(token, parserOptions) {
			return token.token === parserOptions.delimiter;
		}
	};
	exports.Token = Token;
}));
//#endregion
//#region node_modules/@fast-csv/parse/build/src/parser/Scanner.js
var require_Scanner = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Scanner = void 0;
	var Token_1 = require_Token();
	var ROW_DELIMITER = /((?:\r\n)|\n|\r)/;
	var Scanner = class {
		constructor(args) {
			this.cursor = 0;
			this.line = args.line;
			this.lineLength = this.line.length;
			this.parserOptions = args.parserOptions;
			this.hasMoreData = args.hasMoreData;
			this.cursor = args.cursor || 0;
		}
		get hasMoreCharacters() {
			return this.lineLength > this.cursor;
		}
		get nextNonSpaceToken() {
			const { lineFromCursor } = this;
			const regex = this.parserOptions.NEXT_TOKEN_REGEXP;
			if (lineFromCursor.search(regex) === -1) return null;
			const match = regex.exec(lineFromCursor);
			if (match == null) return null;
			const token = match[1];
			const startCursor = this.cursor + (match.index || 0);
			return new Token_1.Token({
				token,
				startCursor,
				endCursor: startCursor + token.length - 1
			});
		}
		get nextCharacterToken() {
			const { cursor, lineLength } = this;
			if (lineLength <= cursor) return null;
			return new Token_1.Token({
				token: this.line[cursor],
				startCursor: cursor,
				endCursor: cursor
			});
		}
		get lineFromCursor() {
			return this.line.substr(this.cursor);
		}
		advancePastLine() {
			const match = ROW_DELIMITER.exec(this.lineFromCursor);
			if (!match) {
				if (this.hasMoreData) return null;
				this.cursor = this.lineLength;
				return this;
			}
			this.cursor += (match.index || 0) + match[0].length;
			return this;
		}
		advanceTo(cursor) {
			this.cursor = cursor;
			return this;
		}
		advanceToToken(token) {
			this.cursor = token.startCursor;
			return this;
		}
		advancePastToken(token) {
			this.cursor = token.endCursor + 1;
			return this;
		}
		truncateToCursor() {
			this.line = this.lineFromCursor;
			this.lineLength = this.line.length;
			this.cursor = 0;
			return this;
		}
	};
	exports.Scanner = Scanner;
}));
//#endregion
//#region node_modules/@fast-csv/parse/build/src/parser/column/ColumnFormatter.js
var require_ColumnFormatter = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ColumnFormatter = void 0;
	var ColumnFormatter = class {
		constructor(parserOptions) {
			if (parserOptions.trim) this.format = (col) => col.trim();
			else if (parserOptions.ltrim) this.format = (col) => col.trimLeft();
			else if (parserOptions.rtrim) this.format = (col) => col.trimRight();
			else this.format = (col) => col;
		}
	};
	exports.ColumnFormatter = ColumnFormatter;
}));
//#endregion
//#region node_modules/@fast-csv/parse/build/src/parser/column/NonQuotedColumnParser.js
var require_NonQuotedColumnParser = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.NonQuotedColumnParser = void 0;
	var ColumnFormatter_1 = require_ColumnFormatter();
	var Token_1 = require_Token();
	var NonQuotedColumnParser = class {
		constructor(parserOptions) {
			this.parserOptions = parserOptions;
			this.columnFormatter = new ColumnFormatter_1.ColumnFormatter(parserOptions);
		}
		parse(scanner) {
			if (!scanner.hasMoreCharacters) return null;
			const { parserOptions } = this;
			const characters = [];
			let nextToken = scanner.nextCharacterToken;
			for (; nextToken; nextToken = scanner.nextCharacterToken) {
				if (Token_1.Token.isTokenDelimiter(nextToken, parserOptions) || Token_1.Token.isTokenRowDelimiter(nextToken)) break;
				characters.push(nextToken.token);
				scanner.advancePastToken(nextToken);
			}
			return this.columnFormatter.format(characters.join(""));
		}
	};
	exports.NonQuotedColumnParser = NonQuotedColumnParser;
}));
//#endregion
//#region node_modules/@fast-csv/parse/build/src/parser/column/QuotedColumnParser.js
var require_QuotedColumnParser = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.QuotedColumnParser = void 0;
	var ColumnFormatter_1 = require_ColumnFormatter();
	var Token_1 = require_Token();
	var QuotedColumnParser = class {
		constructor(parserOptions) {
			this.parserOptions = parserOptions;
			this.columnFormatter = new ColumnFormatter_1.ColumnFormatter(parserOptions);
		}
		parse(scanner) {
			if (!scanner.hasMoreCharacters) return null;
			const originalCursor = scanner.cursor;
			const { foundClosingQuote, col } = this.gatherDataBetweenQuotes(scanner);
			if (!foundClosingQuote) {
				scanner.advanceTo(originalCursor);
				if (!scanner.hasMoreData) throw new Error(`Parse Error: missing closing: '${this.parserOptions.quote || ""}' in line: at '${scanner.lineFromCursor.replace(/[\r\n]/g, "\\n'")}'`);
				return null;
			}
			this.checkForMalformedColumn(scanner);
			return col;
		}
		gatherDataBetweenQuotes(scanner) {
			const { parserOptions } = this;
			let foundStartingQuote = false;
			let foundClosingQuote = false;
			const characters = [];
			let nextToken = scanner.nextCharacterToken;
			for (; !foundClosingQuote && nextToken !== null; nextToken = scanner.nextCharacterToken) {
				const isQuote = Token_1.Token.isTokenQuote(nextToken, parserOptions);
				if (!foundStartingQuote && isQuote) foundStartingQuote = true;
				else if (foundStartingQuote) {
					if (Token_1.Token.isTokenEscapeCharacter(nextToken, parserOptions)) {
						scanner.advancePastToken(nextToken);
						const tokenFollowingEscape = scanner.nextCharacterToken;
						if (tokenFollowingEscape !== null && (Token_1.Token.isTokenQuote(tokenFollowingEscape, parserOptions) || Token_1.Token.isTokenEscapeCharacter(tokenFollowingEscape, parserOptions))) {
							characters.push(tokenFollowingEscape.token);
							nextToken = tokenFollowingEscape;
						} else if (isQuote) foundClosingQuote = true;
						else characters.push(nextToken.token);
					} else if (isQuote) foundClosingQuote = true;
					else characters.push(nextToken.token);
				}
				scanner.advancePastToken(nextToken);
			}
			return {
				col: this.columnFormatter.format(characters.join("")),
				foundClosingQuote
			};
		}
		checkForMalformedColumn(scanner) {
			const { parserOptions } = this;
			const { nextNonSpaceToken } = scanner;
			if (nextNonSpaceToken) {
				const isNextTokenADelimiter = Token_1.Token.isTokenDelimiter(nextNonSpaceToken, parserOptions);
				const isNextTokenARowDelimiter = Token_1.Token.isTokenRowDelimiter(nextNonSpaceToken);
				if (!(isNextTokenADelimiter || isNextTokenARowDelimiter)) {
					const linePreview = scanner.lineFromCursor.substr(0, 10).replace(/[\r\n]/g, "\\n'");
					throw new Error(`Parse Error: expected: '${parserOptions.escapedDelimiter}' OR new line got: '${nextNonSpaceToken.token}'. at '${linePreview}`);
				}
				scanner.advanceToToken(nextNonSpaceToken);
			} else if (!scanner.hasMoreData) scanner.advancePastLine();
		}
	};
	exports.QuotedColumnParser = QuotedColumnParser;
}));
//#endregion
//#region node_modules/@fast-csv/parse/build/src/parser/column/ColumnParser.js
var require_ColumnParser = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ColumnParser = void 0;
	var NonQuotedColumnParser_1 = require_NonQuotedColumnParser();
	var QuotedColumnParser_1 = require_QuotedColumnParser();
	var Token_1 = require_Token();
	var ColumnParser = class {
		constructor(parserOptions) {
			this.parserOptions = parserOptions;
			this.quotedColumnParser = new QuotedColumnParser_1.QuotedColumnParser(parserOptions);
			this.nonQuotedColumnParser = new NonQuotedColumnParser_1.NonQuotedColumnParser(parserOptions);
		}
		parse(scanner) {
			const { nextNonSpaceToken } = scanner;
			if (nextNonSpaceToken !== null && Token_1.Token.isTokenQuote(nextNonSpaceToken, this.parserOptions)) {
				scanner.advanceToToken(nextNonSpaceToken);
				return this.quotedColumnParser.parse(scanner);
			}
			return this.nonQuotedColumnParser.parse(scanner);
		}
	};
	exports.ColumnParser = ColumnParser;
}));
//#endregion
//#region node_modules/@fast-csv/parse/build/src/parser/column/index.js
var require_column = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ColumnFormatter = exports.QuotedColumnParser = exports.NonQuotedColumnParser = exports.ColumnParser = void 0;
	var ColumnParser_1 = require_ColumnParser();
	Object.defineProperty(exports, "ColumnParser", {
		enumerable: true,
		get: function() {
			return ColumnParser_1.ColumnParser;
		}
	});
	var NonQuotedColumnParser_1 = require_NonQuotedColumnParser();
	Object.defineProperty(exports, "NonQuotedColumnParser", {
		enumerable: true,
		get: function() {
			return NonQuotedColumnParser_1.NonQuotedColumnParser;
		}
	});
	var QuotedColumnParser_1 = require_QuotedColumnParser();
	Object.defineProperty(exports, "QuotedColumnParser", {
		enumerable: true,
		get: function() {
			return QuotedColumnParser_1.QuotedColumnParser;
		}
	});
	var ColumnFormatter_1 = require_ColumnFormatter();
	Object.defineProperty(exports, "ColumnFormatter", {
		enumerable: true,
		get: function() {
			return ColumnFormatter_1.ColumnFormatter;
		}
	});
}));
//#endregion
//#region node_modules/@fast-csv/parse/build/src/parser/RowParser.js
var require_RowParser = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.RowParser = void 0;
	var column_1 = require_column();
	var Token_1 = require_Token();
	var EMPTY_STRING = "";
	var RowParser = class {
		constructor(parserOptions) {
			this.parserOptions = parserOptions;
			this.columnParser = new column_1.ColumnParser(parserOptions);
		}
		static isEmptyRow(row) {
			return row.join(EMPTY_STRING).replace(/\s+/g, EMPTY_STRING) === EMPTY_STRING;
		}
		parse(scanner) {
			const { parserOptions } = this;
			const { hasMoreData } = scanner;
			const currentScanner = scanner;
			const columns = [];
			let currentToken = this.getStartToken(currentScanner, columns);
			while (currentToken) {
				if (Token_1.Token.isTokenRowDelimiter(currentToken)) {
					currentScanner.advancePastToken(currentToken);
					if (!currentScanner.hasMoreCharacters && Token_1.Token.isTokenCarriageReturn(currentToken, parserOptions) && hasMoreData) return null;
					currentScanner.truncateToCursor();
					return columns;
				}
				if (!this.shouldSkipColumnParse(currentScanner, currentToken, columns)) {
					const item = this.columnParser.parse(currentScanner);
					if (item === null) return null;
					columns.push(item);
				}
				currentToken = currentScanner.nextNonSpaceToken;
			}
			if (!hasMoreData) {
				currentScanner.truncateToCursor();
				return columns;
			}
			return null;
		}
		getStartToken(scanner, columns) {
			const currentToken = scanner.nextNonSpaceToken;
			if (currentToken !== null && Token_1.Token.isTokenDelimiter(currentToken, this.parserOptions)) {
				columns.push("");
				return scanner.nextNonSpaceToken;
			}
			return currentToken;
		}
		shouldSkipColumnParse(scanner, currentToken, columns) {
			const { parserOptions } = this;
			if (Token_1.Token.isTokenDelimiter(currentToken, parserOptions)) {
				scanner.advancePastToken(currentToken);
				const nextToken = scanner.nextCharacterToken;
				if (!scanner.hasMoreCharacters || nextToken !== null && Token_1.Token.isTokenRowDelimiter(nextToken)) {
					columns.push("");
					return true;
				}
				if (nextToken !== null && Token_1.Token.isTokenDelimiter(nextToken, parserOptions)) {
					columns.push("");
					return true;
				}
			}
			return false;
		}
	};
	exports.RowParser = RowParser;
}));
//#endregion
//#region node_modules/@fast-csv/parse/build/src/parser/Parser.js
var require_Parser = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Parser = void 0;
	var Scanner_1 = require_Scanner();
	var RowParser_1 = require_RowParser();
	var Token_1 = require_Token();
	exports.Parser = class Parser {
		constructor(parserOptions) {
			this.parserOptions = parserOptions;
			this.rowParser = new RowParser_1.RowParser(this.parserOptions);
		}
		static removeBOM(line) {
			if (line && line.charCodeAt(0) === 65279) return line.slice(1);
			return line;
		}
		parse(line, hasMoreData) {
			const scanner = new Scanner_1.Scanner({
				line: Parser.removeBOM(line),
				parserOptions: this.parserOptions,
				hasMoreData
			});
			if (this.parserOptions.supportsComments) return this.parseWithComments(scanner);
			return this.parseWithoutComments(scanner);
		}
		parseWithoutComments(scanner) {
			const rows = [];
			let shouldContinue = true;
			while (shouldContinue) shouldContinue = this.parseRow(scanner, rows);
			return {
				line: scanner.line,
				rows
			};
		}
		parseWithComments(scanner) {
			const { parserOptions } = this;
			const rows = [];
			for (let nextToken = scanner.nextCharacterToken; nextToken !== null; nextToken = scanner.nextCharacterToken) if (Token_1.Token.isTokenComment(nextToken, parserOptions)) {
				if (scanner.advancePastLine() === null) return {
					line: scanner.lineFromCursor,
					rows
				};
				if (!scanner.hasMoreCharacters) return {
					line: scanner.lineFromCursor,
					rows
				};
				scanner.truncateToCursor();
			} else if (!this.parseRow(scanner, rows)) break;
			return {
				line: scanner.line,
				rows
			};
		}
		parseRow(scanner, rows) {
			if (!scanner.nextNonSpaceToken) return false;
			const row = this.rowParser.parse(scanner);
			if (row === null) return false;
			if (this.parserOptions.ignoreEmpty && RowParser_1.RowParser.isEmptyRow(row)) return true;
			rows.push(row);
			return true;
		}
	};
}));
//#endregion
//#region node_modules/@fast-csv/parse/build/src/parser/index.js
var require_parser = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.QuotedColumnParser = exports.NonQuotedColumnParser = exports.ColumnParser = exports.Token = exports.Scanner = exports.RowParser = exports.Parser = void 0;
	var Parser_1 = require_Parser();
	Object.defineProperty(exports, "Parser", {
		enumerable: true,
		get: function() {
			return Parser_1.Parser;
		}
	});
	var RowParser_1 = require_RowParser();
	Object.defineProperty(exports, "RowParser", {
		enumerable: true,
		get: function() {
			return RowParser_1.RowParser;
		}
	});
	var Scanner_1 = require_Scanner();
	Object.defineProperty(exports, "Scanner", {
		enumerable: true,
		get: function() {
			return Scanner_1.Scanner;
		}
	});
	var Token_1 = require_Token();
	Object.defineProperty(exports, "Token", {
		enumerable: true,
		get: function() {
			return Token_1.Token;
		}
	});
	var column_1 = require_column();
	Object.defineProperty(exports, "ColumnParser", {
		enumerable: true,
		get: function() {
			return column_1.ColumnParser;
		}
	});
	Object.defineProperty(exports, "NonQuotedColumnParser", {
		enumerable: true,
		get: function() {
			return column_1.NonQuotedColumnParser;
		}
	});
	Object.defineProperty(exports, "QuotedColumnParser", {
		enumerable: true,
		get: function() {
			return column_1.QuotedColumnParser;
		}
	});
}));
//#endregion
//#region node_modules/@fast-csv/parse/build/src/CsvParserStream.js
var require_CsvParserStream = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.CsvParserStream = void 0;
	var string_decoder_1 = __require("string_decoder");
	var stream_1$1 = __require("stream");
	var transforms_1 = require_transforms();
	var parser_1 = require_parser();
	exports.CsvParserStream = class CsvParserStream extends stream_1$1.Transform {
		constructor(parserOptions) {
			super({ objectMode: parserOptions.objectMode });
			this.lines = "";
			this.rowCount = 0;
			this.parsedRowCount = 0;
			this.parsedLineCount = 0;
			this.endEmitted = false;
			this.headersEmitted = false;
			this.parserOptions = parserOptions;
			this.parser = new parser_1.Parser(parserOptions);
			this.headerTransformer = new transforms_1.HeaderTransformer(parserOptions);
			this.decoder = new string_decoder_1.StringDecoder(parserOptions.encoding);
			this.rowTransformerValidator = new transforms_1.RowTransformerValidator();
		}
		get hasHitRowLimit() {
			return this.parserOptions.limitRows && this.rowCount >= this.parserOptions.maxRows;
		}
		get shouldEmitRows() {
			return this.parsedRowCount > this.parserOptions.skipRows;
		}
		get shouldSkipLine() {
			return this.parsedLineCount <= this.parserOptions.skipLines;
		}
		transform(transformFunction) {
			this.rowTransformerValidator.rowTransform = transformFunction;
			return this;
		}
		validate(validateFunction) {
			this.rowTransformerValidator.rowValidator = validateFunction;
			return this;
		}
		emit(event, ...rest) {
			if (event === "end") {
				if (!this.endEmitted) {
					this.endEmitted = true;
					super.emit("end", this.rowCount);
				}
				return false;
			}
			return super.emit(event, ...rest);
		}
		_transform(data, encoding, done) {
			if (this.hasHitRowLimit) return done();
			const wrappedCallback = CsvParserStream.wrapDoneCallback(done);
			try {
				const { lines } = this;
				const newLine = lines + this.decoder.write(data);
				const rows = this.parse(newLine, true);
				return this.processRows(rows, wrappedCallback);
			} catch (e) {
				return wrappedCallback(e);
			}
		}
		_flush(done) {
			const wrappedCallback = CsvParserStream.wrapDoneCallback(done);
			if (this.hasHitRowLimit) return wrappedCallback();
			try {
				const newLine = this.lines + this.decoder.end();
				const rows = this.parse(newLine, false);
				return this.processRows(rows, wrappedCallback);
			} catch (e) {
				return wrappedCallback(e);
			}
		}
		parse(data, hasMoreData) {
			if (!data) return [];
			const { line, rows } = this.parser.parse(data, hasMoreData);
			this.lines = line;
			return rows;
		}
		processRows(rows, cb) {
			const rowsLength = rows.length;
			const iterate = (i) => {
				const callNext = (err) => {
					if (err) return cb(err);
					if (i % 100 === 0) {
						setImmediate(() => iterate(i + 1));
						return;
					}
					return iterate(i + 1);
				};
				this.checkAndEmitHeaders();
				if (i >= rowsLength || this.hasHitRowLimit) return cb();
				this.parsedLineCount += 1;
				if (this.shouldSkipLine) return callNext();
				const row = rows[i];
				this.rowCount += 1;
				this.parsedRowCount += 1;
				const nextRowCount = this.rowCount;
				return this.transformRow(row, (err, transformResult) => {
					if (err) {
						this.rowCount -= 1;
						return callNext(err);
					}
					if (!transformResult) return callNext(/* @__PURE__ */ new Error("expected transform result"));
					if (!transformResult.isValid) this.emit("data-invalid", transformResult.row, nextRowCount, transformResult.reason);
					else if (transformResult.row) return this.pushRow(transformResult.row, callNext);
					return callNext();
				});
			};
			iterate(0);
		}
		transformRow(parsedRow, cb) {
			try {
				this.headerTransformer.transform(parsedRow, (err, withHeaders) => {
					if (err) return cb(err);
					if (!withHeaders) return cb(/* @__PURE__ */ new Error("Expected result from header transform"));
					if (!withHeaders.isValid) {
						if (this.shouldEmitRows) return cb(null, {
							isValid: false,
							row: parsedRow
						});
						return this.skipRow(cb);
					}
					if (withHeaders.row) {
						if (this.shouldEmitRows) return this.rowTransformerValidator.transformAndValidate(withHeaders.row, cb);
						return this.skipRow(cb);
					}
					this.rowCount -= 1;
					this.parsedRowCount -= 1;
					return cb(null, {
						row: null,
						isValid: true
					});
				});
			} catch (e) {
				cb(e);
			}
		}
		checkAndEmitHeaders() {
			if (!this.headersEmitted && this.headerTransformer.headers) {
				this.headersEmitted = true;
				this.emit("headers", this.headerTransformer.headers);
			}
		}
		skipRow(cb) {
			this.rowCount -= 1;
			return cb(null, {
				row: null,
				isValid: true
			});
		}
		pushRow(row, cb) {
			try {
				if (!this.parserOptions.objectMode) this.push(JSON.stringify(row));
				else this.push(row);
				cb();
			} catch (e) {
				cb(e);
			}
		}
		static wrapDoneCallback(done) {
			let errorCalled = false;
			return (err, ...args) => {
				if (err) {
					if (errorCalled) throw err;
					errorCalled = true;
					done(err);
					return;
				}
				done(...args);
			};
		}
	};
}));
//#endregion
//#region node_modules/@fast-csv/parse/build/src/index.js
var require_src = /* @__PURE__ */ __commonJSMin(((exports) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		Object.defineProperty(o, k2, {
			enumerable: true,
			get: function() {
				return m[k];
			}
		});
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	}) : function(o, v) {
		o["default"] = v;
	});
	var __importStar = exports && exports.__importStar || function(mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null) {
			for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
		}
		__setModuleDefault(result, mod);
		return result;
	};
	var __exportStar = exports && exports.__exportStar || function(m, exports$1) {
		for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports$1, p)) __createBinding(exports$1, m, p);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.parseString = exports.parseFile = exports.parseStream = exports.parse = exports.ParserOptions = exports.CsvParserStream = void 0;
	var fs = __importStar(__require("fs"));
	var stream_1 = __require("stream");
	var ParserOptions_1 = require_ParserOptions();
	var CsvParserStream_1 = require_CsvParserStream();
	__exportStar(require_types(), exports);
	var CsvParserStream_2 = require_CsvParserStream();
	Object.defineProperty(exports, "CsvParserStream", {
		enumerable: true,
		get: function() {
			return CsvParserStream_2.CsvParserStream;
		}
	});
	var ParserOptions_2 = require_ParserOptions();
	Object.defineProperty(exports, "ParserOptions", {
		enumerable: true,
		get: function() {
			return ParserOptions_2.ParserOptions;
		}
	});
	exports.parse = (args) => new CsvParserStream_1.CsvParserStream(new ParserOptions_1.ParserOptions(args));
	exports.parseStream = (stream, options) => stream.pipe(new CsvParserStream_1.CsvParserStream(new ParserOptions_1.ParserOptions(options)));
	exports.parseFile = (location, options = {}) => fs.createReadStream(location).pipe(new CsvParserStream_1.CsvParserStream(new ParserOptions_1.ParserOptions(options)));
	exports.parseString = (string, options) => {
		const rs = new stream_1.Readable();
		rs.push(string);
		rs.push(null);
		return rs.pipe(new CsvParserStream_1.CsvParserStream(new ParserOptions_1.ParserOptions(options)));
	};
}));
//#endregion
export { require_src as t };
