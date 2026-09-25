import { i as __require, t as __commonJSMin } from "../_runtime.mjs";
import { a as require_node, c as require_isarray, i as require_readable$2, l as require_process_nextick_args, n as require_glob, o as require_inherits, r as require_graceful_fs, s as require_util, t as require_archiver } from "./archiver+[...].mjs";
import { i as require_pako } from "./pako+pdf-lib__standard-fonts.mjs";
import { t as require_src$1 } from "./@fast-csv/format+[...].mjs";
import { t as require_src$2 } from "./@fast-csv/parse+[...].mjs";
import { n as require_utc, r as require_customParseFormat, t as require_dayjs_min } from "./dayjs.mjs";
import { t as require_buffer_indexof_polyfill } from "./buffer-indexof-polyfill.mjs";
import { t as require_binary } from "./binary+[...].mjs";
import { t as require_bluebird } from "./bluebird.mjs";
import { t as require_duplexer2 } from "./duplexer2+[...].mjs";
import { t as require_BigInteger } from "./big-integer.mjs";
//#region node_modules/exceljs/lib/utils/under-dash.js
var require_under_dash = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var { toString } = Object.prototype;
	var escapeHtmlRegex = /["&<>]/;
	var _ = {
		each: function each(obj, cb) {
			if (obj) {
				if (Array.isArray(obj)) obj.forEach(cb);
				else Object.keys(obj).forEach((key) => {
					cb(obj[key], key);
				});
			}
		},
		some: function some(obj, cb) {
			if (obj) {
				if (Array.isArray(obj)) return obj.some(cb);
				return Object.keys(obj).some((key) => cb(obj[key], key));
			}
			return false;
		},
		every: function every(obj, cb) {
			if (obj) {
				if (Array.isArray(obj)) return obj.every(cb);
				return Object.keys(obj).every((key) => cb(obj[key], key));
			}
			return true;
		},
		map: function map(obj, cb) {
			if (obj) {
				if (Array.isArray(obj)) return obj.map(cb);
				return Object.keys(obj).map((key) => cb(obj[key], key));
			}
			return [];
		},
		keyBy(a, p) {
			return a.reduce((o, v) => {
				o[v[p]] = v;
				return o;
			}, {});
		},
		isEqual: function isEqual(a, b) {
			const aType = typeof a;
			const bType = typeof b;
			const aArray = Array.isArray(a);
			const bArray = Array.isArray(b);
			let keys;
			if (aType !== bType) return false;
			switch (typeof a) {
				case "object":
					if (aArray || bArray) {
						if (aArray && bArray) return a.length === b.length && a.every((aValue, index) => {
							const bValue = b[index];
							return _.isEqual(aValue, bValue);
						});
						return false;
					}
					if (a === null || b === null) return a === b;
					keys = Object.keys(a);
					if (Object.keys(b).length !== keys.length) return false;
					for (const key of keys) if (!b.hasOwnProperty(key)) return false;
					return _.every(a, (aValue, key) => {
						const bValue = b[key];
						return _.isEqual(aValue, bValue);
					});
				default: return a === b;
			}
		},
		escapeHtml(html) {
			const regexResult = escapeHtmlRegex.exec(html);
			if (!regexResult) return html;
			let result = "";
			let escape = "";
			let lastIndex = 0;
			let i = regexResult.index;
			for (; i < html.length; i++) {
				switch (html.charAt(i)) {
					case "\"":
						escape = "&quot;";
						break;
					case "&":
						escape = "&amp;";
						break;
					case "'":
						escape = "&apos;";
						break;
					case "<":
						escape = "&lt;";
						break;
					case ">":
						escape = "&gt;";
						break;
					default: continue;
				}
				if (lastIndex !== i) result += html.substring(lastIndex, i);
				lastIndex = i + 1;
				result += escape;
			}
			if (lastIndex !== i) return result + html.substring(lastIndex, i);
			return result;
		},
		strcmp(a, b) {
			if (a < b) return -1;
			if (a > b) return 1;
			return 0;
		},
		isUndefined(val) {
			return toString.call(val) === "[object Undefined]";
		},
		isObject(val) {
			return toString.call(val) === "[object Object]";
		},
		deepMerge() {
			const target = arguments[0] || {};
			const { length } = arguments;
			let src, clone, copyIsArray;
			function assignValue(val, key) {
				src = target[key];
				copyIsArray = Array.isArray(val);
				if (_.isObject(val) || copyIsArray) {
					if (copyIsArray) {
						copyIsArray = false;
						clone = src && Array.isArray(src) ? src : [];
					} else clone = src && _.isObject(src) ? src : {};
					target[key] = _.deepMerge(clone, val);
				} else if (!_.isUndefined(val)) target[key] = val;
			}
			for (let i = 0; i < length; i++) _.each(arguments[i], assignValue);
			return target;
		}
	};
	module.exports = _;
}));
//#endregion
//#region node_modules/exceljs/lib/utils/col-cache.js
var require_col_cache = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var addressRegex = /^[A-Z]+\d+$/;
	var colCache = {
		_dictionary: [
			"A",
			"B",
			"C",
			"D",
			"E",
			"F",
			"G",
			"H",
			"I",
			"J",
			"K",
			"L",
			"M",
			"N",
			"O",
			"P",
			"Q",
			"R",
			"S",
			"T",
			"U",
			"V",
			"W",
			"X",
			"Y",
			"Z"
		],
		_l2nFill: 0,
		_l2n: {},
		_n2l: [],
		_level(n) {
			if (n <= 26) return 1;
			if (n <= 676) return 2;
			return 3;
		},
		_fill(level) {
			let c;
			let v;
			let l1;
			let l2;
			let l3;
			let n = 1;
			if (level >= 4) throw new Error("Out of bounds. Excel supports columns from 1 to 16384");
			if (this._l2nFill < 1 && level >= 1) {
				while (n <= 26) {
					c = this._dictionary[n - 1];
					this._n2l[n] = c;
					this._l2n[c] = n;
					n++;
				}
				this._l2nFill = 1;
			}
			if (this._l2nFill < 2 && level >= 2) {
				n = 27;
				while (n <= 702) {
					v = n - 27;
					l1 = v % 26;
					l2 = Math.floor(v / 26);
					c = this._dictionary[l2] + this._dictionary[l1];
					this._n2l[n] = c;
					this._l2n[c] = n;
					n++;
				}
				this._l2nFill = 2;
			}
			if (this._l2nFill < 3 && level >= 3) {
				n = 703;
				while (n <= 16384) {
					v = n - 703;
					l1 = v % 26;
					l2 = Math.floor(v / 26) % 26;
					l3 = Math.floor(v / 676);
					c = this._dictionary[l3] + this._dictionary[l2] + this._dictionary[l1];
					this._n2l[n] = c;
					this._l2n[c] = n;
					n++;
				}
				this._l2nFill = 3;
			}
		},
		l2n(l) {
			if (!this._l2n[l]) this._fill(l.length);
			if (!this._l2n[l]) throw new Error(`Out of bounds. Invalid column letter: ${l}`);
			return this._l2n[l];
		},
		n2l(n) {
			if (n < 1 || n > 16384) throw new Error(`${n} is out of bounds. Excel supports columns from 1 to 16384`);
			if (!this._n2l[n]) this._fill(this._level(n));
			return this._n2l[n];
		},
		_hash: {},
		validateAddress(value) {
			if (!addressRegex.test(value)) throw new Error(`Invalid Address: ${value}`);
			return true;
		},
		decodeAddress(value) {
			const addr = value.length < 5 && this._hash[value];
			if (addr) return addr;
			let hasCol = false;
			let col = "";
			let colNumber = 0;
			let hasRow = false;
			let row = "";
			let rowNumber = 0;
			for (let i = 0, char; i < value.length; i++) {
				char = value.charCodeAt(i);
				if (!hasRow && char >= 65 && char <= 90) {
					hasCol = true;
					col += value[i];
					colNumber = colNumber * 26 + char - 64;
				} else if (char >= 48 && char <= 57) {
					hasRow = true;
					row += value[i];
					rowNumber = rowNumber * 10 + char - 48;
				} else if (hasRow && hasCol && char !== 36) break;
			}
			if (!hasCol) colNumber = void 0;
			else if (colNumber > 16384) throw new Error(`Out of bounds. Invalid column letter: ${col}`);
			if (!hasRow) rowNumber = void 0;
			value = col + row;
			const address = {
				address: value,
				col: colNumber,
				row: rowNumber,
				$col$row: `$${col}$${row}`
			};
			if (colNumber <= 100 && rowNumber <= 100) {
				this._hash[value] = address;
				this._hash[address.$col$row] = address;
			}
			return address;
		},
		getAddress(r, c) {
			if (c) {
				const address = this.n2l(c) + r;
				return this.decodeAddress(address);
			}
			return this.decodeAddress(r);
		},
		decode(value) {
			const parts = value.split(":");
			if (parts.length === 2) {
				const tl = this.decodeAddress(parts[0]);
				const br = this.decodeAddress(parts[1]);
				const result = {
					top: Math.min(tl.row, br.row),
					left: Math.min(tl.col, br.col),
					bottom: Math.max(tl.row, br.row),
					right: Math.max(tl.col, br.col)
				};
				result.tl = this.n2l(result.left) + result.top;
				result.br = this.n2l(result.right) + result.bottom;
				result.dimensions = `${result.tl}:${result.br}`;
				return result;
			}
			return this.decodeAddress(value);
		},
		decodeEx(value) {
			const groups = value.match(/(?:(?:(?:'((?:[^']|'')*)')|([^'^ !]*))!)?(.*)/);
			const sheetName = groups[1] || groups[2];
			const reference = groups[3];
			const parts = reference.split(":");
			if (parts.length > 1) {
				let tl = this.decodeAddress(parts[0]);
				let br = this.decodeAddress(parts[1]);
				const top = Math.min(tl.row, br.row);
				const left = Math.min(tl.col, br.col);
				const bottom = Math.max(tl.row, br.row);
				const right = Math.max(tl.col, br.col);
				tl = this.n2l(left) + top;
				br = this.n2l(right) + bottom;
				return {
					top,
					left,
					bottom,
					right,
					sheetName,
					tl: {
						address: tl,
						col: left,
						row: top,
						$col$row: `$${this.n2l(left)}$${top}`,
						sheetName
					},
					br: {
						address: br,
						col: right,
						row: bottom,
						$col$row: `$${this.n2l(right)}$${bottom}`,
						sheetName
					},
					dimensions: `${tl}:${br}`
				};
			}
			if (reference.startsWith("#")) return sheetName ? {
				sheetName,
				error: reference
			} : { error: reference };
			const address = this.decodeAddress(reference);
			return sheetName ? {
				sheetName,
				...address
			} : address;
		},
		encodeAddress(row, col) {
			return colCache.n2l(col) + row;
		},
		encode() {
			switch (arguments.length) {
				case 2: return colCache.encodeAddress(arguments[0], arguments[1]);
				case 4: return `${colCache.encodeAddress(arguments[0], arguments[1])}:${colCache.encodeAddress(arguments[2], arguments[3])}`;
				default: throw new Error("Can only encode with 2 or 4 arguments");
			}
		},
		inRange(range, address) {
			const [left, top, , right, bottom] = range;
			const [col, row] = address;
			return col >= left && col <= right && row >= top && row <= bottom;
		}
	};
	module.exports = colCache;
}));
//#endregion
//#region node_modules/exceljs/lib/doc/range.js
var require_range = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var colCache = require_col_cache();
	module.exports = class Range {
		constructor() {
			this.decode(arguments);
		}
		setTLBR(t, l, b, r, s) {
			if (arguments.length < 4) {
				const tl = colCache.decodeAddress(t);
				const br = colCache.decodeAddress(l);
				this.model = {
					top: Math.min(tl.row, br.row),
					left: Math.min(tl.col, br.col),
					bottom: Math.max(tl.row, br.row),
					right: Math.max(tl.col, br.col),
					sheetName: b
				};
				this.setTLBR(tl.row, tl.col, br.row, br.col, s);
			} else this.model = {
				top: Math.min(t, b),
				left: Math.min(l, r),
				bottom: Math.max(t, b),
				right: Math.max(l, r),
				sheetName: s
			};
		}
		decode(argv) {
			switch (argv.length) {
				case 5:
					this.setTLBR(argv[0], argv[1], argv[2], argv[3], argv[4]);
					break;
				case 4:
					this.setTLBR(argv[0], argv[1], argv[2], argv[3]);
					break;
				case 3:
					this.setTLBR(argv[0], argv[1], argv[2]);
					break;
				case 2:
					this.setTLBR(argv[0], argv[1]);
					break;
				case 1: {
					const value = argv[0];
					if (value instanceof Range) this.model = {
						top: value.model.top,
						left: value.model.left,
						bottom: value.model.bottom,
						right: value.model.right,
						sheetName: value.sheetName
					};
					else if (value instanceof Array) this.decode(value);
					else if (value.top && value.left && value.bottom && value.right) this.model = {
						top: value.top,
						left: value.left,
						bottom: value.bottom,
						right: value.right,
						sheetName: value.sheetName
					};
					else {
						const tlbr = colCache.decodeEx(value);
						if (tlbr.top) this.model = {
							top: tlbr.top,
							left: tlbr.left,
							bottom: tlbr.bottom,
							right: tlbr.right,
							sheetName: tlbr.sheetName
						};
						else this.model = {
							top: tlbr.row,
							left: tlbr.col,
							bottom: tlbr.row,
							right: tlbr.col,
							sheetName: tlbr.sheetName
						};
					}
					break;
				}
				case 0:
					this.model = {
						top: 0,
						left: 0,
						bottom: 0,
						right: 0
					};
					break;
				default: throw new Error(`Invalid number of arguments to _getDimensions() - ${argv.length}`);
			}
		}
		get top() {
			return this.model.top || 1;
		}
		set top(value) {
			this.model.top = value;
		}
		get left() {
			return this.model.left || 1;
		}
		set left(value) {
			this.model.left = value;
		}
		get bottom() {
			return this.model.bottom || 1;
		}
		set bottom(value) {
			this.model.bottom = value;
		}
		get right() {
			return this.model.right || 1;
		}
		set right(value) {
			this.model.right = value;
		}
		get sheetName() {
			return this.model.sheetName;
		}
		set sheetName(value) {
			this.model.sheetName = value;
		}
		get _serialisedSheetName() {
			const { sheetName } = this.model;
			if (sheetName) {
				if (/^[a-zA-Z0-9]*$/.test(sheetName)) return `${sheetName}!`;
				return `'${sheetName}'!`;
			}
			return "";
		}
		expand(top, left, bottom, right) {
			if (!this.model.top || top < this.top) this.top = top;
			if (!this.model.left || left < this.left) this.left = left;
			if (!this.model.bottom || bottom > this.bottom) this.bottom = bottom;
			if (!this.model.right || right > this.right) this.right = right;
		}
		expandRow(row) {
			if (row) {
				const { dimensions, number } = row;
				if (dimensions) this.expand(number, dimensions.min, number, dimensions.max);
			}
		}
		expandToAddress(addressStr) {
			const address = colCache.decodeEx(addressStr);
			this.expand(address.row, address.col, address.row, address.col);
		}
		get tl() {
			return colCache.n2l(this.left) + this.top;
		}
		get $t$l() {
			return `$${colCache.n2l(this.left)}$${this.top}`;
		}
		get br() {
			return colCache.n2l(this.right) + this.bottom;
		}
		get $b$r() {
			return `$${colCache.n2l(this.right)}$${this.bottom}`;
		}
		get range() {
			return `${this._serialisedSheetName + this.tl}:${this.br}`;
		}
		get $range() {
			return `${this._serialisedSheetName + this.$t$l}:${this.$b$r}`;
		}
		get shortRange() {
			return this.count > 1 ? this.range : this._serialisedSheetName + this.tl;
		}
		get $shortRange() {
			return this.count > 1 ? this.$range : this._serialisedSheetName + this.$t$l;
		}
		get count() {
			return (1 + this.bottom - this.top) * (1 + this.right - this.left);
		}
		toString() {
			return this.range;
		}
		intersects(other) {
			if (other.sheetName && this.sheetName && other.sheetName !== this.sheetName) return false;
			if (other.bottom < this.top) return false;
			if (other.top > this.bottom) return false;
			if (other.right < this.left) return false;
			if (other.left > this.right) return false;
			return true;
		}
		contains(addressStr) {
			const address = colCache.decodeEx(addressStr);
			return this.containsEx(address);
		}
		containsEx(address) {
			if (address.sheetName && this.sheetName && address.sheetName !== this.sheetName) return false;
			return address.row >= this.top && address.row <= this.bottom && address.col >= this.left && address.col <= this.right;
		}
		forEachAddress(cb) {
			for (let col = this.left; col <= this.right; col++) for (let row = this.top; row <= this.bottom; row++) cb(colCache.encodeAddress(row, col), row, col);
		}
	};
}));
//#endregion
//#region node_modules/exceljs/lib/doc/enums.js
var require_enums = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = {
		ValueType: {
			Null: 0,
			Merge: 1,
			Number: 2,
			String: 3,
			Date: 4,
			Hyperlink: 5,
			Formula: 6,
			SharedString: 7,
			RichText: 8,
			Boolean: 9,
			Error: 10
		},
		FormulaType: {
			None: 0,
			Master: 1,
			Shared: 2
		},
		RelationshipType: {
			None: 0,
			OfficeDocument: 1,
			Worksheet: 2,
			CalcChain: 3,
			SharedStrings: 4,
			Styles: 5,
			Theme: 6,
			Hyperlink: 7
		},
		DocumentType: { Xlsx: 1 },
		ReadingOrder: {
			LeftToRight: 1,
			RightToLeft: 2
		},
		ErrorValue: {
			NotApplicable: "#N/A",
			Ref: "#REF!",
			Name: "#NAME?",
			DivZero: "#DIV/0!",
			Null: "#NULL!",
			Value: "#VALUE!",
			Num: "#NUM!"
		}
	};
}));
//#endregion
//#region node_modules/exceljs/lib/utils/shared-formula.js
var require_shared_formula = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var colCache = require_col_cache();
	var replacementCandidateRx = /(([a-z_\-0-9]*)!)?([a-z0-9_$]{2,})([(])?/gi;
	var CRrx = /^([$])?([a-z]+)([$])?([1-9][0-9]*)$/i;
	function slideFormula(formula, fromCell, toCell) {
		const offset = colCache.decode(fromCell);
		const to = colCache.decode(toCell);
		return formula.replace(replacementCandidateRx, (refMatch, sheet, sheetMaybe, addrPart, trailingParen) => {
			if (trailingParen) return refMatch;
			const match = CRrx.exec(addrPart);
			if (match) {
				const colDollar = match[1];
				const colStr = match[2].toUpperCase();
				const rowDollar = match[3];
				const rowStr = match[4];
				if (colStr.length > 3 || colStr.length === 3 && colStr > "XFD") return refMatch;
				let col = colCache.l2n(colStr);
				let row = parseInt(rowStr, 10);
				if (!colDollar) col += to.col - offset.col;
				if (!rowDollar) row += to.row - offset.row;
				return (sheet || "") + (colDollar || "") + colCache.n2l(col) + (rowDollar || "") + row;
			}
			return refMatch;
		});
	}
	module.exports = { slideFormula };
}));
//#endregion
//#region node_modules/exceljs/lib/doc/note.js
var require_note = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var _ = require_under_dash();
	var Note = class Note {
		constructor(note) {
			this.note = note;
		}
		get model() {
			let value = null;
			switch (typeof this.note) {
				case "string":
					value = {
						type: "note",
						note: { texts: [{ text: this.note }] }
					};
					break;
				default: value = {
					type: "note",
					note: this.note
				};
			}
			return _.deepMerge({}, Note.DEFAULT_CONFIGS, value);
		}
		set model(value) {
			const { note } = value;
			const { texts } = note;
			if (texts.length === 1 && Object.keys(texts[0]).length === 1) this.note = texts[0].text;
			else this.note = note;
		}
		static fromModel(model) {
			const note = new Note();
			note.model = model;
			return note;
		}
	};
	Note.DEFAULT_CONFIGS = { note: {
		margins: {
			insetmode: "auto",
			inset: [
				.13,
				.13,
				.25,
				.25
			]
		},
		protection: {
			locked: "True",
			lockText: "True"
		},
		editAs: "absolute"
	} };
	module.exports = Note;
}));
//#endregion
//#region node_modules/exceljs/lib/doc/cell.js
var require_cell = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var colCache = require_col_cache();
	var _ = require_under_dash();
	var Enums = require_enums();
	var { slideFormula } = require_shared_formula();
	var Note = require_note();
	var Cell = class Cell {
		constructor(row, column, address) {
			if (!row || !column) throw new Error("A Cell needs a Row");
			this._row = row;
			this._column = column;
			colCache.validateAddress(address);
			this._address = address;
			this._value = Value.create(Cell.Types.Null, this);
			this.style = this._mergeStyle(row.style, column.style, {});
			this._mergeCount = 0;
		}
		get worksheet() {
			return this._row.worksheet;
		}
		get workbook() {
			return this._row.worksheet.workbook;
		}
		destroy() {
			delete this.style;
			delete this._value;
			delete this._row;
			delete this._column;
			delete this._address;
		}
		get numFmt() {
			return this.style.numFmt;
		}
		set numFmt(value) {
			this.style.numFmt = value;
		}
		get font() {
			return this.style.font;
		}
		set font(value) {
			this.style.font = value;
		}
		get alignment() {
			return this.style.alignment;
		}
		set alignment(value) {
			this.style.alignment = value;
		}
		get border() {
			return this.style.border;
		}
		set border(value) {
			this.style.border = value;
		}
		get fill() {
			return this.style.fill;
		}
		set fill(value) {
			this.style.fill = value;
		}
		get protection() {
			return this.style.protection;
		}
		set protection(value) {
			this.style.protection = value;
		}
		_mergeStyle(rowStyle, colStyle, style) {
			const numFmt = rowStyle && rowStyle.numFmt || colStyle && colStyle.numFmt;
			if (numFmt) style.numFmt = numFmt;
			const font = rowStyle && rowStyle.font || colStyle && colStyle.font;
			if (font) style.font = font;
			const alignment = rowStyle && rowStyle.alignment || colStyle && colStyle.alignment;
			if (alignment) style.alignment = alignment;
			const border = rowStyle && rowStyle.border || colStyle && colStyle.border;
			if (border) style.border = border;
			const fill = rowStyle && rowStyle.fill || colStyle && colStyle.fill;
			if (fill) style.fill = fill;
			const protection = rowStyle && rowStyle.protection || colStyle && colStyle.protection;
			if (protection) style.protection = protection;
			return style;
		}
		get address() {
			return this._address;
		}
		get row() {
			return this._row.number;
		}
		get col() {
			return this._column.number;
		}
		get $col$row() {
			return `$${this._column.letter}$${this.row}`;
		}
		get type() {
			return this._value.type;
		}
		get effectiveType() {
			return this._value.effectiveType;
		}
		toCsvString() {
			return this._value.toCsvString();
		}
		addMergeRef() {
			this._mergeCount++;
		}
		releaseMergeRef() {
			this._mergeCount--;
		}
		get isMerged() {
			return this._mergeCount > 0 || this.type === Cell.Types.Merge;
		}
		merge(master, ignoreStyle) {
			this._value.release();
			this._value = Value.create(Cell.Types.Merge, this, master);
			if (!ignoreStyle) this.style = master.style;
		}
		unmerge() {
			if (this.type === Cell.Types.Merge) {
				this._value.release();
				this._value = Value.create(Cell.Types.Null, this);
				this.style = this._mergeStyle(this._row.style, this._column.style, {});
			}
		}
		isMergedTo(master) {
			if (this._value.type !== Cell.Types.Merge) return false;
			return this._value.isMergedTo(master);
		}
		get master() {
			if (this.type === Cell.Types.Merge) return this._value.master;
			return this;
		}
		get isHyperlink() {
			return this._value.type === Cell.Types.Hyperlink;
		}
		get hyperlink() {
			return this._value.hyperlink;
		}
		get value() {
			return this._value.value;
		}
		set value(v) {
			if (this.type === Cell.Types.Merge) {
				this._value.master.value = v;
				return;
			}
			this._value.release();
			this._value = Value.create(Value.getType(v), this, v);
		}
		get note() {
			return this._comment && this._comment.note;
		}
		set note(note) {
			this._comment = new Note(note);
		}
		get text() {
			return this._value.toString();
		}
		get html() {
			return _.escapeHtml(this.text);
		}
		toString() {
			return this.text;
		}
		_upgradeToHyperlink(hyperlink) {
			if (this.type === Cell.Types.String) this._value = Value.create(Cell.Types.Hyperlink, this, {
				text: this._value.value,
				hyperlink
			});
		}
		get formula() {
			return this._value.formula;
		}
		get result() {
			return this._value.result;
		}
		get formulaType() {
			return this._value.formulaType;
		}
		get fullAddress() {
			const { worksheet } = this._row;
			return {
				sheetName: worksheet.name,
				address: this.address,
				row: this.row,
				col: this.col
			};
		}
		get name() {
			return this.names[0];
		}
		set name(value) {
			this.names = [value];
		}
		get names() {
			return this.workbook.definedNames.getNamesEx(this.fullAddress);
		}
		set names(value) {
			const { definedNames } = this.workbook;
			definedNames.removeAllNames(this.fullAddress);
			value.forEach((name) => {
				definedNames.addEx(this.fullAddress, name);
			});
		}
		addName(name) {
			this.workbook.definedNames.addEx(this.fullAddress, name);
		}
		removeName(name) {
			this.workbook.definedNames.removeEx(this.fullAddress, name);
		}
		removeAllNames() {
			this.workbook.definedNames.removeAllNames(this.fullAddress);
		}
		get _dataValidations() {
			return this.worksheet.dataValidations;
		}
		get dataValidation() {
			return this._dataValidations.find(this.address);
		}
		set dataValidation(value) {
			this._dataValidations.add(this.address, value);
		}
		get model() {
			const { model } = this._value;
			model.style = this.style;
			if (this._comment) model.comment = this._comment.model;
			return model;
		}
		set model(value) {
			this._value.release();
			this._value = Value.create(value.type, this);
			this._value.model = value;
			if (value.comment) switch (value.comment.type) {
				case "note": this._comment = Note.fromModel(value.comment);
			}
			if (value.style) this.style = value.style;
			else this.style = {};
		}
	};
	Cell.Types = Enums.ValueType;
	var NullValue = class {
		constructor(cell) {
			this.model = {
				address: cell.address,
				type: Cell.Types.Null
			};
		}
		get value() {
			return null;
		}
		set value(value) {}
		get type() {
			return Cell.Types.Null;
		}
		get effectiveType() {
			return Cell.Types.Null;
		}
		get address() {
			return this.model.address;
		}
		set address(value) {
			this.model.address = value;
		}
		toCsvString() {
			return "";
		}
		release() {}
		toString() {
			return "";
		}
	};
	var NumberValue = class {
		constructor(cell, value) {
			this.model = {
				address: cell.address,
				type: Cell.Types.Number,
				value
			};
		}
		get value() {
			return this.model.value;
		}
		set value(value) {
			this.model.value = value;
		}
		get type() {
			return Cell.Types.Number;
		}
		get effectiveType() {
			return Cell.Types.Number;
		}
		get address() {
			return this.model.address;
		}
		set address(value) {
			this.model.address = value;
		}
		toCsvString() {
			return this.model.value.toString();
		}
		release() {}
		toString() {
			return this.model.value.toString();
		}
	};
	var StringValue = class {
		constructor(cell, value) {
			this.model = {
				address: cell.address,
				type: Cell.Types.String,
				value
			};
		}
		get value() {
			return this.model.value;
		}
		set value(value) {
			this.model.value = value;
		}
		get type() {
			return Cell.Types.String;
		}
		get effectiveType() {
			return Cell.Types.String;
		}
		get address() {
			return this.model.address;
		}
		set address(value) {
			this.model.address = value;
		}
		toCsvString() {
			return `"${this.model.value.replace(/"/g, "\"\"")}"`;
		}
		release() {}
		toString() {
			return this.model.value;
		}
	};
	var RichTextValue = class {
		constructor(cell, value) {
			this.model = {
				address: cell.address,
				type: Cell.Types.String,
				value
			};
		}
		get value() {
			return this.model.value;
		}
		set value(value) {
			this.model.value = value;
		}
		toString() {
			return this.model.value.richText.map((t) => t.text).join("");
		}
		get type() {
			return Cell.Types.RichText;
		}
		get effectiveType() {
			return Cell.Types.RichText;
		}
		get address() {
			return this.model.address;
		}
		set address(value) {
			this.model.address = value;
		}
		toCsvString() {
			return `"${this.text.replace(/"/g, "\"\"")}"`;
		}
		release() {}
	};
	var DateValue = class {
		constructor(cell, value) {
			this.model = {
				address: cell.address,
				type: Cell.Types.Date,
				value
			};
		}
		get value() {
			return this.model.value;
		}
		set value(value) {
			this.model.value = value;
		}
		get type() {
			return Cell.Types.Date;
		}
		get effectiveType() {
			return Cell.Types.Date;
		}
		get address() {
			return this.model.address;
		}
		set address(value) {
			this.model.address = value;
		}
		toCsvString() {
			return this.model.value.toISOString();
		}
		release() {}
		toString() {
			return this.model.value.toString();
		}
	};
	var HyperlinkValue = class {
		constructor(cell, value) {
			this.model = {
				address: cell.address,
				type: Cell.Types.Hyperlink,
				text: value ? value.text : void 0,
				hyperlink: value ? value.hyperlink : void 0
			};
			if (value && value.tooltip) this.model.tooltip = value.tooltip;
		}
		get value() {
			const v = {
				text: this.model.text,
				hyperlink: this.model.hyperlink
			};
			if (this.model.tooltip) v.tooltip = this.model.tooltip;
			return v;
		}
		set value(value) {
			this.model = {
				text: value.text,
				hyperlink: value.hyperlink
			};
			if (value.tooltip) this.model.tooltip = value.tooltip;
		}
		get text() {
			return this.model.text;
		}
		set text(value) {
			this.model.text = value;
		}
		get hyperlink() {
			return this.model.hyperlink;
		}
		set hyperlink(value) {
			this.model.hyperlink = value;
		}
		get type() {
			return Cell.Types.Hyperlink;
		}
		get effectiveType() {
			return Cell.Types.Hyperlink;
		}
		get address() {
			return this.model.address;
		}
		set address(value) {
			this.model.address = value;
		}
		toCsvString() {
			return this.model.hyperlink;
		}
		release() {}
		toString() {
			return this.model.text;
		}
	};
	var MergeValue = class {
		constructor(cell, master) {
			this.model = {
				address: cell.address,
				type: Cell.Types.Merge,
				master: master ? master.address : void 0
			};
			this._master = master;
			if (master) master.addMergeRef();
		}
		get value() {
			return this._master.value;
		}
		set value(value) {
			if (value instanceof Cell) {
				if (this._master) this._master.releaseMergeRef();
				value.addMergeRef();
				this._master = value;
			} else this._master.value = value;
		}
		isMergedTo(master) {
			return master === this._master;
		}
		get master() {
			return this._master;
		}
		get type() {
			return Cell.Types.Merge;
		}
		get effectiveType() {
			return this._master.effectiveType;
		}
		get address() {
			return this.model.address;
		}
		set address(value) {
			this.model.address = value;
		}
		toCsvString() {
			return "";
		}
		release() {
			this._master.releaseMergeRef();
		}
		toString() {
			return this.value.toString();
		}
	};
	var FormulaValue = class {
		constructor(cell, value) {
			this.cell = cell;
			this.model = {
				address: cell.address,
				type: Cell.Types.Formula,
				shareType: value ? value.shareType : void 0,
				ref: value ? value.ref : void 0,
				formula: value ? value.formula : void 0,
				sharedFormula: value ? value.sharedFormula : void 0,
				result: value ? value.result : void 0
			};
		}
		_copyModel(model) {
			const copy = {};
			const cp = (name) => {
				const value = model[name];
				if (value) copy[name] = value;
			};
			cp("formula");
			cp("result");
			cp("ref");
			cp("shareType");
			cp("sharedFormula");
			return copy;
		}
		get value() {
			return this._copyModel(this.model);
		}
		set value(value) {
			this.model = this._copyModel(value);
		}
		validate(value) {
			switch (Value.getType(value)) {
				case Cell.Types.Null:
				case Cell.Types.String:
				case Cell.Types.Number:
				case Cell.Types.Date: break;
				case Cell.Types.Hyperlink:
				case Cell.Types.Formula:
				default: throw new Error("Cannot process that type of result value");
			}
		}
		get dependencies() {
			return {
				ranges: this.formula.match(/([a-zA-Z0-9]+!)?[A-Z]{1,3}\d{1,4}:[A-Z]{1,3}\d{1,4}/g),
				cells: this.formula.replace(/([a-zA-Z0-9]+!)?[A-Z]{1,3}\d{1,4}:[A-Z]{1,3}\d{1,4}/g, "").match(/([a-zA-Z0-9]+!)?[A-Z]{1,3}\d{1,4}/g)
			};
		}
		get formula() {
			return this.model.formula || this._getTranslatedFormula();
		}
		set formula(value) {
			this.model.formula = value;
		}
		get formulaType() {
			if (this.model.formula) return Enums.FormulaType.Master;
			if (this.model.sharedFormula) return Enums.FormulaType.Shared;
			return Enums.FormulaType.None;
		}
		get result() {
			return this.model.result;
		}
		set result(value) {
			this.model.result = value;
		}
		get type() {
			return Cell.Types.Formula;
		}
		get effectiveType() {
			const v = this.model.result;
			if (v === null || v === void 0) return Enums.ValueType.Null;
			if (v instanceof String || typeof v === "string") return Enums.ValueType.String;
			if (typeof v === "number") return Enums.ValueType.Number;
			if (v instanceof Date) return Enums.ValueType.Date;
			if (v.text && v.hyperlink) return Enums.ValueType.Hyperlink;
			if (v.formula) return Enums.ValueType.Formula;
			return Enums.ValueType.Null;
		}
		get address() {
			return this.model.address;
		}
		set address(value) {
			this.model.address = value;
		}
		_getTranslatedFormula() {
			if (!this._translatedFormula && this.model.sharedFormula) {
				const { worksheet } = this.cell;
				const master = worksheet.findCell(this.model.sharedFormula);
				this._translatedFormula = master && slideFormula(master.formula, master.address, this.model.address);
			}
			return this._translatedFormula;
		}
		toCsvString() {
			return `${this.model.result || ""}`;
		}
		release() {}
		toString() {
			return this.model.result ? this.model.result.toString() : "";
		}
	};
	var SharedStringValue = class {
		constructor(cell, value) {
			this.model = {
				address: cell.address,
				type: Cell.Types.SharedString,
				value
			};
		}
		get value() {
			return this.model.value;
		}
		set value(value) {
			this.model.value = value;
		}
		get type() {
			return Cell.Types.SharedString;
		}
		get effectiveType() {
			return Cell.Types.SharedString;
		}
		get address() {
			return this.model.address;
		}
		set address(value) {
			this.model.address = value;
		}
		toCsvString() {
			return this.model.value.toString();
		}
		release() {}
		toString() {
			return this.model.value.toString();
		}
	};
	var BooleanValue = class {
		constructor(cell, value) {
			this.model = {
				address: cell.address,
				type: Cell.Types.Boolean,
				value
			};
		}
		get value() {
			return this.model.value;
		}
		set value(value) {
			this.model.value = value;
		}
		get type() {
			return Cell.Types.Boolean;
		}
		get effectiveType() {
			return Cell.Types.Boolean;
		}
		get address() {
			return this.model.address;
		}
		set address(value) {
			this.model.address = value;
		}
		toCsvString() {
			return this.model.value ? 1 : 0;
		}
		release() {}
		toString() {
			return this.model.value.toString();
		}
	};
	var ErrorValue = class {
		constructor(cell, value) {
			this.model = {
				address: cell.address,
				type: Cell.Types.Error,
				value
			};
		}
		get value() {
			return this.model.value;
		}
		set value(value) {
			this.model.value = value;
		}
		get type() {
			return Cell.Types.Error;
		}
		get effectiveType() {
			return Cell.Types.Error;
		}
		get address() {
			return this.model.address;
		}
		set address(value) {
			this.model.address = value;
		}
		toCsvString() {
			return this.toString();
		}
		release() {}
		toString() {
			return this.model.value.error.toString();
		}
	};
	var JSONValue = class {
		constructor(cell, value) {
			this.model = {
				address: cell.address,
				type: Cell.Types.String,
				value: JSON.stringify(value),
				rawValue: value
			};
		}
		get value() {
			return this.model.rawValue;
		}
		set value(value) {
			this.model.rawValue = value;
			this.model.value = JSON.stringify(value);
		}
		get type() {
			return Cell.Types.String;
		}
		get effectiveType() {
			return Cell.Types.String;
		}
		get address() {
			return this.model.address;
		}
		set address(value) {
			this.model.address = value;
		}
		toCsvString() {
			return this.model.value;
		}
		release() {}
		toString() {
			return this.model.value;
		}
	};
	var Value = {
		getType(value) {
			if (value === null || value === void 0) return Cell.Types.Null;
			if (value instanceof String || typeof value === "string") return Cell.Types.String;
			if (typeof value === "number") return Cell.Types.Number;
			if (typeof value === "boolean") return Cell.Types.Boolean;
			if (value instanceof Date) return Cell.Types.Date;
			if (value.text && value.hyperlink) return Cell.Types.Hyperlink;
			if (value.formula || value.sharedFormula) return Cell.Types.Formula;
			if (value.richText) return Cell.Types.RichText;
			if (value.sharedString) return Cell.Types.SharedString;
			if (value.error) return Cell.Types.Error;
			return Cell.Types.JSON;
		},
		types: [
			{
				t: Cell.Types.Null,
				f: NullValue
			},
			{
				t: Cell.Types.Number,
				f: NumberValue
			},
			{
				t: Cell.Types.String,
				f: StringValue
			},
			{
				t: Cell.Types.Date,
				f: DateValue
			},
			{
				t: Cell.Types.Hyperlink,
				f: HyperlinkValue
			},
			{
				t: Cell.Types.Formula,
				f: FormulaValue
			},
			{
				t: Cell.Types.Merge,
				f: MergeValue
			},
			{
				t: Cell.Types.JSON,
				f: JSONValue
			},
			{
				t: Cell.Types.SharedString,
				f: SharedStringValue
			},
			{
				t: Cell.Types.RichText,
				f: RichTextValue
			},
			{
				t: Cell.Types.Boolean,
				f: BooleanValue
			},
			{
				t: Cell.Types.Error,
				f: ErrorValue
			}
		].reduce((p, t) => {
			p[t.t] = t.f;
			return p;
		}, []),
		create(type, cell, value) {
			const T = this.types[type];
			if (!T) throw new Error(`Could not create Value of type ${type}`);
			return new T(cell, value);
		}
	};
	module.exports = Cell;
}));
//#endregion
//#region node_modules/exceljs/lib/doc/row.js
var require_row = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var _ = require_under_dash();
	var Enums = require_enums();
	var colCache = require_col_cache();
	var Cell = require_cell();
	var Row = class {
		constructor(worksheet, number) {
			this._worksheet = worksheet;
			this._number = number;
			this._cells = [];
			this.style = {};
			this.outlineLevel = 0;
		}
		get number() {
			return this._number;
		}
		get worksheet() {
			return this._worksheet;
		}
		commit() {
			this._worksheet._commitRow(this);
		}
		destroy() {
			delete this._worksheet;
			delete this._cells;
			delete this.style;
		}
		findCell(colNumber) {
			return this._cells[colNumber - 1];
		}
		getCellEx(address) {
			let cell = this._cells[address.col - 1];
			if (!cell) {
				const column = this._worksheet.getColumn(address.col);
				cell = new Cell(this, column, address.address);
				this._cells[address.col - 1] = cell;
			}
			return cell;
		}
		getCell(col) {
			if (typeof col === "string") {
				const column = this._worksheet.getColumnKey(col);
				if (column) col = column.number;
				else col = colCache.l2n(col);
			}
			return this._cells[col - 1] || this.getCellEx({
				address: colCache.encodeAddress(this._number, col),
				row: this._number,
				col
			});
		}
		splice(start, count, ...inserts) {
			const nKeep = start + count;
			const nExpand = inserts.length - count;
			const nEnd = this._cells.length;
			let i;
			let cSrc;
			let cDst;
			if (nExpand < 0) for (i = start + inserts.length; i <= nEnd; i++) {
				cDst = this._cells[i - 1];
				cSrc = this._cells[i - nExpand - 1];
				if (cSrc) {
					cDst = this.getCell(i);
					cDst.value = cSrc.value;
					cDst.style = cSrc.style;
					cDst._comment = cSrc._comment;
				} else if (cDst) {
					cDst.value = null;
					cDst.style = {};
					cDst._comment = void 0;
				}
			}
			else if (nExpand > 0) for (i = nEnd; i >= nKeep; i--) {
				cSrc = this._cells[i - 1];
				if (cSrc) {
					cDst = this.getCell(i + nExpand);
					cDst.value = cSrc.value;
					cDst.style = cSrc.style;
					cDst._comment = cSrc._comment;
				} else this._cells[i + nExpand - 1] = void 0;
			}
			for (i = 0; i < inserts.length; i++) {
				cDst = this.getCell(start + i);
				cDst.value = inserts[i];
				cDst.style = {};
				cDst._comment = void 0;
			}
		}
		eachCell(options, iteratee) {
			if (!iteratee) {
				iteratee = options;
				options = null;
			}
			if (options && options.includeEmpty) {
				const n = this._cells.length;
				for (let i = 1; i <= n; i++) iteratee(this.getCell(i), i);
			} else this._cells.forEach((cell, index) => {
				if (cell && cell.type !== Enums.ValueType.Null) iteratee(cell, index + 1);
			});
		}
		addPageBreak(lft, rght) {
			const ws = this._worksheet;
			const left = Math.max(0, lft - 1) || 0;
			const right = Math.max(0, rght - 1) || 16838;
			const pb = {
				id: this._number,
				max: right,
				man: 1
			};
			if (left) pb.min = left;
			ws.rowBreaks.push(pb);
		}
		get values() {
			const values = [];
			this._cells.forEach((cell) => {
				if (cell && cell.type !== Enums.ValueType.Null) values[cell.col] = cell.value;
			});
			return values;
		}
		set values(value) {
			this._cells = [];
			if (!value) {} else if (value instanceof Array) {
				let offset = 0;
				if (value.hasOwnProperty("0")) offset = 1;
				value.forEach((item, index) => {
					if (item !== void 0) this.getCellEx({
						address: colCache.encodeAddress(this._number, index + offset),
						row: this._number,
						col: index + offset
					}).value = item;
				});
			} else this._worksheet.eachColumnKey((column, key) => {
				if (value[key] !== void 0) this.getCellEx({
					address: colCache.encodeAddress(this._number, column.number),
					row: this._number,
					col: column.number
				}).value = value[key];
			});
		}
		get hasValues() {
			return _.some(this._cells, (cell) => cell && cell.type !== Enums.ValueType.Null);
		}
		get cellCount() {
			return this._cells.length;
		}
		get actualCellCount() {
			let count = 0;
			this.eachCell(() => {
				count++;
			});
			return count;
		}
		get dimensions() {
			let min = 0;
			let max = 0;
			this._cells.forEach((cell) => {
				if (cell && cell.type !== Enums.ValueType.Null) {
					if (!min || min > cell.col) min = cell.col;
					if (max < cell.col) max = cell.col;
				}
			});
			return min > 0 ? {
				min,
				max
			} : null;
		}
		_applyStyle(name, value) {
			this.style[name] = value;
			this._cells.forEach((cell) => {
				if (cell) cell[name] = value;
			});
			return value;
		}
		get numFmt() {
			return this.style.numFmt;
		}
		set numFmt(value) {
			this._applyStyle("numFmt", value);
		}
		get font() {
			return this.style.font;
		}
		set font(value) {
			this._applyStyle("font", value);
		}
		get alignment() {
			return this.style.alignment;
		}
		set alignment(value) {
			this._applyStyle("alignment", value);
		}
		get protection() {
			return this.style.protection;
		}
		set protection(value) {
			this._applyStyle("protection", value);
		}
		get border() {
			return this.style.border;
		}
		set border(value) {
			this._applyStyle("border", value);
		}
		get fill() {
			return this.style.fill;
		}
		set fill(value) {
			this._applyStyle("fill", value);
		}
		get hidden() {
			return !!this._hidden;
		}
		set hidden(value) {
			this._hidden = value;
		}
		get outlineLevel() {
			return this._outlineLevel || 0;
		}
		set outlineLevel(value) {
			this._outlineLevel = value;
		}
		get collapsed() {
			return !!(this._outlineLevel && this._outlineLevel >= this._worksheet.properties.outlineLevelRow);
		}
		get model() {
			const cells = [];
			let min = 0;
			let max = 0;
			this._cells.forEach((cell) => {
				if (cell) {
					const cellModel = cell.model;
					if (cellModel) {
						if (!min || min > cell.col) min = cell.col;
						if (max < cell.col) max = cell.col;
						cells.push(cellModel);
					}
				}
			});
			return this.height || cells.length ? {
				cells,
				number: this.number,
				min,
				max,
				height: this.height,
				style: this.style,
				hidden: this.hidden,
				outlineLevel: this.outlineLevel,
				collapsed: this.collapsed
			} : null;
		}
		set model(value) {
			if (value.number !== this._number) throw new Error("Invalid row number in model");
			this._cells = [];
			let previousAddress;
			value.cells.forEach((cellModel) => {
				switch (cellModel.type) {
					case Cell.Types.Merge: break;
					default: {
						let address;
						if (cellModel.address) address = colCache.decodeAddress(cellModel.address);
						else if (previousAddress) {
							const { row } = previousAddress;
							const col = previousAddress.col + 1;
							address = {
								row,
								col,
								address: colCache.encodeAddress(row, col),
								$col$row: `$${colCache.n2l(col)}$${row}`
							};
						}
						previousAddress = address;
						const cell = this.getCellEx(address);
						cell.model = cellModel;
						break;
					}
				}
			});
			if (value.height) this.height = value.height;
			else delete this.height;
			this.hidden = value.hidden;
			this.outlineLevel = value.outlineLevel || 0;
			this.style = value.style && JSON.parse(JSON.stringify(value.style)) || {};
		}
	};
	module.exports = Row;
}));
//#endregion
//#region node_modules/exceljs/lib/doc/column.js
var require_column = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var _ = require_under_dash();
	var Enums = require_enums();
	var colCache = require_col_cache();
	var DEFAULT_COLUMN_WIDTH = 9;
	module.exports = class Column {
		constructor(worksheet, number, defn) {
			this._worksheet = worksheet;
			this._number = number;
			if (defn !== false) this.defn = defn;
		}
		get number() {
			return this._number;
		}
		get worksheet() {
			return this._worksheet;
		}
		get letter() {
			return colCache.n2l(this._number);
		}
		get isCustomWidth() {
			return this.width !== void 0 && this.width !== DEFAULT_COLUMN_WIDTH;
		}
		get defn() {
			return {
				header: this._header,
				key: this.key,
				width: this.width,
				style: this.style,
				hidden: this.hidden,
				outlineLevel: this.outlineLevel
			};
		}
		set defn(value) {
			if (value) {
				this.key = value.key;
				this.width = value.width !== void 0 ? value.width : DEFAULT_COLUMN_WIDTH;
				this.outlineLevel = value.outlineLevel;
				if (value.style) this.style = value.style;
				else this.style = {};
				this.header = value.header;
				this._hidden = !!value.hidden;
			} else {
				delete this._header;
				delete this._key;
				delete this.width;
				this.style = {};
				this.outlineLevel = 0;
			}
		}
		get headers() {
			return this._header && this._header instanceof Array ? this._header : [this._header];
		}
		get header() {
			return this._header;
		}
		set header(value) {
			if (value !== void 0) {
				this._header = value;
				this.headers.forEach((text, index) => {
					this._worksheet.getCell(index + 1, this.number).value = text;
				});
			} else this._header = void 0;
		}
		get key() {
			return this._key;
		}
		set key(value) {
			if ((this._key && this._worksheet.getColumnKey(this._key)) === this) this._worksheet.deleteColumnKey(this._key);
			this._key = value;
			if (value) this._worksheet.setColumnKey(this._key, this);
		}
		get hidden() {
			return !!this._hidden;
		}
		set hidden(value) {
			this._hidden = value;
		}
		get outlineLevel() {
			return this._outlineLevel || 0;
		}
		set outlineLevel(value) {
			this._outlineLevel = value;
		}
		get collapsed() {
			return !!(this._outlineLevel && this._outlineLevel >= this._worksheet.properties.outlineLevelCol);
		}
		toString() {
			return JSON.stringify({
				key: this.key,
				width: this.width,
				headers: this.headers.length ? this.headers : void 0
			});
		}
		equivalentTo(other) {
			return this.width === other.width && this.hidden === other.hidden && this.outlineLevel === other.outlineLevel && _.isEqual(this.style, other.style);
		}
		get isDefault() {
			if (this.isCustomWidth) return false;
			if (this.hidden) return false;
			if (this.outlineLevel) return false;
			const s = this.style;
			if (s && (s.font || s.numFmt || s.alignment || s.border || s.fill || s.protection)) return false;
			return true;
		}
		get headerCount() {
			return this.headers.length;
		}
		eachCell(options, iteratee) {
			const colNumber = this.number;
			if (!iteratee) {
				iteratee = options;
				options = null;
			}
			this._worksheet.eachRow(options, (row, rowNumber) => {
				iteratee(row.getCell(colNumber), rowNumber);
			});
		}
		get values() {
			const v = [];
			this.eachCell((cell, rowNumber) => {
				if (cell && cell.type !== Enums.ValueType.Null) v[rowNumber] = cell.value;
			});
			return v;
		}
		set values(v) {
			if (!v) return;
			const colNumber = this.number;
			let offset = 0;
			if (v.hasOwnProperty("0")) offset = 1;
			v.forEach((value, index) => {
				this._worksheet.getCell(index + offset, colNumber).value = value;
			});
		}
		_applyStyle(name, value) {
			this.style[name] = value;
			this.eachCell((cell) => {
				cell[name] = value;
			});
			return value;
		}
		get numFmt() {
			return this.style.numFmt;
		}
		set numFmt(value) {
			this._applyStyle("numFmt", value);
		}
		get font() {
			return this.style.font;
		}
		set font(value) {
			this._applyStyle("font", value);
		}
		get alignment() {
			return this.style.alignment;
		}
		set alignment(value) {
			this._applyStyle("alignment", value);
		}
		get protection() {
			return this.style.protection;
		}
		set protection(value) {
			this._applyStyle("protection", value);
		}
		get border() {
			return this.style.border;
		}
		set border(value) {
			this._applyStyle("border", value);
		}
		get fill() {
			return this.style.fill;
		}
		set fill(value) {
			this._applyStyle("fill", value);
		}
		static toModel(columns) {
			const cols = [];
			let col = null;
			if (columns) columns.forEach((column, index) => {
				if (column.isDefault) {
					if (col) col = null;
				} else if (!col || !column.equivalentTo(col)) {
					col = {
						min: index + 1,
						max: index + 1,
						width: column.width !== void 0 ? column.width : DEFAULT_COLUMN_WIDTH,
						style: column.style,
						isCustomWidth: column.isCustomWidth,
						hidden: column.hidden,
						outlineLevel: column.outlineLevel,
						collapsed: column.collapsed
					};
					cols.push(col);
				} else col.max = index + 1;
			});
			return cols.length ? cols : void 0;
		}
		static fromModel(worksheet, cols) {
			cols = cols || [];
			const columns = [];
			let count = 1;
			let index = 0;
			/**
			* sort cols by min
			* If it is not sorted, the subsequent column configuration will be overwritten
			* */
			cols = cols.sort(function(pre, next) {
				return pre.min - next.min;
			});
			while (index < cols.length) {
				const col = cols[index++];
				while (count < col.min) columns.push(new Column(worksheet, count++));
				while (count <= col.max) columns.push(new Column(worksheet, count++, col));
			}
			return columns.length ? columns : null;
		}
	};
}));
//#endregion
//#region node_modules/exceljs/lib/doc/anchor.js
var require_anchor = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var colCache = require_col_cache();
	module.exports = class Anchor {
		constructor(worksheet, address, offset = 0) {
			this.worksheet = worksheet;
			if (!address) {
				this.nativeCol = 0;
				this.nativeColOff = 0;
				this.nativeRow = 0;
				this.nativeRowOff = 0;
			} else if (typeof address === "string") {
				const decoded = colCache.decodeAddress(address);
				this.nativeCol = decoded.col + offset;
				this.nativeColOff = 0;
				this.nativeRow = decoded.row + offset;
				this.nativeRowOff = 0;
			} else if (address.nativeCol !== void 0) {
				this.nativeCol = address.nativeCol || 0;
				this.nativeColOff = address.nativeColOff || 0;
				this.nativeRow = address.nativeRow || 0;
				this.nativeRowOff = address.nativeRowOff || 0;
			} else if (address.col !== void 0) {
				this.col = address.col + offset;
				this.row = address.row + offset;
			} else {
				this.nativeCol = 0;
				this.nativeColOff = 0;
				this.nativeRow = 0;
				this.nativeRowOff = 0;
			}
		}
		static asInstance(model) {
			return model instanceof Anchor || model == null ? model : new Anchor(model);
		}
		get col() {
			return this.nativeCol + Math.min(this.colWidth - 1, this.nativeColOff) / this.colWidth;
		}
		set col(v) {
			this.nativeCol = Math.floor(v);
			this.nativeColOff = Math.floor((v - this.nativeCol) * this.colWidth);
		}
		get row() {
			return this.nativeRow + Math.min(this.rowHeight - 1, this.nativeRowOff) / this.rowHeight;
		}
		set row(v) {
			this.nativeRow = Math.floor(v);
			this.nativeRowOff = Math.floor((v - this.nativeRow) * this.rowHeight);
		}
		get colWidth() {
			return this.worksheet && this.worksheet.getColumn(this.nativeCol + 1) && this.worksheet.getColumn(this.nativeCol + 1).isCustomWidth ? Math.floor(this.worksheet.getColumn(this.nativeCol + 1).width * 1e4) : 64e4;
		}
		get rowHeight() {
			return this.worksheet && this.worksheet.getRow(this.nativeRow + 1) && this.worksheet.getRow(this.nativeRow + 1).height ? Math.floor(this.worksheet.getRow(this.nativeRow + 1).height * 1e4) : 18e4;
		}
		get model() {
			return {
				nativeCol: this.nativeCol,
				nativeColOff: this.nativeColOff,
				nativeRow: this.nativeRow,
				nativeRowOff: this.nativeRowOff
			};
		}
		set model(value) {
			this.nativeCol = value.nativeCol;
			this.nativeColOff = value.nativeColOff;
			this.nativeRow = value.nativeRow;
			this.nativeRowOff = value.nativeRowOff;
		}
	};
}));
//#endregion
//#region node_modules/exceljs/lib/doc/image.js
var require_image = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var colCache = require_col_cache();
	var Anchor = require_anchor();
	var Image = class {
		constructor(worksheet, model) {
			this.worksheet = worksheet;
			this.model = model;
		}
		get model() {
			switch (this.type) {
				case "background": return {
					type: this.type,
					imageId: this.imageId
				};
				case "image": return {
					type: this.type,
					imageId: this.imageId,
					hyperlinks: this.range.hyperlinks,
					range: {
						tl: this.range.tl.model,
						br: this.range.br && this.range.br.model,
						ext: this.range.ext,
						editAs: this.range.editAs
					}
				};
				default: throw new Error("Invalid Image Type");
			}
		}
		set model({ type, imageId, range, hyperlinks }) {
			this.type = type;
			this.imageId = imageId;
			if (type === "image") {
				if (typeof range === "string") {
					const decoded = colCache.decode(range);
					this.range = {
						tl: new Anchor(this.worksheet, {
							col: decoded.left,
							row: decoded.top
						}, -1),
						br: new Anchor(this.worksheet, {
							col: decoded.right,
							row: decoded.bottom
						}, 0),
						editAs: "oneCell"
					};
				} else this.range = {
					tl: new Anchor(this.worksheet, range.tl, 0),
					br: range.br && new Anchor(this.worksheet, range.br, 0),
					ext: range.ext,
					editAs: range.editAs,
					hyperlinks: hyperlinks || range.hyperlinks
				};
			}
		}
	};
	module.exports = Image;
}));
//#endregion
//#region node_modules/exceljs/lib/doc/table.js
var require_table = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var colCache = require_col_cache();
	var Column = class {
		constructor(table, column, index) {
			this.table = table;
			this.column = column;
			this.index = index;
		}
		_set(name, value) {
			this.table.cacheState();
			this.column[name] = value;
		}
		get name() {
			return this.column.name;
		}
		set name(value) {
			this._set("name", value);
		}
		get filterButton() {
			return this.column.filterButton;
		}
		set filterButton(value) {
			this.column.filterButton = value;
		}
		get style() {
			return this.column.style;
		}
		set style(value) {
			this.column.style = value;
		}
		get totalsRowLabel() {
			return this.column.totalsRowLabel;
		}
		set totalsRowLabel(value) {
			this._set("totalsRowLabel", value);
		}
		get totalsRowFunction() {
			return this.column.totalsRowFunction;
		}
		set totalsRowFunction(value) {
			this._set("totalsRowFunction", value);
		}
		get totalsRowResult() {
			return this.column.totalsRowResult;
		}
		set totalsRowResult(value) {
			this._set("totalsRowResult", value);
		}
		get totalsRowFormula() {
			return this.column.totalsRowFormula;
		}
		set totalsRowFormula(value) {
			this._set("totalsRowFormula", value);
		}
	};
	var Table = class {
		constructor(worksheet, table) {
			this.worksheet = worksheet;
			if (table) {
				this.table = table;
				this.validate();
				this.store();
			}
		}
		getFormula(column) {
			switch (column.totalsRowFunction) {
				case "none": return null;
				case "average": return `SUBTOTAL(101,${this.table.name}[${column.name}])`;
				case "countNums": return `SUBTOTAL(102,${this.table.name}[${column.name}])`;
				case "count": return `SUBTOTAL(103,${this.table.name}[${column.name}])`;
				case "max": return `SUBTOTAL(104,${this.table.name}[${column.name}])`;
				case "min": return `SUBTOTAL(105,${this.table.name}[${column.name}])`;
				case "stdDev": return `SUBTOTAL(106,${this.table.name}[${column.name}])`;
				case "var": return `SUBTOTAL(107,${this.table.name}[${column.name}])`;
				case "sum": return `SUBTOTAL(109,${this.table.name}[${column.name}])`;
				case "custom": return column.totalsRowFormula;
				default: throw new Error(`Invalid Totals Row Function: ${column.totalsRowFunction}`);
			}
		}
		get width() {
			return this.table.columns.length;
		}
		get height() {
			return this.table.rows.length;
		}
		get filterHeight() {
			return this.height + (this.table.headerRow ? 1 : 0);
		}
		get tableHeight() {
			return this.filterHeight + (this.table.totalsRow ? 1 : 0);
		}
		validate() {
			const { table } = this;
			const assign = (o, name, dflt) => {
				if (o[name] === void 0) o[name] = dflt;
			};
			assign(table, "headerRow", true);
			assign(table, "totalsRow", false);
			assign(table, "style", {});
			assign(table.style, "theme", "TableStyleMedium2");
			assign(table.style, "showFirstColumn", false);
			assign(table.style, "showLastColumn", false);
			assign(table.style, "showRowStripes", false);
			assign(table.style, "showColumnStripes", false);
			const assert = (test, message) => {
				if (!test) throw new Error(message);
			};
			assert(table.ref, "Table must have ref");
			assert(table.columns, "Table must have column definitions");
			assert(table.rows, "Table must have row definitions");
			table.tl = colCache.decodeAddress(table.ref);
			const { row, col } = table.tl;
			assert(row > 0, "Table must be on valid row");
			assert(col > 0, "Table must be on valid col");
			const { width, filterHeight, tableHeight } = this;
			table.autoFilterRef = colCache.encode(row, col, row + filterHeight - 1, col + width - 1);
			table.tableRef = colCache.encode(row, col, row + tableHeight - 1, col + width - 1);
			table.columns.forEach((column, i) => {
				assert(column.name, `Column ${i} must have a name`);
				if (i === 0) assign(column, "totalsRowLabel", "Total");
				else {
					assign(column, "totalsRowFunction", "none");
					column.totalsRowFormula = this.getFormula(column);
				}
			});
		}
		store() {
			const assignStyle = (cell, style) => {
				if (style) Object.keys(style).forEach((key) => {
					cell[key] = style[key];
				});
			};
			const { worksheet, table } = this;
			const { row, col } = table.tl;
			let count = 0;
			if (table.headerRow) {
				const r = worksheet.getRow(row + count++);
				table.columns.forEach((column, j) => {
					const { style, name } = column;
					const cell = r.getCell(col + j);
					cell.value = name;
					assignStyle(cell, style);
				});
			}
			table.rows.forEach((data) => {
				const r = worksheet.getRow(row + count++);
				data.forEach((value, j) => {
					const cell = r.getCell(col + j);
					cell.value = value;
					assignStyle(cell, table.columns[j].style);
				});
			});
			if (table.totalsRow) {
				const r = worksheet.getRow(row + count++);
				table.columns.forEach((column, j) => {
					const cell = r.getCell(col + j);
					if (j === 0) cell.value = column.totalsRowLabel;
					else if (this.getFormula(column)) cell.value = {
						formula: column.totalsRowFormula,
						result: column.totalsRowResult
					};
					else cell.value = null;
					assignStyle(cell, column.style);
				});
			}
		}
		load(worksheet) {
			const { table } = this;
			const { row, col } = table.tl;
			let count = 0;
			if (table.headerRow) {
				const r = worksheet.getRow(row + count++);
				table.columns.forEach((column, j) => {
					const cell = r.getCell(col + j);
					cell.value = column.name;
				});
			}
			table.rows.forEach((data) => {
				const r = worksheet.getRow(row + count++);
				data.forEach((value, j) => {
					const cell = r.getCell(col + j);
					cell.value = value;
				});
			});
			if (table.totalsRow) {
				const r = worksheet.getRow(row + count++);
				table.columns.forEach((column, j) => {
					const cell = r.getCell(col + j);
					if (j === 0) cell.value = column.totalsRowLabel;
					else if (this.getFormula(column)) cell.value = {
						formula: column.totalsRowFormula,
						result: column.totalsRowResult
					};
				});
			}
		}
		get model() {
			return this.table;
		}
		set model(value) {
			this.table = value;
		}
		cacheState() {
			if (!this._cache) this._cache = {
				ref: this.ref,
				width: this.width,
				tableHeight: this.tableHeight
			};
		}
		commit() {
			if (!this._cache) return;
			this.validate();
			const ref = colCache.decodeAddress(this._cache.ref);
			if (this.ref !== this._cache.ref) for (let i = 0; i < this._cache.tableHeight; i++) {
				const row = this.worksheet.getRow(ref.row + i);
				for (let j = 0; j < this._cache.width; j++) {
					const cell = row.getCell(ref.col + j);
					cell.value = null;
				}
			}
			else {
				for (let i = this.tableHeight; i < this._cache.tableHeight; i++) {
					const row = this.worksheet.getRow(ref.row + i);
					for (let j = 0; j < this._cache.width; j++) {
						const cell = row.getCell(ref.col + j);
						cell.value = null;
					}
				}
				for (let i = 0; i < this.tableHeight; i++) {
					const row = this.worksheet.getRow(ref.row + i);
					for (let j = this.width; j < this._cache.width; j++) {
						const cell = row.getCell(ref.col + j);
						cell.value = null;
					}
				}
			}
			this.store();
		}
		addRow(values, rowNumber) {
			this.cacheState();
			if (rowNumber === void 0) this.table.rows.push(values);
			else this.table.rows.splice(rowNumber, 0, values);
		}
		removeRows(rowIndex, count = 1) {
			this.cacheState();
			this.table.rows.splice(rowIndex, count);
		}
		getColumn(colIndex) {
			const column = this.table.columns[colIndex];
			return new Column(this, column, colIndex);
		}
		addColumn(column, values, colIndex) {
			this.cacheState();
			if (colIndex === void 0) {
				this.table.columns.push(column);
				this.table.rows.forEach((row, i) => {
					row.push(values[i]);
				});
			} else {
				this.table.columns.splice(colIndex, 0, column);
				this.table.rows.forEach((row, i) => {
					row.splice(colIndex, 0, values[i]);
				});
			}
		}
		removeColumns(colIndex, count = 1) {
			this.cacheState();
			this.table.columns.splice(colIndex, count);
			this.table.rows.forEach((row) => {
				row.splice(colIndex, count);
			});
		}
		_assign(target, prop, value) {
			this.cacheState();
			target[prop] = value;
		}
		get ref() {
			return this.table.ref;
		}
		set ref(value) {
			this._assign(this.table, "ref", value);
		}
		get name() {
			return this.table.name;
		}
		set name(value) {
			this.table.name = value;
		}
		get displayName() {
			return this.table.displyName || this.table.name;
		}
		set displayNamename(value) {
			this.table.displayName = value;
		}
		get headerRow() {
			return this.table.headerRow;
		}
		set headerRow(value) {
			this._assign(this.table, "headerRow", value);
		}
		get totalsRow() {
			return this.table.totalsRow;
		}
		set totalsRow(value) {
			this._assign(this.table, "totalsRow", value);
		}
		get theme() {
			return this.table.style.name;
		}
		set theme(value) {
			this.table.style.name = value;
		}
		get showFirstColumn() {
			return this.table.style.showFirstColumn;
		}
		set showFirstColumn(value) {
			this.table.style.showFirstColumn = value;
		}
		get showLastColumn() {
			return this.table.style.showLastColumn;
		}
		set showLastColumn(value) {
			this.table.style.showLastColumn = value;
		}
		get showRowStripes() {
			return this.table.style.showRowStripes;
		}
		set showRowStripes(value) {
			this.table.style.showRowStripes = value;
		}
		get showColumnStripes() {
			return this.table.style.showColumnStripes;
		}
		set showColumnStripes(value) {
			this.table.style.showColumnStripes = value;
		}
	};
	module.exports = Table;
}));
//#endregion
//#region node_modules/exceljs/lib/doc/data-validations.js
var require_data_validations = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var DataValidations = class {
		constructor(model) {
			this.model = model || {};
		}
		add(address, validation) {
			return this.model[address] = validation;
		}
		find(address) {
			return this.model[address];
		}
		remove(address) {
			this.model[address] = void 0;
		}
	};
	module.exports = DataValidations;
}));
//#endregion
//#region node_modules/exceljs/lib/utils/encryptor.js
var require_encryptor = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var crypto$1 = __require("crypto");
	module.exports = {
		/**
		* Calculate a hash of the concatenated buffers with the given algorithm.
		* @param {string} algorithm - The hash algorithm.
		* @returns {Buffer} The hash
		*/
		hash(algorithm, ...buffers) {
			const hash = crypto$1.createHash(algorithm);
			hash.update(Buffer.concat(buffers));
			return hash.digest();
		},
		/**
		* Convert a password into an encryption key
		* @param {string} password - The password
		* @param {string} hashAlgorithm - The hash algoritm
		* @param {string} saltValue - The salt value
		* @param {number} spinCount - The spin count
		* @param {number} keyBits - The length of the key in bits
		* @param {Buffer} blockKey - The block key
		* @returns {Buffer} The encryption key
		*/
		convertPasswordToHash(password, hashAlgorithm, saltValue, spinCount) {
			hashAlgorithm = hashAlgorithm.toLowerCase();
			if (crypto$1.getHashes().indexOf(hashAlgorithm) < 0) throw new Error(`Hash algorithm '${hashAlgorithm}' not supported!`);
			const passwordBuffer = Buffer.from(password, "utf16le");
			let key = this.hash(hashAlgorithm, Buffer.from(saltValue, "base64"), passwordBuffer);
			for (let i = 0; i < spinCount; i++) {
				const iterator = Buffer.alloc(4);
				iterator.writeUInt32LE(i, 0);
				key = this.hash(hashAlgorithm, key, iterator);
			}
			return key.toString("base64");
		},
		/**
		* Generates cryptographically strong pseudo-random data.
		* @param size The size argument is a number indicating the number of bytes to generate.
		*/
		randomBytes(size) {
			return crypto$1.randomBytes(size);
		}
	};
}));
//#endregion
//#region node_modules/exceljs/lib/utils/copy-style.js
var require_copy_style = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oneDepthCopy = (obj, nestKeys) => ({
		...obj,
		...nestKeys.reduce((memo, key) => {
			if (obj[key]) memo[key] = { ...obj[key] };
			return memo;
		}, {})
	});
	var setIfExists = (src, dst, key, nestKeys = []) => {
		if (src[key]) dst[key] = oneDepthCopy(src[key], nestKeys);
	};
	var isEmptyObj = (obj) => Object.keys(obj).length === 0;
	var copyStyle = (style) => {
		if (!style) return style;
		if (isEmptyObj(style)) return {};
		const copied = { ...style };
		setIfExists(style, copied, "font", ["color"]);
		setIfExists(style, copied, "alignment");
		setIfExists(style, copied, "protection");
		if (style.border) {
			setIfExists(style, copied, "border");
			setIfExists(style.border, copied.border, "top", ["color"]);
			setIfExists(style.border, copied.border, "left", ["color"]);
			setIfExists(style.border, copied.border, "bottom", ["color"]);
			setIfExists(style.border, copied.border, "right", ["color"]);
			setIfExists(style.border, copied.border, "diagonal", ["color"]);
		}
		if (style.fill) {
			setIfExists(style, copied, "fill", [
				"fgColor",
				"bgColor",
				"center"
			]);
			if (style.fill.stops) copied.fill.stops = style.fill.stops.map((s) => oneDepthCopy(s, ["color"]));
		}
		return copied;
	};
	exports.copyStyle = copyStyle;
}));
//#endregion
//#region node_modules/exceljs/lib/doc/worksheet.js
var require_worksheet = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var _ = require_under_dash();
	var colCache = require_col_cache();
	var Range = require_range();
	var Row = require_row();
	var Column = require_column();
	var Enums = require_enums();
	var Image = require_image();
	var Table = require_table();
	var DataValidations = require_data_validations();
	var Encryptor = require_encryptor();
	var { copyStyle } = require_copy_style();
	var Worksheet = class {
		constructor(options) {
			options = options || {};
			this._workbook = options.workbook;
			this.id = options.id;
			this.orderNo = options.orderNo;
			this.name = options.name;
			this.state = options.state || "visible";
			this._rows = [];
			this._columns = null;
			this._keys = {};
			this._merges = {};
			this.rowBreaks = [];
			this.properties = Object.assign({}, {
				defaultRowHeight: 15,
				dyDescent: 55,
				outlineLevelCol: 0,
				outlineLevelRow: 0
			}, options.properties);
			this.pageSetup = Object.assign({}, {
				margins: {
					left: .7,
					right: .7,
					top: .75,
					bottom: .75,
					header: .3,
					footer: .3
				},
				orientation: "portrait",
				horizontalDpi: 4294967295,
				verticalDpi: 4294967295,
				fitToPage: !!(options.pageSetup && (options.pageSetup.fitToWidth || options.pageSetup.fitToHeight) && !options.pageSetup.scale),
				pageOrder: "downThenOver",
				blackAndWhite: false,
				draft: false,
				cellComments: "None",
				errors: "displayed",
				scale: 100,
				fitToWidth: 1,
				fitToHeight: 1,
				paperSize: void 0,
				showRowColHeaders: false,
				showGridLines: false,
				firstPageNumber: void 0,
				horizontalCentered: false,
				verticalCentered: false,
				rowBreaks: null,
				colBreaks: null
			}, options.pageSetup);
			this.headerFooter = Object.assign({}, {
				differentFirst: false,
				differentOddEven: false,
				oddHeader: null,
				oddFooter: null,
				evenHeader: null,
				evenFooter: null,
				firstHeader: null,
				firstFooter: null
			}, options.headerFooter);
			this.dataValidations = new DataValidations();
			this.views = options.views || [];
			this.autoFilter = options.autoFilter || null;
			this._media = [];
			this.sheetProtection = null;
			this.tables = {};
			this.conditionalFormattings = [];
		}
		get name() {
			return this._name;
		}
		set name(name) {
			if (name === void 0) name = `sheet${this.id}`;
			if (this._name === name) return;
			if (typeof name !== "string") throw new Error("The name has to be a string.");
			if (name === "") throw new Error("The name can't be empty.");
			if (name === "History") throw new Error("The name \"History\" is protected. Please use a different name.");
			if (/[*?:/\\[\]]/.test(name)) throw new Error(`Worksheet name ${name} cannot include any of the following characters: * ? : \\ / [ ]`);
			if (/(^')|('$)/.test(name)) throw new Error(`The first or last character of worksheet name cannot be a single quotation mark: ${name}`);
			if (name && name.length > 31) {
				console.warn(`Worksheet name ${name} exceeds 31 chars. This will be truncated`);
				name = name.substring(0, 31);
			}
			if (this._workbook._worksheets.find((ws) => ws && ws.name.toLowerCase() === name.toLowerCase())) throw new Error(`Worksheet name already exists: ${name}`);
			this._name = name;
		}
		get workbook() {
			return this._workbook;
		}
		destroy() {
			this._workbook.removeWorksheetEx(this);
		}
		get dimensions() {
			const dimensions = new Range();
			this._rows.forEach((row) => {
				if (row) {
					const rowDims = row.dimensions;
					if (rowDims) dimensions.expand(row.number, rowDims.min, row.number, rowDims.max);
				}
			});
			return dimensions;
		}
		get columns() {
			return this._columns;
		}
		set columns(value) {
			this._headerRowCount = value.reduce((pv, cv) => {
				const headerCount = cv.header && 1 || cv.headers && cv.headers.length || 0;
				return Math.max(pv, headerCount);
			}, 0);
			let count = 1;
			const columns = this._columns = [];
			value.forEach((defn) => {
				const column = new Column(this, count++, false);
				columns.push(column);
				column.defn = defn;
			});
		}
		getColumnKey(key) {
			return this._keys[key];
		}
		setColumnKey(key, value) {
			this._keys[key] = value;
		}
		deleteColumnKey(key) {
			delete this._keys[key];
		}
		eachColumnKey(f) {
			_.each(this._keys, f);
		}
		getColumn(c) {
			if (typeof c === "string") {
				const col = this._keys[c];
				if (col) return col;
				c = colCache.l2n(c);
			}
			if (!this._columns) this._columns = [];
			if (c > this._columns.length) {
				let n = this._columns.length + 1;
				while (n <= c) this._columns.push(new Column(this, n++));
			}
			return this._columns[c - 1];
		}
		spliceColumns(start, count, ...inserts) {
			const nRows = this._rows.length;
			if (inserts.length > 0) for (let i = 0; i < nRows; i++) {
				const rowArguments = [start, count];
				inserts.forEach((insert) => {
					rowArguments.push(insert[i] || null);
				});
				const row = this.getRow(i + 1);
				row.splice.apply(row, rowArguments);
			}
			else this._rows.forEach((r) => {
				if (r) r.splice(start, count);
			});
			const nExpand = inserts.length - count;
			const nKeep = start + count;
			const nEnd = this._columns.length;
			if (nExpand < 0) for (let i = start + inserts.length; i <= nEnd; i++) this.getColumn(i).defn = this.getColumn(i - nExpand).defn;
			else if (nExpand > 0) for (let i = nEnd; i >= nKeep; i--) this.getColumn(i + nExpand).defn = this.getColumn(i).defn;
			for (let i = start; i < start + inserts.length; i++) this.getColumn(i).defn = null;
			this.workbook.definedNames.spliceColumns(this.name, start, count, inserts.length);
		}
		get lastColumn() {
			return this.getColumn(this.columnCount);
		}
		get columnCount() {
			let maxCount = 0;
			this.eachRow((row) => {
				maxCount = Math.max(maxCount, row.cellCount);
			});
			return maxCount;
		}
		get actualColumnCount() {
			const counts = [];
			let count = 0;
			this.eachRow((row) => {
				row.eachCell(({ col }) => {
					if (!counts[col]) {
						counts[col] = true;
						count++;
					}
				});
			});
			return count;
		}
		_commitRow() {}
		get _lastRowNumber() {
			const rows = this._rows;
			let n = rows.length;
			while (n > 0 && rows[n - 1] === void 0) n--;
			return n;
		}
		get _nextRow() {
			return this._lastRowNumber + 1;
		}
		get lastRow() {
			if (this._rows.length) return this._rows[this._rows.length - 1];
		}
		findRow(r) {
			return this._rows[r - 1];
		}
		findRows(start, length) {
			return this._rows.slice(start - 1, start - 1 + length);
		}
		get rowCount() {
			return this._lastRowNumber;
		}
		get actualRowCount() {
			let count = 0;
			this.eachRow(() => {
				count++;
			});
			return count;
		}
		getRow(r) {
			let row = this._rows[r - 1];
			if (!row) row = this._rows[r - 1] = new Row(this, r);
			return row;
		}
		getRows(start, length) {
			if (length < 1) return void 0;
			const rows = [];
			for (let i = start; i < start + length; i++) rows.push(this.getRow(i));
			return rows;
		}
		addRow(value, style = "n") {
			const rowNo = this._nextRow;
			const row = this.getRow(rowNo);
			row.values = value;
			this._setStyleOption(rowNo, style[0] === "i" ? style : "n");
			return row;
		}
		addRows(value, style = "n") {
			const rows = [];
			value.forEach((row) => {
				rows.push(this.addRow(row, style));
			});
			return rows;
		}
		insertRow(pos, value, style = "n") {
			this.spliceRows(pos, 0, value);
			this._setStyleOption(pos, style);
			return this.getRow(pos);
		}
		insertRows(pos, values, style = "n") {
			this.spliceRows(pos, 0, ...values);
			if (style !== "n") {
				for (let i = 0; i < values.length; i++) if (style[0] === "o" && this.findRow(values.length + pos + i) !== void 0) this._copyStyle(values.length + pos + i, pos + i, style[1] === "+");
				else if (style[0] === "i" && this.findRow(pos - 1) !== void 0) this._copyStyle(pos - 1, pos + i, style[1] === "+");
			}
			return this.getRows(pos, values.length);
		}
		_setStyleOption(pos, style = "n") {
			if (style[0] === "o" && this.findRow(pos + 1) !== void 0) this._copyStyle(pos + 1, pos, style[1] === "+");
			else if (style[0] === "i" && this.findRow(pos - 1) !== void 0) this._copyStyle(pos - 1, pos, style[1] === "+");
		}
		_copyStyle(src, dest, styleEmpty = false) {
			const rSrc = this.getRow(src);
			const rDst = this.getRow(dest);
			rDst.style = copyStyle(rSrc.style);
			rSrc.eachCell({ includeEmpty: styleEmpty }, (cell, colNumber) => {
				rDst.getCell(colNumber).style = copyStyle(cell.style);
			});
			rDst.height = rSrc.height;
		}
		duplicateRow(rowNum, count, insert = false) {
			const rSrc = this._rows[rowNum - 1];
			const inserts = new Array(count).fill(rSrc.values);
			this.spliceRows(rowNum + 1, insert ? 0 : count, ...inserts);
			for (let i = 0; i < count; i++) {
				const rDst = this._rows[rowNum + i];
				rDst.style = rSrc.style;
				rDst.height = rSrc.height;
				rSrc.eachCell({ includeEmpty: true }, (cell, colNumber) => {
					rDst.getCell(colNumber).style = cell.style;
				});
			}
		}
		spliceRows(start, count, ...inserts) {
			const nKeep = start + count;
			const nInserts = inserts.length;
			const nExpand = nInserts - count;
			const nEnd = this._rows.length;
			let i;
			let rSrc;
			if (nExpand < 0) {
				if (start === nEnd) this._rows[nEnd - 1] = void 0;
				for (i = nKeep; i <= nEnd; i++) {
					rSrc = this._rows[i - 1];
					if (rSrc) {
						const rDst = this.getRow(i + nExpand);
						rDst.values = rSrc.values;
						rDst.style = rSrc.style;
						rDst.height = rSrc.height;
						rSrc.eachCell({ includeEmpty: true }, (cell, colNumber) => {
							rDst.getCell(colNumber).style = cell.style;
						});
						this._rows[i - 1] = void 0;
					} else this._rows[i + nExpand - 1] = void 0;
				}
			} else if (nExpand > 0) for (i = nEnd; i >= nKeep; i--) {
				rSrc = this._rows[i - 1];
				if (rSrc) {
					const rDst = this.getRow(i + nExpand);
					rDst.values = rSrc.values;
					rDst.style = rSrc.style;
					rDst.height = rSrc.height;
					rSrc.eachCell({ includeEmpty: true }, (cell, colNumber) => {
						rDst.getCell(colNumber).style = cell.style;
						if (cell._value.constructor.name === "MergeValue") {
							const cellToBeMerged = this.getRow(cell._row._number + nInserts).getCell(colNumber);
							const prevMaster = cell._value._master;
							const newMaster = this.getRow(prevMaster._row._number + nInserts).getCell(prevMaster._column._number);
							cellToBeMerged.merge(newMaster);
						}
					});
				} else this._rows[i + nExpand - 1] = void 0;
			}
			for (i = 0; i < nInserts; i++) {
				const rDst = this.getRow(start + i);
				rDst.style = {};
				rDst.values = inserts[i];
			}
			this.workbook.definedNames.spliceRows(this.name, start, count, nInserts);
		}
		eachRow(options, iteratee) {
			if (!iteratee) {
				iteratee = options;
				options = void 0;
			}
			if (options && options.includeEmpty) {
				const n = this._rows.length;
				for (let i = 1; i <= n; i++) iteratee(this.getRow(i), i);
			} else this._rows.forEach((row) => {
				if (row && row.hasValues) iteratee(row, row.number);
			});
		}
		getSheetValues() {
			const rows = [];
			this._rows.forEach((row) => {
				if (row) rows[row.number] = row.values;
			});
			return rows;
		}
		findCell(r, c) {
			const address = colCache.getAddress(r, c);
			const row = this._rows[address.row - 1];
			return row ? row.findCell(address.col) : void 0;
		}
		getCell(r, c) {
			const address = colCache.getAddress(r, c);
			return this.getRow(address.row).getCellEx(address);
		}
		mergeCells(...cells) {
			const dimensions = new Range(cells);
			this._mergeCellsInternal(dimensions);
		}
		mergeCellsWithoutStyle(...cells) {
			const dimensions = new Range(cells);
			this._mergeCellsInternal(dimensions, true);
		}
		_mergeCellsInternal(dimensions, ignoreStyle) {
			_.each(this._merges, (merge) => {
				if (merge.intersects(dimensions)) throw new Error("Cannot merge already merged cells");
			});
			const master = this.getCell(dimensions.top, dimensions.left);
			for (let i = dimensions.top; i <= dimensions.bottom; i++) for (let j = dimensions.left; j <= dimensions.right; j++) if (i > dimensions.top || j > dimensions.left) this.getCell(i, j).merge(master, ignoreStyle);
			this._merges[master.address] = dimensions;
		}
		_unMergeMaster(master) {
			const merge = this._merges[master.address];
			if (merge) {
				for (let i = merge.top; i <= merge.bottom; i++) for (let j = merge.left; j <= merge.right; j++) this.getCell(i, j).unmerge();
				delete this._merges[master.address];
			}
		}
		get hasMerges() {
			return _.some(this._merges, Boolean);
		}
		unMergeCells(...cells) {
			const dimensions = new Range(cells);
			for (let i = dimensions.top; i <= dimensions.bottom; i++) for (let j = dimensions.left; j <= dimensions.right; j++) {
				const cell = this.findCell(i, j);
				if (cell) {
					if (cell.type === Enums.ValueType.Merge) this._unMergeMaster(cell.master);
					else if (this._merges[cell.address]) this._unMergeMaster(cell);
				}
			}
		}
		fillFormula(range, formula, results, shareType = "shared") {
			const { top, left, bottom, right } = colCache.decode(range);
			const width = right - left + 1;
			const masterAddress = colCache.encodeAddress(top, left);
			const isShared = shareType === "shared";
			let getResult;
			if (typeof results === "function") getResult = results;
			else if (Array.isArray(results)) {
				if (Array.isArray(results[0])) getResult = (row, col) => results[row - top][col - left];
				else getResult = (row, col) => results[(row - top) * width + (col - left)];
			} else getResult = () => void 0;
			let first = true;
			for (let r = top; r <= bottom; r++) for (let c = left; c <= right; c++) if (first) {
				this.getCell(r, c).value = {
					shareType,
					formula,
					ref: range,
					result: getResult(r, c)
				};
				first = false;
			} else this.getCell(r, c).value = isShared ? {
				sharedFormula: masterAddress,
				result: getResult(r, c)
			} : getResult(r, c);
		}
		addImage(imageId, range) {
			const model = {
				type: "image",
				imageId,
				range
			};
			this._media.push(new Image(this, model));
		}
		getImages() {
			return this._media.filter((m) => m.type === "image");
		}
		addBackgroundImage(imageId) {
			const model = {
				type: "background",
				imageId
			};
			this._media.push(new Image(this, model));
		}
		getBackgroundImageId() {
			const image = this._media.find((m) => m.type === "background");
			return image && image.imageId;
		}
		protect(password, options) {
			return new Promise((resolve) => {
				this.sheetProtection = { sheet: true };
				if (options && "spinCount" in options) options.spinCount = Number.isFinite(options.spinCount) ? Math.round(Math.max(0, options.spinCount)) : 1e5;
				if (password) {
					this.sheetProtection.algorithmName = "SHA-512";
					this.sheetProtection.saltValue = Encryptor.randomBytes(16).toString("base64");
					this.sheetProtection.spinCount = options && "spinCount" in options ? options.spinCount : 1e5;
					this.sheetProtection.hashValue = Encryptor.convertPasswordToHash(password, "SHA512", this.sheetProtection.saltValue, this.sheetProtection.spinCount);
				}
				if (options) {
					this.sheetProtection = Object.assign(this.sheetProtection, options);
					if (!password && "spinCount" in options) delete this.sheetProtection.spinCount;
				}
				resolve();
			});
		}
		unprotect() {
			this.sheetProtection = null;
		}
		addTable(model) {
			const table = new Table(this, model);
			this.tables[model.name] = table;
			return table;
		}
		getTable(name) {
			return this.tables[name];
		}
		removeTable(name) {
			delete this.tables[name];
		}
		getTables() {
			return Object.values(this.tables);
		}
		addConditionalFormatting(cf) {
			this.conditionalFormattings.push(cf);
		}
		removeConditionalFormatting(filter) {
			if (typeof filter === "number") this.conditionalFormattings.splice(filter, 1);
			else if (filter instanceof Function) this.conditionalFormattings = this.conditionalFormattings.filter(filter);
			else this.conditionalFormattings = [];
		}
		get tabColor() {
			console.trace("worksheet.tabColor property is now deprecated. Please use worksheet.properties.tabColor");
			return this.properties.tabColor;
		}
		set tabColor(value) {
			console.trace("worksheet.tabColor property is now deprecated. Please use worksheet.properties.tabColor");
			this.properties.tabColor = value;
		}
		get model() {
			const model = {
				id: this.id,
				name: this.name,
				dataValidations: this.dataValidations.model,
				properties: this.properties,
				state: this.state,
				pageSetup: this.pageSetup,
				headerFooter: this.headerFooter,
				rowBreaks: this.rowBreaks,
				views: this.views,
				autoFilter: this.autoFilter,
				media: this._media.map((medium) => medium.model),
				sheetProtection: this.sheetProtection,
				tables: Object.values(this.tables).map((table) => table.model),
				conditionalFormattings: this.conditionalFormattings
			};
			model.cols = Column.toModel(this.columns);
			const rows = model.rows = [];
			const dimensions = model.dimensions = new Range();
			this._rows.forEach((row) => {
				const rowModel = row && row.model;
				if (rowModel) {
					dimensions.expand(rowModel.number, rowModel.min, rowModel.number, rowModel.max);
					rows.push(rowModel);
				}
			});
			model.merges = [];
			_.each(this._merges, (merge) => {
				model.merges.push(merge.range);
			});
			return model;
		}
		_parseRows(model) {
			this._rows = [];
			model.rows.forEach((rowModel) => {
				const row = new Row(this, rowModel.number);
				this._rows[row.number - 1] = row;
				row.model = rowModel;
			});
		}
		_parseMergeCells(model) {
			_.each(model.mergeCells, (merge) => {
				this.mergeCellsWithoutStyle(merge);
			});
		}
		set model(value) {
			this.name = value.name;
			this._columns = Column.fromModel(this, value.cols);
			this._parseRows(value);
			this._parseMergeCells(value);
			this.dataValidations = new DataValidations(value.dataValidations);
			this.properties = value.properties;
			this.pageSetup = value.pageSetup;
			this.headerFooter = value.headerFooter;
			this.views = value.views;
			this.autoFilter = value.autoFilter;
			this._media = value.media.map((medium) => new Image(this, medium));
			this.sheetProtection = value.sheetProtection;
			this.tables = value.tables.reduce((tables, table) => {
				const t = new Table();
				t.model = table;
				tables[table.name] = t;
				return tables;
			}, {});
			this.conditionalFormattings = value.conditionalFormattings;
		}
	};
	module.exports = Worksheet;
}));
//#endregion
//#region node_modules/exceljs/lib/utils/cell-matrix.js
var require_cell_matrix = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var _ = require_under_dash();
	var colCache = require_col_cache();
	var CellMatrix = class {
		constructor(template) {
			this.template = template;
			this.sheets = {};
		}
		addCell(addressStr) {
			this.addCellEx(colCache.decodeEx(addressStr));
		}
		getCell(addressStr) {
			return this.findCellEx(colCache.decodeEx(addressStr), true);
		}
		findCell(addressStr) {
			return this.findCellEx(colCache.decodeEx(addressStr), false);
		}
		findCellAt(sheetName, rowNumber, colNumber) {
			const sheet = this.sheets[sheetName];
			const row = sheet && sheet[rowNumber];
			return row && row[colNumber];
		}
		addCellEx(address) {
			if (address.top) for (let row = address.top; row <= address.bottom; row++) for (let col = address.left; col <= address.right; col++) this.getCellAt(address.sheetName, row, col);
			else this.findCellEx(address, true);
		}
		getCellEx(address) {
			return this.findCellEx(address, true);
		}
		findCellEx(address, create) {
			const sheet = this.findSheet(address, create);
			const row = this.findSheetRow(sheet, address, create);
			return this.findRowCell(row, address, create);
		}
		getCellAt(sheetName, rowNumber, colNumber) {
			const sheet = this.sheets[sheetName] || (this.sheets[sheetName] = []);
			const row = sheet[rowNumber] || (sheet[rowNumber] = []);
			return row[colNumber] || (row[colNumber] = {
				sheetName,
				address: colCache.n2l(colNumber) + rowNumber,
				row: rowNumber,
				col: colNumber
			});
		}
		removeCellEx(address) {
			const sheet = this.findSheet(address);
			if (!sheet) return;
			const row = this.findSheetRow(sheet, address);
			if (!row) return;
			delete row[address.col];
		}
		forEachInSheet(sheetName, callback) {
			const sheet = this.sheets[sheetName];
			if (sheet) sheet.forEach((row, rowNumber) => {
				if (row) row.forEach((cell, colNumber) => {
					if (cell) callback(cell, rowNumber, colNumber);
				});
			});
		}
		forEach(callback) {
			_.each(this.sheets, (sheet, sheetName) => {
				this.forEachInSheet(sheetName, callback);
			});
		}
		map(callback) {
			const results = [];
			this.forEach((cell) => {
				results.push(callback(cell));
			});
			return results;
		}
		findSheet(address, create) {
			const name = address.sheetName;
			if (this.sheets[name]) return this.sheets[name];
			if (create) return this.sheets[name] = [];
		}
		findSheetRow(sheet, address, create) {
			const { row } = address;
			if (sheet && sheet[row]) return sheet[row];
			if (create) return sheet[row] = [];
		}
		findRowCell(row, address, create) {
			const { col } = address;
			if (row && row[col]) return row[col];
			if (create) return row[col] = this.template ? Object.assign(address, JSON.parse(JSON.stringify(this.template))) : address;
		}
		spliceRows(sheetName, start, numDelete, numInsert) {
			const sheet = this.sheets[sheetName];
			if (sheet) {
				const inserts = [];
				for (let i = 0; i < numInsert; i++) inserts.push([]);
				sheet.splice(start, numDelete, ...inserts);
			}
		}
		spliceColumns(sheetName, start, numDelete, numInsert) {
			const sheet = this.sheets[sheetName];
			if (sheet) {
				const inserts = [];
				for (let i = 0; i < numInsert; i++) inserts.push(null);
				_.each(sheet, (row) => {
					row.splice(start, numDelete, ...inserts);
				});
			}
		}
	};
	module.exports = CellMatrix;
}));
//#endregion
//#region node_modules/exceljs/lib/doc/defined-names.js
var require_defined_names = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var _ = require_under_dash();
	var colCache = require_col_cache();
	var CellMatrix = require_cell_matrix();
	var Range = require_range();
	var rangeRegexp = /[$](\w+)[$](\d+)(:[$](\w+)[$](\d+))?/;
	var DefinedNames = class {
		constructor() {
			this.matrixMap = {};
		}
		getMatrix(name) {
			return this.matrixMap[name] || (this.matrixMap[name] = new CellMatrix());
		}
		add(locStr, name) {
			const location = colCache.decodeEx(locStr);
			this.addEx(location, name);
		}
		addEx(location, name) {
			const matrix = this.getMatrix(name);
			if (location.top) for (let col = location.left; col <= location.right; col++) for (let row = location.top; row <= location.bottom; row++) {
				const address = {
					sheetName: location.sheetName,
					address: colCache.n2l(col) + row,
					row,
					col
				};
				matrix.addCellEx(address);
			}
			else matrix.addCellEx(location);
		}
		remove(locStr, name) {
			const location = colCache.decodeEx(locStr);
			this.removeEx(location, name);
		}
		removeEx(location, name) {
			this.getMatrix(name).removeCellEx(location);
		}
		removeAllNames(location) {
			_.each(this.matrixMap, (matrix) => {
				matrix.removeCellEx(location);
			});
		}
		forEach(callback) {
			_.each(this.matrixMap, (matrix, name) => {
				matrix.forEach((cell) => {
					callback(name, cell);
				});
			});
		}
		getNames(addressStr) {
			return this.getNamesEx(colCache.decodeEx(addressStr));
		}
		getNamesEx(address) {
			return _.map(this.matrixMap, (matrix, name) => matrix.findCellEx(address) && name).filter(Boolean);
		}
		_explore(matrix, cell) {
			cell.mark = false;
			const { sheetName } = cell;
			const range = new Range(cell.row, cell.col, cell.row, cell.col, sheetName);
			let x;
			let y;
			function vGrow(yy, edge) {
				const c = matrix.findCellAt(sheetName, yy, cell.col);
				if (!c || !c.mark) return false;
				range[edge] = yy;
				c.mark = false;
				return true;
			}
			for (y = cell.row - 1; vGrow(y, "top"); y--);
			for (y = cell.row + 1; vGrow(y, "bottom"); y++);
			function hGrow(xx, edge) {
				const cells = [];
				for (y = range.top; y <= range.bottom; y++) {
					const c = matrix.findCellAt(sheetName, y, xx);
					if (c && c.mark) cells.push(c);
					else return false;
				}
				range[edge] = xx;
				for (let i = 0; i < cells.length; i++) cells[i].mark = false;
				return true;
			}
			for (x = cell.col - 1; hGrow(x, "left"); x--);
			for (x = cell.col + 1; hGrow(x, "right"); x++);
			return range;
		}
		getRanges(name, matrix) {
			matrix = matrix || this.matrixMap[name];
			if (!matrix) return {
				name,
				ranges: []
			};
			matrix.forEach((cell) => {
				cell.mark = true;
			});
			return {
				name,
				ranges: matrix.map((cell) => cell.mark && this._explore(matrix, cell)).filter(Boolean).map((range) => range.$shortRange)
			};
		}
		normaliseMatrix(matrix, sheetName) {
			matrix.forEachInSheet(sheetName, (cell, row, col) => {
				if (cell) {
					if (cell.row !== row || cell.col !== col) {
						cell.row = row;
						cell.col = col;
						cell.address = colCache.n2l(col) + row;
					}
				}
			});
		}
		spliceRows(sheetName, start, numDelete, numInsert) {
			_.each(this.matrixMap, (matrix) => {
				matrix.spliceRows(sheetName, start, numDelete, numInsert);
				this.normaliseMatrix(matrix, sheetName);
			});
		}
		spliceColumns(sheetName, start, numDelete, numInsert) {
			_.each(this.matrixMap, (matrix) => {
				matrix.spliceColumns(sheetName, start, numDelete, numInsert);
				this.normaliseMatrix(matrix, sheetName);
			});
		}
		get model() {
			return _.map(this.matrixMap, (matrix, name) => this.getRanges(name, matrix)).filter((definedName) => definedName.ranges.length);
		}
		set model(value) {
			const matrixMap = this.matrixMap = {};
			value.forEach((definedName) => {
				const matrix = matrixMap[definedName.name] = new CellMatrix();
				definedName.ranges.forEach((rangeStr) => {
					if (rangeRegexp.test(rangeStr.split("!").pop() || "")) matrix.addCell(rangeStr);
				});
			});
		}
	};
	module.exports = DefinedNames;
}));
//#endregion
//#region node_modules/jszip/node_modules/readable-stream/lib/internal/streams/stream.js
var require_stream$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = __require("stream");
}));
//#endregion
//#region node_modules/jszip/node_modules/safe-buffer/index.js
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
//#region node_modules/jszip/node_modules/readable-stream/lib/internal/streams/BufferList.js
var require_BufferList$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
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
//#region node_modules/jszip/node_modules/readable-stream/lib/internal/streams/destroy.js
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
//#region node_modules/jszip/node_modules/readable-stream/lib/_stream_writable.js
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
	var util = Object.create(require_util());
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
//#region node_modules/jszip/node_modules/readable-stream/lib/_stream_duplex.js
var require__stream_duplex$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var pna = require_process_nextick_args();
	var objectKeys = Object.keys || function(obj) {
		var keys = [];
		for (var key in obj) keys.push(key);
		return keys;
	};
	module.exports = Duplex;
	var util = Object.create(require_util());
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
//#region node_modules/jszip/node_modules/readable-stream/lib/_stream_readable.js
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
	var util = Object.create(require_util());
	util.inherits = require_inherits();
	var debugUtil$1 = __require("util");
	var debug = void 0;
	if (debugUtil$1 && debugUtil$1.debuglog) debug = debugUtil$1.debuglog("stream");
	else debug = function() {};
	var BufferList = require_BufferList$1();
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
//#region node_modules/jszip/node_modules/readable-stream/lib/_stream_transform.js
var require__stream_transform$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = Transform;
	var Duplex = require__stream_duplex$1();
	var util = Object.create(require_util());
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
//#region node_modules/jszip/node_modules/readable-stream/lib/_stream_passthrough.js
var require__stream_passthrough$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = PassThrough;
	var Transform = require__stream_transform$1();
	var util = Object.create(require_util());
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
//#region node_modules/jszip/node_modules/readable-stream/readable.js
var require_readable$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Stream$11 = __require("stream");
	if (process.env.READABLE_STREAM === "disable" && Stream$11) {
		module.exports = Stream$11;
		exports = module.exports = Stream$11.Readable;
		exports.Readable = Stream$11.Readable;
		exports.Writable = Stream$11.Writable;
		exports.Duplex = Stream$11.Duplex;
		exports.Transform = Stream$11.Transform;
		exports.PassThrough = Stream$11.PassThrough;
		exports.Stream = Stream$11;
	} else {
		exports = module.exports = require__stream_readable$1();
		exports.Stream = Stream$11 || exports;
		exports.Readable = exports;
		exports.Writable = require__stream_writable$1();
		exports.Duplex = require__stream_duplex$1();
		exports.Transform = require__stream_transform$1();
		exports.PassThrough = require__stream_passthrough$1();
	}
}));
//#endregion
//#region node_modules/jszip/lib/support.js
var require_support = /* @__PURE__ */ __commonJSMin(((exports) => {
	exports.base64 = true;
	exports.array = true;
	exports.string = true;
	exports.arraybuffer = typeof ArrayBuffer !== "undefined" && typeof Uint8Array !== "undefined";
	exports.nodebuffer = typeof Buffer !== "undefined";
	exports.uint8array = typeof Uint8Array !== "undefined";
	if (typeof ArrayBuffer === "undefined") exports.blob = false;
	else {
		var buffer = /* @__PURE__ */ new ArrayBuffer(0);
		try {
			exports.blob = new Blob([buffer], { type: "application/zip" }).size === 0;
		} catch (e) {
			try {
				var builder = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
				builder.append(buffer);
				exports.blob = builder.getBlob("application/zip").size === 0;
			} catch (e) {
				exports.blob = false;
			}
		}
	}
	try {
		exports.nodestream = !!require_readable$1().Readable;
	} catch (e) {
		exports.nodestream = false;
	}
}));
//#endregion
//#region node_modules/jszip/lib/base64.js
var require_base64 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var utils = require_utils$1();
	var support = require_support();
	var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	exports.encode = function(input) {
		var output = [];
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		var i = 0, len = input.length, remainingBytes = len;
		var isArray = utils.getTypeOf(input) !== "string";
		while (i < input.length) {
			remainingBytes = len - i;
			if (!isArray) {
				chr1 = input.charCodeAt(i++);
				chr2 = i < len ? input.charCodeAt(i++) : 0;
				chr3 = i < len ? input.charCodeAt(i++) : 0;
			} else {
				chr1 = input[i++];
				chr2 = i < len ? input[i++] : 0;
				chr3 = i < len ? input[i++] : 0;
			}
			enc1 = chr1 >> 2;
			enc2 = (chr1 & 3) << 4 | chr2 >> 4;
			enc3 = remainingBytes > 1 ? (chr2 & 15) << 2 | chr3 >> 6 : 64;
			enc4 = remainingBytes > 2 ? chr3 & 63 : 64;
			output.push(_keyStr.charAt(enc1) + _keyStr.charAt(enc2) + _keyStr.charAt(enc3) + _keyStr.charAt(enc4));
		}
		return output.join("");
	};
	exports.decode = function(input) {
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0, resultIndex = 0;
		var dataUrlPrefix = "data:";
		if (input.substr(0, dataUrlPrefix.length) === dataUrlPrefix) throw new Error("Invalid base64 input, it looks like a data url.");
		input = input.replace(/[^A-Za-z0-9+/=]/g, "");
		var totalLength = input.length * 3 / 4;
		if (input.charAt(input.length - 1) === _keyStr.charAt(64)) totalLength--;
		if (input.charAt(input.length - 2) === _keyStr.charAt(64)) totalLength--;
		if (totalLength % 1 !== 0) throw new Error("Invalid base64 input, bad content length.");
		var output;
		if (support.uint8array) output = new Uint8Array(totalLength | 0);
		else output = new Array(totalLength | 0);
		while (i < input.length) {
			enc1 = _keyStr.indexOf(input.charAt(i++));
			enc2 = _keyStr.indexOf(input.charAt(i++));
			enc3 = _keyStr.indexOf(input.charAt(i++));
			enc4 = _keyStr.indexOf(input.charAt(i++));
			chr1 = enc1 << 2 | enc2 >> 4;
			chr2 = (enc2 & 15) << 4 | enc3 >> 2;
			chr3 = (enc3 & 3) << 6 | enc4;
			output[resultIndex++] = chr1;
			if (enc3 !== 64) output[resultIndex++] = chr2;
			if (enc4 !== 64) output[resultIndex++] = chr3;
		}
		return output;
	};
}));
//#endregion
//#region node_modules/jszip/lib/nodejsUtils.js
var require_nodejsUtils = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = {
		/**
		* True if this is running in Nodejs, will be undefined in a browser.
		* In a browser, browserify won't include this file and the whole module
		* will be resolved an empty object.
		*/
		isNode: typeof Buffer !== "undefined",
		/**
		* Create a new nodejs Buffer from an existing content.
		* @param {Object} data the data to pass to the constructor.
		* @param {String} encoding the encoding to use.
		* @return {Buffer} a new Buffer.
		*/
		newBufferFrom: function(data, encoding) {
			if (Buffer.from && Buffer.from !== Uint8Array.from) return Buffer.from(data, encoding);
			else {
				if (typeof data === "number") throw new Error("The \"data\" argument must not be a number");
				return new Buffer(data, encoding);
			}
		},
		/**
		* Create a new nodejs Buffer with the specified size.
		* @param {Integer} size the size of the buffer.
		* @return {Buffer} a new Buffer.
		*/
		allocBuffer: function(size) {
			if (Buffer.alloc) return Buffer.alloc(size);
			else {
				var buf = new Buffer(size);
				buf.fill(0);
				return buf;
			}
		},
		/**
		* Find out if an object is a Buffer.
		* @param {Object} b the object to test.
		* @return {Boolean} true if the object is a Buffer, false otherwise.
		*/
		isBuffer: function(b) {
			return Buffer.isBuffer(b);
		},
		isStream: function(obj) {
			return obj && typeof obj.on === "function" && typeof obj.pause === "function" && typeof obj.resume === "function";
		}
	};
}));
//#endregion
//#region node_modules/immediate/lib/index.js
var require_lib$2 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Mutation = global.MutationObserver || global.WebKitMutationObserver;
	var scheduleDrain;
	if (process.browser) {
		if (Mutation) {
			var called = 0;
			var observer = new Mutation(nextTick);
			var element = global.document.createTextNode("");
			observer.observe(element, { characterData: true });
			scheduleDrain = function() {
				element.data = called = ++called % 2;
			};
		} else if (!global.setImmediate && typeof global.MessageChannel !== "undefined") {
			var channel = new global.MessageChannel();
			channel.port1.onmessage = nextTick;
			scheduleDrain = function() {
				channel.port2.postMessage(0);
			};
		} else if ("document" in global && "onreadystatechange" in global.document.createElement("script")) scheduleDrain = function() {
			var scriptEl = global.document.createElement("script");
			scriptEl.onreadystatechange = function() {
				nextTick();
				scriptEl.onreadystatechange = null;
				scriptEl.parentNode.removeChild(scriptEl);
				scriptEl = null;
			};
			global.document.documentElement.appendChild(scriptEl);
		};
		else scheduleDrain = function() {
			setTimeout(nextTick, 0);
		};
	} else scheduleDrain = function() {
		process.nextTick(nextTick);
	};
	var draining;
	var queue = [];
	function nextTick() {
		draining = true;
		var i, oldQueue;
		var len = queue.length;
		while (len) {
			oldQueue = queue;
			queue = [];
			i = -1;
			while (++i < len) oldQueue[i]();
			len = queue.length;
		}
		draining = false;
	}
	module.exports = immediate;
	function immediate(task) {
		if (queue.push(task) === 1 && !draining) scheduleDrain();
	}
}));
//#endregion
//#region node_modules/lie/lib/index.js
var require_lib$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var immediate = require_lib$2();
	/* istanbul ignore next */
	function INTERNAL() {}
	var handlers = {};
	var REJECTED = ["REJECTED"];
	var FULFILLED = ["FULFILLED"];
	var PENDING = ["PENDING"];
	/* istanbul ignore else */
	if (!process.browser) var UNHANDLED = ["UNHANDLED"];
	module.exports = Promise;
	function Promise(resolver) {
		if (typeof resolver !== "function") throw new TypeError("resolver must be a function");
		this.state = PENDING;
		this.queue = [];
		this.outcome = void 0;
		/* istanbul ignore else */
		if (!process.browser) this.handled = UNHANDLED;
		if (resolver !== INTERNAL) safelyResolveThenable(this, resolver);
	}
	Promise.prototype.finally = function(callback) {
		if (typeof callback !== "function") return this;
		var p = this.constructor;
		return this.then(resolve, reject);
		function resolve(value) {
			function yes() {
				return value;
			}
			return p.resolve(callback()).then(yes);
		}
		function reject(reason) {
			function no() {
				throw reason;
			}
			return p.resolve(callback()).then(no);
		}
	};
	Promise.prototype.catch = function(onRejected) {
		return this.then(null, onRejected);
	};
	Promise.prototype.then = function(onFulfilled, onRejected) {
		if (typeof onFulfilled !== "function" && this.state === FULFILLED || typeof onRejected !== "function" && this.state === REJECTED) return this;
		var promise = new this.constructor(INTERNAL);
		/* istanbul ignore else */
		if (!process.browser) {
			if (this.handled === UNHANDLED) this.handled = null;
		}
		if (this.state !== PENDING) unwrap(promise, this.state === FULFILLED ? onFulfilled : onRejected, this.outcome);
		else this.queue.push(new QueueItem(promise, onFulfilled, onRejected));
		return promise;
	};
	function QueueItem(promise, onFulfilled, onRejected) {
		this.promise = promise;
		if (typeof onFulfilled === "function") {
			this.onFulfilled = onFulfilled;
			this.callFulfilled = this.otherCallFulfilled;
		}
		if (typeof onRejected === "function") {
			this.onRejected = onRejected;
			this.callRejected = this.otherCallRejected;
		}
	}
	QueueItem.prototype.callFulfilled = function(value) {
		handlers.resolve(this.promise, value);
	};
	QueueItem.prototype.otherCallFulfilled = function(value) {
		unwrap(this.promise, this.onFulfilled, value);
	};
	QueueItem.prototype.callRejected = function(value) {
		handlers.reject(this.promise, value);
	};
	QueueItem.prototype.otherCallRejected = function(value) {
		unwrap(this.promise, this.onRejected, value);
	};
	function unwrap(promise, func, value) {
		immediate(function() {
			var returnValue;
			try {
				returnValue = func(value);
			} catch (e) {
				return handlers.reject(promise, e);
			}
			if (returnValue === promise) handlers.reject(promise, /* @__PURE__ */ new TypeError("Cannot resolve promise with itself"));
			else handlers.resolve(promise, returnValue);
		});
	}
	handlers.resolve = function(self, value) {
		var result = tryCatch(getThen, value);
		if (result.status === "error") return handlers.reject(self, result.value);
		var thenable = result.value;
		if (thenable) safelyResolveThenable(self, thenable);
		else {
			self.state = FULFILLED;
			self.outcome = value;
			var i = -1;
			var len = self.queue.length;
			while (++i < len) self.queue[i].callFulfilled(value);
		}
		return self;
	};
	handlers.reject = function(self, error) {
		self.state = REJECTED;
		self.outcome = error;
		/* istanbul ignore else */
		if (!process.browser) {
			if (self.handled === UNHANDLED) immediate(function() {
				if (self.handled === UNHANDLED) process.emit("unhandledRejection", error, self);
			});
		}
		var i = -1;
		var len = self.queue.length;
		while (++i < len) self.queue[i].callRejected(error);
		return self;
	};
	function getThen(obj) {
		var then = obj && obj.then;
		if (obj && (typeof obj === "object" || typeof obj === "function") && typeof then === "function") return function appyThen() {
			then.apply(obj, arguments);
		};
	}
	function safelyResolveThenable(self, thenable) {
		var called = false;
		function onError(value) {
			if (called) return;
			called = true;
			handlers.reject(self, value);
		}
		function onSuccess(value) {
			if (called) return;
			called = true;
			handlers.resolve(self, value);
		}
		function tryToUnwrap() {
			thenable(onSuccess, onError);
		}
		var result = tryCatch(tryToUnwrap);
		if (result.status === "error") onError(result.value);
	}
	function tryCatch(func, value) {
		var out = {};
		try {
			out.value = func(value);
			out.status = "success";
		} catch (e) {
			out.status = "error";
			out.value = e;
		}
		return out;
	}
	Promise.resolve = resolve;
	function resolve(value) {
		if (value instanceof this) return value;
		return handlers.resolve(new this(INTERNAL), value);
	}
	Promise.reject = reject;
	function reject(reason) {
		var promise = new this(INTERNAL);
		return handlers.reject(promise, reason);
	}
	Promise.all = all;
	function all(iterable) {
		var self = this;
		if (Object.prototype.toString.call(iterable) !== "[object Array]") return this.reject(/* @__PURE__ */ new TypeError("must be an array"));
		var len = iterable.length;
		var called = false;
		if (!len) return this.resolve([]);
		var values = new Array(len);
		var resolved = 0;
		var i = -1;
		var promise = new this(INTERNAL);
		while (++i < len) allResolver(iterable[i], i);
		return promise;
		function allResolver(value, i) {
			self.resolve(value).then(resolveFromAll, function(error) {
				if (!called) {
					called = true;
					handlers.reject(promise, error);
				}
			});
			function resolveFromAll(outValue) {
				values[i] = outValue;
				if (++resolved === len && !called) {
					called = true;
					handlers.resolve(promise, values);
				}
			}
		}
	}
	Promise.race = race;
	function race(iterable) {
		var self = this;
		if (Object.prototype.toString.call(iterable) !== "[object Array]") return this.reject(/* @__PURE__ */ new TypeError("must be an array"));
		var len = iterable.length;
		var called = false;
		if (!len) return this.resolve([]);
		var i = -1;
		var promise = new this(INTERNAL);
		while (++i < len) resolver(iterable[i]);
		return promise;
		function resolver(value) {
			self.resolve(value).then(function(response) {
				if (!called) {
					called = true;
					handlers.resolve(promise, response);
				}
			}, function(error) {
				if (!called) {
					called = true;
					handlers.reject(promise, error);
				}
			});
		}
	}
}));
//#endregion
//#region node_modules/jszip/lib/external.js
var require_external = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var ES6Promise = null;
	if (typeof Promise !== "undefined") ES6Promise = Promise;
	else ES6Promise = require_lib$1();
	/**
	* Let the user use/change some implementations.
	*/
	module.exports = { Promise: ES6Promise };
}));
//#endregion
//#region node_modules/setimmediate/setImmediate.js
var require_setImmediate = /* @__PURE__ */ __commonJSMin((() => {
	(function(global, undefined) {
		"use strict";
		if (global.setImmediate) return;
		var nextHandle = 1;
		var tasksByHandle = {};
		var currentlyRunningATask = false;
		var doc = global.document;
		var registerImmediate;
		function setImmediate(callback) {
			if (typeof callback !== "function") callback = new Function("" + callback);
			var args = new Array(arguments.length - 1);
			for (var i = 0; i < args.length; i++) args[i] = arguments[i + 1];
			tasksByHandle[nextHandle] = {
				callback,
				args
			};
			registerImmediate(nextHandle);
			return nextHandle++;
		}
		function clearImmediate(handle) {
			delete tasksByHandle[handle];
		}
		function run(task) {
			var callback = task.callback;
			var args = task.args;
			switch (args.length) {
				case 0:
					callback();
					break;
				case 1:
					callback(args[0]);
					break;
				case 2:
					callback(args[0], args[1]);
					break;
				case 3:
					callback(args[0], args[1], args[2]);
					break;
				default: callback.apply(undefined, args);
			}
		}
		function runIfPresent(handle) {
			if (currentlyRunningATask) setTimeout(runIfPresent, 0, handle);
			else {
				var task = tasksByHandle[handle];
				if (task) {
					currentlyRunningATask = true;
					try {
						run(task);
					} finally {
						clearImmediate(handle);
						currentlyRunningATask = false;
					}
				}
			}
		}
		function installNextTickImplementation() {
			registerImmediate = function(handle) {
				process.nextTick(function() {
					runIfPresent(handle);
				});
			};
		}
		function canUsePostMessage() {
			if (global.postMessage && !global.importScripts) {
				var postMessageIsAsynchronous = true;
				var oldOnMessage = global.onmessage;
				global.onmessage = function() {
					postMessageIsAsynchronous = false;
				};
				global.postMessage("", "*");
				global.onmessage = oldOnMessage;
				return postMessageIsAsynchronous;
			}
		}
		function installPostMessageImplementation() {
			var messagePrefix = "setImmediate$" + Math.random() + "$";
			var onGlobalMessage = function(event) {
				if (event.source === global && typeof event.data === "string" && event.data.indexOf(messagePrefix) === 0) runIfPresent(+event.data.slice(messagePrefix.length));
			};
			if (global.addEventListener) global.addEventListener("message", onGlobalMessage, false);
			else global.attachEvent("onmessage", onGlobalMessage);
			registerImmediate = function(handle) {
				global.postMessage(messagePrefix + handle, "*");
			};
		}
		function installMessageChannelImplementation() {
			var channel = new MessageChannel();
			channel.port1.onmessage = function(event) {
				var handle = event.data;
				runIfPresent(handle);
			};
			registerImmediate = function(handle) {
				channel.port2.postMessage(handle);
			};
		}
		function installReadyStateChangeImplementation() {
			var html = doc.documentElement;
			registerImmediate = function(handle) {
				var script = doc.createElement("script");
				script.onreadystatechange = function() {
					runIfPresent(handle);
					script.onreadystatechange = null;
					html.removeChild(script);
					script = null;
				};
				html.appendChild(script);
			};
		}
		function installSetTimeoutImplementation() {
			registerImmediate = function(handle) {
				setTimeout(runIfPresent, 0, handle);
			};
		}
		var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
		attachTo = attachTo && attachTo.setTimeout ? attachTo : global;
		if ({}.toString.call(global.process) === "[object process]") installNextTickImplementation();
		else if (canUsePostMessage()) installPostMessageImplementation();
		else if (global.MessageChannel) installMessageChannelImplementation();
		else if (doc && "onreadystatechange" in doc.createElement("script")) installReadyStateChangeImplementation();
		else installSetTimeoutImplementation();
		attachTo.setImmediate = setImmediate;
		attachTo.clearImmediate = clearImmediate;
	})(typeof self === "undefined" ? typeof global === "undefined" ? void 0 : global : self);
}));
//#endregion
//#region node_modules/jszip/lib/utils.js
var require_utils$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var support = require_support();
	var base64 = require_base64();
	var nodejsUtils = require_nodejsUtils();
	var external = require_external();
	require_setImmediate();
	/**
	* Convert a string that pass as a "binary string": it should represent a byte
	* array but may have > 255 char codes. Be sure to take only the first byte
	* and returns the byte array.
	* @param {String} str the string to transform.
	* @return {Array|Uint8Array} the string in a binary format.
	*/
	function string2binary(str) {
		var result = null;
		if (support.uint8array) result = new Uint8Array(str.length);
		else result = new Array(str.length);
		return stringToArrayLike(str, result);
	}
	/**
	* Create a new blob with the given content and the given type.
	* @param {String|ArrayBuffer} part the content to put in the blob. DO NOT use
	* an Uint8Array because the stock browser of android 4 won't accept it (it
	* will be silently converted to a string, "[object Uint8Array]").
	*
	* Use only ONE part to build the blob to avoid a memory leak in IE11 / Edge:
	* when a large amount of Array is used to create the Blob, the amount of
	* memory consumed is nearly 100 times the original data amount.
	*
	* @param {String} type the mime type of the blob.
	* @return {Blob} the created blob.
	*/
	exports.newBlob = function(part, type) {
		exports.checkSupport("blob");
		try {
			return new Blob([part], { type });
		} catch (e) {
			try {
				var builder = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
				builder.append(part);
				return builder.getBlob(type);
			} catch (e) {
				throw new Error("Bug : can't construct the Blob.");
			}
		}
	};
	/**
	* The identity function.
	* @param {Object} input the input.
	* @return {Object} the same input.
	*/
	function identity(input) {
		return input;
	}
	/**
	* Fill in an array with a string.
	* @param {String} str the string to use.
	* @param {Array|ArrayBuffer|Uint8Array|Buffer} array the array to fill in (will be mutated).
	* @return {Array|ArrayBuffer|Uint8Array|Buffer} the updated array.
	*/
	function stringToArrayLike(str, array) {
		for (var i = 0; i < str.length; ++i) array[i] = str.charCodeAt(i) & 255;
		return array;
	}
	/**
	* An helper for the function arrayLikeToString.
	* This contains static information and functions that
	* can be optimized by the browser JIT compiler.
	*/
	var arrayToStringHelper = {
		/**
		* Transform an array of int into a string, chunk by chunk.
		* See the performances notes on arrayLikeToString.
		* @param {Array|ArrayBuffer|Uint8Array|Buffer} array the array to transform.
		* @param {String} type the type of the array.
		* @param {Integer} chunk the chunk size.
		* @return {String} the resulting string.
		* @throws Error if the chunk is too big for the stack.
		*/
		stringifyByChunk: function(array, type, chunk) {
			var result = [], k = 0, len = array.length;
			if (len <= chunk) return String.fromCharCode.apply(null, array);
			while (k < len) {
				if (type === "array" || type === "nodebuffer") result.push(String.fromCharCode.apply(null, array.slice(k, Math.min(k + chunk, len))));
				else result.push(String.fromCharCode.apply(null, array.subarray(k, Math.min(k + chunk, len))));
				k += chunk;
			}
			return result.join("");
		},
		/**
		* Call String.fromCharCode on every item in the array.
		* This is the naive implementation, which generate A LOT of intermediate string.
		* This should be used when everything else fail.
		* @param {Array|ArrayBuffer|Uint8Array|Buffer} array the array to transform.
		* @return {String} the result.
		*/
		stringifyByChar: function(array) {
			var resultStr = "";
			for (var i = 0; i < array.length; i++) resultStr += String.fromCharCode(array[i]);
			return resultStr;
		},
		applyCanBeUsed: {
			/**
			* true if the browser accepts to use String.fromCharCode on Uint8Array
			*/
			uint8array: (function() {
				try {
					return support.uint8array && String.fromCharCode.apply(null, /* @__PURE__ */ new Uint8Array(1)).length === 1;
				} catch (e) {
					return false;
				}
			})(),
			/**
			* true if the browser accepts to use String.fromCharCode on nodejs Buffer.
			*/
			nodebuffer: (function() {
				try {
					return support.nodebuffer && String.fromCharCode.apply(null, nodejsUtils.allocBuffer(1)).length === 1;
				} catch (e) {
					return false;
				}
			})()
		}
	};
	/**
	* Transform an array-like object to a string.
	* @param {Array|ArrayBuffer|Uint8Array|Buffer} array the array to transform.
	* @return {String} the result.
	*/
	function arrayLikeToString(array) {
		var chunk = 65536, type = exports.getTypeOf(array), canUseApply = true;
		if (type === "uint8array") canUseApply = arrayToStringHelper.applyCanBeUsed.uint8array;
		else if (type === "nodebuffer") canUseApply = arrayToStringHelper.applyCanBeUsed.nodebuffer;
		if (canUseApply) while (chunk > 1) try {
			return arrayToStringHelper.stringifyByChunk(array, type, chunk);
		} catch (e) {
			chunk = Math.floor(chunk / 2);
		}
		return arrayToStringHelper.stringifyByChar(array);
	}
	exports.applyFromCharCode = arrayLikeToString;
	/**
	* Copy the data from an array-like to an other array-like.
	* @param {Array|ArrayBuffer|Uint8Array|Buffer} arrayFrom the origin array.
	* @param {Array|ArrayBuffer|Uint8Array|Buffer} arrayTo the destination array which will be mutated.
	* @return {Array|ArrayBuffer|Uint8Array|Buffer} the updated destination array.
	*/
	function arrayLikeToArrayLike(arrayFrom, arrayTo) {
		for (var i = 0; i < arrayFrom.length; i++) arrayTo[i] = arrayFrom[i];
		return arrayTo;
	}
	var transform = {};
	transform["string"] = {
		"string": identity,
		"array": function(input) {
			return stringToArrayLike(input, new Array(input.length));
		},
		"arraybuffer": function(input) {
			return transform["string"]["uint8array"](input).buffer;
		},
		"uint8array": function(input) {
			return stringToArrayLike(input, new Uint8Array(input.length));
		},
		"nodebuffer": function(input) {
			return stringToArrayLike(input, nodejsUtils.allocBuffer(input.length));
		}
	};
	transform["array"] = {
		"string": arrayLikeToString,
		"array": identity,
		"arraybuffer": function(input) {
			return new Uint8Array(input).buffer;
		},
		"uint8array": function(input) {
			return new Uint8Array(input);
		},
		"nodebuffer": function(input) {
			return nodejsUtils.newBufferFrom(input);
		}
	};
	transform["arraybuffer"] = {
		"string": function(input) {
			return arrayLikeToString(new Uint8Array(input));
		},
		"array": function(input) {
			return arrayLikeToArrayLike(new Uint8Array(input), new Array(input.byteLength));
		},
		"arraybuffer": identity,
		"uint8array": function(input) {
			return new Uint8Array(input);
		},
		"nodebuffer": function(input) {
			return nodejsUtils.newBufferFrom(new Uint8Array(input));
		}
	};
	transform["uint8array"] = {
		"string": arrayLikeToString,
		"array": function(input) {
			return arrayLikeToArrayLike(input, new Array(input.length));
		},
		"arraybuffer": function(input) {
			return input.buffer;
		},
		"uint8array": identity,
		"nodebuffer": function(input) {
			return nodejsUtils.newBufferFrom(input);
		}
	};
	transform["nodebuffer"] = {
		"string": arrayLikeToString,
		"array": function(input) {
			return arrayLikeToArrayLike(input, new Array(input.length));
		},
		"arraybuffer": function(input) {
			return transform["nodebuffer"]["uint8array"](input).buffer;
		},
		"uint8array": function(input) {
			return arrayLikeToArrayLike(input, new Uint8Array(input.length));
		},
		"nodebuffer": identity
	};
	/**
	* Transform an input into any type.
	* The supported output type are : string, array, uint8array, arraybuffer, nodebuffer.
	* If no output type is specified, the unmodified input will be returned.
	* @param {String} outputType the output type.
	* @param {String|Array|ArrayBuffer|Uint8Array|Buffer} input the input to convert.
	* @throws {Error} an Error if the browser doesn't support the requested output type.
	*/
	exports.transformTo = function(outputType, input) {
		if (!input) input = "";
		if (!outputType) return input;
		exports.checkSupport(outputType);
		return transform[exports.getTypeOf(input)][outputType](input);
	};
	/**
	* Resolve all relative path components, "." and "..", in a path. If these relative components
	* traverse above the root then the resulting path will only contain the final path component.
	*
	* All empty components, e.g. "//", are removed.
	* @param {string} path A path with / or \ separators
	* @returns {string} The path with all relative path components resolved.
	*/
	exports.resolve = function(path) {
		var parts = path.split("/");
		var result = [];
		for (var index = 0; index < parts.length; index++) {
			var part = parts[index];
			if (part === "." || part === "" && index !== 0 && index !== parts.length - 1) continue;
			else if (part === "..") result.pop();
			else result.push(part);
		}
		return result.join("/");
	};
	/**
	* Return the type of the input.
	* The type will be in a format valid for JSZip.utils.transformTo : string, array, uint8array, arraybuffer.
	* @param {Object} input the input to identify.
	* @return {String} the (lowercase) type of the input.
	*/
	exports.getTypeOf = function(input) {
		if (typeof input === "string") return "string";
		if (Object.prototype.toString.call(input) === "[object Array]") return "array";
		if (support.nodebuffer && nodejsUtils.isBuffer(input)) return "nodebuffer";
		if (support.uint8array && input instanceof Uint8Array) return "uint8array";
		if (support.arraybuffer && input instanceof ArrayBuffer) return "arraybuffer";
	};
	/**
	* Throw an exception if the type is not supported.
	* @param {String} type the type to check.
	* @throws {Error} an Error if the browser doesn't support the requested type.
	*/
	exports.checkSupport = function(type) {
		if (!support[type.toLowerCase()]) throw new Error(type + " is not supported by this platform");
	};
	exports.MAX_VALUE_16BITS = 65535;
	exports.MAX_VALUE_32BITS = -1;
	/**
	* Prettify a string read as binary.
	* @param {string} str the string to prettify.
	* @return {string} a pretty string.
	*/
	exports.pretty = function(str) {
		var res = "", code, i = 0;
		for (; i < (str || "").length; i++) {
			code = str.charCodeAt(i);
			res += "\\x" + (code < 16 ? "0" : "") + code.toString(16).toUpperCase();
		}
		return res;
	};
	/**
	* Defer the call of a function.
	* @param {Function} callback the function to call asynchronously.
	* @param {Array} args the arguments to give to the callback.
	*/
	exports.delay = function(callback, args, self) {
		setImmediate(function() {
			callback.apply(self || null, args || []);
		});
	};
	/**
	* Extends a prototype with an other, without calling a constructor with
	* side effects. Inspired by nodejs' `utils.inherits`
	* @param {Function} ctor the constructor to augment
	* @param {Function} superCtor the parent constructor to use
	*/
	exports.inherits = function(ctor, superCtor) {
		var Obj = function() {};
		Obj.prototype = superCtor.prototype;
		ctor.prototype = new Obj();
	};
	/**
	* Merge the objects passed as parameters into a new one.
	* @private
	* @param {...Object} var_args All objects to merge.
	* @return {Object} a new object with the data of the others.
	*/
	exports.extend = function() {
		var result = {}, i = 0, attr;
		for (; i < arguments.length; i++) for (attr in arguments[i]) if (Object.prototype.hasOwnProperty.call(arguments[i], attr) && typeof result[attr] === "undefined") result[attr] = arguments[i][attr];
		return result;
	};
	/**
	* Transform arbitrary content into a Promise.
	* @param {String} name a name for the content being processed.
	* @param {Object} inputData the content to process.
	* @param {Boolean} isBinary true if the content is not an unicode string
	* @param {Boolean} isOptimizedBinaryString true if the string content only has one byte per character.
	* @param {Boolean} isBase64 true if the string content is encoded with base64.
	* @return {Promise} a promise in a format usable by JSZip.
	*/
	exports.prepareContent = function(name, inputData, isBinary, isOptimizedBinaryString, isBase64) {
		return external.Promise.resolve(inputData).then(function(data) {
			if (support.blob && (data instanceof Blob || ["[object File]", "[object Blob]"].indexOf(Object.prototype.toString.call(data)) !== -1) && typeof FileReader !== "undefined") return new external.Promise(function(resolve, reject) {
				var reader = new FileReader();
				reader.onload = function(e) {
					resolve(e.target.result);
				};
				reader.onerror = function(e) {
					reject(e.target.error);
				};
				reader.readAsArrayBuffer(data);
			});
			else return data;
		}).then(function(data) {
			var dataType = exports.getTypeOf(data);
			if (!dataType) return external.Promise.reject(/* @__PURE__ */ new Error("Can't read the data of '" + name + "'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"));
			if (dataType === "arraybuffer") data = exports.transformTo("uint8array", data);
			else if (dataType === "string") {
				if (isBase64) data = base64.decode(data);
				else if (isBinary) {
					if (isOptimizedBinaryString !== true) data = string2binary(data);
				}
			}
			return data;
		});
	};
}));
//#endregion
//#region node_modules/jszip/lib/stream/GenericWorker.js
var require_GenericWorker = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* A worker that does nothing but passing chunks to the next one. This is like
	* a nodejs stream but with some differences. On the good side :
	* - it works on IE 6-9 without any issue / polyfill
	* - it weights less than the full dependencies bundled with browserify
	* - it forwards errors (no need to declare an error handler EVERYWHERE)
	*
	* A chunk is an object with 2 attributes : `meta` and `data`. The former is an
	* object containing anything (`percent` for example), see each worker for more
	* details. The latter is the real data (String, Uint8Array, etc).
	*
	* @constructor
	* @param {String} name the name of the stream (mainly used for debugging purposes)
	*/
	function GenericWorker(name) {
		this.name = name || "default";
		this.streamInfo = {};
		this.generatedError = null;
		this.extraStreamInfo = {};
		this.isPaused = true;
		this.isFinished = false;
		this.isLocked = false;
		this._listeners = {
			"data": [],
			"end": [],
			"error": []
		};
		this.previous = null;
	}
	GenericWorker.prototype = {
		/**
		* Push a chunk to the next workers.
		* @param {Object} chunk the chunk to push
		*/
		push: function(chunk) {
			this.emit("data", chunk);
		},
		/**
		* End the stream.
		* @return {Boolean} true if this call ended the worker, false otherwise.
		*/
		end: function() {
			if (this.isFinished) return false;
			this.flush();
			try {
				this.emit("end");
				this.cleanUp();
				this.isFinished = true;
			} catch (e) {
				this.emit("error", e);
			}
			return true;
		},
		/**
		* End the stream with an error.
		* @param {Error} e the error which caused the premature end.
		* @return {Boolean} true if this call ended the worker with an error, false otherwise.
		*/
		error: function(e) {
			if (this.isFinished) return false;
			if (this.isPaused) this.generatedError = e;
			else {
				this.isFinished = true;
				this.emit("error", e);
				if (this.previous) this.previous.error(e);
				this.cleanUp();
			}
			return true;
		},
		/**
		* Add a callback on an event.
		* @param {String} name the name of the event (data, end, error)
		* @param {Function} listener the function to call when the event is triggered
		* @return {GenericWorker} the current object for chainability
		*/
		on: function(name, listener) {
			this._listeners[name].push(listener);
			return this;
		},
		/**
		* Clean any references when a worker is ending.
		*/
		cleanUp: function() {
			this.streamInfo = this.generatedError = this.extraStreamInfo = null;
			this._listeners = [];
		},
		/**
		* Trigger an event. This will call registered callback with the provided arg.
		* @param {String} name the name of the event (data, end, error)
		* @param {Object} arg the argument to call the callback with.
		*/
		emit: function(name, arg) {
			if (this._listeners[name]) for (var i = 0; i < this._listeners[name].length; i++) this._listeners[name][i].call(this, arg);
		},
		/**
		* Chain a worker with an other.
		* @param {Worker} next the worker receiving events from the current one.
		* @return {worker} the next worker for chainability
		*/
		pipe: function(next) {
			return next.registerPrevious(this);
		},
		/**
		* Same as `pipe` in the other direction.
		* Using an API with `pipe(next)` is very easy.
		* Implementing the API with the point of view of the next one registering
		* a source is easier, see the ZipFileWorker.
		* @param {Worker} previous the previous worker, sending events to this one
		* @return {Worker} the current worker for chainability
		*/
		registerPrevious: function(previous) {
			if (this.isLocked) throw new Error("The stream '" + this + "' has already been used.");
			this.streamInfo = previous.streamInfo;
			this.mergeStreamInfo();
			this.previous = previous;
			var self = this;
			previous.on("data", function(chunk) {
				self.processChunk(chunk);
			});
			previous.on("end", function() {
				self.end();
			});
			previous.on("error", function(e) {
				self.error(e);
			});
			return this;
		},
		/**
		* Pause the stream so it doesn't send events anymore.
		* @return {Boolean} true if this call paused the worker, false otherwise.
		*/
		pause: function() {
			if (this.isPaused || this.isFinished) return false;
			this.isPaused = true;
			if (this.previous) this.previous.pause();
			return true;
		},
		/**
		* Resume a paused stream.
		* @return {Boolean} true if this call resumed the worker, false otherwise.
		*/
		resume: function() {
			if (!this.isPaused || this.isFinished) return false;
			this.isPaused = false;
			var withError = false;
			if (this.generatedError) {
				this.error(this.generatedError);
				withError = true;
			}
			if (this.previous) this.previous.resume();
			return !withError;
		},
		/**
		* Flush any remaining bytes as the stream is ending.
		*/
		flush: function() {},
		/**
		* Process a chunk. This is usually the method overridden.
		* @param {Object} chunk the chunk to process.
		*/
		processChunk: function(chunk) {
			this.push(chunk);
		},
		/**
		* Add a key/value to be added in the workers chain streamInfo once activated.
		* @param {String} key the key to use
		* @param {Object} value the associated value
		* @return {Worker} the current worker for chainability
		*/
		withStreamInfo: function(key, value) {
			this.extraStreamInfo[key] = value;
			this.mergeStreamInfo();
			return this;
		},
		/**
		* Merge this worker's streamInfo into the chain's streamInfo.
		*/
		mergeStreamInfo: function() {
			for (var key in this.extraStreamInfo) {
				if (!Object.prototype.hasOwnProperty.call(this.extraStreamInfo, key)) continue;
				this.streamInfo[key] = this.extraStreamInfo[key];
			}
		},
		/**
		* Lock the stream to prevent further updates on the workers chain.
		* After calling this method, all calls to pipe will fail.
		*/
		lock: function() {
			if (this.isLocked) throw new Error("The stream '" + this + "' has already been used.");
			this.isLocked = true;
			if (this.previous) this.previous.lock();
		},
		/**
		*
		* Pretty print the workers chain.
		*/
		toString: function() {
			var me = "Worker " + this.name;
			if (this.previous) return this.previous + " -> " + me;
			else return me;
		}
	};
	module.exports = GenericWorker;
}));
//#endregion
//#region node_modules/jszip/lib/utf8.js
var require_utf8 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var utils = require_utils$1();
	var support = require_support();
	var nodejsUtils = require_nodejsUtils();
	var GenericWorker = require_GenericWorker();
	/**
	* The following functions come from pako, from pako/lib/utils/strings
	* released under the MIT license, see pako https://github.com/nodeca/pako/
	*/
	var _utf8len = new Array(256);
	for (var i = 0; i < 256; i++) _utf8len[i] = i >= 252 ? 6 : i >= 248 ? 5 : i >= 240 ? 4 : i >= 224 ? 3 : i >= 192 ? 2 : 1;
	_utf8len[254] = _utf8len[254] = 1;
	var string2buf = function(str) {
		var buf, c, c2, m_pos, i, str_len = str.length, buf_len = 0;
		for (m_pos = 0; m_pos < str_len; m_pos++) {
			c = str.charCodeAt(m_pos);
			if ((c & 64512) === 55296 && m_pos + 1 < str_len) {
				c2 = str.charCodeAt(m_pos + 1);
				if ((c2 & 64512) === 56320) {
					c = 65536 + (c - 55296 << 10) + (c2 - 56320);
					m_pos++;
				}
			}
			buf_len += c < 128 ? 1 : c < 2048 ? 2 : c < 65536 ? 3 : 4;
		}
		if (support.uint8array) buf = new Uint8Array(buf_len);
		else buf = new Array(buf_len);
		for (i = 0, m_pos = 0; i < buf_len; m_pos++) {
			c = str.charCodeAt(m_pos);
			if ((c & 64512) === 55296 && m_pos + 1 < str_len) {
				c2 = str.charCodeAt(m_pos + 1);
				if ((c2 & 64512) === 56320) {
					c = 65536 + (c - 55296 << 10) + (c2 - 56320);
					m_pos++;
				}
			}
			if (c < 128) buf[i++] = c;
			else if (c < 2048) {
				buf[i++] = 192 | c >>> 6;
				buf[i++] = 128 | c & 63;
			} else if (c < 65536) {
				buf[i++] = 224 | c >>> 12;
				buf[i++] = 128 | c >>> 6 & 63;
				buf[i++] = 128 | c & 63;
			} else {
				buf[i++] = 240 | c >>> 18;
				buf[i++] = 128 | c >>> 12 & 63;
				buf[i++] = 128 | c >>> 6 & 63;
				buf[i++] = 128 | c & 63;
			}
		}
		return buf;
	};
	var utf8border = function(buf, max) {
		var pos;
		max = max || buf.length;
		if (max > buf.length) max = buf.length;
		pos = max - 1;
		while (pos >= 0 && (buf[pos] & 192) === 128) pos--;
		if (pos < 0) return max;
		if (pos === 0) return max;
		return pos + _utf8len[buf[pos]] > max ? pos : max;
	};
	var buf2string = function(buf) {
		var i, out, c, c_len;
		var len = buf.length;
		var utf16buf = new Array(len * 2);
		for (out = 0, i = 0; i < len;) {
			c = buf[i++];
			if (c < 128) {
				utf16buf[out++] = c;
				continue;
			}
			c_len = _utf8len[c];
			if (c_len > 4) {
				utf16buf[out++] = 65533;
				i += c_len - 1;
				continue;
			}
			c &= c_len === 2 ? 31 : c_len === 3 ? 15 : 7;
			while (c_len > 1 && i < len) {
				c = c << 6 | buf[i++] & 63;
				c_len--;
			}
			if (c_len > 1) {
				utf16buf[out++] = 65533;
				continue;
			}
			if (c < 65536) utf16buf[out++] = c;
			else {
				c -= 65536;
				utf16buf[out++] = 55296 | c >> 10 & 1023;
				utf16buf[out++] = 56320 | c & 1023;
			}
		}
		if (utf16buf.length !== out) {
			if (utf16buf.subarray) utf16buf = utf16buf.subarray(0, out);
			else utf16buf.length = out;
		}
		return utils.applyFromCharCode(utf16buf);
	};
	/**
	* Transform a javascript string into an array (typed if possible) of bytes,
	* UTF-8 encoded.
	* @param {String} str the string to encode
	* @return {Array|Uint8Array|Buffer} the UTF-8 encoded string.
	*/
	exports.utf8encode = function utf8encode(str) {
		if (support.nodebuffer) return nodejsUtils.newBufferFrom(str, "utf-8");
		return string2buf(str);
	};
	/**
	* Transform a bytes array (or a representation) representing an UTF-8 encoded
	* string into a javascript string.
	* @param {Array|Uint8Array|Buffer} buf the data de decode
	* @return {String} the decoded string.
	*/
	exports.utf8decode = function utf8decode(buf) {
		if (support.nodebuffer) return utils.transformTo("nodebuffer", buf).toString("utf-8");
		buf = utils.transformTo(support.uint8array ? "uint8array" : "array", buf);
		return buf2string(buf);
	};
	/**
	* A worker to decode utf8 encoded binary chunks into string chunks.
	* @constructor
	*/
	function Utf8DecodeWorker() {
		GenericWorker.call(this, "utf-8 decode");
		this.leftOver = null;
	}
	utils.inherits(Utf8DecodeWorker, GenericWorker);
	/**
	* @see GenericWorker.processChunk
	*/
	Utf8DecodeWorker.prototype.processChunk = function(chunk) {
		var data = utils.transformTo(support.uint8array ? "uint8array" : "array", chunk.data);
		if (this.leftOver && this.leftOver.length) {
			if (support.uint8array) {
				var previousData = data;
				data = new Uint8Array(previousData.length + this.leftOver.length);
				data.set(this.leftOver, 0);
				data.set(previousData, this.leftOver.length);
			} else data = this.leftOver.concat(data);
			this.leftOver = null;
		}
		var nextBoundary = utf8border(data);
		var usableData = data;
		if (nextBoundary !== data.length) {
			if (support.uint8array) {
				usableData = data.subarray(0, nextBoundary);
				this.leftOver = data.subarray(nextBoundary, data.length);
			} else {
				usableData = data.slice(0, nextBoundary);
				this.leftOver = data.slice(nextBoundary, data.length);
			}
		}
		this.push({
			data: exports.utf8decode(usableData),
			meta: chunk.meta
		});
	};
	/**
	* @see GenericWorker.flush
	*/
	Utf8DecodeWorker.prototype.flush = function() {
		if (this.leftOver && this.leftOver.length) {
			this.push({
				data: exports.utf8decode(this.leftOver),
				meta: {}
			});
			this.leftOver = null;
		}
	};
	exports.Utf8DecodeWorker = Utf8DecodeWorker;
	/**
	* A worker to endcode string chunks into utf8 encoded binary chunks.
	* @constructor
	*/
	function Utf8EncodeWorker() {
		GenericWorker.call(this, "utf-8 encode");
	}
	utils.inherits(Utf8EncodeWorker, GenericWorker);
	/**
	* @see GenericWorker.processChunk
	*/
	Utf8EncodeWorker.prototype.processChunk = function(chunk) {
		this.push({
			data: exports.utf8encode(chunk.data),
			meta: chunk.meta
		});
	};
	exports.Utf8EncodeWorker = Utf8EncodeWorker;
}));
//#endregion
//#region node_modules/jszip/lib/stream/ConvertWorker.js
var require_ConvertWorker = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var GenericWorker = require_GenericWorker();
	var utils = require_utils$1();
	/**
	* A worker which convert chunks to a specified type.
	* @constructor
	* @param {String} destType the destination type.
	*/
	function ConvertWorker(destType) {
		GenericWorker.call(this, "ConvertWorker to " + destType);
		this.destType = destType;
	}
	utils.inherits(ConvertWorker, GenericWorker);
	/**
	* @see GenericWorker.processChunk
	*/
	ConvertWorker.prototype.processChunk = function(chunk) {
		this.push({
			data: utils.transformTo(this.destType, chunk.data),
			meta: chunk.meta
		});
	};
	module.exports = ConvertWorker;
}));
//#endregion
//#region node_modules/jszip/lib/nodejs/NodejsStreamOutputAdapter.js
var require_NodejsStreamOutputAdapter = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Readable = require_readable$1().Readable;
	require_utils$1().inherits(NodejsStreamOutputAdapter, Readable);
	/**
	* A nodejs stream using a worker as source.
	* @see the SourceWrapper in http://nodejs.org/api/stream.html
	* @constructor
	* @param {StreamHelper} helper the helper wrapping the worker
	* @param {Object} options the nodejs stream options
	* @param {Function} updateCb the update callback.
	*/
	function NodejsStreamOutputAdapter(helper, options, updateCb) {
		Readable.call(this, options);
		this._helper = helper;
		var self = this;
		helper.on("data", function(data, meta) {
			if (!self.push(data)) self._helper.pause();
			if (updateCb) updateCb(meta);
		}).on("error", function(e) {
			self.emit("error", e);
		}).on("end", function() {
			self.push(null);
		});
	}
	NodejsStreamOutputAdapter.prototype._read = function() {
		this._helper.resume();
	};
	module.exports = NodejsStreamOutputAdapter;
}));
//#endregion
//#region node_modules/jszip/lib/stream/StreamHelper.js
var require_StreamHelper = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var utils = require_utils$1();
	var ConvertWorker = require_ConvertWorker();
	var GenericWorker = require_GenericWorker();
	var base64 = require_base64();
	var support = require_support();
	var external = require_external();
	var NodejsStreamOutputAdapter = null;
	if (support.nodestream) try {
		NodejsStreamOutputAdapter = require_NodejsStreamOutputAdapter();
	} catch (e) {}
	/**
	* Apply the final transformation of the data. If the user wants a Blob for
	* example, it's easier to work with an U8intArray and finally do the
	* ArrayBuffer/Blob conversion.
	* @param {String} type the name of the final type
	* @param {String|Uint8Array|Buffer} content the content to transform
	* @param {String} mimeType the mime type of the content, if applicable.
	* @return {String|Uint8Array|ArrayBuffer|Buffer|Blob} the content in the right format.
	*/
	function transformZipOutput(type, content, mimeType) {
		switch (type) {
			case "blob": return utils.newBlob(utils.transformTo("arraybuffer", content), mimeType);
			case "base64": return base64.encode(content);
			default: return utils.transformTo(type, content);
		}
	}
	/**
	* Concatenate an array of data of the given type.
	* @param {String} type the type of the data in the given array.
	* @param {Array} dataArray the array containing the data chunks to concatenate
	* @return {String|Uint8Array|Buffer} the concatenated data
	* @throws Error if the asked type is unsupported
	*/
	function concat(type, dataArray) {
		var i, index = 0, res = null, totalLength = 0;
		for (i = 0; i < dataArray.length; i++) totalLength += dataArray[i].length;
		switch (type) {
			case "string": return dataArray.join("");
			case "array": return Array.prototype.concat.apply([], dataArray);
			case "uint8array":
				res = new Uint8Array(totalLength);
				for (i = 0; i < dataArray.length; i++) {
					res.set(dataArray[i], index);
					index += dataArray[i].length;
				}
				return res;
			case "nodebuffer": return Buffer.concat(dataArray);
			default: throw new Error("concat : unsupported type '" + type + "'");
		}
	}
	/**
	* Listen a StreamHelper, accumulate its content and concatenate it into a
	* complete block.
	* @param {StreamHelper} helper the helper to use.
	* @param {Function} updateCallback a callback called on each update. Called
	* with one arg :
	* - the metadata linked to the update received.
	* @return Promise the promise for the accumulation.
	*/
	function accumulate(helper, updateCallback) {
		return new external.Promise(function(resolve, reject) {
			var dataArray = [];
			var chunkType = helper._internalType, resultType = helper._outputType, mimeType = helper._mimeType;
			helper.on("data", function(data, meta) {
				dataArray.push(data);
				if (updateCallback) updateCallback(meta);
			}).on("error", function(err) {
				dataArray = [];
				reject(err);
			}).on("end", function() {
				try {
					resolve(transformZipOutput(resultType, concat(chunkType, dataArray), mimeType));
				} catch (e) {
					reject(e);
				}
				dataArray = [];
			}).resume();
		});
	}
	/**
	* An helper to easily use workers outside of JSZip.
	* @constructor
	* @param {Worker} worker the worker to wrap
	* @param {String} outputType the type of data expected by the use
	* @param {String} mimeType the mime type of the content, if applicable.
	*/
	function StreamHelper(worker, outputType, mimeType) {
		var internalType = outputType;
		switch (outputType) {
			case "blob":
			case "arraybuffer":
				internalType = "uint8array";
				break;
			case "base64": internalType = "string";
		}
		try {
			this._internalType = internalType;
			this._outputType = outputType;
			this._mimeType = mimeType;
			utils.checkSupport(internalType);
			this._worker = worker.pipe(new ConvertWorker(internalType));
			worker.lock();
		} catch (e) {
			this._worker = new GenericWorker("error");
			this._worker.error(e);
		}
	}
	StreamHelper.prototype = {
		/**
		* Listen a StreamHelper, accumulate its content and concatenate it into a
		* complete block.
		* @param {Function} updateCb the update callback.
		* @return Promise the promise for the accumulation.
		*/
		accumulate: function(updateCb) {
			return accumulate(this, updateCb);
		},
		/**
		* Add a listener on an event triggered on a stream.
		* @param {String} evt the name of the event
		* @param {Function} fn the listener
		* @return {StreamHelper} the current helper.
		*/
		on: function(evt, fn) {
			var self = this;
			if (evt === "data") this._worker.on(evt, function(chunk) {
				fn.call(self, chunk.data, chunk.meta);
			});
			else this._worker.on(evt, function() {
				utils.delay(fn, arguments, self);
			});
			return this;
		},
		/**
		* Resume the flow of chunks.
		* @return {StreamHelper} the current helper.
		*/
		resume: function() {
			utils.delay(this._worker.resume, [], this._worker);
			return this;
		},
		/**
		* Pause the flow of chunks.
		* @return {StreamHelper} the current helper.
		*/
		pause: function() {
			this._worker.pause();
			return this;
		},
		/**
		* Return a nodejs stream for this helper.
		* @param {Function} updateCb the update callback.
		* @return {NodejsStreamOutputAdapter} the nodejs stream.
		*/
		toNodejsStream: function(updateCb) {
			utils.checkSupport("nodestream");
			if (this._outputType !== "nodebuffer") throw new Error(this._outputType + " is not supported by this method");
			return new NodejsStreamOutputAdapter(this, { objectMode: this._outputType !== "nodebuffer" }, updateCb);
		}
	};
	module.exports = StreamHelper;
}));
//#endregion
//#region node_modules/jszip/lib/defaults.js
var require_defaults = /* @__PURE__ */ __commonJSMin(((exports) => {
	exports.base64 = false;
	exports.binary = false;
	exports.dir = false;
	exports.createFolders = true;
	exports.date = null;
	exports.compression = null;
	exports.compressionOptions = null;
	exports.comment = null;
	exports.unixPermissions = null;
	exports.dosPermissions = null;
}));
//#endregion
//#region node_modules/jszip/lib/stream/DataWorker.js
var require_DataWorker = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var utils = require_utils$1();
	var GenericWorker = require_GenericWorker();
	var DEFAULT_BLOCK_SIZE = 16384;
	/**
	* A worker that reads a content and emits chunks.
	* @constructor
	* @param {Promise} dataP the promise of the data to split
	*/
	function DataWorker(dataP) {
		GenericWorker.call(this, "DataWorker");
		var self = this;
		this.dataIsReady = false;
		this.index = 0;
		this.max = 0;
		this.data = null;
		this.type = "";
		this._tickScheduled = false;
		dataP.then(function(data) {
			self.dataIsReady = true;
			self.data = data;
			self.max = data && data.length || 0;
			self.type = utils.getTypeOf(data);
			if (!self.isPaused) self._tickAndRepeat();
		}, function(e) {
			self.error(e);
		});
	}
	utils.inherits(DataWorker, GenericWorker);
	/**
	* @see GenericWorker.cleanUp
	*/
	DataWorker.prototype.cleanUp = function() {
		GenericWorker.prototype.cleanUp.call(this);
		this.data = null;
	};
	/**
	* @see GenericWorker.resume
	*/
	DataWorker.prototype.resume = function() {
		if (!GenericWorker.prototype.resume.call(this)) return false;
		if (!this._tickScheduled && this.dataIsReady) {
			this._tickScheduled = true;
			utils.delay(this._tickAndRepeat, [], this);
		}
		return true;
	};
	/**
	* Trigger a tick a schedule an other call to this function.
	*/
	DataWorker.prototype._tickAndRepeat = function() {
		this._tickScheduled = false;
		if (this.isPaused || this.isFinished) return;
		this._tick();
		if (!this.isFinished) {
			utils.delay(this._tickAndRepeat, [], this);
			this._tickScheduled = true;
		}
	};
	/**
	* Read and push a chunk.
	*/
	DataWorker.prototype._tick = function() {
		if (this.isPaused || this.isFinished) return false;
		var size = DEFAULT_BLOCK_SIZE;
		var data = null, nextIndex = Math.min(this.max, this.index + size);
		if (this.index >= this.max) return this.end();
		else {
			switch (this.type) {
				case "string":
					data = this.data.substring(this.index, nextIndex);
					break;
				case "uint8array":
					data = this.data.subarray(this.index, nextIndex);
					break;
				case "array":
				case "nodebuffer": data = this.data.slice(this.index, nextIndex);
			}
			this.index = nextIndex;
			return this.push({
				data,
				meta: { percent: this.max ? this.index / this.max * 100 : 0 }
			});
		}
	};
	module.exports = DataWorker;
}));
//#endregion
//#region node_modules/jszip/lib/crc32.js
var require_crc32 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var utils = require_utils$1();
	/**
	* The following functions come from pako, from pako/lib/zlib/crc32.js
	* released under the MIT license, see pako https://github.com/nodeca/pako/
	*/
	function makeTable() {
		var c, table = [];
		for (var n = 0; n < 256; n++) {
			c = n;
			for (var k = 0; k < 8; k++) c = c & 1 ? 3988292384 ^ c >>> 1 : c >>> 1;
			table[n] = c;
		}
		return table;
	}
	var crcTable = makeTable();
	function crc32(crc, buf, len, pos) {
		var t = crcTable, end = pos + len;
		crc = crc ^ -1;
		for (var i = pos; i < end; i++) crc = crc >>> 8 ^ t[(crc ^ buf[i]) & 255];
		return crc ^ -1;
	}
	/**
	* Compute the crc32 of a string.
	* This is almost the same as the function crc32, but for strings. Using the
	* same function for the two use cases leads to horrible performances.
	* @param {Number} crc the starting value of the crc.
	* @param {String} str the string to use.
	* @param {Number} len the length of the string.
	* @param {Number} pos the starting position for the crc32 computation.
	* @return {Number} the computed crc32.
	*/
	function crc32str(crc, str, len, pos) {
		var t = crcTable, end = pos + len;
		crc = crc ^ -1;
		for (var i = pos; i < end; i++) crc = crc >>> 8 ^ t[(crc ^ str.charCodeAt(i)) & 255];
		return crc ^ -1;
	}
	module.exports = function crc32wrapper(input, crc) {
		if (typeof input === "undefined" || !input.length) return 0;
		if (utils.getTypeOf(input) !== "string") return crc32(crc | 0, input, input.length, 0);
		else return crc32str(crc | 0, input, input.length, 0);
	};
}));
//#endregion
//#region node_modules/jszip/lib/stream/Crc32Probe.js
var require_Crc32Probe = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var GenericWorker = require_GenericWorker();
	var crc32 = require_crc32();
	var utils = require_utils$1();
	/**
	* A worker which calculate the crc32 of the data flowing through.
	* @constructor
	*/
	function Crc32Probe() {
		GenericWorker.call(this, "Crc32Probe");
		this.withStreamInfo("crc32", 0);
	}
	utils.inherits(Crc32Probe, GenericWorker);
	/**
	* @see GenericWorker.processChunk
	*/
	Crc32Probe.prototype.processChunk = function(chunk) {
		this.streamInfo.crc32 = crc32(chunk.data, this.streamInfo.crc32 || 0);
		this.push(chunk);
	};
	module.exports = Crc32Probe;
}));
//#endregion
//#region node_modules/jszip/lib/stream/DataLengthProbe.js
var require_DataLengthProbe = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var utils = require_utils$1();
	var GenericWorker = require_GenericWorker();
	/**
	* A worker which calculate the total length of the data flowing through.
	* @constructor
	* @param {String} propName the name used to expose the length
	*/
	function DataLengthProbe(propName) {
		GenericWorker.call(this, "DataLengthProbe for " + propName);
		this.propName = propName;
		this.withStreamInfo(propName, 0);
	}
	utils.inherits(DataLengthProbe, GenericWorker);
	/**
	* @see GenericWorker.processChunk
	*/
	DataLengthProbe.prototype.processChunk = function(chunk) {
		if (chunk) {
			var length = this.streamInfo[this.propName] || 0;
			this.streamInfo[this.propName] = length + chunk.data.length;
		}
		GenericWorker.prototype.processChunk.call(this, chunk);
	};
	module.exports = DataLengthProbe;
}));
//#endregion
//#region node_modules/jszip/lib/compressedObject.js
var require_compressedObject = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var external = require_external();
	var DataWorker = require_DataWorker();
	var Crc32Probe = require_Crc32Probe();
	var DataLengthProbe = require_DataLengthProbe();
	/**
	* Represent a compressed object, with everything needed to decompress it.
	* @constructor
	* @param {number} compressedSize the size of the data compressed.
	* @param {number} uncompressedSize the size of the data after decompression.
	* @param {number} crc32 the crc32 of the decompressed file.
	* @param {object} compression the type of compression, see lib/compressions.js.
	* @param {String|ArrayBuffer|Uint8Array|Buffer} data the compressed data.
	*/
	function CompressedObject(compressedSize, uncompressedSize, crc32, compression, data) {
		this.compressedSize = compressedSize;
		this.uncompressedSize = uncompressedSize;
		this.crc32 = crc32;
		this.compression = compression;
		this.compressedContent = data;
	}
	CompressedObject.prototype = {
		/**
		* Create a worker to get the uncompressed content.
		* @return {GenericWorker} the worker.
		*/
		getContentWorker: function() {
			var worker = new DataWorker(external.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new DataLengthProbe("data_length"));
			var that = this;
			worker.on("end", function() {
				if (this.streamInfo["data_length"] !== that.uncompressedSize) throw new Error("Bug : uncompressed data size mismatch");
			});
			return worker;
		},
		/**
		* Create a worker to get the compressed content.
		* @return {GenericWorker} the worker.
		*/
		getCompressedWorker: function() {
			return new DataWorker(external.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize", this.compressedSize).withStreamInfo("uncompressedSize", this.uncompressedSize).withStreamInfo("crc32", this.crc32).withStreamInfo("compression", this.compression);
		}
	};
	/**
	* Chain the given worker with other workers to compress the content with the
	* given compression.
	* @param {GenericWorker} uncompressedWorker the worker to pipe.
	* @param {Object} compression the compression object.
	* @param {Object} compressionOptions the options to use when compressing.
	* @return {GenericWorker} the new worker compressing the content.
	*/
	CompressedObject.createWorkerFrom = function(uncompressedWorker, compression, compressionOptions) {
		return uncompressedWorker.pipe(new Crc32Probe()).pipe(new DataLengthProbe("uncompressedSize")).pipe(compression.compressWorker(compressionOptions)).pipe(new DataLengthProbe("compressedSize")).withStreamInfo("compression", compression);
	};
	module.exports = CompressedObject;
}));
//#endregion
//#region node_modules/jszip/lib/zipObject.js
var require_zipObject = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var StreamHelper = require_StreamHelper();
	var DataWorker = require_DataWorker();
	var utf8 = require_utf8();
	var CompressedObject = require_compressedObject();
	var GenericWorker = require_GenericWorker();
	/**
	* A simple object representing a file in the zip file.
	* @constructor
	* @param {string} name the name of the file
	* @param {String|ArrayBuffer|Uint8Array|Buffer} data the data
	* @param {Object} options the options of the file
	*/
	var ZipObject = function(name, data, options) {
		this.name = name;
		this.dir = options.dir;
		this.date = options.date;
		this.comment = options.comment;
		this.unixPermissions = options.unixPermissions;
		this.dosPermissions = options.dosPermissions;
		this._data = data;
		this._dataBinary = options.binary;
		this.options = {
			compression: options.compression,
			compressionOptions: options.compressionOptions
		};
	};
	ZipObject.prototype = {
		/**
		* Create an internal stream for the content of this object.
		* @param {String} type the type of each chunk.
		* @return StreamHelper the stream.
		*/
		internalStream: function(type) {
			var result = null, outputType = "string";
			try {
				if (!type) throw new Error("No output type specified.");
				outputType = type.toLowerCase();
				var askUnicodeString = outputType === "string" || outputType === "text";
				if (outputType === "binarystring" || outputType === "text") outputType = "string";
				result = this._decompressWorker();
				var isUnicodeString = !this._dataBinary;
				if (isUnicodeString && !askUnicodeString) result = result.pipe(new utf8.Utf8EncodeWorker());
				if (!isUnicodeString && askUnicodeString) result = result.pipe(new utf8.Utf8DecodeWorker());
			} catch (e) {
				result = new GenericWorker("error");
				result.error(e);
			}
			return new StreamHelper(result, outputType, "");
		},
		/**
		* Prepare the content in the asked type.
		* @param {String} type the type of the result.
		* @param {Function} onUpdate a function to call on each internal update.
		* @return Promise the promise of the result.
		*/
		async: function(type, onUpdate) {
			return this.internalStream(type).accumulate(onUpdate);
		},
		/**
		* Prepare the content as a nodejs stream.
		* @param {String} type the type of each chunk.
		* @param {Function} onUpdate a function to call on each internal update.
		* @return Stream the stream.
		*/
		nodeStream: function(type, onUpdate) {
			return this.internalStream(type || "nodebuffer").toNodejsStream(onUpdate);
		},
		/**
		* Return a worker for the compressed content.
		* @private
		* @param {Object} compression the compression object to use.
		* @param {Object} compressionOptions the options to use when compressing.
		* @return Worker the worker.
		*/
		_compressWorker: function(compression, compressionOptions) {
			if (this._data instanceof CompressedObject && this._data.compression.magic === compression.magic) return this._data.getCompressedWorker();
			else {
				var result = this._decompressWorker();
				if (!this._dataBinary) result = result.pipe(new utf8.Utf8EncodeWorker());
				return CompressedObject.createWorkerFrom(result, compression, compressionOptions);
			}
		},
		/**
		* Return a worker for the decompressed content.
		* @private
		* @return Worker the worker.
		*/
		_decompressWorker: function() {
			if (this._data instanceof CompressedObject) return this._data.getContentWorker();
			else if (this._data instanceof GenericWorker) return this._data;
			else return new DataWorker(this._data);
		}
	};
	var removedMethods = [
		"asText",
		"asBinary",
		"asNodeBuffer",
		"asUint8Array",
		"asArrayBuffer"
	];
	var removedFn = function() {
		throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
	};
	for (var i = 0; i < removedMethods.length; i++) ZipObject.prototype[removedMethods[i]] = removedFn;
	module.exports = ZipObject;
}));
//#endregion
//#region node_modules/jszip/lib/flate.js
var require_flate = /* @__PURE__ */ __commonJSMin(((exports) => {
	var USE_TYPEDARRAY = typeof Uint8Array !== "undefined" && typeof Uint16Array !== "undefined" && typeof Uint32Array !== "undefined";
	var pako = require_pako();
	var utils = require_utils$1();
	var GenericWorker = require_GenericWorker();
	var ARRAY_TYPE = USE_TYPEDARRAY ? "uint8array" : "array";
	exports.magic = "\b\0";
	/**
	* Create a worker that uses pako to inflate/deflate.
	* @constructor
	* @param {String} action the name of the pako function to call : either "Deflate" or "Inflate".
	* @param {Object} options the options to use when (de)compressing.
	*/
	function FlateWorker(action, options) {
		GenericWorker.call(this, "FlateWorker/" + action);
		this._pako = null;
		this._pakoAction = action;
		this._pakoOptions = options;
		this.meta = {};
	}
	utils.inherits(FlateWorker, GenericWorker);
	/**
	* @see GenericWorker.processChunk
	*/
	FlateWorker.prototype.processChunk = function(chunk) {
		this.meta = chunk.meta;
		if (this._pako === null) this._createPako();
		this._pako.push(utils.transformTo(ARRAY_TYPE, chunk.data), false);
	};
	/**
	* @see GenericWorker.flush
	*/
	FlateWorker.prototype.flush = function() {
		GenericWorker.prototype.flush.call(this);
		if (this._pako === null) this._createPako();
		this._pako.push([], true);
	};
	/**
	* @see GenericWorker.cleanUp
	*/
	FlateWorker.prototype.cleanUp = function() {
		GenericWorker.prototype.cleanUp.call(this);
		this._pako = null;
	};
	/**
	* Create the _pako object.
	* TODO: lazy-loading this object isn't the best solution but it's the
	* quickest. The best solution is to lazy-load the worker list. See also the
	* issue #446.
	*/
	FlateWorker.prototype._createPako = function() {
		this._pako = new pako[this._pakoAction]({
			raw: true,
			level: this._pakoOptions.level || -1
		});
		var self = this;
		this._pako.onData = function(data) {
			self.push({
				data,
				meta: self.meta
			});
		};
	};
	exports.compressWorker = function(compressionOptions) {
		return new FlateWorker("Deflate", compressionOptions);
	};
	exports.uncompressWorker = function() {
		return new FlateWorker("Inflate", {});
	};
}));
//#endregion
//#region node_modules/jszip/lib/compressions.js
var require_compressions = /* @__PURE__ */ __commonJSMin(((exports) => {
	var GenericWorker = require_GenericWorker();
	exports.STORE = {
		magic: "\0\0",
		compressWorker: function() {
			return new GenericWorker("STORE compression");
		},
		uncompressWorker: function() {
			return new GenericWorker("STORE decompression");
		}
	};
	exports.DEFLATE = require_flate();
}));
//#endregion
//#region node_modules/jszip/lib/signature.js
var require_signature = /* @__PURE__ */ __commonJSMin(((exports) => {
	exports.LOCAL_FILE_HEADER = "PK";
	exports.CENTRAL_FILE_HEADER = "PK";
	exports.CENTRAL_DIRECTORY_END = "PK";
	exports.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK\x07";
	exports.ZIP64_CENTRAL_DIRECTORY_END = "PK";
	exports.DATA_DESCRIPTOR = "PK\x07\b";
}));
//#endregion
//#region node_modules/jszip/lib/generate/ZipFileWorker.js
var require_ZipFileWorker = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var utils = require_utils$1();
	var GenericWorker = require_GenericWorker();
	var utf8 = require_utf8();
	var crc32 = require_crc32();
	var signature = require_signature();
	/**
	* Transform an integer into a string in hexadecimal.
	* @private
	* @param {number} dec the number to convert.
	* @param {number} bytes the number of bytes to generate.
	* @returns {string} the result.
	*/
	var decToHex = function(dec, bytes) {
		var hex = "", i = 0;
		for (; i < bytes; i++) {
			hex += String.fromCharCode(dec & 255);
			dec = dec >>> 8;
		}
		return hex;
	};
	/**
	* Generate the UNIX part of the external file attributes.
	* @param {Object} unixPermissions the unix permissions or null.
	* @param {Boolean} isDir true if the entry is a directory, false otherwise.
	* @return {Number} a 32 bit integer.
	*
	* adapted from http://unix.stackexchange.com/questions/14705/the-zip-formats-external-file-attribute :
	*
	* TTTTsstrwxrwxrwx0000000000ADVSHR
	* ^^^^____________________________ file type, see zipinfo.c (UNX_*)
	*     ^^^_________________________ setuid, setgid, sticky
	*        ^^^^^^^^^________________ permissions
	*                 ^^^^^^^^^^______ not used ?
	*                           ^^^^^^ DOS attribute bits : Archive, Directory, Volume label, System file, Hidden, Read only
	*/
	var generateUnixExternalFileAttr = function(unixPermissions, isDir) {
		var result = unixPermissions;
		if (!unixPermissions) result = isDir ? 16893 : 33204;
		return (result & 65535) << 16;
	};
	/**
	* Generate the DOS part of the external file attributes.
	* @param {Object} dosPermissions the dos permissions or null.
	* @param {Boolean} isDir true if the entry is a directory, false otherwise.
	* @return {Number} a 32 bit integer.
	*
	* Bit 0     Read-Only
	* Bit 1     Hidden
	* Bit 2     System
	* Bit 3     Volume Label
	* Bit 4     Directory
	* Bit 5     Archive
	*/
	var generateDosExternalFileAttr = function(dosPermissions) {
		return (dosPermissions || 0) & 63;
	};
	/**
	* Generate the various parts used in the construction of the final zip file.
	* @param {Object} streamInfo the hash with information about the compressed file.
	* @param {Boolean} streamedContent is the content streamed ?
	* @param {Boolean} streamingEnded is the stream finished ?
	* @param {number} offset the current offset from the start of the zip file.
	* @param {String} platform let's pretend we are this platform (change platform dependents fields)
	* @param {Function} encodeFileName the function to encode the file name / comment.
	* @return {Object} the zip parts.
	*/
	var generateZipParts = function(streamInfo, streamedContent, streamingEnded, offset, platform, encodeFileName) {
		var file = streamInfo["file"], compression = streamInfo["compression"], useCustomEncoding = encodeFileName !== utf8.utf8encode, encodedFileName = utils.transformTo("string", encodeFileName(file.name)), utfEncodedFileName = utils.transformTo("string", utf8.utf8encode(file.name)), comment = file.comment, encodedComment = utils.transformTo("string", encodeFileName(comment)), utfEncodedComment = utils.transformTo("string", utf8.utf8encode(comment)), useUTF8ForFileName = utfEncodedFileName.length !== file.name.length, useUTF8ForComment = utfEncodedComment.length !== comment.length, dosTime, dosDate, extraFields = "", unicodePathExtraField = "", unicodeCommentExtraField = "", dir = file.dir, date = file.date;
		var dataInfo = {
			crc32: 0,
			compressedSize: 0,
			uncompressedSize: 0
		};
		if (!streamedContent || streamingEnded) {
			dataInfo.crc32 = streamInfo["crc32"];
			dataInfo.compressedSize = streamInfo["compressedSize"];
			dataInfo.uncompressedSize = streamInfo["uncompressedSize"];
		}
		var bitflag = 0;
		if (streamedContent) bitflag |= 8;
		if (!useCustomEncoding && (useUTF8ForFileName || useUTF8ForComment)) bitflag |= 2048;
		var extFileAttr = 0;
		var versionMadeBy = 0;
		if (dir) extFileAttr |= 16;
		if (platform === "UNIX") {
			versionMadeBy = 798;
			extFileAttr |= generateUnixExternalFileAttr(file.unixPermissions, dir);
		} else {
			versionMadeBy = 20;
			extFileAttr |= generateDosExternalFileAttr(file.dosPermissions, dir);
		}
		dosTime = date.getUTCHours();
		dosTime = dosTime << 6;
		dosTime = dosTime | date.getUTCMinutes();
		dosTime = dosTime << 5;
		dosTime = dosTime | date.getUTCSeconds() / 2;
		dosDate = date.getUTCFullYear() - 1980;
		dosDate = dosDate << 4;
		dosDate = dosDate | date.getUTCMonth() + 1;
		dosDate = dosDate << 5;
		dosDate = dosDate | date.getUTCDate();
		if (useUTF8ForFileName) {
			unicodePathExtraField = decToHex(1, 1) + decToHex(crc32(encodedFileName), 4) + utfEncodedFileName;
			extraFields += "up" + decToHex(unicodePathExtraField.length, 2) + unicodePathExtraField;
		}
		if (useUTF8ForComment) {
			unicodeCommentExtraField = decToHex(1, 1) + decToHex(crc32(encodedComment), 4) + utfEncodedComment;
			extraFields += "uc" + decToHex(unicodeCommentExtraField.length, 2) + unicodeCommentExtraField;
		}
		var header = "";
		header += "\n\0";
		header += decToHex(bitflag, 2);
		header += compression.magic;
		header += decToHex(dosTime, 2);
		header += decToHex(dosDate, 2);
		header += decToHex(dataInfo.crc32, 4);
		header += decToHex(dataInfo.compressedSize, 4);
		header += decToHex(dataInfo.uncompressedSize, 4);
		header += decToHex(encodedFileName.length, 2);
		header += decToHex(extraFields.length, 2);
		return {
			fileRecord: signature.LOCAL_FILE_HEADER + header + encodedFileName + extraFields,
			dirRecord: signature.CENTRAL_FILE_HEADER + decToHex(versionMadeBy, 2) + header + decToHex(encodedComment.length, 2) + "\0\0\0\0" + decToHex(extFileAttr, 4) + decToHex(offset, 4) + encodedFileName + extraFields + encodedComment
		};
	};
	/**
	* Generate the EOCD record.
	* @param {Number} entriesCount the number of entries in the zip file.
	* @param {Number} centralDirLength the length (in bytes) of the central dir.
	* @param {Number} localDirLength the length (in bytes) of the local dir.
	* @param {String} comment the zip file comment as a binary string.
	* @param {Function} encodeFileName the function to encode the comment.
	* @return {String} the EOCD record.
	*/
	var generateCentralDirectoryEnd = function(entriesCount, centralDirLength, localDirLength, comment, encodeFileName) {
		var dirEnd = "";
		var encodedComment = utils.transformTo("string", encodeFileName(comment));
		dirEnd = signature.CENTRAL_DIRECTORY_END + "\0\0\0\0" + decToHex(entriesCount, 2) + decToHex(entriesCount, 2) + decToHex(centralDirLength, 4) + decToHex(localDirLength, 4) + decToHex(encodedComment.length, 2) + encodedComment;
		return dirEnd;
	};
	/**
	* Generate data descriptors for a file entry.
	* @param {Object} streamInfo the hash generated by a worker, containing information
	* on the file entry.
	* @return {String} the data descriptors.
	*/
	var generateDataDescriptors = function(streamInfo) {
		var descriptor = "";
		descriptor = signature.DATA_DESCRIPTOR + decToHex(streamInfo["crc32"], 4) + decToHex(streamInfo["compressedSize"], 4) + decToHex(streamInfo["uncompressedSize"], 4);
		return descriptor;
	};
	/**
	* A worker to concatenate other workers to create a zip file.
	* @param {Boolean} streamFiles `true` to stream the content of the files,
	* `false` to accumulate it.
	* @param {String} comment the comment to use.
	* @param {String} platform the platform to use, "UNIX" or "DOS".
	* @param {Function} encodeFileName the function to encode file names and comments.
	*/
	function ZipFileWorker(streamFiles, comment, platform, encodeFileName) {
		GenericWorker.call(this, "ZipFileWorker");
		this.bytesWritten = 0;
		this.zipComment = comment;
		this.zipPlatform = platform;
		this.encodeFileName = encodeFileName;
		this.streamFiles = streamFiles;
		this.accumulate = false;
		this.contentBuffer = [];
		this.dirRecords = [];
		this.currentSourceOffset = 0;
		this.entriesCount = 0;
		this.currentFile = null;
		this._sources = [];
	}
	utils.inherits(ZipFileWorker, GenericWorker);
	/**
	* @see GenericWorker.push
	*/
	ZipFileWorker.prototype.push = function(chunk) {
		var currentFilePercent = chunk.meta.percent || 0;
		var entriesCount = this.entriesCount;
		var remainingFiles = this._sources.length;
		if (this.accumulate) this.contentBuffer.push(chunk);
		else {
			this.bytesWritten += chunk.data.length;
			GenericWorker.prototype.push.call(this, {
				data: chunk.data,
				meta: {
					currentFile: this.currentFile,
					percent: entriesCount ? (currentFilePercent + 100 * (entriesCount - remainingFiles - 1)) / entriesCount : 100
				}
			});
		}
	};
	/**
	* The worker started a new source (an other worker).
	* @param {Object} streamInfo the streamInfo object from the new source.
	*/
	ZipFileWorker.prototype.openedSource = function(streamInfo) {
		this.currentSourceOffset = this.bytesWritten;
		this.currentFile = streamInfo["file"].name;
		var streamedContent = this.streamFiles && !streamInfo["file"].dir;
		if (streamedContent) {
			var record = generateZipParts(streamInfo, streamedContent, false, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
			this.push({
				data: record.fileRecord,
				meta: { percent: 0 }
			});
		} else this.accumulate = true;
	};
	/**
	* The worker finished a source (an other worker).
	* @param {Object} streamInfo the streamInfo object from the finished source.
	*/
	ZipFileWorker.prototype.closedSource = function(streamInfo) {
		this.accumulate = false;
		var streamedContent = this.streamFiles && !streamInfo["file"].dir;
		var record = generateZipParts(streamInfo, streamedContent, true, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
		this.dirRecords.push(record.dirRecord);
		if (streamedContent) this.push({
			data: generateDataDescriptors(streamInfo),
			meta: { percent: 100 }
		});
		else {
			this.push({
				data: record.fileRecord,
				meta: { percent: 0 }
			});
			while (this.contentBuffer.length) this.push(this.contentBuffer.shift());
		}
		this.currentFile = null;
	};
	/**
	* @see GenericWorker.flush
	*/
	ZipFileWorker.prototype.flush = function() {
		var localDirLength = this.bytesWritten;
		for (var i = 0; i < this.dirRecords.length; i++) this.push({
			data: this.dirRecords[i],
			meta: { percent: 100 }
		});
		var centralDirLength = this.bytesWritten - localDirLength;
		var dirEnd = generateCentralDirectoryEnd(this.dirRecords.length, centralDirLength, localDirLength, this.zipComment, this.encodeFileName);
		this.push({
			data: dirEnd,
			meta: { percent: 100 }
		});
	};
	/**
	* Prepare the next source to be read.
	*/
	ZipFileWorker.prototype.prepareNextSource = function() {
		this.previous = this._sources.shift();
		this.openedSource(this.previous.streamInfo);
		if (this.isPaused) this.previous.pause();
		else this.previous.resume();
	};
	/**
	* @see GenericWorker.registerPrevious
	*/
	ZipFileWorker.prototype.registerPrevious = function(previous) {
		this._sources.push(previous);
		var self = this;
		previous.on("data", function(chunk) {
			self.processChunk(chunk);
		});
		previous.on("end", function() {
			self.closedSource(self.previous.streamInfo);
			if (self._sources.length) self.prepareNextSource();
			else self.end();
		});
		previous.on("error", function(e) {
			self.error(e);
		});
		return this;
	};
	/**
	* @see GenericWorker.resume
	*/
	ZipFileWorker.prototype.resume = function() {
		if (!GenericWorker.prototype.resume.call(this)) return false;
		if (!this.previous && this._sources.length) {
			this.prepareNextSource();
			return true;
		}
		if (!this.previous && !this._sources.length && !this.generatedError) {
			this.end();
			return true;
		}
	};
	/**
	* @see GenericWorker.error
	*/
	ZipFileWorker.prototype.error = function(e) {
		var sources = this._sources;
		if (!GenericWorker.prototype.error.call(this, e)) return false;
		for (var i = 0; i < sources.length; i++) try {
			sources[i].error(e);
		} catch (e) {}
		return true;
	};
	/**
	* @see GenericWorker.lock
	*/
	ZipFileWorker.prototype.lock = function() {
		GenericWorker.prototype.lock.call(this);
		var sources = this._sources;
		for (var i = 0; i < sources.length; i++) sources[i].lock();
	};
	module.exports = ZipFileWorker;
}));
//#endregion
//#region node_modules/jszip/lib/generate/index.js
var require_generate = /* @__PURE__ */ __commonJSMin(((exports) => {
	var compressions = require_compressions();
	var ZipFileWorker = require_ZipFileWorker();
	/**
	* Find the compression to use.
	* @param {String} fileCompression the compression defined at the file level, if any.
	* @param {String} zipCompression the compression defined at the load() level.
	* @return {Object} the compression object to use.
	*/
	var getCompression = function(fileCompression, zipCompression) {
		var compressionName = fileCompression || zipCompression;
		var compression = compressions[compressionName];
		if (!compression) throw new Error(compressionName + " is not a valid compression method !");
		return compression;
	};
	/**
	* Create a worker to generate a zip file.
	* @param {JSZip} zip the JSZip instance at the right root level.
	* @param {Object} options to generate the zip file.
	* @param {String} comment the comment to use.
	*/
	exports.generateWorker = function(zip, options, comment) {
		var zipFileWorker = new ZipFileWorker(options.streamFiles, comment, options.platform, options.encodeFileName);
		var entriesCount = 0;
		try {
			zip.forEach(function(relativePath, file) {
				entriesCount++;
				var compression = getCompression(file.options.compression, options.compression);
				var compressionOptions = file.options.compressionOptions || options.compressionOptions || {};
				var dir = file.dir, date = file.date;
				file._compressWorker(compression, compressionOptions).withStreamInfo("file", {
					name: relativePath,
					dir,
					date,
					comment: file.comment || "",
					unixPermissions: file.unixPermissions,
					dosPermissions: file.dosPermissions
				}).pipe(zipFileWorker);
			});
			zipFileWorker.entriesCount = entriesCount;
		} catch (e) {
			zipFileWorker.error(e);
		}
		return zipFileWorker;
	};
}));
//#endregion
//#region node_modules/jszip/lib/nodejs/NodejsStreamInputAdapter.js
var require_NodejsStreamInputAdapter = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var utils = require_utils$1();
	var GenericWorker = require_GenericWorker();
	/**
	* A worker that use a nodejs stream as source.
	* @constructor
	* @param {String} filename the name of the file entry for this stream.
	* @param {Readable} stream the nodejs stream.
	*/
	function NodejsStreamInputAdapter(filename, stream) {
		GenericWorker.call(this, "Nodejs stream input adapter for " + filename);
		this._upstreamEnded = false;
		this._bindStream(stream);
	}
	utils.inherits(NodejsStreamInputAdapter, GenericWorker);
	/**
	* Prepare the stream and bind the callbacks on it.
	* Do this ASAP on node 0.10 ! A lazy binding doesn't always work.
	* @param {Stream} stream the nodejs stream to use.
	*/
	NodejsStreamInputAdapter.prototype._bindStream = function(stream) {
		var self = this;
		this._stream = stream;
		stream.pause();
		stream.on("data", function(chunk) {
			self.push({
				data: chunk,
				meta: { percent: 0 }
			});
		}).on("error", function(e) {
			if (self.isPaused) this.generatedError = e;
			else self.error(e);
		}).on("end", function() {
			if (self.isPaused) self._upstreamEnded = true;
			else self.end();
		});
	};
	NodejsStreamInputAdapter.prototype.pause = function() {
		if (!GenericWorker.prototype.pause.call(this)) return false;
		this._stream.pause();
		return true;
	};
	NodejsStreamInputAdapter.prototype.resume = function() {
		if (!GenericWorker.prototype.resume.call(this)) return false;
		if (this._upstreamEnded) this.end();
		else this._stream.resume();
		return true;
	};
	module.exports = NodejsStreamInputAdapter;
}));
//#endregion
//#region node_modules/jszip/lib/object.js
var require_object = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var utf8 = require_utf8();
	var utils = require_utils$1();
	var GenericWorker = require_GenericWorker();
	var StreamHelper = require_StreamHelper();
	var defaults = require_defaults();
	var CompressedObject = require_compressedObject();
	var ZipObject = require_zipObject();
	var generate = require_generate();
	var nodejsUtils = require_nodejsUtils();
	var NodejsStreamInputAdapter = require_NodejsStreamInputAdapter();
	/**
	* Add a file in the current folder.
	* @private
	* @param {string} name the name of the file
	* @param {String|ArrayBuffer|Uint8Array|Buffer} data the data of the file
	* @param {Object} originalOptions the options of the file
	* @return {Object} the new file.
	*/
	var fileAdd = function(name, data, originalOptions) {
		var dataType = utils.getTypeOf(data), parent;
		var o = utils.extend(originalOptions || {}, defaults);
		o.date = o.date || /* @__PURE__ */ new Date();
		if (o.compression !== null) o.compression = o.compression.toUpperCase();
		if (typeof o.unixPermissions === "string") o.unixPermissions = parseInt(o.unixPermissions, 8);
		if (o.unixPermissions && o.unixPermissions & 16384) o.dir = true;
		if (o.dosPermissions && o.dosPermissions & 16) o.dir = true;
		if (o.dir) name = forceTrailingSlash(name);
		if (o.createFolders && (parent = parentFolder(name))) folderAdd.call(this, parent, true);
		var isUnicodeString = dataType === "string" && o.binary === false && o.base64 === false;
		if (!originalOptions || typeof originalOptions.binary === "undefined") o.binary = !isUnicodeString;
		if (data instanceof CompressedObject && data.uncompressedSize === 0 || o.dir || !data || data.length === 0) {
			o.base64 = false;
			o.binary = true;
			data = "";
			o.compression = "STORE";
			dataType = "string";
		}
		var zipObjectContent = null;
		if (data instanceof CompressedObject || data instanceof GenericWorker) zipObjectContent = data;
		else if (nodejsUtils.isNode && nodejsUtils.isStream(data)) zipObjectContent = new NodejsStreamInputAdapter(name, data);
		else zipObjectContent = utils.prepareContent(name, data, o.binary, o.optimizedBinaryString, o.base64);
		var object = new ZipObject(name, zipObjectContent, o);
		this.files[name] = object;
	};
	/**
	* Find the parent folder of the path.
	* @private
	* @param {string} path the path to use
	* @return {string} the parent folder, or ""
	*/
	var parentFolder = function(path) {
		if (path.slice(-1) === "/") path = path.substring(0, path.length - 1);
		var lastSlash = path.lastIndexOf("/");
		return lastSlash > 0 ? path.substring(0, lastSlash) : "";
	};
	/**
	* Returns the path with a slash at the end.
	* @private
	* @param {String} path the path to check.
	* @return {String} the path with a trailing slash.
	*/
	var forceTrailingSlash = function(path) {
		if (path.slice(-1) !== "/") path += "/";
		return path;
	};
	/**
	* Add a (sub) folder in the current folder.
	* @private
	* @param {string} name the folder's name
	* @param {boolean=} [createFolders] If true, automatically create sub
	*  folders. Defaults to false.
	* @return {Object} the new folder.
	*/
	var folderAdd = function(name, createFolders) {
		createFolders = typeof createFolders !== "undefined" ? createFolders : defaults.createFolders;
		name = forceTrailingSlash(name);
		if (!this.files[name]) fileAdd.call(this, name, null, {
			dir: true,
			createFolders
		});
		return this.files[name];
	};
	/**
	* Cross-window, cross-Node-context regular expression detection
	* @param  {Object}  object Anything
	* @return {Boolean}        true if the object is a regular expression,
	* false otherwise
	*/
	function isRegExp(object) {
		return Object.prototype.toString.call(object) === "[object RegExp]";
	}
	module.exports = {
		/**
		* @see loadAsync
		*/
		load: function() {
			throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
		},
		/**
		* Call a callback function for each entry at this folder level.
		* @param {Function} cb the callback function:
		* function (relativePath, file) {...}
		* It takes 2 arguments : the relative path and the file.
		*/
		forEach: function(cb) {
			var filename, relativePath, file;
			for (filename in this.files) {
				file = this.files[filename];
				relativePath = filename.slice(this.root.length, filename.length);
				if (relativePath && filename.slice(0, this.root.length) === this.root) cb(relativePath, file);
			}
		},
		/**
		* Filter nested files/folders with the specified function.
		* @param {Function} search the predicate to use :
		* function (relativePath, file) {...}
		* It takes 2 arguments : the relative path and the file.
		* @return {Array} An array of matching elements.
		*/
		filter: function(search) {
			var result = [];
			this.forEach(function(relativePath, entry) {
				if (search(relativePath, entry)) result.push(entry);
			});
			return result;
		},
		/**
		* Add a file to the zip file, or search a file.
		* @param   {string|RegExp} name The name of the file to add (if data is defined),
		* the name of the file to find (if no data) or a regex to match files.
		* @param   {String|ArrayBuffer|Uint8Array|Buffer} data  The file data, either raw or base64 encoded
		* @param   {Object} o     File options
		* @return  {JSZip|Object|Array} this JSZip object (when adding a file),
		* a file (when searching by string) or an array of files (when searching by regex).
		*/
		file: function(name, data, o) {
			if (arguments.length === 1) {
				if (isRegExp(name)) {
					var regexp = name;
					return this.filter(function(relativePath, file) {
						return !file.dir && regexp.test(relativePath);
					});
				} else {
					var obj = this.files[this.root + name];
					if (obj && !obj.dir) return obj;
					else return null;
				}
			} else {
				name = this.root + name;
				fileAdd.call(this, name, data, o);
			}
			return this;
		},
		/**
		* Add a directory to the zip file, or search.
		* @param   {String|RegExp} arg The name of the directory to add, or a regex to search folders.
		* @return  {JSZip} an object with the new directory as the root, or an array containing matching folders.
		*/
		folder: function(arg) {
			if (!arg) return this;
			if (isRegExp(arg)) return this.filter(function(relativePath, file) {
				return file.dir && arg.test(relativePath);
			});
			var name = this.root + arg;
			var newFolder = folderAdd.call(this, name);
			var ret = this.clone();
			ret.root = newFolder.name;
			return ret;
		},
		/**
		* Delete a file, or a directory and all sub-files, from the zip
		* @param {string} name the name of the file to delete
		* @return {JSZip} this JSZip object
		*/
		remove: function(name) {
			name = this.root + name;
			var file = this.files[name];
			if (!file) {
				if (name.slice(-1) !== "/") name += "/";
				file = this.files[name];
			}
			if (file && !file.dir) delete this.files[name];
			else {
				var kids = this.filter(function(relativePath, file) {
					return file.name.slice(0, name.length) === name;
				});
				for (var i = 0; i < kids.length; i++) delete this.files[kids[i].name];
			}
			return this;
		},
		/**
		* @deprecated This method has been removed in JSZip 3.0, please check the upgrade guide.
		*/
		generate: function() {
			throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
		},
		/**
		* Generate the complete zip file as an internal stream.
		* @param {Object} options the options to generate the zip file :
		* - compression, "STORE" by default.
		* - type, "base64" by default. Values are : string, base64, uint8array, arraybuffer, blob.
		* @return {StreamHelper} the streamed zip file.
		*/
		generateInternalStream: function(options) {
			var worker, opts = {};
			try {
				opts = utils.extend(options || {}, {
					streamFiles: false,
					compression: "STORE",
					compressionOptions: null,
					type: "",
					platform: "DOS",
					comment: null,
					mimeType: "application/zip",
					encodeFileName: utf8.utf8encode
				});
				opts.type = opts.type.toLowerCase();
				opts.compression = opts.compression.toUpperCase();
				if (opts.type === "binarystring") opts.type = "string";
				if (!opts.type) throw new Error("No output type specified.");
				utils.checkSupport(opts.type);
				if (opts.platform === "darwin" || opts.platform === "freebsd" || opts.platform === "linux" || opts.platform === "sunos") opts.platform = "UNIX";
				if (opts.platform === "win32") opts.platform = "DOS";
				var comment = opts.comment || this.comment || "";
				worker = generate.generateWorker(this, opts, comment);
			} catch (e) {
				worker = new GenericWorker("error");
				worker.error(e);
			}
			return new StreamHelper(worker, opts.type || "string", opts.mimeType);
		},
		/**
		* Generate the complete zip file asynchronously.
		* @see generateInternalStream
		*/
		generateAsync: function(options, onUpdate) {
			return this.generateInternalStream(options).accumulate(onUpdate);
		},
		/**
		* Generate the complete zip file asynchronously.
		* @see generateInternalStream
		*/
		generateNodeStream: function(options, onUpdate) {
			options = options || {};
			if (!options.type) options.type = "nodebuffer";
			return this.generateInternalStream(options).toNodejsStream(onUpdate);
		}
	};
}));
//#endregion
//#region node_modules/jszip/lib/reader/DataReader.js
var require_DataReader = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var utils = require_utils$1();
	function DataReader(data) {
		this.data = data;
		this.length = data.length;
		this.index = 0;
		this.zero = 0;
	}
	DataReader.prototype = {
		/**
		* Check that the offset will not go too far.
		* @param {string} offset the additional offset to check.
		* @throws {Error} an Error if the offset is out of bounds.
		*/
		checkOffset: function(offset) {
			this.checkIndex(this.index + offset);
		},
		/**
		* Check that the specified index will not be too far.
		* @param {string} newIndex the index to check.
		* @throws {Error} an Error if the index is out of bounds.
		*/
		checkIndex: function(newIndex) {
			if (this.length < this.zero + newIndex || newIndex < 0) throw new Error("End of data reached (data length = " + this.length + ", asked index = " + newIndex + "). Corrupted zip ?");
		},
		/**
		* Change the index.
		* @param {number} newIndex The new index.
		* @throws {Error} if the new index is out of the data.
		*/
		setIndex: function(newIndex) {
			this.checkIndex(newIndex);
			this.index = newIndex;
		},
		/**
		* Skip the next n bytes.
		* @param {number} n the number of bytes to skip.
		* @throws {Error} if the new index is out of the data.
		*/
		skip: function(n) {
			this.setIndex(this.index + n);
		},
		/**
		* Get the byte at the specified index.
		* @param {number} i the index to use.
		* @return {number} a byte.
		*/
		byteAt: function() {},
		/**
		* Get the next number with a given byte size.
		* @param {number} size the number of bytes to read.
		* @return {number} the corresponding number.
		*/
		readInt: function(size) {
			var result = 0, i;
			this.checkOffset(size);
			for (i = this.index + size - 1; i >= this.index; i--) result = (result << 8) + this.byteAt(i);
			this.index += size;
			return result;
		},
		/**
		* Get the next string with a given byte size.
		* @param {number} size the number of bytes to read.
		* @return {string} the corresponding string.
		*/
		readString: function(size) {
			return utils.transformTo("string", this.readData(size));
		},
		/**
		* Get raw data without conversion, <size> bytes.
		* @param {number} size the number of bytes to read.
		* @return {Object} the raw data, implementation specific.
		*/
		readData: function() {},
		/**
		* Find the last occurrence of a zip signature (4 bytes).
		* @param {string} sig the signature to find.
		* @return {number} the index of the last occurrence, -1 if not found.
		*/
		lastIndexOfSignature: function() {},
		/**
		* Read the signature (4 bytes) at the current position and compare it with sig.
		* @param {string} sig the expected signature
		* @return {boolean} true if the signature matches, false otherwise.
		*/
		readAndCheckSignature: function() {},
		/**
		* Get the next date.
		* @return {Date} the date.
		*/
		readDate: function() {
			var dostime = this.readInt(4);
			return new Date(Date.UTC((dostime >> 25 & 127) + 1980, (dostime >> 21 & 15) - 1, dostime >> 16 & 31, dostime >> 11 & 31, dostime >> 5 & 63, (dostime & 31) << 1));
		}
	};
	module.exports = DataReader;
}));
//#endregion
//#region node_modules/jszip/lib/reader/ArrayReader.js
var require_ArrayReader = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var DataReader = require_DataReader();
	var utils = require_utils$1();
	function ArrayReader(data) {
		DataReader.call(this, data);
		for (var i = 0; i < this.data.length; i++) data[i] = data[i] & 255;
	}
	utils.inherits(ArrayReader, DataReader);
	/**
	* @see DataReader.byteAt
	*/
	ArrayReader.prototype.byteAt = function(i) {
		return this.data[this.zero + i];
	};
	/**
	* @see DataReader.lastIndexOfSignature
	*/
	ArrayReader.prototype.lastIndexOfSignature = function(sig) {
		var sig0 = sig.charCodeAt(0), sig1 = sig.charCodeAt(1), sig2 = sig.charCodeAt(2), sig3 = sig.charCodeAt(3);
		for (var i = this.length - 4; i >= 0; --i) if (this.data[i] === sig0 && this.data[i + 1] === sig1 && this.data[i + 2] === sig2 && this.data[i + 3] === sig3) return i - this.zero;
		return -1;
	};
	/**
	* @see DataReader.readAndCheckSignature
	*/
	ArrayReader.prototype.readAndCheckSignature = function(sig) {
		var sig0 = sig.charCodeAt(0), sig1 = sig.charCodeAt(1), sig2 = sig.charCodeAt(2), sig3 = sig.charCodeAt(3), data = this.readData(4);
		return sig0 === data[0] && sig1 === data[1] && sig2 === data[2] && sig3 === data[3];
	};
	/**
	* @see DataReader.readData
	*/
	ArrayReader.prototype.readData = function(size) {
		this.checkOffset(size);
		if (size === 0) return [];
		var result = this.data.slice(this.zero + this.index, this.zero + this.index + size);
		this.index += size;
		return result;
	};
	module.exports = ArrayReader;
}));
//#endregion
//#region node_modules/jszip/lib/reader/StringReader.js
var require_StringReader = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var DataReader = require_DataReader();
	var utils = require_utils$1();
	function StringReader(data) {
		DataReader.call(this, data);
	}
	utils.inherits(StringReader, DataReader);
	/**
	* @see DataReader.byteAt
	*/
	StringReader.prototype.byteAt = function(i) {
		return this.data.charCodeAt(this.zero + i);
	};
	/**
	* @see DataReader.lastIndexOfSignature
	*/
	StringReader.prototype.lastIndexOfSignature = function(sig) {
		return this.data.lastIndexOf(sig) - this.zero;
	};
	/**
	* @see DataReader.readAndCheckSignature
	*/
	StringReader.prototype.readAndCheckSignature = function(sig) {
		return sig === this.readData(4);
	};
	/**
	* @see DataReader.readData
	*/
	StringReader.prototype.readData = function(size) {
		this.checkOffset(size);
		var result = this.data.slice(this.zero + this.index, this.zero + this.index + size);
		this.index += size;
		return result;
	};
	module.exports = StringReader;
}));
//#endregion
//#region node_modules/jszip/lib/reader/Uint8ArrayReader.js
var require_Uint8ArrayReader = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var ArrayReader = require_ArrayReader();
	var utils = require_utils$1();
	function Uint8ArrayReader(data) {
		ArrayReader.call(this, data);
	}
	utils.inherits(Uint8ArrayReader, ArrayReader);
	/**
	* @see DataReader.readData
	*/
	Uint8ArrayReader.prototype.readData = function(size) {
		this.checkOffset(size);
		if (size === 0) return /* @__PURE__ */ new Uint8Array(0);
		var result = this.data.subarray(this.zero + this.index, this.zero + this.index + size);
		this.index += size;
		return result;
	};
	module.exports = Uint8ArrayReader;
}));
//#endregion
//#region node_modules/jszip/lib/reader/NodeBufferReader.js
var require_NodeBufferReader = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Uint8ArrayReader = require_Uint8ArrayReader();
	var utils = require_utils$1();
	function NodeBufferReader(data) {
		Uint8ArrayReader.call(this, data);
	}
	utils.inherits(NodeBufferReader, Uint8ArrayReader);
	/**
	* @see DataReader.readData
	*/
	NodeBufferReader.prototype.readData = function(size) {
		this.checkOffset(size);
		var result = this.data.slice(this.zero + this.index, this.zero + this.index + size);
		this.index += size;
		return result;
	};
	module.exports = NodeBufferReader;
}));
//#endregion
//#region node_modules/jszip/lib/reader/readerFor.js
var require_readerFor = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var utils = require_utils$1();
	var support = require_support();
	var ArrayReader = require_ArrayReader();
	var StringReader = require_StringReader();
	var NodeBufferReader = require_NodeBufferReader();
	var Uint8ArrayReader = require_Uint8ArrayReader();
	/**
	* Create a reader adapted to the data.
	* @param {String|ArrayBuffer|Uint8Array|Buffer} data the data to read.
	* @return {DataReader} the data reader.
	*/
	module.exports = function(data) {
		var type = utils.getTypeOf(data);
		utils.checkSupport(type);
		if (type === "string" && !support.uint8array) return new StringReader(data);
		if (type === "nodebuffer") return new NodeBufferReader(data);
		if (support.uint8array) return new Uint8ArrayReader(utils.transformTo("uint8array", data));
		return new ArrayReader(utils.transformTo("array", data));
	};
}));
//#endregion
//#region node_modules/jszip/lib/zipEntry.js
var require_zipEntry = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var readerFor = require_readerFor();
	var utils = require_utils$1();
	var CompressedObject = require_compressedObject();
	var crc32fn = require_crc32();
	var utf8 = require_utf8();
	var compressions = require_compressions();
	var support = require_support();
	var MADE_BY_DOS = 0;
	var MADE_BY_UNIX = 3;
	/**
	* Find a compression registered in JSZip.
	* @param {string} compressionMethod the method magic to find.
	* @return {Object|null} the JSZip compression object, null if none found.
	*/
	var findCompression = function(compressionMethod) {
		for (var method in compressions) {
			if (!Object.prototype.hasOwnProperty.call(compressions, method)) continue;
			if (compressions[method].magic === compressionMethod) return compressions[method];
		}
		return null;
	};
	/**
	* An entry in the zip file.
	* @constructor
	* @param {Object} options Options of the current file.
	* @param {Object} loadOptions Options for loading the stream.
	*/
	function ZipEntry(options, loadOptions) {
		this.options = options;
		this.loadOptions = loadOptions;
	}
	ZipEntry.prototype = {
		/**
		* say if the file is encrypted.
		* @return {boolean} true if the file is encrypted, false otherwise.
		*/
		isEncrypted: function() {
			return (this.bitFlag & 1) === 1;
		},
		/**
		* say if the file has utf-8 filename/comment.
		* @return {boolean} true if the filename/comment is in utf-8, false otherwise.
		*/
		useUTF8: function() {
			return (this.bitFlag & 2048) === 2048;
		},
		/**
		* Read the local part of a zip file and add the info in this object.
		* @param {DataReader} reader the reader to use.
		*/
		readLocalPart: function(reader) {
			var compression, localExtraFieldsLength;
			reader.skip(22);
			this.fileNameLength = reader.readInt(2);
			localExtraFieldsLength = reader.readInt(2);
			this.fileName = reader.readData(this.fileNameLength);
			reader.skip(localExtraFieldsLength);
			if (this.compressedSize === -1 || this.uncompressedSize === -1) throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");
			compression = findCompression(this.compressionMethod);
			if (compression === null) throw new Error("Corrupted zip : compression " + utils.pretty(this.compressionMethod) + " unknown (inner file : " + utils.transformTo("string", this.fileName) + ")");
			this.decompressed = new CompressedObject(this.compressedSize, this.uncompressedSize, this.crc32, compression, reader.readData(this.compressedSize));
		},
		/**
		* Read the central part of a zip file and add the info in this object.
		* @param {DataReader} reader the reader to use.
		*/
		readCentralPart: function(reader) {
			this.versionMadeBy = reader.readInt(2);
			reader.skip(2);
			this.bitFlag = reader.readInt(2);
			this.compressionMethod = reader.readString(2);
			this.date = reader.readDate();
			this.crc32 = reader.readInt(4);
			this.compressedSize = reader.readInt(4);
			this.uncompressedSize = reader.readInt(4);
			var fileNameLength = reader.readInt(2);
			this.extraFieldsLength = reader.readInt(2);
			this.fileCommentLength = reader.readInt(2);
			this.diskNumberStart = reader.readInt(2);
			this.internalFileAttributes = reader.readInt(2);
			this.externalFileAttributes = reader.readInt(4);
			this.localHeaderOffset = reader.readInt(4);
			if (this.isEncrypted()) throw new Error("Encrypted zip are not supported");
			reader.skip(fileNameLength);
			this.readExtraFields(reader);
			this.parseZIP64ExtraField(reader);
			this.fileComment = reader.readData(this.fileCommentLength);
		},
		/**
		* Parse the external file attributes and get the unix/dos permissions.
		*/
		processAttributes: function() {
			this.unixPermissions = null;
			this.dosPermissions = null;
			var madeBy = this.versionMadeBy >> 8;
			this.dir = this.externalFileAttributes & 16 ? true : false;
			if (madeBy === MADE_BY_DOS) this.dosPermissions = this.externalFileAttributes & 63;
			if (madeBy === MADE_BY_UNIX) this.unixPermissions = this.externalFileAttributes >> 16 & 65535;
			if (!this.dir && this.fileNameStr.slice(-1) === "/") this.dir = true;
		},
		/**
		* Parse the ZIP64 extra field and merge the info in the current ZipEntry.
		* @param {DataReader} reader the reader to use.
		*/
		parseZIP64ExtraField: function() {
			if (!this.extraFields[1]) return;
			var extraReader = readerFor(this.extraFields[1].value);
			if (this.uncompressedSize === utils.MAX_VALUE_32BITS) this.uncompressedSize = extraReader.readInt(8);
			if (this.compressedSize === utils.MAX_VALUE_32BITS) this.compressedSize = extraReader.readInt(8);
			if (this.localHeaderOffset === utils.MAX_VALUE_32BITS) this.localHeaderOffset = extraReader.readInt(8);
			if (this.diskNumberStart === utils.MAX_VALUE_32BITS) this.diskNumberStart = extraReader.readInt(4);
		},
		/**
		* Read the central part of a zip file and add the info in this object.
		* @param {DataReader} reader the reader to use.
		*/
		readExtraFields: function(reader) {
			var end = reader.index + this.extraFieldsLength, extraFieldId, extraFieldLength, extraFieldValue;
			if (!this.extraFields) this.extraFields = {};
			while (reader.index + 4 < end) {
				extraFieldId = reader.readInt(2);
				extraFieldLength = reader.readInt(2);
				extraFieldValue = reader.readData(extraFieldLength);
				this.extraFields[extraFieldId] = {
					id: extraFieldId,
					length: extraFieldLength,
					value: extraFieldValue
				};
			}
			reader.setIndex(end);
		},
		/**
		* Apply an UTF8 transformation if needed.
		*/
		handleUTF8: function() {
			var decodeParamType = support.uint8array ? "uint8array" : "array";
			if (this.useUTF8()) {
				this.fileNameStr = utf8.utf8decode(this.fileName);
				this.fileCommentStr = utf8.utf8decode(this.fileComment);
			} else {
				var upath = this.findExtraFieldUnicodePath();
				if (upath !== null) this.fileNameStr = upath;
				else {
					var fileNameByteArray = utils.transformTo(decodeParamType, this.fileName);
					this.fileNameStr = this.loadOptions.decodeFileName(fileNameByteArray);
				}
				var ucomment = this.findExtraFieldUnicodeComment();
				if (ucomment !== null) this.fileCommentStr = ucomment;
				else {
					var commentByteArray = utils.transformTo(decodeParamType, this.fileComment);
					this.fileCommentStr = this.loadOptions.decodeFileName(commentByteArray);
				}
			}
		},
		/**
		* Find the unicode path declared in the extra field, if any.
		* @return {String} the unicode path, null otherwise.
		*/
		findExtraFieldUnicodePath: function() {
			var upathField = this.extraFields[28789];
			if (upathField) {
				var extraReader = readerFor(upathField.value);
				if (extraReader.readInt(1) !== 1) return null;
				if (crc32fn(this.fileName) !== extraReader.readInt(4)) return null;
				return utf8.utf8decode(extraReader.readData(upathField.length - 5));
			}
			return null;
		},
		/**
		* Find the unicode comment declared in the extra field, if any.
		* @return {String} the unicode comment, null otherwise.
		*/
		findExtraFieldUnicodeComment: function() {
			var ucommentField = this.extraFields[25461];
			if (ucommentField) {
				var extraReader = readerFor(ucommentField.value);
				if (extraReader.readInt(1) !== 1) return null;
				if (crc32fn(this.fileComment) !== extraReader.readInt(4)) return null;
				return utf8.utf8decode(extraReader.readData(ucommentField.length - 5));
			}
			return null;
		}
	};
	module.exports = ZipEntry;
}));
//#endregion
//#region node_modules/jszip/lib/zipEntries.js
var require_zipEntries = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var readerFor = require_readerFor();
	var utils = require_utils$1();
	var sig = require_signature();
	var ZipEntry = require_zipEntry();
	var support = require_support();
	/**
	* All the entries in the zip file.
	* @constructor
	* @param {Object} loadOptions Options for loading the stream.
	*/
	function ZipEntries(loadOptions) {
		this.files = [];
		this.loadOptions = loadOptions;
	}
	ZipEntries.prototype = {
		/**
		* Check that the reader is on the specified signature.
		* @param {string} expectedSignature the expected signature.
		* @throws {Error} if it is an other signature.
		*/
		checkSignature: function(expectedSignature) {
			if (!this.reader.readAndCheckSignature(expectedSignature)) {
				this.reader.index -= 4;
				var signature = this.reader.readString(4);
				throw new Error("Corrupted zip or bug: unexpected signature (" + utils.pretty(signature) + ", expected " + utils.pretty(expectedSignature) + ")");
			}
		},
		/**
		* Check if the given signature is at the given index.
		* @param {number} askedIndex the index to check.
		* @param {string} expectedSignature the signature to expect.
		* @return {boolean} true if the signature is here, false otherwise.
		*/
		isSignature: function(askedIndex, expectedSignature) {
			var currentIndex = this.reader.index;
			this.reader.setIndex(askedIndex);
			var result = this.reader.readString(4) === expectedSignature;
			this.reader.setIndex(currentIndex);
			return result;
		},
		/**
		* Read the end of the central directory.
		*/
		readBlockEndOfCentral: function() {
			this.diskNumber = this.reader.readInt(2);
			this.diskWithCentralDirStart = this.reader.readInt(2);
			this.centralDirRecordsOnThisDisk = this.reader.readInt(2);
			this.centralDirRecords = this.reader.readInt(2);
			this.centralDirSize = this.reader.readInt(4);
			this.centralDirOffset = this.reader.readInt(4);
			this.zipCommentLength = this.reader.readInt(2);
			var zipComment = this.reader.readData(this.zipCommentLength);
			var decodeParamType = support.uint8array ? "uint8array" : "array";
			var decodeContent = utils.transformTo(decodeParamType, zipComment);
			this.zipComment = this.loadOptions.decodeFileName(decodeContent);
		},
		/**
		* Read the end of the Zip 64 central directory.
		* Not merged with the method readEndOfCentral :
		* The end of central can coexist with its Zip64 brother,
		* I don't want to read the wrong number of bytes !
		*/
		readBlockZip64EndOfCentral: function() {
			this.zip64EndOfCentralSize = this.reader.readInt(8);
			this.reader.skip(4);
			this.diskNumber = this.reader.readInt(4);
			this.diskWithCentralDirStart = this.reader.readInt(4);
			this.centralDirRecordsOnThisDisk = this.reader.readInt(8);
			this.centralDirRecords = this.reader.readInt(8);
			this.centralDirSize = this.reader.readInt(8);
			this.centralDirOffset = this.reader.readInt(8);
			this.zip64ExtensibleData = {};
			var extraDataSize = this.zip64EndOfCentralSize - 44, index = 0, extraFieldId, extraFieldLength, extraFieldValue;
			while (index < extraDataSize) {
				extraFieldId = this.reader.readInt(2);
				extraFieldLength = this.reader.readInt(4);
				extraFieldValue = this.reader.readData(extraFieldLength);
				this.zip64ExtensibleData[extraFieldId] = {
					id: extraFieldId,
					length: extraFieldLength,
					value: extraFieldValue
				};
			}
		},
		/**
		* Read the end of the Zip 64 central directory locator.
		*/
		readBlockZip64EndOfCentralLocator: function() {
			this.diskWithZip64CentralDirStart = this.reader.readInt(4);
			this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8);
			this.disksCount = this.reader.readInt(4);
			if (this.disksCount > 1) throw new Error("Multi-volumes zip are not supported");
		},
		/**
		* Read the local files, based on the offset read in the central part.
		*/
		readLocalFiles: function() {
			var i = 0, file;
			for (; i < this.files.length; i++) {
				file = this.files[i];
				this.reader.setIndex(file.localHeaderOffset);
				this.checkSignature(sig.LOCAL_FILE_HEADER);
				file.readLocalPart(this.reader);
				file.handleUTF8();
				file.processAttributes();
			}
		},
		/**
		* Read the central directory.
		*/
		readCentralDir: function() {
			var file;
			this.reader.setIndex(this.centralDirOffset);
			while (this.reader.readAndCheckSignature(sig.CENTRAL_FILE_HEADER)) {
				file = new ZipEntry({ zip64: this.zip64 }, this.loadOptions);
				file.readCentralPart(this.reader);
				this.files.push(file);
			}
			if (this.centralDirRecords !== this.files.length) {
				if (this.centralDirRecords !== 0 && this.files.length === 0) throw new Error("Corrupted zip or bug: expected " + this.centralDirRecords + " records in central dir, got " + this.files.length);
			}
		},
		/**
		* Read the end of central directory.
		*/
		readEndOfCentral: function() {
			var offset = this.reader.lastIndexOfSignature(sig.CENTRAL_DIRECTORY_END);
			if (offset < 0) {
				if (!this.isSignature(0, sig.LOCAL_FILE_HEADER)) throw new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html");
				else throw new Error("Corrupted zip: can't find end of central directory");
			}
			this.reader.setIndex(offset);
			var endOfCentralDirOffset = offset;
			this.checkSignature(sig.CENTRAL_DIRECTORY_END);
			this.readBlockEndOfCentral();
			if (this.diskNumber === utils.MAX_VALUE_16BITS || this.diskWithCentralDirStart === utils.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === utils.MAX_VALUE_16BITS || this.centralDirRecords === utils.MAX_VALUE_16BITS || this.centralDirSize === utils.MAX_VALUE_32BITS || this.centralDirOffset === utils.MAX_VALUE_32BITS) {
				this.zip64 = true;
				offset = this.reader.lastIndexOfSignature(sig.ZIP64_CENTRAL_DIRECTORY_LOCATOR);
				if (offset < 0) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");
				this.reader.setIndex(offset);
				this.checkSignature(sig.ZIP64_CENTRAL_DIRECTORY_LOCATOR);
				this.readBlockZip64EndOfCentralLocator();
				if (!this.isSignature(this.relativeOffsetEndOfZip64CentralDir, sig.ZIP64_CENTRAL_DIRECTORY_END)) {
					this.relativeOffsetEndOfZip64CentralDir = this.reader.lastIndexOfSignature(sig.ZIP64_CENTRAL_DIRECTORY_END);
					if (this.relativeOffsetEndOfZip64CentralDir < 0) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");
				}
				this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir);
				this.checkSignature(sig.ZIP64_CENTRAL_DIRECTORY_END);
				this.readBlockZip64EndOfCentral();
			}
			var expectedEndOfCentralDirOffset = this.centralDirOffset + this.centralDirSize;
			if (this.zip64) {
				expectedEndOfCentralDirOffset += 20;
				expectedEndOfCentralDirOffset += 12 + this.zip64EndOfCentralSize;
			}
			var extraBytes = endOfCentralDirOffset - expectedEndOfCentralDirOffset;
			if (extraBytes > 0) {
				if (this.isSignature(endOfCentralDirOffset, sig.CENTRAL_FILE_HEADER)) {} else this.reader.zero = extraBytes;
			} else if (extraBytes < 0) throw new Error("Corrupted zip: missing " + Math.abs(extraBytes) + " bytes.");
		},
		prepareReader: function(data) {
			this.reader = readerFor(data);
		},
		/**
		* Read a zip file and create ZipEntries.
		* @param {String|ArrayBuffer|Uint8Array|Buffer} data the binary string representing a zip file.
		*/
		load: function(data) {
			this.prepareReader(data);
			this.readEndOfCentral();
			this.readCentralDir();
			this.readLocalFiles();
		}
	};
	module.exports = ZipEntries;
}));
//#endregion
//#region node_modules/jszip/lib/load.js
var require_load = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var utils = require_utils$1();
	var external = require_external();
	var utf8 = require_utf8();
	var ZipEntries = require_zipEntries();
	var Crc32Probe = require_Crc32Probe();
	var nodejsUtils = require_nodejsUtils();
	/**
	* Check the CRC32 of an entry.
	* @param {ZipEntry} zipEntry the zip entry to check.
	* @return {Promise} the result.
	*/
	function checkEntryCRC32(zipEntry) {
		return new external.Promise(function(resolve, reject) {
			var worker = zipEntry.decompressed.getContentWorker().pipe(new Crc32Probe());
			worker.on("error", function(e) {
				reject(e);
			}).on("end", function() {
				if (worker.streamInfo.crc32 !== zipEntry.decompressed.crc32) reject(/* @__PURE__ */ new Error("Corrupted zip : CRC32 mismatch"));
				else resolve();
			}).resume();
		});
	}
	module.exports = function(data, options) {
		var zip = this;
		options = utils.extend(options || {}, {
			base64: false,
			checkCRC32: false,
			optimizedBinaryString: false,
			createFolders: false,
			decodeFileName: utf8.utf8decode
		});
		if (nodejsUtils.isNode && nodejsUtils.isStream(data)) return external.Promise.reject(/* @__PURE__ */ new Error("JSZip can't accept a stream when loading a zip file."));
		return utils.prepareContent("the loaded zip file", data, true, options.optimizedBinaryString, options.base64).then(function(data) {
			var zipEntries = new ZipEntries(options);
			zipEntries.load(data);
			return zipEntries;
		}).then(function checkCRC32(zipEntries) {
			var promises = [external.Promise.resolve(zipEntries)];
			var files = zipEntries.files;
			if (options.checkCRC32) for (var i = 0; i < files.length; i++) promises.push(checkEntryCRC32(files[i]));
			return external.Promise.all(promises);
		}).then(function addFiles(results) {
			var zipEntries = results.shift();
			var files = zipEntries.files;
			for (var i = 0; i < files.length; i++) {
				var input = files[i];
				var unsafeName = input.fileNameStr;
				var safeName = utils.resolve(input.fileNameStr);
				zip.file(safeName, input.decompressed, {
					binary: true,
					optimizedBinaryString: true,
					date: input.date,
					dir: input.dir,
					comment: input.fileCommentStr.length ? input.fileCommentStr : null,
					unixPermissions: input.unixPermissions,
					dosPermissions: input.dosPermissions,
					createFolders: options.createFolders
				});
				if (!input.dir) zip.file(safeName).unsafeOriginalName = unsafeName;
			}
			if (zipEntries.zipComment.length) zip.comment = zipEntries.zipComment;
			return zip;
		});
	};
}));
//#endregion
//#region node_modules/jszip/lib/index.js
var require_lib = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* Representation a of zip file in js
	* @constructor
	*/
	function JSZip() {
		if (!(this instanceof JSZip)) return new JSZip();
		if (arguments.length) throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");
		this.files = Object.create(null);
		this.comment = null;
		this.root = "";
		this.clone = function() {
			var newObj = new JSZip();
			for (var i in this) if (typeof this[i] !== "function") newObj[i] = this[i];
			return newObj;
		};
	}
	JSZip.prototype = require_object();
	JSZip.prototype.loadAsync = require_load();
	JSZip.support = require_support();
	JSZip.defaults = require_defaults();
	JSZip.version = "3.10.1";
	JSZip.loadAsync = function(content, options) {
		return new JSZip().loadAsync(content, options);
	};
	JSZip.external = require_external();
	module.exports = JSZip;
}));
//#endregion
//#region node_modules/exceljs/lib/utils/utils.js
var require_utils = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var fs$8 = __require("fs");
	var inherits = function(cls, superCtor, statics, prototype) {
		cls.super_ = superCtor;
		if (!prototype) {
			prototype = statics;
			statics = null;
		}
		if (statics) Object.keys(statics).forEach((i) => {
			Object.defineProperty(cls, i, Object.getOwnPropertyDescriptor(statics, i));
		});
		const properties = { constructor: {
			value: cls,
			enumerable: false,
			writable: false,
			configurable: true
		} };
		if (prototype) Object.keys(prototype).forEach((i) => {
			properties[i] = Object.getOwnPropertyDescriptor(prototype, i);
		});
		cls.prototype = Object.create(superCtor.prototype, properties);
	};
	var xmlDecodeRegex = /[<>&'"\x7F\x00-\x08\x0B-\x0C\x0E-\x1F]/;
	var utils = {
		nop() {},
		promiseImmediate(value) {
			return new Promise((resolve) => {
				if (global.setImmediate) setImmediate(() => {
					resolve(value);
				});
				else setTimeout(() => {
					resolve(value);
				}, 1);
			});
		},
		inherits,
		dateToExcel(d, date1904) {
			return 25569 + d.getTime() / 864e5 - (date1904 ? 1462 : 0);
		},
		excelToDate(v, date1904) {
			const millisecondSinceEpoch = Math.round((v - 25569 + (date1904 ? 1462 : 0)) * 24 * 3600 * 1e3);
			return new Date(millisecondSinceEpoch);
		},
		parsePath(filepath) {
			const last = filepath.lastIndexOf("/");
			return {
				path: filepath.substring(0, last),
				name: filepath.substring(last + 1)
			};
		},
		getRelsPath(filepath) {
			const path = utils.parsePath(filepath);
			return `${path.path}/_rels/${path.name}.rels`;
		},
		xmlEncode(text) {
			const regexResult = xmlDecodeRegex.exec(text);
			if (!regexResult) return text;
			let result = "";
			let escape = "";
			let lastIndex = 0;
			let i = regexResult.index;
			for (; i < text.length; i++) {
				const charCode = text.charCodeAt(i);
				switch (charCode) {
					case 34:
						escape = "&quot;";
						break;
					case 38:
						escape = "&amp;";
						break;
					case 39:
						escape = "&apos;";
						break;
					case 60:
						escape = "&lt;";
						break;
					case 62:
						escape = "&gt;";
						break;
					case 127:
						escape = "";
						break;
					default:
						if (charCode <= 31 && (charCode <= 8 || charCode >= 11 && charCode !== 13)) {
							escape = "";
							break;
						}
						continue;
				}
				if (lastIndex !== i) result += text.substring(lastIndex, i);
				lastIndex = i + 1;
				if (escape) result += escape;
			}
			if (lastIndex !== i) return result + text.substring(lastIndex, i);
			return result;
		},
		xmlDecode(text) {
			return text.replace(/&([a-z]*);/g, (c) => {
				switch (c) {
					case "&lt;": return "<";
					case "&gt;": return ">";
					case "&amp;": return "&";
					case "&apos;": return "'";
					case "&quot;": return "\"";
					default: return c;
				}
			});
		},
		validInt(value) {
			const i = parseInt(value, 10);
			return !Number.isNaN(i) ? i : 0;
		},
		isDateFmt(fmt) {
			if (!fmt) return false;
			fmt = fmt.replace(/\[[^\]]*]/g, "");
			fmt = fmt.replace(/"[^"]*"/g, "");
			return fmt.match(/[ymdhMsb]+/) !== null;
		},
		fs: { exists(path) {
			return new Promise((resolve) => {
				fs$8.access(path, fs$8.constants.F_OK, (err) => {
					resolve(!err);
				});
			});
		} },
		toIsoDateString(dt) {
			return dt.toIsoString().subsstr(0, 10);
		},
		parseBoolean(value) {
			return value === true || value === "true" || value === 1 || value === "1";
		}
	};
	module.exports = utils;
}));
//#endregion
//#region node_modules/exceljs/lib/utils/string-buf.js
var require_string_buf = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var StringBuf = class {
		constructor(options) {
			this._buf = Buffer.alloc(options && options.size || 16384);
			this._encoding = options && options.encoding || "utf8";
			this._inPos = 0;
			this._buffer = void 0;
		}
		get length() {
			return this._inPos;
		}
		get capacity() {
			return this._buf.length;
		}
		get buffer() {
			return this._buf;
		}
		toBuffer() {
			if (!this._buffer) {
				this._buffer = Buffer.alloc(this.length);
				this._buf.copy(this._buffer, 0, 0, this.length);
			}
			return this._buffer;
		}
		reset(position) {
			position = position || 0;
			this._buffer = void 0;
			this._inPos = position;
		}
		_grow(min) {
			let size = this._buf.length * 2;
			while (size < min) size *= 2;
			const buf = Buffer.alloc(size);
			this._buf.copy(buf, 0);
			this._buf = buf;
		}
		addText(text) {
			this._buffer = void 0;
			let inPos = this._inPos + this._buf.write(text, this._inPos, this._encoding);
			while (inPos >= this._buf.length - 4) {
				this._grow(this._inPos + text.length);
				inPos = this._inPos + this._buf.write(text, this._inPos, this._encoding);
			}
			this._inPos = inPos;
		}
		addStringBuf(inBuf) {
			if (inBuf.length) {
				this._buffer = void 0;
				if (this.length + inBuf.length > this.capacity) this._grow(this.length + inBuf.length);
				inBuf._buf.copy(this._buf, this._inPos, 0, inBuf.length);
				this._inPos += inBuf.length;
			}
		}
	};
	module.exports = StringBuf;
}));
//#endregion
//#region node_modules/exceljs/lib/utils/stream-buf.js
var require_stream_buf = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Stream = require_readable$2();
	var utils = require_utils();
	var StringBuf = require_string_buf();
	var StringChunk = class {
		constructor(data, encoding) {
			this._data = data;
			this._encoding = encoding;
		}
		get length() {
			return this.toBuffer().length;
		}
		copy(target, targetOffset, offset, length) {
			return this.toBuffer().copy(target, targetOffset, offset, length);
		}
		toBuffer() {
			if (!this._buffer) this._buffer = Buffer.from(this._data, this._encoding);
			return this._buffer;
		}
	};
	var StringBufChunk = class {
		constructor(data) {
			this._data = data;
		}
		get length() {
			return this._data.length;
		}
		copy(target, targetOffset, offset, length) {
			return this._data._buf.copy(target, targetOffset, offset, length);
		}
		toBuffer() {
			return this._data.toBuffer();
		}
	};
	var BufferChunk = class {
		constructor(data) {
			this._data = data;
		}
		get length() {
			return this._data.length;
		}
		copy(target, targetOffset, offset, length) {
			this._data.copy(target, targetOffset, offset, length);
		}
		toBuffer() {
			return this._data;
		}
	};
	var ReadWriteBuf = class {
		constructor(size) {
			this.size = size;
			this.buffer = Buffer.alloc(size);
			this.iRead = 0;
			this.iWrite = 0;
		}
		toBuffer() {
			if (this.iRead === 0 && this.iWrite === this.size) return this.buffer;
			const buf = Buffer.alloc(this.iWrite - this.iRead);
			this.buffer.copy(buf, 0, this.iRead, this.iWrite);
			return buf;
		}
		get length() {
			return this.iWrite - this.iRead;
		}
		get eod() {
			return this.iRead === this.iWrite;
		}
		get full() {
			return this.iWrite === this.size;
		}
		read(size) {
			let buf;
			if (size === 0) return null;
			if (size === void 0 || size >= this.length) {
				buf = this.toBuffer();
				this.iRead = this.iWrite;
				return buf;
			}
			buf = Buffer.alloc(size);
			this.buffer.copy(buf, 0, this.iRead, size);
			this.iRead += size;
			return buf;
		}
		write(chunk, offset, length) {
			const size = Math.min(length, this.size - this.iWrite);
			chunk.copy(this.buffer, this.iWrite, offset, offset + size);
			this.iWrite += size;
			return size;
		}
	};
	var StreamBuf = function(options) {
		options = options || {};
		this.bufSize = options.bufSize || 1048576;
		this.buffers = [];
		this.batch = options.batch || false;
		this.corked = false;
		this.inPos = 0;
		this.outPos = 0;
		this.pipes = [];
		this.paused = false;
		this.encoding = null;
	};
	utils.inherits(StreamBuf, Stream.Duplex, {
		toBuffer() {
			switch (this.buffers.length) {
				case 0: return null;
				case 1: return this.buffers[0].toBuffer();
				default: return Buffer.concat(this.buffers.map((rwBuf) => rwBuf.toBuffer()));
			}
		},
		_getWritableBuffer() {
			if (this.buffers.length) {
				const last = this.buffers[this.buffers.length - 1];
				if (!last.full) return last;
			}
			const buf = new ReadWriteBuf(this.bufSize);
			this.buffers.push(buf);
			return buf;
		},
		async _pipe(chunk) {
			const write = function(pipe) {
				return new Promise((resolve) => {
					pipe.write(chunk.toBuffer(), () => {
						resolve();
					});
				});
			};
			await Promise.all(this.pipes.map(write));
		},
		_writeToBuffers(chunk) {
			let inPos = 0;
			const inLen = chunk.length;
			while (inPos < inLen) {
				const buffer = this._getWritableBuffer();
				inPos += buffer.write(chunk, inPos, inLen - inPos);
			}
		},
		async write(data, encoding, callback) {
			if (encoding instanceof Function) {
				callback = encoding;
				encoding = "utf8";
			}
			callback = callback || utils.nop;
			let chunk;
			if (data instanceof StringBuf) chunk = new StringBufChunk(data);
			else if (data instanceof Buffer) chunk = new BufferChunk(data);
			else if (typeof data === "string" || data instanceof String || data instanceof ArrayBuffer) chunk = new StringChunk(data, encoding);
			else throw new Error("Chunk must be one of type String, Buffer or StringBuf.");
			if (this.pipes.length) {
				if (this.batch) {
					this._writeToBuffers(chunk);
					while (!this.corked && this.buffers.length > 1) this._pipe(this.buffers.shift());
				} else if (!this.corked) {
					await this._pipe(chunk);
					callback();
				} else {
					this._writeToBuffers(chunk);
					process.nextTick(callback);
				}
			} else {
				if (!this.paused) this.emit("data", chunk.toBuffer());
				this._writeToBuffers(chunk);
				this.emit("readable");
			}
			return true;
		},
		cork() {
			this.corked = true;
		},
		_flush() {
			if (this.pipes.length) while (this.buffers.length) this._pipe(this.buffers.shift());
		},
		uncork() {
			this.corked = false;
			this._flush();
		},
		end(chunk, encoding, callback) {
			const writeComplete = (error) => {
				if (error) callback(error);
				else {
					this._flush();
					this.pipes.forEach((pipe) => {
						pipe.end();
					});
					this.emit("finish");
				}
			};
			if (chunk) this.write(chunk, encoding, writeComplete);
			else writeComplete();
		},
		read(size) {
			let buffers;
			if (size) {
				buffers = [];
				while (size && this.buffers.length && !this.buffers[0].eod) {
					const first = this.buffers[0];
					const buffer = first.read(size);
					size -= buffer.length;
					buffers.push(buffer);
					if (first.eod && first.full) this.buffers.shift();
				}
				return Buffer.concat(buffers);
			}
			buffers = this.buffers.map((buf) => buf.toBuffer()).filter(Boolean);
			this.buffers = [];
			return Buffer.concat(buffers);
		},
		setEncoding(encoding) {
			this.encoding = encoding;
		},
		pause() {
			this.paused = true;
		},
		resume() {
			this.paused = false;
		},
		isPaused() {
			return !!this.paused;
		},
		pipe(destination) {
			this.pipes.push(destination);
			if (!this.paused && this.buffers.length) this.end();
		},
		unpipe(destination) {
			this.pipes = this.pipes.filter((pipe) => pipe !== destination);
		},
		unshift() {
			throw new Error("Not Implemented");
		},
		wrap() {
			throw new Error("Not Implemented");
		}
	});
	module.exports = StreamBuf;
}));
//#endregion
//#region node_modules/exceljs/lib/utils/browser-buffer-encode.js
var require_browser_buffer_encode = /* @__PURE__ */ __commonJSMin(((exports) => {
	var textEncoder = typeof TextEncoder === "undefined" ? null : new TextEncoder("utf-8");
	var { Buffer: Buffer$2 } = __require("buffer");
	function stringToBuffer(str) {
		if (typeof str !== "string") return str;
		if (textEncoder) return Buffer$2.from(textEncoder.encode(str).buffer);
		return Buffer$2.from(str);
	}
	exports.stringToBuffer = stringToBuffer;
}));
//#endregion
//#region node_modules/exceljs/lib/utils/zip-stream.js
var require_zip_stream = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var events = __require("events");
	var JSZip = require_lib();
	var StreamBuf = require_stream_buf();
	var { stringToBuffer } = require_browser_buffer_encode();
	var ZipWriter = class extends events.EventEmitter {
		constructor(options) {
			super();
			this.options = Object.assign({
				type: "nodebuffer",
				compression: "DEFLATE"
			}, options);
			this.zip = new JSZip();
			this.stream = new StreamBuf();
		}
		append(data, options) {
			if (options.hasOwnProperty("base64") && options.base64) this.zip.file(options.name, data, { base64: true });
			else {
				if (process.browser && typeof data === "string") data = stringToBuffer(data);
				this.zip.file(options.name, data);
			}
		}
		async finalize() {
			const content = await this.zip.generateAsync(this.options);
			this.stream.end(content);
			this.emit("finish");
		}
		read(size) {
			return this.stream.read(size);
		}
		setEncoding(encoding) {
			return this.stream.setEncoding(encoding);
		}
		pause() {
			return this.stream.pause();
		}
		resume() {
			return this.stream.resume();
		}
		isPaused() {
			return this.stream.isPaused();
		}
		pipe(destination, options) {
			return this.stream.pipe(destination, options);
		}
		unpipe(destination) {
			return this.stream.unpipe(destination);
		}
		unshift(chunk) {
			return this.stream.unshift(chunk);
		}
		wrap(stream) {
			return this.stream.wrap(stream);
		}
	};
	module.exports = { ZipWriter };
}));
//#endregion
//#region node_modules/exceljs/lib/utils/xml-stream.js
var require_xml_stream = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var _ = require_under_dash();
	var utils = require_utils();
	var OPEN_ANGLE = "<";
	var CLOSE_ANGLE = ">";
	var OPEN_ANGLE_SLASH = "</";
	var CLOSE_SLASH_ANGLE = "/>";
	function pushAttribute(xml, name, value) {
		xml.push(` ${name}="${utils.xmlEncode(value.toString())}"`);
	}
	function pushAttributes(xml, attributes) {
		if (attributes) {
			const tmp = [];
			_.each(attributes, (value, name) => {
				if (value !== void 0) pushAttribute(tmp, name, value);
			});
			xml.push(tmp.join(""));
		}
	}
	var XmlStream = class {
		constructor() {
			this._xml = [];
			this._stack = [];
			this._rollbacks = [];
		}
		get tos() {
			return this._stack.length ? this._stack[this._stack.length - 1] : void 0;
		}
		get cursor() {
			return this._xml.length;
		}
		openXml(docAttributes) {
			const xml = this._xml;
			xml.push("<?xml");
			pushAttributes(xml, docAttributes);
			xml.push("?>\n");
		}
		openNode(name, attributes) {
			const parent = this.tos;
			const xml = this._xml;
			if (parent && this.open) xml.push(CLOSE_ANGLE);
			this._stack.push(name);
			xml.push(OPEN_ANGLE);
			xml.push(name);
			pushAttributes(xml, attributes);
			this.leaf = true;
			this.open = true;
		}
		addAttribute(name, value) {
			if (!this.open) throw new Error("Cannot write attributes to node if it is not open");
			if (value !== void 0) pushAttribute(this._xml, name, value);
		}
		addAttributes(attrs) {
			if (!this.open) throw new Error("Cannot write attributes to node if it is not open");
			pushAttributes(this._xml, attrs);
		}
		writeText(text) {
			const xml = this._xml;
			if (this.open) {
				xml.push(CLOSE_ANGLE);
				this.open = false;
			}
			this.leaf = false;
			xml.push(utils.xmlEncode(text.toString()));
		}
		writeXml(xml) {
			if (this.open) {
				this._xml.push(CLOSE_ANGLE);
				this.open = false;
			}
			this.leaf = false;
			this._xml.push(xml);
		}
		closeNode() {
			const node = this._stack.pop();
			const xml = this._xml;
			if (this.leaf) xml.push(CLOSE_SLASH_ANGLE);
			else {
				xml.push(OPEN_ANGLE_SLASH);
				xml.push(node);
				xml.push(CLOSE_ANGLE);
			}
			this.open = false;
			this.leaf = false;
		}
		leafNode(name, attributes, text) {
			this.openNode(name, attributes);
			if (text !== void 0) this.writeText(text);
			this.closeNode();
		}
		closeAll() {
			while (this._stack.length) this.closeNode();
		}
		addRollback() {
			this._rollbacks.push({
				xml: this._xml.length,
				stack: this._stack.length,
				leaf: this.leaf,
				open: this.open
			});
			return this.cursor;
		}
		commit() {
			this._rollbacks.pop();
		}
		rollback() {
			const r = this._rollbacks.pop();
			if (this._xml.length > r.xml) this._xml.splice(r.xml, this._xml.length - r.xml);
			if (this._stack.length > r.stack) this._stack.splice(r.stack, this._stack.length - r.stack);
			this.leaf = r.leaf;
			this.open = r.open;
		}
		get xml() {
			this.closeAll();
			return this._xml.join("");
		}
	};
	XmlStream.StdDocAttributes = {
		version: "1.0",
		encoding: "UTF-8",
		standalone: "yes"
	};
	module.exports = XmlStream;
}));
//#endregion
//#region node_modules/exceljs/lib/utils/browser-buffer-decode.js
var require_browser_buffer_decode = /* @__PURE__ */ __commonJSMin(((exports) => {
	var textDecoder = typeof TextDecoder === "undefined" ? null : new TextDecoder("utf-8");
	function bufferToString(chunk) {
		if (typeof chunk === "string") return chunk;
		if (textDecoder) return textDecoder.decode(chunk);
		return chunk.toString();
	}
	exports.bufferToString = bufferToString;
}));
//#endregion
//#region node_modules/xmlchars/xml/1.0/ed5.js
var require_ed5 = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Character classes and associated utilities for the 5th edition of XML 1.0.
	*
	* @author Louis-Dominique Dubeau
	* @license MIT
	* @copyright Louis-Dominique Dubeau
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.CHAR = "	\n\r -퟿-�𐀀-􏿿";
	exports.S = " 	\r\n";
	exports.NAME_START_CHAR = ":A-Z_a-zÀ-ÖØ-öø-˿Ͱ-ͽͿ-῿‌‍⁰-↏Ⰰ-⿯、-퟿豈-﷏ﷰ-�𐀀-󯿿";
	exports.NAME_CHAR = "-" + exports.NAME_START_CHAR + ".0-9·̀-ͯ‿-⁀";
	exports.CHAR_RE = new RegExp("^[" + exports.CHAR + "]$", "u");
	exports.S_RE = new RegExp("^[" + exports.S + "]+$", "u");
	exports.NAME_START_CHAR_RE = new RegExp("^[" + exports.NAME_START_CHAR + "]$", "u");
	exports.NAME_CHAR_RE = new RegExp("^[" + exports.NAME_CHAR + "]$", "u");
	exports.NAME_RE = new RegExp("^[" + exports.NAME_START_CHAR + "][" + exports.NAME_CHAR + "]*$", "u");
	exports.NMTOKEN_RE = new RegExp("^[" + exports.NAME_CHAR + "]+$", "u");
	var TAB = 9;
	var NL = 10;
	var CR = 13;
	var SPACE = 32;
	/** All characters in the ``S`` production. */
	exports.S_LIST = [
		SPACE,
		NL,
		CR,
		TAB
	];
	/**
	* Determines whether a codepoint matches the ``CHAR`` production.
	*
	* @param c The code point.
	*
	* @returns ``true`` if the codepoint matches ``CHAR``.
	*/
	function isChar(c) {
		return c >= SPACE && c <= 55295 || c === NL || c === CR || c === TAB || c >= 57344 && c <= 65533 || c >= 65536 && c <= 1114111;
	}
	exports.isChar = isChar;
	/**
	* Determines whether a codepoint matches the ``S`` (space) production.
	*
	* @param c The code point.
	*
	* @returns ``true`` if the codepoint matches ``S``.
	*/
	function isS(c) {
		return c === SPACE || c === NL || c === CR || c === TAB;
	}
	exports.isS = isS;
	/**
	* Determines whether a codepoint matches the ``NAME_START_CHAR`` production.
	*
	* @param c The code point.
	*
	* @returns ``true`` if the codepoint matches ``NAME_START_CHAR``.
	*/
	function isNameStartChar(c) {
		return c >= 65 && c <= 90 || c >= 97 && c <= 122 || c === 58 || c === 95 || c === 8204 || c === 8205 || c >= 192 && c <= 214 || c >= 216 && c <= 246 || c >= 248 && c <= 767 || c >= 880 && c <= 893 || c >= 895 && c <= 8191 || c >= 8304 && c <= 8591 || c >= 11264 && c <= 12271 || c >= 12289 && c <= 55295 || c >= 63744 && c <= 64975 || c >= 65008 && c <= 65533 || c >= 65536 && c <= 983039;
	}
	exports.isNameStartChar = isNameStartChar;
	/**
	* Determines whether a codepoint matches the ``NAME_CHAR`` production.
	*
	* @param c The code point.
	*
	* @returns ``true`` if the codepoint matches ``NAME_CHAR``.
	*/
	function isNameChar(c) {
		return isNameStartChar(c) || c >= 48 && c <= 57 || c === 45 || c === 46 || c === 183 || c >= 768 && c <= 879 || c >= 8255 && c <= 8256;
	}
	exports.isNameChar = isNameChar;
}));
//#endregion
//#region node_modules/xmlchars/xml/1.1/ed2.js
var require_ed2 = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Character classes and associated utilities for the 2nd edition of XML 1.1.
	*
	* @author Louis-Dominique Dubeau
	* @license MIT
	* @copyright Louis-Dominique Dubeau
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.CHAR = "-퟿-�𐀀-􏿿";
	exports.RESTRICTED_CHAR = "-\b\v\f---";
	exports.S = " 	\r\n";
	exports.NAME_START_CHAR = ":A-Z_a-zÀ-ÖØ-öø-˿Ͱ-ͽͿ-῿‌‍⁰-↏Ⰰ-⿯、-퟿豈-﷏ﷰ-�𐀀-󯿿";
	exports.NAME_CHAR = "-" + exports.NAME_START_CHAR + ".0-9·̀-ͯ‿-⁀";
	exports.CHAR_RE = new RegExp("^[" + exports.CHAR + "]$", "u");
	exports.RESTRICTED_CHAR_RE = new RegExp("^[" + exports.RESTRICTED_CHAR + "]$", "u");
	exports.S_RE = new RegExp("^[" + exports.S + "]+$", "u");
	exports.NAME_START_CHAR_RE = new RegExp("^[" + exports.NAME_START_CHAR + "]$", "u");
	exports.NAME_CHAR_RE = new RegExp("^[" + exports.NAME_CHAR + "]$", "u");
	exports.NAME_RE = new RegExp("^[" + exports.NAME_START_CHAR + "][" + exports.NAME_CHAR + "]*$", "u");
	exports.NMTOKEN_RE = new RegExp("^[" + exports.NAME_CHAR + "]+$", "u");
	var TAB = 9;
	var NL = 10;
	var CR = 13;
	var SPACE = 32;
	/** All characters in the ``S`` production. */
	exports.S_LIST = [
		SPACE,
		NL,
		CR,
		TAB
	];
	/**
	* Determines whether a codepoint matches the ``CHAR`` production.
	*
	* @param c The code point.
	*
	* @returns ``true`` if the codepoint matches ``CHAR``.
	*/
	function isChar(c) {
		return c >= 1 && c <= 55295 || c >= 57344 && c <= 65533 || c >= 65536 && c <= 1114111;
	}
	exports.isChar = isChar;
	/**
	* Determines whether a codepoint matches the ``RESTRICTED_CHAR`` production.
	*
	* @param c The code point.
	*
	* @returns ``true`` if the codepoint matches ``RESTRICTED_CHAR``.
	*/
	function isRestrictedChar(c) {
		return c >= 1 && c <= 8 || c === 11 || c === 12 || c >= 14 && c <= 31 || c >= 127 && c <= 132 || c >= 134 && c <= 159;
	}
	exports.isRestrictedChar = isRestrictedChar;
	/**
	* Determines whether a codepoint matches the ``CHAR`` production and does not
	* match the ``RESTRICTED_CHAR`` production. ``isCharAndNotRestricted(x)`` is
	* equivalent to ``isChar(x) && !isRestrictedChar(x)``. This function is faster
	* than running the two-call equivalent.
	*
	* @param c The code point.
	*
	* @returns ``true`` if the codepoint matches ``CHAR`` and does not match
	* ``RESTRICTED_CHAR``.
	*/
	function isCharAndNotRestricted(c) {
		return c === 9 || c === 10 || c === 13 || c > 31 && c < 127 || c === 133 || c > 159 && c <= 55295 || c >= 57344 && c <= 65533 || c >= 65536 && c <= 1114111;
	}
	exports.isCharAndNotRestricted = isCharAndNotRestricted;
	/**
	* Determines whether a codepoint matches the ``S`` (space) production.
	*
	* @param c The code point.
	*
	* @returns ``true`` if the codepoint matches ``S``.
	*/
	function isS(c) {
		return c === SPACE || c === NL || c === CR || c === TAB;
	}
	exports.isS = isS;
	/**
	* Determines whether a codepoint matches the ``NAME_START_CHAR`` production.
	*
	* @param c The code point.
	*
	* @returns ``true`` if the codepoint matches ``NAME_START_CHAR``.
	*/
	function isNameStartChar(c) {
		return c >= 65 && c <= 90 || c >= 97 && c <= 122 || c === 58 || c === 95 || c === 8204 || c === 8205 || c >= 192 && c <= 214 || c >= 216 && c <= 246 || c >= 248 && c <= 767 || c >= 880 && c <= 893 || c >= 895 && c <= 8191 || c >= 8304 && c <= 8591 || c >= 11264 && c <= 12271 || c >= 12289 && c <= 55295 || c >= 63744 && c <= 64975 || c >= 65008 && c <= 65533 || c >= 65536 && c <= 983039;
	}
	exports.isNameStartChar = isNameStartChar;
	/**
	* Determines whether a codepoint matches the ``NAME_CHAR`` production.
	*
	* @param c The code point.
	*
	* @returns ``true`` if the codepoint matches ``NAME_CHAR``.
	*/
	function isNameChar(c) {
		return isNameStartChar(c) || c >= 48 && c <= 57 || c === 45 || c === 46 || c === 183 || c >= 768 && c <= 879 || c >= 8255 && c <= 8256;
	}
	exports.isNameChar = isNameChar;
}));
//#endregion
//#region node_modules/xmlchars/xmlns/1.0/ed3.js
var require_ed3 = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Character class utilities for XML NS 1.0 edition 3.
	*
	* @author Louis-Dominique Dubeau
	* @license MIT
	* @copyright Louis-Dominique Dubeau
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.NC_NAME_START_CHAR = "A-Z_a-zÀ-ÖØ-öø-˿Ͱ-ͽͿ-῿‌-‍⁰-↏Ⰰ-⿯、-퟿豈-﷏ﷰ-�𐀀-󯿿";
	exports.NC_NAME_CHAR = "-" + exports.NC_NAME_START_CHAR + ".0-9·̀-ͯ‿-⁀";
	exports.NC_NAME_START_CHAR_RE = new RegExp("^[" + exports.NC_NAME_START_CHAR + "]$", "u");
	exports.NC_NAME_CHAR_RE = new RegExp("^[" + exports.NC_NAME_CHAR + "]$", "u");
	exports.NC_NAME_RE = new RegExp("^[" + exports.NC_NAME_START_CHAR + "][" + exports.NC_NAME_CHAR + "]*$", "u");
	/**
	* Determines whether a codepoint matches [[NC_NAME_START_CHAR]].
	*
	* @param c The code point.
	*
	* @returns ``true`` if the codepoint matches.
	*/
	function isNCNameStartChar(c) {
		return c >= 65 && c <= 90 || c === 95 || c >= 97 && c <= 122 || c >= 192 && c <= 214 || c >= 216 && c <= 246 || c >= 248 && c <= 767 || c >= 880 && c <= 893 || c >= 895 && c <= 8191 || c >= 8204 && c <= 8205 || c >= 8304 && c <= 8591 || c >= 11264 && c <= 12271 || c >= 12289 && c <= 55295 || c >= 63744 && c <= 64975 || c >= 65008 && c <= 65533 || c >= 65536 && c <= 983039;
	}
	exports.isNCNameStartChar = isNCNameStartChar;
	/**
	* Determines whether a codepoint matches [[NC_NAME_CHAR]].
	*
	* @param c The code point.
	*
	* @returns ``true`` if the codepoint matches.
	*/
	function isNCNameChar(c) {
		return isNCNameStartChar(c) || c === 45 || c === 46 || c >= 48 && c <= 57 || c === 183 || c >= 768 && c <= 879 || c >= 8255 && c <= 8256;
	}
	exports.isNCNameChar = isNCNameChar;
}));
//#endregion
//#region node_modules/saxes/saxes.js
var require_saxes = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var ed5 = require_ed5();
	var ed2 = require_ed2();
	var NSed3 = require_ed3();
	var isS = ed5.isS;
	var isChar10 = ed5.isChar;
	var isNameStartChar = ed5.isNameStartChar;
	var isNameChar = ed5.isNameChar;
	var S_LIST = ed5.S_LIST;
	var NAME_RE = ed5.NAME_RE;
	var isChar11 = ed2.isChar;
	var isNCNameStartChar = NSed3.isNCNameStartChar;
	var isNCNameChar = NSed3.isNCNameChar;
	var NC_NAME_RE = NSed3.NC_NAME_RE;
	var XML_NAMESPACE = "http://www.w3.org/XML/1998/namespace";
	var XMLNS_NAMESPACE = "http://www.w3.org/2000/xmlns/";
	var rootNS = {
		__proto__: null,
		xml: XML_NAMESPACE,
		xmlns: XMLNS_NAMESPACE
	};
	var XML_ENTITIES = {
		__proto__: null,
		amp: "&",
		gt: ">",
		lt: "<",
		quot: "\"",
		apos: "'"
	};
	var EOC = -1;
	var NL_LIKE = -2;
	var S_BEGIN = 0;
	var S_BEGIN_WHITESPACE = 1;
	var S_DOCTYPE = 2;
	var S_DOCTYPE_QUOTE = 3;
	var S_DTD = 4;
	var S_DTD_QUOTED = 5;
	var S_DTD_OPEN_WAKA = 6;
	var S_DTD_OPEN_WAKA_BANG = 7;
	var S_DTD_COMMENT = 8;
	var S_DTD_COMMENT_ENDING = 9;
	var S_DTD_COMMENT_ENDED = 10;
	var S_DTD_PI = 11;
	var S_DTD_PI_ENDING = 12;
	var S_TEXT = 13;
	var S_ENTITY = 14;
	var S_OPEN_WAKA = 15;
	var S_OPEN_WAKA_BANG = 16;
	var S_COMMENT = 17;
	var S_COMMENT_ENDING = 18;
	var S_COMMENT_ENDED = 19;
	var S_CDATA = 20;
	var S_CDATA_ENDING = 21;
	var S_CDATA_ENDING_2 = 22;
	var S_PI_FIRST_CHAR = 23;
	var S_PI_REST = 24;
	var S_PI_BODY = 25;
	var S_PI_ENDING = 26;
	var S_XML_DECL_NAME_START = 27;
	var S_XML_DECL_NAME = 28;
	var S_XML_DECL_EQ = 29;
	var S_XML_DECL_VALUE_START = 30;
	var S_XML_DECL_VALUE = 31;
	var S_XML_DECL_SEPARATOR = 32;
	var S_XML_DECL_ENDING = 33;
	var S_OPEN_TAG = 34;
	var S_OPEN_TAG_SLASH = 35;
	var S_ATTRIB = 36;
	var S_ATTRIB_NAME = 37;
	var S_ATTRIB_NAME_SAW_WHITE = 38;
	var S_ATTRIB_VALUE = 39;
	var S_ATTRIB_VALUE_QUOTED = 40;
	var S_ATTRIB_VALUE_CLOSED = 41;
	var S_ATTRIB_VALUE_UNQUOTED = 42;
	var S_CLOSE_TAG = 43;
	var S_CLOSE_TAG_SAW_WHITE = 44;
	var TAB = 9;
	var NL = 10;
	var CR = 13;
	var SPACE = 32;
	var BANG = 33;
	var DQUOTE = 34;
	var AMP = 38;
	var SQUOTE = 39;
	var MINUS = 45;
	var FORWARD_SLASH = 47;
	var SEMICOLON = 59;
	var LESS = 60;
	var EQUAL = 61;
	var GREATER = 62;
	var QUESTION = 63;
	var OPEN_BRACKET = 91;
	var CLOSE_BRACKET = 93;
	var NEL = 133;
	var LS = 8232;
	var isQuote = (c) => c === DQUOTE || c === SQUOTE;
	var QUOTES = [DQUOTE, SQUOTE];
	var DOCTYPE_TERMINATOR = [
		...QUOTES,
		OPEN_BRACKET,
		GREATER
	];
	var DTD_TERMINATOR = [
		...QUOTES,
		LESS,
		CLOSE_BRACKET
	];
	var XML_DECL_NAME_TERMINATOR = [
		EQUAL,
		QUESTION,
		...S_LIST
	];
	var ATTRIB_VALUE_UNQUOTED_TERMINATOR = [
		...S_LIST,
		GREATER,
		AMP,
		LESS
	];
	function nsPairCheck(parser, prefix, uri) {
		switch (prefix) {
			case "xml":
				if (uri !== XML_NAMESPACE) parser.fail(`xml prefix must be bound to ${XML_NAMESPACE}.`);
				break;
			case "xmlns": if (uri !== XMLNS_NAMESPACE) parser.fail(`xmlns prefix must be bound to ${XMLNS_NAMESPACE}.`);
		}
		switch (uri) {
			case XMLNS_NAMESPACE:
				parser.fail(prefix === "" ? `the default namespace may not be set to ${uri}.` : `may not assign a prefix (even "xmlns") to the URI \
${XMLNS_NAMESPACE}.`);
				break;
			case XML_NAMESPACE: switch (prefix) {
				case "xml": break;
				case "":
					parser.fail(`the default namespace may not be set to ${uri}.`);
					break;
				default: parser.fail("may not assign the xml namespace to another prefix.");
			}
		}
	}
	function nsMappingCheck(parser, mapping) {
		for (const local of Object.keys(mapping)) nsPairCheck(parser, local, mapping[local]);
	}
	var isNCName = (name) => NC_NAME_RE.test(name);
	var isName = (name) => NAME_RE.test(name);
	var FORBIDDEN_START = 0;
	var FORBIDDEN_BRACKET = 1;
	var FORBIDDEN_BRACKET_BRACKET = 2;
	/**
	* The list of supported events.
	*/
	exports.EVENTS = [
		"xmldecl",
		"text",
		"processinginstruction",
		"doctype",
		"comment",
		"opentagstart",
		"attribute",
		"opentag",
		"closetag",
		"cdata",
		"error",
		"end",
		"ready"
	];
	var EVENT_NAME_TO_HANDLER_NAME = {
		xmldecl: "xmldeclHandler",
		text: "textHandler",
		processinginstruction: "piHandler",
		doctype: "doctypeHandler",
		comment: "commentHandler",
		opentagstart: "openTagStartHandler",
		attribute: "attributeHandler",
		opentag: "openTagHandler",
		closetag: "closeTagHandler",
		cdata: "cdataHandler",
		error: "errorHandler",
		end: "endHandler",
		ready: "readyHandler"
	};
	var SaxesParser = class {
		/**
		* @param opt The parser options.
		*/
		constructor(opt) {
			this.opt = opt !== null && opt !== void 0 ? opt : {};
			this.fragmentOpt = !!this.opt.fragment;
			const xmlnsOpt = this.xmlnsOpt = !!this.opt.xmlns;
			this.trackPosition = this.opt.position !== false;
			this.fileName = this.opt.fileName;
			if (xmlnsOpt) {
				this.nameStartCheck = isNCNameStartChar;
				this.nameCheck = isNCNameChar;
				this.isName = isNCName;
				this.processAttribs = this.processAttribsNS;
				this.pushAttrib = this.pushAttribNS;
				this.ns = Object.assign({ __proto__: null }, rootNS);
				const additional = this.opt.additionalNamespaces;
				if (additional != null) {
					nsMappingCheck(this, additional);
					Object.assign(this.ns, additional);
				}
			} else {
				this.nameStartCheck = isNameStartChar;
				this.nameCheck = isNameChar;
				this.isName = isName;
				this.processAttribs = this.processAttribsPlain;
				this.pushAttrib = this.pushAttribPlain;
			}
			this.stateTable = [
				this.sBegin,
				this.sBeginWhitespace,
				this.sDoctype,
				this.sDoctypeQuote,
				this.sDTD,
				this.sDTDQuoted,
				this.sDTDOpenWaka,
				this.sDTDOpenWakaBang,
				this.sDTDComment,
				this.sDTDCommentEnding,
				this.sDTDCommentEnded,
				this.sDTDPI,
				this.sDTDPIEnding,
				this.sText,
				this.sEntity,
				this.sOpenWaka,
				this.sOpenWakaBang,
				this.sComment,
				this.sCommentEnding,
				this.sCommentEnded,
				this.sCData,
				this.sCDataEnding,
				this.sCDataEnding2,
				this.sPIFirstChar,
				this.sPIRest,
				this.sPIBody,
				this.sPIEnding,
				this.sXMLDeclNameStart,
				this.sXMLDeclName,
				this.sXMLDeclEq,
				this.sXMLDeclValueStart,
				this.sXMLDeclValue,
				this.sXMLDeclSeparator,
				this.sXMLDeclEnding,
				this.sOpenTag,
				this.sOpenTagSlash,
				this.sAttrib,
				this.sAttribName,
				this.sAttribNameSawWhite,
				this.sAttribValue,
				this.sAttribValueQuoted,
				this.sAttribValueClosed,
				this.sAttribValueUnquoted,
				this.sCloseTag,
				this.sCloseTagSawWhite
			];
			this._init();
		}
		/**
		* Indicates whether or not the parser is closed. If ``true``, wait for
		* the ``ready`` event to write again.
		*/
		get closed() {
			return this._closed;
		}
		_init() {
			var _a;
			this.openWakaBang = "";
			this.text = "";
			this.name = "";
			this.piTarget = "";
			this.entity = "";
			this.q = null;
			this.tags = [];
			this.tag = null;
			this.topNS = null;
			this.chunk = "";
			this.chunkPosition = 0;
			this.i = 0;
			this.prevI = 0;
			this.carriedFromPrevious = void 0;
			this.forbiddenState = FORBIDDEN_START;
			this.attribList = [];
			const { fragmentOpt } = this;
			this.state = fragmentOpt ? S_TEXT : S_BEGIN;
			this.reportedTextBeforeRoot = this.reportedTextAfterRoot = this.closedRoot = this.sawRoot = fragmentOpt;
			this.xmlDeclPossible = !fragmentOpt;
			this.xmlDeclExpects = ["version"];
			this.entityReturnState = void 0;
			let { defaultXMLVersion } = this.opt;
			if (defaultXMLVersion === void 0) {
				if (this.opt.forceXMLVersion === true) throw new Error("forceXMLVersion set but defaultXMLVersion is not set");
				defaultXMLVersion = "1.0";
			}
			this.setXMLVersion(defaultXMLVersion);
			this.positionAtNewLine = 0;
			this.doctype = false;
			this._closed = false;
			this.xmlDecl = {
				version: void 0,
				encoding: void 0,
				standalone: void 0
			};
			this.line = 1;
			this.column = 0;
			this.ENTITIES = Object.create(XML_ENTITIES);
			(_a = this.readyHandler) === null || _a === void 0 || _a.call(this);
		}
		/**
		* The stream position the parser is currently looking at. This field is
		* zero-based.
		*
		* This field is not based on counting Unicode characters but is to be
		* interpreted as a plain index into a JavaScript string.
		*/
		get position() {
			return this.chunkPosition + this.i;
		}
		/**
		* The column number of the next character to be read by the parser.  *
		* This field is zero-based. (The first column in a line is 0.)
		*
		* This field reports the index at which the next character would be in the
		* line if the line were represented as a JavaScript string.  Note that this
		* *can* be different to a count based on the number of *Unicode characters*
		* due to how JavaScript handles astral plane characters.
		*
		* See [[column]] for a number that corresponds to a count of Unicode
		* characters.
		*/
		get columnIndex() {
			return this.position - this.positionAtNewLine;
		}
		/**
		* Set an event listener on an event. The parser supports one handler per
		* event type. If you try to set an event handler over an existing handler,
		* the old handler is silently overwritten.
		*
		* @param name The event to listen to.
		*
		* @param handler The handler to set.
		*/
		on(name, handler) {
			this[EVENT_NAME_TO_HANDLER_NAME[name]] = handler;
		}
		/**
		* Unset an event handler.
		*
		* @parma name The event to stop listening to.
		*/
		off(name) {
			this[EVENT_NAME_TO_HANDLER_NAME[name]] = void 0;
		}
		/**
		* Make an error object. The error object will have a message that contains
		* the ``fileName`` option passed at the creation of the parser. If position
		* tracking was turned on, it will also have line and column number
		* information.
		*
		* @param message The message describing the error to report.
		*
		* @returns An error object with a properly formatted message.
		*/
		makeError(message) {
			var _a;
			let msg = (_a = this.fileName) !== null && _a !== void 0 ? _a : "";
			if (this.trackPosition) {
				if (msg.length > 0) msg += ":";
				msg += `${this.line}:${this.column}`;
			}
			if (msg.length > 0) msg += ": ";
			return new Error(msg + message);
		}
		/**
		* Report a parsing error. This method is made public so that client code may
		* check for issues that are outside the scope of this project and can report
		* errors.
		*
		* @param message The error to report.
		*
		* @returns this
		*/
		fail(message) {
			const err = this.makeError(message);
			const handler = this.errorHandler;
			if (handler === void 0) throw err;
			else handler(err);
			return this;
		}
		/**
		* Write a XML data to the parser.
		*
		* @param chunk The XML data to write.
		*
		* @returns this
		*/
		write(chunk) {
			if (this.closed) return this.fail("cannot write after close; assign an onready handler.");
			let end = false;
			if (chunk === null) {
				end = true;
				chunk = "";
			} else if (typeof chunk === "object") chunk = chunk.toString();
			if (this.carriedFromPrevious !== void 0) {
				chunk = `${this.carriedFromPrevious}${chunk}`;
				this.carriedFromPrevious = void 0;
			}
			let limit = chunk.length;
			const lastCode = chunk.charCodeAt(limit - 1);
			if (!end && (lastCode === CR || lastCode >= 55296 && lastCode <= 56319)) {
				this.carriedFromPrevious = chunk[limit - 1];
				limit--;
				chunk = chunk.slice(0, limit);
			}
			const { stateTable } = this;
			this.chunk = chunk;
			this.i = 0;
			while (this.i < limit) stateTable[this.state].call(this);
			this.chunkPosition += limit;
			return end ? this.end() : this;
		}
		/**
		* Close the current stream. Perform final well-formedness checks and reset
		* the parser tstate.
		*
		* @returns this
		*/
		close() {
			return this.write(null);
		}
		/**
		* Get a single code point out of the current chunk. This updates the current
		* position if we do position tracking.
		*
		* This is the algorithm to use for XML 1.0.
		*
		* @returns The character read.
		*/
		getCode10() {
			const { chunk, i } = this;
			this.prevI = i;
			this.i = i + 1;
			if (i >= chunk.length) return EOC;
			const code = chunk.charCodeAt(i);
			this.column++;
			if (code < 55296) {
				if (code >= SPACE || code === TAB) return code;
				switch (code) {
					case NL:
						this.line++;
						this.column = 0;
						this.positionAtNewLine = this.position;
						return NL;
					case CR:
						if (chunk.charCodeAt(i + 1) === NL) this.i = i + 2;
						this.line++;
						this.column = 0;
						this.positionAtNewLine = this.position;
						return NL_LIKE;
					default:
						this.fail("disallowed character.");
						return code;
				}
			}
			if (code > 56319) {
				if (!(code >= 57344 && code <= 65533)) this.fail("disallowed character.");
				return code;
			}
			const final = 65536 + (code - 55296) * 1024 + (chunk.charCodeAt(i + 1) - 56320);
			this.i = i + 2;
			if (final > 1114111) this.fail("disallowed character.");
			return final;
		}
		/**
		* Get a single code point out of the current chunk. This updates the current
		* position if we do position tracking.
		*
		* This is the algorithm to use for XML 1.1.
		*
		* @returns {number} The character read.
		*/
		getCode11() {
			const { chunk, i } = this;
			this.prevI = i;
			this.i = i + 1;
			if (i >= chunk.length) return EOC;
			const code = chunk.charCodeAt(i);
			this.column++;
			if (code < 55296) {
				if (code > 31 && code < 127 || code > 159 && code !== LS || code === TAB) return code;
				switch (code) {
					case NL:
						this.line++;
						this.column = 0;
						this.positionAtNewLine = this.position;
						return NL;
					case CR: {
						const next = chunk.charCodeAt(i + 1);
						if (next === NL || next === NEL) this.i = i + 2;
					}
					case NEL:
					case LS:
						this.line++;
						this.column = 0;
						this.positionAtNewLine = this.position;
						return NL_LIKE;
					default:
						this.fail("disallowed character.");
						return code;
				}
			}
			if (code > 56319) {
				if (!(code >= 57344 && code <= 65533)) this.fail("disallowed character.");
				return code;
			}
			const final = 65536 + (code - 55296) * 1024 + (chunk.charCodeAt(i + 1) - 56320);
			this.i = i + 2;
			if (final > 1114111) this.fail("disallowed character.");
			return final;
		}
		/**
		* Like ``getCode`` but with the return value normalized so that ``NL`` is
		* returned for ``NL_LIKE``.
		*/
		getCodeNorm() {
			const c = this.getCode();
			return c === NL_LIKE ? NL : c;
		}
		unget() {
			this.i = this.prevI;
			this.column--;
		}
		/**
		* Capture characters into a buffer until encountering one of a set of
		* characters.
		*
		* @param chars An array of codepoints. Encountering a character in the array
		* ends the capture. (``chars`` may safely contain ``NL``.)
		*
		* @return The character code that made the capture end, or ``EOC`` if we hit
		* the end of the chunk. The return value cannot be NL_LIKE: NL is returned
		* instead.
		*/
		captureTo(chars) {
			let { i: start } = this;
			const { chunk } = this;
			while (true) {
				const c = this.getCode();
				const isNLLike = c === NL_LIKE;
				const final = isNLLike ? NL : c;
				if (final === EOC || chars.includes(final)) {
					this.text += chunk.slice(start, this.prevI);
					return final;
				}
				if (isNLLike) {
					this.text += `${chunk.slice(start, this.prevI)}\n`;
					start = this.i;
				}
			}
		}
		/**
		* Capture characters into a buffer until encountering a character.
		*
		* @param char The codepoint that ends the capture. **NOTE ``char`` MAY NOT
		* CONTAIN ``NL``.** Passing ``NL`` will result in buggy behavior.
		*
		* @return ``true`` if we ran into the character. Otherwise, we ran into the
		* end of the current chunk.
		*/
		captureToChar(char) {
			let { i: start } = this;
			const { chunk } = this;
			while (true) {
				let c = this.getCode();
				switch (c) {
					case NL_LIKE:
						this.text += `${chunk.slice(start, this.prevI)}\n`;
						start = this.i;
						c = NL;
						break;
					case EOC:
						this.text += chunk.slice(start);
						return false;
				}
				if (c === char) {
					this.text += chunk.slice(start, this.prevI);
					return true;
				}
			}
		}
		/**
		* Capture characters that satisfy ``isNameChar`` into the ``name`` field of
		* this parser.
		*
		* @return The character code that made the test fail, or ``EOC`` if we hit
		* the end of the chunk. The return value cannot be NL_LIKE: NL is returned
		* instead.
		*/
		captureNameChars() {
			const { chunk, i: start } = this;
			while (true) {
				const c = this.getCode();
				if (c === EOC) {
					this.name += chunk.slice(start);
					return EOC;
				}
				if (!isNameChar(c)) {
					this.name += chunk.slice(start, this.prevI);
					return c === NL_LIKE ? NL : c;
				}
			}
		}
		/**
		* Skip white spaces.
		*
		* @return The character that ended the skip, or ``EOC`` if we hit
		* the end of the chunk. The return value cannot be NL_LIKE: NL is returned
		* instead.
		*/
		skipSpaces() {
			while (true) {
				const c = this.getCodeNorm();
				if (c === EOC || !isS(c)) return c;
			}
		}
		setXMLVersion(version) {
			this.currentXMLVersion = version;
			if (version === "1.0") {
				this.isChar = isChar10;
				this.getCode = this.getCode10;
			} else {
				this.isChar = isChar11;
				this.getCode = this.getCode11;
			}
		}
		sBegin() {
			if (this.chunk.charCodeAt(0) === 65279) {
				this.i++;
				this.column++;
			}
			this.state = S_BEGIN_WHITESPACE;
		}
		sBeginWhitespace() {
			const iBefore = this.i;
			const c = this.skipSpaces();
			if (this.prevI !== iBefore) this.xmlDeclPossible = false;
			switch (c) {
				case LESS:
					this.state = S_OPEN_WAKA;
					if (this.text.length !== 0) throw new Error("no-empty text at start");
					break;
				case EOC: break;
				default:
					this.unget();
					this.state = S_TEXT;
					this.xmlDeclPossible = false;
			}
		}
		sDoctype() {
			var _a;
			const c = this.captureTo(DOCTYPE_TERMINATOR);
			switch (c) {
				case GREATER:
					(_a = this.doctypeHandler) === null || _a === void 0 || _a.call(this, this.text);
					this.text = "";
					this.state = S_TEXT;
					this.doctype = true;
					break;
				case EOC: break;
				default:
					this.text += String.fromCodePoint(c);
					if (c === OPEN_BRACKET) this.state = S_DTD;
					else if (isQuote(c)) {
						this.state = S_DOCTYPE_QUOTE;
						this.q = c;
					}
			}
		}
		sDoctypeQuote() {
			const q = this.q;
			if (this.captureToChar(q)) {
				this.text += String.fromCodePoint(q);
				this.q = null;
				this.state = S_DOCTYPE;
			}
		}
		sDTD() {
			const c = this.captureTo(DTD_TERMINATOR);
			if (c === EOC) return;
			this.text += String.fromCodePoint(c);
			if (c === CLOSE_BRACKET) this.state = S_DOCTYPE;
			else if (c === LESS) this.state = S_DTD_OPEN_WAKA;
			else if (isQuote(c)) {
				this.state = S_DTD_QUOTED;
				this.q = c;
			}
		}
		sDTDQuoted() {
			const q = this.q;
			if (this.captureToChar(q)) {
				this.text += String.fromCodePoint(q);
				this.state = S_DTD;
				this.q = null;
			}
		}
		sDTDOpenWaka() {
			const c = this.getCodeNorm();
			this.text += String.fromCodePoint(c);
			switch (c) {
				case BANG:
					this.state = S_DTD_OPEN_WAKA_BANG;
					this.openWakaBang = "";
					break;
				case QUESTION:
					this.state = S_DTD_PI;
					break;
				default: this.state = S_DTD;
			}
		}
		sDTDOpenWakaBang() {
			const char = String.fromCodePoint(this.getCodeNorm());
			const owb = this.openWakaBang += char;
			this.text += char;
			if (owb !== "-") {
				this.state = owb === "--" ? S_DTD_COMMENT : S_DTD;
				this.openWakaBang = "";
			}
		}
		sDTDComment() {
			if (this.captureToChar(MINUS)) {
				this.text += "-";
				this.state = S_DTD_COMMENT_ENDING;
			}
		}
		sDTDCommentEnding() {
			const c = this.getCodeNorm();
			this.text += String.fromCodePoint(c);
			this.state = c === MINUS ? S_DTD_COMMENT_ENDED : S_DTD_COMMENT;
		}
		sDTDCommentEnded() {
			const c = this.getCodeNorm();
			this.text += String.fromCodePoint(c);
			if (c === GREATER) this.state = S_DTD;
			else {
				this.fail("malformed comment.");
				this.state = S_DTD_COMMENT;
			}
		}
		sDTDPI() {
			if (this.captureToChar(QUESTION)) {
				this.text += "?";
				this.state = S_DTD_PI_ENDING;
			}
		}
		sDTDPIEnding() {
			const c = this.getCodeNorm();
			this.text += String.fromCodePoint(c);
			if (c === GREATER) this.state = S_DTD;
		}
		sText() {
			if (this.tags.length !== 0) this.handleTextInRoot();
			else this.handleTextOutsideRoot();
		}
		sEntity() {
			let { i: start } = this;
			const { chunk } = this;
			loop: while (true) switch (this.getCode()) {
				case NL_LIKE:
					this.entity += `${chunk.slice(start, this.prevI)}\n`;
					start = this.i;
					break;
				case SEMICOLON: {
					const { entityReturnState } = this;
					const entity = this.entity + chunk.slice(start, this.prevI);
					this.state = entityReturnState;
					let parsed;
					if (entity === "") {
						this.fail("empty entity name.");
						parsed = "&;";
					} else {
						parsed = this.parseEntity(entity);
						this.entity = "";
					}
					if (entityReturnState !== S_TEXT || this.textHandler !== void 0) this.text += parsed;
					break loop;
				}
				case EOC:
					this.entity += chunk.slice(start);
					break loop;
			}
		}
		sOpenWaka() {
			const c = this.getCode();
			if (isNameStartChar(c)) {
				this.state = S_OPEN_TAG;
				this.unget();
				this.xmlDeclPossible = false;
			} else switch (c) {
				case FORWARD_SLASH:
					this.state = S_CLOSE_TAG;
					this.xmlDeclPossible = false;
					break;
				case BANG:
					this.state = S_OPEN_WAKA_BANG;
					this.openWakaBang = "";
					this.xmlDeclPossible = false;
					break;
				case QUESTION:
					this.state = S_PI_FIRST_CHAR;
					break;
				default:
					this.fail("disallowed character in tag name");
					this.state = S_TEXT;
					this.xmlDeclPossible = false;
			}
		}
		sOpenWakaBang() {
			this.openWakaBang += String.fromCodePoint(this.getCodeNorm());
			switch (this.openWakaBang) {
				case "[CDATA[":
					if (!this.sawRoot && !this.reportedTextBeforeRoot) {
						this.fail("text data outside of root node.");
						this.reportedTextBeforeRoot = true;
					}
					if (this.closedRoot && !this.reportedTextAfterRoot) {
						this.fail("text data outside of root node.");
						this.reportedTextAfterRoot = true;
					}
					this.state = S_CDATA;
					this.openWakaBang = "";
					break;
				case "--":
					this.state = S_COMMENT;
					this.openWakaBang = "";
					break;
				case "DOCTYPE":
					this.state = S_DOCTYPE;
					if (this.doctype || this.sawRoot) this.fail("inappropriately located doctype declaration.");
					this.openWakaBang = "";
					break;
				default: if (this.openWakaBang.length >= 7) this.fail("incorrect syntax.");
			}
		}
		sComment() {
			if (this.captureToChar(MINUS)) this.state = S_COMMENT_ENDING;
		}
		sCommentEnding() {
			var _a;
			const c = this.getCodeNorm();
			if (c === MINUS) {
				this.state = S_COMMENT_ENDED;
				(_a = this.commentHandler) === null || _a === void 0 || _a.call(this, this.text);
				this.text = "";
			} else {
				this.text += `-${String.fromCodePoint(c)}`;
				this.state = S_COMMENT;
			}
		}
		sCommentEnded() {
			const c = this.getCodeNorm();
			if (c !== GREATER) {
				this.fail("malformed comment.");
				this.text += `--${String.fromCodePoint(c)}`;
				this.state = S_COMMENT;
			} else this.state = S_TEXT;
		}
		sCData() {
			if (this.captureToChar(CLOSE_BRACKET)) this.state = S_CDATA_ENDING;
		}
		sCDataEnding() {
			const c = this.getCodeNorm();
			if (c === CLOSE_BRACKET) this.state = S_CDATA_ENDING_2;
			else {
				this.text += `]${String.fromCodePoint(c)}`;
				this.state = S_CDATA;
			}
		}
		sCDataEnding2() {
			var _a;
			const c = this.getCodeNorm();
			switch (c) {
				case GREATER:
					(_a = this.cdataHandler) === null || _a === void 0 || _a.call(this, this.text);
					this.text = "";
					this.state = S_TEXT;
					break;
				case CLOSE_BRACKET:
					this.text += "]";
					break;
				default:
					this.text += `]]${String.fromCodePoint(c)}`;
					this.state = S_CDATA;
			}
		}
		sPIFirstChar() {
			const c = this.getCodeNorm();
			if (this.nameStartCheck(c)) {
				this.piTarget += String.fromCodePoint(c);
				this.state = S_PI_REST;
			} else if (c === QUESTION || isS(c)) {
				this.fail("processing instruction without a target.");
				this.state = c === QUESTION ? S_PI_ENDING : S_PI_BODY;
			} else {
				this.fail("disallowed character in processing instruction name.");
				this.piTarget += String.fromCodePoint(c);
				this.state = S_PI_REST;
			}
		}
		sPIRest() {
			const { chunk, i: start } = this;
			while (true) {
				const c = this.getCodeNorm();
				if (c === EOC) {
					this.piTarget += chunk.slice(start);
					return;
				}
				if (!this.nameCheck(c)) {
					this.piTarget += chunk.slice(start, this.prevI);
					const isQuestion = c === QUESTION;
					if (isQuestion || isS(c)) {
						if (this.piTarget === "xml") {
							if (!this.xmlDeclPossible) this.fail("an XML declaration must be at the start of the document.");
							this.state = isQuestion ? S_XML_DECL_ENDING : S_XML_DECL_NAME_START;
						} else this.state = isQuestion ? S_PI_ENDING : S_PI_BODY;
					} else {
						this.fail("disallowed character in processing instruction name.");
						this.piTarget += String.fromCodePoint(c);
					}
					break;
				}
			}
		}
		sPIBody() {
			if (this.text.length === 0) {
				const c = this.getCodeNorm();
				if (c === QUESTION) this.state = S_PI_ENDING;
				else if (!isS(c)) this.text = String.fromCodePoint(c);
			} else if (this.captureToChar(QUESTION)) this.state = S_PI_ENDING;
		}
		sPIEnding() {
			var _a;
			const c = this.getCodeNorm();
			if (c === GREATER) {
				const { piTarget } = this;
				if (piTarget.toLowerCase() === "xml") this.fail("the XML declaration must appear at the start of the document.");
				(_a = this.piHandler) === null || _a === void 0 || _a.call(this, {
					target: piTarget,
					body: this.text
				});
				this.piTarget = this.text = "";
				this.state = S_TEXT;
			} else if (c === QUESTION) this.text += "?";
			else {
				this.text += `?${String.fromCodePoint(c)}`;
				this.state = S_PI_BODY;
			}
			this.xmlDeclPossible = false;
		}
		sXMLDeclNameStart() {
			const c = this.skipSpaces();
			if (c === QUESTION) {
				this.state = S_XML_DECL_ENDING;
				return;
			}
			if (c !== EOC) {
				this.state = S_XML_DECL_NAME;
				this.name = String.fromCodePoint(c);
			}
		}
		sXMLDeclName() {
			const c = this.captureTo(XML_DECL_NAME_TERMINATOR);
			if (c === QUESTION) {
				this.state = S_XML_DECL_ENDING;
				this.name += this.text;
				this.text = "";
				this.fail("XML declaration is incomplete.");
				return;
			}
			if (!(isS(c) || c === EQUAL)) return;
			this.name += this.text;
			this.text = "";
			if (!this.xmlDeclExpects.includes(this.name)) switch (this.name.length) {
				case 0:
					this.fail("did not expect any more name/value pairs.");
					break;
				case 1:
					this.fail(`expected the name ${this.xmlDeclExpects[0]}.`);
					break;
				default: this.fail(`expected one of ${this.xmlDeclExpects.join(", ")}`);
			}
			this.state = c === EQUAL ? S_XML_DECL_VALUE_START : S_XML_DECL_EQ;
		}
		sXMLDeclEq() {
			const c = this.getCodeNorm();
			if (c === QUESTION) {
				this.state = S_XML_DECL_ENDING;
				this.fail("XML declaration is incomplete.");
				return;
			}
			if (isS(c)) return;
			if (c !== EQUAL) this.fail("value required.");
			this.state = S_XML_DECL_VALUE_START;
		}
		sXMLDeclValueStart() {
			const c = this.getCodeNorm();
			if (c === QUESTION) {
				this.state = S_XML_DECL_ENDING;
				this.fail("XML declaration is incomplete.");
				return;
			}
			if (isS(c)) return;
			if (!isQuote(c)) {
				this.fail("value must be quoted.");
				this.q = SPACE;
			} else this.q = c;
			this.state = S_XML_DECL_VALUE;
		}
		sXMLDeclValue() {
			const c = this.captureTo([this.q, QUESTION]);
			if (c === QUESTION) {
				this.state = S_XML_DECL_ENDING;
				this.text = "";
				this.fail("XML declaration is incomplete.");
				return;
			}
			if (c === EOC) return;
			const value = this.text;
			this.text = "";
			switch (this.name) {
				case "version": {
					this.xmlDeclExpects = ["encoding", "standalone"];
					const version = value;
					this.xmlDecl.version = version;
					if (!/^1\.[0-9]+$/.test(version)) this.fail("version number must match /^1\\.[0-9]+$/.");
					else if (!this.opt.forceXMLVersion) this.setXMLVersion(version);
					break;
				}
				case "encoding":
					if (!/^[A-Za-z][A-Za-z0-9._-]*$/.test(value)) this.fail("encoding value must match /^[A-Za-z0-9][A-Za-z0-9._-]*$/.");
					this.xmlDeclExpects = ["standalone"];
					this.xmlDecl.encoding = value;
					break;
				case "standalone":
					if (value !== "yes" && value !== "no") this.fail("standalone value must match \"yes\" or \"no\".");
					this.xmlDeclExpects = [];
					this.xmlDecl.standalone = value;
			}
			this.name = "";
			this.state = S_XML_DECL_SEPARATOR;
		}
		sXMLDeclSeparator() {
			const c = this.getCodeNorm();
			if (c === QUESTION) {
				this.state = S_XML_DECL_ENDING;
				return;
			}
			if (!isS(c)) {
				this.fail("whitespace required.");
				this.unget();
			}
			this.state = S_XML_DECL_NAME_START;
		}
		sXMLDeclEnding() {
			var _a;
			if (this.getCodeNorm() === GREATER) {
				if (this.piTarget !== "xml") this.fail("processing instructions are not allowed before root.");
				else if (this.name !== "version" && this.xmlDeclExpects.includes("version")) this.fail("XML declaration must contain a version.");
				(_a = this.xmldeclHandler) === null || _a === void 0 || _a.call(this, this.xmlDecl);
				this.name = "";
				this.piTarget = this.text = "";
				this.state = S_TEXT;
			} else this.fail("The character ? is disallowed anywhere in XML declarations.");
			this.xmlDeclPossible = false;
		}
		sOpenTag() {
			var _a;
			const c = this.captureNameChars();
			if (c === EOC) return;
			const tag = this.tag = {
				name: this.name,
				attributes: Object.create(null)
			};
			this.name = "";
			if (this.xmlnsOpt) this.topNS = tag.ns = Object.create(null);
			(_a = this.openTagStartHandler) === null || _a === void 0 || _a.call(this, tag);
			this.sawRoot = true;
			if (!this.fragmentOpt && this.closedRoot) this.fail("documents may contain only one root.");
			switch (c) {
				case GREATER:
					this.openTag();
					break;
				case FORWARD_SLASH:
					this.state = S_OPEN_TAG_SLASH;
					break;
				default:
					if (!isS(c)) this.fail("disallowed character in tag name.");
					this.state = S_ATTRIB;
			}
		}
		sOpenTagSlash() {
			if (this.getCode() === GREATER) this.openSelfClosingTag();
			else {
				this.fail("forward-slash in opening tag not followed by >.");
				this.state = S_ATTRIB;
			}
		}
		sAttrib() {
			const c = this.skipSpaces();
			if (c === EOC) return;
			if (isNameStartChar(c)) {
				this.unget();
				this.state = S_ATTRIB_NAME;
			} else if (c === GREATER) this.openTag();
			else if (c === FORWARD_SLASH) this.state = S_OPEN_TAG_SLASH;
			else this.fail("disallowed character in attribute name.");
		}
		sAttribName() {
			const c = this.captureNameChars();
			if (c === EQUAL) this.state = S_ATTRIB_VALUE;
			else if (isS(c)) this.state = S_ATTRIB_NAME_SAW_WHITE;
			else if (c === GREATER) {
				this.fail("attribute without value.");
				this.pushAttrib(this.name, this.name);
				this.name = this.text = "";
				this.openTag();
			} else if (c !== EOC) this.fail("disallowed character in attribute name.");
		}
		sAttribNameSawWhite() {
			const c = this.skipSpaces();
			switch (c) {
				case EOC: return;
				case EQUAL:
					this.state = S_ATTRIB_VALUE;
					break;
				default:
					this.fail("attribute without value.");
					this.text = "";
					this.name = "";
					if (c === GREATER) this.openTag();
					else if (isNameStartChar(c)) {
						this.unget();
						this.state = S_ATTRIB_NAME;
					} else {
						this.fail("disallowed character in attribute name.");
						this.state = S_ATTRIB;
					}
			}
		}
		sAttribValue() {
			const c = this.getCodeNorm();
			if (isQuote(c)) {
				this.q = c;
				this.state = S_ATTRIB_VALUE_QUOTED;
			} else if (!isS(c)) {
				this.fail("unquoted attribute value.");
				this.state = S_ATTRIB_VALUE_UNQUOTED;
				this.unget();
			}
		}
		sAttribValueQuoted() {
			const { q, chunk } = this;
			let { i: start } = this;
			while (true) switch (this.getCode()) {
				case q:
					this.pushAttrib(this.name, this.text + chunk.slice(start, this.prevI));
					this.name = this.text = "";
					this.q = null;
					this.state = S_ATTRIB_VALUE_CLOSED;
					return;
				case AMP:
					this.text += chunk.slice(start, this.prevI);
					this.state = S_ENTITY;
					this.entityReturnState = S_ATTRIB_VALUE_QUOTED;
					return;
				case NL:
				case NL_LIKE:
				case TAB:
					this.text += `${chunk.slice(start, this.prevI)} `;
					start = this.i;
					break;
				case LESS:
					this.text += chunk.slice(start, this.prevI);
					this.fail("disallowed character.");
					return;
				case EOC:
					this.text += chunk.slice(start);
					return;
			}
		}
		sAttribValueClosed() {
			const c = this.getCodeNorm();
			if (isS(c)) this.state = S_ATTRIB;
			else if (c === GREATER) this.openTag();
			else if (c === FORWARD_SLASH) this.state = S_OPEN_TAG_SLASH;
			else if (isNameStartChar(c)) {
				this.fail("no whitespace between attributes.");
				this.unget();
				this.state = S_ATTRIB_NAME;
			} else this.fail("disallowed character in attribute name.");
		}
		sAttribValueUnquoted() {
			const c = this.captureTo(ATTRIB_VALUE_UNQUOTED_TERMINATOR);
			switch (c) {
				case AMP:
					this.state = S_ENTITY;
					this.entityReturnState = S_ATTRIB_VALUE_UNQUOTED;
					break;
				case LESS:
					this.fail("disallowed character.");
					break;
				case EOC: break;
				default:
					if (this.text.includes("]]>")) this.fail("the string \"]]>\" is disallowed in char data.");
					this.pushAttrib(this.name, this.text);
					this.name = this.text = "";
					if (c === GREATER) this.openTag();
					else this.state = S_ATTRIB;
			}
		}
		sCloseTag() {
			const c = this.captureNameChars();
			if (c === GREATER) this.closeTag();
			else if (isS(c)) this.state = S_CLOSE_TAG_SAW_WHITE;
			else if (c !== EOC) this.fail("disallowed character in closing tag.");
		}
		sCloseTagSawWhite() {
			switch (this.skipSpaces()) {
				case GREATER:
					this.closeTag();
					break;
				case EOC: break;
				default: this.fail("disallowed character in closing tag.");
			}
		}
		handleTextInRoot() {
			let { i: start, forbiddenState } = this;
			const { chunk, textHandler: handler } = this;
			scanLoop: while (true) switch (this.getCode()) {
				case LESS:
					this.state = S_OPEN_WAKA;
					if (handler !== void 0) {
						const { text } = this;
						const slice = chunk.slice(start, this.prevI);
						if (text.length !== 0) {
							handler(text + slice);
							this.text = "";
						} else if (slice.length !== 0) handler(slice);
					}
					forbiddenState = FORBIDDEN_START;
					break scanLoop;
				case AMP:
					this.state = S_ENTITY;
					this.entityReturnState = S_TEXT;
					if (handler !== void 0) this.text += chunk.slice(start, this.prevI);
					forbiddenState = FORBIDDEN_START;
					break scanLoop;
				case CLOSE_BRACKET:
					switch (forbiddenState) {
						case FORBIDDEN_START:
							forbiddenState = FORBIDDEN_BRACKET;
							break;
						case FORBIDDEN_BRACKET:
							forbiddenState = FORBIDDEN_BRACKET_BRACKET;
							break;
						case FORBIDDEN_BRACKET_BRACKET: break;
						default: throw new Error("impossible state");
					}
					break;
				case GREATER:
					if (forbiddenState === FORBIDDEN_BRACKET_BRACKET) this.fail("the string \"]]>\" is disallowed in char data.");
					forbiddenState = FORBIDDEN_START;
					break;
				case NL_LIKE:
					if (handler !== void 0) this.text += `${chunk.slice(start, this.prevI)}\n`;
					start = this.i;
					forbiddenState = FORBIDDEN_START;
					break;
				case EOC:
					if (handler !== void 0) this.text += chunk.slice(start);
					break scanLoop;
				default: forbiddenState = FORBIDDEN_START;
			}
			this.forbiddenState = forbiddenState;
		}
		handleTextOutsideRoot() {
			let { i: start } = this;
			const { chunk, textHandler: handler } = this;
			let nonSpace = false;
			outRootLoop: while (true) {
				const code = this.getCode();
				switch (code) {
					case LESS:
						this.state = S_OPEN_WAKA;
						if (handler !== void 0) {
							const { text } = this;
							const slice = chunk.slice(start, this.prevI);
							if (text.length !== 0) {
								handler(text + slice);
								this.text = "";
							} else if (slice.length !== 0) handler(slice);
						}
						break outRootLoop;
					case AMP:
						this.state = S_ENTITY;
						this.entityReturnState = S_TEXT;
						if (handler !== void 0) this.text += chunk.slice(start, this.prevI);
						nonSpace = true;
						break outRootLoop;
					case NL_LIKE:
						if (handler !== void 0) this.text += `${chunk.slice(start, this.prevI)}\n`;
						start = this.i;
						break;
					case EOC:
						if (handler !== void 0) this.text += chunk.slice(start);
						break outRootLoop;
					default: if (!isS(code)) nonSpace = true;
				}
			}
			if (!nonSpace) return;
			if (!this.sawRoot && !this.reportedTextBeforeRoot) {
				this.fail("text data outside of root node.");
				this.reportedTextBeforeRoot = true;
			}
			if (this.closedRoot && !this.reportedTextAfterRoot) {
				this.fail("text data outside of root node.");
				this.reportedTextAfterRoot = true;
			}
		}
		pushAttribNS(name, value) {
			var _a;
			const { prefix, local } = this.qname(name);
			const attr = {
				name,
				prefix,
				local,
				value
			};
			this.attribList.push(attr);
			(_a = this.attributeHandler) === null || _a === void 0 || _a.call(this, attr);
			if (prefix === "xmlns") {
				const trimmed = value.trim();
				if (this.currentXMLVersion === "1.0" && trimmed === "") this.fail("invalid attempt to undefine prefix in XML 1.0");
				this.topNS[local] = trimmed;
				nsPairCheck(this, local, trimmed);
			} else if (name === "xmlns") {
				const trimmed = value.trim();
				this.topNS[""] = trimmed;
				nsPairCheck(this, "", trimmed);
			}
		}
		pushAttribPlain(name, value) {
			var _a;
			const attr = {
				name,
				value
			};
			this.attribList.push(attr);
			(_a = this.attributeHandler) === null || _a === void 0 || _a.call(this, attr);
		}
		/**
		* End parsing. This performs final well-formedness checks and resets the
		* parser to a clean state.
		*
		* @returns this
		*/
		end() {
			var _a, _b;
			if (!this.sawRoot) this.fail("document must contain a root element.");
			const { tags } = this;
			while (tags.length > 0) {
				const tag = tags.pop();
				this.fail(`unclosed tag: ${tag.name}`);
			}
			if (this.state !== S_BEGIN && this.state !== S_TEXT) this.fail("unexpected end.");
			const { text } = this;
			if (text.length !== 0) {
				(_a = this.textHandler) === null || _a === void 0 || _a.call(this, text);
				this.text = "";
			}
			this._closed = true;
			(_b = this.endHandler) === null || _b === void 0 || _b.call(this);
			this._init();
			return this;
		}
		/**
		* Resolve a namespace prefix.
		*
		* @param prefix The prefix to resolve.
		*
		* @returns The namespace URI or ``undefined`` if the prefix is not defined.
		*/
		resolve(prefix) {
			var _a, _b;
			let uri = this.topNS[prefix];
			if (uri !== void 0) return uri;
			const { tags } = this;
			for (let index = tags.length - 1; index >= 0; index--) {
				uri = tags[index].ns[prefix];
				if (uri !== void 0) return uri;
			}
			uri = this.ns[prefix];
			if (uri !== void 0) return uri;
			return (_b = (_a = this.opt).resolvePrefix) === null || _b === void 0 ? void 0 : _b.call(_a, prefix);
		}
		/**
		* Parse a qname into its prefix and local name parts.
		*
		* @param name The name to parse
		*
		* @returns
		*/
		qname(name) {
			const colon = name.indexOf(":");
			if (colon === -1) return {
				prefix: "",
				local: name
			};
			const local = name.slice(colon + 1);
			const prefix = name.slice(0, colon);
			if (prefix === "" || local === "" || local.includes(":")) this.fail(`malformed name: ${name}.`);
			return {
				prefix,
				local
			};
		}
		processAttribsNS() {
			var _a;
			const { attribList } = this;
			const tag = this.tag;
			{
				const { prefix, local } = this.qname(tag.name);
				tag.prefix = prefix;
				tag.local = local;
				const uri = tag.uri = (_a = this.resolve(prefix)) !== null && _a !== void 0 ? _a : "";
				if (prefix !== "") {
					if (prefix === "xmlns") this.fail("tags may not have \"xmlns\" as prefix.");
					if (uri === "") {
						this.fail(`unbound namespace prefix: ${JSON.stringify(prefix)}.`);
						tag.uri = prefix;
					}
				}
			}
			if (attribList.length === 0) return;
			const { attributes } = tag;
			const seen = /* @__PURE__ */ new Set();
			for (const attr of attribList) {
				const { name, prefix, local } = attr;
				let uri;
				let eqname;
				if (prefix === "") {
					uri = name === "xmlns" ? XMLNS_NAMESPACE : "";
					eqname = name;
				} else {
					uri = this.resolve(prefix);
					if (uri === void 0) {
						this.fail(`unbound namespace prefix: ${JSON.stringify(prefix)}.`);
						uri = prefix;
					}
					eqname = `{${uri}}${local}`;
				}
				if (seen.has(eqname)) this.fail(`duplicate attribute: ${eqname}.`);
				seen.add(eqname);
				attr.uri = uri;
				attributes[name] = attr;
			}
			this.attribList = [];
		}
		processAttribsPlain() {
			const { attribList } = this;
			const attributes = this.tag.attributes;
			for (const { name, value } of attribList) {
				if (attributes[name] !== void 0) this.fail(`duplicate attribute: ${name}.`);
				attributes[name] = value;
			}
			this.attribList = [];
		}
		/**
		* Handle a complete open tag. This parser code calls this once it has seen
		* the whole tag. This method checks for well-formeness and then emits
		* ``onopentag``.
		*/
		openTag() {
			var _a;
			this.processAttribs();
			const { tags } = this;
			const tag = this.tag;
			tag.isSelfClosing = false;
			(_a = this.openTagHandler) === null || _a === void 0 || _a.call(this, tag);
			tags.push(tag);
			this.state = S_TEXT;
			this.name = "";
		}
		/**
		* Handle a complete self-closing tag. This parser code calls this once it has
		* seen the whole tag. This method checks for well-formeness and then emits
		* ``onopentag`` and ``onclosetag``.
		*/
		openSelfClosingTag() {
			var _a, _b, _c;
			this.processAttribs();
			const { tags } = this;
			const tag = this.tag;
			tag.isSelfClosing = true;
			(_a = this.openTagHandler) === null || _a === void 0 || _a.call(this, tag);
			(_b = this.closeTagHandler) === null || _b === void 0 || _b.call(this, tag);
			if ((this.tag = (_c = tags[tags.length - 1]) !== null && _c !== void 0 ? _c : null) === null) this.closedRoot = true;
			this.state = S_TEXT;
			this.name = "";
		}
		/**
		* Handle a complete close tag. This parser code calls this once it has seen
		* the whole tag. This method checks for well-formeness and then emits
		* ``onclosetag``.
		*/
		closeTag() {
			const { tags, name } = this;
			this.state = S_TEXT;
			this.name = "";
			if (name === "") {
				this.fail("weird empty close tag.");
				this.text += "</>";
				return;
			}
			const handler = this.closeTagHandler;
			let l = tags.length;
			while (l-- > 0) {
				const tag = this.tag = tags.pop();
				this.topNS = tag.ns;
				handler === null || handler === void 0 || handler(tag);
				if (tag.name === name) break;
				this.fail("unexpected close tag.");
			}
			if (l === 0) this.closedRoot = true;
			else if (l < 0) {
				this.fail(`unmatched closing tag: ${name}.`);
				this.text += `</${name}>`;
			}
		}
		/**
		* Resolves an entity. Makes any necessary well-formedness checks.
		*
		* @param entity The entity to resolve.
		*
		* @returns The parsed entity.
		*/
		parseEntity(entity) {
			if (entity[0] !== "#") {
				const defined = this.ENTITIES[entity];
				if (defined !== void 0) return defined;
				this.fail(this.isName(entity) ? "undefined entity." : "disallowed character in entity name.");
				return `&${entity};`;
			}
			let num = NaN;
			if (entity[1] === "x" && /^#x[0-9a-f]+$/i.test(entity)) num = parseInt(entity.slice(2), 16);
			else if (/^#[0-9]+$/.test(entity)) num = parseInt(entity.slice(1), 10);
			if (!this.isChar(num)) {
				this.fail("malformed character entity.");
				return `&${entity};`;
			}
			return String.fromCodePoint(num);
		}
	};
	exports.SaxesParser = SaxesParser;
}));
//#endregion
//#region node_modules/exceljs/lib/utils/parse-sax.js
var require_parse_sax = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var { SaxesParser } = require_saxes();
	var { PassThrough } = require_readable$2();
	var { bufferToString } = require_browser_buffer_decode();
	module.exports = async function* (iterable) {
		if (iterable.pipe && !iterable[Symbol.asyncIterator]) iterable = iterable.pipe(new PassThrough());
		const saxesParser = new SaxesParser();
		let error;
		saxesParser.on("error", (err) => {
			error = err;
		});
		let events = [];
		saxesParser.on("opentag", (value) => events.push({
			eventType: "opentag",
			value
		}));
		saxesParser.on("text", (value) => events.push({
			eventType: "text",
			value
		}));
		saxesParser.on("closetag", (value) => events.push({
			eventType: "closetag",
			value
		}));
		for await (const chunk of iterable) {
			saxesParser.write(bufferToString(chunk));
			if (error) throw error;
			yield events;
			events = [];
		}
	};
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/base-xform.js
var require_base_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var parseSax = require_parse_sax();
	var XmlStream = require_xml_stream();
	module.exports = class BaseXform {
		prepare() {}
		render() {}
		parseOpen(node) {}
		parseText(text) {}
		parseClose(name) {}
		reconcile(model, options) {}
		reset() {
			this.model = null;
			if (this.map) Object.values(this.map).forEach((xform) => {
				if (xform instanceof BaseXform) xform.reset();
				else if (xform.xform) xform.xform.reset();
			});
		}
		mergeModel(obj) {
			this.model = Object.assign(this.model || {}, obj);
		}
		async parse(saxParser) {
			for await (const events of saxParser) for (const { eventType, value } of events) if (eventType === "opentag") this.parseOpen(value);
			else if (eventType === "text") this.parseText(value);
			else if (eventType === "closetag") {
				if (!this.parseClose(value.name)) return this.model;
			}
			return this.model;
		}
		async parseStream(stream) {
			return this.parse(parseSax(stream));
		}
		get xml() {
			return this.toXml(this.model);
		}
		toXml(model) {
			const xmlStream = new XmlStream();
			this.render(xmlStream, model);
			return xmlStream.xml;
		}
		static toAttribute(value, dflt, always = false) {
			if (value === void 0) {
				if (always) return dflt;
			} else if (always || value !== dflt) return value.toString();
		}
		static toStringAttribute(value, dflt, always = false) {
			return BaseXform.toAttribute(value, dflt, always);
		}
		static toStringValue(attr, dflt) {
			return attr === void 0 ? dflt : attr;
		}
		static toBoolAttribute(value, dflt, always = false) {
			if (value === void 0) {
				if (always) return dflt;
			} else if (always || value !== dflt) return value ? "1" : "0";
		}
		static toBoolValue(attr, dflt) {
			return attr === void 0 ? dflt : attr === "1";
		}
		static toIntAttribute(value, dflt, always = false) {
			return BaseXform.toAttribute(value, dflt, always);
		}
		static toIntValue(attr, dflt) {
			return attr === void 0 ? dflt : parseInt(attr, 10);
		}
		static toFloatAttribute(value, dflt, always = false) {
			return BaseXform.toAttribute(value, dflt, always);
		}
		static toFloatValue(attr, dflt) {
			return attr === void 0 ? dflt : parseFloat(attr);
		}
	};
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/static-xform.js
var require_static_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var BaseXform = require_base_xform();
	var XmlStream = require_xml_stream();
	function build(xmlStream, model) {
		xmlStream.openNode(model.tag, model.$);
		if (model.c) model.c.forEach((child) => {
			build(xmlStream, child);
		});
		if (model.t) xmlStream.writeText(model.t);
		xmlStream.closeNode();
	}
	var StaticXform = class extends BaseXform {
		constructor(model) {
			super();
			this._model = model;
		}
		render(xmlStream) {
			if (!this._xml) {
				const stream = new XmlStream();
				build(stream, this._model);
				this._xml = stream.xml;
			}
			xmlStream.writeXml(this._xml);
		}
		parseOpen() {
			return true;
		}
		parseText() {}
		parseClose(name) {
			switch (name) {
				case this._model.tag: return false;
				default: return true;
			}
		}
	};
	module.exports = StaticXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/list-xform.js
var require_list_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var BaseXform = require_base_xform();
	var ListXform = class extends BaseXform {
		constructor(options) {
			super();
			this.tag = options.tag;
			this.always = !!options.always;
			this.count = options.count;
			this.empty = options.empty;
			this.$count = options.$count || "count";
			this.$ = options.$;
			this.childXform = options.childXform;
			this.maxItems = options.maxItems;
		}
		prepare(model, options) {
			const { childXform } = this;
			if (model) model.forEach((childModel, index) => {
				options.index = index;
				childXform.prepare(childModel, options);
			});
		}
		render(xmlStream, model) {
			if (this.always || model && model.length) {
				xmlStream.openNode(this.tag, this.$);
				if (this.count) xmlStream.addAttribute(this.$count, model && model.length || 0);
				const { childXform } = this;
				(model || []).forEach((childModel, index) => {
					childXform.render(xmlStream, childModel, index);
				});
				xmlStream.closeNode();
			} else if (this.empty) xmlStream.leafNode(this.tag);
		}
		parseOpen(node) {
			if (this.parser) {
				this.parser.parseOpen(node);
				return true;
			}
			switch (node.name) {
				case this.tag:
					this.model = [];
					return true;
				default:
					if (this.childXform.parseOpen(node)) {
						this.parser = this.childXform;
						return true;
					}
					return false;
			}
		}
		parseText(text) {
			if (this.parser) this.parser.parseText(text);
		}
		parseClose(name) {
			if (this.parser) {
				if (!this.parser.parseClose(name)) {
					this.model.push(this.parser.model);
					this.parser = void 0;
					if (this.maxItems && this.model.length > this.maxItems) throw new Error(`Max ${this.childXform.tag} count (${this.maxItems}) exceeded`);
				}
				return true;
			}
			return false;
		}
		reconcile(model, options) {
			if (model) {
				const { childXform } = this;
				model.forEach((childModel) => {
					childXform.reconcile(childModel, options);
				});
			}
		}
	};
	module.exports = ListXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/style/color-xform.js
var require_color_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var BaseXform = require_base_xform();
	var ColorXform = class extends BaseXform {
		constructor(name) {
			super();
			this.name = name || "color";
		}
		get tag() {
			return this.name;
		}
		render(xmlStream, model) {
			if (model) {
				xmlStream.openNode(this.name);
				if (model.argb) xmlStream.addAttribute("rgb", model.argb);
				else if (model.theme !== void 0) {
					xmlStream.addAttribute("theme", model.theme);
					if (model.tint !== void 0) xmlStream.addAttribute("tint", model.tint);
				} else if (model.indexed !== void 0) xmlStream.addAttribute("indexed", model.indexed);
				else xmlStream.addAttribute("auto", "1");
				xmlStream.closeNode();
				return true;
			}
			return false;
		}
		parseOpen(node) {
			if (node.name === this.name) {
				if (node.attributes.rgb) this.model = { argb: node.attributes.rgb };
				else if (node.attributes.theme) {
					this.model = { theme: parseInt(node.attributes.theme, 10) };
					if (node.attributes.tint) this.model.tint = parseFloat(node.attributes.tint);
				} else if (node.attributes.indexed) this.model = { indexed: parseInt(node.attributes.indexed, 10) };
				else this.model = void 0;
				return true;
			}
			return false;
		}
		parseText() {}
		parseClose() {
			return false;
		}
	};
	module.exports = ColorXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/simple/boolean-xform.js
var require_boolean_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var BaseXform = require_base_xform();
	var BooleanXform = class extends BaseXform {
		constructor(options) {
			super();
			this.tag = options.tag;
			this.attr = options.attr;
		}
		render(xmlStream, model) {
			if (model) {
				xmlStream.openNode(this.tag);
				xmlStream.closeNode();
			}
		}
		parseOpen(node) {
			if (node.name === this.tag) this.model = true;
		}
		parseText() {}
		parseClose() {
			return false;
		}
	};
	module.exports = BooleanXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/simple/integer-xform.js
var require_integer_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var BaseXform = require_base_xform();
	var IntegerXform = class extends BaseXform {
		constructor(options) {
			super();
			this.tag = options.tag;
			this.attr = options.attr;
			this.attrs = options.attrs;
			this.zero = options.zero;
		}
		render(xmlStream, model) {
			if (model || this.zero) {
				xmlStream.openNode(this.tag);
				if (this.attrs) xmlStream.addAttributes(this.attrs);
				if (this.attr) xmlStream.addAttribute(this.attr, model);
				else xmlStream.writeText(model);
				xmlStream.closeNode();
			}
		}
		parseOpen(node) {
			if (node.name === this.tag) {
				if (this.attr) this.model = parseInt(node.attributes[this.attr], 10);
				else this.text = [];
				return true;
			}
			return false;
		}
		parseText(text) {
			if (!this.attr) this.text.push(text);
		}
		parseClose() {
			if (!this.attr) this.model = parseInt(this.text.join("") || 0, 10);
			return false;
		}
	};
	module.exports = IntegerXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/simple/string-xform.js
var require_string_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var BaseXform = require_base_xform();
	var StringXform = class extends BaseXform {
		constructor(options) {
			super();
			this.tag = options.tag;
			this.attr = options.attr;
			this.attrs = options.attrs;
		}
		render(xmlStream, model) {
			if (model !== void 0) {
				xmlStream.openNode(this.tag);
				if (this.attrs) xmlStream.addAttributes(this.attrs);
				if (this.attr) xmlStream.addAttribute(this.attr, model);
				else xmlStream.writeText(model);
				xmlStream.closeNode();
			}
		}
		parseOpen(node) {
			if (node.name === this.tag) {
				if (this.attr) this.model = node.attributes[this.attr];
				else this.text = [];
			}
		}
		parseText(text) {
			if (!this.attr) this.text.push(text);
		}
		parseClose() {
			if (!this.attr) this.model = this.text.join("");
			return false;
		}
	};
	module.exports = StringXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/style/underline-xform.js
var require_underline_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var BaseXform = require_base_xform();
	var UnderlineXform = class UnderlineXform extends BaseXform {
		constructor(model) {
			super();
			this.model = model;
		}
		get tag() {
			return "u";
		}
		render(xmlStream, model) {
			model = model || this.model;
			if (model === true) xmlStream.leafNode("u");
			else {
				const attr = UnderlineXform.Attributes[model];
				if (attr) xmlStream.leafNode("u", attr);
			}
		}
		parseOpen(node) {
			if (node.name === "u") this.model = node.attributes.val || true;
		}
		parseText() {}
		parseClose() {
			return false;
		}
	};
	UnderlineXform.Attributes = {
		single: {},
		double: { val: "double" },
		singleAccounting: { val: "singleAccounting" },
		doubleAccounting: { val: "doubleAccounting" }
	};
	module.exports = UnderlineXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/style/font-xform.js
var require_font_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var ColorXform = require_color_xform();
	var BooleanXform = require_boolean_xform();
	var IntegerXform = require_integer_xform();
	var StringXform = require_string_xform();
	var UnderlineXform = require_underline_xform();
	var _ = require_under_dash();
	var BaseXform = require_base_xform();
	var FontXform = class FontXform extends BaseXform {
		constructor(options) {
			super();
			this.options = options || FontXform.OPTIONS;
			this.map = {
				b: {
					prop: "bold",
					xform: new BooleanXform({
						tag: "b",
						attr: "val"
					})
				},
				i: {
					prop: "italic",
					xform: new BooleanXform({
						tag: "i",
						attr: "val"
					})
				},
				u: {
					prop: "underline",
					xform: new UnderlineXform()
				},
				charset: {
					prop: "charset",
					xform: new IntegerXform({
						tag: "charset",
						attr: "val"
					})
				},
				color: {
					prop: "color",
					xform: new ColorXform()
				},
				condense: {
					prop: "condense",
					xform: new BooleanXform({
						tag: "condense",
						attr: "val"
					})
				},
				extend: {
					prop: "extend",
					xform: new BooleanXform({
						tag: "extend",
						attr: "val"
					})
				},
				family: {
					prop: "family",
					xform: new IntegerXform({
						tag: "family",
						attr: "val"
					})
				},
				outline: {
					prop: "outline",
					xform: new BooleanXform({
						tag: "outline",
						attr: "val"
					})
				},
				vertAlign: {
					prop: "vertAlign",
					xform: new StringXform({
						tag: "vertAlign",
						attr: "val"
					})
				},
				scheme: {
					prop: "scheme",
					xform: new StringXform({
						tag: "scheme",
						attr: "val"
					})
				},
				shadow: {
					prop: "shadow",
					xform: new BooleanXform({
						tag: "shadow",
						attr: "val"
					})
				},
				strike: {
					prop: "strike",
					xform: new BooleanXform({
						tag: "strike",
						attr: "val"
					})
				},
				sz: {
					prop: "size",
					xform: new IntegerXform({
						tag: "sz",
						attr: "val"
					})
				}
			};
			this.map[this.options.fontNameTag] = {
				prop: "name",
				xform: new StringXform({
					tag: this.options.fontNameTag,
					attr: "val"
				})
			};
		}
		get tag() {
			return this.options.tagName;
		}
		render(xmlStream, model) {
			const { map } = this;
			xmlStream.openNode(this.options.tagName);
			_.each(this.map, (defn, tag) => {
				map[tag].xform.render(xmlStream, model[defn.prop]);
			});
			xmlStream.closeNode();
		}
		parseOpen(node) {
			if (this.parser) {
				this.parser.parseOpen(node);
				return true;
			}
			if (this.map[node.name]) {
				this.parser = this.map[node.name].xform;
				return this.parser.parseOpen(node);
			}
			switch (node.name) {
				case this.options.tagName:
					this.model = {};
					return true;
				default: return false;
			}
		}
		parseText(text) {
			if (this.parser) this.parser.parseText(text);
		}
		parseClose(name) {
			if (this.parser && !this.parser.parseClose(name)) {
				const item = this.map[name];
				if (this.parser.model) this.model[item.prop] = this.parser.model;
				this.parser = void 0;
				return true;
			}
			switch (name) {
				case this.options.tagName: return false;
				default: return true;
			}
		}
	};
	FontXform.OPTIONS = {
		tagName: "font",
		fontNameTag: "name"
	};
	module.exports = FontXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/style/fill-xform.js
var require_fill_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var BaseXform = require_base_xform();
	var ColorXform = require_color_xform();
	var StopXform = class extends BaseXform {
		constructor() {
			super();
			this.map = { color: new ColorXform() };
		}
		get tag() {
			return "stop";
		}
		render(xmlStream, model) {
			xmlStream.openNode("stop");
			xmlStream.addAttribute("position", model.position);
			this.map.color.render(xmlStream, model.color);
			xmlStream.closeNode();
		}
		parseOpen(node) {
			if (this.parser) {
				this.parser.parseOpen(node);
				return true;
			}
			switch (node.name) {
				case "stop":
					this.model = { position: parseFloat(node.attributes.position) };
					return true;
				case "color":
					this.parser = this.map.color;
					this.parser.parseOpen(node);
					return true;
				default: return false;
			}
		}
		parseText() {}
		parseClose(name) {
			if (this.parser) {
				if (!this.parser.parseClose(name)) {
					this.model.color = this.parser.model;
					this.parser = void 0;
				}
				return true;
			}
			return false;
		}
	};
	var PatternFillXform = class extends BaseXform {
		constructor() {
			super();
			this.map = {
				fgColor: new ColorXform("fgColor"),
				bgColor: new ColorXform("bgColor")
			};
		}
		get name() {
			return "pattern";
		}
		get tag() {
			return "patternFill";
		}
		render(xmlStream, model) {
			xmlStream.openNode("patternFill");
			xmlStream.addAttribute("patternType", model.pattern);
			if (model.fgColor) this.map.fgColor.render(xmlStream, model.fgColor);
			if (model.bgColor) this.map.bgColor.render(xmlStream, model.bgColor);
			xmlStream.closeNode();
		}
		parseOpen(node) {
			if (this.parser) {
				this.parser.parseOpen(node);
				return true;
			}
			switch (node.name) {
				case "patternFill":
					this.model = {
						type: "pattern",
						pattern: node.attributes.patternType
					};
					return true;
				default:
					this.parser = this.map[node.name];
					if (this.parser) {
						this.parser.parseOpen(node);
						return true;
					}
					return false;
			}
		}
		parseText(text) {
			if (this.parser) this.parser.parseText(text);
		}
		parseClose(name) {
			if (this.parser) {
				if (!this.parser.parseClose(name)) {
					if (this.parser.model) this.model[name] = this.parser.model;
					this.parser = void 0;
				}
				return true;
			}
			return false;
		}
	};
	var GradientFillXform = class extends BaseXform {
		constructor() {
			super();
			this.map = { stop: new StopXform() };
		}
		get name() {
			return "gradient";
		}
		get tag() {
			return "gradientFill";
		}
		render(xmlStream, model) {
			xmlStream.openNode("gradientFill");
			switch (model.gradient) {
				case "angle":
					xmlStream.addAttribute("degree", model.degree);
					break;
				case "path":
					xmlStream.addAttribute("type", "path");
					if (model.center.left) {
						xmlStream.addAttribute("left", model.center.left);
						if (model.center.right === void 0) xmlStream.addAttribute("right", model.center.left);
					}
					if (model.center.right) xmlStream.addAttribute("right", model.center.right);
					if (model.center.top) {
						xmlStream.addAttribute("top", model.center.top);
						if (model.center.bottom === void 0) xmlStream.addAttribute("bottom", model.center.top);
					}
					if (model.center.bottom) xmlStream.addAttribute("bottom", model.center.bottom);
			}
			const stopXform = this.map.stop;
			model.stops.forEach((stopModel) => {
				stopXform.render(xmlStream, stopModel);
			});
			xmlStream.closeNode();
		}
		parseOpen(node) {
			if (this.parser) {
				this.parser.parseOpen(node);
				return true;
			}
			switch (node.name) {
				case "gradientFill": {
					const model = this.model = { stops: [] };
					if (node.attributes.degree) {
						model.gradient = "angle";
						model.degree = parseInt(node.attributes.degree, 10);
					} else if (node.attributes.type === "path") {
						model.gradient = "path";
						model.center = {
							left: node.attributes.left ? parseFloat(node.attributes.left) : 0,
							top: node.attributes.top ? parseFloat(node.attributes.top) : 0
						};
						if (node.attributes.right !== node.attributes.left) model.center.right = node.attributes.right ? parseFloat(node.attributes.right) : 0;
						if (node.attributes.bottom !== node.attributes.top) model.center.bottom = node.attributes.bottom ? parseFloat(node.attributes.bottom) : 0;
					}
					return true;
				}
				case "stop":
					this.parser = this.map.stop;
					this.parser.parseOpen(node);
					return true;
				default: return false;
			}
		}
		parseText(text) {
			if (this.parser) this.parser.parseText(text);
		}
		parseClose(name) {
			if (this.parser) {
				if (!this.parser.parseClose(name)) {
					this.model.stops.push(this.parser.model);
					this.parser = void 0;
				}
				return true;
			}
			return false;
		}
	};
	var FillXform = class FillXform extends BaseXform {
		constructor() {
			super();
			this.map = {
				patternFill: new PatternFillXform(),
				gradientFill: new GradientFillXform()
			};
		}
		get tag() {
			return "fill";
		}
		render(xmlStream, model) {
			xmlStream.addRollback();
			xmlStream.openNode("fill");
			switch (model.type) {
				case "pattern":
					this.map.patternFill.render(xmlStream, model);
					break;
				case "gradient":
					this.map.gradientFill.render(xmlStream, model);
					break;
				default:
					xmlStream.rollback();
					return;
			}
			xmlStream.closeNode();
			xmlStream.commit();
		}
		parseOpen(node) {
			if (this.parser) {
				this.parser.parseOpen(node);
				return true;
			}
			switch (node.name) {
				case "fill":
					this.model = {};
					return true;
				default:
					this.parser = this.map[node.name];
					if (this.parser) {
						this.parser.parseOpen(node);
						return true;
					}
					return false;
			}
		}
		parseText(text) {
			if (this.parser) this.parser.parseText(text);
		}
		parseClose(name) {
			if (this.parser) {
				if (!this.parser.parseClose(name)) {
					this.model = this.parser.model;
					this.model.type = this.parser.name;
					this.parser = void 0;
				}
				return true;
			}
			return false;
		}
		validStyle(value) {
			return FillXform.validPatternValues[value];
		}
	};
	FillXform.validPatternValues = [
		"none",
		"solid",
		"darkVertical",
		"darkGray",
		"mediumGray",
		"lightGray",
		"gray125",
		"gray0625",
		"darkHorizontal",
		"darkVertical",
		"darkDown",
		"darkUp",
		"darkGrid",
		"darkTrellis",
		"lightHorizontal",
		"lightVertical",
		"lightDown",
		"lightUp",
		"lightGrid",
		"lightTrellis",
		"lightGrid"
	].reduce((p, v) => {
		p[v] = true;
		return p;
	}, {});
	FillXform.StopXform = StopXform;
	FillXform.PatternFillXform = PatternFillXform;
	FillXform.GradientFillXform = GradientFillXform;
	module.exports = FillXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/style/border-xform.js
var require_border_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var BaseXform = require_base_xform();
	var utils = require_utils();
	var ColorXform = require_color_xform();
	var EdgeXform = class EdgeXform extends BaseXform {
		constructor(name) {
			super();
			this.name = name;
			this.map = { color: new ColorXform() };
		}
		get tag() {
			return this.name;
		}
		render(xmlStream, model, defaultColor) {
			const color = model && model.color || defaultColor || this.defaultColor;
			xmlStream.openNode(this.name);
			if (model && model.style) {
				xmlStream.addAttribute("style", model.style);
				if (color) this.map.color.render(xmlStream, color);
			}
			xmlStream.closeNode();
		}
		parseOpen(node) {
			if (this.parser) {
				this.parser.parseOpen(node);
				return true;
			}
			switch (node.name) {
				case this.name: {
					const { style } = node.attributes;
					if (style) this.model = { style };
					else this.model = void 0;
					return true;
				}
				case "color":
					this.parser = this.map.color;
					this.parser.parseOpen(node);
					return true;
				default: return false;
			}
		}
		parseText(text) {
			if (this.parser) this.parser.parseText(text);
		}
		parseClose(name) {
			if (this.parser) {
				if (!this.parser.parseClose(name)) this.parser = void 0;
				return true;
			}
			if (name === this.name) {
				if (this.map.color.model) {
					if (!this.model) this.model = {};
					this.model.color = this.map.color.model;
				}
			}
			return false;
		}
		validStyle(value) {
			return EdgeXform.validStyleValues[value];
		}
	};
	EdgeXform.validStyleValues = [
		"thin",
		"dashed",
		"dotted",
		"dashDot",
		"hair",
		"dashDotDot",
		"slantDashDot",
		"mediumDashed",
		"mediumDashDotDot",
		"mediumDashDot",
		"medium",
		"double",
		"thick"
	].reduce((p, v) => {
		p[v] = true;
		return p;
	}, {});
	var BorderXform = class extends BaseXform {
		constructor() {
			super();
			this.map = {
				top: new EdgeXform("top"),
				left: new EdgeXform("left"),
				bottom: new EdgeXform("bottom"),
				right: new EdgeXform("right"),
				diagonal: new EdgeXform("diagonal")
			};
		}
		render(xmlStream, model) {
			const { color } = model;
			xmlStream.openNode("border");
			if (model.diagonal && model.diagonal.style) {
				if (model.diagonal.up) xmlStream.addAttribute("diagonalUp", "1");
				if (model.diagonal.down) xmlStream.addAttribute("diagonalDown", "1");
			}
			function add(edgeModel, edgeXform) {
				if (edgeModel && !edgeModel.color && model.color) edgeModel = {
					...edgeModel,
					color: model.color
				};
				edgeXform.render(xmlStream, edgeModel, color);
			}
			add(model.left, this.map.left);
			add(model.right, this.map.right);
			add(model.top, this.map.top);
			add(model.bottom, this.map.bottom);
			add(model.diagonal, this.map.diagonal);
			xmlStream.closeNode();
		}
		parseOpen(node) {
			if (this.parser) {
				this.parser.parseOpen(node);
				return true;
			}
			switch (node.name) {
				case "border":
					this.reset();
					this.diagonalUp = utils.parseBoolean(node.attributes.diagonalUp);
					this.diagonalDown = utils.parseBoolean(node.attributes.diagonalDown);
					return true;
				default:
					this.parser = this.map[node.name];
					if (this.parser) {
						this.parser.parseOpen(node);
						return true;
					}
					return false;
			}
		}
		parseText(text) {
			if (this.parser) this.parser.parseText(text);
		}
		parseClose(name) {
			if (this.parser) {
				if (!this.parser.parseClose(name)) this.parser = void 0;
				return true;
			}
			if (name === "border") {
				const model = this.model = {};
				const add = function(key, edgeModel, extensions) {
					if (edgeModel) {
						if (extensions) Object.assign(edgeModel, extensions);
						model[key] = edgeModel;
					}
				};
				add("left", this.map.left.model);
				add("right", this.map.right.model);
				add("top", this.map.top.model);
				add("bottom", this.map.bottom.model);
				add("diagonal", this.map.diagonal.model, {
					up: this.diagonalUp,
					down: this.diagonalDown
				});
			}
			return false;
		}
	};
	module.exports = BorderXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/defaultnumformats.js
var require_defaultnumformats = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = {
		0: { f: "General" },
		1: { f: "0" },
		2: { f: "0.00" },
		3: { f: "#,##0" },
		4: { f: "#,##0.00" },
		9: { f: "0%" },
		10: { f: "0.00%" },
		11: { f: "0.00E+00" },
		12: { f: "# ?/?" },
		13: { f: "# ??/??" },
		14: { f: "mm-dd-yy" },
		15: { f: "d-mmm-yy" },
		16: { f: "d-mmm" },
		17: { f: "mmm-yy" },
		18: { f: "h:mm AM/PM" },
		19: { f: "h:mm:ss AM/PM" },
		20: { f: "h:mm" },
		21: { f: "h:mm:ss" },
		22: { f: "m/d/yy \"h\":mm" },
		27: {
			"zh-tw": "[$-404]e/m/d",
			"zh-cn": "yyyy\"年\"m\"月\"",
			"ja-jp": "[$-411]ge.m.d",
			"ko-kr": "yyyy\"年\" mm\"月\" dd\"日\""
		},
		28: {
			"zh-tw": "[$-404]e\"年\"m\"月\"d\"日\"",
			"zh-cn": "m\"月\"d\"日\"",
			"ja-jp": "[$-411]ggge\"年\"m\"月\"d\"日\"",
			"ko-kr": "mm-dd"
		},
		29: {
			"zh-tw": "[$-404]e\"年\"m\"月\"d\"日\"",
			"zh-cn": "m\"月\"d\"日\"",
			"ja-jp": "[$-411]ggge\"年\"m\"月\"d\"日\"",
			"ko-kr": "mm-dd"
		},
		30: {
			"zh-tw": "m/d/yy ",
			"zh-cn": "m-d-yy",
			"ja-jp": "m/d/yy",
			"ko-kr": "mm-dd-yy"
		},
		31: {
			"zh-tw": "yyyy\"年\"m\"月\"d\"日\"",
			"zh-cn": "yyyy\"年\"m\"月\"d\"日\"",
			"ja-jp": "yyyy\"年\"m\"月\"d\"日\"",
			"ko-kr": "yyyy\"년\" mm\"월\" dd\"일\""
		},
		32: {
			"zh-tw": "hh\"時\"mm\"分\"",
			"zh-cn": "h\"时\"mm\"分\"",
			"ja-jp": "h\"時\"mm\"分\"",
			"ko-kr": "h\"시\" mm\"분\""
		},
		33: {
			"zh-tw": "hh\"時\"mm\"分\"ss\"秒\"",
			"zh-cn": "h\"时\"mm\"分\"ss\"秒\"",
			"ja-jp": "h\"時\"mm\"分\"ss\"秒\"",
			"ko-kr": "h\"시\" mm\"분\" ss\"초\""
		},
		34: {
			"zh-tw": "上午/下午 hh\"時\"mm\"分\"",
			"zh-cn": "上午/下午 h\"时\"mm\"分\"",
			"ja-jp": "yyyy\"年\"m\"月\"",
			"ko-kr": "yyyy-mm-dd"
		},
		35: {
			"zh-tw": "上午/下午 hh\"時\"mm\"分\"ss\"秒\"",
			"zh-cn": "上午/下午 h\"时\"mm\"分\"ss\"秒\"",
			"ja-jp": "m\"月\"d\"日\"",
			"ko-kr": "yyyy-mm-dd"
		},
		36: {
			"zh-tw": "[$-404]e/m/d",
			"zh-cn": "yyyy\"年\"m\"月\"",
			"ja-jp": "[$-411]ge.m.d",
			"ko-kr": "yyyy\"年\" mm\"月\" dd\"日\""
		},
		37: { f: "#,##0 ;(#,##0)" },
		38: { f: "#,##0 ;[Red](#,##0)" },
		39: { f: "#,##0.00 ;(#,##0.00)" },
		40: { f: "#,##0.00 ;[Red](#,##0.00)" },
		45: { f: "mm:ss" },
		46: { f: "[h]:mm:ss" },
		47: { f: "mmss.0" },
		48: { f: "##0.0E+0" },
		49: { f: "@" },
		50: {
			"zh-tw": "[$-404]e/m/d",
			"zh-cn": "yyyy\"年\"m\"月\"",
			"ja-jp": "[$-411]ge.m.d",
			"ko-kr": "yyyy\"年\" mm\"月\" dd\"日\""
		},
		51: {
			"zh-tw": "[$-404]e\"年\"m\"月\"d\"日\"",
			"zh-cn": "m\"月\"d\"日\"",
			"ja-jp": "[$-411]ggge\"年\"m\"月\"d\"日\"",
			"ko-kr": "mm-dd"
		},
		52: {
			"zh-tw": "上午/下午 hh\"時\"mm\"分\"",
			"zh-cn": "yyyy\"年\"m\"月\"",
			"ja-jp": "yyyy\"年\"m\"月\"",
			"ko-kr": "yyyy-mm-dd"
		},
		53: {
			"zh-tw": "上午/下午 hh\"時\"mm\"分\"ss\"秒\"",
			"zh-cn": "m\"月\"d\"日\"",
			"ja-jp": "m\"月\"d\"日\"",
			"ko-kr": "yyyy-mm-dd"
		},
		54: {
			"zh-tw": "[$-404]e\"年\"m\"月\"d\"日\"",
			"zh-cn": "m\"月\"d\"日\"",
			"ja-jp": "[$-411]ggge\"年\"m\"月\"d\"日\"",
			"ko-kr": "mm-dd"
		},
		55: {
			"zh-tw": "上午/下午 hh\"時\"mm\"分\"",
			"zh-cn": "上午/下午 h\"时\"mm\"分\"",
			"ja-jp": "yyyy\"年\"m\"月\"",
			"ko-kr": "yyyy-mm-dd"
		},
		56: {
			"zh-tw": "上午/下午 hh\"時\"mm\"分\"ss\"秒\"",
			"zh-cn": "上午/下午 h\"时\"mm\"分\"ss\"秒\"",
			"ja-jp": "m\"月\"d\"日\"",
			"ko-kr": "yyyy-mm-dd"
		},
		57: {
			"zh-tw": "[$-404]e/m/d",
			"zh-cn": "yyyy\"年\"m\"月\"",
			"ja-jp": "[$-411]ge.m.d",
			"ko-kr": "yyyy\"年\" mm\"月\" dd\"日\""
		},
		58: {
			"zh-tw": "[$-404]e\"年\"m\"月\"d\"日\"",
			"zh-cn": "m\"月\"d\"日\"",
			"ja-jp": "[$-411]ggge\"年\"m\"月\"d\"日\"",
			"ko-kr": "mm-dd"
		},
		59: { "th-th": "t0" },
		60: { "th-th": "t0.00" },
		61: { "th-th": "t#,##0" },
		62: { "th-th": "t#,##0.00" },
		67: { "th-th": "t0%" },
		68: { "th-th": "t0.00%" },
		69: { "th-th": "t# ?/?" },
		70: { "th-th": "t# ??/??" },
		81: { "th-th": "d/m/bb" }
	};
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/style/numfmt-xform.js
var require_numfmt_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var _ = require_under_dash();
	var defaultNumFormats = require_defaultnumformats();
	var BaseXform = require_base_xform();
	function hashDefaultFormats() {
		const hash = {};
		_.each(defaultNumFormats, (dnf, id) => {
			if (dnf.f) hash[dnf.f] = parseInt(id, 10);
		});
		return hash;
	}
	var defaultFmtHash = hashDefaultFormats();
	var NumFmtXform = class extends BaseXform {
		constructor(id, formatCode) {
			super();
			this.id = id;
			this.formatCode = formatCode;
		}
		get tag() {
			return "numFmt";
		}
		render(xmlStream, model) {
			xmlStream.leafNode("numFmt", {
				numFmtId: model.id,
				formatCode: model.formatCode
			});
		}
		parseOpen(node) {
			switch (node.name) {
				case "numFmt":
					this.model = {
						id: parseInt(node.attributes.numFmtId, 10),
						formatCode: node.attributes.formatCode.replace(/[\\](.)/g, "$1")
					};
					return true;
				default: return false;
			}
		}
		parseText() {}
		parseClose() {
			return false;
		}
	};
	NumFmtXform.getDefaultFmtId = function getDefaultFmtId(formatCode) {
		return defaultFmtHash[formatCode];
	};
	NumFmtXform.getDefaultFmtCode = function getDefaultFmtCode(numFmtId) {
		return defaultNumFormats[numFmtId] && defaultNumFormats[numFmtId].f;
	};
	module.exports = NumFmtXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/style/alignment-xform.js
var require_alignment_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Enums = require_enums();
	var utils = require_utils();
	var BaseXform = require_base_xform();
	var validation = {
		horizontalValues: [
			"left",
			"center",
			"right",
			"fill",
			"centerContinuous",
			"distributed",
			"justify"
		].reduce((p, v) => {
			p[v] = true;
			return p;
		}, {}),
		horizontal(value) {
			return this.horizontalValues[value] ? value : void 0;
		},
		verticalValues: [
			"top",
			"middle",
			"bottom",
			"distributed",
			"justify"
		].reduce((p, v) => {
			p[v] = true;
			return p;
		}, {}),
		vertical(value) {
			if (value === "middle") return "center";
			return this.verticalValues[value] ? value : void 0;
		},
		wrapText(value) {
			return value ? true : void 0;
		},
		shrinkToFit(value) {
			return value ? true : void 0;
		},
		textRotation(value) {
			switch (value) {
				case "vertical": return value;
				default:
					value = utils.validInt(value);
					return value >= -90 && value <= 90 ? value : void 0;
			}
		},
		indent(value) {
			value = utils.validInt(value);
			return Math.max(0, value);
		},
		readingOrder(value) {
			switch (value) {
				case "ltr": return Enums.ReadingOrder.LeftToRight;
				case "rtl": return Enums.ReadingOrder.RightToLeft;
				default: return;
			}
		}
	};
	var textRotationXform = {
		toXml(textRotation) {
			textRotation = validation.textRotation(textRotation);
			if (textRotation) {
				if (textRotation === "vertical") return 255;
				const tr = Math.round(textRotation);
				if (tr >= 0 && tr <= 90) return tr;
				if (tr < 0 && tr >= -90) return 90 - tr;
			}
		},
		toModel(textRotation) {
			const tr = utils.validInt(textRotation);
			if (tr !== void 0) {
				if (tr === 255) return "vertical";
				if (tr >= 0 && tr <= 90) return tr;
				if (tr > 90 && tr <= 180) return 90 - tr;
			}
		}
	};
	var AlignmentXform = class extends BaseXform {
		get tag() {
			return "alignment";
		}
		render(xmlStream, model) {
			xmlStream.addRollback();
			xmlStream.openNode("alignment");
			let isValid = false;
			function add(name, value) {
				if (value) {
					xmlStream.addAttribute(name, value);
					isValid = true;
				}
			}
			add("horizontal", validation.horizontal(model.horizontal));
			add("vertical", validation.vertical(model.vertical));
			add("wrapText", validation.wrapText(model.wrapText) ? "1" : false);
			add("shrinkToFit", validation.shrinkToFit(model.shrinkToFit) ? "1" : false);
			add("indent", validation.indent(model.indent));
			add("textRotation", textRotationXform.toXml(model.textRotation));
			add("readingOrder", validation.readingOrder(model.readingOrder));
			xmlStream.closeNode();
			if (isValid) xmlStream.commit();
			else xmlStream.rollback();
		}
		parseOpen(node) {
			const model = {};
			let valid = false;
			function add(truthy, name, value) {
				if (truthy) {
					model[name] = value;
					valid = true;
				}
			}
			add(node.attributes.horizontal, "horizontal", node.attributes.horizontal);
			add(node.attributes.vertical, "vertical", node.attributes.vertical === "center" ? "middle" : node.attributes.vertical);
			add(node.attributes.wrapText, "wrapText", utils.parseBoolean(node.attributes.wrapText));
			add(node.attributes.shrinkToFit, "shrinkToFit", utils.parseBoolean(node.attributes.shrinkToFit));
			add(node.attributes.indent, "indent", parseInt(node.attributes.indent, 10));
			add(node.attributes.textRotation, "textRotation", textRotationXform.toModel(node.attributes.textRotation));
			add(node.attributes.readingOrder, "readingOrder", node.attributes.readingOrder === "2" ? "rtl" : "ltr");
			this.model = valid ? model : null;
		}
		parseText() {}
		parseClose() {
			return false;
		}
	};
	module.exports = AlignmentXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/style/protection-xform.js
var require_protection_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var BaseXform = require_base_xform();
	var validation = { boolean(value, dflt) {
		if (value === void 0) return dflt;
		return value;
	} };
	var ProtectionXform = class extends BaseXform {
		get tag() {
			return "protection";
		}
		render(xmlStream, model) {
			xmlStream.addRollback();
			xmlStream.openNode("protection");
			let isValid = false;
			function add(name, value) {
				if (value !== void 0) {
					xmlStream.addAttribute(name, value);
					isValid = true;
				}
			}
			add("locked", validation.boolean(model.locked, true) ? void 0 : "0");
			add("hidden", validation.boolean(model.hidden, false) ? "1" : void 0);
			xmlStream.closeNode();
			if (isValid) xmlStream.commit();
			else xmlStream.rollback();
		}
		parseOpen(node) {
			const model = {
				locked: !(node.attributes.locked === "0"),
				hidden: node.attributes.hidden === "1"
			};
			const isSignificant = !model.locked || model.hidden;
			this.model = isSignificant ? model : null;
		}
		parseText() {}
		parseClose() {
			return false;
		}
	};
	module.exports = ProtectionXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/style/style-xform.js
var require_style_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var BaseXform = require_base_xform();
	var AlignmentXform = require_alignment_xform();
	var ProtectionXform = require_protection_xform();
	var StyleXform = class extends BaseXform {
		constructor(options) {
			super();
			this.xfId = !!(options && options.xfId);
			this.map = {
				alignment: new AlignmentXform(),
				protection: new ProtectionXform()
			};
		}
		get tag() {
			return "xf";
		}
		render(xmlStream, model) {
			xmlStream.openNode("xf", {
				numFmtId: model.numFmtId || 0,
				fontId: model.fontId || 0,
				fillId: model.fillId || 0,
				borderId: model.borderId || 0
			});
			if (this.xfId) xmlStream.addAttribute("xfId", model.xfId || 0);
			if (model.numFmtId) xmlStream.addAttribute("applyNumberFormat", "1");
			if (model.fontId) xmlStream.addAttribute("applyFont", "1");
			if (model.fillId) xmlStream.addAttribute("applyFill", "1");
			if (model.borderId) xmlStream.addAttribute("applyBorder", "1");
			if (model.alignment) xmlStream.addAttribute("applyAlignment", "1");
			if (model.protection) xmlStream.addAttribute("applyProtection", "1");
			/**
			* Rendering tags causes close of XML stream.
			* Therefore adding attributes must be done before rendering tags.
			*/
			if (model.alignment) this.map.alignment.render(xmlStream, model.alignment);
			if (model.protection) this.map.protection.render(xmlStream, model.protection);
			xmlStream.closeNode();
		}
		parseOpen(node) {
			if (this.parser) {
				this.parser.parseOpen(node);
				return true;
			}
			switch (node.name) {
				case "xf":
					this.model = {
						numFmtId: parseInt(node.attributes.numFmtId, 10),
						fontId: parseInt(node.attributes.fontId, 10),
						fillId: parseInt(node.attributes.fillId, 10),
						borderId: parseInt(node.attributes.borderId, 10)
					};
					if (this.xfId) this.model.xfId = parseInt(node.attributes.xfId, 10);
					return true;
				case "alignment":
					this.parser = this.map.alignment;
					this.parser.parseOpen(node);
					return true;
				case "protection":
					this.parser = this.map.protection;
					this.parser.parseOpen(node);
					return true;
				default: return false;
			}
		}
		parseText(text) {
			if (this.parser) this.parser.parseText(text);
		}
		parseClose(name) {
			if (this.parser) {
				if (!this.parser.parseClose(name)) {
					if (this.map.protection === this.parser) this.model.protection = this.parser.model;
					else this.model.alignment = this.parser.model;
					this.parser = void 0;
				}
				return true;
			}
			return name !== "xf";
		}
	};
	module.exports = StyleXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/style/dxf-xform.js
var require_dxf_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var BaseXform = require_base_xform();
	var AlignmentXform = require_alignment_xform();
	var BorderXform = require_border_xform();
	var FillXform = require_fill_xform();
	var FontXform = require_font_xform();
	var NumFmtXform = require_numfmt_xform();
	var ProtectionXform = require_protection_xform();
	var DxfXform = class extends BaseXform {
		constructor() {
			super();
			this.map = {
				alignment: new AlignmentXform(),
				border: new BorderXform(),
				fill: new FillXform(),
				font: new FontXform(),
				numFmt: new NumFmtXform(),
				protection: new ProtectionXform()
			};
		}
		get tag() {
			return "dxf";
		}
		render(xmlStream, model) {
			xmlStream.openNode(this.tag);
			if (model.font) this.map.font.render(xmlStream, model.font);
			if (model.numFmt && model.numFmtId) {
				const numFmtModel = {
					id: model.numFmtId,
					formatCode: model.numFmt
				};
				this.map.numFmt.render(xmlStream, numFmtModel);
			}
			if (model.fill) this.map.fill.render(xmlStream, model.fill);
			if (model.alignment) this.map.alignment.render(xmlStream, model.alignment);
			if (model.border) this.map.border.render(xmlStream, model.border);
			if (model.protection) this.map.protection.render(xmlStream, model.protection);
			xmlStream.closeNode();
		}
		parseOpen(node) {
			if (this.parser) {
				this.parser.parseOpen(node);
				return true;
			}
			switch (node.name) {
				case this.tag:
					this.reset();
					return true;
				default:
					this.parser = this.map[node.name];
					if (this.parser) this.parser.parseOpen(node);
					return true;
			}
		}
		parseText(text) {
			if (this.parser) this.parser.parseText(text);
		}
		parseClose(name) {
			if (this.parser) {
				if (!this.parser.parseClose(name)) this.parser = void 0;
				return true;
			}
			if (name === this.tag) {
				this.model = {
					alignment: this.map.alignment.model,
					border: this.map.border.model,
					fill: this.map.fill.model,
					font: this.map.font.model,
					numFmt: this.map.numFmt.model,
					protection: this.map.protection.model
				};
				return false;
			}
			return true;
		}
	};
	module.exports = DxfXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/style/styles-xform.js
var require_styles_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Enums = require_enums();
	var XmlStream = require_xml_stream();
	var BaseXform = require_base_xform();
	var StaticXform = require_static_xform();
	var ListXform = require_list_xform();
	var FontXform = require_font_xform();
	var FillXform = require_fill_xform();
	var BorderXform = require_border_xform();
	var NumFmtXform = require_numfmt_xform();
	var StyleXform = require_style_xform();
	var DxfXform = require_dxf_xform();
	var NUMFMT_BASE = 164;
	var StylesXform = class StylesXform extends BaseXform {
		constructor(initialise) {
			super();
			this.map = {
				numFmts: new ListXform({
					tag: "numFmts",
					count: true,
					childXform: new NumFmtXform()
				}),
				fonts: new ListXform({
					tag: "fonts",
					count: true,
					childXform: new FontXform(),
					$: { "x14ac:knownFonts": 1 }
				}),
				fills: new ListXform({
					tag: "fills",
					count: true,
					childXform: new FillXform()
				}),
				borders: new ListXform({
					tag: "borders",
					count: true,
					childXform: new BorderXform()
				}),
				cellStyleXfs: new ListXform({
					tag: "cellStyleXfs",
					count: true,
					childXform: new StyleXform()
				}),
				cellXfs: new ListXform({
					tag: "cellXfs",
					count: true,
					childXform: new StyleXform({ xfId: true })
				}),
				dxfs: new ListXform({
					tag: "dxfs",
					always: true,
					count: true,
					childXform: new DxfXform()
				}),
				numFmt: new NumFmtXform(),
				font: new FontXform(),
				fill: new FillXform(),
				border: new BorderXform(),
				style: new StyleXform({ xfId: true }),
				cellStyles: StylesXform.STATIC_XFORMS.cellStyles,
				tableStyles: StylesXform.STATIC_XFORMS.tableStyles,
				extLst: StylesXform.STATIC_XFORMS.extLst
			};
			if (initialise) this.init();
		}
		initIndex() {
			this.index = {
				style: {},
				numFmt: {},
				numFmtNextId: 164,
				font: {},
				border: {},
				fill: {}
			};
		}
		init() {
			this.model = {
				styles: [],
				numFmts: [],
				fonts: [],
				borders: [],
				fills: [],
				dxfs: []
			};
			this.initIndex();
			this._addBorder({});
			this._addStyle({
				numFmtId: 0,
				fontId: 0,
				fillId: 0,
				borderId: 0,
				xfId: 0
			});
			this._addFill({
				type: "pattern",
				pattern: "none"
			});
			this._addFill({
				type: "pattern",
				pattern: "gray125"
			});
			this.weakMap = /* @__PURE__ */ new WeakMap();
		}
		render(xmlStream, model) {
			model = model || this.model;
			xmlStream.openXml(XmlStream.StdDocAttributes);
			xmlStream.openNode("styleSheet", StylesXform.STYLESHEET_ATTRIBUTES);
			if (this.index) {
				if (model.numFmts && model.numFmts.length) {
					xmlStream.openNode("numFmts", { count: model.numFmts.length });
					model.numFmts.forEach((numFmtXml) => {
						xmlStream.writeXml(numFmtXml);
					});
					xmlStream.closeNode();
				}
				if (!model.fonts.length) this._addFont({
					size: 11,
					color: { theme: 1 },
					name: "Calibri",
					family: 2,
					scheme: "minor"
				});
				xmlStream.openNode("fonts", {
					count: model.fonts.length,
					"x14ac:knownFonts": 1
				});
				model.fonts.forEach((fontXml) => {
					xmlStream.writeXml(fontXml);
				});
				xmlStream.closeNode();
				xmlStream.openNode("fills", { count: model.fills.length });
				model.fills.forEach((fillXml) => {
					xmlStream.writeXml(fillXml);
				});
				xmlStream.closeNode();
				xmlStream.openNode("borders", { count: model.borders.length });
				model.borders.forEach((borderXml) => {
					xmlStream.writeXml(borderXml);
				});
				xmlStream.closeNode();
				this.map.cellStyleXfs.render(xmlStream, [{
					numFmtId: 0,
					fontId: 0,
					fillId: 0,
					borderId: 0,
					xfId: 0
				}]);
				xmlStream.openNode("cellXfs", { count: model.styles.length });
				model.styles.forEach((styleXml) => {
					xmlStream.writeXml(styleXml);
				});
				xmlStream.closeNode();
			} else {
				this.map.numFmts.render(xmlStream, model.numFmts);
				this.map.fonts.render(xmlStream, model.fonts);
				this.map.fills.render(xmlStream, model.fills);
				this.map.borders.render(xmlStream, model.borders);
				this.map.cellStyleXfs.render(xmlStream, [{
					numFmtId: 0,
					fontId: 0,
					fillId: 0,
					borderId: 0,
					xfId: 0
				}]);
				this.map.cellXfs.render(xmlStream, model.styles);
			}
			StylesXform.STATIC_XFORMS.cellStyles.render(xmlStream);
			this.map.dxfs.render(xmlStream, model.dxfs);
			StylesXform.STATIC_XFORMS.tableStyles.render(xmlStream);
			StylesXform.STATIC_XFORMS.extLst.render(xmlStream);
			xmlStream.closeNode();
		}
		parseOpen(node) {
			if (this.parser) {
				this.parser.parseOpen(node);
				return true;
			}
			switch (node.name) {
				case "styleSheet":
					this.initIndex();
					return true;
				default:
					this.parser = this.map[node.name];
					if (this.parser) this.parser.parseOpen(node);
					return true;
			}
		}
		parseText(text) {
			if (this.parser) this.parser.parseText(text);
		}
		parseClose(name) {
			if (this.parser) {
				if (!this.parser.parseClose(name)) this.parser = void 0;
				return true;
			}
			switch (name) {
				case "styleSheet": {
					this.model = {};
					const add = (propName, xform) => {
						if (xform.model && xform.model.length) this.model[propName] = xform.model;
					};
					add("numFmts", this.map.numFmts);
					add("fonts", this.map.fonts);
					add("fills", this.map.fills);
					add("borders", this.map.borders);
					add("styles", this.map.cellXfs);
					add("dxfs", this.map.dxfs);
					this.index = {
						model: [],
						numFmt: []
					};
					if (this.model.numFmts) {
						const numFmtIndex = this.index.numFmt;
						this.model.numFmts.forEach((numFmt) => {
							numFmtIndex[numFmt.id] = numFmt.formatCode;
						});
					}
					return false;
				}
				default: return true;
			}
		}
		addStyleModel(model, cellType) {
			if (!model) return 0;
			if (!this.model.fonts.length) this._addFont({
				size: 11,
				color: { theme: 1 },
				name: "Calibri",
				family: 2,
				scheme: "minor"
			});
			if (this.weakMap && this.weakMap.has(model)) return this.weakMap.get(model);
			const style = {};
			cellType = cellType || Enums.ValueType.Number;
			if (model.numFmt) style.numFmtId = this._addNumFmtStr(model.numFmt);
			else switch (cellType) {
				case Enums.ValueType.Number:
					style.numFmtId = this._addNumFmtStr("General");
					break;
				case Enums.ValueType.Date: style.numFmtId = this._addNumFmtStr("mm-dd-yy");
			}
			if (model.font) style.fontId = this._addFont(model.font);
			if (model.border) style.borderId = this._addBorder(model.border);
			if (model.fill) style.fillId = this._addFill(model.fill);
			if (model.alignment) style.alignment = model.alignment;
			if (model.protection) style.protection = model.protection;
			const styleId = this._addStyle(style);
			if (this.weakMap) this.weakMap.set(model, styleId);
			return styleId;
		}
		getStyleModel(id) {
			const style = this.model.styles[id];
			if (!style) return null;
			let model = this.index.model[id];
			if (model) return model;
			model = this.index.model[id] = {};
			if (style.numFmtId) {
				const numFmt = this.index.numFmt[style.numFmtId] || NumFmtXform.getDefaultFmtCode(style.numFmtId);
				if (numFmt) model.numFmt = numFmt;
			}
			function addStyle(name, group, styleId) {
				if (styleId || styleId === 0) {
					const part = group[styleId];
					if (part) model[name] = part;
				}
			}
			addStyle("font", this.model.fonts, style.fontId);
			addStyle("border", this.model.borders, style.borderId);
			addStyle("fill", this.model.fills, style.fillId);
			if (style.alignment) model.alignment = style.alignment;
			if (style.protection) model.protection = style.protection;
			return model;
		}
		addDxfStyle(style) {
			if (style.numFmt) style.numFmtId = this._addNumFmtStr(style.numFmt);
			this.model.dxfs.push(style);
			return this.model.dxfs.length - 1;
		}
		getDxfStyle(id) {
			return this.model.dxfs[id];
		}
		_addStyle(style) {
			const xml = this.map.style.toXml(style);
			let index = this.index.style[xml];
			if (index === void 0) {
				index = this.index.style[xml] = this.model.styles.length;
				this.model.styles.push(xml);
			}
			return index;
		}
		_addNumFmtStr(formatCode) {
			let index = NumFmtXform.getDefaultFmtId(formatCode);
			if (index !== void 0) return index;
			index = this.index.numFmt[formatCode];
			if (index !== void 0) return index;
			index = this.index.numFmt[formatCode] = NUMFMT_BASE + this.model.numFmts.length;
			const xml = this.map.numFmt.toXml({
				id: index,
				formatCode
			});
			this.model.numFmts.push(xml);
			return index;
		}
		_addFont(font) {
			const xml = this.map.font.toXml(font);
			let index = this.index.font[xml];
			if (index === void 0) {
				index = this.index.font[xml] = this.model.fonts.length;
				this.model.fonts.push(xml);
			}
			return index;
		}
		_addBorder(border) {
			const xml = this.map.border.toXml(border);
			let index = this.index.border[xml];
			if (index === void 0) {
				index = this.index.border[xml] = this.model.borders.length;
				this.model.borders.push(xml);
			}
			return index;
		}
		_addFill(fill) {
			const xml = this.map.fill.toXml(fill);
			let index = this.index.fill[xml];
			if (index === void 0) {
				index = this.index.fill[xml] = this.model.fills.length;
				this.model.fills.push(xml);
			}
			return index;
		}
	};
	StylesXform.STYLESHEET_ATTRIBUTES = {
		xmlns: "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
		"xmlns:mc": "http://schemas.openxmlformats.org/markup-compatibility/2006",
		"mc:Ignorable": "x14ac x16r2",
		"xmlns:x14ac": "http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac",
		"xmlns:x16r2": "http://schemas.microsoft.com/office/spreadsheetml/2015/02/main"
	};
	StylesXform.STATIC_XFORMS = {
		cellStyles: new StaticXform({
			tag: "cellStyles",
			$: { count: 1 },
			c: [{
				tag: "cellStyle",
				$: {
					name: "Normal",
					xfId: 0,
					builtinId: 0
				}
			}]
		}),
		dxfs: new StaticXform({
			tag: "dxfs",
			$: { count: 0 }
		}),
		tableStyles: new StaticXform({
			tag: "tableStyles",
			$: {
				count: 0,
				defaultTableStyle: "TableStyleMedium2",
				defaultPivotStyle: "PivotStyleLight16"
			}
		}),
		extLst: new StaticXform({
			tag: "extLst",
			c: [{
				tag: "ext",
				$: {
					uri: "{EB79DEF2-80B8-43e5-95BD-54CBDDF9020C}",
					"xmlns:x14": "http://schemas.microsoft.com/office/spreadsheetml/2009/9/main"
				},
				c: [{
					tag: "x14:slicerStyles",
					$: { defaultSlicerStyle: "SlicerStyleLight1" }
				}]
			}, {
				tag: "ext",
				$: {
					uri: "{9260A510-F301-46a8-8635-F512D64BE5F5}",
					"xmlns:x15": "http://schemas.microsoft.com/office/spreadsheetml/2010/11/main"
				},
				c: [{
					tag: "x15:timelineStyles",
					$: { defaultTimelineStyle: "TimeSlicerStyleLight1" }
				}]
			}]
		})
	};
	var StylesXformMock = class extends StylesXform {
		constructor() {
			super();
			this.model = {
				styles: [{
					numFmtId: 0,
					fontId: 0,
					fillId: 0,
					borderId: 0,
					xfId: 0
				}],
				numFmts: [],
				fonts: [{
					size: 11,
					color: { theme: 1 },
					name: "Calibri",
					family: 2,
					scheme: "minor"
				}],
				borders: [{}],
				fills: [{
					type: "pattern",
					pattern: "none"
				}, {
					type: "pattern",
					pattern: "gray125"
				}]
			};
		}
		parseStream(stream) {
			stream.autodrain();
			return Promise.resolve();
		}
		addStyleModel(model, cellType) {
			switch (cellType) {
				case Enums.ValueType.Date: return this.dateStyleId;
				default: return 0;
			}
		}
		get dateStyleId() {
			if (!this._dateStyleId) {
				const dateStyle = { numFmtId: NumFmtXform.getDefaultFmtId("mm-dd-yy") };
				this._dateStyleId = this.model.styles.length;
				this.model.styles.push(dateStyle);
			}
			return this._dateStyleId;
		}
		getStyleModel() {
			return {};
		}
	};
	StylesXform.Mock = StylesXformMock;
	module.exports = StylesXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/simple/date-xform.js
var require_date_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var BaseXform = require_base_xform();
	var DateXform = class extends BaseXform {
		constructor(options) {
			super();
			this.tag = options.tag;
			this.attr = options.attr;
			this.attrs = options.attrs;
			this._format = options.format || function(dt) {
				try {
					if (Number.isNaN(dt.getTime())) return "";
					return dt.toISOString();
				} catch (e) {
					return "";
				}
			};
			this._parse = options.parse || function(str) {
				return new Date(str);
			};
		}
		render(xmlStream, model) {
			if (model) {
				xmlStream.openNode(this.tag);
				if (this.attrs) xmlStream.addAttributes(this.attrs);
				if (this.attr) xmlStream.addAttribute(this.attr, this._format(model));
				else xmlStream.writeText(this._format(model));
				xmlStream.closeNode();
			}
		}
		parseOpen(node) {
			if (node.name === this.tag) {
				if (this.attr) this.model = this._parse(node.attributes[this.attr]);
				else this.text = [];
			}
		}
		parseText(text) {
			if (!this.attr) this.text.push(text);
		}
		parseClose() {
			if (!this.attr) this.model = this._parse(this.text.join(""));
			return false;
		}
	};
	module.exports = DateXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/core/core-xform.js
var require_core_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var XmlStream = require_xml_stream();
	var BaseXform = require_base_xform();
	var DateXform = require_date_xform();
	var StringXform = require_string_xform();
	var IntegerXform = require_integer_xform();
	var CoreXform = class CoreXform extends BaseXform {
		constructor() {
			super();
			this.map = {
				"dc:creator": new StringXform({ tag: "dc:creator" }),
				"dc:title": new StringXform({ tag: "dc:title" }),
				"dc:subject": new StringXform({ tag: "dc:subject" }),
				"dc:description": new StringXform({ tag: "dc:description" }),
				"dc:identifier": new StringXform({ tag: "dc:identifier" }),
				"dc:language": new StringXform({ tag: "dc:language" }),
				"cp:keywords": new StringXform({ tag: "cp:keywords" }),
				"cp:category": new StringXform({ tag: "cp:category" }),
				"cp:lastModifiedBy": new StringXform({ tag: "cp:lastModifiedBy" }),
				"cp:lastPrinted": new DateXform({
					tag: "cp:lastPrinted",
					format: CoreXform.DateFormat
				}),
				"cp:revision": new IntegerXform({ tag: "cp:revision" }),
				"cp:version": new StringXform({ tag: "cp:version" }),
				"cp:contentStatus": new StringXform({ tag: "cp:contentStatus" }),
				"cp:contentType": new StringXform({ tag: "cp:contentType" }),
				"dcterms:created": new DateXform({
					tag: "dcterms:created",
					attrs: CoreXform.DateAttrs,
					format: CoreXform.DateFormat
				}),
				"dcterms:modified": new DateXform({
					tag: "dcterms:modified",
					attrs: CoreXform.DateAttrs,
					format: CoreXform.DateFormat
				})
			};
		}
		render(xmlStream, model) {
			xmlStream.openXml(XmlStream.StdDocAttributes);
			xmlStream.openNode("cp:coreProperties", CoreXform.CORE_PROPERTY_ATTRIBUTES);
			this.map["dc:creator"].render(xmlStream, model.creator);
			this.map["dc:title"].render(xmlStream, model.title);
			this.map["dc:subject"].render(xmlStream, model.subject);
			this.map["dc:description"].render(xmlStream, model.description);
			this.map["dc:identifier"].render(xmlStream, model.identifier);
			this.map["dc:language"].render(xmlStream, model.language);
			this.map["cp:keywords"].render(xmlStream, model.keywords);
			this.map["cp:category"].render(xmlStream, model.category);
			this.map["cp:lastModifiedBy"].render(xmlStream, model.lastModifiedBy);
			this.map["cp:lastPrinted"].render(xmlStream, model.lastPrinted);
			this.map["cp:revision"].render(xmlStream, model.revision);
			this.map["cp:version"].render(xmlStream, model.version);
			this.map["cp:contentStatus"].render(xmlStream, model.contentStatus);
			this.map["cp:contentType"].render(xmlStream, model.contentType);
			this.map["dcterms:created"].render(xmlStream, model.created);
			this.map["dcterms:modified"].render(xmlStream, model.modified);
			xmlStream.closeNode();
		}
		parseOpen(node) {
			if (this.parser) {
				this.parser.parseOpen(node);
				return true;
			}
			switch (node.name) {
				case "cp:coreProperties":
				case "coreProperties": return true;
				default:
					this.parser = this.map[node.name];
					if (this.parser) {
						this.parser.parseOpen(node);
						return true;
					}
					throw new Error(`Unexpected xml node in parseOpen: ${JSON.stringify(node)}`);
			}
		}
		parseText(text) {
			if (this.parser) this.parser.parseText(text);
		}
		parseClose(name) {
			if (this.parser) {
				if (!this.parser.parseClose(name)) this.parser = void 0;
				return true;
			}
			switch (name) {
				case "cp:coreProperties":
				case "coreProperties":
					this.model = {
						creator: this.map["dc:creator"].model,
						title: this.map["dc:title"].model,
						subject: this.map["dc:subject"].model,
						description: this.map["dc:description"].model,
						identifier: this.map["dc:identifier"].model,
						language: this.map["dc:language"].model,
						keywords: this.map["cp:keywords"].model,
						category: this.map["cp:category"].model,
						lastModifiedBy: this.map["cp:lastModifiedBy"].model,
						lastPrinted: this.map["cp:lastPrinted"].model,
						revision: this.map["cp:revision"].model,
						contentStatus: this.map["cp:contentStatus"].model,
						contentType: this.map["cp:contentType"].model,
						created: this.map["dcterms:created"].model,
						modified: this.map["dcterms:modified"].model
					};
					return false;
				default: throw new Error(`Unexpected xml node in parseClose: ${name}`);
			}
		}
	};
	CoreXform.DateFormat = function(dt) {
		return dt.toISOString().replace(/[.]\d{3}/, "");
	};
	CoreXform.DateAttrs = { "xsi:type": "dcterms:W3CDTF" };
	CoreXform.CORE_PROPERTY_ATTRIBUTES = {
		"xmlns:cp": "http://schemas.openxmlformats.org/package/2006/metadata/core-properties",
		"xmlns:dc": "http://purl.org/dc/elements/1.1/",
		"xmlns:dcterms": "http://purl.org/dc/terms/",
		"xmlns:dcmitype": "http://purl.org/dc/dcmitype/",
		"xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance"
	};
	module.exports = CoreXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/strings/text-xform.js
var require_text_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var BaseXform = require_base_xform();
	var TextXform = class extends BaseXform {
		get tag() {
			return "t";
		}
		render(xmlStream, model) {
			xmlStream.openNode("t");
			if (/^\s|\n|\s$/.test(model)) xmlStream.addAttribute("xml:space", "preserve");
			xmlStream.writeText(model);
			xmlStream.closeNode();
		}
		get model() {
			return this._text.join("").replace(/_x([0-9A-F]{4})_/g, ($0, $1) => String.fromCharCode(parseInt($1, 16)));
		}
		parseOpen(node) {
			switch (node.name) {
				case "t":
					this._text = [];
					return true;
				default: return false;
			}
		}
		parseText(text) {
			this._text.push(text);
		}
		parseClose() {
			return false;
		}
	};
	module.exports = TextXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/strings/rich-text-xform.js
var require_rich_text_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var TextXform = require_text_xform();
	var FontXform = require_font_xform();
	var BaseXform = require_base_xform();
	var RichTextXform = class RichTextXform extends BaseXform {
		constructor(model) {
			super();
			this.model = model;
		}
		get tag() {
			return "r";
		}
		get textXform() {
			return this._textXform || (this._textXform = new TextXform());
		}
		get fontXform() {
			return this._fontXform || (this._fontXform = new FontXform(RichTextXform.FONT_OPTIONS));
		}
		render(xmlStream, model) {
			model = model || this.model;
			xmlStream.openNode("r");
			if (model.font) this.fontXform.render(xmlStream, model.font);
			this.textXform.render(xmlStream, model.text);
			xmlStream.closeNode();
		}
		parseOpen(node) {
			if (this.parser) {
				this.parser.parseOpen(node);
				return true;
			}
			switch (node.name) {
				case "r":
					this.model = {};
					return true;
				case "t":
					this.parser = this.textXform;
					this.parser.parseOpen(node);
					return true;
				case "rPr":
					this.parser = this.fontXform;
					this.parser.parseOpen(node);
					return true;
				default: return false;
			}
		}
		parseText(text) {
			if (this.parser) this.parser.parseText(text);
		}
		parseClose(name) {
			switch (name) {
				case "r": return false;
				case "t":
					this.model.text = this.parser.model;
					this.parser = void 0;
					return true;
				case "rPr":
					this.model.font = this.parser.model;
					this.parser = void 0;
					return true;
				default:
					if (this.parser) this.parser.parseClose(name);
					return true;
			}
		}
	};
	RichTextXform.FONT_OPTIONS = {
		tagName: "rPr",
		fontNameTag: "rFont"
	};
	module.exports = RichTextXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/strings/phonetic-text-xform.js
var require_phonetic_text_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var TextXform = require_text_xform();
	var RichTextXform = require_rich_text_xform();
	var BaseXform = require_base_xform();
	var PhoneticTextXform = class extends BaseXform {
		constructor() {
			super();
			this.map = {
				r: new RichTextXform(),
				t: new TextXform()
			};
		}
		get tag() {
			return "rPh";
		}
		render(xmlStream, model) {
			xmlStream.openNode(this.tag, {
				sb: model.sb || 0,
				eb: model.eb || 0
			});
			if (model && model.hasOwnProperty("richText") && model.richText) {
				const { r } = this.map;
				model.richText.forEach((text) => {
					r.render(xmlStream, text);
				});
			} else if (model) this.map.t.render(xmlStream, model.text);
			xmlStream.closeNode();
		}
		parseOpen(node) {
			const { name } = node;
			if (this.parser) {
				this.parser.parseOpen(node);
				return true;
			}
			if (name === this.tag) {
				this.model = {
					sb: parseInt(node.attributes.sb, 10),
					eb: parseInt(node.attributes.eb, 10)
				};
				return true;
			}
			this.parser = this.map[name];
			if (this.parser) {
				this.parser.parseOpen(node);
				return true;
			}
			return false;
		}
		parseText(text) {
			if (this.parser) this.parser.parseText(text);
		}
		parseClose(name) {
			if (this.parser) {
				if (!this.parser.parseClose(name)) {
					switch (name) {
						case "r": {
							let rt = this.model.richText;
							if (!rt) rt = this.model.richText = [];
							rt.push(this.parser.model);
							break;
						}
						case "t": this.model.text = this.parser.model;
					}
					this.parser = void 0;
				}
				return true;
			}
			switch (name) {
				case this.tag: return false;
				default: return true;
			}
		}
	};
	module.exports = PhoneticTextXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/strings/shared-string-xform.js
var require_shared_string_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var TextXform = require_text_xform();
	var RichTextXform = require_rich_text_xform();
	var PhoneticTextXform = require_phonetic_text_xform();
	var BaseXform = require_base_xform();
	var SharedStringXform = class extends BaseXform {
		constructor(model) {
			super();
			this.model = model;
			this.map = {
				r: new RichTextXform(),
				t: new TextXform(),
				rPh: new PhoneticTextXform()
			};
		}
		get tag() {
			return "si";
		}
		render(xmlStream, model) {
			xmlStream.openNode(this.tag);
			if (model && model.hasOwnProperty("richText") && model.richText) {
				if (model.richText.length) model.richText.forEach((text) => {
					this.map.r.render(xmlStream, text);
				});
				else this.map.t.render(xmlStream, "");
			} else if (model !== void 0 && model !== null) this.map.t.render(xmlStream, model);
			xmlStream.closeNode();
		}
		parseOpen(node) {
			const { name } = node;
			if (this.parser) {
				this.parser.parseOpen(node);
				return true;
			}
			if (name === this.tag) {
				this.model = {};
				return true;
			}
			this.parser = this.map[name];
			if (this.parser) {
				this.parser.parseOpen(node);
				return true;
			}
			return false;
		}
		parseText(text) {
			if (this.parser) this.parser.parseText(text);
		}
		parseClose(name) {
			if (this.parser) {
				if (!this.parser.parseClose(name)) {
					switch (name) {
						case "r": {
							let rt = this.model.richText;
							if (!rt) rt = this.model.richText = [];
							rt.push(this.parser.model);
							break;
						}
						case "t": this.model = this.parser.model;
					}
					this.parser = void 0;
				}
				return true;
			}
			switch (name) {
				case this.tag: return false;
				default: return true;
			}
		}
	};
	module.exports = SharedStringXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/strings/shared-strings-xform.js
var require_shared_strings_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var XmlStream = require_xml_stream();
	var BaseXform = require_base_xform();
	var SharedStringXform = require_shared_string_xform();
	var SharedStringsXform = class extends BaseXform {
		constructor(model) {
			super();
			this.model = model || {
				values: [],
				count: 0
			};
			this.hash = Object.create(null);
			this.rich = Object.create(null);
		}
		get sharedStringXform() {
			return this._sharedStringXform || (this._sharedStringXform = new SharedStringXform());
		}
		get values() {
			return this.model.values;
		}
		get uniqueCount() {
			return this.model.values.length;
		}
		get count() {
			return this.model.count;
		}
		getString(index) {
			return this.model.values[index];
		}
		add(value) {
			return value.richText ? this.addRichText(value) : this.addText(value);
		}
		addText(value) {
			let index = this.hash[value];
			if (index === void 0) {
				index = this.hash[value] = this.model.values.length;
				this.model.values.push(value);
			}
			this.model.count++;
			return index;
		}
		addRichText(value) {
			const xml = this.sharedStringXform.toXml(value);
			let index = this.rich[xml];
			if (index === void 0) {
				index = this.rich[xml] = this.model.values.length;
				this.model.values.push(value);
			}
			this.model.count++;
			return index;
		}
		render(xmlStream, model) {
			model = model || this._values;
			xmlStream.openXml(XmlStream.StdDocAttributes);
			xmlStream.openNode("sst", {
				xmlns: "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
				count: model.count,
				uniqueCount: model.values.length
			});
			const sx = this.sharedStringXform;
			model.values.forEach((sharedString) => {
				sx.render(xmlStream, sharedString);
			});
			xmlStream.closeNode();
		}
		parseOpen(node) {
			if (this.parser) {
				this.parser.parseOpen(node);
				return true;
			}
			switch (node.name) {
				case "sst": return true;
				case "si":
					this.parser = this.sharedStringXform;
					this.parser.parseOpen(node);
					return true;
				default: throw new Error(`Unexpected xml node in parseOpen: ${JSON.stringify(node)}`);
			}
		}
		parseText(text) {
			if (this.parser) this.parser.parseText(text);
		}
		parseClose(name) {
			if (this.parser) {
				if (!this.parser.parseClose(name)) {
					this.model.values.push(this.parser.model);
					this.model.count++;
					this.parser = void 0;
				}
				return true;
			}
			switch (name) {
				case "sst": return false;
				default: throw new Error(`Unexpected xml node in parseClose: ${name}`);
			}
		}
	};
	module.exports = SharedStringsXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/core/relationship-xform.js
var require_relationship_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var BaseXform = require_base_xform();
	var RelationshipXform = class extends BaseXform {
		render(xmlStream, model) {
			xmlStream.leafNode("Relationship", model);
		}
		parseOpen(node) {
			switch (node.name) {
				case "Relationship":
					this.model = node.attributes;
					return true;
				default: return false;
			}
		}
		parseText() {}
		parseClose() {
			return false;
		}
	};
	module.exports = RelationshipXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/core/relationships-xform.js
var require_relationships_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var XmlStream = require_xml_stream();
	var BaseXform = require_base_xform();
	var RelationshipXform = require_relationship_xform();
	var RelationshipsXform = class RelationshipsXform extends BaseXform {
		constructor() {
			super();
			this.map = { Relationship: new RelationshipXform() };
		}
		render(xmlStream, model) {
			model = model || this._values;
			xmlStream.openXml(XmlStream.StdDocAttributes);
			xmlStream.openNode("Relationships", RelationshipsXform.RELATIONSHIPS_ATTRIBUTES);
			model.forEach((relationship) => {
				this.map.Relationship.render(xmlStream, relationship);
			});
			xmlStream.closeNode();
		}
		parseOpen(node) {
			if (this.parser) {
				this.parser.parseOpen(node);
				return true;
			}
			switch (node.name) {
				case "Relationships":
					this.model = [];
					return true;
				default:
					this.parser = this.map[node.name];
					if (this.parser) {
						this.parser.parseOpen(node);
						return true;
					}
					throw new Error(`Unexpected xml node in parseOpen: ${JSON.stringify(node)}`);
			}
		}
		parseText(text) {
			if (this.parser) this.parser.parseText(text);
		}
		parseClose(name) {
			if (this.parser) {
				if (!this.parser.parseClose(name)) {
					this.model.push(this.parser.model);
					this.parser = void 0;
				}
				return true;
			}
			switch (name) {
				case "Relationships": return false;
				default: throw new Error(`Unexpected xml node in parseClose: ${name}`);
			}
		}
	};
	RelationshipsXform.RELATIONSHIPS_ATTRIBUTES = { xmlns: "http://schemas.openxmlformats.org/package/2006/relationships" };
	module.exports = RelationshipsXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/core/content-types-xform.js
var require_content_types_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var XmlStream = require_xml_stream();
	var BaseXform = require_base_xform();
	var ContentTypesXform = class ContentTypesXform extends BaseXform {
		render(xmlStream, model) {
			xmlStream.openXml(XmlStream.StdDocAttributes);
			xmlStream.openNode("Types", ContentTypesXform.PROPERTY_ATTRIBUTES);
			const mediaHash = {};
			(model.media || []).forEach((medium) => {
				if (medium.type === "image") {
					const imageType = medium.extension;
					if (!mediaHash[imageType]) {
						mediaHash[imageType] = true;
						xmlStream.leafNode("Default", {
							Extension: imageType,
							ContentType: `image/${imageType}`
						});
					}
				}
			});
			xmlStream.leafNode("Default", {
				Extension: "rels",
				ContentType: "application/vnd.openxmlformats-package.relationships+xml"
			});
			xmlStream.leafNode("Default", {
				Extension: "xml",
				ContentType: "application/xml"
			});
			xmlStream.leafNode("Override", {
				PartName: "/xl/workbook.xml",
				ContentType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"
			});
			model.worksheets.forEach((worksheet) => {
				const name = `/xl/worksheets/sheet${worksheet.id}.xml`;
				xmlStream.leafNode("Override", {
					PartName: name,
					ContentType: "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"
				});
			});
			xmlStream.leafNode("Override", {
				PartName: "/xl/theme/theme1.xml",
				ContentType: "application/vnd.openxmlformats-officedocument.theme+xml"
			});
			xmlStream.leafNode("Override", {
				PartName: "/xl/styles.xml",
				ContentType: "application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"
			});
			if (model.sharedStrings && model.sharedStrings.count) xmlStream.leafNode("Override", {
				PartName: "/xl/sharedStrings.xml",
				ContentType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml"
			});
			if (model.tables) model.tables.forEach((table) => {
				xmlStream.leafNode("Override", {
					PartName: `/xl/tables/${table.target}`,
					ContentType: "application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml"
				});
			});
			if (model.drawings) model.drawings.forEach((drawing) => {
				xmlStream.leafNode("Override", {
					PartName: `/xl/drawings/${drawing.name}.xml`,
					ContentType: "application/vnd.openxmlformats-officedocument.drawing+xml"
				});
			});
			if (model.commentRefs) {
				xmlStream.leafNode("Default", {
					Extension: "vml",
					ContentType: "application/vnd.openxmlformats-officedocument.vmlDrawing"
				});
				model.commentRefs.forEach(({ commentName }) => {
					xmlStream.leafNode("Override", {
						PartName: `/xl/${commentName}.xml`,
						ContentType: "application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml"
					});
				});
			}
			xmlStream.leafNode("Override", {
				PartName: "/docProps/core.xml",
				ContentType: "application/vnd.openxmlformats-package.core-properties+xml"
			});
			xmlStream.leafNode("Override", {
				PartName: "/docProps/app.xml",
				ContentType: "application/vnd.openxmlformats-officedocument.extended-properties+xml"
			});
			xmlStream.closeNode();
		}
		parseOpen() {
			return false;
		}
		parseText() {}
		parseClose() {
			return false;
		}
	};
	ContentTypesXform.PROPERTY_ATTRIBUTES = { xmlns: "http://schemas.openxmlformats.org/package/2006/content-types" };
	module.exports = ContentTypesXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/core/app-heading-pairs-xform.js
var require_app_heading_pairs_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var BaseXform = require_base_xform();
	var AppHeadingPairsXform = class extends BaseXform {
		render(xmlStream, model) {
			xmlStream.openNode("HeadingPairs");
			xmlStream.openNode("vt:vector", {
				size: 2,
				baseType: "variant"
			});
			xmlStream.openNode("vt:variant");
			xmlStream.leafNode("vt:lpstr", void 0, "Worksheets");
			xmlStream.closeNode();
			xmlStream.openNode("vt:variant");
			xmlStream.leafNode("vt:i4", void 0, model.length);
			xmlStream.closeNode();
			xmlStream.closeNode();
			xmlStream.closeNode();
		}
		parseOpen(node) {
			return node.name === "HeadingPairs";
		}
		parseText() {}
		parseClose(name) {
			return name !== "HeadingPairs";
		}
	};
	module.exports = AppHeadingPairsXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/core/app-titles-of-parts-xform.js
var require_app_titles_of_parts_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var BaseXform = require_base_xform();
	var AppTitlesOfPartsXform = class extends BaseXform {
		render(xmlStream, model) {
			xmlStream.openNode("TitlesOfParts");
			xmlStream.openNode("vt:vector", {
				size: model.length,
				baseType: "lpstr"
			});
			model.forEach((sheet) => {
				xmlStream.leafNode("vt:lpstr", void 0, sheet.name);
			});
			xmlStream.closeNode();
			xmlStream.closeNode();
		}
		parseOpen(node) {
			return node.name === "TitlesOfParts";
		}
		parseText() {}
		parseClose(name) {
			return name !== "TitlesOfParts";
		}
	};
	module.exports = AppTitlesOfPartsXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/core/app-xform.js
var require_app_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var XmlStream = require_xml_stream();
	var BaseXform = require_base_xform();
	var StringXform = require_string_xform();
	var AppHeadingPairsXform = require_app_heading_pairs_xform();
	var AppTitleOfPartsXform = require_app_titles_of_parts_xform();
	var AppXform = class AppXform extends BaseXform {
		constructor() {
			super();
			this.map = {
				Company: new StringXform({ tag: "Company" }),
				Manager: new StringXform({ tag: "Manager" }),
				HeadingPairs: new AppHeadingPairsXform(),
				TitleOfParts: new AppTitleOfPartsXform()
			};
		}
		render(xmlStream, model) {
			xmlStream.openXml(XmlStream.StdDocAttributes);
			xmlStream.openNode("Properties", AppXform.PROPERTY_ATTRIBUTES);
			xmlStream.leafNode("Application", void 0, "Microsoft Excel");
			xmlStream.leafNode("DocSecurity", void 0, "0");
			xmlStream.leafNode("ScaleCrop", void 0, "false");
			this.map.HeadingPairs.render(xmlStream, model.worksheets);
			this.map.TitleOfParts.render(xmlStream, model.worksheets);
			this.map.Company.render(xmlStream, model.company || "");
			this.map.Manager.render(xmlStream, model.manager);
			xmlStream.leafNode("LinksUpToDate", void 0, "false");
			xmlStream.leafNode("SharedDoc", void 0, "false");
			xmlStream.leafNode("HyperlinksChanged", void 0, "false");
			xmlStream.leafNode("AppVersion", void 0, "16.0300");
			xmlStream.closeNode();
		}
		parseOpen(node) {
			if (this.parser) {
				this.parser.parseOpen(node);
				return true;
			}
			switch (node.name) {
				case "Properties": return true;
				default:
					this.parser = this.map[node.name];
					if (this.parser) {
						this.parser.parseOpen(node);
						return true;
					}
					return false;
			}
		}
		parseText(text) {
			if (this.parser) this.parser.parseText(text);
		}
		parseClose(name) {
			if (this.parser) {
				if (!this.parser.parseClose(name)) this.parser = void 0;
				return true;
			}
			switch (name) {
				case "Properties":
					this.model = {
						worksheets: this.map.TitleOfParts.model,
						company: this.map.Company.model,
						manager: this.map.Manager.model
					};
					return false;
				default: return true;
			}
		}
	};
	AppXform.DateFormat = function(dt) {
		return dt.toISOString().replace(/[.]\d{3,6}/, "");
	};
	AppXform.DateAttrs = { "xsi:type": "dcterms:W3CDTF" };
	AppXform.PROPERTY_ATTRIBUTES = {
		xmlns: "http://schemas.openxmlformats.org/officeDocument/2006/extended-properties",
		"xmlns:vt": "http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes"
	};
	module.exports = AppXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/book/defined-name-xform.js
var require_defined_name_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var BaseXform = require_base_xform();
	var colCache = require_col_cache();
	var DefinedNamesXform = class extends BaseXform {
		render(xmlStream, model) {
			xmlStream.openNode("definedName", {
				name: model.name,
				localSheetId: model.localSheetId
			});
			xmlStream.writeText(model.ranges.join(","));
			xmlStream.closeNode();
		}
		parseOpen(node) {
			switch (node.name) {
				case "definedName":
					this._parsedName = node.attributes.name;
					this._parsedLocalSheetId = node.attributes.localSheetId;
					this._parsedText = [];
					return true;
				default: return false;
			}
		}
		parseText(text) {
			this._parsedText.push(text);
		}
		parseClose() {
			this.model = {
				name: this._parsedName,
				ranges: extractRanges(this._parsedText.join(""))
			};
			if (this._parsedLocalSheetId !== void 0) this.model.localSheetId = parseInt(this._parsedLocalSheetId, 10);
			return false;
		}
	};
	function isValidRange(range) {
		try {
			colCache.decodeEx(range);
			return true;
		} catch (err) {
			return false;
		}
	}
	function extractRanges(parsedText) {
		const ranges = [];
		let quotesOpened = false;
		let last = "";
		parsedText.split(",").forEach((item) => {
			if (!item) return;
			const quotes = (item.match(/'/g) || []).length;
			if (!quotes) {
				if (quotesOpened) last += `${item},`;
				else if (isValidRange(item)) ranges.push(item);
				return;
			}
			const quotesEven = quotes % 2 === 0;
			if (!quotesOpened && quotesEven && isValidRange(item)) ranges.push(item);
			else if (quotesOpened && !quotesEven) {
				quotesOpened = false;
				if (isValidRange(last + item)) ranges.push(last + item);
				last = "";
			} else {
				quotesOpened = true;
				last += `${item},`;
			}
		});
		return ranges;
	}
	module.exports = DefinedNamesXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/book/sheet-xform.js
var require_sheet_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var utils = require_utils();
	var BaseXform = require_base_xform();
	var WorksheetXform = class extends BaseXform {
		render(xmlStream, model) {
			xmlStream.leafNode("sheet", {
				sheetId: model.id,
				name: model.name,
				state: model.state,
				"r:id": model.rId
			});
		}
		parseOpen(node) {
			if (node.name === "sheet") {
				this.model = {
					name: utils.xmlDecode(node.attributes.name),
					id: parseInt(node.attributes.sheetId, 10),
					state: node.attributes.state,
					rId: node.attributes["r:id"]
				};
				return true;
			}
			return false;
		}
		parseText() {}
		parseClose() {
			return false;
		}
	};
	module.exports = WorksheetXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/book/workbook-view-xform.js
var require_workbook_view_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var BaseXform = require_base_xform();
	var WorkbookViewXform = class extends BaseXform {
		render(xmlStream, model) {
			const attributes = {
				xWindow: model.x || 0,
				yWindow: model.y || 0,
				windowWidth: model.width || 12e3,
				windowHeight: model.height || 24e3,
				firstSheet: model.firstSheet,
				activeTab: model.activeTab
			};
			if (model.visibility && model.visibility !== "visible") attributes.visibility = model.visibility;
			xmlStream.leafNode("workbookView", attributes);
		}
		parseOpen(node) {
			if (node.name === "workbookView") {
				const model = this.model = {};
				const addS = function(name, value, dflt) {
					const s = value !== void 0 ? model[name] = value : dflt;
					if (s !== void 0) model[name] = s;
				};
				const addN = function(name, value, dflt) {
					const n = value !== void 0 ? model[name] = parseInt(value, 10) : dflt;
					if (n !== void 0) model[name] = n;
				};
				addN("x", node.attributes.xWindow, 0);
				addN("y", node.attributes.yWindow, 0);
				addN("width", node.attributes.windowWidth, 25e3);
				addN("height", node.attributes.windowHeight, 1e4);
				addS("visibility", node.attributes.visibility, "visible");
				addN("activeTab", node.attributes.activeTab, void 0);
				addN("firstSheet", node.attributes.firstSheet, void 0);
				return true;
			}
			return false;
		}
		parseText() {}
		parseClose() {
			return false;
		}
	};
	module.exports = WorkbookViewXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/book/workbook-properties-xform.js
var require_workbook_properties_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var BaseXform = require_base_xform();
	var WorksheetPropertiesXform = class extends BaseXform {
		render(xmlStream, model) {
			xmlStream.leafNode("workbookPr", {
				date1904: model.date1904 ? 1 : void 0,
				defaultThemeVersion: 164011,
				filterPrivacy: 1
			});
		}
		parseOpen(node) {
			if (node.name === "workbookPr") {
				this.model = { date1904: node.attributes.date1904 === "1" };
				return true;
			}
			return false;
		}
		parseText() {}
		parseClose() {
			return false;
		}
	};
	module.exports = WorksheetPropertiesXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/book/workbook-calc-properties-xform.js
var require_workbook_calc_properties_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var BaseXform = require_base_xform();
	var WorkbookCalcPropertiesXform = class extends BaseXform {
		render(xmlStream, model) {
			xmlStream.leafNode("calcPr", {
				calcId: 171027,
				fullCalcOnLoad: model.fullCalcOnLoad ? 1 : void 0
			});
		}
		parseOpen(node) {
			if (node.name === "calcPr") {
				this.model = {};
				return true;
			}
			return false;
		}
		parseText() {}
		parseClose() {
			return false;
		}
	};
	module.exports = WorkbookCalcPropertiesXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/book/workbook-xform.js
var require_workbook_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var _ = require_under_dash();
	var colCache = require_col_cache();
	var XmlStream = require_xml_stream();
	var BaseXform = require_base_xform();
	var StaticXform = require_static_xform();
	var ListXform = require_list_xform();
	var DefinedNameXform = require_defined_name_xform();
	var SheetXform = require_sheet_xform();
	var WorkbookViewXform = require_workbook_view_xform();
	var WorkbookPropertiesXform = require_workbook_properties_xform();
	var WorkbookCalcPropertiesXform = require_workbook_calc_properties_xform();
	var WorkbookXform = class WorkbookXform extends BaseXform {
		constructor() {
			super();
			this.map = {
				fileVersion: WorkbookXform.STATIC_XFORMS.fileVersion,
				workbookPr: new WorkbookPropertiesXform(),
				bookViews: new ListXform({
					tag: "bookViews",
					count: false,
					childXform: new WorkbookViewXform()
				}),
				sheets: new ListXform({
					tag: "sheets",
					count: false,
					childXform: new SheetXform()
				}),
				definedNames: new ListXform({
					tag: "definedNames",
					count: false,
					childXform: new DefinedNameXform()
				}),
				calcPr: new WorkbookCalcPropertiesXform()
			};
		}
		prepare(model) {
			model.sheets = model.worksheets;
			const printAreas = [];
			let index = 0;
			model.sheets.forEach((sheet) => {
				if (sheet.pageSetup && sheet.pageSetup.printArea) sheet.pageSetup.printArea.split("&&").forEach((printArea) => {
					const printAreaComponents = printArea.split(":");
					const definedName = {
						name: "_xlnm.Print_Area",
						ranges: [`'${sheet.name}'!$${printAreaComponents[0]}:$${printAreaComponents[1]}`],
						localSheetId: index
					};
					printAreas.push(definedName);
				});
				if (sheet.pageSetup && (sheet.pageSetup.printTitlesRow || sheet.pageSetup.printTitlesColumn)) {
					const ranges = [];
					if (sheet.pageSetup.printTitlesColumn) {
						const titlesColumns = sheet.pageSetup.printTitlesColumn.split(":");
						ranges.push(`'${sheet.name}'!$${titlesColumns[0]}:$${titlesColumns[1]}`);
					}
					if (sheet.pageSetup.printTitlesRow) {
						const titlesRows = sheet.pageSetup.printTitlesRow.split(":");
						ranges.push(`'${sheet.name}'!$${titlesRows[0]}:$${titlesRows[1]}`);
					}
					const definedName = {
						name: "_xlnm.Print_Titles",
						ranges,
						localSheetId: index
					};
					printAreas.push(definedName);
				}
				index++;
			});
			if (printAreas.length) model.definedNames = model.definedNames.concat(printAreas);
			(model.media || []).forEach((medium, i) => {
				medium.name = medium.type + (i + 1);
			});
		}
		render(xmlStream, model) {
			xmlStream.openXml(XmlStream.StdDocAttributes);
			xmlStream.openNode("workbook", WorkbookXform.WORKBOOK_ATTRIBUTES);
			this.map.fileVersion.render(xmlStream);
			this.map.workbookPr.render(xmlStream, model.properties);
			this.map.bookViews.render(xmlStream, model.views);
			this.map.sheets.render(xmlStream, model.sheets);
			this.map.definedNames.render(xmlStream, model.definedNames);
			this.map.calcPr.render(xmlStream, model.calcProperties);
			xmlStream.closeNode();
		}
		parseOpen(node) {
			if (this.parser) {
				this.parser.parseOpen(node);
				return true;
			}
			switch (node.name) {
				case "workbook": return true;
				default:
					this.parser = this.map[node.name];
					if (this.parser) this.parser.parseOpen(node);
					return true;
			}
		}
		parseText(text) {
			if (this.parser) this.parser.parseText(text);
		}
		parseClose(name) {
			if (this.parser) {
				if (!this.parser.parseClose(name)) this.parser = void 0;
				return true;
			}
			switch (name) {
				case "workbook":
					this.model = {
						sheets: this.map.sheets.model,
						properties: this.map.workbookPr.model || {},
						views: this.map.bookViews.model,
						calcProperties: {}
					};
					if (this.map.definedNames.model) this.model.definedNames = this.map.definedNames.model;
					return false;
				default: return true;
			}
		}
		reconcile(model) {
			const rels = (model.workbookRels || []).reduce((map, rel) => {
				map[rel.Id] = rel;
				return map;
			}, {});
			const worksheets = [];
			let worksheet;
			let index = 0;
			(model.sheets || []).forEach((sheet) => {
				const rel = rels[sheet.rId];
				if (!rel) return;
				worksheet = model.worksheetHash[`xl/${rel.Target.replace(/^(\s|\/xl\/)+/, "")}`];
				if (worksheet) {
					worksheet.name = sheet.name;
					worksheet.id = sheet.id;
					worksheet.state = sheet.state;
					worksheets[index++] = worksheet;
				}
			});
			const definedNames = [];
			_.each(model.definedNames, (definedName) => {
				if (definedName.name === "_xlnm.Print_Area") {
					worksheet = worksheets[definedName.localSheetId];
					if (worksheet) {
						if (!worksheet.pageSetup) worksheet.pageSetup = {};
						const range = colCache.decodeEx(definedName.ranges[0]);
						worksheet.pageSetup.printArea = worksheet.pageSetup.printArea ? `${worksheet.pageSetup.printArea}&&${range.dimensions}` : range.dimensions;
					}
				} else if (definedName.name === "_xlnm.Print_Titles") {
					worksheet = worksheets[definedName.localSheetId];
					if (worksheet) {
						if (!worksheet.pageSetup) worksheet.pageSetup = {};
						const rangeString = definedName.ranges.join(",");
						const dollarRegex = /\$/g;
						const rowRangeMatches = rangeString.match(/\$\d+:\$\d+/);
						if (rowRangeMatches && rowRangeMatches.length) {
							const range = rowRangeMatches[0];
							worksheet.pageSetup.printTitlesRow = range.replace(dollarRegex, "");
						}
						const columnRangeMatches = rangeString.match(/\$[A-Z]+:\$[A-Z]+/);
						if (columnRangeMatches && columnRangeMatches.length) {
							const range = columnRangeMatches[0];
							worksheet.pageSetup.printTitlesColumn = range.replace(dollarRegex, "");
						}
					}
				} else definedNames.push(definedName);
			});
			model.definedNames = definedNames;
			model.media.forEach((media, i) => {
				media.index = i;
			});
		}
	};
	WorkbookXform.WORKBOOK_ATTRIBUTES = {
		xmlns: "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
		"xmlns:r": "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
		"xmlns:mc": "http://schemas.openxmlformats.org/markup-compatibility/2006",
		"mc:Ignorable": "x15",
		"xmlns:x15": "http://schemas.microsoft.com/office/spreadsheetml/2010/11/main"
	};
	WorkbookXform.STATIC_XFORMS = { fileVersion: new StaticXform({
		tag: "fileVersion",
		$: {
			appName: "xl",
			lastEdited: 5,
			lowestEdited: 5,
			rupBuild: 9303
		}
	}) };
	module.exports = WorkbookXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/rel-type.js
var require_rel_type = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = {
		OfficeDocument: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument",
		Worksheet: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet",
		CalcChain: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/calcChain",
		SharedStrings: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings",
		Styles: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles",
		Theme: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme",
		Hyperlink: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink",
		Image: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image",
		CoreProperties: "http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties",
		ExtenderProperties: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties",
		Comments: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/comments",
		VmlDrawing: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/vmlDrawing",
		Table: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/table"
	};
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/sheet/merges.js
var require_merges = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var _ = require_under_dash();
	var Range = require_range();
	var colCache = require_col_cache();
	var Enums = require_enums();
	var Merges = class {
		constructor() {
			this.merges = {};
		}
		add(merge) {
			if (this.merges[merge.master]) this.merges[merge.master].expandToAddress(merge.address);
			else {
				const range = `${merge.master}:${merge.address}`;
				this.merges[merge.master] = new Range(range);
			}
		}
		get mergeCells() {
			return _.map(this.merges, (merge) => merge.range);
		}
		reconcile(mergeCells, rows) {
			_.each(mergeCells, (merge) => {
				const dimensions = colCache.decode(merge);
				for (let i = dimensions.top; i <= dimensions.bottom; i++) {
					const row = rows[i - 1];
					for (let j = dimensions.left; j <= dimensions.right; j++) {
						const cell = row.cells[j - 1];
						if (!cell) row.cells[j] = {
							type: Enums.ValueType.Null,
							address: colCache.encodeAddress(i, j)
						};
						else if (cell.type === Enums.ValueType.Merge) cell.master = dimensions.tl;
					}
				}
			});
		}
		getMasterAddress(address) {
			const range = this.hash[address];
			return range && range.tl;
		}
	};
	module.exports = Merges;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/sheet/cell-xform.js
var require_cell_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var utils = require_utils();
	var BaseXform = require_base_xform();
	var Range = require_range();
	var Enums = require_enums();
	var RichTextXform = require_rich_text_xform();
	function getValueType(v) {
		if (v === null || v === void 0) return Enums.ValueType.Null;
		if (v instanceof String || typeof v === "string") return Enums.ValueType.String;
		if (typeof v === "number") return Enums.ValueType.Number;
		if (typeof v === "boolean") return Enums.ValueType.Boolean;
		if (v instanceof Date) return Enums.ValueType.Date;
		if (v.text && v.hyperlink) return Enums.ValueType.Hyperlink;
		if (v.formula) return Enums.ValueType.Formula;
		if (v.error) return Enums.ValueType.Error;
		throw new Error("I could not understand type of value");
	}
	function getEffectiveCellType(cell) {
		switch (cell.type) {
			case Enums.ValueType.Formula: return getValueType(cell.result);
			default: return cell.type;
		}
	}
	var CellXform = class extends BaseXform {
		constructor() {
			super();
			this.richTextXForm = new RichTextXform();
		}
		get tag() {
			return "c";
		}
		prepare(model, options) {
			const styleId = options.styles.addStyleModel(model.style || {}, getEffectiveCellType(model));
			if (styleId) model.styleId = styleId;
			if (model.comment) options.comments.push({
				...model.comment,
				ref: model.address
			});
			switch (model.type) {
				case Enums.ValueType.String:
				case Enums.ValueType.RichText:
					if (options.sharedStrings) model.ssId = options.sharedStrings.add(model.value);
					break;
				case Enums.ValueType.Date:
					if (options.date1904) model.date1904 = true;
					break;
				case Enums.ValueType.Hyperlink:
					if (options.sharedStrings && model.text !== void 0 && model.text !== null) model.ssId = options.sharedStrings.add(model.text);
					options.hyperlinks.push({
						address: model.address,
						target: model.hyperlink,
						tooltip: model.tooltip
					});
					break;
				case Enums.ValueType.Merge:
					options.merges.add(model);
					break;
				case Enums.ValueType.Formula:
					if (options.date1904) model.date1904 = true;
					if (model.shareType === "shared") model.si = options.siFormulae++;
					if (model.formula) options.formulae[model.address] = model;
					else if (model.sharedFormula) {
						const master = options.formulae[model.sharedFormula];
						if (!master) throw new Error(`Shared Formula master must exist above and or left of clone for cell ${model.address}`);
						if (master.si === void 0) {
							master.shareType = "shared";
							master.si = options.siFormulae++;
							master.range = new Range(master.address, model.address);
						} else if (master.range) master.range.expandToAddress(model.address);
						model.si = master.si;
					}
			}
		}
		renderFormula(xmlStream, model) {
			let attrs = null;
			switch (model.shareType) {
				case "shared":
					attrs = {
						t: "shared",
						ref: model.ref || model.range.range,
						si: model.si
					};
					break;
				case "array":
					attrs = {
						t: "array",
						ref: model.ref
					};
					break;
				default: if (model.si !== void 0) attrs = {
					t: "shared",
					si: model.si
				};
			}
			switch (getValueType(model.result)) {
				case Enums.ValueType.Null:
					xmlStream.leafNode("f", attrs, model.formula);
					break;
				case Enums.ValueType.String:
					xmlStream.addAttribute("t", "str");
					xmlStream.leafNode("f", attrs, model.formula);
					xmlStream.leafNode("v", null, model.result);
					break;
				case Enums.ValueType.Number:
					xmlStream.leafNode("f", attrs, model.formula);
					xmlStream.leafNode("v", null, model.result);
					break;
				case Enums.ValueType.Boolean:
					xmlStream.addAttribute("t", "b");
					xmlStream.leafNode("f", attrs, model.formula);
					xmlStream.leafNode("v", null, model.result ? 1 : 0);
					break;
				case Enums.ValueType.Error:
					xmlStream.addAttribute("t", "e");
					xmlStream.leafNode("f", attrs, model.formula);
					xmlStream.leafNode("v", null, model.result.error);
					break;
				case Enums.ValueType.Date:
					xmlStream.leafNode("f", attrs, model.formula);
					xmlStream.leafNode("v", null, utils.dateToExcel(model.result, model.date1904));
					break;
				default: throw new Error("I could not understand type of value");
			}
		}
		render(xmlStream, model) {
			if (model.type === Enums.ValueType.Null && !model.styleId) return;
			xmlStream.openNode("c");
			xmlStream.addAttribute("r", model.address);
			if (model.styleId) xmlStream.addAttribute("s", model.styleId);
			switch (model.type) {
				case Enums.ValueType.Null: break;
				case Enums.ValueType.Number:
					xmlStream.leafNode("v", null, model.value);
					break;
				case Enums.ValueType.Boolean:
					xmlStream.addAttribute("t", "b");
					xmlStream.leafNode("v", null, model.value ? "1" : "0");
					break;
				case Enums.ValueType.Error:
					xmlStream.addAttribute("t", "e");
					xmlStream.leafNode("v", null, model.value.error);
					break;
				case Enums.ValueType.String:
				case Enums.ValueType.RichText:
					if (model.ssId !== void 0) {
						xmlStream.addAttribute("t", "s");
						xmlStream.leafNode("v", null, model.ssId);
					} else if (model.value && model.value.richText) {
						xmlStream.addAttribute("t", "inlineStr");
						xmlStream.openNode("is");
						model.value.richText.forEach((text) => {
							this.richTextXForm.render(xmlStream, text);
						});
						xmlStream.closeNode("is");
					} else {
						xmlStream.addAttribute("t", "str");
						xmlStream.leafNode("v", null, model.value);
					}
					break;
				case Enums.ValueType.Date:
					xmlStream.leafNode("v", null, utils.dateToExcel(model.value, model.date1904));
					break;
				case Enums.ValueType.Hyperlink:
					if (model.ssId !== void 0) {
						xmlStream.addAttribute("t", "s");
						xmlStream.leafNode("v", null, model.ssId);
					} else {
						xmlStream.addAttribute("t", "str");
						xmlStream.leafNode("v", null, model.text);
					}
					break;
				case Enums.ValueType.Formula:
					this.renderFormula(xmlStream, model);
					break;
				case Enums.ValueType.Merge:
			}
			xmlStream.closeNode();
		}
		parseOpen(node) {
			if (this.parser) {
				this.parser.parseOpen(node);
				return true;
			}
			switch (node.name) {
				case "c":
					this.model = { address: node.attributes.r };
					this.t = node.attributes.t;
					if (node.attributes.s) this.model.styleId = parseInt(node.attributes.s, 10);
					return true;
				case "f":
					this.currentNode = "f";
					this.model.si = node.attributes.si;
					this.model.shareType = node.attributes.t;
					this.model.ref = node.attributes.ref;
					return true;
				case "v":
					this.currentNode = "v";
					return true;
				case "t":
					this.currentNode = "t";
					return true;
				case "r":
					this.parser = this.richTextXForm;
					this.parser.parseOpen(node);
					return true;
				default: return false;
			}
		}
		parseText(text) {
			if (this.parser) {
				this.parser.parseText(text);
				return;
			}
			switch (this.currentNode) {
				case "f":
					this.model.formula = this.model.formula ? this.model.formula + text : text;
					break;
				case "v":
				case "t": if (this.model.value && this.model.value.richText) this.model.value.richText.text = this.model.value.richText.text ? this.model.value.richText.text + text : text;
				else this.model.value = this.model.value ? this.model.value + text : text;
			}
		}
		parseClose(name) {
			switch (name) {
				case "c": {
					const { model } = this;
					if (model.formula || model.shareType) {
						model.type = Enums.ValueType.Formula;
						if (model.value) {
							if (this.t === "str") model.result = utils.xmlDecode(model.value);
							else if (this.t === "b") model.result = parseInt(model.value, 10) !== 0;
							else if (this.t === "e") model.result = { error: model.value };
							else model.result = parseFloat(model.value);
							model.value = void 0;
						}
					} else if (model.value !== void 0) switch (this.t) {
						case "s":
							model.type = Enums.ValueType.String;
							model.value = parseInt(model.value, 10);
							break;
						case "str":
							model.type = Enums.ValueType.String;
							model.value = utils.xmlDecode(model.value);
							break;
						case "inlineStr":
							model.type = Enums.ValueType.String;
							break;
						case "b":
							model.type = Enums.ValueType.Boolean;
							model.value = parseInt(model.value, 10) !== 0;
							break;
						case "e":
							model.type = Enums.ValueType.Error;
							model.value = { error: model.value };
							break;
						default:
							model.type = Enums.ValueType.Number;
							model.value = parseFloat(model.value);
					}
					else if (model.styleId) model.type = Enums.ValueType.Null;
					else model.type = Enums.ValueType.Merge;
					return false;
				}
				case "f":
				case "v":
				case "is":
					this.currentNode = void 0;
					return true;
				case "t":
					if (this.parser) {
						this.parser.parseClose(name);
						return true;
					}
					this.currentNode = void 0;
					return true;
				case "r":
					this.model.value = this.model.value || {};
					this.model.value.richText = this.model.value.richText || [];
					this.model.value.richText.push(this.parser.model);
					this.parser = void 0;
					this.currentNode = void 0;
					return true;
				default:
					if (this.parser) {
						this.parser.parseClose(name);
						return true;
					}
					return false;
			}
		}
		reconcile(model, options) {
			const style = model.styleId && options.styles && options.styles.getStyleModel(model.styleId);
			if (style) model.style = style;
			if (model.styleId !== void 0) model.styleId = void 0;
			switch (model.type) {
				case Enums.ValueType.String:
					if (typeof model.value === "number") {
						if (options.sharedStrings) model.value = options.sharedStrings.getString(model.value);
					}
					if (model.value.richText) model.type = Enums.ValueType.RichText;
					break;
				case Enums.ValueType.Number:
					if (style && utils.isDateFmt(style.numFmt)) {
						model.type = Enums.ValueType.Date;
						model.value = utils.excelToDate(model.value, options.date1904);
					}
					break;
				case Enums.ValueType.Formula:
					if (model.result !== void 0 && style && utils.isDateFmt(style.numFmt)) model.result = utils.excelToDate(model.result, options.date1904);
					if (model.shareType === "shared") {
						if (model.ref) options.formulae[model.si] = model.address;
						else {
							model.sharedFormula = options.formulae[model.si];
							delete model.shareType;
						}
						delete model.si;
					}
			}
			const hyperlink = options.hyperlinkMap[model.address];
			if (hyperlink) {
				if (model.type === Enums.ValueType.Formula) {
					model.text = model.result;
					model.result = void 0;
				} else {
					model.text = model.value;
					model.value = void 0;
				}
				model.type = Enums.ValueType.Hyperlink;
				model.hyperlink = hyperlink;
			}
			const comment = options.commentsMap && options.commentsMap[model.address];
			if (comment) model.comment = comment;
		}
	};
	module.exports = CellXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/sheet/row-xform.js
var require_row_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var BaseXform = require_base_xform();
	var utils = require_utils();
	var CellXform = require_cell_xform();
	var RowXform = class extends BaseXform {
		constructor(options) {
			super();
			this.maxItems = options && options.maxItems;
			this.map = { c: new CellXform() };
		}
		get tag() {
			return "row";
		}
		prepare(model, options) {
			const styleId = options.styles.addStyleModel(model.style);
			if (styleId) model.styleId = styleId;
			const cellXform = this.map.c;
			model.cells.forEach((cellModel) => {
				cellXform.prepare(cellModel, options);
			});
		}
		render(xmlStream, model, options) {
			xmlStream.openNode("row");
			xmlStream.addAttribute("r", model.number);
			if (model.height) {
				xmlStream.addAttribute("ht", model.height);
				xmlStream.addAttribute("customHeight", "1");
			}
			if (model.hidden) xmlStream.addAttribute("hidden", "1");
			if (model.min > 0 && model.max > 0 && model.min <= model.max) xmlStream.addAttribute("spans", `${model.min}:${model.max}`);
			if (model.styleId) {
				xmlStream.addAttribute("s", model.styleId);
				xmlStream.addAttribute("customFormat", "1");
			}
			xmlStream.addAttribute("x14ac:dyDescent", "0.25");
			if (model.outlineLevel) xmlStream.addAttribute("outlineLevel", model.outlineLevel);
			if (model.collapsed) xmlStream.addAttribute("collapsed", "1");
			const cellXform = this.map.c;
			model.cells.forEach((cellModel) => {
				cellXform.render(xmlStream, cellModel, options);
			});
			xmlStream.closeNode();
		}
		parseOpen(node) {
			if (this.parser) {
				this.parser.parseOpen(node);
				return true;
			}
			if (node.name === "row") {
				this.numRowsSeen += 1;
				const spans = node.attributes.spans ? node.attributes.spans.split(":").map((span) => parseInt(span, 10)) : [void 0, void 0];
				const model = this.model = {
					number: parseInt(node.attributes.r, 10),
					min: spans[0],
					max: spans[1],
					cells: []
				};
				if (node.attributes.s) model.styleId = parseInt(node.attributes.s, 10);
				if (utils.parseBoolean(node.attributes.hidden)) model.hidden = true;
				if (utils.parseBoolean(node.attributes.bestFit)) model.bestFit = true;
				if (node.attributes.ht) model.height = parseFloat(node.attributes.ht);
				if (node.attributes.outlineLevel) model.outlineLevel = parseInt(node.attributes.outlineLevel, 10);
				if (utils.parseBoolean(node.attributes.collapsed)) model.collapsed = true;
				return true;
			}
			this.parser = this.map[node.name];
			if (this.parser) {
				this.parser.parseOpen(node);
				return true;
			}
			return false;
		}
		parseText(text) {
			if (this.parser) this.parser.parseText(text);
		}
		parseClose(name) {
			if (this.parser) {
				if (!this.parser.parseClose(name)) {
					this.model.cells.push(this.parser.model);
					if (this.maxItems && this.model.cells.length > this.maxItems) throw new Error(`Max column count (${this.maxItems}) exceeded`);
					this.parser = void 0;
				}
				return true;
			}
			return false;
		}
		reconcile(model, options) {
			model.style = model.styleId ? options.styles.getStyleModel(model.styleId) : {};
			if (model.styleId !== void 0) model.styleId = void 0;
			const cellXform = this.map.c;
			model.cells.forEach((cellModel) => {
				cellXform.reconcile(cellModel, options);
			});
		}
	};
	module.exports = RowXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/sheet/col-xform.js
var require_col_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var utils = require_utils();
	var BaseXform = require_base_xform();
	var ColXform = class extends BaseXform {
		get tag() {
			return "col";
		}
		prepare(model, options) {
			const styleId = options.styles.addStyleModel(model.style || {});
			if (styleId) model.styleId = styleId;
		}
		render(xmlStream, model) {
			xmlStream.openNode("col");
			xmlStream.addAttribute("min", model.min);
			xmlStream.addAttribute("max", model.max);
			if (model.width) xmlStream.addAttribute("width", model.width);
			if (model.styleId) xmlStream.addAttribute("style", model.styleId);
			if (model.hidden) xmlStream.addAttribute("hidden", "1");
			if (model.bestFit) xmlStream.addAttribute("bestFit", "1");
			if (model.outlineLevel) xmlStream.addAttribute("outlineLevel", model.outlineLevel);
			if (model.collapsed) xmlStream.addAttribute("collapsed", "1");
			xmlStream.addAttribute("customWidth", "1");
			xmlStream.closeNode();
		}
		parseOpen(node) {
			if (node.name === "col") {
				const model = this.model = {
					min: parseInt(node.attributes.min || "0", 10),
					max: parseInt(node.attributes.max || "0", 10),
					width: node.attributes.width === void 0 ? void 0 : parseFloat(node.attributes.width || "0")
				};
				if (node.attributes.style) model.styleId = parseInt(node.attributes.style, 10);
				if (utils.parseBoolean(node.attributes.hidden)) model.hidden = true;
				if (utils.parseBoolean(node.attributes.bestFit)) model.bestFit = true;
				if (node.attributes.outlineLevel) model.outlineLevel = parseInt(node.attributes.outlineLevel, 10);
				if (utils.parseBoolean(node.attributes.collapsed)) model.collapsed = true;
				return true;
			}
			return false;
		}
		parseText() {}
		parseClose() {
			return false;
		}
		reconcile(model, options) {
			if (model.styleId) model.style = options.styles.getStyleModel(model.styleId);
		}
	};
	module.exports = ColXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/sheet/dimension-xform.js
var require_dimension_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var BaseXform = require_base_xform();
	var DimensionXform = class extends BaseXform {
		get tag() {
			return "dimension";
		}
		render(xmlStream, model) {
			if (model) xmlStream.leafNode("dimension", { ref: model });
		}
		parseOpen(node) {
			if (node.name === "dimension") {
				this.model = node.attributes.ref;
				return true;
			}
			return false;
		}
		parseText() {}
		parseClose() {
			return false;
		}
	};
	module.exports = DimensionXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/sheet/hyperlink-xform.js
var require_hyperlink_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var BaseXform = require_base_xform();
	var HyperlinkXform = class extends BaseXform {
		get tag() {
			return "hyperlink";
		}
		render(xmlStream, model) {
			if (this.isInternalLink(model)) xmlStream.leafNode("hyperlink", {
				ref: model.address,
				"r:id": model.rId,
				tooltip: model.tooltip,
				location: model.target
			});
			else xmlStream.leafNode("hyperlink", {
				ref: model.address,
				"r:id": model.rId,
				tooltip: model.tooltip
			});
		}
		parseOpen(node) {
			if (node.name === "hyperlink") {
				this.model = {
					address: node.attributes.ref,
					rId: node.attributes["r:id"],
					tooltip: node.attributes.tooltip
				};
				if (node.attributes.location) this.model.target = node.attributes.location;
				return true;
			}
			return false;
		}
		parseText() {}
		parseClose() {
			return false;
		}
		isInternalLink(model) {
			return model.target && /^[^!]+![a-zA-Z]+[\d]+$/.test(model.target);
		}
	};
	module.exports = HyperlinkXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/sheet/merge-cell-xform.js
var require_merge_cell_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var BaseXform = require_base_xform();
	var MergeCellXform = class extends BaseXform {
		get tag() {
			return "mergeCell";
		}
		render(xmlStream, model) {
			xmlStream.leafNode("mergeCell", { ref: model });
		}
		parseOpen(node) {
			if (node.name === "mergeCell") {
				this.model = node.attributes.ref;
				return true;
			}
			return false;
		}
		parseText() {}
		parseClose() {
			return false;
		}
	};
	module.exports = MergeCellXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/sheet/data-validations-xform.js
var require_data_validations_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var _ = require_under_dash();
	var utils = require_utils();
	var colCache = require_col_cache();
	var BaseXform = require_base_xform();
	var Range = require_range();
	function assign(definedName, attributes, name, defaultValue) {
		const value = attributes[name];
		if (value !== void 0) definedName[name] = value;
		else if (defaultValue !== void 0) definedName[name] = defaultValue;
	}
	function assignBool(definedName, attributes, name, defaultValue) {
		const value = attributes[name];
		if (value !== void 0) definedName[name] = utils.parseBoolean(value);
		else if (defaultValue !== void 0) definedName[name] = defaultValue;
	}
	function optimiseDataValidations(model) {
		const dvList = _.map(model, (dataValidation, address) => ({
			address,
			dataValidation,
			marked: false
		})).sort((a, b) => _.strcmp(a.address, b.address));
		const dvMap = _.keyBy(dvList, "address");
		const matchCol = (addr, height, col) => {
			for (let i = 0; i < height; i++) {
				const otherAddress = colCache.encodeAddress(addr.row + i, col);
				if (!model[otherAddress] || !_.isEqual(model[addr.address], model[otherAddress])) return false;
			}
			return true;
		};
		return dvList.map((dv) => {
			if (!dv.marked) {
				const addr = colCache.decodeEx(dv.address);
				if (addr.dimensions) {
					dvMap[addr.dimensions].marked = true;
					return {
						...dv.dataValidation,
						sqref: dv.address
					};
				}
				let height = 1;
				let otherAddress = colCache.encodeAddress(addr.row + height, addr.col);
				while (model[otherAddress] && _.isEqual(dv.dataValidation, model[otherAddress])) {
					height++;
					otherAddress = colCache.encodeAddress(addr.row + height, addr.col);
				}
				let width = 1;
				while (matchCol(addr, height, addr.col + width)) width++;
				for (let i = 0; i < height; i++) for (let j = 0; j < width; j++) {
					otherAddress = colCache.encodeAddress(addr.row + i, addr.col + j);
					dvMap[otherAddress].marked = true;
				}
				if (height > 1 || width > 1) {
					const bottom = addr.row + (height - 1);
					const right = addr.col + (width - 1);
					return {
						...dv.dataValidation,
						sqref: `${dv.address}:${colCache.encodeAddress(bottom, right)}`
					};
				}
				return {
					...dv.dataValidation,
					sqref: dv.address
				};
			}
			return null;
		}).filter(Boolean);
	}
	var DataValidationsXform = class extends BaseXform {
		get tag() {
			return "dataValidations";
		}
		render(xmlStream, model) {
			const optimizedModel = optimiseDataValidations(model);
			if (optimizedModel.length) {
				xmlStream.openNode("dataValidations", { count: optimizedModel.length });
				optimizedModel.forEach((value) => {
					xmlStream.openNode("dataValidation");
					if (value.type !== "any") {
						xmlStream.addAttribute("type", value.type);
						if (value.operator && value.type !== "list" && value.operator !== "between") xmlStream.addAttribute("operator", value.operator);
						if (value.allowBlank) xmlStream.addAttribute("allowBlank", "1");
					}
					if (value.showInputMessage) xmlStream.addAttribute("showInputMessage", "1");
					if (value.promptTitle) xmlStream.addAttribute("promptTitle", value.promptTitle);
					if (value.prompt) xmlStream.addAttribute("prompt", value.prompt);
					if (value.showErrorMessage) xmlStream.addAttribute("showErrorMessage", "1");
					if (value.errorStyle) xmlStream.addAttribute("errorStyle", value.errorStyle);
					if (value.errorTitle) xmlStream.addAttribute("errorTitle", value.errorTitle);
					if (value.error) xmlStream.addAttribute("error", value.error);
					xmlStream.addAttribute("sqref", value.sqref);
					(value.formulae || []).forEach((formula, index) => {
						xmlStream.openNode(`formula${index + 1}`);
						if (value.type === "date") xmlStream.writeText(utils.dateToExcel(new Date(formula)));
						else xmlStream.writeText(formula);
						xmlStream.closeNode();
					});
					xmlStream.closeNode();
				});
				xmlStream.closeNode();
			}
		}
		parseOpen(node) {
			switch (node.name) {
				case "dataValidations":
					this.model = {};
					return true;
				case "dataValidation": {
					this._address = node.attributes.sqref;
					const dataValidation = {
						type: node.attributes.type || "any",
						formulae: []
					};
					if (node.attributes.type) assignBool(dataValidation, node.attributes, "allowBlank");
					assignBool(dataValidation, node.attributes, "showInputMessage");
					assignBool(dataValidation, node.attributes, "showErrorMessage");
					switch (dataValidation.type) {
						case "any":
						case "list":
						case "custom": break;
						default: assign(dataValidation, node.attributes, "operator", "between");
					}
					assign(dataValidation, node.attributes, "promptTitle");
					assign(dataValidation, node.attributes, "prompt");
					assign(dataValidation, node.attributes, "errorStyle");
					assign(dataValidation, node.attributes, "errorTitle");
					assign(dataValidation, node.attributes, "error");
					this._dataValidation = dataValidation;
					return true;
				}
				case "formula1":
				case "formula2":
					this._formula = [];
					return true;
				default: return false;
			}
		}
		parseText(text) {
			if (this._formula) this._formula.push(text);
		}
		parseClose(name) {
			switch (name) {
				case "dataValidations": return false;
				case "dataValidation":
					if (!this._dataValidation.formulae || !this._dataValidation.formulae.length) {
						delete this._dataValidation.formulae;
						delete this._dataValidation.operator;
					}
					(this._address.split(/\s+/g) || []).forEach((addr) => {
						if (addr.includes(":")) new Range(addr).forEachAddress((address) => {
							this.model[address] = this._dataValidation;
						});
						else this.model[addr] = this._dataValidation;
					});
					return true;
				case "formula1":
				case "formula2": {
					let formula = this._formula.join("");
					switch (this._dataValidation.type) {
						case "whole":
						case "textLength":
							formula = parseInt(formula, 10);
							break;
						case "decimal":
							formula = parseFloat(formula);
							break;
						case "date": formula = utils.excelToDate(parseFloat(formula));
					}
					this._dataValidation.formulae.push(formula);
					this._formula = void 0;
					return true;
				}
				default: return true;
			}
		}
	};
	module.exports = DataValidationsXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/sheet/page-setup-properties-xform.js
var require_page_setup_properties_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var BaseXform = require_base_xform();
	var PageSetupPropertiesXform = class extends BaseXform {
		get tag() {
			return "pageSetUpPr";
		}
		render(xmlStream, model) {
			if (model && model.fitToPage) {
				xmlStream.leafNode(this.tag, { fitToPage: model.fitToPage ? "1" : void 0 });
				return true;
			}
			return false;
		}
		parseOpen(node) {
			if (node.name === this.tag) {
				this.model = { fitToPage: node.attributes.fitToPage === "1" };
				return true;
			}
			return false;
		}
		parseText() {}
		parseClose() {
			return false;
		}
	};
	module.exports = PageSetupPropertiesXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/sheet/outline-properties-xform.js
var require_outline_properties_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var BaseXform = require_base_xform();
	var isDefined = (attr) => typeof attr !== "undefined";
	var OutlinePropertiesXform = class extends BaseXform {
		get tag() {
			return "outlinePr";
		}
		render(xmlStream, model) {
			if (model && (isDefined(model.summaryBelow) || isDefined(model.summaryRight))) {
				xmlStream.leafNode(this.tag, {
					summaryBelow: isDefined(model.summaryBelow) ? Number(model.summaryBelow) : void 0,
					summaryRight: isDefined(model.summaryRight) ? Number(model.summaryRight) : void 0
				});
				return true;
			}
			return false;
		}
		parseOpen(node) {
			if (node.name === this.tag) {
				this.model = {
					summaryBelow: isDefined(node.attributes.summaryBelow) ? Boolean(Number(node.attributes.summaryBelow)) : void 0,
					summaryRight: isDefined(node.attributes.summaryRight) ? Boolean(Number(node.attributes.summaryRight)) : void 0
				};
				return true;
			}
			return false;
		}
		parseText() {}
		parseClose() {
			return false;
		}
	};
	module.exports = OutlinePropertiesXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/sheet/sheet-properties-xform.js
var require_sheet_properties_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var BaseXform = require_base_xform();
	var ColorXform = require_color_xform();
	var PageSetupPropertiesXform = require_page_setup_properties_xform();
	var OutlinePropertiesXform = require_outline_properties_xform();
	var SheetPropertiesXform = class extends BaseXform {
		constructor() {
			super();
			this.map = {
				tabColor: new ColorXform("tabColor"),
				pageSetUpPr: new PageSetupPropertiesXform(),
				outlinePr: new OutlinePropertiesXform()
			};
		}
		get tag() {
			return "sheetPr";
		}
		render(xmlStream, model) {
			if (model) {
				xmlStream.addRollback();
				xmlStream.openNode("sheetPr");
				let inner = false;
				inner = this.map.tabColor.render(xmlStream, model.tabColor) || inner;
				inner = this.map.pageSetUpPr.render(xmlStream, model.pageSetup) || inner;
				inner = this.map.outlinePr.render(xmlStream, model.outlineProperties) || inner;
				if (inner) {
					xmlStream.closeNode();
					xmlStream.commit();
				} else xmlStream.rollback();
			}
		}
		parseOpen(node) {
			if (this.parser) {
				this.parser.parseOpen(node);
				return true;
			}
			if (node.name === this.tag) {
				this.reset();
				return true;
			}
			if (this.map[node.name]) {
				this.parser = this.map[node.name];
				this.parser.parseOpen(node);
				return true;
			}
			return false;
		}
		parseText(text) {
			if (this.parser) {
				this.parser.parseText(text);
				return true;
			}
			return false;
		}
		parseClose(name) {
			if (this.parser) {
				if (!this.parser.parseClose(name)) this.parser = void 0;
				return true;
			}
			if (this.map.tabColor.model || this.map.pageSetUpPr.model || this.map.outlinePr.model) {
				this.model = {};
				if (this.map.tabColor.model) this.model.tabColor = this.map.tabColor.model;
				if (this.map.pageSetUpPr.model) this.model.pageSetup = this.map.pageSetUpPr.model;
				if (this.map.outlinePr.model) this.model.outlineProperties = this.map.outlinePr.model;
			} else this.model = null;
			return false;
		}
	};
	module.exports = SheetPropertiesXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/sheet/sheet-format-properties-xform.js
var require_sheet_format_properties_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var _ = require_under_dash();
	var BaseXform = require_base_xform();
	var SheetFormatPropertiesXform = class extends BaseXform {
		get tag() {
			return "sheetFormatPr";
		}
		render(xmlStream, model) {
			if (model) {
				const attributes = {
					defaultRowHeight: model.defaultRowHeight,
					outlineLevelRow: model.outlineLevelRow,
					outlineLevelCol: model.outlineLevelCol,
					"x14ac:dyDescent": model.dyDescent
				};
				if (model.defaultColWidth) attributes.defaultColWidth = model.defaultColWidth;
				if (!model.defaultRowHeight || model.defaultRowHeight !== 15) attributes.customHeight = "1";
				if (_.some(attributes, (value) => value !== void 0)) xmlStream.leafNode("sheetFormatPr", attributes);
			}
		}
		parseOpen(node) {
			if (node.name === "sheetFormatPr") {
				this.model = {
					defaultRowHeight: parseFloat(node.attributes.defaultRowHeight || "0"),
					dyDescent: parseFloat(node.attributes["x14ac:dyDescent"] || "0"),
					outlineLevelRow: parseInt(node.attributes.outlineLevelRow || "0", 10),
					outlineLevelCol: parseInt(node.attributes.outlineLevelCol || "0", 10)
				};
				if (node.attributes.defaultColWidth) this.model.defaultColWidth = parseFloat(node.attributes.defaultColWidth);
				return true;
			}
			return false;
		}
		parseText() {}
		parseClose() {
			return false;
		}
	};
	module.exports = SheetFormatPropertiesXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/sheet/sheet-view-xform.js
var require_sheet_view_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var colCache = require_col_cache();
	var BaseXform = require_base_xform();
	var VIEW_STATES = {
		frozen: "frozen",
		frozenSplit: "frozen",
		split: "split"
	};
	var SheetViewXform = class extends BaseXform {
		get tag() {
			return "sheetView";
		}
		prepare(model) {
			switch (model.state) {
				case "frozen":
				case "split": break;
				default: model.state = "normal";
			}
		}
		render(xmlStream, model) {
			xmlStream.openNode("sheetView", { workbookViewId: model.workbookViewId || 0 });
			const add = function(name, value, included) {
				if (included) xmlStream.addAttribute(name, value);
			};
			add("rightToLeft", "1", model.rightToLeft === true);
			add("tabSelected", "1", model.tabSelected);
			add("showRuler", "0", model.showRuler === false);
			add("showRowColHeaders", "0", model.showRowColHeaders === false);
			add("showGridLines", "0", model.showGridLines === false);
			add("zoomScale", model.zoomScale, model.zoomScale);
			add("zoomScaleNormal", model.zoomScaleNormal, model.zoomScaleNormal);
			add("view", model.style, model.style);
			let topLeftCell;
			let xSplit;
			let ySplit;
			let activePane;
			switch (model.state) {
				case "frozen":
					xSplit = model.xSplit || 0;
					ySplit = model.ySplit || 0;
					topLeftCell = model.topLeftCell || colCache.getAddress(ySplit + 1, xSplit + 1).address;
					activePane = model.xSplit && model.ySplit && "bottomRight" || model.xSplit && "topRight" || "bottomLeft";
					xmlStream.leafNode("pane", {
						xSplit: model.xSplit || void 0,
						ySplit: model.ySplit || void 0,
						topLeftCell,
						activePane,
						state: "frozen"
					});
					xmlStream.leafNode("selection", {
						pane: activePane,
						activeCell: model.activeCell,
						sqref: model.activeCell
					});
					break;
				case "split":
					if (model.activePane === "topLeft") model.activePane = void 0;
					xmlStream.leafNode("pane", {
						xSplit: model.xSplit || void 0,
						ySplit: model.ySplit || void 0,
						topLeftCell: model.topLeftCell,
						activePane: model.activePane
					});
					xmlStream.leafNode("selection", {
						pane: model.activePane,
						activeCell: model.activeCell,
						sqref: model.activeCell
					});
					break;
				case "normal": if (model.activeCell) xmlStream.leafNode("selection", {
					activeCell: model.activeCell,
					sqref: model.activeCell
				});
			}
			xmlStream.closeNode();
		}
		parseOpen(node) {
			switch (node.name) {
				case "sheetView":
					this.sheetView = {
						workbookViewId: parseInt(node.attributes.workbookViewId, 10),
						rightToLeft: node.attributes.rightToLeft === "1",
						tabSelected: node.attributes.tabSelected === "1",
						showRuler: !(node.attributes.showRuler === "0"),
						showRowColHeaders: !(node.attributes.showRowColHeaders === "0"),
						showGridLines: !(node.attributes.showGridLines === "0"),
						zoomScale: parseInt(node.attributes.zoomScale || "100", 10),
						zoomScaleNormal: parseInt(node.attributes.zoomScaleNormal || "100", 10),
						style: node.attributes.view
					};
					this.pane = void 0;
					this.selections = {};
					return true;
				case "pane":
					this.pane = {
						xSplit: parseInt(node.attributes.xSplit || "0", 10),
						ySplit: parseInt(node.attributes.ySplit || "0", 10),
						topLeftCell: node.attributes.topLeftCell,
						activePane: node.attributes.activePane || "topLeft",
						state: node.attributes.state
					};
					return true;
				case "selection": {
					const name = node.attributes.pane || "topLeft";
					this.selections[name] = {
						pane: name,
						activeCell: node.attributes.activeCell
					};
					return true;
				}
				default: return false;
			}
		}
		parseText() {}
		parseClose(name) {
			let model;
			let selection;
			switch (name) {
				case "sheetView":
					if (this.sheetView && this.pane) {
						model = this.model = {
							workbookViewId: this.sheetView.workbookViewId,
							rightToLeft: this.sheetView.rightToLeft,
							state: VIEW_STATES[this.pane.state] || "split",
							xSplit: this.pane.xSplit,
							ySplit: this.pane.ySplit,
							topLeftCell: this.pane.topLeftCell,
							showRuler: this.sheetView.showRuler,
							showRowColHeaders: this.sheetView.showRowColHeaders,
							showGridLines: this.sheetView.showGridLines,
							zoomScale: this.sheetView.zoomScale,
							zoomScaleNormal: this.sheetView.zoomScaleNormal
						};
						if (this.model.state === "split") model.activePane = this.pane.activePane;
						selection = this.selections[this.pane.activePane];
						if (selection && selection.activeCell) model.activeCell = selection.activeCell;
						if (this.sheetView.style) model.style = this.sheetView.style;
					} else {
						model = this.model = {
							workbookViewId: this.sheetView.workbookViewId,
							rightToLeft: this.sheetView.rightToLeft,
							state: "normal",
							showRuler: this.sheetView.showRuler,
							showRowColHeaders: this.sheetView.showRowColHeaders,
							showGridLines: this.sheetView.showGridLines,
							zoomScale: this.sheetView.zoomScale,
							zoomScaleNormal: this.sheetView.zoomScaleNormal
						};
						selection = this.selections.topLeft;
						if (selection && selection.activeCell) model.activeCell = selection.activeCell;
						if (this.sheetView.style) model.style = this.sheetView.style;
					}
					return false;
				default: return true;
			}
		}
		reconcile() {}
	};
	module.exports = SheetViewXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/sheet/sheet-protection-xform.js
var require_sheet_protection_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var _ = require_under_dash();
	var BaseXform = require_base_xform();
	function booleanToXml(model, value) {
		return model ? value : void 0;
	}
	function xmlToBoolean(value, equals) {
		return value === equals ? true : void 0;
	}
	var SheetProtectionXform = class extends BaseXform {
		get tag() {
			return "sheetProtection";
		}
		render(xmlStream, model) {
			if (model) {
				const attributes = {
					sheet: booleanToXml(model.sheet, "1"),
					selectLockedCells: model.selectLockedCells === false ? "1" : void 0,
					selectUnlockedCells: model.selectUnlockedCells === false ? "1" : void 0,
					formatCells: booleanToXml(model.formatCells, "0"),
					formatColumns: booleanToXml(model.formatColumns, "0"),
					formatRows: booleanToXml(model.formatRows, "0"),
					insertColumns: booleanToXml(model.insertColumns, "0"),
					insertRows: booleanToXml(model.insertRows, "0"),
					insertHyperlinks: booleanToXml(model.insertHyperlinks, "0"),
					deleteColumns: booleanToXml(model.deleteColumns, "0"),
					deleteRows: booleanToXml(model.deleteRows, "0"),
					sort: booleanToXml(model.sort, "0"),
					autoFilter: booleanToXml(model.autoFilter, "0"),
					pivotTables: booleanToXml(model.pivotTables, "0")
				};
				if (model.sheet) {
					attributes.algorithmName = model.algorithmName;
					attributes.hashValue = model.hashValue;
					attributes.saltValue = model.saltValue;
					attributes.spinCount = model.spinCount;
					attributes.objects = booleanToXml(model.objects === false, "1");
					attributes.scenarios = booleanToXml(model.scenarios === false, "1");
				}
				if (_.some(attributes, (value) => value !== void 0)) xmlStream.leafNode(this.tag, attributes);
			}
		}
		parseOpen(node) {
			switch (node.name) {
				case this.tag:
					this.model = {
						sheet: xmlToBoolean(node.attributes.sheet, "1"),
						objects: node.attributes.objects === "1" ? false : void 0,
						scenarios: node.attributes.scenarios === "1" ? false : void 0,
						selectLockedCells: node.attributes.selectLockedCells === "1" ? false : void 0,
						selectUnlockedCells: node.attributes.selectUnlockedCells === "1" ? false : void 0,
						formatCells: xmlToBoolean(node.attributes.formatCells, "0"),
						formatColumns: xmlToBoolean(node.attributes.formatColumns, "0"),
						formatRows: xmlToBoolean(node.attributes.formatRows, "0"),
						insertColumns: xmlToBoolean(node.attributes.insertColumns, "0"),
						insertRows: xmlToBoolean(node.attributes.insertRows, "0"),
						insertHyperlinks: xmlToBoolean(node.attributes.insertHyperlinks, "0"),
						deleteColumns: xmlToBoolean(node.attributes.deleteColumns, "0"),
						deleteRows: xmlToBoolean(node.attributes.deleteRows, "0"),
						sort: xmlToBoolean(node.attributes.sort, "0"),
						autoFilter: xmlToBoolean(node.attributes.autoFilter, "0"),
						pivotTables: xmlToBoolean(node.attributes.pivotTables, "0")
					};
					if (node.attributes.algorithmName) {
						this.model.algorithmName = node.attributes.algorithmName;
						this.model.hashValue = node.attributes.hashValue;
						this.model.saltValue = node.attributes.saltValue;
						this.model.spinCount = parseInt(node.attributes.spinCount, 10);
					}
					return true;
				default: return false;
			}
		}
		parseText() {}
		parseClose() {
			return false;
		}
	};
	module.exports = SheetProtectionXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/sheet/page-margins-xform.js
var require_page_margins_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var _ = require_under_dash();
	var BaseXform = require_base_xform();
	var PageMarginsXform = class extends BaseXform {
		get tag() {
			return "pageMargins";
		}
		render(xmlStream, model) {
			if (model) {
				const attributes = {
					left: model.left,
					right: model.right,
					top: model.top,
					bottom: model.bottom,
					header: model.header,
					footer: model.footer
				};
				if (_.some(attributes, (value) => value !== void 0)) xmlStream.leafNode(this.tag, attributes);
			}
		}
		parseOpen(node) {
			switch (node.name) {
				case this.tag:
					this.model = {
						left: parseFloat(node.attributes.left || .7),
						right: parseFloat(node.attributes.right || .7),
						top: parseFloat(node.attributes.top || .75),
						bottom: parseFloat(node.attributes.bottom || .75),
						header: parseFloat(node.attributes.header || .3),
						footer: parseFloat(node.attributes.footer || .3)
					};
					return true;
				default: return false;
			}
		}
		parseText() {}
		parseClose() {
			return false;
		}
	};
	module.exports = PageMarginsXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/sheet/page-setup-xform.js
var require_page_setup_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var _ = require_under_dash();
	var BaseXform = require_base_xform();
	function booleanToXml(model) {
		return model ? "1" : void 0;
	}
	function pageOrderToXml(model) {
		switch (model) {
			case "overThenDown": return model;
			default: return;
		}
	}
	function cellCommentsToXml(model) {
		switch (model) {
			case "atEnd":
			case "asDisplyed": return model;
			default: return;
		}
	}
	function errorsToXml(model) {
		switch (model) {
			case "dash":
			case "blank":
			case "NA": return model;
			default: return;
		}
	}
	function pageSizeToModel(value) {
		return value !== void 0 ? parseInt(value, 10) : void 0;
	}
	var PageSetupXform = class extends BaseXform {
		get tag() {
			return "pageSetup";
		}
		render(xmlStream, model) {
			if (model) {
				const attributes = {
					paperSize: model.paperSize,
					orientation: model.orientation,
					horizontalDpi: model.horizontalDpi,
					verticalDpi: model.verticalDpi,
					pageOrder: pageOrderToXml(model.pageOrder),
					blackAndWhite: booleanToXml(model.blackAndWhite),
					draft: booleanToXml(model.draft),
					cellComments: cellCommentsToXml(model.cellComments),
					errors: errorsToXml(model.errors),
					scale: model.scale,
					fitToWidth: model.fitToWidth,
					fitToHeight: model.fitToHeight,
					firstPageNumber: model.firstPageNumber,
					useFirstPageNumber: booleanToXml(model.firstPageNumber),
					usePrinterDefaults: booleanToXml(model.usePrinterDefaults),
					copies: model.copies
				};
				if (_.some(attributes, (value) => value !== void 0)) xmlStream.leafNode(this.tag, attributes);
			}
		}
		parseOpen(node) {
			switch (node.name) {
				case this.tag:
					this.model = {
						paperSize: pageSizeToModel(node.attributes.paperSize),
						orientation: node.attributes.orientation || "portrait",
						horizontalDpi: parseInt(node.attributes.horizontalDpi || "4294967295", 10),
						verticalDpi: parseInt(node.attributes.verticalDpi || "4294967295", 10),
						pageOrder: node.attributes.pageOrder || "downThenOver",
						blackAndWhite: node.attributes.blackAndWhite === "1",
						draft: node.attributes.draft === "1",
						cellComments: node.attributes.cellComments || "None",
						errors: node.attributes.errors || "displayed",
						scale: parseInt(node.attributes.scale || "100", 10),
						fitToWidth: parseInt(node.attributes.fitToWidth || "1", 10),
						fitToHeight: parseInt(node.attributes.fitToHeight || "1", 10),
						firstPageNumber: parseInt(node.attributes.firstPageNumber || "1", 10),
						useFirstPageNumber: node.attributes.useFirstPageNumber === "1",
						usePrinterDefaults: node.attributes.usePrinterDefaults === "1",
						copies: parseInt(node.attributes.copies || "1", 10)
					};
					return true;
				default: return false;
			}
		}
		parseText() {}
		parseClose() {
			return false;
		}
	};
	module.exports = PageSetupXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/sheet/print-options-xform.js
var require_print_options_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var _ = require_under_dash();
	var BaseXform = require_base_xform();
	function booleanToXml(model) {
		return model ? "1" : void 0;
	}
	var PrintOptionsXform = class extends BaseXform {
		get tag() {
			return "printOptions";
		}
		render(xmlStream, model) {
			if (model) {
				const attributes = {
					headings: booleanToXml(model.showRowColHeaders),
					gridLines: booleanToXml(model.showGridLines),
					horizontalCentered: booleanToXml(model.horizontalCentered),
					verticalCentered: booleanToXml(model.verticalCentered)
				};
				if (_.some(attributes, (value) => value !== void 0)) xmlStream.leafNode(this.tag, attributes);
			}
		}
		parseOpen(node) {
			switch (node.name) {
				case this.tag:
					this.model = {
						showRowColHeaders: node.attributes.headings === "1",
						showGridLines: node.attributes.gridLines === "1",
						horizontalCentered: node.attributes.horizontalCentered === "1",
						verticalCentered: node.attributes.verticalCentered === "1"
					};
					return true;
				default: return false;
			}
		}
		parseText() {}
		parseClose() {
			return false;
		}
	};
	module.exports = PrintOptionsXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/sheet/auto-filter-xform.js
var require_auto_filter_xform$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var colCache = require_col_cache();
	var BaseXform = require_base_xform();
	var AutoFilterXform = class extends BaseXform {
		get tag() {
			return "autoFilter";
		}
		render(xmlStream, model) {
			if (model) {
				if (typeof model === "string") xmlStream.leafNode("autoFilter", { ref: model });
				else {
					const getAddress = function(addr) {
						if (typeof addr === "string") return addr;
						return colCache.getAddress(addr.row, addr.column).address;
					};
					const firstAddress = getAddress(model.from);
					const secondAddress = getAddress(model.to);
					if (firstAddress && secondAddress) xmlStream.leafNode("autoFilter", { ref: `${firstAddress}:${secondAddress}` });
				}
			}
		}
		parseOpen(node) {
			if (node.name === "autoFilter") this.model = node.attributes.ref;
		}
	};
	module.exports = AutoFilterXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/sheet/picture-xform.js
var require_picture_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var BaseXform = require_base_xform();
	var PictureXform = class extends BaseXform {
		get tag() {
			return "picture";
		}
		render(xmlStream, model) {
			if (model) xmlStream.leafNode(this.tag, { "r:id": model.rId });
		}
		parseOpen(node) {
			switch (node.name) {
				case this.tag:
					this.model = { rId: node.attributes["r:id"] };
					return true;
				default: return false;
			}
		}
		parseText() {}
		parseClose() {
			return false;
		}
	};
	module.exports = PictureXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/sheet/drawing-xform.js
var require_drawing_xform$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var BaseXform = require_base_xform();
	var DrawingXform = class extends BaseXform {
		get tag() {
			return "drawing";
		}
		render(xmlStream, model) {
			if (model) xmlStream.leafNode(this.tag, { "r:id": model.rId });
		}
		parseOpen(node) {
			switch (node.name) {
				case this.tag:
					this.model = { rId: node.attributes["r:id"] };
					return true;
				default: return false;
			}
		}
		parseText() {}
		parseClose() {
			return false;
		}
	};
	module.exports = DrawingXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/sheet/table-part-xform.js
var require_table_part_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var BaseXform = require_base_xform();
	var TablePartXform = class extends BaseXform {
		get tag() {
			return "tablePart";
		}
		render(xmlStream, model) {
			if (model) xmlStream.leafNode(this.tag, { "r:id": model.rId });
		}
		parseOpen(node) {
			switch (node.name) {
				case this.tag:
					this.model = { rId: node.attributes["r:id"] };
					return true;
				default: return false;
			}
		}
		parseText() {}
		parseClose() {
			return false;
		}
	};
	module.exports = TablePartXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/sheet/page-breaks-xform.js
var require_page_breaks_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var BaseXform = require_base_xform();
	var PageBreaksXform = class extends BaseXform {
		get tag() {
			return "brk";
		}
		render(xmlStream, model) {
			xmlStream.leafNode("brk", model);
		}
		parseOpen(node) {
			if (node.name === "brk") {
				this.model = node.attributes.ref;
				return true;
			}
			return false;
		}
		parseText() {}
		parseClose() {
			return false;
		}
	};
	module.exports = PageBreaksXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/sheet/row-breaks-xform.js
var require_row_breaks_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var PageBreaksXform = require_page_breaks_xform();
	var ListXform = require_list_xform();
	var RowBreaksXform = class extends ListXform {
		constructor() {
			const options = {
				tag: "rowBreaks",
				count: true,
				childXform: new PageBreaksXform()
			};
			super(options);
		}
		render(xmlStream, model) {
			if (model && model.length) {
				xmlStream.openNode(this.tag, this.$);
				if (this.count) {
					xmlStream.addAttribute(this.$count, model.length);
					xmlStream.addAttribute("manualBreakCount", model.length);
				}
				const { childXform } = this;
				model.forEach((childModel) => {
					childXform.render(xmlStream, childModel);
				});
				xmlStream.closeNode();
			} else if (this.empty) xmlStream.leafNode(this.tag);
		}
	};
	module.exports = RowBreaksXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/sheet/header-footer-xform.js
var require_header_footer_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var BaseXform = require_base_xform();
	var HeaderFooterXform = class extends BaseXform {
		get tag() {
			return "headerFooter";
		}
		render(xmlStream, model) {
			if (model) {
				xmlStream.addRollback();
				let createTag = false;
				xmlStream.openNode("headerFooter");
				if (model.differentFirst) {
					xmlStream.addAttribute("differentFirst", "1");
					createTag = true;
				}
				if (model.differentOddEven) {
					xmlStream.addAttribute("differentOddEven", "1");
					createTag = true;
				}
				if (model.oddHeader && typeof model.oddHeader === "string") {
					xmlStream.leafNode("oddHeader", null, model.oddHeader);
					createTag = true;
				}
				if (model.oddFooter && typeof model.oddFooter === "string") {
					xmlStream.leafNode("oddFooter", null, model.oddFooter);
					createTag = true;
				}
				if (model.evenHeader && typeof model.evenHeader === "string") {
					xmlStream.leafNode("evenHeader", null, model.evenHeader);
					createTag = true;
				}
				if (model.evenFooter && typeof model.evenFooter === "string") {
					xmlStream.leafNode("evenFooter", null, model.evenFooter);
					createTag = true;
				}
				if (model.firstHeader && typeof model.firstHeader === "string") {
					xmlStream.leafNode("firstHeader", null, model.firstHeader);
					createTag = true;
				}
				if (model.firstFooter && typeof model.firstFooter === "string") {
					xmlStream.leafNode("firstFooter", null, model.firstFooter);
					createTag = true;
				}
				if (createTag) {
					xmlStream.closeNode();
					xmlStream.commit();
				} else xmlStream.rollback();
			}
		}
		parseOpen(node) {
			switch (node.name) {
				case "headerFooter":
					this.model = {};
					if (node.attributes.differentFirst) this.model.differentFirst = parseInt(node.attributes.differentFirst, 0) === 1;
					if (node.attributes.differentOddEven) this.model.differentOddEven = parseInt(node.attributes.differentOddEven, 0) === 1;
					return true;
				case "oddHeader":
					this.currentNode = "oddHeader";
					return true;
				case "oddFooter":
					this.currentNode = "oddFooter";
					return true;
				case "evenHeader":
					this.currentNode = "evenHeader";
					return true;
				case "evenFooter":
					this.currentNode = "evenFooter";
					return true;
				case "firstHeader":
					this.currentNode = "firstHeader";
					return true;
				case "firstFooter":
					this.currentNode = "firstFooter";
					return true;
				default: return false;
			}
		}
		parseText(text) {
			switch (this.currentNode) {
				case "oddHeader":
					this.model.oddHeader = text;
					break;
				case "oddFooter":
					this.model.oddFooter = text;
					break;
				case "evenHeader":
					this.model.evenHeader = text;
					break;
				case "evenFooter":
					this.model.evenFooter = text;
					break;
				case "firstHeader":
					this.model.firstHeader = text;
					break;
				case "firstFooter": this.model.firstFooter = text;
			}
		}
		parseClose() {
			switch (this.currentNode) {
				case "oddHeader":
				case "oddFooter":
				case "evenHeader":
				case "evenFooter":
				case "firstHeader":
				case "firstFooter":
					this.currentNode = void 0;
					return true;
				default: return false;
			}
		}
	};
	module.exports = HeaderFooterXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/composite-xform.js
var require_composite_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var BaseXform = require_base_xform();
	var CompositeXform = class extends BaseXform {
		createNewModel(node) {
			return {};
		}
		parseOpen(node) {
			this.parser = this.parser || this.map[node.name];
			if (this.parser) {
				this.parser.parseOpen(node);
				return true;
			}
			if (node.name === this.tag) {
				this.model = this.createNewModel(node);
				return true;
			}
			return false;
		}
		parseText(text) {
			if (this.parser) this.parser.parseText(text);
		}
		onParserClose(name, parser) {
			this.model[name] = parser.model;
		}
		parseClose(name) {
			if (this.parser) {
				if (!this.parser.parseClose(name)) {
					this.onParserClose(name, this.parser);
					this.parser = void 0;
				}
				return true;
			}
			return name !== this.tag;
		}
	};
	module.exports = CompositeXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/sheet/cf/cfvo-xform.js
var require_cfvo_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var BaseXform = require_base_xform();
	var CfvoXform = class extends BaseXform {
		get tag() {
			return "cfvo";
		}
		render(xmlStream, model) {
			xmlStream.leafNode(this.tag, {
				type: model.type,
				val: model.value
			});
		}
		parseOpen(node) {
			this.model = {
				type: node.attributes.type,
				value: BaseXform.toFloatValue(node.attributes.val)
			};
		}
		parseClose(name) {
			return name !== this.tag;
		}
	};
	module.exports = CfvoXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/sheet/cf/databar-xform.js
var require_databar_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var CompositeXform = require_composite_xform();
	var ColorXform = require_color_xform();
	var CfvoXform = require_cfvo_xform();
	var DatabarXform = class extends CompositeXform {
		constructor() {
			super();
			this.map = {
				cfvo: this.cfvoXform = new CfvoXform(),
				color: this.colorXform = new ColorXform()
			};
		}
		get tag() {
			return "dataBar";
		}
		render(xmlStream, model) {
			xmlStream.openNode(this.tag);
			model.cfvo.forEach((cfvo) => {
				this.cfvoXform.render(xmlStream, cfvo);
			});
			this.colorXform.render(xmlStream, model.color);
			xmlStream.closeNode();
		}
		createNewModel() {
			return { cfvo: [] };
		}
		onParserClose(name, parser) {
			switch (name) {
				case "cfvo":
					this.model.cfvo.push(parser.model);
					break;
				case "color": this.model.color = parser.model;
			}
		}
	};
	module.exports = DatabarXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/sheet/cf/ext-lst-ref-xform.js
var require_ext_lst_ref_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var BaseXform = require_base_xform();
	var CompositeXform = require_composite_xform();
	var X14IdXform = class extends BaseXform {
		get tag() {
			return "x14:id";
		}
		render(xmlStream, model) {
			xmlStream.leafNode(this.tag, null, model);
		}
		parseOpen() {
			this.model = "";
		}
		parseText(text) {
			this.model += text;
		}
		parseClose(name) {
			return name !== this.tag;
		}
	};
	var ExtXform = class extends CompositeXform {
		constructor() {
			super();
			this.map = { "x14:id": this.idXform = new X14IdXform() };
		}
		get tag() {
			return "ext";
		}
		render(xmlStream, model) {
			xmlStream.openNode(this.tag, {
				uri: "{B025F937-C7B1-47D3-B67F-A62EFF666E3E}",
				"xmlns:x14": "http://schemas.microsoft.com/office/spreadsheetml/2009/9/main"
			});
			this.idXform.render(xmlStream, model.x14Id);
			xmlStream.closeNode();
		}
		createNewModel() {
			return {};
		}
		onParserClose(name, parser) {
			this.model.x14Id = parser.model;
		}
	};
	var ExtLstRefXform = class extends CompositeXform {
		constructor() {
			super();
			this.map = { ext: new ExtXform() };
		}
		get tag() {
			return "extLst";
		}
		render(xmlStream, model) {
			xmlStream.openNode(this.tag);
			this.map.ext.render(xmlStream, model);
			xmlStream.closeNode();
		}
		createNewModel() {
			return {};
		}
		onParserClose(name, parser) {
			Object.assign(this.model, parser.model);
		}
	};
	module.exports = ExtLstRefXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/sheet/cf/formula-xform.js
var require_formula_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var BaseXform = require_base_xform();
	var FormulaXform = class extends BaseXform {
		get tag() {
			return "formula";
		}
		render(xmlStream, model) {
			xmlStream.leafNode(this.tag, null, model);
		}
		parseOpen() {
			this.model = "";
		}
		parseText(text) {
			this.model += text;
		}
		parseClose(name) {
			return name !== this.tag;
		}
	};
	module.exports = FormulaXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/sheet/cf/color-scale-xform.js
var require_color_scale_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var CompositeXform = require_composite_xform();
	var ColorXform = require_color_xform();
	var CfvoXform = require_cfvo_xform();
	var ColorScaleXform = class extends CompositeXform {
		constructor() {
			super();
			this.map = {
				cfvo: this.cfvoXform = new CfvoXform(),
				color: this.colorXform = new ColorXform()
			};
		}
		get tag() {
			return "colorScale";
		}
		render(xmlStream, model) {
			xmlStream.openNode(this.tag);
			model.cfvo.forEach((cfvo) => {
				this.cfvoXform.render(xmlStream, cfvo);
			});
			model.color.forEach((color) => {
				this.colorXform.render(xmlStream, color);
			});
			xmlStream.closeNode();
		}
		createNewModel(node) {
			return {
				cfvo: [],
				color: []
			};
		}
		onParserClose(name, parser) {
			this.model[name].push(parser.model);
		}
	};
	module.exports = ColorScaleXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/sheet/cf/icon-set-xform.js
var require_icon_set_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var BaseXform = require_base_xform();
	var CompositeXform = require_composite_xform();
	var CfvoXform = require_cfvo_xform();
	var IconSetXform = class extends CompositeXform {
		constructor() {
			super();
			this.map = { cfvo: this.cfvoXform = new CfvoXform() };
		}
		get tag() {
			return "iconSet";
		}
		render(xmlStream, model) {
			xmlStream.openNode(this.tag, {
				iconSet: BaseXform.toStringAttribute(model.iconSet, "3TrafficLights"),
				reverse: BaseXform.toBoolAttribute(model.reverse, false),
				showValue: BaseXform.toBoolAttribute(model.showValue, true)
			});
			model.cfvo.forEach((cfvo) => {
				this.cfvoXform.render(xmlStream, cfvo);
			});
			xmlStream.closeNode();
		}
		createNewModel({ attributes }) {
			return {
				iconSet: BaseXform.toStringValue(attributes.iconSet, "3TrafficLights"),
				reverse: BaseXform.toBoolValue(attributes.reverse),
				showValue: BaseXform.toBoolValue(attributes.showValue),
				cfvo: []
			};
		}
		onParserClose(name, parser) {
			this.model[name].push(parser.model);
		}
	};
	module.exports = IconSetXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/sheet/cf/cf-rule-xform.js
var require_cf_rule_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var BaseXform = require_base_xform();
	var CompositeXform = require_composite_xform();
	var Range = require_range();
	var DatabarXform = require_databar_xform();
	var ExtLstRefXform = require_ext_lst_ref_xform();
	var FormulaXform = require_formula_xform();
	var ColorScaleXform = require_color_scale_xform();
	var IconSetXform = require_icon_set_xform();
	var extIcons = {
		"3Triangles": true,
		"3Stars": true,
		"5Boxes": true
	};
	var getTextFormula = (model) => {
		if (model.formulae && model.formulae[0]) return model.formulae[0];
		const { tl } = new Range(model.ref);
		switch (model.operator) {
			case "containsText": return `NOT(ISERROR(SEARCH("${model.text}",${tl})))`;
			case "containsBlanks": return `LEN(TRIM(${tl}))=0`;
			case "notContainsBlanks": return `LEN(TRIM(${tl}))>0`;
			case "containsErrors": return `ISERROR(${tl})`;
			case "notContainsErrors": return `NOT(ISERROR(${tl}))`;
			default: return;
		}
	};
	var getTimePeriodFormula = (model) => {
		if (model.formulae && model.formulae[0]) return model.formulae[0];
		const { tl } = new Range(model.ref);
		switch (model.timePeriod) {
			case "thisWeek": return `AND(TODAY()-ROUNDDOWN(${tl},0)<=WEEKDAY(TODAY())-1,ROUNDDOWN(${tl},0)-TODAY()<=7-WEEKDAY(TODAY()))`;
			case "lastWeek": return `AND(TODAY()-ROUNDDOWN(${tl},0)>=(WEEKDAY(TODAY())),TODAY()-ROUNDDOWN(${tl},0)<(WEEKDAY(TODAY())+7))`;
			case "nextWeek": return `AND(ROUNDDOWN(${tl},0)-TODAY()>(7-WEEKDAY(TODAY())),ROUNDDOWN(${tl},0)-TODAY()<(15-WEEKDAY(TODAY())))`;
			case "yesterday": return `FLOOR(${tl},1)=TODAY()-1`;
			case "today": return `FLOOR(${tl},1)=TODAY()`;
			case "tomorrow": return `FLOOR(${tl},1)=TODAY()+1`;
			case "last7Days": return `AND(TODAY()-FLOOR(${tl},1)<=6,FLOOR(${tl},1)<=TODAY())`;
			case "lastMonth": return `AND(MONTH(${tl})=MONTH(EDATE(TODAY(),0-1)),YEAR(${tl})=YEAR(EDATE(TODAY(),0-1)))`;
			case "thisMonth": return `AND(MONTH(${tl})=MONTH(TODAY()),YEAR(${tl})=YEAR(TODAY()))`;
			case "nextMonth": return `AND(MONTH(${tl})=MONTH(EDATE(TODAY(),0+1)),YEAR(${tl})=YEAR(EDATE(TODAY(),0+1)))`;
			default: return;
		}
	};
	var opType = (attributes) => {
		const { type, operator } = attributes;
		switch (type) {
			case "containsText":
			case "containsBlanks":
			case "notContainsBlanks":
			case "containsErrors":
			case "notContainsErrors": return {
				type: "containsText",
				operator: type
			};
			default: return {
				type,
				operator
			};
		}
	};
	module.exports = class CfRuleXform extends CompositeXform {
		constructor() {
			super();
			this.map = {
				dataBar: this.databarXform = new DatabarXform(),
				extLst: this.extLstRefXform = new ExtLstRefXform(),
				formula: this.formulaXform = new FormulaXform(),
				colorScale: this.colorScaleXform = new ColorScaleXform(),
				iconSet: this.iconSetXform = new IconSetXform()
			};
		}
		get tag() {
			return "cfRule";
		}
		static isPrimitive(rule) {
			if (rule.type === "iconSet") {
				if (rule.custom || extIcons[rule.iconSet]) return false;
			}
			return true;
		}
		render(xmlStream, model) {
			switch (model.type) {
				case "expression":
					this.renderExpression(xmlStream, model);
					break;
				case "cellIs":
					this.renderCellIs(xmlStream, model);
					break;
				case "top10":
					this.renderTop10(xmlStream, model);
					break;
				case "aboveAverage":
					this.renderAboveAverage(xmlStream, model);
					break;
				case "dataBar":
					this.renderDataBar(xmlStream, model);
					break;
				case "colorScale":
					this.renderColorScale(xmlStream, model);
					break;
				case "iconSet":
					this.renderIconSet(xmlStream, model);
					break;
				case "containsText":
					this.renderText(xmlStream, model);
					break;
				case "timePeriod": this.renderTimePeriod(xmlStream, model);
			}
		}
		renderExpression(xmlStream, model) {
			xmlStream.openNode(this.tag, {
				type: "expression",
				dxfId: model.dxfId,
				priority: model.priority
			});
			this.formulaXform.render(xmlStream, model.formulae[0]);
			xmlStream.closeNode();
		}
		renderCellIs(xmlStream, model) {
			xmlStream.openNode(this.tag, {
				type: "cellIs",
				dxfId: model.dxfId,
				priority: model.priority,
				operator: model.operator
			});
			model.formulae.forEach((formula) => {
				this.formulaXform.render(xmlStream, formula);
			});
			xmlStream.closeNode();
		}
		renderTop10(xmlStream, model) {
			xmlStream.leafNode(this.tag, {
				type: "top10",
				dxfId: model.dxfId,
				priority: model.priority,
				percent: BaseXform.toBoolAttribute(model.percent, false),
				bottom: BaseXform.toBoolAttribute(model.bottom, false),
				rank: BaseXform.toIntValue(model.rank, 10, true)
			});
		}
		renderAboveAverage(xmlStream, model) {
			xmlStream.leafNode(this.tag, {
				type: "aboveAverage",
				dxfId: model.dxfId,
				priority: model.priority,
				aboveAverage: BaseXform.toBoolAttribute(model.aboveAverage, true)
			});
		}
		renderDataBar(xmlStream, model) {
			xmlStream.openNode(this.tag, {
				type: "dataBar",
				priority: model.priority
			});
			this.databarXform.render(xmlStream, model);
			this.extLstRefXform.render(xmlStream, model);
			xmlStream.closeNode();
		}
		renderColorScale(xmlStream, model) {
			xmlStream.openNode(this.tag, {
				type: "colorScale",
				priority: model.priority
			});
			this.colorScaleXform.render(xmlStream, model);
			xmlStream.closeNode();
		}
		renderIconSet(xmlStream, model) {
			if (!CfRuleXform.isPrimitive(model)) return;
			xmlStream.openNode(this.tag, {
				type: "iconSet",
				priority: model.priority
			});
			this.iconSetXform.render(xmlStream, model);
			xmlStream.closeNode();
		}
		renderText(xmlStream, model) {
			xmlStream.openNode(this.tag, {
				type: model.operator,
				dxfId: model.dxfId,
				priority: model.priority,
				operator: BaseXform.toStringAttribute(model.operator, "containsText")
			});
			const formula = getTextFormula(model);
			if (formula) this.formulaXform.render(xmlStream, formula);
			xmlStream.closeNode();
		}
		renderTimePeriod(xmlStream, model) {
			xmlStream.openNode(this.tag, {
				type: "timePeriod",
				dxfId: model.dxfId,
				priority: model.priority,
				timePeriod: model.timePeriod
			});
			const formula = getTimePeriodFormula(model);
			if (formula) this.formulaXform.render(xmlStream, formula);
			xmlStream.closeNode();
		}
		createNewModel({ attributes }) {
			return {
				...opType(attributes),
				dxfId: BaseXform.toIntValue(attributes.dxfId),
				priority: BaseXform.toIntValue(attributes.priority),
				timePeriod: attributes.timePeriod,
				percent: BaseXform.toBoolValue(attributes.percent),
				bottom: BaseXform.toBoolValue(attributes.bottom),
				rank: BaseXform.toIntValue(attributes.rank),
				aboveAverage: BaseXform.toBoolValue(attributes.aboveAverage)
			};
		}
		onParserClose(name, parser) {
			switch (name) {
				case "dataBar":
				case "extLst":
				case "colorScale":
				case "iconSet":
					Object.assign(this.model, parser.model);
					break;
				case "formula":
					this.model.formulae = this.model.formulae || [];
					this.model.formulae.push(parser.model);
			}
		}
	};
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/sheet/cf/conditional-formatting-xform.js
var require_conditional_formatting_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var CompositeXform = require_composite_xform();
	var CfRuleXform = require_cf_rule_xform();
	var ConditionalFormattingXform = class extends CompositeXform {
		constructor() {
			super();
			this.map = { cfRule: new CfRuleXform() };
		}
		get tag() {
			return "conditionalFormatting";
		}
		render(xmlStream, model) {
			if (!model.rules.some(CfRuleXform.isPrimitive)) return;
			xmlStream.openNode(this.tag, { sqref: model.ref });
			model.rules.forEach((rule) => {
				if (CfRuleXform.isPrimitive(rule)) {
					rule.ref = model.ref;
					this.map.cfRule.render(xmlStream, rule);
				}
			});
			xmlStream.closeNode();
		}
		createNewModel({ attributes }) {
			return {
				ref: attributes.sqref,
				rules: []
			};
		}
		onParserClose(name, parser) {
			this.model.rules.push(parser.model);
		}
	};
	module.exports = ConditionalFormattingXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/sheet/cf/conditional-formattings-xform.js
var require_conditional_formattings_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var BaseXform = require_base_xform();
	var ConditionalFormattingXform = require_conditional_formatting_xform();
	var ConditionalFormattingsXform = class extends BaseXform {
		constructor() {
			super();
			this.cfXform = new ConditionalFormattingXform();
		}
		get tag() {
			return "conditionalFormatting";
		}
		reset() {
			this.model = [];
		}
		prepare(model, options) {
			let nextPriority = model.reduce((p, cf) => Math.max(p, ...cf.rules.map((rule) => rule.priority || 0)), 1);
			model.forEach((cf) => {
				cf.rules.forEach((rule) => {
					if (!rule.priority) rule.priority = nextPriority++;
					if (rule.style) rule.dxfId = options.styles.addDxfStyle(rule.style);
				});
			});
		}
		render(xmlStream, model) {
			model.forEach((cf) => {
				this.cfXform.render(xmlStream, cf);
			});
		}
		parseOpen(node) {
			if (this.parser) {
				this.parser.parseOpen(node);
				return true;
			}
			switch (node.name) {
				case "conditionalFormatting":
					this.parser = this.cfXform;
					this.parser.parseOpen(node);
					return true;
				default: return false;
			}
		}
		parseText(text) {
			if (this.parser) this.parser.parseText(text);
		}
		parseClose(name) {
			if (this.parser) {
				if (!this.parser.parseClose(name)) {
					this.model.push(this.parser.model);
					this.parser = void 0;
					return false;
				}
				return true;
			}
			return false;
		}
		reconcile(model, options) {
			model.forEach((cf) => {
				cf.rules.forEach((rule) => {
					if (rule.dxfId !== void 0) {
						rule.style = options.styles.getDxfStyle(rule.dxfId);
						delete rule.dxfId;
					}
				});
			});
		}
	};
	module.exports = ConditionalFormattingsXform;
}));
//#endregion
//#region node_modules/uuid/dist/rng.js
var require_rng = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = rng;
	var _crypto$2 = _interopRequireDefault(__require("crypto"));
	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { default: obj };
	}
	var rnds8Pool = /* @__PURE__ */ new Uint8Array(256);
	var poolPtr = rnds8Pool.length;
	function rng() {
		if (poolPtr > rnds8Pool.length - 16) {
			_crypto$2.default.randomFillSync(rnds8Pool);
			poolPtr = 0;
		}
		return rnds8Pool.slice(poolPtr, poolPtr += 16);
	}
}));
//#endregion
//#region node_modules/uuid/dist/regex.js
var require_regex = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = void 0;
	exports.default = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
}));
//#endregion
//#region node_modules/uuid/dist/validate.js
var require_validate = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = void 0;
	var _regex = _interopRequireDefault(require_regex());
	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { default: obj };
	}
	function validate(uuid) {
		return typeof uuid === "string" && _regex.default.test(uuid);
	}
	exports.default = validate;
}));
//#endregion
//#region node_modules/uuid/dist/stringify.js
var require_stringify = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = void 0;
	var _validate = _interopRequireDefault(require_validate());
	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { default: obj };
	}
	/**
	* Convert array of 16 byte values to UUID string format of the form:
	* XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
	*/
	var byteToHex = [];
	for (let i = 0; i < 256; ++i) byteToHex.push((i + 256).toString(16).substr(1));
	function stringify(arr, offset = 0) {
		const uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
		if (!(0, _validate.default)(uuid)) throw TypeError("Stringified UUID is invalid");
		return uuid;
	}
	exports.default = stringify;
}));
//#endregion
//#region node_modules/uuid/dist/v1.js
var require_v1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = void 0;
	var _rng = _interopRequireDefault(require_rng());
	var _stringify = _interopRequireDefault(require_stringify());
	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { default: obj };
	}
	var _nodeId;
	var _clockseq;
	var _lastMSecs = 0;
	var _lastNSecs = 0;
	function v1(options, buf, offset) {
		let i = buf && offset || 0;
		const b = buf || new Array(16);
		options = options || {};
		let node = options.node || _nodeId;
		let clockseq = options.clockseq !== void 0 ? options.clockseq : _clockseq;
		if (node == null || clockseq == null) {
			const seedBytes = options.random || (options.rng || _rng.default)();
			if (node == null) node = _nodeId = [
				seedBytes[0] | 1,
				seedBytes[1],
				seedBytes[2],
				seedBytes[3],
				seedBytes[4],
				seedBytes[5]
			];
			if (clockseq == null) clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 16383;
		}
		let msecs = options.msecs !== void 0 ? options.msecs : Date.now();
		let nsecs = options.nsecs !== void 0 ? options.nsecs : _lastNSecs + 1;
		const dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 1e4;
		if (dt < 0 && options.clockseq === void 0) clockseq = clockseq + 1 & 16383;
		if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === void 0) nsecs = 0;
		if (nsecs >= 1e4) throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
		_lastMSecs = msecs;
		_lastNSecs = nsecs;
		_clockseq = clockseq;
		msecs += 0xb1d069b5400;
		const tl = ((msecs & 268435455) * 1e4 + nsecs) % 4294967296;
		b[i++] = tl >>> 24 & 255;
		b[i++] = tl >>> 16 & 255;
		b[i++] = tl >>> 8 & 255;
		b[i++] = tl & 255;
		const tmh = msecs / 4294967296 * 1e4 & 268435455;
		b[i++] = tmh >>> 8 & 255;
		b[i++] = tmh & 255;
		b[i++] = tmh >>> 24 & 15 | 16;
		b[i++] = tmh >>> 16 & 255;
		b[i++] = clockseq >>> 8 | 128;
		b[i++] = clockseq & 255;
		for (let n = 0; n < 6; ++n) b[i + n] = node[n];
		return buf || (0, _stringify.default)(b);
	}
	exports.default = v1;
}));
//#endregion
//#region node_modules/uuid/dist/parse.js
var require_parse$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = void 0;
	var _validate = _interopRequireDefault(require_validate());
	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { default: obj };
	}
	function parse(uuid) {
		if (!(0, _validate.default)(uuid)) throw TypeError("Invalid UUID");
		let v;
		const arr = /* @__PURE__ */ new Uint8Array(16);
		arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;
		arr[1] = v >>> 16 & 255;
		arr[2] = v >>> 8 & 255;
		arr[3] = v & 255;
		arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;
		arr[5] = v & 255;
		arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;
		arr[7] = v & 255;
		arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;
		arr[9] = v & 255;
		arr[10] = (v = parseInt(uuid.slice(24, 36), 16)) / 1099511627776 & 255;
		arr[11] = v / 4294967296 & 255;
		arr[12] = v >>> 24 & 255;
		arr[13] = v >>> 16 & 255;
		arr[14] = v >>> 8 & 255;
		arr[15] = v & 255;
		return arr;
	}
	exports.default = parse;
}));
//#endregion
//#region node_modules/uuid/dist/v35.js
var require_v35 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = _default;
	exports.URL = exports.DNS = void 0;
	var _stringify = _interopRequireDefault(require_stringify());
	var _parse = _interopRequireDefault(require_parse$1());
	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { default: obj };
	}
	function stringToBytes(str) {
		str = unescape(encodeURIComponent(str));
		const bytes = [];
		for (let i = 0; i < str.length; ++i) bytes.push(str.charCodeAt(i));
		return bytes;
	}
	var DNS = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";
	exports.DNS = DNS;
	var URL = "6ba7b811-9dad-11d1-80b4-00c04fd430c8";
	exports.URL = URL;
	function _default(name, version, hashfunc) {
		function generateUUID(value, namespace, buf, offset) {
			if (typeof value === "string") value = stringToBytes(value);
			if (typeof namespace === "string") namespace = (0, _parse.default)(namespace);
			if (namespace.length !== 16) throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");
			let bytes = new Uint8Array(16 + value.length);
			bytes.set(namespace);
			bytes.set(value, namespace.length);
			bytes = hashfunc(bytes);
			bytes[6] = bytes[6] & 15 | version;
			bytes[8] = bytes[8] & 63 | 128;
			if (buf) {
				offset = offset || 0;
				for (let i = 0; i < 16; ++i) buf[offset + i] = bytes[i];
				return buf;
			}
			return (0, _stringify.default)(bytes);
		}
		try {
			generateUUID.name = name;
		} catch (err) {}
		generateUUID.DNS = DNS;
		generateUUID.URL = URL;
		return generateUUID;
	}
}));
//#endregion
//#region node_modules/uuid/dist/md5.js
var require_md5 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = void 0;
	var _crypto$1 = _interopRequireDefault(__require("crypto"));
	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { default: obj };
	}
	function md5(bytes) {
		if (Array.isArray(bytes)) bytes = Buffer.from(bytes);
		else if (typeof bytes === "string") bytes = Buffer.from(bytes, "utf8");
		return _crypto$1.default.createHash("md5").update(bytes).digest();
	}
	exports.default = md5;
}));
//#endregion
//#region node_modules/uuid/dist/v3.js
var require_v3 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = void 0;
	var _v = _interopRequireDefault(require_v35());
	var _md = _interopRequireDefault(require_md5());
	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { default: obj };
	}
	exports.default = (0, _v.default)("v3", 48, _md.default);
}));
//#endregion
//#region node_modules/uuid/dist/v4.js
var require_v4 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = void 0;
	var _rng = _interopRequireDefault(require_rng());
	var _stringify = _interopRequireDefault(require_stringify());
	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { default: obj };
	}
	function v4(options, buf, offset) {
		options = options || {};
		const rnds = options.random || (options.rng || _rng.default)();
		rnds[6] = rnds[6] & 15 | 64;
		rnds[8] = rnds[8] & 63 | 128;
		if (buf) {
			offset = offset || 0;
			for (let i = 0; i < 16; ++i) buf[offset + i] = rnds[i];
			return buf;
		}
		return (0, _stringify.default)(rnds);
	}
	exports.default = v4;
}));
//#endregion
//#region node_modules/uuid/dist/sha1.js
var require_sha1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = void 0;
	var _crypto = _interopRequireDefault(__require("crypto"));
	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { default: obj };
	}
	function sha1(bytes) {
		if (Array.isArray(bytes)) bytes = Buffer.from(bytes);
		else if (typeof bytes === "string") bytes = Buffer.from(bytes, "utf8");
		return _crypto.default.createHash("sha1").update(bytes).digest();
	}
	exports.default = sha1;
}));
//#endregion
//#region node_modules/uuid/dist/v5.js
var require_v5 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = void 0;
	var _v = _interopRequireDefault(require_v35());
	var _sha = _interopRequireDefault(require_sha1());
	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { default: obj };
	}
	exports.default = (0, _v.default)("v5", 80, _sha.default);
}));
//#endregion
//#region node_modules/uuid/dist/nil.js
var require_nil = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = void 0;
	exports.default = "00000000-0000-0000-0000-000000000000";
}));
//#endregion
//#region node_modules/uuid/dist/version.js
var require_version = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = void 0;
	var _validate = _interopRequireDefault(require_validate());
	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { default: obj };
	}
	function version(uuid) {
		if (!(0, _validate.default)(uuid)) throw TypeError("Invalid UUID");
		return parseInt(uuid.substr(14, 1), 16);
	}
	exports.default = version;
}));
//#endregion
//#region node_modules/uuid/dist/index.js
var require_dist = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "v1", {
		enumerable: true,
		get: function() {
			return _v.default;
		}
	});
	Object.defineProperty(exports, "v3", {
		enumerable: true,
		get: function() {
			return _v2.default;
		}
	});
	Object.defineProperty(exports, "v4", {
		enumerable: true,
		get: function() {
			return _v3.default;
		}
	});
	Object.defineProperty(exports, "v5", {
		enumerable: true,
		get: function() {
			return _v4.default;
		}
	});
	Object.defineProperty(exports, "NIL", {
		enumerable: true,
		get: function() {
			return _nil.default;
		}
	});
	Object.defineProperty(exports, "version", {
		enumerable: true,
		get: function() {
			return _version.default;
		}
	});
	Object.defineProperty(exports, "validate", {
		enumerable: true,
		get: function() {
			return _validate.default;
		}
	});
	Object.defineProperty(exports, "stringify", {
		enumerable: true,
		get: function() {
			return _stringify.default;
		}
	});
	Object.defineProperty(exports, "parse", {
		enumerable: true,
		get: function() {
			return _parse.default;
		}
	});
	var _v = _interopRequireDefault(require_v1());
	var _v2 = _interopRequireDefault(require_v3());
	var _v3 = _interopRequireDefault(require_v4());
	var _v4 = _interopRequireDefault(require_v5());
	var _nil = _interopRequireDefault(require_nil());
	var _version = _interopRequireDefault(require_version());
	var _validate = _interopRequireDefault(require_validate());
	var _stringify = _interopRequireDefault(require_stringify());
	var _parse = _interopRequireDefault(require_parse$1());
	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { default: obj };
	}
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/sheet/cf-ext/f-ext-xform.js
var require_f_ext_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var BaseXform = require_base_xform();
	var FExtXform = class extends BaseXform {
		get tag() {
			return "xm:f";
		}
		render(xmlStream, model) {
			xmlStream.leafNode(this.tag, null, model);
		}
		parseOpen() {
			this.model = "";
		}
		parseText(text) {
			this.model += text;
		}
		parseClose(name) {
			return name !== this.tag;
		}
	};
	module.exports = FExtXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/sheet/cf-ext/cfvo-ext-xform.js
var require_cfvo_ext_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var CompositeXform = require_composite_xform();
	var FExtXform = require_f_ext_xform();
	var CfvoExtXform = class extends CompositeXform {
		constructor() {
			super();
			this.map = { "xm:f": this.fExtXform = new FExtXform() };
		}
		get tag() {
			return "x14:cfvo";
		}
		render(xmlStream, model) {
			xmlStream.openNode(this.tag, { type: model.type });
			if (model.value !== void 0) this.fExtXform.render(xmlStream, model.value);
			xmlStream.closeNode();
		}
		createNewModel(node) {
			return { type: node.attributes.type };
		}
		onParserClose(name, parser) {
			switch (name) {
				case "xm:f": this.model.value = parser.model ? parseFloat(parser.model) : 0;
			}
		}
	};
	module.exports = CfvoExtXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/sheet/cf-ext/databar-ext-xform.js
var require_databar_ext_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var BaseXform = require_base_xform();
	var CompositeXform = require_composite_xform();
	var ColorXform = require_color_xform();
	var CfvoExtXform = require_cfvo_ext_xform();
	var DatabarExtXform = class extends CompositeXform {
		constructor() {
			super();
			this.map = {
				"x14:cfvo": this.cfvoXform = new CfvoExtXform(),
				"x14:borderColor": this.borderColorXform = new ColorXform("x14:borderColor"),
				"x14:negativeBorderColor": this.negativeBorderColorXform = new ColorXform("x14:negativeBorderColor"),
				"x14:negativeFillColor": this.negativeFillColorXform = new ColorXform("x14:negativeFillColor"),
				"x14:axisColor": this.axisColorXform = new ColorXform("x14:axisColor")
			};
		}
		static isExt(rule) {
			return !rule.gradient;
		}
		get tag() {
			return "x14:dataBar";
		}
		render(xmlStream, model) {
			xmlStream.openNode(this.tag, {
				minLength: BaseXform.toIntAttribute(model.minLength, 0, true),
				maxLength: BaseXform.toIntAttribute(model.maxLength, 100, true),
				border: BaseXform.toBoolAttribute(model.border, false),
				gradient: BaseXform.toBoolAttribute(model.gradient, true),
				negativeBarColorSameAsPositive: BaseXform.toBoolAttribute(model.negativeBarColorSameAsPositive, true),
				negativeBarBorderColorSameAsPositive: BaseXform.toBoolAttribute(model.negativeBarBorderColorSameAsPositive, true),
				axisPosition: BaseXform.toAttribute(model.axisPosition, "auto"),
				direction: BaseXform.toAttribute(model.direction, "leftToRight")
			});
			model.cfvo.forEach((cfvo) => {
				this.cfvoXform.render(xmlStream, cfvo);
			});
			this.borderColorXform.render(xmlStream, model.borderColor);
			this.negativeBorderColorXform.render(xmlStream, model.negativeBorderColor);
			this.negativeFillColorXform.render(xmlStream, model.negativeFillColor);
			this.axisColorXform.render(xmlStream, model.axisColor);
			xmlStream.closeNode();
		}
		createNewModel({ attributes }) {
			return {
				cfvo: [],
				minLength: BaseXform.toIntValue(attributes.minLength, 0),
				maxLength: BaseXform.toIntValue(attributes.maxLength, 100),
				border: BaseXform.toBoolValue(attributes.border, false),
				gradient: BaseXform.toBoolValue(attributes.gradient, true),
				negativeBarColorSameAsPositive: BaseXform.toBoolValue(attributes.negativeBarColorSameAsPositive, true),
				negativeBarBorderColorSameAsPositive: BaseXform.toBoolValue(attributes.negativeBarBorderColorSameAsPositive, true),
				axisPosition: BaseXform.toStringValue(attributes.axisPosition, "auto"),
				direction: BaseXform.toStringValue(attributes.direction, "leftToRight")
			};
		}
		onParserClose(name, parser) {
			const [, prop] = name.split(":");
			switch (prop) {
				case "cfvo":
					this.model.cfvo.push(parser.model);
					break;
				default: this.model[prop] = parser.model;
			}
		}
	};
	module.exports = DatabarExtXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/sheet/cf-ext/cf-icon-ext-xform.js
var require_cf_icon_ext_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var BaseXform = require_base_xform();
	var CfIconExtXform = class extends BaseXform {
		get tag() {
			return "x14:cfIcon";
		}
		render(xmlStream, model) {
			xmlStream.leafNode(this.tag, {
				iconSet: model.iconSet,
				iconId: model.iconId
			});
		}
		parseOpen({ attributes }) {
			this.model = {
				iconSet: attributes.iconSet,
				iconId: BaseXform.toIntValue(attributes.iconId)
			};
		}
		parseClose(name) {
			return name !== this.tag;
		}
	};
	module.exports = CfIconExtXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/sheet/cf-ext/icon-set-ext-xform.js
var require_icon_set_ext_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var BaseXform = require_base_xform();
	var CompositeXform = require_composite_xform();
	var CfvoExtXform = require_cfvo_ext_xform();
	var CfIconExtXform = require_cf_icon_ext_xform();
	var IconSetExtXform = class extends CompositeXform {
		constructor() {
			super();
			this.map = {
				"x14:cfvo": this.cfvoXform = new CfvoExtXform(),
				"x14:cfIcon": this.cfIconXform = new CfIconExtXform()
			};
		}
		get tag() {
			return "x14:iconSet";
		}
		render(xmlStream, model) {
			xmlStream.openNode(this.tag, {
				iconSet: BaseXform.toStringAttribute(model.iconSet),
				reverse: BaseXform.toBoolAttribute(model.reverse, false),
				showValue: BaseXform.toBoolAttribute(model.showValue, true),
				custom: BaseXform.toBoolAttribute(model.icons, false)
			});
			model.cfvo.forEach((cfvo) => {
				this.cfvoXform.render(xmlStream, cfvo);
			});
			if (model.icons) model.icons.forEach((icon, i) => {
				icon.iconId = i;
				this.cfIconXform.render(xmlStream, icon);
			});
			xmlStream.closeNode();
		}
		createNewModel({ attributes }) {
			return {
				cfvo: [],
				iconSet: BaseXform.toStringValue(attributes.iconSet, "3TrafficLights"),
				reverse: BaseXform.toBoolValue(attributes.reverse, false),
				showValue: BaseXform.toBoolValue(attributes.showValue, true)
			};
		}
		onParserClose(name, parser) {
			const [, prop] = name.split(":");
			switch (prop) {
				case "cfvo":
					this.model.cfvo.push(parser.model);
					break;
				case "cfIcon":
					if (!this.model.icons) this.model.icons = [];
					this.model.icons.push(parser.model);
					break;
				default: this.model[prop] = parser.model;
			}
		}
	};
	module.exports = IconSetExtXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/sheet/cf-ext/cf-rule-ext-xform.js
var require_cf_rule_ext_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var { v4: uuidv4 } = require_dist();
	var BaseXform = require_base_xform();
	var CompositeXform = require_composite_xform();
	var DatabarExtXform = require_databar_ext_xform();
	var IconSetExtXform = require_icon_set_ext_xform();
	var extIcons = {
		"3Triangles": true,
		"3Stars": true,
		"5Boxes": true
	};
	module.exports = class CfRuleExtXform extends CompositeXform {
		constructor() {
			super();
			this.map = {
				"x14:dataBar": this.databarXform = new DatabarExtXform(),
				"x14:iconSet": this.iconSetXform = new IconSetExtXform()
			};
		}
		get tag() {
			return "x14:cfRule";
		}
		static isExt(rule) {
			if (rule.type === "dataBar") return DatabarExtXform.isExt(rule);
			if (rule.type === "iconSet") {
				if (rule.custom || extIcons[rule.iconSet]) return true;
			}
			return false;
		}
		prepare(model) {
			if (CfRuleExtXform.isExt(model)) model.x14Id = `{${uuidv4()}}`.toUpperCase();
		}
		render(xmlStream, model) {
			if (!CfRuleExtXform.isExt(model)) return;
			switch (model.type) {
				case "dataBar":
					this.renderDataBar(xmlStream, model);
					break;
				case "iconSet": this.renderIconSet(xmlStream, model);
			}
		}
		renderDataBar(xmlStream, model) {
			xmlStream.openNode(this.tag, {
				type: "dataBar",
				id: model.x14Id
			});
			this.databarXform.render(xmlStream, model);
			xmlStream.closeNode();
		}
		renderIconSet(xmlStream, model) {
			xmlStream.openNode(this.tag, {
				type: "iconSet",
				priority: model.priority,
				id: model.x14Id || `{${uuidv4()}}`
			});
			this.iconSetXform.render(xmlStream, model);
			xmlStream.closeNode();
		}
		createNewModel({ attributes }) {
			return {
				type: attributes.type,
				x14Id: attributes.id,
				priority: BaseXform.toIntValue(attributes.priority)
			};
		}
		onParserClose(name, parser) {
			Object.assign(this.model, parser.model);
		}
	};
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/sheet/cf-ext/sqref-ext-xform.js
var require_sqref_ext_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var BaseXform = require_base_xform();
	var SqrefExtXform = class extends BaseXform {
		get tag() {
			return "xm:sqref";
		}
		render(xmlStream, model) {
			xmlStream.leafNode(this.tag, null, model);
		}
		parseOpen() {
			this.model = "";
		}
		parseText(text) {
			this.model += text;
		}
		parseClose(name) {
			return name !== this.tag;
		}
	};
	module.exports = SqrefExtXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/sheet/cf-ext/conditional-formatting-ext-xform.js
var require_conditional_formatting_ext_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var CompositeXform = require_composite_xform();
	var SqRefExtXform = require_sqref_ext_xform();
	var CfRuleExtXform = require_cf_rule_ext_xform();
	var ConditionalFormattingExtXform = class extends CompositeXform {
		constructor() {
			super();
			this.map = {
				"xm:sqref": this.sqRef = new SqRefExtXform(),
				"x14:cfRule": this.cfRule = new CfRuleExtXform()
			};
		}
		get tag() {
			return "x14:conditionalFormatting";
		}
		prepare(model, options) {
			model.rules.forEach((rule) => {
				this.cfRule.prepare(rule, options);
			});
		}
		render(xmlStream, model) {
			if (!model.rules.some(CfRuleExtXform.isExt)) return;
			xmlStream.openNode(this.tag, { "xmlns:xm": "http://schemas.microsoft.com/office/excel/2006/main" });
			model.rules.filter(CfRuleExtXform.isExt).forEach((rule) => this.cfRule.render(xmlStream, rule));
			this.sqRef.render(xmlStream, model.ref);
			xmlStream.closeNode();
		}
		createNewModel() {
			return { rules: [] };
		}
		onParserClose(name, parser) {
			switch (name) {
				case "xm:sqref":
					this.model.ref = parser.model;
					break;
				case "x14:cfRule": this.model.rules.push(parser.model);
			}
		}
	};
	module.exports = ConditionalFormattingExtXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/sheet/cf-ext/conditional-formattings-ext-xform.js
var require_conditional_formattings_ext_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var CompositeXform = require_composite_xform();
	var CfRuleExtXform = require_cf_rule_ext_xform();
	var ConditionalFormattingExtXform = require_conditional_formatting_ext_xform();
	var ConditionalFormattingsExtXform = class extends CompositeXform {
		constructor() {
			super();
			this.map = { "x14:conditionalFormatting": this.cfXform = new ConditionalFormattingExtXform() };
		}
		get tag() {
			return "x14:conditionalFormattings";
		}
		hasContent(model) {
			if (model.hasExtContent === void 0) model.hasExtContent = model.some((cf) => cf.rules.some(CfRuleExtXform.isExt));
			return model.hasExtContent;
		}
		prepare(model, options) {
			model.forEach((cf) => {
				this.cfXform.prepare(cf, options);
			});
		}
		render(xmlStream, model) {
			if (this.hasContent(model)) {
				xmlStream.openNode(this.tag);
				model.forEach((cf) => this.cfXform.render(xmlStream, cf));
				xmlStream.closeNode();
			}
		}
		createNewModel() {
			return [];
		}
		onParserClose(name, parser) {
			this.model.push(parser.model);
		}
	};
	module.exports = ConditionalFormattingsExtXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/sheet/ext-lst-xform.js
var require_ext_lst_xform$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var CompositeXform = require_composite_xform();
	var ConditionalFormattingsExt = require_conditional_formattings_ext_xform();
	var ExtXform = class extends CompositeXform {
		constructor() {
			super();
			this.map = { "x14:conditionalFormattings": this.conditionalFormattings = new ConditionalFormattingsExt() };
		}
		get tag() {
			return "ext";
		}
		hasContent(model) {
			return this.conditionalFormattings.hasContent(model.conditionalFormattings);
		}
		prepare(model, options) {
			this.conditionalFormattings.prepare(model.conditionalFormattings, options);
		}
		render(xmlStream, model) {
			xmlStream.openNode("ext", {
				uri: "{78C0D931-6437-407d-A8EE-F0AAD7539E65}",
				"xmlns:x14": "http://schemas.microsoft.com/office/spreadsheetml/2009/9/main"
			});
			this.conditionalFormattings.render(xmlStream, model.conditionalFormattings);
			xmlStream.closeNode();
		}
		createNewModel() {
			return {};
		}
		onParserClose(name, parser) {
			this.model[name] = parser.model;
		}
	};
	var ExtLstXform = class extends CompositeXform {
		constructor() {
			super();
			this.map = { ext: this.ext = new ExtXform() };
		}
		get tag() {
			return "extLst";
		}
		prepare(model, options) {
			this.ext.prepare(model, options);
		}
		hasContent(model) {
			return this.ext.hasContent(model);
		}
		render(xmlStream, model) {
			if (!this.hasContent(model)) return;
			xmlStream.openNode("extLst");
			this.ext.render(xmlStream, model);
			xmlStream.closeNode();
		}
		createNewModel() {
			return {};
		}
		onParserClose(name, parser) {
			Object.assign(this.model, parser.model);
		}
	};
	module.exports = ExtLstXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/sheet/worksheet-xform.js
var require_worksheet_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var _ = require_under_dash();
	var colCache = require_col_cache();
	var XmlStream = require_xml_stream();
	var RelType = require_rel_type();
	var Merges = require_merges();
	var BaseXform = require_base_xform();
	var ListXform = require_list_xform();
	var RowXform = require_row_xform();
	var ColXform = require_col_xform();
	var DimensionXform = require_dimension_xform();
	var HyperlinkXform = require_hyperlink_xform();
	var MergeCellXform = require_merge_cell_xform();
	var DataValidationsXform = require_data_validations_xform();
	var SheetPropertiesXform = require_sheet_properties_xform();
	var SheetFormatPropertiesXform = require_sheet_format_properties_xform();
	var SheetViewXform = require_sheet_view_xform();
	var SheetProtectionXform = require_sheet_protection_xform();
	var PageMarginsXform = require_page_margins_xform();
	var PageSetupXform = require_page_setup_xform();
	var PrintOptionsXform = require_print_options_xform();
	var AutoFilterXform = require_auto_filter_xform$1();
	var PictureXform = require_picture_xform();
	var DrawingXform = require_drawing_xform$1();
	var TablePartXform = require_table_part_xform();
	var RowBreaksXform = require_row_breaks_xform();
	var HeaderFooterXform = require_header_footer_xform();
	var ConditionalFormattingsXform = require_conditional_formattings_xform();
	var ExtListXform = require_ext_lst_xform$1();
	var mergeRule = (rule, extRule) => {
		Object.keys(extRule).forEach((key) => {
			const value = rule[key];
			const extValue = extRule[key];
			if (value === void 0 && extValue !== void 0) rule[key] = extValue;
		});
	};
	var mergeConditionalFormattings = (model, extModel) => {
		if (!extModel || !extModel.length) return model;
		if (!model || !model.length) return extModel;
		const cfMap = {};
		const ruleMap = {};
		model.forEach((cf) => {
			cfMap[cf.ref] = cf;
			cf.rules.forEach((rule) => {
				const { x14Id } = rule;
				if (x14Id) ruleMap[x14Id] = rule;
			});
		});
		extModel.forEach((extCf) => {
			extCf.rules.forEach((extRule) => {
				const rule = ruleMap[extRule.x14Id];
				if (rule) mergeRule(rule, extRule);
				else if (cfMap[extCf.ref]) cfMap[extCf.ref].rules.push(extRule);
				else model.push({
					ref: extCf.ref,
					rules: [extRule]
				});
			});
		});
		return model;
	};
	var WorkSheetXform = class WorkSheetXform extends BaseXform {
		constructor(options) {
			super();
			const { maxRows, maxCols, ignoreNodes } = options || {};
			this.ignoreNodes = ignoreNodes || [];
			this.map = {
				sheetPr: new SheetPropertiesXform(),
				dimension: new DimensionXform(),
				sheetViews: new ListXform({
					tag: "sheetViews",
					count: false,
					childXform: new SheetViewXform()
				}),
				sheetFormatPr: new SheetFormatPropertiesXform(),
				cols: new ListXform({
					tag: "cols",
					count: false,
					childXform: new ColXform()
				}),
				sheetData: new ListXform({
					tag: "sheetData",
					count: false,
					empty: true,
					childXform: new RowXform({ maxItems: maxCols }),
					maxItems: maxRows
				}),
				autoFilter: new AutoFilterXform(),
				mergeCells: new ListXform({
					tag: "mergeCells",
					count: true,
					childXform: new MergeCellXform()
				}),
				rowBreaks: new RowBreaksXform(),
				hyperlinks: new ListXform({
					tag: "hyperlinks",
					count: false,
					childXform: new HyperlinkXform()
				}),
				pageMargins: new PageMarginsXform(),
				dataValidations: new DataValidationsXform(),
				pageSetup: new PageSetupXform(),
				headerFooter: new HeaderFooterXform(),
				printOptions: new PrintOptionsXform(),
				picture: new PictureXform(),
				drawing: new DrawingXform(),
				sheetProtection: new SheetProtectionXform(),
				tableParts: new ListXform({
					tag: "tableParts",
					count: true,
					childXform: new TablePartXform()
				}),
				conditionalFormatting: new ConditionalFormattingsXform(),
				extLst: new ExtListXform()
			};
		}
		prepare(model, options) {
			options.merges = new Merges();
			model.hyperlinks = options.hyperlinks = [];
			model.comments = options.comments = [];
			options.formulae = {};
			options.siFormulae = 0;
			this.map.cols.prepare(model.cols, options);
			this.map.sheetData.prepare(model.rows, options);
			this.map.conditionalFormatting.prepare(model.conditionalFormattings, options);
			model.mergeCells = options.merges.mergeCells;
			const rels = model.rels = [];
			function nextRid(r) {
				return `rId${r.length + 1}`;
			}
			model.hyperlinks.forEach((hyperlink) => {
				const rId = nextRid(rels);
				hyperlink.rId = rId;
				rels.push({
					Id: rId,
					Type: RelType.Hyperlink,
					Target: hyperlink.target,
					TargetMode: "External"
				});
			});
			if (model.comments.length > 0) {
				const comment = {
					Id: nextRid(rels),
					Type: RelType.Comments,
					Target: `../comments${model.id}.xml`
				};
				rels.push(comment);
				const vmlDrawing = {
					Id: nextRid(rels),
					Type: RelType.VmlDrawing,
					Target: `../drawings/vmlDrawing${model.id}.vml`
				};
				rels.push(vmlDrawing);
				model.comments.forEach((item) => {
					item.refAddress = colCache.decodeAddress(item.ref);
				});
				options.commentRefs.push({
					commentName: `comments${model.id}`,
					vmlDrawing: `vmlDrawing${model.id}`
				});
			}
			const drawingRelsHash = [];
			let bookImage;
			model.media.forEach((medium) => {
				if (medium.type === "background") {
					const rId = nextRid(rels);
					bookImage = options.media[medium.imageId];
					rels.push({
						Id: rId,
						Type: RelType.Image,
						Target: `../media/${bookImage.name}.${bookImage.extension}`
					});
					model.background = { rId };
					model.image = options.media[medium.imageId];
				} else if (medium.type === "image") {
					let { drawing } = model;
					bookImage = options.media[medium.imageId];
					if (!drawing) {
						drawing = model.drawing = {
							rId: nextRid(rels),
							name: `drawing${++options.drawingsCount}`,
							anchors: [],
							rels: []
						};
						options.drawings.push(drawing);
						rels.push({
							Id: drawing.rId,
							Type: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/drawing",
							Target: `../drawings/${drawing.name}.xml`
						});
					}
					let rIdImage = this.preImageId === medium.imageId ? drawingRelsHash[medium.imageId] : drawingRelsHash[drawing.rels.length];
					if (!rIdImage) {
						rIdImage = nextRid(drawing.rels);
						drawingRelsHash[drawing.rels.length] = rIdImage;
						drawing.rels.push({
							Id: rIdImage,
							Type: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image",
							Target: `../media/${bookImage.name}.${bookImage.extension}`
						});
					}
					const anchor = {
						picture: { rId: rIdImage },
						range: medium.range
					};
					if (medium.hyperlinks && medium.hyperlinks.hyperlink) {
						const rIdHyperLink = nextRid(drawing.rels);
						drawingRelsHash[drawing.rels.length] = rIdHyperLink;
						anchor.picture.hyperlinks = {
							tooltip: medium.hyperlinks.tooltip,
							rId: rIdHyperLink
						};
						drawing.rels.push({
							Id: rIdHyperLink,
							Type: RelType.Hyperlink,
							Target: medium.hyperlinks.hyperlink,
							TargetMode: "External"
						});
					}
					this.preImageId = medium.imageId;
					drawing.anchors.push(anchor);
				}
			});
			model.tables.forEach((table) => {
				const rId = nextRid(rels);
				table.rId = rId;
				rels.push({
					Id: rId,
					Type: RelType.Table,
					Target: `../tables/${table.target}`
				});
				table.columns.forEach((column) => {
					const { style } = column;
					if (style) column.dxfId = options.styles.addDxfStyle(style);
				});
			});
			this.map.extLst.prepare(model, options);
		}
		render(xmlStream, model) {
			xmlStream.openXml(XmlStream.StdDocAttributes);
			xmlStream.openNode("worksheet", WorkSheetXform.WORKSHEET_ATTRIBUTES);
			const sheetFormatPropertiesModel = model.properties ? {
				defaultRowHeight: model.properties.defaultRowHeight,
				dyDescent: model.properties.dyDescent,
				outlineLevelCol: model.properties.outlineLevelCol,
				outlineLevelRow: model.properties.outlineLevelRow
			} : void 0;
			if (model.properties && model.properties.defaultColWidth) sheetFormatPropertiesModel.defaultColWidth = model.properties.defaultColWidth;
			const sheetPropertiesModel = {
				outlineProperties: model.properties && model.properties.outlineProperties,
				tabColor: model.properties && model.properties.tabColor,
				pageSetup: model.pageSetup && model.pageSetup.fitToPage ? { fitToPage: model.pageSetup.fitToPage } : void 0
			};
			const pageMarginsModel = model.pageSetup && model.pageSetup.margins;
			const printOptionsModel = {
				showRowColHeaders: model.pageSetup && model.pageSetup.showRowColHeaders,
				showGridLines: model.pageSetup && model.pageSetup.showGridLines,
				horizontalCentered: model.pageSetup && model.pageSetup.horizontalCentered,
				verticalCentered: model.pageSetup && model.pageSetup.verticalCentered
			};
			const sheetProtectionModel = model.sheetProtection;
			this.map.sheetPr.render(xmlStream, sheetPropertiesModel);
			this.map.dimension.render(xmlStream, model.dimensions);
			this.map.sheetViews.render(xmlStream, model.views);
			this.map.sheetFormatPr.render(xmlStream, sheetFormatPropertiesModel);
			this.map.cols.render(xmlStream, model.cols);
			this.map.sheetData.render(xmlStream, model.rows);
			this.map.sheetProtection.render(xmlStream, sheetProtectionModel);
			this.map.autoFilter.render(xmlStream, model.autoFilter);
			this.map.mergeCells.render(xmlStream, model.mergeCells);
			this.map.conditionalFormatting.render(xmlStream, model.conditionalFormattings);
			this.map.dataValidations.render(xmlStream, model.dataValidations);
			this.map.hyperlinks.render(xmlStream, model.hyperlinks);
			this.map.printOptions.render(xmlStream, printOptionsModel);
			this.map.pageMargins.render(xmlStream, pageMarginsModel);
			this.map.pageSetup.render(xmlStream, model.pageSetup);
			this.map.headerFooter.render(xmlStream, model.headerFooter);
			this.map.rowBreaks.render(xmlStream, model.rowBreaks);
			this.map.drawing.render(xmlStream, model.drawing);
			this.map.picture.render(xmlStream, model.background);
			this.map.tableParts.render(xmlStream, model.tables);
			this.map.extLst.render(xmlStream, model);
			if (model.rels) model.rels.forEach((rel) => {
				if (rel.Type === RelType.VmlDrawing) xmlStream.leafNode("legacyDrawing", { "r:id": rel.Id });
			});
			xmlStream.closeNode();
		}
		parseOpen(node) {
			if (this.parser) {
				this.parser.parseOpen(node);
				return true;
			}
			if (node.name === "worksheet") {
				_.each(this.map, (xform) => {
					xform.reset();
				});
				return true;
			}
			if (this.map[node.name] && !this.ignoreNodes.includes(node.name)) {
				this.parser = this.map[node.name];
				this.parser.parseOpen(node);
			}
			return true;
		}
		parseText(text) {
			if (this.parser) this.parser.parseText(text);
		}
		parseClose(name) {
			if (this.parser) {
				if (!this.parser.parseClose(name)) this.parser = void 0;
				return true;
			}
			switch (name) {
				case "worksheet": {
					const properties = this.map.sheetFormatPr.model || {};
					if (this.map.sheetPr.model && this.map.sheetPr.model.tabColor) properties.tabColor = this.map.sheetPr.model.tabColor;
					if (this.map.sheetPr.model && this.map.sheetPr.model.outlineProperties) properties.outlineProperties = this.map.sheetPr.model.outlineProperties;
					const sheetProperties = {
						fitToPage: this.map.sheetPr.model && this.map.sheetPr.model.pageSetup && this.map.sheetPr.model.pageSetup.fitToPage || false,
						margins: this.map.pageMargins.model
					};
					const pageSetup = Object.assign(sheetProperties, this.map.pageSetup.model, this.map.printOptions.model);
					const conditionalFormattings = mergeConditionalFormattings(this.map.conditionalFormatting.model, this.map.extLst.model && this.map.extLst.model["x14:conditionalFormattings"]);
					this.model = {
						dimensions: this.map.dimension.model,
						cols: this.map.cols.model,
						rows: this.map.sheetData.model,
						mergeCells: this.map.mergeCells.model,
						hyperlinks: this.map.hyperlinks.model,
						dataValidations: this.map.dataValidations.model,
						properties,
						views: this.map.sheetViews.model,
						pageSetup,
						headerFooter: this.map.headerFooter.model,
						background: this.map.picture.model,
						drawing: this.map.drawing.model,
						tables: this.map.tableParts.model,
						conditionalFormattings
					};
					if (this.map.autoFilter.model) this.model.autoFilter = this.map.autoFilter.model;
					if (this.map.sheetProtection.model) this.model.sheetProtection = this.map.sheetProtection.model;
					return false;
				}
				default: return true;
			}
		}
		reconcile(model, options) {
			const rels = (model.relationships || []).reduce((h, rel) => {
				h[rel.Id] = rel;
				if (rel.Type === RelType.Comments) model.comments = options.comments[rel.Target].comments;
				if (rel.Type === RelType.VmlDrawing && model.comments && model.comments.length) {
					const vmlComment = options.vmlDrawings[rel.Target].comments;
					model.comments.forEach((comment, index) => {
						comment.note = Object.assign({}, comment.note, vmlComment[index]);
					});
				}
				return h;
			}, {});
			options.commentsMap = (model.comments || []).reduce((h, comment) => {
				if (comment.ref) h[comment.ref] = comment;
				return h;
			}, {});
			options.hyperlinkMap = (model.hyperlinks || []).reduce((h, hyperlink) => {
				if (hyperlink.rId) h[hyperlink.address] = rels[hyperlink.rId].Target;
				return h;
			}, {});
			options.formulae = {};
			model.rows = model.rows && model.rows.filter(Boolean) || [];
			model.rows.forEach((row) => {
				row.cells = row.cells && row.cells.filter(Boolean) || [];
			});
			this.map.cols.reconcile(model.cols, options);
			this.map.sheetData.reconcile(model.rows, options);
			this.map.conditionalFormatting.reconcile(model.conditionalFormattings, options);
			model.media = [];
			if (model.drawing) {
				const match = rels[model.drawing.rId].Target.match(/\/drawings\/([a-zA-Z0-9]+)[.][a-zA-Z]{3,4}$/);
				if (match) {
					const drawingName = match[1];
					options.drawings[drawingName].anchors.forEach((anchor) => {
						if (anchor.medium) {
							const image = {
								type: "image",
								imageId: anchor.medium.index,
								range: anchor.range,
								hyperlinks: anchor.picture.hyperlinks
							};
							model.media.push(image);
						}
					});
				}
			}
			const backgroundRel = model.background && rels[model.background.rId];
			if (backgroundRel) {
				const target = backgroundRel.Target.split("/media/")[1];
				const imageId = options.mediaIndex && options.mediaIndex[target];
				if (imageId !== void 0) model.media.push({
					type: "background",
					imageId
				});
			}
			model.tables = (model.tables || []).map((tablePart) => {
				const rel = rels[tablePart.rId];
				return options.tables[rel.Target];
			});
			delete model.relationships;
			delete model.hyperlinks;
			delete model.comments;
		}
	};
	WorkSheetXform.WORKSHEET_ATTRIBUTES = {
		xmlns: "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
		"xmlns:r": "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
		"xmlns:mc": "http://schemas.openxmlformats.org/markup-compatibility/2006",
		"mc:Ignorable": "x14ac",
		"xmlns:x14ac": "http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac"
	};
	module.exports = WorkSheetXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/drawing/base-cell-anchor-xform.js
var require_base_cell_anchor_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var BaseXform = require_base_xform();
	var BaseCellAnchorXform = class extends BaseXform {
		parseOpen(node) {
			if (this.parser) {
				this.parser.parseOpen(node);
				return true;
			}
			switch (node.name) {
				case this.tag:
					this.reset();
					this.model = { range: { editAs: node.attributes.editAs || "oneCell" } };
					break;
				default:
					this.parser = this.map[node.name];
					if (this.parser) this.parser.parseOpen(node);
			}
			return true;
		}
		parseText(text) {
			if (this.parser) this.parser.parseText(text);
		}
		reconcilePicture(model, options) {
			if (model && model.rId) {
				const match = options.rels[model.rId].Target.match(/.*\/media\/(.+[.][a-zA-Z]{3,4})/);
				if (match) {
					const name = match[1];
					const mediaId = options.mediaIndex[name];
					return options.media[mediaId];
				}
			}
		}
	};
	module.exports = BaseCellAnchorXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/drawing/cell-position-xform.js
var require_cell_position_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var BaseXform = require_base_xform();
	var IntegerXform = require_integer_xform();
	var CellPositionXform = class extends BaseXform {
		constructor(options) {
			super();
			this.tag = options.tag;
			this.map = {
				"xdr:col": new IntegerXform({
					tag: "xdr:col",
					zero: true
				}),
				"xdr:colOff": new IntegerXform({
					tag: "xdr:colOff",
					zero: true
				}),
				"xdr:row": new IntegerXform({
					tag: "xdr:row",
					zero: true
				}),
				"xdr:rowOff": new IntegerXform({
					tag: "xdr:rowOff",
					zero: true
				})
			};
		}
		render(xmlStream, model) {
			xmlStream.openNode(this.tag);
			this.map["xdr:col"].render(xmlStream, model.nativeCol);
			this.map["xdr:colOff"].render(xmlStream, model.nativeColOff);
			this.map["xdr:row"].render(xmlStream, model.nativeRow);
			this.map["xdr:rowOff"].render(xmlStream, model.nativeRowOff);
			xmlStream.closeNode();
		}
		parseOpen(node) {
			if (this.parser) {
				this.parser.parseOpen(node);
				return true;
			}
			switch (node.name) {
				case this.tag:
					this.reset();
					break;
				default:
					this.parser = this.map[node.name];
					if (this.parser) this.parser.parseOpen(node);
			}
			return true;
		}
		parseText(text) {
			if (this.parser) this.parser.parseText(text);
		}
		parseClose(name) {
			if (this.parser) {
				if (!this.parser.parseClose(name)) this.parser = void 0;
				return true;
			}
			switch (name) {
				case this.tag:
					this.model = {
						nativeCol: this.map["xdr:col"].model,
						nativeColOff: this.map["xdr:colOff"].model,
						nativeRow: this.map["xdr:row"].model,
						nativeRowOff: this.map["xdr:rowOff"].model
					};
					return false;
				default: return true;
			}
		}
	};
	module.exports = CellPositionXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/drawing/blip-xform.js
var require_blip_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var BaseXform = require_base_xform();
	var BlipXform = class extends BaseXform {
		get tag() {
			return "a:blip";
		}
		render(xmlStream, model) {
			xmlStream.leafNode(this.tag, {
				"xmlns:r": "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
				"r:embed": model.rId,
				cstate: "print"
			});
		}
		parseOpen(node) {
			switch (node.name) {
				case this.tag:
					this.model = { rId: node.attributes["r:embed"] };
					return true;
				default: return true;
			}
		}
		parseText() {}
		parseClose(name) {
			switch (name) {
				case this.tag: return false;
				default: return true;
			}
		}
	};
	module.exports = BlipXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/drawing/blip-fill-xform.js
var require_blip_fill_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var BaseXform = require_base_xform();
	var BlipXform = require_blip_xform();
	var BlipFillXform = class extends BaseXform {
		constructor() {
			super();
			this.map = { "a:blip": new BlipXform() };
		}
		get tag() {
			return "xdr:blipFill";
		}
		render(xmlStream, model) {
			xmlStream.openNode(this.tag);
			this.map["a:blip"].render(xmlStream, model);
			xmlStream.openNode("a:stretch");
			xmlStream.leafNode("a:fillRect");
			xmlStream.closeNode();
			xmlStream.closeNode();
		}
		parseOpen(node) {
			if (this.parser) {
				this.parser.parseOpen(node);
				return true;
			}
			switch (node.name) {
				case this.tag:
					this.reset();
					break;
				default:
					this.parser = this.map[node.name];
					if (this.parser) this.parser.parseOpen(node);
			}
			return true;
		}
		parseText() {}
		parseClose(name) {
			if (this.parser) {
				if (!this.parser.parseClose(name)) this.parser = void 0;
				return true;
			}
			switch (name) {
				case this.tag:
					this.model = this.map["a:blip"].model;
					return false;
				default: return true;
			}
		}
	};
	module.exports = BlipFillXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/drawing/hlink-click-xform.js
var require_hlink_click_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var BaseXform = require_base_xform();
	var HLinkClickXform = class extends BaseXform {
		get tag() {
			return "a:hlinkClick";
		}
		render(xmlStream, model) {
			if (!(model.hyperlinks && model.hyperlinks.rId)) return;
			xmlStream.leafNode(this.tag, {
				"xmlns:r": "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
				"r:id": model.hyperlinks.rId,
				tooltip: model.hyperlinks.tooltip
			});
		}
		parseOpen(node) {
			switch (node.name) {
				case this.tag:
					this.model = { hyperlinks: {
						rId: node.attributes["r:id"],
						tooltip: node.attributes.tooltip
					} };
					return true;
				default: return true;
			}
		}
		parseText() {}
		parseClose() {
			return false;
		}
	};
	module.exports = HLinkClickXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/drawing/ext-lst-xform.js
var require_ext_lst_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var BaseXform = require_base_xform();
	var ExtLstXform = class extends BaseXform {
		get tag() {
			return "a:extLst";
		}
		render(xmlStream) {
			xmlStream.openNode(this.tag);
			xmlStream.openNode("a:ext", { uri: "{FF2B5EF4-FFF2-40B4-BE49-F238E27FC236}" });
			xmlStream.leafNode("a16:creationId", {
				"xmlns:a16": "http://schemas.microsoft.com/office/drawing/2014/main",
				id: "{00000000-0008-0000-0000-000002000000}"
			});
			xmlStream.closeNode();
			xmlStream.closeNode();
		}
		parseOpen(node) {
			switch (node.name) {
				case this.tag: return true;
				default: return true;
			}
		}
		parseText() {}
		parseClose(name) {
			switch (name) {
				case this.tag: return false;
				default: return true;
			}
		}
	};
	module.exports = ExtLstXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/drawing/c-nv-pr-xform.js
var require_c_nv_pr_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var BaseXform = require_base_xform();
	var HlickClickXform = require_hlink_click_xform();
	var ExtLstXform = require_ext_lst_xform();
	var CNvPrXform = class extends BaseXform {
		constructor() {
			super();
			this.map = {
				"a:hlinkClick": new HlickClickXform(),
				"a:extLst": new ExtLstXform()
			};
		}
		get tag() {
			return "xdr:cNvPr";
		}
		render(xmlStream, model) {
			xmlStream.openNode(this.tag, {
				id: model.index,
				name: `Picture ${model.index}`
			});
			this.map["a:hlinkClick"].render(xmlStream, model);
			this.map["a:extLst"].render(xmlStream, model);
			xmlStream.closeNode();
		}
		parseOpen(node) {
			if (this.parser) {
				this.parser.parseOpen(node);
				return true;
			}
			switch (node.name) {
				case this.tag:
					this.reset();
					break;
				default:
					this.parser = this.map[node.name];
					if (this.parser) this.parser.parseOpen(node);
			}
			return true;
		}
		parseText() {}
		parseClose(name) {
			if (this.parser) {
				if (!this.parser.parseClose(name)) this.parser = void 0;
				return true;
			}
			switch (name) {
				case this.tag:
					this.model = this.map["a:hlinkClick"].model;
					return false;
				default: return true;
			}
		}
	};
	module.exports = CNvPrXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/drawing/c-nv-pic-pr-xform.js
var require_c_nv_pic_pr_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var BaseXform = require_base_xform();
	var CNvPicPrXform = class extends BaseXform {
		get tag() {
			return "xdr:cNvPicPr";
		}
		render(xmlStream) {
			xmlStream.openNode(this.tag);
			xmlStream.leafNode("a:picLocks", { noChangeAspect: "1" });
			xmlStream.closeNode();
		}
		parseOpen(node) {
			switch (node.name) {
				case this.tag: return true;
				default: return true;
			}
		}
		parseText() {}
		parseClose(name) {
			switch (name) {
				case this.tag: return false;
				default: return true;
			}
		}
	};
	module.exports = CNvPicPrXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/drawing/nv-pic-pr-xform.js
var require_nv_pic_pr_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var BaseXform = require_base_xform();
	var CNvPrXform = require_c_nv_pr_xform();
	var CNvPicPrXform = require_c_nv_pic_pr_xform();
	var NvPicPrXform = class extends BaseXform {
		constructor() {
			super();
			this.map = {
				"xdr:cNvPr": new CNvPrXform(),
				"xdr:cNvPicPr": new CNvPicPrXform()
			};
		}
		get tag() {
			return "xdr:nvPicPr";
		}
		render(xmlStream, model) {
			xmlStream.openNode(this.tag);
			this.map["xdr:cNvPr"].render(xmlStream, model);
			this.map["xdr:cNvPicPr"].render(xmlStream, model);
			xmlStream.closeNode();
		}
		parseOpen(node) {
			if (this.parser) {
				this.parser.parseOpen(node);
				return true;
			}
			switch (node.name) {
				case this.tag:
					this.reset();
					break;
				default:
					this.parser = this.map[node.name];
					if (this.parser) this.parser.parseOpen(node);
			}
			return true;
		}
		parseText() {}
		parseClose(name) {
			if (this.parser) {
				if (!this.parser.parseClose(name)) this.parser = void 0;
				return true;
			}
			switch (name) {
				case this.tag:
					this.model = this.map["xdr:cNvPr"].model;
					return false;
				default: return true;
			}
		}
	};
	module.exports = NvPicPrXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/drawing/sp-pr.js
var require_sp_pr = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = {
		tag: "xdr:spPr",
		c: [{
			tag: "a:xfrm",
			c: [{
				tag: "a:off",
				$: {
					x: "0",
					y: "0"
				}
			}, {
				tag: "a:ext",
				$: {
					cx: "0",
					cy: "0"
				}
			}]
		}, {
			tag: "a:prstGeom",
			$: { prst: "rect" },
			c: [{ tag: "a:avLst" }]
		}]
	};
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/drawing/pic-xform.js
var require_pic_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var BaseXform = require_base_xform();
	var StaticXform = require_static_xform();
	var BlipFillXform = require_blip_fill_xform();
	var NvPicPrXform = require_nv_pic_pr_xform();
	var spPrJSON = require_sp_pr();
	var PicXform = class extends BaseXform {
		constructor() {
			super();
			this.map = {
				"xdr:nvPicPr": new NvPicPrXform(),
				"xdr:blipFill": new BlipFillXform(),
				"xdr:spPr": new StaticXform(spPrJSON)
			};
		}
		get tag() {
			return "xdr:pic";
		}
		prepare(model, options) {
			model.index = options.index + 1;
		}
		render(xmlStream, model) {
			xmlStream.openNode(this.tag);
			this.map["xdr:nvPicPr"].render(xmlStream, model);
			this.map["xdr:blipFill"].render(xmlStream, model);
			this.map["xdr:spPr"].render(xmlStream, model);
			xmlStream.closeNode();
		}
		parseOpen(node) {
			if (this.parser) {
				this.parser.parseOpen(node);
				return true;
			}
			switch (node.name) {
				case this.tag:
					this.reset();
					break;
				default:
					this.parser = this.map[node.name];
					if (this.parser) this.parser.parseOpen(node);
			}
			return true;
		}
		parseText() {}
		parseClose(name) {
			if (this.parser) {
				if (!this.parser.parseClose(name)) {
					this.mergeModel(this.parser.model);
					this.parser = void 0;
				}
				return true;
			}
			switch (name) {
				case this.tag: return false;
				default: return true;
			}
		}
	};
	module.exports = PicXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/drawing/two-cell-anchor-xform.js
var require_two_cell_anchor_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var BaseCellAnchorXform = require_base_cell_anchor_xform();
	var StaticXform = require_static_xform();
	var CellPositionXform = require_cell_position_xform();
	var PicXform = require_pic_xform();
	var TwoCellAnchorXform = class extends BaseCellAnchorXform {
		constructor() {
			super();
			this.map = {
				"xdr:from": new CellPositionXform({ tag: "xdr:from" }),
				"xdr:to": new CellPositionXform({ tag: "xdr:to" }),
				"xdr:pic": new PicXform(),
				"xdr:clientData": new StaticXform({ tag: "xdr:clientData" })
			};
		}
		get tag() {
			return "xdr:twoCellAnchor";
		}
		prepare(model, options) {
			this.map["xdr:pic"].prepare(model.picture, options);
		}
		render(xmlStream, model) {
			xmlStream.openNode(this.tag, { editAs: model.range.editAs || "oneCell" });
			this.map["xdr:from"].render(xmlStream, model.range.tl);
			this.map["xdr:to"].render(xmlStream, model.range.br);
			this.map["xdr:pic"].render(xmlStream, model.picture);
			this.map["xdr:clientData"].render(xmlStream, {});
			xmlStream.closeNode();
		}
		parseClose(name) {
			if (this.parser) {
				if (!this.parser.parseClose(name)) this.parser = void 0;
				return true;
			}
			switch (name) {
				case this.tag:
					this.model.range.tl = this.map["xdr:from"].model;
					this.model.range.br = this.map["xdr:to"].model;
					this.model.picture = this.map["xdr:pic"].model;
					return false;
				default: return true;
			}
		}
		reconcile(model, options) {
			model.medium = this.reconcilePicture(model.picture, options);
		}
	};
	module.exports = TwoCellAnchorXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/drawing/ext-xform.js
var require_ext_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var BaseXform = require_base_xform();
	/** https://en.wikipedia.org/wiki/Office_Open_XML_file_formats#DrawingML */
	var EMU_PER_PIXEL_AT_96_DPI = 9525;
	var ExtXform = class extends BaseXform {
		constructor(options) {
			super();
			this.tag = options.tag;
			this.map = {};
		}
		render(xmlStream, model) {
			xmlStream.openNode(this.tag);
			const width = Math.floor(model.width * EMU_PER_PIXEL_AT_96_DPI);
			const height = Math.floor(model.height * EMU_PER_PIXEL_AT_96_DPI);
			xmlStream.addAttribute("cx", width);
			xmlStream.addAttribute("cy", height);
			xmlStream.closeNode();
		}
		parseOpen(node) {
			if (node.name === this.tag) {
				this.model = {
					width: parseInt(node.attributes.cx || "0", 10) / EMU_PER_PIXEL_AT_96_DPI,
					height: parseInt(node.attributes.cy || "0", 10) / EMU_PER_PIXEL_AT_96_DPI
				};
				return true;
			}
			return false;
		}
		parseText() {}
		parseClose() {
			return false;
		}
	};
	module.exports = ExtXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/drawing/one-cell-anchor-xform.js
var require_one_cell_anchor_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var BaseCellAnchorXform = require_base_cell_anchor_xform();
	var StaticXform = require_static_xform();
	var CellPositionXform = require_cell_position_xform();
	var ExtXform = require_ext_xform();
	var PicXform = require_pic_xform();
	var OneCellAnchorXform = class extends BaseCellAnchorXform {
		constructor() {
			super();
			this.map = {
				"xdr:from": new CellPositionXform({ tag: "xdr:from" }),
				"xdr:ext": new ExtXform({ tag: "xdr:ext" }),
				"xdr:pic": new PicXform(),
				"xdr:clientData": new StaticXform({ tag: "xdr:clientData" })
			};
		}
		get tag() {
			return "xdr:oneCellAnchor";
		}
		prepare(model, options) {
			this.map["xdr:pic"].prepare(model.picture, options);
		}
		render(xmlStream, model) {
			xmlStream.openNode(this.tag, { editAs: model.range.editAs || "oneCell" });
			this.map["xdr:from"].render(xmlStream, model.range.tl);
			this.map["xdr:ext"].render(xmlStream, model.range.ext);
			this.map["xdr:pic"].render(xmlStream, model.picture);
			this.map["xdr:clientData"].render(xmlStream, {});
			xmlStream.closeNode();
		}
		parseClose(name) {
			if (this.parser) {
				if (!this.parser.parseClose(name)) this.parser = void 0;
				return true;
			}
			switch (name) {
				case this.tag:
					this.model.range.tl = this.map["xdr:from"].model;
					this.model.range.ext = this.map["xdr:ext"].model;
					this.model.picture = this.map["xdr:pic"].model;
					return false;
				default: return true;
			}
		}
		reconcile(model, options) {
			model.medium = this.reconcilePicture(model.picture, options);
		}
	};
	module.exports = OneCellAnchorXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/drawing/drawing-xform.js
var require_drawing_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var colCache = require_col_cache();
	var XmlStream = require_xml_stream();
	var BaseXform = require_base_xform();
	var TwoCellAnchorXform = require_two_cell_anchor_xform();
	var OneCellAnchorXform = require_one_cell_anchor_xform();
	function getAnchorType(model) {
		return (typeof model.range === "string" ? colCache.decode(model.range) : model.range).br ? "xdr:twoCellAnchor" : "xdr:oneCellAnchor";
	}
	var DrawingXform = class DrawingXform extends BaseXform {
		constructor() {
			super();
			this.map = {
				"xdr:twoCellAnchor": new TwoCellAnchorXform(),
				"xdr:oneCellAnchor": new OneCellAnchorXform()
			};
		}
		prepare(model) {
			model.anchors.forEach((item, index) => {
				item.anchorType = getAnchorType(item);
				this.map[item.anchorType].prepare(item, { index });
			});
		}
		get tag() {
			return "xdr:wsDr";
		}
		render(xmlStream, model) {
			xmlStream.openXml(XmlStream.StdDocAttributes);
			xmlStream.openNode(this.tag, DrawingXform.DRAWING_ATTRIBUTES);
			model.anchors.forEach((item) => {
				this.map[item.anchorType].render(xmlStream, item);
			});
			xmlStream.closeNode();
		}
		parseOpen(node) {
			if (this.parser) {
				this.parser.parseOpen(node);
				return true;
			}
			switch (node.name) {
				case this.tag:
					this.reset();
					this.model = { anchors: [] };
					break;
				default:
					this.parser = this.map[node.name];
					if (this.parser) this.parser.parseOpen(node);
			}
			return true;
		}
		parseText(text) {
			if (this.parser) this.parser.parseText(text);
		}
		parseClose(name) {
			if (this.parser) {
				if (!this.parser.parseClose(name)) {
					this.model.anchors.push(this.parser.model);
					this.parser = void 0;
				}
				return true;
			}
			switch (name) {
				case this.tag: return false;
				default: return true;
			}
		}
		reconcile(model, options) {
			model.anchors.forEach((anchor) => {
				if (anchor.br) this.map["xdr:twoCellAnchor"].reconcile(anchor, options);
				else this.map["xdr:oneCellAnchor"].reconcile(anchor, options);
			});
		}
	};
	DrawingXform.DRAWING_ATTRIBUTES = {
		"xmlns:xdr": "http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing",
		"xmlns:a": "http://schemas.openxmlformats.org/drawingml/2006/main"
	};
	module.exports = DrawingXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/table/custom-filter-xform.js
var require_custom_filter_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var BaseXform = require_base_xform();
	var CustomFilterXform = class extends BaseXform {
		get tag() {
			return "customFilter";
		}
		render(xmlStream, model) {
			xmlStream.leafNode(this.tag, {
				val: model.val,
				operator: model.operator
			});
		}
		parseOpen(node) {
			if (node.name === this.tag) {
				this.model = {
					val: node.attributes.val,
					operator: node.attributes.operator
				};
				return true;
			}
			return false;
		}
		parseText() {}
		parseClose() {
			return false;
		}
	};
	module.exports = CustomFilterXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/table/filter-xform.js
var require_filter_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var BaseXform = require_base_xform();
	var FilterXform = class extends BaseXform {
		get tag() {
			return "filter";
		}
		render(xmlStream, model) {
			xmlStream.leafNode(this.tag, { val: model.val });
		}
		parseOpen(node) {
			if (node.name === this.tag) {
				this.model = { val: node.attributes.val };
				return true;
			}
			return false;
		}
		parseText() {}
		parseClose() {
			return false;
		}
	};
	module.exports = FilterXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/table/filter-column-xform.js
var require_filter_column_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var BaseXform = require_base_xform();
	var ListXform = require_list_xform();
	var CustomFilterXform = require_custom_filter_xform();
	var FilterXform = require_filter_xform();
	var FilterColumnXform = class extends BaseXform {
		constructor() {
			super();
			this.map = {
				customFilters: new ListXform({
					tag: "customFilters",
					count: false,
					empty: true,
					childXform: new CustomFilterXform()
				}),
				filters: new ListXform({
					tag: "filters",
					count: false,
					empty: true,
					childXform: new FilterXform()
				})
			};
		}
		get tag() {
			return "filterColumn";
		}
		prepare(model, options) {
			model.colId = options.index.toString();
		}
		render(xmlStream, model) {
			if (model.customFilters) {
				xmlStream.openNode(this.tag, {
					colId: model.colId,
					hiddenButton: model.filterButton ? "0" : "1"
				});
				this.map.customFilters.render(xmlStream, model.customFilters);
				xmlStream.closeNode();
				return true;
			}
			xmlStream.leafNode(this.tag, {
				colId: model.colId,
				hiddenButton: model.filterButton ? "0" : "1"
			});
			return true;
		}
		parseOpen(node) {
			if (this.parser) {
				this.parser.parseOpen(node);
				return true;
			}
			const { attributes } = node;
			switch (node.name) {
				case this.tag:
					this.model = { filterButton: attributes.hiddenButton === "0" };
					return true;
				default:
					this.parser = this.map[node.name];
					if (this.parser) {
						this.parseOpen(node);
						return true;
					}
					throw new Error(`Unexpected xml node in parseOpen: ${JSON.stringify(node)}`);
			}
		}
		parseText() {}
		parseClose(name) {
			if (this.parser) {
				if (!this.parser.parseClose(name)) this.parser = void 0;
				return true;
			}
			switch (name) {
				case this.tag:
					this.model.customFilters = this.map.customFilters.model;
					return false;
				default: return true;
			}
		}
	};
	module.exports = FilterColumnXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/table/auto-filter-xform.js
var require_auto_filter_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var BaseXform = require_base_xform();
	var FilterColumnXform = require_filter_column_xform();
	var AutoFilterXform = class extends BaseXform {
		constructor() {
			super();
			this.map = { filterColumn: new FilterColumnXform() };
		}
		get tag() {
			return "autoFilter";
		}
		prepare(model) {
			model.columns.forEach((column, index) => {
				this.map.filterColumn.prepare(column, { index });
			});
		}
		render(xmlStream, model) {
			xmlStream.openNode(this.tag, { ref: model.autoFilterRef });
			model.columns.forEach((column) => {
				this.map.filterColumn.render(xmlStream, column);
			});
			xmlStream.closeNode();
			return true;
		}
		parseOpen(node) {
			if (this.parser) {
				this.parser.parseOpen(node);
				return true;
			}
			switch (node.name) {
				case this.tag:
					this.model = {
						autoFilterRef: node.attributes.ref,
						columns: []
					};
					return true;
				default:
					this.parser = this.map[node.name];
					if (this.parser) {
						this.parseOpen(node);
						return true;
					}
					throw new Error(`Unexpected xml node in parseOpen: ${JSON.stringify(node)}`);
			}
		}
		parseText(text) {
			if (this.parser) this.parser.parseText(text);
		}
		parseClose(name) {
			if (this.parser) {
				if (!this.parser.parseClose(name)) {
					this.model.columns.push(this.parser.model);
					this.parser = void 0;
				}
				return true;
			}
			switch (name) {
				case this.tag: return false;
				default: throw new Error(`Unexpected xml node in parseClose: ${name}`);
			}
		}
	};
	module.exports = AutoFilterXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/table/table-column-xform.js
var require_table_column_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var BaseXform = require_base_xform();
	var TableColumnXform = class extends BaseXform {
		get tag() {
			return "tableColumn";
		}
		prepare(model, options) {
			model.id = options.index + 1;
		}
		render(xmlStream, model) {
			xmlStream.leafNode(this.tag, {
				id: model.id.toString(),
				name: model.name,
				totalsRowLabel: model.totalsRowLabel,
				totalsRowFunction: model.totalsRowFunction,
				dxfId: model.dxfId
			});
			return true;
		}
		parseOpen(node) {
			if (node.name === this.tag) {
				const { attributes } = node;
				this.model = {
					name: attributes.name,
					totalsRowLabel: attributes.totalsRowLabel,
					totalsRowFunction: attributes.totalsRowFunction,
					dxfId: attributes.dxfId
				};
				return true;
			}
			return false;
		}
		parseText() {}
		parseClose() {
			return false;
		}
	};
	module.exports = TableColumnXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/table/table-style-info-xform.js
var require_table_style_info_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var BaseXform = require_base_xform();
	var TableStyleInfoXform = class extends BaseXform {
		get tag() {
			return "tableStyleInfo";
		}
		render(xmlStream, model) {
			xmlStream.leafNode(this.tag, {
				name: model.theme ? model.theme : void 0,
				showFirstColumn: model.showFirstColumn ? "1" : "0",
				showLastColumn: model.showLastColumn ? "1" : "0",
				showRowStripes: model.showRowStripes ? "1" : "0",
				showColumnStripes: model.showColumnStripes ? "1" : "0"
			});
			return true;
		}
		parseOpen(node) {
			if (node.name === this.tag) {
				const { attributes } = node;
				this.model = {
					theme: attributes.name ? attributes.name : null,
					showFirstColumn: attributes.showFirstColumn === "1",
					showLastColumn: attributes.showLastColumn === "1",
					showRowStripes: attributes.showRowStripes === "1",
					showColumnStripes: attributes.showColumnStripes === "1"
				};
				return true;
			}
			return false;
		}
		parseText() {}
		parseClose() {
			return false;
		}
	};
	module.exports = TableStyleInfoXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/table/table-xform.js
var require_table_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var XmlStream = require_xml_stream();
	var BaseXform = require_base_xform();
	var ListXform = require_list_xform();
	var AutoFilterXform = require_auto_filter_xform();
	var TableColumnXform = require_table_column_xform();
	var TableStyleInfoXform = require_table_style_info_xform();
	var TableXform = class TableXform extends BaseXform {
		constructor() {
			super();
			this.map = {
				autoFilter: new AutoFilterXform(),
				tableColumns: new ListXform({
					tag: "tableColumns",
					count: true,
					empty: true,
					childXform: new TableColumnXform()
				}),
				tableStyleInfo: new TableStyleInfoXform()
			};
		}
		prepare(model, options) {
			this.map.autoFilter.prepare(model);
			this.map.tableColumns.prepare(model.columns, options);
		}
		get tag() {
			return "table";
		}
		render(xmlStream, model) {
			xmlStream.openXml(XmlStream.StdDocAttributes);
			xmlStream.openNode(this.tag, {
				...TableXform.TABLE_ATTRIBUTES,
				id: model.id,
				name: model.name,
				displayName: model.displayName || model.name,
				ref: model.tableRef,
				totalsRowCount: model.totalsRow ? "1" : void 0,
				totalsRowShown: model.totalsRow ? void 0 : "1",
				headerRowCount: model.headerRow ? "1" : "0"
			});
			this.map.autoFilter.render(xmlStream, model);
			this.map.tableColumns.render(xmlStream, model.columns);
			this.map.tableStyleInfo.render(xmlStream, model.style);
			xmlStream.closeNode();
		}
		parseOpen(node) {
			if (this.parser) {
				this.parser.parseOpen(node);
				return true;
			}
			const { name, attributes } = node;
			switch (name) {
				case this.tag:
					this.reset();
					this.model = {
						name: attributes.name,
						displayName: attributes.displayName || attributes.name,
						tableRef: attributes.ref,
						totalsRow: attributes.totalsRowCount === "1",
						headerRow: attributes.headerRowCount === "1"
					};
					break;
				default:
					this.parser = this.map[node.name];
					if (this.parser) this.parser.parseOpen(node);
			}
			return true;
		}
		parseText(text) {
			if (this.parser) this.parser.parseText(text);
		}
		parseClose(name) {
			if (this.parser) {
				if (!this.parser.parseClose(name)) this.parser = void 0;
				return true;
			}
			switch (name) {
				case this.tag:
					this.model.columns = this.map.tableColumns.model;
					if (this.map.autoFilter.model) {
						this.model.autoFilterRef = this.map.autoFilter.model.autoFilterRef;
						this.map.autoFilter.model.columns.forEach((column, index) => {
							this.model.columns[index].filterButton = column.filterButton;
						});
					}
					this.model.style = this.map.tableStyleInfo.model;
					return false;
				default: return true;
			}
		}
		reconcile(model, options) {
			model.columns.forEach((column) => {
				if (column.dxfId !== void 0) column.style = options.styles.getDxfStyle(column.dxfId);
			});
		}
	};
	TableXform.TABLE_ATTRIBUTES = {
		xmlns: "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
		"xmlns:mc": "http://schemas.openxmlformats.org/markup-compatibility/2006",
		"mc:Ignorable": "xr xr3",
		"xmlns:xr": "http://schemas.microsoft.com/office/spreadsheetml/2014/revision",
		"xmlns:xr3": "http://schemas.microsoft.com/office/spreadsheetml/2016/revision3"
	};
	module.exports = TableXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/comment/comment-xform.js
var require_comment_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var RichTextXform = require_rich_text_xform();
	var utils = require_utils();
	var BaseXform = require_base_xform();
	/**
	<comment ref="B1" authorId="0">
	<text>
	<r>
	<rPr>
	<b/>
	<sz val="9"/>
	<rFont val="宋体"/>
	<charset val="134"/>
	</rPr>
	<t>51422:</t>
	</r>
	<r>
	<rPr>
	<sz val="9"/>
	<rFont val="宋体"/>
	<charset val="134"/>
	</rPr>
	<t xml:space="preserve">&#10;test</t>
	</r>
	</text>
	</comment>
	*/
	var CommentXform = module.exports = function(model) {
		this.model = model;
	};
	utils.inherits(CommentXform, BaseXform, {
		get tag() {
			return "r";
		},
		get richTextXform() {
			if (!this._richTextXform) this._richTextXform = new RichTextXform();
			return this._richTextXform;
		},
		render(xmlStream, model) {
			model = model || this.model;
			xmlStream.openNode("comment", {
				ref: model.ref,
				authorId: 0
			});
			xmlStream.openNode("text");
			if (model && model.note && model.note.texts) model.note.texts.forEach((text) => {
				this.richTextXform.render(xmlStream, text);
			});
			xmlStream.closeNode();
			xmlStream.closeNode();
		},
		parseOpen(node) {
			if (this.parser) {
				this.parser.parseOpen(node);
				return true;
			}
			switch (node.name) {
				case "comment":
					this.model = {
						type: "note",
						note: { texts: [] },
						...node.attributes
					};
					return true;
				case "r":
					this.parser = this.richTextXform;
					this.parser.parseOpen(node);
					return true;
				default: return false;
			}
		},
		parseText(text) {
			if (this.parser) this.parser.parseText(text);
		},
		parseClose(name) {
			switch (name) {
				case "comment": return false;
				case "r":
					this.model.note.texts.push(this.parser.model);
					this.parser = void 0;
					return true;
				default:
					if (this.parser) this.parser.parseClose(name);
					return true;
			}
		}
	});
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/comment/comments-xform.js
var require_comments_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var XmlStream = require_xml_stream();
	var utils = require_utils();
	var BaseXform = require_base_xform();
	var CommentXform = require_comment_xform();
	var CommentsXform = module.exports = function() {
		this.map = { comment: new CommentXform() };
	};
	utils.inherits(CommentsXform, BaseXform, { COMMENTS_ATTRIBUTES: { xmlns: "http://schemas.openxmlformats.org/spreadsheetml/2006/main" } }, {
		render(xmlStream, model) {
			model = model || this.model;
			xmlStream.openXml(XmlStream.StdDocAttributes);
			xmlStream.openNode("comments", CommentsXform.COMMENTS_ATTRIBUTES);
			xmlStream.openNode("authors");
			xmlStream.leafNode("author", null, "Author");
			xmlStream.closeNode();
			xmlStream.openNode("commentList");
			model.comments.forEach((comment) => {
				this.map.comment.render(xmlStream, comment);
			});
			xmlStream.closeNode();
			xmlStream.closeNode();
		},
		parseOpen(node) {
			if (this.parser) {
				this.parser.parseOpen(node);
				return true;
			}
			switch (node.name) {
				case "commentList":
					this.model = { comments: [] };
					return true;
				case "comment":
					this.parser = this.map.comment;
					this.parser.parseOpen(node);
					return true;
				default: return false;
			}
		},
		parseText(text) {
			if (this.parser) this.parser.parseText(text);
		},
		parseClose(name) {
			switch (name) {
				case "commentList": return false;
				case "comment":
					this.model.comments.push(this.parser.model);
					this.parser = void 0;
					return true;
				default:
					if (this.parser) this.parser.parseClose(name);
					return true;
			}
		}
	});
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/comment/vml-textbox-xform.js
var require_vml_textbox_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var BaseXform = require_base_xform();
	var VmlTextboxXform = class extends BaseXform {
		get tag() {
			return "v:textbox";
		}
		conversionUnit(value, multiple, unit) {
			return `${parseFloat(value) * multiple.toFixed(2)}${unit}`;
		}
		reverseConversionUnit(inset) {
			return (inset || "").split(",").map((margin) => {
				return Number(parseFloat(this.conversionUnit(parseFloat(margin), .1, "")).toFixed(2));
			});
		}
		render(xmlStream, model) {
			const attributes = { style: "mso-direction-alt:auto" };
			if (model && model.note) {
				let { inset } = model.note && model.note.margins;
				if (Array.isArray(inset)) inset = inset.map((margin) => {
					return this.conversionUnit(margin, 10, "mm");
				}).join(",");
				if (inset) attributes.inset = inset;
			}
			xmlStream.openNode("v:textbox", attributes);
			xmlStream.leafNode("div", { style: "text-align:left" });
			xmlStream.closeNode();
		}
		parseOpen(node) {
			switch (node.name) {
				case this.tag:
					this.model = { inset: this.reverseConversionUnit(node.attributes.inset) };
					return true;
				default: return true;
			}
		}
		parseText() {}
		parseClose(name) {
			switch (name) {
				case this.tag: return false;
				default: return true;
			}
		}
	};
	module.exports = VmlTextboxXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/comment/vml-anchor-xform.js
var require_vml_anchor_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var BaseXform = require_base_xform();
	var VmlAnchorXform = class extends BaseXform {
		get tag() {
			return "x:Anchor";
		}
		getAnchorRect(anchor) {
			const l = Math.floor(anchor.left);
			const lf = Math.floor((anchor.left - l) * 68);
			const t = Math.floor(anchor.top);
			const tf = Math.floor((anchor.top - t) * 18);
			const r = Math.floor(anchor.right);
			const rf = Math.floor((anchor.right - r) * 68);
			const b = Math.floor(anchor.bottom);
			return [
				l,
				lf,
				t,
				tf,
				r,
				rf,
				b,
				Math.floor((anchor.bottom - b) * 18)
			];
		}
		getDefaultRect(ref) {
			const l = ref.col;
			const lf = 6;
			const t = Math.max(ref.row - 2, 0);
			return [
				l,
				lf,
				t,
				14,
				l + 2,
				2,
				t + 4,
				16
			];
		}
		render(xmlStream, model) {
			const rect = model.anchor ? this.getAnchorRect(model.anchor) : this.getDefaultRect(model.refAddress);
			xmlStream.leafNode("x:Anchor", null, rect.join(", "));
		}
		parseOpen(node) {
			switch (node.name) {
				case this.tag:
					this.text = "";
					return true;
				default: return false;
			}
		}
		parseText(text) {
			this.text = text;
		}
		parseClose() {
			return false;
		}
	};
	module.exports = VmlAnchorXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/comment/style/vml-protection-xform.js
var require_vml_protection_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var BaseXform = require_base_xform();
	var VmlProtectionXform = class extends BaseXform {
		constructor(model) {
			super();
			this._model = model;
		}
		get tag() {
			return this._model && this._model.tag;
		}
		render(xmlStream, model) {
			xmlStream.leafNode(this.tag, null, model);
		}
		parseOpen(node) {
			switch (node.name) {
				case this.tag:
					this.text = "";
					return true;
				default: return false;
			}
		}
		parseText(text) {
			this.text = text;
		}
		parseClose() {
			return false;
		}
	};
	module.exports = VmlProtectionXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/comment/style/vml-position-xform.js
var require_vml_position_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var BaseXform = require_base_xform();
	var VmlPositionXform = class extends BaseXform {
		constructor(model) {
			super();
			this._model = model;
		}
		get tag() {
			return this._model && this._model.tag;
		}
		render(xmlStream, model, type) {
			if (model === type[2]) xmlStream.leafNode(this.tag);
			else if (this.tag === "x:SizeWithCells" && model === type[1]) xmlStream.leafNode(this.tag);
		}
		parseOpen(node) {
			switch (node.name) {
				case this.tag:
					this.model = {};
					this.model[this.tag] = true;
					return true;
				default: return false;
			}
		}
		parseText() {}
		parseClose() {
			return false;
		}
	};
	module.exports = VmlPositionXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/comment/vml-client-data-xform.js
var require_vml_client_data_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var BaseXform = require_base_xform();
	var VmlAnchorXform = require_vml_anchor_xform();
	var VmlProtectionXform = require_vml_protection_xform();
	var VmlPositionXform = require_vml_position_xform();
	var POSITION_TYPE = [
		"twoCells",
		"oneCells",
		"absolute"
	];
	var VmlClientDataXform = class extends BaseXform {
		constructor() {
			super();
			this.map = {
				"x:Anchor": new VmlAnchorXform(),
				"x:Locked": new VmlProtectionXform({ tag: "x:Locked" }),
				"x:LockText": new VmlProtectionXform({ tag: "x:LockText" }),
				"x:SizeWithCells": new VmlPositionXform({ tag: "x:SizeWithCells" }),
				"x:MoveWithCells": new VmlPositionXform({ tag: "x:MoveWithCells" })
			};
		}
		get tag() {
			return "x:ClientData";
		}
		render(xmlStream, model) {
			const { protection, editAs } = model.note;
			xmlStream.openNode(this.tag, { ObjectType: "Note" });
			this.map["x:MoveWithCells"].render(xmlStream, editAs, POSITION_TYPE);
			this.map["x:SizeWithCells"].render(xmlStream, editAs, POSITION_TYPE);
			this.map["x:Anchor"].render(xmlStream, model);
			this.map["x:Locked"].render(xmlStream, protection.locked);
			xmlStream.leafNode("x:AutoFill", null, "False");
			this.map["x:LockText"].render(xmlStream, protection.lockText);
			xmlStream.leafNode("x:Row", null, model.refAddress.row - 1);
			xmlStream.leafNode("x:Column", null, model.refAddress.col - 1);
			xmlStream.closeNode();
		}
		parseOpen(node) {
			switch (node.name) {
				case this.tag:
					this.reset();
					this.model = {
						anchor: [],
						protection: {},
						editAs: ""
					};
					break;
				default:
					this.parser = this.map[node.name];
					if (this.parser) this.parser.parseOpen(node);
			}
			return true;
		}
		parseText(text) {
			if (this.parser) this.parser.parseText(text);
		}
		parseClose(name) {
			if (this.parser) {
				if (!this.parser.parseClose(name)) this.parser = void 0;
				return true;
			}
			switch (name) {
				case this.tag:
					this.normalizeModel();
					return false;
				default: return true;
			}
		}
		normalizeModel() {
			const position = Object.assign({}, this.map["x:MoveWithCells"].model, this.map["x:SizeWithCells"].model);
			const len = Object.keys(position).length;
			this.model.editAs = POSITION_TYPE[len];
			this.model.anchor = this.map["x:Anchor"].text;
			this.model.protection.locked = this.map["x:Locked"].text;
			this.model.protection.lockText = this.map["x:LockText"].text;
		}
	};
	module.exports = VmlClientDataXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/comment/vml-shape-xform.js
var require_vml_shape_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var BaseXform = require_base_xform();
	var VmlTextboxXform = require_vml_textbox_xform();
	var VmlClientDataXform = require_vml_client_data_xform();
	var VmlShapeXform = class VmlShapeXform extends BaseXform {
		constructor() {
			super();
			this.map = {
				"v:textbox": new VmlTextboxXform(),
				"x:ClientData": new VmlClientDataXform()
			};
		}
		get tag() {
			return "v:shape";
		}
		render(xmlStream, model, index) {
			xmlStream.openNode("v:shape", VmlShapeXform.V_SHAPE_ATTRIBUTES(model, index));
			xmlStream.leafNode("v:fill", { color2: "infoBackground [80]" });
			xmlStream.leafNode("v:shadow", {
				color: "none [81]",
				obscured: "t"
			});
			xmlStream.leafNode("v:path", { "o:connecttype": "none" });
			this.map["v:textbox"].render(xmlStream, model);
			this.map["x:ClientData"].render(xmlStream, model);
			xmlStream.closeNode();
		}
		parseOpen(node) {
			if (this.parser) {
				this.parser.parseOpen(node);
				return true;
			}
			switch (node.name) {
				case this.tag:
					this.reset();
					this.model = {
						margins: { insetmode: node.attributes["o:insetmode"] },
						anchor: "",
						editAs: "",
						protection: {}
					};
					break;
				default:
					this.parser = this.map[node.name];
					if (this.parser) this.parser.parseOpen(node);
			}
			return true;
		}
		parseText(text) {
			if (this.parser) this.parser.parseText(text);
		}
		parseClose(name) {
			if (this.parser) {
				if (!this.parser.parseClose(name)) this.parser = void 0;
				return true;
			}
			switch (name) {
				case this.tag:
					this.model.margins.inset = this.map["v:textbox"].model && this.map["v:textbox"].model.inset;
					this.model.protection = this.map["x:ClientData"].model && this.map["x:ClientData"].model.protection;
					this.model.anchor = this.map["x:ClientData"].model && this.map["x:ClientData"].model.anchor;
					this.model.editAs = this.map["x:ClientData"].model && this.map["x:ClientData"].model.editAs;
					return false;
				default: return true;
			}
		}
	};
	VmlShapeXform.V_SHAPE_ATTRIBUTES = (model, index) => ({
		id: `_x0000_s${1025 + index}`,
		type: "#_x0000_t202",
		style: "position:absolute; margin-left:105.3pt;margin-top:10.5pt;width:97.8pt;height:59.1pt;z-index:1;visibility:hidden",
		fillcolor: "infoBackground [80]",
		strokecolor: "none [81]",
		"o:insetmode": model.note.margins && model.note.margins.insetmode
	});
	module.exports = VmlShapeXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xform/comment/vml-notes-xform.js
var require_vml_notes_xform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var XmlStream = require_xml_stream();
	var BaseXform = require_base_xform();
	var VmlShapeXform = require_vml_shape_xform();
	var VmlNotesXform = class VmlNotesXform extends BaseXform {
		constructor() {
			super();
			this.map = { "v:shape": new VmlShapeXform() };
		}
		get tag() {
			return "xml";
		}
		render(xmlStream, model) {
			xmlStream.openXml(XmlStream.StdDocAttributes);
			xmlStream.openNode(this.tag, VmlNotesXform.DRAWING_ATTRIBUTES);
			xmlStream.openNode("o:shapelayout", { "v:ext": "edit" });
			xmlStream.leafNode("o:idmap", {
				"v:ext": "edit",
				data: 1
			});
			xmlStream.closeNode();
			xmlStream.openNode("v:shapetype", {
				id: "_x0000_t202",
				coordsize: "21600,21600",
				"o:spt": 202,
				path: "m,l,21600r21600,l21600,xe"
			});
			xmlStream.leafNode("v:stroke", { joinstyle: "miter" });
			xmlStream.leafNode("v:path", {
				gradientshapeok: "t",
				"o:connecttype": "rect"
			});
			xmlStream.closeNode();
			model.comments.forEach((item, index) => {
				this.map["v:shape"].render(xmlStream, item, index);
			});
			xmlStream.closeNode();
		}
		parseOpen(node) {
			if (this.parser) {
				this.parser.parseOpen(node);
				return true;
			}
			switch (node.name) {
				case this.tag:
					this.reset();
					this.model = { comments: [] };
					break;
				default:
					this.parser = this.map[node.name];
					if (this.parser) this.parser.parseOpen(node);
			}
			return true;
		}
		parseText(text) {
			if (this.parser) this.parser.parseText(text);
		}
		parseClose(name) {
			if (this.parser) {
				if (!this.parser.parseClose(name)) {
					this.model.comments.push(this.parser.model);
					this.parser = void 0;
				}
				return true;
			}
			switch (name) {
				case this.tag: return false;
				default: return true;
			}
		}
		reconcile(model, options) {
			model.anchors.forEach((anchor) => {
				if (anchor.br) this.map["xdr:twoCellAnchor"].reconcile(anchor, options);
				else this.map["xdr:oneCellAnchor"].reconcile(anchor, options);
			});
		}
	};
	VmlNotesXform.DRAWING_ATTRIBUTES = {
		"xmlns:v": "urn:schemas-microsoft-com:vml",
		"xmlns:o": "urn:schemas-microsoft-com:office:office",
		"xmlns:x": "urn:schemas-microsoft-com:office:excel"
	};
	module.exports = VmlNotesXform;
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xml/theme1.js
var require_theme1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>\n<a:theme xmlns:a=\"http://schemas.openxmlformats.org/drawingml/2006/main\" name=\"Office Theme\"> <a:themeElements> <a:clrScheme name=\"Office\"> <a:dk1> <a:sysClr val=\"windowText\" lastClr=\"000000\"/> </a:dk1> <a:lt1> <a:sysClr val=\"window\" lastClr=\"FFFFFF\"/> </a:lt1> <a:dk2> <a:srgbClr val=\"1F497D\"/> </a:dk2> <a:lt2> <a:srgbClr val=\"EEECE1\"/> </a:lt2> <a:accent1> <a:srgbClr val=\"4F81BD\"/> </a:accent1> <a:accent2> <a:srgbClr val=\"C0504D\"/> </a:accent2> <a:accent3> <a:srgbClr val=\"9BBB59\"/> </a:accent3> <a:accent4> <a:srgbClr val=\"8064A2\"/> </a:accent4> <a:accent5> <a:srgbClr val=\"4BACC6\"/> </a:accent5> <a:accent6> <a:srgbClr val=\"F79646\"/> </a:accent6> <a:hlink> <a:srgbClr val=\"0000FF\"/> </a:hlink> <a:folHlink> <a:srgbClr val=\"800080\"/> </a:folHlink> </a:clrScheme> <a:fontScheme name=\"Office\"> <a:majorFont> <a:latin typeface=\"Cambria\"/> <a:ea typeface=\"\"/> <a:cs typeface=\"\"/> <a:font script=\"Jpan\" typeface=\"ＭＳ Ｐゴシック\"/> <a:font script=\"Hang\" typeface=\"맑은 고딕\"/> <a:font script=\"Hans\" typeface=\"宋体\"/> <a:font script=\"Hant\" typeface=\"新細明體\"/> <a:font script=\"Arab\" typeface=\"Times New Roman\"/> <a:font script=\"Hebr\" typeface=\"Times New Roman\"/> <a:font script=\"Thai\" typeface=\"Tahoma\"/> <a:font script=\"Ethi\" typeface=\"Nyala\"/> <a:font script=\"Beng\" typeface=\"Vrinda\"/> <a:font script=\"Gujr\" typeface=\"Shruti\"/> <a:font script=\"Khmr\" typeface=\"MoolBoran\"/> <a:font script=\"Knda\" typeface=\"Tunga\"/> <a:font script=\"Guru\" typeface=\"Raavi\"/> <a:font script=\"Cans\" typeface=\"Euphemia\"/> <a:font script=\"Cher\" typeface=\"Plantagenet Cherokee\"/> <a:font script=\"Yiii\" typeface=\"Microsoft Yi Baiti\"/> <a:font script=\"Tibt\" typeface=\"Microsoft Himalaya\"/> <a:font script=\"Thaa\" typeface=\"MV Boli\"/> <a:font script=\"Deva\" typeface=\"Mangal\"/> <a:font script=\"Telu\" typeface=\"Gautami\"/> <a:font script=\"Taml\" typeface=\"Latha\"/> <a:font script=\"Syrc\" typeface=\"Estrangelo Edessa\"/> <a:font script=\"Orya\" typeface=\"Kalinga\"/> <a:font script=\"Mlym\" typeface=\"Kartika\"/> <a:font script=\"Laoo\" typeface=\"DokChampa\"/> <a:font script=\"Sinh\" typeface=\"Iskoola Pota\"/> <a:font script=\"Mong\" typeface=\"Mongolian Baiti\"/> <a:font script=\"Viet\" typeface=\"Times New Roman\"/> <a:font script=\"Uigh\" typeface=\"Microsoft Uighur\"/> <a:font script=\"Geor\" typeface=\"Sylfaen\"/> </a:majorFont> <a:minorFont> <a:latin typeface=\"Calibri\"/> <a:ea typeface=\"\"/> <a:cs typeface=\"\"/> <a:font script=\"Jpan\" typeface=\"ＭＳ Ｐゴシック\"/> <a:font script=\"Hang\" typeface=\"맑은 고딕\"/> <a:font script=\"Hans\" typeface=\"宋体\"/> <a:font script=\"Hant\" typeface=\"新細明體\"/> <a:font script=\"Arab\" typeface=\"Arial\"/> <a:font script=\"Hebr\" typeface=\"Arial\"/> <a:font script=\"Thai\" typeface=\"Tahoma\"/> <a:font script=\"Ethi\" typeface=\"Nyala\"/> <a:font script=\"Beng\" typeface=\"Vrinda\"/> <a:font script=\"Gujr\" typeface=\"Shruti\"/> <a:font script=\"Khmr\" typeface=\"DaunPenh\"/> <a:font script=\"Knda\" typeface=\"Tunga\"/> <a:font script=\"Guru\" typeface=\"Raavi\"/> <a:font script=\"Cans\" typeface=\"Euphemia\"/> <a:font script=\"Cher\" typeface=\"Plantagenet Cherokee\"/> <a:font script=\"Yiii\" typeface=\"Microsoft Yi Baiti\"/> <a:font script=\"Tibt\" typeface=\"Microsoft Himalaya\"/> <a:font script=\"Thaa\" typeface=\"MV Boli\"/> <a:font script=\"Deva\" typeface=\"Mangal\"/> <a:font script=\"Telu\" typeface=\"Gautami\"/> <a:font script=\"Taml\" typeface=\"Latha\"/> <a:font script=\"Syrc\" typeface=\"Estrangelo Edessa\"/> <a:font script=\"Orya\" typeface=\"Kalinga\"/> <a:font script=\"Mlym\" typeface=\"Kartika\"/> <a:font script=\"Laoo\" typeface=\"DokChampa\"/> <a:font script=\"Sinh\" typeface=\"Iskoola Pota\"/> <a:font script=\"Mong\" typeface=\"Mongolian Baiti\"/> <a:font script=\"Viet\" typeface=\"Arial\"/> <a:font script=\"Uigh\" typeface=\"Microsoft Uighur\"/> <a:font script=\"Geor\" typeface=\"Sylfaen\"/> </a:minorFont> </a:fontScheme> <a:fmtScheme name=\"Office\"> <a:fillStyleLst> <a:solidFill> <a:schemeClr val=\"phClr\"/> </a:solidFill> <a:gradFill rotWithShape=\"1\"> <a:gsLst> <a:gs pos=\"0\"> <a:schemeClr val=\"phClr\"> <a:tint val=\"50000\"/> <a:satMod val=\"300000\"/> </a:schemeClr> </a:gs> <a:gs pos=\"35000\"> <a:schemeClr val=\"phClr\"> <a:tint val=\"37000\"/> <a:satMod val=\"300000\"/> </a:schemeClr> </a:gs> <a:gs pos=\"100000\"> <a:schemeClr val=\"phClr\"> <a:tint val=\"15000\"/> <a:satMod val=\"350000\"/> </a:schemeClr> </a:gs> </a:gsLst> <a:lin ang=\"16200000\" scaled=\"1\"/> </a:gradFill> <a:gradFill rotWithShape=\"1\"> <a:gsLst> <a:gs pos=\"0\"> <a:schemeClr val=\"phClr\"> <a:tint val=\"100000\"/> <a:shade val=\"100000\"/> <a:satMod val=\"130000\"/> </a:schemeClr> </a:gs> <a:gs pos=\"100000\"> <a:schemeClr val=\"phClr\"> <a:tint val=\"50000\"/> <a:shade val=\"100000\"/> <a:satMod val=\"350000\"/> </a:schemeClr> </a:gs> </a:gsLst> <a:lin ang=\"16200000\" scaled=\"0\"/> </a:gradFill> </a:fillStyleLst> <a:lnStyleLst> <a:ln w=\"9525\" cap=\"flat\" cmpd=\"sng\" algn=\"ctr\"> <a:solidFill> <a:schemeClr val=\"phClr\"> <a:shade val=\"95000\"/> <a:satMod val=\"105000\"/> </a:schemeClr> </a:solidFill> <a:prstDash val=\"solid\"/> </a:ln> <a:ln w=\"25400\" cap=\"flat\" cmpd=\"sng\" algn=\"ctr\"> <a:solidFill> <a:schemeClr val=\"phClr\"/> </a:solidFill> <a:prstDash val=\"solid\"/> </a:ln> <a:ln w=\"38100\" cap=\"flat\" cmpd=\"sng\" algn=\"ctr\"> <a:solidFill> <a:schemeClr val=\"phClr\"/> </a:solidFill> <a:prstDash val=\"solid\"/> </a:ln> </a:lnStyleLst> <a:effectStyleLst> <a:effectStyle> <a:effectLst> <a:outerShdw blurRad=\"40000\" dist=\"20000\" dir=\"5400000\" rotWithShape=\"0\"> <a:srgbClr val=\"000000\"> <a:alpha val=\"38000\"/> </a:srgbClr> </a:outerShdw> </a:effectLst> </a:effectStyle> <a:effectStyle> <a:effectLst> <a:outerShdw blurRad=\"40000\" dist=\"23000\" dir=\"5400000\" rotWithShape=\"0\"> <a:srgbClr val=\"000000\"> <a:alpha val=\"35000\"/> </a:srgbClr> </a:outerShdw> </a:effectLst> </a:effectStyle> <a:effectStyle> <a:effectLst> <a:outerShdw blurRad=\"40000\" dist=\"23000\" dir=\"5400000\" rotWithShape=\"0\"> <a:srgbClr val=\"000000\"> <a:alpha val=\"35000\"/> </a:srgbClr> </a:outerShdw> </a:effectLst> <a:scene3d> <a:camera prst=\"orthographicFront\"> <a:rot lat=\"0\" lon=\"0\" rev=\"0\"/> </a:camera> <a:lightRig rig=\"threePt\" dir=\"t\"> <a:rot lat=\"0\" lon=\"0\" rev=\"1200000\"/> </a:lightRig> </a:scene3d> <a:sp3d> <a:bevelT w=\"63500\" h=\"25400\"/> </a:sp3d> </a:effectStyle> </a:effectStyleLst> <a:bgFillStyleLst> <a:solidFill> <a:schemeClr val=\"phClr\"/> </a:solidFill> <a:gradFill rotWithShape=\"1\"> <a:gsLst> <a:gs pos=\"0\"> <a:schemeClr val=\"phClr\"> <a:tint val=\"40000\"/> <a:satMod val=\"350000\"/> </a:schemeClr> </a:gs> <a:gs pos=\"40000\"> <a:schemeClr val=\"phClr\"> <a:tint val=\"45000\"/> <a:shade val=\"99000\"/> <a:satMod val=\"350000\"/> </a:schemeClr> </a:gs> <a:gs pos=\"100000\"> <a:schemeClr val=\"phClr\"> <a:shade val=\"20000\"/> <a:satMod val=\"255000\"/> </a:schemeClr> </a:gs> </a:gsLst> <a:path path=\"circle\"> <a:fillToRect l=\"50000\" t=\"-80000\" r=\"50000\" b=\"180000\"/> </a:path> </a:gradFill> <a:gradFill rotWithShape=\"1\"> <a:gsLst> <a:gs pos=\"0\"> <a:schemeClr val=\"phClr\"> <a:tint val=\"80000\"/> <a:satMod val=\"300000\"/> </a:schemeClr> </a:gs> <a:gs pos=\"100000\"> <a:schemeClr val=\"phClr\"> <a:shade val=\"30000\"/> <a:satMod val=\"200000\"/> </a:schemeClr> </a:gs> </a:gsLst> <a:path path=\"circle\"> <a:fillToRect l=\"50000\" t=\"50000\" r=\"50000\" b=\"50000\"/> </a:path> </a:gradFill> </a:bgFillStyleLst> </a:fmtScheme> </a:themeElements> <a:objectDefaults> <a:spDef> <a:spPr/> <a:bodyPr/> <a:lstStyle/> <a:style> <a:lnRef idx=\"1\"> <a:schemeClr val=\"accent1\"/> </a:lnRef> <a:fillRef idx=\"3\"> <a:schemeClr val=\"accent1\"/> </a:fillRef> <a:effectRef idx=\"2\"> <a:schemeClr val=\"accent1\"/> </a:effectRef> <a:fontRef idx=\"minor\"> <a:schemeClr val=\"lt1\"/> </a:fontRef> </a:style> </a:spDef> <a:lnDef> <a:spPr/> <a:bodyPr/> <a:lstStyle/> <a:style> <a:lnRef idx=\"2\"> <a:schemeClr val=\"accent1\"/> </a:lnRef> <a:fillRef idx=\"0\"> <a:schemeClr val=\"accent1\"/> </a:fillRef> <a:effectRef idx=\"1\"> <a:schemeClr val=\"accent1\"/> </a:effectRef> <a:fontRef idx=\"minor\"> <a:schemeClr val=\"tx1\"/> </a:fontRef> </a:style> </a:lnDef> </a:objectDefaults> <a:extraClrSchemeLst/> </a:theme>";
}));
//#endregion
//#region node_modules/exceljs/lib/xlsx/xlsx.js
var require_xlsx = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var fs$7 = __require("fs");
	var JSZip = require_lib();
	var { PassThrough } = require_readable$2();
	var ZipStream = require_zip_stream();
	var StreamBuf = require_stream_buf();
	var utils = require_utils();
	var XmlStream = require_xml_stream();
	var { bufferToString } = require_browser_buffer_decode();
	var StylesXform = require_styles_xform();
	var CoreXform = require_core_xform();
	var SharedStringsXform = require_shared_strings_xform();
	var RelationshipsXform = require_relationships_xform();
	var ContentTypesXform = require_content_types_xform();
	var AppXform = require_app_xform();
	var WorkbookXform = require_workbook_xform();
	var WorksheetXform = require_worksheet_xform();
	var DrawingXform = require_drawing_xform();
	var TableXform = require_table_xform();
	var CommentsXform = require_comments_xform();
	var VmlNotesXform = require_vml_notes_xform();
	var theme1Xml = require_theme1();
	function fsReadFileAsync(filename, options) {
		return new Promise((resolve, reject) => {
			fs$7.readFile(filename, options, (error, data) => {
				if (error) reject(error);
				else resolve(data);
			});
		});
	}
	var XLSX = class XLSX {
		constructor(workbook) {
			this.workbook = workbook;
		}
		async readFile(filename, options) {
			if (!await utils.fs.exists(filename)) throw new Error(`File not found: ${filename}`);
			const stream = fs$7.createReadStream(filename);
			try {
				const workbook = await this.read(stream, options);
				stream.close();
				return workbook;
			} catch (error) {
				stream.close();
				throw error;
			}
		}
		parseRels(stream) {
			return new RelationshipsXform().parseStream(stream);
		}
		parseWorkbook(stream) {
			return new WorkbookXform().parseStream(stream);
		}
		parseSharedStrings(stream) {
			return new SharedStringsXform().parseStream(stream);
		}
		reconcile(model, options) {
			const workbookXform = new WorkbookXform();
			const worksheetXform = new WorksheetXform(options);
			const drawingXform = new DrawingXform();
			const tableXform = new TableXform();
			workbookXform.reconcile(model);
			const drawingOptions = {
				media: model.media,
				mediaIndex: model.mediaIndex
			};
			Object.keys(model.drawings).forEach((name) => {
				const drawing = model.drawings[name];
				const drawingRel = model.drawingRels[name];
				if (drawingRel) {
					drawingOptions.rels = drawingRel.reduce((o, rel) => {
						o[rel.Id] = rel;
						return o;
					}, {});
					(drawing.anchors || []).forEach((anchor) => {
						const hyperlinks = anchor.picture && anchor.picture.hyperlinks;
						if (hyperlinks && drawingOptions.rels[hyperlinks.rId]) {
							hyperlinks.hyperlink = drawingOptions.rels[hyperlinks.rId].Target;
							delete hyperlinks.rId;
						}
					});
					drawingXform.reconcile(drawing, drawingOptions);
				}
			});
			const tableOptions = { styles: model.styles };
			Object.values(model.tables).forEach((table) => {
				tableXform.reconcile(table, tableOptions);
			});
			const sheetOptions = {
				styles: model.styles,
				sharedStrings: model.sharedStrings,
				media: model.media,
				mediaIndex: model.mediaIndex,
				date1904: model.properties && model.properties.date1904,
				drawings: model.drawings,
				comments: model.comments,
				tables: model.tables,
				vmlDrawings: model.vmlDrawings
			};
			model.worksheets.forEach((worksheet) => {
				worksheet.relationships = model.worksheetRels[worksheet.sheetNo];
				worksheetXform.reconcile(worksheet, sheetOptions);
			});
			delete model.worksheetHash;
			delete model.worksheetRels;
			delete model.globalRels;
			delete model.sharedStrings;
			delete model.workbookRels;
			delete model.sheetDefs;
			delete model.styles;
			delete model.mediaIndex;
			delete model.drawings;
			delete model.drawingRels;
			delete model.vmlDrawings;
		}
		async _processWorksheetEntry(stream, model, sheetNo, options, path) {
			const worksheet = await new WorksheetXform(options).parseStream(stream);
			worksheet.sheetNo = sheetNo;
			model.worksheetHash[path] = worksheet;
			model.worksheets.push(worksheet);
		}
		async _processCommentEntry(stream, model, name) {
			const comments = await new CommentsXform().parseStream(stream);
			model.comments[`../${name}.xml`] = comments;
		}
		async _processTableEntry(stream, model, name) {
			const table = await new TableXform().parseStream(stream);
			model.tables[`../tables/${name}.xml`] = table;
		}
		async _processWorksheetRelsEntry(stream, model, sheetNo) {
			const relationships = await new RelationshipsXform().parseStream(stream);
			model.worksheetRels[sheetNo] = relationships;
		}
		async _processMediaEntry(entry, model, filename) {
			const lastDot = filename.lastIndexOf(".");
			if (lastDot >= 1) {
				const extension = filename.substr(lastDot + 1);
				const name = filename.substr(0, lastDot);
				await new Promise((resolve, reject) => {
					const streamBuf = new StreamBuf();
					streamBuf.on("finish", () => {
						model.mediaIndex[filename] = model.media.length;
						model.mediaIndex[name] = model.media.length;
						const medium = {
							type: "image",
							name,
							extension,
							buffer: streamBuf.toBuffer()
						};
						model.media.push(medium);
						resolve();
					});
					entry.on("error", (error) => {
						reject(error);
					});
					entry.pipe(streamBuf);
				});
			}
		}
		async _processDrawingEntry(entry, model, name) {
			const drawing = await new DrawingXform().parseStream(entry);
			model.drawings[name] = drawing;
		}
		async _processDrawingRelsEntry(entry, model, name) {
			const relationships = await new RelationshipsXform().parseStream(entry);
			model.drawingRels[name] = relationships;
		}
		async _processVmlDrawingEntry(entry, model, name) {
			const vmlDrawing = await new VmlNotesXform().parseStream(entry);
			model.vmlDrawings[`../drawings/${name}.vml`] = vmlDrawing;
		}
		async _processThemeEntry(entry, model, name) {
			await new Promise((resolve, reject) => {
				const stream = new StreamBuf();
				entry.on("error", reject);
				stream.on("error", reject);
				stream.on("finish", () => {
					model.themes[name] = stream.read().toString();
					resolve();
				});
				entry.pipe(stream);
			});
		}
		/**
		* @deprecated since version 4.0. You should use `#read` instead. Please follow upgrade instruction: https://github.com/exceljs/exceljs/blob/master/UPGRADE-4.0.md
		*/
		createInputStream() {
			throw new Error("`XLSX#createInputStream` is deprecated. You should use `XLSX#read` instead. This method will be removed in version 5.0. Please follow upgrade instruction: https://github.com/exceljs/exceljs/blob/master/UPGRADE-4.0.md");
		}
		async read(stream, options) {
			if (!stream[Symbol.asyncIterator] && stream.pipe) stream = stream.pipe(new PassThrough());
			const chunks = [];
			for await (const chunk of stream) chunks.push(chunk);
			return this.load(Buffer.concat(chunks), options);
		}
		async load(data, options) {
			let buffer;
			if (options && options.base64) buffer = Buffer.from(data.toString(), "base64");
			else buffer = data;
			const model = {
				worksheets: [],
				worksheetHash: {},
				worksheetRels: [],
				themes: {},
				media: [],
				mediaIndex: {},
				drawings: {},
				drawingRels: {},
				comments: {},
				tables: {},
				vmlDrawings: {}
			};
			const zip = await JSZip.loadAsync(buffer);
			for (const entry of Object.values(zip.files)) if (!entry.dir) {
				let entryName = entry.name;
				if (entryName[0] === "/") entryName = entryName.substr(1);
				let stream;
				if (entryName.match(/xl\/media\//) || entryName.match(/xl\/theme\/([a-zA-Z0-9]+)[.]xml/)) {
					stream = new PassThrough();
					stream.write(await entry.async("nodebuffer"));
				} else {
					stream = new PassThrough({
						writableObjectMode: true,
						readableObjectMode: true
					});
					let content;
					if (process.browser) content = bufferToString(await entry.async("nodebuffer"));
					else content = await entry.async("string");
					const chunkSize = 16384;
					for (let i = 0; i < content.length; i += chunkSize) stream.write(content.substring(i, i + chunkSize));
				}
				stream.end();
				switch (entryName) {
					case "_rels/.rels":
						model.globalRels = await this.parseRels(stream);
						break;
					case "xl/workbook.xml": {
						const workbook = await this.parseWorkbook(stream);
						model.sheets = workbook.sheets;
						model.definedNames = workbook.definedNames;
						model.views = workbook.views;
						model.properties = workbook.properties;
						model.calcProperties = workbook.calcProperties;
						break;
					}
					case "xl/_rels/workbook.xml.rels":
						model.workbookRels = await this.parseRels(stream);
						break;
					case "xl/sharedStrings.xml":
						model.sharedStrings = new SharedStringsXform();
						await model.sharedStrings.parseStream(stream);
						break;
					case "xl/styles.xml":
						model.styles = new StylesXform();
						await model.styles.parseStream(stream);
						break;
					case "docProps/app.xml": {
						const appProperties = await new AppXform().parseStream(stream);
						model.company = appProperties.company;
						model.manager = appProperties.manager;
						break;
					}
					case "docProps/core.xml": {
						const coreProperties = await new CoreXform().parseStream(stream);
						Object.assign(model, coreProperties);
						break;
					}
					default: {
						let match = entryName.match(/xl\/worksheets\/sheet(\d+)[.]xml/);
						if (match) {
							await this._processWorksheetEntry(stream, model, match[1], options, entryName);
							break;
						}
						match = entryName.match(/xl\/worksheets\/_rels\/sheet(\d+)[.]xml.rels/);
						if (match) {
							await this._processWorksheetRelsEntry(stream, model, match[1]);
							break;
						}
						match = entryName.match(/xl\/theme\/([a-zA-Z0-9]+)[.]xml/);
						if (match) {
							await this._processThemeEntry(stream, model, match[1]);
							break;
						}
						match = entryName.match(/xl\/media\/([a-zA-Z0-9]+[.][a-zA-Z0-9]{3,4})$/);
						if (match) {
							await this._processMediaEntry(stream, model, match[1]);
							break;
						}
						match = entryName.match(/xl\/drawings\/([a-zA-Z0-9]+)[.]xml/);
						if (match) {
							await this._processDrawingEntry(stream, model, match[1]);
							break;
						}
						match = entryName.match(/xl\/(comments\d+)[.]xml/);
						if (match) {
							await this._processCommentEntry(stream, model, match[1]);
							break;
						}
						match = entryName.match(/xl\/tables\/(table\d+)[.]xml/);
						if (match) {
							await this._processTableEntry(stream, model, match[1]);
							break;
						}
						match = entryName.match(/xl\/drawings\/_rels\/([a-zA-Z0-9]+)[.]xml[.]rels/);
						if (match) {
							await this._processDrawingRelsEntry(stream, model, match[1]);
							break;
						}
						match = entryName.match(/xl\/drawings\/(vmlDrawing\d+)[.]vml/);
						if (match) {
							await this._processVmlDrawingEntry(stream, model, match[1]);
							break;
						}
					}
				}
			}
			this.reconcile(model, options);
			this.workbook.model = model;
			return this.workbook;
		}
		async addMedia(zip, model) {
			await Promise.all(model.media.map(async (medium) => {
				if (medium.type === "image") {
					const filename = `xl/media/${medium.name}.${medium.extension}`;
					if (medium.filename) {
						const data = await fsReadFileAsync(medium.filename);
						return zip.append(data, { name: filename });
					}
					if (medium.buffer) return zip.append(medium.buffer, { name: filename });
					if (medium.base64) {
						const dataimg64 = medium.base64;
						const content = dataimg64.substring(dataimg64.indexOf(",") + 1);
						return zip.append(content, {
							name: filename,
							base64: true
						});
					}
				}
				throw new Error("Unsupported media");
			}));
		}
		addDrawings(zip, model) {
			const drawingXform = new DrawingXform();
			const relsXform = new RelationshipsXform();
			model.worksheets.forEach((worksheet) => {
				const { drawing } = worksheet;
				if (drawing) {
					drawingXform.prepare(drawing, {});
					let xml = drawingXform.toXml(drawing);
					zip.append(xml, { name: `xl/drawings/${drawing.name}.xml` });
					xml = relsXform.toXml(drawing.rels);
					zip.append(xml, { name: `xl/drawings/_rels/${drawing.name}.xml.rels` });
				}
			});
		}
		addTables(zip, model) {
			const tableXform = new TableXform();
			model.worksheets.forEach((worksheet) => {
				const { tables } = worksheet;
				tables.forEach((table) => {
					tableXform.prepare(table, {});
					const tableXml = tableXform.toXml(table);
					zip.append(tableXml, { name: `xl/tables/${table.target}` });
				});
			});
		}
		async addContentTypes(zip, model) {
			const xml = new ContentTypesXform().toXml(model);
			zip.append(xml, { name: "[Content_Types].xml" });
		}
		async addApp(zip, model) {
			const xml = new AppXform().toXml(model);
			zip.append(xml, { name: "docProps/app.xml" });
		}
		async addCore(zip, model) {
			const coreXform = new CoreXform();
			zip.append(coreXform.toXml(model), { name: "docProps/core.xml" });
		}
		async addThemes(zip, model) {
			const themes = model.themes || { theme1: theme1Xml };
			Object.keys(themes).forEach((name) => {
				const xml = themes[name];
				const path = `xl/theme/${name}.xml`;
				zip.append(xml, { name: path });
			});
		}
		async addOfficeRels(zip) {
			const xml = new RelationshipsXform().toXml([
				{
					Id: "rId1",
					Type: XLSX.RelType.OfficeDocument,
					Target: "xl/workbook.xml"
				},
				{
					Id: "rId2",
					Type: XLSX.RelType.CoreProperties,
					Target: "docProps/core.xml"
				},
				{
					Id: "rId3",
					Type: XLSX.RelType.ExtenderProperties,
					Target: "docProps/app.xml"
				}
			]);
			zip.append(xml, { name: "_rels/.rels" });
		}
		async addWorkbookRels(zip, model) {
			let count = 1;
			const relationships = [{
				Id: `rId${count++}`,
				Type: XLSX.RelType.Styles,
				Target: "styles.xml"
			}, {
				Id: `rId${count++}`,
				Type: XLSX.RelType.Theme,
				Target: "theme/theme1.xml"
			}];
			if (model.sharedStrings.count) relationships.push({
				Id: `rId${count++}`,
				Type: XLSX.RelType.SharedStrings,
				Target: "sharedStrings.xml"
			});
			model.worksheets.forEach((worksheet) => {
				worksheet.rId = `rId${count++}`;
				relationships.push({
					Id: worksheet.rId,
					Type: XLSX.RelType.Worksheet,
					Target: `worksheets/sheet${worksheet.id}.xml`
				});
			});
			const xml = new RelationshipsXform().toXml(relationships);
			zip.append(xml, { name: "xl/_rels/workbook.xml.rels" });
		}
		async addSharedStrings(zip, model) {
			if (model.sharedStrings && model.sharedStrings.count) zip.append(model.sharedStrings.xml, { name: "xl/sharedStrings.xml" });
		}
		async addStyles(zip, model) {
			const { xml } = model.styles;
			if (xml) zip.append(xml, { name: "xl/styles.xml" });
		}
		async addWorkbook(zip, model) {
			const xform = new WorkbookXform();
			zip.append(xform.toXml(model), { name: "xl/workbook.xml" });
		}
		async addWorksheets(zip, model) {
			const worksheetXform = new WorksheetXform();
			const relationshipsXform = new RelationshipsXform();
			const commentsXform = new CommentsXform();
			const vmlNotesXform = new VmlNotesXform();
			model.worksheets.forEach((worksheet) => {
				let xmlStream = new XmlStream();
				worksheetXform.render(xmlStream, worksheet);
				zip.append(xmlStream.xml, { name: `xl/worksheets/sheet${worksheet.id}.xml` });
				if (worksheet.rels && worksheet.rels.length) {
					xmlStream = new XmlStream();
					relationshipsXform.render(xmlStream, worksheet.rels);
					zip.append(xmlStream.xml, { name: `xl/worksheets/_rels/sheet${worksheet.id}.xml.rels` });
				}
				if (worksheet.comments.length > 0) {
					xmlStream = new XmlStream();
					commentsXform.render(xmlStream, worksheet);
					zip.append(xmlStream.xml, { name: `xl/comments${worksheet.id}.xml` });
					xmlStream = new XmlStream();
					vmlNotesXform.render(xmlStream, worksheet);
					zip.append(xmlStream.xml, { name: `xl/drawings/vmlDrawing${worksheet.id}.vml` });
				}
			});
		}
		_finalize(zip) {
			return new Promise((resolve, reject) => {
				zip.on("finish", () => {
					resolve(this);
				});
				zip.on("error", reject);
				zip.finalize();
			});
		}
		prepareModel(model, options) {
			model.creator = model.creator || "ExcelJS";
			model.lastModifiedBy = model.lastModifiedBy || "ExcelJS";
			model.created = model.created || /* @__PURE__ */ new Date();
			model.modified = model.modified || /* @__PURE__ */ new Date();
			model.useSharedStrings = options.useSharedStrings !== void 0 ? options.useSharedStrings : true;
			model.useStyles = options.useStyles !== void 0 ? options.useStyles : true;
			model.sharedStrings = new SharedStringsXform();
			model.styles = model.useStyles ? new StylesXform(true) : new StylesXform.Mock();
			const workbookXform = new WorkbookXform();
			const worksheetXform = new WorksheetXform();
			workbookXform.prepare(model);
			const worksheetOptions = {
				sharedStrings: model.sharedStrings,
				styles: model.styles,
				date1904: model.properties.date1904,
				drawingsCount: 0,
				media: model.media
			};
			worksheetOptions.drawings = model.drawings = [];
			worksheetOptions.commentRefs = model.commentRefs = [];
			let tableCount = 0;
			model.tables = [];
			model.worksheets.forEach((worksheet) => {
				worksheet.tables.forEach((table) => {
					tableCount++;
					table.target = `table${tableCount}.xml`;
					table.id = tableCount;
					model.tables.push(table);
				});
				worksheetXform.prepare(worksheet, worksheetOptions);
			});
		}
		async write(stream, options) {
			options = options || {};
			const { model } = this.workbook;
			const zip = new ZipStream.ZipWriter(options.zip);
			zip.pipe(stream);
			this.prepareModel(model, options);
			await this.addContentTypes(zip, model);
			await this.addOfficeRels(zip, model);
			await this.addWorkbookRels(zip, model);
			await this.addWorksheets(zip, model);
			await this.addSharedStrings(zip, model);
			await this.addDrawings(zip, model);
			await this.addTables(zip, model);
			await Promise.all([this.addThemes(zip, model), this.addStyles(zip, model)]);
			await this.addMedia(zip, model);
			await Promise.all([this.addApp(zip, model), this.addCore(zip, model)]);
			await this.addWorkbook(zip, model);
			return this._finalize(zip);
		}
		writeFile(filename, options) {
			const stream = fs$7.createWriteStream(filename);
			return new Promise((resolve, reject) => {
				stream.on("finish", () => {
					resolve();
				});
				stream.on("error", (error) => {
					reject(error);
				});
				this.write(stream, options).then(() => {
					stream.end();
				}).catch((err) => {
					reject(err);
				});
			});
		}
		async writeBuffer(options) {
			const stream = new StreamBuf();
			await this.write(stream, options);
			return stream.read();
		}
	};
	XLSX.RelType = require_rel_type();
	module.exports = XLSX;
}));
//#endregion
//#region node_modules/fast-csv/build/src/index.js
var require_src = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.CsvParserStream = exports.ParserOptions = exports.parseFile = exports.parseStream = exports.parseString = exports.parse = exports.FormatterOptions = exports.CsvFormatterStream = exports.writeToPath = exports.writeToString = exports.writeToBuffer = exports.writeToStream = exports.write = exports.format = void 0;
	var format_1 = require_src$1();
	Object.defineProperty(exports, "format", {
		enumerable: true,
		get: function() {
			return format_1.format;
		}
	});
	Object.defineProperty(exports, "write", {
		enumerable: true,
		get: function() {
			return format_1.write;
		}
	});
	Object.defineProperty(exports, "writeToStream", {
		enumerable: true,
		get: function() {
			return format_1.writeToStream;
		}
	});
	Object.defineProperty(exports, "writeToBuffer", {
		enumerable: true,
		get: function() {
			return format_1.writeToBuffer;
		}
	});
	Object.defineProperty(exports, "writeToString", {
		enumerable: true,
		get: function() {
			return format_1.writeToString;
		}
	});
	Object.defineProperty(exports, "writeToPath", {
		enumerable: true,
		get: function() {
			return format_1.writeToPath;
		}
	});
	Object.defineProperty(exports, "CsvFormatterStream", {
		enumerable: true,
		get: function() {
			return format_1.CsvFormatterStream;
		}
	});
	Object.defineProperty(exports, "FormatterOptions", {
		enumerable: true,
		get: function() {
			return format_1.FormatterOptions;
		}
	});
	var parse_1 = require_src$2();
	Object.defineProperty(exports, "parse", {
		enumerable: true,
		get: function() {
			return parse_1.parse;
		}
	});
	Object.defineProperty(exports, "parseString", {
		enumerable: true,
		get: function() {
			return parse_1.parseString;
		}
	});
	Object.defineProperty(exports, "parseStream", {
		enumerable: true,
		get: function() {
			return parse_1.parseStream;
		}
	});
	Object.defineProperty(exports, "parseFile", {
		enumerable: true,
		get: function() {
			return parse_1.parseFile;
		}
	});
	Object.defineProperty(exports, "ParserOptions", {
		enumerable: true,
		get: function() {
			return parse_1.ParserOptions;
		}
	});
	Object.defineProperty(exports, "CsvParserStream", {
		enumerable: true,
		get: function() {
			return parse_1.CsvParserStream;
		}
	});
}));
//#endregion
//#region node_modules/exceljs/lib/csv/csv.js
var require_csv = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var fs$6 = __require("fs");
	var fastCsv = require_src();
	var customParseFormat = require_customParseFormat();
	var utc = require_utc();
	var dayjs = require_dayjs_min().extend(customParseFormat).extend(utc);
	var StreamBuf = require_stream_buf();
	var { fs: { exists } } = require_utils();
	var SpecialValues = {
		true: true,
		false: false,
		"#N/A": { error: "#N/A" },
		"#REF!": { error: "#REF!" },
		"#NAME?": { error: "#NAME?" },
		"#DIV/0!": { error: "#DIV/0!" },
		"#NULL!": { error: "#NULL!" },
		"#VALUE!": { error: "#VALUE!" },
		"#NUM!": { error: "#NUM!" }
	};
	var CSV = class {
		constructor(workbook) {
			this.workbook = workbook;
			this.worksheet = null;
		}
		async readFile(filename, options) {
			options = options || {};
			if (!await exists(filename)) throw new Error(`File not found: ${filename}`);
			const stream = fs$6.createReadStream(filename);
			const worksheet = await this.read(stream, options);
			stream.close();
			return worksheet;
		}
		read(stream, options) {
			options = options || {};
			return new Promise((resolve, reject) => {
				const worksheet = this.workbook.addWorksheet(options.sheetName);
				const dateFormats = options.dateFormats || [
					"YYYY-MM-DD[T]HH:mm:ssZ",
					"YYYY-MM-DD[T]HH:mm:ss",
					"MM-DD-YYYY",
					"YYYY-MM-DD"
				];
				const map = options.map || function(datum) {
					if (datum === "") return null;
					const datumNumber = Number(datum);
					if (!Number.isNaN(datumNumber) && datumNumber !== Infinity) return datumNumber;
					const dt = dateFormats.reduce((matchingDate, currentDateFormat) => {
						if (matchingDate) return matchingDate;
						const dayjsObj = dayjs(datum, currentDateFormat, true);
						if (dayjsObj.isValid()) return dayjsObj;
						return null;
					}, null);
					if (dt) return new Date(dt.valueOf());
					const special = SpecialValues[datum];
					if (special !== void 0) return special;
					return datum;
				};
				const csvStream = fastCsv.parse(options.parserOptions).on("data", (data) => {
					worksheet.addRow(data.map(map));
				}).on("end", () => {
					csvStream.emit("worksheet", worksheet);
				});
				csvStream.on("worksheet", resolve).on("error", reject);
				stream.pipe(csvStream);
			});
		}
		/**
		* @deprecated since version 4.0. You should use `CSV#read` instead. Please follow upgrade instruction: https://github.com/exceljs/exceljs/blob/master/UPGRADE-4.0.md
		*/
		createInputStream() {
			throw new Error("`CSV#createInputStream` is deprecated. You should use `CSV#read` instead. This method will be removed in version 5.0. Please follow upgrade instruction: https://github.com/exceljs/exceljs/blob/master/UPGRADE-4.0.md");
		}
		write(stream, options) {
			return new Promise((resolve, reject) => {
				options = options || {};
				const worksheet = this.workbook.getWorksheet(options.sheetName || options.sheetId);
				const csvStream = fastCsv.format(options.formatterOptions);
				stream.on("finish", () => {
					resolve();
				});
				csvStream.on("error", reject);
				csvStream.pipe(stream);
				const { dateFormat, dateUTC } = options;
				const map = options.map || ((value) => {
					if (value) {
						if (value.text || value.hyperlink) return value.hyperlink || value.text || "";
						if (value.formula || value.result) return value.result || "";
						if (value instanceof Date) {
							if (dateFormat) return dateUTC ? dayjs.utc(value).format(dateFormat) : dayjs(value).format(dateFormat);
							return dateUTC ? dayjs.utc(value).format() : dayjs(value).format();
						}
						if (value.error) return value.error;
						if (typeof value === "object") return JSON.stringify(value);
					}
					return value;
				});
				const includeEmptyRows = options.includeEmptyRows === void 0 || options.includeEmptyRows;
				let lastRow = 1;
				if (worksheet) worksheet.eachRow((row, rowNumber) => {
					if (includeEmptyRows) while (lastRow++ < rowNumber - 1) csvStream.write([]);
					const { values } = row;
					values.shift();
					csvStream.write(values.map(map));
					lastRow = rowNumber;
				});
				csvStream.end();
			});
		}
		writeFile(filename, options) {
			options = options || {};
			const streamOptions = { encoding: options.encoding || "utf8" };
			const stream = fs$6.createWriteStream(filename, streamOptions);
			return this.write(stream, options);
		}
		async writeBuffer(options) {
			const stream = new StreamBuf();
			await this.write(stream, options);
			return stream.read();
		}
	};
	module.exports = CSV;
}));
//#endregion
//#region node_modules/exceljs/lib/doc/workbook.js
var require_workbook = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Worksheet = require_worksheet();
	var DefinedNames = require_defined_names();
	var XLSX = require_xlsx();
	var CSV = require_csv();
	var Workbook = class {
		constructor() {
			this.category = "";
			this.company = "";
			this.created = /* @__PURE__ */ new Date();
			this.description = "";
			this.keywords = "";
			this.manager = "";
			this.modified = this.created;
			this.properties = {};
			this.calcProperties = {};
			this._worksheets = [];
			this.subject = "";
			this.title = "";
			this.views = [];
			this.media = [];
			this._definedNames = new DefinedNames();
		}
		get xlsx() {
			if (!this._xlsx) this._xlsx = new XLSX(this);
			return this._xlsx;
		}
		get csv() {
			if (!this._csv) this._csv = new CSV(this);
			return this._csv;
		}
		get nextId() {
			for (let i = 1; i < this._worksheets.length; i++) if (!this._worksheets[i]) return i;
			return this._worksheets.length || 1;
		}
		addWorksheet(name, options) {
			const id = this.nextId;
			if (options) {
				if (typeof options === "string") {
					console.trace("tabColor argument is now deprecated. Please use workbook.addWorksheet(name, {properties: { tabColor: { argb: \"rbg value\" } }");
					options = { properties: { tabColor: { argb: options } } };
				} else if (options.argb || options.theme || options.indexed) {
					console.trace("tabColor argument is now deprecated. Please use workbook.addWorksheet(name, {properties: { tabColor: { ... } }");
					options = { properties: { tabColor: options } };
				}
			}
			const lastOrderNo = this._worksheets.reduce((acc, ws) => (ws && ws.orderNo) > acc ? ws.orderNo : acc, 0);
			const worksheet = new Worksheet(Object.assign({}, options, {
				id,
				name,
				orderNo: lastOrderNo + 1,
				workbook: this
			}));
			this._worksheets[id] = worksheet;
			return worksheet;
		}
		removeWorksheetEx(worksheet) {
			delete this._worksheets[worksheet.id];
		}
		removeWorksheet(id) {
			const worksheet = this.getWorksheet(id);
			if (worksheet) worksheet.destroy();
		}
		getWorksheet(id) {
			if (id === void 0) return this._worksheets.find(Boolean);
			if (typeof id === "number") return this._worksheets[id];
			if (typeof id === "string") return this._worksheets.find((worksheet) => worksheet && worksheet.name === id);
		}
		get worksheets() {
			return this._worksheets.slice(1).sort((a, b) => a.orderNo - b.orderNo).filter(Boolean);
		}
		eachSheet(iteratee) {
			this.worksheets.forEach((sheet) => {
				iteratee(sheet, sheet.id);
			});
		}
		get definedNames() {
			return this._definedNames;
		}
		clearThemes() {
			this._themes = void 0;
		}
		addImage(image) {
			const id = this.media.length;
			this.media.push(Object.assign({}, image, { type: "image" }));
			return id;
		}
		getImage(id) {
			return this.media[id];
		}
		get model() {
			return {
				creator: this.creator || "Unknown",
				lastModifiedBy: this.lastModifiedBy || "Unknown",
				lastPrinted: this.lastPrinted,
				created: this.created,
				modified: this.modified,
				properties: this.properties,
				worksheets: this.worksheets.map((worksheet) => worksheet.model),
				sheets: this.worksheets.map((ws) => ws.model).filter(Boolean),
				definedNames: this._definedNames.model,
				views: this.views,
				company: this.company,
				manager: this.manager,
				title: this.title,
				subject: this.subject,
				keywords: this.keywords,
				category: this.category,
				description: this.description,
				language: this.language,
				revision: this.revision,
				contentStatus: this.contentStatus,
				themes: this._themes,
				media: this.media,
				calcProperties: this.calcProperties
			};
		}
		set model(value) {
			this.creator = value.creator;
			this.lastModifiedBy = value.lastModifiedBy;
			this.lastPrinted = value.lastPrinted;
			this.created = value.created;
			this.modified = value.modified;
			this.company = value.company;
			this.manager = value.manager;
			this.title = value.title;
			this.subject = value.subject;
			this.keywords = value.keywords;
			this.category = value.category;
			this.description = value.description;
			this.language = value.language;
			this.revision = value.revision;
			this.contentStatus = value.contentStatus;
			this.properties = value.properties;
			this.calcProperties = value.calcProperties;
			this._worksheets = [];
			value.worksheets.forEach((worksheetModel) => {
				const { id, name, state } = worksheetModel;
				const orderNo = value.sheets && value.sheets.findIndex((ws) => ws.id === id);
				const worksheet = this._worksheets[id] = new Worksheet({
					id,
					name,
					orderNo,
					state,
					workbook: this
				});
				worksheet.model = worksheetModel;
			});
			this._definedNames.model = value.definedNames;
			this.views = value.views;
			this._themes = value.themes;
			this.media = value.media || [];
		}
	};
	module.exports = Workbook;
}));
//#endregion
//#region node_modules/exceljs/lib/doc/modelcontainer.js
var require_modelcontainer = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var XLSX = require_xlsx();
	var ModelContainer = class {
		constructor(model) {
			this.model = model;
		}
		get xlsx() {
			if (!this._xlsx) this._xlsx = new XLSX(this);
			return this._xlsx;
		}
	};
	module.exports = ModelContainer;
}));
//#endregion
//#region node_modules/exceljs/lib/utils/shared-strings.js
var require_shared_strings = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var SharedStrings = class {
		constructor() {
			this._values = [];
			this._totalRefs = 0;
			this._hash = Object.create(null);
		}
		get count() {
			return this._values.length;
		}
		get values() {
			return this._values;
		}
		get totalRefs() {
			return this._totalRefs;
		}
		getString(index) {
			return this._values[index];
		}
		add(value) {
			let index = this._hash[value];
			if (index === void 0) {
				index = this._hash[value] = this._values.length;
				this._values.push(value);
			}
			this._totalRefs++;
			return index;
		}
	};
	module.exports = SharedStrings;
}));
//#endregion
//#region node_modules/exceljs/lib/stream/xlsx/sheet-rels-writer.js
var require_sheet_rels_writer = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var utils = require_utils();
	var RelType = require_rel_type();
	var HyperlinksProxy = class {
		constructor(sheetRelsWriter) {
			this.writer = sheetRelsWriter;
		}
		push(hyperlink) {
			this.writer.addHyperlink(hyperlink);
		}
	};
	var SheetRelsWriter = class {
		constructor(options) {
			this.id = options.id;
			this.count = 0;
			this._hyperlinks = [];
			this._workbook = options.workbook;
		}
		get stream() {
			if (!this._stream) this._stream = this._workbook._openStream(`/xl/worksheets/_rels/sheet${this.id}.xml.rels`);
			return this._stream;
		}
		get length() {
			return this._hyperlinks.length;
		}
		each(fn) {
			return this._hyperlinks.forEach(fn);
		}
		get hyperlinksProxy() {
			return this._hyperlinksProxy || (this._hyperlinksProxy = new HyperlinksProxy(this));
		}
		addHyperlink(hyperlink) {
			const relationship = {
				Target: hyperlink.target,
				Type: RelType.Hyperlink,
				TargetMode: "External"
			};
			const rId = this._writeRelationship(relationship);
			this._hyperlinks.push({
				rId,
				address: hyperlink.address
			});
		}
		addMedia(media) {
			return this._writeRelationship(media);
		}
		addRelationship(rel) {
			return this._writeRelationship(rel);
		}
		commit() {
			if (this.count) {
				this._writeClose();
				this.stream.end();
			}
		}
		_writeOpen() {
			this.stream.write(`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
       <Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">`);
		}
		_writeRelationship(relationship) {
			if (!this.count) this._writeOpen();
			const rId = `rId${++this.count}`;
			if (relationship.TargetMode) this.stream.write(`<Relationship Id="${rId}" Type="${relationship.Type}" Target="${utils.xmlEncode(relationship.Target)}" TargetMode="${relationship.TargetMode}"/>`);
			else this.stream.write(`<Relationship Id="${rId}" Type="${relationship.Type}" Target="${relationship.Target}"/>`);
			return rId;
		}
		_writeClose() {
			this.stream.write("</Relationships>");
		}
	};
	module.exports = SheetRelsWriter;
}));
//#endregion
//#region node_modules/exceljs/lib/stream/xlsx/sheet-comments-writer.js
var require_sheet_comments_writer = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var XmlStream = require_xml_stream();
	var RelType = require_rel_type();
	var colCache = require_col_cache();
	var CommentXform = require_comment_xform();
	var VmlShapeXform = require_vml_shape_xform();
	var SheetCommentsWriter = class {
		constructor(worksheet, sheetRelsWriter, options) {
			this.id = options.id;
			this.count = 0;
			this._worksheet = worksheet;
			this._workbook = options.workbook;
			this._sheetRelsWriter = sheetRelsWriter;
		}
		get commentsStream() {
			if (!this._commentsStream) this._commentsStream = this._workbook._openStream(`/xl/comments${this.id}.xml`);
			return this._commentsStream;
		}
		get vmlStream() {
			if (!this._vmlStream) this._vmlStream = this._workbook._openStream(`xl/drawings/vmlDrawing${this.id}.vml`);
			return this._vmlStream;
		}
		_addRelationships() {
			const commentRel = {
				Type: RelType.Comments,
				Target: `../comments${this.id}.xml`
			};
			this._sheetRelsWriter.addRelationship(commentRel);
			const vmlDrawingRel = {
				Type: RelType.VmlDrawing,
				Target: `../drawings/vmlDrawing${this.id}.vml`
			};
			this.vmlRelId = this._sheetRelsWriter.addRelationship(vmlDrawingRel);
		}
		_addCommentRefs() {
			this._workbook.commentRefs.push({
				commentName: `comments${this.id}`,
				vmlDrawing: `vmlDrawing${this.id}`
			});
		}
		_writeOpen() {
			this.commentsStream.write("<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><comments xmlns=\"http://schemas.openxmlformats.org/spreadsheetml/2006/main\"><authors><author>Author</author></authors><commentList>");
			this.vmlStream.write("<?xml version=\"1.0\" encoding=\"UTF-8\"?><xml xmlns:o=\"urn:schemas-microsoft-com:office:office\" xmlns:v=\"urn:schemas-microsoft-com:vml\" xmlns:x=\"urn:schemas-microsoft-com:office:excel\"><o:shapelayout v:ext=\"edit\"><o:idmap v:ext=\"edit\" data=\"1\" /></o:shapelayout><v:shapetype id=\"_x0000_t202\" coordsize=\"21600,21600\" o:spt=\"202\" path=\"m,l,21600r21600,l21600,xe\"><v:stroke joinstyle=\"miter\" /><v:path gradientshapeok=\"t\" o:connecttype=\"rect\" /></v:shapetype>");
		}
		_writeComment(comment, index) {
			const commentXform = new CommentXform();
			const commentsXmlStream = new XmlStream();
			commentXform.render(commentsXmlStream, comment);
			this.commentsStream.write(commentsXmlStream.xml);
			const vmlShapeXform = new VmlShapeXform();
			const vmlXmlStream = new XmlStream();
			vmlShapeXform.render(vmlXmlStream, comment, index);
			this.vmlStream.write(vmlXmlStream.xml);
		}
		_writeClose() {
			this.commentsStream.write("</commentList></comments>");
			this.vmlStream.write("</xml>");
		}
		addComments(comments) {
			if (comments && comments.length) {
				if (!this.startedData) {
					this._worksheet.comments = [];
					this._writeOpen();
					this._addRelationships();
					this._addCommentRefs();
					this.startedData = true;
				}
				comments.forEach((item) => {
					item.refAddress = colCache.decodeAddress(item.ref);
				});
				comments.forEach((comment) => {
					this._writeComment(comment, this.count);
					this.count += 1;
				});
			}
		}
		commit() {
			if (this.count) {
				this._writeClose();
				this.commentsStream.end();
				this.vmlStream.end();
			}
		}
	};
	module.exports = SheetCommentsWriter;
}));
//#endregion
//#region node_modules/exceljs/lib/stream/xlsx/worksheet-writer.js
var require_worksheet_writer = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var _ = require_under_dash();
	var RelType = require_rel_type();
	var colCache = require_col_cache();
	var Encryptor = require_encryptor();
	var Dimensions = require_range();
	var StringBuf = require_string_buf();
	var Row = require_row();
	var Column = require_column();
	var SheetRelsWriter = require_sheet_rels_writer();
	var SheetCommentsWriter = require_sheet_comments_writer();
	var DataValidations = require_data_validations();
	var xmlBuffer = new StringBuf();
	var ListXform = require_list_xform();
	var DataValidationsXform = require_data_validations_xform();
	var SheetPropertiesXform = require_sheet_properties_xform();
	var SheetFormatPropertiesXform = require_sheet_format_properties_xform();
	var ColXform = require_col_xform();
	var RowXform = require_row_xform();
	var HyperlinkXform = require_hyperlink_xform();
	var SheetViewXform = require_sheet_view_xform();
	var SheetProtectionXform = require_sheet_protection_xform();
	var PageMarginsXform = require_page_margins_xform();
	var PageSetupXform = require_page_setup_xform();
	var AutoFilterXform = require_auto_filter_xform$1();
	var PictureXform = require_picture_xform();
	var ConditionalFormattingsXform = require_conditional_formattings_xform();
	var HeaderFooterXform = require_header_footer_xform();
	var RowBreaksXform = require_row_breaks_xform();
	var xform = {
		dataValidations: new DataValidationsXform(),
		sheetProperties: new SheetPropertiesXform(),
		sheetFormatProperties: new SheetFormatPropertiesXform(),
		columns: new ListXform({
			tag: "cols",
			length: false,
			childXform: new ColXform()
		}),
		row: new RowXform(),
		hyperlinks: new ListXform({
			tag: "hyperlinks",
			length: false,
			childXform: new HyperlinkXform()
		}),
		sheetViews: new ListXform({
			tag: "sheetViews",
			length: false,
			childXform: new SheetViewXform()
		}),
		sheetProtection: new SheetProtectionXform(),
		pageMargins: new PageMarginsXform(),
		pageSeteup: new PageSetupXform(),
		autoFilter: new AutoFilterXform(),
		picture: new PictureXform(),
		conditionalFormattings: new ConditionalFormattingsXform(),
		headerFooter: new HeaderFooterXform(),
		rowBreaks: new RowBreaksXform()
	};
	var WorksheetWriter = class {
		constructor(options) {
			this.id = options.id;
			this.name = options.name || `Sheet${this.id}`;
			this.state = options.state || "visible";
			this._rows = [];
			this._columns = null;
			this._keys = {};
			this._merges = [];
			this._merges.add = function() {};
			this._sheetRelsWriter = new SheetRelsWriter(options);
			this._sheetCommentsWriter = new SheetCommentsWriter(this, this._sheetRelsWriter, options);
			this._dimensions = new Dimensions();
			this._rowZero = 1;
			this.committed = false;
			this.dataValidations = new DataValidations();
			this._formulae = {};
			this._siFormulae = 0;
			this.conditionalFormatting = [];
			this.rowBreaks = [];
			this.properties = Object.assign({}, {
				defaultRowHeight: 15,
				dyDescent: 55,
				outlineLevelCol: 0,
				outlineLevelRow: 0
			}, options.properties);
			this.headerFooter = Object.assign({}, {
				differentFirst: false,
				differentOddEven: false,
				oddHeader: null,
				oddFooter: null,
				evenHeader: null,
				evenFooter: null,
				firstHeader: null,
				firstFooter: null
			}, options.headerFooter);
			this.pageSetup = Object.assign({}, {
				margins: {
					left: .7,
					right: .7,
					top: .75,
					bottom: .75,
					header: .3,
					footer: .3
				},
				orientation: "portrait",
				horizontalDpi: 4294967295,
				verticalDpi: 4294967295,
				fitToPage: !!(options.pageSetup && (options.pageSetup.fitToWidth || options.pageSetup.fitToHeight) && !options.pageSetup.scale),
				pageOrder: "downThenOver",
				blackAndWhite: false,
				draft: false,
				cellComments: "None",
				errors: "displayed",
				scale: 100,
				fitToWidth: 1,
				fitToHeight: 1,
				paperSize: void 0,
				showRowColHeaders: false,
				showGridLines: false,
				horizontalCentered: false,
				verticalCentered: false,
				rowBreaks: null,
				colBreaks: null
			}, options.pageSetup);
			this.useSharedStrings = options.useSharedStrings || false;
			this._workbook = options.workbook;
			this.hasComments = false;
			this._views = options.views || [];
			this.autoFilter = options.autoFilter || null;
			this._media = [];
			this.sheetProtection = null;
			this._writeOpenWorksheet();
			this.startedData = false;
		}
		get workbook() {
			return this._workbook;
		}
		get stream() {
			if (!this._stream) {
				this._stream = this._workbook._openStream(`/xl/worksheets/sheet${this.id}.xml`);
				this._stream.pause();
			}
			return this._stream;
		}
		destroy() {
			throw new Error("Invalid Operation: destroy");
		}
		commit() {
			if (this.committed) return;
			this._rows.forEach((cRow) => {
				if (cRow) this._writeRow(cRow);
			});
			this._rows = null;
			if (!this.startedData) this._writeOpenSheetData();
			this._writeCloseSheetData();
			this._writeAutoFilter();
			this._writeMergeCells();
			this._writeHyperlinks();
			this._writeConditionalFormatting();
			this._writeDataValidations();
			this._writeSheetProtection();
			this._writePageMargins();
			this._writePageSetup();
			this._writeBackground();
			this._writeHeaderFooter();
			this._writeRowBreaks();
			this._writeLegacyData();
			this._writeCloseWorksheet();
			this.stream.end();
			this._sheetCommentsWriter.commit();
			this._sheetRelsWriter.commit();
			this.committed = true;
		}
		get dimensions() {
			return this._dimensions;
		}
		get views() {
			return this._views;
		}
		get columns() {
			return this._columns;
		}
		set columns(value) {
			this._headerRowCount = value.reduce((pv, cv) => {
				const headerCount = cv.header && 1 || cv.headers && cv.headers.length || 0;
				return Math.max(pv, headerCount);
			}, 0);
			let count = 1;
			const columns = this._columns = [];
			value.forEach((defn) => {
				const column = new Column(this, count++, false);
				columns.push(column);
				column.defn = defn;
			});
		}
		getColumnKey(key) {
			return this._keys[key];
		}
		setColumnKey(key, value) {
			this._keys[key] = value;
		}
		deleteColumnKey(key) {
			delete this._keys[key];
		}
		eachColumnKey(f) {
			_.each(this._keys, f);
		}
		getColumn(c) {
			if (typeof c === "string") {
				const col = this._keys[c];
				if (col) return col;
				c = colCache.l2n(c);
			}
			if (!this._columns) this._columns = [];
			if (c > this._columns.length) {
				let n = this._columns.length + 1;
				while (n <= c) this._columns.push(new Column(this, n++));
			}
			return this._columns[c - 1];
		}
		get _nextRow() {
			return this._rowZero + this._rows.length;
		}
		eachRow(options, iteratee) {
			if (!iteratee) {
				iteratee = options;
				options = void 0;
			}
			if (options && options.includeEmpty) {
				const n = this._nextRow;
				for (let i = this._rowZero; i < n; i++) iteratee(this.getRow(i), i);
			} else this._rows.forEach((row) => {
				if (row.hasValues) iteratee(row, row.number);
			});
		}
		_commitRow(cRow) {
			let found = false;
			while (this._rows.length && !found) {
				const row = this._rows.shift();
				this._rowZero++;
				if (row) {
					this._writeRow(row);
					found = row.number === cRow.number;
					this._rowZero = row.number + 1;
				}
			}
		}
		get lastRow() {
			if (this._rows.length) return this._rows[this._rows.length - 1];
		}
		findRow(rowNumber) {
			const index = rowNumber - this._rowZero;
			return this._rows[index];
		}
		getRow(rowNumber) {
			const index = rowNumber - this._rowZero;
			if (index < 0) throw new Error("Out of bounds: this row has been committed");
			let row = this._rows[index];
			if (!row) this._rows[index] = row = new Row(this, rowNumber);
			return row;
		}
		addRow(value) {
			const row = new Row(this, this._nextRow);
			this._rows[row.number - this._rowZero] = row;
			row.values = value;
			return row;
		}
		findCell(r, c) {
			const address = colCache.getAddress(r, c);
			const row = this.findRow(address.row);
			return row ? row.findCell(address.column) : void 0;
		}
		getCell(r, c) {
			const address = colCache.getAddress(r, c);
			return this.getRow(address.row).getCellEx(address);
		}
		mergeCells(...cells) {
			const dimensions = new Dimensions(cells);
			this._merges.forEach((merge) => {
				if (merge.intersects(dimensions)) throw new Error("Cannot merge already merged cells");
			});
			const master = this.getCell(dimensions.top, dimensions.left);
			for (let i = dimensions.top; i <= dimensions.bottom; i++) for (let j = dimensions.left; j <= dimensions.right; j++) if (i > dimensions.top || j > dimensions.left) this.getCell(i, j).merge(master);
			this._merges.push(dimensions);
		}
		addConditionalFormatting(cf) {
			this.conditionalFormatting.push(cf);
		}
		removeConditionalFormatting(filter) {
			if (typeof filter === "number") this.conditionalFormatting.splice(filter, 1);
			else if (filter instanceof Function) this.conditionalFormatting = this.conditionalFormatting.filter(filter);
			else this.conditionalFormatting = [];
		}
		addBackgroundImage(imageId) {
			this._background = { imageId };
		}
		getBackgroundImageId() {
			return this._background && this._background.imageId;
		}
		protect(password, options) {
			return new Promise((resolve) => {
				this.sheetProtection = { sheet: true };
				if (options && "spinCount" in options) options.spinCount = Number.isFinite(options.spinCount) ? Math.round(Math.max(0, options.spinCount)) : 1e5;
				if (password) {
					this.sheetProtection.algorithmName = "SHA-512";
					this.sheetProtection.saltValue = Encryptor.randomBytes(16).toString("base64");
					this.sheetProtection.spinCount = options && "spinCount" in options ? options.spinCount : 1e5;
					this.sheetProtection.hashValue = Encryptor.convertPasswordToHash(password, "SHA512", this.sheetProtection.saltValue, this.sheetProtection.spinCount);
				}
				if (options) {
					this.sheetProtection = Object.assign(this.sheetProtection, options);
					if (!password && "spinCount" in options) delete this.sheetProtection.spinCount;
				}
				resolve();
			});
		}
		unprotect() {
			this.sheetProtection = null;
		}
		_write(text) {
			xmlBuffer.reset();
			xmlBuffer.addText(text);
			this.stream.write(xmlBuffer);
		}
		_writeSheetProperties(xmlBuf, properties, pageSetup) {
			const sheetPropertiesModel = {
				outlineProperties: properties && properties.outlineProperties,
				tabColor: properties && properties.tabColor,
				pageSetup: pageSetup && pageSetup.fitToPage ? { fitToPage: pageSetup.fitToPage } : void 0
			};
			xmlBuf.addText(xform.sheetProperties.toXml(sheetPropertiesModel));
		}
		_writeSheetFormatProperties(xmlBuf, properties) {
			const sheetFormatPropertiesModel = properties ? {
				defaultRowHeight: properties.defaultRowHeight,
				dyDescent: properties.dyDescent,
				outlineLevelCol: properties.outlineLevelCol,
				outlineLevelRow: properties.outlineLevelRow
			} : void 0;
			if (properties.defaultColWidth) sheetFormatPropertiesModel.defaultColWidth = properties.defaultColWidth;
			xmlBuf.addText(xform.sheetFormatProperties.toXml(sheetFormatPropertiesModel));
		}
		_writeOpenWorksheet() {
			xmlBuffer.reset();
			xmlBuffer.addText("<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>");
			xmlBuffer.addText("<worksheet xmlns=\"http://schemas.openxmlformats.org/spreadsheetml/2006/main\" xmlns:r=\"http://schemas.openxmlformats.org/officeDocument/2006/relationships\" xmlns:mc=\"http://schemas.openxmlformats.org/markup-compatibility/2006\" mc:Ignorable=\"x14ac\" xmlns:x14ac=\"http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac\">");
			this._writeSheetProperties(xmlBuffer, this.properties, this.pageSetup);
			xmlBuffer.addText(xform.sheetViews.toXml(this.views));
			this._writeSheetFormatProperties(xmlBuffer, this.properties);
			this.stream.write(xmlBuffer);
		}
		_writeColumns() {
			const cols = Column.toModel(this.columns);
			if (cols) {
				xform.columns.prepare(cols, { styles: this._workbook.styles });
				this.stream.write(xform.columns.toXml(cols));
			}
		}
		_writeOpenSheetData() {
			this._write("<sheetData>");
		}
		_writeRow(row) {
			if (!this.startedData) {
				this._writeColumns();
				this._writeOpenSheetData();
				this.startedData = true;
			}
			if (row.hasValues || row.height) {
				const { model } = row;
				const options = {
					styles: this._workbook.styles,
					sharedStrings: this.useSharedStrings ? this._workbook.sharedStrings : void 0,
					hyperlinks: this._sheetRelsWriter.hyperlinksProxy,
					merges: this._merges,
					formulae: this._formulae,
					siFormulae: this._siFormulae,
					comments: []
				};
				xform.row.prepare(model, options);
				this.stream.write(xform.row.toXml(model));
				if (options.comments.length) {
					this.hasComments = true;
					this._sheetCommentsWriter.addComments(options.comments);
				}
			}
		}
		_writeCloseSheetData() {
			this._write("</sheetData>");
		}
		_writeMergeCells() {
			if (this._merges.length) {
				xmlBuffer.reset();
				xmlBuffer.addText(`<mergeCells count="${this._merges.length}">`);
				this._merges.forEach((merge) => {
					xmlBuffer.addText(`<mergeCell ref="${merge}"/>`);
				});
				xmlBuffer.addText("</mergeCells>");
				this.stream.write(xmlBuffer);
			}
		}
		_writeHyperlinks() {
			this.stream.write(xform.hyperlinks.toXml(this._sheetRelsWriter._hyperlinks));
		}
		_writeConditionalFormatting() {
			const options = { styles: this._workbook.styles };
			xform.conditionalFormattings.prepare(this.conditionalFormatting, options);
			this.stream.write(xform.conditionalFormattings.toXml(this.conditionalFormatting));
		}
		_writeRowBreaks() {
			this.stream.write(xform.rowBreaks.toXml(this.rowBreaks));
		}
		_writeDataValidations() {
			this.stream.write(xform.dataValidations.toXml(this.dataValidations.model));
		}
		_writeSheetProtection() {
			this.stream.write(xform.sheetProtection.toXml(this.sheetProtection));
		}
		_writePageMargins() {
			this.stream.write(xform.pageMargins.toXml(this.pageSetup.margins));
		}
		_writePageSetup() {
			this.stream.write(xform.pageSeteup.toXml(this.pageSetup));
		}
		_writeHeaderFooter() {
			this.stream.write(xform.headerFooter.toXml(this.headerFooter));
		}
		_writeAutoFilter() {
			this.stream.write(xform.autoFilter.toXml(this.autoFilter));
		}
		_writeBackground() {
			if (this._background) {
				if (this._background.imageId !== void 0) {
					const image = this._workbook.getImage(this._background.imageId);
					const pictureId = this._sheetRelsWriter.addMedia({
						Target: `../media/${image.name}`,
						Type: RelType.Image
					});
					this._background = {
						...this._background,
						rId: pictureId
					};
				}
				this.stream.write(xform.picture.toXml({ rId: this._background.rId }));
			}
		}
		_writeLegacyData() {
			if (this.hasComments) {
				xmlBuffer.reset();
				xmlBuffer.addText(`<legacyDrawing r:id="${this._sheetCommentsWriter.vmlRelId}"/>`);
				this.stream.write(xmlBuffer);
			}
		}
		_writeDimensions() {}
		_writeCloseWorksheet() {
			this._write("</worksheet>");
		}
	};
	module.exports = WorksheetWriter;
}));
//#endregion
//#region node_modules/exceljs/lib/stream/xlsx/workbook-writer.js
var require_workbook_writer = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var fs$5 = __require("fs");
	var Archiver = require_archiver();
	var StreamBuf = require_stream_buf();
	var RelType = require_rel_type();
	var StylesXform = require_styles_xform();
	var SharedStrings = require_shared_strings();
	var DefinedNames = require_defined_names();
	var CoreXform = require_core_xform();
	var RelationshipsXform = require_relationships_xform();
	var ContentTypesXform = require_content_types_xform();
	var AppXform = require_app_xform();
	var WorkbookXform = require_workbook_xform();
	var SharedStringsXform = require_shared_strings_xform();
	var WorksheetWriter = require_worksheet_writer();
	var theme1Xml = require_theme1();
	var WorkbookWriter = class {
		constructor(options) {
			options = options || {};
			this.created = options.created || /* @__PURE__ */ new Date();
			this.modified = options.modified || this.created;
			this.creator = options.creator || "ExcelJS";
			this.lastModifiedBy = options.lastModifiedBy || "ExcelJS";
			this.lastPrinted = options.lastPrinted;
			this.useSharedStrings = options.useSharedStrings || false;
			this.sharedStrings = new SharedStrings();
			this.styles = options.useStyles ? new StylesXform(true) : new StylesXform.Mock(true);
			this._definedNames = new DefinedNames();
			this._worksheets = [];
			this.views = [];
			this.zipOptions = options.zip;
			this.media = [];
			this.commentRefs = [];
			this.zip = Archiver("zip", this.zipOptions);
			if (options.stream) this.stream = options.stream;
			else if (options.filename) this.stream = fs$5.createWriteStream(options.filename);
			else this.stream = new StreamBuf();
			this.zip.pipe(this.stream);
			this.promise = Promise.all([this.addThemes(), this.addOfficeRels()]);
		}
		get definedNames() {
			return this._definedNames;
		}
		_openStream(path) {
			const stream = new StreamBuf({
				bufSize: 65536,
				batch: true
			});
			this.zip.append(stream, { name: path });
			stream.on("finish", () => {
				stream.emit("zipped");
			});
			return stream;
		}
		_commitWorksheets() {
			const commitWorksheet = function(worksheet) {
				if (!worksheet.committed) return new Promise((resolve) => {
					worksheet.stream.on("zipped", () => {
						resolve();
					});
					worksheet.commit();
				});
				return Promise.resolve();
			};
			const promises = this._worksheets.map(commitWorksheet);
			if (promises.length) return Promise.all(promises);
			return Promise.resolve();
		}
		async commit() {
			await this.promise;
			await this.addMedia();
			await this._commitWorksheets();
			await Promise.all([
				this.addContentTypes(),
				this.addApp(),
				this.addCore(),
				this.addSharedStrings(),
				this.addStyles(),
				this.addWorkbookRels()
			]);
			await this.addWorkbook();
			return this._finalize();
		}
		get nextId() {
			let i = 1;
			for (; i < this._worksheets.length; i++) if (!this._worksheets[i]) return i;
			return this._worksheets.length || 1;
		}
		addImage(image) {
			const id = this.media.length;
			const medium = Object.assign({}, image, {
				type: "image",
				name: `image${id}.${image.extension}`
			});
			this.media.push(medium);
			return id;
		}
		getImage(id) {
			return this.media[id];
		}
		addWorksheet(name, options) {
			options = options || {};
			const useSharedStrings = options.useSharedStrings !== void 0 ? options.useSharedStrings : this.useSharedStrings;
			if (options.tabColor) {
				console.trace("tabColor option has moved to { properties: tabColor: {...} }");
				options.properties = Object.assign({ tabColor: options.tabColor }, options.properties);
			}
			const id = this.nextId;
			name = name || `sheet${id}`;
			const worksheet = new WorksheetWriter({
				id,
				name,
				workbook: this,
				useSharedStrings,
				properties: options.properties,
				state: options.state,
				pageSetup: options.pageSetup,
				views: options.views,
				autoFilter: options.autoFilter,
				headerFooter: options.headerFooter
			});
			this._worksheets[id] = worksheet;
			return worksheet;
		}
		getWorksheet(id) {
			if (id === void 0) return this._worksheets.find(() => true);
			if (typeof id === "number") return this._worksheets[id];
			if (typeof id === "string") return this._worksheets.find((worksheet) => worksheet && worksheet.name === id);
		}
		addStyles() {
			return new Promise((resolve) => {
				this.zip.append(this.styles.xml, { name: "xl/styles.xml" });
				resolve();
			});
		}
		addThemes() {
			return new Promise((resolve) => {
				this.zip.append(theme1Xml, { name: "xl/theme/theme1.xml" });
				resolve();
			});
		}
		addOfficeRels() {
			return new Promise((resolve) => {
				const xml = new RelationshipsXform().toXml([
					{
						Id: "rId1",
						Type: RelType.OfficeDocument,
						Target: "xl/workbook.xml"
					},
					{
						Id: "rId2",
						Type: RelType.CoreProperties,
						Target: "docProps/core.xml"
					},
					{
						Id: "rId3",
						Type: RelType.ExtenderProperties,
						Target: "docProps/app.xml"
					}
				]);
				this.zip.append(xml, { name: "/_rels/.rels" });
				resolve();
			});
		}
		addContentTypes() {
			return new Promise((resolve) => {
				const model = {
					worksheets: this._worksheets.filter(Boolean),
					sharedStrings: this.sharedStrings,
					commentRefs: this.commentRefs,
					media: this.media
				};
				const xml = new ContentTypesXform().toXml(model);
				this.zip.append(xml, { name: "[Content_Types].xml" });
				resolve();
			});
		}
		addMedia() {
			return Promise.all(this.media.map((medium) => {
				if (medium.type === "image") {
					const filename = `xl/media/${medium.name}`;
					if (medium.filename) return this.zip.file(medium.filename, { name: filename });
					if (medium.buffer) return this.zip.append(medium.buffer, { name: filename });
					if (medium.base64) {
						const dataimg64 = medium.base64;
						const content = dataimg64.substring(dataimg64.indexOf(",") + 1);
						return this.zip.append(content, {
							name: filename,
							base64: true
						});
					}
				}
				throw new Error("Unsupported media");
			}));
		}
		addApp() {
			return new Promise((resolve) => {
				const model = { worksheets: this._worksheets.filter(Boolean) };
				const xml = new AppXform().toXml(model);
				this.zip.append(xml, { name: "docProps/app.xml" });
				resolve();
			});
		}
		addCore() {
			return new Promise((resolve) => {
				const xml = new CoreXform().toXml(this);
				this.zip.append(xml, { name: "docProps/core.xml" });
				resolve();
			});
		}
		addSharedStrings() {
			if (this.sharedStrings.count) return new Promise((resolve) => {
				const xml = new SharedStringsXform().toXml(this.sharedStrings);
				this.zip.append(xml, { name: "/xl/sharedStrings.xml" });
				resolve();
			});
			return Promise.resolve();
		}
		addWorkbookRels() {
			let count = 1;
			const relationships = [{
				Id: `rId${count++}`,
				Type: RelType.Styles,
				Target: "styles.xml"
			}, {
				Id: `rId${count++}`,
				Type: RelType.Theme,
				Target: "theme/theme1.xml"
			}];
			if (this.sharedStrings.count) relationships.push({
				Id: `rId${count++}`,
				Type: RelType.SharedStrings,
				Target: "sharedStrings.xml"
			});
			this._worksheets.forEach((worksheet) => {
				if (worksheet) {
					worksheet.rId = `rId${count++}`;
					relationships.push({
						Id: worksheet.rId,
						Type: RelType.Worksheet,
						Target: `worksheets/sheet${worksheet.id}.xml`
					});
				}
			});
			return new Promise((resolve) => {
				const xml = new RelationshipsXform().toXml(relationships);
				this.zip.append(xml, { name: "/xl/_rels/workbook.xml.rels" });
				resolve();
			});
		}
		addWorkbook() {
			const { zip } = this;
			const model = {
				worksheets: this._worksheets.filter(Boolean),
				definedNames: this._definedNames.model,
				views: this.views,
				properties: {},
				calcProperties: {}
			};
			return new Promise((resolve) => {
				const xform = new WorkbookXform();
				xform.prepare(model);
				zip.append(xform.toXml(model), { name: "/xl/workbook.xml" });
				resolve();
			});
		}
		_finalize() {
			return new Promise((resolve, reject) => {
				this.stream.on("error", reject);
				this.stream.on("finish", () => {
					resolve(this);
				});
				this.zip.on("error", reject);
				this.zip.finalize();
			});
		}
	};
	module.exports = WorkbookWriter;
}));
//#endregion
//#region node_modules/listenercount/index.js
var require_listenercount = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var listenerCount = __require("events").listenerCount;
	listenerCount = listenerCount || function(ee, event) {
		var listeners = ee && ee._events && ee._events[event];
		if (Array.isArray(listeners)) return listeners.length;
		else if (typeof listeners === "function") return 1;
		else return 0;
	};
	module.exports = listenerCount;
}));
//#endregion
//#region node_modules/unzipper/lib/Buffer.js
var require_Buffer = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Buffer$1 = __require("buffer").Buffer;
	if (Buffer$1.from === void 0) {
		Buffer$1.from = function(a, b, c) {
			return new Buffer$1(a, b, c);
		};
		Buffer$1.alloc = Buffer$1.from;
	}
	module.exports = Buffer$1;
}));
//#endregion
//#region node_modules/unzipper/node_modules/readable-stream/lib/internal/streams/stream.js
var require_stream = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = __require("stream");
}));
//#endregion
//#region node_modules/unzipper/node_modules/safe-buffer/index.js
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
//#region node_modules/unzipper/node_modules/readable-stream/lib/internal/streams/BufferList.js
var require_BufferList = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
	}
	var Buffer = require_safe_buffer().Buffer;
	var util$3 = __require("util");
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
	if (util$3 && util$3.inspect && util$3.inspect.custom) module.exports.prototype[util$3.inspect.custom] = function() {
		var obj = util$3.inspect({ length: this.length });
		return this.constructor.name + " " + obj;
	};
}));
//#endregion
//#region node_modules/unzipper/node_modules/readable-stream/lib/internal/streams/destroy.js
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
//#region node_modules/unzipper/node_modules/readable-stream/lib/_stream_writable.js
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
	var util = Object.create(require_util());
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
//#region node_modules/unzipper/node_modules/readable-stream/lib/_stream_duplex.js
var require__stream_duplex = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var pna = require_process_nextick_args();
	var objectKeys = Object.keys || function(obj) {
		var keys = [];
		for (var key in obj) keys.push(key);
		return keys;
	};
	module.exports = Duplex;
	var util = Object.create(require_util());
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
//#region node_modules/unzipper/node_modules/readable-stream/lib/_stream_readable.js
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
	var util = Object.create(require_util());
	util.inherits = require_inherits();
	var debugUtil = __require("util");
	var debug = void 0;
	if (debugUtil && debugUtil.debuglog) debug = debugUtil.debuglog("stream");
	else debug = function() {};
	var BufferList = require_BufferList();
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
//#region node_modules/unzipper/node_modules/readable-stream/lib/_stream_transform.js
var require__stream_transform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = Transform;
	var Duplex = require__stream_duplex();
	var util = Object.create(require_util());
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
//#region node_modules/unzipper/node_modules/readable-stream/lib/_stream_passthrough.js
var require__stream_passthrough = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = PassThrough;
	var Transform = require__stream_transform();
	var util = Object.create(require_util());
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
//#region node_modules/unzipper/node_modules/readable-stream/readable.js
var require_readable = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Stream$10 = __require("stream");
	if (process.env.READABLE_STREAM === "disable" && Stream$10) {
		module.exports = Stream$10;
		exports = module.exports = Stream$10.Readable;
		exports.Readable = Stream$10.Readable;
		exports.Writable = Stream$10.Writable;
		exports.Duplex = Stream$10.Duplex;
		exports.Transform = Stream$10.Transform;
		exports.PassThrough = Stream$10.PassThrough;
		exports.Stream = Stream$10;
	} else {
		exports = module.exports = require__stream_readable();
		exports.Stream = Stream$10 || exports;
		exports.Readable = exports;
		exports.Writable = require__stream_writable();
		exports.Duplex = require__stream_duplex();
		exports.Transform = require__stream_transform();
		exports.PassThrough = require__stream_passthrough();
	}
}));
//#endregion
//#region node_modules/unzipper/lib/PullStream.js
var require_PullStream = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Stream$9 = __require("stream");
	var Promise = require_bluebird();
	var util$2 = __require("util");
	var Buffer = require_Buffer();
	var strFunction = "function";
	if (!Stream$9.Writable || !Stream$9.Writable.prototype.destroy) Stream$9 = require_readable();
	function PullStream() {
		if (!(this instanceof PullStream)) return new PullStream();
		Stream$9.Duplex.call(this, {
			decodeStrings: false,
			objectMode: true
		});
		this.buffer = Buffer.from("");
		var self = this;
		self.on("finish", function() {
			self.finished = true;
			self.emit("chunk", false);
		});
	}
	util$2.inherits(PullStream, Stream$9.Duplex);
	PullStream.prototype._write = function(chunk, e, cb) {
		this.buffer = Buffer.concat([this.buffer, chunk]);
		this.cb = cb;
		this.emit("chunk");
	};
	PullStream.prototype.stream = function(eof, includeEof) {
		var p = Stream$9.PassThrough();
		var done, self = this;
		function cb() {
			if (typeof self.cb === strFunction) {
				var callback = self.cb;
				self.cb = void 0;
				return callback();
			}
		}
		function pull() {
			var packet;
			if (self.buffer && self.buffer.length) {
				if (typeof eof === "number") {
					packet = self.buffer.slice(0, eof);
					self.buffer = self.buffer.slice(eof);
					eof -= packet.length;
					done = !eof;
				} else {
					var match = self.buffer.indexOf(eof);
					if (match !== -1) {
						self.match = match;
						if (includeEof) match = match + eof.length;
						packet = self.buffer.slice(0, match);
						self.buffer = self.buffer.slice(match);
						done = true;
					} else {
						var len = self.buffer.length - eof.length;
						if (len <= 0) cb();
						else {
							packet = self.buffer.slice(0, len);
							self.buffer = self.buffer.slice(len);
						}
					}
				}
				if (packet) p.write(packet, function() {
					if (self.buffer.length === 0 || eof.length && self.buffer.length <= eof.length) cb();
				});
			}
			if (!done) {
				if (self.finished) {
					self.removeListener("chunk", pull);
					self.emit("error", /* @__PURE__ */ new Error("FILE_ENDED"));
					return;
				}
			} else {
				self.removeListener("chunk", pull);
				p.end();
			}
		}
		self.on("chunk", pull);
		pull();
		return p;
	};
	PullStream.prototype.pull = function(eof, includeEof) {
		if (eof === 0) return Promise.resolve("");
		if (!isNaN(eof) && this.buffer.length > eof) {
			var data = this.buffer.slice(0, eof);
			this.buffer = this.buffer.slice(eof);
			return Promise.resolve(data);
		}
		var buffer = Buffer.from(""), self = this;
		var concatStream = Stream$9.Transform();
		concatStream._transform = function(d, e, cb) {
			buffer = Buffer.concat([buffer, d]);
			cb();
		};
		var rejectHandler;
		var pullStreamRejectHandler;
		return new Promise(function(resolve, reject) {
			rejectHandler = reject;
			pullStreamRejectHandler = function(e) {
				self.__emittedError = e;
				reject(e);
			};
			if (self.finished) return reject(/* @__PURE__ */ new Error("FILE_ENDED"));
			self.once("error", pullStreamRejectHandler);
			self.stream(eof, includeEof).on("error", reject).pipe(concatStream).on("finish", function() {
				resolve(buffer);
			}).on("error", reject);
		}).finally(function() {
			self.removeListener("error", rejectHandler);
			self.removeListener("error", pullStreamRejectHandler);
		});
	};
	PullStream.prototype._read = function() {};
	module.exports = PullStream;
}));
//#endregion
//#region node_modules/unzipper/lib/NoopStream.js
var require_NoopStream = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Stream$8 = __require("stream");
	var util$1 = __require("util");
	if (!Stream$8.Writable || !Stream$8.Writable.prototype.destroy) Stream$8 = require_readable();
	function NoopStream() {
		if (!(this instanceof NoopStream)) return new NoopStream();
		Stream$8.Transform.call(this);
	}
	util$1.inherits(NoopStream, Stream$8.Transform);
	NoopStream.prototype._transform = function(d, e, cb) {
		cb();
	};
	module.exports = NoopStream;
}));
//#endregion
//#region node_modules/unzipper/lib/BufferStream.js
var require_BufferStream = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Promise = require_bluebird();
	var Stream$7 = __require("stream");
	var Buffer = require_Buffer();
	if (!Stream$7.Writable || !Stream$7.Writable.prototype.destroy) Stream$7 = require_readable();
	module.exports = function(entry) {
		return new Promise(function(resolve, reject) {
			var chunks = [];
			var bufferStream = Stream$7.Transform().on("finish", function() {
				resolve(Buffer.concat(chunks));
			}).on("error", reject);
			bufferStream._transform = function(d, e, cb) {
				chunks.push(d);
				cb();
			};
			entry.on("error", reject).pipe(bufferStream);
		});
	};
}));
//#endregion
//#region node_modules/unzipper/lib/parseExtraField.js
var require_parseExtraField = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var binary = require_binary();
	module.exports = function(extraField, vars) {
		var extra;
		while (!extra && extraField && extraField.length) {
			var candidateExtra = binary.parse(extraField).word16lu("signature").word16lu("partsize").word64lu("uncompressedSize").word64lu("compressedSize").word64lu("offset").word64lu("disknum").vars;
			if (candidateExtra.signature === 1) extra = candidateExtra;
			else extraField = extraField.slice(candidateExtra.partsize + 4);
		}
		extra = extra || {};
		if (vars.compressedSize === 4294967295) vars.compressedSize = extra.compressedSize;
		if (vars.uncompressedSize === 4294967295) vars.uncompressedSize = extra.uncompressedSize;
		if (vars.offsetToLocalFileHeader === 4294967295) vars.offsetToLocalFileHeader = extra.offset;
		return extra;
	};
}));
//#endregion
//#region node_modules/unzipper/lib/parseDateTime.js
var require_parseDateTime = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = function parseDateTime(date, time) {
		const day = date & 31;
		const month = date >> 5 & 15;
		const year = (date >> 9 & 127) + 1980;
		const seconds = time ? (time & 31) * 2 : 0;
		const minutes = time ? time >> 5 & 63 : 0;
		const hours = time ? time >> 11 : 0;
		return new Date(Date.UTC(year, month - 1, day, hours, minutes, seconds));
	};
}));
//#endregion
//#region node_modules/unzipper/lib/parse.js
var require_parse = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var util = __require("util");
	var zlib$1 = __require("zlib");
	var Stream$6 = __require("stream");
	var binary = require_binary();
	var Promise = require_bluebird();
	var PullStream = require_PullStream();
	var NoopStream = require_NoopStream();
	var BufferStream = require_BufferStream();
	var parseExtraField = require_parseExtraField();
	var Buffer = require_Buffer();
	var parseDateTime = require_parseDateTime();
	if (!Stream$6.Writable || !Stream$6.Writable.prototype.destroy) Stream$6 = require_readable();
	var endDirectorySignature = Buffer.alloc(4);
	endDirectorySignature.writeUInt32LE(101010256, 0);
	function Parse(opts) {
		if (!(this instanceof Parse)) return new Parse(opts);
		var self = this;
		self._opts = opts || { verbose: false };
		PullStream.call(self, self._opts);
		self.on("finish", function() {
			self.emit("end");
			self.emit("close");
		});
		self._readRecord().catch(function(e) {
			if (!self.__emittedError || self.__emittedError !== e) self.emit("error", e);
		});
	}
	util.inherits(Parse, PullStream);
	Parse.prototype._readRecord = function() {
		var self = this;
		return self.pull(4).then(function(data) {
			if (data.length === 0) return;
			var signature = data.readUInt32LE(0);
			if (signature === 875721283) return self._readCrxHeader();
			if (signature === 67324752) return self._readFile();
			else if (signature === 33639248) {
				self.reachedCD = true;
				return self._readCentralDirectoryFileHeader();
			} else if (signature === 101010256) return self._readEndOfCentralDirectoryRecord();
			else if (self.reachedCD) return self.pull(endDirectorySignature, true).then(function() {
				return self._readEndOfCentralDirectoryRecord();
			});
			else self.emit("error", /* @__PURE__ */ new Error("invalid signature: 0x" + signature.toString(16)));
		});
	};
	Parse.prototype._readCrxHeader = function() {
		var self = this;
		return self.pull(12).then(function(data) {
			self.crxHeader = binary.parse(data).word32lu("version").word32lu("pubKeyLength").word32lu("signatureLength").vars;
			return self.pull(self.crxHeader.pubKeyLength + self.crxHeader.signatureLength);
		}).then(function(data) {
			self.crxHeader.publicKey = data.slice(0, self.crxHeader.pubKeyLength);
			self.crxHeader.signature = data.slice(self.crxHeader.pubKeyLength);
			self.emit("crx-header", self.crxHeader);
			return self._readRecord();
		});
	};
	Parse.prototype._readFile = function() {
		var self = this;
		return self.pull(26).then(function(data) {
			var vars = binary.parse(data).word16lu("versionsNeededToExtract").word16lu("flags").word16lu("compressionMethod").word16lu("lastModifiedTime").word16lu("lastModifiedDate").word32lu("crc32").word32lu("compressedSize").word32lu("uncompressedSize").word16lu("fileNameLength").word16lu("extraFieldLength").vars;
			vars.lastModifiedDateTime = parseDateTime(vars.lastModifiedDate, vars.lastModifiedTime);
			if (self.crxHeader) vars.crxHeader = self.crxHeader;
			return self.pull(vars.fileNameLength).then(function(fileNameBuffer) {
				var fileName = fileNameBuffer.toString("utf8");
				var entry = Stream$6.PassThrough();
				var __autodraining = false;
				entry.autodrain = function() {
					__autodraining = true;
					var draining = entry.pipe(NoopStream());
					draining.promise = function() {
						return new Promise(function(resolve, reject) {
							draining.on("finish", resolve);
							draining.on("error", reject);
						});
					};
					return draining;
				};
				entry.buffer = function() {
					return BufferStream(entry);
				};
				entry.path = fileName;
				entry.props = {};
				entry.props.path = fileName;
				entry.props.pathBuffer = fileNameBuffer;
				entry.props.flags = { "isUnicode": (vars.flags & 2048) != 0 };
				entry.type = vars.uncompressedSize === 0 && /[\/\\]$/.test(fileName) ? "Directory" : "File";
				if (self._opts.verbose) {
					if (entry.type === "Directory") console.log("   creating:", fileName);
					else if (entry.type === "File") {
						if (vars.compressionMethod === 0) console.log(" extracting:", fileName);
						else console.log("  inflating:", fileName);
					}
				}
				return self.pull(vars.extraFieldLength).then(function(extraField) {
					var extra = parseExtraField(extraField, vars);
					entry.vars = vars;
					entry.extra = extra;
					if (self._opts.forceStream) self.push(entry);
					else {
						self.emit("entry", entry);
						if (self._readableState.pipesCount || self._readableState.pipes && self._readableState.pipes.length) self.push(entry);
					}
					if (self._opts.verbose) console.log({
						filename: fileName,
						vars,
						extra
					});
					var fileSizeKnown = !(vars.flags & 8) || vars.compressedSize > 0, eof;
					entry.__autodraining = __autodraining;
					var inflater = vars.compressionMethod && !__autodraining ? zlib$1.createInflateRaw() : Stream$6.PassThrough();
					if (fileSizeKnown) {
						entry.size = vars.uncompressedSize;
						eof = vars.compressedSize;
					} else {
						eof = Buffer.alloc(4);
						eof.writeUInt32LE(134695760, 0);
					}
					return new Promise(function(resolve, reject) {
						self.stream(eof).pipe(inflater).on("error", function(err) {
							self.emit("error", err);
						}).pipe(entry).on("finish", function() {
							return fileSizeKnown ? self._readRecord().then(resolve).catch(reject) : self._processDataDescriptor(entry).then(resolve).catch(reject);
						});
					});
				});
			});
		});
	};
	Parse.prototype._processDataDescriptor = function(entry) {
		var self = this;
		return self.pull(16).then(function(data) {
			entry.size = binary.parse(data).word32lu("dataDescriptorSignature").word32lu("crc32").word32lu("compressedSize").word32lu("uncompressedSize").vars.uncompressedSize;
			return self._readRecord();
		});
	};
	Parse.prototype._readCentralDirectoryFileHeader = function() {
		var self = this;
		return self.pull(42).then(function(data) {
			var vars = binary.parse(data).word16lu("versionMadeBy").word16lu("versionsNeededToExtract").word16lu("flags").word16lu("compressionMethod").word16lu("lastModifiedTime").word16lu("lastModifiedDate").word32lu("crc32").word32lu("compressedSize").word32lu("uncompressedSize").word16lu("fileNameLength").word16lu("extraFieldLength").word16lu("fileCommentLength").word16lu("diskNumber").word16lu("internalFileAttributes").word32lu("externalFileAttributes").word32lu("offsetToLocalFileHeader").vars;
			return self.pull(vars.fileNameLength).then(function(fileName) {
				vars.fileName = fileName.toString("utf8");
				return self.pull(vars.extraFieldLength);
			}).then(function(extraField) {
				return self.pull(vars.fileCommentLength);
			}).then(function(fileComment) {
				return self._readRecord();
			});
		});
	};
	Parse.prototype._readEndOfCentralDirectoryRecord = function() {
		var self = this;
		return self.pull(18).then(function(data) {
			var vars = binary.parse(data).word16lu("diskNumber").word16lu("diskStart").word16lu("numberOfRecordsOnDisk").word16lu("numberOfRecords").word32lu("sizeOfCentralDirectory").word32lu("offsetToStartOfCentralDirectory").word16lu("commentLength").vars;
			return self.pull(vars.commentLength).then(function(comment) {
				comment = comment.toString("utf8");
				self.end();
				self.push(null);
			});
		});
	};
	Parse.prototype.promise = function() {
		var self = this;
		return new Promise(function(resolve, reject) {
			self.on("finish", resolve);
			self.on("error", reject);
		});
	};
	module.exports = Parse;
}));
//#endregion
//#region node_modules/unzipper/lib/parseOne.js
var require_parseOne = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Stream$5 = __require("stream");
	var Parse = require_parse();
	var duplexer2 = require_duplexer2();
	var BufferStream = require_BufferStream();
	if (!Stream$5.Writable || !Stream$5.Writable.prototype.destroy) Stream$5 = require_readable();
	function parseOne(match, opts) {
		var inStream = Stream$5.PassThrough({ objectMode: true });
		var outStream = Stream$5.PassThrough();
		var transform = Stream$5.Transform({ objectMode: true });
		var re = match instanceof RegExp ? match : match && new RegExp(match);
		var found;
		transform._transform = function(entry, e, cb) {
			if (found || re && !re.exec(entry.path)) {
				entry.autodrain();
				return cb();
			} else {
				found = true;
				out.emit("entry", entry);
				entry.on("error", function(e) {
					outStream.emit("error", e);
				});
				entry.pipe(outStream).on("error", function(err) {
					cb(err);
				}).on("finish", function(d) {
					cb(null, d);
				});
			}
		};
		inStream.pipe(Parse(opts)).on("error", function(err) {
			outStream.emit("error", err);
		}).pipe(transform).on("error", Object).on("finish", function() {
			if (!found) outStream.emit("error", /* @__PURE__ */ new Error("PATTERN_NOT_FOUND"));
			else outStream.end();
		});
		var out = duplexer2(inStream, outStream);
		out.buffer = function() {
			return BufferStream(outStream);
		};
		return out;
	}
	module.exports = parseOne;
}));
//#endregion
//#region node_modules/fstream/lib/abstract.js
var require_abstract = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = Abstract;
	var Stream$4 = __require("stream").Stream;
	var inherits = require_inherits();
	function Abstract() {
		Stream$4.call(this);
	}
	inherits(Abstract, Stream$4);
	Abstract.prototype.on = function(ev, fn) {
		if (ev === "ready" && this.ready) process.nextTick(fn.bind(this));
		else Stream$4.prototype.on.call(this, ev, fn);
		return this;
	};
	Abstract.prototype.abort = function() {
		this._aborted = true;
		this.emit("abort");
	};
	Abstract.prototype.destroy = function() {};
	Abstract.prototype.warn = function(msg, code) {
		var self = this;
		var er = decorate(msg, code, self);
		if (!self.listeners("warn")) console.error("%s %s\npath = %s\nsyscall = %s\nfstream_type = %s\nfstream_path = %s\nfstream_unc_path = %s\nfstream_class = %s\nfstream_stack =\n%s\n", code || "UNKNOWN", er.stack, er.path, er.syscall, er.fstream_type, er.fstream_path, er.fstream_unc_path, er.fstream_class, er.fstream_stack.join("\n"));
		else self.emit("warn", er);
	};
	Abstract.prototype.info = function(msg, code) {
		this.emit("info", msg, code);
	};
	Abstract.prototype.error = function(msg, code, th) {
		var er = decorate(msg, code, this);
		if (th) throw er;
		else this.emit("error", er);
	};
	function decorate(er, code, self) {
		if (!(er instanceof Error)) er = new Error(er);
		er.code = er.code || code;
		er.path = er.path || self.path;
		er.fstream_type = er.fstream_type || self.type;
		er.fstream_path = er.fstream_path || self.path;
		if (self._path !== self.path) er.fstream_unc_path = er.fstream_unc_path || self._path;
		if (self.linkpath) er.fstream_linkpath = er.fstream_linkpath || self.linkpath;
		er.fstream_class = er.fstream_class || self.constructor.name;
		er.fstream_stack = er.fstream_stack || (/* @__PURE__ */ new Error()).stack.split(/\n/).slice(3).map(function(s) {
			return s.replace(/^ {4}at /, "");
		});
		return er;
	}
}));
//#endregion
//#region node_modules/fstream/lib/get-type.js
var require_get_type = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = getType;
	function getType(st) {
		var types = [
			"Directory",
			"File",
			"SymbolicLink",
			"Link",
			"BlockDevice",
			"CharacterDevice",
			"FIFO",
			"Socket"
		];
		var type;
		if (st.type && types.indexOf(st.type) !== -1) {
			st[st.type] = true;
			return st.type;
		}
		for (var i = 0, l = types.length; i < l; i++) {
			type = types[i];
			var is = st[type] || st["is" + type];
			if (typeof is === "function") is = is.call(st);
			if (is) {
				st[type] = true;
				st.type = type;
				return type;
			}
		}
		return null;
	}
}));
//#endregion
//#region node_modules/fstream/lib/link-reader.js
var require_link_reader = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = LinkReader;
	var fs = require_graceful_fs();
	var inherits = require_inherits();
	var Reader = require_reader();
	inherits(LinkReader, Reader);
	function LinkReader(props) {
		var self = this;
		if (!(self instanceof LinkReader)) throw new Error("LinkReader must be called as constructor.");
		if (!(props.type === "Link" && props.Link || props.type === "SymbolicLink" && props.SymbolicLink)) throw new Error("Non-link type " + props.type);
		Reader.call(self, props);
	}
	LinkReader.prototype._stat = function(currentStat) {
		var self = this;
		fs.readlink(self._path, function(er, linkpath) {
			if (er) return self.error(er);
			self.linkpath = self.props.linkpath = linkpath;
			self.emit("linkpath", linkpath);
			Reader.prototype._stat.call(self, currentStat);
		});
	};
	LinkReader.prototype._read = function() {
		var self = this;
		if (self._paused) return;
		if (!self._ended) {
			self.emit("end");
			self.emit("close");
			self._ended = true;
		}
	};
}));
//#endregion
//#region node_modules/fstream/lib/dir-reader.js
var require_dir_reader = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = DirReader;
	var fs = require_graceful_fs();
	var inherits = require_inherits();
	var path$9 = __require("path");
	var Reader = require_reader();
	var assert$1 = __require("assert").ok;
	inherits(DirReader, Reader);
	function DirReader(props) {
		var self = this;
		if (!(self instanceof DirReader)) throw new Error("DirReader must be called as constructor.");
		if (props.type !== "Directory" || !props.Directory) throw new Error("Non-directory type " + props.type);
		self.entries = null;
		self._index = -1;
		self._paused = false;
		self._length = -1;
		if (props.sort) this.sort = props.sort;
		Reader.call(this, props);
	}
	DirReader.prototype._getEntries = function() {
		var self = this;
		if (self._gotEntries) return;
		self._gotEntries = true;
		fs.readdir(self._path, function(er, entries) {
			if (er) return self.error(er);
			self.entries = entries;
			self.emit("entries", entries);
			if (self._paused) self.once("resume", processEntries);
			else processEntries();
			function processEntries() {
				self._length = self.entries.length;
				if (typeof self.sort === "function") self.entries = self.entries.sort(self.sort.bind(self));
				self._read();
			}
		});
	};
	DirReader.prototype._read = function() {
		var self = this;
		if (!self.entries) return self._getEntries();
		if (self._paused || self._currentEntry || self._aborted) return;
		self._index++;
		if (self._index >= self.entries.length) {
			if (!self._ended) {
				self._ended = true;
				self.emit("end");
				self.emit("close");
			}
			return;
		}
		var p = path$9.resolve(self._path, self.entries[self._index]);
		assert$1(p !== self._path);
		assert$1(self.entries[self._index]);
		self._currentEntry = p;
		fs[self.props.follow ? "stat" : "lstat"](p, function(er, stat) {
			if (er) return self.error(er);
			var who = self._proxy || self;
			stat.path = p;
			stat.basename = path$9.basename(p);
			stat.dirname = path$9.dirname(p);
			var childProps = self.getChildProps.call(who, stat);
			childProps.path = p;
			childProps.basename = path$9.basename(p);
			childProps.dirname = path$9.dirname(p);
			var entry = Reader(childProps, stat);
			self._currentEntry = entry;
			entry.on("pause", function(who) {
				if (!self._paused && !entry._disowned) self.pause(who);
			});
			entry.on("resume", function(who) {
				if (self._paused && !entry._disowned) self.resume(who);
			});
			entry.on("stat", function(props) {
				self.emit("_entryStat", entry, props);
				if (entry._aborted) return;
				if (entry._paused) entry.once("resume", function() {
					self.emit("entryStat", entry, props);
				});
				else self.emit("entryStat", entry, props);
			});
			entry.on("ready", function EMITCHILD() {
				if (self._paused) {
					entry.pause(self);
					return self.once("resume", EMITCHILD);
				}
				if (entry.type === "Socket") self.emit("socket", entry);
				else self.emitEntry(entry);
			});
			var ended = false;
			entry.on("close", onend);
			entry.on("disown", onend);
			function onend() {
				if (ended) return;
				ended = true;
				self.emit("childEnd", entry);
				self.emit("entryEnd", entry);
				self._currentEntry = null;
				if (!self._paused) self._read();
			}
			entry.on("error", function(er) {
				if (entry._swallowErrors) {
					self.warn(er);
					entry.emit("end");
					entry.emit("close");
				} else self.emit("error", er);
			});
			[
				"child",
				"childEnd",
				"warn"
			].forEach(function(ev) {
				entry.on(ev, self.emit.bind(self, ev));
			});
		});
	};
	DirReader.prototype.disown = function(entry) {
		entry.emit("beforeDisown");
		entry._disowned = true;
		entry.parent = entry.root = null;
		if (entry === this._currentEntry) this._currentEntry = null;
		entry.emit("disown");
	};
	DirReader.prototype.getChildProps = function() {
		return {
			depth: this.depth + 1,
			root: this.root || this,
			parent: this,
			follow: this.follow,
			filter: this.filter,
			sort: this.props.sort,
			hardlinks: this.props.hardlinks
		};
	};
	DirReader.prototype.pause = function(who) {
		var self = this;
		if (self._paused) return;
		who = who || self;
		self._paused = true;
		if (self._currentEntry && self._currentEntry.pause) self._currentEntry.pause(who);
		self.emit("pause", who);
	};
	DirReader.prototype.resume = function(who) {
		var self = this;
		if (!self._paused) return;
		who = who || self;
		self._paused = false;
		self.emit("resume", who);
		if (self._paused) return;
		if (self._currentEntry) {
			if (self._currentEntry.resume) self._currentEntry.resume(who);
		} else self._read();
	};
	DirReader.prototype.emitEntry = function(entry) {
		this.emit("entry", entry);
		this.emit("child", entry);
	};
}));
//#endregion
//#region node_modules/fstream/lib/file-reader.js
var require_file_reader = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = FileReader;
	var fs = require_graceful_fs();
	var inherits = require_inherits();
	var Reader = require_reader();
	var EOF = { EOF: true };
	var CLOSE = { CLOSE: true };
	inherits(FileReader, Reader);
	function FileReader(props) {
		var self = this;
		if (!(self instanceof FileReader)) throw new Error("FileReader must be called as constructor.");
		if (!(props.type === "Link" && props.Link || props.type === "File" && props.File)) throw new Error("Non-file type " + props.type);
		self._buffer = [];
		self._bytesEmitted = 0;
		Reader.call(self, props);
	}
	FileReader.prototype._getStream = function() {
		var self = this;
		var stream = self._stream = fs.createReadStream(self._path, self.props);
		if (self.props.blksize) stream.bufferSize = self.props.blksize;
		stream.on("open", self.emit.bind(self, "open"));
		stream.on("data", function(c) {
			self._bytesEmitted += c.length;
			if (!c.length) return;
			else if (self._paused || self._buffer.length) {
				self._buffer.push(c);
				self._read();
			} else self.emit("data", c);
		});
		stream.on("end", function() {
			if (self._paused || self._buffer.length) {
				self._buffer.push(EOF);
				self._read();
			} else self.emit("end");
			if (self._bytesEmitted !== self.props.size) self.error("Didn't get expected byte count\nexpect: " + self.props.size + "\nactual: " + self._bytesEmitted);
		});
		stream.on("close", function() {
			if (self._paused || self._buffer.length) {
				self._buffer.push(CLOSE);
				self._read();
			} else self.emit("close");
		});
		stream.on("error", function(e) {
			self.emit("error", e);
		});
		self._read();
	};
	FileReader.prototype._read = function() {
		var self = this;
		if (self._paused) return;
		if (!self._stream) return self._getStream();
		if (self._buffer.length) {
			var buf = self._buffer;
			for (var i = 0, l = buf.length; i < l; i++) {
				var c = buf[i];
				if (c === EOF) self.emit("end");
				else if (c === CLOSE) self.emit("close");
				else self.emit("data", c);
				if (self._paused) {
					self._buffer = buf.slice(i);
					return;
				}
			}
			self._buffer.length = 0;
		}
	};
	FileReader.prototype.pause = function(who) {
		var self = this;
		if (self._paused) return;
		who = who || self;
		self._paused = true;
		if (self._stream) self._stream.pause();
		self.emit("pause", who);
	};
	FileReader.prototype.resume = function(who) {
		var self = this;
		if (!self._paused) return;
		who = who || self;
		self.emit("resume", who);
		self._paused = false;
		if (self._stream) self._stream.resume();
		self._read();
	};
}));
//#endregion
//#region node_modules/fstream/lib/socket-reader.js
var require_socket_reader = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = SocketReader;
	var inherits = require_inherits();
	var Reader = require_reader();
	inherits(SocketReader, Reader);
	function SocketReader(props) {
		var self = this;
		if (!(self instanceof SocketReader)) throw new Error("SocketReader must be called as constructor.");
		if (!(props.type === "Socket" && props.Socket)) throw new Error("Non-socket type " + props.type);
		Reader.call(self, props);
	}
	SocketReader.prototype._read = function() {
		var self = this;
		if (self._paused) return;
		if (!self._ended) {
			self.emit("end");
			self.emit("close");
			self._ended = true;
		}
	};
}));
//#endregion
//#region node_modules/fstream/lib/proxy-reader.js
var require_proxy_reader = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = ProxyReader;
	var Reader = require_reader();
	var getType = require_get_type();
	var inherits = require_inherits();
	var fs = require_graceful_fs();
	inherits(ProxyReader, Reader);
	function ProxyReader(props) {
		var self = this;
		if (!(self instanceof ProxyReader)) throw new Error("ProxyReader must be called as constructor.");
		self.props = props;
		self._buffer = [];
		self.ready = false;
		Reader.call(self, props);
	}
	ProxyReader.prototype._stat = function() {
		var self = this;
		var props = self.props;
		fs[props.follow ? "stat" : "lstat"](props.path, function(er, current) {
			var type;
			if (er || !current) type = "File";
			else type = getType(current);
			props[type] = true;
			props.type = self.type = type;
			self._old = current;
			self._addProxy(Reader(props, current));
		});
	};
	ProxyReader.prototype._addProxy = function(proxy) {
		var self = this;
		if (self._proxyTarget) return self.error("proxy already set");
		self._proxyTarget = proxy;
		proxy._proxy = self;
		[
			"error",
			"data",
			"end",
			"close",
			"linkpath",
			"entry",
			"entryEnd",
			"child",
			"childEnd",
			"warn",
			"stat"
		].forEach(function(ev) {
			proxy.on(ev, self.emit.bind(self, ev));
		});
		self.emit("proxy", proxy);
		proxy.on("ready", function() {
			self.ready = true;
			self.emit("ready");
		});
		var calls = self._buffer;
		self._buffer.length = 0;
		calls.forEach(function(c) {
			proxy[c[0]].apply(proxy, c[1]);
		});
	};
	ProxyReader.prototype.pause = function() {
		return this._proxyTarget ? this._proxyTarget.pause() : false;
	};
	ProxyReader.prototype.resume = function() {
		return this._proxyTarget ? this._proxyTarget.resume() : false;
	};
}));
//#endregion
//#region node_modules/fstream/lib/reader.js
var require_reader = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = Reader;
	var fs = require_graceful_fs();
	var Stream$3 = __require("stream").Stream;
	var inherits = require_inherits();
	var path$8 = __require("path");
	var getType = require_get_type();
	var hardLinks = Reader.hardLinks = {};
	var Abstract = require_abstract();
	inherits(Reader, Abstract);
	var LinkReader = require_link_reader();
	function Reader(props, currentStat) {
		var self = this;
		if (!(self instanceof Reader)) return new Reader(props, currentStat);
		if (typeof props === "string") props = { path: props };
		var type;
		var ClassType;
		if (props.type && typeof props.type === "function") {
			type = props.type;
			ClassType = type;
		} else {
			type = getType(props);
			ClassType = Reader;
		}
		if (currentStat && !type) {
			type = getType(currentStat);
			props[type] = true;
			props.type = type;
		}
		switch (type) {
			case "Directory":
				ClassType = require_dir_reader();
				break;
			case "Link":
			case "File":
				ClassType = require_file_reader();
				break;
			case "SymbolicLink":
				ClassType = LinkReader;
				break;
			case "Socket":
				ClassType = require_socket_reader();
				break;
			case null: ClassType = require_proxy_reader();
		}
		if (!(self instanceof ClassType)) return new ClassType(props);
		Abstract.call(self);
		if (!props.path) self.error("Must provide a path", null, true);
		self.readable = true;
		self.writable = false;
		self.type = type;
		self.props = props;
		self.depth = props.depth = props.depth || 0;
		self.parent = props.parent || null;
		self.root = props.root || props.parent && props.parent.root || self;
		self._path = self.path = path$8.resolve(props.path);
		if (process.platform === "win32") {
			self.path = self._path = self.path.replace(/\?/g, "_");
			if (self._path.length >= 260) {
				self._swallowErrors = true;
				self._path = "\\\\?\\" + self.path.replace(/\//g, "\\");
			}
		}
		self.basename = props.basename = path$8.basename(self.path);
		self.dirname = props.dirname = path$8.dirname(self.path);
		props.parent = props.root = null;
		self.size = props.size;
		self.filter = typeof props.filter === "function" ? props.filter : null;
		if (props.sort === "alpha") props.sort = alphasort;
		self._stat(currentStat);
	}
	function alphasort(a, b) {
		return a === b ? 0 : a.toLowerCase() > b.toLowerCase() ? 1 : a.toLowerCase() < b.toLowerCase() ? -1 : a > b ? 1 : -1;
	}
	Reader.prototype._stat = function(currentStat) {
		var self = this;
		var props = self.props;
		var stat = props.follow ? "stat" : "lstat";
		if (currentStat) process.nextTick(statCb.bind(null, null, currentStat));
		else fs[stat](self._path, statCb);
		function statCb(er, props_) {
			if (er) return self.error(er);
			Object.keys(props_).forEach(function(k) {
				props[k] = props_[k];
			});
			if (void 0 !== self.size && props.size !== self.size) return self.error("incorrect size");
			self.size = props.size;
			var type = getType(props);
			if (props.hardlinks !== false && type !== "Directory" && props.nlink && props.nlink > 1) {
				var k = props.dev + ":" + props.ino;
				if (hardLinks[k] === self._path || !hardLinks[k]) hardLinks[k] = self._path;
				else {
					type = self.type = self.props.type = "Link";
					self.Link = self.props.Link = true;
					self.linkpath = self.props.linkpath = hardLinks[k];
					self._stat = self._read = LinkReader.prototype._read;
				}
			}
			if (self.type && self.type !== type) self.error("Unexpected type: " + type);
			if (self.filter) {
				var who = self._proxy || self;
				if (!self.filter.call(who, who, props)) {
					if (!self._disowned) {
						self.abort();
						self.emit("end");
						self.emit("close");
					}
					return;
				}
			}
			var events = [
				"_stat",
				"stat",
				"ready"
			];
			var e = 0;
			(function go() {
				if (self._aborted) {
					self.emit("end");
					self.emit("close");
					return;
				}
				if (self._paused && self.type !== "Directory") {
					self.once("resume", go);
					return;
				}
				var ev = events[e++];
				if (!ev) return self._read();
				self.emit(ev, props);
				go();
			})();
		}
	};
	Reader.prototype.pipe = function(dest) {
		var self = this;
		if (typeof dest.add === "function") self.on("entry", function(entry) {
			if (dest.add(entry) === false) self.pause();
		});
		return Stream$3.prototype.pipe.apply(this, arguments);
	};
	Reader.prototype.pause = function(who) {
		this._paused = true;
		who = who || this;
		this.emit("pause", who);
		if (this._stream) this._stream.pause(who);
	};
	Reader.prototype.resume = function(who) {
		this._paused = false;
		who = who || this;
		this.emit("resume", who);
		if (this._stream) this._stream.resume(who);
		this._read();
	};
	Reader.prototype._read = function() {
		this.error("Cannot read unknown type: " + this.type);
	};
}));
//#endregion
//#region node_modules/rimraf/rimraf.js
var require_rimraf = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = rimraf;
	rimraf.sync = rimrafSync;
	var assert = __require("assert");
	var path$7 = __require("path");
	var fs$4 = __require("fs");
	var glob = void 0;
	try {
		glob = require_glob();
	} catch (_err) {}
	var _0666 = parseInt("666", 8);
	var defaultGlobOpts = {
		nosort: true,
		silent: true
	};
	var timeout = 0;
	var isWindows = process.platform === "win32";
	function defaults(options) {
		[
			"unlink",
			"chmod",
			"stat",
			"lstat",
			"rmdir",
			"readdir"
		].forEach(function(m) {
			options[m] = options[m] || fs$4[m];
			m = m + "Sync";
			options[m] = options[m] || fs$4[m];
		});
		options.maxBusyTries = options.maxBusyTries || 3;
		options.emfileWait = options.emfileWait || 1e3;
		if (options.glob === false) options.disableGlob = true;
		if (options.disableGlob !== true && glob === void 0) throw Error("glob dependency not found, set `options.disableGlob = true` if intentional");
		options.disableGlob = options.disableGlob || false;
		options.glob = options.glob || defaultGlobOpts;
	}
	function rimraf(p, options, cb) {
		if (typeof options === "function") {
			cb = options;
			options = {};
		}
		assert(p, "rimraf: missing path");
		assert.equal(typeof p, "string", "rimraf: path should be a string");
		assert.equal(typeof cb, "function", "rimraf: callback function required");
		assert(options, "rimraf: invalid options argument provided");
		assert.equal(typeof options, "object", "rimraf: options should be object");
		defaults(options);
		var busyTries = 0;
		var errState = null;
		var n = 0;
		if (options.disableGlob || !glob.hasMagic(p)) return afterGlob(null, [p]);
		options.lstat(p, function(er, stat) {
			if (!er) return afterGlob(null, [p]);
			glob(p, options.glob, afterGlob);
		});
		function next(er) {
			errState = errState || er;
			if (--n === 0) cb(errState);
		}
		function afterGlob(er, results) {
			if (er) return cb(er);
			n = results.length;
			if (n === 0) return cb();
			results.forEach(function(p) {
				rimraf_(p, options, function CB(er) {
					if (er) {
						if ((er.code === "EBUSY" || er.code === "ENOTEMPTY" || er.code === "EPERM") && busyTries < options.maxBusyTries) {
							busyTries++;
							var time = busyTries * 100;
							return setTimeout(function() {
								rimraf_(p, options, CB);
							}, time);
						}
						if (er.code === "EMFILE" && timeout < options.emfileWait) return setTimeout(function() {
							rimraf_(p, options, CB);
						}, timeout++);
						if (er.code === "ENOENT") er = null;
					}
					timeout = 0;
					next(er);
				});
			});
		}
	}
	function rimraf_(p, options, cb) {
		assert(p);
		assert(options);
		assert(typeof cb === "function");
		options.lstat(p, function(er, st) {
			if (er && er.code === "ENOENT") return cb(null);
			if (er && er.code === "EPERM" && isWindows) fixWinEPERM(p, options, er, cb);
			if (st && st.isDirectory()) return rmdir(p, options, er, cb);
			options.unlink(p, function(er) {
				if (er) {
					if (er.code === "ENOENT") return cb(null);
					if (er.code === "EPERM") return isWindows ? fixWinEPERM(p, options, er, cb) : rmdir(p, options, er, cb);
					if (er.code === "EISDIR") return rmdir(p, options, er, cb);
				}
				return cb(er);
			});
		});
	}
	function fixWinEPERM(p, options, er, cb) {
		assert(p);
		assert(options);
		assert(typeof cb === "function");
		if (er) assert(er instanceof Error);
		options.chmod(p, _0666, function(er2) {
			if (er2) cb(er2.code === "ENOENT" ? null : er);
			else options.stat(p, function(er3, stats) {
				if (er3) cb(er3.code === "ENOENT" ? null : er);
				else if (stats.isDirectory()) rmdir(p, options, er, cb);
				else options.unlink(p, cb);
			});
		});
	}
	function fixWinEPERMSync(p, options, er) {
		assert(p);
		assert(options);
		if (er) assert(er instanceof Error);
		try {
			options.chmodSync(p, _0666);
		} catch (er2) {
			if (er2.code === "ENOENT") return;
			else throw er;
		}
		try {
			var stats = options.statSync(p);
		} catch (er3) {
			if (er3.code === "ENOENT") return;
			else throw er;
		}
		if (stats.isDirectory()) rmdirSync(p, options, er);
		else options.unlinkSync(p);
	}
	function rmdir(p, options, originalEr, cb) {
		assert(p);
		assert(options);
		if (originalEr) assert(originalEr instanceof Error);
		assert(typeof cb === "function");
		options.rmdir(p, function(er) {
			if (er && (er.code === "ENOTEMPTY" || er.code === "EEXIST" || er.code === "EPERM")) rmkids(p, options, cb);
			else if (er && er.code === "ENOTDIR") cb(originalEr);
			else cb(er);
		});
	}
	function rmkids(p, options, cb) {
		assert(p);
		assert(options);
		assert(typeof cb === "function");
		options.readdir(p, function(er, files) {
			if (er) return cb(er);
			var n = files.length;
			if (n === 0) return options.rmdir(p, cb);
			var errState;
			files.forEach(function(f) {
				rimraf(path$7.join(p, f), options, function(er) {
					if (errState) return;
					if (er) return cb(errState = er);
					if (--n === 0) options.rmdir(p, cb);
				});
			});
		});
	}
	function rimrafSync(p, options) {
		options = options || {};
		defaults(options);
		assert(p, "rimraf: missing path");
		assert.equal(typeof p, "string", "rimraf: path should be a string");
		assert(options, "rimraf: missing options");
		assert.equal(typeof options, "object", "rimraf: options should be object");
		var results;
		if (options.disableGlob || !glob.hasMagic(p)) results = [p];
		else try {
			options.lstatSync(p);
			results = [p];
		} catch (er) {
			results = glob.sync(p, options.glob);
		}
		if (!results.length) return;
		for (var i = 0; i < results.length; i++) {
			var p = results[i];
			try {
				var st = options.lstatSync(p);
			} catch (er) {
				if (er.code === "ENOENT") return;
				if (er.code === "EPERM" && isWindows) fixWinEPERMSync(p, options, er);
			}
			try {
				if (st && st.isDirectory()) rmdirSync(p, options, null);
				else options.unlinkSync(p);
			} catch (er) {
				if (er.code === "ENOENT") return;
				if (er.code === "EPERM") return isWindows ? fixWinEPERMSync(p, options, er) : rmdirSync(p, options, er);
				if (er.code !== "EISDIR") throw er;
				rmdirSync(p, options, er);
			}
		}
	}
	function rmdirSync(p, options, originalEr) {
		assert(p);
		assert(options);
		if (originalEr) assert(originalEr instanceof Error);
		try {
			options.rmdirSync(p);
		} catch (er) {
			if (er.code === "ENOENT") return;
			if (er.code === "ENOTDIR") throw originalEr;
			if (er.code === "ENOTEMPTY" || er.code === "EEXIST" || er.code === "EPERM") rmkidsSync(p, options);
		}
	}
	function rmkidsSync(p, options) {
		assert(p);
		assert(options);
		options.readdirSync(p).forEach(function(f) {
			rimrafSync(path$7.join(p, f), options);
		});
		var retries = isWindows ? 100 : 1;
		var i = 0;
		do {
			var threw = true;
			try {
				var ret = options.rmdirSync(p, options);
				threw = false;
				return ret;
			} finally {
				if (++i < retries && threw) continue;
			}
		} while (true);
	}
}));
//#endregion
//#region node_modules/mkdirp/index.js
var require_mkdirp = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var path$6 = __require("path");
	var fs$3 = __require("fs");
	var _0777 = parseInt("0777", 8);
	module.exports = mkdirP.mkdirp = mkdirP.mkdirP = mkdirP;
	function mkdirP(p, opts, f, made) {
		if (typeof opts === "function") {
			f = opts;
			opts = {};
		} else if (!opts || typeof opts !== "object") opts = { mode: opts };
		var mode = opts.mode;
		var xfs = opts.fs || fs$3;
		if (mode === void 0) mode = _0777;
		if (!made) made = null;
		var cb = f || /* istanbul ignore next */ function() {};
		p = path$6.resolve(p);
		xfs.mkdir(p, mode, function(er) {
			if (!er) {
				made = made || p;
				return cb(null, made);
			}
			switch (er.code) {
				case "ENOENT":
					/* istanbul ignore if */
					if (path$6.dirname(p) === p) return cb(er);
					mkdirP(path$6.dirname(p), opts, function(er, made) {
						/* istanbul ignore if */
						if (er) cb(er, made);
						else mkdirP(p, opts, cb, made);
					});
					break;
				default: xfs.stat(p, function(er2, stat) {
					if (er2 || !stat.isDirectory()) cb(er, made);
					else cb(null, made);
				});
			}
		});
	}
	mkdirP.sync = function sync(p, opts, made) {
		if (!opts || typeof opts !== "object") opts = { mode: opts };
		var mode = opts.mode;
		var xfs = opts.fs || fs$3;
		if (mode === void 0) mode = _0777;
		if (!made) made = null;
		p = path$6.resolve(p);
		try {
			xfs.mkdirSync(p, mode);
			made = made || p;
		} catch (err0) {
			switch (err0.code) {
				case "ENOENT":
					made = sync(path$6.dirname(p), opts, made);
					sync(p, opts, made);
					break;
				default:
					var stat;
					try {
						stat = xfs.statSync(p);
					} catch (err1) /* istanbul ignore next */ {
						throw err0;
					}
					/* istanbul ignore if */
					if (!stat.isDirectory()) throw err0;
			}
		}
		return made;
	};
}));
//#endregion
//#region node_modules/fstream/lib/collect.js
var require_collect = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = collect;
	function collect(stream) {
		if (stream._collected) return;
		if (stream._paused) return stream.on("resume", collect.bind(null, stream));
		stream._collected = true;
		stream.pause();
		stream.on("data", save);
		stream.on("end", save);
		var buf = [];
		function save(b) {
			if (typeof b === "string") b = new Buffer(b);
			if (Buffer.isBuffer(b) && !b.length) return;
			buf.push(b);
		}
		stream.on("entry", saveEntry);
		var entryBuffer = [];
		function saveEntry(e) {
			collect(e);
			entryBuffer.push(e);
		}
		stream.on("proxy", proxyPause);
		function proxyPause(p) {
			p.pause();
		}
		stream.pipe = (function(orig) {
			return function(dest) {
				var e = 0;
				(function unblockEntry() {
					var entry = entryBuffer[e++];
					if (!entry) return resume();
					entry.on("end", unblockEntry);
					if (dest) dest.add(entry);
					else stream.emit("entry", entry);
				})();
				function resume() {
					stream.removeListener("entry", saveEntry);
					stream.removeListener("data", save);
					stream.removeListener("end", save);
					stream.pipe = orig;
					if (dest) stream.pipe(dest);
					buf.forEach(function(b) {
						if (b) stream.emit("data", b);
						else stream.emit("end");
					});
					stream.resume();
				}
				return dest;
			};
		})(stream.pipe);
	}
}));
//#endregion
//#region node_modules/fstream/lib/dir-writer.js
var require_dir_writer = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = DirWriter;
	var Writer = require_writer();
	var inherits = require_inherits();
	var mkdir = require_mkdirp();
	var path$5 = __require("path");
	var collect = require_collect();
	inherits(DirWriter, Writer);
	function DirWriter(props) {
		var self = this;
		if (!(self instanceof DirWriter)) self.error("DirWriter must be called as constructor.", null, true);
		if (props.type !== "Directory" || !props.Directory) self.error("Non-directory type " + props.type + " " + JSON.stringify(props), null, true);
		Writer.call(this, props);
	}
	DirWriter.prototype._create = function() {
		var self = this;
		mkdir(self._path, Writer.dirmode, function(er) {
			if (er) return self.error(er);
			self.ready = true;
			self.emit("ready");
			self._process();
		});
	};
	DirWriter.prototype.write = function() {
		return true;
	};
	DirWriter.prototype.end = function() {
		this._ended = true;
		this._process();
	};
	DirWriter.prototype.add = function(entry) {
		var self = this;
		collect(entry);
		if (!self.ready || self._currentEntry) {
			self._buffer.push(entry);
			return false;
		}
		if (self._ended) return self.error("add after end");
		self._buffer.push(entry);
		self._process();
		return this._buffer.length === 0;
	};
	DirWriter.prototype._process = function() {
		var self = this;
		if (self._processing) return;
		var entry = self._buffer.shift();
		if (!entry) {
			self.emit("drain");
			if (self._ended) self._finish();
			return;
		}
		self._processing = true;
		self.emit("entry", entry);
		var p = entry;
		var pp;
		do {
			pp = p._path || p.path;
			if (pp === self.root._path || pp === self._path || pp && pp.indexOf(self._path) === 0) {
				self._processing = false;
				if (entry._collected) entry.pipe();
				return self._process();
			}
			p = p.parent;
		} while (p);
		var props = {
			parent: self,
			root: self.root || self,
			type: entry.type,
			depth: self.depth + 1
		};
		pp = entry._path || entry.path || entry.props.path;
		if (entry.parent) pp = pp.substr(entry.parent._path.length + 1);
		props.path = path$5.join(self.path, path$5.join("/", pp));
		props.filter = self.filter;
		Object.keys(entry.props).forEach(function(k) {
			if (!props.hasOwnProperty(k)) props[k] = entry.props[k];
		});
		var child = self._currentChild = new Writer(props);
		child.on("ready", function() {
			entry.pipe(child);
			entry.resume();
		});
		child.on("error", function(er) {
			if (child._swallowErrors) {
				self.warn(er);
				child.emit("end");
				child.emit("close");
			} else self.emit("error", er);
		});
		child.on("close", onend);
		var ended = false;
		function onend() {
			if (ended) return;
			ended = true;
			self._currentChild = null;
			self._processing = false;
			self._process();
		}
	};
}));
//#endregion
//#region node_modules/fstream/lib/link-writer.js
var require_link_writer = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = LinkWriter;
	var fs = require_graceful_fs();
	var Writer = require_writer();
	var inherits = require_inherits();
	var path$4 = __require("path");
	var rimraf = require_rimraf();
	inherits(LinkWriter, Writer);
	function LinkWriter(props) {
		var self = this;
		if (!(self instanceof LinkWriter)) throw new Error("LinkWriter must be called as constructor.");
		if (!(props.type === "Link" && props.Link || props.type === "SymbolicLink" && props.SymbolicLink)) throw new Error("Non-link type " + props.type);
		if (props.linkpath === "") props.linkpath = ".";
		if (!props.linkpath) self.error("Need linkpath property to create " + props.type);
		Writer.call(this, props);
	}
	LinkWriter.prototype._create = function() {
		var self = this;
		var hard = self.type === "Link" || process.platform === "win32";
		var link = hard ? "link" : "symlink";
		var lp = hard ? path$4.resolve(self.dirname, self.linkpath) : self.linkpath;
		if (hard) return clobber(self, lp, link);
		fs.readlink(self._path, function(er, p) {
			if (p && p === lp) return finish(self);
			clobber(self, lp, link);
		});
	};
	function clobber(self, lp, link) {
		rimraf(self._path, function(er) {
			if (er) return self.error(er);
			create(self, lp, link);
		});
	}
	function create(self, lp, link) {
		fs[link](lp, self._path, function(er) {
			if (er) {
				if ((er.code === "ENOENT" || er.code === "EACCES" || er.code === "EPERM") && process.platform === "win32") {
					self.ready = true;
					self.emit("ready");
					self.emit("end");
					self.emit("close");
					self.end = self._finish = function() {};
				} else return self.error(er);
			}
			finish(self);
		});
	}
	function finish(self) {
		self.ready = true;
		self.emit("ready");
		if (self._ended && !self._finished) self._finish();
	}
	LinkWriter.prototype.end = function() {
		this._ended = true;
		if (this.ready) {
			this._finished = true;
			this._finish();
		}
	};
}));
//#endregion
//#region node_modules/fstream/lib/file-writer.js
var require_file_writer = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = FileWriter;
	var fs = require_graceful_fs();
	var Writer = require_writer();
	var inherits = require_inherits();
	var EOF = {};
	inherits(FileWriter, Writer);
	function FileWriter(props) {
		var self = this;
		if (!(self instanceof FileWriter)) throw new Error("FileWriter must be called as constructor.");
		if (props.type !== "File" || !props.File) throw new Error("Non-file type " + props.type);
		self._buffer = [];
		self._bytesWritten = 0;
		Writer.call(this, props);
	}
	FileWriter.prototype._create = function() {
		var self = this;
		if (self._stream) return;
		var so = {};
		if (self.props.flags) so.flags = self.props.flags;
		so.mode = Writer.filemode;
		if (self._old && self._old.blksize) so.bufferSize = self._old.blksize;
		self._stream = fs.createWriteStream(self._path, so);
		self._stream.on("open", function() {
			self.ready = true;
			self._buffer.forEach(function(c) {
				if (c === EOF) self._stream.end();
				else self._stream.write(c);
			});
			self.emit("ready");
			self.emit("drain");
		});
		self._stream.on("error", function(er) {
			self.emit("error", er);
		});
		self._stream.on("drain", function() {
			self.emit("drain");
		});
		self._stream.on("close", function() {
			self._finish();
		});
	};
	FileWriter.prototype.write = function(c) {
		var self = this;
		self._bytesWritten += c.length;
		if (!self.ready) {
			if (!Buffer.isBuffer(c) && typeof c !== "string") throw new Error("invalid write data");
			self._buffer.push(c);
			return false;
		}
		var ret = self._stream.write(c);
		if (ret === false && self._stream._queue) return self._stream._queue.length <= 2;
		else return ret;
	};
	FileWriter.prototype.end = function(c) {
		var self = this;
		if (c) self.write(c);
		if (!self.ready) {
			self._buffer.push(EOF);
			return false;
		}
		return self._stream.end();
	};
	FileWriter.prototype._finish = function() {
		var self = this;
		if (typeof self.size === "number" && self._bytesWritten !== self.size) self.error("Did not get expected byte count.\nexpect: " + self.size + "\nactual: " + self._bytesWritten);
		Writer.prototype._finish.call(self);
	};
}));
//#endregion
//#region node_modules/fstream/lib/proxy-writer.js
var require_proxy_writer = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = ProxyWriter;
	var Writer = require_writer();
	var getType = require_get_type();
	var inherits = require_inherits();
	var collect = require_collect();
	var fs$2 = __require("fs");
	inherits(ProxyWriter, Writer);
	function ProxyWriter(props) {
		var self = this;
		if (!(self instanceof ProxyWriter)) throw new Error("ProxyWriter must be called as constructor.");
		self.props = props;
		self._needDrain = false;
		Writer.call(self, props);
	}
	ProxyWriter.prototype._stat = function() {
		var self = this;
		var props = self.props;
		fs$2[props.follow ? "stat" : "lstat"](props.path, function(er, current) {
			var type;
			if (er || !current) type = "File";
			else type = getType(current);
			props[type] = true;
			props.type = self.type = type;
			self._old = current;
			self._addProxy(Writer(props, current));
		});
	};
	ProxyWriter.prototype._addProxy = function(proxy) {
		var self = this;
		if (self._proxy) return self.error("proxy already set");
		self._proxy = proxy;
		[
			"ready",
			"error",
			"close",
			"pipe",
			"drain",
			"warn"
		].forEach(function(ev) {
			proxy.on(ev, self.emit.bind(self, ev));
		});
		self.emit("proxy", proxy);
		self._buffer.forEach(function(c) {
			proxy[c[0]].apply(proxy, c[1]);
		});
		self._buffer.length = 0;
		if (self._needsDrain) self.emit("drain");
	};
	ProxyWriter.prototype.add = function(entry) {
		collect(entry);
		if (!this._proxy) {
			this._buffer.push(["add", [entry]]);
			this._needDrain = true;
			return false;
		}
		return this._proxy.add(entry);
	};
	ProxyWriter.prototype.write = function(c) {
		if (!this._proxy) {
			this._buffer.push(["write", [c]]);
			this._needDrain = true;
			return false;
		}
		return this._proxy.write(c);
	};
	ProxyWriter.prototype.end = function(c) {
		if (!this._proxy) {
			this._buffer.push(["end", [c]]);
			return false;
		}
		return this._proxy.end(c);
	};
}));
//#endregion
//#region node_modules/fstream/lib/writer.js
var require_writer = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = Writer;
	var fs = require_graceful_fs();
	var inherits = require_inherits();
	var rimraf = require_rimraf();
	var mkdir = require_mkdirp();
	var path$3 = __require("path");
	var umask = process.platform === "win32" ? 0 : process.umask();
	var getType = require_get_type();
	var Abstract = require_abstract();
	inherits(Writer, Abstract);
	Writer.dirmode = parseInt("0777", 8) & ~umask;
	Writer.filemode = parseInt("0666", 8) & ~umask;
	var DirWriter = require_dir_writer();
	var LinkWriter = require_link_writer();
	var FileWriter = require_file_writer();
	var ProxyWriter = require_proxy_writer();
	function Writer(props, current) {
		var self = this;
		if (typeof props === "string") props = { path: props };
		var type = getType(props);
		var ClassType = Writer;
		switch (type) {
			case "Directory":
				ClassType = DirWriter;
				break;
			case "File":
				ClassType = FileWriter;
				break;
			case "Link":
			case "SymbolicLink":
				ClassType = LinkWriter;
				break;
			default: ClassType = ProxyWriter;
		}
		if (!(self instanceof ClassType)) return new ClassType(props);
		Abstract.call(self);
		if (!props.path) self.error("Must provide a path", null, true);
		self.type = props.type;
		self.props = props;
		self.depth = props.depth || 0;
		self.clobber = props.clobber === false ? props.clobber : true;
		self.parent = props.parent || null;
		self.root = props.root || props.parent && props.parent.root || self;
		self._path = self.path = path$3.resolve(props.path);
		if (process.platform === "win32") {
			self.path = self._path = self.path.replace(/\?/g, "_");
			if (self._path.length >= 260) {
				self._swallowErrors = true;
				self._path = "\\\\?\\" + self.path.replace(/\//g, "\\");
			}
		}
		self.basename = path$3.basename(props.path);
		self.dirname = path$3.dirname(props.path);
		self.linkpath = props.linkpath || null;
		props.parent = props.root = null;
		self.size = props.size;
		if (typeof props.mode === "string") props.mode = parseInt(props.mode, 8);
		self.readable = false;
		self.writable = true;
		self._buffer = [];
		self.ready = false;
		self.filter = typeof props.filter === "function" ? props.filter : null;
		self._stat(current);
	}
	Writer.prototype._create = function() {
		var self = this;
		fs[self.props.follow ? "stat" : "lstat"](self._path, function(er) {
			if (er) return self.warn("Cannot create " + self._path + "\nUnsupported type: " + self.type, "ENOTSUP");
			self._finish();
		});
	};
	Writer.prototype._stat = function(current) {
		var self = this;
		var stat = self.props.follow ? "stat" : "lstat";
		var who = self._proxy || self;
		if (current) statCb(null, current);
		else fs[stat](self._path, statCb);
		function statCb(er, current) {
			if (self.filter && !self.filter.call(who, who, current)) {
				self._aborted = true;
				self.emit("end");
				self.emit("close");
				return;
			}
			if (er || !current) return create(self);
			self._old = current;
			if (getType(current) !== self.type || self.type === "File" && current.nlink > 1) return rimraf(self._path, function(er) {
				if (er) return self.error(er);
				self._old = null;
				create(self);
			});
			create(self);
		}
	};
	function create(self) {
		mkdir(path$3.dirname(self._path), Writer.dirmode, function(er, made) {
			if (er) return self.error(er);
			self._madeDir = made;
			return self._create();
		});
	}
	function endChmod(self, want, current, path, cb) {
		var wantMode = want.mode;
		var chmod = want.follow || self.type !== "SymbolicLink" ? "chmod" : "lchmod";
		if (!fs[chmod]) return cb();
		if (typeof wantMode !== "number") return cb();
		var curMode = current.mode & parseInt("0777", 8);
		wantMode = wantMode & parseInt("0777", 8);
		if (wantMode === curMode) return cb();
		fs[chmod](path, wantMode, cb);
	}
	function endChown(self, want, current, path, cb) {
		if (process.platform === "win32") return cb();
		if (!process.getuid || process.getuid() !== 0) return cb();
		if (typeof want.uid !== "number" && typeof want.gid !== "number") return cb();
		if (current.uid === want.uid && current.gid === want.gid) return cb();
		var chown = self.props.follow || self.type !== "SymbolicLink" ? "chown" : "lchown";
		if (!fs[chown]) return cb();
		if (typeof want.uid !== "number") want.uid = current.uid;
		if (typeof want.gid !== "number") want.gid = current.gid;
		fs[chown](path, want.uid, want.gid, cb);
	}
	function endUtimes(self, want, current, path, cb) {
		if (!fs.utimes || process.platform === "win32") return cb();
		var utimes = want.follow || self.type !== "SymbolicLink" ? "utimes" : "lutimes";
		if (utimes === "lutimes" && !fs[utimes]) utimes = "utimes";
		if (!fs[utimes]) return cb();
		var curA = current.atime;
		var curM = current.mtime;
		var meA = want.atime;
		var meM = want.mtime;
		if (meA === void 0) meA = curA;
		if (meM === void 0) meM = curM;
		if (!isDate(meA)) meA = new Date(meA);
		if (!isDate(meM)) meA = new Date(meM);
		if (meA.getTime() === curA.getTime() && meM.getTime() === curM.getTime()) return cb();
		fs[utimes](path, meA, meM, cb);
	}
	Writer.prototype._finish = function() {
		var self = this;
		if (self._finishing) return;
		self._finishing = true;
		var todo = 0;
		var errState = null;
		var done = false;
		if (self._old) {
			self._old.atime = /* @__PURE__ */ new Date(0);
			self._old.mtime = /* @__PURE__ */ new Date(0);
			setProps(self._old);
		} else fs[self.props.follow ? "stat" : "lstat"](self._path, function(er, current) {
			if (er) {
				if (er.code === "ENOENT" && (self.type === "Link" || self.type === "SymbolicLink") && process.platform === "win32") {
					self.ready = true;
					self.emit("ready");
					self.emit("end");
					self.emit("close");
					self.end = self._finish = function() {};
					return;
				} else return self.error(er);
			}
			setProps(self._old = current);
		});
		return;
		function setProps(current) {
			todo += 3;
			endChmod(self, self.props, current, self._path, next("chmod"));
			endChown(self, self.props, current, self._path, next("chown"));
			endUtimes(self, self.props, current, self._path, next("utimes"));
		}
		function next(what) {
			return function(er) {
				if (errState) return;
				if (er) {
					er.fstream_finish_call = what;
					return self.error(errState = er);
				}
				if (--todo > 0) return;
				if (done) return;
				done = true;
				if (!self._madeDir) return end();
				else endMadeDir(self, self._path, end);
				function end(er) {
					if (er) {
						er.fstream_finish_call = "setupMadeDir";
						return self.error(er);
					}
					self.emit("end");
					self.emit("close");
				}
			};
		}
	};
	function endMadeDir(self, p, cb) {
		var made = self._madeDir;
		var d = path$3.dirname(p);
		endMadeDir_(self, d, function(er) {
			if (er) return cb(er);
			if (d === made) return cb();
			endMadeDir(self, d, cb);
		});
	}
	function endMadeDir_(self, p, cb) {
		var dirProps = {};
		Object.keys(self.props).forEach(function(k) {
			dirProps[k] = self.props[k];
			if (k === "mode" && self.type !== "Directory") dirProps[k] = dirProps[k] | parseInt("0111", 8);
		});
		var todo = 3;
		var errState = null;
		fs.stat(p, function(er, current) {
			if (er) return cb(errState = er);
			endChmod(self, dirProps, current, p, next);
			endChown(self, dirProps, current, p, next);
			endUtimes(self, dirProps, current, p, next);
		});
		function next(er) {
			if (errState) return;
			if (er) return cb(errState = er);
			if (--todo === 0) return cb();
		}
	}
	Writer.prototype.pipe = function() {
		this.error("Can't pipe from writable stream");
	};
	Writer.prototype.add = function() {
		this.error("Can't add to non-Directory type");
	};
	Writer.prototype.write = function() {
		return true;
	};
	function objectToString(d) {
		return Object.prototype.toString.call(d);
	}
	function isDate(d) {
		return typeof d === "object" && objectToString(d) === "[object Date]";
	}
}));
//#endregion
//#region node_modules/fstream/fstream.js
var require_fstream = /* @__PURE__ */ __commonJSMin(((exports) => {
	exports.Abstract = require_abstract();
	exports.Reader = require_reader();
	exports.Writer = require_writer();
	exports.File = {
		Reader: require_file_reader(),
		Writer: require_file_writer()
	};
	exports.Dir = {
		Reader: require_dir_reader(),
		Writer: require_dir_writer()
	};
	exports.Link = {
		Reader: require_link_reader(),
		Writer: require_link_writer()
	};
	exports.Proxy = {
		Reader: require_proxy_reader(),
		Writer: require_proxy_writer()
	};
	exports.Reader.Dir = exports.DirReader = exports.Dir.Reader;
	exports.Reader.File = exports.FileReader = exports.File.Reader;
	exports.Reader.Link = exports.LinkReader = exports.Link.Reader;
	exports.Reader.Proxy = exports.ProxyReader = exports.Proxy.Reader;
	exports.Writer.Dir = exports.DirWriter = exports.Dir.Writer;
	exports.Writer.File = exports.FileWriter = exports.File.Writer;
	exports.Writer.Link = exports.LinkWriter = exports.Link.Writer;
	exports.Writer.Proxy = exports.ProxyWriter = exports.Proxy.Writer;
	exports.collect = require_collect();
}));
//#endregion
//#region node_modules/unzipper/lib/extract.js
var require_extract = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = Extract;
	var Parse = require_parse();
	var Writer = require_fstream().Writer;
	var path$2 = __require("path");
	var stream = __require("stream");
	var duplexer2 = require_duplexer2();
	var Promise = require_bluebird();
	function Extract(opts) {
		opts.path = path$2.resolve(path$2.normalize(opts.path));
		var parser = new Parse(opts);
		var outStream = new stream.Writable({ objectMode: true });
		outStream._write = function(entry, encoding, cb) {
			if (entry.type == "Directory") return cb();
			var extractPath = path$2.join(opts.path, entry.path);
			if (extractPath.indexOf(opts.path) != 0) return cb();
			const writer = opts.getWriter ? opts.getWriter({ path: extractPath }) : Writer({ path: extractPath });
			entry.pipe(writer).on("error", cb).on("close", cb);
		};
		var extract = duplexer2(parser, outStream);
		parser.once("crx-header", function(crxHeader) {
			extract.crxHeader = crxHeader;
		});
		parser.pipe(outStream).on("finish", function() {
			extract.emit("close");
		});
		extract.promise = function() {
			return new Promise(function(resolve, reject) {
				extract.on("close", resolve);
				extract.on("error", reject);
			});
		};
		return extract;
	}
}));
//#endregion
//#region node_modules/unzipper/lib/Decrypt.js
var require_Decrypt = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var bigInt = require_BigInteger();
	var Stream$2 = __require("stream");
	if (!Stream$2.Writable || !Stream$2.Writable.prototype.destroy) Stream$2 = require_readable();
	var table;
	function generateTable() {
		var poly = 3988292384, c, n, k;
		table = [];
		for (n = 0; n < 256; n++) {
			c = n;
			for (k = 0; k < 8; k++) c = c & 1 ? poly ^ c >>> 1 : c = c >>> 1;
			table[n] = c >>> 0;
		}
	}
	function crc(ch, crc) {
		if (!table) generateTable();
		if (ch.charCodeAt) ch = ch.charCodeAt(0);
		return bigInt(crc).shiftRight(8).and(16777215).xor(table[bigInt(crc).xor(ch).and(255)]).value;
	}
	function Decrypt() {
		if (!(this instanceof Decrypt)) return new Decrypt();
		this.key0 = 305419896;
		this.key1 = 591751049;
		this.key2 = 878082192;
	}
	Decrypt.prototype.update = function(h) {
		this.key0 = crc(h, this.key0);
		this.key1 = bigInt(this.key0).and(255).and(4294967295).add(this.key1);
		this.key1 = bigInt(this.key1).multiply(134775813).add(1).and(4294967295).value;
		this.key2 = crc(bigInt(this.key1).shiftRight(24).and(255), this.key2);
	};
	Decrypt.prototype.decryptByte = function(c) {
		var k = bigInt(this.key2).or(2);
		c = c ^ bigInt(k).multiply(bigInt(k ^ 1)).shiftRight(8).and(255);
		this.update(c);
		return c;
	};
	Decrypt.prototype.stream = function() {
		var stream = Stream$2.Transform(), self = this;
		stream._transform = function(d, e, cb) {
			for (var i = 0; i < d.length; i++) d[i] = self.decryptByte(d[i]);
			this.push(d);
			cb();
		};
		return stream;
	};
	module.exports = Decrypt;
}));
//#endregion
//#region node_modules/unzipper/lib/Open/unzip.js
var require_unzip$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Promise = require_bluebird();
	var Decrypt = require_Decrypt();
	var PullStream = require_PullStream();
	var Stream$1 = __require("stream");
	var binary = require_binary();
	var zlib = __require("zlib");
	var parseExtraField = require_parseExtraField();
	var Buffer = require_Buffer();
	var parseDateTime = require_parseDateTime();
	if (!Stream$1.Writable || !Stream$1.Writable.prototype.destroy) Stream$1 = require_readable();
	module.exports = function unzip(source, offset, _password, directoryVars) {
		var file = PullStream(), entry = Stream$1.PassThrough();
		var req = source.stream(offset);
		req.pipe(file).on("error", function(e) {
			entry.emit("error", e);
		});
		entry.vars = file.pull(30).then(function(data) {
			var vars = binary.parse(data).word32lu("signature").word16lu("versionsNeededToExtract").word16lu("flags").word16lu("compressionMethod").word16lu("lastModifiedTime").word16lu("lastModifiedDate").word32lu("crc32").word32lu("compressedSize").word32lu("uncompressedSize").word16lu("fileNameLength").word16lu("extraFieldLength").vars;
			vars.lastModifiedDateTime = parseDateTime(vars.lastModifiedDate, vars.lastModifiedTime);
			return file.pull(vars.fileNameLength).then(function(fileName) {
				vars.fileName = fileName.toString("utf8");
				return file.pull(vars.extraFieldLength);
			}).then(function(extraField) {
				var checkEncryption;
				vars.extra = parseExtraField(extraField, vars);
				if (directoryVars && directoryVars.compressedSize) vars = directoryVars;
				if (vars.flags & 1) checkEncryption = file.pull(12).then(function(header) {
					if (!_password) throw new Error("MISSING_PASSWORD");
					var decrypt = Decrypt();
					String(_password).split("").forEach(function(d) {
						decrypt.update(d);
					});
					for (var i = 0; i < header.length; i++) header[i] = decrypt.decryptByte(header[i]);
					vars.decrypt = decrypt;
					vars.compressedSize -= 12;
					var check = vars.flags & 8 ? vars.lastModifiedTime >> 8 & 255 : vars.crc32 >> 24 & 255;
					if (header[11] !== check) throw new Error("BAD_PASSWORD");
					return vars;
				});
				return Promise.resolve(checkEncryption).then(function() {
					entry.emit("vars", vars);
					return vars;
				});
			});
		});
		entry.vars.then(function(vars) {
			var fileSizeKnown = !(vars.flags & 8) || vars.compressedSize > 0, eof;
			var inflater = vars.compressionMethod ? zlib.createInflateRaw() : Stream$1.PassThrough();
			if (fileSizeKnown) {
				entry.size = vars.uncompressedSize;
				eof = vars.compressedSize;
			} else {
				eof = Buffer.alloc(4);
				eof.writeUInt32LE(134695760, 0);
			}
			var stream = file.stream(eof);
			if (vars.decrypt) stream = stream.pipe(vars.decrypt.stream());
			stream.pipe(inflater).on("error", function(err) {
				entry.emit("error", err);
			}).pipe(entry).on("finish", function() {
				if (req.destroy) req.destroy();
				else if (req.abort) req.abort();
				else if (req.close) req.close();
				else if (req.push) req.push();
				else console.log("warning - unable to close stream");
			});
		}).catch(function(e) {
			entry.emit("error", e);
		});
		return entry;
	};
}));
//#endregion
//#region node_modules/unzipper/lib/Open/directory.js
var require_directory = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var binary = require_binary();
	var PullStream = require_PullStream();
	var unzip = require_unzip$1();
	var Promise = require_bluebird();
	var BufferStream = require_BufferStream();
	var parseExtraField = require_parseExtraField();
	var Buffer = require_Buffer();
	var path$1 = __require("path");
	var Writer = require_fstream().Writer;
	var parseDateTime = require_parseDateTime();
	var signature = Buffer.alloc(4);
	signature.writeUInt32LE(101010256, 0);
	function getCrxHeader(source) {
		var sourceStream = source.stream(0).pipe(PullStream());
		return sourceStream.pull(4).then(function(data) {
			if (data.readUInt32LE(0) === 875721283) {
				var crxHeader;
				return sourceStream.pull(12).then(function(data) {
					crxHeader = binary.parse(data).word32lu("version").word32lu("pubKeyLength").word32lu("signatureLength").vars;
				}).then(function() {
					return sourceStream.pull(crxHeader.pubKeyLength + crxHeader.signatureLength);
				}).then(function(data) {
					crxHeader.publicKey = data.slice(0, crxHeader.pubKeyLength);
					crxHeader.signature = data.slice(crxHeader.pubKeyLength);
					crxHeader.size = 16 + crxHeader.pubKeyLength + crxHeader.signatureLength;
					return crxHeader;
				});
			}
		});
	}
	function getZip64CentralDirectory(source, zip64CDL) {
		var d64loc = binary.parse(zip64CDL).word32lu("signature").word32lu("diskNumber").word64lu("offsetToStartOfCentralDirectory").word32lu("numberOfDisks").vars;
		if (d64loc.signature != 117853008) throw new Error("invalid zip64 end of central dir locator signature (0x07064b50): 0x" + d64loc.signature.toString(16));
		var dir64 = PullStream();
		source.stream(d64loc.offsetToStartOfCentralDirectory).pipe(dir64);
		return dir64.pull(56);
	}
	function parseZip64DirRecord(dir64record) {
		var vars = binary.parse(dir64record).word32lu("signature").word64lu("sizeOfCentralDirectory").word16lu("version").word16lu("versionsNeededToExtract").word32lu("diskNumber").word32lu("diskStart").word64lu("numberOfRecordsOnDisk").word64lu("numberOfRecords").word64lu("sizeOfCentralDirectory").word64lu("offsetToStartOfCentralDirectory").vars;
		if (vars.signature != 101075792) throw new Error("invalid zip64 end of central dir locator signature (0x06064b50): 0x0" + vars.signature.toString(16));
		return vars;
	}
	module.exports = function centralDirectory(source, options) {
		var endDir = PullStream(), records = PullStream(), tailSize = options && options.tailSize || 80, sourceSize, crxHeader, startOffset, vars;
		if (options && options.crx) crxHeader = getCrxHeader(source);
		return source.size().then(function(size) {
			sourceSize = size;
			source.stream(Math.max(0, size - tailSize)).on("error", function(error) {
				endDir.emit("error", error);
			}).pipe(endDir);
			return endDir.pull(signature);
		}).then(function() {
			return Promise.props({
				directory: endDir.pull(22),
				crxHeader
			});
		}).then(function(d) {
			var data = d.directory;
			startOffset = d.crxHeader && d.crxHeader.size || 0;
			vars = binary.parse(data).word32lu("signature").word16lu("diskNumber").word16lu("diskStart").word16lu("numberOfRecordsOnDisk").word16lu("numberOfRecords").word32lu("sizeOfCentralDirectory").word32lu("offsetToStartOfCentralDirectory").word16lu("commentLength").vars;
			if (vars.numberOfRecords == 65535 || vars.numberOfRecords == 65535 || vars.offsetToStartOfCentralDirectory == 4294967295) {
				const zip64CDLSize = 20;
				const zip64CDLOffset = sourceSize - (tailSize - endDir.match + zip64CDLSize);
				const zip64CDLStream = PullStream();
				source.stream(zip64CDLOffset).pipe(zip64CDLStream);
				return zip64CDLStream.pull(zip64CDLSize).then(function(d) {
					return getZip64CentralDirectory(source, d);
				}).then(function(dir64record) {
					vars = parseZip64DirRecord(dir64record);
				});
			} else vars.offsetToStartOfCentralDirectory += startOffset;
		}).then(function() {
			if (vars.commentLength) return endDir.pull(vars.commentLength).then(function(comment) {
				vars.comment = comment.toString("utf8");
			});
		}).then(function() {
			source.stream(vars.offsetToStartOfCentralDirectory).pipe(records);
			vars.extract = function(opts) {
				if (!opts || !opts.path) throw new Error("PATH_MISSING");
				opts.path = path$1.resolve(path$1.normalize(opts.path));
				return vars.files.then(function(files) {
					return Promise.map(files, function(entry) {
						if (entry.type == "Directory") return;
						var extractPath = path$1.join(opts.path, entry.path);
						if (extractPath.indexOf(opts.path) != 0) return;
						var writer = opts.getWriter ? opts.getWriter({ path: extractPath }) : Writer({ path: extractPath });
						return new Promise(function(resolve, reject) {
							entry.stream(opts.password).on("error", reject).pipe(writer).on("close", resolve).on("error", reject);
						});
					}, { concurrency: opts.concurrency > 1 ? opts.concurrency : 1 });
				});
			};
			vars.files = Promise.mapSeries(Array(vars.numberOfRecords), function() {
				return records.pull(46).then(function(data) {
					var vars = binary.parse(data).word32lu("signature").word16lu("versionMadeBy").word16lu("versionsNeededToExtract").word16lu("flags").word16lu("compressionMethod").word16lu("lastModifiedTime").word16lu("lastModifiedDate").word32lu("crc32").word32lu("compressedSize").word32lu("uncompressedSize").word16lu("fileNameLength").word16lu("extraFieldLength").word16lu("fileCommentLength").word16lu("diskNumber").word16lu("internalFileAttributes").word32lu("externalFileAttributes").word32lu("offsetToLocalFileHeader").vars;
					vars.offsetToLocalFileHeader += startOffset;
					vars.lastModifiedDateTime = parseDateTime(vars.lastModifiedDate, vars.lastModifiedTime);
					return records.pull(vars.fileNameLength).then(function(fileNameBuffer) {
						vars.pathBuffer = fileNameBuffer;
						vars.path = fileNameBuffer.toString("utf8");
						vars.isUnicode = (vars.flags & 2048) != 0;
						return records.pull(vars.extraFieldLength);
					}).then(function(extraField) {
						vars.extra = parseExtraField(extraField, vars);
						return records.pull(vars.fileCommentLength);
					}).then(function(comment) {
						vars.comment = comment;
						vars.type = vars.uncompressedSize === 0 && /[\/\\]$/.test(vars.path) ? "Directory" : "File";
						vars.stream = function(_password) {
							return unzip(source, vars.offsetToLocalFileHeader, _password, vars);
						};
						vars.buffer = function(_password) {
							return BufferStream(vars.stream(_password));
						};
						return vars;
					});
				});
			});
			return Promise.props(vars);
		});
	};
}));
//#endregion
//#region node_modules/unzipper/lib/Open/index.js
var require_Open = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var fs = require_graceful_fs();
	var Promise = require_bluebird();
	var directory = require_directory();
	var Stream = __require("stream");
	if (!Stream.Writable || !Stream.Writable.prototype.destroy) Stream = require_readable();
	module.exports = {
		buffer: function(buffer, options) {
			return directory({
				stream: function(offset, length) {
					var stream = Stream.PassThrough();
					stream.end(buffer.slice(offset, length));
					return stream;
				},
				size: function() {
					return Promise.resolve(buffer.length);
				}
			}, options);
		},
		file: function(filename, options) {
			return directory({
				stream: function(offset, length) {
					return fs.createReadStream(filename, {
						start: offset,
						end: length && offset + length
					});
				},
				size: function() {
					return new Promise(function(resolve, reject) {
						fs.stat(filename, function(err, d) {
							if (err) reject(err);
							else resolve(d.size);
						});
					});
				}
			}, options);
		},
		url: function(request, params, options) {
			if (typeof params === "string") params = { url: params };
			if (!params.url) throw "URL missing";
			params.headers = params.headers || {};
			return directory({
				stream: function(offset, length) {
					var options = Object.create(params);
					options.headers = Object.create(params.headers);
					options.headers.range = "bytes=" + offset + "-" + (length ? length : "");
					return request(options);
				},
				size: function() {
					return new Promise(function(resolve, reject) {
						var req = request(params);
						req.on("response", function(d) {
							req.abort();
							if (!d.headers["content-length"]) reject(/* @__PURE__ */ new Error("Missing content length header"));
							else resolve(d.headers["content-length"]);
						}).on("error", reject);
					});
				}
			}, options);
		},
		s3: function(client, params, options) {
			return directory({
				size: function() {
					return new Promise(function(resolve, reject) {
						client.headObject(params, function(err, d) {
							if (err) reject(err);
							else resolve(d.ContentLength);
						});
					});
				},
				stream: function(offset, length) {
					var d = {};
					for (var key in params) d[key] = params[key];
					d.Range = "bytes=" + offset + "-" + (length ? length : "");
					return client.getObject(d).createReadStream();
				}
			}, options);
		},
		custom: function(source, options) {
			return directory(source, options);
		}
	};
}));
//#endregion
//#region node_modules/unzipper/unzip.js
var require_unzip = /* @__PURE__ */ __commonJSMin(((exports) => {
	require_listenercount();
	require_buffer_indexof_polyfill();
	require_setImmediate();
	exports.Parse = require_parse();
	exports.ParseOne = require_parseOne();
	exports.Extract = require_extract();
	exports.Open = require_Open();
}));
//#endregion
//#region node_modules/tmp/lib/tmp.js
var require_tmp = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/*!
	* Tmp
	*
	* Copyright (c) 2011-2017 KARASZI Istvan <github@spam.raszi.hu>
	*
	* MIT Licensed
	*/
	var fs$1 = __require("fs");
	var os = __require("os");
	var path = __require("path");
	var crypto = __require("crypto");
	var _c = {
		fs: fs$1.constants,
		os: os.constants
	};
	var RANDOM_CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
	var TEMPLATE_PATTERN = /XXXXXX/;
	var DEFAULT_TRIES = 3;
	var CREATE_FLAGS = (_c.O_CREAT || _c.fs.O_CREAT) | (_c.O_EXCL || _c.fs.O_EXCL) | (_c.O_RDWR || _c.fs.O_RDWR);
	var IS_WIN32 = os.platform() === "win32";
	var EBADF = _c.EBADF || _c.os.errno.EBADF;
	var ENOENT = _c.ENOENT || _c.os.errno.ENOENT;
	var DIR_MODE = 448;
	var FILE_MODE = 384;
	var EXIT = "exit";
	var _removeObjects = [];
	var FN_RMDIR_SYNC = fs$1.rmdirSync.bind(fs$1);
	var _gracefulCleanup = false;
	/**
	* Recursively remove a directory and its contents.
	*
	* @param {string} dirPath path of directory to remove
	* @param {Function} callback
	* @private
	*/
	function rimraf(dirPath, callback) {
		return fs$1.rm(dirPath, { recursive: true }, callback);
	}
	/**
	* Recursively remove a directory and its contents, synchronously.
	*
	* @param {string} dirPath path of directory to remove
	* @private
	*/
	function FN_RIMRAF_SYNC(dirPath) {
		return fs$1.rmSync(dirPath, { recursive: true });
	}
	/**
	* Gets a temporary file name.
	*
	* @param {(Options|tmpNameCallback)} options options or callback
	* @param {?tmpNameCallback} callback the callback function
	*/
	function tmpName(options, callback) {
		const args = _parseArguments(options, callback), opts = args[0], cb = args[1];
		_assertAndSanitizeOptions(opts, function(err, sanitizedOptions) {
			if (err) return cb(err);
			let tries = sanitizedOptions.tries;
			(function _getUniqueName() {
				try {
					const name = _generateTmpName(sanitizedOptions);
					fs$1.stat(name, function(err) {
						/* istanbul ignore else */
						if (!err) {
							/* istanbul ignore else */
							if (tries-- > 0) return _getUniqueName();
							return cb(/* @__PURE__ */ new Error("Could not get a unique tmp filename, max tries reached " + name));
						}
						cb(null, name);
					});
				} catch (err) {
					cb(err);
				}
			})();
		});
	}
	/**
	* Synchronous version of tmpName.
	*
	* @param {Object} options
	* @returns {string} the generated random name
	* @throws {Error} if the options are invalid or could not generate a filename
	*/
	function tmpNameSync(options) {
		const opts = _parseArguments(options)[0];
		const sanitizedOptions = _assertAndSanitizeOptionsSync(opts);
		let tries = sanitizedOptions.tries;
		do {
			const name = _generateTmpName(sanitizedOptions);
			try {
				fs$1.statSync(name);
			} catch (e) {
				return name;
			}
		} while (tries-- > 0);
		throw new Error("Could not get a unique tmp filename, max tries reached");
	}
	/**
	* Creates and opens a temporary file.
	*
	* @param {(Options|null|undefined|fileCallback)} options the config options or the callback function or null or undefined
	* @param {?fileCallback} callback
	*/
	function file(options, callback) {
		const args = _parseArguments(options, callback), opts = args[0], cb = args[1];
		tmpName(opts, function _tmpNameCreated(err, name) {
			/* istanbul ignore else */
			if (err) return cb(err);
			fs$1.open(name, CREATE_FLAGS, opts.mode || FILE_MODE, function _fileCreated(err, fd) {
				if (err) return cb(err);
				if (opts.discardDescriptor) return fs$1.close(fd, function _discardCallback(possibleErr) {
					return cb(possibleErr, name, void 0, _prepareTmpFileRemoveCallback(name, -1, opts, false));
				});
				else {
					const discardOrDetachDescriptor = opts.discardDescriptor || opts.detachDescriptor;
					cb(null, name, fd, _prepareTmpFileRemoveCallback(name, discardOrDetachDescriptor ? -1 : fd, opts, false));
				}
			});
		});
	}
	/**
	* Synchronous version of file.
	*
	* @param {Options} options
	* @returns {FileSyncObject} object consists of name, fd and removeCallback
	* @throws {Error} if cannot create a file
	*/
	function fileSync(options) {
		const opts = _parseArguments(options)[0];
		const discardOrDetachDescriptor = opts.discardDescriptor || opts.detachDescriptor;
		const name = tmpNameSync(opts);
		let fd = fs$1.openSync(name, CREATE_FLAGS, opts.mode || FILE_MODE);
		/* istanbul ignore else */
		if (opts.discardDescriptor) {
			fs$1.closeSync(fd);
			fd = void 0;
		}
		return {
			name,
			fd,
			removeCallback: _prepareTmpFileRemoveCallback(name, discardOrDetachDescriptor ? -1 : fd, opts, true)
		};
	}
	/**
	* Creates a temporary directory.
	*
	* @param {(Options|dirCallback)} options the options or the callback function
	* @param {?dirCallback} callback
	*/
	function dir(options, callback) {
		const args = _parseArguments(options, callback), opts = args[0], cb = args[1];
		tmpName(opts, function _tmpNameCreated(err, name) {
			/* istanbul ignore else */
			if (err) return cb(err);
			fs$1.mkdir(name, opts.mode || DIR_MODE, function _dirCreated(err) {
				/* istanbul ignore else */
				if (err) return cb(err);
				cb(null, name, _prepareTmpDirRemoveCallback(name, opts, false));
			});
		});
	}
	/**
	* Synchronous version of dir.
	*
	* @param {Options} options
	* @returns {DirSyncObject} object consists of name and removeCallback
	* @throws {Error} if it cannot create a directory
	*/
	function dirSync(options) {
		const opts = _parseArguments(options)[0];
		const name = tmpNameSync(opts);
		fs$1.mkdirSync(name, opts.mode || DIR_MODE);
		return {
			name,
			removeCallback: _prepareTmpDirRemoveCallback(name, opts, true)
		};
	}
	/**
	* Removes files asynchronously.
	*
	* @param {Object} fdPath
	* @param {Function} next
	* @private
	*/
	function _removeFileAsync(fdPath, next) {
		const _handler = function(err) {
			if (err && !_isENOENT(err)) return next(err);
			next();
		};
		if (0 <= fdPath[0]) fs$1.close(fdPath[0], function() {
			fs$1.unlink(fdPath[1], _handler);
		});
		else fs$1.unlink(fdPath[1], _handler);
	}
	/**
	* Removes files synchronously.
	*
	* @param {Object} fdPath
	* @private
	*/
	function _removeFileSync(fdPath) {
		let rethrownException = null;
		try {
			if (0 <= fdPath[0]) fs$1.closeSync(fdPath[0]);
		} catch (e) {
			if (!_isEBADF(e) && !_isENOENT(e)) throw e;
		} finally {
			try {
				fs$1.unlinkSync(fdPath[1]);
			} catch (e) {
				if (!_isENOENT(e)) rethrownException = e;
			}
		}
		if (rethrownException !== null) throw rethrownException;
	}
	/**
	* Prepares the callback for removal of the temporary file.
	*
	* Returns either a sync callback or a async callback depending on whether
	* fileSync or file was called, which is expressed by the sync parameter.
	*
	* @param {string} name the path of the file
	* @param {number} fd file descriptor
	* @param {Object} opts
	* @param {boolean} sync
	* @returns {fileCallback | fileCallbackSync}
	* @private
	*/
	function _prepareTmpFileRemoveCallback(name, fd, opts, sync) {
		const removeCallbackSync = _prepareRemoveCallback(_removeFileSync, [fd, name], sync);
		const removeCallback = _prepareRemoveCallback(_removeFileAsync, [fd, name], sync, removeCallbackSync);
		if (!opts.keep) _removeObjects.unshift(removeCallbackSync);
		return sync ? removeCallbackSync : removeCallback;
	}
	/**
	* Prepares the callback for removal of the temporary directory.
	*
	* Returns either a sync callback or a async callback depending on whether
	* tmpFileSync or tmpFile was called, which is expressed by the sync parameter.
	*
	* @param {string} name
	* @param {Object} opts
	* @param {boolean} sync
	* @returns {Function} the callback
	* @private
	*/
	function _prepareTmpDirRemoveCallback(name, opts, sync) {
		const removeFunction = opts.unsafeCleanup ? rimraf : fs$1.rmdir.bind(fs$1);
		const removeCallbackSync = _prepareRemoveCallback(opts.unsafeCleanup ? FN_RIMRAF_SYNC : FN_RMDIR_SYNC, name, sync);
		const removeCallback = _prepareRemoveCallback(removeFunction, name, sync, removeCallbackSync);
		if (!opts.keep) _removeObjects.unshift(removeCallbackSync);
		return sync ? removeCallbackSync : removeCallback;
	}
	/**
	* Creates a guarded function wrapping the removeFunction call.
	*
	* The cleanup callback is save to be called multiple times.
	* Subsequent invocations will be ignored.
	*
	* @param {Function} removeFunction
	* @param {string} fileOrDirName
	* @param {boolean} sync
	* @param {cleanupCallbackSync?} cleanupCallbackSync
	* @returns {cleanupCallback | cleanupCallbackSync}
	* @private
	*/
	function _prepareRemoveCallback(removeFunction, fileOrDirName, sync, cleanupCallbackSync) {
		let called = false;
		return function _cleanupCallback(next) {
			/* istanbul ignore else */
			if (!called) {
				const toRemove = cleanupCallbackSync || _cleanupCallback;
				const index = _removeObjects.indexOf(toRemove);
				/* istanbul ignore else */
				if (index >= 0) _removeObjects.splice(index, 1);
				called = true;
				if (sync || removeFunction === FN_RMDIR_SYNC || removeFunction === FN_RIMRAF_SYNC) return removeFunction(fileOrDirName);
				else return removeFunction(fileOrDirName, next || function() {});
			}
		};
	}
	/**
	* The garbage collector.
	*
	* @private
	*/
	function _garbageCollector() {
		/* istanbul ignore else */
		if (!_gracefulCleanup) return;
		while (_removeObjects.length) try {
			_removeObjects[0]();
		} catch (e) {}
	}
	/**
	* Random name generator based on crypto.
	* Adapted from http://blog.tompawlak.org/how-to-generate-random-values-nodejs-javascript
	*
	* @param {number} howMany
	* @returns {string} the generated random name
	* @private
	*/
	function _randomChars(howMany) {
		let value = [], rnd = null;
		try {
			rnd = crypto.randomBytes(howMany);
		} catch (e) {
			rnd = crypto.pseudoRandomBytes(howMany);
		}
		for (let i = 0; i < howMany; i++) value.push(RANDOM_CHARS[rnd[i] % 62]);
		return value.join("");
	}
	/**
	* Checks whether the `obj` parameter is defined or not.
	*
	* @param {Object} obj
	* @returns {boolean} true if the object is undefined
	* @private
	*/
	function _isUndefined(obj) {
		return typeof obj === "undefined";
	}
	/**
	* Parses the function arguments.
	*
	* This function helps to have optional arguments.
	*
	* @param {(Options|null|undefined|Function)} options
	* @param {?Function} callback
	* @returns {Array} parsed arguments
	* @private
	*/
	function _parseArguments(options, callback) {
		/* istanbul ignore else */
		if (typeof options === "function") return [{}, options];
		/* istanbul ignore else */
		if (_isUndefined(options)) return [{}, callback];
		const actualOptions = {};
		for (const key of Object.getOwnPropertyNames(options)) actualOptions[key] = options[key];
		return [actualOptions, callback];
	}
	/**
	* Resolve the specified path name in respect to tmpDir.
	*
	* The specified name might include relative path components, e.g. ../
	* so we need to resolve in order to be sure that is is located inside tmpDir
	*
	* @private
	*/
	function _resolvePath(name, tmpDir, cb) {
		const pathToResolve = path.isAbsolute(name) ? name : path.join(tmpDir, name);
		fs$1.stat(pathToResolve, function(err) {
			if (err) fs$1.realpath(path.dirname(pathToResolve), function(err, parentDir) {
				if (err) return cb(err);
				cb(null, path.join(parentDir, path.basename(pathToResolve)));
			});
			else fs$1.realpath(pathToResolve, cb);
		});
	}
	/**
	* Resolve the specified path name in respect to tmpDir.
	*
	* The specified name might include relative path components, e.g. ../
	* so we need to resolve in order to be sure that is is located inside tmpDir
	*
	* @private
	*/
	function _resolvePathSync(name, tmpDir) {
		const pathToResolve = path.isAbsolute(name) ? name : path.join(tmpDir, name);
		try {
			fs$1.statSync(pathToResolve);
			return fs$1.realpathSync(pathToResolve);
		} catch (_err) {
			const parentDir = fs$1.realpathSync(path.dirname(pathToResolve));
			return path.join(parentDir, path.basename(pathToResolve));
		}
	}
	/**
	* Generates a new temporary name.
	*
	* @param {Object} opts
	* @returns {string} the new random name according to opts
	* @private
	*/
	function _generateTmpName(opts) {
		const tmpDir = opts.tmpdir;
		/* istanbul ignore else */
		if (!_isUndefined(opts.name)) return path.join(tmpDir, opts.dir, opts.name);
		/* istanbul ignore else */
		if (!_isUndefined(opts.template)) return path.join(tmpDir, opts.dir, opts.template).replace(TEMPLATE_PATTERN, _randomChars(6));
		const name = [
			opts.prefix ? opts.prefix : "tmp",
			"-",
			process.pid,
			"-",
			_randomChars(12),
			opts.postfix ? "-" + opts.postfix : ""
		].join("");
		return path.join(tmpDir, opts.dir, name);
	}
	/**
	* Check the prefix, postfix, and template options.
	*
	* Rejects non-string inputs so that a non-string `.includes('..')` cannot evade
	* the substring check (e.g. an Array whose `.includes('..')` is element-wise,
	* or a duck-typed object with a custom `.includes`), and so that the value is
	* not later coerced to a string with traversal sequences via `Array.prototype.join`
	* or `path.join`.
	*
	* @private
	*/
	function _assertPath(option, value) {
		if (typeof value !== "string") throw new Error(`${option} option must be a string, got "${typeof value}".`);
		if (value.includes("..")) throw new Error("Relative value not allowed");
		return value;
	}
	/**
	* Asserts and sanitizes the basic options.
	*
	* @private
	*/
	function _assertOptionsBase(options) {
		if (!_isUndefined(options.name)) {
			const name = options.name;
			if (path.isAbsolute(name)) throw new Error(`name option must not contain an absolute path, found "${name}".`);
			const basename = path.basename(name);
			if (basename === ".." || basename === "." || basename !== name) throw new Error(`name option must not contain a path, found "${name}".`);
		}
		/* istanbul ignore else */
		if (!_isUndefined(options.template)) {
			if (typeof options.template !== "string") throw new Error(`template option must be a string, got "${typeof options.template}".`);
			if (!options.template.match(TEMPLATE_PATTERN)) throw new Error(`Invalid template, found "${options.template}".`);
		}
		/* istanbul ignore else */
		if (!_isUndefined(options.tries) && isNaN(options.tries) || options.tries < 0) throw new Error(`Invalid tries, found "${options.tries}".`);
		options.tries = _isUndefined(options.name) ? options.tries || DEFAULT_TRIES : 1;
		options.keep = !!options.keep;
		options.detachDescriptor = !!options.detachDescriptor;
		options.discardDescriptor = !!options.discardDescriptor;
		options.unsafeCleanup = !!options.unsafeCleanup;
		options.prefix = _isUndefined(options.prefix) ? "" : _assertPath("prefix", options.prefix);
		options.postfix = _isUndefined(options.postfix) ? "" : _assertPath("postfix", options.postfix);
		options.template = _isUndefined(options.template) ? void 0 : _assertPath("template", options.template);
	}
	/**
	* Gets the relative directory to tmpDir.
	*
	* @private
	*/
	function _getRelativePath(option, name, tmpDir, cb) {
		if (_isUndefined(name)) return cb(null);
		_resolvePath(name, tmpDir, function(err, resolvedPath) {
			if (err) return cb(err);
			const relativePath = path.relative(tmpDir, resolvedPath);
			if (relativePath.startsWith("..") || path.isAbsolute(relativePath)) return cb(/* @__PURE__ */ new Error(`${option} option must be relative to "${tmpDir}", found "${relativePath}".`));
			cb(null, relativePath);
		});
	}
	/**
	* Gets the relative path to tmpDir.
	*
	* @private
	*/
	function _getRelativePathSync(option, name, tmpDir) {
		if (_isUndefined(name)) return;
		const resolvedPath = _resolvePathSync(name, tmpDir);
		const relativePath = path.relative(tmpDir, resolvedPath);
		if (relativePath.startsWith("..") || path.isAbsolute(relativePath)) throw new Error(`${option} option must be relative to "${tmpDir}", found "${relativePath}".`);
		return relativePath;
	}
	/**
	* Asserts whether the specified options are valid, also sanitizes options and provides sane defaults for missing
	* options.
	*
	* @private
	*/
	function _assertAndSanitizeOptions(options, cb) {
		_getTmpDir(options, function(err, tmpDir) {
			if (err) return cb(err);
			options.tmpdir = tmpDir;
			try {
				_assertOptionsBase(options, tmpDir);
			} catch (err) {
				return cb(err);
			}
			_getRelativePath("dir", options.dir, tmpDir, function(err, dir) {
				if (err) return cb(err);
				options.dir = _isUndefined(dir) ? "" : dir;
				_getRelativePath("template", options.template, tmpDir, function(err, template) {
					if (err) return cb(err);
					options.template = template;
					cb(null, options);
				});
			});
		});
	}
	/**
	* Asserts whether the specified options are valid, also sanitizes options and provides sane defaults for missing
	* options.
	*
	* @private
	*/
	function _assertAndSanitizeOptionsSync(options) {
		const tmpDir = options.tmpdir = _getTmpDirSync(options);
		_assertOptionsBase(options, tmpDir);
		const dir = _getRelativePathSync("dir", options.dir, tmpDir);
		options.dir = _isUndefined(dir) ? "" : dir;
		options.template = _getRelativePathSync("template", options.template, tmpDir);
		return options;
	}
	/**
	* Helper for testing against EBADF to compensate changes made to Node 7.x under Windows.
	*
	* @private
	*/
	function _isEBADF(error) {
		return _isExpectedError(error, -EBADF, "EBADF");
	}
	/**
	* Helper for testing against ENOENT to compensate changes made to Node 7.x under Windows.
	*
	* @private
	*/
	function _isENOENT(error) {
		return _isExpectedError(error, -ENOENT, "ENOENT");
	}
	/**
	* Helper to determine whether the expected error code matches the actual code and errno,
	* which will differ between the supported node versions.
	*
	* - Node >= 7.0:
	*   error.code {string}
	*   error.errno {number} any numerical value will be negated
	*
	* CAVEAT
	*
	* On windows, the errno for EBADF is -4083 but os.constants.errno.EBADF is different and we must assume that ENOENT
	* is no different here.
	*
	* @param {SystemError} error
	* @param {number} errno
	* @param {string} code
	* @private
	*/
	function _isExpectedError(error, errno, code) {
		return IS_WIN32 ? error.code === code : error.code === code && error.errno === errno;
	}
	/**
	* Sets the graceful cleanup.
	*
	* If graceful cleanup is set, tmp will remove all controlled temporary objects on process exit, otherwise the
	* temporary objects will remain in place, waiting to be cleaned up on system restart or otherwise scheduled temporary
	* object removals.
	*/
	function setGracefulCleanup() {
		_gracefulCleanup = true;
	}
	/**
	* Returns the currently configured tmp dir from os.tmpdir().
	*
	* @private
	*/
	function _getTmpDir(options, cb) {
		return fs$1.realpath(options && options.tmpdir || os.tmpdir(), cb);
	}
	/**
	* Returns the currently configured tmp dir from os.tmpdir().
	*
	* @private
	*/
	function _getTmpDirSync(options) {
		return fs$1.realpathSync(options && options.tmpdir || os.tmpdir());
	}
	process.addListener(EXIT, _garbageCollector);
	/**
	* Configuration options.
	*
	* @typedef {Object} Options
	* @property {?boolean} keep the temporary object (file or dir) will not be garbage collected
	* @property {?number} tries the number of tries before give up the name generation
	* @property (?int) mode the access mode, defaults are 0o700 for directories and 0o600 for files
	* @property {?string} template the "mkstemp" like filename template
	* @property {?string} name fixed name relative to tmpdir or the specified dir option
	* @property {?string} dir tmp directory relative to the root tmp directory in use
	* @property {?string} prefix prefix for the generated name
	* @property {?string} postfix postfix for the generated name
	* @property {?string} tmpdir the root tmp directory which overrides the os tmpdir
	* @property {?boolean} unsafeCleanup recursively removes the created temporary directory, even when it's not empty
	* @property {?boolean} detachDescriptor detaches the file descriptor, caller is responsible for closing the file, tmp will no longer try closing the file during garbage collection
	* @property {?boolean} discardDescriptor discards the file descriptor (closes file, fd is -1), tmp will no longer try closing the file during garbage collection
	*/
	/**
	* @typedef {Object} FileSyncObject
	* @property {string} name the name of the file
	* @property {string} fd the file descriptor or -1 if the fd has been discarded
	* @property {fileCallback} removeCallback the callback function to remove the file
	*/
	/**
	* @typedef {Object} DirSyncObject
	* @property {string} name the name of the directory
	* @property {fileCallback} removeCallback the callback function to remove the directory
	*/
	/**
	* @callback tmpNameCallback
	* @param {?Error} err the error object if anything goes wrong
	* @param {string} name the temporary file name
	*/
	/**
	* @callback fileCallback
	* @param {?Error} err the error object if anything goes wrong
	* @param {string} name the temporary file name
	* @param {number} fd the file descriptor or -1 if the fd had been discarded
	* @param {cleanupCallback} fn the cleanup callback function
	*/
	/**
	* @callback fileCallbackSync
	* @param {?Error} err the error object if anything goes wrong
	* @param {string} name the temporary file name
	* @param {number} fd the file descriptor or -1 if the fd had been discarded
	* @param {cleanupCallbackSync} fn the cleanup callback function
	*/
	/**
	* @callback dirCallback
	* @param {?Error} err the error object if anything goes wrong
	* @param {string} name the temporary file name
	* @param {cleanupCallback} fn the cleanup callback function
	*/
	/**
	* @callback dirCallbackSync
	* @param {?Error} err the error object if anything goes wrong
	* @param {string} name the temporary file name
	* @param {cleanupCallbackSync} fn the cleanup callback function
	*/
	/**
	* Removes the temporary created file or directory.
	*
	* @callback cleanupCallback
	* @param {simpleCallback} [next] function to call whenever the tmp object needs to be removed
	*/
	/**
	* Removes the temporary created file or directory.
	*
	* @callback cleanupCallbackSync
	*/
	/**
	* Callback function for function composition.
	* @see {@link https://github.com/raszi/node-tmp/issues/57|raszi/node-tmp#57}
	*
	* @callback simpleCallback
	*/
	Object.defineProperty(module.exports, "tmpdir", {
		enumerable: true,
		configurable: false,
		get: function() {
			return _getTmpDirSync();
		}
	});
	module.exports.dir = dir;
	module.exports.dirSync = dirSync;
	module.exports.file = file;
	module.exports.fileSync = fileSync;
	module.exports.tmpName = tmpName;
	module.exports.tmpNameSync = tmpNameSync;
	module.exports.setGracefulCleanup = setGracefulCleanup;
}));
//#endregion
//#region node_modules/exceljs/lib/utils/iterate-stream.js
var require_iterate_stream = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = async function* iterateStream(stream) {
		const contents = [];
		stream.on("data", (data) => contents.push(data));
		let resolveStreamEndedPromise;
		const streamEndedPromise = new Promise((resolve) => resolveStreamEndedPromise = resolve);
		let ended = false;
		stream.on("end", () => {
			ended = true;
			resolveStreamEndedPromise();
		});
		let error = false;
		stream.on("error", (err) => {
			error = err;
			resolveStreamEndedPromise();
		});
		while (!ended || contents.length > 0) {
			if (contents.length === 0) {
				stream.resume();
				await Promise.race([once(stream, "data"), streamEndedPromise]);
			} else {
				stream.pause();
				yield contents.shift();
			}
			if (error) throw error;
		}
		resolveStreamEndedPromise();
	};
	function once(eventEmitter, type) {
		return new Promise((resolve) => {
			let fired = false;
			const handler = () => {
				if (!fired) {
					fired = true;
					eventEmitter.removeListener(type, handler);
					resolve();
				}
			};
			eventEmitter.addListener(type, handler);
		});
	}
}));
//#endregion
//#region node_modules/exceljs/lib/stream/xlsx/worksheet-reader.js
var require_worksheet_reader = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var { EventEmitter: EventEmitter$2 } = __require("events");
	var parseSax = require_parse_sax();
	var _ = require_under_dash();
	var utils = require_utils();
	var colCache = require_col_cache();
	var Dimensions = require_range();
	var Row = require_row();
	var Column = require_column();
	var WorksheetReader = class extends EventEmitter$2 {
		constructor({ workbook, id, iterator, options }) {
			super();
			this.workbook = workbook;
			this.id = id;
			this.iterator = iterator;
			this.options = options || {};
			this.name = `Sheet${this.id}`;
			this._columns = null;
			this._keys = {};
			this._dimensions = new Dimensions();
		}
		destroy() {
			throw new Error("Invalid Operation: destroy");
		}
		get dimensions() {
			return this._dimensions;
		}
		get columns() {
			return this._columns;
		}
		getColumn(c) {
			if (typeof c === "string") {
				const col = this._keys[c];
				if (col) return col;
				c = colCache.l2n(c);
			}
			if (!this._columns) this._columns = [];
			if (c > this._columns.length) {
				let n = this._columns.length + 1;
				while (n <= c) this._columns.push(new Column(this, n++));
			}
			return this._columns[c - 1];
		}
		getColumnKey(key) {
			return this._keys[key];
		}
		setColumnKey(key, value) {
			this._keys[key] = value;
		}
		deleteColumnKey(key) {
			delete this._keys[key];
		}
		eachColumnKey(f) {
			_.each(this._keys, f);
		}
		async read() {
			try {
				for await (const events of this.parse()) for (const { eventType, value } of events) this.emit(eventType, value);
				this.emit("finished");
			} catch (error) {
				this.emit("error", error);
			}
		}
		async *[Symbol.asyncIterator]() {
			for await (const events of this.parse()) for (const { eventType, value } of events) if (eventType === "row") yield value;
		}
		async *parse() {
			const { iterator, options } = this;
			let emitSheet = false;
			let emitHyperlinks = false;
			let hyperlinks = null;
			switch (options.worksheets) {
				case "emit": emitSheet = true;
			}
			switch (options.hyperlinks) {
				case "emit":
					emitHyperlinks = true;
					break;
				case "cache": this.hyperlinks = hyperlinks = {};
			}
			if (!emitSheet && !emitHyperlinks && !hyperlinks) return;
			const { sharedStrings, styles, properties } = this.workbook;
			let inCols = false;
			let inRows = false;
			let inHyperlinks = false;
			let cols = null;
			let row = null;
			let c = null;
			let current = null;
			for await (const events of parseSax(iterator)) {
				const worksheetEvents = [];
				for (const { eventType, value } of events) if (eventType === "opentag") {
					const node = value;
					if (emitSheet) switch (node.name) {
						case "cols":
							inCols = true;
							cols = [];
							break;
						case "sheetData":
							inRows = true;
							break;
						case "col":
							if (inCols) cols.push({
								min: parseInt(node.attributes.min, 10),
								max: parseInt(node.attributes.max, 10),
								width: parseFloat(node.attributes.width),
								styleId: parseInt(node.attributes.style || "0", 10)
							});
							break;
						case "row":
							if (inRows) {
								const r = parseInt(node.attributes.r, 10);
								row = new Row(this, r);
								if (node.attributes.ht) row.height = parseFloat(node.attributes.ht);
								if (node.attributes.s) {
									const styleId = parseInt(node.attributes.s, 10);
									const style = styles.getStyleModel(styleId);
									if (style) row.style = style;
								}
							}
							break;
						case "c":
							if (row) c = {
								ref: node.attributes.r,
								s: parseInt(node.attributes.s, 10),
								t: node.attributes.t
							};
							break;
						case "f":
							if (c) current = c.f = { text: "" };
							break;
						case "v":
							if (c) current = c.v = { text: "" };
							break;
						case "is":
						case "t": if (c) current = c.v = { text: "" };
					}
					if (emitHyperlinks || hyperlinks) switch (node.name) {
						case "hyperlinks":
							inHyperlinks = true;
							break;
						case "hyperlink": if (inHyperlinks) {
							const hyperlink = {
								ref: node.attributes.ref,
								rId: node.attributes["r:id"]
							};
							if (emitHyperlinks) worksheetEvents.push({
								eventType: "hyperlink",
								value: hyperlink
							});
							else hyperlinks[hyperlink.ref] = hyperlink;
						}
					}
				} else if (eventType === "text") {
					if (emitSheet) {
						if (current) current.text += value;
					}
				} else if (eventType === "closetag") {
					const node = value;
					if (emitSheet) switch (node.name) {
						case "cols":
							inCols = false;
							this._columns = Column.fromModel(cols);
							break;
						case "sheetData":
							inRows = false;
							break;
						case "row":
							this._dimensions.expandRow(row);
							worksheetEvents.push({
								eventType: "row",
								value: row
							});
							row = null;
							break;
						case "c": if (row && c) {
							const address = colCache.decodeAddress(c.ref);
							const cell = row.getCell(address.col);
							if (c.s) {
								const style = styles.getStyleModel(c.s);
								if (style) cell.style = style;
							}
							if (c.f) {
								const cellValue = { formula: c.f.text };
								if (c.v) {
									if (c.t === "str") cellValue.result = utils.xmlDecode(c.v.text);
									else cellValue.result = parseFloat(c.v.text);
								}
								cell.value = cellValue;
							} else if (c.v) switch (c.t) {
								case "s": {
									const index = parseInt(c.v.text, 10);
									if (sharedStrings) cell.value = sharedStrings[index];
									else cell.value = { sharedString: index };
									break;
								}
								case "inlineStr":
								case "str":
									cell.value = utils.xmlDecode(c.v.text);
									break;
								case "e":
									cell.value = { error: c.v.text };
									break;
								case "b":
									cell.value = parseInt(c.v.text, 10) !== 0;
									break;
								default: if (utils.isDateFmt(cell.numFmt)) cell.value = utils.excelToDate(parseFloat(c.v.text), properties.model && properties.model.date1904);
								else cell.value = parseFloat(c.v.text);
							}
							if (hyperlinks) {
								const hyperlink = hyperlinks[c.ref];
								if (hyperlink) {
									cell.text = cell.value;
									cell.value = void 0;
									cell.hyperlink = hyperlink;
								}
							}
							c = null;
						}
					}
					if (emitHyperlinks || hyperlinks) switch (node.name) {
						case "hyperlinks": inHyperlinks = false;
					}
				}
				if (worksheetEvents.length > 0) yield worksheetEvents;
			}
		}
	};
	module.exports = WorksheetReader;
}));
//#endregion
//#region node_modules/exceljs/lib/stream/xlsx/hyperlink-reader.js
var require_hyperlink_reader = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var { EventEmitter: EventEmitter$1 } = __require("events");
	var parseSax = require_parse_sax();
	var Enums = require_enums();
	var RelType = require_rel_type();
	var HyperlinkReader = class extends EventEmitter$1 {
		constructor({ workbook, id, iterator, options }) {
			super();
			this.workbook = workbook;
			this.id = id;
			this.iterator = iterator;
			this.options = options;
		}
		get count() {
			return this.hyperlinks && this.hyperlinks.length || 0;
		}
		each(fn) {
			return this.hyperlinks.forEach(fn);
		}
		async read() {
			const { iterator, options } = this;
			let emitHyperlinks = false;
			let hyperlinks = null;
			switch (options.hyperlinks) {
				case "emit":
					emitHyperlinks = true;
					break;
				case "cache": this.hyperlinks = hyperlinks = {};
			}
			if (!emitHyperlinks && !hyperlinks) {
				this.emit("finished");
				return;
			}
			try {
				for await (const events of parseSax(iterator)) for (const { eventType, value } of events) if (eventType === "opentag") {
					const node = value;
					if (node.name === "Relationship") {
						const rId = node.attributes.Id;
						switch (node.attributes.Type) {
							case RelType.Hyperlink: {
								const relationship = {
									type: Enums.RelationshipType.Styles,
									rId,
									target: node.attributes.Target,
									targetMode: node.attributes.TargetMode
								};
								if (emitHyperlinks) this.emit("hyperlink", relationship);
								else hyperlinks[relationship.rId] = relationship;
							}
						}
					}
				}
				this.emit("finished");
			} catch (error) {
				this.emit("error", error);
			}
		}
	};
	module.exports = HyperlinkReader;
}));
//#endregion
//#region node_modules/exceljs/lib/stream/xlsx/workbook-reader.js
var require_workbook_reader = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var fs = __require("fs");
	var { EventEmitter } = __require("events");
	var { PassThrough, Readable } = require_readable$2();
	var nodeStream = __require("stream");
	var unzip = require_unzip();
	var tmp = require_tmp();
	var iterateStream = require_iterate_stream();
	var parseSax = require_parse_sax();
	var StyleManager = require_styles_xform();
	var WorkbookXform = require_workbook_xform();
	var RelationshipsXform = require_relationships_xform();
	var WorksheetReader = require_worksheet_reader();
	var HyperlinkReader = require_hyperlink_reader();
	tmp.setGracefulCleanup();
	var WorkbookReader = class extends EventEmitter {
		constructor(input, options = {}) {
			super();
			this.input = input;
			this.options = {
				worksheets: "emit",
				sharedStrings: "cache",
				hyperlinks: "ignore",
				styles: "ignore",
				entries: "ignore",
				...options
			};
			this.styles = new StyleManager();
			this.styles.init();
		}
		_getStream(input) {
			if (input instanceof nodeStream.Readable || input instanceof Readable) return input;
			if (typeof input === "string") return fs.createReadStream(input);
			throw new Error(`Could not recognise input: ${input}`);
		}
		async read(input, options) {
			try {
				for await (const { eventType, value } of this.parse(input, options)) switch (eventType) {
					case "shared-strings":
						this.emit(eventType, value);
						break;
					case "worksheet":
						this.emit(eventType, value);
						await value.read();
						break;
					case "hyperlinks": this.emit(eventType, value);
				}
				this.emit("end");
				this.emit("finished");
			} catch (error) {
				this.emit("error", error);
			}
		}
		async *[Symbol.asyncIterator]() {
			for await (const { eventType, value } of this.parse()) if (eventType === "worksheet") yield value;
		}
		async *parse(input, options) {
			if (options) this.options = options;
			const stream = this.stream = this._getStream(input || this.input);
			const zip = unzip.Parse({ forceStream: true });
			stream.pipe(zip);
			const waitingWorkSheets = [];
			for await (const entry of iterateStream(zip)) {
				let match;
				let sheetNo;
				switch (entry.path) {
					case "_rels/.rels": break;
					case "xl/_rels/workbook.xml.rels":
						await this._parseRels(entry);
						break;
					case "xl/workbook.xml":
						await this._parseWorkbook(entry);
						break;
					case "xl/sharedStrings.xml":
						yield* this._parseSharedStrings(entry);
						break;
					case "xl/styles.xml":
						await this._parseStyles(entry);
						break;
					default: if (entry.path.match(/xl\/worksheets\/sheet\d+[.]xml/)) {
						match = entry.path.match(/xl\/worksheets\/sheet(\d+)[.]xml/);
						sheetNo = match[1];
						if (this.sharedStrings && this.workbookRels) yield* this._parseWorksheet(iterateStream(entry), sheetNo);
						else await new Promise((resolve, reject) => {
							tmp.file((err, path, fd, tempFileCleanupCallback) => {
								if (err) return reject(err);
								waitingWorkSheets.push({
									sheetNo,
									path,
									tempFileCleanupCallback
								});
								const tempStream = fs.createWriteStream(path);
								tempStream.on("error", reject);
								entry.pipe(tempStream);
								return tempStream.on("finish", () => {
									return resolve();
								});
							});
						});
					} else if (entry.path.match(/xl\/worksheets\/_rels\/sheet\d+[.]xml.rels/)) {
						match = entry.path.match(/xl\/worksheets\/_rels\/sheet(\d+)[.]xml.rels/);
						sheetNo = match[1];
						yield* this._parseHyperlinks(iterateStream(entry), sheetNo);
					}
				}
				entry.autodrain();
			}
			for (const { sheetNo, path, tempFileCleanupCallback } of waitingWorkSheets) {
				let fileStream = fs.createReadStream(path);
				if (!fileStream[Symbol.asyncIterator]) fileStream = fileStream.pipe(new PassThrough());
				yield* this._parseWorksheet(fileStream, sheetNo);
				tempFileCleanupCallback();
			}
		}
		_emitEntry(payload) {
			if (this.options.entries === "emit") this.emit("entry", payload);
		}
		async _parseRels(entry) {
			const xform = new RelationshipsXform();
			this.workbookRels = await xform.parseStream(iterateStream(entry));
		}
		async _parseWorkbook(entry) {
			this._emitEntry({ type: "workbook" });
			const workbook = new WorkbookXform();
			await workbook.parseStream(iterateStream(entry));
			this.properties = workbook.map.workbookPr;
			this.model = workbook.model;
		}
		async *_parseSharedStrings(entry) {
			this._emitEntry({ type: "shared-strings" });
			switch (this.options.sharedStrings) {
				case "cache":
					this.sharedStrings = [];
					break;
				case "emit": break;
				default: return;
			}
			let text = null;
			let richText = [];
			let index = 0;
			let font = null;
			for await (const events of parseSax(iterateStream(entry))) for (const { eventType, value } of events) if (eventType === "opentag") {
				const node = value;
				switch (node.name) {
					case "b":
						font = font || {};
						font.bold = true;
						break;
					case "charset":
						font = font || {};
						font.charset = parseInt(node.attributes.charset, 10);
						break;
					case "color":
						font = font || {};
						font.color = {};
						if (node.attributes.rgb) font.color.argb = node.attributes.argb;
						if (node.attributes.val) font.color.argb = node.attributes.val;
						if (node.attributes.theme) font.color.theme = node.attributes.theme;
						break;
					case "family":
						font = font || {};
						font.family = parseInt(node.attributes.val, 10);
						break;
					case "i":
						font = font || {};
						font.italic = true;
						break;
					case "outline":
						font = font || {};
						font.outline = true;
						break;
					case "rFont":
						font = font || {};
						font.name = node.value;
						break;
					case "si":
						font = null;
						richText = [];
						text = null;
						break;
					case "sz":
						font = font || {};
						font.size = parseInt(node.attributes.val, 10);
						break;
					case "strike": break;
					case "t":
						text = null;
						break;
					case "u":
						font = font || {};
						font.underline = true;
						break;
					case "vertAlign":
						font = font || {};
						font.vertAlign = node.attributes.val;
				}
			} else if (eventType === "text") text = text ? text + value : value;
			else if (eventType === "closetag") switch (value.name) {
				case "r":
					richText.push({
						font,
						text
					});
					font = null;
					text = null;
					break;
				case "si":
					if (this.options.sharedStrings === "cache") this.sharedStrings.push(richText.length ? { richText } : text);
					else if (this.options.sharedStrings === "emit") yield {
						index: index++,
						text: richText.length ? { richText } : text
					};
					richText = [];
					font = null;
					text = null;
			}
		}
		async _parseStyles(entry) {
			this._emitEntry({ type: "styles" });
			if (this.options.styles === "cache") {
				this.styles = new StyleManager();
				await this.styles.parseStream(iterateStream(entry));
			}
		}
		*_parseWorksheet(iterator, sheetNo) {
			this._emitEntry({
				type: "worksheet",
				id: sheetNo
			});
			const worksheetReader = new WorksheetReader({
				workbook: this,
				id: sheetNo,
				iterator,
				options: this.options
			});
			const matchingRel = (this.workbookRels || []).find((rel) => rel.Target === `worksheets/sheet${sheetNo}.xml`);
			const matchingSheet = matchingRel && (this.model.sheets || []).find((sheet) => sheet.rId === matchingRel.Id);
			if (matchingSheet) {
				worksheetReader.id = matchingSheet.id;
				worksheetReader.name = matchingSheet.name;
				worksheetReader.state = matchingSheet.state;
			}
			if (this.options.worksheets === "emit") yield {
				eventType: "worksheet",
				value: worksheetReader
			};
		}
		*_parseHyperlinks(iterator, sheetNo) {
			this._emitEntry({
				type: "hyperlinks",
				id: sheetNo
			});
			const hyperlinksReader = new HyperlinkReader({
				workbook: this,
				id: sheetNo,
				iterator,
				options: this.options
			});
			if (this.options.hyperlinks === "emit") yield {
				eventType: "hyperlinks",
				value: hyperlinksReader
			};
		}
	};
	WorkbookReader.Options = {
		worksheets: ["emit", "ignore"],
		sharedStrings: [
			"cache",
			"emit",
			"ignore"
		],
		hyperlinks: [
			"cache",
			"emit",
			"ignore"
		],
		styles: ["cache", "ignore"],
		entries: ["emit", "ignore"]
	};
	module.exports = WorkbookReader;
}));
//#endregion
//#region node_modules/exceljs/lib/exceljs.nodejs.js
var require_exceljs_nodejs = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var ExcelJS = {
		Workbook: require_workbook(),
		ModelContainer: require_modelcontainer(),
		stream: { xlsx: {
			WorkbookWriter: require_workbook_writer(),
			WorkbookReader: require_workbook_reader()
		} }
	};
	Object.assign(ExcelJS, require_enums());
	module.exports = ExcelJS;
}));
//#endregion
//#region node_modules/exceljs/excel.js
var require_excel = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* Copyright (c) 2014-2019 Guyon Roche
	* LICENCE: MIT - please refer to LICENSE file included with this module
	* or https://github.com/exceljs/exceljs/blob/master/LICENSE
	*/
	if (parseInt(process.versions.node.split(".")[0], 10) < 10) throw new Error("For node versions older than 10, please use the ES5 Import: https://github.com/exceljs/exceljs#es5-imports");
	module.exports = require_exceljs_nodejs();
}));
//#endregion
export { require_lib as n, require_excel as t };
