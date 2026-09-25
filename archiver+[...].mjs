import { a as __toCommonJS, i as __require, n as __esmMin, r as __exportAll, t as __commonJSMin } from "../_runtime.mjs";
//#region node_modules/process-nextick-args/index.js
var require_process_nextick_args = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	if (typeof process === "undefined" || !process.version || process.version.indexOf("v0.") === 0 || process.version.indexOf("v1.") === 0 && process.version.indexOf("v1.8.") !== 0) module.exports = { nextTick };
	else module.exports = process;
	function nextTick(fn, arg1, arg2, arg3) {
		if (typeof fn !== "function") throw new TypeError("\"callback\" argument must be a function");
		var len = arguments.length;
		var args, i;
		switch (len) {
			case 0:
			case 1: return process.nextTick(fn);
			case 2: return process.nextTick(function afterTickOne() {
				fn.call(null, arg1);
			});
			case 3: return process.nextTick(function afterTickTwo() {
				fn.call(null, arg1, arg2);
			});
			case 4: return process.nextTick(function afterTickThree() {
				fn.call(null, arg1, arg2, arg3);
			});
			default:
				args = new Array(len - 1);
				i = 0;
				while (i < args.length) args[i++] = arguments[i];
				return process.nextTick(function afterTick() {
					fn.apply(null, args);
				});
		}
	}
}));
//#endregion
//#region node_modules/isarray/index.js
var require_isarray = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var toString = {}.toString;
	module.exports = Array.isArray || function(arr) {
		return toString.call(arr) == "[object Array]";
	};
}));
//#endregion
//#region node_modules/core-util-is/lib/util.js
var require_util$2 = /* @__PURE__ */ __commonJSMin(((exports) => {
	function isArray(arg) {
		if (Array.isArray) return Array.isArray(arg);
		return objectToString(arg) === "[object Array]";
	}
	exports.isArray = isArray;
	function isBoolean(arg) {
		return typeof arg === "boolean";
	}
	exports.isBoolean = isBoolean;
	function isNull(arg) {
		return arg === null;
	}
	exports.isNull = isNull;
	function isNullOrUndefined(arg) {
		return arg == null;
	}
	exports.isNullOrUndefined = isNullOrUndefined;
	function isNumber(arg) {
		return typeof arg === "number";
	}
	exports.isNumber = isNumber;
	function isString(arg) {
		return typeof arg === "string";
	}
	exports.isString = isString;
	function isSymbol(arg) {
		return typeof arg === "symbol";
	}
	exports.isSymbol = isSymbol;
	function isUndefined(arg) {
		return arg === void 0;
	}
	exports.isUndefined = isUndefined;
	function isRegExp(re) {
		return objectToString(re) === "[object RegExp]";
	}
	exports.isRegExp = isRegExp;
	function isObject(arg) {
		return typeof arg === "object" && arg !== null;
	}
	exports.isObject = isObject;
	function isDate(d) {
		return objectToString(d) === "[object Date]";
	}
	exports.isDate = isDate;
	function isError(e) {
		return objectToString(e) === "[object Error]" || e instanceof Error;
	}
	exports.isError = isError;
	function isFunction(arg) {
		return typeof arg === "function";
	}
	exports.isFunction = isFunction;
	function isPrimitive(arg) {
		return arg === null || typeof arg === "boolean" || typeof arg === "number" || typeof arg === "string" || typeof arg === "symbol" || typeof arg === "undefined";
	}
	exports.isPrimitive = isPrimitive;
	exports.isBuffer = __require("buffer").Buffer.isBuffer;
	function objectToString(o) {
		return Object.prototype.toString.call(o);
	}
}));
//#endregion
//#region node_modules/inherits/inherits_browser.js
var require_inherits_browser = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	if (typeof Object.create === "function") module.exports = function inherits(ctor, superCtor) {
		if (superCtor) {
			ctor.super_ = superCtor;
			ctor.prototype = Object.create(superCtor.prototype, { constructor: {
				value: ctor,
				enumerable: false,
				writable: true,
				configurable: true
			} });
		}
	};
	else module.exports = function inherits(ctor, superCtor) {
		if (superCtor) {
			ctor.super_ = superCtor;
			var TempCtor = function() {};
			TempCtor.prototype = superCtor.prototype;
			ctor.prototype = new TempCtor();
			ctor.prototype.constructor = ctor;
		}
	};
}));
//#endregion
//#region node_modules/inherits/inherits.js
var require_inherits = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	try {
		var util$6 = __require("util");
		/* istanbul ignore next */
		if (typeof util$6.inherits !== "function") throw "";
		module.exports = util$6.inherits;
	} catch (e) {
		/* istanbul ignore next */
		module.exports = require_inherits_browser();
	}
}));
//#endregion
//#region node_modules/util-deprecate/node.js
var require_node = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* For Node.js, simply re-export the core `util.deprecate` function.
	*/
	module.exports = __require("util").deprecate;
}));
//#endregion
//#region node_modules/readable-stream/lib/internal/streams/stream.js
var require_stream$2 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = __require("stream");
}));
//#endregion
//#region node_modules/readable-stream/lib/internal/streams/buffer_list.js
var require_buffer_list = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function ownKeys(object, enumerableOnly) {
		var keys = Object.keys(object);
		if (Object.getOwnPropertySymbols) {
			var symbols = Object.getOwnPropertySymbols(object);
			enumerableOnly && (symbols = symbols.filter(function(sym) {
				return Object.getOwnPropertyDescriptor(object, sym).enumerable;
			})), keys.push.apply(keys, symbols);
		}
		return keys;
	}
	function _objectSpread(target) {
		for (var i = 1; i < arguments.length; i++) {
			var source = null != arguments[i] ? arguments[i] : {};
			i % 2 ? ownKeys(Object(source), !0).forEach(function(key) {
				_defineProperty(target, key, source[key]);
			}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
				Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
			});
		}
		return target;
	}
	function _defineProperty(obj, key, value) {
		key = _toPropertyKey(key);
		if (key in obj) Object.defineProperty(obj, key, {
			value,
			enumerable: true,
			configurable: true,
			writable: true
		});
		else obj[key] = value;
		return obj;
	}
	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
	}
	function _defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];
			descriptor.enumerable = descriptor.enumerable || false;
			descriptor.configurable = true;
			if ("value" in descriptor) descriptor.writable = true;
			Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
		}
	}
	function _createClass(Constructor, protoProps, staticProps) {
		if (protoProps) _defineProperties(Constructor.prototype, protoProps);
		if (staticProps) _defineProperties(Constructor, staticProps);
		Object.defineProperty(Constructor, "prototype", { writable: false });
		return Constructor;
	}
	function _toPropertyKey(arg) {
		var key = _toPrimitive(arg, "string");
		return typeof key === "symbol" ? key : String(key);
	}
	function _toPrimitive(input, hint) {
		if (typeof input !== "object" || input === null) return input;
		var prim = input[Symbol.toPrimitive];
		if (prim !== void 0) {
			var res = prim.call(input, hint || "default");
			if (typeof res !== "object") return res;
			throw new TypeError("@@toPrimitive must return a primitive value.");
		}
		return (hint === "string" ? String : Number)(input);
	}
	var Buffer$5 = __require("buffer").Buffer;
	var inspect = __require("util").inspect;
	var custom = inspect && inspect.custom || "inspect";
	function copyBuffer(src, target, offset) {
		Buffer$5.prototype.copy.call(src, target, offset);
	}
	module.exports = /*#__PURE__*/ function() {
		function BufferList() {
			_classCallCheck(this, BufferList);
			this.head = null;
			this.tail = null;
			this.length = 0;
		}
		_createClass(BufferList, [
			{
				key: "push",
				value: function push(v) {
					var entry = {
						data: v,
						next: null
					};
					if (this.length > 0) this.tail.next = entry;
					else this.head = entry;
					this.tail = entry;
					++this.length;
				}
			},
			{
				key: "unshift",
				value: function unshift(v) {
					var entry = {
						data: v,
						next: this.head
					};
					if (this.length === 0) this.tail = entry;
					this.head = entry;
					++this.length;
				}
			},
			{
				key: "shift",
				value: function shift() {
					if (this.length === 0) return;
					var ret = this.head.data;
					if (this.length === 1) this.head = this.tail = null;
					else this.head = this.head.next;
					--this.length;
					return ret;
				}
			},
			{
				key: "clear",
				value: function clear() {
					this.head = this.tail = null;
					this.length = 0;
				}
			},
			{
				key: "join",
				value: function join(s) {
					if (this.length === 0) return "";
					var p = this.head;
					var ret = "" + p.data;
					while (p = p.next) ret += s + p.data;
					return ret;
				}
			},
			{
				key: "concat",
				value: function concat(n) {
					if (this.length === 0) return Buffer$5.alloc(0);
					var ret = Buffer$5.allocUnsafe(n >>> 0);
					var p = this.head;
					var i = 0;
					while (p) {
						copyBuffer(p.data, ret, i);
						i += p.data.length;
						p = p.next;
					}
					return ret;
				}
			},
			{
				key: "consume",
				value: function consume(n, hasStrings) {
					var ret;
					if (n < this.head.data.length) {
						ret = this.head.data.slice(0, n);
						this.head.data = this.head.data.slice(n);
					} else if (n === this.head.data.length) ret = this.shift();
					else ret = hasStrings ? this._getString(n) : this._getBuffer(n);
					return ret;
				}
			},
			{
				key: "first",
				value: function first() {
					return this.head.data;
				}
			},
			{
				key: "_getString",
				value: function _getString(n) {
					var p = this.head;
					var c = 1;
					var ret = p.data;
					n -= ret.length;
					while (p = p.next) {
						var str = p.data;
						var nb = n > str.length ? str.length : n;
						if (nb === str.length) ret += str;
						else ret += str.slice(0, n);
						n -= nb;
						if (n === 0) {
							if (nb === str.length) {
								++c;
								if (p.next) this.head = p.next;
								else this.head = this.tail = null;
							} else {
								this.head = p;
								p.data = str.slice(nb);
							}
							break;
						}
						++c;
					}
					this.length -= c;
					return ret;
				}
			},
			{
				key: "_getBuffer",
				value: function _getBuffer(n) {
					var ret = Buffer$5.allocUnsafe(n);
					var p = this.head;
					var c = 1;
					p.data.copy(ret);
					n -= p.data.length;
					while (p = p.next) {
						var buf = p.data;
						var nb = n > buf.length ? buf.length : n;
						buf.copy(ret, ret.length - n, 0, nb);
						n -= nb;
						if (n === 0) {
							if (nb === buf.length) {
								++c;
								if (p.next) this.head = p.next;
								else this.head = this.tail = null;
							} else {
								this.head = p;
								p.data = buf.slice(nb);
							}
							break;
						}
						++c;
					}
					this.length -= c;
					return ret;
				}
			},
			{
				key: custom,
				value: function value(_, options) {
					return inspect(this, _objectSpread(_objectSpread({}, options), {}, {
						depth: 0,
						customInspect: false
					}));
				}
			}
		]);
		return BufferList;
	}();
}));
//#endregion
//#region node_modules/readable-stream/lib/internal/streams/destroy.js
var require_destroy$2 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function destroy(err, cb) {
		var _this = this;
		var readableDestroyed = this._readableState && this._readableState.destroyed;
		var writableDestroyed = this._writableState && this._writableState.destroyed;
		if (readableDestroyed || writableDestroyed) {
			if (cb) cb(err);
			else if (err) {
				if (!this._writableState) process.nextTick(emitErrorNT, this, err);
				else if (!this._writableState.errorEmitted) {
					this._writableState.errorEmitted = true;
					process.nextTick(emitErrorNT, this, err);
				}
			}
			return this;
		}
		if (this._readableState) this._readableState.destroyed = true;
		if (this._writableState) this._writableState.destroyed = true;
		this._destroy(err || null, function(err) {
			if (!cb && err) {
				if (!_this._writableState) process.nextTick(emitErrorAndCloseNT, _this, err);
				else if (!_this._writableState.errorEmitted) {
					_this._writableState.errorEmitted = true;
					process.nextTick(emitErrorAndCloseNT, _this, err);
				} else process.nextTick(emitCloseNT, _this);
			} else if (cb) {
				process.nextTick(emitCloseNT, _this);
				cb(err);
			} else process.nextTick(emitCloseNT, _this);
		});
		return this;
	}
	function emitErrorAndCloseNT(self, err) {
		emitErrorNT(self, err);
		emitCloseNT(self);
	}
	function emitCloseNT(self) {
		if (self._writableState && !self._writableState.emitClose) return;
		if (self._readableState && !self._readableState.emitClose) return;
		self.emit("close");
	}
	function undestroy() {
		if (this._readableState) {
			this._readableState.destroyed = false;
			this._readableState.reading = false;
			this._readableState.ended = false;
			this._readableState.endEmitted = false;
		}
		if (this._writableState) {
			this._writableState.destroyed = false;
			this._writableState.ended = false;
			this._writableState.ending = false;
			this._writableState.finalCalled = false;
			this._writableState.prefinished = false;
			this._writableState.finished = false;
			this._writableState.errorEmitted = false;
		}
	}
	function emitErrorNT(self, err) {
		self.emit("error", err);
	}
	function errorOrDestroy(stream, err) {
		var rState = stream._readableState;
		var wState = stream._writableState;
		if (rState && rState.autoDestroy || wState && wState.autoDestroy) stream.destroy(err);
		else stream.emit("error", err);
	}
	module.exports = {
		destroy,
		undestroy,
		errorOrDestroy
	};
}));
//#endregion
//#region node_modules/readable-stream/errors.js
var require_errors = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var codes = {};
	function createErrorType(code, message, Base) {
		if (!Base) Base = Error;
		function getMessage(arg1, arg2, arg3) {
			if (typeof message === "string") return message;
			else return message(arg1, arg2, arg3);
		}
		class NodeError extends Base {
			constructor(arg1, arg2, arg3) {
				super(getMessage(arg1, arg2, arg3));
			}
		}
		NodeError.prototype.name = Base.name;
		NodeError.prototype.code = code;
		codes[code] = NodeError;
	}
	function oneOf(expected, thing) {
		if (Array.isArray(expected)) {
			const len = expected.length;
			expected = expected.map((i) => String(i));
			if (len > 2) return `one of ${thing} ${expected.slice(0, len - 1).join(", ")}, or ` + expected[len - 1];
			else if (len === 2) return `one of ${thing} ${expected[0]} or ${expected[1]}`;
			else return `of ${thing} ${expected[0]}`;
		} else return `of ${thing} ${String(expected)}`;
	}
	function startsWith(str, search, pos) {
		return str.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
	}
	function endsWith(str, search, this_len) {
		if (this_len === void 0 || this_len > str.length) this_len = str.length;
		return str.substring(this_len - search.length, this_len) === search;
	}
	function includes(str, search, start) {
		if (typeof start !== "number") start = 0;
		if (start + search.length > str.length) return false;
		else return str.indexOf(search, start) !== -1;
	}
	createErrorType("ERR_INVALID_OPT_VALUE", function(name, value) {
		return "The value \"" + value + "\" is invalid for option \"" + name + "\"";
	}, TypeError);
	createErrorType("ERR_INVALID_ARG_TYPE", function(name, expected, actual) {
		let determiner;
		if (typeof expected === "string" && startsWith(expected, "not ")) {
			determiner = "must not be";
			expected = expected.replace(/^not /, "");
		} else determiner = "must be";
		let msg;
		if (endsWith(name, " argument")) msg = `The ${name} ${determiner} ${oneOf(expected, "type")}`;
		else msg = `The "${name}" ${includes(name, ".") ? "property" : "argument"} ${determiner} ${oneOf(expected, "type")}`;
		msg += `. Received type ${typeof actual}`;
		return msg;
	}, TypeError);
	createErrorType("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF");
	createErrorType("ERR_METHOD_NOT_IMPLEMENTED", function(name) {
		return "The " + name + " method is not implemented";
	});
	createErrorType("ERR_STREAM_PREMATURE_CLOSE", "Premature close");
	createErrorType("ERR_STREAM_DESTROYED", function(name) {
		return "Cannot call " + name + " after a stream was destroyed";
	});
	createErrorType("ERR_MULTIPLE_CALLBACK", "Callback called multiple times");
	createErrorType("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable");
	createErrorType("ERR_STREAM_WRITE_AFTER_END", "write after end");
	createErrorType("ERR_STREAM_NULL_VALUES", "May not write null values to stream", TypeError);
	createErrorType("ERR_UNKNOWN_ENCODING", function(arg) {
		return "Unknown encoding: " + arg;
	}, TypeError);
	createErrorType("ERR_STREAM_UNSHIFT_AFTER_END_EVENT", "stream.unshift() after end event");
	module.exports.codes = codes;
}));
//#endregion
//#region node_modules/readable-stream/lib/internal/streams/state.js
var require_state = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var ERR_INVALID_OPT_VALUE = require_errors().codes.ERR_INVALID_OPT_VALUE;
	function highWaterMarkFrom(options, isDuplex, duplexKey) {
		return options.highWaterMark != null ? options.highWaterMark : isDuplex ? options[duplexKey] : null;
	}
	function getHighWaterMark(state, options, duplexKey, isDuplex) {
		var hwm = highWaterMarkFrom(options, isDuplex, duplexKey);
		if (hwm != null) {
			if (!(isFinite(hwm) && Math.floor(hwm) === hwm) || hwm < 0) throw new ERR_INVALID_OPT_VALUE(isDuplex ? duplexKey : "highWaterMark", hwm);
			return Math.floor(hwm);
		}
		return state.objectMode ? 16 : 16384;
	}
	module.exports = { getHighWaterMark };
}));
//#endregion
//#region node_modules/readable-stream/lib/_stream_writable.js
var require__stream_writable$2 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = Writable;
	function CorkedRequest(state) {
		var _this = this;
		this.next = null;
		this.entry = null;
		this.finish = function() {
			onCorkedFinish(_this, state);
		};
	}
	var Duplex;
	Writable.WritableState = WritableState;
	var internalUtil = { deprecate: require_node() };
	var Stream = require_stream$2();
	var Buffer$4 = __require("buffer").Buffer;
	var OurUint8Array = (typeof global !== "undefined" ? global : typeof window !== "undefined" ? window : typeof self !== "undefined" ? self : {}).Uint8Array || function() {};
	function _uint8ArrayToBuffer(chunk) {
		return Buffer$4.from(chunk);
	}
	function _isUint8Array(obj) {
		return Buffer$4.isBuffer(obj) || obj instanceof OurUint8Array;
	}
	var destroyImpl = require_destroy$2();
	var getHighWaterMark = require_state().getHighWaterMark;
	var _require$codes = require_errors().codes;
	var ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE;
	var ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED;
	var ERR_MULTIPLE_CALLBACK = _require$codes.ERR_MULTIPLE_CALLBACK;
	var ERR_STREAM_CANNOT_PIPE = _require$codes.ERR_STREAM_CANNOT_PIPE;
	var ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED;
	var ERR_STREAM_NULL_VALUES = _require$codes.ERR_STREAM_NULL_VALUES;
	var ERR_STREAM_WRITE_AFTER_END = _require$codes.ERR_STREAM_WRITE_AFTER_END;
	var ERR_UNKNOWN_ENCODING = _require$codes.ERR_UNKNOWN_ENCODING;
	var errorOrDestroy = destroyImpl.errorOrDestroy;
	require_inherits()(Writable, Stream);
	function nop() {}
	function WritableState(options, stream, isDuplex) {
		Duplex = Duplex || require__stream_duplex$2();
		options = options || {};
		if (typeof isDuplex !== "boolean") isDuplex = stream instanceof Duplex;
		this.objectMode = !!options.objectMode;
		if (isDuplex) this.objectMode = this.objectMode || !!options.writableObjectMode;
		this.highWaterMark = getHighWaterMark(this, options, "writableHighWaterMark", isDuplex);
		this.finalCalled = false;
		this.needDrain = false;
		this.ending = false;
		this.ended = false;
		this.finished = false;
		this.destroyed = false;
		var noDecode = options.decodeStrings === false;
		this.decodeStrings = !noDecode;
		this.defaultEncoding = options.defaultEncoding || "utf8";
		this.length = 0;
		this.writing = false;
		this.corked = 0;
		this.sync = true;
		this.bufferProcessing = false;
		this.onwrite = function(er) {
			onwrite(stream, er);
		};
		this.writecb = null;
		this.writelen = 0;
		this.bufferedRequest = null;
		this.lastBufferedRequest = null;
		this.pendingcb = 0;
		this.prefinished = false;
		this.errorEmitted = false;
		this.emitClose = options.emitClose !== false;
		this.autoDestroy = !!options.autoDestroy;
		this.bufferedRequestCount = 0;
		this.corkedRequestsFree = new CorkedRequest(this);
	}
	WritableState.prototype.getBuffer = function getBuffer() {
		var current = this.bufferedRequest;
		var out = [];
		while (current) {
			out.push(current);
			current = current.next;
		}
		return out;
	};
	(function() {
		try {
			Object.defineProperty(WritableState.prototype, "buffer", { get: internalUtil.deprecate(function writableStateBufferGetter() {
				return this.getBuffer();
			}, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003") });
		} catch (_) {}
	})();
	var realHasInstance;
	if (typeof Symbol === "function" && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === "function") {
		realHasInstance = Function.prototype[Symbol.hasInstance];
		Object.defineProperty(Writable, Symbol.hasInstance, { value: function value(object) {
			if (realHasInstance.call(this, object)) return true;
			if (this !== Writable) return false;
			return object && object._writableState instanceof WritableState;
		} });
	} else realHasInstance = function realHasInstance(object) {
		return object instanceof this;
	};
	function Writable(options) {
		Duplex = Duplex || require__stream_duplex$2();
		var isDuplex = this instanceof Duplex;
		if (!isDuplex && !realHasInstance.call(Writable, this)) return new Writable(options);
		this._writableState = new WritableState(options, this, isDuplex);
		this.writable = true;
		if (options) {
			if (typeof options.write === "function") this._write = options.write;
			if (typeof options.writev === "function") this._writev = options.writev;
			if (typeof options.destroy === "function") this._destroy = options.destroy;
			if (typeof options.final === "function") this._final = options.final;
		}
		Stream.call(this);
	}
	Writable.prototype.pipe = function() {
		errorOrDestroy(this, new ERR_STREAM_CANNOT_PIPE());
	};
	function writeAfterEnd(stream, cb) {
		var er = new ERR_STREAM_WRITE_AFTER_END();
		errorOrDestroy(stream, er);
		process.nextTick(cb, er);
	}
	function validChunk(stream, state, chunk, cb) {
		var er;
		if (chunk === null) er = new ERR_STREAM_NULL_VALUES();
		else if (typeof chunk !== "string" && !state.objectMode) er = new ERR_INVALID_ARG_TYPE("chunk", ["string", "Buffer"], chunk);
		if (er) {
			errorOrDestroy(stream, er);
			process.nextTick(cb, er);
			return false;
		}
		return true;
	}
	Writable.prototype.write = function(chunk, encoding, cb) {
		var state = this._writableState;
		var ret = false;
		var isBuf = !state.objectMode && _isUint8Array(chunk);
		if (isBuf && !Buffer$4.isBuffer(chunk)) chunk = _uint8ArrayToBuffer(chunk);
		if (typeof encoding === "function") {
			cb = encoding;
			encoding = null;
		}
		if (isBuf) encoding = "buffer";
		else if (!encoding) encoding = state.defaultEncoding;
		if (typeof cb !== "function") cb = nop;
		if (state.ending) writeAfterEnd(this, cb);
		else if (isBuf || validChunk(this, state, chunk, cb)) {
			state.pendingcb++;
			ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
		}
		return ret;
	};
	Writable.prototype.cork = function() {
		this._writableState.corked++;
	};
	Writable.prototype.uncork = function() {
		var state = this._writableState;
		if (state.corked) {
			state.corked--;
			if (!state.writing && !state.corked && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
		}
	};
	Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
		if (typeof encoding === "string") encoding = encoding.toLowerCase();
		if (!([
			"hex",
			"utf8",
			"utf-8",
			"ascii",
			"binary",
			"base64",
			"ucs2",
			"ucs-2",
			"utf16le",
			"utf-16le",
			"raw"
		].indexOf((encoding + "").toLowerCase()) > -1)) throw new ERR_UNKNOWN_ENCODING(encoding);
		this._writableState.defaultEncoding = encoding;
		return this;
	};
	Object.defineProperty(Writable.prototype, "writableBuffer", {
		enumerable: false,
		get: function get() {
			return this._writableState && this._writableState.getBuffer();
		}
	});
	function decodeChunk(state, chunk, encoding) {
		if (!state.objectMode && state.decodeStrings !== false && typeof chunk === "string") chunk = Buffer$4.from(chunk, encoding);
		return chunk;
	}
	Object.defineProperty(Writable.prototype, "writableHighWaterMark", {
		enumerable: false,
		get: function get() {
			return this._writableState.highWaterMark;
		}
	});
	function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
		if (!isBuf) {
			var newChunk = decodeChunk(state, chunk, encoding);
			if (chunk !== newChunk) {
				isBuf = true;
				encoding = "buffer";
				chunk = newChunk;
			}
		}
		var len = state.objectMode ? 1 : chunk.length;
		state.length += len;
		var ret = state.length < state.highWaterMark;
		if (!ret) state.needDrain = true;
		if (state.writing || state.corked) {
			var last = state.lastBufferedRequest;
			state.lastBufferedRequest = {
				chunk,
				encoding,
				isBuf,
				callback: cb,
				next: null
			};
			if (last) last.next = state.lastBufferedRequest;
			else state.bufferedRequest = state.lastBufferedRequest;
			state.bufferedRequestCount += 1;
		} else doWrite(stream, state, false, len, chunk, encoding, cb);
		return ret;
	}
	function doWrite(stream, state, writev, len, chunk, encoding, cb) {
		state.writelen = len;
		state.writecb = cb;
		state.writing = true;
		state.sync = true;
		if (state.destroyed) state.onwrite(new ERR_STREAM_DESTROYED("write"));
		else if (writev) stream._writev(chunk, state.onwrite);
		else stream._write(chunk, encoding, state.onwrite);
		state.sync = false;
	}
	function onwriteError(stream, state, sync, er, cb) {
		--state.pendingcb;
		if (sync) {
			process.nextTick(cb, er);
			process.nextTick(finishMaybe, stream, state);
			stream._writableState.errorEmitted = true;
			errorOrDestroy(stream, er);
		} else {
			cb(er);
			stream._writableState.errorEmitted = true;
			errorOrDestroy(stream, er);
			finishMaybe(stream, state);
		}
	}
	function onwriteStateUpdate(state) {
		state.writing = false;
		state.writecb = null;
		state.length -= state.writelen;
		state.writelen = 0;
	}
	function onwrite(stream, er) {
		var state = stream._writableState;
		var sync = state.sync;
		var cb = state.writecb;
		if (typeof cb !== "function") throw new ERR_MULTIPLE_CALLBACK();
		onwriteStateUpdate(state);
		if (er) onwriteError(stream, state, sync, er, cb);
		else {
			var finished = needFinish(state) || stream.destroyed;
			if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) clearBuffer(stream, state);
			if (sync) process.nextTick(afterWrite, stream, state, finished, cb);
			else afterWrite(stream, state, finished, cb);
		}
	}
	function afterWrite(stream, state, finished, cb) {
		if (!finished) onwriteDrain(stream, state);
		state.pendingcb--;
		cb();
		finishMaybe(stream, state);
	}
	function onwriteDrain(stream, state) {
		if (state.length === 0 && state.needDrain) {
			state.needDrain = false;
			stream.emit("drain");
		}
	}
	function clearBuffer(stream, state) {
		state.bufferProcessing = true;
		var entry = state.bufferedRequest;
		if (stream._writev && entry && entry.next) {
			var l = state.bufferedRequestCount;
			var buffer = new Array(l);
			var holder = state.corkedRequestsFree;
			holder.entry = entry;
			var count = 0;
			var allBuffers = true;
			while (entry) {
				buffer[count] = entry;
				if (!entry.isBuf) allBuffers = false;
				entry = entry.next;
				count += 1;
			}
			buffer.allBuffers = allBuffers;
			doWrite(stream, state, true, state.length, buffer, "", holder.finish);
			state.pendingcb++;
			state.lastBufferedRequest = null;
			if (holder.next) {
				state.corkedRequestsFree = holder.next;
				holder.next = null;
			} else state.corkedRequestsFree = new CorkedRequest(state);
			state.bufferedRequestCount = 0;
		} else {
			while (entry) {
				var chunk = entry.chunk;
				var encoding = entry.encoding;
				var cb = entry.callback;
				doWrite(stream, state, false, state.objectMode ? 1 : chunk.length, chunk, encoding, cb);
				entry = entry.next;
				state.bufferedRequestCount--;
				if (state.writing) break;
			}
			if (entry === null) state.lastBufferedRequest = null;
		}
		state.bufferedRequest = entry;
		state.bufferProcessing = false;
	}
	Writable.prototype._write = function(chunk, encoding, cb) {
		cb(new ERR_METHOD_NOT_IMPLEMENTED("_write()"));
	};
	Writable.prototype._writev = null;
	Writable.prototype.end = function(chunk, encoding, cb) {
		var state = this._writableState;
		if (typeof chunk === "function") {
			cb = chunk;
			chunk = null;
			encoding = null;
		} else if (typeof encoding === "function") {
			cb = encoding;
			encoding = null;
		}
		if (chunk !== null && chunk !== void 0) this.write(chunk, encoding);
		if (state.corked) {
			state.corked = 1;
			this.uncork();
		}
		if (!state.ending) endWritable(this, state, cb);
		return this;
	};
	Object.defineProperty(Writable.prototype, "writableLength", {
		enumerable: false,
		get: function get() {
			return this._writableState.length;
		}
	});
	function needFinish(state) {
		return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
	}
	function callFinal(stream, state) {
		stream._final(function(err) {
			state.pendingcb--;
			if (err) errorOrDestroy(stream, err);
			state.prefinished = true;
			stream.emit("prefinish");
			finishMaybe(stream, state);
		});
	}
	function prefinish(stream, state) {
		if (!state.prefinished && !state.finalCalled) {
			if (typeof stream._final === "function" && !state.destroyed) {
				state.pendingcb++;
				state.finalCalled = true;
				process.nextTick(callFinal, stream, state);
			} else {
				state.prefinished = true;
				stream.emit("prefinish");
			}
		}
	}
	function finishMaybe(stream, state) {
		var need = needFinish(state);
		if (need) {
			prefinish(stream, state);
			if (state.pendingcb === 0) {
				state.finished = true;
				stream.emit("finish");
				if (state.autoDestroy) {
					var rState = stream._readableState;
					if (!rState || rState.autoDestroy && rState.endEmitted) stream.destroy();
				}
			}
		}
		return need;
	}
	function endWritable(stream, state, cb) {
		state.ending = true;
		finishMaybe(stream, state);
		if (cb) {
			if (state.finished) process.nextTick(cb);
			else stream.once("finish", cb);
		}
		state.ended = true;
		stream.writable = false;
	}
	function onCorkedFinish(corkReq, state, err) {
		var entry = corkReq.entry;
		corkReq.entry = null;
		while (entry) {
			var cb = entry.callback;
			state.pendingcb--;
			cb(err);
			entry = entry.next;
		}
		state.corkedRequestsFree.next = corkReq;
	}
	Object.defineProperty(Writable.prototype, "destroyed", {
		enumerable: false,
		get: function get() {
			if (this._writableState === void 0) return false;
			return this._writableState.destroyed;
		},
		set: function set(value) {
			if (!this._writableState) return;
			this._writableState.destroyed = value;
		}
	});
	Writable.prototype.destroy = destroyImpl.destroy;
	Writable.prototype._undestroy = destroyImpl.undestroy;
	Writable.prototype._destroy = function(err, cb) {
		cb(err);
	};
}));
//#endregion
//#region node_modules/readable-stream/lib/_stream_duplex.js
var require__stream_duplex$2 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var objectKeys = Object.keys || function(obj) {
		var keys = [];
		for (var key in obj) keys.push(key);
		return keys;
	};
	module.exports = Duplex;
	var Readable = require__stream_readable$2();
	var Writable = require__stream_writable$2();
	require_inherits()(Duplex, Readable);
	var keys = objectKeys(Writable.prototype);
	for (var v = 0; v < keys.length; v++) {
		var method = keys[v];
		if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
	}
	function Duplex(options) {
		if (!(this instanceof Duplex)) return new Duplex(options);
		Readable.call(this, options);
		Writable.call(this, options);
		this.allowHalfOpen = true;
		if (options) {
			if (options.readable === false) this.readable = false;
			if (options.writable === false) this.writable = false;
			if (options.allowHalfOpen === false) {
				this.allowHalfOpen = false;
				this.once("end", onend);
			}
		}
	}
	Object.defineProperty(Duplex.prototype, "writableHighWaterMark", {
		enumerable: false,
		get: function get() {
			return this._writableState.highWaterMark;
		}
	});
	Object.defineProperty(Duplex.prototype, "writableBuffer", {
		enumerable: false,
		get: function get() {
			return this._writableState && this._writableState.getBuffer();
		}
	});
	Object.defineProperty(Duplex.prototype, "writableLength", {
		enumerable: false,
		get: function get() {
			return this._writableState.length;
		}
	});
	function onend() {
		if (this._writableState.ended) return;
		process.nextTick(onEndNT, this);
	}
	function onEndNT(self) {
		self.end();
	}
	Object.defineProperty(Duplex.prototype, "destroyed", {
		enumerable: false,
		get: function get() {
			if (this._readableState === void 0 || this._writableState === void 0) return false;
			return this._readableState.destroyed && this._writableState.destroyed;
		},
		set: function set(value) {
			if (this._readableState === void 0 || this._writableState === void 0) return;
			this._readableState.destroyed = value;
			this._writableState.destroyed = value;
		}
	});
}));
//#endregion
//#region node_modules/readable-stream/lib/internal/streams/end-of-stream.js
var require_end_of_stream$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var ERR_STREAM_PREMATURE_CLOSE = require_errors().codes.ERR_STREAM_PREMATURE_CLOSE;
	function once(callback) {
		var called = false;
		return function() {
			if (called) return;
			called = true;
			for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
			callback.apply(this, args);
		};
	}
	function noop() {}
	function isRequest(stream) {
		return stream.setHeader && typeof stream.abort === "function";
	}
	function eos(stream, opts, callback) {
		if (typeof opts === "function") return eos(stream, null, opts);
		if (!opts) opts = {};
		callback = once(callback || noop);
		var readable = opts.readable || opts.readable !== false && stream.readable;
		var writable = opts.writable || opts.writable !== false && stream.writable;
		var onlegacyfinish = function onlegacyfinish() {
			if (!stream.writable) onfinish();
		};
		var writableEnded = stream._writableState && stream._writableState.finished;
		var onfinish = function onfinish() {
			writable = false;
			writableEnded = true;
			if (!readable) callback.call(stream);
		};
		var readableEnded = stream._readableState && stream._readableState.endEmitted;
		var onend = function onend() {
			readable = false;
			readableEnded = true;
			if (!writable) callback.call(stream);
		};
		var onerror = function onerror(err) {
			callback.call(stream, err);
		};
		var onclose = function onclose() {
			var err;
			if (readable && !readableEnded) {
				if (!stream._readableState || !stream._readableState.ended) err = new ERR_STREAM_PREMATURE_CLOSE();
				return callback.call(stream, err);
			}
			if (writable && !writableEnded) {
				if (!stream._writableState || !stream._writableState.ended) err = new ERR_STREAM_PREMATURE_CLOSE();
				return callback.call(stream, err);
			}
		};
		var onrequest = function onrequest() {
			stream.req.on("finish", onfinish);
		};
		if (isRequest(stream)) {
			stream.on("complete", onfinish);
			stream.on("abort", onclose);
			if (stream.req) onrequest();
			else stream.on("request", onrequest);
		} else if (writable && !stream._writableState) {
			stream.on("end", onlegacyfinish);
			stream.on("close", onlegacyfinish);
		}
		stream.on("end", onend);
		stream.on("finish", onfinish);
		if (opts.error !== false) stream.on("error", onerror);
		stream.on("close", onclose);
		return function() {
			stream.removeListener("complete", onfinish);
			stream.removeListener("abort", onclose);
			stream.removeListener("request", onrequest);
			if (stream.req) stream.req.removeListener("finish", onfinish);
			stream.removeListener("end", onlegacyfinish);
			stream.removeListener("close", onlegacyfinish);
			stream.removeListener("finish", onfinish);
			stream.removeListener("end", onend);
			stream.removeListener("error", onerror);
			stream.removeListener("close", onclose);
		};
	}
	module.exports = eos;
}));
//#endregion
//#region node_modules/readable-stream/lib/internal/streams/async_iterator.js
var require_async_iterator = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var _Object$setPrototypeO;
	function _defineProperty(obj, key, value) {
		key = _toPropertyKey(key);
		if (key in obj) Object.defineProperty(obj, key, {
			value,
			enumerable: true,
			configurable: true,
			writable: true
		});
		else obj[key] = value;
		return obj;
	}
	function _toPropertyKey(arg) {
		var key = _toPrimitive(arg, "string");
		return typeof key === "symbol" ? key : String(key);
	}
	function _toPrimitive(input, hint) {
		if (typeof input !== "object" || input === null) return input;
		var prim = input[Symbol.toPrimitive];
		if (prim !== void 0) {
			var res = prim.call(input, hint || "default");
			if (typeof res !== "object") return res;
			throw new TypeError("@@toPrimitive must return a primitive value.");
		}
		return (hint === "string" ? String : Number)(input);
	}
	var finished = require_end_of_stream$1();
	var kLastResolve = Symbol("lastResolve");
	var kLastReject = Symbol("lastReject");
	var kError = Symbol("error");
	var kEnded = Symbol("ended");
	var kLastPromise = Symbol("lastPromise");
	var kHandlePromise = Symbol("handlePromise");
	var kStream = Symbol("stream");
	function createIterResult(value, done) {
		return {
			value,
			done
		};
	}
	function readAndResolve(iter) {
		var resolve = iter[kLastResolve];
		if (resolve !== null) {
			var data = iter[kStream].read();
			if (data !== null) {
				iter[kLastPromise] = null;
				iter[kLastResolve] = null;
				iter[kLastReject] = null;
				resolve(createIterResult(data, false));
			}
		}
	}
	function onReadable(iter) {
		process.nextTick(readAndResolve, iter);
	}
	function wrapForNext(lastPromise, iter) {
		return function(resolve, reject) {
			lastPromise.then(function() {
				if (iter[kEnded]) {
					resolve(createIterResult(void 0, true));
					return;
				}
				iter[kHandlePromise](resolve, reject);
			}, reject);
		};
	}
	var AsyncIteratorPrototype = Object.getPrototypeOf(function() {});
	var ReadableStreamAsyncIteratorPrototype = Object.setPrototypeOf((_Object$setPrototypeO = {
		get stream() {
			return this[kStream];
		},
		next: function next() {
			var _this = this;
			var error = this[kError];
			if (error !== null) return Promise.reject(error);
			if (this[kEnded]) return Promise.resolve(createIterResult(void 0, true));
			if (this[kStream].destroyed) return new Promise(function(resolve, reject) {
				process.nextTick(function() {
					if (_this[kError]) reject(_this[kError]);
					else resolve(createIterResult(void 0, true));
				});
			});
			var lastPromise = this[kLastPromise];
			var promise;
			if (lastPromise) promise = new Promise(wrapForNext(lastPromise, this));
			else {
				var data = this[kStream].read();
				if (data !== null) return Promise.resolve(createIterResult(data, false));
				promise = new Promise(this[kHandlePromise]);
			}
			this[kLastPromise] = promise;
			return promise;
		}
	}, _defineProperty(_Object$setPrototypeO, Symbol.asyncIterator, function() {
		return this;
	}), _defineProperty(_Object$setPrototypeO, "return", function _return() {
		var _this2 = this;
		return new Promise(function(resolve, reject) {
			_this2[kStream].destroy(null, function(err) {
				if (err) {
					reject(err);
					return;
				}
				resolve(createIterResult(void 0, true));
			});
		});
	}), _Object$setPrototypeO), AsyncIteratorPrototype);
	module.exports = function createReadableStreamAsyncIterator(stream) {
		var _Object$create;
		var iterator = Object.create(ReadableStreamAsyncIteratorPrototype, (_Object$create = {}, _defineProperty(_Object$create, kStream, {
			value: stream,
			writable: true
		}), _defineProperty(_Object$create, kLastResolve, {
			value: null,
			writable: true
		}), _defineProperty(_Object$create, kLastReject, {
			value: null,
			writable: true
		}), _defineProperty(_Object$create, kError, {
			value: null,
			writable: true
		}), _defineProperty(_Object$create, kEnded, {
			value: stream._readableState.endEmitted,
			writable: true
		}), _defineProperty(_Object$create, kHandlePromise, {
			value: function value(resolve, reject) {
				var data = iterator[kStream].read();
				if (data) {
					iterator[kLastPromise] = null;
					iterator[kLastResolve] = null;
					iterator[kLastReject] = null;
					resolve(createIterResult(data, false));
				} else {
					iterator[kLastResolve] = resolve;
					iterator[kLastReject] = reject;
				}
			},
			writable: true
		}), _Object$create));
		iterator[kLastPromise] = null;
		finished(stream, function(err) {
			if (err && err.code !== "ERR_STREAM_PREMATURE_CLOSE") {
				var reject = iterator[kLastReject];
				if (reject !== null) {
					iterator[kLastPromise] = null;
					iterator[kLastResolve] = null;
					iterator[kLastReject] = null;
					reject(err);
				}
				iterator[kError] = err;
				return;
			}
			var resolve = iterator[kLastResolve];
			if (resolve !== null) {
				iterator[kLastPromise] = null;
				iterator[kLastResolve] = null;
				iterator[kLastReject] = null;
				resolve(createIterResult(void 0, true));
			}
			iterator[kEnded] = true;
		});
		stream.on("readable", onReadable.bind(null, iterator));
		return iterator;
	};
}));
//#endregion
//#region node_modules/readable-stream/lib/internal/streams/from.js
var require_from = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
		try {
			var info = gen[key](arg);
			var value = info.value;
		} catch (error) {
			reject(error);
			return;
		}
		if (info.done) resolve(value);
		else Promise.resolve(value).then(_next, _throw);
	}
	function _asyncToGenerator(fn) {
		return function() {
			var self = this, args = arguments;
			return new Promise(function(resolve, reject) {
				var gen = fn.apply(self, args);
				function _next(value) {
					asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
				}
				function _throw(err) {
					asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
				}
				_next(void 0);
			});
		};
	}
	function ownKeys(object, enumerableOnly) {
		var keys = Object.keys(object);
		if (Object.getOwnPropertySymbols) {
			var symbols = Object.getOwnPropertySymbols(object);
			enumerableOnly && (symbols = symbols.filter(function(sym) {
				return Object.getOwnPropertyDescriptor(object, sym).enumerable;
			})), keys.push.apply(keys, symbols);
		}
		return keys;
	}
	function _objectSpread(target) {
		for (var i = 1; i < arguments.length; i++) {
			var source = null != arguments[i] ? arguments[i] : {};
			i % 2 ? ownKeys(Object(source), !0).forEach(function(key) {
				_defineProperty(target, key, source[key]);
			}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
				Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
			});
		}
		return target;
	}
	function _defineProperty(obj, key, value) {
		key = _toPropertyKey(key);
		if (key in obj) Object.defineProperty(obj, key, {
			value,
			enumerable: true,
			configurable: true,
			writable: true
		});
		else obj[key] = value;
		return obj;
	}
	function _toPropertyKey(arg) {
		var key = _toPrimitive(arg, "string");
		return typeof key === "symbol" ? key : String(key);
	}
	function _toPrimitive(input, hint) {
		if (typeof input !== "object" || input === null) return input;
		var prim = input[Symbol.toPrimitive];
		if (prim !== void 0) {
			var res = prim.call(input, hint || "default");
			if (typeof res !== "object") return res;
			throw new TypeError("@@toPrimitive must return a primitive value.");
		}
		return (hint === "string" ? String : Number)(input);
	}
	var ERR_INVALID_ARG_TYPE = require_errors().codes.ERR_INVALID_ARG_TYPE;
	function from(Readable, iterable, opts) {
		var iterator;
		if (iterable && typeof iterable.next === "function") iterator = iterable;
		else if (iterable && iterable[Symbol.asyncIterator]) iterator = iterable[Symbol.asyncIterator]();
		else if (iterable && iterable[Symbol.iterator]) iterator = iterable[Symbol.iterator]();
		else throw new ERR_INVALID_ARG_TYPE("iterable", ["Iterable"], iterable);
		var readable = new Readable(_objectSpread({ objectMode: true }, opts));
		var reading = false;
		readable._read = function() {
			if (!reading) {
				reading = true;
				next();
			}
		};
		function next() {
			return _next2.apply(this, arguments);
		}
		function _next2() {
			_next2 = _asyncToGenerator(function* () {
				try {
					var _yield$iterator$next = yield iterator.next(), value = _yield$iterator$next.value;
					if (_yield$iterator$next.done) readable.push(null);
					else if (readable.push(yield value)) next();
					else reading = false;
				} catch (err) {
					readable.destroy(err);
				}
			});
			return _next2.apply(this, arguments);
		}
		return readable;
	}
	module.exports = from;
}));
//#endregion
//#region node_modules/readable-stream/lib/_stream_readable.js
var require__stream_readable$2 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = Readable;
	var Duplex;
	Readable.ReadableState = ReadableState$2;
	__require("events").EventEmitter;
	var EElistenerCount = function EElistenerCount(emitter, type) {
		return emitter.listeners(type).length;
	};
	var Stream = require_stream$2();
	var Buffer$3 = __require("buffer").Buffer;
	var OurUint8Array = (typeof global !== "undefined" ? global : typeof window !== "undefined" ? window : typeof self !== "undefined" ? self : {}).Uint8Array || function() {};
	function _uint8ArrayToBuffer(chunk) {
		return Buffer$3.from(chunk);
	}
	function _isUint8Array(obj) {
		return Buffer$3.isBuffer(obj) || obj instanceof OurUint8Array;
	}
	var debugUtil$2 = __require("util");
	var debug;
	if (debugUtil$2 && debugUtil$2.debuglog) debug = debugUtil$2.debuglog("stream");
	else debug = function debug() {};
	var BufferList = require_buffer_list();
	var destroyImpl = require_destroy$2();
	var getHighWaterMark = require_state().getHighWaterMark;
	var _require$codes = require_errors().codes;
	var ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE;
	var ERR_STREAM_PUSH_AFTER_EOF = _require$codes.ERR_STREAM_PUSH_AFTER_EOF;
	var ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED;
	var ERR_STREAM_UNSHIFT_AFTER_END_EVENT = _require$codes.ERR_STREAM_UNSHIFT_AFTER_END_EVENT;
	var StringDecoder;
	var createReadableStreamAsyncIterator;
	var from;
	require_inherits()(Readable, Stream);
	var errorOrDestroy = destroyImpl.errorOrDestroy;
	var kProxyEvents = [
		"error",
		"close",
		"destroy",
		"pause",
		"resume"
	];
	function prependListener(emitter, event, fn) {
		if (typeof emitter.prependListener === "function") return emitter.prependListener(event, fn);
		if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);
		else if (Array.isArray(emitter._events[event])) emitter._events[event].unshift(fn);
		else emitter._events[event] = [fn, emitter._events[event]];
	}
	function ReadableState$2(options, stream, isDuplex) {
		Duplex = Duplex || require__stream_duplex$2();
		options = options || {};
		if (typeof isDuplex !== "boolean") isDuplex = stream instanceof Duplex;
		this.objectMode = !!options.objectMode;
		if (isDuplex) this.objectMode = this.objectMode || !!options.readableObjectMode;
		this.highWaterMark = getHighWaterMark(this, options, "readableHighWaterMark", isDuplex);
		this.buffer = new BufferList();
		this.length = 0;
		this.pipes = null;
		this.pipesCount = 0;
		this.flowing = null;
		this.ended = false;
		this.endEmitted = false;
		this.reading = false;
		this.sync = true;
		this.needReadable = false;
		this.emittedReadable = false;
		this.readableListening = false;
		this.resumeScheduled = false;
		this.paused = true;
		this.emitClose = options.emitClose !== false;
		this.autoDestroy = !!options.autoDestroy;
		this.destroyed = false;
		this.defaultEncoding = options.defaultEncoding || "utf8";
		this.awaitDrain = 0;
		this.readingMore = false;
		this.decoder = null;
		this.encoding = null;
		if (options.encoding) {
			if (!StringDecoder) StringDecoder = __require("node:string_decoder").StringDecoder;
			this.decoder = new StringDecoder(options.encoding);
			this.encoding = options.encoding;
		}
	}
	function Readable(options) {
		Duplex = Duplex || require__stream_duplex$2();
		if (!(this instanceof Readable)) return new Readable(options);
		var isDuplex = this instanceof Duplex;
		this._readableState = new ReadableState$2(options, this, isDuplex);
		this.readable = true;
		if (options) {
			if (typeof options.read === "function") this._read = options.read;
			if (typeof options.destroy === "function") this._destroy = options.destroy;
		}
		Stream.call(this);
	}
	Object.defineProperty(Readable.prototype, "destroyed", {
		enumerable: false,
		get: function get() {
			if (this._readableState === void 0) return false;
			return this._readableState.destroyed;
		},
		set: function set(value) {
			if (!this._readableState) return;
			this._readableState.destroyed = value;
		}
	});
	Readable.prototype.destroy = destroyImpl.destroy;
	Readable.prototype._undestroy = destroyImpl.undestroy;
	Readable.prototype._destroy = function(err, cb) {
		cb(err);
	};
	Readable.prototype.push = function(chunk, encoding) {
		var state = this._readableState;
		var skipChunkCheck;
		if (!state.objectMode) {
			if (typeof chunk === "string") {
				encoding = encoding || state.defaultEncoding;
				if (encoding !== state.encoding) {
					chunk = Buffer$3.from(chunk, encoding);
					encoding = "";
				}
				skipChunkCheck = true;
			}
		} else skipChunkCheck = true;
		return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
	};
	Readable.prototype.unshift = function(chunk) {
		return readableAddChunk(this, chunk, null, true, false);
	};
	function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
		debug("readableAddChunk", chunk);
		var state = stream._readableState;
		if (chunk === null) {
			state.reading = false;
			onEofChunk(stream, state);
		} else {
			var er;
			if (!skipChunkCheck) er = chunkInvalid(state, chunk);
			if (er) errorOrDestroy(stream, er);
			else if (state.objectMode || chunk && chunk.length > 0) {
				if (typeof chunk !== "string" && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer$3.prototype) chunk = _uint8ArrayToBuffer(chunk);
				if (addToFront) {
					if (state.endEmitted) errorOrDestroy(stream, new ERR_STREAM_UNSHIFT_AFTER_END_EVENT());
					else addChunk(stream, state, chunk, true);
				} else if (state.ended) errorOrDestroy(stream, new ERR_STREAM_PUSH_AFTER_EOF());
				else if (state.destroyed) return false;
				else {
					state.reading = false;
					if (state.decoder && !encoding) {
						chunk = state.decoder.write(chunk);
						if (state.objectMode || chunk.length !== 0) addChunk(stream, state, chunk, false);
						else maybeReadMore(stream, state);
					} else addChunk(stream, state, chunk, false);
				}
			} else if (!addToFront) {
				state.reading = false;
				maybeReadMore(stream, state);
			}
		}
		return !state.ended && (state.length < state.highWaterMark || state.length === 0);
	}
	function addChunk(stream, state, chunk, addToFront) {
		if (state.flowing && state.length === 0 && !state.sync) {
			state.awaitDrain = 0;
			stream.emit("data", chunk);
		} else {
			state.length += state.objectMode ? 1 : chunk.length;
			if (addToFront) state.buffer.unshift(chunk);
			else state.buffer.push(chunk);
			if (state.needReadable) emitReadable(stream);
		}
		maybeReadMore(stream, state);
	}
	function chunkInvalid(state, chunk) {
		var er;
		if (!_isUint8Array(chunk) && typeof chunk !== "string" && chunk !== void 0 && !state.objectMode) er = new ERR_INVALID_ARG_TYPE("chunk", [
			"string",
			"Buffer",
			"Uint8Array"
		], chunk);
		return er;
	}
	Readable.prototype.isPaused = function() {
		return this._readableState.flowing === false;
	};
	Readable.prototype.setEncoding = function(enc) {
		if (!StringDecoder) StringDecoder = __require("node:string_decoder").StringDecoder;
		var decoder = new StringDecoder(enc);
		this._readableState.decoder = decoder;
		this._readableState.encoding = this._readableState.decoder.encoding;
		var p = this._readableState.buffer.head;
		var content = "";
		while (p !== null) {
			content += decoder.write(p.data);
			p = p.next;
		}
		this._readableState.buffer.clear();
		if (content !== "") this._readableState.buffer.push(content);
		this._readableState.length = content.length;
		return this;
	};
	var MAX_HWM = 1073741824;
	function computeNewHighWaterMark(n) {
		if (n >= MAX_HWM) n = MAX_HWM;
		else {
			n--;
			n |= n >>> 1;
			n |= n >>> 2;
			n |= n >>> 4;
			n |= n >>> 8;
			n |= n >>> 16;
			n++;
		}
		return n;
	}
	function howMuchToRead(n, state) {
		if (n <= 0 || state.length === 0 && state.ended) return 0;
		if (state.objectMode) return 1;
		if (n !== n) {
			if (state.flowing && state.length) return state.buffer.head.data.length;
			else return state.length;
		}
		if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
		if (n <= state.length) return n;
		if (!state.ended) {
			state.needReadable = true;
			return 0;
		}
		return state.length;
	}
	Readable.prototype.read = function(n) {
		debug("read", n);
		n = parseInt(n, 10);
		var state = this._readableState;
		var nOrig = n;
		if (n !== 0) state.emittedReadable = false;
		if (n === 0 && state.needReadable && ((state.highWaterMark !== 0 ? state.length >= state.highWaterMark : state.length > 0) || state.ended)) {
			debug("read: emitReadable", state.length, state.ended);
			if (state.length === 0 && state.ended) endReadable(this);
			else emitReadable(this);
			return null;
		}
		n = howMuchToRead(n, state);
		if (n === 0 && state.ended) {
			if (state.length === 0) endReadable(this);
			return null;
		}
		var doRead = state.needReadable;
		debug("need readable", doRead);
		if (state.length === 0 || state.length - n < state.highWaterMark) {
			doRead = true;
			debug("length less than watermark", doRead);
		}
		if (state.ended || state.reading) {
			doRead = false;
			debug("reading or ended", doRead);
		} else if (doRead) {
			debug("do read");
			state.reading = true;
			state.sync = true;
			if (state.length === 0) state.needReadable = true;
			this._read(state.highWaterMark);
			state.sync = false;
			if (!state.reading) n = howMuchToRead(nOrig, state);
		}
		var ret;
		if (n > 0) ret = fromList(n, state);
		else ret = null;
		if (ret === null) {
			state.needReadable = state.length <= state.highWaterMark;
			n = 0;
		} else {
			state.length -= n;
			state.awaitDrain = 0;
		}
		if (state.length === 0) {
			if (!state.ended) state.needReadable = true;
			if (nOrig !== n && state.ended) endReadable(this);
		}
		if (ret !== null) this.emit("data", ret);
		return ret;
	};
	function onEofChunk(stream, state) {
		debug("onEofChunk");
		if (state.ended) return;
		if (state.decoder) {
			var chunk = state.decoder.end();
			if (chunk && chunk.length) {
				state.buffer.push(chunk);
				state.length += state.objectMode ? 1 : chunk.length;
			}
		}
		state.ended = true;
		if (state.sync) emitReadable(stream);
		else {
			state.needReadable = false;
			if (!state.emittedReadable) {
				state.emittedReadable = true;
				emitReadable_(stream);
			}
		}
	}
	function emitReadable(stream) {
		var state = stream._readableState;
		debug("emitReadable", state.needReadable, state.emittedReadable);
		state.needReadable = false;
		if (!state.emittedReadable) {
			debug("emitReadable", state.flowing);
			state.emittedReadable = true;
			process.nextTick(emitReadable_, stream);
		}
	}
	function emitReadable_(stream) {
		var state = stream._readableState;
		debug("emitReadable_", state.destroyed, state.length, state.ended);
		if (!state.destroyed && (state.length || state.ended)) {
			stream.emit("readable");
			state.emittedReadable = false;
		}
		state.needReadable = !state.flowing && !state.ended && state.length <= state.highWaterMark;
		flow(stream);
	}
	function maybeReadMore(stream, state) {
		if (!state.readingMore) {
			state.readingMore = true;
			process.nextTick(maybeReadMore_, stream, state);
		}
	}
	function maybeReadMore_(stream, state) {
		while (!state.reading && !state.ended && (state.length < state.highWaterMark || state.flowing && state.length === 0)) {
			var len = state.length;
			debug("maybeReadMore read 0");
			stream.read(0);
			if (len === state.length) break;
		}
		state.readingMore = false;
	}
	Readable.prototype._read = function(n) {
		errorOrDestroy(this, new ERR_METHOD_NOT_IMPLEMENTED("_read()"));
	};
	Readable.prototype.pipe = function(dest, pipeOpts) {
		var src = this;
		var state = this._readableState;
		switch (state.pipesCount) {
			case 0:
				state.pipes = dest;
				break;
			case 1:
				state.pipes = [state.pipes, dest];
				break;
			default: state.pipes.push(dest);
		}
		state.pipesCount += 1;
		debug("pipe count=%d opts=%j", state.pipesCount, pipeOpts);
		var endFn = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr ? onend : unpipe;
		if (state.endEmitted) process.nextTick(endFn);
		else src.once("end", endFn);
		dest.on("unpipe", onunpipe);
		function onunpipe(readable, unpipeInfo) {
			debug("onunpipe");
			if (readable === src) {
				if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
					unpipeInfo.hasUnpiped = true;
					cleanup();
				}
			}
		}
		function onend() {
			debug("onend");
			dest.end();
		}
		var ondrain = pipeOnDrain(src);
		dest.on("drain", ondrain);
		var cleanedUp = false;
		function cleanup() {
			debug("cleanup");
			dest.removeListener("close", onclose);
			dest.removeListener("finish", onfinish);
			dest.removeListener("drain", ondrain);
			dest.removeListener("error", onerror);
			dest.removeListener("unpipe", onunpipe);
			src.removeListener("end", onend);
			src.removeListener("end", unpipe);
			src.removeListener("data", ondata);
			cleanedUp = true;
			if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
		}
		src.on("data", ondata);
		function ondata(chunk) {
			debug("ondata");
			var ret = dest.write(chunk);
			debug("dest.write", ret);
			if (ret === false) {
				if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
					debug("false write response, pause", state.awaitDrain);
					state.awaitDrain++;
				}
				src.pause();
			}
		}
		function onerror(er) {
			debug("onerror", er);
			unpipe();
			dest.removeListener("error", onerror);
			if (EElistenerCount(dest, "error") === 0) errorOrDestroy(dest, er);
		}
		prependListener(dest, "error", onerror);
		function onclose() {
			dest.removeListener("finish", onfinish);
			unpipe();
		}
		dest.once("close", onclose);
		function onfinish() {
			debug("onfinish");
			dest.removeListener("close", onclose);
			unpipe();
		}
		dest.once("finish", onfinish);
		function unpipe() {
			debug("unpipe");
			src.unpipe(dest);
		}
		dest.emit("pipe", src);
		if (!state.flowing) {
			debug("pipe resume");
			src.resume();
		}
		return dest;
	};
	function pipeOnDrain(src) {
		return function pipeOnDrainFunctionResult() {
			var state = src._readableState;
			debug("pipeOnDrain", state.awaitDrain);
			if (state.awaitDrain) state.awaitDrain--;
			if (state.awaitDrain === 0 && EElistenerCount(src, "data")) {
				state.flowing = true;
				flow(src);
			}
		};
	}
	Readable.prototype.unpipe = function(dest) {
		var state = this._readableState;
		var unpipeInfo = { hasUnpiped: false };
		if (state.pipesCount === 0) return this;
		if (state.pipesCount === 1) {
			if (dest && dest !== state.pipes) return this;
			if (!dest) dest = state.pipes;
			state.pipes = null;
			state.pipesCount = 0;
			state.flowing = false;
			if (dest) dest.emit("unpipe", this, unpipeInfo);
			return this;
		}
		if (!dest) {
			var dests = state.pipes;
			var len = state.pipesCount;
			state.pipes = null;
			state.pipesCount = 0;
			state.flowing = false;
			for (var i = 0; i < len; i++) dests[i].emit("unpipe", this, { hasUnpiped: false });
			return this;
		}
		var index = indexOf(state.pipes, dest);
		if (index === -1) return this;
		state.pipes.splice(index, 1);
		state.pipesCount -= 1;
		if (state.pipesCount === 1) state.pipes = state.pipes[0];
		dest.emit("unpipe", this, unpipeInfo);
		return this;
	};
	Readable.prototype.on = function(ev, fn) {
		var res = Stream.prototype.on.call(this, ev, fn);
		var state = this._readableState;
		if (ev === "data") {
			state.readableListening = this.listenerCount("readable") > 0;
			if (state.flowing !== false) this.resume();
		} else if (ev === "readable") {
			if (!state.endEmitted && !state.readableListening) {
				state.readableListening = state.needReadable = true;
				state.flowing = false;
				state.emittedReadable = false;
				debug("on readable", state.length, state.reading);
				if (state.length) emitReadable(this);
				else if (!state.reading) process.nextTick(nReadingNextTick, this);
			}
		}
		return res;
	};
	Readable.prototype.addListener = Readable.prototype.on;
	Readable.prototype.removeListener = function(ev, fn) {
		var res = Stream.prototype.removeListener.call(this, ev, fn);
		if (ev === "readable") process.nextTick(updateReadableListening, this);
		return res;
	};
	Readable.prototype.removeAllListeners = function(ev) {
		var res = Stream.prototype.removeAllListeners.apply(this, arguments);
		if (ev === "readable" || ev === void 0) process.nextTick(updateReadableListening, this);
		return res;
	};
	function updateReadableListening(self) {
		var state = self._readableState;
		state.readableListening = self.listenerCount("readable") > 0;
		if (state.resumeScheduled && !state.paused) state.flowing = true;
		else if (self.listenerCount("data") > 0) self.resume();
	}
	function nReadingNextTick(self) {
		debug("readable nexttick read 0");
		self.read(0);
	}
	Readable.prototype.resume = function() {
		var state = this._readableState;
		if (!state.flowing) {
			debug("resume");
			state.flowing = !state.readableListening;
			resume(this, state);
		}
		state.paused = false;
		return this;
	};
	function resume(stream, state) {
		if (!state.resumeScheduled) {
			state.resumeScheduled = true;
			process.nextTick(resume_, stream, state);
		}
	}
	function resume_(stream, state) {
		debug("resume", state.reading);
		if (!state.reading) stream.read(0);
		state.resumeScheduled = false;
		stream.emit("resume");
		flow(stream);
		if (state.flowing && !state.reading) stream.read(0);
	}
	Readable.prototype.pause = function() {
		debug("call pause flowing=%j", this._readableState.flowing);
		if (this._readableState.flowing !== false) {
			debug("pause");
			this._readableState.flowing = false;
			this.emit("pause");
		}
		this._readableState.paused = true;
		return this;
	};
	function flow(stream) {
		var state = stream._readableState;
		debug("flow", state.flowing);
		while (state.flowing && stream.read() !== null);
	}
	Readable.prototype.wrap = function(stream) {
		var _this = this;
		var state = this._readableState;
		var paused = false;
		stream.on("end", function() {
			debug("wrapped end");
			if (state.decoder && !state.ended) {
				var chunk = state.decoder.end();
				if (chunk && chunk.length) _this.push(chunk);
			}
			_this.push(null);
		});
		stream.on("data", function(chunk) {
			debug("wrapped data");
			if (state.decoder) chunk = state.decoder.write(chunk);
			if (state.objectMode && (chunk === null || chunk === void 0)) return;
			else if (!state.objectMode && (!chunk || !chunk.length)) return;
			if (!_this.push(chunk)) {
				paused = true;
				stream.pause();
			}
		});
		for (var i in stream) if (this[i] === void 0 && typeof stream[i] === "function") this[i] = function methodWrap(method) {
			return function methodWrapReturnFunction() {
				return stream[method].apply(stream, arguments);
			};
		}(i);
		for (var n = 0; n < kProxyEvents.length; n++) stream.on(kProxyEvents[n], this.emit.bind(this, kProxyEvents[n]));
		this._read = function(n) {
			debug("wrapped _read", n);
			if (paused) {
				paused = false;
				stream.resume();
			}
		};
		return this;
	};
	if (typeof Symbol === "function") Readable.prototype[Symbol.asyncIterator] = function() {
		if (createReadableStreamAsyncIterator === void 0) createReadableStreamAsyncIterator = require_async_iterator();
		return createReadableStreamAsyncIterator(this);
	};
	Object.defineProperty(Readable.prototype, "readableHighWaterMark", {
		enumerable: false,
		get: function get() {
			return this._readableState.highWaterMark;
		}
	});
	Object.defineProperty(Readable.prototype, "readableBuffer", {
		enumerable: false,
		get: function get() {
			return this._readableState && this._readableState.buffer;
		}
	});
	Object.defineProperty(Readable.prototype, "readableFlowing", {
		enumerable: false,
		get: function get() {
			return this._readableState.flowing;
		},
		set: function set(state) {
			if (this._readableState) this._readableState.flowing = state;
		}
	});
	Readable._fromList = fromList;
	Object.defineProperty(Readable.prototype, "readableLength", {
		enumerable: false,
		get: function get() {
			return this._readableState.length;
		}
	});
	function fromList(n, state) {
		if (state.length === 0) return null;
		var ret;
		if (state.objectMode) ret = state.buffer.shift();
		else if (!n || n >= state.length) {
			if (state.decoder) ret = state.buffer.join("");
			else if (state.buffer.length === 1) ret = state.buffer.first();
			else ret = state.buffer.concat(state.length);
			state.buffer.clear();
		} else ret = state.buffer.consume(n, state.decoder);
		return ret;
	}
	function endReadable(stream) {
		var state = stream._readableState;
		debug("endReadable", state.endEmitted);
		if (!state.endEmitted) {
			state.ended = true;
			process.nextTick(endReadableNT, state, stream);
		}
	}
	function endReadableNT(state, stream) {
		debug("endReadableNT", state.endEmitted, state.length);
		if (!state.endEmitted && state.length === 0) {
			state.endEmitted = true;
			stream.readable = false;
			stream.emit("end");
			if (state.autoDestroy) {
				var wState = stream._writableState;
				if (!wState || wState.autoDestroy && wState.finished) stream.destroy();
			}
		}
	}
	if (typeof Symbol === "function") Readable.from = function(iterable, opts) {
		if (from === void 0) from = require_from();
		return from(Readable, iterable, opts);
	};
	function indexOf(xs, x) {
		for (var i = 0, l = xs.length; i < l; i++) if (xs[i] === x) return i;
		return -1;
	}
}));
//#endregion
//#region node_modules/readable-stream/lib/_stream_transform.js
var require__stream_transform$2 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = Transform;
	var _require$codes = require_errors().codes;
	var ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED;
	var ERR_MULTIPLE_CALLBACK = _require$codes.ERR_MULTIPLE_CALLBACK;
	var ERR_TRANSFORM_ALREADY_TRANSFORMING = _require$codes.ERR_TRANSFORM_ALREADY_TRANSFORMING;
	var ERR_TRANSFORM_WITH_LENGTH_0 = _require$codes.ERR_TRANSFORM_WITH_LENGTH_0;
	var Duplex = require__stream_duplex$2();
	require_inherits()(Transform, Duplex);
	function afterTransform(er, data) {
		var ts = this._transformState;
		ts.transforming = false;
		var cb = ts.writecb;
		if (cb === null) return this.emit("error", new ERR_MULTIPLE_CALLBACK());
		ts.writechunk = null;
		ts.writecb = null;
		if (data != null) this.push(data);
		cb(er);
		var rs = this._readableState;
		rs.reading = false;
		if (rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
	}
	function Transform(options) {
		if (!(this instanceof Transform)) return new Transform(options);
		Duplex.call(this, options);
		this._transformState = {
			afterTransform: afterTransform.bind(this),
			needTransform: false,
			transforming: false,
			writecb: null,
			writechunk: null,
			writeencoding: null
		};
		this._readableState.needReadable = true;
		this._readableState.sync = false;
		if (options) {
			if (typeof options.transform === "function") this._transform = options.transform;
			if (typeof options.flush === "function") this._flush = options.flush;
		}
		this.on("prefinish", prefinish);
	}
	function prefinish() {
		var _this = this;
		if (typeof this._flush === "function" && !this._readableState.destroyed) this._flush(function(er, data) {
			done(_this, er, data);
		});
		else done(this, null, null);
	}
	Transform.prototype.push = function(chunk, encoding) {
		this._transformState.needTransform = false;
		return Duplex.prototype.push.call(this, chunk, encoding);
	};
	Transform.prototype._transform = function(chunk, encoding, cb) {
		cb(new ERR_METHOD_NOT_IMPLEMENTED("_transform()"));
	};
	Transform.prototype._write = function(chunk, encoding, cb) {
		var ts = this._transformState;
		ts.writecb = cb;
		ts.writechunk = chunk;
		ts.writeencoding = encoding;
		if (!ts.transforming) {
			var rs = this._readableState;
			if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
		}
	};
	Transform.prototype._read = function(n) {
		var ts = this._transformState;
		if (ts.writechunk !== null && !ts.transforming) {
			ts.transforming = true;
			this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
		} else ts.needTransform = true;
	};
	Transform.prototype._destroy = function(err, cb) {
		Duplex.prototype._destroy.call(this, err, function(err2) {
			cb(err2);
		});
	};
	function done(stream, er, data) {
		if (er) return stream.emit("error", er);
		if (data != null) stream.push(data);
		if (stream._writableState.length) throw new ERR_TRANSFORM_WITH_LENGTH_0();
		if (stream._transformState.transforming) throw new ERR_TRANSFORM_ALREADY_TRANSFORMING();
		return stream.push(null);
	}
}));
//#endregion
//#region node_modules/readable-stream/lib/_stream_passthrough.js
var require__stream_passthrough$2 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = PassThrough;
	var Transform = require__stream_transform$2();
	require_inherits()(PassThrough, Transform);
	function PassThrough(options) {
		if (!(this instanceof PassThrough)) return new PassThrough(options);
		Transform.call(this, options);
	}
	PassThrough.prototype._transform = function(chunk, encoding, cb) {
		cb(null, chunk);
	};
}));
//#endregion
//#region node_modules/readable-stream/lib/internal/streams/pipeline.js
var require_pipeline = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var eos;
	function once(callback) {
		var called = false;
		return function() {
			if (called) return;
			called = true;
			callback.apply(void 0, arguments);
		};
	}
	var _require$codes = require_errors().codes;
	var ERR_MISSING_ARGS = _require$codes.ERR_MISSING_ARGS;
	var ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED;
	function noop(err) {
		if (err) throw err;
	}
	function isRequest(stream) {
		return stream.setHeader && typeof stream.abort === "function";
	}
	function destroyer(stream, reading, writing, callback) {
		callback = once(callback);
		var closed = false;
		stream.on("close", function() {
			closed = true;
		});
		if (eos === void 0) eos = require_end_of_stream$1();
		eos(stream, {
			readable: reading,
			writable: writing
		}, function(err) {
			if (err) return callback(err);
			closed = true;
			callback();
		});
		var destroyed = false;
		return function(err) {
			if (closed) return;
			if (destroyed) return;
			destroyed = true;
			if (isRequest(stream)) return stream.abort();
			if (typeof stream.destroy === "function") return stream.destroy();
			callback(err || new ERR_STREAM_DESTROYED("pipe"));
		};
	}
	function call(fn) {
		fn();
	}
	function pipe(from, to) {
		return from.pipe(to);
	}
	function popCallback(streams) {
		if (!streams.length) return noop;
		if (typeof streams[streams.length - 1] !== "function") return noop;
		return streams.pop();
	}
	function pipeline() {
		for (var _len = arguments.length, streams = new Array(_len), _key = 0; _key < _len; _key++) streams[_key] = arguments[_key];
		var callback = popCallback(streams);
		if (Array.isArray(streams[0])) streams = streams[0];
		if (streams.length < 2) throw new ERR_MISSING_ARGS("streams");
		var error;
		var destroys = streams.map(function(stream, i) {
			var reading = i < streams.length - 1;
			return destroyer(stream, reading, i > 0, function(err) {
				if (!error) error = err;
				if (err) destroys.forEach(call);
				if (reading) return;
				destroys.forEach(call);
				callback(error);
			});
		});
		return streams.reduce(pipe);
	}
	module.exports = pipeline;
}));
//#endregion
//#region node_modules/readable-stream/readable.js
var require_readable$2 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Stream$6 = __require("stream");
	if (process.env.READABLE_STREAM === "disable" && Stream$6) {
		module.exports = Stream$6.Readable;
		Object.assign(module.exports, Stream$6);
		module.exports.Stream = Stream$6;
	} else {
		exports = module.exports = require__stream_readable$2();
		exports.Stream = Stream$6 || exports;
		exports.Readable = exports;
		exports.Writable = require__stream_writable$2();
		exports.Duplex = require__stream_duplex$2();
		exports.Transform = require__stream_transform$2();
		exports.PassThrough = require__stream_passthrough$2();
		exports.finished = require_end_of_stream$1();
		exports.pipeline = require_pipeline();
	}
}));
//#endregion
//#region node_modules/readdir-glob/node_modules/minimatch/lib/path.js
var require_path = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = typeof process === "object" && process && process.platform === "win32" ? { sep: "\\" } : { sep: "/" };
}));
//#endregion
//#region node_modules/balanced-match/index.js
var require_balanced_match = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = balanced;
	function balanced(a, b, str) {
		if (a instanceof RegExp) a = maybeMatch(a, str);
		if (b instanceof RegExp) b = maybeMatch(b, str);
		var r = range(a, b, str);
		return r && {
			start: r[0],
			end: r[1],
			pre: str.slice(0, r[0]),
			body: str.slice(r[0] + a.length, r[1]),
			post: str.slice(r[1] + b.length)
		};
	}
	function maybeMatch(reg, str) {
		var m = str.match(reg);
		return m ? m[0] : null;
	}
	balanced.range = range;
	function range(a, b, str) {
		var begs, beg, left, right, result;
		var ai = str.indexOf(a);
		var bi = str.indexOf(b, ai + 1);
		var i = ai;
		if (ai >= 0 && bi > 0) {
			if (a === b) return [ai, bi];
			begs = [];
			left = str.length;
			while (i >= 0 && !result) {
				if (i == ai) {
					begs.push(i);
					ai = str.indexOf(a, i + 1);
				} else if (begs.length == 1) result = [begs.pop(), bi];
				else {
					beg = begs.pop();
					if (beg < left) {
						left = beg;
						right = bi;
					}
					bi = str.indexOf(b, i + 1);
				}
				i = ai < bi && ai >= 0 ? ai : bi;
			}
			if (begs.length) result = [left, right];
		}
		return result;
	}
}));
//#endregion
//#region node_modules/readdir-glob/node_modules/brace-expansion/index.js
var require_brace_expansion$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var balanced = require_balanced_match();
	module.exports = expandTop;
	var escSlash = "\0SLASH" + Math.random() + "\0";
	var escOpen = "\0OPEN" + Math.random() + "\0";
	var escClose = "\0CLOSE" + Math.random() + "\0";
	var escComma = "\0COMMA" + Math.random() + "\0";
	var escPeriod = "\0PERIOD" + Math.random() + "\0";
	var EXPANSION_MAX = 1e5;
	var EXPANSION_MAX_LENGTH = 4e6;
	function numeric(str) {
		return parseInt(str, 10) == str ? parseInt(str, 10) : str.charCodeAt(0);
	}
	function escapeBraces(str) {
		return str.split("\\\\").join(escSlash).split("\\{").join(escOpen).split("\\}").join(escClose).split("\\,").join(escComma).split("\\.").join(escPeriod);
	}
	function unescapeBraces(str) {
		return str.split(escSlash).join("\\").split(escOpen).join("{").split(escClose).join("}").split(escComma).join(",").split(escPeriod).join(".");
	}
	function parseCommaParts(str) {
		if (!str) return [""];
		var parts = [];
		var m = balanced("{", "}", str);
		if (!m) return str.split(",");
		var pre = m.pre;
		var body = m.body;
		var post = m.post;
		var p = pre.split(",");
		p[p.length - 1] += "{" + body + "}";
		var postParts = parseCommaParts(post);
		if (post.length) {
			p[p.length - 1] += postParts.shift();
			p.push.apply(p, postParts);
		}
		parts.push.apply(parts, p);
		return parts;
	}
	function expandTop(str, options) {
		if (!str) return [];
		options = options || {};
		var max = options.max == null ? EXPANSION_MAX : options.max;
		var maxLength = options.maxLength == null ? EXPANSION_MAX_LENGTH : options.maxLength;
		if (str.substr(0, 2) === "{}") str = "\\{\\}" + str.substr(2);
		return expand(escapeBraces(str), max, maxLength, true).map(unescapeBraces);
	}
	function embrace(str) {
		return "{" + str + "}";
	}
	function isPadded(el) {
		return /^-?0\d/.test(el);
	}
	function lte(i, y) {
		return i <= y;
	}
	function gte(i, y) {
		return i >= y;
	}
	function combine(acc, pre, values, max, maxLength, dropEmpties) {
		var out = [];
		var length = 0;
		for (var a = 0; a < acc.length; a++) for (var v = 0; v < values.length; v++) {
			if (out.length >= max) return out;
			var expansion = acc[a] + pre + values[v];
			if (dropEmpties && !expansion) continue;
			if (length + expansion.length > maxLength) return out;
			out.push(expansion);
			length += expansion.length;
		}
		return out;
	}
	function expandSequence(body, isAlphaSequence, max, maxLength) {
		var n = body.split(/\.\./);
		var N = [];
		/* c8 ignore start */
		if (n[0] === void 0 || n[1] === void 0) return N;
		/* c8 ignore stop */
		var x = numeric(n[0]);
		var y = numeric(n[1]);
		var width = Math.max(n[0].length, n[1].length);
		var incr = n.length === 3 && n[2] !== void 0 ? Math.max(Math.abs(numeric(n[2])), 1) : 1;
		var test = lte;
		if (y < x) {
			incr *= -1;
			test = gte;
		}
		var pad = n.some(isPadded);
		var length = 0;
		for (var i = x; test(i, y) && N.length < max; i += incr) {
			var c;
			if (isAlphaSequence) {
				c = String.fromCharCode(i);
				if (c === "\\") c = "";
			} else {
				c = String(i);
				if (pad) {
					var need = width - c.length;
					if (need > 0) {
						var z = new Array(need + 1).join("0");
						if (i < 0) c = "-" + z + c.slice(1);
						else c = z + c;
					}
				}
			}
			if (length + c.length > maxLength) break;
			N.push(c);
			length += c.length;
		}
		return N;
	}
	function expand(str, max, maxLength, isTop) {
		var acc = [""];
		var dropEmpties = false;
		var firstGroup = true;
		for (;;) {
			const m = balanced("{", "}", str);
			if (!m) return combine(acc, str, [""], max, maxLength, dropEmpties);
			const pre = m.pre;
			if (/\$$/.test(pre)) {
				acc = combine(acc, pre + "{" + m.body + "}", [""], max, maxLength, dropEmpties && !m.post.length);
				firstGroup = false;
				if (!m.post.length) break;
				str = m.post;
				continue;
			}
			var isNumericSequence = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(m.body);
			var isAlphaSequence = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(m.body);
			var isSequence = isNumericSequence || isAlphaSequence;
			var isOptions = m.body.indexOf(",") >= 0;
			if (!isSequence && !isOptions) {
				if (m.post.match(/,(?!,).*\}/)) {
					str = m.pre + "{" + m.body + escClose + m.post;
					isTop = true;
					continue;
				}
				return combine(acc, pre + "{" + m.body + "}" + m.post, [""], max, maxLength, dropEmpties);
			}
			if (firstGroup) {
				dropEmpties = isTop && !isSequence;
				firstGroup = false;
			}
			var values;
			if (isSequence) values = expandSequence(m.body, isAlphaSequence, max, maxLength);
			else {
				var n = parseCommaParts(m.body);
				if (n.length === 1 && n[0] !== void 0) {
					n = expand(n[0], max, maxLength, false).map(embrace);
					/* c8 ignore start */
					if (n.length === 1) {
						acc = combine(acc, pre + n[0], [""], max, maxLength, dropEmpties && !m.post.length);
						if (!m.post.length) break;
						str = m.post;
						continue;
					}
				}
				var dropsEmpties = dropEmpties && !m.post.length && !pre;
				for (var d = 0; dropsEmpties && d < acc.length; d++) if (acc[d]) dropsEmpties = false;
				values = [];
				var valuesLength = 0;
				outer: for (var j = 0; j < n.length; j++) {
					var expanded = expand(n[j], max, maxLength, false);
					for (var k = 0; k < expanded.length; k++) {
						var v = expanded[k];
						if (dropsEmpties && !v) continue;
						if (values.length >= max || valuesLength + v.length > maxLength) break outer;
						values.push(v);
						valuesLength += v.length;
					}
				}
			}
			acc = combine(acc, pre, values, max, maxLength, dropEmpties && !m.post.length);
			if (!m.post.length) break;
			str = m.post;
		}
		return acc;
	}
}));
//#endregion
//#region node_modules/readdir-glob/node_modules/minimatch/minimatch.js
var require_minimatch$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var minimatch = module.exports = (p, pattern, options = {}) => {
		assertValidPattern(pattern);
		if (!options.nocomment && pattern.charAt(0) === "#") return false;
		return new Minimatch(pattern, options).match(p);
	};
	module.exports = minimatch;
	var path = require_path();
	minimatch.sep = path.sep;
	var GLOBSTAR = Symbol("globstar **");
	minimatch.GLOBSTAR = GLOBSTAR;
	var expand = require_brace_expansion$1();
	var plTypes = {
		"!": {
			open: "(?:(?!(?:",
			close: "))[^/]*?)"
		},
		"?": {
			open: "(?:",
			close: ")?"
		},
		"+": {
			open: "(?:",
			close: ")+"
		},
		"*": {
			open: "(?:",
			close: ")*"
		},
		"@": {
			open: "(?:",
			close: ")"
		}
	};
	var qmark = "[^/]";
	var star = "[^/]*?";
	var twoStarDot = "(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?";
	var twoStarNoDot = "(?:(?!(?:\\/|^)\\.).)*?";
	var charSet = (s) => s.split("").reduce((set, c) => {
		set[c] = true;
		return set;
	}, {});
	var reSpecials = charSet("().*{}+?[]^$\\!");
	var addPatternStartSet = charSet("[.(");
	var slashSplit = /\/+/;
	minimatch.filter = (pattern, options = {}) => (p, i, list) => minimatch(p, pattern, options);
	var ext = (a, b = {}) => {
		const t = {};
		Object.keys(a).forEach((k) => t[k] = a[k]);
		Object.keys(b).forEach((k) => t[k] = b[k]);
		return t;
	};
	minimatch.defaults = (def) => {
		if (!def || typeof def !== "object" || !Object.keys(def).length) return minimatch;
		const orig = minimatch;
		const m = (p, pattern, options) => orig(p, pattern, ext(def, options));
		m.Minimatch = class Minimatch extends orig.Minimatch {
			constructor(pattern, options) {
				super(pattern, ext(def, options));
			}
		};
		m.Minimatch.defaults = (options) => orig.defaults(ext(def, options)).Minimatch;
		m.filter = (pattern, options) => orig.filter(pattern, ext(def, options));
		m.defaults = (options) => orig.defaults(ext(def, options));
		m.makeRe = (pattern, options) => orig.makeRe(pattern, ext(def, options));
		m.braceExpand = (pattern, options) => orig.braceExpand(pattern, ext(def, options));
		m.match = (list, pattern, options) => orig.match(list, pattern, ext(def, options));
		return m;
	};
	minimatch.braceExpand = (pattern, options) => braceExpand(pattern, options);
	var braceExpand = (pattern, options = {}) => {
		assertValidPattern(pattern);
		if (options.nobrace || !/\{(?:(?!\{).)*\}/.test(pattern)) return [pattern];
		return expand(pattern);
	};
	var MAX_PATTERN_LENGTH = 65536;
	var assertValidPattern = (pattern) => {
		if (typeof pattern !== "string") throw new TypeError("invalid pattern");
		if (pattern.length > MAX_PATTERN_LENGTH) throw new TypeError("pattern is too long");
	};
	var SUBPARSE = Symbol("subparse");
	minimatch.makeRe = (pattern, options) => new Minimatch(pattern, options || {}).makeRe();
	minimatch.match = (list, pattern, options = {}) => {
		const mm = new Minimatch(pattern, options);
		list = list.filter((f) => mm.match(f));
		if (mm.options.nonull && !list.length) list.push(pattern);
		return list;
	};
	var globUnescape = (s) => s.replace(/\\(.)/g, "$1");
	var charUnescape = (s) => s.replace(/\\([^-\]])/g, "$1");
	var regExpEscape = (s) => s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
	var braExpEscape = (s) => s.replace(/[[\]\\]/g, "\\$&");
	var Minimatch = class {
		constructor(pattern, options) {
			assertValidPattern(pattern);
			if (!options) options = {};
			this.options = options;
			this.maxGlobstarRecursion = options.maxGlobstarRecursion !== void 0 ? options.maxGlobstarRecursion : 200;
			this.set = [];
			this.pattern = pattern;
			this.windowsPathsNoEscape = !!options.windowsPathsNoEscape || options.allowWindowsEscape === false;
			if (this.windowsPathsNoEscape) this.pattern = this.pattern.replace(/\\/g, "/");
			this.regexp = null;
			this.negate = false;
			this.comment = false;
			this.empty = false;
			this.partial = !!options.partial;
			this.make();
		}
		debug() {}
		make() {
			const pattern = this.pattern;
			const options = this.options;
			if (!options.nocomment && pattern.charAt(0) === "#") {
				this.comment = true;
				return;
			}
			if (!pattern) {
				this.empty = true;
				return;
			}
			this.parseNegate();
			let set = this.globSet = this.braceExpand();
			if (options.debug) this.debug = (...args) => console.error(...args);
			this.debug(this.pattern, set);
			set = this.globParts = set.map((s) => s.split(slashSplit));
			this.debug(this.pattern, set);
			set = set.map((s, si, set) => s.map(this.parse, this));
			this.debug(this.pattern, set);
			set = set.filter((s) => s.indexOf(false) === -1);
			this.debug(this.pattern, set);
			this.set = set;
		}
		parseNegate() {
			if (this.options.nonegate) return;
			const pattern = this.pattern;
			let negate = false;
			let negateOffset = 0;
			for (let i = 0; i < pattern.length && pattern.charAt(i) === "!"; i++) {
				negate = !negate;
				negateOffset++;
			}
			if (negateOffset) this.pattern = pattern.slice(negateOffset);
			this.negate = negate;
		}
		matchOne(file, pattern, partial) {
			if (pattern.indexOf(GLOBSTAR) !== -1) return this._matchGlobstar(file, pattern, partial, 0, 0);
			return this._matchOne(file, pattern, partial, 0, 0);
		}
		_matchGlobstar(file, pattern, partial, fileIndex, patternIndex) {
			let firstgs = -1;
			for (let i = patternIndex; i < pattern.length; i++) if (pattern[i] === GLOBSTAR) {
				firstgs = i;
				break;
			}
			let lastgs = -1;
			for (let i = pattern.length - 1; i >= 0; i--) if (pattern[i] === GLOBSTAR) {
				lastgs = i;
				break;
			}
			const head = pattern.slice(patternIndex, firstgs);
			const body = partial ? pattern.slice(firstgs + 1) : pattern.slice(firstgs + 1, lastgs);
			const tail = partial ? [] : pattern.slice(lastgs + 1);
			if (head.length) {
				const fileHead = file.slice(fileIndex, fileIndex + head.length);
				if (!this._matchOne(fileHead, head, partial, 0, 0)) return false;
				fileIndex += head.length;
			}
			let fileTailMatch = 0;
			if (tail.length) {
				if (tail.length + fileIndex > file.length) return false;
				const tailStart = file.length - tail.length;
				if (this._matchOne(file, tail, partial, tailStart, 0)) fileTailMatch = tail.length;
				else {
					if (file[file.length - 1] !== "" || fileIndex + tail.length === file.length) return false;
					if (!this._matchOne(file, tail, partial, tailStart - 1, 0)) return false;
					fileTailMatch = tail.length + 1;
				}
			}
			if (!body.length) {
				let sawSome = !!fileTailMatch;
				for (let i = fileIndex; i < file.length - fileTailMatch; i++) {
					const f = String(file[i]);
					sawSome = true;
					if (f === "." || f === ".." || !this.options.dot && f.charAt(0) === ".") return false;
				}
				return partial || sawSome;
			}
			const bodySegments = [[[], 0]];
			let currentBody = bodySegments[0];
			let nonGsParts = 0;
			const nonGsPartsSums = [0];
			for (const b of body) if (b === GLOBSTAR) {
				nonGsPartsSums.push(nonGsParts);
				currentBody = [[], 0];
				bodySegments.push(currentBody);
			} else {
				currentBody[0].push(b);
				nonGsParts++;
			}
			let idx = bodySegments.length - 1;
			const fileLength = file.length - fileTailMatch;
			for (const b of bodySegments) b[1] = fileLength - (nonGsPartsSums[idx--] + b[0].length);
			return !!this._matchGlobStarBodySections(file, bodySegments, fileIndex, 0, partial, 0, !!fileTailMatch);
		}
		_matchGlobStarBodySections(file, bodySegments, fileIndex, bodyIndex, partial, globStarDepth, sawTail) {
			const bs = bodySegments[bodyIndex];
			if (!bs) {
				for (let i = fileIndex; i < file.length; i++) {
					sawTail = true;
					const f = file[i];
					if (f === "." || f === ".." || !this.options.dot && f.charAt(0) === ".") return false;
				}
				return sawTail;
			}
			const [body, after] = bs;
			while (fileIndex <= after) {
				if (this._matchOne(file.slice(0, fileIndex + body.length), body, partial, fileIndex, 0) && globStarDepth < this.maxGlobstarRecursion) {
					const sub = this._matchGlobStarBodySections(file, bodySegments, fileIndex + body.length, bodyIndex + 1, partial, globStarDepth + 1, sawTail);
					if (sub !== false) return sub;
				}
				const f = file[fileIndex];
				if (f === "." || f === ".." || !this.options.dot && f.charAt(0) === ".") return false;
				fileIndex++;
			}
			return partial || null;
		}
		_matchOne(file, pattern, partial, fileIndex, patternIndex) {
			let fi, pi, fl, pl;
			for (fi = fileIndex, pi = patternIndex, fl = file.length, pl = pattern.length; fi < fl && pi < pl; fi++, pi++) {
				this.debug("matchOne loop");
				const p = pattern[pi];
				const f = file[fi];
				this.debug(pattern, p, f);
				/* istanbul ignore if */
				if (p === false || p === GLOBSTAR) return false;
				let hit;
				if (typeof p === "string") {
					hit = f === p;
					this.debug("string match", p, f, hit);
				} else {
					hit = f.match(p);
					this.debug("pattern match", p, f, hit);
				}
				if (!hit) return false;
			}
			if (fi === fl && pi === pl) return true;
			else if (fi === fl) return partial;
			else if (pi === pl) return fi === fl - 1 && file[fi] === "";
			/* istanbul ignore next */
			throw new Error("wtf?");
		}
		braceExpand() {
			return braceExpand(this.pattern, this.options);
		}
		parse(pattern, isSub) {
			assertValidPattern(pattern);
			const options = this.options;
			if (pattern === "**") {
				if (!options.noglobstar) return GLOBSTAR;
				else pattern = "*";
			}
			if (pattern === "") return "";
			let re = "";
			let hasMagic = false;
			let escaping = false;
			const patternListStack = [];
			const negativeLists = [];
			let stateChar;
			let inClass = false;
			let reClassStart = -1;
			let classStart = -1;
			let cs;
			let pl;
			let sp;
			let dotTravAllowed = pattern.charAt(0) === ".";
			let dotFileAllowed = options.dot || dotTravAllowed;
			const patternStart = () => dotTravAllowed ? "" : dotFileAllowed ? "(?!(?:^|\\/)\\.{1,2}(?:$|\\/))" : "(?!\\.)";
			const subPatternStart = (p) => p.charAt(0) === "." ? "" : options.dot ? "(?!(?:^|\\/)\\.{1,2}(?:$|\\/))" : "(?!\\.)";
			const clearStateChar = () => {
				if (stateChar) {
					switch (stateChar) {
						case "*":
							re += star;
							hasMagic = true;
							break;
						case "?":
							re += qmark;
							hasMagic = true;
							break;
						default: re += "\\" + stateChar;
					}
					this.debug("clearStateChar %j %j", stateChar, re);
					stateChar = false;
				}
			};
			for (let i = 0, c; i < pattern.length && (c = pattern.charAt(i)); i++) {
				this.debug("%s	%s %s %j", pattern, i, re, c);
				if (escaping) {
					/* istanbul ignore next - completely not allowed, even escaped. */
					if (c === "/") return false;
					if (reSpecials[c]) re += "\\";
					re += c;
					escaping = false;
					continue;
				}
				switch (c) {
					/* istanbul ignore next */
					case "/": return false;
					case "\\":
						if (inClass && pattern.charAt(i + 1) === "-") {
							re += c;
							continue;
						}
						clearStateChar();
						escaping = true;
						continue;
					case "?":
					case "*":
					case "+":
					case "@":
					case "!":
						this.debug("%s	%s %s %j <-- stateChar", pattern, i, re, c);
						if (inClass) {
							this.debug("  in class");
							if (c === "!" && i === classStart + 1) c = "^";
							re += c;
							continue;
						}
						if (c === "*" && stateChar === "*") continue;
						this.debug("call clearStateChar %j", stateChar);
						clearStateChar();
						stateChar = c;
						if (options.noext) clearStateChar();
						continue;
					case "(": {
						if (inClass) {
							re += "(";
							continue;
						}
						if (!stateChar) {
							re += "\\(";
							continue;
						}
						const plEntry = {
							type: stateChar,
							start: i - 1,
							reStart: re.length,
							open: plTypes[stateChar].open,
							close: plTypes[stateChar].close
						};
						this.debug(this.pattern, "	", plEntry);
						patternListStack.push(plEntry);
						re += plEntry.open;
						if (plEntry.start === 0 && plEntry.type !== "!") {
							dotTravAllowed = true;
							re += subPatternStart(pattern.slice(i + 1));
						}
						this.debug("plType %j %j", stateChar, re);
						stateChar = false;
						continue;
					}
					case ")": {
						const plEntry = patternListStack[patternListStack.length - 1];
						if (inClass || !plEntry) {
							re += "\\)";
							continue;
						}
						patternListStack.pop();
						clearStateChar();
						hasMagic = true;
						pl = plEntry;
						re += pl.close;
						if (pl.type === "!") negativeLists.push(Object.assign(pl, { reEnd: re.length }));
						continue;
					}
					case "|": {
						const plEntry = patternListStack[patternListStack.length - 1];
						if (inClass || !plEntry) {
							re += "\\|";
							continue;
						}
						clearStateChar();
						re += "|";
						if (plEntry.start === 0 && plEntry.type !== "!") {
							dotTravAllowed = true;
							re += subPatternStart(pattern.slice(i + 1));
						}
						continue;
					}
					case "[":
						clearStateChar();
						if (inClass) {
							re += "\\" + c;
							continue;
						}
						inClass = true;
						classStart = i;
						reClassStart = re.length;
						re += c;
						continue;
					case "]":
						if (i === classStart + 1 || !inClass) {
							re += "\\" + c;
							continue;
						}
						cs = pattern.substring(classStart + 1, i);
						try {
							RegExp("[" + braExpEscape(charUnescape(cs)) + "]");
							re += c;
						} catch (er) {
							re = re.substring(0, reClassStart) + "(?:$.)";
						}
						hasMagic = true;
						inClass = false;
						continue;
					default:
						clearStateChar();
						if (reSpecials[c] && !(c === "^" && inClass)) re += "\\";
						re += c;
				}
			}
			if (inClass) {
				cs = pattern.slice(classStart + 1);
				sp = this.parse(cs, SUBPARSE);
				re = re.substring(0, reClassStart) + "\\[" + sp[0];
				hasMagic = hasMagic || sp[1];
			}
			for (pl = patternListStack.pop(); pl; pl = patternListStack.pop()) {
				let tail;
				tail = re.slice(pl.reStart + pl.open.length);
				this.debug("setting tail", re, pl);
				tail = tail.replace(/((?:\\{2}){0,64})(\\?)\|/g, (_, $1, $2) => {
					/* istanbul ignore else - should already be done */
					if (!$2) $2 = "\\";
					return $1 + $1 + $2 + "|";
				});
				this.debug("tail=%j\n   %s", tail, tail, pl, re);
				const t = pl.type === "*" ? star : pl.type === "?" ? qmark : "\\" + pl.type;
				hasMagic = true;
				re = re.slice(0, pl.reStart) + t + "\\(" + tail;
			}
			clearStateChar();
			if (escaping) re += "\\\\";
			const addPatternStart = addPatternStartSet[re.charAt(0)];
			for (let n = negativeLists.length - 1; n > -1; n--) {
				const nl = negativeLists[n];
				const nlBefore = re.slice(0, nl.reStart);
				const nlFirst = re.slice(nl.reStart, nl.reEnd - 8);
				let nlAfter = re.slice(nl.reEnd);
				const nlLast = re.slice(nl.reEnd - 8, nl.reEnd) + nlAfter;
				const closeParensBefore = nlBefore.split(")").length;
				const openParensBefore = nlBefore.split("(").length - closeParensBefore;
				let cleanAfter = nlAfter;
				for (let i = 0; i < openParensBefore; i++) cleanAfter = cleanAfter.replace(/\)[+*?]?/, "");
				nlAfter = cleanAfter;
				const dollar = nlAfter === "" && isSub !== SUBPARSE ? "(?:$|\\/)" : "";
				re = nlBefore + nlFirst + nlAfter + dollar + nlLast;
			}
			if (re !== "" && hasMagic) re = "(?=.)" + re;
			if (addPatternStart) re = patternStart() + re;
			if (isSub === SUBPARSE) return [re, hasMagic];
			if (options.nocase && !hasMagic) hasMagic = pattern.toUpperCase() !== pattern.toLowerCase();
			if (!hasMagic) return globUnescape(pattern);
			const flags = options.nocase ? "i" : "";
			try {
				return Object.assign(new RegExp("^" + re + "$", flags), {
					_glob: pattern,
					_src: re
				});
			} catch (er) /* istanbul ignore next - should be impossible */ {
				return /* @__PURE__ */ new RegExp("$.");
			}
		}
		makeRe() {
			if (this.regexp || this.regexp === false) return this.regexp;
			const set = this.set;
			if (!set.length) {
				this.regexp = false;
				return this.regexp;
			}
			const options = this.options;
			const twoStar = options.noglobstar ? star : options.dot ? twoStarDot : twoStarNoDot;
			const flags = options.nocase ? "i" : "";
			let re = set.map((pattern) => {
				pattern = pattern.map((p) => typeof p === "string" ? regExpEscape(p) : p === GLOBSTAR ? GLOBSTAR : p._src).reduce((set, p) => {
					if (!(set[set.length - 1] === GLOBSTAR && p === GLOBSTAR)) set.push(p);
					return set;
				}, []);
				pattern.forEach((p, i) => {
					if (p !== GLOBSTAR || pattern[i - 1] === GLOBSTAR) return;
					if (i === 0) {
						if (pattern.length > 1) pattern[i + 1] = "(?:\\/|" + twoStar + "\\/)?" + pattern[i + 1];
						else pattern[i] = twoStar;
					} else if (i === pattern.length - 1) pattern[i - 1] += "(?:\\/|" + twoStar + ")?";
					else {
						pattern[i - 1] += "(?:\\/|\\/" + twoStar + "\\/)" + pattern[i + 1];
						pattern[i + 1] = GLOBSTAR;
					}
				});
				return pattern.filter((p) => p !== GLOBSTAR).join("/");
			}).join("|");
			re = "^(?:" + re + ")$";
			if (this.negate) re = "^(?!" + re + ").*$";
			try {
				this.regexp = new RegExp(re, flags);
			} catch (ex) /* istanbul ignore next - should be impossible */ {
				this.regexp = false;
			}
			return this.regexp;
		}
		match(f, partial = this.partial) {
			this.debug("match", f, this.pattern);
			if (this.comment) return false;
			if (this.empty) return f === "";
			if (f === "/" && partial) return true;
			const options = this.options;
			if (path.sep !== "/") f = f.split(path.sep).join("/");
			f = f.split(slashSplit);
			this.debug(this.pattern, "split", f);
			const set = this.set;
			this.debug(this.pattern, "set", set);
			let filename;
			for (let i = f.length - 1; i >= 0; i--) {
				filename = f[i];
				if (filename) break;
			}
			for (let i = 0; i < set.length; i++) {
				const pattern = set[i];
				let file = f;
				if (options.matchBase && pattern.length === 1) file = [filename];
				if (this.matchOne(file, pattern, partial)) {
					if (options.flipNegate) return true;
					return !this.negate;
				}
			}
			if (options.flipNegate) return false;
			return this.negate;
		}
		static defaults(def) {
			return minimatch.defaults(def).Minimatch;
		}
	};
	minimatch.Minimatch = Minimatch;
}));
//#endregion
//#region node_modules/readdir-glob/index.js
var require_readdir_glob = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = readdirGlob;
	var fs$5 = __require("fs");
	var { EventEmitter } = __require("events");
	var { Minimatch } = require_minimatch$1();
	var { resolve } = __require("path");
	function readdir(dir, strict) {
		return new Promise((resolve, reject) => {
			fs$5.readdir(dir, { withFileTypes: true }, (err, files) => {
				if (err) switch (err.code) {
					case "ENOTDIR":
						if (strict) reject(err);
						else resolve([]);
						break;
					case "ENOTSUP":
					case "ENOENT":
					case "ENAMETOOLONG":
					case "UNKNOWN":
						resolve([]);
						break;
					default: reject(err);
				}
				else resolve(files);
			});
		});
	}
	function stat(file, followSymlinks) {
		return new Promise((resolve, reject) => {
			(followSymlinks ? fs$5.stat : fs$5.lstat)(file, (err, stats) => {
				if (err) switch (err.code) {
					case "ENOENT":
						if (followSymlinks) resolve(stat(file, false));
						else resolve(null);
						break;
					default: resolve(null);
				}
				else resolve(stats);
			});
		});
	}
	async function* exploreWalkAsync(dir, path, followSymlinks, useStat, shouldSkip, strict) {
		let files = await readdir(path + dir, strict);
		for (const file of files) {
			let name = file.name;
			if (name === void 0) {
				name = file;
				useStat = true;
			}
			const filename = dir + "/" + name;
			const relative = filename.slice(1);
			const absolute = path + "/" + relative;
			let stats = null;
			if (useStat || followSymlinks) stats = await stat(absolute, followSymlinks);
			if (!stats && file.name !== void 0) stats = file;
			if (stats === null) stats = { isDirectory: () => false };
			if (stats.isDirectory()) {
				if (!shouldSkip(relative)) {
					yield {
						relative,
						absolute,
						stats
					};
					yield* exploreWalkAsync(filename, path, followSymlinks, useStat, shouldSkip, false);
				}
			} else yield {
				relative,
				absolute,
				stats
			};
		}
	}
	async function* explore(path, followSymlinks, useStat, shouldSkip) {
		yield* exploreWalkAsync("", path, followSymlinks, useStat, shouldSkip, true);
	}
	function readOptions(options) {
		return {
			pattern: options.pattern,
			dot: !!options.dot,
			noglobstar: !!options.noglobstar,
			matchBase: !!options.matchBase,
			nocase: !!options.nocase,
			ignore: options.ignore,
			skip: options.skip,
			follow: !!options.follow,
			stat: !!options.stat,
			nodir: !!options.nodir,
			mark: !!options.mark,
			silent: !!options.silent,
			absolute: !!options.absolute
		};
	}
	var ReaddirGlob = class extends EventEmitter {
		constructor(cwd, options, cb) {
			super();
			if (typeof options === "function") {
				cb = options;
				options = null;
			}
			this.options = readOptions(options || {});
			this.matchers = [];
			if (this.options.pattern) {
				const matchers = Array.isArray(this.options.pattern) ? this.options.pattern : [this.options.pattern];
				this.matchers = matchers.map((m) => new Minimatch(m, {
					dot: this.options.dot,
					noglobstar: this.options.noglobstar,
					matchBase: this.options.matchBase,
					nocase: this.options.nocase
				}));
			}
			this.ignoreMatchers = [];
			if (this.options.ignore) {
				const ignorePatterns = Array.isArray(this.options.ignore) ? this.options.ignore : [this.options.ignore];
				this.ignoreMatchers = ignorePatterns.map((ignore) => new Minimatch(ignore, { dot: true }));
			}
			this.skipMatchers = [];
			if (this.options.skip) {
				const skipPatterns = Array.isArray(this.options.skip) ? this.options.skip : [this.options.skip];
				this.skipMatchers = skipPatterns.map((skip) => new Minimatch(skip, { dot: true }));
			}
			this.iterator = explore(resolve(cwd || "."), this.options.follow, this.options.stat, this._shouldSkipDirectory.bind(this));
			this.paused = false;
			this.inactive = false;
			this.aborted = false;
			if (cb) {
				this._matches = [];
				this.on("match", (match) => this._matches.push(this.options.absolute ? match.absolute : match.relative));
				this.on("error", (err) => cb(err));
				this.on("end", () => cb(null, this._matches));
			}
			setTimeout(() => this._next(), 0);
		}
		_shouldSkipDirectory(relative) {
			return this.skipMatchers.some((m) => m.match(relative));
		}
		_fileMatches(relative, isDirectory) {
			const file = relative + (isDirectory ? "/" : "");
			return (this.matchers.length === 0 || this.matchers.some((m) => m.match(file))) && !this.ignoreMatchers.some((m) => m.match(file)) && (!this.options.nodir || !isDirectory);
		}
		_next() {
			if (!this.paused && !this.aborted) this.iterator.next().then((obj) => {
				if (!obj.done) {
					const isDirectory = obj.value.stats.isDirectory();
					if (this._fileMatches(obj.value.relative, isDirectory)) {
						let relative = obj.value.relative;
						let absolute = obj.value.absolute;
						if (this.options.mark && isDirectory) {
							relative += "/";
							absolute += "/";
						}
						if (this.options.stat) this.emit("match", {
							relative,
							absolute,
							stat: obj.value.stats
						});
						else this.emit("match", {
							relative,
							absolute
						});
					}
					this._next(this.iterator);
				} else this.emit("end");
			}).catch((err) => {
				this.abort();
				this.emit("error", err);
				if (!err.code && !this.options.silent) console.error(err);
			});
			else this.inactive = true;
		}
		abort() {
			this.aborted = true;
		}
		pause() {
			this.paused = true;
		}
		resume() {
			this.paused = false;
			if (this.inactive) {
				this.inactive = false;
				this._next();
			}
		}
	};
	function readdirGlob(pattern, options, cb) {
		return new ReaddirGlob(pattern, options, cb);
	}
	readdirGlob.ReaddirGlob = ReaddirGlob;
}));
//#endregion
//#region node_modules/async/dist/async.mjs
var async_exports = /* @__PURE__ */ __exportAll({
	all: () => every$1,
	allLimit: () => everyLimit$1,
	allSeries: () => everySeries$1,
	any: () => some$1,
	anyLimit: () => someLimit$1,
	anySeries: () => someSeries$1,
	apply: () => apply,
	applyEach: () => applyEach,
	applyEachSeries: () => applyEachSeries,
	asyncify: () => asyncify,
	auto: () => auto,
	autoInject: () => autoInject,
	cargo: () => cargo$1,
	cargoQueue: () => cargo,
	compose: () => compose,
	concat: () => concat$1,
	concatLimit: () => concatLimit$1,
	concatSeries: () => concatSeries$1,
	constant: () => constant$1,
	default: () => index,
	detect: () => detect$1,
	detectLimit: () => detectLimit$1,
	detectSeries: () => detectSeries$1,
	dir: () => dir,
	doDuring: () => doWhilst$1,
	doUntil: () => doUntil,
	doWhilst: () => doWhilst$1,
	during: () => whilst$1,
	each: () => each,
	eachLimit: () => eachLimit$1,
	eachOf: () => eachOf$1,
	eachOfLimit: () => eachOfLimit$1,
	eachOfSeries: () => eachOfSeries$1,
	eachSeries: () => eachSeries$1,
	ensureAsync: () => ensureAsync,
	every: () => every$1,
	everyLimit: () => everyLimit$1,
	everySeries: () => everySeries$1,
	filter: () => filter$1,
	filterLimit: () => filterLimit$1,
	filterSeries: () => filterSeries$1,
	find: () => detect$1,
	findLimit: () => detectLimit$1,
	findSeries: () => detectSeries$1,
	flatMap: () => concat$1,
	flatMapLimit: () => concatLimit$1,
	flatMapSeries: () => concatSeries$1,
	foldl: () => reduce$1,
	foldr: () => reduceRight,
	forEach: () => each,
	forEachLimit: () => eachLimit$1,
	forEachOf: () => eachOf$1,
	forEachOfLimit: () => eachOfLimit$1,
	forEachOfSeries: () => eachOfSeries$1,
	forEachSeries: () => eachSeries$1,
	forever: () => forever$1,
	groupBy: () => groupBy,
	groupByLimit: () => groupByLimit$1,
	groupBySeries: () => groupBySeries,
	inject: () => reduce$1,
	log: () => log,
	map: () => map$1,
	mapLimit: () => mapLimit$1,
	mapSeries: () => mapSeries$1,
	mapValues: () => mapValues,
	mapValuesLimit: () => mapValuesLimit$1,
	mapValuesSeries: () => mapValuesSeries,
	memoize: () => memoize,
	nextTick: () => nextTick,
	parallel: () => parallel,
	parallelLimit: () => parallelLimit,
	priorityQueue: () => priorityQueue,
	queue: () => queue,
	race: () => race$1,
	reduce: () => reduce$1,
	reduceRight: () => reduceRight,
	reflect: () => reflect,
	reflectAll: () => reflectAll,
	reject: () => reject$1,
	rejectLimit: () => rejectLimit$1,
	rejectSeries: () => rejectSeries$1,
	retry: () => retry,
	retryable: () => retryable,
	select: () => filter$1,
	selectLimit: () => filterLimit$1,
	selectSeries: () => filterSeries$1,
	seq: () => seq,
	series: () => series,
	setImmediate: () => setImmediate$1,
	some: () => some$1,
	someLimit: () => someLimit$1,
	someSeries: () => someSeries$1,
	sortBy: () => sortBy$1,
	timeout: () => timeout,
	times: () => times,
	timesLimit: () => timesLimit,
	timesSeries: () => timesSeries,
	transform: () => transform,
	tryEach: () => tryEach$1,
	unmemoize: () => unmemoize,
	until: () => until,
	waterfall: () => waterfall$1,
	whilst: () => whilst$1,
	wrapSync: () => asyncify
});
/**
* Creates a continuation function with some arguments already applied.
*
* Useful as a shorthand when combined with other control flow functions. Any
* arguments passed to the returned function are added to the arguments
* originally passed to apply.
*
* @name apply
* @static
* @memberOf module:Utils
* @method
* @category Util
* @param {Function} fn - The function you want to eventually apply all
* arguments to. Invokes with (arguments...).
* @param {...*} arguments... - Any number of arguments to automatically apply
* when the continuation is called.
* @returns {Function} the partially-applied function
* @example
*
* // using apply
* async.parallel([
*     async.apply(fs.writeFile, 'testfile1', 'test1'),
*     async.apply(fs.writeFile, 'testfile2', 'test2')
* ]);
*
*
* // the same process without using apply
* async.parallel([
*     function(callback) {
*         fs.writeFile('testfile1', 'test1', callback);
*     },
*     function(callback) {
*         fs.writeFile('testfile2', 'test2', callback);
*     }
* ]);
*
* // It's possible to pass any number of additional arguments when calling the
* // continuation:
*
* node> var fn = async.apply(sys.puts, 'one');
* node> fn('two', 'three');
* one
* two
* three
*/
function apply(fn, ...args) {
	return (...callArgs) => fn(...args, ...callArgs);
}
function initialParams(fn) {
	return function(...args) {
		var callback = args.pop();
		return fn.call(this, args, callback);
	};
}
/* istanbul ignore file */
function fallback(fn) {
	setTimeout(fn, 0);
}
function wrap(defer) {
	return (fn, ...args) => defer(() => fn(...args));
}
/**
* Take a sync function and make it async, passing its return value to a
* callback. This is useful for plugging sync functions into a waterfall,
* series, or other async functions. Any arguments passed to the generated
* function will be passed to the wrapped function (except for the final
* callback argument). Errors thrown will be passed to the callback.
*
* If the function passed to `asyncify` returns a Promise, that promises's
* resolved/rejected state will be used to call the callback, rather than simply
* the synchronous return value.
*
* This also means you can asyncify ES2017 `async` functions.
*
* @name asyncify
* @static
* @memberOf module:Utils
* @method
* @alias wrapSync
* @category Util
* @param {Function} func - The synchronous function, or Promise-returning
* function to convert to an {@link AsyncFunction}.
* @returns {AsyncFunction} An asynchronous wrapper of the `func`. To be
* invoked with `(args..., callback)`.
* @example
*
* // passing a regular synchronous function
* async.waterfall([
*     async.apply(fs.readFile, filename, "utf8"),
*     async.asyncify(JSON.parse),
*     function (data, next) {
*         // data is the result of parsing the text.
*         // If there was a parsing error, it would have been caught.
*     }
* ], callback);
*
* // passing a function returning a promise
* async.waterfall([
*     async.apply(fs.readFile, filename, "utf8"),
*     async.asyncify(function (contents) {
*         return db.model.create(contents);
*     }),
*     function (model, next) {
*         // `model` is the instantiated model object.
*         // If there was an error, this function would be skipped.
*     }
* ], callback);
*
* // es2017 example, though `asyncify` is not needed if your JS environment
* // supports async functions out of the box
* var q = async.queue(async.asyncify(async function(file) {
*     var intermediateStep = await processFile(file);
*     return await somePromise(intermediateStep)
* }));
*
* q.push(files);
*/
function asyncify(func) {
	if (isAsync(func)) return function(...args) {
		const callback = args.pop();
		return handlePromise(func.apply(this, args), callback);
	};
	return initialParams(function(args, callback) {
		var result;
		try {
			result = func.apply(this, args);
		} catch (e) {
			return callback(e);
		}
		if (result && typeof result.then === "function") return handlePromise(result, callback);
		else callback(null, result);
	});
}
function handlePromise(promise, callback) {
	return promise.then((value) => {
		invokeCallback(callback, null, value);
	}, (err) => {
		invokeCallback(callback, err && (err instanceof Error || err.message) ? err : new Error(err));
	});
}
function invokeCallback(callback, error, value) {
	try {
		callback(error, value);
	} catch (err) {
		setImmediate$1((e) => {
			throw e;
		}, err);
	}
}
function isAsync(fn) {
	return fn[Symbol.toStringTag] === "AsyncFunction";
}
function isAsyncGenerator(fn) {
	return fn[Symbol.toStringTag] === "AsyncGenerator";
}
function isAsyncIterable(obj) {
	return typeof obj[Symbol.asyncIterator] === "function";
}
function wrapAsync(asyncFn) {
	if (typeof asyncFn !== "function") throw new Error("expected a function");
	return isAsync(asyncFn) ? asyncify(asyncFn) : asyncFn;
}
function awaitify(asyncFn, arity) {
	if (!arity) arity = asyncFn.length;
	if (!arity) throw new Error("arity is undefined");
	function awaitable(...args) {
		if (typeof args[arity - 1] === "function") return asyncFn.apply(this, args);
		return new Promise((resolve, reject) => {
			args[arity - 1] = (err, ...cbArgs) => {
				if (err) return reject(err);
				resolve(cbArgs.length > 1 ? cbArgs : cbArgs[0]);
			};
			asyncFn.apply(this, args);
		});
	}
	return awaitable;
}
function applyEach$1(eachfn) {
	return function applyEach(fns, ...callArgs) {
		return awaitify(function(callback) {
			var that = this;
			return eachfn(fns, (fn, cb) => {
				wrapAsync(fn).apply(that, callArgs.concat(cb));
			}, callback);
		});
	};
}
function _asyncMap(eachfn, arr, iteratee, callback) {
	arr = arr || [];
	var results = [];
	var counter = 0;
	var _iteratee = wrapAsync(iteratee);
	return eachfn(arr, (value, _, iterCb) => {
		var index = counter++;
		_iteratee(value, (err, v) => {
			results[index] = v;
			iterCb(err);
		});
	}, (err) => {
		callback(err, results);
	});
}
function isArrayLike(value) {
	return value && typeof value.length === "number" && value.length >= 0 && value.length % 1 === 0;
}
function once(fn) {
	function wrapper(...args) {
		if (fn === null) return;
		var callFn = fn;
		fn = null;
		callFn.apply(this, args);
	}
	Object.assign(wrapper, fn);
	return wrapper;
}
function getIterator(coll) {
	return coll[Symbol.iterator] && coll[Symbol.iterator]();
}
function createArrayIterator(coll) {
	var i = -1;
	var len = coll.length;
	return function next() {
		return ++i < len ? {
			value: coll[i],
			key: i
		} : null;
	};
}
function createES2015Iterator(iterator) {
	var i = -1;
	return function next() {
		var item = iterator.next();
		if (item.done) return null;
		i++;
		return {
			value: item.value,
			key: i
		};
	};
}
function createObjectIterator(obj) {
	var okeys = obj ? Object.keys(obj) : [];
	var i = -1;
	var len = okeys.length;
	return function next() {
		var key = okeys[++i];
		if (key === "__proto__") return next();
		return i < len ? {
			value: obj[key],
			key
		} : null;
	};
}
function createIterator(coll) {
	if (isArrayLike(coll)) return createArrayIterator(coll);
	var iterator = getIterator(coll);
	return iterator ? createES2015Iterator(iterator) : createObjectIterator(coll);
}
function onlyOnce(fn) {
	return function(...args) {
		if (fn === null) throw new Error("Callback was already called.");
		var callFn = fn;
		fn = null;
		callFn.apply(this, args);
	};
}
function asyncEachOfLimit(generator, limit, iteratee, callback) {
	let done = false;
	let canceled = false;
	let awaiting = false;
	let running = 0;
	let idx = 0;
	function replenish() {
		if (running >= limit || awaiting || done) return;
		awaiting = true;
		generator.next().then(({ value, done: iterDone }) => {
			if (canceled || done) return;
			awaiting = false;
			if (iterDone) {
				done = true;
				if (running <= 0) callback(null);
				return;
			}
			running++;
			iteratee(value, idx, iterateeCallback);
			idx++;
			replenish();
		}).catch(handleError);
	}
	function iterateeCallback(err, result) {
		running -= 1;
		if (canceled) return;
		if (err) return handleError(err);
		if (err === false) {
			done = true;
			canceled = true;
			return;
		}
		if (result === breakLoop || done && running <= 0) {
			done = true;
			return callback(null);
		}
		replenish();
	}
	function handleError(err) {
		if (canceled) return;
		awaiting = false;
		done = true;
		callback(err);
	}
	replenish();
}
/**
* The same as [`eachOf`]{@link module:Collections.eachOf} but runs a maximum of `limit` async operations at a
* time.
*
* @name eachOfLimit
* @static
* @memberOf module:Collections
* @method
* @see [async.eachOf]{@link module:Collections.eachOf}
* @alias forEachOfLimit
* @category Collection
* @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
* @param {number} limit - The maximum number of async operations at a time.
* @param {AsyncFunction} iteratee - An async function to apply to each
* item in `coll`. The `key` is the item's key, or index in the case of an
* array.
* Invoked with (item, key, callback).
* @param {Function} [callback] - A callback which is called when all
* `iteratee` functions have finished, or an error occurs. Invoked with (err).
* @returns {Promise} a promise, if a callback is omitted
*/
function eachOfLimit(coll, limit, iteratee, callback) {
	return eachOfLimit$2(limit)(coll, wrapAsync(iteratee), callback);
}
function eachOfArrayLike(coll, iteratee, callback) {
	callback = once(callback);
	var index = 0, completed = 0, { length } = coll, canceled = false;
	if (length === 0) callback(null);
	function iteratorCallback(err, value) {
		if (err === false) canceled = true;
		if (canceled === true) return;
		if (err) callback(err);
		else if (++completed === length || value === breakLoop) callback(null);
	}
	for (; index < length; index++) iteratee(coll[index], index, onlyOnce(iteratorCallback));
}
function eachOfGeneric(coll, iteratee, callback) {
	return eachOfLimit$1(coll, Infinity, iteratee, callback);
}
/**
* Like [`each`]{@link module:Collections.each}, except that it passes the key (or index) as the second argument
* to the iteratee.
*
* @name eachOf
* @static
* @memberOf module:Collections
* @method
* @alias forEachOf
* @category Collection
* @see [async.each]{@link module:Collections.each}
* @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
* @param {AsyncFunction} iteratee - A function to apply to each
* item in `coll`.
* The `key` is the item's key, or index in the case of an array.
* Invoked with (item, key, callback).
* @param {Function} [callback] - A callback which is called when all
* `iteratee` functions have finished, or an error occurs. Invoked with (err).
* @returns {Promise} a promise, if a callback is omitted
* @example
*
* // dev.json is a file containing a valid json object config for dev environment
* // dev.json is a file containing a valid json object config for test environment
* // prod.json is a file containing a valid json object config for prod environment
* // invalid.json is a file with a malformed json object
*
* let configs = {}; //global variable
* let validConfigFileMap = {dev: 'dev.json', test: 'test.json', prod: 'prod.json'};
* let invalidConfigFileMap = {dev: 'dev.json', test: 'test.json', invalid: 'invalid.json'};
*
* // asynchronous function that reads a json file and parses the contents as json object
* function parseFile(file, key, callback) {
*     fs.readFile(file, "utf8", function(err, data) {
*         if (err) return calback(err);
*         try {
*             configs[key] = JSON.parse(data);
*         } catch (e) {
*             return callback(e);
*         }
*         callback();
*     });
* }
*
* // Using callbacks
* async.forEachOf(validConfigFileMap, parseFile, function (err) {
*     if (err) {
*         console.error(err);
*     } else {
*         console.log(configs);
*         // configs is now a map of JSON data, e.g.
*         // { dev: //parsed dev.json, test: //parsed test.json, prod: //parsed prod.json}
*     }
* });
*
* //Error handing
* async.forEachOf(invalidConfigFileMap, parseFile, function (err) {
*     if (err) {
*         console.error(err);
*         // JSON parse error exception
*     } else {
*         console.log(configs);
*     }
* });
*
* // Using Promises
* async.forEachOf(validConfigFileMap, parseFile)
* .then( () => {
*     console.log(configs);
*     // configs is now a map of JSON data, e.g.
*     // { dev: //parsed dev.json, test: //parsed test.json, prod: //parsed prod.json}
* }).catch( err => {
*     console.error(err);
* });
*
* //Error handing
* async.forEachOf(invalidConfigFileMap, parseFile)
* .then( () => {
*     console.log(configs);
* }).catch( err => {
*     console.error(err);
*     // JSON parse error exception
* });
*
* // Using async/await
* async () => {
*     try {
*         let result = await async.forEachOf(validConfigFileMap, parseFile);
*         console.log(configs);
*         // configs is now a map of JSON data, e.g.
*         // { dev: //parsed dev.json, test: //parsed test.json, prod: //parsed prod.json}
*     }
*     catch (err) {
*         console.log(err);
*     }
* }
*
* //Error handing
* async () => {
*     try {
*         let result = await async.forEachOf(invalidConfigFileMap, parseFile);
*         console.log(configs);
*     }
*     catch (err) {
*         console.log(err);
*         // JSON parse error exception
*     }
* }
*
*/
function eachOf(coll, iteratee, callback) {
	return (isArrayLike(coll) ? eachOfArrayLike : eachOfGeneric)(coll, wrapAsync(iteratee), callback);
}
/**
* Produces a new collection of values by mapping each value in `coll` through
* the `iteratee` function. The `iteratee` is called with an item from `coll`
* and a callback for when it has finished processing. Each of these callbacks
* takes 2 arguments: an `error`, and the transformed item from `coll`. If
* `iteratee` passes an error to its callback, the main `callback` (for the
* `map` function) is immediately called with the error.
*
* Note, that since this function applies the `iteratee` to each item in
* parallel, there is no guarantee that the `iteratee` functions will complete
* in order. However, the results array will be in the same order as the
* original `coll`.
*
* If `map` is passed an Object, the results will be an Array.  The results
* will roughly be in the order of the original Objects' keys (but this can
* vary across JavaScript engines).
*
* @name map
* @static
* @memberOf module:Collections
* @method
* @category Collection
* @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
* @param {AsyncFunction} iteratee - An async function to apply to each item in
* `coll`.
* The iteratee should complete with the transformed item.
* Invoked with (item, callback).
* @param {Function} [callback] - A callback which is called when all `iteratee`
* functions have finished, or an error occurs. Results is an Array of the
* transformed items from the `coll`. Invoked with (err, results).
* @returns {Promise} a promise, if no callback is passed
* @example
*
* // file1.txt is a file that is 1000 bytes in size
* // file2.txt is a file that is 2000 bytes in size
* // file3.txt is a file that is 3000 bytes in size
* // file4.txt does not exist
*
* const fileList = ['file1.txt','file2.txt','file3.txt'];
* const withMissingFileList = ['file1.txt','file2.txt','file4.txt'];
*
* // asynchronous function that returns the file size in bytes
* function getFileSizeInBytes(file, callback) {
*     fs.stat(file, function(err, stat) {
*         if (err) {
*             return callback(err);
*         }
*         callback(null, stat.size);
*     });
* }
*
* // Using callbacks
* async.map(fileList, getFileSizeInBytes, function(err, results) {
*     if (err) {
*         console.log(err);
*     } else {
*         console.log(results);
*         // results is now an array of the file size in bytes for each file, e.g.
*         // [ 1000, 2000, 3000]
*     }
* });
*
* // Error Handling
* async.map(withMissingFileList, getFileSizeInBytes, function(err, results) {
*     if (err) {
*         console.log(err);
*         // [ Error: ENOENT: no such file or directory ]
*     } else {
*         console.log(results);
*     }
* });
*
* // Using Promises
* async.map(fileList, getFileSizeInBytes)
* .then( results => {
*     console.log(results);
*     // results is now an array of the file size in bytes for each file, e.g.
*     // [ 1000, 2000, 3000]
* }).catch( err => {
*     console.log(err);
* });
*
* // Error Handling
* async.map(withMissingFileList, getFileSizeInBytes)
* .then( results => {
*     console.log(results);
* }).catch( err => {
*     console.log(err);
*     // [ Error: ENOENT: no such file or directory ]
* });
*
* // Using async/await
* async () => {
*     try {
*         let results = await async.map(fileList, getFileSizeInBytes);
*         console.log(results);
*         // results is now an array of the file size in bytes for each file, e.g.
*         // [ 1000, 2000, 3000]
*     }
*     catch (err) {
*         console.log(err);
*     }
* }
*
* // Error Handling
* async () => {
*     try {
*         let results = await async.map(withMissingFileList, getFileSizeInBytes);
*         console.log(results);
*     }
*     catch (err) {
*         console.log(err);
*         // [ Error: ENOENT: no such file or directory ]
*     }
* }
*
*/
function map(coll, iteratee, callback) {
	return _asyncMap(eachOf$1, coll, iteratee, callback);
}
/**
* The same as [`eachOf`]{@link module:Collections.eachOf} but runs only a single async operation at a time.
*
* @name eachOfSeries
* @static
* @memberOf module:Collections
* @method
* @see [async.eachOf]{@link module:Collections.eachOf}
* @alias forEachOfSeries
* @category Collection
* @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
* @param {AsyncFunction} iteratee - An async function to apply to each item in
* `coll`.
* Invoked with (item, key, callback).
* @param {Function} [callback] - A callback which is called when all `iteratee`
* functions have finished, or an error occurs. Invoked with (err).
* @returns {Promise} a promise, if a callback is omitted
*/
function eachOfSeries(coll, iteratee, callback) {
	return eachOfLimit$1(coll, 1, iteratee, callback);
}
/**
* The same as [`map`]{@link module:Collections.map} but runs only a single async operation at a time.
*
* @name mapSeries
* @static
* @memberOf module:Collections
* @method
* @see [async.map]{@link module:Collections.map}
* @category Collection
* @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
* @param {AsyncFunction} iteratee - An async function to apply to each item in
* `coll`.
* The iteratee should complete with the transformed item.
* Invoked with (item, callback).
* @param {Function} [callback] - A callback which is called when all `iteratee`
* functions have finished, or an error occurs. Results is an array of the
* transformed items from the `coll`. Invoked with (err, results).
* @returns {Promise} a promise, if no callback is passed
*/
function mapSeries(coll, iteratee, callback) {
	return _asyncMap(eachOfSeries$1, coll, iteratee, callback);
}
function promiseCallback() {
	let resolve, reject;
	function callback(err, ...args) {
		if (err) return reject(err);
		resolve(args.length > 1 ? args : args[0]);
	}
	callback[PROMISE_SYMBOL] = new Promise((res, rej) => {
		resolve = res, reject = rej;
	});
	return callback;
}
/**
* Determines the best order for running the {@link AsyncFunction}s in `tasks`, based on
* their requirements. Each function can optionally depend on other functions
* being completed first, and each function is run as soon as its requirements
* are satisfied.
*
* If any of the {@link AsyncFunction}s pass an error to their callback, the `auto` sequence
* will stop. Further tasks will not execute (so any other functions depending
* on it will not run), and the main `callback` is immediately called with the
* error.
*
* {@link AsyncFunction}s also receive an object containing the results of functions which
* have completed so far as the first argument, if they have dependencies. If a
* task function has no dependencies, it will only be passed a callback.
*
* @name auto
* @static
* @memberOf module:ControlFlow
* @method
* @category Control Flow
* @param {Object} tasks - An object. Each of its properties is either a
* function or an array of requirements, with the {@link AsyncFunction} itself the last item
* in the array. The object's key of a property serves as the name of the task
* defined by that property, i.e. can be used when specifying requirements for
* other tasks. The function receives one or two arguments:
* * a `results` object, containing the results of the previously executed
*   functions, only passed if the task has any dependencies,
* * a `callback(err, result)` function, which must be called when finished,
*   passing an `error` (which can be `null`) and the result of the function's
*   execution.
* @param {number} [concurrency=Infinity] - An optional `integer` for
* determining the maximum number of tasks that can be run in parallel. By
* default, as many as possible.
* @param {Function} [callback] - An optional callback which is called when all
* the tasks have been completed. It receives the `err` argument if any `tasks`
* pass an error to their callback. Results are always returned; however, if an
* error occurs, no further `tasks` will be performed, and the results object
* will only contain partial results. Invoked with (err, results).
* @returns {Promise} a promise, if a callback is not passed
* @example
*
* //Using Callbacks
* async.auto({
*     get_data: function(callback) {
*         // async code to get some data
*         callback(null, 'data', 'converted to array');
*     },
*     make_folder: function(callback) {
*         // async code to create a directory to store a file in
*         // this is run at the same time as getting the data
*         callback(null, 'folder');
*     },
*     write_file: ['get_data', 'make_folder', function(results, callback) {
*         // once there is some data and the directory exists,
*         // write the data to a file in the directory
*         callback(null, 'filename');
*     }],
*     email_link: ['write_file', function(results, callback) {
*         // once the file is written let's email a link to it...
*         callback(null, {'file':results.write_file, 'email':'user@example.com'});
*     }]
* }, function(err, results) {
*     if (err) {
*         console.log('err = ', err);
*     }
*     console.log('results = ', results);
*     // results = {
*     //     get_data: ['data', 'converted to array']
*     //     make_folder; 'folder',
*     //     write_file: 'filename'
*     //     email_link: { file: 'filename', email: 'user@example.com' }
*     // }
* });
*
* //Using Promises
* async.auto({
*     get_data: function(callback) {
*         console.log('in get_data');
*         // async code to get some data
*         callback(null, 'data', 'converted to array');
*     },
*     make_folder: function(callback) {
*         console.log('in make_folder');
*         // async code to create a directory to store a file in
*         // this is run at the same time as getting the data
*         callback(null, 'folder');
*     },
*     write_file: ['get_data', 'make_folder', function(results, callback) {
*         // once there is some data and the directory exists,
*         // write the data to a file in the directory
*         callback(null, 'filename');
*     }],
*     email_link: ['write_file', function(results, callback) {
*         // once the file is written let's email a link to it...
*         callback(null, {'file':results.write_file, 'email':'user@example.com'});
*     }]
* }).then(results => {
*     console.log('results = ', results);
*     // results = {
*     //     get_data: ['data', 'converted to array']
*     //     make_folder; 'folder',
*     //     write_file: 'filename'
*     //     email_link: { file: 'filename', email: 'user@example.com' }
*     // }
* }).catch(err => {
*     console.log('err = ', err);
* });
*
* //Using async/await
* async () => {
*     try {
*         let results = await async.auto({
*             get_data: function(callback) {
*                 // async code to get some data
*                 callback(null, 'data', 'converted to array');
*             },
*             make_folder: function(callback) {
*                 // async code to create a directory to store a file in
*                 // this is run at the same time as getting the data
*                 callback(null, 'folder');
*             },
*             write_file: ['get_data', 'make_folder', function(results, callback) {
*                 // once there is some data and the directory exists,
*                 // write the data to a file in the directory
*                 callback(null, 'filename');
*             }],
*             email_link: ['write_file', function(results, callback) {
*                 // once the file is written let's email a link to it...
*                 callback(null, {'file':results.write_file, 'email':'user@example.com'});
*             }]
*         });
*         console.log('results = ', results);
*         // results = {
*         //     get_data: ['data', 'converted to array']
*         //     make_folder; 'folder',
*         //     write_file: 'filename'
*         //     email_link: { file: 'filename', email: 'user@example.com' }
*         // }
*     }
*     catch (err) {
*         console.log(err);
*     }
* }
*
*/
function auto(tasks, concurrency, callback) {
	if (typeof concurrency !== "number") {
		callback = concurrency;
		concurrency = null;
	}
	callback = once(callback || promiseCallback());
	var numTasks = Object.keys(tasks).length;
	if (!numTasks) return callback(null);
	if (!concurrency) concurrency = numTasks;
	var results = {};
	var runningTasks = 0;
	var canceled = false;
	var hasError = false;
	var listeners = Object.create(null);
	var readyTasks = [];
	var readyToCheck = [];
	var uncheckedDependencies = {};
	Object.keys(tasks).forEach((key) => {
		var task = tasks[key];
		if (!Array.isArray(task)) {
			enqueueTask(key, [task]);
			readyToCheck.push(key);
			return;
		}
		var dependencies = task.slice(0, task.length - 1);
		var remainingDependencies = dependencies.length;
		if (remainingDependencies === 0) {
			enqueueTask(key, task);
			readyToCheck.push(key);
			return;
		}
		uncheckedDependencies[key] = remainingDependencies;
		dependencies.forEach((dependencyName) => {
			if (!tasks[dependencyName]) throw new Error("async.auto task `" + key + "` has a non-existent dependency `" + dependencyName + "` in " + dependencies.join(", "));
			addListener(dependencyName, () => {
				remainingDependencies--;
				if (remainingDependencies === 0) enqueueTask(key, task);
			});
		});
	});
	checkForDeadlocks();
	processQueue();
	function enqueueTask(key, task) {
		readyTasks.push(() => runTask(key, task));
	}
	function processQueue() {
		if (canceled) return;
		if (readyTasks.length === 0 && runningTasks === 0) return callback(null, results);
		while (readyTasks.length && runningTasks < concurrency) readyTasks.shift()();
	}
	function addListener(taskName, fn) {
		var taskListeners = listeners[taskName];
		if (!taskListeners) taskListeners = listeners[taskName] = [];
		taskListeners.push(fn);
	}
	function taskComplete(taskName) {
		(listeners[taskName] || []).forEach((fn) => fn());
		processQueue();
	}
	function runTask(key, task) {
		if (hasError) return;
		var taskCallback = onlyOnce((err, ...result) => {
			runningTasks--;
			if (err === false) {
				canceled = true;
				return;
			}
			if (result.length < 2) [result] = result;
			if (err) {
				var safeResults = {};
				Object.keys(results).forEach((rkey) => {
					safeResults[rkey] = results[rkey];
				});
				safeResults[key] = result;
				hasError = true;
				listeners = Object.create(null);
				if (canceled) return;
				callback(err, safeResults);
			} else {
				results[key] = result;
				taskComplete(key);
			}
		});
		runningTasks++;
		var taskFn = wrapAsync(task[task.length - 1]);
		if (task.length > 1) taskFn(results, taskCallback);
		else taskFn(taskCallback);
	}
	function checkForDeadlocks() {
		var currentTask;
		var counter = 0;
		while (readyToCheck.length) {
			currentTask = readyToCheck.pop();
			counter++;
			getDependents(currentTask).forEach((dependent) => {
				if (--uncheckedDependencies[dependent] === 0) readyToCheck.push(dependent);
			});
		}
		if (counter !== numTasks) throw new Error("async.auto cannot execute tasks due to a recursive dependency");
	}
	function getDependents(taskName) {
		var result = [];
		Object.keys(tasks).forEach((key) => {
			const task = tasks[key];
			if (Array.isArray(task) && task.indexOf(taskName) >= 0) result.push(key);
		});
		return result;
	}
	return callback[PROMISE_SYMBOL];
}
function stripComments(string) {
	let stripped = "";
	let index = 0;
	let endBlockComment = string.indexOf("*/");
	while (index < string.length) if (string[index] === "/" && string[index + 1] === "/") {
		let endIndex = string.indexOf("\n", index);
		index = endIndex === -1 ? string.length : endIndex;
	} else if (endBlockComment !== -1 && string[index] === "/" && string[index + 1] === "*") {
		let endIndex = string.indexOf("*/", index);
		if (endIndex !== -1) {
			index = endIndex + 2;
			endBlockComment = string.indexOf("*/", index);
		} else {
			stripped += string[index];
			index++;
		}
	} else {
		stripped += string[index];
		index++;
	}
	return stripped;
}
function parseParams(func) {
	const src = stripComments(func.toString());
	let match = src.match(FN_ARGS);
	if (!match) match = src.match(ARROW_FN_ARGS);
	if (!match) throw new Error("could not parse args in autoInject\nSource:\n" + src);
	let [, args] = match;
	return args.replace(/\s/g, "").split(FN_ARG_SPLIT).map((arg) => arg.replace(FN_ARG, "").trim());
}
/**
* A dependency-injected version of the [async.auto]{@link module:ControlFlow.auto} function. Dependent
* tasks are specified as parameters to the function, after the usual callback
* parameter, with the parameter names matching the names of the tasks it
* depends on. This can provide even more readable task graphs which can be
* easier to maintain.
*
* If a final callback is specified, the task results are similarly injected,
* specified as named parameters after the initial error parameter.
*
* The autoInject function is purely syntactic sugar and its semantics are
* otherwise equivalent to [async.auto]{@link module:ControlFlow.auto}.
*
* @name autoInject
* @static
* @memberOf module:ControlFlow
* @method
* @see [async.auto]{@link module:ControlFlow.auto}
* @category Control Flow
* @param {Object} tasks - An object, each of whose properties is an {@link AsyncFunction} of
* the form 'func([dependencies...], callback). The object's key of a property
* serves as the name of the task defined by that property, i.e. can be used
* when specifying requirements for other tasks.
* * The `callback` parameter is a `callback(err, result)` which must be called
*   when finished, passing an `error` (which can be `null`) and the result of
*   the function's execution. The remaining parameters name other tasks on
*   which the task is dependent, and the results from those tasks are the
*   arguments of those parameters.
* @param {Function} [callback] - An optional callback which is called when all
* the tasks have been completed. It receives the `err` argument if any `tasks`
* pass an error to their callback, and a `results` object with any completed
* task results, similar to `auto`.
* @returns {Promise} a promise, if no callback is passed
* @example
*
* //  The example from `auto` can be rewritten as follows:
* async.autoInject({
*     get_data: function(callback) {
*         // async code to get some data
*         callback(null, 'data', 'converted to array');
*     },
*     make_folder: function(callback) {
*         // async code to create a directory to store a file in
*         // this is run at the same time as getting the data
*         callback(null, 'folder');
*     },
*     write_file: function(get_data, make_folder, callback) {
*         // once there is some data and the directory exists,
*         // write the data to a file in the directory
*         callback(null, 'filename');
*     },
*     email_link: function(write_file, callback) {
*         // once the file is written let's email a link to it...
*         // write_file contains the filename returned by write_file.
*         callback(null, {'file':write_file, 'email':'user@example.com'});
*     }
* }, function(err, results) {
*     console.log('err = ', err);
*     console.log('email_link = ', results.email_link);
* });
*
* // If you are using a JS minifier that mangles parameter names, `autoInject`
* // will not work with plain functions, since the parameter names will be
* // collapsed to a single letter identifier.  To work around this, you can
* // explicitly specify the names of the parameters your task function needs
* // in an array, similar to Angular.js dependency injection.
*
* // This still has an advantage over plain `auto`, since the results a task
* // depends on are still spread into arguments.
* async.autoInject({
*     //...
*     write_file: ['get_data', 'make_folder', function(get_data, make_folder, callback) {
*         callback(null, 'filename');
*     }],
*     email_link: ['write_file', function(write_file, callback) {
*         callback(null, {'file':write_file, 'email':'user@example.com'});
*     }]
*     //...
* }, function(err, results) {
*     console.log('err = ', err);
*     console.log('email_link = ', results.email_link);
* });
*/
function autoInject(tasks, callback) {
	var newTasks = {};
	Object.keys(tasks).forEach((key) => {
		var taskFn = tasks[key];
		var params;
		var fnIsAsync = isAsync(taskFn);
		var hasNoDeps = !fnIsAsync && taskFn.length === 1 || fnIsAsync && taskFn.length === 0;
		if (Array.isArray(taskFn)) {
			params = [...taskFn];
			taskFn = params.pop();
			newTasks[key] = params.concat(params.length > 0 ? newTask : taskFn);
		} else if (hasNoDeps) newTasks[key] = taskFn;
		else {
			params = parseParams(taskFn);
			if (taskFn.length === 0 && !fnIsAsync && params.length === 0) throw new Error("autoInject task functions require explicit parameters.");
			if (!fnIsAsync) params.pop();
			newTasks[key] = params.concat(newTask);
		}
		function newTask(results, taskCb) {
			var newArgs = params.map((name) => results[name]);
			newArgs.push(taskCb);
			wrapAsync(taskFn)(...newArgs);
		}
	});
	return auto(newTasks, callback);
}
function setInitial(dll, node) {
	dll.length = 1;
	dll.head = dll.tail = node;
}
function queue$1(worker, concurrency, payload) {
	if (concurrency == null) concurrency = 1;
	else if (concurrency === 0) throw new RangeError("Concurrency must not be zero");
	var _worker = wrapAsync(worker);
	var numRunning = 0;
	var workersList = [];
	const events = {
		error: [],
		drain: [],
		saturated: [],
		unsaturated: [],
		empty: []
	};
	function on(event, handler) {
		events[event].push(handler);
	}
	function once(event, handler) {
		const handleAndRemove = (...args) => {
			off(event, handleAndRemove);
			handler(...args);
		};
		events[event].push(handleAndRemove);
	}
	function off(event, handler) {
		if (!event) return Object.keys(events).forEach((ev) => events[ev] = []);
		if (!handler) return events[event] = [];
		events[event] = events[event].filter((ev) => ev !== handler);
	}
	function trigger(event, ...args) {
		events[event].forEach((handler) => handler(...args));
	}
	var processingScheduled = false;
	function _insert(data, insertAtFront, rejectOnError, callback) {
		if (callback != null && typeof callback !== "function") throw new Error("task callback must be a function");
		q.started = true;
		var res, rej;
		function promiseCallback(err, ...args) {
			if (err) return rejectOnError ? rej(err) : res();
			if (args.length <= 1) return res(args[0]);
			res(args);
		}
		var item = q._createTaskItem(data, rejectOnError ? promiseCallback : callback || promiseCallback);
		if (insertAtFront) q._tasks.unshift(item);
		else q._tasks.push(item);
		if (!processingScheduled) {
			processingScheduled = true;
			setImmediate$1(() => {
				processingScheduled = false;
				q.process();
			});
		}
		if (rejectOnError || !callback) return new Promise((resolve, reject) => {
			res = resolve;
			rej = reject;
		});
	}
	function _createCB(tasks) {
		return function(err, ...args) {
			numRunning -= 1;
			for (var i = 0, l = tasks.length; i < l; i++) {
				var task = tasks[i];
				var index = workersList.indexOf(task);
				if (index === 0) workersList.shift();
				else if (index > 0) workersList.splice(index, 1);
				task.callback(err, ...args);
				if (err != null) trigger("error", err, task.data);
			}
			if (numRunning <= q.concurrency - q.buffer) trigger("unsaturated");
			if (q.idle()) trigger("drain");
			q.process();
		};
	}
	function _maybeDrain(data) {
		if (data.length === 0 && q.idle()) {
			setImmediate$1(() => trigger("drain"));
			return true;
		}
		return false;
	}
	const eventMethod = (name) => (handler) => {
		if (!handler) return new Promise((resolve, reject) => {
			once(name, (err, data) => {
				if (err) return reject(err);
				resolve(data);
			});
		});
		off(name);
		on(name, handler);
	};
	var isProcessing = false;
	var q = {
		_tasks: new DLL(),
		_createTaskItem(data, callback) {
			return {
				data,
				callback
			};
		},
		*[Symbol.iterator]() {
			yield* q._tasks[Symbol.iterator]();
		},
		concurrency,
		payload,
		buffer: concurrency / 4,
		started: false,
		paused: false,
		push(data, callback) {
			if (Array.isArray(data)) {
				if (_maybeDrain(data)) return;
				return data.map((datum) => _insert(datum, false, false, callback));
			}
			return _insert(data, false, false, callback);
		},
		pushAsync(data, callback) {
			if (Array.isArray(data)) {
				if (_maybeDrain(data)) return;
				return data.map((datum) => _insert(datum, false, true, callback));
			}
			return _insert(data, false, true, callback);
		},
		kill() {
			off();
			q._tasks.empty();
		},
		unshift(data, callback) {
			if (Array.isArray(data)) {
				if (_maybeDrain(data)) return;
				return data.map((datum) => _insert(datum, true, false, callback));
			}
			return _insert(data, true, false, callback);
		},
		unshiftAsync(data, callback) {
			if (Array.isArray(data)) {
				if (_maybeDrain(data)) return;
				return data.map((datum) => _insert(datum, true, true, callback));
			}
			return _insert(data, true, true, callback);
		},
		remove(testFn) {
			q._tasks.remove(testFn);
		},
		process() {
			if (isProcessing) return;
			isProcessing = true;
			while (!q.paused && numRunning < q.concurrency && q._tasks.length) {
				var tasks = [], data = [];
				var l = q._tasks.length;
				if (q.payload) l = Math.min(l, q.payload);
				for (var i = 0; i < l; i++) {
					var node = q._tasks.shift();
					tasks.push(node);
					workersList.push(node);
					data.push(node.data);
				}
				numRunning += 1;
				if (q._tasks.length === 0) trigger("empty");
				if (numRunning === q.concurrency) trigger("saturated");
				_worker(data, onlyOnce(_createCB(tasks)));
			}
			isProcessing = false;
		},
		length() {
			return q._tasks.length;
		},
		running() {
			return numRunning;
		},
		workersList() {
			return workersList;
		},
		idle() {
			return q._tasks.length + numRunning === 0;
		},
		pause() {
			q.paused = true;
		},
		resume() {
			if (q.paused === false) return;
			q.paused = false;
			setImmediate$1(q.process);
		}
	};
	Object.defineProperties(q, {
		saturated: {
			writable: false,
			value: eventMethod("saturated")
		},
		unsaturated: {
			writable: false,
			value: eventMethod("unsaturated")
		},
		empty: {
			writable: false,
			value: eventMethod("empty")
		},
		drain: {
			writable: false,
			value: eventMethod("drain")
		},
		error: {
			writable: false,
			value: eventMethod("error")
		}
	});
	return q;
}
/**
* Creates a `cargo` object with the specified payload. Tasks added to the
* cargo will be processed altogether (up to the `payload` limit). If the
* `worker` is in progress, the task is queued until it becomes available. Once
* the `worker` has completed some tasks, each callback of those tasks is
* called. Check out [these](https://camo.githubusercontent.com/6bbd36f4cf5b35a0f11a96dcd2e97711ffc2fb37/68747470733a2f2f662e636c6f75642e6769746875622e636f6d2f6173736574732f313637363837312f36383130382f62626330636662302d356632392d313165322d393734662d3333393763363464633835382e676966) [animations](https://camo.githubusercontent.com/f4810e00e1c5f5f8addbe3e9f49064fd5d102699/68747470733a2f2f662e636c6f75642e6769746875622e636f6d2f6173736574732f313637363837312f36383130312f38346339323036362d356632392d313165322d383134662d3964336430323431336266642e676966)
* for how `cargo` and `queue` work.
*
* While [`queue`]{@link module:ControlFlow.queue} passes only one task to one of a group of workers
* at a time, cargo passes an array of tasks to a single worker, repeating
* when the worker is finished.
*
* @name cargo
* @static
* @memberOf module:ControlFlow
* @method
* @see [async.queue]{@link module:ControlFlow.queue}
* @category Control Flow
* @param {AsyncFunction} worker - An asynchronous function for processing an array
* of queued tasks. Invoked with `(tasks, callback)`.
* @param {number} [payload=Infinity] - An optional `integer` for determining
* how many tasks should be processed per round; if omitted, the default is
* unlimited.
* @returns {module:ControlFlow.QueueObject} A cargo object to manage the tasks. Callbacks can
* attached as certain properties to listen for specific events during the
* lifecycle of the cargo and inner queue.
* @example
*
* // create a cargo object with payload 2
* var cargo = async.cargo(function(tasks, callback) {
*     for (var i=0; i<tasks.length; i++) {
*         console.log('hello ' + tasks[i].name);
*     }
*     callback();
* }, 2);
*
* // add some items
* cargo.push({name: 'foo'}, function(err) {
*     console.log('finished processing foo');
* });
* cargo.push({name: 'bar'}, function(err) {
*     console.log('finished processing bar');
* });
* await cargo.push({name: 'baz'});
* console.log('finished processing baz');
*/
function cargo$1(worker, payload) {
	return queue$1(worker, 1, payload);
}
/**
* Creates a `cargoQueue` object with the specified payload. Tasks added to the
* cargoQueue will be processed together (up to the `payload` limit) in `concurrency` parallel workers.
* If the all `workers` are in progress, the task is queued until one becomes available. Once
* a `worker` has completed some tasks, each callback of those tasks is
* called. Check out [these](https://camo.githubusercontent.com/6bbd36f4cf5b35a0f11a96dcd2e97711ffc2fb37/68747470733a2f2f662e636c6f75642e6769746875622e636f6d2f6173736574732f313637363837312f36383130382f62626330636662302d356632392d313165322d393734662d3333393763363464633835382e676966) [animations](https://camo.githubusercontent.com/f4810e00e1c5f5f8addbe3e9f49064fd5d102699/68747470733a2f2f662e636c6f75642e6769746875622e636f6d2f6173736574732f313637363837312f36383130312f38346339323036362d356632392d313165322d383134662d3964336430323431336266642e676966)
* for how `cargo` and `queue` work.
*
* While [`queue`]{@link module:ControlFlow.queue} passes only one task to one of a group of workers
* at a time, and [`cargo`]{@link module:ControlFlow.cargo} passes an array of tasks to a single worker,
* the cargoQueue passes an array of tasks to multiple parallel workers.
*
* @name cargoQueue
* @static
* @memberOf module:ControlFlow
* @method
* @see [async.queue]{@link module:ControlFlow.queue}
* @see [async.cargo]{@link module:ControlFLow.cargo}
* @category Control Flow
* @param {AsyncFunction} worker - An asynchronous function for processing an array
* of queued tasks. Invoked with `(tasks, callback)`.
* @param {number} [concurrency=1] - An `integer` for determining how many
* `worker` functions should be run in parallel.  If omitted, the concurrency
* defaults to `1`.  If the concurrency is `0`, an error is thrown.
* @param {number} [payload=Infinity] - An optional `integer` for determining
* how many tasks should be processed per round; if omitted, the default is
* unlimited.
* @returns {module:ControlFlow.QueueObject} A cargoQueue object to manage the tasks. Callbacks can
* attached as certain properties to listen for specific events during the
* lifecycle of the cargoQueue and inner queue.
* @example
*
* // create a cargoQueue object with payload 2 and concurrency 2
* var cargoQueue = async.cargoQueue(function(tasks, callback) {
*     for (var i=0; i<tasks.length; i++) {
*         console.log('hello ' + tasks[i].name);
*     }
*     callback();
* }, 2, 2);
*
* // add some items
* cargoQueue.push({name: 'foo'}, function(err) {
*     console.log('finished processing foo');
* });
* cargoQueue.push({name: 'bar'}, function(err) {
*     console.log('finished processing bar');
* });
* cargoQueue.push({name: 'baz'}, function(err) {
*     console.log('finished processing baz');
* });
* cargoQueue.push({name: 'boo'}, function(err) {
*     console.log('finished processing boo');
* });
*/
function cargo(worker, concurrency, payload) {
	return queue$1(worker, concurrency, payload);
}
/**
* Reduces `coll` into a single value using an async `iteratee` to return each
* successive step. `memo` is the initial state of the reduction. This function
* only operates in series.
*
* For performance reasons, it may make sense to split a call to this function
* into a parallel map, and then use the normal `Array.prototype.reduce` on the
* results. This function is for situations where each step in the reduction
* needs to be async; if you can get the data before reducing it, then it's
* probably a good idea to do so.
*
* @name reduce
* @static
* @memberOf module:Collections
* @method
* @alias inject
* @alias foldl
* @category Collection
* @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
* @param {*} memo - The initial state of the reduction.
* @param {AsyncFunction} iteratee - A function applied to each item in the
* array to produce the next step in the reduction.
* The `iteratee` should complete with the next state of the reduction.
* If the iteratee completes with an error, the reduction is stopped and the
* main `callback` is immediately called with the error.
* Invoked with (memo, item, callback).
* @param {Function} [callback] - A callback which is called after all the
* `iteratee` functions have finished. Result is the reduced value. Invoked with
* (err, result).
* @returns {Promise} a promise, if no callback is passed
* @example
*
* // file1.txt is a file that is 1000 bytes in size
* // file2.txt is a file that is 2000 bytes in size
* // file3.txt is a file that is 3000 bytes in size
* // file4.txt does not exist
*
* const fileList = ['file1.txt','file2.txt','file3.txt'];
* const withMissingFileList = ['file1.txt','file2.txt','file3.txt', 'file4.txt'];
*
* // asynchronous function that computes the file size in bytes
* // file size is added to the memoized value, then returned
* function getFileSizeInBytes(memo, file, callback) {
*     fs.stat(file, function(err, stat) {
*         if (err) {
*             return callback(err);
*         }
*         callback(null, memo + stat.size);
*     });
* }
*
* // Using callbacks
* async.reduce(fileList, 0, getFileSizeInBytes, function(err, result) {
*     if (err) {
*         console.log(err);
*     } else {
*         console.log(result);
*         // 6000
*         // which is the sum of the file sizes of the three files
*     }
* });
*
* // Error Handling
* async.reduce(withMissingFileList, 0, getFileSizeInBytes, function(err, result) {
*     if (err) {
*         console.log(err);
*         // [ Error: ENOENT: no such file or directory ]
*     } else {
*         console.log(result);
*     }
* });
*
* // Using Promises
* async.reduce(fileList, 0, getFileSizeInBytes)
* .then( result => {
*     console.log(result);
*     // 6000
*     // which is the sum of the file sizes of the three files
* }).catch( err => {
*     console.log(err);
* });
*
* // Error Handling
* async.reduce(withMissingFileList, 0, getFileSizeInBytes)
* .then( result => {
*     console.log(result);
* }).catch( err => {
*     console.log(err);
*     // [ Error: ENOENT: no such file or directory ]
* });
*
* // Using async/await
* async () => {
*     try {
*         let result = await async.reduce(fileList, 0, getFileSizeInBytes);
*         console.log(result);
*         // 6000
*         // which is the sum of the file sizes of the three files
*     }
*     catch (err) {
*         console.log(err);
*     }
* }
*
* // Error Handling
* async () => {
*     try {
*         let result = await async.reduce(withMissingFileList, 0, getFileSizeInBytes);
*         console.log(result);
*     }
*     catch (err) {
*         console.log(err);
*         // [ Error: ENOENT: no such file or directory ]
*     }
* }
*
*/
function reduce(coll, memo, iteratee, callback) {
	callback = once(callback);
	var _iteratee = wrapAsync(iteratee);
	return eachOfSeries$1(coll, (x, i, iterCb) => {
		_iteratee(memo, x, (err, v) => {
			memo = v;
			iterCb(err);
		});
	}, (err) => callback(err, memo));
}
/**
* Version of the compose function that is more natural to read. Each function
* consumes the return value of the previous function. It is the equivalent of
* [compose]{@link module:ControlFlow.compose} with the arguments reversed.
*
* Each function is executed with the `this` binding of the composed function.
*
* @name seq
* @static
* @memberOf module:ControlFlow
* @method
* @see [async.compose]{@link module:ControlFlow.compose}
* @category Control Flow
* @param {...AsyncFunction} functions - the asynchronous functions to compose
* @returns {Function} a function that composes the `functions` in order
* @example
*
* // Requires lodash (or underscore), express3 and dresende's orm2.
* // Part of an app, that fetches cats of the logged user.
* // This example uses `seq` function to avoid overnesting and error
* // handling clutter.
* app.get('/cats', function(request, response) {
*     var User = request.models.User;
*     async.seq(
*         User.get.bind(User),  // 'User.get' has signature (id, callback(err, data))
*         function(user, fn) {
*             user.getCats(fn);      // 'getCats' has signature (callback(err, data))
*         }
*     )(req.session.user_id, function (err, cats) {
*         if (err) {
*             console.error(err);
*             response.json({ status: 'error', message: err.message });
*         } else {
*             response.json({ status: 'ok', message: 'Cats found', data: cats });
*         }
*     });
* });
*/
function seq(...functions) {
	var _functions = functions.map(wrapAsync);
	return function(...args) {
		var that = this;
		var cb = args[args.length - 1];
		if (typeof cb == "function") args.pop();
		else cb = promiseCallback();
		reduce$1(_functions, args, (newargs, fn, iterCb) => {
			fn.apply(that, newargs.concat((err, ...nextargs) => {
				iterCb(err, nextargs);
			}));
		}, (err, results) => cb(err, ...results));
		return cb[PROMISE_SYMBOL];
	};
}
/**
* Creates a function which is a composition of the passed asynchronous
* functions. Each function consumes the return value of the function that
* follows. Composing functions `f()`, `g()`, and `h()` would produce the result
* of `f(g(h()))`, only this version uses callbacks to obtain the return values.
*
* If the last argument to the composed function is not a function, a promise
* is returned when you call it.
*
* Each function is executed with the `this` binding of the composed function.
*
* @name compose
* @static
* @memberOf module:ControlFlow
* @method
* @category Control Flow
* @param {...AsyncFunction} functions - the asynchronous functions to compose
* @returns {Function} an asynchronous function that is the composed
* asynchronous `functions`
* @example
*
* function add1(n, callback) {
*     setTimeout(function () {
*         callback(null, n + 1);
*     }, 10);
* }
*
* function mul3(n, callback) {
*     setTimeout(function () {
*         callback(null, n * 3);
*     }, 10);
* }
*
* var add1mul3 = async.compose(mul3, add1);
* add1mul3(4, function (err, result) {
*     // result now equals 15
* });
*/
function compose(...args) {
	return seq(...args.reverse());
}
/**
* The same as [`map`]{@link module:Collections.map} but runs a maximum of `limit` async operations at a time.
*
* @name mapLimit
* @static
* @memberOf module:Collections
* @method
* @see [async.map]{@link module:Collections.map}
* @category Collection
* @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
* @param {number} limit - The maximum number of async operations at a time.
* @param {AsyncFunction} iteratee - An async function to apply to each item in
* `coll`.
* The iteratee should complete with the transformed item.
* Invoked with (item, callback).
* @param {Function} [callback] - A callback which is called when all `iteratee`
* functions have finished, or an error occurs. Results is an array of the
* transformed items from the `coll`. Invoked with (err, results).
* @returns {Promise} a promise, if no callback is passed
*/
function mapLimit(coll, limit, iteratee, callback) {
	return _asyncMap(eachOfLimit$2(limit), coll, iteratee, callback);
}
/**
* The same as [`concat`]{@link module:Collections.concat} but runs a maximum of `limit` async operations at a time.
*
* @name concatLimit
* @static
* @memberOf module:Collections
* @method
* @see [async.concat]{@link module:Collections.concat}
* @category Collection
* @alias flatMapLimit
* @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
* @param {number} limit - The maximum number of async operations at a time.
* @param {AsyncFunction} iteratee - A function to apply to each item in `coll`,
* which should use an array as its result. Invoked with (item, callback).
* @param {Function} [callback] - A callback which is called after all the
* `iteratee` functions have finished, or an error occurs. Results is an array
* containing the concatenated results of the `iteratee` function. Invoked with
* (err, results).
* @returns A Promise, if no callback is passed
*/
function concatLimit(coll, limit, iteratee, callback) {
	var _iteratee = wrapAsync(iteratee);
	return mapLimit$1(coll, limit, (val, iterCb) => {
		_iteratee(val, (err, ...args) => {
			if (err) return iterCb(err);
			return iterCb(err, args);
		});
	}, (err, mapResults) => {
		var result = [];
		for (var i = 0; i < mapResults.length; i++) if (mapResults[i]) result = result.concat(...mapResults[i]);
		return callback(err, result);
	});
}
/**
* Applies `iteratee` to each item in `coll`, concatenating the results. Returns
* the concatenated list. The `iteratee`s are called in parallel, and the
* results are concatenated as they return. The results array will be returned in
* the original order of `coll` passed to the `iteratee` function.
*
* @name concat
* @static
* @memberOf module:Collections
* @method
* @category Collection
* @alias flatMap
* @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
* @param {AsyncFunction} iteratee - A function to apply to each item in `coll`,
* which should use an array as its result. Invoked with (item, callback).
* @param {Function} [callback] - A callback which is called after all the
* `iteratee` functions have finished, or an error occurs. Results is an array
* containing the concatenated results of the `iteratee` function. Invoked with
* (err, results).
* @returns A Promise, if no callback is passed
* @example
*
* // dir1 is a directory that contains file1.txt, file2.txt
* // dir2 is a directory that contains file3.txt, file4.txt
* // dir3 is a directory that contains file5.txt
* // dir4 does not exist
*
* let directoryList = ['dir1','dir2','dir3'];
* let withMissingDirectoryList = ['dir1','dir2','dir3', 'dir4'];
*
* // Using callbacks
* async.concat(directoryList, fs.readdir, function(err, results) {
*    if (err) {
*        console.log(err);
*    } else {
*        console.log(results);
*        // [ 'file1.txt', 'file2.txt', 'file3.txt', 'file4.txt', file5.txt ]
*    }
* });
*
* // Error Handling
* async.concat(withMissingDirectoryList, fs.readdir, function(err, results) {
*    if (err) {
*        console.log(err);
*        // [ Error: ENOENT: no such file or directory ]
*        // since dir4 does not exist
*    } else {
*        console.log(results);
*    }
* });
*
* // Using Promises
* async.concat(directoryList, fs.readdir)
* .then(results => {
*     console.log(results);
*     // [ 'file1.txt', 'file2.txt', 'file3.txt', 'file4.txt', file5.txt ]
* }).catch(err => {
*      console.log(err);
* });
*
* // Error Handling
* async.concat(withMissingDirectoryList, fs.readdir)
* .then(results => {
*     console.log(results);
* }).catch(err => {
*     console.log(err);
*     // [ Error: ENOENT: no such file or directory ]
*     // since dir4 does not exist
* });
*
* // Using async/await
* async () => {
*     try {
*         let results = await async.concat(directoryList, fs.readdir);
*         console.log(results);
*         // [ 'file1.txt', 'file2.txt', 'file3.txt', 'file4.txt', file5.txt ]
*     } catch (err) {
*         console.log(err);
*     }
* }
*
* // Error Handling
* async () => {
*     try {
*         let results = await async.concat(withMissingDirectoryList, fs.readdir);
*         console.log(results);
*     } catch (err) {
*         console.log(err);
*         // [ Error: ENOENT: no such file or directory ]
*         // since dir4 does not exist
*     }
* }
*
*/
function concat(coll, iteratee, callback) {
	return concatLimit$1(coll, Infinity, iteratee, callback);
}
/**
* The same as [`concat`]{@link module:Collections.concat} but runs only a single async operation at a time.
*
* @name concatSeries
* @static
* @memberOf module:Collections
* @method
* @see [async.concat]{@link module:Collections.concat}
* @category Collection
* @alias flatMapSeries
* @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
* @param {AsyncFunction} iteratee - A function to apply to each item in `coll`.
* The iteratee should complete with an array an array of results.
* Invoked with (item, callback).
* @param {Function} [callback] - A callback which is called after all the
* `iteratee` functions have finished, or an error occurs. Results is an array
* containing the concatenated results of the `iteratee` function. Invoked with
* (err, results).
* @returns A Promise, if no callback is passed
*/
function concatSeries(coll, iteratee, callback) {
	return concatLimit$1(coll, 1, iteratee, callback);
}
/**
* Returns a function that when called, calls-back with the values provided.
* Useful as the first function in a [`waterfall`]{@link module:ControlFlow.waterfall}, or for plugging values in to
* [`auto`]{@link module:ControlFlow.auto}.
*
* @name constant
* @static
* @memberOf module:Utils
* @method
* @category Util
* @param {...*} arguments... - Any number of arguments to automatically invoke
* callback with.
* @returns {AsyncFunction} Returns a function that when invoked, automatically
* invokes the callback with the previous given arguments.
* @example
*
* async.waterfall([
*     async.constant(42),
*     function (value, next) {
*         // value === 42
*     },
*     //...
* ], callback);
*
* async.waterfall([
*     async.constant(filename, "utf8"),
*     fs.readFile,
*     function (fileData, next) {
*         //...
*     }
*     //...
* ], callback);
*
* async.auto({
*     hostname: async.constant("https://server.net/"),
*     port: findFreePort,
*     launchServer: ["hostname", "port", function (options, cb) {
*         startServer(options, cb);
*     }],
*     //...
* }, callback);
*/
function constant$1(...args) {
	return function(...ignoredArgs) {
		return ignoredArgs.pop()(null, ...args);
	};
}
function _createTester(check, getResult) {
	return (eachfn, arr, _iteratee, cb) => {
		var testPassed = false;
		var testResult;
		const iteratee = wrapAsync(_iteratee);
		eachfn(arr, (value, _, callback) => {
			iteratee(value, (err, result) => {
				if (err || err === false) return callback(err);
				if (check(result) && !testResult) {
					testPassed = true;
					testResult = getResult(true, value);
					return callback(null, breakLoop);
				}
				callback();
			});
		}, (err) => {
			if (err) return cb(err);
			cb(null, testPassed ? testResult : getResult(false));
		});
	};
}
/**
* Returns the first value in `coll` that passes an async truth test. The
* `iteratee` is applied in parallel, meaning the first iteratee to return
* `true` will fire the detect `callback` with that result. That means the
* result might not be the first item in the original `coll` (in terms of order)
* that passes the test.

* If order within the original `coll` is important, then look at
* [`detectSeries`]{@link module:Collections.detectSeries}.
*
* @name detect
* @static
* @memberOf module:Collections
* @method
* @alias find
* @category Collections
* @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
* @param {AsyncFunction} iteratee - A truth test to apply to each item in `coll`.
* The iteratee must complete with a boolean value as its result.
* Invoked with (item, callback).
* @param {Function} [callback] - A callback which is called as soon as any
* iteratee returns `true`, or after all the `iteratee` functions have finished.
* Result will be the first item in the array that passes the truth test
* (iteratee) or the value `undefined` if none passed. Invoked with
* (err, result).
* @returns {Promise} a promise, if a callback is omitted
* @example
*
* // dir1 is a directory that contains file1.txt, file2.txt
* // dir2 is a directory that contains file3.txt, file4.txt
* // dir3 is a directory that contains file5.txt
*
* // asynchronous function that checks if a file exists
* function fileExists(file, callback) {
*    fs.access(file, fs.constants.F_OK, (err) => {
*        callback(null, !err);
*    });
* }
*
* async.detect(['file3.txt','file2.txt','dir1/file1.txt'], fileExists,
*    function(err, result) {
*        console.log(result);
*        // dir1/file1.txt
*        // result now equals the first file in the list that exists
*    }
*);
*
* // Using Promises
* async.detect(['file3.txt','file2.txt','dir1/file1.txt'], fileExists)
* .then(result => {
*     console.log(result);
*     // dir1/file1.txt
*     // result now equals the first file in the list that exists
* }).catch(err => {
*     console.log(err);
* });
*
* // Using async/await
* async () => {
*     try {
*         let result = await async.detect(['file3.txt','file2.txt','dir1/file1.txt'], fileExists);
*         console.log(result);
*         // dir1/file1.txt
*         // result now equals the file in the list that exists
*     }
*     catch (err) {
*         console.log(err);
*     }
* }
*
*/
function detect(coll, iteratee, callback) {
	return _createTester((bool) => bool, (res, item) => item)(eachOf$1, coll, iteratee, callback);
}
/**
* The same as [`detect`]{@link module:Collections.detect} but runs a maximum of `limit` async operations at a
* time.
*
* @name detectLimit
* @static
* @memberOf module:Collections
* @method
* @see [async.detect]{@link module:Collections.detect}
* @alias findLimit
* @category Collections
* @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
* @param {number} limit - The maximum number of async operations at a time.
* @param {AsyncFunction} iteratee - A truth test to apply to each item in `coll`.
* The iteratee must complete with a boolean value as its result.
* Invoked with (item, callback).
* @param {Function} [callback] - A callback which is called as soon as any
* iteratee returns `true`, or after all the `iteratee` functions have finished.
* Result will be the first item in the array that passes the truth test
* (iteratee) or the value `undefined` if none passed. Invoked with
* (err, result).
* @returns {Promise} a promise, if a callback is omitted
*/
function detectLimit(coll, limit, iteratee, callback) {
	return _createTester((bool) => bool, (res, item) => item)(eachOfLimit$2(limit), coll, iteratee, callback);
}
/**
* The same as [`detect`]{@link module:Collections.detect} but runs only a single async operation at a time.
*
* @name detectSeries
* @static
* @memberOf module:Collections
* @method
* @see [async.detect]{@link module:Collections.detect}
* @alias findSeries
* @category Collections
* @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
* @param {AsyncFunction} iteratee - A truth test to apply to each item in `coll`.
* The iteratee must complete with a boolean value as its result.
* Invoked with (item, callback).
* @param {Function} [callback] - A callback which is called as soon as any
* iteratee returns `true`, or after all the `iteratee` functions have finished.
* Result will be the first item in the array that passes the truth test
* (iteratee) or the value `undefined` if none passed. Invoked with
* (err, result).
* @returns {Promise} a promise, if a callback is omitted
*/
function detectSeries(coll, iteratee, callback) {
	return _createTester((bool) => bool, (res, item) => item)(eachOfLimit$2(1), coll, iteratee, callback);
}
function consoleFunc(name) {
	return (fn, ...args) => wrapAsync(fn)(...args, (err, ...resultArgs) => {
		/* istanbul ignore else */
		if (typeof console === "object") {
			/* istanbul ignore else */
			if (err) {
				/* istanbul ignore else */
				if (console.error) console.error(err);
			} else if (console[name]) resultArgs.forEach((x) => console[name](x));
		}
	});
}
/**
* The post-check version of [`whilst`]{@link module:ControlFlow.whilst}. To reflect the difference in
* the order of operations, the arguments `test` and `iteratee` are switched.
*
* `doWhilst` is to `whilst` as `do while` is to `while` in plain JavaScript.
*
* @name doWhilst
* @static
* @memberOf module:ControlFlow
* @method
* @see [async.whilst]{@link module:ControlFlow.whilst}
* @category Control Flow
* @param {AsyncFunction} iteratee - A function which is called each time `test`
* passes. Invoked with (callback).
* @param {AsyncFunction} test - asynchronous truth test to perform after each
* execution of `iteratee`. Invoked with (...args, callback), where `...args` are the
* non-error args from the previous callback of `iteratee`.
* @param {Function} [callback] - A callback which is called after the test
* function has failed and repeated execution of `iteratee` has stopped.
* `callback` will be passed an error and any arguments passed to the final
* `iteratee`'s callback. Invoked with (err, [results]);
* @returns {Promise} a promise, if no callback is passed
*/
function doWhilst(iteratee, test, callback) {
	callback = onlyOnce(callback);
	var _fn = wrapAsync(iteratee);
	var _test = wrapAsync(test);
	var results;
	function next(err, ...args) {
		if (err) return callback(err);
		if (err === false) return;
		results = args;
		_test(...args, check);
	}
	function check(err, truth) {
		if (err) return callback(err);
		if (err === false) return;
		if (!truth) return callback(null, ...results);
		_fn(next);
	}
	return check(null, true);
}
/**
* Like ['doWhilst']{@link module:ControlFlow.doWhilst}, except the `test` is inverted. Note the
* argument ordering differs from `until`.
*
* @name doUntil
* @static
* @memberOf module:ControlFlow
* @method
* @see [async.doWhilst]{@link module:ControlFlow.doWhilst}
* @category Control Flow
* @param {AsyncFunction} iteratee - An async function which is called each time
* `test` fails. Invoked with (callback).
* @param {AsyncFunction} test - asynchronous truth test to perform after each
* execution of `iteratee`. Invoked with (...args, callback), where `...args` are the
* non-error args from the previous callback of `iteratee`
* @param {Function} [callback] - A callback which is called after the test
* function has passed and repeated execution of `iteratee` has stopped. `callback`
* will be passed an error and any arguments passed to the final `iteratee`'s
* callback. Invoked with (err, [results]);
* @returns {Promise} a promise, if no callback is passed
*/
function doUntil(iteratee, test, callback) {
	const _test = wrapAsync(test);
	return doWhilst$1(iteratee, (...args) => {
		const cb = args.pop();
		_test(...args, (err, truth) => cb(err, !truth));
	}, callback);
}
function _withoutIndex(iteratee) {
	return (value, index, callback) => iteratee(value, callback);
}
/**
* Applies the function `iteratee` to each item in `coll`, in parallel.
* The `iteratee` is called with an item from the list, and a callback for when
* it has finished. If the `iteratee` passes an error to its `callback`, the
* main `callback` (for the `each` function) is immediately called with the
* error.
*
* Note, that since this function applies `iteratee` to each item in parallel,
* there is no guarantee that the iteratee functions will complete in order.
*
* @name each
* @static
* @memberOf module:Collections
* @method
* @alias forEach
* @category Collection
* @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
* @param {AsyncFunction} iteratee - An async function to apply to
* each item in `coll`. Invoked with (item, callback).
* The array index is not passed to the iteratee.
* If you need the index, use `eachOf`.
* @param {Function} [callback] - A callback which is called when all
* `iteratee` functions have finished, or an error occurs. Invoked with (err).
* @returns {Promise} a promise, if a callback is omitted
* @example
*
* // dir1 is a directory that contains file1.txt, file2.txt
* // dir2 is a directory that contains file3.txt, file4.txt
* // dir3 is a directory that contains file5.txt
* // dir4 does not exist
*
* const fileList = [ 'dir1/file2.txt', 'dir2/file3.txt', 'dir/file5.txt'];
* const withMissingFileList = ['dir1/file1.txt', 'dir4/file2.txt'];
*
* // asynchronous function that deletes a file
* const deleteFile = function(file, callback) {
*     fs.unlink(file, callback);
* };
*
* // Using callbacks
* async.each(fileList, deleteFile, function(err) {
*     if( err ) {
*         console.log(err);
*     } else {
*         console.log('All files have been deleted successfully');
*     }
* });
*
* // Error Handling
* async.each(withMissingFileList, deleteFile, function(err){
*     console.log(err);
*     // [ Error: ENOENT: no such file or directory ]
*     // since dir4/file2.txt does not exist
*     // dir1/file1.txt could have been deleted
* });
*
* // Using Promises
* async.each(fileList, deleteFile)
* .then( () => {
*     console.log('All files have been deleted successfully');
* }).catch( err => {
*     console.log(err);
* });
*
* // Error Handling
* async.each(fileList, deleteFile)
* .then( () => {
*     console.log('All files have been deleted successfully');
* }).catch( err => {
*     console.log(err);
*     // [ Error: ENOENT: no such file or directory ]
*     // since dir4/file2.txt does not exist
*     // dir1/file1.txt could have been deleted
* });
*
* // Using async/await
* async () => {
*     try {
*         await async.each(files, deleteFile);
*     }
*     catch (err) {
*         console.log(err);
*     }
* }
*
* // Error Handling
* async () => {
*     try {
*         await async.each(withMissingFileList, deleteFile);
*     }
*     catch (err) {
*         console.log(err);
*         // [ Error: ENOENT: no such file or directory ]
*         // since dir4/file2.txt does not exist
*         // dir1/file1.txt could have been deleted
*     }
* }
*
*/
function eachLimit$2(coll, iteratee, callback) {
	return eachOf$1(coll, _withoutIndex(wrapAsync(iteratee)), callback);
}
/**
* The same as [`each`]{@link module:Collections.each} but runs a maximum of `limit` async operations at a time.
*
* @name eachLimit
* @static
* @memberOf module:Collections
* @method
* @see [async.each]{@link module:Collections.each}
* @alias forEachLimit
* @category Collection
* @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
* @param {number} limit - The maximum number of async operations at a time.
* @param {AsyncFunction} iteratee - An async function to apply to each item in
* `coll`.
* The array index is not passed to the iteratee.
* If you need the index, use `eachOfLimit`.
* Invoked with (item, callback).
* @param {Function} [callback] - A callback which is called when all
* `iteratee` functions have finished, or an error occurs. Invoked with (err).
* @returns {Promise} a promise, if a callback is omitted
*/
function eachLimit(coll, limit, iteratee, callback) {
	return eachOfLimit$2(limit)(coll, _withoutIndex(wrapAsync(iteratee)), callback);
}
/**
* The same as [`each`]{@link module:Collections.each} but runs only a single async operation at a time.
*
* Note, that unlike [`each`]{@link module:Collections.each}, this function applies iteratee to each item
* in series and therefore the iteratee functions will complete in order.

* @name eachSeries
* @static
* @memberOf module:Collections
* @method
* @see [async.each]{@link module:Collections.each}
* @alias forEachSeries
* @category Collection
* @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
* @param {AsyncFunction} iteratee - An async function to apply to each
* item in `coll`.
* The array index is not passed to the iteratee.
* If you need the index, use `eachOfSeries`.
* Invoked with (item, callback).
* @param {Function} [callback] - A callback which is called when all
* `iteratee` functions have finished, or an error occurs. Invoked with (err).
* @returns {Promise} a promise, if a callback is omitted
*/
function eachSeries(coll, iteratee, callback) {
	return eachLimit$1(coll, 1, iteratee, callback);
}
/**
* Wrap an async function and ensure it calls its callback on a later tick of
* the event loop.  If the function already calls its callback on a next tick,
* no extra deferral is added. This is useful for preventing stack overflows
* (`RangeError: Maximum call stack size exceeded`) and generally keeping
* [Zalgo](http://blog.izs.me/post/59142742143/designing-apis-for-asynchrony)
* contained. ES2017 `async` functions are returned as-is -- they are immune
* to Zalgo's corrupting influences, as they always resolve on a later tick.
*
* @name ensureAsync
* @static
* @memberOf module:Utils
* @method
* @category Util
* @param {AsyncFunction} fn - an async function, one that expects a node-style
* callback as its last argument.
* @returns {AsyncFunction} Returns a wrapped function with the exact same call
* signature as the function passed in.
* @example
*
* function sometimesAsync(arg, callback) {
*     if (cache[arg]) {
*         return callback(null, cache[arg]); // this would be synchronous!!
*     } else {
*         doSomeIO(arg, callback); // this IO would be asynchronous
*     }
* }
*
* // this has a risk of stack overflows if many results are cached in a row
* async.mapSeries(args, sometimesAsync, done);
*
* // this will defer sometimesAsync's callback if necessary,
* // preventing stack overflows
* async.mapSeries(args, async.ensureAsync(sometimesAsync), done);
*/
function ensureAsync(fn) {
	if (isAsync(fn)) return fn;
	return function(...args) {
		var callback = args.pop();
		var sync = true;
		args.push((...innerArgs) => {
			if (sync) setImmediate$1(() => callback(...innerArgs));
			else callback(...innerArgs);
		});
		fn.apply(this, args);
		sync = false;
	};
}
/**
* Returns `true` if every element in `coll` satisfies an async test. If any
* iteratee call returns `false`, the main `callback` is immediately called.
*
* @name every
* @static
* @memberOf module:Collections
* @method
* @alias all
* @category Collection
* @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
* @param {AsyncFunction} iteratee - An async truth test to apply to each item
* in the collection in parallel.
* The iteratee must complete with a boolean result value.
* Invoked with (item, callback).
* @param {Function} [callback] - A callback which is called after all the
* `iteratee` functions have finished. Result will be either `true` or `false`
* depending on the values of the async tests. Invoked with (err, result).
* @returns {Promise} a promise, if no callback provided
* @example
*
* // dir1 is a directory that contains file1.txt, file2.txt
* // dir2 is a directory that contains file3.txt, file4.txt
* // dir3 is a directory that contains file5.txt
* // dir4 does not exist
*
* const fileList = ['dir1/file1.txt','dir2/file3.txt','dir3/file5.txt'];
* const withMissingFileList = ['file1.txt','file2.txt','file4.txt'];
*
* // asynchronous function that checks if a file exists
* function fileExists(file, callback) {
*    fs.access(file, fs.constants.F_OK, (err) => {
*        callback(null, !err);
*    });
* }
*
* // Using callbacks
* async.every(fileList, fileExists, function(err, result) {
*     console.log(result);
*     // true
*     // result is true since every file exists
* });
*
* async.every(withMissingFileList, fileExists, function(err, result) {
*     console.log(result);
*     // false
*     // result is false since NOT every file exists
* });
*
* // Using Promises
* async.every(fileList, fileExists)
* .then( result => {
*     console.log(result);
*     // true
*     // result is true since every file exists
* }).catch( err => {
*     console.log(err);
* });
*
* async.every(withMissingFileList, fileExists)
* .then( result => {
*     console.log(result);
*     // false
*     // result is false since NOT every file exists
* }).catch( err => {
*     console.log(err);
* });
*
* // Using async/await
* async () => {
*     try {
*         let result = await async.every(fileList, fileExists);
*         console.log(result);
*         // true
*         // result is true since every file exists
*     }
*     catch (err) {
*         console.log(err);
*     }
* }
*
* async () => {
*     try {
*         let result = await async.every(withMissingFileList, fileExists);
*         console.log(result);
*         // false
*         // result is false since NOT every file exists
*     }
*     catch (err) {
*         console.log(err);
*     }
* }
*
*/
function every(coll, iteratee, callback) {
	return _createTester((bool) => !bool, (res) => !res)(eachOf$1, coll, iteratee, callback);
}
/**
* The same as [`every`]{@link module:Collections.every} but runs a maximum of `limit` async operations at a time.
*
* @name everyLimit
* @static
* @memberOf module:Collections
* @method
* @see [async.every]{@link module:Collections.every}
* @alias allLimit
* @category Collection
* @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
* @param {number} limit - The maximum number of async operations at a time.
* @param {AsyncFunction} iteratee - An async truth test to apply to each item
* in the collection in parallel.
* The iteratee must complete with a boolean result value.
* Invoked with (item, callback).
* @param {Function} [callback] - A callback which is called after all the
* `iteratee` functions have finished. Result will be either `true` or `false`
* depending on the values of the async tests. Invoked with (err, result).
* @returns {Promise} a promise, if no callback provided
*/
function everyLimit(coll, limit, iteratee, callback) {
	return _createTester((bool) => !bool, (res) => !res)(eachOfLimit$2(limit), coll, iteratee, callback);
}
/**
* The same as [`every`]{@link module:Collections.every} but runs only a single async operation at a time.
*
* @name everySeries
* @static
* @memberOf module:Collections
* @method
* @see [async.every]{@link module:Collections.every}
* @alias allSeries
* @category Collection
* @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
* @param {AsyncFunction} iteratee - An async truth test to apply to each item
* in the collection in series.
* The iteratee must complete with a boolean result value.
* Invoked with (item, callback).
* @param {Function} [callback] - A callback which is called after all the
* `iteratee` functions have finished. Result will be either `true` or `false`
* depending on the values of the async tests. Invoked with (err, result).
* @returns {Promise} a promise, if no callback provided
*/
function everySeries(coll, iteratee, callback) {
	return _createTester((bool) => !bool, (res) => !res)(eachOfSeries$1, coll, iteratee, callback);
}
function filterArray(eachfn, arr, iteratee, callback) {
	var truthValues = new Array(arr.length);
	eachfn(arr, (x, index, iterCb) => {
		iteratee(x, (err, v) => {
			truthValues[index] = !!v;
			iterCb(err);
		});
	}, (err) => {
		if (err) return callback(err);
		var results = [];
		for (var i = 0; i < arr.length; i++) if (truthValues[i]) results.push(arr[i]);
		callback(null, results);
	});
}
function filterGeneric(eachfn, coll, iteratee, callback) {
	var results = [];
	eachfn(coll, (x, index, iterCb) => {
		iteratee(x, (err, v) => {
			if (err) return iterCb(err);
			if (v) results.push({
				index,
				value: x
			});
			iterCb(err);
		});
	}, (err) => {
		if (err) return callback(err);
		callback(null, results.sort((a, b) => a.index - b.index).map((v) => v.value));
	});
}
function _filter(eachfn, coll, iteratee, callback) {
	return (isArrayLike(coll) ? filterArray : filterGeneric)(eachfn, coll, wrapAsync(iteratee), callback);
}
/**
* Returns a new array of all the values in `coll` which pass an async truth
* test. This operation is performed in parallel, but the results array will be
* in the same order as the original.
*
* @name filter
* @static
* @memberOf module:Collections
* @method
* @alias select
* @category Collection
* @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
* @param {Function} iteratee - A truth test to apply to each item in `coll`.
* The `iteratee` is passed a `callback(err, truthValue)`, which must be called
* with a boolean argument once it has completed. Invoked with (item, callback).
* @param {Function} [callback] - A callback which is called after all the
* `iteratee` functions have finished. Invoked with (err, results).
* @returns {Promise} a promise, if no callback provided
* @example
*
* // dir1 is a directory that contains file1.txt, file2.txt
* // dir2 is a directory that contains file3.txt, file4.txt
* // dir3 is a directory that contains file5.txt
*
* const files = ['dir1/file1.txt','dir2/file3.txt','dir3/file6.txt'];
*
* // asynchronous function that checks if a file exists
* function fileExists(file, callback) {
*    fs.access(file, fs.constants.F_OK, (err) => {
*        callback(null, !err);
*    });
* }
*
* // Using callbacks
* async.filter(files, fileExists, function(err, results) {
*    if(err) {
*        console.log(err);
*    } else {
*        console.log(results);
*        // [ 'dir1/file1.txt', 'dir2/file3.txt' ]
*        // results is now an array of the existing files
*    }
* });
*
* // Using Promises
* async.filter(files, fileExists)
* .then(results => {
*     console.log(results);
*     // [ 'dir1/file1.txt', 'dir2/file3.txt' ]
*     // results is now an array of the existing files
* }).catch(err => {
*     console.log(err);
* });
*
* // Using async/await
* async () => {
*     try {
*         let results = await async.filter(files, fileExists);
*         console.log(results);
*         // [ 'dir1/file1.txt', 'dir2/file3.txt' ]
*         // results is now an array of the existing files
*     }
*     catch (err) {
*         console.log(err);
*     }
* }
*
*/
function filter(coll, iteratee, callback) {
	return _filter(eachOf$1, coll, iteratee, callback);
}
/**
* The same as [`filter`]{@link module:Collections.filter} but runs a maximum of `limit` async operations at a
* time.
*
* @name filterLimit
* @static
* @memberOf module:Collections
* @method
* @see [async.filter]{@link module:Collections.filter}
* @alias selectLimit
* @category Collection
* @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
* @param {number} limit - The maximum number of async operations at a time.
* @param {Function} iteratee - A truth test to apply to each item in `coll`.
* The `iteratee` is passed a `callback(err, truthValue)`, which must be called
* with a boolean argument once it has completed. Invoked with (item, callback).
* @param {Function} [callback] - A callback which is called after all the
* `iteratee` functions have finished. Invoked with (err, results).
* @returns {Promise} a promise, if no callback provided
*/
function filterLimit(coll, limit, iteratee, callback) {
	return _filter(eachOfLimit$2(limit), coll, iteratee, callback);
}
/**
* The same as [`filter`]{@link module:Collections.filter} but runs only a single async operation at a time.
*
* @name filterSeries
* @static
* @memberOf module:Collections
* @method
* @see [async.filter]{@link module:Collections.filter}
* @alias selectSeries
* @category Collection
* @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
* @param {Function} iteratee - A truth test to apply to each item in `coll`.
* The `iteratee` is passed a `callback(err, truthValue)`, which must be called
* with a boolean argument once it has completed. Invoked with (item, callback).
* @param {Function} [callback] - A callback which is called after all the
* `iteratee` functions have finished. Invoked with (err, results)
* @returns {Promise} a promise, if no callback provided
*/
function filterSeries(coll, iteratee, callback) {
	return _filter(eachOfSeries$1, coll, iteratee, callback);
}
/**
* Calls the asynchronous function `fn` with a callback parameter that allows it
* to call itself again, in series, indefinitely.

* If an error is passed to the callback then `errback` is called with the
* error, and execution stops, otherwise it will never be called.
*
* @name forever
* @static
* @memberOf module:ControlFlow
* @method
* @category Control Flow
* @param {AsyncFunction} fn - an async function to call repeatedly.
* Invoked with (next).
* @param {Function} [errback] - when `fn` passes an error to it's callback,
* this function will be called, and execution stops. Invoked with (err).
* @returns {Promise} a promise that rejects if an error occurs and an errback
* is not passed
* @example
*
* async.forever(
*     function(next) {
*         // next is suitable for passing to things that need a callback(err [, whatever]);
*         // it will result in this function being called again.
*     },
*     function(err) {
*         // if next is called with a value in its first parameter, it will appear
*         // in here as 'err', and execution will stop.
*     }
* );
*/
function forever(fn, errback) {
	var done = onlyOnce(errback);
	var task = wrapAsync(ensureAsync(fn));
	function next(err) {
		if (err) return done(err);
		if (err === false) return;
		task(next);
	}
	return next();
}
/**
* The same as [`groupBy`]{@link module:Collections.groupBy} but runs a maximum of `limit` async operations at a time.
*
* @name groupByLimit
* @static
* @memberOf module:Collections
* @method
* @see [async.groupBy]{@link module:Collections.groupBy}
* @category Collection
* @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
* @param {number} limit - The maximum number of async operations at a time.
* @param {AsyncFunction} iteratee - An async function to apply to each item in
* `coll`.
* The iteratee should complete with a `key` to group the value under.
* Invoked with (value, callback).
* @param {Function} [callback] - A callback which is called when all `iteratee`
* functions have finished, or an error occurs. Result is an `Object` whoses
* properties are arrays of values which returned the corresponding key.
* @returns {Promise} a promise, if no callback is passed
*/
function groupByLimit(coll, limit, iteratee, callback) {
	var _iteratee = wrapAsync(iteratee);
	return mapLimit$1(coll, limit, (val, iterCb) => {
		_iteratee(val, (err, key) => {
			if (err) return iterCb(err);
			return iterCb(err, {
				key,
				val
			});
		});
	}, (err, mapResults) => {
		var result = {};
		var { hasOwnProperty } = Object.prototype;
		for (var i = 0; i < mapResults.length; i++) if (mapResults[i]) {
			var { key } = mapResults[i];
			var { val } = mapResults[i];
			if (hasOwnProperty.call(result, key)) result[key].push(val);
			else result[key] = [val];
		}
		return callback(err, result);
	});
}
/**
* Returns a new object, where each value corresponds to an array of items, from
* `coll`, that returned the corresponding key. That is, the keys of the object
* correspond to the values passed to the `iteratee` callback.
*
* Note: Since this function applies the `iteratee` to each item in parallel,
* there is no guarantee that the `iteratee` functions will complete in order.
* However, the values for each key in the `result` will be in the same order as
* the original `coll`. For Objects, the values will roughly be in the order of
* the original Objects' keys (but this can vary across JavaScript engines).
*
* @name groupBy
* @static
* @memberOf module:Collections
* @method
* @category Collection
* @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
* @param {AsyncFunction} iteratee - An async function to apply to each item in
* `coll`.
* The iteratee should complete with a `key` to group the value under.
* Invoked with (value, callback).
* @param {Function} [callback] - A callback which is called when all `iteratee`
* functions have finished, or an error occurs. Result is an `Object` whoses
* properties are arrays of values which returned the corresponding key.
* @returns {Promise} a promise, if no callback is passed
* @example
*
* // dir1 is a directory that contains file1.txt, file2.txt
* // dir2 is a directory that contains file3.txt, file4.txt
* // dir3 is a directory that contains file5.txt
* // dir4 does not exist
*
* const files = ['dir1/file1.txt','dir2','dir4']
*
* // asynchronous function that detects file type as none, file, or directory
* function detectFile(file, callback) {
*     fs.stat(file, function(err, stat) {
*         if (err) {
*             return callback(null, 'none');
*         }
*         callback(null, stat.isDirectory() ? 'directory' : 'file');
*     });
* }
*
* //Using callbacks
* async.groupBy(files, detectFile, function(err, result) {
*     if(err) {
*         console.log(err);
*     } else {
*	       console.log(result);
*         // {
*         //     file: [ 'dir1/file1.txt' ],
*         //     none: [ 'dir4' ],
*         //     directory: [ 'dir2']
*         // }
*         // result is object containing the files grouped by type
*     }
* });
*
* // Using Promises
* async.groupBy(files, detectFile)
* .then( result => {
*     console.log(result);
*     // {
*     //     file: [ 'dir1/file1.txt' ],
*     //     none: [ 'dir4' ],
*     //     directory: [ 'dir2']
*     // }
*     // result is object containing the files grouped by type
* }).catch( err => {
*     console.log(err);
* });
*
* // Using async/await
* async () => {
*     try {
*         let result = await async.groupBy(files, detectFile);
*         console.log(result);
*         // {
*         //     file: [ 'dir1/file1.txt' ],
*         //     none: [ 'dir4' ],
*         //     directory: [ 'dir2']
*         // }
*         // result is object containing the files grouped by type
*     }
*     catch (err) {
*         console.log(err);
*     }
* }
*
*/
function groupBy(coll, iteratee, callback) {
	return groupByLimit$1(coll, Infinity, iteratee, callback);
}
/**
* The same as [`groupBy`]{@link module:Collections.groupBy} but runs only a single async operation at a time.
*
* @name groupBySeries
* @static
* @memberOf module:Collections
* @method
* @see [async.groupBy]{@link module:Collections.groupBy}
* @category Collection
* @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
* @param {AsyncFunction} iteratee - An async function to apply to each item in
* `coll`.
* The iteratee should complete with a `key` to group the value under.
* Invoked with (value, callback).
* @param {Function} [callback] - A callback which is called when all `iteratee`
* functions have finished, or an error occurs. Result is an `Object` whose
* properties are arrays of values which returned the corresponding key.
* @returns {Promise} a promise, if no callback is passed
*/
function groupBySeries(coll, iteratee, callback) {
	return groupByLimit$1(coll, 1, iteratee, callback);
}
/**
* The same as [`mapValues`]{@link module:Collections.mapValues} but runs a maximum of `limit` async operations at a
* time.
*
* @name mapValuesLimit
* @static
* @memberOf module:Collections
* @method
* @see [async.mapValues]{@link module:Collections.mapValues}
* @category Collection
* @param {Object} obj - A collection to iterate over.
* @param {number} limit - The maximum number of async operations at a time.
* @param {AsyncFunction} iteratee - A function to apply to each value and key
* in `coll`.
* The iteratee should complete with the transformed value as its result.
* Invoked with (value, key, callback).
* @param {Function} [callback] - A callback which is called when all `iteratee`
* functions have finished, or an error occurs. `result` is a new object consisting
* of each key from `obj`, with each transformed value on the right-hand side.
* Invoked with (err, result).
* @returns {Promise} a promise, if no callback is passed
*/
function mapValuesLimit(obj, limit, iteratee, callback) {
	callback = once(callback);
	var newObj = {};
	var _iteratee = wrapAsync(iteratee);
	return eachOfLimit$2(limit)(obj, (val, key, next) => {
		_iteratee(val, key, (err, result) => {
			if (err) return next(err);
			newObj[key] = result;
			next(err);
		});
	}, (err) => callback(err, newObj));
}
/**
* A relative of [`map`]{@link module:Collections.map}, designed for use with objects.
*
* Produces a new Object by mapping each value of `obj` through the `iteratee`
* function. The `iteratee` is called each `value` and `key` from `obj` and a
* callback for when it has finished processing. Each of these callbacks takes
* two arguments: an `error`, and the transformed item from `obj`. If `iteratee`
* passes an error to its callback, the main `callback` (for the `mapValues`
* function) is immediately called with the error.
*
* Note, the order of the keys in the result is not guaranteed.  The keys will
* be roughly in the order they complete, (but this is very engine-specific)
*
* @name mapValues
* @static
* @memberOf module:Collections
* @method
* @category Collection
* @param {Object} obj - A collection to iterate over.
* @param {AsyncFunction} iteratee - A function to apply to each value and key
* in `coll`.
* The iteratee should complete with the transformed value as its result.
* Invoked with (value, key, callback).
* @param {Function} [callback] - A callback which is called when all `iteratee`
* functions have finished, or an error occurs. `result` is a new object consisting
* of each key from `obj`, with each transformed value on the right-hand side.
* Invoked with (err, result).
* @returns {Promise} a promise, if no callback is passed
* @example
*
* // file1.txt is a file that is 1000 bytes in size
* // file2.txt is a file that is 2000 bytes in size
* // file3.txt is a file that is 3000 bytes in size
* // file4.txt does not exist
*
* const fileMap = {
*     f1: 'file1.txt',
*     f2: 'file2.txt',
*     f3: 'file3.txt'
* };
*
* const withMissingFileMap = {
*     f1: 'file1.txt',
*     f2: 'file2.txt',
*     f3: 'file4.txt'
* };
*
* // asynchronous function that returns the file size in bytes
* function getFileSizeInBytes(file, key, callback) {
*     fs.stat(file, function(err, stat) {
*         if (err) {
*             return callback(err);
*         }
*         callback(null, stat.size);
*     });
* }
*
* // Using callbacks
* async.mapValues(fileMap, getFileSizeInBytes, function(err, result) {
*     if (err) {
*         console.log(err);
*     } else {
*         console.log(result);
*         // result is now a map of file size in bytes for each file, e.g.
*         // {
*         //     f1: 1000,
*         //     f2: 2000,
*         //     f3: 3000
*         // }
*     }
* });
*
* // Error handling
* async.mapValues(withMissingFileMap, getFileSizeInBytes, function(err, result) {
*     if (err) {
*         console.log(err);
*         // [ Error: ENOENT: no such file or directory ]
*     } else {
*         console.log(result);
*     }
* });
*
* // Using Promises
* async.mapValues(fileMap, getFileSizeInBytes)
* .then( result => {
*     console.log(result);
*     // result is now a map of file size in bytes for each file, e.g.
*     // {
*     //     f1: 1000,
*     //     f2: 2000,
*     //     f3: 3000
*     // }
* }).catch (err => {
*     console.log(err);
* });
*
* // Error Handling
* async.mapValues(withMissingFileMap, getFileSizeInBytes)
* .then( result => {
*     console.log(result);
* }).catch (err => {
*     console.log(err);
*     // [ Error: ENOENT: no such file or directory ]
* });
*
* // Using async/await
* async () => {
*     try {
*         let result = await async.mapValues(fileMap, getFileSizeInBytes);
*         console.log(result);
*         // result is now a map of file size in bytes for each file, e.g.
*         // {
*         //     f1: 1000,
*         //     f2: 2000,
*         //     f3: 3000
*         // }
*     }
*     catch (err) {
*         console.log(err);
*     }
* }
*
* // Error Handling
* async () => {
*     try {
*         let result = await async.mapValues(withMissingFileMap, getFileSizeInBytes);
*         console.log(result);
*     }
*     catch (err) {
*         console.log(err);
*         // [ Error: ENOENT: no such file or directory ]
*     }
* }
*
*/
function mapValues(obj, iteratee, callback) {
	return mapValuesLimit$1(obj, Infinity, iteratee, callback);
}
/**
* The same as [`mapValues`]{@link module:Collections.mapValues} but runs only a single async operation at a time.
*
* @name mapValuesSeries
* @static
* @memberOf module:Collections
* @method
* @see [async.mapValues]{@link module:Collections.mapValues}
* @category Collection
* @param {Object} obj - A collection to iterate over.
* @param {AsyncFunction} iteratee - A function to apply to each value and key
* in `coll`.
* The iteratee should complete with the transformed value as its result.
* Invoked with (value, key, callback).
* @param {Function} [callback] - A callback which is called when all `iteratee`
* functions have finished, or an error occurs. `result` is a new object consisting
* of each key from `obj`, with each transformed value on the right-hand side.
* Invoked with (err, result).
* @returns {Promise} a promise, if no callback is passed
*/
function mapValuesSeries(obj, iteratee, callback) {
	return mapValuesLimit$1(obj, 1, iteratee, callback);
}
/**
* Caches the results of an async function. When creating a hash to store
* function results against, the callback is omitted from the hash and an
* optional hash function can be used.
*
* **Note: if the async function errs, the result will not be cached and
* subsequent calls will call the wrapped function.**
*
* If no hash function is specified, the first argument is used as a hash key,
* which may work reasonably if it is a string or a data type that converts to a
* distinct string. Note that objects and arrays will not behave reasonably.
* Neither will cases where the other arguments are significant. In such cases,
* specify your own hash function.
*
* The cache of results is exposed as the `memo` property of the function
* returned by `memoize`.
*
* @name memoize
* @static
* @memberOf module:Utils
* @method
* @category Util
* @param {AsyncFunction} fn - The async function to proxy and cache results from.
* @param {Function} hasher - An optional function for generating a custom hash
* for storing results. It has all the arguments applied to it apart from the
* callback, and must be synchronous.
* @returns {AsyncFunction} a memoized version of `fn`
* @example
*
* var slow_fn = function(name, callback) {
*     // do something
*     callback(null, result);
* };
* var fn = async.memoize(slow_fn);
*
* // fn can now be used as if it were slow_fn
* fn('some name', function() {
*     // callback
* });
*/
function memoize(fn, hasher = (v) => v) {
	var memo = Object.create(null);
	var queues = Object.create(null);
	var _fn = wrapAsync(fn);
	var memoized = initialParams((args, callback) => {
		var key = hasher(...args);
		if (key in memo) setImmediate$1(() => callback(null, ...memo[key]));
		else if (key in queues) queues[key].push(callback);
		else {
			queues[key] = [callback];
			_fn(...args, (err, ...resultArgs) => {
				if (!err) memo[key] = resultArgs;
				var q = queues[key];
				delete queues[key];
				for (var i = 0, l = q.length; i < l; i++) q[i](err, ...resultArgs);
			});
		}
	});
	memoized.memo = memo;
	memoized.unmemoized = fn;
	return memoized;
}
/* istanbul ignore file */
/**
* Run the `tasks` collection of functions in parallel, without waiting until
* the previous function has completed. If any of the functions pass an error to
* its callback, the main `callback` is immediately called with the value of the
* error. Once the `tasks` have completed, the results are passed to the final
* `callback` as an array.
*
* **Note:** `parallel` is about kicking-off I/O tasks in parallel, not about
* parallel execution of code.  If your tasks do not use any timers or perform
* any I/O, they will actually be executed in series.  Any synchronous setup
* sections for each task will happen one after the other.  JavaScript remains
* single-threaded.
*
* **Hint:** Use [`reflect`]{@link module:Utils.reflect} to continue the
* execution of other tasks when a task fails.
*
* It is also possible to use an object instead of an array. Each property will
* be run as a function and the results will be passed to the final `callback`
* as an object instead of an array. This can be a more readable way of handling
* results from {@link async.parallel}.
*
* @name parallel
* @static
* @memberOf module:ControlFlow
* @method
* @category Control Flow
* @param {Array|Iterable|AsyncIterable|Object} tasks - A collection of
* [async functions]{@link AsyncFunction} to run.
* Each async function can complete with any number of optional `result` values.
* @param {Function} [callback] - An optional callback to run once all the
* functions have completed successfully. This function gets a results array
* (or object) containing all the result arguments passed to the task callbacks.
* Invoked with (err, results).
* @returns {Promise} a promise, if a callback is not passed
*
* @example
*
* //Using Callbacks
* async.parallel([
*     function(callback) {
*         setTimeout(function() {
*             callback(null, 'one');
*         }, 200);
*     },
*     function(callback) {
*         setTimeout(function() {
*             callback(null, 'two');
*         }, 100);
*     }
* ], function(err, results) {
*     console.log(results);
*     // results is equal to ['one','two'] even though
*     // the second function had a shorter timeout.
* });
*
* // an example using an object instead of an array
* async.parallel({
*     one: function(callback) {
*         setTimeout(function() {
*             callback(null, 1);
*         }, 200);
*     },
*     two: function(callback) {
*         setTimeout(function() {
*             callback(null, 2);
*         }, 100);
*     }
* }, function(err, results) {
*     console.log(results);
*     // results is equal to: { one: 1, two: 2 }
* });
*
* //Using Promises
* async.parallel([
*     function(callback) {
*         setTimeout(function() {
*             callback(null, 'one');
*         }, 200);
*     },
*     function(callback) {
*         setTimeout(function() {
*             callback(null, 'two');
*         }, 100);
*     }
* ]).then(results => {
*     console.log(results);
*     // results is equal to ['one','two'] even though
*     // the second function had a shorter timeout.
* }).catch(err => {
*     console.log(err);
* });
*
* // an example using an object instead of an array
* async.parallel({
*     one: function(callback) {
*         setTimeout(function() {
*             callback(null, 1);
*         }, 200);
*     },
*     two: function(callback) {
*         setTimeout(function() {
*             callback(null, 2);
*         }, 100);
*     }
* }).then(results => {
*     console.log(results);
*     // results is equal to: { one: 1, two: 2 }
* }).catch(err => {
*     console.log(err);
* });
*
* //Using async/await
* async () => {
*     try {
*         let results = await async.parallel([
*             function(callback) {
*                 setTimeout(function() {
*                     callback(null, 'one');
*                 }, 200);
*             },
*             function(callback) {
*                 setTimeout(function() {
*                     callback(null, 'two');
*                 }, 100);
*             }
*         ]);
*         console.log(results);
*         // results is equal to ['one','two'] even though
*         // the second function had a shorter timeout.
*     }
*     catch (err) {
*         console.log(err);
*     }
* }
*
* // an example using an object instead of an array
* async () => {
*     try {
*         let results = await async.parallel({
*             one: function(callback) {
*                 setTimeout(function() {
*                     callback(null, 1);
*                 }, 200);
*             },
*            two: function(callback) {
*                 setTimeout(function() {
*                     callback(null, 2);
*                 }, 100);
*            }
*         });
*         console.log(results);
*         // results is equal to: { one: 1, two: 2 }
*     }
*     catch (err) {
*         console.log(err);
*     }
* }
*
*/
function parallel(tasks, callback) {
	return _parallel(eachOf$1, tasks, callback);
}
/**
* The same as [`parallel`]{@link module:ControlFlow.parallel} but runs a maximum of `limit` async operations at a
* time.
*
* @name parallelLimit
* @static
* @memberOf module:ControlFlow
* @method
* @see [async.parallel]{@link module:ControlFlow.parallel}
* @category Control Flow
* @param {Array|Iterable|AsyncIterable|Object} tasks - A collection of
* [async functions]{@link AsyncFunction} to run.
* Each async function can complete with any number of optional `result` values.
* @param {number} limit - The maximum number of async operations at a time.
* @param {Function} [callback] - An optional callback to run once all the
* functions have completed successfully. This function gets a results array
* (or object) containing all the result arguments passed to the task callbacks.
* Invoked with (err, results).
* @returns {Promise} a promise, if a callback is not passed
*/
function parallelLimit(tasks, limit, callback) {
	return _parallel(eachOfLimit$2(limit), tasks, callback);
}
/**
* A queue of tasks for the worker function to complete.
* @typedef {Iterable} QueueObject
* @memberOf module:ControlFlow
* @property {Function} length - a function returning the number of items
* waiting to be processed. Invoke with `queue.length()`.
* @property {boolean} started - a boolean indicating whether or not any
* items have been pushed and processed by the queue.
* @property {Function} running - a function returning the number of items
* currently being processed. Invoke with `queue.running()`.
* @property {Function} workersList - a function returning the array of items
* currently being processed. Invoke with `queue.workersList()`.
* @property {Function} idle - a function returning false if there are items
* waiting or being processed, or true if not. Invoke with `queue.idle()`.
* @property {number} concurrency - an integer for determining how many `worker`
* functions should be run in parallel. This property can be changed after a
* `queue` is created to alter the concurrency on-the-fly.
* @property {number} payload - an integer that specifies how many items are
* passed to the worker function at a time. only applies if this is a
* [cargo]{@link module:ControlFlow.cargo} object
* @property {AsyncFunction} push - add a new task to the `queue`. Calls `callback`
* once the `worker` has finished processing the task. Instead of a single task,
* a `tasks` array can be submitted. The respective callback is used for every
* task in the list. Invoke with `queue.push(task, [callback])`,
* @property {AsyncFunction} unshift - add a new task to the front of the `queue`.
* Invoke with `queue.unshift(task, [callback])`.
* @property {AsyncFunction} pushAsync - the same as `q.push`, except this returns
* a promise that rejects if an error occurs.
* @property {AsyncFunction} unshiftAsync - the same as `q.unshift`, except this returns
* a promise that rejects if an error occurs.
* @property {Function} remove - remove items from the queue that match a test
* function.  The test function will be passed an object with a `data` property,
* and a `priority` property, if this is a
* [priorityQueue]{@link module:ControlFlow.priorityQueue} object.
* Invoked with `queue.remove(testFn)`, where `testFn` is of the form
* `function ({data, priority}) {}` and returns a Boolean.
* @property {Function} saturated - a function that sets a callback that is
* called when the number of running workers hits the `concurrency` limit, and
* further tasks will be queued.  If the callback is omitted, `q.saturated()`
* returns a promise for the next occurrence.
* @property {Function} unsaturated - a function that sets a callback that is
* called when the number of running workers is less than the `concurrency` &
* `buffer` limits, and further tasks will not be queued. If the callback is
* omitted, `q.unsaturated()` returns a promise for the next occurrence.
* @property {number} buffer - A minimum threshold buffer in order to say that
* the `queue` is `unsaturated`.
* @property {Function} empty - a function that sets a callback that is called
* when the last item from the `queue` is given to a `worker`. If the callback
* is omitted, `q.empty()` returns a promise for the next occurrence.
* @property {Function} drain - a function that sets a callback that is called
* when the last item from the `queue` has returned from the `worker`. If the
* callback is omitted, `q.drain()` returns a promise for the next occurrence.
* @property {Function} error - a function that sets a callback that is called
* when a task errors. Has the signature `function(error, task)`. If the
* callback is omitted, `error()` returns a promise that rejects on the next
* error.
* @property {boolean} paused - a boolean for determining whether the queue is
* in a paused state.
* @property {Function} pause - a function that pauses the processing of tasks
* until `resume()` is called. Invoke with `queue.pause()`.
* @property {Function} resume - a function that resumes the processing of
* queued tasks when the queue is paused. Invoke with `queue.resume()`.
* @property {Function} kill - a function that removes the `drain` callback and
* empties remaining tasks from the queue forcing it to go idle. No more tasks
* should be pushed to the queue after calling this function. Invoke with `queue.kill()`.
*
* @example
* const q = async.queue(worker, 2)
* q.push(item1)
* q.push(item2)
* q.push(item3)
* // queues are iterable, spread into an array to inspect
* const items = [...q] // [item1, item2, item3]
* // or use for of
* for (let item of q) {
*     console.log(item)
* }
*
* q.drain(() => {
*     console.log('all done')
* })
* // or
* await q.drain()
*/
/**
* Creates a `queue` object with the specified `concurrency`. Tasks added to the
* `queue` are processed in parallel (up to the `concurrency` limit). If all
* `worker`s are in progress, the task is queued until one becomes available.
* Once a `worker` completes a `task`, that `task`'s callback is called.
*
* @name queue
* @static
* @memberOf module:ControlFlow
* @method
* @category Control Flow
* @param {AsyncFunction} worker - An async function for processing a queued task.
* If you want to handle errors from an individual task, pass a callback to
* `q.push()`. Invoked with (task, callback).
* @param {number} [concurrency=1] - An `integer` for determining how many
* `worker` functions should be run in parallel.  If omitted, the concurrency
* defaults to `1`.  If the concurrency is `0`, an error is thrown.
* @returns {module:ControlFlow.QueueObject} A queue object to manage the tasks. Callbacks can be
* attached as certain properties to listen for specific events during the
* lifecycle of the queue.
* @example
*
* // create a queue object with concurrency 2
* var q = async.queue(function(task, callback) {
*     console.log('hello ' + task.name);
*     callback();
* }, 2);
*
* // assign a callback
* q.drain(function() {
*     console.log('all items have been processed');
* });
* // or await the end
* await q.drain()
*
* // assign an error callback
* q.error(function(err, task) {
*     console.error('task experienced an error');
* });
*
* // add some items to the queue
* q.push({name: 'foo'}, function(err) {
*     console.log('finished processing foo');
* });
* // callback is optional
* q.push({name: 'bar'});
*
* // add some items to the queue (batch-wise)
* q.push([{name: 'baz'},{name: 'bay'},{name: 'bax'}], function(err) {
*     console.log('finished processing item');
* });
*
* // add some items to the front of the queue
* q.unshift({name: 'bar'}, function (err) {
*     console.log('finished processing bar');
* });
*/
function queue(worker, concurrency) {
	var _worker = wrapAsync(worker);
	return queue$1((items, cb) => {
		_worker(items[0], cb);
	}, concurrency, 1);
}
function leftChi(i) {
	return (i << 1) + 1;
}
function parent(i) {
	return (i + 1 >> 1) - 1;
}
function smaller(x, y) {
	if (x.priority !== y.priority) return x.priority < y.priority;
	else return x.pushCount < y.pushCount;
}
/**
* The same as [async.queue]{@link module:ControlFlow.queue} only tasks are assigned a priority and
* completed in ascending priority order.
*
* @name priorityQueue
* @static
* @memberOf module:ControlFlow
* @method
* @see [async.queue]{@link module:ControlFlow.queue}
* @category Control Flow
* @param {AsyncFunction} worker - An async function for processing a queued task.
* If you want to handle errors from an individual task, pass a callback to
* `q.push()`.
* Invoked with (task, callback).
* @param {number} concurrency - An `integer` for determining how many `worker`
* functions should be run in parallel.  If omitted, the concurrency defaults to
* `1`.  If the concurrency is `0`, an error is thrown.
* @returns {module:ControlFlow.QueueObject} A priorityQueue object to manage the tasks. There are three
* differences between `queue` and `priorityQueue` objects:
* * `push(task, priority, [callback])` - `priority` should be a number. If an
*   array of `tasks` is given, all tasks will be assigned the same priority.
* * `pushAsync(task, priority, [callback])` - the same as `priorityQueue.push`,
*   except this returns a promise that rejects if an error occurs.
* * The `unshift` and `unshiftAsync` methods were removed.
*/
function priorityQueue(worker, concurrency) {
	var q = queue(worker, concurrency);
	var { push, pushAsync } = q;
	q._tasks = new Heap();
	q._createTaskItem = ({ data, priority }, callback) => {
		return {
			data,
			priority,
			callback
		};
	};
	function createDataItems(tasks, priority) {
		if (!Array.isArray(tasks)) return {
			data: tasks,
			priority
		};
		return tasks.map((data) => {
			return {
				data,
				priority
			};
		});
	}
	q.push = function(data, priority = 0, callback) {
		return push(createDataItems(data, priority), callback);
	};
	q.pushAsync = function(data, priority = 0, callback) {
		return pushAsync(createDataItems(data, priority), callback);
	};
	delete q.unshift;
	delete q.unshiftAsync;
	return q;
}
/**
* Runs the `tasks` array of functions in parallel, without waiting until the
* previous function has completed. Once any of the `tasks` complete or pass an
* error to its callback, the main `callback` is immediately called. It's
* equivalent to `Promise.race()`.
*
* @name race
* @static
* @memberOf module:ControlFlow
* @method
* @category Control Flow
* @param {Array} tasks - An array containing [async functions]{@link AsyncFunction}
* to run. Each function can complete with an optional `result` value.
* @param {Function} callback - A callback to run once any of the functions have
* completed. This function gets an error or result from the first function that
* completed. Invoked with (err, result).
* @returns {Promise} a promise, if a callback is omitted
* @example
*
* async.race([
*     function(callback) {
*         setTimeout(function() {
*             callback(null, 'one');
*         }, 200);
*     },
*     function(callback) {
*         setTimeout(function() {
*             callback(null, 'two');
*         }, 100);
*     }
* ],
* // main callback
* function(err, result) {
*     // the result will be equal to 'two' as it finishes earlier
* });
*/
function race(tasks, callback) {
	callback = once(callback);
	if (!Array.isArray(tasks)) return callback(/* @__PURE__ */ new TypeError("First argument to race must be an array of functions"));
	if (!tasks.length) return callback();
	for (var i = 0, l = tasks.length; i < l; i++) wrapAsync(tasks[i])(callback);
}
/**
* Same as [`reduce`]{@link module:Collections.reduce}, only operates on `array` in reverse order.
*
* @name reduceRight
* @static
* @memberOf module:Collections
* @method
* @see [async.reduce]{@link module:Collections.reduce}
* @alias foldr
* @category Collection
* @param {Array} array - A collection to iterate over.
* @param {*} memo - The initial state of the reduction.
* @param {AsyncFunction} iteratee - A function applied to each item in the
* array to produce the next step in the reduction.
* The `iteratee` should complete with the next state of the reduction.
* If the iteratee completes with an error, the reduction is stopped and the
* main `callback` is immediately called with the error.
* Invoked with (memo, item, callback).
* @param {Function} [callback] - A callback which is called after all the
* `iteratee` functions have finished. Result is the reduced value. Invoked with
* (err, result).
* @returns {Promise} a promise, if no callback is passed
*/
function reduceRight(array, memo, iteratee, callback) {
	return reduce$1([...array].reverse(), memo, iteratee, callback);
}
/**
* Wraps the async function in another function that always completes with a
* result object, even when it errors.
*
* The result object has either the property `error` or `value`.
*
* @name reflect
* @static
* @memberOf module:Utils
* @method
* @category Util
* @param {AsyncFunction} fn - The async function you want to wrap
* @returns {Function} - A function that always passes null to it's callback as
* the error. The second argument to the callback will be an `object` with
* either an `error` or a `value` property.
* @example
*
* async.parallel([
*     async.reflect(function(callback) {
*         // do some stuff ...
*         callback(null, 'one');
*     }),
*     async.reflect(function(callback) {
*         // do some more stuff but error ...
*         callback('bad stuff happened');
*     }),
*     async.reflect(function(callback) {
*         // do some more stuff ...
*         callback(null, 'two');
*     })
* ],
* // optional callback
* function(err, results) {
*     // values
*     // results[0].value = 'one'
*     // results[1].error = 'bad stuff happened'
*     // results[2].value = 'two'
* });
*/
function reflect(fn) {
	var _fn = wrapAsync(fn);
	return initialParams(function reflectOn(args, reflectCallback) {
		args.push((error, ...cbArgs) => {
			let retVal = {};
			if (error) retVal.error = error;
			if (cbArgs.length > 0) {
				var value = cbArgs;
				if (cbArgs.length <= 1) [value] = cbArgs;
				retVal.value = value;
			}
			reflectCallback(null, retVal);
		});
		return _fn.apply(this, args);
	});
}
/**
* A helper function that wraps an array or an object of functions with `reflect`.
*
* @name reflectAll
* @static
* @memberOf module:Utils
* @method
* @see [async.reflect]{@link module:Utils.reflect}
* @category Util
* @param {Array|Object|Iterable} tasks - The collection of
* [async functions]{@link AsyncFunction} to wrap in `async.reflect`.
* @returns {Array} Returns an array of async functions, each wrapped in
* `async.reflect`
* @example
*
* let tasks = [
*     function(callback) {
*         setTimeout(function() {
*             callback(null, 'one');
*         }, 200);
*     },
*     function(callback) {
*         // do some more stuff but error ...
*         callback(new Error('bad stuff happened'));
*     },
*     function(callback) {
*         setTimeout(function() {
*             callback(null, 'two');
*         }, 100);
*     }
* ];
*
* async.parallel(async.reflectAll(tasks),
* // optional callback
* function(err, results) {
*     // values
*     // results[0].value = 'one'
*     // results[1].error = Error('bad stuff happened')
*     // results[2].value = 'two'
* });
*
* // an example using an object instead of an array
* let tasks = {
*     one: function(callback) {
*         setTimeout(function() {
*             callback(null, 'one');
*         }, 200);
*     },
*     two: function(callback) {
*         callback('two');
*     },
*     three: function(callback) {
*         setTimeout(function() {
*             callback(null, 'three');
*         }, 100);
*     }
* };
*
* async.parallel(async.reflectAll(tasks),
* // optional callback
* function(err, results) {
*     // values
*     // results.one.value = 'one'
*     // results.two.error = 'two'
*     // results.three.value = 'three'
* });
*/
function reflectAll(tasks) {
	var results;
	if (Array.isArray(tasks)) results = tasks.map(reflect);
	else {
		results = {};
		Object.keys(tasks).forEach((key) => {
			results[key] = reflect.call(this, tasks[key]);
		});
	}
	return results;
}
function reject$2(eachfn, arr, _iteratee, callback) {
	const iteratee = wrapAsync(_iteratee);
	return _filter(eachfn, arr, (value, cb) => {
		iteratee(value, (err, v) => {
			cb(err, !v);
		});
	}, callback);
}
/**
* The opposite of [`filter`]{@link module:Collections.filter}. Removes values that pass an `async` truth test.
*
* @name reject
* @static
* @memberOf module:Collections
* @method
* @see [async.filter]{@link module:Collections.filter}
* @category Collection
* @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
* @param {Function} iteratee - An async truth test to apply to each item in
* `coll`.
* The should complete with a boolean value as its `result`.
* Invoked with (item, callback).
* @param {Function} [callback] - A callback which is called after all the
* `iteratee` functions have finished. Invoked with (err, results).
* @returns {Promise} a promise, if no callback is passed
* @example
*
* // dir1 is a directory that contains file1.txt, file2.txt
* // dir2 is a directory that contains file3.txt, file4.txt
* // dir3 is a directory that contains file5.txt
*
* const fileList = ['dir1/file1.txt','dir2/file3.txt','dir3/file6.txt'];
*
* // asynchronous function that checks if a file exists
* function fileExists(file, callback) {
*    fs.access(file, fs.constants.F_OK, (err) => {
*        callback(null, !err);
*    });
* }
*
* // Using callbacks
* async.reject(fileList, fileExists, function(err, results) {
*    // [ 'dir3/file6.txt' ]
*    // results now equals an array of the non-existing files
* });
*
* // Using Promises
* async.reject(fileList, fileExists)
* .then( results => {
*     console.log(results);
*     // [ 'dir3/file6.txt' ]
*     // results now equals an array of the non-existing files
* }).catch( err => {
*     console.log(err);
* });
*
* // Using async/await
* async () => {
*     try {
*         let results = await async.reject(fileList, fileExists);
*         console.log(results);
*         // [ 'dir3/file6.txt' ]
*         // results now equals an array of the non-existing files
*     }
*     catch (err) {
*         console.log(err);
*     }
* }
*
*/
function reject(coll, iteratee, callback) {
	return reject$2(eachOf$1, coll, iteratee, callback);
}
/**
* The same as [`reject`]{@link module:Collections.reject} but runs a maximum of `limit` async operations at a
* time.
*
* @name rejectLimit
* @static
* @memberOf module:Collections
* @method
* @see [async.reject]{@link module:Collections.reject}
* @category Collection
* @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
* @param {number} limit - The maximum number of async operations at a time.
* @param {Function} iteratee - An async truth test to apply to each item in
* `coll`.
* The should complete with a boolean value as its `result`.
* Invoked with (item, callback).
* @param {Function} [callback] - A callback which is called after all the
* `iteratee` functions have finished. Invoked with (err, results).
* @returns {Promise} a promise, if no callback is passed
*/
function rejectLimit(coll, limit, iteratee, callback) {
	return reject$2(eachOfLimit$2(limit), coll, iteratee, callback);
}
/**
* The same as [`reject`]{@link module:Collections.reject} but runs only a single async operation at a time.
*
* @name rejectSeries
* @static
* @memberOf module:Collections
* @method
* @see [async.reject]{@link module:Collections.reject}
* @category Collection
* @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
* @param {Function} iteratee - An async truth test to apply to each item in
* `coll`.
* The should complete with a boolean value as its `result`.
* Invoked with (item, callback).
* @param {Function} [callback] - A callback which is called after all the
* `iteratee` functions have finished. Invoked with (err, results).
* @returns {Promise} a promise, if no callback is passed
*/
function rejectSeries(coll, iteratee, callback) {
	return reject$2(eachOfSeries$1, coll, iteratee, callback);
}
function constant(value) {
	return function() {
		return value;
	};
}
function retry(opts, task, callback) {
	var options = {
		times: DEFAULT_TIMES,
		intervalFunc: constant(DEFAULT_INTERVAL)
	};
	if (arguments.length < 3 && typeof opts === "function") {
		callback = task || promiseCallback();
		task = opts;
	} else {
		parseTimes(options, opts);
		callback = callback || promiseCallback();
	}
	if (typeof task !== "function") throw new Error("Invalid arguments for async.retry");
	var _task = wrapAsync(task);
	var attempt = 1;
	function retryAttempt() {
		_task((err, ...args) => {
			if (err === false) return;
			if (err && attempt++ < options.times && (typeof options.errorFilter != "function" || options.errorFilter(err))) setTimeout(retryAttempt, options.intervalFunc(attempt - 1));
			else callback(err, ...args);
		});
	}
	retryAttempt();
	return callback[PROMISE_SYMBOL];
}
function parseTimes(acc, t) {
	if (typeof t === "object") {
		acc.times = +t.times || DEFAULT_TIMES;
		acc.intervalFunc = typeof t.interval === "function" ? t.interval : constant(+t.interval || DEFAULT_INTERVAL);
		acc.errorFilter = t.errorFilter;
	} else if (typeof t === "number" || typeof t === "string") acc.times = +t || DEFAULT_TIMES;
	else throw new Error("Invalid arguments for async.retry");
}
/**
* A close relative of [`retry`]{@link module:ControlFlow.retry}.  This method
* wraps a task and makes it retryable, rather than immediately calling it
* with retries.
*
* @name retryable
* @static
* @memberOf module:ControlFlow
* @method
* @see [async.retry]{@link module:ControlFlow.retry}
* @category Control Flow
* @param {Object|number} [opts = {times: 5, interval: 0}| 5] - optional
* options, exactly the same as from `retry`, except for a `opts.arity` that
* is the arity of the `task` function, defaulting to `task.length`
* @param {AsyncFunction} task - the asynchronous function to wrap.
* This function will be passed any arguments passed to the returned wrapper.
* Invoked with (...args, callback).
* @returns {AsyncFunction} The wrapped function, which when invoked, will
* retry on an error, based on the parameters specified in `opts`.
* This function will accept the same parameters as `task`.
* @example
*
* async.auto({
*     dep1: async.retryable(3, getFromFlakyService),
*     process: ["dep1", async.retryable(3, function (results, cb) {
*         maybeProcessData(results.dep1, cb);
*     })]
* }, callback);
*/
function retryable(opts, task) {
	if (!task) {
		task = opts;
		opts = null;
	}
	let arity = opts && opts.arity || task.length;
	if (isAsync(task)) arity += 1;
	var _task = wrapAsync(task);
	return initialParams((args, callback) => {
		if (args.length < arity - 1 || callback == null) {
			args.push(callback);
			callback = promiseCallback();
		}
		function taskFn(cb) {
			_task(...args, cb);
		}
		if (opts) retry(opts, taskFn, callback);
		else retry(taskFn, callback);
		return callback[PROMISE_SYMBOL];
	});
}
/**
* Run the functions in the `tasks` collection in series, each one running once
* the previous function has completed. If any functions in the series pass an
* error to its callback, no more functions are run, and `callback` is
* immediately called with the value of the error. Otherwise, `callback`
* receives an array of results when `tasks` have completed.
*
* It is also possible to use an object instead of an array. Each property will
* be run as a function, and the results will be passed to the final `callback`
* as an object instead of an array. This can be a more readable way of handling
*  results from {@link async.series}.
*
* **Note** that while many implementations preserve the order of object
* properties, the [ECMAScript Language Specification](http://www.ecma-international.org/ecma-262/5.1/#sec-8.6)
* explicitly states that
*
* > The mechanics and order of enumerating the properties is not specified.
*
* So if you rely on the order in which your series of functions are executed,
* and want this to work on all platforms, consider using an array.
*
* @name series
* @static
* @memberOf module:ControlFlow
* @method
* @category Control Flow
* @param {Array|Iterable|AsyncIterable|Object} tasks - A collection containing
* [async functions]{@link AsyncFunction} to run in series.
* Each function can complete with any number of optional `result` values.
* @param {Function} [callback] - An optional callback to run once all the
* functions have completed. This function gets a results array (or object)
* containing all the result arguments passed to the `task` callbacks. Invoked
* with (err, result).
* @return {Promise} a promise, if no callback is passed
* @example
*
* //Using Callbacks
* async.series([
*     function(callback) {
*         setTimeout(function() {
*             // do some async task
*             callback(null, 'one');
*         }, 200);
*     },
*     function(callback) {
*         setTimeout(function() {
*             // then do another async task
*             callback(null, 'two');
*         }, 100);
*     }
* ], function(err, results) {
*     console.log(results);
*     // results is equal to ['one','two']
* });
*
* // an example using objects instead of arrays
* async.series({
*     one: function(callback) {
*         setTimeout(function() {
*             // do some async task
*             callback(null, 1);
*         }, 200);
*     },
*     two: function(callback) {
*         setTimeout(function() {
*             // then do another async task
*             callback(null, 2);
*         }, 100);
*     }
* }, function(err, results) {
*     console.log(results);
*     // results is equal to: { one: 1, two: 2 }
* });
*
* //Using Promises
* async.series([
*     function(callback) {
*         setTimeout(function() {
*             callback(null, 'one');
*         }, 200);
*     },
*     function(callback) {
*         setTimeout(function() {
*             callback(null, 'two');
*         }, 100);
*     }
* ]).then(results => {
*     console.log(results);
*     // results is equal to ['one','two']
* }).catch(err => {
*     console.log(err);
* });
*
* // an example using an object instead of an array
* async.series({
*     one: function(callback) {
*         setTimeout(function() {
*             // do some async task
*             callback(null, 1);
*         }, 200);
*     },
*     two: function(callback) {
*         setTimeout(function() {
*             // then do another async task
*             callback(null, 2);
*         }, 100);
*     }
* }).then(results => {
*     console.log(results);
*     // results is equal to: { one: 1, two: 2 }
* }).catch(err => {
*     console.log(err);
* });
*
* //Using async/await
* async () => {
*     try {
*         let results = await async.series([
*             function(callback) {
*                 setTimeout(function() {
*                     // do some async task
*                     callback(null, 'one');
*                 }, 200);
*             },
*             function(callback) {
*                 setTimeout(function() {
*                     // then do another async task
*                     callback(null, 'two');
*                 }, 100);
*             }
*         ]);
*         console.log(results);
*         // results is equal to ['one','two']
*     }
*     catch (err) {
*         console.log(err);
*     }
* }
*
* // an example using an object instead of an array
* async () => {
*     try {
*         let results = await async.parallel({
*             one: function(callback) {
*                 setTimeout(function() {
*                     // do some async task
*                     callback(null, 1);
*                 }, 200);
*             },
*            two: function(callback) {
*                 setTimeout(function() {
*                     // then do another async task
*                     callback(null, 2);
*                 }, 100);
*            }
*         });
*         console.log(results);
*         // results is equal to: { one: 1, two: 2 }
*     }
*     catch (err) {
*         console.log(err);
*     }
* }
*
*/
function series(tasks, callback) {
	return _parallel(eachOfSeries$1, tasks, callback);
}
/**
* Returns `true` if at least one element in the `coll` satisfies an async test.
* If any iteratee call returns `true`, the main `callback` is immediately
* called.
*
* @name some
* @static
* @memberOf module:Collections
* @method
* @alias any
* @category Collection
* @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
* @param {AsyncFunction} iteratee - An async truth test to apply to each item
* in the collections in parallel.
* The iteratee should complete with a boolean `result` value.
* Invoked with (item, callback).
* @param {Function} [callback] - A callback which is called as soon as any
* iteratee returns `true`, or after all the iteratee functions have finished.
* Result will be either `true` or `false` depending on the values of the async
* tests. Invoked with (err, result).
* @returns {Promise} a promise, if no callback provided
* @example
*
* // dir1 is a directory that contains file1.txt, file2.txt
* // dir2 is a directory that contains file3.txt, file4.txt
* // dir3 is a directory that contains file5.txt
* // dir4 does not exist
*
* // asynchronous function that checks if a file exists
* function fileExists(file, callback) {
*    fs.access(file, fs.constants.F_OK, (err) => {
*        callback(null, !err);
*    });
* }
*
* // Using callbacks
* async.some(['dir1/missing.txt','dir2/missing.txt','dir3/file5.txt'], fileExists,
*    function(err, result) {
*        console.log(result);
*        // true
*        // result is true since some file in the list exists
*    }
*);
*
* async.some(['dir1/missing.txt','dir2/missing.txt','dir4/missing.txt'], fileExists,
*    function(err, result) {
*        console.log(result);
*        // false
*        // result is false since none of the files exists
*    }
*);
*
* // Using Promises
* async.some(['dir1/missing.txt','dir2/missing.txt','dir3/file5.txt'], fileExists)
* .then( result => {
*     console.log(result);
*     // true
*     // result is true since some file in the list exists
* }).catch( err => {
*     console.log(err);
* });
*
* async.some(['dir1/missing.txt','dir2/missing.txt','dir4/missing.txt'], fileExists)
* .then( result => {
*     console.log(result);
*     // false
*     // result is false since none of the files exists
* }).catch( err => {
*     console.log(err);
* });
*
* // Using async/await
* async () => {
*     try {
*         let result = await async.some(['dir1/missing.txt','dir2/missing.txt','dir3/file5.txt'], fileExists);
*         console.log(result);
*         // true
*         // result is true since some file in the list exists
*     }
*     catch (err) {
*         console.log(err);
*     }
* }
*
* async () => {
*     try {
*         let result = await async.some(['dir1/missing.txt','dir2/missing.txt','dir4/missing.txt'], fileExists);
*         console.log(result);
*         // false
*         // result is false since none of the files exists
*     }
*     catch (err) {
*         console.log(err);
*     }
* }
*
*/
function some(coll, iteratee, callback) {
	return _createTester(Boolean, (res) => res)(eachOf$1, coll, iteratee, callback);
}
/**
* The same as [`some`]{@link module:Collections.some} but runs a maximum of `limit` async operations at a time.
*
* @name someLimit
* @static
* @memberOf module:Collections
* @method
* @see [async.some]{@link module:Collections.some}
* @alias anyLimit
* @category Collection
* @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
* @param {number} limit - The maximum number of async operations at a time.
* @param {AsyncFunction} iteratee - An async truth test to apply to each item
* in the collections in parallel.
* The iteratee should complete with a boolean `result` value.
* Invoked with (item, callback).
* @param {Function} [callback] - A callback which is called as soon as any
* iteratee returns `true`, or after all the iteratee functions have finished.
* Result will be either `true` or `false` depending on the values of the async
* tests. Invoked with (err, result).
* @returns {Promise} a promise, if no callback provided
*/
function someLimit(coll, limit, iteratee, callback) {
	return _createTester(Boolean, (res) => res)(eachOfLimit$2(limit), coll, iteratee, callback);
}
/**
* The same as [`some`]{@link module:Collections.some} but runs only a single async operation at a time.
*
* @name someSeries
* @static
* @memberOf module:Collections
* @method
* @see [async.some]{@link module:Collections.some}
* @alias anySeries
* @category Collection
* @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
* @param {AsyncFunction} iteratee - An async truth test to apply to each item
* in the collections in series.
* The iteratee should complete with a boolean `result` value.
* Invoked with (item, callback).
* @param {Function} [callback] - A callback which is called as soon as any
* iteratee returns `true`, or after all the iteratee functions have finished.
* Result will be either `true` or `false` depending on the values of the async
* tests. Invoked with (err, result).
* @returns {Promise} a promise, if no callback provided
*/
function someSeries(coll, iteratee, callback) {
	return _createTester(Boolean, (res) => res)(eachOfSeries$1, coll, iteratee, callback);
}
/**
* Sorts a list by the results of running each `coll` value through an async
* `iteratee`.
*
* @name sortBy
* @static
* @memberOf module:Collections
* @method
* @category Collection
* @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
* @param {AsyncFunction} iteratee - An async function to apply to each item in
* `coll`.
* The iteratee should complete with a value to use as the sort criteria as
* its `result`.
* Invoked with (item, callback).
* @param {Function} callback - A callback which is called after all the
* `iteratee` functions have finished, or an error occurs. Results is the items
* from the original `coll` sorted by the values returned by the `iteratee`
* calls. Invoked with (err, results).
* @returns {Promise} a promise, if no callback passed
* @example
*
* // bigfile.txt is a file that is 251100 bytes in size
* // mediumfile.txt is a file that is 11000 bytes in size
* // smallfile.txt is a file that is 121 bytes in size
*
* // asynchronous function that returns the file size in bytes
* function getFileSizeInBytes(file, callback) {
*     fs.stat(file, function(err, stat) {
*         if (err) {
*             return callback(err);
*         }
*         callback(null, stat.size);
*     });
* }
*
* // Using callbacks
* async.sortBy(['mediumfile.txt','smallfile.txt','bigfile.txt'], getFileSizeInBytes,
*     function(err, results) {
*         if (err) {
*             console.log(err);
*         } else {
*             console.log(results);
*             // results is now the original array of files sorted by
*             // file size (ascending by default), e.g.
*             // [ 'smallfile.txt', 'mediumfile.txt', 'bigfile.txt']
*         }
*     }
* );
*
* // By modifying the callback parameter the
* // sorting order can be influenced:
*
* // ascending order
* async.sortBy(['mediumfile.txt','smallfile.txt','bigfile.txt'], function(file, callback) {
*     getFileSizeInBytes(file, function(getFileSizeErr, fileSize) {
*         if (getFileSizeErr) return callback(getFileSizeErr);
*         callback(null, fileSize);
*     });
* }, function(err, results) {
*         if (err) {
*             console.log(err);
*         } else {
*             console.log(results);
*             // results is now the original array of files sorted by
*             // file size (ascending by default), e.g.
*             // [ 'smallfile.txt', 'mediumfile.txt', 'bigfile.txt']
*         }
*     }
* );
*
* // descending order
* async.sortBy(['bigfile.txt','mediumfile.txt','smallfile.txt'], function(file, callback) {
*     getFileSizeInBytes(file, function(getFileSizeErr, fileSize) {
*         if (getFileSizeErr) {
*             return callback(getFileSizeErr);
*         }
*         callback(null, fileSize * -1);
*     });
* }, function(err, results) {
*         if (err) {
*             console.log(err);
*         } else {
*             console.log(results);
*             // results is now the original array of files sorted by
*             // file size (ascending by default), e.g.
*             // [ 'bigfile.txt', 'mediumfile.txt', 'smallfile.txt']
*         }
*     }
* );
*
* // Error handling
* async.sortBy(['mediumfile.txt','smallfile.txt','missingfile.txt'], getFileSizeInBytes,
*     function(err, results) {
*         if (err) {
*             console.log(err);
*             // [ Error: ENOENT: no such file or directory ]
*         } else {
*             console.log(results);
*         }
*     }
* );
*
* // Using Promises
* async.sortBy(['mediumfile.txt','smallfile.txt','bigfile.txt'], getFileSizeInBytes)
* .then( results => {
*     console.log(results);
*     // results is now the original array of files sorted by
*     // file size (ascending by default), e.g.
*     // [ 'smallfile.txt', 'mediumfile.txt', 'bigfile.txt']
* }).catch( err => {
*     console.log(err);
* });
*
* // Error handling
* async.sortBy(['mediumfile.txt','smallfile.txt','missingfile.txt'], getFileSizeInBytes)
* .then( results => {
*     console.log(results);
* }).catch( err => {
*     console.log(err);
*     // [ Error: ENOENT: no such file or directory ]
* });
*
* // Using async/await
* (async () => {
*     try {
*         let results = await async.sortBy(['bigfile.txt','mediumfile.txt','smallfile.txt'], getFileSizeInBytes);
*         console.log(results);
*         // results is now the original array of files sorted by
*         // file size (ascending by default), e.g.
*         // [ 'smallfile.txt', 'mediumfile.txt', 'bigfile.txt']
*     }
*     catch (err) {
*         console.log(err);
*     }
* })();
*
* // Error handling
* async () => {
*     try {
*         let results = await async.sortBy(['missingfile.txt','mediumfile.txt','smallfile.txt'], getFileSizeInBytes);
*         console.log(results);
*     }
*     catch (err) {
*         console.log(err);
*         // [ Error: ENOENT: no such file or directory ]
*     }
* }
*
*/
function sortBy(coll, iteratee, callback) {
	var _iteratee = wrapAsync(iteratee);
	return map$1(coll, (x, iterCb) => {
		_iteratee(x, (err, criteria) => {
			if (err) return iterCb(err);
			iterCb(err, {
				value: x,
				criteria
			});
		});
	}, (err, results) => {
		if (err) return callback(err);
		callback(null, results.sort(comparator).map((v) => v.value));
	});
	function comparator(left, right) {
		var a = left.criteria, b = right.criteria;
		return a < b ? -1 : a > b ? 1 : 0;
	}
}
/**
* Sets a time limit on an asynchronous function. If the function does not call
* its callback within the specified milliseconds, it will be called with a
* timeout error. The code property for the error object will be `'ETIMEDOUT'`.
*
* @name timeout
* @static
* @memberOf module:Utils
* @method
* @category Util
* @param {AsyncFunction} asyncFn - The async function to limit in time.
* @param {number} milliseconds - The specified time limit.
* @param {*} [info] - Any variable you want attached (`string`, `object`, etc)
* to timeout Error for more information..
* @returns {AsyncFunction} Returns a wrapped function that can be used with any
* of the control flow functions.
* Invoke this function with the same parameters as you would `asyncFunc`.
* @example
*
* function myFunction(foo, callback) {
*     doAsyncTask(foo, function(err, data) {
*         // handle errors
*         if (err) return callback(err);
*
*         // do some stuff ...
*
*         // return processed data
*         return callback(null, data);
*     });
* }
*
* var wrapped = async.timeout(myFunction, 1000);
*
* // call `wrapped` as you would `myFunction`
* wrapped({ bar: 'bar' }, function(err, data) {
*     // if `myFunction` takes < 1000 ms to execute, `err`
*     // and `data` will have their expected values
*
*     // else `err` will be an Error with the code 'ETIMEDOUT'
* });
*/
function timeout(asyncFn, milliseconds, info) {
	var fn = wrapAsync(asyncFn);
	return initialParams((args, callback) => {
		var timedOut = false;
		var timer;
		function timeoutCallback() {
			var name = asyncFn.name || "anonymous";
			var error = /* @__PURE__ */ new Error("Callback function \"" + name + "\" timed out.");
			error.code = "ETIMEDOUT";
			if (info) error.info = info;
			timedOut = true;
			callback(error);
		}
		args.push((...cbArgs) => {
			if (!timedOut) {
				callback(...cbArgs);
				clearTimeout(timer);
			}
		});
		timer = setTimeout(timeoutCallback, milliseconds);
		fn(...args);
	});
}
function range(size) {
	var result = Array(size);
	while (size--) result[size] = size;
	return result;
}
/**
* The same as [times]{@link module:ControlFlow.times} but runs a maximum of `limit` async operations at a
* time.
*
* @name timesLimit
* @static
* @memberOf module:ControlFlow
* @method
* @see [async.times]{@link module:ControlFlow.times}
* @category Control Flow
* @param {number} count - The number of times to run the function.
* @param {number} limit - The maximum number of async operations at a time.
* @param {AsyncFunction} iteratee - The async function to call `n` times.
* Invoked with the iteration index and a callback: (n, next).
* @param {Function} callback - see [async.map]{@link module:Collections.map}.
* @returns {Promise} a promise, if no callback is provided
*/
function timesLimit(count, limit, iteratee, callback) {
	var _iteratee = wrapAsync(iteratee);
	return mapLimit$1(range(count), limit, _iteratee, callback);
}
/**
* Calls the `iteratee` function `n` times, and accumulates results in the same
* manner you would use with [map]{@link module:Collections.map}.
*
* @name times
* @static
* @memberOf module:ControlFlow
* @method
* @see [async.map]{@link module:Collections.map}
* @category Control Flow
* @param {number} n - The number of times to run the function.
* @param {AsyncFunction} iteratee - The async function to call `n` times.
* Invoked with the iteration index and a callback: (n, next).
* @param {Function} callback - see {@link module:Collections.map}.
* @returns {Promise} a promise, if no callback is provided
* @example
*
* // Pretend this is some complicated async factory
* var createUser = function(id, callback) {
*     callback(null, {
*         id: 'user' + id
*     });
* };
*
* // generate 5 users
* async.times(5, function(n, next) {
*     createUser(n, function(err, user) {
*         next(err, user);
*     });
* }, function(err, users) {
*     // we should now have 5 users
* });
*/
function times(n, iteratee, callback) {
	return timesLimit(n, Infinity, iteratee, callback);
}
/**
* The same as [times]{@link module:ControlFlow.times} but runs only a single async operation at a time.
*
* @name timesSeries
* @static
* @memberOf module:ControlFlow
* @method
* @see [async.times]{@link module:ControlFlow.times}
* @category Control Flow
* @param {number} n - The number of times to run the function.
* @param {AsyncFunction} iteratee - The async function to call `n` times.
* Invoked with the iteration index and a callback: (n, next).
* @param {Function} callback - see {@link module:Collections.map}.
* @returns {Promise} a promise, if no callback is provided
*/
function timesSeries(n, iteratee, callback) {
	return timesLimit(n, 1, iteratee, callback);
}
/**
* A relative of `reduce`.  Takes an Object or Array, and iterates over each
* element in parallel, each step potentially mutating an `accumulator` value.
* The type of the accumulator defaults to the type of collection passed in.
*
* @name transform
* @static
* @memberOf module:Collections
* @method
* @category Collection
* @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
* @param {*} [accumulator] - The initial state of the transform.  If omitted,
* it will default to an empty Object or Array, depending on the type of `coll`
* @param {AsyncFunction} iteratee - A function applied to each item in the
* collection that potentially modifies the accumulator.
* Invoked with (accumulator, item, key, callback).
* @param {Function} [callback] - A callback which is called after all the
* `iteratee` functions have finished. Result is the transformed accumulator.
* Invoked with (err, result).
* @returns {Promise} a promise, if no callback provided
* @example
*
* // file1.txt is a file that is 1000 bytes in size
* // file2.txt is a file that is 2000 bytes in size
* // file3.txt is a file that is 3000 bytes in size
*
* // helper function that returns human-readable size format from bytes
* function formatBytes(bytes, decimals = 2) {
*   // implementation not included for brevity
*   return humanReadbleFilesize;
* }
*
* const fileList = ['file1.txt','file2.txt','file3.txt'];
*
* // asynchronous function that returns the file size, transformed to human-readable format
* // e.g. 1024 bytes = 1KB, 1234 bytes = 1.21 KB, 1048576 bytes = 1MB, etc.
* function transformFileSize(acc, value, key, callback) {
*     fs.stat(value, function(err, stat) {
*         if (err) {
*             return callback(err);
*         }
*         acc[key] = formatBytes(stat.size);
*         callback(null);
*     });
* }
*
* // Using callbacks
* async.transform(fileList, transformFileSize, function(err, result) {
*     if(err) {
*         console.log(err);
*     } else {
*         console.log(result);
*         // [ '1000 Bytes', '1.95 KB', '2.93 KB' ]
*     }
* });
*
* // Using Promises
* async.transform(fileList, transformFileSize)
* .then(result => {
*     console.log(result);
*     // [ '1000 Bytes', '1.95 KB', '2.93 KB' ]
* }).catch(err => {
*     console.log(err);
* });
*
* // Using async/await
* (async () => {
*     try {
*         let result = await async.transform(fileList, transformFileSize);
*         console.log(result);
*         // [ '1000 Bytes', '1.95 KB', '2.93 KB' ]
*     }
*     catch (err) {
*         console.log(err);
*     }
* })();
*
* @example
*
* // file1.txt is a file that is 1000 bytes in size
* // file2.txt is a file that is 2000 bytes in size
* // file3.txt is a file that is 3000 bytes in size
*
* // helper function that returns human-readable size format from bytes
* function formatBytes(bytes, decimals = 2) {
*   // implementation not included for brevity
*   return humanReadbleFilesize;
* }
*
* const fileMap = { f1: 'file1.txt', f2: 'file2.txt', f3: 'file3.txt' };
*
* // asynchronous function that returns the file size, transformed to human-readable format
* // e.g. 1024 bytes = 1KB, 1234 bytes = 1.21 KB, 1048576 bytes = 1MB, etc.
* function transformFileSize(acc, value, key, callback) {
*     fs.stat(value, function(err, stat) {
*         if (err) {
*             return callback(err);
*         }
*         acc[key] = formatBytes(stat.size);
*         callback(null);
*     });
* }
*
* // Using callbacks
* async.transform(fileMap, transformFileSize, function(err, result) {
*     if(err) {
*         console.log(err);
*     } else {
*         console.log(result);
*         // { f1: '1000 Bytes', f2: '1.95 KB', f3: '2.93 KB' }
*     }
* });
*
* // Using Promises
* async.transform(fileMap, transformFileSize)
* .then(result => {
*     console.log(result);
*     // { f1: '1000 Bytes', f2: '1.95 KB', f3: '2.93 KB' }
* }).catch(err => {
*     console.log(err);
* });
*
* // Using async/await
* async () => {
*     try {
*         let result = await async.transform(fileMap, transformFileSize);
*         console.log(result);
*         // { f1: '1000 Bytes', f2: '1.95 KB', f3: '2.93 KB' }
*     }
*     catch (err) {
*         console.log(err);
*     }
* }
*
*/
function transform(coll, accumulator, iteratee, callback) {
	if (arguments.length <= 3 && typeof accumulator === "function") {
		callback = iteratee;
		iteratee = accumulator;
		accumulator = Array.isArray(coll) ? [] : {};
	}
	callback = once(callback || promiseCallback());
	var _iteratee = wrapAsync(iteratee);
	eachOf$1(coll, (v, k, cb) => {
		_iteratee(accumulator, v, k, cb);
	}, (err) => callback(err, accumulator));
	return callback[PROMISE_SYMBOL];
}
/**
* It runs each task in series but stops whenever any of the functions were
* successful. If one of the tasks were successful, the `callback` will be
* passed the result of the successful task. If all tasks fail, the callback
* will be passed the error and result (if any) of the final attempt.
*
* @name tryEach
* @static
* @memberOf module:ControlFlow
* @method
* @category Control Flow
* @param {Array|Iterable|AsyncIterable|Object} tasks - A collection containing functions to
* run, each function is passed a `callback(err, result)` it must call on
* completion with an error `err` (which can be `null`) and an optional `result`
* value.
* @param {Function} [callback] - An optional callback which is called when one
* of the tasks has succeeded, or all have failed. It receives the `err` and
* `result` arguments of the last attempt at completing the `task`. Invoked with
* (err, results).
* @returns {Promise} a promise, if no callback is passed
* @example
* async.tryEach([
*     function getDataFromFirstWebsite(callback) {
*         // Try getting the data from the first website
*         callback(err, data);
*     },
*     function getDataFromSecondWebsite(callback) {
*         // First website failed,
*         // Try getting the data from the backup website
*         callback(err, data);
*     }
* ],
* // optional callback
* function(err, results) {
*     Now do something with the data.
* });
*
*/
function tryEach(tasks, callback) {
	var error = null;
	var result;
	return eachSeries$1(tasks, (task, taskCb) => {
		wrapAsync(task)((err, ...args) => {
			if (err === false) return taskCb(err);
			if (args.length < 2) [result] = args;
			else result = args;
			error = err;
			taskCb(err ? null : {});
		});
	}, () => callback(error, result));
}
/**
* Undoes a [memoize]{@link module:Utils.memoize}d function, reverting it to the original,
* unmemoized form. Handy for testing.
*
* @name unmemoize
* @static
* @memberOf module:Utils
* @method
* @see [async.memoize]{@link module:Utils.memoize}
* @category Util
* @param {AsyncFunction} fn - the memoized function
* @returns {AsyncFunction} a function that calls the original unmemoized function
*/
function unmemoize(fn) {
	return (...args) => {
		return (fn.unmemoized || fn)(...args);
	};
}
/**
* Repeatedly call `iteratee`, while `test` returns `true`. Calls `callback` when
* stopped, or an error occurs.
*
* @name whilst
* @static
* @memberOf module:ControlFlow
* @method
* @category Control Flow
* @param {AsyncFunction} test - asynchronous truth test to perform before each
* execution of `iteratee`. Invoked with (callback).
* @param {AsyncFunction} iteratee - An async function which is called each time
* `test` passes. Invoked with (callback).
* @param {Function} [callback] - A callback which is called after the test
* function has failed and repeated execution of `iteratee` has stopped. `callback`
* will be passed an error and any arguments passed to the final `iteratee`'s
* callback. Invoked with (err, [results]);
* @returns {Promise} a promise, if no callback is passed
* @example
*
* var count = 0;
* async.whilst(
*     function test(cb) { cb(null, count < 5); },
*     function iter(callback) {
*         count++;
*         setTimeout(function() {
*             callback(null, count);
*         }, 1000);
*     },
*     function (err, n) {
*         // 5 seconds have passed, n = 5
*     }
* );
*/
function whilst(test, iteratee, callback) {
	callback = onlyOnce(callback);
	var _fn = wrapAsync(iteratee);
	var _test = wrapAsync(test);
	var results = [];
	function next(err, ...rest) {
		if (err) return callback(err);
		results = rest;
		if (err === false) return;
		_test(check);
	}
	function check(err, truth) {
		if (err) return callback(err);
		if (err === false) return;
		if (!truth) return callback(null, ...results);
		_fn(next);
	}
	return _test(check);
}
/**
* Repeatedly call `iteratee` until `test` returns `true`. Calls `callback` when
* stopped, or an error occurs. `callback` will be passed an error and any
* arguments passed to the final `iteratee`'s callback.
*
* The inverse of [whilst]{@link module:ControlFlow.whilst}.
*
* @name until
* @static
* @memberOf module:ControlFlow
* @method
* @see [async.whilst]{@link module:ControlFlow.whilst}
* @category Control Flow
* @param {AsyncFunction} test - asynchronous truth test to perform before each
* execution of `iteratee`. Invoked with (callback).
* @param {AsyncFunction} iteratee - An async function which is called each time
* `test` fails. Invoked with (callback).
* @param {Function} [callback] - A callback which is called after the test
* function has passed and repeated execution of `iteratee` has stopped. `callback`
* will be passed an error and any arguments passed to the final `iteratee`'s
* callback. Invoked with (err, [results]);
* @returns {Promise} a promise, if a callback is not passed
*
* @example
* const results = []
* let finished = false
* async.until(function test(cb) {
*     cb(null, finished)
* }, function iter(next) {
*     fetchPage(url, (err, body) => {
*         if (err) return next(err)
*         results = results.concat(body.objects)
*         finished = !!body.next
*         next(err)
*     })
* }, function done (err) {
*     // all pages have been fetched
* })
*/
function until(test, iteratee, callback) {
	const _test = wrapAsync(test);
	return whilst$1((cb) => _test((err, truth) => cb(err, !truth)), iteratee, callback);
}
/**
* Runs the `tasks` array of functions in series, each passing their results to
* the next in the array. However, if any of the `tasks` pass an error to their
* own callback, the next function is not executed, and the main `callback` is
* immediately called with the error.
*
* @name waterfall
* @static
* @memberOf module:ControlFlow
* @method
* @category Control Flow
* @param {Array} tasks - An array of [async functions]{@link AsyncFunction}
* to run.
* Each function should complete with any number of `result` values.
* The `result` values will be passed as arguments, in order, to the next task.
* @param {Function} [callback] - An optional callback to run once all the
* functions have completed. This will be passed the results of the last task's
* callback. Invoked with (err, [results]).
* @returns {Promise} a promise, if a callback is omitted
* @example
*
* async.waterfall([
*     function(callback) {
*         callback(null, 'one', 'two');
*     },
*     function(arg1, arg2, callback) {
*         // arg1 now equals 'one' and arg2 now equals 'two'
*         callback(null, 'three');
*     },
*     function(arg1, callback) {
*         // arg1 now equals 'three'
*         callback(null, 'done');
*     }
* ], function (err, result) {
*     // result now equals 'done'
* });
*
* // Or, with named functions:
* async.waterfall([
*     myFirstFunction,
*     mySecondFunction,
*     myLastFunction,
* ], function (err, result) {
*     // result now equals 'done'
* });
* function myFirstFunction(callback) {
*     callback(null, 'one', 'two');
* }
* function mySecondFunction(arg1, arg2, callback) {
*     // arg1 now equals 'one' and arg2 now equals 'two'
*     callback(null, 'three');
* }
* function myLastFunction(arg1, callback) {
*     // arg1 now equals 'three'
*     callback(null, 'done');
* }
*/
function waterfall(tasks, callback) {
	callback = once(callback);
	if (!Array.isArray(tasks)) return callback(/* @__PURE__ */ new Error("First argument to waterfall must be an array of functions"));
	if (!tasks.length) return callback();
	var taskIndex = 0;
	function nextTask(args) {
		wrapAsync(tasks[taskIndex++])(...args, onlyOnce(next));
	}
	function next(err, ...args) {
		if (err === false) return;
		if (err || taskIndex === tasks.length) return callback(err, ...args);
		nextTask(args);
	}
	nextTask([]);
}
var hasQueueMicrotask, hasSetImmediate, hasNextTick, _defer$1, setImmediate$1, breakLoop, eachOfLimit$2, eachOfLimit$1, eachOf$1, map$1, applyEach, eachOfSeries$1, mapSeries$1, applyEachSeries, PROMISE_SYMBOL, FN_ARGS, ARROW_FN_ARGS, FN_ARG_SPLIT, FN_ARG, DLL, reduce$1, mapLimit$1, concatLimit$1, concat$1, concatSeries$1, detect$1, detectLimit$1, detectSeries$1, dir, doWhilst$1, each, eachLimit$1, eachSeries$1, every$1, everyLimit$1, everySeries$1, filter$1, filterLimit$1, filterSeries$1, forever$1, groupByLimit$1, log, mapValuesLimit$1, _defer, nextTick, _parallel, Heap, race$1, reject$1, rejectLimit$1, rejectSeries$1, DEFAULT_TIMES, DEFAULT_INTERVAL, some$1, someLimit$1, someSeries$1, sortBy$1, tryEach$1, whilst$1, waterfall$1, index;
var init_async = __esmMin((() => {
	hasQueueMicrotask = typeof queueMicrotask === "function" && queueMicrotask;
	hasSetImmediate = typeof setImmediate === "function" && setImmediate;
	hasNextTick = typeof process === "object" && typeof process.nextTick === "function";
	if (hasQueueMicrotask) _defer$1 = queueMicrotask;
	else if (hasSetImmediate) _defer$1 = setImmediate;
	else if (hasNextTick) _defer$1 = process.nextTick;
	else _defer$1 = fallback;
	setImmediate$1 = wrap(_defer$1);
	breakLoop = {};
	eachOfLimit$2 = (limit) => {
		return (obj, iteratee, callback) => {
			callback = once(callback);
			if (limit <= 0) throw new RangeError("concurrency limit cannot be less than 1");
			if (!obj) return callback(null);
			if (isAsyncGenerator(obj)) return asyncEachOfLimit(obj, limit, iteratee, callback);
			if (isAsyncIterable(obj)) return asyncEachOfLimit(obj[Symbol.asyncIterator](), limit, iteratee, callback);
			var nextElem = createIterator(obj);
			var done = false;
			var canceled = false;
			var running = 0;
			var looping = false;
			function iterateeCallback(err, value) {
				if (canceled) return;
				running -= 1;
				if (err) {
					done = true;
					callback(err);
				} else if (err === false) {
					done = true;
					canceled = true;
				} else if (value === breakLoop || done && running <= 0) {
					done = true;
					return callback(null);
				} else if (!looping) replenish();
			}
			function replenish() {
				looping = true;
				while (running < limit && !done) {
					var elem = nextElem();
					if (elem === null) {
						done = true;
						if (running <= 0) callback(null);
						return;
					}
					running += 1;
					iteratee(elem.value, elem.key, onlyOnce(iterateeCallback));
				}
				looping = false;
			}
			replenish();
		};
	};
	eachOfLimit$1 = awaitify(eachOfLimit, 4);
	eachOf$1 = awaitify(eachOf, 3);
	map$1 = awaitify(map, 3);
	applyEach = applyEach$1(map$1);
	eachOfSeries$1 = awaitify(eachOfSeries, 3);
	mapSeries$1 = awaitify(mapSeries, 3);
	applyEachSeries = applyEach$1(mapSeries$1);
	PROMISE_SYMBOL = Symbol("promiseCallback");
	FN_ARGS = /^(?:async\s)?(?:function)?\s*(?:\w+\s*)?\(([^)]+)\)(?:\s*{)/;
	ARROW_FN_ARGS = /^(?:async\s)?\s*(?:\(\s*)?((?:[^)=\s]\s*)*)(?:\)\s*)?=>/;
	FN_ARG_SPLIT = /,/;
	FN_ARG = /(=.+)?(\s*)$/;
	DLL = class {
		constructor() {
			this.head = this.tail = null;
			this.length = 0;
		}
		removeLink(node) {
			if (node.prev) node.prev.next = node.next;
			else this.head = node.next;
			if (node.next) node.next.prev = node.prev;
			else this.tail = node.prev;
			node.prev = node.next = null;
			this.length -= 1;
			return node;
		}
		empty() {
			while (this.head) this.shift();
			return this;
		}
		insertAfter(node, newNode) {
			newNode.prev = node;
			newNode.next = node.next;
			if (node.next) node.next.prev = newNode;
			else this.tail = newNode;
			node.next = newNode;
			this.length += 1;
		}
		insertBefore(node, newNode) {
			newNode.prev = node.prev;
			newNode.next = node;
			if (node.prev) node.prev.next = newNode;
			else this.head = newNode;
			node.prev = newNode;
			this.length += 1;
		}
		unshift(node) {
			if (this.head) this.insertBefore(this.head, node);
			else setInitial(this, node);
		}
		push(node) {
			if (this.tail) this.insertAfter(this.tail, node);
			else setInitial(this, node);
		}
		shift() {
			return this.head && this.removeLink(this.head);
		}
		pop() {
			return this.tail && this.removeLink(this.tail);
		}
		toArray() {
			return [...this];
		}
		*[Symbol.iterator]() {
			var cur = this.head;
			while (cur) {
				yield cur.data;
				cur = cur.next;
			}
		}
		remove(testFn) {
			var curr = this.head;
			while (curr) {
				var { next } = curr;
				if (testFn(curr)) this.removeLink(curr);
				curr = next;
			}
			return this;
		}
	};
	reduce$1 = awaitify(reduce, 4);
	mapLimit$1 = awaitify(mapLimit, 4);
	concatLimit$1 = awaitify(concatLimit, 4);
	concat$1 = awaitify(concat, 3);
	concatSeries$1 = awaitify(concatSeries, 3);
	detect$1 = awaitify(detect, 3);
	detectLimit$1 = awaitify(detectLimit, 4);
	detectSeries$1 = awaitify(detectSeries, 3);
	dir = consoleFunc("dir");
	doWhilst$1 = awaitify(doWhilst, 3);
	each = awaitify(eachLimit$2, 3);
	eachLimit$1 = awaitify(eachLimit, 4);
	eachSeries$1 = awaitify(eachSeries, 3);
	every$1 = awaitify(every, 3);
	everyLimit$1 = awaitify(everyLimit, 4);
	everySeries$1 = awaitify(everySeries, 3);
	filter$1 = awaitify(filter, 3);
	filterLimit$1 = awaitify(filterLimit, 4);
	filterSeries$1 = awaitify(filterSeries, 3);
	forever$1 = awaitify(forever, 2);
	groupByLimit$1 = awaitify(groupByLimit, 4);
	log = consoleFunc("log");
	mapValuesLimit$1 = awaitify(mapValuesLimit, 4);
	if (hasNextTick) _defer = process.nextTick;
	else if (hasSetImmediate) _defer = setImmediate;
	else _defer = fallback;
	nextTick = wrap(_defer);
	_parallel = awaitify((eachfn, tasks, callback) => {
		var results = isArrayLike(tasks) ? [] : {};
		eachfn(tasks, (task, key, taskCb) => {
			wrapAsync(task)((err, ...result) => {
				if (result.length < 2) [result] = result;
				results[key] = result;
				taskCb(err);
			});
		}, (err) => callback(err, results));
	}, 3);
	Heap = class {
		constructor() {
			this.heap = [];
			this.pushCount = Number.MIN_SAFE_INTEGER;
		}
		get length() {
			return this.heap.length;
		}
		empty() {
			this.heap = [];
			return this;
		}
		percUp(index) {
			let p;
			while (index > 0 && smaller(this.heap[index], this.heap[p = parent(index)])) {
				let t = this.heap[index];
				this.heap[index] = this.heap[p];
				this.heap[p] = t;
				index = p;
			}
		}
		percDown(index) {
			let l;
			while ((l = leftChi(index)) < this.heap.length) {
				if (l + 1 < this.heap.length && smaller(this.heap[l + 1], this.heap[l])) l = l + 1;
				if (smaller(this.heap[index], this.heap[l])) break;
				let t = this.heap[index];
				this.heap[index] = this.heap[l];
				this.heap[l] = t;
				index = l;
			}
		}
		push(node) {
			node.pushCount = ++this.pushCount;
			this.heap.push(node);
			this.percUp(this.heap.length - 1);
		}
		unshift(node) {
			return this.heap.push(node);
		}
		shift() {
			let [top] = this.heap;
			this.heap[0] = this.heap[this.heap.length - 1];
			this.heap.pop();
			this.percDown(0);
			return top;
		}
		toArray() {
			return [...this];
		}
		*[Symbol.iterator]() {
			for (let i = 0; i < this.heap.length; i++) yield this.heap[i].data;
		}
		remove(testFn) {
			let j = 0;
			for (let i = 0; i < this.heap.length; i++) if (!testFn(this.heap[i])) {
				this.heap[j] = this.heap[i];
				j++;
			}
			this.heap.splice(j);
			for (let i = parent(this.heap.length - 1); i >= 0; i--) this.percDown(i);
			return this;
		}
	};
	race$1 = awaitify(race, 2);
	reject$1 = awaitify(reject, 3);
	rejectLimit$1 = awaitify(rejectLimit, 4);
	rejectSeries$1 = awaitify(rejectSeries, 3);
	DEFAULT_TIMES = 5;
	DEFAULT_INTERVAL = 0;
	some$1 = awaitify(some, 3);
	someLimit$1 = awaitify(someLimit, 4);
	someSeries$1 = awaitify(someSeries, 3);
	sortBy$1 = awaitify(sortBy, 3);
	tryEach$1 = awaitify(tryEach);
	whilst$1 = awaitify(whilst, 3);
	waterfall$1 = awaitify(waterfall);
	index = {
		apply,
		applyEach,
		applyEachSeries,
		asyncify,
		auto,
		autoInject,
		cargo: cargo$1,
		cargoQueue: cargo,
		compose,
		concat: concat$1,
		concatLimit: concatLimit$1,
		concatSeries: concatSeries$1,
		constant: constant$1,
		detect: detect$1,
		detectLimit: detectLimit$1,
		detectSeries: detectSeries$1,
		dir,
		doUntil,
		doWhilst: doWhilst$1,
		each,
		eachLimit: eachLimit$1,
		eachOf: eachOf$1,
		eachOfLimit: eachOfLimit$1,
		eachOfSeries: eachOfSeries$1,
		eachSeries: eachSeries$1,
		ensureAsync,
		every: every$1,
		everyLimit: everyLimit$1,
		everySeries: everySeries$1,
		filter: filter$1,
		filterLimit: filterLimit$1,
		filterSeries: filterSeries$1,
		forever: forever$1,
		groupBy,
		groupByLimit: groupByLimit$1,
		groupBySeries,
		log,
		map: map$1,
		mapLimit: mapLimit$1,
		mapSeries: mapSeries$1,
		mapValues,
		mapValuesLimit: mapValuesLimit$1,
		mapValuesSeries,
		memoize,
		nextTick,
		parallel,
		parallelLimit,
		priorityQueue,
		queue,
		race: race$1,
		reduce: reduce$1,
		reduceRight,
		reflect,
		reflectAll,
		reject: reject$1,
		rejectLimit: rejectLimit$1,
		rejectSeries: rejectSeries$1,
		retry,
		retryable,
		seq,
		series,
		setImmediate: setImmediate$1,
		some: some$1,
		someLimit: someLimit$1,
		someSeries: someSeries$1,
		sortBy: sortBy$1,
		timeout,
		times,
		timesLimit,
		timesSeries,
		transform,
		tryEach: tryEach$1,
		unmemoize,
		until,
		waterfall: waterfall$1,
		whilst: whilst$1,
		all: every$1,
		allLimit: everyLimit$1,
		allSeries: everySeries$1,
		any: some$1,
		anyLimit: someLimit$1,
		anySeries: someSeries$1,
		find: detect$1,
		findLimit: detectLimit$1,
		findSeries: detectSeries$1,
		flatMap: concat$1,
		flatMapLimit: concatLimit$1,
		flatMapSeries: concatSeries$1,
		forEach: each,
		forEachSeries: eachSeries$1,
		forEachLimit: eachLimit$1,
		forEachOf: eachOf$1,
		forEachOfSeries: eachOfSeries$1,
		forEachOfLimit: eachOfLimit$1,
		inject: reduce$1,
		foldl: reduce$1,
		foldr: reduceRight,
		select: filter$1,
		selectLimit: filterLimit$1,
		selectSeries: filterSeries$1,
		wrapSync: asyncify,
		during: whilst$1,
		doDuring: doWhilst$1
	};
}));
//#endregion
//#region node_modules/graceful-fs/polyfills.js
var require_polyfills = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var constants = __require("constants");
	var origCwd = process.cwd;
	var cwd = null;
	var platform = process.env.GRACEFUL_FS_PLATFORM || process.platform;
	process.cwd = function() {
		if (!cwd) cwd = origCwd.call(process);
		return cwd;
	};
	try {
		process.cwd();
	} catch (er) {}
	if (typeof process.chdir === "function") {
		var chdir = process.chdir;
		process.chdir = function(d) {
			cwd = null;
			chdir.call(process, d);
		};
		if (Object.setPrototypeOf) Object.setPrototypeOf(process.chdir, chdir);
	}
	module.exports = patch;
	function patch(fs) {
		if (constants.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./)) patchLchmod(fs);
		if (!fs.lutimes) patchLutimes(fs);
		fs.chown = chownFix(fs.chown);
		fs.fchown = chownFix(fs.fchown);
		fs.lchown = chownFix(fs.lchown);
		fs.chmod = chmodFix(fs.chmod);
		fs.fchmod = chmodFix(fs.fchmod);
		fs.lchmod = chmodFix(fs.lchmod);
		fs.chownSync = chownFixSync(fs.chownSync);
		fs.fchownSync = chownFixSync(fs.fchownSync);
		fs.lchownSync = chownFixSync(fs.lchownSync);
		fs.chmodSync = chmodFixSync(fs.chmodSync);
		fs.fchmodSync = chmodFixSync(fs.fchmodSync);
		fs.lchmodSync = chmodFixSync(fs.lchmodSync);
		fs.stat = statFix(fs.stat);
		fs.fstat = statFix(fs.fstat);
		fs.lstat = statFix(fs.lstat);
		fs.statSync = statFixSync(fs.statSync);
		fs.fstatSync = statFixSync(fs.fstatSync);
		fs.lstatSync = statFixSync(fs.lstatSync);
		if (fs.chmod && !fs.lchmod) {
			fs.lchmod = function(path, mode, cb) {
				if (cb) process.nextTick(cb);
			};
			fs.lchmodSync = function() {};
		}
		if (fs.chown && !fs.lchown) {
			fs.lchown = function(path, uid, gid, cb) {
				if (cb) process.nextTick(cb);
			};
			fs.lchownSync = function() {};
		}
		if (platform === "win32") fs.rename = typeof fs.rename !== "function" ? fs.rename : (function(fs$rename) {
			function rename(from, to, cb) {
				var start = Date.now();
				var backoff = 0;
				fs$rename(from, to, function CB(er) {
					if (er && (er.code === "EACCES" || er.code === "EPERM" || er.code === "EBUSY") && Date.now() - start < 6e4) {
						setTimeout(function() {
							fs.stat(to, function(stater, st) {
								if (stater && stater.code === "ENOENT") fs$rename(from, to, CB);
								else cb(er);
							});
						}, backoff);
						if (backoff < 100) backoff += 10;
						return;
					}
					if (cb) cb(er);
				});
			}
			if (Object.setPrototypeOf) Object.setPrototypeOf(rename, fs$rename);
			return rename;
		})(fs.rename);
		fs.read = typeof fs.read !== "function" ? fs.read : (function(fs$read) {
			function read(fd, buffer, offset, length, position, callback_) {
				var callback;
				if (callback_ && typeof callback_ === "function") {
					var eagCounter = 0;
					callback = function(er, _, __) {
						if (er && er.code === "EAGAIN" && eagCounter < 10) {
							eagCounter++;
							return fs$read.call(fs, fd, buffer, offset, length, position, callback);
						}
						callback_.apply(this, arguments);
					};
				}
				return fs$read.call(fs, fd, buffer, offset, length, position, callback);
			}
			if (Object.setPrototypeOf) Object.setPrototypeOf(read, fs$read);
			return read;
		})(fs.read);
		fs.readSync = typeof fs.readSync !== "function" ? fs.readSync : (function(fs$readSync) {
			return function(fd, buffer, offset, length, position) {
				var eagCounter = 0;
				while (true) try {
					return fs$readSync.call(fs, fd, buffer, offset, length, position);
				} catch (er) {
					if (er.code === "EAGAIN" && eagCounter < 10) {
						eagCounter++;
						continue;
					}
					throw er;
				}
			};
		})(fs.readSync);
		function patchLchmod(fs) {
			fs.lchmod = function(path, mode, callback) {
				fs.open(path, constants.O_WRONLY | constants.O_SYMLINK, mode, function(err, fd) {
					if (err) {
						if (callback) callback(err);
						return;
					}
					fs.fchmod(fd, mode, function(err) {
						fs.close(fd, function(err2) {
							if (callback) callback(err || err2);
						});
					});
				});
			};
			fs.lchmodSync = function(path, mode) {
				var fd = fs.openSync(path, constants.O_WRONLY | constants.O_SYMLINK, mode);
				var threw = true;
				var ret;
				try {
					ret = fs.fchmodSync(fd, mode);
					threw = false;
				} finally {
					if (threw) try {
						fs.closeSync(fd);
					} catch (er) {}
					else fs.closeSync(fd);
				}
				return ret;
			};
		}
		function patchLutimes(fs) {
			if (constants.hasOwnProperty("O_SYMLINK") && fs.futimes) {
				fs.lutimes = function(path, at, mt, cb) {
					fs.open(path, constants.O_SYMLINK, function(er, fd) {
						if (er) {
							if (cb) cb(er);
							return;
						}
						fs.futimes(fd, at, mt, function(er) {
							fs.close(fd, function(er2) {
								if (cb) cb(er || er2);
							});
						});
					});
				};
				fs.lutimesSync = function(path, at, mt) {
					var fd = fs.openSync(path, constants.O_SYMLINK);
					var ret;
					var threw = true;
					try {
						ret = fs.futimesSync(fd, at, mt);
						threw = false;
					} finally {
						if (threw) try {
							fs.closeSync(fd);
						} catch (er) {}
						else fs.closeSync(fd);
					}
					return ret;
				};
			} else if (fs.futimes) {
				fs.lutimes = function(_a, _b, _c, cb) {
					if (cb) process.nextTick(cb);
				};
				fs.lutimesSync = function() {};
			}
		}
		function chmodFix(orig) {
			if (!orig) return orig;
			return function(target, mode, cb) {
				return orig.call(fs, target, mode, function(er) {
					if (chownErOk(er)) er = null;
					if (cb) cb.apply(this, arguments);
				});
			};
		}
		function chmodFixSync(orig) {
			if (!orig) return orig;
			return function(target, mode) {
				try {
					return orig.call(fs, target, mode);
				} catch (er) {
					if (!chownErOk(er)) throw er;
				}
			};
		}
		function chownFix(orig) {
			if (!orig) return orig;
			return function(target, uid, gid, cb) {
				return orig.call(fs, target, uid, gid, function(er) {
					if (chownErOk(er)) er = null;
					if (cb) cb.apply(this, arguments);
				});
			};
		}
		function chownFixSync(orig) {
			if (!orig) return orig;
			return function(target, uid, gid) {
				try {
					return orig.call(fs, target, uid, gid);
				} catch (er) {
					if (!chownErOk(er)) throw er;
				}
			};
		}
		function statFix(orig) {
			if (!orig) return orig;
			return function(target, options, cb) {
				if (typeof options === "function") {
					cb = options;
					options = null;
				}
				function callback(er, stats) {
					if (stats) {
						if (stats.uid < 0) stats.uid += 4294967296;
						if (stats.gid < 0) stats.gid += 4294967296;
					}
					if (cb) cb.apply(this, arguments);
				}
				return options ? orig.call(fs, target, options, callback) : orig.call(fs, target, callback);
			};
		}
		function statFixSync(orig) {
			if (!orig) return orig;
			return function(target, options) {
				var stats = options ? orig.call(fs, target, options) : orig.call(fs, target);
				if (stats) {
					if (stats.uid < 0) stats.uid += 4294967296;
					if (stats.gid < 0) stats.gid += 4294967296;
				}
				return stats;
			};
		}
		function chownErOk(er) {
			if (!er) return true;
			if (er.code === "ENOSYS") return true;
			if (!process.getuid || process.getuid() !== 0) {
				if (er.code === "EINVAL" || er.code === "EPERM") return true;
			}
			return false;
		}
	}
}));
//#endregion
//#region node_modules/graceful-fs/legacy-streams.js
var require_legacy_streams = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Stream$5 = __require("stream").Stream;
	module.exports = legacy;
	function legacy(fs) {
		return {
			ReadStream,
			WriteStream
		};
		function ReadStream(path, options) {
			if (!(this instanceof ReadStream)) return new ReadStream(path, options);
			Stream$5.call(this);
			var self = this;
			this.path = path;
			this.fd = null;
			this.readable = true;
			this.paused = false;
			this.flags = "r";
			this.mode = 438;
			this.bufferSize = 65536;
			options = options || {};
			var keys = Object.keys(options);
			for (var index = 0, length = keys.length; index < length; index++) {
				var key = keys[index];
				this[key] = options[key];
			}
			if (this.encoding) this.setEncoding(this.encoding);
			if (this.start !== void 0) {
				if ("number" !== typeof this.start) throw TypeError("start must be a Number");
				if (this.end === void 0) this.end = Infinity;
				else if ("number" !== typeof this.end) throw TypeError("end must be a Number");
				if (this.start > this.end) throw new Error("start must be <= end");
				this.pos = this.start;
			}
			if (this.fd !== null) {
				process.nextTick(function() {
					self._read();
				});
				return;
			}
			fs.open(this.path, this.flags, this.mode, function(err, fd) {
				if (err) {
					self.emit("error", err);
					self.readable = false;
					return;
				}
				self.fd = fd;
				self.emit("open", fd);
				self._read();
			});
		}
		function WriteStream(path, options) {
			if (!(this instanceof WriteStream)) return new WriteStream(path, options);
			Stream$5.call(this);
			this.path = path;
			this.fd = null;
			this.writable = true;
			this.flags = "w";
			this.encoding = "binary";
			this.mode = 438;
			this.bytesWritten = 0;
			options = options || {};
			var keys = Object.keys(options);
			for (var index = 0, length = keys.length; index < length; index++) {
				var key = keys[index];
				this[key] = options[key];
			}
			if (this.start !== void 0) {
				if ("number" !== typeof this.start) throw TypeError("start must be a Number");
				if (this.start < 0) throw new Error("start must be >= zero");
				this.pos = this.start;
			}
			this.busy = false;
			this._queue = [];
			if (this.fd === null) {
				this._open = fs.open;
				this._queue.push([
					this._open,
					this.path,
					this.flags,
					this.mode,
					void 0
				]);
				this.flush();
			}
		}
	}
}));
//#endregion
//#region node_modules/graceful-fs/clone.js
var require_clone = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = clone;
	var getPrototypeOf = Object.getPrototypeOf || function(obj) {
		return obj.__proto__;
	};
	function clone(obj) {
		if (obj === null || typeof obj !== "object") return obj;
		if (obj instanceof Object) var copy = { __proto__: getPrototypeOf(obj) };
		else var copy = Object.create(null);
		Object.getOwnPropertyNames(obj).forEach(function(key) {
			Object.defineProperty(copy, key, Object.getOwnPropertyDescriptor(obj, key));
		});
		return copy;
	}
}));
//#endregion
//#region node_modules/graceful-fs/graceful-fs.js
var require_graceful_fs = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var fs$4 = __require("fs");
	var polyfills = require_polyfills();
	var legacy = require_legacy_streams();
	var clone = require_clone();
	var util$5 = __require("util");
	/* istanbul ignore next - node 0.x polyfill */
	var gracefulQueue;
	var previousSymbol;
	/* istanbul ignore else - node 0.x polyfill */
	if (typeof Symbol === "function" && typeof Symbol.for === "function") {
		gracefulQueue = Symbol.for("graceful-fs.queue");
		previousSymbol = Symbol.for("graceful-fs.previous");
	} else {
		gracefulQueue = "___graceful-fs.queue";
		previousSymbol = "___graceful-fs.previous";
	}
	function noop() {}
	function publishQueue(context, queue) {
		Object.defineProperty(context, gracefulQueue, { get: function() {
			return queue;
		} });
	}
	var debug = noop;
	if (util$5.debuglog) debug = util$5.debuglog("gfs4");
	else if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || "")) debug = function() {
		var m = util$5.format.apply(util$5, arguments);
		m = "GFS4: " + m.split(/\n/).join("\nGFS4: ");
		console.error(m);
	};
	if (!fs$4[gracefulQueue]) {
		publishQueue(fs$4, global[gracefulQueue] || []);
		fs$4.close = (function(fs$close) {
			function close(fd, cb) {
				return fs$close.call(fs$4, fd, function(err) {
					if (!err) resetQueue();
					if (typeof cb === "function") cb.apply(this, arguments);
				});
			}
			Object.defineProperty(close, previousSymbol, { value: fs$close });
			return close;
		})(fs$4.close);
		fs$4.closeSync = (function(fs$closeSync) {
			function closeSync(fd) {
				fs$closeSync.apply(fs$4, arguments);
				resetQueue();
			}
			Object.defineProperty(closeSync, previousSymbol, { value: fs$closeSync });
			return closeSync;
		})(fs$4.closeSync);
		if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || "")) process.on("exit", function() {
			debug(fs$4[gracefulQueue]);
			__require("assert").equal(fs$4[gracefulQueue].length, 0);
		});
	}
	if (!global[gracefulQueue]) publishQueue(global, fs$4[gracefulQueue]);
	module.exports = patch(clone(fs$4));
	if (process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !fs$4.__patched) {
		module.exports = patch(fs$4);
		fs$4.__patched = true;
	}
	function patch(fs) {
		polyfills(fs);
		fs.gracefulify = patch;
		fs.createReadStream = createReadStream;
		fs.createWriteStream = createWriteStream;
		var fs$readFile = fs.readFile;
		fs.readFile = readFile;
		function readFile(path, options, cb) {
			if (typeof options === "function") cb = options, options = null;
			return go$readFile(path, options, cb);
			function go$readFile(path, options, cb, startTime) {
				return fs$readFile(path, options, function(err) {
					if (err && (err.code === "EMFILE" || err.code === "ENFILE")) enqueue([
						go$readFile,
						[
							path,
							options,
							cb
						],
						err,
						startTime || Date.now(),
						Date.now()
					]);
					else if (typeof cb === "function") cb.apply(this, arguments);
				});
			}
		}
		var fs$writeFile = fs.writeFile;
		fs.writeFile = writeFile;
		function writeFile(path, data, options, cb) {
			if (typeof options === "function") cb = options, options = null;
			return go$writeFile(path, data, options, cb);
			function go$writeFile(path, data, options, cb, startTime) {
				return fs$writeFile(path, data, options, function(err) {
					if (err && (err.code === "EMFILE" || err.code === "ENFILE")) enqueue([
						go$writeFile,
						[
							path,
							data,
							options,
							cb
						],
						err,
						startTime || Date.now(),
						Date.now()
					]);
					else if (typeof cb === "function") cb.apply(this, arguments);
				});
			}
		}
		var fs$appendFile = fs.appendFile;
		if (fs$appendFile) fs.appendFile = appendFile;
		function appendFile(path, data, options, cb) {
			if (typeof options === "function") cb = options, options = null;
			return go$appendFile(path, data, options, cb);
			function go$appendFile(path, data, options, cb, startTime) {
				return fs$appendFile(path, data, options, function(err) {
					if (err && (err.code === "EMFILE" || err.code === "ENFILE")) enqueue([
						go$appendFile,
						[
							path,
							data,
							options,
							cb
						],
						err,
						startTime || Date.now(),
						Date.now()
					]);
					else if (typeof cb === "function") cb.apply(this, arguments);
				});
			}
		}
		var fs$copyFile = fs.copyFile;
		if (fs$copyFile) fs.copyFile = copyFile;
		function copyFile(src, dest, flags, cb) {
			if (typeof flags === "function") {
				cb = flags;
				flags = 0;
			}
			return go$copyFile(src, dest, flags, cb);
			function go$copyFile(src, dest, flags, cb, startTime) {
				return fs$copyFile(src, dest, flags, function(err) {
					if (err && (err.code === "EMFILE" || err.code === "ENFILE")) enqueue([
						go$copyFile,
						[
							src,
							dest,
							flags,
							cb
						],
						err,
						startTime || Date.now(),
						Date.now()
					]);
					else if (typeof cb === "function") cb.apply(this, arguments);
				});
			}
		}
		var fs$readdir = fs.readdir;
		fs.readdir = readdir;
		var noReaddirOptionVersions = /^v[0-5]\./;
		function readdir(path, options, cb) {
			if (typeof options === "function") cb = options, options = null;
			var go$readdir = noReaddirOptionVersions.test(process.version) ? function go$readdir(path, options, cb, startTime) {
				return fs$readdir(path, fs$readdirCallback(path, options, cb, startTime));
			} : function go$readdir(path, options, cb, startTime) {
				return fs$readdir(path, options, fs$readdirCallback(path, options, cb, startTime));
			};
			return go$readdir(path, options, cb);
			function fs$readdirCallback(path, options, cb, startTime) {
				return function(err, files) {
					if (err && (err.code === "EMFILE" || err.code === "ENFILE")) enqueue([
						go$readdir,
						[
							path,
							options,
							cb
						],
						err,
						startTime || Date.now(),
						Date.now()
					]);
					else {
						if (files && files.sort) files.sort();
						if (typeof cb === "function") cb.call(this, err, files);
					}
				};
			}
		}
		if (process.version.substr(0, 4) === "v0.8") {
			var legStreams = legacy(fs);
			ReadStream = legStreams.ReadStream;
			WriteStream = legStreams.WriteStream;
		}
		var fs$ReadStream = fs.ReadStream;
		if (fs$ReadStream) {
			ReadStream.prototype = Object.create(fs$ReadStream.prototype);
			ReadStream.prototype.open = ReadStream$open;
		}
		var fs$WriteStream = fs.WriteStream;
		if (fs$WriteStream) {
			WriteStream.prototype = Object.create(fs$WriteStream.prototype);
			WriteStream.prototype.open = WriteStream$open;
		}
		Object.defineProperty(fs, "ReadStream", {
			get: function() {
				return ReadStream;
			},
			set: function(val) {
				ReadStream = val;
			},
			enumerable: true,
			configurable: true
		});
		Object.defineProperty(fs, "WriteStream", {
			get: function() {
				return WriteStream;
			},
			set: function(val) {
				WriteStream = val;
			},
			enumerable: true,
			configurable: true
		});
		var FileReadStream = ReadStream;
		Object.defineProperty(fs, "FileReadStream", {
			get: function() {
				return FileReadStream;
			},
			set: function(val) {
				FileReadStream = val;
			},
			enumerable: true,
			configurable: true
		});
		var FileWriteStream = WriteStream;
		Object.defineProperty(fs, "FileWriteStream", {
			get: function() {
				return FileWriteStream;
			},
			set: function(val) {
				FileWriteStream = val;
			},
			enumerable: true,
			configurable: true
		});
		function ReadStream(path, options) {
			if (this instanceof ReadStream) return fs$ReadStream.apply(this, arguments), this;
			else return ReadStream.apply(Object.create(ReadStream.prototype), arguments);
		}
		function ReadStream$open() {
			var that = this;
			open(that.path, that.flags, that.mode, function(err, fd) {
				if (err) {
					if (that.autoClose) that.destroy();
					that.emit("error", err);
				} else {
					that.fd = fd;
					that.emit("open", fd);
					that.read();
				}
			});
		}
		function WriteStream(path, options) {
			if (this instanceof WriteStream) return fs$WriteStream.apply(this, arguments), this;
			else return WriteStream.apply(Object.create(WriteStream.prototype), arguments);
		}
		function WriteStream$open() {
			var that = this;
			open(that.path, that.flags, that.mode, function(err, fd) {
				if (err) {
					that.destroy();
					that.emit("error", err);
				} else {
					that.fd = fd;
					that.emit("open", fd);
				}
			});
		}
		function createReadStream(path, options) {
			return new fs.ReadStream(path, options);
		}
		function createWriteStream(path, options) {
			return new fs.WriteStream(path, options);
		}
		var fs$open = fs.open;
		fs.open = open;
		function open(path, flags, mode, cb) {
			if (typeof mode === "function") cb = mode, mode = null;
			return go$open(path, flags, mode, cb);
			function go$open(path, flags, mode, cb, startTime) {
				return fs$open(path, flags, mode, function(err, fd) {
					if (err && (err.code === "EMFILE" || err.code === "ENFILE")) enqueue([
						go$open,
						[
							path,
							flags,
							mode,
							cb
						],
						err,
						startTime || Date.now(),
						Date.now()
					]);
					else if (typeof cb === "function") cb.apply(this, arguments);
				});
			}
		}
		return fs;
	}
	function enqueue(elem) {
		debug("ENQUEUE", elem[0].name, elem[1]);
		fs$4[gracefulQueue].push(elem);
		retry();
	}
	var retryTimer;
	function resetQueue() {
		var now = Date.now();
		for (var i = 0; i < fs$4[gracefulQueue].length; ++i) if (fs$4[gracefulQueue][i].length > 2) {
			fs$4[gracefulQueue][i][3] = now;
			fs$4[gracefulQueue][i][4] = now;
		}
		retry();
	}
	function retry() {
		clearTimeout(retryTimer);
		retryTimer = void 0;
		if (fs$4[gracefulQueue].length === 0) return;
		var elem = fs$4[gracefulQueue].shift();
		var fn = elem[0];
		var args = elem[1];
		var err = elem[2];
		var startTime = elem[3];
		var lastTime = elem[4];
		if (startTime === void 0) {
			debug("RETRY", fn.name, args);
			fn.apply(null, args);
		} else if (Date.now() - startTime >= 6e4) {
			debug("TIMEOUT", fn.name, args);
			var cb = args.pop();
			if (typeof cb === "function") cb.call(null, err);
		} else {
			var sinceAttempt = Date.now() - lastTime;
			var sinceStart = Math.max(lastTime - startTime, 1);
			if (sinceAttempt >= Math.min(sinceStart * 1.2, 100)) {
				debug("RETRY", fn.name, args);
				fn.apply(null, args.concat([startTime]));
			} else fs$4[gracefulQueue].push(elem);
		}
		if (retryTimer === void 0) retryTimer = setTimeout(retry, 0);
	}
}));
//#endregion
//#region node_modules/lazystream/node_modules/readable-stream/lib/internal/streams/stream.js
var require_stream$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = __require("stream");
}));
//#endregion
//#region node_modules/lazystream/node_modules/safe-buffer/index.js
var require_safe_buffer$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var buffer$1 = __require("buffer");
	var Buffer = buffer$1.Buffer;
	function copyProps(src, dst) {
		for (var key in src) dst[key] = src[key];
	}
	if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) module.exports = buffer$1;
	else {
		copyProps(buffer$1, exports);
		exports.Buffer = SafeBuffer;
	}
	function SafeBuffer(arg, encodingOrOffset, length) {
		return Buffer(arg, encodingOrOffset, length);
	}
	copyProps(Buffer, SafeBuffer);
	SafeBuffer.from = function(arg, encodingOrOffset, length) {
		if (typeof arg === "number") throw new TypeError("Argument must not be a number");
		return Buffer(arg, encodingOrOffset, length);
	};
	SafeBuffer.alloc = function(size, fill, encoding) {
		if (typeof size !== "number") throw new TypeError("Argument must be a number");
		var buf = Buffer(size);
		if (fill !== void 0) {
			if (typeof encoding === "string") buf.fill(fill, encoding);
			else buf.fill(fill);
		} else buf.fill(0);
		return buf;
	};
	SafeBuffer.allocUnsafe = function(size) {
		if (typeof size !== "number") throw new TypeError("Argument must be a number");
		return Buffer(size);
	};
	SafeBuffer.allocUnsafeSlow = function(size) {
		if (typeof size !== "number") throw new TypeError("Argument must be a number");
		return buffer$1.SlowBuffer(size);
	};
}));
//#endregion
//#region node_modules/lazystream/node_modules/readable-stream/lib/internal/streams/BufferList.js
var require_BufferList$2 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
	}
	var Buffer = require_safe_buffer$1().Buffer;
	var util$4 = __require("util");
	function copyBuffer(src, target, offset) {
		src.copy(target, offset);
	}
	module.exports = function() {
		function BufferList() {
			_classCallCheck(this, BufferList);
			this.head = null;
			this.tail = null;
			this.length = 0;
		}
		BufferList.prototype.push = function push(v) {
			var entry = {
				data: v,
				next: null
			};
			if (this.length > 0) this.tail.next = entry;
			else this.head = entry;
			this.tail = entry;
			++this.length;
		};
		BufferList.prototype.unshift = function unshift(v) {
			var entry = {
				data: v,
				next: this.head
			};
			if (this.length === 0) this.tail = entry;
			this.head = entry;
			++this.length;
		};
		BufferList.prototype.shift = function shift() {
			if (this.length === 0) return;
			var ret = this.head.data;
			if (this.length === 1) this.head = this.tail = null;
			else this.head = this.head.next;
			--this.length;
			return ret;
		};
		BufferList.prototype.clear = function clear() {
			this.head = this.tail = null;
			this.length = 0;
		};
		BufferList.prototype.join = function join(s) {
			if (this.length === 0) return "";
			var p = this.head;
			var ret = "" + p.data;
			while (p = p.next) ret += s + p.data;
			return ret;
		};
		BufferList.prototype.concat = function concat(n) {
			if (this.length === 0) return Buffer.alloc(0);
			var ret = Buffer.allocUnsafe(n >>> 0);
			var p = this.head;
			var i = 0;
			while (p) {
				copyBuffer(p.data, ret, i);
				i += p.data.length;
				p = p.next;
			}
			return ret;
		};
		return BufferList;
	}();
	if (util$4 && util$4.inspect && util$4.inspect.custom) module.exports.prototype[util$4.inspect.custom] = function() {
		var obj = util$4.inspect({ length: this.length });
		return this.constructor.name + " " + obj;
	};
}));
//#endregion
//#region node_modules/lazystream/node_modules/readable-stream/lib/internal/streams/destroy.js
var require_destroy$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var pna = require_process_nextick_args();
	function destroy(err, cb) {
		var _this = this;
		var readableDestroyed = this._readableState && this._readableState.destroyed;
		var writableDestroyed = this._writableState && this._writableState.destroyed;
		if (readableDestroyed || writableDestroyed) {
			if (cb) cb(err);
			else if (err) {
				if (!this._writableState) pna.nextTick(emitErrorNT, this, err);
				else if (!this._writableState.errorEmitted) {
					this._writableState.errorEmitted = true;
					pna.nextTick(emitErrorNT, this, err);
				}
			}
			return this;
		}
		if (this._readableState) this._readableState.destroyed = true;
		if (this._writableState) this._writableState.destroyed = true;
		this._destroy(err || null, function(err) {
			if (!cb && err) {
				if (!_this._writableState) pna.nextTick(emitErrorNT, _this, err);
				else if (!_this._writableState.errorEmitted) {
					_this._writableState.errorEmitted = true;
					pna.nextTick(emitErrorNT, _this, err);
				}
			} else if (cb) cb(err);
		});
		return this;
	}
	function undestroy() {
		if (this._readableState) {
			this._readableState.destroyed = false;
			this._readableState.reading = false;
			this._readableState.ended = false;
			this._readableState.endEmitted = false;
		}
		if (this._writableState) {
			this._writableState.destroyed = false;
			this._writableState.ended = false;
			this._writableState.ending = false;
			this._writableState.finalCalled = false;
			this._writableState.prefinished = false;
			this._writableState.finished = false;
			this._writableState.errorEmitted = false;
		}
	}
	function emitErrorNT(self, err) {
		self.emit("error", err);
	}
	module.exports = {
		destroy,
		undestroy
	};
}));
//#endregion
//#region node_modules/lazystream/node_modules/readable-stream/lib/_stream_writable.js
var require__stream_writable$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var pna = require_process_nextick_args();
	module.exports = Writable;
	function CorkedRequest(state) {
		var _this = this;
		this.next = null;
		this.entry = null;
		this.finish = function() {
			onCorkedFinish(_this, state);
		};
	}
	var asyncWrite = !process.browser && ["v0.10", "v0.9."].indexOf(process.version.slice(0, 5)) > -1 ? setImmediate : pna.nextTick;
	var Duplex;
	Writable.WritableState = WritableState;
	var util = Object.create(require_util$2());
	util.inherits = require_inherits();
	var internalUtil = { deprecate: require_node() };
	var Stream = require_stream$1();
	var Buffer = require_safe_buffer$1().Buffer;
	var OurUint8Array = (typeof global !== "undefined" ? global : typeof window !== "undefined" ? window : typeof self !== "undefined" ? self : {}).Uint8Array || function() {};
	function _uint8ArrayToBuffer(chunk) {
		return Buffer.from(chunk);
	}
	function _isUint8Array(obj) {
		return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
	}
	var destroyImpl = require_destroy$1();
	util.inherits(Writable, Stream);
	function nop() {}
	function WritableState(options, stream) {
		Duplex = Duplex || require__stream_duplex$1();
		options = options || {};
		var isDuplex = stream instanceof Duplex;
		this.objectMode = !!options.objectMode;
		if (isDuplex) this.objectMode = this.objectMode || !!options.writableObjectMode;
		var hwm = options.highWaterMark;
		var writableHwm = options.writableHighWaterMark;
		var defaultHwm = this.objectMode ? 16 : 16384;
		if (hwm || hwm === 0) this.highWaterMark = hwm;
		else if (isDuplex && (writableHwm || writableHwm === 0)) this.highWaterMark = writableHwm;
		else this.highWaterMark = defaultHwm;
		this.highWaterMark = Math.floor(this.highWaterMark);
		this.finalCalled = false;
		this.needDrain = false;
		this.ending = false;
		this.ended = false;
		this.finished = false;
		this.destroyed = false;
		var noDecode = options.decodeStrings === false;
		this.decodeStrings = !noDecode;
		this.defaultEncoding = options.defaultEncoding || "utf8";
		this.length = 0;
		this.writing = false;
		this.corked = 0;
		this.sync = true;
		this.bufferProcessing = false;
		this.onwrite = function(er) {
			onwrite(stream, er);
		};
		this.writecb = null;
		this.writelen = 0;
		this.bufferedRequest = null;
		this.lastBufferedRequest = null;
		this.pendingcb = 0;
		this.prefinished = false;
		this.errorEmitted = false;
		this.bufferedRequestCount = 0;
		this.corkedRequestsFree = new CorkedRequest(this);
	}
	WritableState.prototype.getBuffer = function getBuffer() {
		var current = this.bufferedRequest;
		var out = [];
		while (current) {
			out.push(current);
			current = current.next;
		}
		return out;
	};
	(function() {
		try {
			Object.defineProperty(WritableState.prototype, "buffer", { get: internalUtil.deprecate(function() {
				return this.getBuffer();
			}, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003") });
		} catch (_) {}
	})();
	var realHasInstance;
	if (typeof Symbol === "function" && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === "function") {
		realHasInstance = Function.prototype[Symbol.hasInstance];
		Object.defineProperty(Writable, Symbol.hasInstance, { value: function(object) {
			if (realHasInstance.call(this, object)) return true;
			if (this !== Writable) return false;
			return object && object._writableState instanceof WritableState;
		} });
	} else realHasInstance = function(object) {
		return object instanceof this;
	};
	function Writable(options) {
		Duplex = Duplex || require__stream_duplex$1();
		if (!realHasInstance.call(Writable, this) && !(this instanceof Duplex)) return new Writable(options);
		this._writableState = new WritableState(options, this);
		this.writable = true;
		if (options) {
			if (typeof options.write === "function") this._write = options.write;
			if (typeof options.writev === "function") this._writev = options.writev;
			if (typeof options.destroy === "function") this._destroy = options.destroy;
			if (typeof options.final === "function") this._final = options.final;
		}
		Stream.call(this);
	}
	Writable.prototype.pipe = function() {
		this.emit("error", /* @__PURE__ */ new Error("Cannot pipe, not readable"));
	};
	function writeAfterEnd(stream, cb) {
		var er = /* @__PURE__ */ new Error("write after end");
		stream.emit("error", er);
		pna.nextTick(cb, er);
	}
	function validChunk(stream, state, chunk, cb) {
		var valid = true;
		var er = false;
		if (chunk === null) er = /* @__PURE__ */ new TypeError("May not write null values to stream");
		else if (typeof chunk !== "string" && chunk !== void 0 && !state.objectMode) er = /* @__PURE__ */ new TypeError("Invalid non-string/buffer chunk");
		if (er) {
			stream.emit("error", er);
			pna.nextTick(cb, er);
			valid = false;
		}
		return valid;
	}
	Writable.prototype.write = function(chunk, encoding, cb) {
		var state = this._writableState;
		var ret = false;
		var isBuf = !state.objectMode && _isUint8Array(chunk);
		if (isBuf && !Buffer.isBuffer(chunk)) chunk = _uint8ArrayToBuffer(chunk);
		if (typeof encoding === "function") {
			cb = encoding;
			encoding = null;
		}
		if (isBuf) encoding = "buffer";
		else if (!encoding) encoding = state.defaultEncoding;
		if (typeof cb !== "function") cb = nop;
		if (state.ended) writeAfterEnd(this, cb);
		else if (isBuf || validChunk(this, state, chunk, cb)) {
			state.pendingcb++;
			ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
		}
		return ret;
	};
	Writable.prototype.cork = function() {
		var state = this._writableState;
		state.corked++;
	};
	Writable.prototype.uncork = function() {
		var state = this._writableState;
		if (state.corked) {
			state.corked--;
			if (!state.writing && !state.corked && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
		}
	};
	Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
		if (typeof encoding === "string") encoding = encoding.toLowerCase();
		if (!([
			"hex",
			"utf8",
			"utf-8",
			"ascii",
			"binary",
			"base64",
			"ucs2",
			"ucs-2",
			"utf16le",
			"utf-16le",
			"raw"
		].indexOf((encoding + "").toLowerCase()) > -1)) throw new TypeError("Unknown encoding: " + encoding);
		this._writableState.defaultEncoding = encoding;
		return this;
	};
	function decodeChunk(state, chunk, encoding) {
		if (!state.objectMode && state.decodeStrings !== false && typeof chunk === "string") chunk = Buffer.from(chunk, encoding);
		return chunk;
	}
	Object.defineProperty(Writable.prototype, "writableHighWaterMark", {
		enumerable: false,
		get: function() {
			return this._writableState.highWaterMark;
		}
	});
	function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
		if (!isBuf) {
			var newChunk = decodeChunk(state, chunk, encoding);
			if (chunk !== newChunk) {
				isBuf = true;
				encoding = "buffer";
				chunk = newChunk;
			}
		}
		var len = state.objectMode ? 1 : chunk.length;
		state.length += len;
		var ret = state.length < state.highWaterMark;
		if (!ret) state.needDrain = true;
		if (state.writing || state.corked) {
			var last = state.lastBufferedRequest;
			state.lastBufferedRequest = {
				chunk,
				encoding,
				isBuf,
				callback: cb,
				next: null
			};
			if (last) last.next = state.lastBufferedRequest;
			else state.bufferedRequest = state.lastBufferedRequest;
			state.bufferedRequestCount += 1;
		} else doWrite(stream, state, false, len, chunk, encoding, cb);
		return ret;
	}
	function doWrite(stream, state, writev, len, chunk, encoding, cb) {
		state.writelen = len;
		state.writecb = cb;
		state.writing = true;
		state.sync = true;
		if (writev) stream._writev(chunk, state.onwrite);
		else stream._write(chunk, encoding, state.onwrite);
		state.sync = false;
	}
	function onwriteError(stream, state, sync, er, cb) {
		--state.pendingcb;
		if (sync) {
			pna.nextTick(cb, er);
			pna.nextTick(finishMaybe, stream, state);
			stream._writableState.errorEmitted = true;
			stream.emit("error", er);
		} else {
			cb(er);
			stream._writableState.errorEmitted = true;
			stream.emit("error", er);
			finishMaybe(stream, state);
		}
	}
	function onwriteStateUpdate(state) {
		state.writing = false;
		state.writecb = null;
		state.length -= state.writelen;
		state.writelen = 0;
	}
	function onwrite(stream, er) {
		var state = stream._writableState;
		var sync = state.sync;
		var cb = state.writecb;
		onwriteStateUpdate(state);
		if (er) onwriteError(stream, state, sync, er, cb);
		else {
			var finished = needFinish(state);
			if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) clearBuffer(stream, state);
			if (sync) asyncWrite(afterWrite, stream, state, finished, cb);
			else afterWrite(stream, state, finished, cb);
		}
	}
	function afterWrite(stream, state, finished, cb) {
		if (!finished) onwriteDrain(stream, state);
		state.pendingcb--;
		cb();
		finishMaybe(stream, state);
	}
	function onwriteDrain(stream, state) {
		if (state.length === 0 && state.needDrain) {
			state.needDrain = false;
			stream.emit("drain");
		}
	}
	function clearBuffer(stream, state) {
		state.bufferProcessing = true;
		var entry = state.bufferedRequest;
		if (stream._writev && entry && entry.next) {
			var l = state.bufferedRequestCount;
			var buffer = new Array(l);
			var holder = state.corkedRequestsFree;
			holder.entry = entry;
			var count = 0;
			var allBuffers = true;
			while (entry) {
				buffer[count] = entry;
				if (!entry.isBuf) allBuffers = false;
				entry = entry.next;
				count += 1;
			}
			buffer.allBuffers = allBuffers;
			doWrite(stream, state, true, state.length, buffer, "", holder.finish);
			state.pendingcb++;
			state.lastBufferedRequest = null;
			if (holder.next) {
				state.corkedRequestsFree = holder.next;
				holder.next = null;
			} else state.corkedRequestsFree = new CorkedRequest(state);
			state.bufferedRequestCount = 0;
		} else {
			while (entry) {
				var chunk = entry.chunk;
				var encoding = entry.encoding;
				var cb = entry.callback;
				doWrite(stream, state, false, state.objectMode ? 1 : chunk.length, chunk, encoding, cb);
				entry = entry.next;
				state.bufferedRequestCount--;
				if (state.writing) break;
			}
			if (entry === null) state.lastBufferedRequest = null;
		}
		state.bufferedRequest = entry;
		state.bufferProcessing = false;
	}
	Writable.prototype._write = function(chunk, encoding, cb) {
		cb(/* @__PURE__ */ new Error("_write() is not implemented"));
	};
	Writable.prototype._writev = null;
	Writable.prototype.end = function(chunk, encoding, cb) {
		var state = this._writableState;
		if (typeof chunk === "function") {
			cb = chunk;
			chunk = null;
			encoding = null;
		} else if (typeof encoding === "function") {
			cb = encoding;
			encoding = null;
		}
		if (chunk !== null && chunk !== void 0) this.write(chunk, encoding);
		if (state.corked) {
			state.corked = 1;
			this.uncork();
		}
		if (!state.ending) endWritable(this, state, cb);
	};
	function needFinish(state) {
		return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
	}
	function callFinal(stream, state) {
		stream._final(function(err) {
			state.pendingcb--;
			if (err) stream.emit("error", err);
			state.prefinished = true;
			stream.emit("prefinish");
			finishMaybe(stream, state);
		});
	}
	function prefinish(stream, state) {
		if (!state.prefinished && !state.finalCalled) {
			if (typeof stream._final === "function") {
				state.pendingcb++;
				state.finalCalled = true;
				pna.nextTick(callFinal, stream, state);
			} else {
				state.prefinished = true;
				stream.emit("prefinish");
			}
		}
	}
	function finishMaybe(stream, state) {
		var need = needFinish(state);
		if (need) {
			prefinish(stream, state);
			if (state.pendingcb === 0) {
				state.finished = true;
				stream.emit("finish");
			}
		}
		return need;
	}
	function endWritable(stream, state, cb) {
		state.ending = true;
		finishMaybe(stream, state);
		if (cb) {
			if (state.finished) pna.nextTick(cb);
			else stream.once("finish", cb);
		}
		state.ended = true;
		stream.writable = false;
	}
	function onCorkedFinish(corkReq, state, err) {
		var entry = corkReq.entry;
		corkReq.entry = null;
		while (entry) {
			var cb = entry.callback;
			state.pendingcb--;
			cb(err);
			entry = entry.next;
		}
		state.corkedRequestsFree.next = corkReq;
	}
	Object.defineProperty(Writable.prototype, "destroyed", {
		get: function() {
			if (this._writableState === void 0) return false;
			return this._writableState.destroyed;
		},
		set: function(value) {
			if (!this._writableState) return;
			this._writableState.destroyed = value;
		}
	});
	Writable.prototype.destroy = destroyImpl.destroy;
	Writable.prototype._undestroy = destroyImpl.undestroy;
	Writable.prototype._destroy = function(err, cb) {
		this.end();
		cb(err);
	};
}));
//#endregion
//#region node_modules/lazystream/node_modules/readable-stream/lib/_stream_duplex.js
var require__stream_duplex$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var pna = require_process_nextick_args();
	var objectKeys = Object.keys || function(obj) {
		var keys = [];
		for (var key in obj) keys.push(key);
		return keys;
	};
	module.exports = Duplex;
	var util = Object.create(require_util$2());
	util.inherits = require_inherits();
	var Readable = require__stream_readable$1();
	var Writable = require__stream_writable$1();
	util.inherits(Duplex, Readable);
	var keys = objectKeys(Writable.prototype);
	for (var v = 0; v < keys.length; v++) {
		var method = keys[v];
		if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
	}
	function Duplex(options) {
		if (!(this instanceof Duplex)) return new Duplex(options);
		Readable.call(this, options);
		Writable.call(this, options);
		if (options && options.readable === false) this.readable = false;
		if (options && options.writable === false) this.writable = false;
		this.allowHalfOpen = true;
		if (options && options.allowHalfOpen === false) this.allowHalfOpen = false;
		this.once("end", onend);
	}
	Object.defineProperty(Duplex.prototype, "writableHighWaterMark", {
		enumerable: false,
		get: function() {
			return this._writableState.highWaterMark;
		}
	});
	function onend() {
		if (this.allowHalfOpen || this._writableState.ended) return;
		pna.nextTick(onEndNT, this);
	}
	function onEndNT(self) {
		self.end();
	}
	Object.defineProperty(Duplex.prototype, "destroyed", {
		get: function() {
			if (this._readableState === void 0 || this._writableState === void 0) return false;
			return this._readableState.destroyed && this._writableState.destroyed;
		},
		set: function(value) {
			if (this._readableState === void 0 || this._writableState === void 0) return;
			this._readableState.destroyed = value;
			this._writableState.destroyed = value;
		}
	});
	Duplex.prototype._destroy = function(err, cb) {
		this.push(null);
		this.end();
		pna.nextTick(cb, err);
	};
}));
//#endregion
//#region node_modules/lazystream/node_modules/readable-stream/lib/_stream_readable.js
var require__stream_readable$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var pna = require_process_nextick_args();
	module.exports = Readable;
	var isArray = require_isarray();
	var Duplex;
	Readable.ReadableState = ReadableState$1;
	__require("events").EventEmitter;
	var EElistenerCount = function(emitter, type) {
		return emitter.listeners(type).length;
	};
	var Stream = require_stream$1();
	var Buffer = require_safe_buffer$1().Buffer;
	var OurUint8Array = (typeof global !== "undefined" ? global : typeof window !== "undefined" ? window : typeof self !== "undefined" ? self : {}).Uint8Array || function() {};
	function _uint8ArrayToBuffer(chunk) {
		return Buffer.from(chunk);
	}
	function _isUint8Array(obj) {
		return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
	}
	var util = Object.create(require_util$2());
	util.inherits = require_inherits();
	var debugUtil$1 = __require("util");
	var debug = void 0;
	if (debugUtil$1 && debugUtil$1.debuglog) debug = debugUtil$1.debuglog("stream");
	else debug = function() {};
	var BufferList = require_BufferList$2();
	var destroyImpl = require_destroy$1();
	var StringDecoder;
	util.inherits(Readable, Stream);
	var kProxyEvents = [
		"error",
		"close",
		"destroy",
		"pause",
		"resume"
	];
	function prependListener(emitter, event, fn) {
		if (typeof emitter.prependListener === "function") return emitter.prependListener(event, fn);
		if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);
		else if (isArray(emitter._events[event])) emitter._events[event].unshift(fn);
		else emitter._events[event] = [fn, emitter._events[event]];
	}
	function ReadableState$1(options, stream) {
		Duplex = Duplex || require__stream_duplex$1();
		options = options || {};
		var isDuplex = stream instanceof Duplex;
		this.objectMode = !!options.objectMode;
		if (isDuplex) this.objectMode = this.objectMode || !!options.readableObjectMode;
		var hwm = options.highWaterMark;
		var readableHwm = options.readableHighWaterMark;
		var defaultHwm = this.objectMode ? 16 : 16384;
		if (hwm || hwm === 0) this.highWaterMark = hwm;
		else if (isDuplex && (readableHwm || readableHwm === 0)) this.highWaterMark = readableHwm;
		else this.highWaterMark = defaultHwm;
		this.highWaterMark = Math.floor(this.highWaterMark);
		this.buffer = new BufferList();
		this.length = 0;
		this.pipes = null;
		this.pipesCount = 0;
		this.flowing = null;
		this.ended = false;
		this.endEmitted = false;
		this.reading = false;
		this.sync = true;
		this.needReadable = false;
		this.emittedReadable = false;
		this.readableListening = false;
		this.resumeScheduled = false;
		this.destroyed = false;
		this.defaultEncoding = options.defaultEncoding || "utf8";
		this.awaitDrain = 0;
		this.readingMore = false;
		this.decoder = null;
		this.encoding = null;
		if (options.encoding) {
			if (!StringDecoder) StringDecoder = __require("node:string_decoder").StringDecoder;
			this.decoder = new StringDecoder(options.encoding);
			this.encoding = options.encoding;
		}
	}
	function Readable(options) {
		Duplex = Duplex || require__stream_duplex$1();
		if (!(this instanceof Readable)) return new Readable(options);
		this._readableState = new ReadableState$1(options, this);
		this.readable = true;
		if (options) {
			if (typeof options.read === "function") this._read = options.read;
			if (typeof options.destroy === "function") this._destroy = options.destroy;
		}
		Stream.call(this);
	}
	Object.defineProperty(Readable.prototype, "destroyed", {
		get: function() {
			if (this._readableState === void 0) return false;
			return this._readableState.destroyed;
		},
		set: function(value) {
			if (!this._readableState) return;
			this._readableState.destroyed = value;
		}
	});
	Readable.prototype.destroy = destroyImpl.destroy;
	Readable.prototype._undestroy = destroyImpl.undestroy;
	Readable.prototype._destroy = function(err, cb) {
		this.push(null);
		cb(err);
	};
	Readable.prototype.push = function(chunk, encoding) {
		var state = this._readableState;
		var skipChunkCheck;
		if (!state.objectMode) {
			if (typeof chunk === "string") {
				encoding = encoding || state.defaultEncoding;
				if (encoding !== state.encoding) {
					chunk = Buffer.from(chunk, encoding);
					encoding = "";
				}
				skipChunkCheck = true;
			}
		} else skipChunkCheck = true;
		return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
	};
	Readable.prototype.unshift = function(chunk) {
		return readableAddChunk(this, chunk, null, true, false);
	};
	function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
		var state = stream._readableState;
		if (chunk === null) {
			state.reading = false;
			onEofChunk(stream, state);
		} else {
			var er;
			if (!skipChunkCheck) er = chunkInvalid(state, chunk);
			if (er) stream.emit("error", er);
			else if (state.objectMode || chunk && chunk.length > 0) {
				if (typeof chunk !== "string" && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer.prototype) chunk = _uint8ArrayToBuffer(chunk);
				if (addToFront) {
					if (state.endEmitted) stream.emit("error", /* @__PURE__ */ new Error("stream.unshift() after end event"));
					else addChunk(stream, state, chunk, true);
				} else if (state.ended) stream.emit("error", /* @__PURE__ */ new Error("stream.push() after EOF"));
				else {
					state.reading = false;
					if (state.decoder && !encoding) {
						chunk = state.decoder.write(chunk);
						if (state.objectMode || chunk.length !== 0) addChunk(stream, state, chunk, false);
						else maybeReadMore(stream, state);
					} else addChunk(stream, state, chunk, false);
				}
			} else if (!addToFront) state.reading = false;
		}
		return needMoreData(state);
	}
	function addChunk(stream, state, chunk, addToFront) {
		if (state.flowing && state.length === 0 && !state.sync) {
			stream.emit("data", chunk);
			stream.read(0);
		} else {
			state.length += state.objectMode ? 1 : chunk.length;
			if (addToFront) state.buffer.unshift(chunk);
			else state.buffer.push(chunk);
			if (state.needReadable) emitReadable(stream);
		}
		maybeReadMore(stream, state);
	}
	function chunkInvalid(state, chunk) {
		var er;
		if (!_isUint8Array(chunk) && typeof chunk !== "string" && chunk !== void 0 && !state.objectMode) er = /* @__PURE__ */ new TypeError("Invalid non-string/buffer chunk");
		return er;
	}
	function needMoreData(state) {
		return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);
	}
	Readable.prototype.isPaused = function() {
		return this._readableState.flowing === false;
	};
	Readable.prototype.setEncoding = function(enc) {
		if (!StringDecoder) StringDecoder = __require("node:string_decoder").StringDecoder;
		this._readableState.decoder = new StringDecoder(enc);
		this._readableState.encoding = enc;
		return this;
	};
	var MAX_HWM = 8388608;
	function computeNewHighWaterMark(n) {
		if (n >= MAX_HWM) n = MAX_HWM;
		else {
			n--;
			n |= n >>> 1;
			n |= n >>> 2;
			n |= n >>> 4;
			n |= n >>> 8;
			n |= n >>> 16;
			n++;
		}
		return n;
	}
	function howMuchToRead(n, state) {
		if (n <= 0 || state.length === 0 && state.ended) return 0;
		if (state.objectMode) return 1;
		if (n !== n) {
			if (state.flowing && state.length) return state.buffer.head.data.length;
			else return state.length;
		}
		if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
		if (n <= state.length) return n;
		if (!state.ended) {
			state.needReadable = true;
			return 0;
		}
		return state.length;
	}
	Readable.prototype.read = function(n) {
		debug("read", n);
		n = parseInt(n, 10);
		var state = this._readableState;
		var nOrig = n;
		if (n !== 0) state.emittedReadable = false;
		if (n === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended)) {
			debug("read: emitReadable", state.length, state.ended);
			if (state.length === 0 && state.ended) endReadable(this);
			else emitReadable(this);
			return null;
		}
		n = howMuchToRead(n, state);
		if (n === 0 && state.ended) {
			if (state.length === 0) endReadable(this);
			return null;
		}
		var doRead = state.needReadable;
		debug("need readable", doRead);
		if (state.length === 0 || state.length - n < state.highWaterMark) {
			doRead = true;
			debug("length less than watermark", doRead);
		}
		if (state.ended || state.reading) {
			doRead = false;
			debug("reading or ended", doRead);
		} else if (doRead) {
			debug("do read");
			state.reading = true;
			state.sync = true;
			if (state.length === 0) state.needReadable = true;
			this._read(state.highWaterMark);
			state.sync = false;
			if (!state.reading) n = howMuchToRead(nOrig, state);
		}
		var ret;
		if (n > 0) ret = fromList(n, state);
		else ret = null;
		if (ret === null) {
			state.needReadable = true;
			n = 0;
		} else state.length -= n;
		if (state.length === 0) {
			if (!state.ended) state.needReadable = true;
			if (nOrig !== n && state.ended) endReadable(this);
		}
		if (ret !== null) this.emit("data", ret);
		return ret;
	};
	function onEofChunk(stream, state) {
		if (state.ended) return;
		if (state.decoder) {
			var chunk = state.decoder.end();
			if (chunk && chunk.length) {
				state.buffer.push(chunk);
				state.length += state.objectMode ? 1 : chunk.length;
			}
		}
		state.ended = true;
		emitReadable(stream);
	}
	function emitReadable(stream) {
		var state = stream._readableState;
		state.needReadable = false;
		if (!state.emittedReadable) {
			debug("emitReadable", state.flowing);
			state.emittedReadable = true;
			if (state.sync) pna.nextTick(emitReadable_, stream);
			else emitReadable_(stream);
		}
	}
	function emitReadable_(stream) {
		debug("emit readable");
		stream.emit("readable");
		flow(stream);
	}
	function maybeReadMore(stream, state) {
		if (!state.readingMore) {
			state.readingMore = true;
			pna.nextTick(maybeReadMore_, stream, state);
		}
	}
	function maybeReadMore_(stream, state) {
		var len = state.length;
		while (!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark) {
			debug("maybeReadMore read 0");
			stream.read(0);
			if (len === state.length) break;
			else len = state.length;
		}
		state.readingMore = false;
	}
	Readable.prototype._read = function(n) {
		this.emit("error", /* @__PURE__ */ new Error("_read() is not implemented"));
	};
	Readable.prototype.pipe = function(dest, pipeOpts) {
		var src = this;
		var state = this._readableState;
		switch (state.pipesCount) {
			case 0:
				state.pipes = dest;
				break;
			case 1:
				state.pipes = [state.pipes, dest];
				break;
			default: state.pipes.push(dest);
		}
		state.pipesCount += 1;
		debug("pipe count=%d opts=%j", state.pipesCount, pipeOpts);
		var endFn = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr ? onend : unpipe;
		if (state.endEmitted) pna.nextTick(endFn);
		else src.once("end", endFn);
		dest.on("unpipe", onunpipe);
		function onunpipe(readable, unpipeInfo) {
			debug("onunpipe");
			if (readable === src) {
				if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
					unpipeInfo.hasUnpiped = true;
					cleanup();
				}
			}
		}
		function onend() {
			debug("onend");
			dest.end();
		}
		var ondrain = pipeOnDrain(src);
		dest.on("drain", ondrain);
		var cleanedUp = false;
		function cleanup() {
			debug("cleanup");
			dest.removeListener("close", onclose);
			dest.removeListener("finish", onfinish);
			dest.removeListener("drain", ondrain);
			dest.removeListener("error", onerror);
			dest.removeListener("unpipe", onunpipe);
			src.removeListener("end", onend);
			src.removeListener("end", unpipe);
			src.removeListener("data", ondata);
			cleanedUp = true;
			if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
		}
		var increasedAwaitDrain = false;
		src.on("data", ondata);
		function ondata(chunk) {
			debug("ondata");
			increasedAwaitDrain = false;
			if (false === dest.write(chunk) && !increasedAwaitDrain) {
				if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
					debug("false write response, pause", state.awaitDrain);
					state.awaitDrain++;
					increasedAwaitDrain = true;
				}
				src.pause();
			}
		}
		function onerror(er) {
			debug("onerror", er);
			unpipe();
			dest.removeListener("error", onerror);
			if (EElistenerCount(dest, "error") === 0) dest.emit("error", er);
		}
		prependListener(dest, "error", onerror);
		function onclose() {
			dest.removeListener("finish", onfinish);
			unpipe();
		}
		dest.once("close", onclose);
		function onfinish() {
			debug("onfinish");
			dest.removeListener("close", onclose);
			unpipe();
		}
		dest.once("finish", onfinish);
		function unpipe() {
			debug("unpipe");
			src.unpipe(dest);
		}
		dest.emit("pipe", src);
		if (!state.flowing) {
			debug("pipe resume");
			src.resume();
		}
		return dest;
	};
	function pipeOnDrain(src) {
		return function() {
			var state = src._readableState;
			debug("pipeOnDrain", state.awaitDrain);
			if (state.awaitDrain) state.awaitDrain--;
			if (state.awaitDrain === 0 && EElistenerCount(src, "data")) {
				state.flowing = true;
				flow(src);
			}
		};
	}
	Readable.prototype.unpipe = function(dest) {
		var state = this._readableState;
		var unpipeInfo = { hasUnpiped: false };
		if (state.pipesCount === 0) return this;
		if (state.pipesCount === 1) {
			if (dest && dest !== state.pipes) return this;
			if (!dest) dest = state.pipes;
			state.pipes = null;
			state.pipesCount = 0;
			state.flowing = false;
			if (dest) dest.emit("unpipe", this, unpipeInfo);
			return this;
		}
		if (!dest) {
			var dests = state.pipes;
			var len = state.pipesCount;
			state.pipes = null;
			state.pipesCount = 0;
			state.flowing = false;
			for (var i = 0; i < len; i++) dests[i].emit("unpipe", this, { hasUnpiped: false });
			return this;
		}
		var index = indexOf(state.pipes, dest);
		if (index === -1) return this;
		state.pipes.splice(index, 1);
		state.pipesCount -= 1;
		if (state.pipesCount === 1) state.pipes = state.pipes[0];
		dest.emit("unpipe", this, unpipeInfo);
		return this;
	};
	Readable.prototype.on = function(ev, fn) {
		var res = Stream.prototype.on.call(this, ev, fn);
		if (ev === "data") {
			if (this._readableState.flowing !== false) this.resume();
		} else if (ev === "readable") {
			var state = this._readableState;
			if (!state.endEmitted && !state.readableListening) {
				state.readableListening = state.needReadable = true;
				state.emittedReadable = false;
				if (!state.reading) pna.nextTick(nReadingNextTick, this);
				else if (state.length) emitReadable(this);
			}
		}
		return res;
	};
	Readable.prototype.addListener = Readable.prototype.on;
	function nReadingNextTick(self) {
		debug("readable nexttick read 0");
		self.read(0);
	}
	Readable.prototype.resume = function() {
		var state = this._readableState;
		if (!state.flowing) {
			debug("resume");
			state.flowing = true;
			resume(this, state);
		}
		return this;
	};
	function resume(stream, state) {
		if (!state.resumeScheduled) {
			state.resumeScheduled = true;
			pna.nextTick(resume_, stream, state);
		}
	}
	function resume_(stream, state) {
		if (!state.reading) {
			debug("resume read 0");
			stream.read(0);
		}
		state.resumeScheduled = false;
		state.awaitDrain = 0;
		stream.emit("resume");
		flow(stream);
		if (state.flowing && !state.reading) stream.read(0);
	}
	Readable.prototype.pause = function() {
		debug("call pause flowing=%j", this._readableState.flowing);
		if (false !== this._readableState.flowing) {
			debug("pause");
			this._readableState.flowing = false;
			this.emit("pause");
		}
		return this;
	};
	function flow(stream) {
		var state = stream._readableState;
		debug("flow", state.flowing);
		while (state.flowing && stream.read() !== null);
	}
	Readable.prototype.wrap = function(stream) {
		var _this = this;
		var state = this._readableState;
		var paused = false;
		stream.on("end", function() {
			debug("wrapped end");
			if (state.decoder && !state.ended) {
				var chunk = state.decoder.end();
				if (chunk && chunk.length) _this.push(chunk);
			}
			_this.push(null);
		});
		stream.on("data", function(chunk) {
			debug("wrapped data");
			if (state.decoder) chunk = state.decoder.write(chunk);
			if (state.objectMode && (chunk === null || chunk === void 0)) return;
			else if (!state.objectMode && (!chunk || !chunk.length)) return;
			if (!_this.push(chunk)) {
				paused = true;
				stream.pause();
			}
		});
		for (var i in stream) if (this[i] === void 0 && typeof stream[i] === "function") this[i] = function(method) {
			return function() {
				return stream[method].apply(stream, arguments);
			};
		}(i);
		for (var n = 0; n < kProxyEvents.length; n++) stream.on(kProxyEvents[n], this.emit.bind(this, kProxyEvents[n]));
		this._read = function(n) {
			debug("wrapped _read", n);
			if (paused) {
				paused = false;
				stream.resume();
			}
		};
		return this;
	};
	Object.defineProperty(Readable.prototype, "readableHighWaterMark", {
		enumerable: false,
		get: function() {
			return this._readableState.highWaterMark;
		}
	});
	Readable._fromList = fromList;
	function fromList(n, state) {
		if (state.length === 0) return null;
		var ret;
		if (state.objectMode) ret = state.buffer.shift();
		else if (!n || n >= state.length) {
			if (state.decoder) ret = state.buffer.join("");
			else if (state.buffer.length === 1) ret = state.buffer.head.data;
			else ret = state.buffer.concat(state.length);
			state.buffer.clear();
		} else ret = fromListPartial(n, state.buffer, state.decoder);
		return ret;
	}
	function fromListPartial(n, list, hasStrings) {
		var ret;
		if (n < list.head.data.length) {
			ret = list.head.data.slice(0, n);
			list.head.data = list.head.data.slice(n);
		} else if (n === list.head.data.length) ret = list.shift();
		else ret = hasStrings ? copyFromBufferString(n, list) : copyFromBuffer(n, list);
		return ret;
	}
	function copyFromBufferString(n, list) {
		var p = list.head;
		var c = 1;
		var ret = p.data;
		n -= ret.length;
		while (p = p.next) {
			var str = p.data;
			var nb = n > str.length ? str.length : n;
			if (nb === str.length) ret += str;
			else ret += str.slice(0, n);
			n -= nb;
			if (n === 0) {
				if (nb === str.length) {
					++c;
					if (p.next) list.head = p.next;
					else list.head = list.tail = null;
				} else {
					list.head = p;
					p.data = str.slice(nb);
				}
				break;
			}
			++c;
		}
		list.length -= c;
		return ret;
	}
	function copyFromBuffer(n, list) {
		var ret = Buffer.allocUnsafe(n);
		var p = list.head;
		var c = 1;
		p.data.copy(ret);
		n -= p.data.length;
		while (p = p.next) {
			var buf = p.data;
			var nb = n > buf.length ? buf.length : n;
			buf.copy(ret, ret.length - n, 0, nb);
			n -= nb;
			if (n === 0) {
				if (nb === buf.length) {
					++c;
					if (p.next) list.head = p.next;
					else list.head = list.tail = null;
				} else {
					list.head = p;
					p.data = buf.slice(nb);
				}
				break;
			}
			++c;
		}
		list.length -= c;
		return ret;
	}
	function endReadable(stream) {
		var state = stream._readableState;
		if (state.length > 0) throw new Error("\"endReadable()\" called on non-empty stream");
		if (!state.endEmitted) {
			state.ended = true;
			pna.nextTick(endReadableNT, state, stream);
		}
	}
	function endReadableNT(state, stream) {
		if (!state.endEmitted && state.length === 0) {
			state.endEmitted = true;
			stream.readable = false;
			stream.emit("end");
		}
	}
	function indexOf(xs, x) {
		for (var i = 0, l = xs.length; i < l; i++) if (xs[i] === x) return i;
		return -1;
	}
}));
//#endregion
//#region node_modules/lazystream/node_modules/readable-stream/lib/_stream_transform.js
var require__stream_transform$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = Transform;
	var Duplex = require__stream_duplex$1();
	var util = Object.create(require_util$2());
	util.inherits = require_inherits();
	util.inherits(Transform, Duplex);
	function afterTransform(er, data) {
		var ts = this._transformState;
		ts.transforming = false;
		var cb = ts.writecb;
		if (!cb) return this.emit("error", /* @__PURE__ */ new Error("write callback called multiple times"));
		ts.writechunk = null;
		ts.writecb = null;
		if (data != null) this.push(data);
		cb(er);
		var rs = this._readableState;
		rs.reading = false;
		if (rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
	}
	function Transform(options) {
		if (!(this instanceof Transform)) return new Transform(options);
		Duplex.call(this, options);
		this._transformState = {
			afterTransform: afterTransform.bind(this),
			needTransform: false,
			transforming: false,
			writecb: null,
			writechunk: null,
			writeencoding: null
		};
		this._readableState.needReadable = true;
		this._readableState.sync = false;
		if (options) {
			if (typeof options.transform === "function") this._transform = options.transform;
			if (typeof options.flush === "function") this._flush = options.flush;
		}
		this.on("prefinish", prefinish);
	}
	function prefinish() {
		var _this = this;
		if (typeof this._flush === "function") this._flush(function(er, data) {
			done(_this, er, data);
		});
		else done(this, null, null);
	}
	Transform.prototype.push = function(chunk, encoding) {
		this._transformState.needTransform = false;
		return Duplex.prototype.push.call(this, chunk, encoding);
	};
	Transform.prototype._transform = function(chunk, encoding, cb) {
		throw new Error("_transform() is not implemented");
	};
	Transform.prototype._write = function(chunk, encoding, cb) {
		var ts = this._transformState;
		ts.writecb = cb;
		ts.writechunk = chunk;
		ts.writeencoding = encoding;
		if (!ts.transforming) {
			var rs = this._readableState;
			if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
		}
	};
	Transform.prototype._read = function(n) {
		var ts = this._transformState;
		if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
			ts.transforming = true;
			this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
		} else ts.needTransform = true;
	};
	Transform.prototype._destroy = function(err, cb) {
		var _this2 = this;
		Duplex.prototype._destroy.call(this, err, function(err2) {
			cb(err2);
			_this2.emit("close");
		});
	};
	function done(stream, er, data) {
		if (er) return stream.emit("error", er);
		if (data != null) stream.push(data);
		if (stream._writableState.length) throw new Error("Calling transform done when ws.length != 0");
		if (stream._transformState.transforming) throw new Error("Calling transform done when still transforming");
		return stream.push(null);
	}
}));
//#endregion
//#region node_modules/lazystream/node_modules/readable-stream/lib/_stream_passthrough.js
var require__stream_passthrough$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = PassThrough;
	var Transform = require__stream_transform$1();
	var util = Object.create(require_util$2());
	util.inherits = require_inherits();
	util.inherits(PassThrough, Transform);
	function PassThrough(options) {
		if (!(this instanceof PassThrough)) return new PassThrough(options);
		Transform.call(this, options);
	}
	PassThrough.prototype._transform = function(chunk, encoding, cb) {
		cb(null, chunk);
	};
}));
//#endregion
//#region node_modules/lazystream/node_modules/readable-stream/readable.js
var require_readable$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Stream$4 = __require("stream");
	if (process.env.READABLE_STREAM === "disable" && Stream$4) {
		module.exports = Stream$4;
		exports = module.exports = Stream$4.Readable;
		exports.Readable = Stream$4.Readable;
		exports.Writable = Stream$4.Writable;
		exports.Duplex = Stream$4.Duplex;
		exports.Transform = Stream$4.Transform;
		exports.PassThrough = Stream$4.PassThrough;
		exports.Stream = Stream$4;
	} else {
		exports = module.exports = require__stream_readable$1();
		exports.Stream = Stream$4 || exports;
		exports.Readable = exports;
		exports.Writable = require__stream_writable$1();
		exports.Duplex = require__stream_duplex$1();
		exports.Transform = require__stream_transform$1();
		exports.PassThrough = require__stream_passthrough$1();
	}
}));
//#endregion
//#region node_modules/lazystream/node_modules/readable-stream/passthrough.js
var require_passthrough = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_readable$1().PassThrough;
}));
//#endregion
//#region node_modules/lazystream/lib/lazystream.js
var require_lazystream = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var util$3 = __require("util");
	var PassThrough = require_passthrough();
	module.exports = {
		Readable,
		Writable
	};
	util$3.inherits(Readable, PassThrough);
	util$3.inherits(Writable, PassThrough);
	function beforeFirstCall(instance, method, callback) {
		instance[method] = function() {
			delete instance[method];
			callback.apply(this, arguments);
			return this[method].apply(this, arguments);
		};
	}
	function Readable(fn, options) {
		if (!(this instanceof Readable)) return new Readable(fn, options);
		PassThrough.call(this, options);
		beforeFirstCall(this, "_read", function() {
			var source = fn.call(this, options);
			var emit = this.emit.bind(this, "error");
			source.on("error", emit);
			source.pipe(this);
		});
		this.emit("readable");
	}
	function Writable(fn, options) {
		if (!(this instanceof Writable)) return new Writable(fn, options);
		PassThrough.call(this, options);
		beforeFirstCall(this, "_write", function() {
			var destination = fn.call(this, options);
			var emit = this.emit.bind(this, "error");
			destination.on("error", emit);
			this.pipe(destination);
		});
		this.emit("writable");
	}
}));
//#endregion
//#region node_modules/normalize-path/index.js
var require_normalize_path = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/*!
	* normalize-path <https://github.com/jonschlinkert/normalize-path>
	*
	* Copyright (c) 2014-2018, Jon Schlinkert.
	* Released under the MIT License.
	*/
	module.exports = function(path, stripTrailing) {
		if (typeof path !== "string") throw new TypeError("expected path to be a string");
		if (path === "\\" || path === "/") return "/";
		var len = path.length;
		if (len <= 1) return path;
		var prefix = "";
		if (len > 4 && path[3] === "\\") {
			var ch = path[2];
			if ((ch === "?" || ch === ".") && path.slice(0, 2) === "\\\\") {
				path = path.slice(2);
				prefix = "//";
			}
		}
		var segs = path.split(/[/\\]+/);
		if (stripTrailing !== false && segs[segs.length - 1] === "") segs.pop();
		return prefix + segs.join("/");
	};
}));
//#endregion
//#region node_modules/lodash.defaults/index.js
var require_lodash_defaults = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* lodash (Custom Build) <https://lodash.com/>
	* Build: `lodash modularize exports="npm" -o ./`
	* Copyright jQuery Foundation and other contributors <https://jquery.org/>
	* Released under MIT license <https://lodash.com/license>
	* Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	* Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	*/
	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;
	/** `Object#toString` result references. */
	var argsTag = "[object Arguments]";
	var funcTag = "[object Function]";
	var genTag = "[object GeneratorFunction]";
	/** Used to detect unsigned integer values. */
	var reIsUint = /^(?:0|[1-9]\d*)$/;
	/**
	* A faster alternative to `Function#apply`, this function invokes `func`
	* with the `this` binding of `thisArg` and the arguments of `args`.
	*
	* @private
	* @param {Function} func The function to invoke.
	* @param {*} thisArg The `this` binding of `func`.
	* @param {Array} args The arguments to invoke `func` with.
	* @returns {*} Returns the result of `func`.
	*/
	function apply(func, thisArg, args) {
		switch (args.length) {
			case 0: return func.call(thisArg);
			case 1: return func.call(thisArg, args[0]);
			case 2: return func.call(thisArg, args[0], args[1]);
			case 3: return func.call(thisArg, args[0], args[1], args[2]);
		}
		return func.apply(thisArg, args);
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
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	/**
	* Used to resolve the
	* [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	* of values.
	*/
	var objectToString = objectProto.toString;
	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;
	var nativeMax = Math.max;
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
	* Used by `_.defaults` to customize its `_.assignIn` use.
	*
	* @private
	* @param {*} objValue The destination value.
	* @param {*} srcValue The source value.
	* @param {string} key The key of the property to assign.
	* @param {Object} object The parent object of `objValue`.
	* @returns {*} Returns the value to assign.
	*/
	function assignInDefaults(objValue, srcValue, key, object) {
		if (objValue === void 0 || eq(objValue, objectProto[key]) && !hasOwnProperty.call(object, key)) return srcValue;
		return objValue;
	}
	/**
	* Assigns `value` to `key` of `object` if the existing value is not equivalent
	* using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	* for equality comparisons.
	*
	* @private
	* @param {Object} object The object to modify.
	* @param {string} key The key of the property to assign.
	* @param {*} value The value to assign.
	*/
	function assignValue(object, key, value) {
		var objValue = object[key];
		if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || value === void 0 && !(key in object)) object[key] = value;
	}
	/**
	* The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
	*
	* @private
	* @param {Object} object The object to query.
	* @returns {Array} Returns the array of property names.
	*/
	function baseKeysIn(object) {
		if (!isObject(object)) return nativeKeysIn(object);
		var isProto = isPrototype(object), result = [];
		for (var key in object) if (!(key == "constructor" && (isProto || !hasOwnProperty.call(object, key)))) result.push(key);
		return result;
	}
	/**
	* The base implementation of `_.rest` which doesn't validate or coerce arguments.
	*
	* @private
	* @param {Function} func The function to apply a rest parameter to.
	* @param {number} [start=func.length-1] The start position of the rest parameter.
	* @returns {Function} Returns the new function.
	*/
	function baseRest(func, start) {
		start = nativeMax(start === void 0 ? func.length - 1 : start, 0);
		return function() {
			var args = arguments, index = -1, length = nativeMax(args.length - start, 0), array = Array(length);
			while (++index < length) array[index] = args[start + index];
			index = -1;
			var otherArgs = Array(start + 1);
			while (++index < start) otherArgs[index] = args[index];
			otherArgs[start] = array;
			return apply(func, this, otherArgs);
		};
	}
	/**
	* Copies properties of `source` to `object`.
	*
	* @private
	* @param {Object} source The object to copy properties from.
	* @param {Array} props The property identifiers to copy.
	* @param {Object} [object={}] The object to copy properties to.
	* @param {Function} [customizer] The function to customize copied values.
	* @returns {Object} Returns `object`.
	*/
	function copyObject(source, props, object, customizer) {
		object || (object = {});
		var index = -1, length = props.length;
		while (++index < length) {
			var key = props[index];
			var newValue = customizer ? customizer(object[key], source[key], key, object, source) : void 0;
			assignValue(object, key, newValue === void 0 ? source[key] : newValue);
		}
		return object;
	}
	/**
	* Creates a function like `_.assign`.
	*
	* @private
	* @param {Function} assigner The function to assign values.
	* @returns {Function} Returns the new assigner function.
	*/
	function createAssigner(assigner) {
		return baseRest(function(object, sources) {
			var index = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : void 0, guard = length > 2 ? sources[2] : void 0;
			customizer = assigner.length > 3 && typeof customizer == "function" ? (length--, customizer) : void 0;
			if (guard && isIterateeCall(sources[0], sources[1], guard)) {
				customizer = length < 3 ? void 0 : customizer;
				length = 1;
			}
			object = Object(object);
			while (++index < length) {
				var source = sources[index];
				if (source) assigner(object, source, index, customizer);
			}
			return object;
		});
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
	* Checks if the given arguments are from an iteratee call.
	*
	* @private
	* @param {*} value The potential iteratee value argument.
	* @param {*} index The potential iteratee index or key argument.
	* @param {*} object The potential iteratee object argument.
	* @returns {boolean} Returns `true` if the arguments are from an iteratee call,
	*  else `false`.
	*/
	function isIterateeCall(value, index, object) {
		if (!isObject(object)) return false;
		var type = typeof index;
		if (type == "number" ? isArrayLike(object) && isIndex(index, object.length) : type == "string" && index in object) return eq(object[index], value);
		return false;
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
	* This function is like
	* [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	* except that it includes inherited enumerable properties.
	*
	* @private
	* @param {Object} object The object to query.
	* @returns {Array} Returns the array of property names.
	*/
	function nativeKeysIn(object) {
		var result = [];
		if (object != null) for (var key in Object(object)) result.push(key);
		return result;
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
	* This method is like `_.assignIn` except that it accepts `customizer`
	* which is invoked to produce the assigned values. If `customizer` returns
	* `undefined`, assignment is handled by the method instead. The `customizer`
	* is invoked with five arguments: (objValue, srcValue, key, object, source).
	*
	* **Note:** This method mutates `object`.
	*
	* @static
	* @memberOf _
	* @since 4.0.0
	* @alias extendWith
	* @category Object
	* @param {Object} object The destination object.
	* @param {...Object} sources The source objects.
	* @param {Function} [customizer] The function to customize assigned values.
	* @returns {Object} Returns `object`.
	* @see _.assignWith
	* @example
	*
	* function customizer(objValue, srcValue) {
	*   return _.isUndefined(objValue) ? srcValue : objValue;
	* }
	*
	* var defaults = _.partialRight(_.assignInWith, customizer);
	*
	* defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
	* // => { 'a': 1, 'b': 2 }
	*/
	var assignInWith = createAssigner(function(object, source, srcIndex, customizer) {
		copyObject(source, keysIn(source), object, customizer);
	});
	/**
	* Assigns own and inherited enumerable string keyed properties of source
	* objects to the destination object for all destination properties that
	* resolve to `undefined`. Source objects are applied from left to right.
	* Once a property is set, additional values of the same property are ignored.
	*
	* **Note:** This method mutates `object`.
	*
	* @static
	* @since 0.1.0
	* @memberOf _
	* @category Object
	* @param {Object} object The destination object.
	* @param {...Object} [sources] The source objects.
	* @returns {Object} Returns `object`.
	* @see _.defaultsDeep
	* @example
	*
	* _.defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
	* // => { 'a': 1, 'b': 2 }
	*/
	var defaults = baseRest(function(args) {
		args.push(void 0, assignInDefaults);
		return apply(assignInWith, void 0, args);
	});
	/**
	* Creates an array of the own and inherited enumerable property names of `object`.
	*
	* **Note:** Non-object values are coerced to objects.
	*
	* @static
	* @memberOf _
	* @since 3.0.0
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
	* _.keysIn(new Foo);
	* // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	*/
	function keysIn(object) {
		return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
	}
	module.exports = defaults;
}));
//#endregion
//#region node_modules/archiver-utils/node_modules/readable-stream/lib/internal/streams/stream.js
var require_stream = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = __require("stream");
}));
//#endregion
//#region node_modules/archiver-utils/node_modules/safe-buffer/index.js
var require_safe_buffer = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var buffer = __require("buffer");
	var Buffer = buffer.Buffer;
	function copyProps(src, dst) {
		for (var key in src) dst[key] = src[key];
	}
	if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) module.exports = buffer;
	else {
		copyProps(buffer, exports);
		exports.Buffer = SafeBuffer;
	}
	function SafeBuffer(arg, encodingOrOffset, length) {
		return Buffer(arg, encodingOrOffset, length);
	}
	copyProps(Buffer, SafeBuffer);
	SafeBuffer.from = function(arg, encodingOrOffset, length) {
		if (typeof arg === "number") throw new TypeError("Argument must not be a number");
		return Buffer(arg, encodingOrOffset, length);
	};
	SafeBuffer.alloc = function(size, fill, encoding) {
		if (typeof size !== "number") throw new TypeError("Argument must be a number");
		var buf = Buffer(size);
		if (fill !== void 0) {
			if (typeof encoding === "string") buf.fill(fill, encoding);
			else buf.fill(fill);
		} else buf.fill(0);
		return buf;
	};
	SafeBuffer.allocUnsafe = function(size) {
		if (typeof size !== "number") throw new TypeError("Argument must be a number");
		return Buffer(size);
	};
	SafeBuffer.allocUnsafeSlow = function(size) {
		if (typeof size !== "number") throw new TypeError("Argument must be a number");
		return buffer.SlowBuffer(size);
	};
}));
//#endregion
//#region node_modules/archiver-utils/node_modules/readable-stream/lib/internal/streams/BufferList.js
var require_BufferList$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
	}
	var Buffer = require_safe_buffer().Buffer;
	var util$2 = __require("util");
	function copyBuffer(src, target, offset) {
		src.copy(target, offset);
	}
	module.exports = function() {
		function BufferList() {
			_classCallCheck(this, BufferList);
			this.head = null;
			this.tail = null;
			this.length = 0;
		}
		BufferList.prototype.push = function push(v) {
			var entry = {
				data: v,
				next: null
			};
			if (this.length > 0) this.tail.next = entry;
			else this.head = entry;
			this.tail = entry;
			++this.length;
		};
		BufferList.prototype.unshift = function unshift(v) {
			var entry = {
				data: v,
				next: this.head
			};
			if (this.length === 0) this.tail = entry;
			this.head = entry;
			++this.length;
		};
		BufferList.prototype.shift = function shift() {
			if (this.length === 0) return;
			var ret = this.head.data;
			if (this.length === 1) this.head = this.tail = null;
			else this.head = this.head.next;
			--this.length;
			return ret;
		};
		BufferList.prototype.clear = function clear() {
			this.head = this.tail = null;
			this.length = 0;
		};
		BufferList.prototype.join = function join(s) {
			if (this.length === 0) return "";
			var p = this.head;
			var ret = "" + p.data;
			while (p = p.next) ret += s + p.data;
			return ret;
		};
		BufferList.prototype.concat = function concat(n) {
			if (this.length === 0) return Buffer.alloc(0);
			var ret = Buffer.allocUnsafe(n >>> 0);
			var p = this.head;
			var i = 0;
			while (p) {
				copyBuffer(p.data, ret, i);
				i += p.data.length;
				p = p.next;
			}
			return ret;
		};
		return BufferList;
	}();
	if (util$2 && util$2.inspect && util$2.inspect.custom) module.exports.prototype[util$2.inspect.custom] = function() {
		var obj = util$2.inspect({ length: this.length });
		return this.constructor.name + " " + obj;
	};
}));
//#endregion
//#region node_modules/archiver-utils/node_modules/readable-stream/lib/internal/streams/destroy.js
var require_destroy = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var pna = require_process_nextick_args();
	function destroy(err, cb) {
		var _this = this;
		var readableDestroyed = this._readableState && this._readableState.destroyed;
		var writableDestroyed = this._writableState && this._writableState.destroyed;
		if (readableDestroyed || writableDestroyed) {
			if (cb) cb(err);
			else if (err) {
				if (!this._writableState) pna.nextTick(emitErrorNT, this, err);
				else if (!this._writableState.errorEmitted) {
					this._writableState.errorEmitted = true;
					pna.nextTick(emitErrorNT, this, err);
				}
			}
			return this;
		}
		if (this._readableState) this._readableState.destroyed = true;
		if (this._writableState) this._writableState.destroyed = true;
		this._destroy(err || null, function(err) {
			if (!cb && err) {
				if (!_this._writableState) pna.nextTick(emitErrorNT, _this, err);
				else if (!_this._writableState.errorEmitted) {
					_this._writableState.errorEmitted = true;
					pna.nextTick(emitErrorNT, _this, err);
				}
			} else if (cb) cb(err);
		});
		return this;
	}
	function undestroy() {
		if (this._readableState) {
			this._readableState.destroyed = false;
			this._readableState.reading = false;
			this._readableState.ended = false;
			this._readableState.endEmitted = false;
		}
		if (this._writableState) {
			this._writableState.destroyed = false;
			this._writableState.ended = false;
			this._writableState.ending = false;
			this._writableState.finalCalled = false;
			this._writableState.prefinished = false;
			this._writableState.finished = false;
			this._writableState.errorEmitted = false;
		}
	}
	function emitErrorNT(self, err) {
		self.emit("error", err);
	}
	module.exports = {
		destroy,
		undestroy
	};
}));
//#endregion
//#region node_modules/archiver-utils/node_modules/readable-stream/lib/_stream_writable.js
var require__stream_writable = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var pna = require_process_nextick_args();
	module.exports = Writable;
	function CorkedRequest(state) {
		var _this = this;
		this.next = null;
		this.entry = null;
		this.finish = function() {
			onCorkedFinish(_this, state);
		};
	}
	var asyncWrite = !process.browser && ["v0.10", "v0.9."].indexOf(process.version.slice(0, 5)) > -1 ? setImmediate : pna.nextTick;
	var Duplex;
	Writable.WritableState = WritableState;
	var util = Object.create(require_util$2());
	util.inherits = require_inherits();
	var internalUtil = { deprecate: require_node() };
	var Stream = require_stream();
	var Buffer = require_safe_buffer().Buffer;
	var OurUint8Array = (typeof global !== "undefined" ? global : typeof window !== "undefined" ? window : typeof self !== "undefined" ? self : {}).Uint8Array || function() {};
	function _uint8ArrayToBuffer(chunk) {
		return Buffer.from(chunk);
	}
	function _isUint8Array(obj) {
		return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
	}
	var destroyImpl = require_destroy();
	util.inherits(Writable, Stream);
	function nop() {}
	function WritableState(options, stream) {
		Duplex = Duplex || require__stream_duplex();
		options = options || {};
		var isDuplex = stream instanceof Duplex;
		this.objectMode = !!options.objectMode;
		if (isDuplex) this.objectMode = this.objectMode || !!options.writableObjectMode;
		var hwm = options.highWaterMark;
		var writableHwm = options.writableHighWaterMark;
		var defaultHwm = this.objectMode ? 16 : 16384;
		if (hwm || hwm === 0) this.highWaterMark = hwm;
		else if (isDuplex && (writableHwm || writableHwm === 0)) this.highWaterMark = writableHwm;
		else this.highWaterMark = defaultHwm;
		this.highWaterMark = Math.floor(this.highWaterMark);
		this.finalCalled = false;
		this.needDrain = false;
		this.ending = false;
		this.ended = false;
		this.finished = false;
		this.destroyed = false;
		var noDecode = options.decodeStrings === false;
		this.decodeStrings = !noDecode;
		this.defaultEncoding = options.defaultEncoding || "utf8";
		this.length = 0;
		this.writing = false;
		this.corked = 0;
		this.sync = true;
		this.bufferProcessing = false;
		this.onwrite = function(er) {
			onwrite(stream, er);
		};
		this.writecb = null;
		this.writelen = 0;
		this.bufferedRequest = null;
		this.lastBufferedRequest = null;
		this.pendingcb = 0;
		this.prefinished = false;
		this.errorEmitted = false;
		this.bufferedRequestCount = 0;
		this.corkedRequestsFree = new CorkedRequest(this);
	}
	WritableState.prototype.getBuffer = function getBuffer() {
		var current = this.bufferedRequest;
		var out = [];
		while (current) {
			out.push(current);
			current = current.next;
		}
		return out;
	};
	(function() {
		try {
			Object.defineProperty(WritableState.prototype, "buffer", { get: internalUtil.deprecate(function() {
				return this.getBuffer();
			}, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003") });
		} catch (_) {}
	})();
	var realHasInstance;
	if (typeof Symbol === "function" && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === "function") {
		realHasInstance = Function.prototype[Symbol.hasInstance];
		Object.defineProperty(Writable, Symbol.hasInstance, { value: function(object) {
			if (realHasInstance.call(this, object)) return true;
			if (this !== Writable) return false;
			return object && object._writableState instanceof WritableState;
		} });
	} else realHasInstance = function(object) {
		return object instanceof this;
	};
	function Writable(options) {
		Duplex = Duplex || require__stream_duplex();
		if (!realHasInstance.call(Writable, this) && !(this instanceof Duplex)) return new Writable(options);
		this._writableState = new WritableState(options, this);
		this.writable = true;
		if (options) {
			if (typeof options.write === "function") this._write = options.write;
			if (typeof options.writev === "function") this._writev = options.writev;
			if (typeof options.destroy === "function") this._destroy = options.destroy;
			if (typeof options.final === "function") this._final = options.final;
		}
		Stream.call(this);
	}
	Writable.prototype.pipe = function() {
		this.emit("error", /* @__PURE__ */ new Error("Cannot pipe, not readable"));
	};
	function writeAfterEnd(stream, cb) {
		var er = /* @__PURE__ */ new Error("write after end");
		stream.emit("error", er);
		pna.nextTick(cb, er);
	}
	function validChunk(stream, state, chunk, cb) {
		var valid = true;
		var er = false;
		if (chunk === null) er = /* @__PURE__ */ new TypeError("May not write null values to stream");
		else if (typeof chunk !== "string" && chunk !== void 0 && !state.objectMode) er = /* @__PURE__ */ new TypeError("Invalid non-string/buffer chunk");
		if (er) {
			stream.emit("error", er);
			pna.nextTick(cb, er);
			valid = false;
		}
		return valid;
	}
	Writable.prototype.write = function(chunk, encoding, cb) {
		var state = this._writableState;
		var ret = false;
		var isBuf = !state.objectMode && _isUint8Array(chunk);
		if (isBuf && !Buffer.isBuffer(chunk)) chunk = _uint8ArrayToBuffer(chunk);
		if (typeof encoding === "function") {
			cb = encoding;
			encoding = null;
		}
		if (isBuf) encoding = "buffer";
		else if (!encoding) encoding = state.defaultEncoding;
		if (typeof cb !== "function") cb = nop;
		if (state.ended) writeAfterEnd(this, cb);
		else if (isBuf || validChunk(this, state, chunk, cb)) {
			state.pendingcb++;
			ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
		}
		return ret;
	};
	Writable.prototype.cork = function() {
		var state = this._writableState;
		state.corked++;
	};
	Writable.prototype.uncork = function() {
		var state = this._writableState;
		if (state.corked) {
			state.corked--;
			if (!state.writing && !state.corked && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
		}
	};
	Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
		if (typeof encoding === "string") encoding = encoding.toLowerCase();
		if (!([
			"hex",
			"utf8",
			"utf-8",
			"ascii",
			"binary",
			"base64",
			"ucs2",
			"ucs-2",
			"utf16le",
			"utf-16le",
			"raw"
		].indexOf((encoding + "").toLowerCase()) > -1)) throw new TypeError("Unknown encoding: " + encoding);
		this._writableState.defaultEncoding = encoding;
		return this;
	};
	function decodeChunk(state, chunk, encoding) {
		if (!state.objectMode && state.decodeStrings !== false && typeof chunk === "string") chunk = Buffer.from(chunk, encoding);
		return chunk;
	}
	Object.defineProperty(Writable.prototype, "writableHighWaterMark", {
		enumerable: false,
		get: function() {
			return this._writableState.highWaterMark;
		}
	});
	function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
		if (!isBuf) {
			var newChunk = decodeChunk(state, chunk, encoding);
			if (chunk !== newChunk) {
				isBuf = true;
				encoding = "buffer";
				chunk = newChunk;
			}
		}
		var len = state.objectMode ? 1 : chunk.length;
		state.length += len;
		var ret = state.length < state.highWaterMark;
		if (!ret) state.needDrain = true;
		if (state.writing || state.corked) {
			var last = state.lastBufferedRequest;
			state.lastBufferedRequest = {
				chunk,
				encoding,
				isBuf,
				callback: cb,
				next: null
			};
			if (last) last.next = state.lastBufferedRequest;
			else state.bufferedRequest = state.lastBufferedRequest;
			state.bufferedRequestCount += 1;
		} else doWrite(stream, state, false, len, chunk, encoding, cb);
		return ret;
	}
	function doWrite(stream, state, writev, len, chunk, encoding, cb) {
		state.writelen = len;
		state.writecb = cb;
		state.writing = true;
		state.sync = true;
		if (writev) stream._writev(chunk, state.onwrite);
		else stream._write(chunk, encoding, state.onwrite);
		state.sync = false;
	}
	function onwriteError(stream, state, sync, er, cb) {
		--state.pendingcb;
		if (sync) {
			pna.nextTick(cb, er);
			pna.nextTick(finishMaybe, stream, state);
			stream._writableState.errorEmitted = true;
			stream.emit("error", er);
		} else {
			cb(er);
			stream._writableState.errorEmitted = true;
			stream.emit("error", er);
			finishMaybe(stream, state);
		}
	}
	function onwriteStateUpdate(state) {
		state.writing = false;
		state.writecb = null;
		state.length -= state.writelen;
		state.writelen = 0;
	}
	function onwrite(stream, er) {
		var state = stream._writableState;
		var sync = state.sync;
		var cb = state.writecb;
		onwriteStateUpdate(state);
		if (er) onwriteError(stream, state, sync, er, cb);
		else {
			var finished = needFinish(state);
			if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) clearBuffer(stream, state);
			if (sync) asyncWrite(afterWrite, stream, state, finished, cb);
			else afterWrite(stream, state, finished, cb);
		}
	}
	function afterWrite(stream, state, finished, cb) {
		if (!finished) onwriteDrain(stream, state);
		state.pendingcb--;
		cb();
		finishMaybe(stream, state);
	}
	function onwriteDrain(stream, state) {
		if (state.length === 0 && state.needDrain) {
			state.needDrain = false;
			stream.emit("drain");
		}
	}
	function clearBuffer(stream, state) {
		state.bufferProcessing = true;
		var entry = state.bufferedRequest;
		if (stream._writev && entry && entry.next) {
			var l = state.bufferedRequestCount;
			var buffer = new Array(l);
			var holder = state.corkedRequestsFree;
			holder.entry = entry;
			var count = 0;
			var allBuffers = true;
			while (entry) {
				buffer[count] = entry;
				if (!entry.isBuf) allBuffers = false;
				entry = entry.next;
				count += 1;
			}
			buffer.allBuffers = allBuffers;
			doWrite(stream, state, true, state.length, buffer, "", holder.finish);
			state.pendingcb++;
			state.lastBufferedRequest = null;
			if (holder.next) {
				state.corkedRequestsFree = holder.next;
				holder.next = null;
			} else state.corkedRequestsFree = new CorkedRequest(state);
			state.bufferedRequestCount = 0;
		} else {
			while (entry) {
				var chunk = entry.chunk;
				var encoding = entry.encoding;
				var cb = entry.callback;
				doWrite(stream, state, false, state.objectMode ? 1 : chunk.length, chunk, encoding, cb);
				entry = entry.next;
				state.bufferedRequestCount--;
				if (state.writing) break;
			}
			if (entry === null) state.lastBufferedRequest = null;
		}
		state.bufferedRequest = entry;
		state.bufferProcessing = false;
	}
	Writable.prototype._write = function(chunk, encoding, cb) {
		cb(/* @__PURE__ */ new Error("_write() is not implemented"));
	};
	Writable.prototype._writev = null;
	Writable.prototype.end = function(chunk, encoding, cb) {
		var state = this._writableState;
		if (typeof chunk === "function") {
			cb = chunk;
			chunk = null;
			encoding = null;
		} else if (typeof encoding === "function") {
			cb = encoding;
			encoding = null;
		}
		if (chunk !== null && chunk !== void 0) this.write(chunk, encoding);
		if (state.corked) {
			state.corked = 1;
			this.uncork();
		}
		if (!state.ending) endWritable(this, state, cb);
	};
	function needFinish(state) {
		return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
	}
	function callFinal(stream, state) {
		stream._final(function(err) {
			state.pendingcb--;
			if (err) stream.emit("error", err);
			state.prefinished = true;
			stream.emit("prefinish");
			finishMaybe(stream, state);
		});
	}
	function prefinish(stream, state) {
		if (!state.prefinished && !state.finalCalled) {
			if (typeof stream._final === "function") {
				state.pendingcb++;
				state.finalCalled = true;
				pna.nextTick(callFinal, stream, state);
			} else {
				state.prefinished = true;
				stream.emit("prefinish");
			}
		}
	}
	function finishMaybe(stream, state) {
		var need = needFinish(state);
		if (need) {
			prefinish(stream, state);
			if (state.pendingcb === 0) {
				state.finished = true;
				stream.emit("finish");
			}
		}
		return need;
	}
	function endWritable(stream, state, cb) {
		state.ending = true;
		finishMaybe(stream, state);
		if (cb) {
			if (state.finished) pna.nextTick(cb);
			else stream.once("finish", cb);
		}
		state.ended = true;
		stream.writable = false;
	}
	function onCorkedFinish(corkReq, state, err) {
		var entry = corkReq.entry;
		corkReq.entry = null;
		while (entry) {
			var cb = entry.callback;
			state.pendingcb--;
			cb(err);
			entry = entry.next;
		}
		state.corkedRequestsFree.next = corkReq;
	}
	Object.defineProperty(Writable.prototype, "destroyed", {
		get: function() {
			if (this._writableState === void 0) return false;
			return this._writableState.destroyed;
		},
		set: function(value) {
			if (!this._writableState) return;
			this._writableState.destroyed = value;
		}
	});
	Writable.prototype.destroy = destroyImpl.destroy;
	Writable.prototype._undestroy = destroyImpl.undestroy;
	Writable.prototype._destroy = function(err, cb) {
		this.end();
		cb(err);
	};
}));
//#endregion
//#region node_modules/archiver-utils/node_modules/readable-stream/lib/_stream_duplex.js
var require__stream_duplex = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var pna = require_process_nextick_args();
	var objectKeys = Object.keys || function(obj) {
		var keys = [];
		for (var key in obj) keys.push(key);
		return keys;
	};
	module.exports = Duplex;
	var util = Object.create(require_util$2());
	util.inherits = require_inherits();
	var Readable = require__stream_readable();
	var Writable = require__stream_writable();
	util.inherits(Duplex, Readable);
	var keys = objectKeys(Writable.prototype);
	for (var v = 0; v < keys.length; v++) {
		var method = keys[v];
		if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
	}
	function Duplex(options) {
		if (!(this instanceof Duplex)) return new Duplex(options);
		Readable.call(this, options);
		Writable.call(this, options);
		if (options && options.readable === false) this.readable = false;
		if (options && options.writable === false) this.writable = false;
		this.allowHalfOpen = true;
		if (options && options.allowHalfOpen === false) this.allowHalfOpen = false;
		this.once("end", onend);
	}
	Object.defineProperty(Duplex.prototype, "writableHighWaterMark", {
		enumerable: false,
		get: function() {
			return this._writableState.highWaterMark;
		}
	});
	function onend() {
		if (this.allowHalfOpen || this._writableState.ended) return;
		pna.nextTick(onEndNT, this);
	}
	function onEndNT(self) {
		self.end();
	}
	Object.defineProperty(Duplex.prototype, "destroyed", {
		get: function() {
			if (this._readableState === void 0 || this._writableState === void 0) return false;
			return this._readableState.destroyed && this._writableState.destroyed;
		},
		set: function(value) {
			if (this._readableState === void 0 || this._writableState === void 0) return;
			this._readableState.destroyed = value;
			this._writableState.destroyed = value;
		}
	});
	Duplex.prototype._destroy = function(err, cb) {
		this.push(null);
		this.end();
		pna.nextTick(cb, err);
	};
}));
//#endregion
//#region node_modules/archiver-utils/node_modules/readable-stream/lib/_stream_readable.js
var require__stream_readable = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var pna = require_process_nextick_args();
	module.exports = Readable;
	var isArray = require_isarray();
	var Duplex;
	Readable.ReadableState = ReadableState;
	__require("events").EventEmitter;
	var EElistenerCount = function(emitter, type) {
		return emitter.listeners(type).length;
	};
	var Stream = require_stream();
	var Buffer = require_safe_buffer().Buffer;
	var OurUint8Array = (typeof global !== "undefined" ? global : typeof window !== "undefined" ? window : typeof self !== "undefined" ? self : {}).Uint8Array || function() {};
	function _uint8ArrayToBuffer(chunk) {
		return Buffer.from(chunk);
	}
	function _isUint8Array(obj) {
		return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
	}
	var util = Object.create(require_util$2());
	util.inherits = require_inherits();
	var debugUtil = __require("util");
	var debug = void 0;
	if (debugUtil && debugUtil.debuglog) debug = debugUtil.debuglog("stream");
	else debug = function() {};
	var BufferList = require_BufferList$1();
	var destroyImpl = require_destroy();
	var StringDecoder;
	util.inherits(Readable, Stream);
	var kProxyEvents = [
		"error",
		"close",
		"destroy",
		"pause",
		"resume"
	];
	function prependListener(emitter, event, fn) {
		if (typeof emitter.prependListener === "function") return emitter.prependListener(event, fn);
		if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);
		else if (isArray(emitter._events[event])) emitter._events[event].unshift(fn);
		else emitter._events[event] = [fn, emitter._events[event]];
	}
	function ReadableState(options, stream) {
		Duplex = Duplex || require__stream_duplex();
		options = options || {};
		var isDuplex = stream instanceof Duplex;
		this.objectMode = !!options.objectMode;
		if (isDuplex) this.objectMode = this.objectMode || !!options.readableObjectMode;
		var hwm = options.highWaterMark;
		var readableHwm = options.readableHighWaterMark;
		var defaultHwm = this.objectMode ? 16 : 16384;
		if (hwm || hwm === 0) this.highWaterMark = hwm;
		else if (isDuplex && (readableHwm || readableHwm === 0)) this.highWaterMark = readableHwm;
		else this.highWaterMark = defaultHwm;
		this.highWaterMark = Math.floor(this.highWaterMark);
		this.buffer = new BufferList();
		this.length = 0;
		this.pipes = null;
		this.pipesCount = 0;
		this.flowing = null;
		this.ended = false;
		this.endEmitted = false;
		this.reading = false;
		this.sync = true;
		this.needReadable = false;
		this.emittedReadable = false;
		this.readableListening = false;
		this.resumeScheduled = false;
		this.destroyed = false;
		this.defaultEncoding = options.defaultEncoding || "utf8";
		this.awaitDrain = 0;
		this.readingMore = false;
		this.decoder = null;
		this.encoding = null;
		if (options.encoding) {
			if (!StringDecoder) StringDecoder = __require("node:string_decoder").StringDecoder;
			this.decoder = new StringDecoder(options.encoding);
			this.encoding = options.encoding;
		}
	}
	function Readable(options) {
		Duplex = Duplex || require__stream_duplex();
		if (!(this instanceof Readable)) return new Readable(options);
		this._readableState = new ReadableState(options, this);
		this.readable = true;
		if (options) {
			if (typeof options.read === "function") this._read = options.read;
			if (typeof options.destroy === "function") this._destroy = options.destroy;
		}
		Stream.call(this);
	}
	Object.defineProperty(Readable.prototype, "destroyed", {
		get: function() {
			if (this._readableState === void 0) return false;
			return this._readableState.destroyed;
		},
		set: function(value) {
			if (!this._readableState) return;
			this._readableState.destroyed = value;
		}
	});
	Readable.prototype.destroy = destroyImpl.destroy;
	Readable.prototype._undestroy = destroyImpl.undestroy;
	Readable.prototype._destroy = function(err, cb) {
		this.push(null);
		cb(err);
	};
	Readable.prototype.push = function(chunk, encoding) {
		var state = this._readableState;
		var skipChunkCheck;
		if (!state.objectMode) {
			if (typeof chunk === "string") {
				encoding = encoding || state.defaultEncoding;
				if (encoding !== state.encoding) {
					chunk = Buffer.from(chunk, encoding);
					encoding = "";
				}
				skipChunkCheck = true;
			}
		} else skipChunkCheck = true;
		return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
	};
	Readable.prototype.unshift = function(chunk) {
		return readableAddChunk(this, chunk, null, true, false);
	};
	function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
		var state = stream._readableState;
		if (chunk === null) {
			state.reading = false;
			onEofChunk(stream, state);
		} else {
			var er;
			if (!skipChunkCheck) er = chunkInvalid(state, chunk);
			if (er) stream.emit("error", er);
			else if (state.objectMode || chunk && chunk.length > 0) {
				if (typeof chunk !== "string" && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer.prototype) chunk = _uint8ArrayToBuffer(chunk);
				if (addToFront) {
					if (state.endEmitted) stream.emit("error", /* @__PURE__ */ new Error("stream.unshift() after end event"));
					else addChunk(stream, state, chunk, true);
				} else if (state.ended) stream.emit("error", /* @__PURE__ */ new Error("stream.push() after EOF"));
				else {
					state.reading = false;
					if (state.decoder && !encoding) {
						chunk = state.decoder.write(chunk);
						if (state.objectMode || chunk.length !== 0) addChunk(stream, state, chunk, false);
						else maybeReadMore(stream, state);
					} else addChunk(stream, state, chunk, false);
				}
			} else if (!addToFront) state.reading = false;
		}
		return needMoreData(state);
	}
	function addChunk(stream, state, chunk, addToFront) {
		if (state.flowing && state.length === 0 && !state.sync) {
			stream.emit("data", chunk);
			stream.read(0);
		} else {
			state.length += state.objectMode ? 1 : chunk.length;
			if (addToFront) state.buffer.unshift(chunk);
			else state.buffer.push(chunk);
			if (state.needReadable) emitReadable(stream);
		}
		maybeReadMore(stream, state);
	}
	function chunkInvalid(state, chunk) {
		var er;
		if (!_isUint8Array(chunk) && typeof chunk !== "string" && chunk !== void 0 && !state.objectMode) er = /* @__PURE__ */ new TypeError("Invalid non-string/buffer chunk");
		return er;
	}
	function needMoreData(state) {
		return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);
	}
	Readable.prototype.isPaused = function() {
		return this._readableState.flowing === false;
	};
	Readable.prototype.setEncoding = function(enc) {
		if (!StringDecoder) StringDecoder = __require("node:string_decoder").StringDecoder;
		this._readableState.decoder = new StringDecoder(enc);
		this._readableState.encoding = enc;
		return this;
	};
	var MAX_HWM = 8388608;
	function computeNewHighWaterMark(n) {
		if (n >= MAX_HWM) n = MAX_HWM;
		else {
			n--;
			n |= n >>> 1;
			n |= n >>> 2;
			n |= n >>> 4;
			n |= n >>> 8;
			n |= n >>> 16;
			n++;
		}
		return n;
	}
	function howMuchToRead(n, state) {
		if (n <= 0 || state.length === 0 && state.ended) return 0;
		if (state.objectMode) return 1;
		if (n !== n) {
			if (state.flowing && state.length) return state.buffer.head.data.length;
			else return state.length;
		}
		if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
		if (n <= state.length) return n;
		if (!state.ended) {
			state.needReadable = true;
			return 0;
		}
		return state.length;
	}
	Readable.prototype.read = function(n) {
		debug("read", n);
		n = parseInt(n, 10);
		var state = this._readableState;
		var nOrig = n;
		if (n !== 0) state.emittedReadable = false;
		if (n === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended)) {
			debug("read: emitReadable", state.length, state.ended);
			if (state.length === 0 && state.ended) endReadable(this);
			else emitReadable(this);
			return null;
		}
		n = howMuchToRead(n, state);
		if (n === 0 && state.ended) {
			if (state.length === 0) endReadable(this);
			return null;
		}
		var doRead = state.needReadable;
		debug("need readable", doRead);
		if (state.length === 0 || state.length - n < state.highWaterMark) {
			doRead = true;
			debug("length less than watermark", doRead);
		}
		if (state.ended || state.reading) {
			doRead = false;
			debug("reading or ended", doRead);
		} else if (doRead) {
			debug("do read");
			state.reading = true;
			state.sync = true;
			if (state.length === 0) state.needReadable = true;
			this._read(state.highWaterMark);
			state.sync = false;
			if (!state.reading) n = howMuchToRead(nOrig, state);
		}
		var ret;
		if (n > 0) ret = fromList(n, state);
		else ret = null;
		if (ret === null) {
			state.needReadable = true;
			n = 0;
		} else state.length -= n;
		if (state.length === 0) {
			if (!state.ended) state.needReadable = true;
			if (nOrig !== n && state.ended) endReadable(this);
		}
		if (ret !== null) this.emit("data", ret);
		return ret;
	};
	function onEofChunk(stream, state) {
		if (state.ended) return;
		if (state.decoder) {
			var chunk = state.decoder.end();
			if (chunk && chunk.length) {
				state.buffer.push(chunk);
				state.length += state.objectMode ? 1 : chunk.length;
			}
		}
		state.ended = true;
		emitReadable(stream);
	}
	function emitReadable(stream) {
		var state = stream._readableState;
		state.needReadable = false;
		if (!state.emittedReadable) {
			debug("emitReadable", state.flowing);
			state.emittedReadable = true;
			if (state.sync) pna.nextTick(emitReadable_, stream);
			else emitReadable_(stream);
		}
	}
	function emitReadable_(stream) {
		debug("emit readable");
		stream.emit("readable");
		flow(stream);
	}
	function maybeReadMore(stream, state) {
		if (!state.readingMore) {
			state.readingMore = true;
			pna.nextTick(maybeReadMore_, stream, state);
		}
	}
	function maybeReadMore_(stream, state) {
		var len = state.length;
		while (!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark) {
			debug("maybeReadMore read 0");
			stream.read(0);
			if (len === state.length) break;
			else len = state.length;
		}
		state.readingMore = false;
	}
	Readable.prototype._read = function(n) {
		this.emit("error", /* @__PURE__ */ new Error("_read() is not implemented"));
	};
	Readable.prototype.pipe = function(dest, pipeOpts) {
		var src = this;
		var state = this._readableState;
		switch (state.pipesCount) {
			case 0:
				state.pipes = dest;
				break;
			case 1:
				state.pipes = [state.pipes, dest];
				break;
			default: state.pipes.push(dest);
		}
		state.pipesCount += 1;
		debug("pipe count=%d opts=%j", state.pipesCount, pipeOpts);
		var endFn = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr ? onend : unpipe;
		if (state.endEmitted) pna.nextTick(endFn);
		else src.once("end", endFn);
		dest.on("unpipe", onunpipe);
		function onunpipe(readable, unpipeInfo) {
			debug("onunpipe");
			if (readable === src) {
				if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
					unpipeInfo.hasUnpiped = true;
					cleanup();
				}
			}
		}
		function onend() {
			debug("onend");
			dest.end();
		}
		var ondrain = pipeOnDrain(src);
		dest.on("drain", ondrain);
		var cleanedUp = false;
		function cleanup() {
			debug("cleanup");
			dest.removeListener("close", onclose);
			dest.removeListener("finish", onfinish);
			dest.removeListener("drain", ondrain);
			dest.removeListener("error", onerror);
			dest.removeListener("unpipe", onunpipe);
			src.removeListener("end", onend);
			src.removeListener("end", unpipe);
			src.removeListener("data", ondata);
			cleanedUp = true;
			if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
		}
		var increasedAwaitDrain = false;
		src.on("data", ondata);
		function ondata(chunk) {
			debug("ondata");
			increasedAwaitDrain = false;
			if (false === dest.write(chunk) && !increasedAwaitDrain) {
				if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
					debug("false write response, pause", state.awaitDrain);
					state.awaitDrain++;
					increasedAwaitDrain = true;
				}
				src.pause();
			}
		}
		function onerror(er) {
			debug("onerror", er);
			unpipe();
			dest.removeListener("error", onerror);
			if (EElistenerCount(dest, "error") === 0) dest.emit("error", er);
		}
		prependListener(dest, "error", onerror);
		function onclose() {
			dest.removeListener("finish", onfinish);
			unpipe();
		}
		dest.once("close", onclose);
		function onfinish() {
			debug("onfinish");
			dest.removeListener("close", onclose);
			unpipe();
		}
		dest.once("finish", onfinish);
		function unpipe() {
			debug("unpipe");
			src.unpipe(dest);
		}
		dest.emit("pipe", src);
		if (!state.flowing) {
			debug("pipe resume");
			src.resume();
		}
		return dest;
	};
	function pipeOnDrain(src) {
		return function() {
			var state = src._readableState;
			debug("pipeOnDrain", state.awaitDrain);
			if (state.awaitDrain) state.awaitDrain--;
			if (state.awaitDrain === 0 && EElistenerCount(src, "data")) {
				state.flowing = true;
				flow(src);
			}
		};
	}
	Readable.prototype.unpipe = function(dest) {
		var state = this._readableState;
		var unpipeInfo = { hasUnpiped: false };
		if (state.pipesCount === 0) return this;
		if (state.pipesCount === 1) {
			if (dest && dest !== state.pipes) return this;
			if (!dest) dest = state.pipes;
			state.pipes = null;
			state.pipesCount = 0;
			state.flowing = false;
			if (dest) dest.emit("unpipe", this, unpipeInfo);
			return this;
		}
		if (!dest) {
			var dests = state.pipes;
			var len = state.pipesCount;
			state.pipes = null;
			state.pipesCount = 0;
			state.flowing = false;
			for (var i = 0; i < len; i++) dests[i].emit("unpipe", this, { hasUnpiped: false });
			return this;
		}
		var index = indexOf(state.pipes, dest);
		if (index === -1) return this;
		state.pipes.splice(index, 1);
		state.pipesCount -= 1;
		if (state.pipesCount === 1) state.pipes = state.pipes[0];
		dest.emit("unpipe", this, unpipeInfo);
		return this;
	};
	Readable.prototype.on = function(ev, fn) {
		var res = Stream.prototype.on.call(this, ev, fn);
		if (ev === "data") {
			if (this._readableState.flowing !== false) this.resume();
		} else if (ev === "readable") {
			var state = this._readableState;
			if (!state.endEmitted && !state.readableListening) {
				state.readableListening = state.needReadable = true;
				state.emittedReadable = false;
				if (!state.reading) pna.nextTick(nReadingNextTick, this);
				else if (state.length) emitReadable(this);
			}
		}
		return res;
	};
	Readable.prototype.addListener = Readable.prototype.on;
	function nReadingNextTick(self) {
		debug("readable nexttick read 0");
		self.read(0);
	}
	Readable.prototype.resume = function() {
		var state = this._readableState;
		if (!state.flowing) {
			debug("resume");
			state.flowing = true;
			resume(this, state);
		}
		return this;
	};
	function resume(stream, state) {
		if (!state.resumeScheduled) {
			state.resumeScheduled = true;
			pna.nextTick(resume_, stream, state);
		}
	}
	function resume_(stream, state) {
		if (!state.reading) {
			debug("resume read 0");
			stream.read(0);
		}
		state.resumeScheduled = false;
		state.awaitDrain = 0;
		stream.emit("resume");
		flow(stream);
		if (state.flowing && !state.reading) stream.read(0);
	}
	Readable.prototype.pause = function() {
		debug("call pause flowing=%j", this._readableState.flowing);
		if (false !== this._readableState.flowing) {
			debug("pause");
			this._readableState.flowing = false;
			this.emit("pause");
		}
		return this;
	};
	function flow(stream) {
		var state = stream._readableState;
		debug("flow", state.flowing);
		while (state.flowing && stream.read() !== null);
	}
	Readable.prototype.wrap = function(stream) {
		var _this = this;
		var state = this._readableState;
		var paused = false;
		stream.on("end", function() {
			debug("wrapped end");
			if (state.decoder && !state.ended) {
				var chunk = state.decoder.end();
				if (chunk && chunk.length) _this.push(chunk);
			}
			_this.push(null);
		});
		stream.on("data", function(chunk) {
			debug("wrapped data");
			if (state.decoder) chunk = state.decoder.write(chunk);
			if (state.objectMode && (chunk === null || chunk === void 0)) return;
			else if (!state.objectMode && (!chunk || !chunk.length)) return;
			if (!_this.push(chunk)) {
				paused = true;
				stream.pause();
			}
		});
		for (var i in stream) if (this[i] === void 0 && typeof stream[i] === "function") this[i] = function(method) {
			return function() {
				return stream[method].apply(stream, arguments);
			};
		}(i);
		for (var n = 0; n < kProxyEvents.length; n++) stream.on(kProxyEvents[n], this.emit.bind(this, kProxyEvents[n]));
		this._read = function(n) {
			debug("wrapped _read", n);
			if (paused) {
				paused = false;
				stream.resume();
			}
		};
		return this;
	};
	Object.defineProperty(Readable.prototype, "readableHighWaterMark", {
		enumerable: false,
		get: function() {
			return this._readableState.highWaterMark;
		}
	});
	Readable._fromList = fromList;
	function fromList(n, state) {
		if (state.length === 0) return null;
		var ret;
		if (state.objectMode) ret = state.buffer.shift();
		else if (!n || n >= state.length) {
			if (state.decoder) ret = state.buffer.join("");
			else if (state.buffer.length === 1) ret = state.buffer.head.data;
			else ret = state.buffer.concat(state.length);
			state.buffer.clear();
		} else ret = fromListPartial(n, state.buffer, state.decoder);
		return ret;
	}
	function fromListPartial(n, list, hasStrings) {
		var ret;
		if (n < list.head.data.length) {
			ret = list.head.data.slice(0, n);
			list.head.data = list.head.data.slice(n);
		} else if (n === list.head.data.length) ret = list.shift();
		else ret = hasStrings ? copyFromBufferString(n, list) : copyFromBuffer(n, list);
		return ret;
	}
	function copyFromBufferString(n, list) {
		var p = list.head;
		var c = 1;
		var ret = p.data;
		n -= ret.length;
		while (p = p.next) {
			var str = p.data;
			var nb = n > str.length ? str.length : n;
			if (nb === str.length) ret += str;
			else ret += str.slice(0, n);
			n -= nb;
			if (n === 0) {
				if (nb === str.length) {
					++c;
					if (p.next) list.head = p.next;
					else list.head = list.tail = null;
				} else {
					list.head = p;
					p.data = str.slice(nb);
				}
				break;
			}
			++c;
		}
		list.length -= c;
		return ret;
	}
	function copyFromBuffer(n, list) {
		var ret = Buffer.allocUnsafe(n);
		var p = list.head;
		var c = 1;
		p.data.copy(ret);
		n -= p.data.length;
		while (p = p.next) {
			var buf = p.data;
			var nb = n > buf.length ? buf.length : n;
			buf.copy(ret, ret.length - n, 0, nb);
			n -= nb;
			if (n === 0) {
				if (nb === buf.length) {
					++c;
					if (p.next) list.head = p.next;
					else list.head = list.tail = null;
				} else {
					list.head = p;
					p.data = buf.slice(nb);
				}
				break;
			}
			++c;
		}
		list.length -= c;
		return ret;
	}
	function endReadable(stream) {
		var state = stream._readableState;
		if (state.length > 0) throw new Error("\"endReadable()\" called on non-empty stream");
		if (!state.endEmitted) {
			state.ended = true;
			pna.nextTick(endReadableNT, state, stream);
		}
	}
	function endReadableNT(state, stream) {
		if (!state.endEmitted && state.length === 0) {
			state.endEmitted = true;
			stream.readable = false;
			stream.emit("end");
		}
	}
	function indexOf(xs, x) {
		for (var i = 0, l = xs.length; i < l; i++) if (xs[i] === x) return i;
		return -1;
	}
}));
//#endregion
//#region node_modules/archiver-utils/node_modules/readable-stream/lib/_stream_transform.js
var require__stream_transform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = Transform;
	var Duplex = require__stream_duplex();
	var util = Object.create(require_util$2());
	util.inherits = require_inherits();
	util.inherits(Transform, Duplex);
	function afterTransform(er, data) {
		var ts = this._transformState;
		ts.transforming = false;
		var cb = ts.writecb;
		if (!cb) return this.emit("error", /* @__PURE__ */ new Error("write callback called multiple times"));
		ts.writechunk = null;
		ts.writecb = null;
		if (data != null) this.push(data);
		cb(er);
		var rs = this._readableState;
		rs.reading = false;
		if (rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
	}
	function Transform(options) {
		if (!(this instanceof Transform)) return new Transform(options);
		Duplex.call(this, options);
		this._transformState = {
			afterTransform: afterTransform.bind(this),
			needTransform: false,
			transforming: false,
			writecb: null,
			writechunk: null,
			writeencoding: null
		};
		this._readableState.needReadable = true;
		this._readableState.sync = false;
		if (options) {
			if (typeof options.transform === "function") this._transform = options.transform;
			if (typeof options.flush === "function") this._flush = options.flush;
		}
		this.on("prefinish", prefinish);
	}
	function prefinish() {
		var _this = this;
		if (typeof this._flush === "function") this._flush(function(er, data) {
			done(_this, er, data);
		});
		else done(this, null, null);
	}
	Transform.prototype.push = function(chunk, encoding) {
		this._transformState.needTransform = false;
		return Duplex.prototype.push.call(this, chunk, encoding);
	};
	Transform.prototype._transform = function(chunk, encoding, cb) {
		throw new Error("_transform() is not implemented");
	};
	Transform.prototype._write = function(chunk, encoding, cb) {
		var ts = this._transformState;
		ts.writecb = cb;
		ts.writechunk = chunk;
		ts.writeencoding = encoding;
		if (!ts.transforming) {
			var rs = this._readableState;
			if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
		}
	};
	Transform.prototype._read = function(n) {
		var ts = this._transformState;
		if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
			ts.transforming = true;
			this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
		} else ts.needTransform = true;
	};
	Transform.prototype._destroy = function(err, cb) {
		var _this2 = this;
		Duplex.prototype._destroy.call(this, err, function(err2) {
			cb(err2);
			_this2.emit("close");
		});
	};
	function done(stream, er, data) {
		if (er) return stream.emit("error", er);
		if (data != null) stream.push(data);
		if (stream._writableState.length) throw new Error("Calling transform done when ws.length != 0");
		if (stream._transformState.transforming) throw new Error("Calling transform done when still transforming");
		return stream.push(null);
	}
}));
//#endregion
//#region node_modules/archiver-utils/node_modules/readable-stream/lib/_stream_passthrough.js
var require__stream_passthrough = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = PassThrough;
	var Transform = require__stream_transform();
	var util = Object.create(require_util$2());
	util.inherits = require_inherits();
	util.inherits(PassThrough, Transform);
	function PassThrough(options) {
		if (!(this instanceof PassThrough)) return new PassThrough(options);
		Transform.call(this, options);
	}
	PassThrough.prototype._transform = function(chunk, encoding, cb) {
		cb(null, chunk);
	};
}));
//#endregion
//#region node_modules/archiver-utils/node_modules/readable-stream/readable.js
var require_readable = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Stream$3 = __require("stream");
	if (process.env.READABLE_STREAM === "disable" && Stream$3) {
		module.exports = Stream$3;
		exports = module.exports = Stream$3.Readable;
		exports.Readable = Stream$3.Readable;
		exports.Writable = Stream$3.Writable;
		exports.Duplex = Stream$3.Duplex;
		exports.Transform = Stream$3.Transform;
		exports.PassThrough = Stream$3.PassThrough;
		exports.Stream = Stream$3;
	} else {
		exports = module.exports = require__stream_readable();
		exports.Stream = Stream$3 || exports;
		exports.Readable = exports;
		exports.Writable = require__stream_writable();
		exports.Duplex = require__stream_duplex();
		exports.Transform = require__stream_transform();
		exports.PassThrough = require__stream_passthrough();
	}
}));
//#endregion
//#region node_modules/lodash.flatten/index.js
var require_lodash_flatten = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* lodash (Custom Build) <https://lodash.com/>
	* Build: `lodash modularize exports="npm" -o ./`
	* Copyright jQuery Foundation and other contributors <https://jquery.org/>
	* Released under MIT license <https://lodash.com/license>
	* Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	* Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	*/
	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;
	/** `Object#toString` result references. */
	var argsTag = "[object Arguments]";
	var funcTag = "[object Function]";
	var genTag = "[object GeneratorFunction]";
	/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
	/** Detect free variable `self`. */
	var freeSelf = typeof self == "object" && self && self.Object === Object && self;
	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function("return this")();
	/**
	* Appends the elements of `values` to `array`.
	*
	* @private
	* @param {Array} array The array to modify.
	* @param {Array} values The values to append.
	* @returns {Array} Returns `array`.
	*/
	function arrayPush(array, values) {
		var index = -1, length = values.length, offset = array.length;
		while (++index < length) array[offset + index] = values[index];
		return array;
	}
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	/**
	* Used to resolve the
	* [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	* of values.
	*/
	var objectToString = objectProto.toString;
	/** Built-in value references. */
	var Symbol = root.Symbol;
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;
	var spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : void 0;
	/**
	* The base implementation of `_.flatten` with support for restricting flattening.
	*
	* @private
	* @param {Array} array The array to flatten.
	* @param {number} depth The maximum recursion depth.
	* @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
	* @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
	* @param {Array} [result=[]] The initial result value.
	* @returns {Array} Returns the new flattened array.
	*/
	function baseFlatten(array, depth, predicate, isStrict, result) {
		var index = -1, length = array.length;
		predicate || (predicate = isFlattenable);
		result || (result = []);
		while (++index < length) {
			var value = array[index];
			if (depth > 0 && predicate(value)) {
				if (depth > 1) baseFlatten(value, depth - 1, predicate, isStrict, result);
				else arrayPush(result, value);
			} else if (!isStrict) result[result.length] = value;
		}
		return result;
	}
	/**
	* Checks if `value` is a flattenable `arguments` object or array.
	*
	* @private
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
	*/
	function isFlattenable(value) {
		return isArray(value) || isArguments(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
	}
	/**
	* Flattens `array` a single level deep.
	*
	* @static
	* @memberOf _
	* @since 0.1.0
	* @category Array
	* @param {Array} array The array to flatten.
	* @returns {Array} Returns the new flattened array.
	* @example
	*
	* _.flatten([1, [2, [3, [4]], 5]]);
	* // => [1, 2, [3, [4]], 5]
	*/
	function flatten(array) {
		return (array ? array.length : 0) ? baseFlatten(array, 1) : [];
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
	module.exports = flatten;
}));
//#endregion
//#region node_modules/lodash.difference/index.js
var require_lodash_difference = /* @__PURE__ */ __commonJSMin(((exports, module) => {
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
	var MAX_SAFE_INTEGER = 9007199254740991;
	/** `Object#toString` result references. */
	var argsTag = "[object Arguments]";
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
	* A faster alternative to `Function#apply`, this function invokes `func`
	* with the `this` binding of `thisArg` and the arguments of `args`.
	*
	* @private
	* @param {Function} func The function to invoke.
	* @param {*} thisArg The `this` binding of `func`.
	* @param {Array} args The arguments to invoke `func` with.
	* @returns {*} Returns the result of `func`.
	*/
	function apply(func, thisArg, args) {
		switch (args.length) {
			case 0: return func.call(thisArg);
			case 1: return func.call(thisArg, args[0]);
			case 2: return func.call(thisArg, args[0], args[1]);
			case 3: return func.call(thisArg, args[0], args[1], args[2]);
		}
		return func.apply(thisArg, args);
	}
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
	* A specialized version of `_.map` for arrays without support for iteratee
	* shorthands.
	*
	* @private
	* @param {Array} [array] The array to iterate over.
	* @param {Function} iteratee The function invoked per iteration.
	* @returns {Array} Returns the new mapped array.
	*/
	function arrayMap(array, iteratee) {
		var index = -1, length = array ? array.length : 0, result = Array(length);
		while (++index < length) result[index] = iteratee(array[index], index, array);
		return result;
	}
	/**
	* Appends the elements of `values` to `array`.
	*
	* @private
	* @param {Array} array The array to modify.
	* @param {Array} values The values to append.
	* @returns {Array} Returns `array`.
	*/
	function arrayPush(array, values) {
		var index = -1, length = values.length, offset = array.length;
		while (++index < length) array[offset + index] = values[index];
		return array;
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
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;
	var splice = arrayProto.splice;
	var spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : void 0;
	var nativeMax = Math.max;
	var Map = getNative(root, "Map");
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
	* The base implementation of methods like `_.difference` without support
	* for excluding multiple arrays or iteratee shorthands.
	*
	* @private
	* @param {Array} array The array to inspect.
	* @param {Array} values The values to exclude.
	* @param {Function} [iteratee] The iteratee invoked per element.
	* @param {Function} [comparator] The comparator invoked per element.
	* @returns {Array} Returns the new array of filtered values.
	*/
	function baseDifference(array, values, iteratee, comparator) {
		var index = -1, includes = arrayIncludes, isCommon = true, length = array.length, result = [], valuesLength = values.length;
		if (!length) return result;
		if (iteratee) values = arrayMap(values, baseUnary(iteratee));
		if (comparator) {
			includes = arrayIncludesWith;
			isCommon = false;
		} else if (values.length >= LARGE_ARRAY_SIZE) {
			includes = cacheHas;
			isCommon = false;
			values = new SetCache(values);
		}
		outer: while (++index < length) {
			var value = array[index], computed = iteratee ? iteratee(value) : value;
			value = comparator || value !== 0 ? value : 0;
			if (isCommon && computed === computed) {
				var valuesIndex = valuesLength;
				while (valuesIndex--) if (values[valuesIndex] === computed) continue outer;
				result.push(value);
			} else if (!includes(values, computed, comparator)) result.push(value);
		}
		return result;
	}
	/**
	* The base implementation of `_.flatten` with support for restricting flattening.
	*
	* @private
	* @param {Array} array The array to flatten.
	* @param {number} depth The maximum recursion depth.
	* @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
	* @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
	* @param {Array} [result=[]] The initial result value.
	* @returns {Array} Returns the new flattened array.
	*/
	function baseFlatten(array, depth, predicate, isStrict, result) {
		var index = -1, length = array.length;
		predicate || (predicate = isFlattenable);
		result || (result = []);
		while (++index < length) {
			var value = array[index];
			if (depth > 0 && predicate(value)) {
				if (depth > 1) baseFlatten(value, depth - 1, predicate, isStrict, result);
				else arrayPush(result, value);
			} else if (!isStrict) result[result.length] = value;
		}
		return result;
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
	* The base implementation of `_.rest` which doesn't validate or coerce arguments.
	*
	* @private
	* @param {Function} func The function to apply a rest parameter to.
	* @param {number} [start=func.length-1] The start position of the rest parameter.
	* @returns {Function} Returns the new function.
	*/
	function baseRest(func, start) {
		start = nativeMax(start === void 0 ? func.length - 1 : start, 0);
		return function() {
			var args = arguments, index = -1, length = nativeMax(args.length - start, 0), array = Array(length);
			while (++index < length) array[index] = args[start + index];
			index = -1;
			var otherArgs = Array(start + 1);
			while (++index < start) otherArgs[index] = args[index];
			otherArgs[start] = array;
			return apply(func, this, otherArgs);
		};
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
	* Checks if `value` is a flattenable `arguments` object or array.
	*
	* @private
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
	*/
	function isFlattenable(value) {
		return isArray(value) || isArguments(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
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
	* Creates an array of `array` values not included in the other given arrays
	* using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	* for equality comparisons. The order of result values is determined by the
	* order they occur in the first array.
	*
	* **Note:** Unlike `_.pullAll`, this method returns a new array.
	*
	* @static
	* @memberOf _
	* @since 0.1.0
	* @category Array
	* @param {Array} array The array to inspect.
	* @param {...Array} [values] The values to exclude.
	* @returns {Array} Returns the new array of filtered values.
	* @see _.without, _.xor
	* @example
	*
	* _.difference([2, 1], [2, 3]);
	* // => [1]
	*/
	var difference = baseRest(function(array, values) {
		return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true)) : [];
	});
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
	module.exports = difference;
}));
//#endregion
//#region node_modules/lodash.union/index.js
var require_lodash_union = /* @__PURE__ */ __commonJSMin(((exports, module) => {
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
	var MAX_SAFE_INTEGER = 9007199254740991;
	/** `Object#toString` result references. */
	var argsTag = "[object Arguments]";
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
	* A faster alternative to `Function#apply`, this function invokes `func`
	* with the `this` binding of `thisArg` and the arguments of `args`.
	*
	* @private
	* @param {Function} func The function to invoke.
	* @param {*} thisArg The `this` binding of `func`.
	* @param {Array} args The arguments to invoke `func` with.
	* @returns {*} Returns the result of `func`.
	*/
	function apply(func, thisArg, args) {
		switch (args.length) {
			case 0: return func.call(thisArg);
			case 1: return func.call(thisArg, args[0]);
			case 2: return func.call(thisArg, args[0], args[1]);
			case 3: return func.call(thisArg, args[0], args[1], args[2]);
		}
		return func.apply(thisArg, args);
	}
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
	* Appends the elements of `values` to `array`.
	*
	* @private
	* @param {Array} array The array to modify.
	* @param {Array} values The values to append.
	* @returns {Array} Returns `array`.
	*/
	function arrayPush(array, values) {
		var index = -1, length = values.length, offset = array.length;
		while (++index < length) array[offset + index] = values[index];
		return array;
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
	var Symbol = root.Symbol;
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;
	var splice = arrayProto.splice;
	var spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : void 0;
	var nativeMax = Math.max;
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
	* The base implementation of `_.flatten` with support for restricting flattening.
	*
	* @private
	* @param {Array} array The array to flatten.
	* @param {number} depth The maximum recursion depth.
	* @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
	* @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
	* @param {Array} [result=[]] The initial result value.
	* @returns {Array} Returns the new flattened array.
	*/
	function baseFlatten(array, depth, predicate, isStrict, result) {
		var index = -1, length = array.length;
		predicate || (predicate = isFlattenable);
		result || (result = []);
		while (++index < length) {
			var value = array[index];
			if (depth > 0 && predicate(value)) {
				if (depth > 1) baseFlatten(value, depth - 1, predicate, isStrict, result);
				else arrayPush(result, value);
			} else if (!isStrict) result[result.length] = value;
		}
		return result;
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
	* The base implementation of `_.rest` which doesn't validate or coerce arguments.
	*
	* @private
	* @param {Function} func The function to apply a rest parameter to.
	* @param {number} [start=func.length-1] The start position of the rest parameter.
	* @returns {Function} Returns the new function.
	*/
	function baseRest(func, start) {
		start = nativeMax(start === void 0 ? func.length - 1 : start, 0);
		return function() {
			var args = arguments, index = -1, length = nativeMax(args.length - start, 0), array = Array(length);
			while (++index < length) array[index] = args[start + index];
			index = -1;
			var otherArgs = Array(start + 1);
			while (++index < start) otherArgs[index] = args[index];
			otherArgs[start] = array;
			return apply(func, this, otherArgs);
		};
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
	* Checks if `value` is a flattenable `arguments` object or array.
	*
	* @private
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
	*/
	function isFlattenable(value) {
		return isArray(value) || isArguments(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
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
	* Creates an array of unique values, in order, from all given arrays using
	* [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	* for equality comparisons.
	*
	* @static
	* @memberOf _
	* @since 0.1.0
	* @category Array
	* @param {...Array} [arrays] The arrays to inspect.
	* @returns {Array} Returns the new array of combined values.
	* @example
	*
	* _.union([2], [1, 2]);
	* // => [2, 1]
	*/
	var union = baseRest(function(arrays) {
		return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true));
	});
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
	module.exports = union;
}));
//#endregion
//#region node_modules/lodash.isplainobject/index.js
var require_lodash_isplainobject = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* lodash (Custom Build) <https://lodash.com/>
	* Build: `lodash modularize exports="npm" -o ./`
	* Copyright jQuery Foundation and other contributors <https://jquery.org/>
	* Released under MIT license <https://lodash.com/license>
	* Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	* Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	*/
	/** `Object#toString` result references. */
	var objectTag = "[object Object]";
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
	/** Used for built-in method references. */
	var funcProto = Function.prototype;
	var objectProto = Object.prototype;
	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	/** Used to infer the `Object` constructor. */
	var objectCtorString = funcToString.call(Object);
	/**
	* Used to resolve the
	* [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	* of values.
	*/
	var objectToString = objectProto.toString;
	/** Built-in value references. */
	var getPrototype = overArg(Object.getPrototypeOf, Object);
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
	* Checks if `value` is a plain object, that is, an object created by the
	* `Object` constructor or one with a `[[Prototype]]` of `null`.
	*
	* @static
	* @memberOf _
	* @since 0.8.0
	* @category Lang
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
	* @example
	*
	* function Foo() {
	*   this.a = 1;
	* }
	*
	* _.isPlainObject(new Foo);
	* // => false
	*
	* _.isPlainObject([1, 2, 3]);
	* // => false
	*
	* _.isPlainObject({ 'x': 0, 'y': 0 });
	* // => true
	*
	* _.isPlainObject(Object.create(null));
	* // => true
	*/
	function isPlainObject(value) {
		if (!isObjectLike(value) || objectToString.call(value) != objectTag || isHostObject(value)) return false;
		var proto = getPrototype(value);
		if (proto === null) return true;
		var Ctor = hasOwnProperty.call(proto, "constructor") && proto.constructor;
		return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
	}
	module.exports = isPlainObject;
}));
//#endregion
//#region node_modules/fs.realpath/old.js
var require_old = /* @__PURE__ */ __commonJSMin(((exports) => {
	var pathModule = __require("path");
	var isWindows = process.platform === "win32";
	var fs$3 = __require("fs");
	var DEBUG = process.env.NODE_DEBUG && /fs/.test(process.env.NODE_DEBUG);
	function rethrow() {
		var callback;
		if (DEBUG) {
			var backtrace = /* @__PURE__ */ new Error();
			callback = debugCallback;
		} else callback = missingCallback;
		return callback;
		function debugCallback(err) {
			if (err) {
				backtrace.message = err.message;
				err = backtrace;
				missingCallback(err);
			}
		}
		function missingCallback(err) {
			if (err) {
				if (process.throwDeprecation) throw err;
				else if (!process.noDeprecation) {
					var msg = "fs: missing callback " + (err.stack || err.message);
					if (process.traceDeprecation) console.trace(msg);
					else console.error(msg);
				}
			}
		}
	}
	function maybeCallback(cb) {
		return typeof cb === "function" ? cb : rethrow();
	}
	pathModule.normalize;
	if (isWindows) var nextPartRe = /(.*?)(?:[\/\\]+|$)/g;
	else var nextPartRe = /(.*?)(?:[\/]+|$)/g;
	if (isWindows) var splitRootRe = /^(?:[a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/][^\\\/]+)?[\\\/]*/;
	else var splitRootRe = /^[\/]*/;
	exports.realpathSync = function realpathSync(p, cache) {
		p = pathModule.resolve(p);
		if (cache && Object.prototype.hasOwnProperty.call(cache, p)) return cache[p];
		var original = p, seenLinks = {}, knownHard = {};
		var pos;
		var current;
		var base;
		var previous;
		start();
		function start() {
			var m = splitRootRe.exec(p);
			pos = m[0].length;
			current = m[0];
			base = m[0];
			previous = "";
			if (isWindows && !knownHard[base]) {
				fs$3.lstatSync(base);
				knownHard[base] = true;
			}
		}
		while (pos < p.length) {
			nextPartRe.lastIndex = pos;
			var result = nextPartRe.exec(p);
			previous = current;
			current += result[0];
			base = previous + result[1];
			pos = nextPartRe.lastIndex;
			if (knownHard[base] || cache && cache[base] === base) continue;
			var resolvedLink;
			if (cache && Object.prototype.hasOwnProperty.call(cache, base)) resolvedLink = cache[base];
			else {
				var stat = fs$3.lstatSync(base);
				if (!stat.isSymbolicLink()) {
					knownHard[base] = true;
					if (cache) cache[base] = base;
					continue;
				}
				var linkTarget = null;
				if (!isWindows) {
					var id = stat.dev.toString(32) + ":" + stat.ino.toString(32);
					if (seenLinks.hasOwnProperty(id)) linkTarget = seenLinks[id];
				}
				if (linkTarget === null) {
					fs$3.statSync(base);
					linkTarget = fs$3.readlinkSync(base);
				}
				resolvedLink = pathModule.resolve(previous, linkTarget);
				if (cache) cache[base] = resolvedLink;
				if (!isWindows) seenLinks[id] = linkTarget;
			}
			p = pathModule.resolve(resolvedLink, p.slice(pos));
			start();
		}
		if (cache) cache[original] = p;
		return p;
	};
	exports.realpath = function realpath(p, cache, cb) {
		if (typeof cb !== "function") {
			cb = maybeCallback(cache);
			cache = null;
		}
		p = pathModule.resolve(p);
		if (cache && Object.prototype.hasOwnProperty.call(cache, p)) return process.nextTick(cb.bind(null, null, cache[p]));
		var original = p, seenLinks = {}, knownHard = {};
		var pos;
		var current;
		var base;
		var previous;
		start();
		function start() {
			var m = splitRootRe.exec(p);
			pos = m[0].length;
			current = m[0];
			base = m[0];
			previous = "";
			if (isWindows && !knownHard[base]) fs$3.lstat(base, function(err) {
				if (err) return cb(err);
				knownHard[base] = true;
				LOOP();
			});
			else process.nextTick(LOOP);
		}
		function LOOP() {
			if (pos >= p.length) {
				if (cache) cache[original] = p;
				return cb(null, p);
			}
			nextPartRe.lastIndex = pos;
			var result = nextPartRe.exec(p);
			previous = current;
			current += result[0];
			base = previous + result[1];
			pos = nextPartRe.lastIndex;
			if (knownHard[base] || cache && cache[base] === base) return process.nextTick(LOOP);
			if (cache && Object.prototype.hasOwnProperty.call(cache, base)) return gotResolvedLink(cache[base]);
			return fs$3.lstat(base, gotStat);
		}
		function gotStat(err, stat) {
			if (err) return cb(err);
			if (!stat.isSymbolicLink()) {
				knownHard[base] = true;
				if (cache) cache[base] = base;
				return process.nextTick(LOOP);
			}
			if (!isWindows) {
				var id = stat.dev.toString(32) + ":" + stat.ino.toString(32);
				if (seenLinks.hasOwnProperty(id)) return gotTarget(null, seenLinks[id], base);
			}
			fs$3.stat(base, function(err) {
				if (err) return cb(err);
				fs$3.readlink(base, function(err, target) {
					if (!isWindows) seenLinks[id] = target;
					gotTarget(err, target);
				});
			});
		}
		function gotTarget(err, target, base) {
			if (err) return cb(err);
			var resolvedLink = pathModule.resolve(previous, target);
			if (cache) cache[base] = resolvedLink;
			gotResolvedLink(resolvedLink);
		}
		function gotResolvedLink(resolvedLink) {
			p = pathModule.resolve(resolvedLink, p.slice(pos));
			start();
		}
	};
}));
//#endregion
//#region node_modules/fs.realpath/index.js
var require_fs_realpath = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = realpath;
	realpath.realpath = realpath;
	realpath.sync = realpathSync;
	realpath.realpathSync = realpathSync;
	realpath.monkeypatch = monkeypatch;
	realpath.unmonkeypatch = unmonkeypatch;
	var fs$2 = __require("fs");
	var origRealpath = fs$2.realpath;
	var origRealpathSync = fs$2.realpathSync;
	var version = process.version;
	var ok = /^v[0-5]\./.test(version);
	var old = require_old();
	function newError(er) {
		return er && er.syscall === "realpath" && (er.code === "ELOOP" || er.code === "ENOMEM" || er.code === "ENAMETOOLONG");
	}
	function realpath(p, cache, cb) {
		if (ok) return origRealpath(p, cache, cb);
		if (typeof cache === "function") {
			cb = cache;
			cache = null;
		}
		origRealpath(p, cache, function(er, result) {
			if (newError(er)) old.realpath(p, cache, cb);
			else cb(er, result);
		});
	}
	function realpathSync(p, cache) {
		if (ok) return origRealpathSync(p, cache);
		try {
			return origRealpathSync(p, cache);
		} catch (er) {
			if (newError(er)) return old.realpathSync(p, cache);
			else throw er;
		}
	}
	function monkeypatch() {
		fs$2.realpath = realpath;
		fs$2.realpathSync = realpathSync;
	}
	function unmonkeypatch() {
		fs$2.realpath = origRealpath;
		fs$2.realpathSync = origRealpathSync;
	}
}));
//#endregion
//#region node_modules/concat-map/index.js
var require_concat_map = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = function(xs, fn) {
		var res = [];
		for (var i = 0; i < xs.length; i++) {
			var x = fn(xs[i], i);
			if (isArray(x)) res.push.apply(res, x);
			else res.push(x);
		}
		return res;
	};
	var isArray = Array.isArray || function(xs) {
		return Object.prototype.toString.call(xs) === "[object Array]";
	};
}));
//#endregion
//#region node_modules/brace-expansion/index.js
var require_brace_expansion = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	require_concat_map();
	var balanced = require_balanced_match();
	module.exports = expandTop;
	var escSlash = "\0SLASH" + Math.random() + "\0";
	var escOpen = "\0OPEN" + Math.random() + "\0";
	var escClose = "\0CLOSE" + Math.random() + "\0";
	var escComma = "\0COMMA" + Math.random() + "\0";
	var escPeriod = "\0PERIOD" + Math.random() + "\0";
	var EXPANSION_MAX = 1e5;
	var EXPANSION_MAX_LENGTH = 4e6;
	function numeric(str) {
		return parseInt(str, 10) == str ? parseInt(str, 10) : str.charCodeAt(0);
	}
	function escapeBraces(str) {
		return str.split("\\\\").join(escSlash).split("\\{").join(escOpen).split("\\}").join(escClose).split("\\,").join(escComma).split("\\.").join(escPeriod);
	}
	function unescapeBraces(str) {
		return str.split(escSlash).join("\\").split(escOpen).join("{").split(escClose).join("}").split(escComma).join(",").split(escPeriod).join(".");
	}
	function parseCommaParts(str) {
		if (!str) return [""];
		var parts = [];
		var m = balanced("{", "}", str);
		if (!m) return str.split(",");
		var pre = m.pre;
		var body = m.body;
		var post = m.post;
		var p = pre.split(",");
		p[p.length - 1] += "{" + body + "}";
		var postParts = parseCommaParts(post);
		if (post.length) {
			p[p.length - 1] += postParts.shift();
			p.push.apply(p, postParts);
		}
		parts.push.apply(parts, p);
		return parts;
	}
	function expandTop(str, options) {
		if (!str) return [];
		options = options || {};
		var max = options.max == null ? EXPANSION_MAX : options.max;
		var maxLength = options.maxLength == null ? EXPANSION_MAX_LENGTH : options.maxLength;
		if (str.substr(0, 2) === "{}") str = "\\{\\}" + str.substr(2);
		return expand(escapeBraces(str), max, maxLength, true).map(unescapeBraces);
	}
	function embrace(str) {
		return "{" + str + "}";
	}
	function isPadded(el) {
		return /^-?0\d/.test(el);
	}
	function lte(i, y) {
		return i <= y;
	}
	function gte(i, y) {
		return i >= y;
	}
	function combine(acc, base, pre, values, max, maxLength, dropEmpties, outBase) {
		var out = [];
		var length = 0;
		for (var a = 0; a < acc.length; a++) for (var v = 0; v < values.length; v++) {
			if (out.length >= max) return out;
			var expansion = acc[a] + pre + values[v];
			if (dropEmpties && expansion.length === base[a]) continue;
			if (length + expansion.length > maxLength) return out;
			out.push(expansion);
			outBase.push(base[a]);
			length += expansion.length;
		}
		return out;
	}
	function expandSequence(body, isAlphaSequence, max, maxLength) {
		var n = body.split(/\.\./);
		var N = [];
		/* c8 ignore start */
		if (n[0] === void 0 || n[1] === void 0) return N;
		/* c8 ignore stop */
		var x = numeric(n[0]);
		var y = numeric(n[1]);
		var width = Math.max(n[0].length, n[1].length);
		var incr = n.length === 3 && n[2] !== void 0 ? Math.max(Math.abs(numeric(n[2])), 1) : 1;
		var test = lte;
		if (y < x) {
			incr *= -1;
			test = gte;
		}
		var pad = n.some(isPadded);
		var length = 0;
		for (var i = x; test(i, y) && N.length < max; i += incr) {
			var c;
			if (isAlphaSequence) {
				c = String.fromCharCode(i);
				if (c === "\\") c = "";
			} else {
				c = String(i);
				if (pad) {
					var need = width - c.length;
					if (need > 0) {
						var z = new Array(need + 1).join("0");
						if (i < 0) c = "-" + z + c.slice(1);
						else c = z + c;
					}
				}
			}
			if (length + c.length > maxLength) break;
			N.push(c);
			length += c.length;
		}
		return N;
	}
	function expand(str, max, maxLength, isTop) {
		var acc = [""];
		var accBase = [0];
		var dropEmpties = false;
		var firstGroup = true;
		var nextBase;
		for (;;) {
			var m = balanced("{", "}", str);
			if (!m) return combine(acc, accBase, str, [""], max, maxLength, dropEmpties, []);
			var pre = m.pre;
			if (/\$$/.test(pre)) return combine(acc, accBase, str, [""], max, maxLength, dropEmpties, []);
			var isNumericSequence = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(m.body);
			var isAlphaSequence = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(m.body);
			var isSequence = isNumericSequence || isAlphaSequence;
			var isOptions = m.body.indexOf(",") >= 0;
			if (!isSequence && !isOptions) {
				if (m.post.match(/,(?!,).*\}/)) {
					str = m.pre + "{" + m.body + escClose + m.post;
					isTop = true;
					firstGroup = true;
					dropEmpties = false;
					accBase = [];
					for (var b = 0; b < acc.length; b++) accBase.push(acc[b].length);
					continue;
				}
				return combine(acc, accBase, pre + "{" + m.body + "}" + m.post, [""], max, maxLength, dropEmpties, []);
			}
			if (firstGroup) {
				dropEmpties = isTop && !isSequence;
				firstGroup = false;
			}
			var values;
			if (isSequence) values = expandSequence(m.body, isAlphaSequence, max, maxLength);
			else {
				var n = parseCommaParts(m.body);
				if (n.length === 1 && n[0] !== void 0) {
					n = expand(n[0], max, maxLength, false).map(embrace);
					/* c8 ignore start */
					if (n.length === 1) {
						nextBase = [];
						acc = combine(acc, accBase, pre + n[0], [""], max, maxLength, dropEmpties && !m.post.length, nextBase);
						accBase = nextBase;
						if (!m.post.length) break;
						str = m.post;
						continue;
					}
				}
				var dropsEmpties = dropEmpties && !m.post.length && !pre;
				for (var d = 0; dropsEmpties && d < acc.length; d++) if (acc[d].length !== accBase[d]) dropsEmpties = false;
				values = [];
				var valuesLength = 0;
				outer: for (var j = 0; j < n.length; j++) {
					var expanded = expand(n[j], max, maxLength, false);
					for (var k = 0; k < expanded.length; k++) {
						var v = expanded[k];
						if (dropsEmpties && !v) continue;
						if (values.length >= max || valuesLength + v.length > maxLength) break outer;
						values.push(v);
						valuesLength += v.length;
					}
				}
			}
			nextBase = [];
			acc = combine(acc, accBase, pre, values, max, maxLength, dropEmpties && !m.post.length, nextBase);
			accBase = nextBase;
			if (!m.post.length) break;
			str = m.post;
		}
		return acc;
	}
}));
//#endregion
//#region node_modules/minimatch/minimatch.js
var require_minimatch = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = minimatch;
	minimatch.Minimatch = Minimatch;
	var path$8 = function() {
		try {
			return __require("path");
		} catch (e) {}
	}() || { sep: "/" };
	minimatch.sep = path$8.sep;
	var GLOBSTAR = minimatch.GLOBSTAR = Minimatch.GLOBSTAR = {};
	var expand = require_brace_expansion();
	var plTypes = {
		"!": {
			open: "(?:(?!(?:",
			close: "))[^/]*?)"
		},
		"?": {
			open: "(?:",
			close: ")?"
		},
		"+": {
			open: "(?:",
			close: ")+"
		},
		"*": {
			open: "(?:",
			close: ")*"
		},
		"@": {
			open: "(?:",
			close: ")"
		}
	};
	var qmark = "[^/]";
	var star = qmark + "*?";
	var twoStarDot = "(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?";
	var twoStarNoDot = "(?:(?!(?:\\/|^)\\.).)*?";
	var reSpecials = charSet("().*{}+?[]^$\\!");
	function charSet(s) {
		return s.split("").reduce(function(set, c) {
			set[c] = true;
			return set;
		}, {});
	}
	var slashSplit = /\/+/;
	minimatch.filter = filter;
	function filter(pattern, options) {
		options = options || {};
		return function(p, i, list) {
			return minimatch(p, pattern, options);
		};
	}
	function ext(a, b) {
		b = b || {};
		var t = {};
		Object.keys(a).forEach(function(k) {
			t[k] = a[k];
		});
		Object.keys(b).forEach(function(k) {
			t[k] = b[k];
		});
		return t;
	}
	minimatch.defaults = function(def) {
		if (!def || typeof def !== "object" || !Object.keys(def).length) return minimatch;
		var orig = minimatch;
		var m = function minimatch(p, pattern, options) {
			return orig(p, pattern, ext(def, options));
		};
		m.Minimatch = function Minimatch(pattern, options) {
			return new orig.Minimatch(pattern, ext(def, options));
		};
		m.Minimatch.defaults = function defaults(options) {
			return orig.defaults(ext(def, options)).Minimatch;
		};
		m.filter = function filter(pattern, options) {
			return orig.filter(pattern, ext(def, options));
		};
		m.defaults = function defaults(options) {
			return orig.defaults(ext(def, options));
		};
		m.makeRe = function makeRe(pattern, options) {
			return orig.makeRe(pattern, ext(def, options));
		};
		m.braceExpand = function braceExpand(pattern, options) {
			return orig.braceExpand(pattern, ext(def, options));
		};
		m.match = function(list, pattern, options) {
			return orig.match(list, pattern, ext(def, options));
		};
		return m;
	};
	Minimatch.defaults = function(def) {
		return minimatch.defaults(def).Minimatch;
	};
	function minimatch(p, pattern, options) {
		assertValidPattern(pattern);
		if (!options) options = {};
		if (!options.nocomment && pattern.charAt(0) === "#") return false;
		return new Minimatch(pattern, options).match(p);
	}
	function Minimatch(pattern, options) {
		if (!(this instanceof Minimatch)) return new Minimatch(pattern, options);
		assertValidPattern(pattern);
		if (!options) options = {};
		pattern = pattern.trim();
		if (!options.allowWindowsEscape && path$8.sep !== "/") pattern = pattern.split(path$8.sep).join("/");
		this.options = options;
		this.maxGlobstarRecursion = options.maxGlobstarRecursion !== void 0 ? options.maxGlobstarRecursion : 200;
		this.set = [];
		this.pattern = pattern;
		this.regexp = null;
		this.negate = false;
		this.comment = false;
		this.empty = false;
		this.partial = !!options.partial;
		this.make();
	}
	Minimatch.prototype.debug = function() {};
	Minimatch.prototype.make = make;
	function make() {
		var pattern = this.pattern;
		var options = this.options;
		if (!options.nocomment && pattern.charAt(0) === "#") {
			this.comment = true;
			return;
		}
		if (!pattern) {
			this.empty = true;
			return;
		}
		this.parseNegate();
		var set = this.globSet = this.braceExpand();
		if (options.debug) this.debug = function debug() {
			console.error.apply(console, arguments);
		};
		this.debug(this.pattern, set);
		set = this.globParts = set.map(function(s) {
			return s.split(slashSplit);
		});
		this.debug(this.pattern, set);
		set = set.map(function(s, si, set) {
			return s.map(this.parse, this);
		}, this);
		this.debug(this.pattern, set);
		set = set.filter(function(s) {
			return s.indexOf(false) === -1;
		});
		this.debug(this.pattern, set);
		this.set = set;
	}
	Minimatch.prototype.parseNegate = parseNegate;
	function parseNegate() {
		var pattern = this.pattern;
		var negate = false;
		var options = this.options;
		var negateOffset = 0;
		if (options.nonegate) return;
		for (var i = 0, l = pattern.length; i < l && pattern.charAt(i) === "!"; i++) {
			negate = !negate;
			negateOffset++;
		}
		if (negateOffset) this.pattern = pattern.substr(negateOffset);
		this.negate = negate;
	}
	minimatch.braceExpand = function(pattern, options) {
		return braceExpand(pattern, options);
	};
	Minimatch.prototype.braceExpand = braceExpand;
	function braceExpand(pattern, options) {
		if (!options) {
			if (this instanceof Minimatch) options = this.options;
			else options = {};
		}
		pattern = typeof pattern === "undefined" ? this.pattern : pattern;
		assertValidPattern(pattern);
		if (options.nobrace || !/\{(?:(?!\{).)*\}/.test(pattern)) return [pattern];
		return expand(pattern);
	}
	var MAX_PATTERN_LENGTH = 65536;
	var assertValidPattern = function(pattern) {
		if (typeof pattern !== "string") throw new TypeError("invalid pattern");
		if (pattern.length > MAX_PATTERN_LENGTH) throw new TypeError("pattern is too long");
	};
	Minimatch.prototype.parse = parse;
	var SUBPARSE = {};
	function parse(pattern, isSub) {
		assertValidPattern(pattern);
		var options = this.options;
		if (pattern === "**") {
			if (!options.noglobstar) return GLOBSTAR;
			else pattern = "*";
		}
		if (pattern === "") return "";
		var re = "";
		var hasMagic = !!options.nocase;
		var escaping = false;
		var patternListStack = [];
		var negativeLists = [];
		var stateChar;
		var inClass = false;
		var reClassStart = -1;
		var classStart = -1;
		var patternStart = pattern.charAt(0) === "." ? "" : options.dot ? "(?!(?:^|\\/)\\.{1,2}(?:$|\\/))" : "(?!\\.)";
		var self = this;
		function clearStateChar() {
			if (stateChar) {
				switch (stateChar) {
					case "*":
						re += star;
						hasMagic = true;
						break;
					case "?":
						re += qmark;
						hasMagic = true;
						break;
					default: re += "\\" + stateChar;
				}
				self.debug("clearStateChar %j %j", stateChar, re);
				stateChar = false;
			}
		}
		for (var i = 0, len = pattern.length, c; i < len && (c = pattern.charAt(i)); i++) {
			this.debug("%s	%s %s %j", pattern, i, re, c);
			if (escaping && reSpecials[c]) {
				re += "\\" + c;
				escaping = false;
				continue;
			}
			switch (c) {
				/* istanbul ignore next */
				case "/": return false;
				case "\\":
					clearStateChar();
					escaping = true;
					continue;
				case "?":
				case "*":
				case "+":
				case "@":
				case "!":
					this.debug("%s	%s %s %j <-- stateChar", pattern, i, re, c);
					if (inClass) {
						this.debug("  in class");
						if (c === "!" && i === classStart + 1) c = "^";
						re += c;
						continue;
					}
					if (c === "*" && stateChar === "*") continue;
					self.debug("call clearStateChar %j", stateChar);
					clearStateChar();
					stateChar = c;
					if (options.noext) clearStateChar();
					continue;
				case "(":
					if (inClass) {
						re += "(";
						continue;
					}
					if (!stateChar) {
						re += "\\(";
						continue;
					}
					patternListStack.push({
						type: stateChar,
						start: i - 1,
						reStart: re.length,
						open: plTypes[stateChar].open,
						close: plTypes[stateChar].close
					});
					re += stateChar === "!" ? "(?:(?!(?:" : "(?:";
					this.debug("plType %j %j", stateChar, re);
					stateChar = false;
					continue;
				case ")":
					if (inClass || !patternListStack.length) {
						re += "\\)";
						continue;
					}
					clearStateChar();
					hasMagic = true;
					var pl = patternListStack.pop();
					re += pl.close;
					if (pl.type === "!") negativeLists.push(pl);
					pl.reEnd = re.length;
					continue;
				case "|":
					if (inClass || !patternListStack.length || escaping) {
						re += "\\|";
						escaping = false;
						continue;
					}
					clearStateChar();
					re += "|";
					continue;
				case "[":
					clearStateChar();
					if (inClass) {
						re += "\\" + c;
						continue;
					}
					inClass = true;
					classStart = i;
					reClassStart = re.length;
					re += c;
					continue;
				case "]":
					if (i === classStart + 1 || !inClass) {
						re += "\\" + c;
						escaping = false;
						continue;
					}
					var cs = pattern.substring(classStart + 1, i);
					try {
						RegExp("[" + cs + "]");
					} catch (er) {
						var sp = this.parse(cs, SUBPARSE);
						re = re.substr(0, reClassStart) + "\\[" + sp[0] + "\\]";
						hasMagic = hasMagic || sp[1];
						inClass = false;
						continue;
					}
					hasMagic = true;
					inClass = false;
					re += c;
					continue;
				default:
					clearStateChar();
					if (escaping) escaping = false;
					else if (reSpecials[c] && !(c === "^" && inClass)) re += "\\";
					re += c;
			}
		}
		if (inClass) {
			cs = pattern.substr(classStart + 1);
			sp = this.parse(cs, SUBPARSE);
			re = re.substr(0, reClassStart) + "\\[" + sp[0];
			hasMagic = hasMagic || sp[1];
		}
		for (pl = patternListStack.pop(); pl; pl = patternListStack.pop()) {
			var tail = re.slice(pl.reStart + pl.open.length);
			this.debug("setting tail", re, pl);
			tail = tail.replace(/((?:\\{2}){0,64})(\\?)\|/g, function(_, $1, $2) {
				if (!$2) $2 = "\\";
				return $1 + $1 + $2 + "|";
			});
			this.debug("tail=%j\n   %s", tail, tail, pl, re);
			var t = pl.type === "*" ? star : pl.type === "?" ? qmark : "\\" + pl.type;
			hasMagic = true;
			re = re.slice(0, pl.reStart) + t + "\\(" + tail;
		}
		clearStateChar();
		if (escaping) re += "\\\\";
		var addPatternStart = false;
		switch (re.charAt(0)) {
			case "[":
			case ".":
			case "(": addPatternStart = true;
		}
		for (var n = negativeLists.length - 1; n > -1; n--) {
			var nl = negativeLists[n];
			var nlBefore = re.slice(0, nl.reStart);
			var nlFirst = re.slice(nl.reStart, nl.reEnd - 8);
			var nlLast = re.slice(nl.reEnd - 8, nl.reEnd);
			var nlAfter = re.slice(nl.reEnd);
			nlLast += nlAfter;
			var openParensBefore = nlBefore.split("(").length - 1;
			var cleanAfter = nlAfter;
			for (i = 0; i < openParensBefore; i++) cleanAfter = cleanAfter.replace(/\)[+*?]?/, "");
			nlAfter = cleanAfter;
			var dollar = "";
			if (nlAfter === "" && isSub !== SUBPARSE) dollar = "$";
			re = nlBefore + nlFirst + nlAfter + dollar + nlLast;
		}
		if (re !== "" && hasMagic) re = "(?=.)" + re;
		if (addPatternStart) re = patternStart + re;
		if (isSub === SUBPARSE) return [re, hasMagic];
		if (!hasMagic) return globUnescape(pattern);
		var flags = options.nocase ? "i" : "";
		try {
			var regExp = new RegExp("^" + re + "$", flags);
		} catch (er) /* istanbul ignore next - should be impossible */ {
			return /* @__PURE__ */ new RegExp("$.");
		}
		regExp._glob = pattern;
		regExp._src = re;
		return regExp;
	}
	minimatch.makeRe = function(pattern, options) {
		return new Minimatch(pattern, options || {}).makeRe();
	};
	Minimatch.prototype.makeRe = makeRe;
	function makeRe() {
		if (this.regexp || this.regexp === false) return this.regexp;
		var set = this.set;
		if (!set.length) {
			this.regexp = false;
			return this.regexp;
		}
		var options = this.options;
		var twoStar = options.noglobstar ? star : options.dot ? twoStarDot : twoStarNoDot;
		var flags = options.nocase ? "i" : "";
		var re = set.map(function(pattern) {
			return pattern.map(function(p) {
				return p === GLOBSTAR ? twoStar : typeof p === "string" ? regExpEscape(p) : p._src;
			}).join("\\/");
		}).join("|");
		re = "^(?:" + re + ")$";
		if (this.negate) re = "^(?!" + re + ").*$";
		try {
			this.regexp = new RegExp(re, flags);
		} catch (ex) /* istanbul ignore next - should be impossible */ {
			this.regexp = false;
		}
		return this.regexp;
	}
	minimatch.match = function(list, pattern, options) {
		options = options || {};
		var mm = new Minimatch(pattern, options);
		list = list.filter(function(f) {
			return mm.match(f);
		});
		if (mm.options.nonull && !list.length) list.push(pattern);
		return list;
	};
	Minimatch.prototype.match = function match(f, partial) {
		if (typeof partial === "undefined") partial = this.partial;
		this.debug("match", f, this.pattern);
		if (this.comment) return false;
		if (this.empty) return f === "";
		if (f === "/" && partial) return true;
		var options = this.options;
		if (path$8.sep !== "/") f = f.split(path$8.sep).join("/");
		f = f.split(slashSplit);
		this.debug(this.pattern, "split", f);
		var set = this.set;
		this.debug(this.pattern, "set", set);
		var filename;
		var i = f.length - 1;
		for (; i >= 0; i--) {
			filename = f[i];
			if (filename) break;
		}
		for (i = 0; i < set.length; i++) {
			var pattern = set[i];
			var file = f;
			if (options.matchBase && pattern.length === 1) file = [filename];
			if (this.matchOne(file, pattern, partial)) {
				if (options.flipNegate) return true;
				return !this.negate;
			}
		}
		if (options.flipNegate) return false;
		return this.negate;
	};
	Minimatch.prototype.matchOne = function(file, pattern, partial) {
		if (pattern.indexOf(GLOBSTAR) !== -1) return this._matchGlobstar(file, pattern, partial, 0, 0);
		return this._matchOne(file, pattern, partial, 0, 0);
	};
	Minimatch.prototype._matchGlobstar = function(file, pattern, partial, fileIndex, patternIndex) {
		var i;
		var firstgs = -1;
		for (i = patternIndex; i < pattern.length; i++) if (pattern[i] === GLOBSTAR) {
			firstgs = i;
			break;
		}
		var lastgs = -1;
		for (i = pattern.length - 1; i >= 0; i--) if (pattern[i] === GLOBSTAR) {
			lastgs = i;
			break;
		}
		var head = pattern.slice(patternIndex, firstgs);
		var body = partial ? pattern.slice(firstgs + 1) : pattern.slice(firstgs + 1, lastgs);
		var tail = partial ? [] : pattern.slice(lastgs + 1);
		if (head.length) {
			var fileHead = file.slice(fileIndex, fileIndex + head.length);
			if (!this._matchOne(fileHead, head, partial, 0, 0)) return false;
			fileIndex += head.length;
		}
		var fileTailMatch = 0;
		if (tail.length) {
			if (tail.length + fileIndex > file.length) return false;
			var tailStart = file.length - tail.length;
			if (this._matchOne(file, tail, partial, tailStart, 0)) fileTailMatch = tail.length;
			else {
				if (file[file.length - 1] !== "" || fileIndex + tail.length === file.length) return false;
				tailStart--;
				if (!this._matchOne(file, tail, partial, tailStart, 0)) return false;
				fileTailMatch = tail.length + 1;
			}
		}
		if (!body.length) {
			var sawSome = !!fileTailMatch;
			for (i = fileIndex; i < file.length - fileTailMatch; i++) {
				var f = String(file[i]);
				sawSome = true;
				if (f === "." || f === ".." || !this.options.dot && f.charAt(0) === ".") return false;
			}
			return partial || sawSome;
		}
		var bodySegments = [[[], 0]];
		var currentBody = bodySegments[0];
		var nonGsParts = 0;
		var nonGsPartsSums = [0];
		for (var bi = 0; bi < body.length; bi++) {
			var b = body[bi];
			if (b === GLOBSTAR) {
				nonGsPartsSums.push(nonGsParts);
				currentBody = [[], 0];
				bodySegments.push(currentBody);
			} else {
				currentBody[0].push(b);
				nonGsParts++;
			}
		}
		var idx = bodySegments.length - 1;
		var fileLength = file.length - fileTailMatch;
		for (var si = 0; si < bodySegments.length; si++) bodySegments[si][1] = fileLength - (nonGsPartsSums[idx--] + bodySegments[si][0].length);
		return !!this._matchGlobStarBodySections(file, bodySegments, fileIndex, 0, partial, 0, !!fileTailMatch);
	};
	Minimatch.prototype._matchGlobStarBodySections = function(file, bodySegments, fileIndex, bodyIndex, partial, globStarDepth, sawTail) {
		var bs = bodySegments[bodyIndex];
		if (!bs) {
			for (var i = fileIndex; i < file.length; i++) {
				sawTail = true;
				var f = file[i];
				if (f === "." || f === ".." || !this.options.dot && f.charAt(0) === ".") return false;
			}
			return sawTail;
		}
		var body = bs[0];
		var after = bs[1];
		while (fileIndex <= after) {
			if (this._matchOne(file.slice(0, fileIndex + body.length), body, partial, fileIndex, 0) && globStarDepth < this.maxGlobstarRecursion) {
				var sub = this._matchGlobStarBodySections(file, bodySegments, fileIndex + body.length, bodyIndex + 1, partial, globStarDepth + 1, sawTail);
				if (sub !== false) return sub;
			}
			var f = file[fileIndex];
			if (f === "." || f === ".." || !this.options.dot && f.charAt(0) === ".") return false;
			fileIndex++;
		}
		return partial || null;
	};
	Minimatch.prototype._matchOne = function(file, pattern, partial, fileIndex, patternIndex) {
		var fi = fileIndex, pi = patternIndex, fl = file.length, pl = pattern.length;
		for (; fi < fl && pi < pl; fi++, pi++) {
			this.debug("matchOne loop");
			var p = pattern[pi];
			var f = file[fi];
			this.debug(pattern, p, f);
			/* istanbul ignore if */
			if (p === false || p === GLOBSTAR) return false;
			var hit;
			if (typeof p === "string") {
				hit = f === p;
				this.debug("string match", p, f, hit);
			} else {
				hit = f.match(p);
				this.debug("pattern match", p, f, hit);
			}
			if (!hit) return false;
		}
		if (fi === fl && pi === pl) return true;
		else if (fi === fl) return partial;
		else if (pi === pl) return fi === fl - 1 && file[fi] === "";
		/* istanbul ignore next */
		throw new Error("wtf?");
	};
	function globUnescape(s) {
		return s.replace(/\\(.)/g, "$1");
	}
	function regExpEscape(s) {
		return s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
	}
}));
//#endregion
//#region node_modules/path-is-absolute/index.js
var require_path_is_absolute = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function posix(path) {
		return path.charAt(0) === "/";
	}
	function win32(path) {
		var result = /^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?([\\\/])?([\s\S]*?)$/.exec(path);
		var device = result[1] || "";
		var isUnc = Boolean(device && device.charAt(1) !== ":");
		return Boolean(result[2] || isUnc);
	}
	module.exports = process.platform === "win32" ? win32 : posix;
	module.exports.posix = posix;
	module.exports.win32 = win32;
}));
//#endregion
//#region node_modules/glob/common.js
var require_common = /* @__PURE__ */ __commonJSMin(((exports) => {
	exports.setopts = setopts;
	exports.ownProp = ownProp;
	exports.makeAbs = makeAbs;
	exports.finish = finish;
	exports.mark = mark;
	exports.isIgnored = isIgnored;
	exports.childrenIgnored = childrenIgnored;
	function ownProp(obj, field) {
		return Object.prototype.hasOwnProperty.call(obj, field);
	}
	var fs$1 = __require("fs");
	var path$7 = __require("path");
	var minimatch = require_minimatch();
	var isAbsolute = require_path_is_absolute();
	var Minimatch = minimatch.Minimatch;
	function alphasort(a, b) {
		return a.localeCompare(b, "en");
	}
	function setupIgnores(self, options) {
		self.ignore = options.ignore || [];
		if (!Array.isArray(self.ignore)) self.ignore = [self.ignore];
		if (self.ignore.length) self.ignore = self.ignore.map(ignoreMap);
	}
	function ignoreMap(pattern) {
		var gmatcher = null;
		if (pattern.slice(-3) === "/**") gmatcher = new Minimatch(pattern.replace(/(\/\*\*)+$/, ""), { dot: true });
		return {
			matcher: new Minimatch(pattern, { dot: true }),
			gmatcher
		};
	}
	function setopts(self, pattern, options) {
		if (!options) options = {};
		if (options.matchBase && -1 === pattern.indexOf("/")) {
			if (options.noglobstar) throw new Error("base matching requires globstar");
			pattern = "**/" + pattern;
		}
		self.silent = !!options.silent;
		self.pattern = pattern;
		self.strict = options.strict !== false;
		self.realpath = !!options.realpath;
		self.realpathCache = options.realpathCache || Object.create(null);
		self.follow = !!options.follow;
		self.dot = !!options.dot;
		self.mark = !!options.mark;
		self.nodir = !!options.nodir;
		if (self.nodir) self.mark = true;
		self.sync = !!options.sync;
		self.nounique = !!options.nounique;
		self.nonull = !!options.nonull;
		self.nosort = !!options.nosort;
		self.nocase = !!options.nocase;
		self.stat = !!options.stat;
		self.noprocess = !!options.noprocess;
		self.absolute = !!options.absolute;
		self.fs = options.fs || fs$1;
		self.maxLength = options.maxLength || Infinity;
		self.cache = options.cache || Object.create(null);
		self.statCache = options.statCache || Object.create(null);
		self.symlinks = options.symlinks || Object.create(null);
		setupIgnores(self, options);
		self.changedCwd = false;
		var cwd = process.cwd();
		if (!ownProp(options, "cwd")) self.cwd = cwd;
		else {
			self.cwd = path$7.resolve(options.cwd);
			self.changedCwd = self.cwd !== cwd;
		}
		self.root = options.root || path$7.resolve(self.cwd, "/");
		self.root = path$7.resolve(self.root);
		if (process.platform === "win32") self.root = self.root.replace(/\\/g, "/");
		self.cwdAbs = isAbsolute(self.cwd) ? self.cwd : makeAbs(self, self.cwd);
		if (process.platform === "win32") self.cwdAbs = self.cwdAbs.replace(/\\/g, "/");
		self.nomount = !!options.nomount;
		options.nonegate = true;
		options.nocomment = true;
		options.allowWindowsEscape = false;
		self.minimatch = new Minimatch(pattern, options);
		self.options = self.minimatch.options;
	}
	function finish(self) {
		var nou = self.nounique;
		var all = nou ? [] : Object.create(null);
		for (var i = 0, l = self.matches.length; i < l; i++) {
			var matches = self.matches[i];
			if (!matches || Object.keys(matches).length === 0) {
				if (self.nonull) {
					var literal = self.minimatch.globSet[i];
					if (nou) all.push(literal);
					else all[literal] = true;
				}
			} else {
				var m = Object.keys(matches);
				if (nou) all.push.apply(all, m);
				else m.forEach(function(m) {
					all[m] = true;
				});
			}
		}
		if (!nou) all = Object.keys(all);
		if (!self.nosort) all = all.sort(alphasort);
		if (self.mark) {
			for (var i = 0; i < all.length; i++) all[i] = self._mark(all[i]);
			if (self.nodir) all = all.filter(function(e) {
				var notDir = !/\/$/.test(e);
				var c = self.cache[e] || self.cache[makeAbs(self, e)];
				if (notDir && c) notDir = c !== "DIR" && !Array.isArray(c);
				return notDir;
			});
		}
		if (self.ignore.length) all = all.filter(function(m) {
			return !isIgnored(self, m);
		});
		self.found = all;
	}
	function mark(self, p) {
		var abs = makeAbs(self, p);
		var c = self.cache[abs];
		var m = p;
		if (c) {
			var isDir = c === "DIR" || Array.isArray(c);
			var slash = p.slice(-1) === "/";
			if (isDir && !slash) m += "/";
			else if (!isDir && slash) m = m.slice(0, -1);
			if (m !== p) {
				var mabs = makeAbs(self, m);
				self.statCache[mabs] = self.statCache[abs];
				self.cache[mabs] = self.cache[abs];
			}
		}
		return m;
	}
	function makeAbs(self, f) {
		var abs = f;
		if (f.charAt(0) === "/") abs = path$7.join(self.root, f);
		else if (isAbsolute(f) || f === "") abs = f;
		else if (self.changedCwd) abs = path$7.resolve(self.cwd, f);
		else abs = path$7.resolve(f);
		if (process.platform === "win32") abs = abs.replace(/\\/g, "/");
		return abs;
	}
	function isIgnored(self, path) {
		if (!self.ignore.length) return false;
		return self.ignore.some(function(item) {
			return item.matcher.match(path) || !!(item.gmatcher && item.gmatcher.match(path));
		});
	}
	function childrenIgnored(self, path) {
		if (!self.ignore.length) return false;
		return self.ignore.some(function(item) {
			return !!(item.gmatcher && item.gmatcher.match(path));
		});
	}
}));
//#endregion
//#region node_modules/glob/sync.js
var require_sync = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = globSync;
	globSync.GlobSync = GlobSync;
	var rp = require_fs_realpath();
	var minimatch = require_minimatch();
	minimatch.Minimatch;
	require_glob().Glob;
	__require("util");
	var path$6 = __require("path");
	var assert$1 = __require("assert");
	var isAbsolute = require_path_is_absolute();
	var common = require_common();
	var setopts = common.setopts;
	var ownProp = common.ownProp;
	var childrenIgnored = common.childrenIgnored;
	var isIgnored = common.isIgnored;
	function globSync(pattern, options) {
		if (typeof options === "function" || arguments.length === 3) throw new TypeError("callback provided to sync glob\nSee: https://github.com/isaacs/node-glob/issues/167");
		return new GlobSync(pattern, options).found;
	}
	function GlobSync(pattern, options) {
		if (!pattern) throw new Error("must provide pattern");
		if (typeof options === "function" || arguments.length === 3) throw new TypeError("callback provided to sync glob\nSee: https://github.com/isaacs/node-glob/issues/167");
		if (!(this instanceof GlobSync)) return new GlobSync(pattern, options);
		setopts(this, pattern, options);
		if (this.noprocess) return this;
		var n = this.minimatch.set.length;
		this.matches = new Array(n);
		for (var i = 0; i < n; i++) this._process(this.minimatch.set[i], i, false);
		this._finish();
	}
	GlobSync.prototype._finish = function() {
		assert$1.ok(this instanceof GlobSync);
		if (this.realpath) {
			var self = this;
			this.matches.forEach(function(matchset, index) {
				var set = self.matches[index] = Object.create(null);
				for (var p in matchset) try {
					p = self._makeAbs(p);
					var real = rp.realpathSync(p, self.realpathCache);
					set[real] = true;
				} catch (er) {
					if (er.syscall === "stat") set[self._makeAbs(p)] = true;
					else throw er;
				}
			});
		}
		common.finish(this);
	};
	GlobSync.prototype._process = function(pattern, index, inGlobStar) {
		assert$1.ok(this instanceof GlobSync);
		var n = 0;
		while (typeof pattern[n] === "string") n++;
		var prefix;
		switch (n) {
			case pattern.length:
				this._processSimple(pattern.join("/"), index);
				return;
			case 0:
				prefix = null;
				break;
			default: prefix = pattern.slice(0, n).join("/");
		}
		var remain = pattern.slice(n);
		var read;
		if (prefix === null) read = ".";
		else if (isAbsolute(prefix) || isAbsolute(pattern.map(function(p) {
			return typeof p === "string" ? p : "[*]";
		}).join("/"))) {
			if (!prefix || !isAbsolute(prefix)) prefix = "/" + prefix;
			read = prefix;
		} else read = prefix;
		var abs = this._makeAbs(read);
		if (childrenIgnored(this, read)) return;
		if (remain[0] === minimatch.GLOBSTAR) this._processGlobStar(prefix, read, abs, remain, index, inGlobStar);
		else this._processReaddir(prefix, read, abs, remain, index, inGlobStar);
	};
	GlobSync.prototype._processReaddir = function(prefix, read, abs, remain, index, inGlobStar) {
		var entries = this._readdir(abs, inGlobStar);
		if (!entries) return;
		var pn = remain[0];
		var negate = !!this.minimatch.negate;
		var rawGlob = pn._glob;
		var dotOk = this.dot || rawGlob.charAt(0) === ".";
		var matchedEntries = [];
		for (var i = 0; i < entries.length; i++) {
			var e = entries[i];
			if (e.charAt(0) !== "." || dotOk) {
				var m;
				if (negate && !prefix) m = !e.match(pn);
				else m = e.match(pn);
				if (m) matchedEntries.push(e);
			}
		}
		var len = matchedEntries.length;
		if (len === 0) return;
		if (remain.length === 1 && !this.mark && !this.stat) {
			if (!this.matches[index]) this.matches[index] = Object.create(null);
			for (var i = 0; i < len; i++) {
				var e = matchedEntries[i];
				if (prefix) {
					if (prefix.slice(-1) !== "/") e = prefix + "/" + e;
					else e = prefix + e;
				}
				if (e.charAt(0) === "/" && !this.nomount) e = path$6.join(this.root, e);
				this._emitMatch(index, e);
			}
			return;
		}
		remain.shift();
		for (var i = 0; i < len; i++) {
			var e = matchedEntries[i];
			var newPattern;
			if (prefix) newPattern = [prefix, e];
			else newPattern = [e];
			this._process(newPattern.concat(remain), index, inGlobStar);
		}
	};
	GlobSync.prototype._emitMatch = function(index, e) {
		if (isIgnored(this, e)) return;
		var abs = this._makeAbs(e);
		if (this.mark) e = this._mark(e);
		if (this.absolute) e = abs;
		if (this.matches[index][e]) return;
		if (this.nodir) {
			var c = this.cache[abs];
			if (c === "DIR" || Array.isArray(c)) return;
		}
		this.matches[index][e] = true;
		if (this.stat) this._stat(e);
	};
	GlobSync.prototype._readdirInGlobStar = function(abs) {
		if (this.follow) return this._readdir(abs, false);
		var entries;
		var lstat;
		try {
			lstat = this.fs.lstatSync(abs);
		} catch (er) {
			if (er.code === "ENOENT") return null;
		}
		var isSym = lstat && lstat.isSymbolicLink();
		this.symlinks[abs] = isSym;
		if (!isSym && lstat && !lstat.isDirectory()) this.cache[abs] = "FILE";
		else entries = this._readdir(abs, false);
		return entries;
	};
	GlobSync.prototype._readdir = function(abs, inGlobStar) {
		if (inGlobStar && !ownProp(this.symlinks, abs)) return this._readdirInGlobStar(abs);
		if (ownProp(this.cache, abs)) {
			var c = this.cache[abs];
			if (!c || c === "FILE") return null;
			if (Array.isArray(c)) return c;
		}
		try {
			return this._readdirEntries(abs, this.fs.readdirSync(abs));
		} catch (er) {
			this._readdirError(abs, er);
			return null;
		}
	};
	GlobSync.prototype._readdirEntries = function(abs, entries) {
		if (!this.mark && !this.stat) for (var i = 0; i < entries.length; i++) {
			var e = entries[i];
			if (abs === "/") e = abs + e;
			else e = abs + "/" + e;
			this.cache[e] = true;
		}
		this.cache[abs] = entries;
		return entries;
	};
	GlobSync.prototype._readdirError = function(f, er) {
		switch (er.code) {
			case "ENOTSUP":
			case "ENOTDIR":
				var abs = this._makeAbs(f);
				this.cache[abs] = "FILE";
				if (abs === this.cwdAbs) {
					var error = /* @__PURE__ */ new Error(er.code + " invalid cwd " + this.cwd);
					error.path = this.cwd;
					error.code = er.code;
					throw error;
				}
				break;
			case "ENOENT":
			case "ELOOP":
			case "ENAMETOOLONG":
			case "UNKNOWN":
				this.cache[this._makeAbs(f)] = false;
				break;
			default:
				this.cache[this._makeAbs(f)] = false;
				if (this.strict) throw er;
				if (!this.silent) console.error("glob error", er);
		}
	};
	GlobSync.prototype._processGlobStar = function(prefix, read, abs, remain, index, inGlobStar) {
		var entries = this._readdir(abs, inGlobStar);
		if (!entries) return;
		var remainWithoutGlobStar = remain.slice(1);
		var gspref = prefix ? [prefix] : [];
		var noGlobStar = gspref.concat(remainWithoutGlobStar);
		this._process(noGlobStar, index, false);
		var len = entries.length;
		if (this.symlinks[abs] && inGlobStar) return;
		for (var i = 0; i < len; i++) {
			if (entries[i].charAt(0) === "." && !this.dot) continue;
			var instead = gspref.concat(entries[i], remainWithoutGlobStar);
			this._process(instead, index, true);
			var below = gspref.concat(entries[i], remain);
			this._process(below, index, true);
		}
	};
	GlobSync.prototype._processSimple = function(prefix, index) {
		var exists = this._stat(prefix);
		if (!this.matches[index]) this.matches[index] = Object.create(null);
		if (!exists) return;
		if (prefix && isAbsolute(prefix) && !this.nomount) {
			var trail = /[\/\\]$/.test(prefix);
			if (prefix.charAt(0) === "/") prefix = path$6.join(this.root, prefix);
			else {
				prefix = path$6.resolve(this.root, prefix);
				if (trail) prefix += "/";
			}
		}
		if (process.platform === "win32") prefix = prefix.replace(/\\/g, "/");
		this._emitMatch(index, prefix);
	};
	GlobSync.prototype._stat = function(f) {
		var abs = this._makeAbs(f);
		var needDir = f.slice(-1) === "/";
		if (f.length > this.maxLength) return false;
		if (!this.stat && ownProp(this.cache, abs)) {
			var c = this.cache[abs];
			if (Array.isArray(c)) c = "DIR";
			if (!needDir || c === "DIR") return c;
			if (needDir && c === "FILE") return false;
		}
		var stat = this.statCache[abs];
		if (!stat) {
			var lstat;
			try {
				lstat = this.fs.lstatSync(abs);
			} catch (er) {
				if (er && (er.code === "ENOENT" || er.code === "ENOTDIR")) {
					this.statCache[abs] = false;
					return false;
				}
			}
			if (lstat && lstat.isSymbolicLink()) try {
				stat = this.fs.statSync(abs);
			} catch (er) {
				stat = lstat;
			}
			else stat = lstat;
		}
		this.statCache[abs] = stat;
		var c = true;
		if (stat) c = stat.isDirectory() ? "DIR" : "FILE";
		this.cache[abs] = this.cache[abs] || c;
		if (needDir && c === "FILE") return false;
		return c;
	};
	GlobSync.prototype._mark = function(p) {
		return common.mark(this, p);
	};
	GlobSync.prototype._makeAbs = function(f) {
		return common.makeAbs(this, f);
	};
}));
//#endregion
//#region node_modules/wrappy/wrappy.js
var require_wrappy = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = wrappy;
	function wrappy(fn, cb) {
		if (fn && cb) return wrappy(fn)(cb);
		if (typeof fn !== "function") throw new TypeError("need wrapper function");
		Object.keys(fn).forEach(function(k) {
			wrapper[k] = fn[k];
		});
		return wrapper;
		function wrapper() {
			var args = new Array(arguments.length);
			for (var i = 0; i < args.length; i++) args[i] = arguments[i];
			var ret = fn.apply(this, args);
			var cb = args[args.length - 1];
			if (typeof ret === "function" && ret !== cb) Object.keys(cb).forEach(function(k) {
				ret[k] = cb[k];
			});
			return ret;
		}
	}
}));
//#endregion
//#region node_modules/once/once.js
var require_once = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var wrappy = require_wrappy();
	module.exports = wrappy(once);
	module.exports.strict = wrappy(onceStrict);
	once.proto = once(function() {
		Object.defineProperty(Function.prototype, "once", {
			value: function() {
				return once(this);
			},
			configurable: true
		});
		Object.defineProperty(Function.prototype, "onceStrict", {
			value: function() {
				return onceStrict(this);
			},
			configurable: true
		});
	});
	function once(fn) {
		var f = function() {
			if (f.called) return f.value;
			f.called = true;
			return f.value = fn.apply(this, arguments);
		};
		f.called = false;
		return f;
	}
	function onceStrict(fn) {
		var f = function() {
			if (f.called) throw new Error(f.onceError);
			f.called = true;
			return f.value = fn.apply(this, arguments);
		};
		f.onceError = (fn.name || "Function wrapped with `once`") + " shouldn't be called more than once";
		f.called = false;
		return f;
	}
}));
//#endregion
//#region node_modules/inflight/inflight.js
var require_inflight = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var wrappy = require_wrappy();
	var reqs = Object.create(null);
	var once = require_once();
	module.exports = wrappy(inflight);
	function inflight(key, cb) {
		if (reqs[key]) {
			reqs[key].push(cb);
			return null;
		} else {
			reqs[key] = [cb];
			return makeres(key);
		}
	}
	function makeres(key) {
		return once(function RES() {
			var cbs = reqs[key];
			var len = cbs.length;
			var args = slice(arguments);
			try {
				for (var i = 0; i < len; i++) cbs[i].apply(null, args);
			} finally {
				if (cbs.length > len) {
					cbs.splice(0, len);
					process.nextTick(function() {
						RES.apply(null, args);
					});
				} else delete reqs[key];
			}
		});
	}
	function slice(args) {
		var length = args.length;
		var array = [];
		for (var i = 0; i < length; i++) array[i] = args[i];
		return array;
	}
}));
//#endregion
//#region node_modules/glob/glob.js
var require_glob = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = glob;
	var rp = require_fs_realpath();
	var minimatch = require_minimatch();
	minimatch.Minimatch;
	var inherits = require_inherits();
	var EE = __require("events").EventEmitter;
	var path$5 = __require("path");
	var assert = __require("assert");
	var isAbsolute = require_path_is_absolute();
	var globSync = require_sync();
	var common = require_common();
	var setopts = common.setopts;
	var ownProp = common.ownProp;
	var inflight = require_inflight();
	__require("util");
	var childrenIgnored = common.childrenIgnored;
	var isIgnored = common.isIgnored;
	var once = require_once();
	function glob(pattern, options, cb) {
		if (typeof options === "function") cb = options, options = {};
		if (!options) options = {};
		if (options.sync) {
			if (cb) throw new TypeError("callback provided to sync glob");
			return globSync(pattern, options);
		}
		return new Glob(pattern, options, cb);
	}
	glob.sync = globSync;
	var GlobSync = glob.GlobSync = globSync.GlobSync;
	glob.glob = glob;
	function extend(origin, add) {
		if (add === null || typeof add !== "object") return origin;
		var keys = Object.keys(add);
		var i = keys.length;
		while (i--) origin[keys[i]] = add[keys[i]];
		return origin;
	}
	glob.hasMagic = function(pattern, options_) {
		var options = extend({}, options_);
		options.noprocess = true;
		var set = new Glob(pattern, options).minimatch.set;
		if (!pattern) return false;
		if (set.length > 1) return true;
		for (var j = 0; j < set[0].length; j++) if (typeof set[0][j] !== "string") return true;
		return false;
	};
	glob.Glob = Glob;
	inherits(Glob, EE);
	function Glob(pattern, options, cb) {
		if (typeof options === "function") {
			cb = options;
			options = null;
		}
		if (options && options.sync) {
			if (cb) throw new TypeError("callback provided to sync glob");
			return new GlobSync(pattern, options);
		}
		if (!(this instanceof Glob)) return new Glob(pattern, options, cb);
		setopts(this, pattern, options);
		this._didRealPath = false;
		var n = this.minimatch.set.length;
		this.matches = new Array(n);
		if (typeof cb === "function") {
			cb = once(cb);
			this.on("error", cb);
			this.on("end", function(matches) {
				cb(null, matches);
			});
		}
		var self = this;
		this._processing = 0;
		this._emitQueue = [];
		this._processQueue = [];
		this.paused = false;
		if (this.noprocess) return this;
		if (n === 0) return done();
		var sync = true;
		for (var i = 0; i < n; i++) this._process(this.minimatch.set[i], i, false, done);
		sync = false;
		function done() {
			--self._processing;
			if (self._processing <= 0) {
				if (sync) process.nextTick(function() {
					self._finish();
				});
				else self._finish();
			}
		}
	}
	Glob.prototype._finish = function() {
		assert(this instanceof Glob);
		if (this.aborted) return;
		if (this.realpath && !this._didRealpath) return this._realpath();
		common.finish(this);
		this.emit("end", this.found);
	};
	Glob.prototype._realpath = function() {
		if (this._didRealpath) return;
		this._didRealpath = true;
		var n = this.matches.length;
		if (n === 0) return this._finish();
		var self = this;
		for (var i = 0; i < this.matches.length; i++) this._realpathSet(i, next);
		function next() {
			if (--n === 0) self._finish();
		}
	};
	Glob.prototype._realpathSet = function(index, cb) {
		var matchset = this.matches[index];
		if (!matchset) return cb();
		var found = Object.keys(matchset);
		var self = this;
		var n = found.length;
		if (n === 0) return cb();
		var set = this.matches[index] = Object.create(null);
		found.forEach(function(p, i) {
			p = self._makeAbs(p);
			rp.realpath(p, self.realpathCache, function(er, real) {
				if (!er) set[real] = true;
				else if (er.syscall === "stat") set[p] = true;
				else self.emit("error", er);
				if (--n === 0) {
					self.matches[index] = set;
					cb();
				}
			});
		});
	};
	Glob.prototype._mark = function(p) {
		return common.mark(this, p);
	};
	Glob.prototype._makeAbs = function(f) {
		return common.makeAbs(this, f);
	};
	Glob.prototype.abort = function() {
		this.aborted = true;
		this.emit("abort");
	};
	Glob.prototype.pause = function() {
		if (!this.paused) {
			this.paused = true;
			this.emit("pause");
		}
	};
	Glob.prototype.resume = function() {
		if (this.paused) {
			this.emit("resume");
			this.paused = false;
			if (this._emitQueue.length) {
				var eq = this._emitQueue.slice(0);
				this._emitQueue.length = 0;
				for (var i = 0; i < eq.length; i++) {
					var e = eq[i];
					this._emitMatch(e[0], e[1]);
				}
			}
			if (this._processQueue.length) {
				var pq = this._processQueue.slice(0);
				this._processQueue.length = 0;
				for (var i = 0; i < pq.length; i++) {
					var p = pq[i];
					this._processing--;
					this._process(p[0], p[1], p[2], p[3]);
				}
			}
		}
	};
	Glob.prototype._process = function(pattern, index, inGlobStar, cb) {
		assert(this instanceof Glob);
		assert(typeof cb === "function");
		if (this.aborted) return;
		this._processing++;
		if (this.paused) {
			this._processQueue.push([
				pattern,
				index,
				inGlobStar,
				cb
			]);
			return;
		}
		var n = 0;
		while (typeof pattern[n] === "string") n++;
		var prefix;
		switch (n) {
			case pattern.length:
				this._processSimple(pattern.join("/"), index, cb);
				return;
			case 0:
				prefix = null;
				break;
			default: prefix = pattern.slice(0, n).join("/");
		}
		var remain = pattern.slice(n);
		var read;
		if (prefix === null) read = ".";
		else if (isAbsolute(prefix) || isAbsolute(pattern.map(function(p) {
			return typeof p === "string" ? p : "[*]";
		}).join("/"))) {
			if (!prefix || !isAbsolute(prefix)) prefix = "/" + prefix;
			read = prefix;
		} else read = prefix;
		var abs = this._makeAbs(read);
		if (childrenIgnored(this, read)) return cb();
		if (remain[0] === minimatch.GLOBSTAR) this._processGlobStar(prefix, read, abs, remain, index, inGlobStar, cb);
		else this._processReaddir(prefix, read, abs, remain, index, inGlobStar, cb);
	};
	Glob.prototype._processReaddir = function(prefix, read, abs, remain, index, inGlobStar, cb) {
		var self = this;
		this._readdir(abs, inGlobStar, function(er, entries) {
			return self._processReaddir2(prefix, read, abs, remain, index, inGlobStar, entries, cb);
		});
	};
	Glob.prototype._processReaddir2 = function(prefix, read, abs, remain, index, inGlobStar, entries, cb) {
		if (!entries) return cb();
		var pn = remain[0];
		var negate = !!this.minimatch.negate;
		var rawGlob = pn._glob;
		var dotOk = this.dot || rawGlob.charAt(0) === ".";
		var matchedEntries = [];
		for (var i = 0; i < entries.length; i++) {
			var e = entries[i];
			if (e.charAt(0) !== "." || dotOk) {
				var m;
				if (negate && !prefix) m = !e.match(pn);
				else m = e.match(pn);
				if (m) matchedEntries.push(e);
			}
		}
		var len = matchedEntries.length;
		if (len === 0) return cb();
		if (remain.length === 1 && !this.mark && !this.stat) {
			if (!this.matches[index]) this.matches[index] = Object.create(null);
			for (var i = 0; i < len; i++) {
				var e = matchedEntries[i];
				if (prefix) {
					if (prefix !== "/") e = prefix + "/" + e;
					else e = prefix + e;
				}
				if (e.charAt(0) === "/" && !this.nomount) e = path$5.join(this.root, e);
				this._emitMatch(index, e);
			}
			return cb();
		}
		remain.shift();
		for (var i = 0; i < len; i++) {
			var e = matchedEntries[i];
			if (prefix) {
				if (prefix !== "/") e = prefix + "/" + e;
				else e = prefix + e;
			}
			this._process([e].concat(remain), index, inGlobStar, cb);
		}
		cb();
	};
	Glob.prototype._emitMatch = function(index, e) {
		if (this.aborted) return;
		if (isIgnored(this, e)) return;
		if (this.paused) {
			this._emitQueue.push([index, e]);
			return;
		}
		var abs = isAbsolute(e) ? e : this._makeAbs(e);
		if (this.mark) e = this._mark(e);
		if (this.absolute) e = abs;
		if (this.matches[index][e]) return;
		if (this.nodir) {
			var c = this.cache[abs];
			if (c === "DIR" || Array.isArray(c)) return;
		}
		this.matches[index][e] = true;
		var st = this.statCache[abs];
		if (st) this.emit("stat", e, st);
		this.emit("match", e);
	};
	Glob.prototype._readdirInGlobStar = function(abs, cb) {
		if (this.aborted) return;
		if (this.follow) return this._readdir(abs, false, cb);
		var lstatkey = "lstat\0" + abs;
		var self = this;
		var lstatcb = inflight(lstatkey, lstatcb_);
		if (lstatcb) self.fs.lstat(abs, lstatcb);
		function lstatcb_(er, lstat) {
			if (er && er.code === "ENOENT") return cb();
			var isSym = lstat && lstat.isSymbolicLink();
			self.symlinks[abs] = isSym;
			if (!isSym && lstat && !lstat.isDirectory()) {
				self.cache[abs] = "FILE";
				cb();
			} else self._readdir(abs, false, cb);
		}
	};
	Glob.prototype._readdir = function(abs, inGlobStar, cb) {
		if (this.aborted) return;
		cb = inflight("readdir\0" + abs + "\0" + inGlobStar, cb);
		if (!cb) return;
		if (inGlobStar && !ownProp(this.symlinks, abs)) return this._readdirInGlobStar(abs, cb);
		if (ownProp(this.cache, abs)) {
			var c = this.cache[abs];
			if (!c || c === "FILE") return cb();
			if (Array.isArray(c)) return cb(null, c);
		}
		this.fs.readdir(abs, readdirCb(this, abs, cb));
	};
	function readdirCb(self, abs, cb) {
		return function(er, entries) {
			if (er) self._readdirError(abs, er, cb);
			else self._readdirEntries(abs, entries, cb);
		};
	}
	Glob.prototype._readdirEntries = function(abs, entries, cb) {
		if (this.aborted) return;
		if (!this.mark && !this.stat) for (var i = 0; i < entries.length; i++) {
			var e = entries[i];
			if (abs === "/") e = abs + e;
			else e = abs + "/" + e;
			this.cache[e] = true;
		}
		this.cache[abs] = entries;
		return cb(null, entries);
	};
	Glob.prototype._readdirError = function(f, er, cb) {
		if (this.aborted) return;
		switch (er.code) {
			case "ENOTSUP":
			case "ENOTDIR":
				var abs = this._makeAbs(f);
				this.cache[abs] = "FILE";
				if (abs === this.cwdAbs) {
					var error = /* @__PURE__ */ new Error(er.code + " invalid cwd " + this.cwd);
					error.path = this.cwd;
					error.code = er.code;
					this.emit("error", error);
					this.abort();
				}
				break;
			case "ENOENT":
			case "ELOOP":
			case "ENAMETOOLONG":
			case "UNKNOWN":
				this.cache[this._makeAbs(f)] = false;
				break;
			default:
				this.cache[this._makeAbs(f)] = false;
				if (this.strict) {
					this.emit("error", er);
					this.abort();
				}
				if (!this.silent) console.error("glob error", er);
		}
		return cb();
	};
	Glob.prototype._processGlobStar = function(prefix, read, abs, remain, index, inGlobStar, cb) {
		var self = this;
		this._readdir(abs, inGlobStar, function(er, entries) {
			self._processGlobStar2(prefix, read, abs, remain, index, inGlobStar, entries, cb);
		});
	};
	Glob.prototype._processGlobStar2 = function(prefix, read, abs, remain, index, inGlobStar, entries, cb) {
		if (!entries) return cb();
		var remainWithoutGlobStar = remain.slice(1);
		var gspref = prefix ? [prefix] : [];
		var noGlobStar = gspref.concat(remainWithoutGlobStar);
		this._process(noGlobStar, index, false, cb);
		var isSym = this.symlinks[abs];
		var len = entries.length;
		if (isSym && inGlobStar) return cb();
		for (var i = 0; i < len; i++) {
			if (entries[i].charAt(0) === "." && !this.dot) continue;
			var instead = gspref.concat(entries[i], remainWithoutGlobStar);
			this._process(instead, index, true, cb);
			var below = gspref.concat(entries[i], remain);
			this._process(below, index, true, cb);
		}
		cb();
	};
	Glob.prototype._processSimple = function(prefix, index, cb) {
		var self = this;
		this._stat(prefix, function(er, exists) {
			self._processSimple2(prefix, index, er, exists, cb);
		});
	};
	Glob.prototype._processSimple2 = function(prefix, index, er, exists, cb) {
		if (!this.matches[index]) this.matches[index] = Object.create(null);
		if (!exists) return cb();
		if (prefix && isAbsolute(prefix) && !this.nomount) {
			var trail = /[\/\\]$/.test(prefix);
			if (prefix.charAt(0) === "/") prefix = path$5.join(this.root, prefix);
			else {
				prefix = path$5.resolve(this.root, prefix);
				if (trail) prefix += "/";
			}
		}
		if (process.platform === "win32") prefix = prefix.replace(/\\/g, "/");
		this._emitMatch(index, prefix);
		cb();
	};
	Glob.prototype._stat = function(f, cb) {
		var abs = this._makeAbs(f);
		var needDir = f.slice(-1) === "/";
		if (f.length > this.maxLength) return cb();
		if (!this.stat && ownProp(this.cache, abs)) {
			var c = this.cache[abs];
			if (Array.isArray(c)) c = "DIR";
			if (!needDir || c === "DIR") return cb(null, c);
			if (needDir && c === "FILE") return cb();
		}
		var stat = this.statCache[abs];
		if (stat !== void 0) {
			if (stat === false) return cb(null, stat);
			else {
				var type = stat.isDirectory() ? "DIR" : "FILE";
				if (needDir && type === "FILE") return cb();
				else return cb(null, type, stat);
			}
		}
		var self = this;
		var statcb = inflight("stat\0" + abs, lstatcb_);
		if (statcb) self.fs.lstat(abs, statcb);
		function lstatcb_(er, lstat) {
			if (lstat && lstat.isSymbolicLink()) return self.fs.stat(abs, function(er, stat) {
				if (er) self._stat2(f, abs, null, lstat, cb);
				else self._stat2(f, abs, er, stat, cb);
			});
			else self._stat2(f, abs, er, lstat, cb);
		}
	};
	Glob.prototype._stat2 = function(f, abs, er, stat, cb) {
		if (er && (er.code === "ENOENT" || er.code === "ENOTDIR")) {
			this.statCache[abs] = false;
			return cb();
		}
		var needDir = f.slice(-1) === "/";
		this.statCache[abs] = stat;
		if (abs.slice(-1) === "/" && stat && !stat.isDirectory()) return cb(null, false, stat);
		var c = true;
		if (stat) c = stat.isDirectory() ? "DIR" : "FILE";
		this.cache[abs] = this.cache[abs] || c;
		if (needDir && c === "FILE") return cb();
		return cb(null, c, stat);
	};
}));
//#endregion
//#region node_modules/archiver-utils/file.js
var require_file$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* archiver-utils
	*
	* Copyright (c) 2012-2014 Chris Talkington, contributors.
	* Licensed under the MIT license.
	* https://github.com/archiverjs/node-archiver/blob/master/LICENSE-MIT
	*/
	var fs = require_graceful_fs();
	var path$4 = __require("path");
	var flatten = require_lodash_flatten();
	var difference = require_lodash_difference();
	var union = require_lodash_union();
	var isPlainObject = require_lodash_isplainobject();
	var glob = require_glob();
	var file = module.exports = {};
	var pathSeparatorRe = /[\/\\]/g;
	var processPatterns = function(patterns, fn) {
		var result = [];
		flatten(patterns).forEach(function(pattern) {
			var exclusion = pattern.indexOf("!") === 0;
			if (exclusion) pattern = pattern.slice(1);
			var matches = fn(pattern);
			if (exclusion) result = difference(result, matches);
			else result = union(result, matches);
		});
		return result;
	};
	file.exists = function() {
		var filepath = path$4.join.apply(path$4, arguments);
		return fs.existsSync(filepath);
	};
	file.expand = function(...args) {
		var options = isPlainObject(args[0]) ? args.shift() : {};
		var patterns = Array.isArray(args[0]) ? args[0] : args;
		if (patterns.length === 0) return [];
		var matches = processPatterns(patterns, function(pattern) {
			return glob.sync(pattern, options);
		});
		if (options.filter) matches = matches.filter(function(filepath) {
			filepath = path$4.join(options.cwd || "", filepath);
			try {
				if (typeof options.filter === "function") return options.filter(filepath);
				else return fs.statSync(filepath)[options.filter]();
			} catch (e) {
				return false;
			}
		});
		return matches;
	};
	file.expandMapping = function(patterns, destBase, options) {
		options = Object.assign({ rename: function(destBase, destPath) {
			return path$4.join(destBase || "", destPath);
		} }, options);
		var files = [];
		var fileByDest = {};
		file.expand(options, patterns).forEach(function(src) {
			var destPath = src;
			if (options.flatten) destPath = path$4.basename(destPath);
			if (options.ext) destPath = destPath.replace(/(\.[^\/]*)?$/, options.ext);
			var dest = options.rename(destBase, destPath, options);
			if (options.cwd) src = path$4.join(options.cwd, src);
			dest = dest.replace(pathSeparatorRe, "/");
			src = src.replace(pathSeparatorRe, "/");
			if (fileByDest[dest]) fileByDest[dest].src.push(src);
			else {
				files.push({
					src: [src],
					dest
				});
				fileByDest[dest] = files[files.length - 1];
			}
		});
		return files;
	};
	file.normalizeFilesArray = function(data) {
		var files = [];
		data.forEach(function(obj) {
			if ("src" in obj || "dest" in obj) files.push(obj);
		});
		if (files.length === 0) return [];
		files = _(files).chain().forEach(function(obj) {
			if (!("src" in obj) || !obj.src) return;
			if (Array.isArray(obj.src)) obj.src = flatten(obj.src);
			else obj.src = [obj.src];
		}).map(function(obj) {
			var expandOptions = Object.assign({}, obj);
			delete expandOptions.src;
			delete expandOptions.dest;
			if (obj.expand) return file.expandMapping(obj.src, obj.dest, expandOptions).map(function(mapObj) {
				var result = Object.assign({}, obj);
				result.orig = Object.assign({}, obj);
				result.src = mapObj.src;
				result.dest = mapObj.dest;
				[
					"expand",
					"cwd",
					"flatten",
					"rename",
					"ext"
				].forEach(function(prop) {
					delete result[prop];
				});
				return result;
			});
			var result = Object.assign({}, obj);
			result.orig = Object.assign({}, obj);
			if ("src" in result) Object.defineProperty(result, "src", {
				enumerable: true,
				get: function fn() {
					var src;
					if (!("result" in fn)) {
						src = obj.src;
						src = Array.isArray(src) ? flatten(src) : [src];
						fn.result = file.expand(expandOptions, src);
					}
					return fn.result;
				}
			});
			if ("dest" in result) result.dest = obj.dest;
			return result;
		}).flatten().value();
		return files;
	};
}));
//#endregion
//#region node_modules/archiver-utils/index.js
var require_archiver_utils$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* archiver-utils
	*
	* Copyright (c) 2015 Chris Talkington.
	* Licensed under the MIT license.
	* https://github.com/archiverjs/archiver-utils/blob/master/LICENSE
	*/
	var fs = require_graceful_fs();
	var path$3 = __require("path");
	__require("util");
	var lazystream = require_lazystream();
	var normalizePath = require_normalize_path();
	var defaults = require_lodash_defaults();
	var Stream$2 = __require("stream").Stream;
	var PassThrough = require_readable().PassThrough;
	var utils = module.exports = {};
	utils.file = require_file$1();
	utils.collectStream = function(source, callback) {
		var collection = [];
		var size = 0;
		source.on("error", callback);
		source.on("data", function(chunk) {
			collection.push(chunk);
			size += chunk.length;
		});
		source.on("end", function() {
			var buf = new Buffer(size);
			var offset = 0;
			collection.forEach(function(data) {
				data.copy(buf, offset);
				offset += data.length;
			});
			callback(null, buf);
		});
	};
	utils.dateify = function(dateish) {
		dateish = dateish || /* @__PURE__ */ new Date();
		if (dateish instanceof Date) dateish = dateish;
		else if (typeof dateish === "string") dateish = new Date(dateish);
		else dateish = /* @__PURE__ */ new Date();
		return dateish;
	};
	utils.defaults = function(object, source, guard) {
		var args = arguments;
		args[0] = args[0] || {};
		return defaults(...args);
	};
	utils.isStream = function(source) {
		return source instanceof Stream$2;
	};
	utils.lazyReadStream = function(filepath) {
		return new lazystream.Readable(function() {
			return fs.createReadStream(filepath);
		});
	};
	utils.normalizeInputSource = function(source) {
		if (source === null) return new Buffer(0);
		else if (typeof source === "string") return new Buffer(source);
		else if (utils.isStream(source) && !source._readableState) {
			var normalized = new PassThrough();
			source.pipe(normalized);
			return normalized;
		}
		return source;
	};
	utils.sanitizePath = function(filepath) {
		return normalizePath(filepath, false).replace(/^\w+:/, "").replace(/^(\.\.\/|\/)+/, "");
	};
	utils.trailingSlashIt = function(str) {
		return str.slice(-1) !== "/" ? str + "/" : str;
	};
	utils.unixifyPath = function(filepath) {
		return normalizePath(filepath, false).replace(/^\w+:/, "");
	};
	utils.walkdir = function(dirpath, base, callback) {
		var results = [];
		if (typeof base === "function") {
			callback = base;
			base = dirpath;
		}
		fs.readdir(dirpath, function(err, list) {
			var i = 0;
			var file;
			var filepath;
			if (err) return callback(err);
			(function next() {
				file = list[i++];
				if (!file) return callback(null, results);
				filepath = path$3.join(dirpath, file);
				fs.stat(filepath, function(err, stats) {
					results.push({
						path: filepath,
						relative: path$3.relative(base, filepath).replace(/\\/g, "/"),
						stats
					});
					if (stats && stats.isDirectory()) utils.walkdir(filepath, base, function(err, res) {
						res.forEach(function(dirEntry) {
							results.push(dirEntry);
						});
						next();
					});
					else next();
				});
			})();
		});
	};
}));
//#endregion
//#region node_modules/archiver/lib/error.js
var require_error = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* Archiver Core
	*
	* @ignore
	* @license [MIT]{@link https://github.com/archiverjs/node-archiver/blob/master/LICENSE}
	* @copyright (c) 2012-2014 Chris Talkington, contributors.
	*/
	var util$1 = __require("util");
	var ERROR_CODES = {
		"ABORTED": "archive was aborted",
		"DIRECTORYDIRPATHREQUIRED": "diretory dirpath argument must be a non-empty string value",
		"DIRECTORYFUNCTIONINVALIDDATA": "invalid data returned by directory custom data function",
		"ENTRYNAMEREQUIRED": "entry name must be a non-empty string value",
		"FILEFILEPATHREQUIRED": "file filepath argument must be a non-empty string value",
		"FINALIZING": "archive already finalizing",
		"QUEUECLOSED": "queue closed",
		"NOENDMETHOD": "no suitable finalize/end method defined by module",
		"DIRECTORYNOTSUPPORTED": "support for directory entries not defined by module",
		"FORMATSET": "archive format already set",
		"INPUTSTEAMBUFFERREQUIRED": "input source must be valid Stream or Buffer instance",
		"MODULESET": "module already set",
		"SYMLINKNOTSUPPORTED": "support for symlink entries not defined by module",
		"SYMLINKFILEPATHREQUIRED": "symlink filepath argument must be a non-empty string value",
		"SYMLINKTARGETREQUIRED": "symlink target argument must be a non-empty string value",
		"ENTRYNOTSUPPORTED": "entry not supported"
	};
	function ArchiverError(code, data) {
		Error.captureStackTrace(this, this.constructor);
		this.message = ERROR_CODES[code] || code;
		this.code = code;
		this.data = data;
	}
	util$1.inherits(ArchiverError, Error);
	exports = module.exports = ArchiverError;
}));
//#endregion
//#region node_modules/archiver/lib/core.js
var require_core = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* Archiver Core
	*
	* @ignore
	* @license [MIT]{@link https://github.com/archiverjs/node-archiver/blob/master/LICENSE}
	* @copyright (c) 2012-2014 Chris Talkington, contributors.
	*/
	var fs = __require("fs");
	var glob = require_readdir_glob();
	var async = (init_async(), __toCommonJS(async_exports));
	var path$2 = __require("path");
	var util = require_archiver_utils$1();
	var inherits$5 = __require("util").inherits;
	var ArchiverError = require_error();
	var Transform = require_readable$2().Transform;
	var win32 = process.platform === "win32";
	/**
	* @constructor
	* @param {String} format The archive format to use.
	* @param {(CoreOptions|TransformOptions)} options See also {@link ZipOptions} and {@link TarOptions}.
	*/
	var Archiver = function(format, options) {
		if (!(this instanceof Archiver)) return new Archiver(format, options);
		if (typeof format !== "string") {
			options = format;
			format = "zip";
		}
		options = this.options = util.defaults(options, {
			highWaterMark: 1048576,
			statConcurrency: 4
		});
		Transform.call(this, options);
		this._format = false;
		this._module = false;
		this._pending = 0;
		this._pointer = 0;
		this._entriesCount = 0;
		this._entriesProcessedCount = 0;
		this._fsEntriesTotalBytes = 0;
		this._fsEntriesProcessedBytes = 0;
		this._queue = async.queue(this._onQueueTask.bind(this), 1);
		this._queue.drain(this._onQueueDrain.bind(this));
		this._statQueue = async.queue(this._onStatQueueTask.bind(this), options.statConcurrency);
		this._statQueue.drain(this._onQueueDrain.bind(this));
		this._state = {
			aborted: false,
			finalize: false,
			finalizing: false,
			finalized: false,
			modulePiped: false
		};
		this._streams = [];
	};
	inherits$5(Archiver, Transform);
	/**
	* Internal logic for `abort`.
	*
	* @private
	* @return void
	*/
	Archiver.prototype._abort = function() {
		this._state.aborted = true;
		this._queue.kill();
		this._statQueue.kill();
		if (this._queue.idle()) this._shutdown();
	};
	/**
	* Internal helper for appending files.
	*
	* @private
	* @param  {String} filepath The source filepath.
	* @param  {EntryData} data The entry data.
	* @return void
	*/
	Archiver.prototype._append = function(filepath, data) {
		data = data || {};
		var task = {
			source: null,
			filepath
		};
		if (!data.name) data.name = filepath;
		data.sourcePath = filepath;
		task.data = data;
		this._entriesCount++;
		if (data.stats && data.stats instanceof fs.Stats) {
			task = this._updateQueueTaskWithStats(task, data.stats);
			if (task) {
				if (data.stats.size) this._fsEntriesTotalBytes += data.stats.size;
				this._queue.push(task);
			}
		} else this._statQueue.push(task);
	};
	/**
	* Internal logic for `finalize`.
	*
	* @private
	* @return void
	*/
	Archiver.prototype._finalize = function() {
		if (this._state.finalizing || this._state.finalized || this._state.aborted) return;
		this._state.finalizing = true;
		this._moduleFinalize();
		this._state.finalizing = false;
		this._state.finalized = true;
	};
	/**
	* Checks the various state variables to determine if we can `finalize`.
	*
	* @private
	* @return {Boolean}
	*/
	Archiver.prototype._maybeFinalize = function() {
		if (this._state.finalizing || this._state.finalized || this._state.aborted) return false;
		if (this._state.finalize && this._pending === 0 && this._queue.idle() && this._statQueue.idle()) {
			this._finalize();
			return true;
		}
		return false;
	};
	/**
	* Appends an entry to the module.
	*
	* @private
	* @fires  Archiver#entry
	* @param  {(Buffer|Stream)} source
	* @param  {EntryData} data
	* @param  {Function} callback
	* @return void
	*/
	Archiver.prototype._moduleAppend = function(source, data, callback) {
		if (this._state.aborted) {
			callback();
			return;
		}
		this._module.append(source, data, function(err) {
			this._task = null;
			if (this._state.aborted) {
				this._shutdown();
				return;
			}
			if (err) {
				this.emit("error", err);
				setImmediate(callback);
				return;
			}
			/**
			* Fires when the entry's input has been processed and appended to the archive.
			*
			* @event Archiver#entry
			* @type {EntryData}
			*/
			this.emit("entry", data);
			this._entriesProcessedCount++;
			if (data.stats && data.stats.size) this._fsEntriesProcessedBytes += data.stats.size;
			/**
			* @event Archiver#progress
			* @type {ProgressData}
			*/
			this.emit("progress", {
				entries: {
					total: this._entriesCount,
					processed: this._entriesProcessedCount
				},
				fs: {
					totalBytes: this._fsEntriesTotalBytes,
					processedBytes: this._fsEntriesProcessedBytes
				}
			});
			setImmediate(callback);
		}.bind(this));
	};
	/**
	* Finalizes the module.
	*
	* @private
	* @return void
	*/
	Archiver.prototype._moduleFinalize = function() {
		if (typeof this._module.finalize === "function") this._module.finalize();
		else if (typeof this._module.end === "function") this._module.end();
		else this.emit("error", new ArchiverError("NOENDMETHOD"));
	};
	/**
	* Pipes the module to our internal stream with error bubbling.
	*
	* @private
	* @return void
	*/
	Archiver.prototype._modulePipe = function() {
		this._module.on("error", this._onModuleError.bind(this));
		this._module.pipe(this);
		this._state.modulePiped = true;
	};
	/**
	* Determines if the current module supports a defined feature.
	*
	* @private
	* @param  {String} key
	* @return {Boolean}
	*/
	Archiver.prototype._moduleSupports = function(key) {
		if (!this._module.supports || !this._module.supports[key]) return false;
		return this._module.supports[key];
	};
	/**
	* Unpipes the module from our internal stream.
	*
	* @private
	* @return void
	*/
	Archiver.prototype._moduleUnpipe = function() {
		this._module.unpipe(this);
		this._state.modulePiped = false;
	};
	/**
	* Normalizes entry data with fallbacks for key properties.
	*
	* @private
	* @param  {Object} data
	* @param  {fs.Stats} stats
	* @return {Object}
	*/
	Archiver.prototype._normalizeEntryData = function(data, stats) {
		data = util.defaults(data, {
			type: "file",
			name: null,
			date: null,
			mode: null,
			prefix: null,
			sourcePath: null,
			stats: false
		});
		if (stats && data.stats === false) data.stats = stats;
		var isDir = data.type === "directory";
		if (data.name) {
			if (typeof data.prefix === "string" && "" !== data.prefix) {
				data.name = data.prefix + "/" + data.name;
				data.prefix = null;
			}
			data.name = util.sanitizePath(data.name);
			if (data.type !== "symlink" && data.name.slice(-1) === "/") {
				isDir = true;
				data.type = "directory";
			} else if (isDir) data.name += "/";
		}
		if (typeof data.mode === "number") {
			if (win32) data.mode &= 511;
			else data.mode &= 4095;
		} else if (data.stats && data.mode === null) {
			if (win32) data.mode = data.stats.mode & 511;
			else data.mode = data.stats.mode & 4095;
			if (win32 && isDir) data.mode = 493;
		} else if (data.mode === null) data.mode = isDir ? 493 : 420;
		if (data.stats && data.date === null) data.date = data.stats.mtime;
		else data.date = util.dateify(data.date);
		return data;
	};
	/**
	* Error listener that re-emits error on to our internal stream.
	*
	* @private
	* @param  {Error} err
	* @return void
	*/
	Archiver.prototype._onModuleError = function(err) {
		/**
		* @event Archiver#error
		* @type {ErrorData}
		*/
		this.emit("error", err);
	};
	/**
	* Checks the various state variables after queue has drained to determine if
	* we need to `finalize`.
	*
	* @private
	* @return void
	*/
	Archiver.prototype._onQueueDrain = function() {
		if (this._state.finalizing || this._state.finalized || this._state.aborted) return;
		if (this._state.finalize && this._pending === 0 && this._queue.idle() && this._statQueue.idle()) this._finalize();
	};
	/**
	* Appends each queue task to the module.
	*
	* @private
	* @param  {Object} task
	* @param  {Function} callback
	* @return void
	*/
	Archiver.prototype._onQueueTask = function(task, callback) {
		var fullCallback = () => {
			if (task.data.callback) task.data.callback();
			callback();
		};
		if (this._state.finalizing || this._state.finalized || this._state.aborted) {
			fullCallback();
			return;
		}
		this._task = task;
		this._moduleAppend(task.source, task.data, fullCallback);
	};
	/**
	* Performs a file stat and reinjects the task back into the queue.
	*
	* @private
	* @param  {Object} task
	* @param  {Function} callback
	* @return void
	*/
	Archiver.prototype._onStatQueueTask = function(task, callback) {
		if (this._state.finalizing || this._state.finalized || this._state.aborted) {
			callback();
			return;
		}
		fs.lstat(task.filepath, function(err, stats) {
			if (this._state.aborted) {
				setImmediate(callback);
				return;
			}
			if (err) {
				this._entriesCount--;
				/**
				* @event Archiver#warning
				* @type {ErrorData}
				*/
				this.emit("warning", err);
				setImmediate(callback);
				return;
			}
			task = this._updateQueueTaskWithStats(task, stats);
			if (task) {
				if (stats.size) this._fsEntriesTotalBytes += stats.size;
				this._queue.push(task);
			}
			setImmediate(callback);
		}.bind(this));
	};
	/**
	* Unpipes the module and ends our internal stream.
	*
	* @private
	* @return void
	*/
	Archiver.prototype._shutdown = function() {
		this._moduleUnpipe();
		this.end();
	};
	/**
	* Tracks the bytes emitted by our internal stream.
	*
	* @private
	* @param  {Buffer} chunk
	* @param  {String} encoding
	* @param  {Function} callback
	* @return void
	*/
	Archiver.prototype._transform = function(chunk, encoding, callback) {
		if (chunk) this._pointer += chunk.length;
		callback(null, chunk);
	};
	/**
	* Updates and normalizes a queue task using stats data.
	*
	* @private
	* @param  {Object} task
	* @param  {fs.Stats} stats
	* @return {Object}
	*/
	Archiver.prototype._updateQueueTaskWithStats = function(task, stats) {
		if (stats.isFile()) {
			task.data.type = "file";
			task.data.sourceType = "stream";
			task.source = util.lazyReadStream(task.filepath);
		} else if (stats.isDirectory() && this._moduleSupports("directory")) {
			task.data.name = util.trailingSlashIt(task.data.name);
			task.data.type = "directory";
			task.data.sourcePath = util.trailingSlashIt(task.filepath);
			task.data.sourceType = "buffer";
			task.source = Buffer.concat([]);
		} else if (stats.isSymbolicLink() && this._moduleSupports("symlink")) {
			var linkPath = fs.readlinkSync(task.filepath);
			var dirName = path$2.dirname(task.filepath);
			task.data.type = "symlink";
			task.data.linkname = path$2.relative(dirName, path$2.resolve(dirName, linkPath));
			task.data.sourceType = "buffer";
			task.source = Buffer.concat([]);
		} else {
			if (stats.isDirectory()) this.emit("warning", new ArchiverError("DIRECTORYNOTSUPPORTED", task.data));
			else if (stats.isSymbolicLink()) this.emit("warning", new ArchiverError("SYMLINKNOTSUPPORTED", task.data));
			else this.emit("warning", new ArchiverError("ENTRYNOTSUPPORTED", task.data));
			return null;
		}
		task.data = this._normalizeEntryData(task.data, stats);
		return task;
	};
	/**
	* Aborts the archiving process, taking a best-effort approach, by:
	*
	* - removing any pending queue tasks
	* - allowing any active queue workers to finish
	* - detaching internal module pipes
	* - ending both sides of the Transform stream
	*
	* It will NOT drain any remaining sources.
	*
	* @return {this}
	*/
	Archiver.prototype.abort = function() {
		if (this._state.aborted || this._state.finalized) return this;
		this._abort();
		return this;
	};
	/**
	* Appends an input source (text string, buffer, or stream) to the instance.
	*
	* When the instance has received, processed, and emitted the input, the `entry`
	* event is fired.
	*
	* @fires  Archiver#entry
	* @param  {(Buffer|Stream|String)} source The input source.
	* @param  {EntryData} data See also {@link ZipEntryData} and {@link TarEntryData}.
	* @return {this}
	*/
	Archiver.prototype.append = function(source, data) {
		if (this._state.finalize || this._state.aborted) {
			this.emit("error", new ArchiverError("QUEUECLOSED"));
			return this;
		}
		data = this._normalizeEntryData(data);
		if (typeof data.name !== "string" || data.name.length === 0) {
			this.emit("error", new ArchiverError("ENTRYNAMEREQUIRED"));
			return this;
		}
		if (data.type === "directory" && !this._moduleSupports("directory")) {
			this.emit("error", new ArchiverError("DIRECTORYNOTSUPPORTED", { name: data.name }));
			return this;
		}
		source = util.normalizeInputSource(source);
		if (Buffer.isBuffer(source)) data.sourceType = "buffer";
		else if (util.isStream(source)) data.sourceType = "stream";
		else {
			this.emit("error", new ArchiverError("INPUTSTEAMBUFFERREQUIRED", { name: data.name }));
			return this;
		}
		this._entriesCount++;
		this._queue.push({
			data,
			source
		});
		return this;
	};
	/**
	* Appends a directory and its files, recursively, given its dirpath.
	*
	* @param  {String} dirpath The source directory path.
	* @param  {String} destpath The destination path within the archive.
	* @param  {(EntryData|Function)} data See also [ZipEntryData]{@link ZipEntryData} and
	* [TarEntryData]{@link TarEntryData}.
	* @return {this}
	*/
	Archiver.prototype.directory = function(dirpath, destpath, data) {
		if (this._state.finalize || this._state.aborted) {
			this.emit("error", new ArchiverError("QUEUECLOSED"));
			return this;
		}
		if (typeof dirpath !== "string" || dirpath.length === 0) {
			this.emit("error", new ArchiverError("DIRECTORYDIRPATHREQUIRED"));
			return this;
		}
		this._pending++;
		if (destpath === false) destpath = "";
		else if (typeof destpath !== "string") destpath = dirpath;
		var dataFunction = false;
		if (typeof data === "function") {
			dataFunction = data;
			data = {};
		} else if (typeof data !== "object") data = {};
		var globOptions = {
			stat: true,
			dot: true
		};
		function onGlobEnd() {
			this._pending--;
			this._maybeFinalize();
		}
		function onGlobError(err) {
			this.emit("error", err);
		}
		function onGlobMatch(match) {
			globber.pause();
			var ignoreMatch = false;
			var entryData = Object.assign({}, data);
			entryData.name = match.relative;
			entryData.prefix = destpath;
			entryData.stats = match.stat;
			entryData.callback = globber.resume.bind(globber);
			try {
				if (dataFunction) {
					entryData = dataFunction(entryData);
					if (entryData === false) ignoreMatch = true;
					else if (typeof entryData !== "object") throw new ArchiverError("DIRECTORYFUNCTIONINVALIDDATA", { dirpath });
				}
			} catch (e) {
				this.emit("error", e);
				return;
			}
			if (ignoreMatch) {
				globber.resume();
				return;
			}
			this._append(match.absolute, entryData);
		}
		var globber = glob(dirpath, globOptions);
		globber.on("error", onGlobError.bind(this));
		globber.on("match", onGlobMatch.bind(this));
		globber.on("end", onGlobEnd.bind(this));
		return this;
	};
	/**
	* Appends a file given its filepath using a
	* [lazystream]{@link https://github.com/jpommerening/node-lazystream} wrapper to
	* prevent issues with open file limits.
	*
	* When the instance has received, processed, and emitted the file, the `entry`
	* event is fired.
	*
	* @param  {String} filepath The source filepath.
	* @param  {EntryData} data See also [ZipEntryData]{@link ZipEntryData} and
	* [TarEntryData]{@link TarEntryData}.
	* @return {this}
	*/
	Archiver.prototype.file = function(filepath, data) {
		if (this._state.finalize || this._state.aborted) {
			this.emit("error", new ArchiverError("QUEUECLOSED"));
			return this;
		}
		if (typeof filepath !== "string" || filepath.length === 0) {
			this.emit("error", new ArchiverError("FILEFILEPATHREQUIRED"));
			return this;
		}
		this._append(filepath, data);
		return this;
	};
	/**
	* Appends multiple files that match a glob pattern.
	*
	* @param  {String} pattern The [glob pattern]{@link https://github.com/isaacs/minimatch} to match.
	* @param  {Object} options See [node-readdir-glob]{@link https://github.com/yqnn/node-readdir-glob#options}.
	* @param  {EntryData} data See also [ZipEntryData]{@link ZipEntryData} and
	* [TarEntryData]{@link TarEntryData}.
	* @return {this}
	*/
	Archiver.prototype.glob = function(pattern, options, data) {
		this._pending++;
		options = util.defaults(options, {
			stat: true,
			pattern
		});
		function onGlobEnd() {
			this._pending--;
			this._maybeFinalize();
		}
		function onGlobError(err) {
			this.emit("error", err);
		}
		function onGlobMatch(match) {
			globber.pause();
			var entryData = Object.assign({}, data);
			entryData.callback = globber.resume.bind(globber);
			entryData.stats = match.stat;
			entryData.name = match.relative;
			this._append(match.absolute, entryData);
		}
		var globber = glob(options.cwd || ".", options);
		globber.on("error", onGlobError.bind(this));
		globber.on("match", onGlobMatch.bind(this));
		globber.on("end", onGlobEnd.bind(this));
		return this;
	};
	/**
	* Finalizes the instance and prevents further appending to the archive
	* structure (queue will continue til drained).
	*
	* The `end`, `close` or `finish` events on the destination stream may fire
	* right after calling this method so you should set listeners beforehand to
	* properly detect stream completion.
	*
	* @return {Promise}
	*/
	Archiver.prototype.finalize = function() {
		if (this._state.aborted) {
			var abortedError = new ArchiverError("ABORTED");
			this.emit("error", abortedError);
			return Promise.reject(abortedError);
		}
		if (this._state.finalize) {
			var finalizingError = new ArchiverError("FINALIZING");
			this.emit("error", finalizingError);
			return Promise.reject(finalizingError);
		}
		this._state.finalize = true;
		if (this._pending === 0 && this._queue.idle() && this._statQueue.idle()) this._finalize();
		var self = this;
		return new Promise(function(resolve, reject) {
			var errored;
			self._module.on("end", function() {
				if (!errored) resolve();
			});
			self._module.on("error", function(err) {
				errored = true;
				reject(err);
			});
		});
	};
	/**
	* Sets the module format name used for archiving.
	*
	* @param {String} format The name of the format.
	* @return {this}
	*/
	Archiver.prototype.setFormat = function(format) {
		if (this._format) {
			this.emit("error", new ArchiverError("FORMATSET"));
			return this;
		}
		this._format = format;
		return this;
	};
	/**
	* Sets the module used for archiving.
	*
	* @param {Function} module The function for archiver to interact with.
	* @return {this}
	*/
	Archiver.prototype.setModule = function(module$3) {
		if (this._state.aborted) {
			this.emit("error", new ArchiverError("ABORTED"));
			return this;
		}
		if (this._state.module) {
			this.emit("error", new ArchiverError("MODULESET"));
			return this;
		}
		this._module = module$3;
		this._modulePipe();
		return this;
	};
	/**
	* Appends a symlink to the instance.
	*
	* This does NOT interact with filesystem and is used for programmatically creating symlinks.
	*
	* @param  {String} filepath The symlink path (within archive).
	* @param  {String} target The target path (within archive).
	* @param  {Number} mode Sets the entry permissions.
	* @return {this}
	*/
	Archiver.prototype.symlink = function(filepath, target, mode) {
		if (this._state.finalize || this._state.aborted) {
			this.emit("error", new ArchiverError("QUEUECLOSED"));
			return this;
		}
		if (typeof filepath !== "string" || filepath.length === 0) {
			this.emit("error", new ArchiverError("SYMLINKFILEPATHREQUIRED"));
			return this;
		}
		if (typeof target !== "string" || target.length === 0) {
			this.emit("error", new ArchiverError("SYMLINKTARGETREQUIRED", { filepath }));
			return this;
		}
		if (!this._moduleSupports("symlink")) {
			this.emit("error", new ArchiverError("SYMLINKNOTSUPPORTED", { filepath }));
			return this;
		}
		var data = {};
		data.type = "symlink";
		data.name = filepath.replace(/\\/g, "/");
		data.linkname = target.replace(/\\/g, "/");
		data.sourceType = "buffer";
		if (typeof mode === "number") data.mode = mode;
		this._entriesCount++;
		this._queue.push({
			data,
			source: Buffer.concat([])
		});
		return this;
	};
	/**
	* Returns the current length (in bytes) that has been emitted.
	*
	* @return {Number}
	*/
	Archiver.prototype.pointer = function() {
		return this._pointer;
	};
	/**
	* Middleware-like helper that has yet to be fully implemented.
	*
	* @private
	* @param  {Function} plugin
	* @return {this}
	*/
	Archiver.prototype.use = function(plugin) {
		this._streams.push(plugin);
		return this;
	};
	module.exports = Archiver;
}));
/**
* @typedef {Object} CoreOptions
* @global
* @property {Number} [statConcurrency=4] Sets the number of workers used to
* process the internal fs stat queue.
*/
/**
* @typedef {Object} TransformOptions
* @property {Boolean} [allowHalfOpen=true] If set to false, then the stream
* will automatically end the readable side when the writable side ends and vice
* versa.
* @property {Boolean} [readableObjectMode=false] Sets objectMode for readable
* side of the stream. Has no effect if objectMode is true.
* @property {Boolean} [writableObjectMode=false] Sets objectMode for writable
* side of the stream. Has no effect if objectMode is true.
* @property {Boolean} [decodeStrings=true] Whether or not to decode strings
* into Buffers before passing them to _write(). `Writable`
* @property {String} [encoding=NULL] If specified, then buffers will be decoded
* to strings using the specified encoding. `Readable`
* @property {Number} [highWaterMark=16kb] The maximum number of bytes to store
* in the internal buffer before ceasing to read from the underlying resource.
* `Readable` `Writable`
* @property {Boolean} [objectMode=false] Whether this stream should behave as a
* stream of objects. Meaning that stream.read(n) returns a single value instead
* of a Buffer of size n. `Readable` `Writable`
*/
/**
* @typedef {Object} EntryData
* @property {String} name Sets the entry name including internal path.
* @property {(String|Date)} [date=NOW()] Sets the entry date.
* @property {Number} [mode=D:0755/F:0644] Sets the entry permissions.
* @property {String} [prefix] Sets a path prefix for the entry name. Useful
* when working with methods like `directory` or `glob`.
* @property {fs.Stats} [stats] Sets the fs stat data for this entry allowing
* for reduction of fs stat calls when stat data is already known.
*/
/**
* @typedef {Object} ErrorData
* @property {String} message The message of the error.
* @property {String} code The error code assigned to this error.
* @property {String} data Additional data provided for reporting or debugging (where available).
*/
/**
* @typedef {Object} ProgressData
* @property {Object} entries
* @property {Number} entries.total Number of entries that have been appended.
* @property {Number} entries.processed Number of entries that have been processed.
* @property {Object} fs
* @property {Number} fs.totalBytes Number of bytes that have been appended. Calculated asynchronously and might not be accurate: it growth while entries are added. (based on fs.Stats)
* @property {Number} fs.processedBytes Number of bytes that have been processed. (based on fs.Stats)
*/
//#endregion
//#region node_modules/compress-commons/lib/archivers/archive-entry.js
var require_archive_entry = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* node-compress-commons
	*
	* Copyright (c) 2014 Chris Talkington, contributors.
	* Licensed under the MIT license.
	* https://github.com/archiverjs/node-compress-commons/blob/master/LICENSE-MIT
	*/
	var ArchiveEntry = module.exports = function() {};
	ArchiveEntry.prototype.getName = function() {};
	ArchiveEntry.prototype.getSize = function() {};
	ArchiveEntry.prototype.getLastModifiedDate = function() {};
	ArchiveEntry.prototype.isDirectory = function() {};
}));
//#endregion
//#region node_modules/compress-commons/lib/archivers/zip/util.js
var require_util$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* node-compress-commons
	*
	* Copyright (c) 2014 Chris Talkington, contributors.
	* Licensed under the MIT license.
	* https://github.com/archiverjs/node-compress-commons/blob/master/LICENSE-MIT
	*/
	var util = module.exports = {};
	util.dateToDos = function(d, forceLocalTime) {
		forceLocalTime = forceLocalTime || false;
		var year = forceLocalTime ? d.getFullYear() : d.getUTCFullYear();
		if (year < 1980) return 2162688;
		else if (year >= 2044) return 2141175677;
		var val = {
			year,
			month: forceLocalTime ? d.getMonth() : d.getUTCMonth(),
			date: forceLocalTime ? d.getDate() : d.getUTCDate(),
			hours: forceLocalTime ? d.getHours() : d.getUTCHours(),
			minutes: forceLocalTime ? d.getMinutes() : d.getUTCMinutes(),
			seconds: forceLocalTime ? d.getSeconds() : d.getUTCSeconds()
		};
		return val.year - 1980 << 25 | val.month + 1 << 21 | val.date << 16 | val.hours << 11 | val.minutes << 5 | val.seconds / 2;
	};
	util.dosToDate = function(dos) {
		return new Date((dos >> 25 & 127) + 1980, (dos >> 21 & 15) - 1, dos >> 16 & 31, dos >> 11 & 31, dos >> 5 & 63, (dos & 31) << 1);
	};
	util.fromDosTime = function(buf) {
		return util.dosToDate(buf.readUInt32LE(0));
	};
	util.getEightBytes = function(v) {
		var buf = Buffer.alloc(8);
		buf.writeUInt32LE(v % 4294967296, 0);
		buf.writeUInt32LE(v / 4294967296 | 0, 4);
		return buf;
	};
	util.getShortBytes = function(v) {
		var buf = Buffer.alloc(2);
		buf.writeUInt16LE((v & 65535) >>> 0, 0);
		return buf;
	};
	util.getShortBytesValue = function(buf, offset) {
		return buf.readUInt16LE(offset);
	};
	util.getLongBytes = function(v) {
		var buf = Buffer.alloc(4);
		buf.writeUInt32LE((v & 4294967295) >>> 0, 0);
		return buf;
	};
	util.getLongBytesValue = function(buf, offset) {
		return buf.readUInt32LE(offset);
	};
	util.toDosTime = function(d) {
		return util.getLongBytes(util.dateToDos(d));
	};
}));
//#endregion
//#region node_modules/compress-commons/lib/archivers/zip/general-purpose-bit.js
var require_general_purpose_bit = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* node-compress-commons
	*
	* Copyright (c) 2014 Chris Talkington, contributors.
	* Licensed under the MIT license.
	* https://github.com/archiverjs/node-compress-commons/blob/master/LICENSE-MIT
	*/
	var zipUtil = require_util$1();
	var DATA_DESCRIPTOR_FLAG = 8;
	var ENCRYPTION_FLAG = 1;
	var NUMBER_OF_SHANNON_FANO_TREES_FLAG = 4;
	var SLIDING_DICTIONARY_SIZE_FLAG = 2;
	var STRONG_ENCRYPTION_FLAG = 64;
	var UFT8_NAMES_FLAG = 2048;
	var GeneralPurposeBit = module.exports = function() {
		if (!(this instanceof GeneralPurposeBit)) return new GeneralPurposeBit();
		this.descriptor = false;
		this.encryption = false;
		this.utf8 = false;
		this.numberOfShannonFanoTrees = 0;
		this.strongEncryption = false;
		this.slidingDictionarySize = 0;
		return this;
	};
	GeneralPurposeBit.prototype.encode = function() {
		return zipUtil.getShortBytes((this.descriptor ? DATA_DESCRIPTOR_FLAG : 0) | (this.utf8 ? UFT8_NAMES_FLAG : 0) | (this.encryption ? ENCRYPTION_FLAG : 0) | (this.strongEncryption ? STRONG_ENCRYPTION_FLAG : 0));
	};
	GeneralPurposeBit.prototype.parse = function(buf, offset) {
		var flag = zipUtil.getShortBytesValue(buf, offset);
		var gbp = new GeneralPurposeBit();
		gbp.useDataDescriptor((flag & DATA_DESCRIPTOR_FLAG) !== 0);
		gbp.useUTF8ForNames((flag & UFT8_NAMES_FLAG) !== 0);
		gbp.useStrongEncryption((flag & STRONG_ENCRYPTION_FLAG) !== 0);
		gbp.useEncryption((flag & ENCRYPTION_FLAG) !== 0);
		gbp.setSlidingDictionarySize((flag & SLIDING_DICTIONARY_SIZE_FLAG) !== 0 ? 8192 : 4096);
		gbp.setNumberOfShannonFanoTrees((flag & NUMBER_OF_SHANNON_FANO_TREES_FLAG) !== 0 ? 3 : 2);
		return gbp;
	};
	GeneralPurposeBit.prototype.setNumberOfShannonFanoTrees = function(n) {
		this.numberOfShannonFanoTrees = n;
	};
	GeneralPurposeBit.prototype.getNumberOfShannonFanoTrees = function() {
		return this.numberOfShannonFanoTrees;
	};
	GeneralPurposeBit.prototype.setSlidingDictionarySize = function(n) {
		this.slidingDictionarySize = n;
	};
	GeneralPurposeBit.prototype.getSlidingDictionarySize = function() {
		return this.slidingDictionarySize;
	};
	GeneralPurposeBit.prototype.useDataDescriptor = function(b) {
		this.descriptor = b;
	};
	GeneralPurposeBit.prototype.usesDataDescriptor = function() {
		return this.descriptor;
	};
	GeneralPurposeBit.prototype.useEncryption = function(b) {
		this.encryption = b;
	};
	GeneralPurposeBit.prototype.usesEncryption = function() {
		return this.encryption;
	};
	GeneralPurposeBit.prototype.useStrongEncryption = function(b) {
		this.strongEncryption = b;
	};
	GeneralPurposeBit.prototype.usesStrongEncryption = function() {
		return this.strongEncryption;
	};
	GeneralPurposeBit.prototype.useUTF8ForNames = function(b) {
		this.utf8 = b;
	};
	GeneralPurposeBit.prototype.usesUTF8ForNames = function() {
		return this.utf8;
	};
}));
//#endregion
//#region node_modules/compress-commons/lib/archivers/zip/unix-stat.js
var require_unix_stat = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* node-compress-commons
	*
	* Copyright (c) 2014 Chris Talkington, contributors.
	* Licensed under the MIT license.
	* https://github.com/archiverjs/node-compress-commons/blob/master/LICENSE-MIT
	*/
	module.exports = {
		/**
		* Bits used for permissions (and sticky bit)
		*/
		PERM_MASK: 4095,
		/**
		* Bits used to indicate the filesystem object type.
		*/
		FILE_TYPE_FLAG: 61440,
		/**
		* Indicates symbolic links.
		*/
		LINK_FLAG: 40960,
		/**
		* Indicates plain files.
		*/
		FILE_FLAG: 32768,
		/**
		* Indicates directories.
		*/
		DIR_FLAG: 16384,
		/**
		* Default permissions for symbolic links.
		*/
		DEFAULT_LINK_PERM: 511,
		/**
		* Default permissions for directories.
		*/
		DEFAULT_DIR_PERM: 493,
		/**
		* Default permissions for plain files.
		*/
		DEFAULT_FILE_PERM: 420
	};
}));
//#endregion
//#region node_modules/compress-commons/lib/archivers/zip/constants.js
var require_constants = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* node-compress-commons
	*
	* Copyright (c) 2014 Chris Talkington, contributors.
	* Licensed under the MIT license.
	* https://github.com/archiverjs/node-compress-commons/blob/master/LICENSE-MIT
	*/
	module.exports = {
		WORD: 4,
		DWORD: 8,
		EMPTY: Buffer.alloc(0),
		SHORT: 2,
		SHORT_MASK: 65535,
		SHORT_SHIFT: 16,
		SHORT_ZERO: Buffer.from(Array(2)),
		LONG: 4,
		LONG_ZERO: Buffer.from(Array(4)),
		MIN_VERSION_INITIAL: 10,
		MIN_VERSION_DATA_DESCRIPTOR: 20,
		MIN_VERSION_ZIP64: 45,
		VERSION_MADEBY: 45,
		METHOD_STORED: 0,
		METHOD_DEFLATED: 8,
		PLATFORM_UNIX: 3,
		PLATFORM_FAT: 0,
		SIG_LFH: 67324752,
		SIG_DD: 134695760,
		SIG_CFH: 33639248,
		SIG_EOCD: 101010256,
		SIG_ZIP64_EOCD: 101075792,
		SIG_ZIP64_EOCD_LOC: 117853008,
		ZIP64_MAGIC_SHORT: 65535,
		ZIP64_MAGIC: 4294967295,
		ZIP64_EXTRA_ID: 1,
		ZLIB_NO_COMPRESSION: 0,
		ZLIB_BEST_SPEED: 1,
		ZLIB_BEST_COMPRESSION: 9,
		ZLIB_DEFAULT_COMPRESSION: -1,
		MODE_MASK: 4095,
		DEFAULT_FILE_MODE: 33188,
		DEFAULT_DIR_MODE: 16877,
		EXT_FILE_ATTR_DIR: 1106051088,
		EXT_FILE_ATTR_FILE: 2175008800,
		S_IFMT: 61440,
		S_IFIFO: 4096,
		S_IFCHR: 8192,
		S_IFDIR: 16384,
		S_IFBLK: 24576,
		S_IFREG: 32768,
		S_IFLNK: 40960,
		S_IFSOCK: 49152,
		S_DOS_A: 32,
		S_DOS_D: 16,
		S_DOS_V: 8,
		S_DOS_S: 4,
		S_DOS_H: 2,
		S_DOS_R: 1
	};
}));
//#endregion
//#region node_modules/compress-commons/lib/archivers/zip/zip-archive-entry.js
var require_zip_archive_entry = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* node-compress-commons
	*
	* Copyright (c) 2014 Chris Talkington, contributors.
	* Licensed under the MIT license.
	* https://github.com/archiverjs/node-compress-commons/blob/master/LICENSE-MIT
	*/
	var inherits$4 = __require("util").inherits;
	var normalizePath = require_normalize_path();
	var ArchiveEntry = require_archive_entry();
	var GeneralPurposeBit = require_general_purpose_bit();
	var UnixStat = require_unix_stat();
	var constants = require_constants();
	var zipUtil = require_util$1();
	var ZipArchiveEntry = module.exports = function(name) {
		if (!(this instanceof ZipArchiveEntry)) return new ZipArchiveEntry(name);
		ArchiveEntry.call(this);
		this.platform = constants.PLATFORM_FAT;
		this.method = -1;
		this.name = null;
		this.size = 0;
		this.csize = 0;
		this.gpb = new GeneralPurposeBit();
		this.crc = 0;
		this.time = -1;
		this.minver = constants.MIN_VERSION_INITIAL;
		this.mode = -1;
		this.extra = null;
		this.exattr = 0;
		this.inattr = 0;
		this.comment = null;
		if (name) this.setName(name);
	};
	inherits$4(ZipArchiveEntry, ArchiveEntry);
	/**
	* Returns the extra fields related to the entry.
	*
	* @returns {Buffer}
	*/
	ZipArchiveEntry.prototype.getCentralDirectoryExtra = function() {
		return this.getExtra();
	};
	/**
	* Returns the comment set for the entry.
	*
	* @returns {string}
	*/
	ZipArchiveEntry.prototype.getComment = function() {
		return this.comment !== null ? this.comment : "";
	};
	/**
	* Returns the compressed size of the entry.
	*
	* @returns {number}
	*/
	ZipArchiveEntry.prototype.getCompressedSize = function() {
		return this.csize;
	};
	/**
	* Returns the CRC32 digest for the entry.
	*
	* @returns {number}
	*/
	ZipArchiveEntry.prototype.getCrc = function() {
		return this.crc;
	};
	/**
	* Returns the external file attributes for the entry.
	*
	* @returns {number}
	*/
	ZipArchiveEntry.prototype.getExternalAttributes = function() {
		return this.exattr;
	};
	/**
	* Returns the extra fields related to the entry.
	*
	* @returns {Buffer}
	*/
	ZipArchiveEntry.prototype.getExtra = function() {
		return this.extra !== null ? this.extra : constants.EMPTY;
	};
	/**
	* Returns the general purpose bits related to the entry.
	*
	* @returns {GeneralPurposeBit}
	*/
	ZipArchiveEntry.prototype.getGeneralPurposeBit = function() {
		return this.gpb;
	};
	/**
	* Returns the internal file attributes for the entry.
	*
	* @returns {number}
	*/
	ZipArchiveEntry.prototype.getInternalAttributes = function() {
		return this.inattr;
	};
	/**
	* Returns the last modified date of the entry.
	*
	* @returns {number}
	*/
	ZipArchiveEntry.prototype.getLastModifiedDate = function() {
		return this.getTime();
	};
	/**
	* Returns the extra fields related to the entry.
	*
	* @returns {Buffer}
	*/
	ZipArchiveEntry.prototype.getLocalFileDataExtra = function() {
		return this.getExtra();
	};
	/**
	* Returns the compression method used on the entry.
	*
	* @returns {number}
	*/
	ZipArchiveEntry.prototype.getMethod = function() {
		return this.method;
	};
	/**
	* Returns the filename of the entry.
	*
	* @returns {string}
	*/
	ZipArchiveEntry.prototype.getName = function() {
		return this.name;
	};
	/**
	* Returns the platform on which the entry was made.
	*
	* @returns {number}
	*/
	ZipArchiveEntry.prototype.getPlatform = function() {
		return this.platform;
	};
	/**
	* Returns the size of the entry.
	*
	* @returns {number}
	*/
	ZipArchiveEntry.prototype.getSize = function() {
		return this.size;
	};
	/**
	* Returns a date object representing the last modified date of the entry.
	*
	* @returns {number|Date}
	*/
	ZipArchiveEntry.prototype.getTime = function() {
		return this.time !== -1 ? zipUtil.dosToDate(this.time) : -1;
	};
	/**
	* Returns the DOS timestamp for the entry.
	*
	* @returns {number}
	*/
	ZipArchiveEntry.prototype.getTimeDos = function() {
		return this.time !== -1 ? this.time : 0;
	};
	/**
	* Returns the UNIX file permissions for the entry.
	*
	* @returns {number}
	*/
	ZipArchiveEntry.prototype.getUnixMode = function() {
		return this.platform !== constants.PLATFORM_UNIX ? 0 : this.getExternalAttributes() >> constants.SHORT_SHIFT & constants.SHORT_MASK;
	};
	/**
	* Returns the version of ZIP needed to extract the entry.
	*
	* @returns {number}
	*/
	ZipArchiveEntry.prototype.getVersionNeededToExtract = function() {
		return this.minver;
	};
	/**
	* Sets the comment of the entry.
	*
	* @param comment
	*/
	ZipArchiveEntry.prototype.setComment = function(comment) {
		if (Buffer.byteLength(comment) !== comment.length) this.getGeneralPurposeBit().useUTF8ForNames(true);
		this.comment = comment;
	};
	/**
	* Sets the compressed size of the entry.
	*
	* @param size
	*/
	ZipArchiveEntry.prototype.setCompressedSize = function(size) {
		if (size < 0) throw new Error("invalid entry compressed size");
		this.csize = size;
	};
	/**
	* Sets the checksum of the entry.
	*
	* @param crc
	*/
	ZipArchiveEntry.prototype.setCrc = function(crc) {
		if (crc < 0) throw new Error("invalid entry crc32");
		this.crc = crc;
	};
	/**
	* Sets the external file attributes of the entry.
	*
	* @param attr
	*/
	ZipArchiveEntry.prototype.setExternalAttributes = function(attr) {
		this.exattr = attr >>> 0;
	};
	/**
	* Sets the extra fields related to the entry.
	*
	* @param extra
	*/
	ZipArchiveEntry.prototype.setExtra = function(extra) {
		this.extra = extra;
	};
	/**
	* Sets the general purpose bits related to the entry.
	*
	* @param gpb
	*/
	ZipArchiveEntry.prototype.setGeneralPurposeBit = function(gpb) {
		if (!(gpb instanceof GeneralPurposeBit)) throw new Error("invalid entry GeneralPurposeBit");
		this.gpb = gpb;
	};
	/**
	* Sets the internal file attributes of the entry.
	*
	* @param attr
	*/
	ZipArchiveEntry.prototype.setInternalAttributes = function(attr) {
		this.inattr = attr;
	};
	/**
	* Sets the compression method of the entry.
	*
	* @param method
	*/
	ZipArchiveEntry.prototype.setMethod = function(method) {
		if (method < 0) throw new Error("invalid entry compression method");
		this.method = method;
	};
	/**
	* Sets the name of the entry.
	*
	* @param name
	* @param prependSlash
	*/
	ZipArchiveEntry.prototype.setName = function(name, prependSlash = false) {
		name = normalizePath(name, false).replace(/^\w+:/, "").replace(/^(\.\.\/|\/)+/, "");
		if (prependSlash) name = `/${name}`;
		if (Buffer.byteLength(name) !== name.length) this.getGeneralPurposeBit().useUTF8ForNames(true);
		this.name = name;
	};
	/**
	* Sets the platform on which the entry was made.
	*
	* @param platform
	*/
	ZipArchiveEntry.prototype.setPlatform = function(platform) {
		this.platform = platform;
	};
	/**
	* Sets the size of the entry.
	*
	* @param size
	*/
	ZipArchiveEntry.prototype.setSize = function(size) {
		if (size < 0) throw new Error("invalid entry size");
		this.size = size;
	};
	/**
	* Sets the time of the entry.
	*
	* @param time
	* @param forceLocalTime
	*/
	ZipArchiveEntry.prototype.setTime = function(time, forceLocalTime) {
		if (!(time instanceof Date)) throw new Error("invalid entry time");
		this.time = zipUtil.dateToDos(time, forceLocalTime);
	};
	/**
	* Sets the UNIX file permissions for the entry.
	*
	* @param mode
	*/
	ZipArchiveEntry.prototype.setUnixMode = function(mode) {
		mode |= this.isDirectory() ? constants.S_IFDIR : constants.S_IFREG;
		var extattr = 0;
		extattr |= mode << constants.SHORT_SHIFT | (this.isDirectory() ? constants.S_DOS_D : constants.S_DOS_A);
		this.setExternalAttributes(extattr);
		this.mode = mode & constants.MODE_MASK;
		this.platform = constants.PLATFORM_UNIX;
	};
	/**
	* Sets the version of ZIP needed to extract this entry.
	*
	* @param minver
	*/
	ZipArchiveEntry.prototype.setVersionNeededToExtract = function(minver) {
		this.minver = minver;
	};
	/**
	* Returns true if this entry represents a directory.
	*
	* @returns {boolean}
	*/
	ZipArchiveEntry.prototype.isDirectory = function() {
		return this.getName().slice(-1) === "/";
	};
	/**
	* Returns true if this entry represents a unix symlink,
	* in which case the entry's content contains the target path
	* for the symlink.
	*
	* @returns {boolean}
	*/
	ZipArchiveEntry.prototype.isUnixSymlink = function() {
		return (this.getUnixMode() & UnixStat.FILE_TYPE_FLAG) === UnixStat.LINK_FLAG;
	};
	/**
	* Returns true if this entry is using the ZIP64 extension of ZIP.
	*
	* @returns {boolean}
	*/
	ZipArchiveEntry.prototype.isZip64 = function() {
		return this.csize > constants.ZIP64_MAGIC || this.size > constants.ZIP64_MAGIC;
	};
}));
//#endregion
//#region node_modules/compress-commons/lib/util/index.js
var require_util = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* node-compress-commons
	*
	* Copyright (c) 2014 Chris Talkington, contributors.
	* Licensed under the MIT license.
	* https://github.com/archiverjs/node-compress-commons/blob/master/LICENSE-MIT
	*/
	var Stream$1 = __require("stream").Stream;
	var PassThrough = require_readable$2().PassThrough;
	var util = module.exports = {};
	util.isStream = function(source) {
		return source instanceof Stream$1;
	};
	util.normalizeInputSource = function(source) {
		if (source === null) return Buffer.alloc(0);
		else if (typeof source === "string") return Buffer.from(source);
		else if (util.isStream(source) && !source._readableState) {
			var normalized = new PassThrough();
			source.pipe(normalized);
			return normalized;
		}
		return source;
	};
}));
//#endregion
//#region node_modules/compress-commons/lib/archivers/archive-output-stream.js
var require_archive_output_stream = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* node-compress-commons
	*
	* Copyright (c) 2014 Chris Talkington, contributors.
	* Licensed under the MIT license.
	* https://github.com/archiverjs/node-compress-commons/blob/master/LICENSE-MIT
	*/
	var inherits$3 = __require("util").inherits;
	var Transform = require_readable$2().Transform;
	var ArchiveEntry = require_archive_entry();
	var util = require_util();
	var ArchiveOutputStream = module.exports = function(options) {
		if (!(this instanceof ArchiveOutputStream)) return new ArchiveOutputStream(options);
		Transform.call(this, options);
		this.offset = 0;
		this._archive = {
			finish: false,
			finished: false,
			processing: false
		};
	};
	inherits$3(ArchiveOutputStream, Transform);
	ArchiveOutputStream.prototype._appendBuffer = function(zae, source, callback) {};
	ArchiveOutputStream.prototype._appendStream = function(zae, source, callback) {};
	ArchiveOutputStream.prototype._emitErrorCallback = function(err) {
		if (err) this.emit("error", err);
	};
	ArchiveOutputStream.prototype._finish = function(ae) {};
	ArchiveOutputStream.prototype._normalizeEntry = function(ae) {};
	ArchiveOutputStream.prototype._transform = function(chunk, encoding, callback) {
		callback(null, chunk);
	};
	ArchiveOutputStream.prototype.entry = function(ae, source, callback) {
		source = source || null;
		if (typeof callback !== "function") callback = this._emitErrorCallback.bind(this);
		if (!(ae instanceof ArchiveEntry)) {
			callback(/* @__PURE__ */ new Error("not a valid instance of ArchiveEntry"));
			return;
		}
		if (this._archive.finish || this._archive.finished) {
			callback(/* @__PURE__ */ new Error("unacceptable entry after finish"));
			return;
		}
		if (this._archive.processing) {
			callback(/* @__PURE__ */ new Error("already processing an entry"));
			return;
		}
		this._archive.processing = true;
		this._normalizeEntry(ae);
		this._entry = ae;
		source = util.normalizeInputSource(source);
		if (Buffer.isBuffer(source)) this._appendBuffer(ae, source, callback);
		else if (util.isStream(source)) this._appendStream(ae, source, callback);
		else {
			this._archive.processing = false;
			callback(/* @__PURE__ */ new Error("input source must be valid Stream or Buffer instance"));
			return;
		}
		return this;
	};
	ArchiveOutputStream.prototype.finish = function() {
		if (this._archive.processing) {
			this._archive.finish = true;
			return;
		}
		this._finish();
	};
	ArchiveOutputStream.prototype.getBytesWritten = function() {
		return this.offset;
	};
	ArchiveOutputStream.prototype.write = function(chunk, cb) {
		if (chunk) this.offset += chunk.length;
		return Transform.prototype.write.call(this, chunk, cb);
	};
}));
//#endregion
//#region node_modules/buffer-crc32/index.js
var require_buffer_crc32 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Buffer$2 = __require("buffer").Buffer;
	var CRC_TABLE = [
		0,
		1996959894,
		3993919788,
		2567524794,
		124634137,
		1886057615,
		3915621685,
		2657392035,
		249268274,
		2044508324,
		3772115230,
		2547177864,
		162941995,
		2125561021,
		3887607047,
		2428444049,
		498536548,
		1789927666,
		4089016648,
		2227061214,
		450548861,
		1843258603,
		4107580753,
		2211677639,
		325883990,
		1684777152,
		4251122042,
		2321926636,
		335633487,
		1661365465,
		4195302755,
		2366115317,
		997073096,
		1281953886,
		3579855332,
		2724688242,
		1006888145,
		1258607687,
		3524101629,
		2768942443,
		901097722,
		1119000684,
		3686517206,
		2898065728,
		853044451,
		1172266101,
		3705015759,
		2882616665,
		651767980,
		1373503546,
		3369554304,
		3218104598,
		565507253,
		1454621731,
		3485111705,
		3099436303,
		671266974,
		1594198024,
		3322730930,
		2970347812,
		795835527,
		1483230225,
		3244367275,
		3060149565,
		1994146192,
		31158534,
		2563907772,
		4023717930,
		1907459465,
		112637215,
		2680153253,
		3904427059,
		2013776290,
		251722036,
		2517215374,
		3775830040,
		2137656763,
		141376813,
		2439277719,
		3865271297,
		1802195444,
		476864866,
		2238001368,
		4066508878,
		1812370925,
		453092731,
		2181625025,
		4111451223,
		1706088902,
		314042704,
		2344532202,
		4240017532,
		1658658271,
		366619977,
		2362670323,
		4224994405,
		1303535960,
		984961486,
		2747007092,
		3569037538,
		1256170817,
		1037604311,
		2765210733,
		3554079995,
		1131014506,
		879679996,
		2909243462,
		3663771856,
		1141124467,
		855842277,
		2852801631,
		3708648649,
		1342533948,
		654459306,
		3188396048,
		3373015174,
		1466479909,
		544179635,
		3110523913,
		3462522015,
		1591671054,
		702138776,
		2966460450,
		3352799412,
		1504918807,
		783551873,
		3082640443,
		3233442989,
		3988292384,
		2596254646,
		62317068,
		1957810842,
		3939845945,
		2647816111,
		81470997,
		1943803523,
		3814918930,
		2489596804,
		225274430,
		2053790376,
		3826175755,
		2466906013,
		167816743,
		2097651377,
		4027552580,
		2265490386,
		503444072,
		1762050814,
		4150417245,
		2154129355,
		426522225,
		1852507879,
		4275313526,
		2312317920,
		282753626,
		1742555852,
		4189708143,
		2394877945,
		397917763,
		1622183637,
		3604390888,
		2714866558,
		953729732,
		1340076626,
		3518719985,
		2797360999,
		1068828381,
		1219638859,
		3624741850,
		2936675148,
		906185462,
		1090812512,
		3747672003,
		2825379669,
		829329135,
		1181335161,
		3412177804,
		3160834842,
		628085408,
		1382605366,
		3423369109,
		3138078467,
		570562233,
		1426400815,
		3317316542,
		2998733608,
		733239954,
		1555261956,
		3268935591,
		3050360625,
		752459403,
		1541320221,
		2607071920,
		3965973030,
		1969922972,
		40735498,
		2617837225,
		3943577151,
		1913087877,
		83908371,
		2512341634,
		3803740692,
		2075208622,
		213261112,
		2463272603,
		3855990285,
		2094854071,
		198958881,
		2262029012,
		4057260610,
		1759359992,
		534414190,
		2176718541,
		4139329115,
		1873836001,
		414664567,
		2282248934,
		4279200368,
		1711684554,
		285281116,
		2405801727,
		4167216745,
		1634467795,
		376229701,
		2685067896,
		3608007406,
		1308918612,
		956543938,
		2808555105,
		3495958263,
		1231636301,
		1047427035,
		2932959818,
		3654703836,
		1088359270,
		936918e3,
		2847714899,
		3736837829,
		1202900863,
		817233897,
		3183342108,
		3401237130,
		1404277552,
		615818150,
		3134207493,
		3453421203,
		1423857449,
		601450431,
		3009837614,
		3294710456,
		1567103746,
		711928724,
		3020668471,
		3272380065,
		1510334235,
		755167117
	];
	if (typeof Int32Array !== "undefined") CRC_TABLE = new Int32Array(CRC_TABLE);
	function ensureBuffer(input) {
		if (Buffer$2.isBuffer(input)) return input;
		var hasNewBufferAPI = typeof Buffer$2.alloc === "function" && typeof Buffer$2.from === "function";
		if (typeof input === "number") return hasNewBufferAPI ? Buffer$2.alloc(input) : new Buffer$2(input);
		else if (typeof input === "string") return hasNewBufferAPI ? Buffer$2.from(input) : new Buffer$2(input);
		else throw new Error("input must be buffer, number, or string, received " + typeof input);
	}
	function bufferizeInt(num) {
		var tmp = ensureBuffer(4);
		tmp.writeInt32BE(num, 0);
		return tmp;
	}
	function _crc32(buf, previous) {
		buf = ensureBuffer(buf);
		if (Buffer$2.isBuffer(previous)) previous = previous.readUInt32BE(0);
		var crc = ~~previous ^ -1;
		for (var n = 0; n < buf.length; n++) crc = CRC_TABLE[(crc ^ buf[n]) & 255] ^ crc >>> 8;
		return crc ^ -1;
	}
	function crc32() {
		return bufferizeInt(_crc32.apply(null, arguments));
	}
	crc32.signed = function() {
		return _crc32.apply(null, arguments);
	};
	crc32.unsigned = function() {
		return _crc32.apply(null, arguments) >>> 0;
	};
	module.exports = crc32;
}));
//#endregion
//#region node_modules/crc-32/crc32.js
var require_crc32 = /* @__PURE__ */ __commonJSMin(((exports) => {
	/*! crc32.js (C) 2014-present SheetJS -- http://sheetjs.com */
	(function(factory) {
		if (typeof DO_NOT_EXPORT_CRC === "undefined") {
			if ("object" === typeof exports) factory(exports);
			else if ("function" === typeof define && define.amd) define(function() {
				var module$2 = {};
				factory(module$2);
				return module$2;
			});
			else factory({});
		} else factory({});
	})(function(CRC32) {
		CRC32.version = "1.2.2";
		function signed_crc_table() {
			var c = 0, table = new Array(256);
			for (var n = 0; n != 256; ++n) {
				c = n;
				c = c & 1 ? -306674912 ^ c >>> 1 : c >>> 1;
				c = c & 1 ? -306674912 ^ c >>> 1 : c >>> 1;
				c = c & 1 ? -306674912 ^ c >>> 1 : c >>> 1;
				c = c & 1 ? -306674912 ^ c >>> 1 : c >>> 1;
				c = c & 1 ? -306674912 ^ c >>> 1 : c >>> 1;
				c = c & 1 ? -306674912 ^ c >>> 1 : c >>> 1;
				c = c & 1 ? -306674912 ^ c >>> 1 : c >>> 1;
				c = c & 1 ? -306674912 ^ c >>> 1 : c >>> 1;
				table[n] = c;
			}
			return typeof Int32Array !== "undefined" ? new Int32Array(table) : table;
		}
		var T0 = signed_crc_table();
		function slice_by_16_tables(T) {
			var c = 0, v = 0, n = 0, table = typeof Int32Array !== "undefined" ? /* @__PURE__ */ new Int32Array(4096) : new Array(4096);
			for (n = 0; n != 256; ++n) table[n] = T[n];
			for (n = 0; n != 256; ++n) {
				v = T[n];
				for (c = 256 + n; c < 4096; c += 256) v = table[c] = v >>> 8 ^ T[v & 255];
			}
			var out = [];
			for (n = 1; n != 16; ++n) out[n - 1] = typeof Int32Array !== "undefined" ? table.subarray(n * 256, n * 256 + 256) : table.slice(n * 256, n * 256 + 256);
			return out;
		}
		var TT = slice_by_16_tables(T0);
		var T1 = TT[0], T2 = TT[1], T3 = TT[2], T4 = TT[3], T5 = TT[4];
		var T6 = TT[5], T7 = TT[6], T8 = TT[7], T9 = TT[8], Ta = TT[9];
		var Tb = TT[10], Tc = TT[11], Td = TT[12], Te = TT[13], Tf = TT[14];
		function crc32_bstr(bstr, seed) {
			var C = seed ^ -1;
			for (var i = 0, L = bstr.length; i < L;) C = C >>> 8 ^ T0[(C ^ bstr.charCodeAt(i++)) & 255];
			return ~C;
		}
		function crc32_buf(B, seed) {
			var C = seed ^ -1, L = B.length - 15, i = 0;
			for (; i < L;) C = Tf[B[i++] ^ C & 255] ^ Te[B[i++] ^ C >> 8 & 255] ^ Td[B[i++] ^ C >> 16 & 255] ^ Tc[B[i++] ^ C >>> 24] ^ Tb[B[i++]] ^ Ta[B[i++]] ^ T9[B[i++]] ^ T8[B[i++]] ^ T7[B[i++]] ^ T6[B[i++]] ^ T5[B[i++]] ^ T4[B[i++]] ^ T3[B[i++]] ^ T2[B[i++]] ^ T1[B[i++]] ^ T0[B[i++]];
			L += 15;
			while (i < L) C = C >>> 8 ^ T0[(C ^ B[i++]) & 255];
			return ~C;
		}
		function crc32_str(str, seed) {
			var C = seed ^ -1;
			for (var i = 0, L = str.length, c = 0, d = 0; i < L;) {
				c = str.charCodeAt(i++);
				if (c < 128) C = C >>> 8 ^ T0[(C ^ c) & 255];
				else if (c < 2048) {
					C = C >>> 8 ^ T0[(C ^ (192 | c >> 6 & 31)) & 255];
					C = C >>> 8 ^ T0[(C ^ (128 | c & 63)) & 255];
				} else if (c >= 55296 && c < 57344) {
					c = (c & 1023) + 64;
					d = str.charCodeAt(i++) & 1023;
					C = C >>> 8 ^ T0[(C ^ (240 | c >> 8 & 7)) & 255];
					C = C >>> 8 ^ T0[(C ^ (128 | c >> 2 & 63)) & 255];
					C = C >>> 8 ^ T0[(C ^ (128 | d >> 6 & 15 | (c & 3) << 4)) & 255];
					C = C >>> 8 ^ T0[(C ^ (128 | d & 63)) & 255];
				} else {
					C = C >>> 8 ^ T0[(C ^ (224 | c >> 12 & 15)) & 255];
					C = C >>> 8 ^ T0[(C ^ (128 | c >> 6 & 63)) & 255];
					C = C >>> 8 ^ T0[(C ^ (128 | c & 63)) & 255];
				}
			}
			return ~C;
		}
		CRC32.table = T0;
		CRC32.bstr = crc32_bstr;
		CRC32.buf = crc32_buf;
		CRC32.str = crc32_str;
	});
}));
//#endregion
//#region node_modules/crc32-stream/lib/crc32-stream.js
/**
* node-crc32-stream
*
* Copyright (c) 2014 Chris Talkington, contributors.
* Licensed under the MIT license.
* https://github.com/archiverjs/node-crc32-stream/blob/master/LICENSE-MIT
*/
var require_crc32_stream = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var { Transform } = require_readable$2();
	var crc32 = require_crc32();
	var CRC32Stream = class extends Transform {
		constructor(options) {
			super(options);
			this.checksum = Buffer.allocUnsafe(4);
			this.checksum.writeInt32BE(0, 0);
			this.rawSize = 0;
		}
		_transform(chunk, encoding, callback) {
			if (chunk) {
				this.checksum = crc32.buf(chunk, this.checksum) >>> 0;
				this.rawSize += chunk.length;
			}
			callback(null, chunk);
		}
		digest(encoding) {
			const checksum = Buffer.allocUnsafe(4);
			checksum.writeUInt32BE(this.checksum >>> 0, 0);
			return encoding ? checksum.toString(encoding) : checksum;
		}
		hex() {
			return this.digest("hex").toUpperCase();
		}
		size() {
			return this.rawSize;
		}
	};
	module.exports = CRC32Stream;
}));
//#endregion
//#region node_modules/crc32-stream/lib/deflate-crc32-stream.js
/**
* node-crc32-stream
*
* Copyright (c) 2014 Chris Talkington, contributors.
* Licensed under the MIT license.
* https://github.com/archiverjs/node-crc32-stream/blob/master/LICENSE-MIT
*/
var require_deflate_crc32_stream = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var { DeflateRaw } = __require("zlib");
	var crc32 = require_crc32();
	var DeflateCRC32Stream = class extends DeflateRaw {
		constructor(options) {
			super(options);
			this.checksum = Buffer.allocUnsafe(4);
			this.checksum.writeInt32BE(0, 0);
			this.rawSize = 0;
			this.compressedSize = 0;
		}
		push(chunk, encoding) {
			if (chunk) this.compressedSize += chunk.length;
			return super.push(chunk, encoding);
		}
		_transform(chunk, encoding, callback) {
			if (chunk) {
				this.checksum = crc32.buf(chunk, this.checksum) >>> 0;
				this.rawSize += chunk.length;
			}
			super._transform(chunk, encoding, callback);
		}
		digest(encoding) {
			const checksum = Buffer.allocUnsafe(4);
			checksum.writeUInt32BE(this.checksum >>> 0, 0);
			return encoding ? checksum.toString(encoding) : checksum;
		}
		hex() {
			return this.digest("hex").toUpperCase();
		}
		size(compressed = false) {
			if (compressed) return this.compressedSize;
			else return this.rawSize;
		}
	};
	module.exports = DeflateCRC32Stream;
}));
//#endregion
//#region node_modules/crc32-stream/lib/index.js
/**
* node-crc32-stream
*
* Copyright (c) 2014 Chris Talkington, contributors.
* Licensed under the MIT license.
* https://github.com/archiverjs/node-crc32-stream/blob/master/LICENSE-MIT
*/
var require_lib = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = {
		CRC32Stream: require_crc32_stream(),
		DeflateCRC32Stream: require_deflate_crc32_stream()
	};
}));
//#endregion
//#region node_modules/compress-commons/lib/archivers/zip/zip-archive-output-stream.js
var require_zip_archive_output_stream = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* node-compress-commons
	*
	* Copyright (c) 2014 Chris Talkington, contributors.
	* Licensed under the MIT license.
	* https://github.com/archiverjs/node-compress-commons/blob/master/LICENSE-MIT
	*/
	var inherits$2 = __require("util").inherits;
	var crc32 = require_buffer_crc32();
	var { CRC32Stream } = require_lib();
	var { DeflateCRC32Stream } = require_lib();
	var ArchiveOutputStream = require_archive_output_stream();
	require_zip_archive_entry();
	require_general_purpose_bit();
	var constants = require_constants();
	require_util();
	var zipUtil = require_util$1();
	var ZipArchiveOutputStream = module.exports = function(options) {
		if (!(this instanceof ZipArchiveOutputStream)) return new ZipArchiveOutputStream(options);
		options = this.options = this._defaults(options);
		ArchiveOutputStream.call(this, options);
		this._entry = null;
		this._entries = [];
		this._archive = {
			centralLength: 0,
			centralOffset: 0,
			comment: "",
			finish: false,
			finished: false,
			processing: false,
			forceZip64: options.forceZip64,
			forceLocalTime: options.forceLocalTime
		};
	};
	inherits$2(ZipArchiveOutputStream, ArchiveOutputStream);
	ZipArchiveOutputStream.prototype._afterAppend = function(ae) {
		this._entries.push(ae);
		if (ae.getGeneralPurposeBit().usesDataDescriptor()) this._writeDataDescriptor(ae);
		this._archive.processing = false;
		this._entry = null;
		if (this._archive.finish && !this._archive.finished) this._finish();
	};
	ZipArchiveOutputStream.prototype._appendBuffer = function(ae, source, callback) {
		if (source.length === 0) ae.setMethod(constants.METHOD_STORED);
		var method = ae.getMethod();
		if (method === constants.METHOD_STORED) {
			ae.setSize(source.length);
			ae.setCompressedSize(source.length);
			ae.setCrc(crc32.unsigned(source));
		}
		this._writeLocalFileHeader(ae);
		if (method === constants.METHOD_STORED) {
			this.write(source);
			this._afterAppend(ae);
			callback(null, ae);
			return;
		} else if (method === constants.METHOD_DEFLATED) {
			this._smartStream(ae, callback).end(source);
			return;
		} else {
			callback(/* @__PURE__ */ new Error("compression method " + method + " not implemented"));
			return;
		}
	};
	ZipArchiveOutputStream.prototype._appendStream = function(ae, source, callback) {
		ae.getGeneralPurposeBit().useDataDescriptor(true);
		ae.setVersionNeededToExtract(constants.MIN_VERSION_DATA_DESCRIPTOR);
		this._writeLocalFileHeader(ae);
		var smart = this._smartStream(ae, callback);
		source.once("error", function(err) {
			smart.emit("error", err);
			smart.end();
		});
		source.pipe(smart);
	};
	ZipArchiveOutputStream.prototype._defaults = function(o) {
		if (typeof o !== "object") o = {};
		if (typeof o.zlib !== "object") o.zlib = {};
		if (typeof o.zlib.level !== "number") o.zlib.level = constants.ZLIB_BEST_SPEED;
		o.forceZip64 = !!o.forceZip64;
		o.forceLocalTime = !!o.forceLocalTime;
		return o;
	};
	ZipArchiveOutputStream.prototype._finish = function() {
		this._archive.centralOffset = this.offset;
		this._entries.forEach(function(ae) {
			this._writeCentralFileHeader(ae);
		}.bind(this));
		this._archive.centralLength = this.offset - this._archive.centralOffset;
		if (this.isZip64()) this._writeCentralDirectoryZip64();
		this._writeCentralDirectoryEnd();
		this._archive.processing = false;
		this._archive.finish = true;
		this._archive.finished = true;
		this.end();
	};
	ZipArchiveOutputStream.prototype._normalizeEntry = function(ae) {
		if (ae.getMethod() === -1) ae.setMethod(constants.METHOD_DEFLATED);
		if (ae.getMethod() === constants.METHOD_DEFLATED) {
			ae.getGeneralPurposeBit().useDataDescriptor(true);
			ae.setVersionNeededToExtract(constants.MIN_VERSION_DATA_DESCRIPTOR);
		}
		if (ae.getTime() === -1) ae.setTime(/* @__PURE__ */ new Date(), this._archive.forceLocalTime);
		ae._offsets = {
			file: 0,
			data: 0,
			contents: 0
		};
	};
	ZipArchiveOutputStream.prototype._smartStream = function(ae, callback) {
		var process = ae.getMethod() === constants.METHOD_DEFLATED ? new DeflateCRC32Stream(this.options.zlib) : new CRC32Stream();
		var error = null;
		function handleStuff() {
			var digest = process.digest().readUInt32BE(0);
			ae.setCrc(digest);
			ae.setSize(process.size());
			ae.setCompressedSize(process.size(true));
			this._afterAppend(ae);
			callback(error, ae);
		}
		process.once("end", handleStuff.bind(this));
		process.once("error", function(err) {
			error = err;
		});
		process.pipe(this, { end: false });
		return process;
	};
	ZipArchiveOutputStream.prototype._writeCentralDirectoryEnd = function() {
		var records = this._entries.length;
		var size = this._archive.centralLength;
		var offset = this._archive.centralOffset;
		if (this.isZip64()) {
			records = constants.ZIP64_MAGIC_SHORT;
			size = constants.ZIP64_MAGIC;
			offset = constants.ZIP64_MAGIC;
		}
		this.write(zipUtil.getLongBytes(constants.SIG_EOCD));
		this.write(constants.SHORT_ZERO);
		this.write(constants.SHORT_ZERO);
		this.write(zipUtil.getShortBytes(records));
		this.write(zipUtil.getShortBytes(records));
		this.write(zipUtil.getLongBytes(size));
		this.write(zipUtil.getLongBytes(offset));
		var comment = this.getComment();
		var commentLength = Buffer.byteLength(comment);
		this.write(zipUtil.getShortBytes(commentLength));
		this.write(comment);
	};
	ZipArchiveOutputStream.prototype._writeCentralDirectoryZip64 = function() {
		this.write(zipUtil.getLongBytes(constants.SIG_ZIP64_EOCD));
		this.write(zipUtil.getEightBytes(44));
		this.write(zipUtil.getShortBytes(constants.MIN_VERSION_ZIP64));
		this.write(zipUtil.getShortBytes(constants.MIN_VERSION_ZIP64));
		this.write(constants.LONG_ZERO);
		this.write(constants.LONG_ZERO);
		this.write(zipUtil.getEightBytes(this._entries.length));
		this.write(zipUtil.getEightBytes(this._entries.length));
		this.write(zipUtil.getEightBytes(this._archive.centralLength));
		this.write(zipUtil.getEightBytes(this._archive.centralOffset));
		this.write(zipUtil.getLongBytes(constants.SIG_ZIP64_EOCD_LOC));
		this.write(constants.LONG_ZERO);
		this.write(zipUtil.getEightBytes(this._archive.centralOffset + this._archive.centralLength));
		this.write(zipUtil.getLongBytes(1));
	};
	ZipArchiveOutputStream.prototype._writeCentralFileHeader = function(ae) {
		var gpb = ae.getGeneralPurposeBit();
		var method = ae.getMethod();
		var offsets = ae._offsets;
		var size = ae.getSize();
		var compressedSize = ae.getCompressedSize();
		if (ae.isZip64() || offsets.file > constants.ZIP64_MAGIC) {
			size = constants.ZIP64_MAGIC;
			compressedSize = constants.ZIP64_MAGIC;
			ae.setVersionNeededToExtract(constants.MIN_VERSION_ZIP64);
			var extraBuf = Buffer.concat([
				zipUtil.getShortBytes(constants.ZIP64_EXTRA_ID),
				zipUtil.getShortBytes(24),
				zipUtil.getEightBytes(ae.getSize()),
				zipUtil.getEightBytes(ae.getCompressedSize()),
				zipUtil.getEightBytes(offsets.file)
			], 28);
			ae.setExtra(extraBuf);
		}
		this.write(zipUtil.getLongBytes(constants.SIG_CFH));
		this.write(zipUtil.getShortBytes(ae.getPlatform() << 8 | constants.VERSION_MADEBY));
		this.write(zipUtil.getShortBytes(ae.getVersionNeededToExtract()));
		this.write(gpb.encode());
		this.write(zipUtil.getShortBytes(method));
		this.write(zipUtil.getLongBytes(ae.getTimeDos()));
		this.write(zipUtil.getLongBytes(ae.getCrc()));
		this.write(zipUtil.getLongBytes(compressedSize));
		this.write(zipUtil.getLongBytes(size));
		var name = ae.getName();
		var comment = ae.getComment();
		var extra = ae.getCentralDirectoryExtra();
		if (gpb.usesUTF8ForNames()) {
			name = Buffer.from(name);
			comment = Buffer.from(comment);
		}
		this.write(zipUtil.getShortBytes(name.length));
		this.write(zipUtil.getShortBytes(extra.length));
		this.write(zipUtil.getShortBytes(comment.length));
		this.write(constants.SHORT_ZERO);
		this.write(zipUtil.getShortBytes(ae.getInternalAttributes()));
		this.write(zipUtil.getLongBytes(ae.getExternalAttributes()));
		if (offsets.file > constants.ZIP64_MAGIC) this.write(zipUtil.getLongBytes(constants.ZIP64_MAGIC));
		else this.write(zipUtil.getLongBytes(offsets.file));
		this.write(name);
		this.write(extra);
		this.write(comment);
	};
	ZipArchiveOutputStream.prototype._writeDataDescriptor = function(ae) {
		this.write(zipUtil.getLongBytes(constants.SIG_DD));
		this.write(zipUtil.getLongBytes(ae.getCrc()));
		if (ae.isZip64()) {
			this.write(zipUtil.getEightBytes(ae.getCompressedSize()));
			this.write(zipUtil.getEightBytes(ae.getSize()));
		} else {
			this.write(zipUtil.getLongBytes(ae.getCompressedSize()));
			this.write(zipUtil.getLongBytes(ae.getSize()));
		}
	};
	ZipArchiveOutputStream.prototype._writeLocalFileHeader = function(ae) {
		var gpb = ae.getGeneralPurposeBit();
		var method = ae.getMethod();
		var name = ae.getName();
		var extra = ae.getLocalFileDataExtra();
		if (ae.isZip64()) {
			gpb.useDataDescriptor(true);
			ae.setVersionNeededToExtract(constants.MIN_VERSION_ZIP64);
		}
		if (gpb.usesUTF8ForNames()) name = Buffer.from(name);
		ae._offsets.file = this.offset;
		this.write(zipUtil.getLongBytes(constants.SIG_LFH));
		this.write(zipUtil.getShortBytes(ae.getVersionNeededToExtract()));
		this.write(gpb.encode());
		this.write(zipUtil.getShortBytes(method));
		this.write(zipUtil.getLongBytes(ae.getTimeDos()));
		ae._offsets.data = this.offset;
		if (gpb.usesDataDescriptor()) {
			this.write(constants.LONG_ZERO);
			this.write(constants.LONG_ZERO);
			this.write(constants.LONG_ZERO);
		} else {
			this.write(zipUtil.getLongBytes(ae.getCrc()));
			this.write(zipUtil.getLongBytes(ae.getCompressedSize()));
			this.write(zipUtil.getLongBytes(ae.getSize()));
		}
		this.write(zipUtil.getShortBytes(name.length));
		this.write(zipUtil.getShortBytes(extra.length));
		this.write(name);
		this.write(extra);
		ae._offsets.contents = this.offset;
	};
	ZipArchiveOutputStream.prototype.getComment = function(comment) {
		return this._archive.comment !== null ? this._archive.comment : "";
	};
	ZipArchiveOutputStream.prototype.isZip64 = function() {
		return this._archive.forceZip64 || this._entries.length > constants.ZIP64_MAGIC_SHORT || this._archive.centralLength > constants.ZIP64_MAGIC || this._archive.centralOffset > constants.ZIP64_MAGIC;
	};
	ZipArchiveOutputStream.prototype.setComment = function(comment) {
		this._archive.comment = comment;
	};
}));
//#endregion
//#region node_modules/compress-commons/lib/compress-commons.js
var require_compress_commons = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* node-compress-commons
	*
	* Copyright (c) 2014 Chris Talkington, contributors.
	* Licensed under the MIT license.
	* https://github.com/archiverjs/node-compress-commons/blob/master/LICENSE-MIT
	*/
	module.exports = {
		ArchiveEntry: require_archive_entry(),
		ZipArchiveEntry: require_zip_archive_entry(),
		ArchiveOutputStream: require_archive_output_stream(),
		ZipArchiveOutputStream: require_zip_archive_output_stream()
	};
}));
//#endregion
//#region node_modules/zip-stream/node_modules/archiver-utils/file.js
var require_file = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* archiver-utils
	*
	* Copyright (c) 2012-2014 Chris Talkington, contributors.
	* Licensed under the MIT license.
	* https://github.com/archiverjs/node-archiver/blob/master/LICENSE-MIT
	*/
	var fs = require_graceful_fs();
	var path$1 = __require("path");
	var flatten = require_lodash_flatten();
	var difference = require_lodash_difference();
	var union = require_lodash_union();
	var isPlainObject = require_lodash_isplainobject();
	var glob = require_glob();
	var file = module.exports = {};
	var pathSeparatorRe = /[\/\\]/g;
	var processPatterns = function(patterns, fn) {
		var result = [];
		flatten(patterns).forEach(function(pattern) {
			var exclusion = pattern.indexOf("!") === 0;
			if (exclusion) pattern = pattern.slice(1);
			var matches = fn(pattern);
			if (exclusion) result = difference(result, matches);
			else result = union(result, matches);
		});
		return result;
	};
	file.exists = function() {
		var filepath = path$1.join.apply(path$1, arguments);
		return fs.existsSync(filepath);
	};
	file.expand = function(...args) {
		var options = isPlainObject(args[0]) ? args.shift() : {};
		var patterns = Array.isArray(args[0]) ? args[0] : args;
		if (patterns.length === 0) return [];
		var matches = processPatterns(patterns, function(pattern) {
			return glob.sync(pattern, options);
		});
		if (options.filter) matches = matches.filter(function(filepath) {
			filepath = path$1.join(options.cwd || "", filepath);
			try {
				if (typeof options.filter === "function") return options.filter(filepath);
				else return fs.statSync(filepath)[options.filter]();
			} catch (e) {
				return false;
			}
		});
		return matches;
	};
	file.expandMapping = function(patterns, destBase, options) {
		options = Object.assign({ rename: function(destBase, destPath) {
			return path$1.join(destBase || "", destPath);
		} }, options);
		var files = [];
		var fileByDest = {};
		file.expand(options, patterns).forEach(function(src) {
			var destPath = src;
			if (options.flatten) destPath = path$1.basename(destPath);
			if (options.ext) destPath = destPath.replace(/(\.[^\/]*)?$/, options.ext);
			var dest = options.rename(destBase, destPath, options);
			if (options.cwd) src = path$1.join(options.cwd, src);
			dest = dest.replace(pathSeparatorRe, "/");
			src = src.replace(pathSeparatorRe, "/");
			if (fileByDest[dest]) fileByDest[dest].src.push(src);
			else {
				files.push({
					src: [src],
					dest
				});
				fileByDest[dest] = files[files.length - 1];
			}
		});
		return files;
	};
	file.normalizeFilesArray = function(data) {
		var files = [];
		data.forEach(function(obj) {
			if ("src" in obj || "dest" in obj) files.push(obj);
		});
		if (files.length === 0) return [];
		files = _(files).chain().forEach(function(obj) {
			if (!("src" in obj) || !obj.src) return;
			if (Array.isArray(obj.src)) obj.src = flatten(obj.src);
			else obj.src = [obj.src];
		}).map(function(obj) {
			var expandOptions = Object.assign({}, obj);
			delete expandOptions.src;
			delete expandOptions.dest;
			if (obj.expand) return file.expandMapping(obj.src, obj.dest, expandOptions).map(function(mapObj) {
				var result = Object.assign({}, obj);
				result.orig = Object.assign({}, obj);
				result.src = mapObj.src;
				result.dest = mapObj.dest;
				[
					"expand",
					"cwd",
					"flatten",
					"rename",
					"ext"
				].forEach(function(prop) {
					delete result[prop];
				});
				return result;
			});
			var result = Object.assign({}, obj);
			result.orig = Object.assign({}, obj);
			if ("src" in result) Object.defineProperty(result, "src", {
				enumerable: true,
				get: function fn() {
					var src;
					if (!("result" in fn)) {
						src = obj.src;
						src = Array.isArray(src) ? flatten(src) : [src];
						fn.result = file.expand(expandOptions, src);
					}
					return fn.result;
				}
			});
			if ("dest" in result) result.dest = obj.dest;
			return result;
		}).flatten().value();
		return files;
	};
}));
//#endregion
//#region node_modules/zip-stream/node_modules/archiver-utils/index.js
var require_archiver_utils = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* archiver-utils
	*
	* Copyright (c) 2015 Chris Talkington.
	* Licensed under the MIT license.
	* https://github.com/archiverjs/archiver-utils/blob/master/LICENSE
	*/
	var fs = require_graceful_fs();
	var path = __require("path");
	var lazystream = require_lazystream();
	var normalizePath = require_normalize_path();
	var defaults = require_lodash_defaults();
	var Stream = __require("stream").Stream;
	var PassThrough = require_readable$2().PassThrough;
	var utils = module.exports = {};
	utils.file = require_file();
	utils.collectStream = function(source, callback) {
		var collection = [];
		var size = 0;
		source.on("error", callback);
		source.on("data", function(chunk) {
			collection.push(chunk);
			size += chunk.length;
		});
		source.on("end", function() {
			var buf = Buffer.alloc(size);
			var offset = 0;
			collection.forEach(function(data) {
				data.copy(buf, offset);
				offset += data.length;
			});
			callback(null, buf);
		});
	};
	utils.dateify = function(dateish) {
		dateish = dateish || /* @__PURE__ */ new Date();
		if (dateish instanceof Date) dateish = dateish;
		else if (typeof dateish === "string") dateish = new Date(dateish);
		else dateish = /* @__PURE__ */ new Date();
		return dateish;
	};
	utils.defaults = function(object, source, guard) {
		var args = arguments;
		args[0] = args[0] || {};
		return defaults(...args);
	};
	utils.isStream = function(source) {
		return source instanceof Stream;
	};
	utils.lazyReadStream = function(filepath) {
		return new lazystream.Readable(function() {
			return fs.createReadStream(filepath);
		});
	};
	utils.normalizeInputSource = function(source) {
		if (source === null) return Buffer.alloc(0);
		else if (typeof source === "string") return Buffer.from(source);
		else if (utils.isStream(source)) return source.pipe(new PassThrough());
		return source;
	};
	utils.sanitizePath = function(filepath) {
		return normalizePath(filepath, false).replace(/^\w+:/, "").replace(/^(\.\.\/|\/)+/, "");
	};
	utils.trailingSlashIt = function(str) {
		return str.slice(-1) !== "/" ? str + "/" : str;
	};
	utils.unixifyPath = function(filepath) {
		return normalizePath(filepath, false).replace(/^\w+:/, "");
	};
	utils.walkdir = function(dirpath, base, callback) {
		var results = [];
		if (typeof base === "function") {
			callback = base;
			base = dirpath;
		}
		fs.readdir(dirpath, function(err, list) {
			var i = 0;
			var file;
			var filepath;
			if (err) return callback(err);
			(function next() {
				file = list[i++];
				if (!file) return callback(null, results);
				filepath = path.join(dirpath, file);
				fs.stat(filepath, function(err, stats) {
					results.push({
						path: filepath,
						relative: path.relative(base, filepath).replace(/\\/g, "/"),
						stats
					});
					if (stats && stats.isDirectory()) utils.walkdir(filepath, base, function(err, res) {
						res.forEach(function(dirEntry) {
							results.push(dirEntry);
						});
						next();
					});
					else next();
				});
			})();
		});
	};
}));
//#endregion
//#region node_modules/zip-stream/index.js
var require_zip_stream = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* ZipStream
	*
	* @ignore
	* @license [MIT]{@link https://github.com/archiverjs/node-zip-stream/blob/master/LICENSE}
	* @copyright (c) 2014 Chris Talkington, contributors.
	*/
	var inherits$1 = __require("util").inherits;
	var ZipArchiveOutputStream = require_compress_commons().ZipArchiveOutputStream;
	var ZipArchiveEntry = require_compress_commons().ZipArchiveEntry;
	var util = require_archiver_utils();
	/**
	* @constructor
	* @extends external:ZipArchiveOutputStream
	* @param {Object} [options]
	* @param {String} [options.comment] Sets the zip archive comment.
	* @param {Boolean} [options.forceLocalTime=false] Forces the archive to contain local file times instead of UTC.
	* @param {Boolean} [options.forceZip64=false] Forces the archive to contain ZIP64 headers.
	* @param {Boolean} [options.store=false] Sets the compression method to STORE.
	* @param {Object} [options.zlib] Passed to [zlib]{@link https://nodejs.org/api/zlib.html#zlib_class_options}
	* to control compression.
	*/
	var ZipStream = module.exports = function(options) {
		if (!(this instanceof ZipStream)) return new ZipStream(options);
		options = this.options = options || {};
		options.zlib = options.zlib || {};
		ZipArchiveOutputStream.call(this, options);
		if (typeof options.level === "number" && options.level >= 0) {
			options.zlib.level = options.level;
			delete options.level;
		}
		if (!options.forceZip64 && typeof options.zlib.level === "number" && options.zlib.level === 0) options.store = true;
		options.namePrependSlash = options.namePrependSlash || false;
		if (options.comment && options.comment.length > 0) this.setComment(options.comment);
	};
	inherits$1(ZipStream, ZipArchiveOutputStream);
	/**
	* Normalizes entry data with fallbacks for key properties.
	*
	* @private
	* @param  {Object} data
	* @return {Object}
	*/
	ZipStream.prototype._normalizeFileData = function(data) {
		data = util.defaults(data, {
			type: "file",
			name: null,
			namePrependSlash: this.options.namePrependSlash,
			linkname: null,
			date: null,
			mode: null,
			store: this.options.store,
			comment: ""
		});
		var isDir = data.type === "directory";
		var isSymlink = data.type === "symlink";
		if (data.name) {
			data.name = util.sanitizePath(data.name);
			if (!isSymlink && data.name.slice(-1) === "/") {
				isDir = true;
				data.type = "directory";
			} else if (isDir) data.name += "/";
		}
		if (isDir || isSymlink) data.store = true;
		data.date = util.dateify(data.date);
		return data;
	};
	/**
	* Appends an entry given an input source (text string, buffer, or stream).
	*
	* @param  {(Buffer|Stream|String)} source The input source.
	* @param  {Object} data
	* @param  {String} data.name Sets the entry name including internal path.
	* @param  {String} [data.comment] Sets the entry comment.
	* @param  {(String|Date)} [data.date=NOW()] Sets the entry date.
	* @param  {Number} [data.mode=D:0755/F:0644] Sets the entry permissions.
	* @param  {Boolean} [data.store=options.store] Sets the compression method to STORE.
	* @param  {String} [data.type=file] Sets the entry type. Defaults to `directory`
	* if name ends with trailing slash.
	* @param  {Function} callback
	* @return this
	*/
	ZipStream.prototype.entry = function(source, data, callback) {
		if (typeof callback !== "function") callback = this._emitErrorCallback.bind(this);
		data = this._normalizeFileData(data);
		if (data.type !== "file" && data.type !== "directory" && data.type !== "symlink") {
			callback(/* @__PURE__ */ new Error(data.type + " entries not currently supported"));
			return;
		}
		if (typeof data.name !== "string" || data.name.length === 0) {
			callback(/* @__PURE__ */ new Error("entry name must be a non-empty string value"));
			return;
		}
		if (data.type === "symlink" && typeof data.linkname !== "string") {
			callback(/* @__PURE__ */ new Error("entry linkname must be a non-empty string value when type equals symlink"));
			return;
		}
		var entry = new ZipArchiveEntry(data.name);
		entry.setTime(data.date, this.options.forceLocalTime);
		if (data.namePrependSlash) entry.setName(data.name, true);
		if (data.store) entry.setMethod(0);
		if (data.comment.length > 0) entry.setComment(data.comment);
		if (data.type === "symlink" && typeof data.mode !== "number") data.mode = 40960;
		if (typeof data.mode === "number") {
			if (data.type === "symlink") data.mode |= 40960;
			entry.setUnixMode(data.mode);
		}
		if (data.type === "symlink" && typeof data.linkname === "string") source = Buffer.from(data.linkname);
		return ZipArchiveOutputStream.prototype.entry.call(this, entry, source, callback);
	};
	/**
	* Finalizes the instance and prevents further appending to the archive
	* structure (queue will continue til drained).
	*
	* @return void
	*/
	ZipStream.prototype.finalize = function() {
		this.finish();
	};
}));
/**
* Returns the current number of bytes written to this stream.
* @function ZipStream#getBytesWritten
* @returns {Number}
*/
/**
* Compress Commons ZipArchiveOutputStream
* @external ZipArchiveOutputStream
* @see {@link https://github.com/archiverjs/node-compress-commons}
*/
//#endregion
//#region node_modules/archiver/lib/plugins/zip.js
var require_zip = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* ZIP Format Plugin
	*
	* @module plugins/zip
	* @license [MIT]{@link https://github.com/archiverjs/node-archiver/blob/master/LICENSE}
	* @copyright (c) 2012-2014 Chris Talkington, contributors.
	*/
	var engine = require_zip_stream();
	var util = require_archiver_utils$1();
	/**
	* @constructor
	* @param {ZipOptions} [options]
	* @param {String} [options.comment] Sets the zip archive comment.
	* @param {Boolean} [options.forceLocalTime=false] Forces the archive to contain local file times instead of UTC.
	* @param {Boolean} [options.forceZip64=false] Forces the archive to contain ZIP64 headers.
	* @param {Boolean} [options.namePrependSlash=false] Prepends a forward slash to archive file paths.
	* @param {Boolean} [options.store=false] Sets the compression method to STORE.
	* @param {Object} [options.zlib] Passed to [zlib]{@link https://nodejs.org/api/zlib.html#zlib_class_options}
	*/
	var Zip = function(options) {
		if (!(this instanceof Zip)) return new Zip(options);
		options = this.options = util.defaults(options, {
			comment: "",
			forceUTC: false,
			namePrependSlash: false,
			store: false
		});
		this.supports = {
			directory: true,
			symlink: true
		};
		this.engine = new engine(options);
	};
	/**
	* @param  {(Buffer|Stream)} source
	* @param  {ZipEntryData} data
	* @param  {String} data.name Sets the entry name including internal path.
	* @param  {(String|Date)} [data.date=NOW()] Sets the entry date.
	* @param  {Number} [data.mode=D:0755/F:0644] Sets the entry permissions.
	* @param  {String} [data.prefix] Sets a path prefix for the entry name. Useful
	* when working with methods like `directory` or `glob`.
	* @param  {fs.Stats} [data.stats] Sets the fs stat data for this entry allowing
	* for reduction of fs stat calls when stat data is already known.
	* @param  {Boolean} [data.store=ZipOptions.store] Sets the compression method to STORE.
	* @param  {Function} callback
	* @return void
	*/
	Zip.prototype.append = function(source, data, callback) {
		this.engine.entry(source, data, callback);
	};
	/**
	* @return void
	*/
	Zip.prototype.finalize = function() {
		this.engine.finalize();
	};
	/**
	* @return this.engine
	*/
	Zip.prototype.on = function() {
		return this.engine.on.apply(this.engine, arguments);
	};
	/**
	* @return this.engine
	*/
	Zip.prototype.pipe = function() {
		return this.engine.pipe.apply(this.engine, arguments);
	};
	/**
	* @return this.engine
	*/
	Zip.prototype.unpipe = function() {
		return this.engine.unpipe.apply(this.engine, arguments);
	};
	module.exports = Zip;
}));
/**
* @typedef {Object} ZipOptions
* @global
* @property {String} [comment] Sets the zip archive comment.
* @property {Boolean} [forceLocalTime=false] Forces the archive to contain local file times instead of UTC.
* @property {Boolean} [forceZip64=false] Forces the archive to contain ZIP64 headers.
* @prpperty {Boolean} [namePrependSlash=false] Prepends a forward slash to archive file paths.
* @property {Boolean} [store=false] Sets the compression method to STORE.
* @property {Object} [zlib] Passed to [zlib]{@link https://nodejs.org/api/zlib.html#zlib_class_options}
* to control compression.
* @property {*} [*] See [zip-stream]{@link https://archiverjs.com/zip-stream/ZipStream.html} documentation for current list of properties.
*/
/**
* @typedef {Object} ZipEntryData
* @global
* @property {String} name Sets the entry name including internal path.
* @property {(String|Date)} [date=NOW()] Sets the entry date.
* @property {Number} [mode=D:0755/F:0644] Sets the entry permissions.
* @property {Boolean} [namePrependSlash=ZipOptions.namePrependSlash] Prepends a forward slash to archive file paths.
* @property {String} [prefix] Sets a path prefix for the entry name. Useful
* when working with methods like `directory` or `glob`.
* @property {fs.Stats} [stats] Sets the fs stat data for this entry allowing
* for reduction of fs stat calls when stat data is already known.
* @property {Boolean} [store=ZipOptions.store] Sets the compression method to STORE.
*/
/**
* ZipStream Module
* @external ZipStream
* @see {@link https://www.archiverjs.com/zip-stream/ZipStream.html}
*/
//#endregion
//#region node_modules/bl/BufferList.js
var require_BufferList = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var { Buffer: Buffer$1 } = __require("buffer");
	var symbol = Symbol.for("BufferList");
	function BufferList(buf) {
		if (!(this instanceof BufferList)) return new BufferList(buf);
		BufferList._init.call(this, buf);
	}
	BufferList._init = function _init(buf) {
		Object.defineProperty(this, symbol, { value: true });
		this._bufs = [];
		this.length = 0;
		if (buf) this.append(buf);
	};
	BufferList.prototype._new = function _new(buf) {
		return new BufferList(buf);
	};
	BufferList.prototype._offset = function _offset(offset) {
		if (offset === 0) return [0, 0];
		let tot = 0;
		for (let i = 0; i < this._bufs.length; i++) {
			const _t = tot + this._bufs[i].length;
			if (offset < _t || i === this._bufs.length - 1) return [i, offset - tot];
			tot = _t;
		}
	};
	BufferList.prototype._reverseOffset = function(blOffset) {
		const bufferId = blOffset[0];
		let offset = blOffset[1];
		for (let i = 0; i < bufferId; i++) offset += this._bufs[i].length;
		return offset;
	};
	BufferList.prototype.get = function get(index) {
		if (index > this.length || index < 0) return;
		const offset = this._offset(index);
		return this._bufs[offset[0]][offset[1]];
	};
	BufferList.prototype.slice = function slice(start, end) {
		if (typeof start === "number" && start < 0) start += this.length;
		if (typeof end === "number" && end < 0) end += this.length;
		return this.copy(null, 0, start, end);
	};
	BufferList.prototype.copy = function copy(dst, dstStart, srcStart, srcEnd) {
		if (typeof srcStart !== "number" || srcStart < 0) srcStart = 0;
		if (typeof srcEnd !== "number" || srcEnd > this.length) srcEnd = this.length;
		if (srcStart >= this.length) return dst || Buffer$1.alloc(0);
		if (srcEnd <= 0) return dst || Buffer$1.alloc(0);
		const copy = !!dst;
		const off = this._offset(srcStart);
		const len = srcEnd - srcStart;
		let bytes = len;
		let bufoff = copy && dstStart || 0;
		let start = off[1];
		if (srcStart === 0 && srcEnd === this.length) {
			if (!copy) return this._bufs.length === 1 ? this._bufs[0] : Buffer$1.concat(this._bufs, this.length);
			for (let i = 0; i < this._bufs.length; i++) {
				this._bufs[i].copy(dst, bufoff);
				bufoff += this._bufs[i].length;
			}
			return dst;
		}
		if (bytes <= this._bufs[off[0]].length - start) return copy ? this._bufs[off[0]].copy(dst, dstStart, start, start + bytes) : this._bufs[off[0]].slice(start, start + bytes);
		if (!copy) dst = Buffer$1.allocUnsafe(len);
		for (let i = off[0]; i < this._bufs.length; i++) {
			const l = this._bufs[i].length - start;
			if (bytes > l) {
				this._bufs[i].copy(dst, bufoff, start);
				bufoff += l;
			} else {
				this._bufs[i].copy(dst, bufoff, start, start + bytes);
				bufoff += l;
				break;
			}
			bytes -= l;
			if (start) start = 0;
		}
		if (dst.length > bufoff) return dst.slice(0, bufoff);
		return dst;
	};
	BufferList.prototype.shallowSlice = function shallowSlice(start, end) {
		start = start || 0;
		end = typeof end !== "number" ? this.length : end;
		if (start < 0) start += this.length;
		if (end < 0) end += this.length;
		if (start === end) return this._new();
		const startOffset = this._offset(start);
		const endOffset = this._offset(end);
		const buffers = this._bufs.slice(startOffset[0], endOffset[0] + 1);
		if (endOffset[1] === 0) buffers.pop();
		else buffers[buffers.length - 1] = buffers[buffers.length - 1].slice(0, endOffset[1]);
		if (startOffset[1] !== 0) buffers[0] = buffers[0].slice(startOffset[1]);
		return this._new(buffers);
	};
	BufferList.prototype.toString = function toString(encoding, start, end) {
		return this.slice(start, end).toString(encoding);
	};
	BufferList.prototype.consume = function consume(bytes) {
		bytes = Math.trunc(bytes);
		if (Number.isNaN(bytes) || bytes <= 0) return this;
		while (this._bufs.length) if (bytes >= this._bufs[0].length) {
			bytes -= this._bufs[0].length;
			this.length -= this._bufs[0].length;
			this._bufs.shift();
		} else {
			this._bufs[0] = this._bufs[0].slice(bytes);
			this.length -= bytes;
			break;
		}
		return this;
	};
	BufferList.prototype.duplicate = function duplicate() {
		const copy = this._new();
		for (let i = 0; i < this._bufs.length; i++) copy.append(this._bufs[i]);
		return copy;
	};
	BufferList.prototype.append = function append(buf) {
		if (buf == null) return this;
		if (buf.buffer) this._appendBuffer(Buffer$1.from(buf.buffer, buf.byteOffset, buf.byteLength));
		else if (Array.isArray(buf)) for (let i = 0; i < buf.length; i++) this.append(buf[i]);
		else if (this._isBufferList(buf)) for (let i = 0; i < buf._bufs.length; i++) this.append(buf._bufs[i]);
		else {
			if (typeof buf === "number") buf = buf.toString();
			this._appendBuffer(Buffer$1.from(buf));
		}
		return this;
	};
	BufferList.prototype._appendBuffer = function appendBuffer(buf) {
		this._bufs.push(buf);
		this.length += buf.length;
	};
	BufferList.prototype.indexOf = function(search, offset, encoding) {
		if (encoding === void 0 && typeof offset === "string") {
			encoding = offset;
			offset = void 0;
		}
		if (typeof search === "function" || Array.isArray(search)) throw new TypeError("The \"value\" argument must be one of type string, Buffer, BufferList, or Uint8Array.");
		else if (typeof search === "number") search = Buffer$1.from([search]);
		else if (typeof search === "string") search = Buffer$1.from(search, encoding);
		else if (this._isBufferList(search)) search = search.slice();
		else if (Array.isArray(search.buffer)) search = Buffer$1.from(search.buffer, search.byteOffset, search.byteLength);
		else if (!Buffer$1.isBuffer(search)) search = Buffer$1.from(search);
		offset = Number(offset || 0);
		if (isNaN(offset)) offset = 0;
		if (offset < 0) offset = this.length + offset;
		if (offset < 0) offset = 0;
		if (search.length === 0) return offset > this.length ? this.length : offset;
		const blOffset = this._offset(offset);
		let blIndex = blOffset[0];
		let buffOffset = blOffset[1];
		for (; blIndex < this._bufs.length; blIndex++) {
			const buff = this._bufs[blIndex];
			while (buffOffset < buff.length) if (buff.length - buffOffset >= search.length) {
				const nativeSearchResult = buff.indexOf(search, buffOffset);
				if (nativeSearchResult !== -1) return this._reverseOffset([blIndex, nativeSearchResult]);
				buffOffset = buff.length - search.length + 1;
			} else {
				const revOffset = this._reverseOffset([blIndex, buffOffset]);
				if (this._match(revOffset, search)) return revOffset;
				buffOffset++;
			}
			buffOffset = 0;
		}
		return -1;
	};
	BufferList.prototype._match = function(offset, search) {
		if (this.length - offset < search.length) return false;
		for (let searchOffset = 0; searchOffset < search.length; searchOffset++) if (this.get(offset + searchOffset) !== search[searchOffset]) return false;
		return true;
	};
	(function() {
		const methods = {
			readDoubleBE: 8,
			readDoubleLE: 8,
			readFloatBE: 4,
			readFloatLE: 4,
			readInt32BE: 4,
			readInt32LE: 4,
			readUInt32BE: 4,
			readUInt32LE: 4,
			readInt16BE: 2,
			readInt16LE: 2,
			readUInt16BE: 2,
			readUInt16LE: 2,
			readInt8: 1,
			readUInt8: 1,
			readIntBE: null,
			readIntLE: null,
			readUIntBE: null,
			readUIntLE: null
		};
		for (const m in methods) (function(m) {
			if (methods[m] === null) BufferList.prototype[m] = function(offset, byteLength) {
				return this.slice(offset, offset + byteLength)[m](0, byteLength);
			};
			else BufferList.prototype[m] = function(offset = 0) {
				return this.slice(offset, offset + methods[m])[m](0);
			};
		})(m);
	})();
	BufferList.prototype._isBufferList = function _isBufferList(b) {
		return b instanceof BufferList || BufferList.isBufferList(b);
	};
	BufferList.isBufferList = function isBufferList(b) {
		return b != null && b[symbol];
	};
	module.exports = BufferList;
}));
//#endregion
//#region node_modules/bl/bl.js
var require_bl = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var DuplexStream = require_readable$2().Duplex;
	var inherits = require_inherits();
	var BufferList = require_BufferList();
	function BufferListStream(callback) {
		if (!(this instanceof BufferListStream)) return new BufferListStream(callback);
		if (typeof callback === "function") {
			this._callback = callback;
			const piper = function piper(err) {
				if (this._callback) {
					this._callback(err);
					this._callback = null;
				}
			}.bind(this);
			this.on("pipe", function onPipe(src) {
				src.on("error", piper);
			});
			this.on("unpipe", function onUnpipe(src) {
				src.removeListener("error", piper);
			});
			callback = null;
		}
		BufferList._init.call(this, callback);
		DuplexStream.call(this);
	}
	inherits(BufferListStream, DuplexStream);
	Object.assign(BufferListStream.prototype, BufferList.prototype);
	BufferListStream.prototype._new = function _new(callback) {
		return new BufferListStream(callback);
	};
	BufferListStream.prototype._write = function _write(buf, encoding, callback) {
		this._appendBuffer(buf);
		if (typeof callback === "function") callback();
	};
	BufferListStream.prototype._read = function _read(size) {
		if (!this.length) return this.push(null);
		size = Math.min(size, this.length);
		this.push(this.slice(0, size));
		this.consume(size);
	};
	BufferListStream.prototype.end = function end(chunk) {
		DuplexStream.prototype.end.call(this, chunk);
		if (this._callback) {
			this._callback(null, this.slice());
			this._callback = null;
		}
	};
	BufferListStream.prototype._destroy = function _destroy(err, cb) {
		this._bufs.length = 0;
		this.length = 0;
		cb(err);
	};
	BufferListStream.prototype._isBufferList = function _isBufferList(b) {
		return b instanceof BufferListStream || b instanceof BufferList || BufferListStream.isBufferList(b);
	};
	BufferListStream.isBufferList = BufferList.isBufferList;
	module.exports = BufferListStream;
	module.exports.BufferListStream = BufferListStream;
	module.exports.BufferList = BufferList;
}));
//#endregion
//#region node_modules/tar-stream/headers.js
var require_headers = /* @__PURE__ */ __commonJSMin(((exports) => {
	var alloc = Buffer.alloc;
	var ZEROS = "0000000000000000000";
	var SEVENS = "7777777777777777777";
	var ZERO_OFFSET = "0".charCodeAt(0);
	var USTAR_MAGIC = Buffer.from("ustar\0", "binary");
	var USTAR_VER = Buffer.from("00", "binary");
	var GNU_MAGIC = Buffer.from("ustar ", "binary");
	var GNU_VER = Buffer.from(" \0", "binary");
	var MASK = parseInt("7777", 8);
	var MAGIC_OFFSET = 257;
	var VERSION_OFFSET = 263;
	var clamp = function(index, len, defaultValue) {
		if (typeof index !== "number") return defaultValue;
		index = ~~index;
		if (index >= len) return len;
		if (index >= 0) return index;
		index += len;
		if (index >= 0) return index;
		return 0;
	};
	var toType = function(flag) {
		switch (flag) {
			case 0: return "file";
			case 1: return "link";
			case 2: return "symlink";
			case 3: return "character-device";
			case 4: return "block-device";
			case 5: return "directory";
			case 6: return "fifo";
			case 7: return "contiguous-file";
			case 72: return "pax-header";
			case 55: return "pax-global-header";
			case 27: return "gnu-long-link-path";
			case 28:
			case 30: return "gnu-long-path";
		}
		return null;
	};
	var toTypeflag = function(flag) {
		switch (flag) {
			case "file": return 0;
			case "link": return 1;
			case "symlink": return 2;
			case "character-device": return 3;
			case "block-device": return 4;
			case "directory": return 5;
			case "fifo": return 6;
			case "contiguous-file": return 7;
			case "pax-header": return 72;
		}
		return 0;
	};
	var indexOf = function(block, num, offset, end) {
		for (; offset < end; offset++) if (block[offset] === num) return offset;
		return end;
	};
	var cksum = function(block) {
		var sum = 256;
		for (var i = 0; i < 148; i++) sum += block[i];
		for (var j = 156; j < 512; j++) sum += block[j];
		return sum;
	};
	var encodeOct = function(val, n) {
		val = val.toString(8);
		if (val.length > n) return SEVENS.slice(0, n) + " ";
		else return ZEROS.slice(0, n - val.length) + val + " ";
	};
	function parse256(buf) {
		var positive;
		if (buf[0] === 128) positive = true;
		else if (buf[0] === 255) positive = false;
		else return null;
		var tuple = [];
		for (var i = buf.length - 1; i > 0; i--) {
			var byte = buf[i];
			if (positive) tuple.push(byte);
			else tuple.push(255 - byte);
		}
		var sum = 0;
		var l = tuple.length;
		for (i = 0; i < l; i++) sum += tuple[i] * Math.pow(256, i);
		return positive ? sum : -1 * sum;
	}
	var decodeOct = function(val, offset, length) {
		val = val.slice(offset, offset + length);
		offset = 0;
		if (val[offset] & 128) return parse256(val);
		else {
			while (offset < val.length && val[offset] === 32) offset++;
			var end = clamp(indexOf(val, 32, offset, val.length), val.length, val.length);
			while (offset < end && val[offset] === 0) offset++;
			if (end === offset) return 0;
			return parseInt(val.slice(offset, end).toString(), 8);
		}
	};
	var decodeStr = function(val, offset, length, encoding) {
		return val.slice(offset, indexOf(val, 0, offset, offset + length)).toString(encoding);
	};
	var addLength = function(str) {
		var len = Buffer.byteLength(str);
		var digits = Math.floor(Math.log(len) / Math.log(10)) + 1;
		if (len + digits >= Math.pow(10, digits)) digits++;
		return len + digits + str;
	};
	exports.decodeLongPath = function(buf, encoding) {
		return decodeStr(buf, 0, buf.length, encoding);
	};
	exports.encodePax = function(opts) {
		var result = "";
		if (opts.name) result += addLength(" path=" + opts.name + "\n");
		if (opts.linkname) result += addLength(" linkpath=" + opts.linkname + "\n");
		var pax = opts.pax;
		if (pax) for (var key in pax) result += addLength(" " + key + "=" + pax[key] + "\n");
		return Buffer.from(result);
	};
	exports.decodePax = function(buf) {
		var result = {};
		while (buf.length) {
			var i = 0;
			while (i < buf.length && buf[i] !== 32) i++;
			var len = parseInt(buf.slice(0, i).toString(), 10);
			if (!len) return result;
			var b = buf.slice(i + 1, len - 1).toString();
			var keyIndex = b.indexOf("=");
			if (keyIndex === -1) return result;
			result[b.slice(0, keyIndex)] = b.slice(keyIndex + 1);
			buf = buf.slice(len);
		}
		return result;
	};
	exports.encode = function(opts) {
		var buf = alloc(512);
		var name = opts.name;
		var prefix = "";
		if (opts.typeflag === 5 && name[name.length - 1] !== "/") name += "/";
		if (Buffer.byteLength(name) !== name.length) return null;
		while (Buffer.byteLength(name) > 100) {
			var i = name.indexOf("/");
			if (i === -1) return null;
			prefix += prefix ? "/" + name.slice(0, i) : name.slice(0, i);
			name = name.slice(i + 1);
		}
		if (Buffer.byteLength(name) > 100 || Buffer.byteLength(prefix) > 155) return null;
		if (opts.linkname && Buffer.byteLength(opts.linkname) > 100) return null;
		buf.write(name);
		buf.write(encodeOct(opts.mode & MASK, 6), 100);
		buf.write(encodeOct(opts.uid, 6), 108);
		buf.write(encodeOct(opts.gid, 6), 116);
		buf.write(encodeOct(opts.size, 11), 124);
		buf.write(encodeOct(opts.mtime.getTime() / 1e3 | 0, 11), 136);
		buf[156] = ZERO_OFFSET + toTypeflag(opts.type);
		if (opts.linkname) buf.write(opts.linkname, 157);
		USTAR_MAGIC.copy(buf, MAGIC_OFFSET);
		USTAR_VER.copy(buf, VERSION_OFFSET);
		if (opts.uname) buf.write(opts.uname, 265);
		if (opts.gname) buf.write(opts.gname, 297);
		buf.write(encodeOct(opts.devmajor || 0, 6), 329);
		buf.write(encodeOct(opts.devminor || 0, 6), 337);
		if (prefix) buf.write(prefix, 345);
		buf.write(encodeOct(cksum(buf), 6), 148);
		return buf;
	};
	exports.decode = function(buf, filenameEncoding, allowUnknownFormat) {
		var typeflag = buf[156] === 0 ? 0 : buf[156] - ZERO_OFFSET;
		var name = decodeStr(buf, 0, 100, filenameEncoding);
		var mode = decodeOct(buf, 100, 8);
		var uid = decodeOct(buf, 108, 8);
		var gid = decodeOct(buf, 116, 8);
		var size = decodeOct(buf, 124, 12);
		var mtime = decodeOct(buf, 136, 12);
		var type = toType(typeflag);
		var linkname = buf[157] === 0 ? null : decodeStr(buf, 157, 100, filenameEncoding);
		var uname = decodeStr(buf, 265, 32);
		var gname = decodeStr(buf, 297, 32);
		var devmajor = decodeOct(buf, 329, 8);
		var devminor = decodeOct(buf, 337, 8);
		var c = cksum(buf);
		if (c === 256) return null;
		if (c !== decodeOct(buf, 148, 8)) throw new Error("Invalid tar header. Maybe the tar is corrupted or it needs to be gunzipped?");
		if (USTAR_MAGIC.compare(buf, MAGIC_OFFSET, MAGIC_OFFSET + 6) === 0) {
			if (buf[345]) name = decodeStr(buf, 345, 155, filenameEncoding) + "/" + name;
		} else if (GNU_MAGIC.compare(buf, MAGIC_OFFSET, MAGIC_OFFSET + 6) === 0 && GNU_VER.compare(buf, VERSION_OFFSET, VERSION_OFFSET + 2) === 0) {} else if (!allowUnknownFormat) throw new Error("Invalid tar header: unknown format.");
		if (typeflag === 0 && name && name[name.length - 1] === "/") typeflag = 5;
		return {
			name,
			mode,
			uid,
			gid,
			size,
			mtime: /* @__PURE__ */ new Date(1e3 * mtime),
			type,
			linkname,
			uname,
			gname,
			devmajor,
			devminor
		};
	};
}));
//#endregion
//#region node_modules/tar-stream/extract.js
var require_extract = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var util = __require("util");
	var bl = require_bl();
	var headers = require_headers();
	var Writable = require_readable$2().Writable;
	var PassThrough = require_readable$2().PassThrough;
	var noop = function() {};
	var overflow = function(size) {
		size &= 511;
		return size && 512 - size;
	};
	var emptyStream = function(self, offset) {
		var s = new Source(self, offset);
		s.end();
		return s;
	};
	var mixinPax = function(header, pax) {
		if (pax.path) header.name = pax.path;
		if (pax.linkpath) header.linkname = pax.linkpath;
		if (pax.size) header.size = parseInt(pax.size, 10);
		header.pax = pax;
		return header;
	};
	var Source = function(self, offset) {
		this._parent = self;
		this.offset = offset;
		PassThrough.call(this, { autoDestroy: false });
	};
	util.inherits(Source, PassThrough);
	Source.prototype.destroy = function(err) {
		this._parent.destroy(err);
	};
	var Extract = function(opts) {
		if (!(this instanceof Extract)) return new Extract(opts);
		Writable.call(this, opts);
		opts = opts || {};
		this._offset = 0;
		this._buffer = bl();
		this._missing = 0;
		this._partial = false;
		this._onparse = noop;
		this._header = null;
		this._stream = null;
		this._overflow = null;
		this._cb = null;
		this._locked = false;
		this._destroyed = false;
		this._pax = null;
		this._paxGlobal = null;
		this._gnuLongPath = null;
		this._gnuLongLinkPath = null;
		var self = this;
		var b = self._buffer;
		var oncontinue = function() {
			self._continue();
		};
		var onunlock = function(err) {
			self._locked = false;
			if (err) return self.destroy(err);
			if (!self._stream) oncontinue();
		};
		var onstreamend = function() {
			self._stream = null;
			var drain = overflow(self._header.size);
			if (drain) self._parse(drain, ondrain);
			else self._parse(512, onheader);
			if (!self._locked) oncontinue();
		};
		var ondrain = function() {
			self._buffer.consume(overflow(self._header.size));
			self._parse(512, onheader);
			oncontinue();
		};
		var onpaxglobalheader = function() {
			var size = self._header.size;
			self._paxGlobal = headers.decodePax(b.slice(0, size));
			b.consume(size);
			onstreamend();
		};
		var onpaxheader = function() {
			var size = self._header.size;
			self._pax = headers.decodePax(b.slice(0, size));
			if (self._paxGlobal) self._pax = Object.assign({}, self._paxGlobal, self._pax);
			b.consume(size);
			onstreamend();
		};
		var ongnulongpath = function() {
			var size = self._header.size;
			this._gnuLongPath = headers.decodeLongPath(b.slice(0, size), opts.filenameEncoding);
			b.consume(size);
			onstreamend();
		};
		var ongnulonglinkpath = function() {
			var size = self._header.size;
			this._gnuLongLinkPath = headers.decodeLongPath(b.slice(0, size), opts.filenameEncoding);
			b.consume(size);
			onstreamend();
		};
		var onheader = function() {
			var offset = self._offset;
			var header;
			try {
				header = self._header = headers.decode(b.slice(0, 512), opts.filenameEncoding, opts.allowUnknownFormat);
			} catch (err) {
				self.emit("error", err);
			}
			b.consume(512);
			if (!header) {
				self._parse(512, onheader);
				oncontinue();
				return;
			}
			if (header.type === "gnu-long-path") {
				self._parse(header.size, ongnulongpath);
				oncontinue();
				return;
			}
			if (header.type === "gnu-long-link-path") {
				self._parse(header.size, ongnulonglinkpath);
				oncontinue();
				return;
			}
			if (header.type === "pax-global-header") {
				self._parse(header.size, onpaxglobalheader);
				oncontinue();
				return;
			}
			if (header.type === "pax-header") {
				self._parse(header.size, onpaxheader);
				oncontinue();
				return;
			}
			if (self._gnuLongPath) {
				header.name = self._gnuLongPath;
				self._gnuLongPath = null;
			}
			if (self._gnuLongLinkPath) {
				header.linkname = self._gnuLongLinkPath;
				self._gnuLongLinkPath = null;
			}
			if (self._pax) {
				self._header = header = mixinPax(header, self._pax);
				self._pax = null;
			}
			self._locked = true;
			if (!header.size || header.type === "directory") {
				self._parse(512, onheader);
				self.emit("entry", header, emptyStream(self, offset), onunlock);
				return;
			}
			self._stream = new Source(self, offset);
			self.emit("entry", header, self._stream, onunlock);
			self._parse(header.size, onstreamend);
			oncontinue();
		};
		this._onheader = onheader;
		this._parse(512, onheader);
	};
	util.inherits(Extract, Writable);
	Extract.prototype.destroy = function(err) {
		if (this._destroyed) return;
		this._destroyed = true;
		if (err) this.emit("error", err);
		this.emit("close");
		if (this._stream) this._stream.emit("close");
	};
	Extract.prototype._parse = function(size, onparse) {
		if (this._destroyed) return;
		this._offset += size;
		this._missing = size;
		if (onparse === this._onheader) this._partial = false;
		this._onparse = onparse;
	};
	Extract.prototype._continue = function() {
		if (this._destroyed) return;
		var cb = this._cb;
		this._cb = noop;
		if (this._overflow) this._write(this._overflow, void 0, cb);
		else cb();
	};
	Extract.prototype._write = function(data, enc, cb) {
		if (this._destroyed) return;
		var s = this._stream;
		var b = this._buffer;
		var missing = this._missing;
		if (data.length) this._partial = true;
		if (data.length < missing) {
			this._missing -= data.length;
			this._overflow = null;
			if (s) return s.write(data, cb);
			b.append(data);
			return cb();
		}
		this._cb = cb;
		this._missing = 0;
		var overflow = null;
		if (data.length > missing) {
			overflow = data.slice(missing);
			data = data.slice(0, missing);
		}
		if (s) s.end(data);
		else b.append(data);
		this._overflow = overflow;
		this._onparse();
	};
	Extract.prototype._final = function(cb) {
		if (this._partial) return this.destroy(/* @__PURE__ */ new Error("Unexpected end of data"));
		cb();
	};
	module.exports = Extract;
}));
//#endregion
//#region node_modules/fs-constants/index.js
var require_fs_constants = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = __require("fs").constants || __require("constants");
}));
//#endregion
//#region node_modules/end-of-stream/index.js
var require_end_of_stream = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var once = require_once();
	var noop = function() {};
	var qnt = global.Bare ? queueMicrotask : process.nextTick.bind(process);
	var isRequest = function(stream) {
		return stream.setHeader && typeof stream.abort === "function";
	};
	var isChildProcess = function(stream) {
		return stream.stdio && Array.isArray(stream.stdio) && stream.stdio.length === 3;
	};
	var eos = function(stream, opts, callback) {
		if (typeof opts === "function") return eos(stream, null, opts);
		if (!opts) opts = {};
		callback = once(callback || noop);
		var ws = stream._writableState;
		var rs = stream._readableState;
		var readable = opts.readable || opts.readable !== false && stream.readable;
		var writable = opts.writable || opts.writable !== false && stream.writable;
		var cancelled = false;
		var onlegacyfinish = function() {
			if (!stream.writable) onfinish();
		};
		var onfinish = function() {
			writable = false;
			if (!readable) callback.call(stream);
		};
		var onend = function() {
			readable = false;
			if (!writable) callback.call(stream);
		};
		var onexit = function(exitCode) {
			callback.call(stream, exitCode ? /* @__PURE__ */ new Error("exited with error code: " + exitCode) : null);
		};
		var onerror = function(err) {
			callback.call(stream, err);
		};
		var onclose = function() {
			qnt(onclosenexttick);
		};
		var onclosenexttick = function() {
			if (cancelled) return;
			if (readable && !(rs && rs.ended && !rs.destroyed)) return callback.call(stream, /* @__PURE__ */ new Error("premature close"));
			if (writable && !(ws && ws.ended && !ws.destroyed)) return callback.call(stream, /* @__PURE__ */ new Error("premature close"));
		};
		var onrequest = function() {
			stream.req.on("finish", onfinish);
		};
		if (isRequest(stream)) {
			stream.on("complete", onfinish);
			stream.on("abort", onclose);
			if (stream.req) onrequest();
			else stream.on("request", onrequest);
		} else if (writable && !ws) {
			stream.on("end", onlegacyfinish);
			stream.on("close", onlegacyfinish);
		}
		if (isChildProcess(stream)) stream.on("exit", onexit);
		stream.on("end", onend);
		stream.on("finish", onfinish);
		if (opts.error !== false) stream.on("error", onerror);
		stream.on("close", onclose);
		return function() {
			cancelled = true;
			stream.removeListener("complete", onfinish);
			stream.removeListener("abort", onclose);
			stream.removeListener("request", onrequest);
			if (stream.req) stream.req.removeListener("finish", onfinish);
			stream.removeListener("end", onlegacyfinish);
			stream.removeListener("close", onlegacyfinish);
			stream.removeListener("finish", onfinish);
			stream.removeListener("exit", onexit);
			stream.removeListener("end", onend);
			stream.removeListener("error", onerror);
			stream.removeListener("close", onclose);
		};
	};
	module.exports = eos;
}));
//#endregion
//#region node_modules/tar-stream/pack.js
var require_pack = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var constants = require_fs_constants();
	var eos = require_end_of_stream();
	var inherits = require_inherits();
	var alloc = Buffer.alloc;
	var Readable = require_readable$2().Readable;
	var Writable = require_readable$2().Writable;
	var StringDecoder = __require("string_decoder").StringDecoder;
	var headers = require_headers();
	var DMODE = parseInt("755", 8);
	var FMODE = parseInt("644", 8);
	var END_OF_TAR = alloc(1024);
	var noop = function() {};
	var overflow = function(self, size) {
		size &= 511;
		if (size) self.push(END_OF_TAR.slice(0, 512 - size));
	};
	function modeToType(mode) {
		switch (mode & constants.S_IFMT) {
			case constants.S_IFBLK: return "block-device";
			case constants.S_IFCHR: return "character-device";
			case constants.S_IFDIR: return "directory";
			case constants.S_IFIFO: return "fifo";
			case constants.S_IFLNK: return "symlink";
		}
		return "file";
	}
	var Sink = function(to) {
		Writable.call(this);
		this.written = 0;
		this._to = to;
		this._destroyed = false;
	};
	inherits(Sink, Writable);
	Sink.prototype._write = function(data, enc, cb) {
		this.written += data.length;
		if (this._to.push(data)) return cb();
		this._to._drain = cb;
	};
	Sink.prototype.destroy = function() {
		if (this._destroyed) return;
		this._destroyed = true;
		this.emit("close");
	};
	var LinkSink = function() {
		Writable.call(this);
		this.linkname = "";
		this._decoder = new StringDecoder("utf-8");
		this._destroyed = false;
	};
	inherits(LinkSink, Writable);
	LinkSink.prototype._write = function(data, enc, cb) {
		this.linkname += this._decoder.write(data);
		cb();
	};
	LinkSink.prototype.destroy = function() {
		if (this._destroyed) return;
		this._destroyed = true;
		this.emit("close");
	};
	var Void = function() {
		Writable.call(this);
		this._destroyed = false;
	};
	inherits(Void, Writable);
	Void.prototype._write = function(data, enc, cb) {
		cb(/* @__PURE__ */ new Error("No body allowed for this entry"));
	};
	Void.prototype.destroy = function() {
		if (this._destroyed) return;
		this._destroyed = true;
		this.emit("close");
	};
	var Pack = function(opts) {
		if (!(this instanceof Pack)) return new Pack(opts);
		Readable.call(this, opts);
		this._drain = noop;
		this._finalized = false;
		this._finalizing = false;
		this._destroyed = false;
		this._stream = null;
	};
	inherits(Pack, Readable);
	Pack.prototype.entry = function(header, buffer, callback) {
		if (this._stream) throw new Error("already piping an entry");
		if (this._finalized || this._destroyed) return;
		if (typeof buffer === "function") {
			callback = buffer;
			buffer = null;
		}
		if (!callback) callback = noop;
		var self = this;
		if (!header.size || header.type === "symlink") header.size = 0;
		if (!header.type) header.type = modeToType(header.mode);
		if (!header.mode) header.mode = header.type === "directory" ? DMODE : FMODE;
		if (!header.uid) header.uid = 0;
		if (!header.gid) header.gid = 0;
		if (!header.mtime) header.mtime = /* @__PURE__ */ new Date();
		if (typeof buffer === "string") buffer = Buffer.from(buffer);
		if (Buffer.isBuffer(buffer)) {
			header.size = buffer.length;
			this._encode(header);
			var ok = this.push(buffer);
			overflow(self, header.size);
			if (ok) process.nextTick(callback);
			else this._drain = callback;
			return new Void();
		}
		if (header.type === "symlink" && !header.linkname) {
			var linkSink = new LinkSink();
			eos(linkSink, function(err) {
				if (err) {
					self.destroy();
					return callback(err);
				}
				header.linkname = linkSink.linkname;
				self._encode(header);
				callback();
			});
			return linkSink;
		}
		this._encode(header);
		if (header.type !== "file" && header.type !== "contiguous-file") {
			process.nextTick(callback);
			return new Void();
		}
		var sink = new Sink(this);
		this._stream = sink;
		eos(sink, function(err) {
			self._stream = null;
			if (err) {
				self.destroy();
				return callback(err);
			}
			if (sink.written !== header.size) {
				self.destroy();
				return callback(/* @__PURE__ */ new Error("size mismatch"));
			}
			overflow(self, header.size);
			if (self._finalizing) self.finalize();
			callback();
		});
		return sink;
	};
	Pack.prototype.finalize = function() {
		if (this._stream) {
			this._finalizing = true;
			return;
		}
		if (this._finalized) return;
		this._finalized = true;
		this.push(END_OF_TAR);
		this.push(null);
	};
	Pack.prototype.destroy = function(err) {
		if (this._destroyed) return;
		this._destroyed = true;
		if (err) this.emit("error", err);
		this.emit("close");
		if (this._stream && this._stream.destroy) this._stream.destroy();
	};
	Pack.prototype._encode = function(header) {
		if (!header.pax) {
			var buf = headers.encode(header);
			if (buf) {
				this.push(buf);
				return;
			}
		}
		this._encodePax(header);
	};
	Pack.prototype._encodePax = function(header) {
		var paxHeader = headers.encodePax({
			name: header.name,
			linkname: header.linkname,
			pax: header.pax
		});
		var newHeader = {
			name: "PaxHeader",
			mode: header.mode,
			uid: header.uid,
			gid: header.gid,
			size: paxHeader.length,
			mtime: header.mtime,
			type: "pax-header",
			linkname: header.linkname && "PaxHeader",
			uname: header.uname,
			gname: header.gname,
			devmajor: header.devmajor,
			devminor: header.devminor
		};
		this.push(headers.encode(newHeader));
		this.push(paxHeader);
		overflow(this, paxHeader.length);
		newHeader.size = header.size;
		newHeader.type = header.type;
		this.push(headers.encode(newHeader));
	};
	Pack.prototype._read = function(n) {
		var drain = this._drain;
		this._drain = noop;
		drain();
	};
	module.exports = Pack;
}));
//#endregion
//#region node_modules/tar-stream/index.js
var require_tar_stream = /* @__PURE__ */ __commonJSMin(((exports) => {
	exports.extract = require_extract();
	exports.pack = require_pack();
}));
//#endregion
//#region node_modules/archiver/lib/plugins/tar.js
var require_tar = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* TAR Format Plugin
	*
	* @module plugins/tar
	* @license [MIT]{@link https://github.com/archiverjs/node-archiver/blob/master/LICENSE}
	* @copyright (c) 2012-2014 Chris Talkington, contributors.
	*/
	var zlib = __require("zlib");
	var engine = require_tar_stream();
	var util = require_archiver_utils$1();
	/**
	* @constructor
	* @param {TarOptions} options
	*/
	var Tar = function(options) {
		if (!(this instanceof Tar)) return new Tar(options);
		options = this.options = util.defaults(options, { gzip: false });
		if (typeof options.gzipOptions !== "object") options.gzipOptions = {};
		this.supports = {
			directory: true,
			symlink: true
		};
		this.engine = engine.pack(options);
		this.compressor = false;
		if (options.gzip) {
			this.compressor = zlib.createGzip(options.gzipOptions);
			this.compressor.on("error", this._onCompressorError.bind(this));
		}
	};
	/**
	* [_onCompressorError description]
	*
	* @private
	* @param  {Error} err
	* @return void
	*/
	Tar.prototype._onCompressorError = function(err) {
		this.engine.emit("error", err);
	};
	/**
	* [append description]
	*
	* @param  {(Buffer|Stream)} source
	* @param  {TarEntryData} data
	* @param  {Function} callback
	* @return void
	*/
	Tar.prototype.append = function(source, data, callback) {
		var self = this;
		data.mtime = data.date;
		function append(err, sourceBuffer) {
			if (err) {
				callback(err);
				return;
			}
			self.engine.entry(data, sourceBuffer, function(err) {
				callback(err, data);
			});
		}
		if (data.sourceType === "buffer") append(null, source);
		else if (data.sourceType === "stream" && data.stats) {
			data.size = data.stats.size;
			var entry = self.engine.entry(data, function(err) {
				callback(err, data);
			});
			source.pipe(entry);
		} else if (data.sourceType === "stream") util.collectStream(source, append);
	};
	/**
	* [finalize description]
	*
	* @return void
	*/
	Tar.prototype.finalize = function() {
		this.engine.finalize();
	};
	/**
	* [on description]
	*
	* @return this.engine
	*/
	Tar.prototype.on = function() {
		return this.engine.on.apply(this.engine, arguments);
	};
	/**
	* [pipe description]
	*
	* @param  {String} destination
	* @param  {Object} options
	* @return this.engine
	*/
	Tar.prototype.pipe = function(destination, options) {
		if (this.compressor) return this.engine.pipe.apply(this.engine, [this.compressor]).pipe(destination, options);
		else return this.engine.pipe.apply(this.engine, arguments);
	};
	/**
	* [unpipe description]
	*
	* @return this.engine
	*/
	Tar.prototype.unpipe = function() {
		if (this.compressor) return this.compressor.unpipe.apply(this.compressor, arguments);
		else return this.engine.unpipe.apply(this.engine, arguments);
	};
	module.exports = Tar;
}));
/**
* @typedef {Object} TarOptions
* @global
* @property {Boolean} [gzip=false] Compress the tar archive using gzip.
* @property {Object} [gzipOptions] Passed to [zlib]{@link https://nodejs.org/api/zlib.html#zlib_class_options}
* to control compression.
* @property {*} [*] See [tar-stream]{@link https://github.com/mafintosh/tar-stream} documentation for additional properties.
*/
/**
* @typedef {Object} TarEntryData
* @global
* @property {String} name Sets the entry name including internal path.
* @property {(String|Date)} [date=NOW()] Sets the entry date.
* @property {Number} [mode=D:0755/F:0644] Sets the entry permissions.
* @property {String} [prefix] Sets a path prefix for the entry name. Useful
* when working with methods like `directory` or `glob`.
* @property {fs.Stats} [stats] Sets the fs stat data for this entry allowing
* for reduction of fs stat calls when stat data is already known.
*/
/**
* TarStream Module
* @external TarStream
* @see {@link https://github.com/mafintosh/tar-stream}
*/
//#endregion
//#region node_modules/archiver/lib/plugins/json.js
var require_json = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* JSON Format Plugin
	*
	* @module plugins/json
	* @license [MIT]{@link https://github.com/archiverjs/node-archiver/blob/master/LICENSE}
	* @copyright (c) 2012-2014 Chris Talkington, contributors.
	*/
	var inherits = __require("util").inherits;
	var Transform = require_readable$2().Transform;
	var crc32 = require_buffer_crc32();
	var util = require_archiver_utils$1();
	/**
	* @constructor
	* @param {(JsonOptions|TransformOptions)} options
	*/
	var Json = function(options) {
		if (!(this instanceof Json)) return new Json(options);
		options = this.options = util.defaults(options, {});
		Transform.call(this, options);
		this.supports = {
			directory: true,
			symlink: true
		};
		this.files = [];
	};
	inherits(Json, Transform);
	/**
	* [_transform description]
	*
	* @private
	* @param  {Buffer}   chunk
	* @param  {String}   encoding
	* @param  {Function} callback
	* @return void
	*/
	Json.prototype._transform = function(chunk, encoding, callback) {
		callback(null, chunk);
	};
	/**
	* [_writeStringified description]
	*
	* @private
	* @return void
	*/
	Json.prototype._writeStringified = function() {
		var fileString = JSON.stringify(this.files);
		this.write(fileString);
	};
	/**
	* [append description]
	*
	* @param  {(Buffer|Stream)}   source
	* @param  {EntryData}   data
	* @param  {Function} callback
	* @return void
	*/
	Json.prototype.append = function(source, data, callback) {
		var self = this;
		data.crc32 = 0;
		function onend(err, sourceBuffer) {
			if (err) {
				callback(err);
				return;
			}
			data.size = sourceBuffer.length || 0;
			data.crc32 = crc32.unsigned(sourceBuffer);
			self.files.push(data);
			callback(null, data);
		}
		if (data.sourceType === "buffer") onend(null, source);
		else if (data.sourceType === "stream") util.collectStream(source, onend);
	};
	/**
	* [finalize description]
	*
	* @return void
	*/
	Json.prototype.finalize = function() {
		this._writeStringified();
		this.end();
	};
	module.exports = Json;
}));
/**
* @typedef {Object} JsonOptions
* @global
*/
//#endregion
//#region node_modules/archiver/index.js
var require_archiver = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* Archiver Vending
	*
	* @ignore
	* @license [MIT]{@link https://github.com/archiverjs/node-archiver/blob/master/LICENSE}
	* @copyright (c) 2012-2014 Chris Talkington, contributors.
	*/
	var Archiver = require_core();
	var formats = {};
	/**
	* Dispenses a new Archiver instance.
	*
	* @constructor
	* @param  {String} format The archive format to use.
	* @param  {Object} options See [Archiver]{@link Archiver}
	* @return {Archiver}
	*/
	var vending = function(format, options) {
		return vending.create(format, options);
	};
	/**
	* Creates a new Archiver instance.
	*
	* @param  {String} format The archive format to use.
	* @param  {Object} options See [Archiver]{@link Archiver}
	* @return {Archiver}
	*/
	vending.create = function(format, options) {
		if (formats[format]) {
			var instance = new Archiver(format, options);
			instance.setFormat(format);
			instance.setModule(new formats[format](options));
			return instance;
		} else throw new Error("create(" + format + "): format not registered");
	};
	/**
	* Registers a format for use with archiver.
	*
	* @param  {String} format The name of the format.
	* @param  {Function} module The function for archiver to interact with.
	* @return void
	*/
	vending.registerFormat = function(format, module$1) {
		if (formats[format]) throw new Error("register(" + format + "): format already registered");
		if (typeof module$1 !== "function") throw new Error("register(" + format + "): format module invalid");
		if (typeof module$1.prototype.append !== "function" || typeof module$1.prototype.finalize !== "function") throw new Error("register(" + format + "): format module missing methods");
		formats[format] = module$1;
	};
	/**
	* Check if the format is already registered.
	* 
	* @param {String} format the name of the format.
	* @return boolean
	*/
	vending.isRegisteredFormat = function(format) {
		if (formats[format]) return true;
		return false;
	};
	vending.registerFormat("zip", require_zip());
	vending.registerFormat("tar", require_tar());
	vending.registerFormat("json", require_json());
	module.exports = vending;
}));
//#endregion
export { require_node as a, require_isarray as c, require_readable$2 as i, require_process_nextick_args as l, require_glob as n, require_inherits as o, require_graceful_fs as r, require_util$2 as s, require_archiver as t };
