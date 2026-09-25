//#region node_modules/jose/dist/webapi/lib/buffer_utils.js
var encoder = new TextEncoder();
var decoder = new TextDecoder();
new TextDecoder("utf-8", { fatal: true });
function concat(...buffers) {
	const size = buffers.reduce((acc, { length }) => acc + length, 0);
	const buf = new Uint8Array(size);
	let i = 0;
	for (const buffer of buffers) {
		buf.set(buffer, i);
		i += buffer.length;
	}
	return buf;
}
function encode$1(string) {
	const bytes = new Uint8Array(string.length);
	for (let i = 0; i < string.length; i++) {
		const code = string.charCodeAt(i);
		if (code > 127) throw new TypeError("non-ASCII string encountered in encode()");
		bytes[i] = code;
	}
	return bytes;
}
//#endregion
//#region node_modules/jose/dist/webapi/lib/crypto_key.js
var unusable = (name, prop = "algorithm.name") => /* @__PURE__ */ new TypeError(`CryptoKey does not support this operation, its ${prop} must be ${name}`);
function checkUsage(key, usage) {
	if (usage && !key.usages.includes(usage)) throw new TypeError(`CryptoKey does not support this operation, its usages must include ${usage}.`);
}
function checkModulusLength(alg, key) {
	const { modulusLength } = key.algorithm;
	if (typeof modulusLength !== "number" || modulusLength < 2048) throw new TypeError(`${alg} requires key modulusLength to be 2048 bits or larger`);
}
function checkCryptoKey(key, expected, usage) {
	const algorithm = key.algorithm;
	if (algorithm.name !== expected.name) throw unusable(expected.name);
	if (expected.hash && algorithm.hash?.name !== expected.hash) throw unusable(expected.hash, "algorithm.hash");
	if (expected.namedCurve && algorithm.namedCurve !== expected.namedCurve) throw unusable(expected.namedCurve, "algorithm.namedCurve");
	if (expected.length !== void 0 && algorithm.length !== expected.length) throw unusable(expected.length, "algorithm.length");
	checkUsage(key, usage);
}
//#endregion
//#region node_modules/jose/dist/webapi/lib/invalid_key_input.js
function message(msg, actual, ...types) {
	if (types.length > 2) {
		const last = types.pop();
		msg += `one of type ${types.join(", ")}, or ${last}.`;
	} else if (types.length === 2) msg += `one of type ${types[0]} or ${types[1]}.`;
	else msg += `of type ${types[0]}.`;
	if (actual == null) msg += ` Received ${actual}`;
	else if (typeof actual === "function" && actual.name) msg += ` Received function ${actual.name}`;
	else if (typeof actual === "object" && actual != null) {
		if (actual.constructor?.name) msg += ` Received an instance of ${actual.constructor.name}`;
	}
	return msg;
}
var invalidKeyInput = (actual, ...types) => message("Key must be ", actual, ...types);
var withAlg = (alg, actual, ...types) => message(`Key for the ${alg} algorithm must be `, actual, ...types);
//#endregion
//#region node_modules/jose/dist/webapi/util/errors.js
var JOSEError = class extends Error {
	static code = "ERR_JOSE_GENERIC";
	code = "ERR_JOSE_GENERIC";
	constructor(message, options) {
		super(message, options);
		this.name = this.constructor.name;
		Error.captureStackTrace?.(this, this.constructor);
	}
};
var JOSENotSupported = class extends JOSEError {
	static code = "ERR_JOSE_NOT_SUPPORTED";
	code = "ERR_JOSE_NOT_SUPPORTED";
};
var JWSInvalid = class extends JOSEError {
	static code = "ERR_JWS_INVALID";
	code = "ERR_JWS_INVALID";
};
var JWTInvalid = class extends JOSEError {
	static code = "ERR_JWT_INVALID";
	code = "ERR_JWT_INVALID";
};
//#endregion
//#region node_modules/jose/dist/webapi/lib/is_key_like.js
var isCryptoKey = (key) => {
	if (key?.[Symbol.toStringTag] === "CryptoKey") return true;
	try {
		return key instanceof CryptoKey;
	} catch {
		return false;
	}
};
var isKeyObject = (key) => key?.[Symbol.toStringTag] === "KeyObject";
var isKeyLike = (key) => isCryptoKey(key) || isKeyObject(key);
//#endregion
//#region node_modules/jose/dist/webapi/lib/base64.js
function encodeBase64(input) {
	if (Uint8Array.prototype.toBase64) return input.toBase64();
	const CHUNK_SIZE = 32768;
	const arr = [];
	for (let i = 0; i < input.length; i += CHUNK_SIZE) arr.push(String.fromCharCode.apply(null, input.subarray(i, i + CHUNK_SIZE)));
	return btoa(arr.join(""));
}
function decodeBase64(encoded) {
	if (Uint8Array.fromBase64) return Uint8Array.fromBase64(encoded);
	const binary = atob(encoded);
	const bytes = new Uint8Array(binary.length);
	for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
	return bytes;
}
//#endregion
//#region node_modules/jose/dist/webapi/util/base64url.js
var invalid = "The input to be decoded is not correctly encoded.";
function decode(input) {
	if (Uint8Array.fromBase64) try {
		return Uint8Array.fromBase64(typeof input === "string" ? input : decoder.decode(input), { alphabet: "base64url" });
	} catch (cause) {
		throw new TypeError(invalid, { cause });
	}
	let encoded = input;
	if (encoded instanceof Uint8Array) encoded = decoder.decode(encoded);
	if (encoded.includes("+") || encoded.includes("/")) throw new TypeError(invalid);
	encoded = encoded.replace(/-/g, "+").replace(/_/g, "/");
	try {
		return decodeBase64(encoded);
	} catch {
		throw new TypeError(invalid);
	}
}
function encode(input) {
	let unencoded = input;
	if (typeof unencoded === "string") unencoded = encoder.encode(unencoded);
	if (Uint8Array.prototype.toBase64) return unencoded.toBase64({
		alphabet: "base64url",
		omitPadding: true
	});
	return encodeBase64(unencoded).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}
//#endregion
//#region node_modules/jose/dist/webapi/lib/type_checks.js
function isObject(input) {
	if (typeof input !== "object" || input === null || Object.prototype.toString.call(input) !== "[object Object]") return false;
	const prototype = Object.getPrototypeOf(input);
	if (prototype === null) return true;
	let proto = prototype;
	while (Object.getPrototypeOf(proto) !== null) proto = Object.getPrototypeOf(proto);
	return prototype === proto;
}
function isDisjoint(...headers) {
	const parameters = /* @__PURE__ */ new Set();
	for (const header of headers) {
		if (!header) continue;
		for (const parameter of Object.keys(header)) {
			if (parameters.has(parameter)) return false;
			parameters.add(parameter);
		}
	}
	return true;
}
var isJWK = (key) => isObject(key) && typeof key.kty === "string";
var isPrivateJWK = (key) => key.kty !== "oct" && (key.kty === "AKP" && typeof key.priv === "string" || typeof key.d === "string");
var isPublicJWK = (key) => key.kty !== "oct" && key.d === void 0 && key.priv === void 0;
var isSecretJWK = (key) => key.kty === "oct" && typeof key.k === "string";
//#endregion
//#region node_modules/jose/dist/webapi/lib/helpers.js
function assertNotSet(value, name) {
	if (value) throw new TypeError(`${name} can only be called once`);
}
//#endregion
//#region node_modules/jose/dist/webapi/lib/jwk_to_key.js
async function jwkToKey(entry, jwk) {
	if (jwk.kty === "RSA" && "oth" in jwk && jwk.oth !== void 0) throw new JOSENotSupported("RSA JWK \"oth\" (Other Primes Info) Parameter value is not supported");
	if (!entry.kty.includes(jwk.kty)) throw new JOSENotSupported("Invalid or unsupported JWK \"alg\" (Algorithm) Parameter value");
	const algorithm = entry.resolve?.({
		kty: jwk.kty,
		crv: jwk.crv
	}) ?? entry.subtle;
	const isPrivate = !!(jwk.d || jwk.priv);
	const keyData = { ...jwk };
	if (keyData.kty !== "AKP") delete keyData.alg;
	delete keyData.use;
	return crypto.subtle.importKey("jwk", keyData, algorithm, jwk.ext ?? !isPrivate, jwk.key_ops ?? entry.usages[isPrivate ? 1 : 0]);
}
//#endregion
//#region node_modules/jose/dist/webapi/lib/key.js
var tag = (key) => key[Symbol.toStringTag];
var jwkMatchesOp = (entry, key, usage) => {
	const { alg } = entry;
	if (key.use !== void 0) {
		const expected = usage === "sign" || usage === "verify" ? "sig" : "enc";
		if (key.use !== expected) throw new TypeError(`Invalid key for this operation, its "use" must be "${expected}" when present`);
	}
	if (key.alg !== void 0 && key.alg !== alg) throw new TypeError(`Invalid key for this operation, its "alg" must be "${alg}" when present`);
	if (Array.isArray(key.key_ops)) {
		const expectedKeyOp = usage === "encrypt" || usage === "decrypt" ? entry.ops?.[usage === "encrypt" ? 0 : 1] : usage;
		if (expectedKeyOp && !key.key_ops.includes(expectedKeyOp)) throw new TypeError(`Invalid key for this operation, its "key_ops" must include "${expectedKeyOp}" when present`);
	}
};
function checkKeyType(entry, key, usage) {
	const { alg, secret } = entry;
	const privateKey = usage === "decrypt" || usage === "sign";
	if (secret && key instanceof Uint8Array) return [BYTES, key];
	if (isJWK(key)) {
		if (secret ? !isSecretJWK(key) : !(privateKey ? isPrivateJWK(key) : isPublicJWK(key))) throw new TypeError(secret ? `JSON Web Key for symmetric algorithms must have JWK "kty" (Key Type) equal to "oct" and the JWK "k" (Key Value) present` : `JSON Web Key for this operation must be a ${privateKey ? "private" : "public"} JWK`);
		jwkMatchesOp(entry, key, usage);
		return [JWK, key];
	}
	if (!isKeyLike(key)) throw new TypeError(secret ? withAlg(alg, key, "CryptoKey", "KeyObject", "JSON Web Key", "Uint8Array") : withAlg(alg, key, "CryptoKey", "KeyObject", "JSON Web Key"));
	if (secret) {
		if (key.type !== "secret") throw new TypeError(`${tag(key)} instances for symmetric algorithms must be of type "secret"`);
	} else {
		if (key.type === "secret") throw new TypeError(`${tag(key)} instances for asymmetric algorithms must not be of type "secret"`);
		const expectedType = privateKey ? "private" : "public";
		if ((key.type === "public" || key.type === "private") && key.type !== expectedType) {
			const operation = usage === "sign" ? "signing" : usage === "verify" ? "verifying" : `${usage.slice(0, -1)}tion`;
			throw new TypeError(`${tag(key)} instances for asymmetric algorithm ${operation} must be of type "${expectedType}"`);
		}
	}
	return isCryptoKey(key) ? [CRYPTO, key] : [KEYOBJECT, key];
}
var BYTES = 0;
var CRYPTO = 1;
var KEYOBJECT = 2;
var JWK = 3;
var cache;
var nist = {
	__proto__: null,
	prime256v1: "P-256",
	secp384r1: "P-384",
	secp521r1: "P-521"
};
function cached(key, alg, value) {
	cache ||= /* @__PURE__ */ new WeakMap();
	const entry = cache.get(key);
	if (value) {
		if (entry) entry[alg] = value;
		else cache.set(key, {
			__proto__: null,
			[alg]: value
		});
	}
	return value ?? entry?.[alg];
}
var handleJWK = async (key, jwk, entry) => cached(key, entry.alg) ?? cached(key, entry.alg, await jwkToKey(entry, {
	...jwk,
	alg: entry.alg
}));
var handleKeyObject = (keyObject, entry) => {
	const hit = cached(keyObject, entry.alg);
	if (hit) return hit;
	const isPublic = keyObject.type === "public";
	const usages = entry.usages[isPublic ? 0 : 1];
	const { asymmetricKeyType } = keyObject;
	const crv = nist[keyObject.asymmetricKeyDetails?.namedCurve];
	const params = entry.resolve?.({
		crv,
		asymmetricKeyType
	}) ?? entry.subtle;
	return cached(keyObject, entry.alg, keyObject.toCryptoKey(params, isPublic, usages));
};
async function prepareKey(entry, key, usage) {
	const tagged = checkKeyType(entry, key, usage);
	switch (tagged[0]) {
		case BYTES:
		case CRYPTO: return tagged[1];
		case JWK: {
			const key = tagged[1];
			if (key.k) return decode(key.k);
			if (!Object.isFrozen(key)) {
				const { key_ops } = key;
				if (Array.isArray(key_ops)) Object.freeze(key_ops);
				Object.freeze(key);
			}
			return handleJWK(key, key, entry);
		}
		case KEYOBJECT: {
			const keyObject = tagged[1];
			if (keyObject.type === "secret") return keyObject.export();
			if ("toCryptoKey" in keyObject && typeof keyObject.toCryptoKey === "function") return handleKeyObject(keyObject, entry);
			return handleJWK(keyObject, keyObject.export({ format: "jwk" }), entry);
		}
	}
}
//#endregion
//#region node_modules/jose/dist/webapi/lib/key_descriptor.js
function table(entries) {
	const out = { __proto__: null };
	for (const alg in entries) out[alg] = {
		...entries[alg],
		alg
	};
	return out;
}
//#endregion
//#region node_modules/jose/dist/webapi/lib/jwe_algorithms.js
var wrap = [["encrypt", "wrapKey"], ["decrypt", "unwrapKey"]];
var derive = [[], ["deriveBits"]];
var none = [[], []];
function rsaes(bits) {
	return {
		kty: ["RSA"],
		subtle: {
			name: "RSA-OAEP",
			hash: `SHA-${bits}`
		},
		usages: wrap,
		ops: ["wrapKey", "unwrapKey"]
	};
}
function ecdh() {
	return {
		kty: ["EC", "OKP"],
		subtle: { name: "ECDH" },
		resolve: ({ kty, crv, asymmetricKeyType }) => {
			if (crv === "X25519" || asymmetricKeyType === "x25519") return { name: "X25519" };
			if (kty === "OKP") throw new JOSENotSupported("Invalid or unsupported JWK \"alg\" (Algorithm) Parameter value");
			return {
				name: "ECDH",
				namedCurve: crv
			};
		},
		usages: derive,
		ops: [void 0, "deriveBits"]
	};
}
function aeskw(bits, gcm = false) {
	return {
		kty: ["oct"],
		secret: true,
		subtle: {
			name: gcm ? "AES-GCM" : "AES-KW",
			length: bits
		},
		usages: none,
		ops: gcm ? ["encrypt", "decrypt"] : ["wrapKey", "unwrapKey"]
	};
}
function pbes2() {
	return {
		kty: ["oct"],
		secret: true,
		subtle: { name: "PBKDF2" },
		usages: none,
		ops: ["deriveBits", "deriveBits"]
	};
}
var JWE = table({
	dir: {
		kty: ["oct"],
		secret: true,
		subtle: { name: "AES-GCM" },
		usages: none,
		ops: ["encrypt", "decrypt"]
	},
	"RSA-OAEP": rsaes(1),
	"RSA-OAEP-256": rsaes(256),
	"RSA-OAEP-384": rsaes(384),
	"RSA-OAEP-512": rsaes(512),
	"ECDH-ES": ecdh(),
	"ECDH-ES+A128KW": ecdh(),
	"ECDH-ES+A192KW": ecdh(),
	"ECDH-ES+A256KW": ecdh(),
	A128KW: aeskw(128),
	A192KW: aeskw(192),
	A256KW: aeskw(256),
	A128GCMKW: aeskw(128, true),
	A192GCMKW: aeskw(192, true),
	A256GCMKW: aeskw(256, true),
	"PBES2-HS256+A128KW": pbes2(),
	"PBES2-HS384+A192KW": pbes2(),
	"PBES2-HS512+A256KW": pbes2()
});
var contentOps = ["encrypt", "decrypt"];
function contentEncryption(bits, cbc = false) {
	return {
		kty: ["oct"],
		secret: true,
		subtle: {
			name: cbc ? "AES-CBC" : "AES-GCM",
			length: bits
		},
		usages: none,
		ops: contentOps,
		cekBits: bits,
		ivBits: cbc ? 128 : 96,
		cbc
	};
}
table({
	A128GCM: contentEncryption(128),
	A192GCM: contentEncryption(192),
	A256GCM: contentEncryption(256),
	"A128CBC-HS256": contentEncryption(256, true),
	"A192CBC-HS384": contentEncryption(384, true),
	"A256CBC-HS512": contentEncryption(512, true)
});
//#endregion
//#region node_modules/jose/dist/webapi/lib/options.js
var JWS_RECOGNIZED = {
	__proto__: null,
	b64: true
};
function validateCritDuplicates(Err, protectedHeader) {
	const { crit } = protectedHeader ?? {};
	if (Array.isArray(crit) && new Set(crit).size !== crit.length) throw new Err("\"crit\" (Critical) Header Parameter MUST NOT contain duplicate values");
}
function validateCrit(Err, recognizedDefault, recognizedOption, protectedHeader, joseHeader) {
	if (joseHeader.crit !== void 0 && protectedHeader?.crit === void 0) throw new Err("\"crit\" (Critical) Header Parameter MUST be integrity protected");
	if (!protectedHeader || protectedHeader.crit === void 0) return [];
	if (!Array.isArray(protectedHeader.crit) || protectedHeader.crit.length === 0 || protectedHeader.crit.some((input) => typeof input !== "string" || input.length === 0)) throw new Err("\"crit\" (Critical) Header Parameter MUST be an array of non-empty strings when present");
	const recognized = recognizedOption === void 0 ? recognizedDefault : {
		__proto__: null,
		...recognizedOption,
		...recognizedDefault
	};
	for (const parameter of protectedHeader.crit) {
		if (!(parameter in recognized)) throw new JOSENotSupported(`Extension Header Parameter "${parameter}" is not recognized`);
		if (!Object.hasOwn(joseHeader, parameter) || joseHeader[parameter] === void 0) throw new Err(`Extension Header Parameter "${parameter}" is missing`);
		if (recognized[parameter] && (!Object.hasOwn(protectedHeader, parameter) || protectedHeader[parameter] === void 0)) throw new Err(`Extension Header Parameter "${parameter}" MUST be integrity protected`);
	}
	return protectedHeader.crit;
}
//#endregion
//#region node_modules/jose/dist/webapi/lib/signing.js
async function getSigKey(entry, key, usage) {
	if (key instanceof Uint8Array) return crypto.subtle.importKey("raw", key, entry.subtle, false, [usage]);
	checkCryptoKey(key, entry.subtle, usage);
	if (entry.minRsaBits) checkModulusLength(entry.alg, key);
	return key;
}
async function sign(entry, key, data) {
	const cryptoKey = await getSigKey(entry, key, "sign");
	const signature = await crypto.subtle.sign(entry.signing, cryptoKey, data);
	return new Uint8Array(signature);
}
//#endregion
//#region node_modules/jose/dist/webapi/lib/jws_algorithms.js
var sig = [["verify"], ["sign"]];
function hmac(bits) {
	const subtle = {
		name: "HMAC",
		hash: `SHA-${bits}`
	};
	return {
		kty: ["oct"],
		secret: true,
		subtle,
		signing: subtle,
		usages: sig
	};
}
function rsa(bits, saltLength) {
	const subtle = {
		name: saltLength ? "RSA-PSS" : "RSASSA-PKCS1-v1_5",
		hash: `SHA-${bits}`
	};
	return {
		kty: ["RSA"],
		subtle,
		signing: saltLength ? {
			...subtle,
			saltLength
		} : subtle,
		usages: sig,
		minRsaBits: 2048
	};
}
function ecdsa(crv, bits) {
	return {
		kty: ["EC"],
		crv,
		subtle: {
			name: "ECDSA",
			namedCurve: crv
		},
		signing: {
			name: "ECDSA",
			hash: `SHA-${bits}`
		},
		usages: sig
	};
}
function eddsa() {
	const subtle = { name: "Ed25519" };
	return {
		kty: ["OKP"],
		crv: "Ed25519",
		subtle,
		signing: subtle,
		usages: sig
	};
}
function mldsa(bits) {
	const subtle = { name: `ML-DSA-${bits}` };
	return {
		kty: ["AKP"],
		subtle,
		signing: subtle,
		usages: sig
	};
}
var JWS = table({
	HS256: hmac(256),
	HS384: hmac(384),
	HS512: hmac(512),
	RS256: rsa(256),
	RS384: rsa(384),
	RS512: rsa(512),
	PS256: rsa(256, 32),
	PS384: rsa(384, 48),
	PS512: rsa(512, 64),
	ES256: ecdsa("P-256", 256),
	ES384: ecdsa("P-384", 384),
	ES512: ecdsa("P-521", 512),
	EdDSA: eddsa(),
	Ed25519: eddsa(),
	"ML-DSA-44": mldsa(44),
	"ML-DSA-65": mldsa(65),
	"ML-DSA-87": mldsa(87)
});
function jwsAlgorithm(alg) {
	const entry = typeof alg === "string" ? JWS[alg] : void 0;
	if (!entry) throw new JOSENotSupported(`alg ${alg} is not supported either by JOSE or your javascript runtime`);
	return entry;
}
//#endregion
//#region node_modules/jose/dist/webapi/lib/jwt_claims_set.js
var epoch = (date) => Math.floor(date.getTime() / 1e3);
var multipliers = {
	s: 1,
	m: 60,
	h: 3600,
	d: 86400,
	w: 604800,
	y: 31557600
};
var REGEX = /^(\+|\-)? ?(\d+|\d+\.\d+) ?(seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)(?: (ago|from now))?$/i;
function secs(str) {
	const matched = REGEX.exec(str);
	if (!matched || matched[4] && matched[1]) throw new TypeError("Invalid time period format");
	const value = parseFloat(matched[2]);
	const numericDate = Math.round(value * multipliers[matched[3][0].toLowerCase()]);
	if (matched[1] === "-" || matched[4] === "ago") return -numericDate;
	return numericDate;
}
function validateInput(label, input) {
	if (!Number.isFinite(input)) throw new TypeError(`Invalid ${label} input`);
	return input;
}
function numericDate(value, label) {
	if (typeof value === "number") return validateInput(label, value);
	if (value instanceof Date) return validateInput(label, epoch(value));
	return epoch(/* @__PURE__ */ new Date()) + secs(value);
}
var JWTClaimsBuilder = class {
	#payload;
	constructor(payload) {
		if (!isObject(payload)) throw new TypeError("JWT Claims Set MUST be an object");
		this.#payload = structuredClone(payload);
	}
	data() {
		return encoder.encode(JSON.stringify(this.#payload));
	}
	get iss() {
		return this.#payload.iss;
	}
	set iss(value) {
		this.#payload.iss = value;
	}
	get sub() {
		return this.#payload.sub;
	}
	set sub(value) {
		this.#payload.sub = value;
	}
	get aud() {
		return this.#payload.aud;
	}
	set aud(value) {
		this.#payload.aud = value;
	}
	set jti(value) {
		this.#payload.jti = value;
	}
	set nbf(value) {
		this.#payload.nbf = numericDate(value, "setNotBefore");
	}
	set exp(value) {
		this.#payload.exp = numericDate(value, "setExpirationTime");
	}
	set iat(value) {
		if (value === void 0) this.#payload.iat = epoch(/* @__PURE__ */ new Date());
		else if (typeof value === "string") this.#payload.iat = validateInput("setIssuedAt", epoch(/* @__PURE__ */ new Date()) + secs(value));
		else this.#payload.iat = numericDate(value, "setIssuedAt");
	}
};
//#endregion
//#region node_modules/jose/dist/webapi/lib/jws_sign.js
function unencodedPayload(protectedHeader) {
	return protectedHeader?.b64 === false && Array.isArray(protectedHeader.crit) && protectedHeader.crit.includes("b64");
}
async function createSignature(input, key) {
	const { protectedHeader, unprotectedHeader } = input;
	if (!protectedHeader && !unprotectedHeader) throw new JWSInvalid("either setProtectedHeader or setUnprotectedHeader must be called before #sign()");
	if (!isDisjoint(protectedHeader, unprotectedHeader)) throw new JWSInvalid("JWS Protected and JWS Unprotected Header Parameter names must be disjoint");
	const joseHeader = {
		...protectedHeader,
		...unprotectedHeader
	};
	validateCritDuplicates(JWSInvalid, protectedHeader);
	const extensions = validateCrit(JWSInvalid, JWS_RECOGNIZED, input.crit, protectedHeader, joseHeader);
	let b64 = true;
	if (extensions.includes("b64")) {
		b64 = protectedHeader.b64;
		if (typeof b64 !== "boolean") throw new JWSInvalid("The \"b64\" (base64url-encode payload) Header Parameter must be a boolean");
	}
	const { alg } = joseHeader;
	if (typeof alg !== "string" || !alg) throw new JWSInvalid("JWS \"alg\" (Algorithm) Header Parameter missing or invalid");
	const entry = jwsAlgorithm(alg);
	let payloadS;
	let payloadB;
	if (b64) {
		const encoded = input.encoded ??= [];
		encoded[0] ??= encode(input.payload);
		encoded[1] ??= encode$1(encoded[0]);
		payloadS = encoded[0];
		payloadB = encoded[1];
	} else {
		payloadB = input.payload;
		payloadS = "";
	}
	let protectedHeaderString;
	let protectedHeaderBytes;
	if (protectedHeader) {
		protectedHeaderString = encode(JSON.stringify(protectedHeader));
		protectedHeaderBytes = encode$1(protectedHeaderString);
	} else {
		protectedHeaderString = "";
		protectedHeaderBytes = /* @__PURE__ */ new Uint8Array();
	}
	const data = concat(protectedHeaderBytes, encode$1("."), payloadB);
	const jws = {
		signature: encode(await sign(entry, await prepareKey(entry, key, "sign"), data)),
		payload: payloadS
	};
	if (protectedHeader) jws.protected = protectedHeaderString;
	if (unprotectedHeader) jws.header = unprotectedHeader;
	return jws;
}
//#endregion
//#region node_modules/jose/dist/webapi/jws/flattened/sign.js
var FlattenedSign = class {
	#payload;
	#protectedHeader;
	#unprotectedHeader;
	constructor(payload) {
		if (!(payload instanceof Uint8Array)) throw new TypeError("payload must be an instance of Uint8Array");
		this.#payload = payload;
	}
	setProtectedHeader(protectedHeader) {
		assertNotSet(this.#protectedHeader, "setProtectedHeader");
		this.#protectedHeader = protectedHeader;
		return this;
	}
	setUnprotectedHeader(unprotectedHeader) {
		assertNotSet(this.#unprotectedHeader, "setUnprotectedHeader");
		this.#unprotectedHeader = unprotectedHeader;
		return this;
	}
	async sign(key, options) {
		return createSignature({
			payload: this.#payload,
			protectedHeader: this.#protectedHeader,
			unprotectedHeader: this.#unprotectedHeader,
			crit: options?.crit
		}, key);
	}
};
//#endregion
//#region node_modules/jose/dist/webapi/jws/compact/sign.js
var CompactSign = class {
	#flattened;
	#protectedHeader;
	constructor(payload) {
		this.#flattened = new FlattenedSign(payload);
	}
	setProtectedHeader(protectedHeader) {
		this.#flattened.setProtectedHeader(protectedHeader);
		this.#protectedHeader = protectedHeader;
		return this;
	}
	async sign(key, options) {
		if (unencodedPayload(this.#protectedHeader)) throw new TypeError("use the flattened module for creating JWS with b64: false");
		const jws = await this.#flattened.sign(key, options);
		return `${jws.protected}.${jws.payload}.${jws.signature}`;
	}
};
//#endregion
//#region node_modules/jose/dist/webapi/jwt/sign.js
var SignJWT = class {
	#protectedHeader;
	#jwt;
	constructor(payload = {}) {
		this.#jwt = new JWTClaimsBuilder(payload);
	}
	setIssuer(issuer) {
		this.#jwt.iss = issuer;
		return this;
	}
	setSubject(subject) {
		this.#jwt.sub = subject;
		return this;
	}
	setAudience(audience) {
		this.#jwt.aud = audience;
		return this;
	}
	setJti(jwtId) {
		this.#jwt.jti = jwtId;
		return this;
	}
	setNotBefore(input) {
		this.#jwt.nbf = input;
		return this;
	}
	setExpirationTime(input) {
		this.#jwt.exp = input;
		return this;
	}
	setIssuedAt(input) {
		this.#jwt.iat = input;
		return this;
	}
	setProtectedHeader(protectedHeader) {
		this.#protectedHeader = protectedHeader;
		return this;
	}
	async sign(key, options) {
		const sig = new CompactSign(this.#jwt.data());
		sig.setProtectedHeader(this.#protectedHeader);
		if (unencodedPayload(this.#protectedHeader)) throw new JWTInvalid("JWTs MUST NOT use unencoded payload");
		return sig.sign(key, options);
	}
};
//#endregion
//#region node_modules/jose/dist/webapi/lib/key_algorithm.js
var algArgument = "\"alg\" (Algorithm)";
function unsupportedAlg(source = "JWK \"alg\" (Algorithm) Parameter") {
	throw new JOSENotSupported(`Invalid or unsupported ${source} value`);
}
function keyAlgorithm(alg, source) {
	return (typeof alg === "string" ? JWS[alg] ?? JWE[alg] : void 0) ?? unsupportedAlg(source);
}
//#endregion
//#region node_modules/jose/dist/webapi/lib/asn1.js
var formatPEM = (b64, descriptor) => {
	return `-----BEGIN ${descriptor}-----\n${(b64.match(/.{1,64}/g) || []).join("\n")}\n-----END ${descriptor}-----`;
};
var genericExport = async (keyType, keyFormat, key) => {
	if (isKeyObject(key)) {
		if (key.type !== keyType) throw new TypeError(`key is not a ${keyType} key`);
		return key.export({
			format: "pem",
			type: keyFormat
		});
	}
	if (!isCryptoKey(key)) throw new TypeError(invalidKeyInput(key, "CryptoKey", "KeyObject"));
	if (!key.extractable) throw new TypeError("CryptoKey is not extractable");
	if (key.type !== keyType) throw new TypeError(`key is not a ${keyType} key`);
	return formatPEM(encodeBase64(new Uint8Array(await crypto.subtle.exportKey(keyFormat, key))), `${keyType.toUpperCase()} KEY`);
};
var toPKCS8 = (key) => genericExport("private", "pkcs8", key);
var bytesEqual = (a, b) => {
	if (a.byteLength !== b.length) return false;
	for (let i = 0; i < a.byteLength; i++) if (a[i] !== b[i]) return false;
	return true;
};
var createASN1State = (data) => ({
	data,
	pos: 0
});
var readByte = (state) => {
	const byte = state.data[state.pos++];
	if (byte === void 0) throw new Error("Unexpected end of ASN.1 input");
	return byte;
};
var parseLength = (state) => {
	const first = readByte(state);
	if (first & 128) {
		const lengthOfLen = first & 127;
		let length = 0;
		for (let i = 0; i < lengthOfLen; i++) length = length << 8 | readByte(state);
		return length;
	}
	return first;
};
var expectTag = (state, expectedTag, errorMessage) => {
	if (readByte(state) !== expectedTag) throw new Error(errorMessage);
};
var getSubarray = (state, length) => {
	if (length < 0 || state.pos + length > state.data.length) throw new Error("Unexpected end of ASN.1 input");
	const result = state.data.subarray(state.pos, state.pos + length);
	state.pos += length;
	return result;
};
var parseAlgorithmOID = (state) => {
	expectTag(state, 6, "Expected algorithm OID");
	return getSubarray(state, parseLength(state));
};
function parseKeyHeader(state, keyFormat) {
	expectTag(state, 48, `Invalid ${keyFormat === "spki" ? "SPKI" : "PKCS#8"} structure`);
	parseLength(state);
	if (keyFormat === "pkcs8") {
		expectTag(state, 2, "Expected version field");
		const length = parseLength(state);
		state.pos += length;
	}
	expectTag(state, 48, "Expected algorithm identifier");
	parseLength(state);
}
var parseECAlgorithmIdentifier = (state) => {
	const algOid = parseAlgorithmOID(state);
	if (bytesEqual(algOid, [
		43,
		101,
		110
	])) return "X25519";
	if (!bytesEqual(algOid, [
		42,
		134,
		72,
		206,
		61,
		2,
		1
	])) throw new Error("Unsupported key algorithm");
	expectTag(state, 6, "Expected curve OID");
	const curveOid = getSubarray(state, parseLength(state));
	if (bytesEqual(curveOid, [
		42,
		134,
		72,
		206,
		61,
		3,
		1,
		7
	])) return "P-256";
	if (bytesEqual(curveOid, [
		43,
		129,
		4,
		0,
		34
	])) return "P-384";
	if (bytesEqual(curveOid, [
		43,
		129,
		4,
		0,
		35
	])) return "P-521";
	throw new Error("Unsupported named curve");
};
var genericImport = async (keyFormat, keyData, alg, options) => {
	const entry = keyAlgorithm(alg, algArgument);
	if (entry.secret) unsupportedAlg(algArgument);
	const isPublic = keyFormat === "spki";
	let algorithm;
	if (entry.resolve) try {
		const state = createASN1State(keyData);
		parseKeyHeader(state, keyFormat);
		algorithm = entry.resolve({ crv: parseECAlgorithmIdentifier(state) });
	} catch {
		throw new JOSENotSupported("Invalid or unsupported key format");
	}
	else algorithm = entry.subtle;
	return crypto.subtle.importKey(keyFormat, keyData, algorithm, options?.extractable ?? isPublic, entry.usages[isPublic ? 0 : 1]);
};
var processPEMData = (pem, pattern) => {
	return decodeBase64(pem.replace(pattern, ""));
};
var fromPKCS8 = (pem, alg, options) => {
	return genericImport("pkcs8", processPEMData(pem, /(?:-----(?:BEGIN|END) PRIVATE KEY-----|\s)/g), alg, options);
};
//#endregion
//#region node_modules/jose/dist/webapi/key/export.js
function exportPKCS8(key) {
	return toPKCS8(key);
}
//#endregion
//#region node_modules/jose/dist/webapi/key/import.js
async function importPKCS8(pkcs8, alg, options) {
	if (typeof pkcs8 !== "string" || pkcs8.indexOf("-----BEGIN PRIVATE KEY-----") !== 0) throw new TypeError("\"pkcs8\" must be PKCS#8 formatted string");
	return fromPKCS8(pkcs8, alg, options);
}
//#endregion
//#region node_modules/jose/dist/webapi/key/generate_key_pair.js
function getModulusLengthOption(options) {
	const modulusLength = options?.modulusLength ?? 2048;
	if (typeof modulusLength !== "number" || modulusLength < 2048) throw new JOSENotSupported("Invalid or unsupported modulusLength option provided, 2048 bits or larger keys must be used");
	return modulusLength;
}
async function generateKeyPair(alg, options) {
	const entry = keyAlgorithm(alg, algArgument);
	if (entry.secret) unsupportedAlg(algArgument);
	let algorithm;
	if (entry.resolve) {
		const crv = options?.crv ?? "P-256";
		switch (crv) {
			case "P-256":
			case "P-384":
			case "P-521":
				algorithm = {
					name: "ECDH",
					namedCurve: crv
				};
				break;
			case "X25519":
				algorithm = { name: "X25519" };
				break;
			default: throw new JOSENotSupported("Invalid or unsupported crv option provided, supported values are P-256, P-384, P-521, and X25519");
		}
	} else {
		if (entry.crv !== void 0 && options?.crv !== void 0 && options.crv !== entry.crv) throw new JOSENotSupported(`Invalid or unsupported crv option provided, the only supported value for ${alg} is ${entry.crv}`);
		algorithm = entry.kty[0] === "RSA" ? {
			...entry.subtle,
			publicExponent: Uint8Array.of(1, 0, 1),
			modulusLength: getModulusLengthOption(options)
		} : entry.subtle;
	}
	return crypto.subtle.generateKey(algorithm, options?.extractable ?? false, [...entry.usages[1], ...entry.usages[0]]);
}
//#endregion
export { SignJWT as i, importPKCS8 as n, exportPKCS8 as r, generateKeyPair as t };
