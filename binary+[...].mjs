import { i as __require, t as __commonJSMin } from "../_runtime.mjs";
//#region node_modules/traverse/index.js
var require_traverse = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = Traverse;
	function Traverse(obj) {
		if (!(this instanceof Traverse)) return new Traverse(obj);
		this.value = obj;
	}
	Traverse.prototype.get = function(ps) {
		var node = this.value;
		for (var i = 0; i < ps.length; i++) {
			var key = ps[i];
			if (!Object.hasOwnProperty.call(node, key)) {
				node = void 0;
				break;
			}
			node = node[key];
		}
		return node;
	};
	Traverse.prototype.set = function(ps, value) {
		var node = this.value;
		for (var i = 0; i < ps.length - 1; i++) {
			var key = ps[i];
			if (!Object.hasOwnProperty.call(node, key)) node[key] = {};
			node = node[key];
		}
		node[ps[i]] = value;
		return value;
	};
	Traverse.prototype.map = function(cb) {
		return walk(this.value, cb, true);
	};
	Traverse.prototype.forEach = function(cb) {
		this.value = walk(this.value, cb, false);
		return this.value;
	};
	Traverse.prototype.reduce = function(cb, init) {
		var skip = arguments.length === 1;
		var acc = skip ? this.value : init;
		this.forEach(function(x) {
			if (!this.isRoot || !skip) acc = cb.call(this, acc, x);
		});
		return acc;
	};
	Traverse.prototype.deepEqual = function(obj) {
		if (arguments.length !== 1) throw new Error("deepEqual requires exactly one object to compare against");
		var equal = true;
		var node = obj;
		this.forEach(function(y) {
			var notEqual = (function() {
				equal = false;
			}).bind(this);
			if (!this.isRoot) {
				if (typeof node !== "object") return notEqual();
				node = node[this.key];
			}
			var x = node;
			this.post(function() {
				node = x;
			});
			var toS = function(o) {
				return Object.prototype.toString.call(o);
			};
			if (this.circular) {
				if (Traverse(obj).get(this.circular.path) !== x) notEqual();
			} else if (typeof x !== typeof y) notEqual();
			else if (x === null || y === null || x === void 0 || y === void 0) {
				if (x !== y) notEqual();
			} else if (x.__proto__ !== y.__proto__) notEqual();
			else if (x === y) {} else if (typeof x === "function") {
				if (x instanceof RegExp) {
					if (x.toString() != y.toString()) notEqual();
				} else if (x !== y) notEqual();
			} else if (typeof x === "object") {
				if (toS(y) === "[object Arguments]" || toS(x) === "[object Arguments]") {
					if (toS(x) !== toS(y)) notEqual();
				} else if (x instanceof Date || y instanceof Date) {
					if (!(x instanceof Date) || !(y instanceof Date) || x.getTime() !== y.getTime()) notEqual();
				} else {
					var kx = Object.keys(x);
					var ky = Object.keys(y);
					if (kx.length !== ky.length) return notEqual();
					for (var i = 0; i < kx.length; i++) {
						var k = kx[i];
						if (!Object.hasOwnProperty.call(y, k)) notEqual();
					}
				}
			}
		});
		return equal;
	};
	Traverse.prototype.paths = function() {
		var acc = [];
		this.forEach(function(x) {
			acc.push(this.path);
		});
		return acc;
	};
	Traverse.prototype.nodes = function() {
		var acc = [];
		this.forEach(function(x) {
			acc.push(this.node);
		});
		return acc;
	};
	Traverse.prototype.clone = function() {
		var parents = [], nodes = [];
		return (function clone(src) {
			for (var i = 0; i < parents.length; i++) if (parents[i] === src) return nodes[i];
			if (typeof src === "object" && src !== null) {
				var dst = copy(src);
				parents.push(src);
				nodes.push(dst);
				Object.keys(src).forEach(function(key) {
					dst[key] = clone(src[key]);
				});
				parents.pop();
				nodes.pop();
				return dst;
			} else return src;
		})(this.value);
	};
	function walk(root, cb, immutable) {
		var path = [];
		var parents = [];
		var alive = true;
		return (function walker(node_) {
			var node = immutable ? copy(node_) : node_;
			var modifiers = {};
			var state = {
				node,
				node_,
				path: [].concat(path),
				parent: parents.slice(-1)[0],
				key: path.slice(-1)[0],
				isRoot: path.length === 0,
				level: path.length,
				circular: null,
				update: function(x) {
					if (!state.isRoot) state.parent.node[state.key] = x;
					state.node = x;
				},
				"delete": function() {
					delete state.parent.node[state.key];
				},
				remove: function() {
					if (Array.isArray(state.parent.node)) state.parent.node.splice(state.key, 1);
					else delete state.parent.node[state.key];
				},
				before: function(f) {
					modifiers.before = f;
				},
				after: function(f) {
					modifiers.after = f;
				},
				pre: function(f) {
					modifiers.pre = f;
				},
				post: function(f) {
					modifiers.post = f;
				},
				stop: function() {
					alive = false;
				}
			};
			if (!alive) return state;
			if (typeof node === "object" && node !== null) {
				state.isLeaf = Object.keys(node).length == 0;
				for (var i = 0; i < parents.length; i++) if (parents[i].node_ === node_) {
					state.circular = parents[i];
					break;
				}
			} else state.isLeaf = true;
			state.notLeaf = !state.isLeaf;
			state.notRoot = !state.isRoot;
			var ret = cb.call(state, state.node);
			if (ret !== void 0 && state.update) state.update(ret);
			if (modifiers.before) modifiers.before.call(state, state.node);
			if (typeof state.node == "object" && state.node !== null && !state.circular) {
				parents.push(state);
				var keys = Object.keys(state.node);
				keys.forEach(function(key, i) {
					path.push(key);
					if (modifiers.pre) modifiers.pre.call(state, state.node[key], key);
					var child = walker(state.node[key]);
					if (immutable && Object.hasOwnProperty.call(state.node, key)) state.node[key] = child.node;
					child.isLast = i == keys.length - 1;
					child.isFirst = i == 0;
					if (modifiers.post) modifiers.post.call(state, child);
					path.pop();
				});
				parents.pop();
			}
			if (modifiers.after) modifiers.after.call(state, state.node);
			return state;
		})(root).node;
	}
	Object.keys(Traverse.prototype).forEach(function(key) {
		Traverse[key] = function(obj) {
			var args = [].slice.call(arguments, 1);
			var t = Traverse(obj);
			return t[key].apply(t, args);
		};
	});
	function copy(src) {
		if (typeof src === "object" && src !== null) {
			var dst;
			if (Array.isArray(src)) dst = [];
			else if (src instanceof Date) dst = new Date(src);
			else if (src instanceof Boolean) dst = new Boolean(src);
			else if (src instanceof Number) dst = new Number(src);
			else if (src instanceof String) dst = new String(src);
			else dst = Object.create(Object.getPrototypeOf(src));
			Object.keys(src).forEach(function(key) {
				dst[key] = src[key];
			});
			return dst;
		} else return src;
	}
}));
//#endregion
//#region node_modules/chainsaw/index.js
var require_chainsaw = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Traverse = require_traverse();
	var EventEmitter$1 = __require("events").EventEmitter;
	module.exports = Chainsaw;
	function Chainsaw(builder) {
		var saw = Chainsaw.saw(builder, {});
		var r = builder.call(saw.handlers, saw);
		if (r !== void 0) saw.handlers = r;
		saw.record();
		return saw.chain();
	}
	Chainsaw.light = function ChainsawLight(builder) {
		var saw = Chainsaw.saw(builder, {});
		var r = builder.call(saw.handlers, saw);
		if (r !== void 0) saw.handlers = r;
		return saw.chain();
	};
	Chainsaw.saw = function(builder, handlers) {
		var saw = new EventEmitter$1();
		saw.handlers = handlers;
		saw.actions = [];
		saw.chain = function() {
			var ch = Traverse(saw.handlers).map(function(node) {
				if (this.isRoot) return node;
				var ps = this.path;
				if (typeof node === "function") this.update(function() {
					saw.actions.push({
						path: ps,
						args: [].slice.call(arguments)
					});
					return ch;
				});
			});
			process.nextTick(function() {
				saw.emit("begin");
				saw.next();
			});
			return ch;
		};
		saw.pop = function() {
			return saw.actions.shift();
		};
		saw.next = function() {
			var action = saw.pop();
			if (!action) saw.emit("end");
			else if (!action.trap) {
				var node = saw.handlers;
				action.path.forEach(function(key) {
					node = node[key];
				});
				node.apply(saw.handlers, action.args);
			}
		};
		saw.nest = function(cb) {
			var args = [].slice.call(arguments, 1);
			var autonext = true;
			if (typeof cb === "boolean") {
				var autonext = cb;
				cb = args.shift();
			}
			var s = Chainsaw.saw(builder, {});
			var r = builder.call(s.handlers, s);
			if (r !== void 0) s.handlers = r;
			if ("undefined" !== typeof saw.step) s.record();
			cb.apply(s.chain(), args);
			if (autonext !== false) s.on("end", saw.next);
		};
		saw.record = function() {
			upgradeChainsaw(saw);
		};
		[
			"trap",
			"down",
			"jump"
		].forEach(function(method) {
			saw[method] = function() {
				throw new Error("To use the trap, down and jump features, please call record() first to start recording actions.");
			};
		});
		return saw;
	};
	function upgradeChainsaw(saw) {
		saw.step = 0;
		saw.pop = function() {
			return saw.actions[saw.step++];
		};
		saw.trap = function(name, cb) {
			var ps = Array.isArray(name) ? name : [name];
			saw.actions.push({
				path: ps,
				step: saw.step,
				cb,
				trap: true
			});
		};
		saw.down = function(name) {
			var ps = (Array.isArray(name) ? name : [name]).join("/");
			var i = saw.actions.slice(saw.step).map(function(x) {
				if (x.trap && x.step <= saw.step) return false;
				return x.path.join("/") == ps;
			}).indexOf(true);
			if (i >= 0) saw.step += i;
			else saw.step = saw.actions.length;
			var act = saw.actions[saw.step - 1];
			if (act && act.trap) {
				saw.step = act.step;
				act.cb();
			} else saw.next();
		};
		saw.jump = function(step) {
			saw.step = step;
			saw.next();
		};
	}
}));
//#endregion
//#region node_modules/buffers/index.js
var require_buffers = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = Buffers;
	function Buffers(bufs) {
		if (!(this instanceof Buffers)) return new Buffers(bufs);
		this.buffers = bufs || [];
		this.length = this.buffers.reduce(function(size, buf) {
			return size + buf.length;
		}, 0);
	}
	Buffers.prototype.push = function() {
		for (var i = 0; i < arguments.length; i++) if (!Buffer.isBuffer(arguments[i])) throw new TypeError("Tried to push a non-buffer");
		for (var i = 0; i < arguments.length; i++) {
			var buf = arguments[i];
			this.buffers.push(buf);
			this.length += buf.length;
		}
		return this.length;
	};
	Buffers.prototype.unshift = function() {
		for (var i = 0; i < arguments.length; i++) if (!Buffer.isBuffer(arguments[i])) throw new TypeError("Tried to unshift a non-buffer");
		for (var i = 0; i < arguments.length; i++) {
			var buf = arguments[i];
			this.buffers.unshift(buf);
			this.length += buf.length;
		}
		return this.length;
	};
	Buffers.prototype.copy = function(dst, dStart, start, end) {
		return this.slice(start, end).copy(dst, dStart, 0, end - start);
	};
	Buffers.prototype.splice = function(i, howMany) {
		var buffers = this.buffers;
		var index = i >= 0 ? i : this.length - i;
		var reps = [].slice.call(arguments, 2);
		if (howMany === void 0) howMany = this.length - index;
		else if (howMany > this.length - index) howMany = this.length - index;
		for (var i = 0; i < reps.length; i++) this.length += reps[i].length;
		var removed = new Buffers();
		var startBytes = 0;
		for (var ii = 0; ii < buffers.length && startBytes + buffers[ii].length < index; ii++) startBytes += buffers[ii].length;
		if (index - startBytes > 0) {
			var start = index - startBytes;
			if (start + howMany < buffers[ii].length) {
				removed.push(buffers[ii].slice(start, start + howMany));
				var orig = buffers[ii];
				var buf0 = new Buffer(start);
				for (var i = 0; i < start; i++) buf0[i] = orig[i];
				var buf1 = new Buffer(orig.length - start - howMany);
				for (var i = start + howMany; i < orig.length; i++) buf1[i - howMany - start] = orig[i];
				if (reps.length > 0) {
					var reps_ = reps.slice();
					reps_.unshift(buf0);
					reps_.push(buf1);
					buffers.splice.apply(buffers, [ii, 1].concat(reps_));
					ii += reps_.length;
					reps = [];
				} else {
					buffers.splice(ii, 1, buf0, buf1);
					ii += 2;
				}
			} else {
				removed.push(buffers[ii].slice(start));
				buffers[ii] = buffers[ii].slice(0, start);
				ii++;
			}
		}
		if (reps.length > 0) {
			buffers.splice.apply(buffers, [ii, 0].concat(reps));
			ii += reps.length;
		}
		while (removed.length < howMany) {
			var buf = buffers[ii];
			var len = buf.length;
			var take = Math.min(len, howMany - removed.length);
			if (take === len) {
				removed.push(buf);
				buffers.splice(ii, 1);
			} else {
				removed.push(buf.slice(0, take));
				buffers[ii] = buffers[ii].slice(take);
			}
		}
		this.length -= removed.length;
		return removed;
	};
	Buffers.prototype.slice = function(i, j) {
		var buffers = this.buffers;
		if (j === void 0) j = this.length;
		if (i === void 0) i = 0;
		if (j > this.length) j = this.length;
		var startBytes = 0;
		for (var si = 0; si < buffers.length && startBytes + buffers[si].length <= i; si++) startBytes += buffers[si].length;
		var target = new Buffer(j - i);
		var ti = 0;
		for (var ii = si; ti < j - i && ii < buffers.length; ii++) {
			var len = buffers[ii].length;
			var start = ti === 0 ? i - startBytes : 0;
			var end = ti + len >= j - i ? Math.min(start + (j - i) - ti, len) : len;
			buffers[ii].copy(target, ti, start, end);
			ti += end - start;
		}
		return target;
	};
	Buffers.prototype.pos = function(i) {
		if (i < 0 || i >= this.length) throw new Error("oob");
		var l = i, bi = 0, bu = null;
		for (;;) {
			bu = this.buffers[bi];
			if (l < bu.length) return {
				buf: bi,
				offset: l
			};
			else l -= bu.length;
			bi++;
		}
	};
	Buffers.prototype.get = function get(i) {
		var pos = this.pos(i);
		return this.buffers[pos.buf].get(pos.offset);
	};
	Buffers.prototype.set = function set(i, b) {
		var pos = this.pos(i);
		return this.buffers[pos.buf].set(pos.offset, b);
	};
	Buffers.prototype.indexOf = function(needle, offset) {
		if ("string" === typeof needle) needle = new Buffer(needle);
		else if (needle instanceof Buffer) {} else throw new Error("Invalid type for a search string");
		if (!needle.length) return 0;
		if (!this.length) return -1;
		var i = 0, j = 0, match = 0, mstart, pos = 0;
		if (offset) {
			var p = this.pos(offset);
			i = p.buf;
			j = p.offset;
			pos = offset;
		}
		for (;;) {
			while (j >= this.buffers[i].length) {
				j = 0;
				i++;
				if (i >= this.buffers.length) return -1;
			}
			if (this.buffers[i][j] == needle[match]) {
				if (match == 0) mstart = {
					i,
					j,
					pos
				};
				match++;
				if (match == needle.length) return mstart.pos;
			} else if (match != 0) {
				i = mstart.i;
				j = mstart.j;
				pos = mstart.pos;
				match = 0;
			}
			j++;
			pos++;
		}
	};
	Buffers.prototype.toBuffer = function() {
		return this.slice();
	};
	Buffers.prototype.toString = function(encoding, start, end) {
		return this.slice(start, end).toString(encoding);
	};
}));
//#endregion
//#region node_modules/binary/lib/vars.js
var require_vars = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = function(store) {
		function getset(name, value) {
			var node = vars.store;
			var keys = name.split(".");
			keys.slice(0, -1).forEach(function(k) {
				if (node[k] === void 0) node[k] = {};
				node = node[k];
			});
			var key = keys[keys.length - 1];
			if (arguments.length == 1) return node[key];
			else return node[key] = value;
		}
		var vars = {
			get: function(name) {
				return getset(name);
			},
			set: function(name, value) {
				return getset(name, value);
			},
			store: store || {}
		};
		return vars;
	};
}));
//#endregion
//#region node_modules/binary/index.js
var require_binary = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Chainsaw = require_chainsaw();
	var EventEmitter = __require("events").EventEmitter;
	var Buffers = require_buffers();
	var Vars = require_vars();
	var Stream = __require("stream").Stream;
	exports = module.exports = function(bufOrEm, eventName) {
		if (Buffer.isBuffer(bufOrEm)) return exports.parse(bufOrEm);
		var s = exports.stream();
		if (bufOrEm && bufOrEm.pipe) bufOrEm.pipe(s);
		else if (bufOrEm) {
			bufOrEm.on(eventName || "data", function(buf) {
				s.write(buf);
			});
			bufOrEm.on("end", function() {
				s.end();
			});
		}
		return s;
	};
	exports.stream = function(input) {
		if (input) return exports.apply(null, arguments);
		var pending = null;
		function getBytes(bytes, cb, skip) {
			pending = {
				bytes,
				skip,
				cb: function(buf) {
					pending = null;
					cb(buf);
				}
			};
			dispatch();
		}
		var offset = null;
		function dispatch() {
			if (!pending) {
				if (caughtEnd) done = true;
				return;
			}
			if (typeof pending === "function") pending();
			else {
				var bytes = offset + pending.bytes;
				if (buffers.length >= bytes) {
					var buf;
					if (offset == null) {
						buf = buffers.splice(0, bytes);
						if (!pending.skip) buf = buf.slice();
					} else {
						if (!pending.skip) buf = buffers.slice(offset, bytes);
						offset = bytes;
					}
					if (pending.skip) pending.cb();
					else pending.cb(buf);
				}
			}
		}
		function builder(saw) {
			function next() {
				if (!done) saw.next();
			}
			var self = words(function(bytes, cb) {
				return function(name) {
					getBytes(bytes, function(buf) {
						vars.set(name, cb(buf));
						next();
					});
				};
			});
			self.tap = function(cb) {
				saw.nest(cb, vars.store);
			};
			self.into = function(key, cb) {
				if (!vars.get(key)) vars.set(key, {});
				var parent = vars;
				vars = Vars(parent.get(key));
				saw.nest(function() {
					cb.apply(this, arguments);
					this.tap(function() {
						vars = parent;
					});
				}, vars.store);
			};
			self.flush = function() {
				vars.store = {};
				next();
			};
			self.loop = function(cb) {
				var end = false;
				saw.nest(false, function loop() {
					this.vars = vars.store;
					cb.call(this, function() {
						end = true;
						next();
					}, vars.store);
					this.tap(function() {
						if (end) saw.next();
						else loop.call(this);
					}.bind(this));
				}, vars.store);
			};
			self.buffer = function(name, bytes) {
				if (typeof bytes === "string") bytes = vars.get(bytes);
				getBytes(bytes, function(buf) {
					vars.set(name, buf);
					next();
				});
			};
			self.skip = function(bytes) {
				if (typeof bytes === "string") bytes = vars.get(bytes);
				getBytes(bytes, function() {
					next();
				});
			};
			self.scan = function find(name, search) {
				if (typeof search === "string") search = new Buffer(search);
				else if (!Buffer.isBuffer(search)) throw new Error("search must be a Buffer or a string");
				var taken = 0;
				pending = function() {
					var pos = buffers.indexOf(search, offset + taken);
					var i = pos - offset - taken;
					if (pos !== -1) {
						pending = null;
						if (offset != null) {
							vars.set(name, buffers.slice(offset, offset + taken + i));
							offset += taken + i + search.length;
						} else {
							vars.set(name, buffers.slice(0, taken + i));
							buffers.splice(0, taken + i + search.length);
						}
						next();
						dispatch();
					} else i = Math.max(buffers.length - search.length - offset - taken, 0);
					taken += i;
				};
				dispatch();
			};
			self.peek = function(cb) {
				offset = 0;
				saw.nest(function() {
					cb.call(this, vars.store);
					this.tap(function() {
						offset = null;
					});
				});
			};
			return self;
		}
		var stream = Chainsaw.light(builder);
		stream.writable = true;
		var buffers = Buffers();
		stream.write = function(buf) {
			buffers.push(buf);
			dispatch();
		};
		var vars = Vars();
		var done = false, caughtEnd = false;
		stream.end = function() {
			caughtEnd = true;
		};
		stream.pipe = Stream.prototype.pipe;
		Object.getOwnPropertyNames(EventEmitter.prototype).forEach(function(name) {
			stream[name] = EventEmitter.prototype[name];
		});
		return stream;
	};
	exports.parse = function parse(buffer) {
		var self = words(function(bytes, cb) {
			return function(name) {
				if (offset + bytes <= buffer.length) {
					var buf = buffer.slice(offset, offset + bytes);
					offset += bytes;
					vars.set(name, cb(buf));
				} else vars.set(name, null);
				return self;
			};
		});
		var offset = 0;
		var vars = Vars();
		self.vars = vars.store;
		self.tap = function(cb) {
			cb.call(self, vars.store);
			return self;
		};
		self.into = function(key, cb) {
			if (!vars.get(key)) vars.set(key, {});
			var parent = vars;
			vars = Vars(parent.get(key));
			cb.call(self, vars.store);
			vars = parent;
			return self;
		};
		self.loop = function(cb) {
			var end = false;
			var ender = function() {
				end = true;
			};
			while (end === false) cb.call(self, ender, vars.store);
			return self;
		};
		self.buffer = function(name, size) {
			if (typeof size === "string") size = vars.get(size);
			var buf = buffer.slice(offset, Math.min(buffer.length, offset + size));
			offset += size;
			vars.set(name, buf);
			return self;
		};
		self.skip = function(bytes) {
			if (typeof bytes === "string") bytes = vars.get(bytes);
			offset += bytes;
			return self;
		};
		self.scan = function(name, search) {
			if (typeof search === "string") search = new Buffer(search);
			else if (!Buffer.isBuffer(search)) throw new Error("search must be a Buffer or a string");
			vars.set(name, null);
			for (var i = 0; i + offset <= buffer.length - search.length + 1; i++) {
				for (var j = 0; j < search.length && buffer[offset + i + j] === search[j]; j++);
				if (j === search.length) break;
			}
			vars.set(name, buffer.slice(offset, offset + i));
			offset += i + search.length;
			return self;
		};
		self.peek = function(cb) {
			var was = offset;
			cb.call(self, vars.store);
			offset = was;
			return self;
		};
		self.flush = function() {
			vars.store = {};
			return self;
		};
		self.eof = function() {
			return offset >= buffer.length;
		};
		return self;
	};
	function decodeLEu(bytes) {
		var acc = 0;
		for (var i = 0; i < bytes.length; i++) acc += Math.pow(256, i) * bytes[i];
		return acc;
	}
	function decodeBEu(bytes) {
		var acc = 0;
		for (var i = 0; i < bytes.length; i++) acc += Math.pow(256, bytes.length - i - 1) * bytes[i];
		return acc;
	}
	function decodeBEs(bytes) {
		var val = decodeBEu(bytes);
		if ((bytes[0] & 128) == 128) val -= Math.pow(256, bytes.length);
		return val;
	}
	function decodeLEs(bytes) {
		var val = decodeLEu(bytes);
		if ((bytes[bytes.length - 1] & 128) == 128) val -= Math.pow(256, bytes.length);
		return val;
	}
	function words(decode) {
		var self = {};
		[
			1,
			2,
			4,
			8
		].forEach(function(bytes) {
			var bits = bytes * 8;
			self["word" + bits + "le"] = self["word" + bits + "lu"] = decode(bytes, decodeLEu);
			self["word" + bits + "ls"] = decode(bytes, decodeLEs);
			self["word" + bits + "be"] = self["word" + bits + "bu"] = decode(bytes, decodeBEu);
			self["word" + bits + "bs"] = decode(bytes, decodeBEs);
		});
		self.word8 = self.word8u = self.word8be;
		self.word8s = self.word8bs;
		return self;
	}
}));
//#endregion
export { require_binary as t };
