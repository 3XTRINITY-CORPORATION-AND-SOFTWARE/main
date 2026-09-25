import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { y as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as require_excel } from "../_libs/exceljs+[...].mjs";
import { _ as Aperture, c as Presentation, d as Mic, f as Maximize, g as AudioLines, h as ChartColumn, i as Upload, l as Play, m as FileSpreadsheet, n as VolumeX, o as Square, p as FileText, r as Volume2, s as ScrollText, t as Waves, u as Pause, v as Activity } from "../_libs/lucide-react.mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
import { t as create } from "../_libs/zustand.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { t as require_dist } from "../_libs/yaml.mjs";
import { i as SignJWT, n as importPKCS8, r as exportPKCS8, t as generateKeyPair } from "../_libs/jose.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DFtXkjIc.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_excel = /* @__PURE__ */ __toESM(require_excel());
var import_dist = require_dist();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function downloadBlob(blob, filename) {
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = filename;
	a.rel = "noopener";
	document.body.appendChild(a);
	a.click();
	a.remove();
	window.setTimeout(() => URL.revokeObjectURL(url), 1500);
}
function slugify(value) {
	return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 48) || "workflow";
}
function formatStampDate(date = /* @__PURE__ */ new Date()) {
	return date.toISOString().slice(0, 10);
}
var ADDON_DEFAULTS = {
	hpf: true,
	eq: true,
	sat: true,
	comp: true,
	limit: true,
	synth: true,
	transient: false,
	theory: true,
	rhyme: true,
	block: true,
	bus: true,
	geo: true
};
var PERSIST_KEY = "steel-desk-v1";
function slicePersist(s) {
	return {
		host: s.host,
		os: s.os,
		buffer: s.buffer,
		sampleRate: s.sampleRate,
		kernel: s.kernel,
		addons: s.addons,
		inGain: s.inGain,
		outGain: s.outGain,
		master: s.master,
		hpHz: s.hpHz,
		eqLo: s.eqLo,
		eqMid: s.eqMid,
		eqHi: s.eqHi,
		satAmt: s.satAmt,
		thresh: s.thresh,
		transAmt: s.transAmt,
		webOut: s.webOut,
		lang: s.lang
	};
}
var useSteel = create((set) => ({
	tab: "kernel",
	lang: "et",
	armed: false,
	running: false,
	host: "fl",
	os: "win10",
	buffer: 128,
	sampleRate: 48e3,
	kernel: "3.5.0",
	latest: null,
	updating: false,
	addons: ADDON_DEFAULTS,
	inGain: 1,
	outGain: .85,
	master: .8,
	hpHz: 80,
	eqLo: 1,
	eqMid: 1,
	eqHi: 1,
	satAmt: .35,
	thresh: .35,
	transAmt: .4,
	peak: 0,
	rms: 0,
	voices: 0,
	cpu: 0,
	midiIn: null,
	midiOut: null,
	midiPorts: [],
	lastNote: "—",
	lastCc: "—",
	webOut: true,
	inputLive: false,
	error: null,
	setTab: (tab) => set({ tab }),
	patch: (partial) => set(partial)
}));
function hydrateSteel() {
	if (typeof localStorage === "undefined") return;
	try {
		const raw = localStorage.getItem(PERSIST_KEY);
		if (!raw) return;
		const saved = JSON.parse(raw);
		const next = {};
		if (saved.host) next.host = saved.host;
		if (saved.os) next.os = saved.os;
		if (saved.buffer) next.buffer = saved.buffer;
		if (saved.sampleRate) next.sampleRate = saved.sampleRate;
		if (saved.kernel) next.kernel = saved.kernel;
		if (saved.addons) next.addons = {
			...ADDON_DEFAULTS,
			...saved.addons
		};
		if (typeof saved.inGain === "number") next.inGain = saved.inGain;
		if (typeof saved.outGain === "number") next.outGain = saved.outGain;
		if (typeof saved.master === "number") next.master = saved.master;
		if (typeof saved.hpHz === "number") next.hpHz = saved.hpHz;
		if (typeof saved.eqLo === "number") next.eqLo = saved.eqLo;
		if (typeof saved.eqMid === "number") next.eqMid = saved.eqMid;
		if (typeof saved.eqHi === "number") next.eqHi = saved.eqHi;
		if (typeof saved.satAmt === "number") next.satAmt = saved.satAmt;
		if (typeof saved.thresh === "number") next.thresh = saved.thresh;
		if (typeof saved.transAmt === "number") next.transAmt = saved.transAmt;
		if (typeof saved.webOut === "boolean") next.webOut = saved.webOut;
		if (saved.lang === "et" || saved.lang === "en" || saved.lang === "ru") next.lang = saved.lang;
		useSteel.getState().patch(next);
	} catch {}
}
function watchSteelPersist() {
	return useSteel.subscribe((s, prev) => {
		if (s.peak !== prev.peak || s.rms !== prev.rms || s.voices !== prev.voices || s.cpu !== prev.cpu || s.lastNote !== prev.lastNote || s.lastCc !== prev.lastCc || s.armed !== prev.armed || s.running !== prev.running || s.tab !== prev.tab) {
			if (s.host === prev.host && s.os === prev.os && s.buffer === prev.buffer && s.sampleRate === prev.sampleRate && s.kernel === prev.kernel && s.addons === prev.addons && s.inGain === prev.inGain && s.outGain === prev.outGain && s.master === prev.master && s.hpHz === prev.hpHz && s.eqLo === prev.eqLo && s.eqMid === prev.eqMid && s.eqHi === prev.eqHi && s.satAmt === prev.satAmt && s.thresh === prev.thresh && s.transAmt === prev.transAmt && s.webOut === prev.webOut && s.lang === prev.lang) return;
		}
		try {
			localStorage.setItem(PERSIST_KEY, JSON.stringify(slicePersist(s)));
		} catch {}
	});
}
var handle$2 = null;
function addonFlag(id) {
	return useSteel.getState().addons[id] ? 1 : 0;
}
function currentParams() {
	const s = useSteel.getState();
	return {
		inGain: s.inGain,
		outGain: s.outGain,
		master: s.master,
		hpf: addonFlag("hpf"),
		hpHz: s.hpHz,
		eqLo: s.eqLo,
		eqMid: s.eqMid,
		eqHi: s.eqHi,
		sat: addonFlag("sat"),
		satAmt: s.satAmt,
		comp: addonFlag("comp"),
		thresh: s.thresh,
		limit: addonFlag("limit"),
		synth: addonFlag("synth"),
		transient: addonFlag("transient"),
		transAmt: s.transAmt
	};
}
function pushParams$1() {
	handle$2?.node.port.postMessage({
		type: "params",
		params: currentParams()
	});
}
function sendNote(on, note, vel = .8) {
	handle$2?.node.port.postMessage({
		type: on ? "noteOn" : "noteOff",
		note,
		vel
	});
}
async function playNote(on, note, vel = .85) {
	if (!useSteel.getState().armed) {
		if (!on) return;
		try {
			await armKernel();
		} catch {
			return;
		}
		if (!useSteel.getState().armed) return;
	}
	sendNote(on, note, vel);
}
function panic() {
	handle$2?.node.port.postMessage({ type: "panic" });
}
function setWebTap(on) {
	if (!handle$2) {
		useSteel.getState().patch({ webOut: on });
		return;
	}
	if (on && !handle$2.destOn) {
		handle$2.master.connect(handle$2.dest);
		handle$2.destOn = true;
	} else if (!on && handle$2.destOn) {
		try {
			handle$2.master.disconnect(handle$2.dest);
		} catch {}
		handle$2.destOn = false;
	}
	useSteel.getState().patch({ webOut: on });
}
async function tryMic(ctx, node) {
	if (!navigator.mediaDevices?.getUserMedia) return {
		mic: null,
		stream: null
	};
	try {
		const stream = await Promise.race([navigator.mediaDevices.getUserMedia({ audio: {
			echoCancellation: false,
			noiseSuppression: false,
			autoGainControl: false,
			channelCount: 1
		} }), new Promise((_, reject) => {
			setTimeout(() => reject(/* @__PURE__ */ new Error("mic-timeout")), 900);
		})]);
		const mic = ctx.createMediaStreamSource(stream);
		mic.connect(node);
		return {
			mic,
			stream
		};
	} catch {
		return {
			mic: null,
			stream: null
		};
	}
}
async function armKernel() {
	const { sampleRate, kernel, webOut, patch } = useSteel.getState();
	if (handle$2) await disarmKernel();
	const ctx = new AudioContext({
		sampleRate,
		latencyHint: "interactive"
	});
	await ctx.audioWorklet.addModule(`/worklets/steel-kernel.js?k=${encodeURIComponent(kernel)}`);
	const node = new AudioWorkletNode(ctx, "steel-kernel", {
		numberOfInputs: 1,
		numberOfOutputs: 1,
		outputChannelCount: [2]
	});
	const master = ctx.createGain();
	master.gain.value = 1;
	const dest = ctx.createMediaStreamDestination();
	node.connect(master);
	master.connect(ctx.destination);
	if (webOut) master.connect(dest);
	node.port.onmessage = (ev) => {
		const data = ev.data;
		if (data?.type !== "meter") return;
		useSteel.getState().patch({
			peak: data.peak ?? 0,
			rms: data.rms ?? 0,
			voices: data.voices ?? 0,
			cpu: Math.min(100, (data.peak ?? 0) * 40 + (data.voices ?? 0) * 3)
		});
	};
	const { mic, stream } = await tryMic(ctx, node);
	handle$2 = {
		ctx,
		node,
		master,
		dest,
		mic,
		stream,
		destOn: webOut
	};
	node.port.postMessage({
		type: "params",
		params: currentParams()
	});
	await ctx.resume();
	patch({
		armed: true,
		running: ctx.state === "running",
		error: null,
		inputLive: Boolean(stream)
	});
}
async function disarmKernel() {
	if (!handle$2) {
		useSteel.getState().patch({
			armed: false,
			running: false,
			inputLive: false
		});
		return;
	}
	try {
		handle$2.node.port.onmessage = null;
		handle$2.node.disconnect();
		handle$2.master.disconnect();
		handle$2.mic?.disconnect();
		handle$2.stream?.getTracks().forEach((t) => t.stop());
		await handle$2.ctx.close();
	} catch {}
	handle$2 = null;
	useSteel.getState().patch({
		armed: false,
		running: false,
		peak: 0,
		rms: 0,
		voices: 0,
		cpu: 0,
		inputLive: false
	});
}
async function toggleKernel() {
	if (useSteel.getState().armed) await disarmKernel();
	else await armKernel();
}
function tapSteelMaster() {
	if (!handle$2) return null;
	return {
		ctx: handle$2.ctx,
		master: handle$2.master
	};
}
function measuredLatencyMs() {
	if (!handle$2) return null;
	const { ctx } = handle$2;
	return ((ctx.baseLatency || 0) + (ctx.outputLatency || 0)) * 1e3;
}
var BUFFER_INCS = [
	8,
	16,
	32,
	64,
	128
];
var QUALITY_ARMS = [
	528,
	32,
	64,
	89
];
function fftFromInc(inc) {
	if (inc === 8) return 256;
	if (inc === 16) return 512;
	if (inc === 32) return 1024;
	if (inc === 64) return 2048;
	return 4096;
}
function profileForArm(arm, maxTexture) {
	const p = {
		528: {
			w: 960,
			h: 528,
			fps: 30,
			label: "528p music video"
		},
		32: {
			w: 1280,
			h: 720,
			fps: 30,
			label: "720p"
		},
		64: {
			w: 1920,
			h: 1080,
			fps: 60,
			label: "1080p60"
		},
		89: {
			w: 2560,
			h: 1440,
			fps: 60,
			label: "1440p60"
		}
	}[arm];
	if (Math.max(p.w, p.h) > maxTexture) return {
		w: 1280,
		h: 720,
		fps: 30,
		label: "720p (GPU clamped)",
		clamped: true
	};
	return {
		...p,
		clamped: false
	};
}
function gpuInfo() {
	const canvas = document.createElement("canvas");
	const gl = canvas.getContext("webgl2") || canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
	if (!gl || !(gl instanceof WebGLRenderingContext || typeof WebGL2RenderingContext !== "undefined" && gl instanceof WebGL2RenderingContext)) return {
		gpu: "No WebGL",
		maxTexture: 0,
		webgl: false
	};
	const debug = gl.getExtension("WEBGL_debug_renderer_info");
	return {
		gpu: debug ? String(gl.getParameter(debug.UNMASKED_RENDERER_WEBGL) || "GPU") : String(gl.getParameter(gl.RENDERER) || "GPU"),
		maxTexture: Number(gl.getParameter(gl.MAX_TEXTURE_SIZE) || 0),
		webgl: true
	};
}
function pickMime$1() {
	for (const m of [
		"video/mp4;codecs=avc1.42E01E,mp4a.40.2",
		"video/mp4",
		"video/webm;codecs=vp9,opus",
		"video/webm;codecs=vp8,opus",
		"video/webm"
	]) if (typeof MediaRecorder !== "undefined" && MediaRecorder.isTypeSupported(m)) return m;
	return "video/webm";
}
function bestArm(maxTexture, refresh) {
	for (const arm of [
		89,
		64,
		32,
		528
	]) {
		const p = profileForArm(arm, maxTexture);
		if (p.clamped) continue;
		if (p.w * p.h > maxTexture * maxTexture * .25 && arm === 89) continue;
		return {
			w: p.w,
			h: p.h,
			fps: Math.min(p.fps, refresh || 60),
			arm
		};
	}
	return {
		w: 960,
		h: 528,
		fps: 30,
		arm: 528
	};
}
function probeCaps() {
	const { gpu, maxTexture, webgl } = gpuInfo();
	const refresh = Math.round(window.screen.refreshRate || 60);
	const AudioCtx = window.AudioContext;
	let audioRate = 44100;
	let audioLatencyMs = 0;
	let maxChannels = 2;
	if (AudioCtx) try {
		const ctx = new AudioCtx({
			latencyHint: "interactive",
			sampleRate: 44100
		});
		audioRate = ctx.sampleRate;
		audioLatencyMs = ((ctx.baseLatency || 0) + (ctx.outputLatency || 0)) * 1e3;
		maxChannels = ctx.destination.maxChannelCount || 2;
		ctx.close();
	} catch {}
	const recordCeiling = bestArm(maxTexture, refresh);
	const imax = maxTexture >= 8192 && refresh >= 120 ? "IMAX-class 8000p / 164 fps is not available in a browser. This GPU could feed a large canvas; capture still tops out at the record ceiling." : "IMAX-class 8000p / 164 fps is not available here. Browser capture cannot drive that raster or frame rate.";
	return {
		gpu,
		maxTexture,
		cores: navigator.hardwareConcurrency || 1,
		dpr: window.devicePixelRatio || 1,
		screen: `${window.screen.width}×${window.screen.height}`,
		refresh,
		audioRate,
		audioLatencyMs,
		maxChannels,
		webgl,
		mime: pickMime$1(),
		recordCeiling,
		imax
	};
}
function pickRecorderMime() {
	return pickMime$1();
}
var EQ_HZ$1 = [
	60,
	170,
	350,
	700,
	1600,
	3500,
	8e3,
	12e3
];
var useAura = create((set) => ({
	mode: "ring",
	palette: "ice",
	source: "demo",
	playing: false,
	muted: false,
	volume: .8,
	sensitivity: 1.15,
	inc: 32,
	arm: 64,
	eq: EQ_HZ$1.map(() => 0),
	eqOpen: false,
	capsOpen: false,
	recording: false,
	recSec: 0,
	fileName: null,
	error: null,
	fps: 0,
	set: (partial) => set(partial)
}));
var handle$1 = null;
var extras = [];
var demoTimer = 0;
var fileBuffer = null;
var fileSource = null;
var micNode = null;
var micStream = null;
var recorder = null;
var recChunks$1 = [];
var recTick = 0;
function buildEq(ctx, input) {
	const bands = [];
	let prev = input;
	for (const hz of EQ_HZ$1) {
		const f = ctx.createBiquadFilter();
		f.type = "peaking";
		f.frequency.value = hz;
		f.Q.value = 1.1;
		f.gain.value = 0;
		prev.connect(f);
		bands.push(f);
		prev = f;
	}
	return {
		bands,
		out: prev
	};
}
async function ensureCtx(preferSteel) {
	if (preferSteel) {
		const tap = tapSteelMaster();
		if (tap) {
			if (handle$1 && !handle$1.steelTap) await closeHandle();
			if (handle$1?.steelTap && handle$1.ctx === tap.ctx) return handle$1;
			const analyser = tap.ctx.createAnalyser();
			analyser.fftSize = fftFromInc(useAura.getState().inc);
			analyser.smoothingTimeConstant = .62;
			const mute = tap.ctx.createGain();
			mute.gain.value = 1;
			const dest = tap.ctx.createMediaStreamDestination();
			const dummy = tap.ctx.createGain();
			dummy.gain.value = 1;
			const { bands, out } = buildEq(tap.ctx, dummy);
			tap.master.connect(analyser);
			tap.master.connect(dest);
			handle$1 = {
				ctx: tap.ctx,
				master: dummy,
				analyser,
				eq: bands,
				dest,
				mute,
				steelTap: true
			};
			return handle$1;
		}
	}
	if (handle$1 && !handle$1.steelTap && handle$1.ctx.state !== "closed") return handle$1;
	if (handle$1) await closeHandle();
	const ctx = new AudioContext({
		latencyHint: "interactive",
		sampleRate: 44100
	});
	const master = ctx.createGain();
	master.gain.value = useAura.getState().muted ? 0 : useAura.getState().volume ** 2;
	const mute = ctx.createGain();
	mute.gain.value = 1;
	const { bands, out } = buildEq(ctx, master);
	const analyser = ctx.createAnalyser();
	analyser.fftSize = fftFromInc(useAura.getState().inc);
	analyser.smoothingTimeConstant = .62;
	const dest = ctx.createMediaStreamDestination();
	out.connect(analyser);
	analyser.connect(mute);
	mute.connect(ctx.destination);
	mute.connect(dest);
	handle$1 = {
		ctx,
		master,
		analyser,
		eq: bands,
		dest,
		mute,
		steelTap: false
	};
	await ctx.resume();
	return handle$1;
}
async function closeHandle() {
	stopDemo();
	stopMic();
	stopFile();
	if (handle$1 && !handle$1.steelTap) try {
		await handle$1.ctx.close();
	} catch {}
	handle$1 = null;
}
function stopDemo() {
	if (demoTimer) {
		window.clearInterval(demoTimer);
		demoTimer = 0;
	}
	for (const n of extras) try {
		if ("stop" in n && typeof n.stop === "function") n.stop();
		n.disconnect();
	} catch {}
	extras = [];
}
function stopFile() {
	try {
		fileSource?.stop();
	} catch {}
	fileSource = null;
}
function stopMic() {
	micNode?.disconnect();
	micNode = null;
	micStream?.getTracks().forEach((t) => t.stop());
	micStream = null;
}
function pulse(ctx, dest, when) {
	const osc = ctx.createOscillator();
	const g = ctx.createGain();
	osc.type = "sine";
	osc.frequency.setValueAtTime(86, when);
	osc.frequency.exponentialRampToValueAtTime(38, when + .14);
	g.gain.setValueAtTime(.7, when);
	g.gain.exponentialRampToValueAtTime(.001, when + .22);
	osc.connect(g);
	g.connect(dest);
	osc.start(when);
	osc.stop(when + .24);
	const hat = ctx.createOscillator();
	const hg = ctx.createGain();
	hat.type = "square";
	hat.frequency.value = 2400 + Math.random() * 800;
	hg.gain.setValueAtTime(.045, when + .25);
	hg.gain.exponentialRampToValueAtTime(.001, when + .32);
	hat.connect(hg);
	hg.connect(dest);
	hat.start(when + .25);
	hat.stop(when + .34);
}
function startDemo(h) {
	stopDemo();
	const pad = h.ctx.createOscillator();
	const pg = h.ctx.createGain();
	pad.type = "sawtooth";
	pad.frequency.value = 110;
	pg.gain.value = .04;
	const lpf = h.ctx.createBiquadFilter();
	lpf.type = "lowpass";
	lpf.frequency.value = 420;
	pad.connect(lpf);
	lpf.connect(pg);
	pg.connect(h.master);
	pad.start();
	extras.push(pad, pg, lpf);
	const pad2 = h.ctx.createOscillator();
	pad2.type = "triangle";
	pad2.frequency.value = 164.8;
	const pg2 = h.ctx.createGain();
	pg2.gain.value = .03;
	pad2.connect(pg2);
	pg2.connect(h.master);
	pad2.start();
	extras.push(pad2, pg2);
	const beat = .5;
	const kick = () => {
		if (!handle$1) return;
		const t = handle$1.ctx.currentTime;
		pulse(handle$1.ctx, handle$1.master, t);
	};
	kick();
	demoTimer = window.setInterval(kick, beat * 1e3);
}
function applyEqGains(gains) {
	if (!handle$1) return;
	handle$1.eq.forEach((f, i) => {
		f.gain.setTargetAtTime(gains[i] ?? 0, handle$1.ctx.currentTime, .03);
	});
}
function setFft(inc) {
	if (handle$1) handle$1.analyser.fftSize = fftFromInc(inc);
}
function setVolume(v, muted) {
	if (!handle$1 || handle$1.steelTap) return;
	handle$1.master.gain.setTargetAtTime(muted ? 0 : v ** 2, handle$1.ctx.currentTime, .02);
}
function getAnalyser() {
	return handle$1?.analyser ?? null;
}
async function startSource(source, file) {
	const h = await ensureCtx(source === "steel");
	stopDemo();
	stopFile();
	if (source !== "mic") stopMic();
	applyEqGains(useAura.getState().eq);
	setVolume(useAura.getState().volume, useAura.getState().muted);
	setFft(useAura.getState().inc);
	if (source === "demo") {
		startDemo(h);
		useAura.getState().set({
			playing: true,
			source,
			error: null,
			fileName: null
		});
		return;
	}
	if (source === "steel") {
		if (!tapSteelMaster()) {
			useAura.getState().set({
				playing: false,
				error: "Arm the STEEL kernel first, then tap it from AURA."
			});
			return;
		}
		useAura.getState().set({
			playing: true,
			source,
			error: null
		});
		return;
	}
	if (source === "mic") {
		try {
			micStream = await navigator.mediaDevices.getUserMedia({ audio: {
				echoCancellation: false,
				noiseSuppression: false,
				autoGainControl: false
			} });
			micNode = h.ctx.createMediaStreamSource(micStream);
			micNode.connect(h.master);
			useAura.getState().set({
				playing: true,
				source,
				error: null,
				fileName: null
			});
		} catch {
			useAura.getState().set({
				playing: false,
				error: "Microphone blocked — use demo or a file."
			});
		}
		return;
	}
	if (source === "file" && file) {
		const buf = await file.arrayBuffer();
		fileBuffer = await h.ctx.decodeAudioData(buf.slice(0));
		const src = h.ctx.createBufferSource();
		src.buffer = fileBuffer;
		src.loop = true;
		src.connect(h.master);
		src.start();
		fileSource = src;
		useAura.getState().set({
			playing: true,
			source,
			error: null,
			fileName: file.name
		});
	}
}
async function stopSource() {
	stopDemo();
	stopFile();
	stopMic();
	if (handle$1 && !handle$1.steelTap) handle$1.master.gain.setTargetAtTime(0, handle$1.ctx.currentTime, .02);
	useAura.getState().set({ playing: false });
}
async function togglePlay() {
	const s = useAura.getState();
	if (s.playing) await stopSource();
	else await startSource(s.source);
}
function readAnalyser(freq, time) {
	if (!handle$1) return false;
	handle$1.analyser.getByteFrequencyData(freq);
	handle$1.analyser.getByteTimeDomainData(time);
	return true;
}
async function startCapture(canvas, arm, maxTexture) {
	if (!handle$1) throw new Error("Start a source first");
	const fps = profileForArm(arm, maxTexture).fps;
	const stream = canvas.captureStream(fps);
	const audio = handle$1.dest.stream.getAudioTracks();
	const mixed = new MediaStream([...stream.getVideoTracks(), ...audio]);
	const mime = pickRecorderMime();
	recChunks$1 = [];
	recorder = new MediaRecorder(mixed, {
		mimeType: mime,
		audioBitsPerSecond: 32e4,
		videoBitsPerSecond: arm === 89 ? 12e6 : arm === 64 ? 8e6 : 4e6
	});
	recorder.ondataavailable = (ev) => {
		if (ev.data.size) recChunks$1.push(ev.data);
	};
	recorder.start(250);
	useAura.getState().set({
		recording: true,
		recSec: 0
	});
	recTick = window.setInterval(() => {
		useAura.getState().set({ recSec: useAura.getState().recSec + 1 });
	}, 1e3);
}
async function stopCapture() {
	if (!recorder) return null;
	const rec = recorder;
	recorder = null;
	window.clearInterval(recTick);
	const blob = await new Promise((resolve) => {
		rec.onstop = () => resolve(new Blob(recChunks$1, { type: rec.mimeType || "video/webm" }));
		rec.stop();
	});
	useAura.getState().set({ recording: false });
	return blob;
}
async function teardownAura() {
	if (recorder) await stopCapture();
	await closeHandle();
}
/** 90 BPM boom-bap bar, generated — no asset download. */
function makeBoomBap(ctx, bars = 8) {
	const bpm = 90;
	const sr = ctx.sampleRate;
	const beat = 60 / bpm;
	const dur = bars * 4 * beat;
	const n = Math.floor(sr * dur);
	const buf = ctx.createBuffer(2, n, sr);
	const L = buf.getChannelData(0);
	const R = buf.getChannelData(1);
	const noise = (len) => {
		const a = new Float32Array(len);
		for (let i = 0; i < len; i++) a[i] = Math.random() * 2 - 1;
		return a;
	};
	function add(at, samples, gain, pan = 0) {
		const start = Math.floor(at * sr);
		for (let i = 0; i < samples.length; i++) {
			const idx = start + i;
			if (idx >= n) break;
			const gL = gain * (1 - Math.max(0, pan));
			const gR = gain * (1 + Math.min(0, pan));
			L[idx] += samples[i] * gL;
			R[idx] += samples[i] * gR;
		}
	}
	function kick() {
		const len = Math.floor(sr * .28);
		const a = new Float32Array(len);
		for (let i = 0; i < len; i++) {
			const t = i / sr;
			const f = 120 * Math.exp(-t * 18) + 38;
			const env = Math.exp(-t * 14);
			a[i] = Math.sin(2 * Math.PI * f * t) * env;
		}
		return a;
	}
	function snare() {
		const len = Math.floor(sr * .18);
		const nz = noise(len);
		const a = new Float32Array(len);
		for (let i = 0; i < len; i++) {
			const t = i / sr;
			const env = Math.exp(-t * 22);
			const tone = Math.sin(2 * Math.PI * 180 * t) * Math.exp(-t * 16);
			a[i] = (nz[i] * .7 + tone * .4) * env;
		}
		return a;
	}
	function hat() {
		const len = Math.floor(sr * .05);
		const nz = noise(len);
		const a = new Float32Array(len);
		for (let i = 0; i < len; i++) {
			const t = i / sr;
			a[i] = nz[i] * Math.exp(-t * 70);
		}
		return a;
	}
	function bass(freq) {
		const len = Math.floor(sr * .42);
		const a = new Float32Array(len);
		for (let i = 0; i < len; i++) {
			const t = i / sr;
			const env = Math.min(1, t * 80) * Math.exp(-t * 4.2);
			a[i] = Math.sin(2 * Math.PI * freq * t) * env * .7;
			a[i] += Math.sin(2 * Math.PI * freq * 2 * t) * env * .12;
		}
		return a;
	}
	const k = kick();
	const s = snare();
	const h = hat();
	const notes = [
		49,
		49,
		36.7,
		41.2
	];
	for (let bar = 0; bar < bars; bar++) {
		const t0 = bar * 4 * beat;
		add(t0, k, .95);
		add(t0 + 2 * beat, k, .88);
		add(t0 + beat, s, .55, .1);
		add(t0 + 3 * beat, s, .58, -.05);
		for (let i = 0; i < 8; i++) add(t0 + i * (beat / 2), h, i % 2 ? .12 : .2, i % 2 ? .3 : -.3);
		add(t0, bass(notes[bar % 4]), .55);
		add(t0 + 2 * beat, bass(notes[bar % 4]), .4);
	}
	let peak = 1e-6;
	for (let i = 0; i < n; i++) peak = Math.max(peak, Math.abs(L[i]), Math.abs(R[i]));
	const g = .85 / peak;
	for (let i = 0; i < n; i++) {
		L[i] *= g;
		R[i] *= g;
	}
	return buf;
}
/** Short hummed line on the 90 BPM grid so clip detect has something without a mic. */
function makeDemoVocal(ctx, bars = 4) {
	const bpm = 90;
	const sr = ctx.sampleRate;
	const beat = 60 / bpm;
	const dur = bars * 4 * beat;
	const n = Math.floor(sr * dur);
	const buf = ctx.createBuffer(1, n, sr);
	const ch = buf.getChannelData(0);
	const notes = [
		{
			at: 0,
			hz: 220,
			len: .42
		},
		{
			at: beat,
			hz: 246.94,
			len: .26
		},
		{
			at: beat * 2,
			hz: 196,
			len: .5
		},
		{
			at: beat * 4,
			hz: 220,
			len: .34
		},
		{
			at: beat * 5.5,
			hz: 329.63,
			len: .2
		},
		{
			at: beat * 8,
			hz: 196,
			len: .72
		},
		{
			at: beat * 11,
			hz: 174.61,
			len: .4
		}
	];
	for (const note of notes) {
		const start = Math.floor(note.at * sr);
		const len = Math.floor(note.len * sr);
		for (let i = 0; i < len && start + i < n; i++) {
			const t = i / sr;
			const env = Math.min(1, i / (.012 * sr)) * Math.exp(-t * 2.6);
			const vib = 1 + .007 * Math.sin(2 * Math.PI * 5.4 * t);
			ch[start + i] += Math.sin(2 * Math.PI * note.hz * vib * t) * env * .38 + Math.sin(2 * Math.PI * note.hz * 2 * t) * env * .07;
		}
	}
	return buf;
}
function bufferToWav(buffer) {
	const ch = buffer.numberOfChannels;
	const sr = buffer.sampleRate;
	const len = buffer.length;
	const bytes = len * ch * 2;
	const ab = new ArrayBuffer(44 + bytes);
	const v = new DataView(ab);
	const w = (o, s) => {
		for (let i = 0; i < s.length; i++) v.setUint8(o + i, s.charCodeAt(i));
	};
	w(0, "RIFF");
	v.setUint32(4, 36 + bytes, true);
	w(8, "WAVE");
	w(12, "fmt ");
	v.setUint32(16, 16, true);
	v.setUint16(20, 1, true);
	v.setUint16(22, ch, true);
	v.setUint32(24, sr, true);
	v.setUint32(28, sr * ch * 2, true);
	v.setUint16(32, ch * 2, true);
	v.setUint16(34, 16, true);
	w(36, "data");
	v.setUint32(40, bytes, true);
	let o = 44;
	for (let i = 0; i < len; i++) for (let c = 0; c < ch; c++) {
		let s = buffer.getChannelData(c)[i];
		if (s > 1) s = 1;
		if (s < -1) s = -1;
		v.setInt16(o, s < 0 ? s * 32768 : s * 32767, true);
		o += 2;
	}
	return new Blob([ab], { type: "audio/wav" });
}
var seq = 1;
function nid() {
	seq += 1;
	return `c${seq}`;
}
function gridStep(bpm, div = 16) {
	return 60 / Math.max(60, bpm) * (4 / div);
}
function snapTime(t, bpm, div = 16) {
	const step = gridStep(bpm, div);
	return Math.max(0, Math.round(t / step) * step);
}
function rmsRange(ch, a, b) {
	let s = 0;
	const n = Math.max(1, b - a);
	for (let i = a; i < b; i++) s += ch[i] * ch[i];
	return Math.sqrt(s / n);
}
/** AMDF pitch on a short window. Honest: not a tuner, enough to snap a take to a tonic. */
function estimatePitch(ch, sr, a, b) {
	const n = Math.min(2048, Math.max(0, b - a));
	if (n < 256) return 0;
	let rms = 0;
	for (let i = 0; i < n; i++) rms += ch[a + i] * ch[a + i];
	rms = Math.sqrt(rms / n);
	if (rms < .01) return 0;
	const minP = Math.floor(sr / 520);
	const maxP = Math.min(Math.floor(sr / 80), Math.floor(n / 2));
	let best = 1e9;
	let bestP = minP;
	for (let p = minP; p < maxP; p++) {
		let s = 0;
		const m = n - p;
		for (let i = 0; i < m; i += 2) {
			const d = ch[a + i] - ch[a + i + p];
			s += d * d;
		}
		s /= Math.max(1, m);
		if (s < best) {
			best = s;
			bestP = p;
		}
	}
	return sr / bestP;
}
function pitchToTonic(hz) {
	if (hz < 70 || hz > 900) return 0;
	const midi = 69 + 12 * Math.log2(hz / 440);
	return (Math.round(midi) % 12 + 12) % 12;
}
function detectClips(buffer) {
	const ch = buffer.getChannelData(0);
	const sr = buffer.sampleRate;
	const win = Math.max(1, Math.floor(sr * .02));
	const thresh = .018;
	const minLen = .12;
	const clips = [];
	let on = -1;
	for (let i = 0; i < ch.length; i += win) {
		const e = rmsRange(ch, i, Math.min(ch.length, i + win));
		if (e > thresh && on < 0) on = i;
		if ((e <= thresh || i + win >= ch.length) && on >= 0) {
			const start = on / sr;
			const end = Math.min(buffer.duration, (i + win) / sr);
			if (end - start >= minLen) {
				const score = rmsRange(ch, on, Math.min(ch.length, i + win));
				clips.push({
					id: nid(),
					start,
					end,
					offset: start,
					gain: 1,
					muted: false,
					kind: "main",
					score,
					pitchHz: estimatePitch(ch, sr, on, Math.min(ch.length, i + win)),
					pitchRatio: 1
				});
			}
			on = -1;
		}
	}
	if (!clips.length && buffer.duration > .05) clips.push({
		id: nid(),
		start: 0,
		end: buffer.duration,
		offset: 0,
		gain: 1,
		muted: false,
		kind: "main",
		score: rmsRange(ch, 0, ch.length),
		pitchHz: estimatePitch(ch, sr, 0, Math.min(ch.length, 2048)),
		pitchRatio: 1
	});
	return clips;
}
/** Mains to the nearest beat; adlibs to the offbeat; backs a 16th after the downbeat. */
function placeOnGrid(clips, bpm) {
	const beat = 60 / Math.max(60, bpm);
	const eighth = beat / 2;
	const step = beat / 4;
	return clips.map((c) => {
		if (c.muted) return c;
		let target = c.offset;
		if (c.kind === "main") target = Math.round(c.offset / beat) * beat;
		else if (c.kind === "adlib") {
			const q = Math.round(c.offset / eighth);
			target = q * eighth + (q % 2 === 0 ? eighth / 2 : 0);
		} else target = Math.round(c.offset / beat) * beat + step;
		return {
			...c,
			offset: Math.max(0, target)
		};
	});
}
function keepBestTakes(clips) {
	const mains = clips.filter((c) => c.kind === "main");
	if (mains.length < 2) return clips;
	const scores = mains.map((c) => c.score).sort((a, b) => a - b);
	const med = scores[Math.floor(scores.length / 2)] ?? 0;
	const floor = Math.max(.02, med * .5);
	return clips.map((c) => c.kind === "main" && c.score < floor ? {
		...c,
		muted: true
	} : c);
}
function splitClip(clip, at) {
	const t = Math.min(clip.end - .04, Math.max(clip.start + .04, at));
	if (t <= clip.start || t >= clip.end) return [clip];
	return [{
		...clip,
		id: nid(),
		end: t
	}, {
		...clip,
		id: nid(),
		start: t,
		offset: clip.offset + (t - clip.start)
	}];
}
function splitClipOnGrid(clip, bpm) {
	const mid = (clip.start + clip.end) / 2;
	return splitClip(clip, clip.start + snapTime(mid - clip.start, bpm));
}
function composeClips(src, clips, lengthSec, ctx, fadeSec = .012) {
	const sr = src.sampleRate;
	const len = Math.max(src.length, Math.floor(Math.max(.5, lengthSec) * sr));
	const out = ctx.createBuffer(src.numberOfChannels, len, sr);
	for (const clip of clips) {
		if (clip.muted) continue;
		const ratio = clip.pitchRatio > .05 ? clip.pitchRatio : 1;
		const s0 = Math.max(0, Math.floor(clip.start * sr));
		const s1 = Math.min(src.length, Math.floor(clip.end * sr));
		const srcN = s1 - s0;
		if (srcN <= 0) continue;
		const outN = Math.floor(srcN / ratio);
		const d0 = Math.max(0, Math.floor(clip.offset * sr));
		const n = Math.min(outN, len - d0);
		if (n <= 0) continue;
		const g = clip.gain * (clip.kind === "back" ? .9 : clip.kind === "adlib" ? .85 : 1);
		const fade = Math.min(Math.floor(Math.max(.004, fadeSec) * sr), Math.floor(n / 4));
		for (let c = 0; c < src.numberOfChannels; c++) {
			const a = src.getChannelData(c);
			const b = out.getChannelData(c);
			for (let i = 0; i < n; i++) {
				const srcPos = s0 + i * ratio;
				const i0 = Math.min(s1 - 1, Math.floor(srcPos));
				const i1 = Math.min(s1 - 1, i0 + 1);
				const frac = srcPos - i0;
				let x = a[i0] * (1 - frac) + a[i1] * frac;
				if (clip.kind === "adlib") x = Math.tanh(x * 2.2);
				let env = 1;
				if (i < fade) env = i / fade;
				else if (i > n - fade) env = (n - i) / fade;
				b[d0 + i] += x * g * env;
			}
		}
	}
	return out;
}
function cloneAs(clip, kind, bpm) {
	const step = gridStep(bpm, 8);
	return {
		...clip,
		id: nid(),
		kind,
		offset: snapTime(clip.offset + (kind === "back" ? step * .5 : step), bpm),
		gain: kind === "back" ? .55 : .8,
		score: clip.score,
		pitchRatio: 1
	};
}
/** Weak takes become shouted adlibs; the strongest take also throws a same-voice offbeat. */
function makeAdlibClips(clips, bpm) {
	const mains = clips.filter((c) => c.kind === "main" && !c.muted);
	if (!mains.length) return clips;
	const ranked = [...mains].sort((a, b) => a.score - b.score);
	const weakN = Math.min(3, Math.max(1, Math.floor(ranked.length / 3) || 1));
	const weak = ranked.slice(0, weakN);
	const best = ranked[ranked.length - 1];
	const extra = weak.map((w) => ({
		...cloneAs(w, "adlib", bpm),
		pitchRatio: 1.07 + .05 * (1 - Math.min(1, w.score * 8)),
		gain: .68
	}));
	if (best) extra.push({
		...cloneAs(best, "adlib", bpm),
		pitchRatio: 1.04,
		gain: .6,
		offset: snapTime(best.offset + gridStep(bpm, 8), bpm)
	});
	return [...clips, ...extra];
}
/** Unison thicken + a couple of octave-down pads from the longest takes. Same recording, not a clone. */
function makeBackClips(clips, bpm) {
	const mains = clips.filter((c) => c.kind === "main" && !c.muted && c.score > .03).sort((a, b) => b.end - b.start - (a.end - a.start)).slice(0, 4);
	const extra = [];
	mains.forEach((c, i) => {
		extra.push({
			...cloneAs(c, "back", bpm),
			pitchRatio: .995,
			gain: .4
		});
		if (i < 2) extra.push({
			...cloneAs(c, "back", bpm),
			pitchRatio: .5,
			gain: .28,
			offset: snapTime(c.offset + gridStep(bpm, 4) * .5, bpm)
		});
	});
	return [...clips, ...extra];
}
function timelineSpan(clips, min = 4) {
	let m = min;
	for (const c of clips) m = Math.max(m, c.offset + (c.end - c.start));
	return m;
}
var DELAYS = [
	{
		id: "off",
		et: "Off",
		en: "Off",
		ru: "Выкл"
	},
	{
		id: "slap",
		et: "Slap",
		en: "Slap",
		ru: "Slap"
	},
	{
		id: "1/4",
		et: "1/4",
		en: "1/4",
		ru: "1/4"
	},
	{
		id: "1/8",
		et: "1/8",
		en: "1/8",
		ru: "1/8"
	},
	{
		id: "1/16",
		et: "1/16",
		en: "1/16",
		ru: "1/16"
	},
	{
		id: "1/32",
		et: "1/32",
		en: "1/32",
		ru: "1/32"
	},
	{
		id: "dotted8",
		et: "Punkt 1/8",
		en: "Dotted 1/8",
		ru: "Пункт 1/8"
	},
	{
		id: "dotted4",
		et: "Punkt 1/4",
		en: "Dotted 1/4",
		ru: "Пункт 1/4"
	},
	{
		id: "ping",
		et: "Ping-pong",
		en: "Ping-pong",
		ru: "Пинг-понг"
	}
];
var REVERBS = [
	{
		id: "off",
		et: "Off",
		en: "Off",
		ru: "Выкл"
	},
	{
		id: "room",
		et: "Tuba",
		en: "Room",
		ru: "Комната"
	},
	{
		id: "plate",
		et: "Plaat",
		en: "Plate",
		ru: "Плейт"
	},
	{
		id: "spring",
		et: "Vedru",
		en: "Spring",
		ru: "Пружина"
	},
	{
		id: "hall",
		et: "Saal",
		en: "Hall",
		ru: "Зал"
	},
	{
		id: "gated",
		et: "Gated",
		en: "Gated",
		ru: "Gated"
	},
	{
		id: "reverse",
		et: "Tagurpidi",
		en: "Reverse",
		ru: "Реверс"
	}
];
var GENRES = [
	{
		id: "hardstyle",
		et: "Hardstyle",
		en: "Hardstyle",
		ru: "Hardstyle"
	},
	{
		id: "rawstyle",
		et: "Rawstyle",
		en: "Rawstyle",
		ru: "Rawstyle"
	},
	{
		id: "hardtechno",
		et: "Hard techno",
		en: "Hard techno",
		ru: "Hard techno"
	},
	{
		id: "commercial",
		et: "Commercial",
		en: "Commercial",
		ru: "Commercial"
	}
];
function delaySeconds(id, bpm) {
	const b = 60 / Math.max(60, bpm);
	if (id === "1/4") return b;
	if (id === "1/8" || id === "ping") return b / 2;
	if (id === "1/16") return b / 4;
	if (id === "1/32") return b / 8;
	if (id === "dotted8") return b / 2 * 1.5;
	if (id === "dotted4") return b * 1.5;
	if (id === "slap") return .075;
	return .01;
}
function noiseIR(ctx, seconds, decay, reverse) {
	const len = Math.max(32, Math.floor(ctx.sampleRate * seconds));
	const buf = ctx.createBuffer(2, len, ctx.sampleRate);
	for (let c = 0; c < 2; c++) {
		const ch = buf.getChannelData(c);
		for (let i = 0; i < len; i++) {
			const t = reverse ? (len - 1 - i) / len : i / len;
			ch[i] = (Math.random() * 2 - 1) * Math.pow(1 - t, decay);
		}
	}
	return buf;
}
function irFor(ctx, id) {
	if (id === "plate") return noiseIR(ctx, .9, 2.2, false);
	if (id === "hall") return noiseIR(ctx, 2.4, 1.6, false);
	if (id === "gated") return noiseIR(ctx, .28, .7, false);
	if (id === "reverse") return noiseIR(ctx, .7, 1.1, true);
	if (id === "spring") return noiseIR(ctx, .55, 2.8, false);
	if (id === "room") return noiseIR(ctx, .45, 2, false);
	return noiseIR(ctx, .12, 3, false);
}
function genrePreset(g) {
	if (g === "rawstyle") return {
		delay: "1/16",
		reverb: "gated",
		delayMix: .22,
		reverbMix: .16,
		drive: .38,
		amount: .82
	};
	if (g === "hardtechno") return {
		delay: "1/8",
		reverb: "plate",
		delayMix: .18,
		reverbMix: .12,
		drive: .3,
		amount: .7
	};
	if (g === "commercial") return {
		delay: "1/8",
		reverb: "hall",
		delayMix: .12,
		reverbMix: .18,
		drive: .14,
		amount: .62
	};
	return {
		delay: "ping",
		reverb: "gated",
		delayMix: .2,
		reverbMix: .22,
		drive: .28,
		amount: .76
	};
}
function classifyMic(label) {
	const l = label.toLowerCase();
	if (/bluetooth|airpod|hands-?free/.test(l)) return {
		tag: "bt",
		hpf: 150,
		presence: 6,
		hz: 3800,
		air: 4
	};
	if (/usb|yeti|at2020|rode|scarlett|focusrite|shure|sm7|quadcast/.test(l)) return {
		tag: "usb",
		hpf: 70,
		presence: 2.2,
		hz: 2800,
		air: 1.2
	};
	if (/headset|headphone|earbud/.test(l)) return {
		tag: "headset",
		hpf: 115,
		presence: 4.5,
		hz: 3500,
		air: 2.8
	};
	return {
		tag: "built-in",
		hpf: 125,
		presence: 5,
		hz: 3400,
		air: 3.2
	};
}
/** V = s/t — punch vs wash. High V: kick in the centre, short nest. */
function kareFromV(v) {
	const n = Math.min(1, Math.max(0, v));
	return {
		nestSec: .055 + (1 - n) * .4,
		nestGain: .05 + (1 - n) * .2,
		tunnelGain: .4 + n * .55,
		mirrorSec: .007 + (1 - n) * .014,
		vocalPush: .92 + n * .14
	};
}
/** Ten ISO peaking bands. Keep rate and depth — no trophy upsample. */
var EQ_HZ = [
	31,
	62,
	125,
	250,
	500,
	1e3,
	2e3,
	4e3,
	8e3,
	16e3
];
var EQ_Q = 1.05;
function emptyEq() {
	return EQ_HZ.map(() => 0);
}
function clampEq(n) {
	return Math.max(-12, Math.min(12, n));
}
function nearestBand(hz) {
	let best = 0;
	let dist = Infinity;
	EQ_HZ.forEach((h, i) => {
		const d = Math.abs(Math.log2(h / Math.max(20, hz)));
		if (d < dist) {
			dist = d;
			best = i;
		}
	});
	return best;
}
function labelHz(hz) {
	return hz >= 1e3 ? `${hz / 1e3}k` : `${hz}`;
}
var NOTE_NAMES = [
	"C",
	"C#",
	"D",
	"D#",
	"E",
	"F",
	"F#",
	"G",
	"G#",
	"A",
	"A#",
	"B"
];
var useDesk = create((set) => ({
	beatName: null,
	vocalName: null,
	playing: false,
	recording: false,
	liveMic: false,
	amount: .72,
	speed: .42,
	tonic: 0,
	mode: 1,
	drive: .18,
	ceiling: .89,
	beatGain: .78,
	vocalGain: .92,
	width: .35,
	glue: .55,
	duck: 1,
	peak: 0,
	rms: 0,
	pitch: 0,
	clips: 0,
	bpm: 90,
	lufs: -70,
	keyName: "A min",
	aiNote: null,
	aiBusy: false,
	error: null,
	regions: [],
	selectedId: null,
	delay: "ping",
	reverb: "gated",
	delayMix: .18,
	reverbMix: .16,
	fade: .08,
	genre: "hardstyle",
	applyMix: true,
	autoTakt: true,
	female: false,
	backs: false,
	micLabel: null,
	videoPrompt: "",
	videoBusy: false,
	kare: .72,
	lyrics: "",
	palve: "",
	eq: emptyEq(),
	set: (p) => set(p)
}));
var handle = null;
var rec = null;
var recChunks = [];
var meterRaf = 0;
var micEq = {
	presence: 3.5,
	air: 1.5,
	hpf: 90,
	hz: 3200
};
function estimateBpm(buffer) {
	const ch = buffer.getChannelData(0);
	const sr = buffer.sampleRate;
	const hop = Math.max(1, Math.floor(sr / 50));
	const n = Math.min(ch.length, Math.floor(sr * 20));
	const energies = [];
	for (let i = 0; i + hop < n; i += hop) {
		let e = 0;
		for (let j = 0; j < hop; j += 8) e += ch[i + j] * ch[i + j];
		energies.push(e);
	}
	if (energies.length < 24) return 90;
	const flux = new Float32Array(energies.length - 1);
	for (let i = 1; i < energies.length; i++) flux[i - 1] = Math.max(0, energies[i] - energies[i - 1]);
	const minLag = Math.round(60 / 180 * 50);
	const maxLag = Math.min(flux.length - 2, Math.round(60 / 70 * 50));
	let best = 0;
	let bestLag = minLag;
	for (let lag = minLag; lag <= maxLag; lag++) {
		let s = 0;
		const m = flux.length - lag;
		for (let i = 0; i < m; i++) s += flux[i] * flux[i + lag];
		s /= Math.max(1, m);
		if (s > best) {
			best = s;
			bestLag = lag;
		}
	}
	let bpm = 60 / (bestLag / 50);
	if (bpm < 70) bpm *= 2;
	if (bpm > 180) bpm /= 2;
	return Math.round(Math.min(180, Math.max(70, bpm)));
}
function applyGlue(h, glue) {
	const t = h.ctx.currentTime;
	const g = Math.min(1, Math.max(0, glue));
	h.glue.threshold.setTargetAtTime(-8 - g * 16, t, .05);
	h.glue.knee.setTargetAtTime(4 + g * 8, t, .05);
	h.glue.ratio.setTargetAtTime(1.4 + g * 4.6, t, .05);
	h.glue.attack.setTargetAtTime(.006, t, .02);
	h.glue.release.setTargetAtTime(.12 + g * .16, t, .05);
}
function wireGlue(ctx, glueAmt) {
	const glue = ctx.createDynamicsCompressor();
	const g = Math.min(1, Math.max(0, glueAmt));
	glue.threshold.value = -8 - g * 16;
	glue.knee.value = 4 + g * 8;
	glue.ratio.value = 1.4 + g * 4.6;
	glue.attack.value = .006;
	glue.release.value = .12 + g * .16;
	return glue;
}
function femaleMidi(tonic, mode) {
	const root = 48 + tonic;
	const third = mode === 2 ? 4 : 3;
	return [
		root,
		root + 7,
		root + 12,
		root + 12 + third
	];
}
function midiHz(m) {
	return 440 * Math.pow(2, (m - 69) / 12);
}
function retuneFemale(h, tonic, mode) {
	const freqs = femaleMidi(tonic, mode).map(midiHz);
	const t = h.ctx.currentTime;
	h.femaleOsc.forEach((o, i) => {
		if (freqs[i]) o.frequency.setTargetAtTime(freqs[i], t, .08);
	});
}
function pumpMixMeter() {
	if (!handle) return;
	const a = handle.analyser;
	const buf = handle.mixBuf;
	a.getByteTimeDomainData(buf);
	let peak = 0;
	let rms = 0;
	for (let i = 0; i < buf.length; i++) {
		const x = (buf[i] - 128) / 128;
		const ax = Math.abs(x);
		if (ax > peak) peak = ax;
		rms += x * x;
	}
	rms = Math.sqrt(rms / buf.length);
	const vbuf = handle.vocalBuf;
	handle.vocalAn.getByteTimeDomainData(vbuf);
	let vp = 0;
	for (let i = 0; i < vbuf.length; i++) {
		const ax = Math.abs((vbuf[i] - 128) / 128);
		if (ax > vp) vp = ax;
	}
	const duck = vp > .1 ? 1 - Math.min(.38, (vp - .1) * .9) : 1;
	handle.duck.gain.setTargetAtTime(duck, handle.ctx.currentTime, .04);
	const prev = useDesk.getState();
	const smoothRms = rms * .2 + prev.rms * .8;
	const lufs = smoothRms > 1e-8 ? 20 * Math.log10(smoothRms) - .691 : Math.max(-70, prev.lufs - 1.5);
	useDesk.getState().set({
		peak: Math.max(peak, prev.peak * .92),
		rms: smoothRms,
		lufs,
		duck
	});
	meterRaf = requestAnimationFrame(pumpMixMeter);
}
async function ensure() {
	if (handle && handle.ctx.state !== "closed") {
		if (handle.ctx.state === "suspended") await handle.ctx.resume();
		return handle;
	}
	const ctx = new AudioContext({
		latencyHint: "interactive",
		sampleRate: 44100
	});
	await ctx.audioWorklet.addModule("/worklets/steel-tune.js");
	const beatGain = ctx.createGain();
	const vocalIn = ctx.createGain();
	const vocalGain = ctx.createGain();
	const duck = ctx.createGain();
	duck.gain.value = 1;
	const tune = new AudioWorkletNode(ctx, "steel-tune", {
		numberOfInputs: 1,
		numberOfOutputs: 1,
		outputChannelCount: [2]
	});
	const hpf = ctx.createBiquadFilter();
	hpf.type = "highpass";
	hpf.frequency.value = 90;
	const presence = ctx.createBiquadFilter();
	presence.type = "peaking";
	presence.frequency.value = 3200;
	presence.Q.value = .9;
	presence.gain.value = 3.5;
	const air = ctx.createBiquadFilter();
	air.type = "highshelf";
	air.frequency.value = 8e3;
	air.gain.value = 1.5;
	const eq = EQ_HZ.map((hz) => {
		const f = ctx.createBiquadFilter();
		f.type = "peaking";
		f.frequency.value = hz;
		f.Q.value = EQ_Q;
		f.gain.value = 0;
		return f;
	});
	const delay = ctx.createDelay(2);
	const delayGain = ctx.createGain();
	delayGain.gain.value = .18;
	const delayFb = ctx.createGain();
	delayFb.gain.value = .28;
	const ping = ctx.createDelay(2);
	ping.delayTime.value = .02;
	const convolver = ctx.createConvolver();
	convolver.buffer = irFor(ctx, "gated");
	const revGain = ctx.createGain();
	revGain.gain.value = .16;
	const mix = ctx.createGain();
	mix.gain.value = .95;
	const glue = wireGlue(ctx, useDesk.getState().glue);
	const dest = ctx.createMediaStreamDestination();
	const analyser = ctx.createAnalyser();
	analyser.fftSize = 2048;
	const vocalAn = ctx.createAnalyser();
	vocalAn.fftSize = 1024;
	const female = ctx.createGain();
	female.gain.value = 0;
	const femaleOsc = [];
	const tunnelLp = ctx.createBiquadFilter();
	tunnelLp.type = "lowpass";
	tunnelLp.frequency.value = 130;
	tunnelLp.Q.value = .7;
	const tunnelSplit = ctx.createChannelSplitter(2);
	const tunnelMerge = ctx.createChannelMerger(2);
	const tunnelGain = ctx.createGain();
	tunnelGain.gain.value = .72;
	const beatHp = ctx.createBiquadFilter();
	beatHp.type = "highpass";
	beatHp.frequency.value = 130;
	const nest = ctx.createDelay(2);
	nest.delayTime.value = .16;
	const nestGain = ctx.createGain();
	nestGain.gain.value = .1;
	const mirror = ctx.createDelay(2);
	mirror.delayTime.value = .011;
	const mirrorGain = ctx.createGain();
	mirrorGain.gain.value = .22;
	vocalIn.connect(tune);
	tune.connect(hpf);
	hpf.connect(presence);
	presence.connect(air);
	air.connect(eq[0]);
	for (let i = 0; i < eq.length - 1; i++) eq[i].connect(eq[i + 1]);
	eq[eq.length - 1].connect(vocalGain);
	vocalGain.connect(mix);
	vocalGain.connect(vocalAn);
	vocalGain.connect(delay);
	delay.connect(delayFb);
	delayFb.connect(delay);
	delay.connect(ping);
	ping.connect(delayGain);
	delayGain.connect(mix);
	vocalGain.connect(convolver);
	convolver.connect(revGain);
	revGain.connect(mix);
	vocalGain.connect(nest);
	nest.connect(nestGain);
	nestGain.connect(mix);
	vocalGain.connect(mirror);
	mirror.connect(mirrorGain);
	mirrorGain.connect(mix);
	beatGain.connect(tunnelLp);
	tunnelLp.connect(tunnelSplit);
	tunnelSplit.connect(tunnelMerge, 0, 0);
	tunnelSplit.connect(tunnelMerge, 0, 1);
	tunnelMerge.connect(tunnelGain);
	tunnelGain.connect(mix);
	beatGain.connect(beatHp);
	beatHp.connect(duck);
	duck.connect(mix);
	female.connect(mix);
	mix.connect(glue);
	glue.connect(analyser);
	analyser.connect(ctx.destination);
	glue.connect(dest);
	tune.port.onmessage = (ev) => {
		const d = ev.data;
		if (d?.type !== "meter") return;
		useDesk.getState().set({
			pitch: d.pitch ?? 0,
			clips: d.clips ?? 0
		});
	};
	handle = {
		ctx,
		beat: {
			buffer: null,
			source: null,
			gain: beatGain
		},
		vocal: {
			buffer: null,
			source: null,
			gain: vocalGain
		},
		vocalRaw: null,
		composed: null,
		tune,
		vocalIn,
		mix,
		duck,
		glue,
		dest,
		analyser,
		vocalAn,
		mixBuf: new Uint8Array(analyser.fftSize),
		vocalBuf: new Uint8Array(vocalAn.fftSize),
		mic: null,
		micStream: null,
		hpf,
		presence,
		air,
		delay,
		delayGain,
		delayFb,
		ping,
		convolver,
		revGain,
		female,
		femaleOsc,
		tunnelLp,
		tunnelGain,
		beatHp,
		nest,
		nestGain,
		mirror,
		mirrorGain,
		eq
	};
	pushParams();
	await ctx.resume();
	return handle;
}
function tapDeskAudio() {
	if (!handle) return null;
	return {
		analyser: handle.analyser,
		stream: handle.dest.stream,
		ctx: handle.ctx
	};
}
function pushParams() {
	const s = useDesk.getState();
	handle?.tune.port.postMessage({
		type: "params",
		params: {
			amount: s.applyMix ? s.amount : Math.min(s.amount, .35),
			speed: s.speed,
			tonic: s.tonic,
			mode: s.mode,
			drive: s.applyMix ? s.drive : s.drive * .35,
			ceiling: s.ceiling,
			hpf: 80
		}
	});
	if (handle) {
		const t = handle.ctx.currentTime;
		handle.beat.gain.gain.setTargetAtTime(s.beatGain, t, .02);
		handle.vocal.gain.gain.setTargetAtTime(s.vocalGain, t, .02);
		handle.delay.delayTime.setTargetAtTime(delaySeconds(s.delay, s.bpm), t, .04);
		handle.delayGain.gain.setTargetAtTime(s.delay === "off" || !s.applyMix ? 0 : s.delayMix, t, .04);
		handle.ping.delayTime.setTargetAtTime(s.delay === "ping" ? delaySeconds("1/16", s.bpm) : .004, t, .04);
		handle.revGain.gain.setTargetAtTime(s.reverb === "off" || !s.applyMix ? 0 : s.reverbMix, t, .04);
		handle.female.gain.setTargetAtTime(s.female ? .11 : 0, t, .05);
		handle.hpf.frequency.setTargetAtTime(micEq.hpf, t, .05);
		handle.presence.frequency.setTargetAtTime(micEq.hz, t, .05);
		handle.presence.gain.setTargetAtTime(s.applyMix ? micEq.presence : .8, t, .05);
		handle.air.gain.setTargetAtTime(s.applyMix ? micEq.air : .4, t, .05);
		const k = kareFromV(s.kare);
		handle.nest.delayTime.setTargetAtTime(k.nestSec, t, .05);
		handle.nestGain.gain.setTargetAtTime(s.applyMix ? k.nestGain : 0, t, .05);
		handle.tunnelGain.gain.setTargetAtTime(s.applyMix ? k.tunnelGain : .2, t, .05);
		handle.mirror.delayTime.setTargetAtTime(k.mirrorSec, t, .05);
		handle.mirrorGain.gain.setTargetAtTime(s.applyMix ? .18 + s.width * .2 : 0, t, .05);
		if (handle.eq.length) {
			const bands = s.eq?.length === EQ_HZ.length ? s.eq : EQ_HZ.map(() => 0);
			handle.eq.forEach((node, i) => {
				node.gain.setTargetAtTime(bands[i] ?? 0, t, .05);
			});
		}
		if (s.applyMix) handle.vocal.gain.gain.setTargetAtTime(Math.min(1.2, s.vocalGain * k.vocalPush), t, .04);
		applyGlue(handle, s.applyMix ? s.glue : s.glue * .4);
		if (handle.femaleOsc.length) retuneFemale(handle, s.tonic, s.mode);
	}
}
function setEqGains(gains) {
	useDesk.getState().set({ eq: gains.slice(0, EQ_HZ.length) });
	if (!handle) return;
	const t = handle.ctx.currentTime;
	handle.eq.forEach((node, i) => {
		node.gain.setTargetAtTime(gains[i] ?? 0, t, .04);
	});
}
async function setFx(delay, reverb) {
	const h = await ensure();
	h.convolver.buffer = irFor(h.ctx, reverb === "off" ? "plate" : reverb);
	useDesk.getState().set({
		delay,
		reverb
	});
	pushParams();
}
async function ensureFemale() {
	const h = await ensure();
	if (h.femaleOsc.length) {
		retuneFemale(h, useDesk.getState().tonic, useDesk.getState().mode);
		return;
	}
	const s = useDesk.getState();
	const freqs = femaleMidi(s.tonic, s.mode).map(midiHz);
	for (const f of freqs) {
		const o = h.ctx.createOscillator();
		o.type = "sawtooth";
		o.frequency.value = f;
		const g = h.ctx.createGain();
		g.gain.value = .1;
		const filt = h.ctx.createBiquadFilter();
		filt.type = "lowpass";
		filt.frequency.value = 1400;
		const form = h.ctx.createBiquadFilter();
		form.type = "peaking";
		form.frequency.value = 900;
		form.Q.value = 1.1;
		form.gain.value = 4;
		o.connect(filt);
		filt.connect(form);
		form.connect(g);
		g.connect(h.female);
		o.start();
		h.femaleOsc.push(o);
	}
}
async function setFemale(on) {
	useDesk.getState().set({ female: on });
	if (on) await ensureFemale();
	pushParams();
}
async function rebuildComposed() {
	const h = await ensure();
	const raw = h.vocalRaw;
	if (!raw) return;
	const s = useDesk.getState();
	const len = Math.max(raw.duration, h.beat.buffer?.duration ?? raw.duration);
	const composed = composeClips(raw, s.regions, len, h.ctx, s.fade);
	h.composed = composed;
	h.vocal.buffer = composed;
	if (s.playing && !s.liveMic) startLoop(h.vocal, h.vocalIn, h.ctx);
}
async function decodeSlot(file) {
	const h = await ensure();
	const arr = await file.arrayBuffer();
	try {
		return await h.ctx.decodeAudioData(arr.slice(0));
	} catch {
		throw new Error("decode");
	}
}
async function setBeatBuffer(buffer, name) {
	const h = await ensure();
	h.beat.buffer = buffer;
	useDesk.getState().set({
		beatName: name,
		error: null,
		bpm: estimateBpm(buffer)
	});
	pushParams();
	if (h.vocalRaw) await rebuildComposed();
}
function strongestTonic(regions, fallback) {
	const ranked = [...regions].filter((c) => !c.muted && c.pitchHz > 70).sort((a, b) => b.score - a.score);
	if (!ranked[0]) return fallback;
	return pitchToTonic(ranked[0].pitchHz);
}
async function setVocalBuffer(buffer, name) {
	const h = await ensure();
	h.vocalRaw = buffer;
	const s = useDesk.getState();
	let regions = detectClips(buffer);
	if (s.autoTakt) regions = placeOnGrid(keepBestTakes(regions), s.bpm);
	const tonic = s.autoTakt ? strongestTonic(regions, s.tonic) : s.tonic;
	h.composed = composeClips(buffer, regions, Math.max(buffer.duration, h.beat.buffer?.duration ?? buffer.duration), h.ctx, s.fade);
	h.vocal.buffer = h.composed;
	useDesk.getState().set({
		vocalName: name,
		error: null,
		liveMic: false,
		regions,
		selectedId: regions.find((c) => !c.muted)?.id ?? regions[0]?.id ?? null,
		tonic,
		aiNote: s.autoTakt ? "AI takt · beat + noot" : null
	});
}
async function loadDemoBeat() {
	const h = await ensure();
	const buf = makeBoomBap(h.ctx, 8);
	h.beat.buffer = buf;
	useDesk.getState().set({
		beatName: "demo-90bpm.wav",
		error: null,
		bpm: 90
	});
}
async function loadDemoVocal() {
	await setVocalBuffer(makeDemoVocal((await ensure()).ctx, 4), "demo-vocal.wav");
}
function startLoop(slot, dest, ctx) {
	if (!slot.buffer) return;
	try {
		slot.source?.stop();
	} catch {}
	const src = ctx.createBufferSource();
	src.buffer = slot.buffer;
	src.loop = true;
	src.connect(dest);
	src.start();
	slot.source = src;
}
async function playMix() {
	const h = await ensure();
	const s = useDesk.getState();
	if (!h.beat.buffer && !h.vocal.buffer && !s.liveMic) throw new Error("empty");
	pushParams();
	if (s.female) await ensureFemale();
	if (h.beat.buffer) startLoop(h.beat, h.beat.gain, h.ctx);
	if (h.vocal.buffer && !s.liveMic) startLoop(h.vocal, h.vocalIn, h.ctx);
	if (!meterRaf) pumpMixMeter();
	useDesk.getState().set({
		playing: true,
		error: null
	});
}
function stopMix() {
	if (meterRaf) {
		cancelAnimationFrame(meterRaf);
		meterRaf = 0;
	}
	if (!handle) {
		useDesk.getState().set({
			playing: false,
			duck: 1
		});
		return;
	}
	try {
		handle.beat.source?.stop();
		handle.vocal.source?.stop();
	} catch {}
	handle.beat.source = null;
	handle.vocal.source = null;
	handle.duck.gain.setTargetAtTime(1, handle.ctx.currentTime, .02);
	useDesk.getState().set({
		playing: false,
		duck: 1
	});
}
function applyMicToGraph(label, sampleRate, channels) {
	const h = handle;
	if (!h) return classifyMic(label).tag;
	const p = classifyMic(label);
	micEq = {
		presence: p.presence,
		air: p.air,
		hpf: p.hpf,
		hz: p.hz
	};
	const t = h.ctx.currentTime;
	h.hpf.frequency.setTargetAtTime(p.hpf, t, .05);
	h.presence.frequency.setTargetAtTime(p.hz, t, .05);
	h.presence.gain.setTargetAtTime(p.presence, t, .05);
	h.air.gain.setTargetAtTime(p.air, t, .05);
	const hz = sampleRate ?? 44100;
	const ch = channels ?? 1;
	return `${p.tag} · ${hz} Hz · ${ch}ch`;
}
async function startLiveMic() {
	const h = await ensure();
	try {
		const stream = await navigator.mediaDevices.getUserMedia({ audio: {
			echoCancellation: false,
			noiseSuppression: false,
			autoGainControl: false
		} });
		const track = stream.getAudioTracks()[0];
		const set = track?.getSettings?.() ?? {};
		const label = track?.label || "mic";
		h.micStream = stream;
		h.mic = h.ctx.createMediaStreamSource(stream);
		h.mic.connect(h.vocalIn);
		const micLabel = applyMicToGraph(label, set.sampleRate, set.channelCount);
		useDesk.getState().set({
			liveMic: true,
			vocalName: label,
			micLabel,
			error: null,
			playing: true
		});
		pushParams();
		if (h.beat.buffer && !h.beat.source) startLoop(h.beat, h.beat.gain, h.ctx);
		if (!meterRaf) pumpMixMeter();
	} catch {
		throw new Error("mic");
	}
}
function stopLiveMic() {
	if (!handle) return;
	handle.mic?.disconnect();
	handle.micStream?.getTracks().forEach((t) => t.stop());
	handle.mic = null;
	handle.micStream = null;
	useDesk.getState().set({ liveMic: false });
}
async function toggleVoiceRec() {
	if (rec && rec.state === "recording") {
		const blob = await new Promise((resolve) => {
			rec.onstop = () => resolve(new Blob(recChunks, { type: rec.mimeType || "audio/webm" }));
			rec.stop();
		});
		rec = null;
		useDesk.getState().set({ recording: false });
		await setVocalBuffer(await decodeSlot(new File([blob], "voice.webm", { type: blob.type })), "voice.webm");
		return "stop";
	}
	const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
	recChunks = [];
	const mime = MediaRecorder.isTypeSupported("audio/webm") ? "audio/webm" : "audio/mp4";
	rec = new MediaRecorder(stream, {
		mimeType: mime,
		audioBitsPerSecond: 192e3
	});
	rec.ondataavailable = (e) => {
		if (e.data.size) recChunks.push(e.data);
	};
	rec.start(200);
	const label = stream.getAudioTracks()[0]?.label || "mic";
	await ensure();
	const micLabel = applyMicToGraph(label);
	useDesk.getState().set({
		recording: true,
		error: null,
		micLabel
	});
	return "start";
}
async function bounceWav() {
	const h = await ensure();
	const beat = h.beat.buffer;
	const vocal = h.vocal.buffer;
	if (!beat && !vocal) throw new Error("empty");
	const sr = 44100;
	const len = Math.max(beat?.length ?? 0, vocal?.length ?? 0);
	const off = new OfflineAudioContext(2, len, sr);
	await off.audioWorklet.addModule("/worklets/steel-tune.js");
	const s = useDesk.getState();
	const mix = off.createGain();
	mix.gain.value = .95;
	const glue = wireGlue(off, s.applyMix ? s.glue : s.glue * .4);
	mix.connect(glue);
	glue.connect(off.destination);
	if (beat) {
		const src = off.createBufferSource();
		src.buffer = beat;
		const g = off.createGain();
		g.gain.value = s.beatGain;
		const k = kareFromV(s.kare);
		const lp = off.createBiquadFilter();
		lp.type = "lowpass";
		lp.frequency.value = 130;
		const split = off.createChannelSplitter(2);
		const merge = off.createChannelMerger(2);
		const tg = off.createGain();
		tg.gain.value = s.applyMix ? k.tunnelGain : .2;
		const hp = off.createBiquadFilter();
		hp.type = "highpass";
		hp.frequency.value = 130;
		src.connect(g);
		g.connect(lp);
		lp.connect(split);
		split.connect(merge, 0, 0);
		split.connect(merge, 0, 1);
		merge.connect(tg);
		tg.connect(mix);
		g.connect(hp);
		hp.connect(mix);
		src.start();
	}
	if (vocal) {
		const src = off.createBufferSource();
		src.buffer = vocal;
		const g = off.createGain();
		g.gain.value = s.vocalGain;
		const tune = new AudioWorkletNode(off, "steel-tune", {
			numberOfInputs: 1,
			numberOfOutputs: 1,
			outputChannelCount: [2]
		});
		tune.port.postMessage({
			type: "params",
			params: {
				amount: s.applyMix ? s.amount : Math.min(s.amount, .35),
				speed: s.speed,
				tonic: s.tonic,
				mode: s.mode,
				drive: s.applyMix ? s.drive : s.drive * .35,
				ceiling: s.ceiling,
				hpf: 80
			}
		});
		const delay = off.createDelay(2);
		delay.delayTime.value = delaySeconds(s.delay, s.bpm);
		const dg = off.createGain();
		dg.gain.value = s.delay === "off" || !s.applyMix ? 0 : s.delayMix;
		const conv = off.createConvolver();
		conv.buffer = irFor(off, s.reverb === "off" ? "plate" : s.reverb);
		const rg = off.createGain();
		rg.gain.value = s.reverb === "off" || !s.applyMix ? 0 : s.reverbMix;
		src.connect(tune);
		tune.connect(g);
		g.connect(mix);
		g.connect(delay);
		delay.connect(dg);
		dg.connect(mix);
		g.connect(conv);
		conv.connect(rg);
		rg.connect(mix);
		const k = kareFromV(s.kare);
		const nest = off.createDelay(2);
		nest.delayTime.value = k.nestSec;
		const ng = off.createGain();
		ng.gain.value = s.applyMix ? k.nestGain : 0;
		g.connect(nest);
		nest.connect(ng);
		ng.connect(mix);
		src.start();
	}
	return bufferToWav(await off.startRendering());
}
function sharpMix() {
	const s = useDesk.getState();
	const p = genrePreset(s.genre);
	const vocalQuiet = s.rms > 0 && s.peak > 0 && s.rms < .08;
	s.set({
		amount: p.amount,
		speed: .55,
		mode: 1,
		drive: p.drive,
		ceiling: .86,
		glue: .62,
		vocalGain: vocalQuiet ? 1.05 : .92,
		beatGain: .72,
		delay: p.delay,
		reverb: p.reverb,
		delayMix: p.delayMix,
		reverbMix: p.reverbMix
	});
	setFx(p.delay, p.reverb);
}
async function applyGenre(g) {
	const p = genrePreset(g);
	useDesk.getState().set({
		genre: g,
		delay: p.delay,
		reverb: p.reverb,
		delayMix: p.delayMix,
		reverbMix: p.reverbMix,
		drive: p.drive,
		amount: p.amount
	});
	await setFx(p.delay, p.reverb);
}
async function snapToGrid() {
	const s = useDesk.getState();
	const next = placeOnGrid(s.regions, s.bpm);
	const tonic = strongestTonic(next, s.tonic);
	useDesk.getState().set({
		regions: next,
		tonic,
		aiNote: "AI takt · 1/4 main · offbeat adlib"
	});
	await rebuildComposed();
}
async function deleteSelected() {
	const s = useDesk.getState();
	if (!s.selectedId) return;
	const next = s.regions.filter((c) => c.id !== s.selectedId);
	useDesk.getState().set({
		regions: next,
		selectedId: next[0]?.id ?? null
	});
	await rebuildComposed();
}
async function cutSelected() {
	const s = useDesk.getState();
	const clip = s.regions.find((c) => c.id === s.selectedId);
	if (!clip) return;
	const parts = splitClipOnGrid(clip, s.bpm);
	const next = s.regions.flatMap((c) => c.id === clip.id ? parts : [c]);
	useDesk.getState().set({
		regions: next,
		selectedId: parts[0]?.id ?? null
	});
	await rebuildComposed();
}
async function makeAdlibs() {
	const s = useDesk.getState();
	const next = placeOnGrid(makeAdlibClips(s.regions, s.bpm), s.bpm);
	useDesk.getState().set({
		regions: next,
		aiNote: "Adlibid · sama take, pitch + tanh"
	});
	await rebuildComposed();
}
async function makeBacks() {
	const s = useDesk.getState();
	const next = placeOnGrid(makeBackClips(s.regions, s.bpm), s.bpm);
	useDesk.getState().set({
		regions: next,
		backs: true,
		aiNote: "Backid · unison + oktav alla, sama take"
	});
	await rebuildComposed();
}
async function keepBest() {
	const next = keepBestTakes(useDesk.getState().regions);
	useDesk.getState().set({
		regions: next,
		selectedId: next.find((c) => !c.muted)?.id ?? null,
		aiNote: "Nõrgad takes vaigistatud"
	});
	await rebuildComposed();
}
async function applyFix() {
	const s = useDesk.getState();
	const kept = keepBestTakes(s.regions.filter((c) => c.score >= .018 || c.kind !== "main"));
	const snapped = placeOnGrid(kept.length ? kept : s.regions, s.bpm);
	const p = genrePreset(s.genre);
	const tonic = strongestTonic(snapped, s.tonic);
	s.set({
		regions: snapped,
		tonic,
		amount: s.applyMix ? p.amount : Math.min(.4, p.amount),
		drive: s.applyMix ? p.drive : .08,
		delay: p.delay,
		reverb: p.reverb,
		delayMix: s.applyMix ? p.delayMix : 0,
		reverbMix: s.applyMix ? p.reverbMix : 0,
		vocalGain: Math.min(1.12, s.vocalGain + .08),
		speed: .48,
		aiNote: s.applyMix ? "Fix · takt + noot + banger mix" : "Fix · takt, mix eraldatud"
	});
	await setFx(p.delay, p.reverb);
	await rebuildComposed();
}
async function teardownDesk() {
	stopMix();
	stopLiveMic();
	if (rec) {
		try {
			rec.stop();
		} catch {}
		rec = null;
	}
	if (handle) {
		for (const o of handle.femaleOsc) try {
			o.stop();
		} catch {}
		try {
			await handle.ctx.close();
		} catch {}
	}
	handle = null;
}
function pitchLabel(hz) {
	if (hz < 70) return "—";
	const midi = 69 + 12 * Math.log2(hz / 440);
	const q = Math.round(midi);
	return `${[
		"C",
		"C#",
		"D",
		"D#",
		"E",
		"F",
		"F#",
		"G",
		"G#",
		"A",
		"A#",
		"B"
	][(q + 1200) % 12]}${Math.floor(q / 12) - 1}`;
}
/** Three places: OS kernel is the motor. Web Mix/Studio is the remote —
*  leaving the remote must not disarm the OS. Mix and Studio share the desk graph. */
function isolateForTab(next) {
	const cur = useSteel.getState().tab;
	if (cur === next) return;
	const remote = next === "desk" || next === "studio";
	const stayingOs = (cur === "kernel" || cur === "console" || cur === "pipeline") && (next === "kernel" || next === "console" || next === "pipeline");
	if (!remote) {
		stopMix();
		stopLiveMic();
	}
	stopSource();
	try {
		if (cur === "console" && !stayingOs && !remote) panic();
	} catch {}
}
function nextLang(lang) {
	if (lang === "et") return "en";
	if (lang === "en") return "ru";
	return "et";
}
var ET = {
	skip: "Liigu sisu juurde",
	console: "Konsool",
	desk: "Mix",
	studio: "Stuudio",
	aura: "Aura",
	pipeline: "Ahel",
	hosts: "Hostid",
	kernel: "Tuum",
	ready: "valmis",
	deskKicker: "Paik 02 · WEB Mix",
	deskTitle: "Biit ja hääl.",
	deskLead: "Kolm paika: OS tuum, see veeb kaugjuhina, host masinas. Kick keskel, hääl vali ja stereo. SSD1315 on näit, mitte kiip. Vene hook: salvesta ise — see ei ole voice-clone. See ei ole telefoni-DAW.",
	slotBeat: "Biit",
	slotVocal: "Hääl",
	loadBeat: "Laadi biit",
	demoBeat: "Demo-biit (90 BPM)",
	loadVocal: "Laadi vokaal",
	demoVocal: "Demo-hääl",
	recVoice: "Salvesta",
	liveMic: "Mikrofon",
	emptySlot: "Tühi",
	playMix: "Mängi",
	stopMix: "Peata",
	autotune: "Autotune",
	amount: "Tugevus",
	speed: "Kiirus",
	key: "Helistik",
	chromatic: "Kromaatiline",
	minor: "Moll",
	major: "Duur",
	master: "Master",
	ceiling: "Lagi",
	drive: "Drive",
	width: "Laius",
	glue: "Liim",
	duck: "Duck",
	analytics: "Mõõdikud",
	peak: "Tipp",
	loud: "Valjus",
	crest: "Crest",
	bpm: "BPM",
	detected: "Tuvastatud",
	clips: "Klipp",
	aiMix: "Soovita",
	aiBusy: "Kuulan…",
	bounce: "Ekspordi",
	saveRow: "Salvesta rida",
	rows: "Read",
	rowSaved: "Rida salvestatud",
	rowFail: "Rida ei õnnestunud kirjutada.",
	noRows: "Ridu pole veel.",
	loadRow: "Laadi",
	clear: "Tühjenda",
	spaceHint: "Tühik: mängi / peata",
	micBlocked: "Mikrofon on selles vaates blokeeritud. Laadi vokaal failina või kasuta „Salvesta hääl“.",
	decodeFail: "Seda faili ei õnnestunud avada. Proovi WAV, MP3 või M4A.",
	needSlots: "Laadi biit või vokaal — või vajuta demo-biit.",
	mixOn: "Mix käib",
	footer: "OS tuum · WEB kaugjuht · HOST masinas · 250 × 3 · ASIO4ALL 2.22",
	tuumNote: "ASIO 5.9 ei ole avalik draiver. Lauatugi on ASIO4ALL 2.22 ja tootja ASIO 2.3. FL Studio alates 20.8 MIDI-mootorist (nimetatud kui 17+) kuni praeguseni. VST3 ei tööta selles lehes — kasuta Hostid-sakki ja loopMIDI / PipeASIO.",
	heuristicApplied: "Rakendatud terav mix (kohalik mootor).",
	recDone: "Hääl salvestatud",
	recStart: "Salvestan… vajuta uuesti, et lõpetada",
	regions: "Lõiked",
	snapGrid: "Taktiline",
	cutClip: "Lõika",
	delClip: "Kustuta",
	adlibs: "Adlibid",
	backs: "Backid",
	femaleBank: "Harmoonia",
	fixIt: "Paranda",
	applyMix: "Mix peal",
	drySnap: "Ainult takt",
	delay: "Delay",
	reverb: "Reverb",
	genre: "Žanr",
	videoTitle: "Video",
	videoLead: "Pildid või klipid. Suund ~80 sõna (üks soov ei tohi katkeda). Sõnad eraldi, kuni 250. Beat-locked montaaž, mitte lip-sync; 1080p30, mitte 60 fps lubadus.",
	videoGo: "Tee video",
	videoBusy: "Lõikan kaadreid…",
	loadMedia: "Laadi pilt / video",
	videoPrompt: "Suund (~80 sõna)",
	noClip: "Laadi või salvesta hääl, et lõiked ilmuksid.",
	fxNote: "ASIO ja FL/Ableton/Logic jäävad masinasse. Kärestik on stereo-translate: kick keskel, hääl vali. Harmoonia on süntees, mitte laulja. SSD1315 on näit.",
	autoTakt: "Auto-takt",
	keepBest: "Parimad takes",
	fade: "Fade",
	delayMix: "Delay mix",
	reverbMix: "Reverb mix",
	kare: "Kärestik",
	kareLead: "Tunnel = kick keskele. Peegel = sama hääl stereo. Nest = vaiksem peegeldus. V = s/t — löök jagatud ajaga.",
	vEquals: "V = s/t",
	lyrics: "Sõnad",
	lyricsPh: "Loo sõnad, kuni ~250. Visualizer loeb neid.",
	palve: "Palve",
	palvePh: "Nt: hook vene keeles, oma hääl, ilma AI-üleminekuta",
	palveNote: "Palve juhib mixi, mitte hääle klooni. Vene rida salvestad sa.",
	more: "Rohkem",
	less: "Vähem",
	oledNote: "SSD1315 on OLED-juht, mitte heli-DSP. Siin: 8 lehe GDDRAM (128×64), FR-sünk ja kontrast 81h. I2C, SPI, Vcc ja charge-pump jäävad dokki — brauser neid ei juhi.",
	adaptNote: "Sama pult, kitsam aken. Tuum jääb OS-i.",
	hostMirror: "FL/Ableton/Sony plaate me ketast ei skänni. Peegel on avalik kanal, mitte sinu install.",
	hostTitle: "FL ja Live, sellel OS-il mida sa tegelikult bootid.",
	studioKicker: "Paik 02 · WEB Stuudio",
	studioTitle: "Kaugjuht OS-tuumale.",
	studioLead: "Kolm paika: OS tuum, see veeb kaugjuhina, host masinas. Impulse käivitab command-blocki: theory → rhyme → geo → EQ → motor. Geo ei tapa mixi. Extra 11 ei tule. Klooni ei ole.",
	impulse: "Impulse",
	chainFire: "Ahel",
	chainHint: "THEORY_EMIT → seed:RHYME_LOCK → GEO_LOOKUP → EQ_WRITE → MOTOR. Skip edastab signaali.",
	chainEmpty: "Ahel ei ole veel tiksunud.",
	extrasTitle: "Theory-mirror · 10",
	rhymeTitle: "Rhyme-lock",
	rhymePh: "Seed verbatim. ET õäöüšž, RU kirillitsa. Tühi seed = ainult tagid.",
	rhymeGo: "Lukusta read",
	rhymeOk: "Seed lukus.",
	rhymeVerbatim: "Verbatim — AI ei vastanud, read jäävad.",
	rhymeEmpty: "Tühi seed — rhyme-lock ei kirjuta stock-riba.",
	eqTitle: "Equalizer · 10",
	eqNote: "ISO peaking. Sämplerate ja bitisügavus jäävad. Trophy-upsample puudub.",
	geoTitle: "ip-api",
	geoGo: "Geo",
	geoNote: "8s abort. geoBusy ainult. Ei lukusta processing. Fallback on mask, mitte teine vendor.",
	xlsxGo: "Ekspordi XLSX",
	busTitle: "Addable-bus 27",
	skillRack: "Skill-creator",
	studioNote: "OS on sihik. Veeb on kaugjuht, piisavalt võimekas et mixi, panga ja paketi siin teha. ASIO ja VST jäävad masinasse.",
	placeWeb: "WEB",
	placeOs: "OS",
	placeHost: "HOST",
	placeLab: "LAB",
	placeKicker: "3 paika",
	osKicker: "Paik 01 · OS tuum",
	atlasTitle: "250 × 3",
	atlasLead: "10 extra × 20 panka + 10 extra × 5 pluginut = 250 OS-sihi lahtrit. Igal lahtril kolm expansionit: OS, veeb, host. Pin laeb lahtri sellesse paika.",
	expandTitle: "10 extra × 3 paika",
	expandLead: "Iga extra elab kolmes paigas. 10 × (20 panka + 5 pluginut) = 250.",
	addonTitle: "Add-ons",
	audit: "Audit",
	auditKicker: "Moodul 04 · Attest",
	auditTitle: "GITHUB_TOKEN ja JWT, siin brauseris.",
	auditLead: "Skaneeri avalik GitHubi repo või kleebi YAML. Auditeerime õigused, pull_request_target, kinnitamata actionid ja App JWT.",
	ghScan: "Skaneeri GitHub",
	ghSpec: "omanik/repo",
	ghBusy: "Loen GitHubi…",
	ghEmpty: "Selles repos .github/workflows puudub.",
	ghMiss: "Repot ei leitud või see on privaatne.",
	ghRate: "GitHubi limiit. Proovi hetke pärast.",
	ghFail: "GitHubi päring ebaõnnestus.",
	ghFiles: "Töövoogude failid",
	jwtKicker: "GitHub App JWT",
	jwtTitle: "Kümme minutit, RS256, Bearer",
	jwtLead: "GitHub App autentib ennast JWT-ga, siis vahetab selle installation-tokeni vastu. JWT ei kuulu GITHUB_TOKEN-isse. Võtmed jäävad sellesse sakki.",
	jwtMint: "Loo demo-võti",
	jwtSign: "Allkirjasta JWT",
	jwtCopy: "Kopeeri JWT",
	jwtIss: "Client ID (iss)",
	jwtPem: "PKCS#8 PEM",
	jwtSignIn: "Allkirjasta siin brauseris",
	jwtCompact: "Compact serialization",
	jwtBearerNote: "Saada kui Authorization: Bearer. GitHub lükkab JWTide puhul tagasi Authorization: token. Vaheta installation-tokeni vastu; ära kasuta JWT-d kui GH_TOKEN.",
	jwtDemoNote: "Demo-võtmed ei ole GitHubis registreeritud. Kasuta neid claimide vaatamiseks. Päris Appi jaoks kleebi GitHubi antud privaatvõti — see ei lähe üles.",
	jwtMinted: "Demo RSA võti loodi selles brauseris",
	jwtSigned: "JWT allkirjastatud RS256-ga",
	jwtNeedKey: "Loo või kleebi esmalt PKCS#8 privaatvõti",
	jwtSignFail: "Allkiri ebaõnnestus — kontrolli PEM-i",
	jwtCopied: "JWT kopeeritud",
	jwtKeyFail: "Võtit ei õnnestunud luua",
	permKicker: "Õiguste kaart",
	permTitle: "Väikseim token, mis ikka töötab",
	permLead: "GITHUB_TOKEN skoobid määratakse YAML-is. Alusta tühjast, tõsta skoopi ainult siis, kui samm seda vajab, ja kinnita kaart nii töövool kui jobil.",
	permName: "Töövoo nimi",
	permTrigger: "Trigger",
	permJob: "Job id",
	permScope: "Skoop",
	permNone: "Puudub",
	permRead: "Lugemine",
	permWrite: "Kirjutamine",
	permUnlock: "Mida avab",
	permYaml: "Genereeritud töövoog",
	permAttest: "Auditeeri see YAML",
	permCopyBtn: "Kopeeri",
	permSent: "Töövoog saadeti audiitorile",
	permCopied: "YAML kopeeritud",
	auraKicker: "Moodul 02 · Aura",
	auraTitle: "Heli, joonistatud.",
	auraPlay: "Mängi",
	auraPause: "Paus",
	auraDemo: "Demo",
	auraOpen: "Ava lugu",
	auraSteelTap: "Steel tap",
	auraRecord: "Salvesta MP4",
	auraStopRec: "Peata",
	auraMute: "Vaigista",
	auraUnmute: "Heli sisse",
	auraFs: "Täisekraan",
	auraSens: "Tundlikkus",
	auraVol: "Helitugevus",
	auraInc: "Buffer inc",
	auraArms: "Armid",
	auraKeys: "Tühik mängi · F täisekraan · M vaigista · 1–4 režiimid · lohista fail",
	consoleKicker: "Reaalajas pult",
	consoleTitle: "ASIO veebi, sessioonist lahkumata.",
	consoleLead: "STEEL jooksutatab AudioWorklet tuuma selles lehes. ASIO4ALL 2.22 hoiab Windowsi seadet; PipeWire/JACK hoiab Linuxit. MIDI FL Studio 21+ või Live 12-st jõuab siia. Brauser ei laadi kernel-draiverit — ta kannab ahelat.",
	armKernel: "Relvasta tuum",
	disarm: "Relvasta maha",
	panic: "Panic",
	armHint: "Relvasta, siis mängi A–K või klahve all",
	runningLive: "Käib · pulti sisend elus",
	runningKeys: "Käib · klahvid ja MIDI",
	armOk: "Tuum relvastatud — interaktiivne latentsus",
	armFail: "Audio relvastamine ebaõnnestus"
};
var EN = {
	skip: "Skip to content",
	console: "Console",
	desk: "Mix",
	studio: "Studio",
	aura: "Aura",
	pipeline: "Pipeline",
	hosts: "Hosts",
	kernel: "Kernel",
	ready: "ready",
	deskKicker: "Place 02 · WEB Mix",
	deskTitle: "Beat and voice.",
	deskLead: "Three places: OS kernel, this web as remote, host on the machine. Kick in the centre, vocal loud and stereo. SSD1315 is a readout, not a chip. Russian hook: record it yourself — this is not a voice clone. This is not a phone DAW.",
	slotBeat: "Beat",
	slotVocal: "Voice",
	loadBeat: "Load beat",
	demoBeat: "Demo beat (90 BPM)",
	loadVocal: "Load vocal",
	demoVocal: "Demo voice",
	recVoice: "Record",
	liveMic: "Mic",
	emptySlot: "Empty",
	playMix: "Play",
	stopMix: "Stop",
	autotune: "Autotune",
	amount: "Amount",
	speed: "Speed",
	key: "Key",
	chromatic: "Chromatic",
	minor: "Minor",
	major: "Major",
	master: "Master",
	ceiling: "Ceiling",
	drive: "Drive",
	width: "Width",
	glue: "Glue",
	duck: "Duck",
	analytics: "Meters",
	peak: "Peak",
	loud: "Loudness",
	crest: "Crest",
	bpm: "BPM",
	detected: "Detected",
	clips: "Clip",
	aiMix: "Suggest",
	aiBusy: "Listening…",
	bounce: "Export",
	saveRow: "Save row",
	rows: "Rows",
	rowSaved: "Row saved",
	rowFail: "Could not write the row.",
	noRows: "No rows yet.",
	loadRow: "Load",
	clear: "Clear",
	spaceHint: "Space: play / stop",
	micBlocked: "Microphone is blocked in this view. Load a vocal file or use Record voice.",
	decodeFail: "Could not open that file. Try WAV, MP3 or M4A.",
	needSlots: "Load a beat or vocal — or tap the demo beat.",
	mixOn: "Mix running",
	footer: "OS kernel · WEB remote · HOST on the machine · 250 × 3 · ASIO4ALL 2.22",
	tuumNote: "ASIO 5.9 is not a public driver. Desktop path is ASIO4ALL 2.22 and vendor ASIO 2.3. FL Studio from the 20.8 MIDI engine (what you named as 17+) through current. VST3 does not run in this page — use the Hosts tab and loopMIDI / PipeASIO.",
	heuristicApplied: "Sharp mix applied (local engine).",
	recDone: "Voice captured",
	recStart: "Recording… tap again to stop",
	regions: "Clips",
	snapGrid: "Grid",
	cutClip: "Cut",
	delClip: "Delete",
	adlibs: "Adlibs",
	backs: "Backs",
	femaleBank: "Harmony",
	fixIt: "Fix",
	applyMix: "Mix on",
	drySnap: "Grid only",
	delay: "Delay",
	reverb: "Reverb",
	genre: "Genre",
	videoTitle: "Video",
	videoLead: "Stills or clips. Direction ~80 words (one wish must not be cut). Lyrics separate, up to 250. Beat-locked montage, not lip-sync; 1080p30, not a 60 fps promise.",
	videoGo: "Make video",
	videoBusy: "Cutting frames…",
	loadMedia: "Load image / video",
	videoPrompt: "Direction (~80 words)",
	noClip: "Load or record a vocal so clips appear.",
	fxNote: "ASIO and FL/Ableton/Logic stay on the machine. Kärestik is a stereo translate: kick centre, vocal loud. Harmony is synthesized, not a singer. SSD1315 is a readout.",
	autoTakt: "Auto-grid",
	keepBest: "Best takes",
	fade: "Fade",
	delayMix: "Delay mix",
	reverbMix: "Reverb mix",
	kare: "Kärestik",
	kareLead: "Tunnel = kick to centre. Mirror = same voice in stereo. Nest = quieter reflection. V = s/t — punch over time.",
	vEquals: "V = s/t",
	lyrics: "Lyrics",
	lyricsPh: "Track lyrics, up to ~250. The visualizer reads these.",
	palve: "Intent",
	palvePh: "e.g. hook in Russian, my voice, no AI-sounding transition",
	palveNote: "Intent drives the mix, not a voice clone. You record the Russian line.",
	more: "More",
	less: "Less",
	oledNote: "SSD1315 is an OLED driver, not an audio DSP. Here: 8-page GDDRAM (128×64), FR sync and contrast 81h. I2C, SPI, Vcc and the charge pump stay in the datasheet — the browser does not drive them.",
	adaptNote: "Same commander, narrower window. The kernel stays on the OS.",
	hostMirror: "We do not scan FL/Ableton/Sony off disk. The mirror is the public channel, not your install.",
	hostTitle: "FL Studio and Live 12, on the OS you actually boot.",
	studioKicker: "Place 02 · WEB Studio",
	studioTitle: "Remote to the OS kernel.",
	studioLead: "Three places: OS kernel, this web as remote, host on the machine. Impulse fires the command-block: theory → rhyme → geo → EQ → motor. Geo does not kill the mix. No extra 11. No clone.",
	impulse: "Impulse",
	chainFire: "Chain",
	chainHint: "THEORY_EMIT → seed:RHYME_LOCK → GEO_LOOKUP → EQ_WRITE → MOTOR. Skip still forwards.",
	chainEmpty: "Chain has not ticked yet.",
	extrasTitle: "Theory-mirror · 10",
	rhymeTitle: "Rhyme-lock",
	rhymePh: "Seed verbatim. ET õäöüšž, RU Cyrillic. Empty seed = tags only.",
	rhymeGo: "Lock lines",
	rhymeOk: "Seed locked.",
	rhymeVerbatim: "Verbatim — AI did not answer, lines stay.",
	rhymeEmpty: "Empty seed — rhyme-lock will not write a stock bar.",
	eqTitle: "Equalizer · 10",
	eqNote: "ISO peaking. Sample rate and bit depth stay. No trophy upsample.",
	geoTitle: "ip-api",
	geoGo: "Geo",
	geoNote: "8s abort. geoBusy only. Does not lock processing. Fallback is the same mask, not a second vendor.",
	xlsxGo: "Export XLSX",
	busTitle: "Addable-bus 27",
	skillRack: "Skill-creator",
	studioNote: "OS is the target. Web is the remote, capable enough to mix, bank, and packet here. ASIO and VST stay on the machine.",
	placeWeb: "WEB",
	placeOs: "OS",
	placeHost: "HOST",
	placeLab: "LAB",
	placeKicker: "3 places",
	osKicker: "Place 01 · OS kernel",
	atlasTitle: "250 × 3",
	atlasLead: "10 extras × 20 banks + 10 extras × 5 plugins = 250 OS-target cells. Each cell has three expansions: OS, web, host. Pin loads the cell into that place.",
	expandTitle: "10 extras × 3 places",
	expandLead: "Each extra lives in three places. 10 × (20 banks + 5 plugins) = 250.",
	addonTitle: "Add-ons",
	audit: "Audit",
	auditKicker: "Module 04 · Attest",
	auditTitle: "GITHUB_TOKEN and JWT, in this browser.",
	auditLead: "Scan a public GitHub repo or paste YAML. We score permissions, pull_request_target, unpinned actions, and App JWTs.",
	ghScan: "Scan GitHub",
	ghSpec: "owner/repo",
	ghBusy: "Reading GitHub…",
	ghEmpty: "No .github/workflows in that repo.",
	ghMiss: "Repo not found or private.",
	ghRate: "GitHub rate limit. Try again in a moment.",
	ghFail: "GitHub request failed.",
	ghFiles: "Workflow files",
	jwtKicker: "GitHub App JWT",
	jwtTitle: "Ten minutes, RS256, Bearer",
	jwtLead: "A GitHub App authenticates as itself with a JWT, then exchanges that JWT for an installation token. The JWT never goes in GITHUB_TOKEN. Keys stay in this tab.",
	jwtMint: "Mint demo key",
	jwtSign: "Sign JWT",
	jwtCopy: "Copy JWT",
	jwtIss: "Client ID (iss)",
	jwtPem: "PKCS#8 PEM",
	jwtSignIn: "Sign in-browser",
	jwtCompact: "Compact serialization",
	jwtBearerNote: "Send as Authorization: Bearer. GitHub rejects Authorization: token for JWTs. Exchange it for an installation token; do not use the JWT as GH_TOKEN.",
	jwtDemoNote: "Demo keys are not registered with GitHub. Use them to inspect the claims. For a real App, paste the private key GitHub issued — it never uploads.",
	jwtMinted: "Demo RSA key minted in this browser",
	jwtSigned: "JWT signed with RS256",
	jwtNeedKey: "Generate or paste a PKCS#8 private key first",
	jwtSignFail: "Sign failed — check the PEM",
	jwtCopied: "JWT copied",
	jwtKeyFail: "Could not generate a key",
	permKicker: "Permission map",
	permTitle: "The smallest token that still ships",
	permLead: "GITHUB_TOKEN scopes are declared in YAML. Start at none, raise a scope only when a step needs it, and pin the map on both the workflow and the job.",
	permName: "Workflow name",
	permTrigger: "Trigger",
	permJob: "Job id",
	permScope: "Scope",
	permNone: "None",
	permRead: "Read",
	permWrite: "Write",
	permUnlock: "What it unlocks",
	permYaml: "Generated workflow",
	permAttest: "Attest this YAML",
	permCopyBtn: "Copy",
	permSent: "Workflow sent to the auditor",
	permCopied: "YAML copied",
	auraKicker: "Module 02 · Aura",
	auraTitle: "Sound, drawn.",
	auraPlay: "Play",
	auraPause: "Pause",
	auraDemo: "Demo",
	auraOpen: "Open track",
	auraSteelTap: "Steel tap",
	auraRecord: "Record MP4",
	auraStopRec: "Stop",
	auraMute: "Mute",
	auraUnmute: "Unmute",
	auraFs: "Fullscreen",
	auraSens: "Sensitivity",
	auraVol: "Volume",
	auraInc: "Buffer inc",
	auraArms: "Arms",
	auraKeys: "Space play · F fullscreen · M mute · 1–4 modes · drop an audio file",
	consoleKicker: "Real-time desk",
	consoleTitle: "ASIO to the web, without leaving the session.",
	consoleLead: "STEEL runs an AudioWorklet kernel in this page. ASIO4ALL 2.22 still owns the Windows device; PipeWire/JACK owns Linux. MIDI from FL Studio 21+ or Live 12 lands here. The browser cannot load a kernel driver — it can carry the pipeline.",
	armKernel: "Arm kernel",
	disarm: "Disarm",
	panic: "Panic",
	armHint: "Arm, then play A–K or the keys below",
	runningLive: "Running · desk input live",
	runningKeys: "Running · keys and MIDI",
	armOk: "Kernel armed — interactive latency",
	armFail: "Could not arm audio"
};
var STR = {
	et: ET,
	en: EN,
	ru: {
		...EN,
		skip: "К содержанию",
		console: "Консоль",
		desk: "Микс",
		studio: "Студия",
		aura: "Aura",
		pipeline: "Цепь",
		hosts: "Хосты",
		kernel: "Ядро",
		ready: "готово",
		deskKicker: "Место 02 · WEB микс",
		deskTitle: "Бит и голос.",
		deskLead: "Три места: ядро ОС, этот веб как пульт, хост на машине. Кик в центре, вокал громко и в стерео. SSD1315 — табло, не чип. Русский хук записываешь ты — это не voice-clone. Это не телефонный DAW.",
		slotBeat: "Бит",
		slotVocal: "Голос",
		loadBeat: "Загрузить бит",
		demoBeat: "Демо-бит (90 BPM)",
		loadVocal: "Загрузить голос",
		demoVocal: "Демо-голос",
		recVoice: "Запись",
		liveMic: "Микрофон",
		emptySlot: "Пусто",
		playMix: "Играть",
		stopMix: "Стоп",
		autotune: "Autotune",
		amount: "Сила",
		speed: "Скорость",
		key: "Тональность",
		chromatic: "Хроматика",
		minor: "Минор",
		major: "Мажор",
		analytics: "Метры",
		peak: "Пик",
		loud: "Громкость",
		detected: "Детект",
		clips: "Клип",
		aiMix: "Совет",
		aiBusy: "Слушаю…",
		bounce: "Экспорт",
		saveRow: "Сохранить",
		rows: "Строки",
		noRows: "Строк нет.",
		loadRow: "Загрузить",
		spaceHint: "Пробел: играть / стоп",
		micBlocked: "Микрофон закрыт. Загрузи голос файлом или нажми Запись.",
		decodeFail: "Файл не открылся. WAV, MP3 или M4A.",
		needSlots: "Загрузи бит или голос — или демо-бит.",
		recDone: "Голос записан",
		recStart: "Пишу… нажми снова, чтобы остановить",
		regions: "Клипы",
		snapGrid: "Сетка",
		cutClip: "Резать",
		delClip: "Удалить",
		adlibs: "Адлибы",
		backs: "Бэки",
		femaleBank: "Гармония",
		fixIt: "Исправить",
		applyMix: "Микс вкл",
		drySnap: "Только сетка",
		delay: "Delay",
		reverb: "Reverb",
		genre: "Жанр",
		videoTitle: "Видео",
		videoLead: "Фото или клипы. Направление ~80 слов. Текст песни отдельно, до 250. Монтаж по биту, не lip-sync; 1080p30.",
		videoGo: "Сделать видео",
		videoBusy: "Режу кадры…",
		loadMedia: "Загрузить фото / видео",
		videoPrompt: "Направление (~80 слов)",
		noClip: "Загрузи или запиши голос, чтобы появились клипы.",
		fxNote: "ASIO и FL/Ableton/Logic остаются на машине. Kärestik — стерео-транслейт: кик в центре, вокал громко. Гармония — синтез, не певица.",
		autoTakt: "Авто-сетка",
		keepBest: "Лучшие тейки",
		kare: "Kärestik",
		kareLead: "Туннель = кик в центр. Зеркало = тот же голос в стерео. Nest = тише отражение. V = s/t.",
		vEquals: "V = s/t",
		lyrics: "Текст",
		lyricsPh: "Текст трека, до ~250. Визуализатор читает это.",
		palve: "Намерение",
		palvePh: "Напр.: хук по-русски, мой голос, без ИИ-перехода",
		palveNote: "Намерение ведёт микс, не клон голоса. Русскую строку записываешь ты.",
		more: "Ещё",
		less: "Меньше",
		oledNote: "SSD1315 — драйвер OLED, не аудио-DSP. Здесь: GDDRAM 8 страниц (128×64), синхро FR и контраст 81h. I2C/SPI/Vcc браузер не водит.",
		adaptNote: "Тот же пульт, уже окно. Ядро остаётся в ОС.",
		hostMirror: "Мы не сканируем FL/Ableton/Sony с диска. Зеркало — публичный канал.",
		hostTitle: "FL и Live, на той ОС, которую ты реально загружаешь.",
		studioKicker: "Место 02 · WEB студия",
		studioTitle: "Пульт к ядру ОС.",
		studioLead: "Три места: ядро ОС, этот веб как пульт, хост на машине. Impulse: theory → rhyme → geo → EQ → motor. Гео не глушит микс.",
		impulse: "Impulse",
		rhymeTitle: "Rhyme-lock",
		eqTitle: "Equalizer · 10",
		geoTitle: "ip-api",
		xlsxGo: "Экспорт XLSX",
		busTitle: "Addable-bus 27",
		skillRack: "Skill-creator",
		studioNote: "ОС — цель. Веб — пульт, достаточно сильный чтобы микшировать здесь. ASIO и VST остаются на машине.",
		placeWeb: "WEB",
		placeOs: "OS",
		placeHost: "HOST",
		placeLab: "LAB",
		placeKicker: "3 места",
		osKicker: "Место 01 · Ядро ОС",
		atlasTitle: "250 × 3",
		atlasLead: "10 extras × 20 банков + 10 extras × 5 плагинов = 250 ячеек. У каждой три экспансии: OS, веб, хост. Pin грузит ячейку в это место.",
		expandTitle: "10 extras × 3 места",
		expandLead: "Каждый extra живёт в трёх местах. 10 × (20 банков + 5 плагинов) = 250.",
		addonTitle: "Аддоны",
		audit: "Аудит"
	}
};
function t(lang, key) {
	return STR[lang][key];
}
var PLACES = [
	{
		id: "os",
		et: "OS tuum",
		en: "OS kernel",
		ru: "Ядро ОС",
		note: "ASIO / worklet. Motor lives here."
	},
	{
		id: "web",
		et: "Veeb kaugjuht",
		en: "Web remote",
		ru: "Веб-пульт",
		note: "This page. Packets and mix. Capable remote — the motor is OS."
	},
	{
		id: "host",
		et: "Host",
		en: "Host",
		ru: "Хост",
		note: "FL / Live / Logic on the machine. No disk scan."
	}
];
var PLACE_HOME = {
	os: "kernel",
	web: "desk",
	host: "hosts"
};
function placeForTab(tab) {
	if (tab === "kernel" || tab === "console" || tab === "pipeline") return "os";
	if (tab === "desk" || tab === "studio") return "web";
	if (tab === "hosts") return "host";
	return "lab";
}
/** 10 extras × 3 places — the 3-expansion map. Web never pretends to be the OS. */
var EXPANSIONS = [
	{
		extra: "MI44OR-5GEM",
		os: "5-gen analog body",
		web: "kare + spine tags",
		host: "bank sat/width"
	},
	{
		extra: "WHISP3RER",
		os: "bit-aware dither",
		web: "fade / slack",
		host: "container depth"
	},
	{
		extra: "DIRT-COL",
		os: "sat topology",
		web: "drive write",
		host: "dirt curve"
	},
	{
		extra: "CLEAR-COL",
		os: "subtractive cut",
		web: "HPF / scoop",
		host: "mud-void plugin"
	},
	{
		extra: "THEORY-SPINE",
		os: "recipe in kernel",
		web: "theory-mirror",
		host: "genre map"
	},
	{
		extra: "ENERGY-MATCH",
		os: "crest target",
		web: "glue / LUFS",
		host: "loudness lane"
	},
	{
		extra: "TAKT-LOCK",
		os: "grid in motor",
		web: "auto-takt",
		host: "FL piano-roll grid"
	},
	{
		extra: "GYRATOR-AIR",
		os: "SVF high shelf",
		web: "8–16k EQ",
		host: "air-well"
	},
	{
		extra: "PRESHAPE-SAT",
		os: "pre-sat cut",
		web: "2–4k EQ",
		host: "presence-iron"
	},
	{
		extra: "STEREO-MX",
		os: "M/S matrix",
		web: "Kärestik width",
		host: "host stereo"
	}
];
var PIN_KEY = "steel-atlas-pins-v1";
var EMPTY_PINS = {
	os: [],
	web: [],
	host: []
};
function readPins() {
	if (typeof localStorage === "undefined") return {
		...EMPTY_PINS,
		os: [],
		web: [],
		host: []
	};
	try {
		const raw = localStorage.getItem(PIN_KEY);
		if (!raw) return {
			os: [],
			web: [],
			host: []
		};
		const saved = JSON.parse(raw);
		return {
			os: Array.isArray(saved.os) ? saved.os.filter((n) => typeof n === "number") : [],
			web: Array.isArray(saved.web) ? saved.web.filter((n) => typeof n === "number") : [],
			host: Array.isArray(saved.host) ? saved.host.filter((n) => typeof n === "number") : []
		};
	} catch {
		return {
			os: [],
			web: [],
			host: []
		};
	}
}
function writePins(pins) {
	if (typeof localStorage === "undefined") return;
	try {
		localStorage.setItem(PIN_KEY, JSON.stringify(pins));
	} catch {}
}
var useRack = create((set) => ({
	place: "os",
	paste: "",
	seed: "",
	rhymeOut: "",
	geoLine: null,
	geoBusy: false,
	geoQuery: "",
	chainLog: [],
	spine: null,
	extras: [],
	note: null,
	busy: false,
	pins: readPins(),
	set: (p) => set(p),
	togglePin: (place, i) => set((s) => {
		const cur = s.pins[place];
		const nextList = cur.includes(i) ? cur.filter((n) => n !== i) : [...cur, i].sort((a, b) => a - b);
		const pins = {
			...s.pins,
			[place]: nextList
		};
		writePins(pins);
		return { pins };
	})
}));
function copy(lang, id) {
	const p = PLACES.find((x) => x.id === id) ?? PLACES[0];
	if (lang === "et") return p.et;
	if (lang === "ru") return p.ru;
	return p.en;
}
function PlaceBar({ compact = false, navigate = false }) {
	const lang = useSteel((s) => s.lang);
	const tab = useSteel((s) => s.tab);
	const setTab = useSteel((s) => s.setTab);
	const rackPlace = useRack((s) => s.place);
	const setRack = useRack((s) => s.set);
	const current = navigate ? placeForTab(tab) : rackPlace;
	function pick(id) {
		setRack({ place: id });
		if (!navigate) return;
		if (placeForTab(useSteel.getState().tab) === id) return;
		const home = PLACE_HOME[id];
		try {
			isolateForTab(home);
		} catch {}
		setTab(home);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		role: "group",
		"aria-label": t(lang, "placeKicker"),
		className: "flex min-w-0 max-w-full flex-wrap gap-1",
		children: PLACES.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			"data-place": p.id,
			onClick: () => pick(p.id),
			"aria-pressed": current === p.id,
			"aria-label": p.id.toUpperCase(),
			className: cn("min-h-11 rounded-[var(--radius-sm)] border px-2.5 font-mono text-2xs tracking-wider uppercase transition-colors duration-[var(--motion-quick)]", compact ? "min-w-11" : "px-3 py-2 text-left", current === p.id ? "border-ink bg-ink text-paper" : "border-rule text-muted hover:text-ink"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block",
				children: p.id
			}), compact ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mt-1 block font-sans text-2xs normal-case tracking-normal opacity-80",
				children: copy(lang, p.id)
			})]
		}, p.id))
	});
}
var access = null;
var boundIn = null;
var heldKeys = /* @__PURE__ */ new Set();
/** Ableton-style computer keyboard, C4–C5. */
var COMPUTER_KEYS = {
	a: 60,
	w: 61,
	s: 62,
	e: 63,
	d: 64,
	f: 65,
	t: 66,
	g: 67,
	y: 68,
	h: 69,
	u: 70,
	j: 71,
	k: 72
};
var KEY_LABEL = Object.fromEntries(Object.entries(COMPUTER_KEYS).map(([k, n]) => [n, k.toUpperCase()]));
var NAMES = [
	"C",
	"C#",
	"D",
	"D#",
	"E",
	"F",
	"F#",
	"G",
	"G#",
	"A",
	"A#",
	"B"
];
function noteLabel(note) {
	return `${NAMES[note % 12]}${Math.floor(note / 12) - 1}`;
}
function listPorts(a) {
	const ports = [];
	a.inputs.forEach((p) => {
		ports.push({
			id: p.id,
			name: p.name || "MIDI in",
			manufacturer: p.manufacturer || "",
			type: "in"
		});
	});
	a.outputs.forEach((p) => {
		ports.push({
			id: p.id,
			name: p.name || "MIDI out",
			manufacturer: p.manufacturer || "",
			type: "out"
		});
	});
	return ports;
}
function onMidi(ev) {
	const data = ev.data;
	if (!data || data.length < 1) return;
	const status = data[0] & 240;
	const note = data[1] ?? 0;
	const vel = (data[2] ?? 0) / 127;
	if (status === 144 && vel > 0) {
		sendNote(true, note, vel);
		useSteel.getState().patch({ lastNote: `${noteLabel(note)} · ${Math.round(vel * 127)}` });
	} else if (status === 128 || status === 144 && vel === 0) sendNote(false, note);
	else if (status === 176) {
		const cc = data[1];
		const v = (data[2] ?? 0) / 127;
		const patch = useSteel.getState().patch;
		useSteel.getState().patch({ lastCc: `CC ${cc} · ${Math.round(v * 127)}` });
		if (cc === 7) patch({ master: v });
		else if (cc === 1) patch({ satAmt: v });
		else if (cc === 10) patch({ inGain: .2 + v * 1.8 });
		else if (cc === 74 || cc === 19) patch({ eqHi: .4 + v * 1.4 });
		else if (cc === 71 || cc === 18) patch({ eqMid: .4 + v * 1.4 });
		else if (cc === 17) patch({ eqLo: .4 + v * 1.4 });
		else if (cc === 16) patch({ thresh: .1 + v * .7 });
		else if (cc === 76) patch({ hpHz: 30 + v * 370 });
	}
}
function isTypingTarget(el) {
	if (!(el instanceof HTMLElement)) return false;
	const tag = el.tagName;
	return tag === "INPUT" || tag === "SELECT" || tag === "TEXTAREA" || el.isContentEditable;
}
function onKeyDown(e) {
	if (e.repeat || e.metaKey || e.ctrlKey || e.altKey) return;
	const tab = useSteel.getState().tab;
	if (tab === "aura" || tab === "desk" || tab === "audit") return;
	if (isTypingTarget(e.target)) return;
	const key = e.key.toLowerCase();
	const note = COMPUTER_KEYS[key];
	if (note == null) return;
	e.preventDefault();
	if (heldKeys.has(key)) return;
	heldKeys.add(key);
	useSteel.getState().patch({ lastNote: noteLabel(note) });
	playNote(true, note, .85);
}
function onKeyUp(e) {
	const key = e.key.toLowerCase();
	const note = COMPUTER_KEYS[key];
	if (note == null) return;
	heldKeys.delete(key);
	sendNote(false, note);
}
function bindComputerKeys() {
	window.addEventListener("keydown", onKeyDown);
	window.addEventListener("keyup", onKeyUp);
}
function unbindComputerKeys() {
	window.removeEventListener("keydown", onKeyDown);
	window.removeEventListener("keyup", onKeyUp);
	heldKeys.clear();
}
async function enableMidi() {
	if (!navigator.requestMIDIAccess) return;
	access = await navigator.requestMIDIAccess({ sysex: false });
	useSteel.getState().patch({ midiPorts: listPorts(access) });
	access.onstatechange = () => {
		if (access) useSteel.getState().patch({ midiPorts: listPorts(access) });
	};
	const firstIn = [...access.inputs.values()][0];
	if (firstIn) selectMidiIn(firstIn.id);
}
function selectMidiIn(id) {
	if (boundIn) {
		boundIn.onmidimessage = null;
		boundIn = null;
	}
	useSteel.getState().patch({ midiIn: id });
	if (!id || !access) return;
	const port = access.inputs.get(id);
	if (!port) return;
	boundIn = port;
	port.onmidimessage = onMidi;
}
function versionGte(a, b) {
	const pa = a.split(".").map((n) => Number(n) || 0);
	const pb = b.split(".").map((n) => Number(n) || 0);
	for (let i = 0; i < 3; i++) {
		if ((pa[i] ?? 0) > (pb[i] ?? 0)) return true;
		if ((pa[i] ?? 0) < (pb[i] ?? 0)) return false;
	}
	return true;
}
async function fetchManifest() {
	const res = await fetch(`/kernel/manifest.json?t=${Date.now()}`, { cache: "no-store" });
	if (!res.ok) throw new Error("Kernel channel unreachable");
	return await res.json();
}
async function checkChannel() {
	const man = await fetchManifest();
	useSteel.getState().patch({ latest: man.latest });
	return man;
}
async function applyKernel(version) {
	const s = useSteel.getState();
	s.patch({
		updating: true,
		error: null
	});
	try {
		const man = await fetchManifest();
		const nextAddons = { ...s.addons };
		for (const addon of man.addons) if (!versionGte(version, addon.minKernel)) nextAddons[addon.id] = false;
		else if (addon.id === "transient") nextAddons[addon.id] = true;
		s.patch({
			kernel: version,
			addons: nextAddons,
			latest: man.latest,
			updating: false
		});
		if (s.armed) await armKernel();
	} catch (err) {
		s.patch({
			updating: false,
			error: err instanceof Error ? err.message : "Update failed"
		});
	}
}
var GROUPS = [
	{
		place: "os",
		label: "placeOs",
		items: [
			{
				id: "kernel",
				key: "kernel"
			},
			{
				id: "console",
				key: "console"
			},
			{
				id: "pipeline",
				key: "pipeline"
			}
		]
	},
	{
		place: "web",
		label: "placeWeb",
		items: [{
			id: "desk",
			key: "desk"
		}, {
			id: "studio",
			key: "studio"
		}]
	},
	{
		place: "host",
		label: "placeHost",
		items: [{
			id: "hosts",
			key: "hosts"
		}]
	},
	{
		place: "lab",
		label: "placeLab",
		items: [{
			id: "aura",
			key: "aura"
		}, {
			id: "audit",
			key: "audit"
		}]
	}
];
function AppShell({ children }) {
	const tab = useSteel((s) => s.tab);
	const setTab = useSteel((s) => s.setTab);
	const lang = useSteel((s) => s.lang);
	const patch = useSteel((s) => s.patch);
	const armed = useSteel((s) => s.armed);
	const kernel = useSteel((s) => s.kernel);
	const latest = useSteel((s) => s.latest);
	const behind = latest != null && !versionGte(kernel, latest);
	const here = placeForTab(tab);
	const modules = GROUPS.find((g) => g.place === here)?.items ?? GROUPS[0].items;
	const lab = GROUPS.find((g) => g.place === "lab");
	(0, import_react.useEffect)(() => {
		hydrateSteel();
		const stopPersist = watchSteelPersist();
		checkChannel().catch(() => void 0);
		bindComputerKeys();
		return () => {
			stopPersist();
			unbindComputerKeys();
			disarmKernel();
			teardownDesk();
			teardownAura();
		};
	}, []);
	(0, import_react.useEffect)(() => {
		document.documentElement.lang = lang;
	}, [lang]);
	(0, import_react.useEffect)(() => {
		if (here !== "lab") useRack.getState().set({ place: here });
	}, [here]);
	function go(next) {
		try {
			isolateForTab(next);
		} catch {}
		setTab(next);
		const p = placeForTab(next);
		if (p !== "lab") useRack.getState().set({ place: p });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-paper text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "#main",
				className: "sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-3 focus:py-2 focus:text-paper",
				children: t(lang, "skip")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-20 border-b border-rule bg-paper/95 backdrop-blur-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "shell-header shell-pad mx-auto max-w-6xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-3 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex min-w-0 items-center gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: cn("size-2 shrink-0 rounded-full", armed ? "bg-live" : "bg-rule"),
										"aria-hidden": true
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-display text-xl tracking-[0.14em]",
										children: "STEEL"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "hidden font-mono text-2xs tracking-wider text-muted uppercase sm:block",
										children: [
											"OS ",
											kernel,
											" · WEB remote · HOST · 250×3"
										]
									}),
									behind ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										"data-tab": "kernel",
										onClick: () => go("kernel"),
										className: "hidden rounded-[var(--radius-sm)] border border-live/40 px-2 py-1 font-mono text-2xs tracking-wider text-live uppercase sm:inline",
										children: [
											latest,
											" ",
											t(lang, "ready")
										]
									}) : null
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => patch({ lang: nextLang(lang) }),
								className: "min-h-11 min-w-11 shrink-0 rounded-[var(--radius-sm)] border border-rule px-2 font-mono text-2xs tracking-wider text-muted uppercase",
								"aria-label": "Language",
								children: lang.toUpperCase()
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "pb-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceBar, { navigate: true })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
							"aria-label": "Primary",
							className: "nav-scroll flex max-w-full flex-nowrap items-end gap-5 overflow-x-auto pb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex shrink-0 flex-col gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "px-1 font-mono text-2xs tracking-wider text-faint uppercase",
									children: t(lang, GROUPS.find((g) => g.place === here)?.label ?? "placeOs")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex flex-nowrap gap-1",
									children: modules.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										"data-tab": item.id,
										onClick: () => go(item.id),
										"aria-current": tab === item.id ? "page" : void 0,
										className: cn("min-h-11 shrink-0 rounded-[var(--radius-sm)] px-3 py-2 text-sm transition-colors duration-[var(--motion-quick)]", tab === item.id ? "bg-ink text-paper" : "text-muted hover:bg-ink/[0.06] hover:text-ink"),
										children: t(lang, item.key)
									}, item.id))
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex shrink-0 flex-col gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "px-1 font-mono text-2xs tracking-wider text-faint uppercase",
									children: t(lang, "placeLab")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex flex-nowrap gap-1",
									children: lab.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										"data-tab": item.id,
										onClick: () => go(item.id),
										"aria-current": tab === item.id ? "page" : void 0,
										className: cn("min-h-11 shrink-0 rounded-[var(--radius-sm)] px-3 py-2 text-sm transition-colors duration-[var(--motion-quick)]", tab === item.id ? "bg-ink text-paper" : "text-muted hover:bg-ink/[0.06] hover:text-ink"),
										children: t(lang, item.key)
									}, item.id))
								})]
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				id: "main",
				className: tab === "aura" ? "shell-pad mx-auto max-w-6xl py-4" : "shell-pad mx-auto min-w-0 max-w-6xl py-6 sm:py-8",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "shell-footer shell-pad mx-auto max-w-6xl border-t border-rule py-5 font-mono text-2xs tracking-wide text-muted uppercase",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block max-w-full text-pretty",
					children: t(lang, "footer")
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
				position: "bottom-center",
				toastOptions: { className: "!bg-raised !text-ink !border-rule !font-[inherit] !rounded-[6px]" }
			})
		]
	});
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium select-none transition-[opacity,transform,background-color,color,border-color] duration-[var(--motion-quick)] ease-[var(--ease-out)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-steel/50 focus-visible:ring-offset-2 focus-visible:ring-offset-paper disabled:pointer-events-none disabled:opacity-40 active:not-disabled:scale-[0.96]", {
	variants: {
		variant: {
			primary: "bg-ink text-paper hover:bg-ink/90",
			secondary: "border border-rule bg-transparent text-ink hover:bg-ink/[0.06]",
			ghost: "text-ink/80 hover:bg-ink/[0.06] hover:text-ink",
			stamp: "bg-clip text-paper hover:bg-clip/90",
			live: "bg-live text-paper hover:bg-live/90",
			paper: "bg-raised text-ink border border-rule hover:bg-rule/40"
		},
		size: {
			sm: "h-9 px-3 text-sm rounded-[var(--radius-sm)]",
			md: "h-11 px-4 text-sm rounded-[var(--radius-md)]",
			lg: "h-12 px-5 text-base rounded-[var(--radius-md)]",
			icon: "size-11 rounded-[var(--radius-md)]"
		}
	},
	defaultVariants: {
		variant: "primary",
		size: "md"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		ref,
		...props
	});
});
Button.displayName = "Button";
var PALETTES = [
	{
		id: "ice",
		label: "Ice",
		bg: [
			17,
			18,
			16
		],
		lo: [
			90,
			110,
			120
		],
		mid: [
			154,
			167,
			176
		],
		hi: [
			232,
			228,
			216
		]
	},
	{
		id: "ember",
		label: "Ember",
		bg: [
			17,
			18,
			16
		],
		lo: [
			120,
			50,
			42
		],
		mid: [
			196,
			92,
			74
		],
		hi: [
			232,
			200,
			180
		]
	},
	{
		id: "tide",
		label: "Tide",
		bg: [
			17,
			18,
			16
		],
		lo: [
			40,
			90,
			70
		],
		mid: [
			106,
			165,
			111
		],
		hi: [
			210,
			230,
			214
		]
	},
	{
		id: "rose",
		label: "Rose",
		bg: [
			17,
			18,
			16
		],
		lo: [
			110,
			55,
			70
		],
		mid: [
			180,
			110,
			124
		],
		hi: [
			232,
			210,
			214
		]
	},
	{
		id: "mono",
		label: "Mono",
		bg: [
			17,
			18,
			16
		],
		lo: [
			70,
			70,
			66
		],
		mid: [
			160,
			158,
			148
		],
		hi: [
			232,
			228,
			216
		]
	}
];
function paletteById(id) {
	return PALETTES.find((p) => p.id === id) ?? PALETTES[0];
}
function rgb(c, a = 1) {
	return a >= 1 ? `rgb(${c[0]},${c[1]},${c[2]})` : `rgba(${c[0]},${c[1]},${c[2]},${a})`;
}
function mix(a, b, t) {
	const u = Math.min(1, Math.max(0, t));
	return [
		Math.round(a[0] + (b[0] - a[0]) * u),
		Math.round(a[1] + (b[1] - a[1]) * u),
		Math.round(a[2] + (b[2] - a[2]) * u)
	];
}
var particles = [];
var rot = 0;
function ensureParticles() {
	if (particles.length) return;
	for (let i = 0; i < 96; i++) particles.push({
		a: Math.random() * Math.PI * 2,
		r: .15 + Math.random() * .7,
		s: .002 + Math.random() * .01,
		e: Math.random()
	});
}
function energy(freq, from, to) {
	let s = 0;
	const a = Math.max(0, from);
	const b = Math.min(freq.length, to);
	for (let i = a; i < b; i++) s += freq[i];
	return b > a ? s / ((b - a) * 255) : 0;
}
function drawFrame(ctx, w, h, freq, time, mode, pal, sensitivity) {
	const bass = energy(freq, 0, 8) * sensitivity;
	const mid = energy(freq, 8, 32) * sensitivity;
	const high = energy(freq, 32, Math.min(freq.length, 96)) * sensitivity;
	ctx.fillStyle = rgb(pal.bg, mode === "wave" || mode === "bloom" ? .18 : 1);
	ctx.fillRect(0, 0, w, h);
	if (mode === "bars") drawBars(ctx, w, h, freq, pal, sensitivity);
	else if (mode === "ring") drawRing(ctx, w, h, freq, pal, sensitivity, bass);
	else if (mode === "wave") drawWave(ctx, w, h, time, pal, bass);
	else drawBloom(ctx, w, h, pal, bass, mid, high);
	rot += .004 + bass * .02;
}
function drawBars(ctx, w, h, freq, pal, sensitivity) {
	const n = Math.min(64, freq.length);
	const gap = 2;
	const barW = w / (n * 2) - gap;
	const cx = w / 2;
	const base = h * .78;
	for (let i = 0; i < n; i++) {
		const v = Math.min(1, freq[i] / 255 * sensitivity);
		const bh = v * h * .62;
		ctx.fillStyle = rgb(mix(pal.lo, v > .6 ? pal.hi : pal.mid, v));
		const xR = cx + i * (barW + gap);
		const xL = cx - (i + 1) * (barW + gap);
		ctx.fillRect(xR, base - bh, barW, bh);
		ctx.fillRect(xL, base - bh, barW, bh);
	}
}
function drawRing(ctx, w, h, freq, pal, sensitivity, bass) {
	const cx = w / 2;
	const cy = h / 2;
	const radius = Math.min(w, h) * (.22 + bass * .05);
	const n = Math.min(96, freq.length);
	ctx.save();
	ctx.translate(cx, cy);
	ctx.rotate(rot);
	ctx.strokeStyle = rgb(pal.lo, .45);
	ctx.lineWidth = 1;
	ctx.beginPath();
	ctx.arc(0, 0, radius * .55, 0, Math.PI * 2);
	ctx.stroke();
	for (let i = 0; i < n; i++) {
		const v = Math.min(1, freq[i] / 255 * sensitivity);
		const a = i / n * Math.PI * 2;
		const inner = radius;
		const outer = radius + v * Math.min(w, h) * .28;
		ctx.strokeStyle = rgb(mix(pal.mid, pal.hi, v));
		ctx.lineWidth = Math.max(2, Math.PI * 2 * radius / n - 1);
		ctx.beginPath();
		ctx.moveTo(Math.cos(a) * inner, Math.sin(a) * inner);
		ctx.lineTo(Math.cos(a) * outer, Math.sin(a) * outer);
		ctx.stroke();
	}
	ctx.restore();
}
function drawWave(ctx, w, h, time, pal, bass) {
	const midY = h * .5;
	ctx.lineWidth = 2 + bass * 4;
	ctx.strokeStyle = rgb(pal.hi);
	ctx.beginPath();
	const step = Math.max(1, Math.floor(time.length / w));
	for (let x = 0; x < w; x++) {
		const y = midY + (time[Math.min(time.length - 1, x * step)] - 128) / 128 * h * .28;
		if (x === 0) ctx.moveTo(x, y);
		else ctx.lineTo(x, y);
	}
	ctx.stroke();
	ctx.lineWidth = 1;
	ctx.strokeStyle = rgb(pal.mid, .4);
	ctx.beginPath();
	for (let x = 0; x < w; x++) {
		const y = midY + (time[Math.min(time.length - 1, x * step)] - 128) / 128 * h * .18;
		if (x === 0) ctx.moveTo(x, y);
		else ctx.lineTo(x, y);
	}
	ctx.stroke();
}
function drawBloom(ctx, w, h, pal, bass, mid, high) {
	ensureParticles();
	const cx = w / 2;
	const cy = h / 2;
	const span = Math.min(w, h) * .48;
	const orb = span * (.12 + bass * .18);
	const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, orb * 2);
	g.addColorStop(0, rgb(pal.hi, .9));
	g.addColorStop(.4, rgb(pal.mid, .35));
	g.addColorStop(1, rgb(pal.bg, 0));
	ctx.fillStyle = g;
	ctx.beginPath();
	ctx.arc(cx, cy, orb * 2, 0, Math.PI * 2);
	ctx.fill();
	for (const p of particles) {
		p.a += p.s + bass * .02;
		const pulse = .65 + bass * .8 + mid * .3;
		const x = cx + Math.cos(p.a) * p.r * span * pulse;
		const y = cy + Math.sin(p.a * 1.13) * p.r * span * pulse * .72;
		const size = 1.2 + high * 4 + p.e * 2;
		ctx.fillStyle = rgb(mix(pal.lo, pal.hi, p.e * .8 + high), .55 + high * .4);
		ctx.beginPath();
		ctx.arc(x, y, size, 0, Math.PI * 2);
		ctx.fill();
	}
}
async function exportCapsXlsx(caps) {
	const wb = new (await (import("../_libs/exceljs+[...].mjs").then((n) => /* @__PURE__ */ __toESM(n.t())))).default.Workbook();
	wb.creator = "STEEL / AURA";
	const sheet = wb.addWorksheet("Caps");
	sheet.columns = [{
		header: "Field",
		width: 28
	}, {
		header: "Value",
		width: 72
	}];
	[
		["GPU", caps.gpu],
		["WebGL", caps.webgl ? "yes" : "no"],
		["Max texture", caps.maxTexture],
		["Cores", caps.cores],
		["DPR", caps.dpr],
		["Screen", caps.screen],
		["Refresh", `${caps.refresh} Hz`],
		["Audio rate", `${caps.audioRate} Hz`],
		["Audio RTL", `${caps.audioLatencyMs.toFixed(2)} ms`],
		["Max channels", caps.maxChannels],
		["Capture MIME", caps.mime],
		["Record ceiling", `${caps.recordCeiling.w}×${caps.recordCeiling.h} @ ${caps.recordCeiling.fps}`],
		["Quality arm", caps.recordCeiling.arm],
		["IMAX", caps.imax],
		["Audio target", "320 kbps · 44.1 kHz"],
		["Latency target", "0.5 ms (overclock) — Web Audio quantum is larger"]
	].forEach((r) => sheet.addRow(r));
	const buf = await wb.xlsx.writeBuffer();
	const blob = new Blob([buf], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
	const a = document.createElement("a");
	a.href = URL.createObjectURL(blob);
	a.download = "aura-caps.xlsx";
	a.click();
	URL.revokeObjectURL(a.href);
}
var MODES = [
	{
		id: "bars",
		label: "Bars",
		icon: ChartColumn,
		key: "1"
	},
	{
		id: "ring",
		label: "Ring",
		icon: Aperture,
		key: "2"
	},
	{
		id: "wave",
		label: "Wave",
		icon: Waves,
		key: "3"
	},
	{
		id: "bloom",
		label: "Bloom",
		icon: Activity,
		key: "4"
	}
];
function AuraStage() {
	const canvasRef = (0, import_react.useRef)(null);
	const wrapRef = (0, import_react.useRef)(null);
	const fileRef = (0, import_react.useRef)(null);
	const idleRef = (0, import_react.useRef)(0);
	const [idle, setIdle] = (0, import_react.useState)(false);
	const [caps, setCaps] = (0, import_react.useState)(null);
	const [fs, setFs] = (0, import_react.useState)(false);
	const aura = useAura();
	const steelArmed = useSteel((s) => s.armed);
	const lang = useSteel((s) => s.lang);
	(0, import_react.useEffect)(() => {
		setCaps(probeCaps());
		const onMove = () => {
			setIdle(false);
			window.clearTimeout(idleRef.current);
			idleRef.current = window.setTimeout(() => setIdle(true), 2600);
		};
		onMove();
		window.addEventListener("pointermove", onMove);
		window.addEventListener("pointerdown", onMove);
		return () => {
			window.removeEventListener("pointermove", onMove);
			window.removeEventListener("pointerdown", onMove);
			window.clearTimeout(idleRef.current);
			stopSource();
		};
	}, []);
	(0, import_react.useEffect)(() => {
		const canvas = canvasRef.current;
		const wrap = wrapRef.current;
		if (!canvas || !wrap) return;
		let raf = 0;
		let frames = 0;
		let last = performance.now();
		let freq = /* @__PURE__ */ new Uint8Array(1024);
		let time = /* @__PURE__ */ new Uint8Array(2048);
		const pal = () => paletteById(useAura.getState().palette);
		const resize = () => {
			const rec = useAura.getState().recording;
			const arm = useAura.getState().arm;
			const maxT = caps?.maxTexture ?? 4096;
			const dpr = Math.min(2, window.devicePixelRatio || 1);
			if (rec) {
				const p = profileForArm(arm, maxT);
				canvas.width = p.w;
				canvas.height = p.h;
				return;
			}
			const r = wrap.getBoundingClientRect();
			canvas.width = Math.max(1, Math.floor(r.width * dpr));
			canvas.height = Math.max(1, Math.floor(r.height * dpr));
		};
		resize();
		const ro = new ResizeObserver(resize);
		ro.observe(wrap);
		const loop = () => {
			const ctx = canvas.getContext("2d");
			const a = getAnalyser();
			if (ctx) {
				if (a) {
					if (a.frequencyBinCount !== freq.length) freq = new Uint8Array(a.frequencyBinCount);
					if (a.fftSize !== time.length) time = new Uint8Array(a.fftSize);
					readAnalyser(freq, time);
					const s = useAura.getState();
					drawFrame(ctx, canvas.width, canvas.height, freq, time, s.mode, pal(), s.sensitivity);
				} else {
					ctx.fillStyle = "#111210";
					ctx.fillRect(0, 0, canvas.width, canvas.height);
				}
			}
			frames++;
			const now = performance.now();
			if (now - last > 500) {
				useAura.getState().set({ fps: Math.round(frames * 1e3 / (now - last)) });
				frames = 0;
				last = now;
			}
			raf = requestAnimationFrame(loop);
		};
		raf = requestAnimationFrame(loop);
		return () => {
			cancelAnimationFrame(raf);
			ro.disconnect();
		};
	}, [caps?.maxTexture]);
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			if (e.metaKey || e.ctrlKey || e.altKey) return;
			const tag = e.target?.tagName;
			if (tag === "INPUT" || tag === "SELECT" || tag === "TEXTAREA") return;
			if (e.code === "Space") {
				e.preventDefault();
				togglePlay();
			} else if (e.key.toLowerCase() === "f") {
				e.preventDefault();
				toggleFs();
			} else if (e.key.toLowerCase() === "m") {
				e.preventDefault();
				const next = !useAura.getState().muted;
				useAura.getState().set({ muted: next });
				setVolume(useAura.getState().volume, next);
			} else if (e.key >= "1" && e.key <= "4") {
				const mode = MODES[Number(e.key) - 1]?.id;
				if (mode) useAura.getState().set({ mode });
			}
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []);
	async function toggleFs() {
		const el = wrapRef.current;
		if (!el) return;
		if (document.fullscreenElement) {
			await document.exitFullscreen();
			setFs(false);
		} else {
			await el.requestFullscreen();
			setFs(true);
		}
	}
	async function onDemo() {
		try {
			await startSource("demo");
			toast.success("Demo pulse armed");
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Demo failed");
		}
	}
	async function onMic() {
		await startSource("mic");
	}
	async function onSteel() {
		await startSource("steel");
	}
	async function onFile(file) {
		await startSource("file", file);
	}
	async function onRecord() {
		const canvas = canvasRef.current;
		if (!canvas || !caps) return;
		if (aura.recording) {
			const blob = await stopCapture();
			if (blob) {
				const ext = blob.type.includes("mp4") ? "mp4" : "webm";
				const a = document.createElement("a");
				a.href = URL.createObjectURL(blob);
				a.download = `aura-${aura.mode}.${ext}`;
				a.click();
				URL.revokeObjectURL(a.href);
				toast.success(`Saved ${ext.toUpperCase()} · 320 kbps`);
			}
			return;
		}
		if (!aura.playing) {
			toast.error("Play a source first");
			return;
		}
		await startCapture(canvas, aura.arm, caps.maxTexture);
		toast.success("Recording canvas + audio");
	}
	function onDrop(e) {
		e.preventDefault();
		const file = e.dataTransfer.files[0];
		if (file && file.type.startsWith("audio/")) onFile(file);
	}
	const showHud = !idle || aura.recording;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: wrapRef,
		className: "relative min-h-[70vh] overflow-hidden rounded-[var(--radius-lg)] border border-rule bg-paper sm:min-h-[78vh]",
		onDragOver: (e) => e.preventDefault(),
		onDrop,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
				ref: canvasRef,
				className: "absolute inset-0 size-full"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				ref: fileRef,
				type: "file",
				accept: "audio/*",
				className: "hidden",
				onChange: (e) => {
					const f = e.target.files?.[0];
					if (f) onFile(f);
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("pointer-events-none absolute inset-0 flex flex-col justify-between p-3 transition-opacity duration-[var(--motion-fast)] sm:p-6", showHud ? "opacity-100" : "opacity-0"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pointer-events-auto flex flex-wrap items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-2xs tracking-[0.2em] text-steel uppercase",
						children: t(lang, "auraKicker")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-1 font-display text-xl sm:text-3xl",
						children: t(lang, "auraTitle")
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-mono text-2xs text-muted",
						children: [
							aura.fps,
							" fps · ",
							aura.inc,
							" inc · ",
							caps ? `${caps.recordCeiling.w}×${caps.recordCeiling.h}` : "—"
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pointer-events-auto space-y-2 sm:space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "nav-scroll flex flex-nowrap gap-2 overflow-x-auto",
							children: MODES.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => aura.set({ mode: m.id }),
								className: cn("inline-flex min-h-11 shrink-0 items-center gap-2 rounded-[var(--radius-sm)] border px-3 text-sm", aura.mode === m.id ? "border-ink bg-ink text-paper" : "border-rule bg-paper/80 text-muted hover:text-ink"),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(m.icon, {
										className: "size-4",
										"aria-hidden": true
									}),
									m.label,
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "hidden font-mono text-2xs opacity-60 sm:inline",
										children: m.key
									})
								]
							}, m.id))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "nav-scroll flex flex-nowrap gap-2 overflow-x-auto",
							children: PALETTES.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => aura.set({ palette: p.id }),
								className: cn("min-h-11 shrink-0 rounded-[var(--radius-sm)] border px-3 text-sm", aura.palette === p.id ? "border-ink bg-ink text-paper" : "border-rule bg-paper/80 text-muted hover:text-ink"),
								children: p.label
							}, p.id))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "nav-scroll flex flex-nowrap items-center gap-2 overflow-x-auto rounded-[var(--radius-md)] border border-rule bg-paper/90 p-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									type: "button",
									variant: aura.playing ? "secondary" : "live",
									size: "sm",
									onClick: () => void togglePlay(),
									children: [aura.playing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-4" }), aura.playing ? t(lang, "auraPause") : t(lang, "auraPlay")]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: "secondary",
									size: "sm",
									onClick: () => void onDemo(),
									children: t(lang, "auraDemo")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									type: "button",
									variant: "secondary",
									size: "sm",
									onClick: () => void onMic(),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "size-4" }), t(lang, "liveMic")]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									type: "button",
									variant: "secondary",
									size: "sm",
									onClick: () => fileRef.current?.click(),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-4" }), t(lang, "auraOpen")]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									type: "button",
									variant: "secondary",
									size: "sm",
									disabled: !steelArmed,
									onClick: () => void onSteel(),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AudioLines, { className: "size-4" }), t(lang, "auraSteelTap")]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									type: "button",
									variant: aura.recording ? "stamp" : "secondary",
									size: "sm",
									onClick: () => void onRecord(),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, { className: "size-3 fill-current" }), aura.recording ? `${t(lang, "auraStopRec")} ${aura.recSec}s` : t(lang, "auraRecord")]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: "ghost",
									size: "icon",
									onClick: () => {
										const next = !aura.muted;
										aura.set({ muted: next });
										setVolume(aura.volume, next);
									},
									"aria-label": aura.muted ? t(lang, "auraUnmute") : t(lang, "auraMute"),
									children: aura.muted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "size-4" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: "ghost",
									size: "icon",
									onClick: () => void toggleFs(),
									"aria-label": t(lang, "auraFs"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Maximize, { className: "size-4" })
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-3 rounded-[var(--radius-md)] border border-rule bg-paper/90 p-3 sm:grid-cols-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "block",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex justify-between font-mono text-2xs text-muted",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "uppercase",
											children: t(lang, "auraSens")
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "tabular-nums",
											children: aura.sensitivity.toFixed(2)
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "range",
										min: .4,
										max: 2.2,
										step: .01,
										value: aura.sensitivity,
										onChange: (e) => aura.set({ sensitivity: Number(e.target.value) }),
										className: "mt-1 w-full accent-live"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "block",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex justify-between font-mono text-2xs text-muted",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "uppercase",
											children: t(lang, "auraVol")
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "tabular-nums",
											children: aura.volume.toFixed(2)
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "range",
										min: 0,
										max: 1,
										step: .01,
										value: aura.volume,
										onChange: (e) => {
											const v = Number(e.target.value);
											aura.set({ volume: v });
											setVolume(v, aura.muted);
										},
										className: "mt-1 w-full accent-live"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "block",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-2xs text-muted uppercase",
										children: t(lang, "auraInc")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
										className: "mt-1 h-11 w-full rounded-[var(--radius-sm)] border border-rule bg-raised px-2 text-sm",
										value: aura.inc,
										onChange: (e) => {
											const inc = Number(e.target.value);
											aura.set({ inc });
											setFft(inc);
										},
										children: BUFFER_INCS.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
											value: n,
											children: [n, " inc"]
										}, n))
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "nav-scroll flex flex-nowrap items-center gap-2 overflow-x-auto",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "shrink-0 font-mono text-2xs tracking-wider text-muted uppercase",
									children: t(lang, "auraArms")
								}),
								QUALITY_ARMS.map((arm) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => aura.set({ arm }),
									className: cn("min-h-11 shrink-0 rounded-[var(--radius-sm)] border px-3 font-mono text-sm", aura.arm === arm ? "border-ink bg-ink text-paper" : "border-rule text-muted"),
									children: arm === 528 ? "528p" : `${arm}x`
								}, arm)),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: "ghost",
									size: "sm",
									onClick: () => aura.set({ eqOpen: !aura.eqOpen }),
									children: "EQ"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: "ghost",
									size: "sm",
									onClick: () => aura.set({ capsOpen: !aura.capsOpen }),
									children: "Caps"
								}),
								aura.fileName ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-2xs text-muted",
									children: aura.fileName
								}) : null
							]
						}),
						aura.eqOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-4 gap-2 rounded-[var(--radius-md)] border border-rule bg-paper/90 p-3 sm:grid-cols-8",
							children: EQ_HZ$1.map((hz, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex flex-col items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "range",
									min: -12,
									max: 12,
									step: .5,
									value: aura.eq[i],
									onChange: (e) => {
										const next = [...aura.eq];
										next[i] = Number(e.target.value);
										aura.set({ eq: next });
										applyEqGains(next);
									},
									className: "h-24 accent-live",
									style: {
										writingMode: "vertical-lr",
										direction: "rtl"
									},
									"aria-label": `${hz} Hz`
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-2xs text-muted",
									children: hz >= 1e3 ? `${hz / 1e3}k` : hz
								})]
							}, hz))
						}) : null,
						aura.capsOpen && caps ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CapsPanel, { caps }) : null,
						aura.error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-clip",
							children: aura.error
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "hidden font-mono text-2xs text-faint sm:block",
							children: [t(lang, "auraKeys"), fs ? " · fullscreen" : ""]
						})
					]
				})]
			})
		]
	});
}
function CapsPanel({ caps }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-[var(--radius-md)] border border-rule bg-paper/95 p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-2xs tracking-wider text-muted uppercase",
				children: "Device analyser"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "mt-3 grid gap-2 text-sm sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						k: "GPU",
						v: caps.gpu
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						k: "Texture",
						v: `${caps.maxTexture}px`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						k: "Screen",
						v: `${caps.screen} · ${caps.refresh} Hz · ${caps.cores} cores`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						k: "Audio",
						v: `${caps.audioRate} Hz · ${caps.audioLatencyMs.toFixed(1)} ms RTL · ${caps.maxChannels} ch`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						k: "Ceiling",
						v: `${caps.recordCeiling.w}×${caps.recordCeiling.h} @ ${caps.recordCeiling.fps} · arm ${caps.recordCeiling.arm}`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						k: "Capture",
						v: caps.mime
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-xs text-muted",
				children: caps.imax
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-muted",
				children: "0.5 ms overclock target is below a Web Audio quantum (~2.7 ms at 48 kHz). 320 kbps · 44.1 kHz on the tap. 8000p / 164 fps is not a browser raster."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				variant: "secondary",
				size: "sm",
				className: "mt-3",
				onClick: () => void exportCapsXlsx(caps),
				children: "Export caps sheet"
			})
		]
	});
}
function Row({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
		className: "font-mono text-2xs text-steel",
		children: k
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
		className: "break-words text-muted",
		children: v
	})] });
}
var BUFFER_SIZES = [
	64,
	128,
	256,
	512,
	1024,
	2048
];
var SAMPLE_RATES = [
	44100,
	48e3,
	88200,
	96e3
];
var ASIO4ALL_VERSION = "2.22";
function roundTripMs(buffer, rate, extraBuffers = 2) {
	return buffer / rate * extraBuffers * 1e3;
}
function asioClass(rtl) {
	if (rtl <= 8) return "Tracking";
	if (rtl <= 16) return "Mixing";
	if (rtl <= 32) return "Producing";
	return "Playback";
}
var OS_MATRIX = [
	{
		id: "win8",
		label: "Windows 8 / 8.1",
		driver: `ASIO4ALL ${ASIO4ALL_VERSION}`,
		note: "Confirmed by Michael Tippach. Minor GUI artefacts. Use 48 kHz / 256 if USB devices drop."
	},
	{
		id: "win10",
		label: "Windows 10",
		driver: `ASIO4ALL ${ASIO4ALL_VERSION}`,
		note: "Official floor for the 2.21 installer. Enable the device in the WDM list, hardware buffer off unless the vendor driver is stable."
	},
	{
		id: "win11",
		label: "Windows 11 / ARM64",
		driver: `ASIO4ALL ${ASIO4ALL_VERSION}`,
		note: "2.22 adds native and EC ARM64, including USB Audio Class devices without vendor drivers."
	},
	{
		id: "linux",
		label: "Linux (Wine 7.5+ / PipeWire)",
		driver: "PipeASIO · JACK2 · ALSA",
		note: "No kernel ASIO. PipeWire 0.3+ or JACK is the low-latency path. Wine 7.5+ runs FL / Live; Ableton-Linux uses PipeASIO so Link can arm."
	}
];
var WHITE = [
	0,
	2,
	4,
	5,
	7,
	9,
	11
];
var NOTES = [
	"C",
	"C#",
	"D",
	"D#",
	"E",
	"F",
	"F#",
	"G",
	"G#",
	"A",
	"A#",
	"B"
];
var LOW = 48;
var HIGH = 72;
function SteelConsole() {
	const s = useSteel();
	const rtl = roundTripMs(s.buffer, s.sampleRate);
	const measured = s.armed ? measuredLatencyMs() : null;
	const transOn = Boolean(s.addons.transient) && versionGte(s.kernel, "3.5.0");
	(0, import_react.useEffect)(() => {
		if (s.armed) pushParams$1();
	}, [
		s.armed,
		s.inGain,
		s.outGain,
		s.master,
		s.hpHz,
		s.eqLo,
		s.eqMid,
		s.eqHi,
		s.satAmt,
		s.thresh,
		s.transAmt,
		s.addons
	]);
	async function arm() {
		try {
			await toggleKernel();
			if (!useSteel.getState().armed) return;
			toast.success(t(useSteel.getState().lang, "armOk"));
			try {
				await enableMidi();
			} catch {}
		} catch (err) {
			toast.error(err instanceof Error ? err.message : t(useSteel.getState().lang, "armFail"));
		}
	}
	const peakDb = s.peak > 0 ? (20 * Math.log10(s.peak)).toFixed(1) : "-∞";
	const clip = s.peak > .95;
	const klass = asioClass(rtl);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "min-w-0",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-2xs tracking-[0.2em] text-steel uppercase",
					children: t(s.lang, "consoleKicker")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 text-3xl sm:text-4xl",
					children: t(s.lang, "consoleTitle")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-prose text-sm leading-relaxed text-muted",
					children: t(s.lang, "consoleLead")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 flex flex-wrap items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: s.armed ? "stamp" : "live",
							onClick: () => void arm(),
							children: s.armed ? t(s.lang, "disarm") : t(s.lang, "armKernel")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "secondary",
							disabled: !s.armed,
							onClick: () => panic(),
							children: t(s.lang, "panic")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-2xs text-muted",
							children: s.armed ? s.inputLive ? t(s.lang, "runningLive") : t(s.lang, "runningKeys") : t(s.lang, "armHint")
						})
					]
				}),
				s.error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-clip",
					children: s.error
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat$1, {
							label: "Buffer",
							value: `${s.buffer}`,
							unit: "samples"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat$1, {
							label: "Rate",
							value: `${s.sampleRate / 1e3}`,
							unit: "kHz"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat$1, {
							label: "ASIO RTL",
							value: rtl.toFixed(1),
							unit: "ms"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat$1, {
							label: "Measured",
							value: measured != null ? measured.toFixed(1) : "—",
							unit: "ms"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 font-mono text-2xs text-faint",
					children: [
						"Class ",
						klass,
						" · extra buffers 2 (ASIO4ALL model)"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 grid gap-4 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-2xs tracking-wider text-muted uppercase",
							children: "Buffer"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							className: "mt-1 h-11 w-full rounded-[var(--radius-md)] border border-rule bg-raised px-3 text-sm",
							value: s.buffer,
							onChange: (e) => s.patch({ buffer: Number(e.target.value) }),
							children: BUFFER_SIZES.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: n,
								children: n
							}, n))
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-2xs tracking-wider text-muted uppercase",
							children: "Sample rate"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							className: "mt-1 h-11 w-full rounded-[var(--radius-md)] border border-rule bg-raised px-3 text-sm",
							value: s.sampleRate,
							onChange: (e) => s.patch({ sampleRate: Number(e.target.value) }),
							children: SAMPLE_RATES.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
								value: n,
								children: [n / 1e3, " kHz"]
							}, n))
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-xs text-muted",
					children: "Re-arm after changing rate. Buffer size here is the host ASIO figure; the worklet quantum stays 128."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-2xs tracking-wider text-muted uppercase",
							children: "MIDI poly · C3–C5 · A–K is C4–C5"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Piano, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 font-mono text-2xs text-muted",
							children: [
								"Last ",
								s.lastNote,
								" · ",
								s.lastCc
							]
						})
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "rounded-[var(--radius-lg)] border border-rule bg-raised/60 p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-2xs tracking-wider text-muted uppercase",
					children: "Meters"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex items-end gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
							label: "Peak",
							value: s.peak,
							clip
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
							label: "RMS",
							value: Math.min(1, s.rms * 2.2),
							clip: false
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pb-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: cn("font-mono text-3xl tabular-nums", clip ? "text-clip" : "text-ink"),
									children: peakDb
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-mono text-2xs text-muted",
									children: "dBFS"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-3 font-mono text-2xs text-muted",
									children: [
										"Voices ",
										s.voices,
										" · load ",
										s.cpu.toFixed(0),
										"%"
									]
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider$1, {
							label: "Input",
							value: s.inGain,
							min: 0,
							max: 2,
							onChange: (v) => s.patch({ inGain: v })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider$1, {
							label: "Master",
							value: s.master,
							min: 0,
							max: 1.2,
							onChange: (v) => s.patch({ master: v })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider$1, {
							label: "HP Hz",
							value: s.hpHz,
							min: 20,
							max: 400,
							onChange: (v) => s.patch({ hpHz: v })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider$1, {
							label: "Lo",
							value: s.eqLo,
							min: .2,
							max: 2,
							onChange: (v) => s.patch({ eqLo: v })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider$1, {
							label: "Mid",
							value: s.eqMid,
							min: .2,
							max: 2,
							onChange: (v) => s.patch({ eqMid: v })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider$1, {
							label: "Hi",
							value: s.eqHi,
							min: .2,
							max: 2,
							onChange: (v) => s.patch({ eqHi: v })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider$1, {
							label: "Sat",
							value: s.satAmt,
							min: 0,
							max: 1,
							onChange: (v) => s.patch({ satAmt: v })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider$1, {
							label: "Thresh",
							value: s.thresh,
							min: .05,
							max: .9,
							onChange: (v) => s.patch({ thresh: v })
						}),
						transOn ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider$1, {
							label: "Transient",
							value: s.transAmt,
							min: 0,
							max: 1,
							onChange: (v) => s.patch({ transAmt: v })
						}) : null
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-2xs tracking-wider text-muted uppercase",
							children: "MIDI in"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							className: "mt-1 h-11 w-full rounded-[var(--radius-md)] border border-rule bg-paper px-3 text-sm",
							value: s.midiIn ?? "",
							onChange: (e) => selectMidiIn(e.target.value || null),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Computer keyboard (A–K)"
							}), s.midiPorts.filter((p) => p.type === "in").map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: p.id,
								children: p.name
							}, p.id))]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "secondary",
							size: "sm",
							className: "mt-2",
							onClick: () => void enableMidi(),
							children: "Scan MIDI"
						})
					]
				})
			]
		})]
	});
}
function Piano() {
	const [held, setHeld] = (0, import_react.useState)(() => /* @__PURE__ */ new Set());
	const pointerHeld = (0, import_react.useRef)(/* @__PURE__ */ new Set());
	const whites = [];
	const blacks = [];
	for (let n = LOW; n <= HIGH; n++) if (WHITE.includes(n % 12)) whites.push(n);
	else blacks.push(n);
	function down(note) {
		setHeld((prev) => new Set(prev).add(note));
		const pc = note % 12;
		useSteel.getState().patch({ lastNote: `${NOTES[pc]}${Math.floor(note / 12) - 1}` });
		playNote(true, note, .85);
	}
	function up(note) {
		setHeld((prev) => {
			const next = new Set(prev);
			next.delete(note);
			return next;
		});
		playNote(false, note);
	}
	function tap(note) {
		if (pointerHeld.current.has(note)) return;
		down(note);
		window.setTimeout(() => up(note), 280);
	}
	function blackLeft(note) {
		const pc = note % 12;
		return (Math.floor((note - LOW) / 12) * 7 + ({
			1: .72,
			3: 1.72,
			6: 3.72,
			8: 4.72,
			10: 5.72
		}[pc] ?? 0)) / whites.length * 100;
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-3 overflow-x-auto overscroll-x-contain",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative h-36 w-[32rem] max-w-none sm:w-[36rem]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 flex overflow-hidden rounded-[var(--radius-md)] border border-rule",
				children: whites.map((note) => {
					const pc = note % 12;
					const on = held.has(note);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": `${NOTES[pc]}${Math.floor(note / 12) - 1}`,
						className: cn("relative h-full flex-1 border-r border-rule last:border-r-0", on ? "bg-live text-paper" : "bg-ink text-paper"),
						onPointerDown: (e) => {
							e.currentTarget.setPointerCapture(e.pointerId);
							pointerHeld.current.add(note);
							down(note);
						},
						onPointerUp: () => {
							pointerHeld.current.delete(note);
							up(note);
						},
						onPointerCancel: () => {
							pointerHeld.current.delete(note);
							up(note);
						},
						onClick: () => tap(note),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "absolute bottom-2 left-0 right-0 text-center font-mono text-2xs text-paper/70",
							children: KEY_LABEL[note] ?? (pc === 0 ? `C${Math.floor(note / 12) - 1}` : "")
						})
					}, note);
				})
			}), blacks.map((note) => {
				const pc = note % 12;
				const on = held.has(note);
				const w = .58 / whites.length * 100;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-label": `${NOTES[pc]}${Math.floor(note / 12) - 1}`,
					style: {
						left: `calc(${blackLeft(note)}% + 0.15%)`,
						width: `${w}%`
					},
					className: cn("absolute top-0 z-10 h-[58%] rounded-b-[var(--radius-sm)] border border-rule", on ? "bg-live" : "bg-paper"),
					onPointerDown: (e) => {
						e.preventDefault();
						e.currentTarget.setPointerCapture(e.pointerId);
						pointerHeld.current.add(note);
						down(note);
					},
					onPointerUp: () => {
						pointerHeld.current.delete(note);
						up(note);
					},
					onPointerCancel: () => {
						pointerHeld.current.delete(note);
						up(note);
					},
					onClick: () => tap(note),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "sr-only",
						children: KEY_LABEL[note]
					})
				}, note);
			})]
		})
	});
}
function Stat$1({ label, value, unit }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-[var(--radius-md)] border border-rule bg-raised/40 px-3 py-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-2xs tracking-wider text-muted uppercase",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 font-display text-2xl tabular-nums leading-none",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 font-mono text-2xs text-faint",
				children: unit
			})
		]
	});
}
function Meter({ label, value, clip }) {
	const h = Math.min(1, Math.max(0, value));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "relative h-40 w-8 overflow-hidden rounded-[var(--radius-sm)] border border-rule bg-paper",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("absolute inset-x-0 bottom-0", clip ? "bg-clip" : "bg-live"),
				style: { height: `${h * 100}%` }
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-mono text-2xs tracking-wider text-muted uppercase",
			children: label
		})]
	});
}
function Slider$1({ label, value, min, max, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex justify-between font-mono text-2xs text-muted",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "tracking-wider uppercase",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "tabular-nums text-ink",
				children: value.toFixed(2)
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type: "range",
			min,
			max,
			step: (max - min) / 200,
			value,
			onChange: (e) => onChange(Number(e.target.value)),
			className: "mt-1 w-full accent-live"
		})]
	});
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var suggestMix = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("74e523f54ad27ab7047434cafef075bd7d66de84597d2e63234ea513c82fc438"));
var DESK_DEFAULT = {
	tier: "desk",
	cores: 4,
	videoW: 1920,
	videoH: 1080,
	label: "WEB remote · OS kernel"
};
function probeDesk() {
	if (typeof window === "undefined" || typeof navigator === "undefined") return DESK_DEFAULT;
	const cores = navigator.hardwareConcurrency || 4;
	let narrow = false;
	try {
		narrow = window.matchMedia("(max-width: 700px)").matches;
	} catch {
		return {
			...DESK_DEFAULT,
			cores
		};
	}
	if (narrow) return {
		tier: "remote",
		cores,
		videoW: 1280,
		videoH: 720,
		label: "WEB remote · 720p30"
	};
	return {
		tier: "desk",
		cores,
		videoW: 1920,
		videoH: 1080,
		label: "WEB remote · OS kernel"
	};
}
function wordClip(s, n) {
	const words = s.trim().split(/\s+/).filter(Boolean);
	if (words.length <= n) return s;
	return words.slice(0, n).join(" ");
}
function wordCount(s) {
	return s.trim() ? s.trim().split(/\s+/).filter(Boolean).length : 0;
}
function pickMime() {
	return [
		"video/webm;codecs=vp9,opus",
		"video/webm;codecs=vp8,opus",
		"video/webm",
		"video/mp4"
	].find((m) => MediaRecorder.isTypeSupported(m)) ?? "";
}
function clipWords(s, n = 70) {
	return s.trim().split(/\s+/).filter(Boolean).slice(0, n).join(" ");
}
async function loadImage(file) {
	const url = URL.createObjectURL(file);
	if (file.type.startsWith("video/")) {
		const v = document.createElement("video");
		v.muted = true;
		v.playsInline = true;
		v.src = url;
		v.loop = true;
		await v.play().catch(() => void 0);
		await new Promise((res) => {
			if (v.readyState >= 2) res();
			else v.onloadeddata = () => res();
		});
		return v;
	}
	const img = new Image();
	img.crossOrigin = "anonymous";
	img.src = url;
	await img.decode();
	return img;
}
function bassEnergy(freq) {
	let s = 0;
	const n = Math.min(8, freq.length);
	for (let i = 0; i < n; i++) s += freq[i];
	return n ? s / (n * 255) : 0;
}
async function renderDeskVideo(opts) {
	if (!opts.files.length) throw new Error("media");
	const frames = await Promise.all(opts.files.slice(0, 8).map(loadImage));
	const canvas = document.createElement("canvas");
	const w = opts.width ?? 1920;
	const h = opts.height ?? 1080;
	canvas.width = w;
	canvas.height = h;
	const raw = canvas.getContext("2d");
	if (!raw) throw new Error("canvas");
	const ctx = raw;
	const stream = canvas.captureStream(30);
	if (opts.audio) for (const t of opts.audio.getAudioTracks()) stream.addTrack(t);
	const mime = pickMime();
	const rec = new MediaRecorder(stream, mime ? {
		mimeType: mime,
		videoBitsPerSecond: 8e6
	} : void 0);
	const chunks = [];
	rec.ondataavailable = (e) => {
		if (e.data.size) chunks.push(e.data);
	};
	const freq = new Uint8Array(opts.analyser ? opts.analyser.frequencyBinCount : 64);
	const time = new Uint8Array(opts.analyser ? opts.analyser.fftSize : 64);
	const pal = PALETTES[1];
	const dur = Math.min(24, Math.max(4, opts.duration));
	const prompt = clipWords(opts.prompt, 80);
	const lyrics = clipWords(opts.lyrics ?? "", 250);
	const beat = 60 / Math.max(60, opts.bpm);
	rec.start(200);
	const t0 = performance.now();
	let idx = 0;
	let lastCut = 0;
	await new Promise((resolve) => {
		function tick() {
			const elapsed = (performance.now() - t0) / 1e3;
			if (elapsed >= dur) {
				rec.stop();
				return;
			}
			opts.onTick?.(elapsed / dur);
			if (opts.analyser) {
				opts.analyser.getByteFrequencyData(freq);
				opts.analyser.getByteTimeDomainData(time);
			}
			const bass = opts.analyser ? bassEnergy(freq) : 0;
			const minGap = beat * .45;
			if ((opts.analyser ? bass > .42 : elapsed - lastCut >= beat / 2) && elapsed - lastCut >= minGap) {
				idx = (idx + 1) % frames.length;
				lastCut = elapsed;
			}
			const media = frames[idx % frames.length];
			const zoom = 1.06 + bass * .12 + Math.sin(elapsed * 1.15) * .04;
			ctx.fillStyle = "#111210";
			ctx.fillRect(0, 0, w, h);
			ctx.save();
			ctx.translate(w / 2, h / 2);
			ctx.scale(zoom, zoom);
			ctx.drawImage(media, -w / 2, -h / 2, w, h);
			ctx.restore();
			ctx.globalCompositeOperation = "screen";
			drawFrame(ctx, w, h, freq, time, "bloom", pal, 1.2);
			ctx.globalCompositeOperation = "source-over";
			ctx.fillStyle = "rgba(17,18,16,0.52)";
			ctx.fillRect(0, h - 140, w, 140);
			ctx.fillStyle = "#e8e4d8";
			ctx.font = "500 28px 'IBM Plex Sans Condensed', system-ui";
			ctx.fillText(`STEEL · ${w}×${h} / 30`, 48, h - 92);
			ctx.fillStyle = "#4aa7d4";
			ctx.font = "18px 'IBM Plex Sans', system-ui";
			ctx.fillText(prompt || "no brief — engine cuts on the kick", 48, h - 58);
			if (lyrics) {
				const words = lyrics.split(/\s+/);
				const start = Math.floor(elapsed * 2) % Math.max(1, words.length);
				const line = words.slice(start, start + 12).join(" ");
				ctx.fillStyle = "#e8783a";
				ctx.font = "500 22px 'IBM Plex Sans Condensed', system-ui";
				ctx.fillText(line, 48, h - 24);
			}
			requestAnimationFrame(tick);
		}
		tick();
		rec.onstop = () => resolve();
	});
	return new Blob(chunks, { type: rec.mimeType || "video/webm" });
}
function asKind(v) {
	return v === "mix" || v === "audit" ? v : null;
}
var createSteelRow = createServerFn({ method: "POST" }).validator((input) => {
	const kind = asKind(input?.kind);
	if (!kind) throw new Error("kind");
	const title = String(input?.title ?? "").trim().slice(0, 80);
	if (!title) throw new Error("title");
	const payloadJson = String(input?.payloadJson ?? "");
	if (payloadJson.length < 2 || payloadJson.length > 4e3) throw new Error("payload");
	JSON.parse(payloadJson);
	return {
		kind,
		title,
		payloadJson
	};
}).handler(createSsrRpc("9efa963c2f182ee6f21584d89c6f81032bc17ddd31d9302ecd577178c726ab1f"));
var listSteelRows = createServerFn({ method: "POST" }).validator((input) => {
	const kind = asKind(input?.kind);
	if (!kind) throw new Error("kind");
	return { kind };
}).handler(createSsrRpc("3e3d216391e68efe5f092daeb6ee0716cdfaa7d016897e547b3d6dd3df1a9416"));
var PAGES = 8;
var COLS = 128;
var FONT = {
	" ": [
		0,
		0,
		0,
		0,
		0
	],
	"0": [
		62,
		69,
		73,
		81,
		62
	],
	"1": [
		0,
		33,
		127,
		1,
		0
	],
	"2": [
		35,
		69,
		73,
		73,
		49
	],
	"3": [
		34,
		65,
		73,
		73,
		54
	],
	"4": [
		12,
		20,
		36,
		127,
		4
	],
	"5": [
		114,
		81,
		81,
		81,
		78
	],
	"6": [
		62,
		73,
		73,
		73,
		38
	],
	"7": [
		64,
		71,
		72,
		80,
		96
	],
	"8": [
		54,
		73,
		73,
		73,
		54
	],
	"9": [
		50,
		73,
		73,
		73,
		62
	],
	A: [
		63,
		72,
		72,
		72,
		63
	],
	B: [
		127,
		73,
		73,
		73,
		54
	],
	C: [
		62,
		65,
		65,
		65,
		34
	],
	D: [
		127,
		65,
		65,
		65,
		62
	],
	E: [
		127,
		73,
		73,
		73,
		65
	],
	F: [
		127,
		72,
		72,
		72,
		64
	],
	G: [
		62,
		65,
		73,
		73,
		46
	],
	H: [
		127,
		8,
		8,
		8,
		127
	],
	I: [
		0,
		65,
		127,
		65,
		0
	],
	K: [
		127,
		8,
		20,
		34,
		65
	],
	L: [
		127,
		1,
		1,
		1,
		1
	],
	M: [
		127,
		32,
		24,
		32,
		127
	],
	N: [
		127,
		16,
		8,
		4,
		127
	],
	O: [
		62,
		65,
		65,
		65,
		62
	],
	P: [
		127,
		72,
		72,
		72,
		48
	],
	R: [
		127,
		72,
		76,
		74,
		49
	],
	S: [
		50,
		73,
		73,
		73,
		38
	],
	T: [
		64,
		64,
		127,
		64,
		64
	],
	U: [
		126,
		1,
		1,
		1,
		126
	],
	V: [
		124,
		2,
		1,
		2,
		124
	],
	W: [
		126,
		1,
		14,
		1,
		126
	],
	X: [
		99,
		20,
		8,
		20,
		99
	],
	Y: [
		96,
		16,
		15,
		16,
		96
	],
	Z: [
		67,
		69,
		73,
		81,
		97
	],
	":": [
		0,
		54,
		54,
		0,
		0
	],
	".": [
		0,
		3,
		3,
		0,
		0
	],
	"/": [
		3,
		4,
		8,
		16,
		96
	],
	"-": [
		8,
		8,
		8,
		8,
		8
	],
	"=": [
		20,
		20,
		20,
		20,
		20
	],
	"+": [
		8,
		8,
		62,
		8,
		8
	],
	"#": [
		20,
		127,
		20,
		127,
		20
	]
};
var ram = /* @__PURE__ */ new Uint8Array(1024);
function glyph(ch) {
	return FONT[ch] ?? FONT[ch.toUpperCase()] ?? [
		127,
		65,
		65,
		65,
		127
	];
}
function writeByte(page, col, byte) {
	if (page < 0 || page >= PAGES || col < 0 || col >= COLS) return;
	ram[page * COLS + col] = byte & 255;
}
function writeText(page, col, s) {
	let x = col;
	for (const ch of s) {
		const gl = glyph(ch);
		for (let c = 0; c < 5; c++) writeByte(page, x++, gl[c] ?? 0);
		x++;
	}
	return x;
}
function writeBar(page, col, width, n, pattern) {
	const fill = Math.max(0, Math.min(width, Math.round(n * width)));
	for (let i = 0; i < width; i++) writeByte(page, col + i, i < fill ? pattern : 0);
}
function writeScroll(page, s, shiftPx) {
	const cols = [];
	for (const ch of s) {
		const gl = glyph(ch);
		for (let c = 0; c < 5; c++) cols.push(gl[c] ?? 0);
		cols.push(0);
	}
	if (!cols.length) return;
	const period = cols.length;
	const off = (shiftPx % period + period) % period;
	for (let x = 0; x < COLS; x++) writeByte(page, x, cols[(off + x) % period] ?? 0);
}
function hexRgb(hex) {
	const h = hex.replace("#", "").trim();
	if (h.length < 6) return [
		232,
		120,
		58
	];
	return [
		parseInt(h.slice(0, 2), 16),
		parseInt(h.slice(2, 4), 16),
		parseInt(h.slice(4, 6), 16)
	];
}
/** Contrast register 81h. I_SEG = (Contrast/32) × I_REF. POR = 7Fh. */
function contrast81h(frame) {
	const peak = Math.min(1, Math.max(0, frame.peak));
	const n = 74 + Math.min(1, Math.max(0, frame.kare)) * 106 + peak * 56 + (frame.playing ? 24 : 0);
	return Math.max(1, Math.min(255, Math.round(n)));
}
var PAGE_TONE = [
	"ice",
	"ember",
	"ember",
	"ice",
	"ember",
	"ice",
	"ice",
	"ember"
];
function paintOled(ctx, frame, emberHex, iceHex) {
	ram.fill(0);
	const contrast = contrast81h(frame);
	const hex = contrast.toString(16).toUpperCase().padStart(2, "0");
	const v = Math.max(0, Math.min(1, frame.kare));
	const loud = Math.min(1, Math.max(0, (frame.lufs + 70) / 70));
	const crawl = (frame.crawl || "KARESTIK").toUpperCase().replace(/[^A-Z0-9 :=./#+-]/g, " ");
	writeText(0, 1, "STEEL 1315");
	writeText(0, 92, `${hex}h`);
	writeText(1, 1, frame.playing ? "LIVE" : "IDLE");
	writeText(1, 40, `${frame.bpm}|${frame.key}`.slice(0, 12));
	writeBar(2, 1, 126, Math.min(1, frame.peak), 60);
	writeBar(3, 1, 126, loud, 60);
	writeText(4, 1, `V=S/T ${v.toFixed(2)}`);
	writeText(5, 1, "TUN MIRR NEST");
	writeText(6, 1, `FR ${hex}h 64MUX`);
	writeScroll(7, `${crawl}   ${crawl}   `, Math.floor(frame.t * 18));
	if (Math.floor(frame.t * 60) % 2 === 0) {
		writeByte(0, 126, 1);
		writeByte(0, 127, 1);
	}
	const img = ctx.createImageData(128, 64);
	const d = img.data;
	for (let i = 0; i < d.length; i += 4) {
		d[i] = 8;
		d[i + 1] = 9;
		d[i + 2] = 8;
		d[i + 3] = 255;
	}
	const em = hexRgb(emberHex);
	const ice = hexRgb(iceHex);
	const scale = Math.max(.78, contrast / 255);
	for (let page = 0; page < PAGES; page++) {
		const tone = PAGE_TONE[page] === "ember" ? em : ice;
		const r = Math.round(tone[0] * scale);
		const g = Math.round(tone[1] * scale);
		const b = Math.round(tone[2] * scale);
		for (let col = 0; col < COLS; col++) {
			const byte = ram[page * COLS + col] ?? 0;
			if (!byte) continue;
			for (let bit = 0; bit < 8; bit++) {
				if (!(byte & 1 << bit)) continue;
				const i = ((page * 8 + bit) * 128 + col) * 4;
				d[i] = r;
				d[i + 1] = g;
				d[i + 2] = b;
				d[i + 3] = 255;
			}
		}
	}
	ctx.putImageData(img, 0, 0);
}
function token(name, fallback) {
	if (typeof document === "undefined") return fallback;
	return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;
}
function SteelOled() {
	const ref = (0, import_react.useRef)(null);
	const peak = useDesk((s) => s.peak);
	const lufs = useDesk((s) => s.lufs);
	const bpm = useDesk((s) => s.bpm);
	const kare = useDesk((s) => s.kare);
	const playing = useDesk((s) => s.playing);
	const pitch = useDesk((s) => s.pitch);
	const lyrics = useDesk((s) => s.lyrics);
	const palve = useDesk((s) => s.palve);
	(0, import_react.useEffect)(() => {
		const canvas = ref.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		ctx.imageSmoothingEnabled = false;
		const ember = token("--color-ember", "#e8783a");
		const ice = token("--color-ice", "#4aa7d4");
		const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		let raf = 0;
		const t0 = performance.now();
		function tick() {
			if (!ctx) return;
			paintOled(ctx, {
				peak,
				lufs,
				bpm,
				kare,
				playing,
				key: pitchLabel(pitch),
				crawl: palve || lyrics || "KARESTIK TUNNEL MIRROR NEST",
				t: reduce ? 0 : (performance.now() - t0) / 1e3
			}, ember, ice);
			raf = requestAnimationFrame(tick);
		}
		tick();
		return () => cancelAnimationFrame(raf);
	}, [
		peak,
		lufs,
		bpm,
		kare,
		playing,
		pitch,
		lyrics,
		palve
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "oled-panel rounded-[var(--radius-md)] border border-rule bg-paper p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-mono text-2xs tracking-wider text-ice uppercase",
			children: "SSD1315 · PAGE0–7 · 128×64"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
			ref,
			width: 128,
			height: 64,
			className: "mt-2 w-full max-w-sm",
			style: {
				imageRendering: "pixelated",
				aspectRatio: "128 / 64",
				height: "auto"
			},
			"aria-label": "STEEL OLED"
		})]
	});
}
function fxLabel(lang, x) {
	if (lang === "et") return x.et;
	if (lang === "ru") return x.ru;
	return x.en;
}
function SteelDesk() {
	const lang = useSteel((s) => s.lang);
	const d = useDesk();
	const beatRef = (0, import_react.useRef)(null);
	const vocalRef = (0, import_react.useRef)(null);
	const recRef = (0, import_react.useRef)(null);
	const mediaRef = (0, import_react.useRef)(null);
	const [rows, setRows] = (0, import_react.useState)([]);
	const [rowBusy, setRowBusy] = (0, import_react.useState)(false);
	const [mediaFiles, setMediaFiles] = (0, import_react.useState)([]);
	const [adapt, setAdapt] = (0, import_react.useState)(DESK_DEFAULT);
	(0, import_react.useEffect)(() => {
		const apply = () => setAdapt(probeDesk());
		apply();
		const mq = window.matchMedia("(max-width: 700px)");
		mq.addEventListener("change", apply);
		return () => mq.removeEventListener("change", apply);
	}, []);
	(0, import_react.useEffect)(() => {
		listSteelRows({ data: { kind: "mix" } }).then(setRows).catch(() => void 0);
	}, []);
	(0, import_react.useEffect)(() => {
		return () => {
			stopMix();
			stopLiveMic();
		};
	}, []);
	(0, import_react.useEffect)(() => {
		pushParams();
	}, [
		d.amount,
		d.speed,
		d.tonic,
		d.mode,
		d.drive,
		d.ceiling,
		d.beatGain,
		d.vocalGain,
		d.glue,
		d.delay,
		d.reverb,
		d.delayMix,
		d.reverbMix,
		d.applyMix,
		d.female,
		d.bpm,
		d.kare,
		d.width,
		d.eq
	]);
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			if (e.code !== "Space" || e.metaKey || e.ctrlKey || e.altKey) return;
			const tag = e.target?.tagName;
			if (tag === "INPUT" || tag === "SELECT" || tag === "TEXTAREA") return;
			e.preventDefault();
			onPlay();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []);
	async function onBeat(file) {
		try {
			await setBeatBuffer(await decodeSlot(file), file.name);
			toast.success(file.name);
		} catch {
			toast.error(t(lang, "decodeFail"));
		}
	}
	async function onVocal(file) {
		try {
			await setVocalBuffer(await decodeSlot(file), file.name);
			toast.success(file.name);
		} catch {
			toast.error(t(lang, "decodeFail"));
		}
	}
	async function onPlay() {
		try {
			if (useDesk.getState().playing) stopMix();
			else await playMix();
		} catch {
			toast.error(t(useSteel.getState().lang, "needSlots"));
		}
	}
	async function onMic() {
		try {
			if (d.liveMic) stopLiveMic();
			else await startLiveMic();
		} catch {
			toast.error(t(lang, "micBlocked"));
		}
	}
	async function onRec() {
		try {
			const state = await toggleVoiceRec();
			toast.success(state === "start" ? t(lang, "recStart") : t(lang, "recDone"));
		} catch {
			recRef.current?.click();
		}
	}
	async function onAi() {
		sharpMix();
		d.set({ aiBusy: true });
		try {
			const res = await suggestMix({ data: {
				peak: d.peak,
				rms: d.rms,
				lufs: d.lufs,
				pitch: d.pitch,
				hasBeat: Boolean(d.beatName),
				hasVocal: Boolean(d.vocalName) || d.liveMic,
				lang,
				genre: d.genre,
				clips: d.regions.length,
				bpm: d.bpm,
				kare: d.kare,
				palve: d.palve
			} });
			if (res.ok) d.set({
				aiNote: res.text,
				aiBusy: false
			});
			else d.set({
				aiNote: t(lang, "heuristicApplied"),
				aiBusy: false
			});
		} catch {
			d.set({
				aiNote: t(lang, "heuristicApplied"),
				aiBusy: false
			});
		}
		toast.success(t(lang, "heuristicApplied"));
	}
	async function onBounce() {
		try {
			const blob = await bounceWav();
			const a = document.createElement("a");
			a.href = URL.createObjectURL(blob);
			a.download = "steel-mix.wav";
			a.click();
			URL.revokeObjectURL(a.href);
		} catch {
			toast.error(t(lang, "needSlots"));
		}
	}
	function parsePayload(row) {
		try {
			const raw = JSON.parse(row.payloadJson);
			const out = {};
			for (const [k, v] of Object.entries(raw)) if (typeof v === "number" && Number.isFinite(v)) out[k] = v;
			return out;
		} catch {
			return {};
		}
	}
	async function onSaveRow() {
		const s = useDesk.getState();
		setRowBusy(true);
		try {
			await createSteelRow({ data: {
				kind: "mix",
				title: `mix ${s.bpm}bpm`,
				payloadJson: JSON.stringify({
					amount: s.amount,
					speed: s.speed,
					tonic: s.tonic,
					mode: s.mode,
					drive: s.drive,
					ceiling: s.ceiling,
					beatGain: s.beatGain,
					vocalGain: s.vocalGain,
					glue: s.glue,
					bpm: s.bpm
				})
			} });
			const next = await listSteelRows({ data: { kind: "mix" } });
			setRows(next);
			toast.success(t(lang, "rowSaved"));
		} catch {
			toast.error(t(lang, "rowFail"));
		} finally {
			setRowBusy(false);
		}
	}
	function loadRow(row) {
		const p = parsePayload(row);
		const s = useDesk.getState();
		const num = (k, fallback) => typeof p[k] === "number" ? p[k] : fallback;
		s.set({
			amount: num("amount", s.amount),
			speed: num("speed", s.speed),
			tonic: Math.round(num("tonic", s.tonic)) % 12,
			mode: Math.round(num("mode", s.mode)) % 3,
			drive: num("drive", s.drive),
			ceiling: num("ceiling", s.ceiling),
			beatGain: num("beatGain", s.beatGain),
			vocalGain: num("vocalGain", s.vocalGain),
			glue: num("glue", s.glue),
			bpm: Math.round(num("bpm", s.bpm))
		});
		pushParams();
		toast.success(row.title);
	}
	async function withBusy(fn, ok) {
		d.set({ aiBusy: true });
		try {
			await fn();
			toast.success(ok);
		} catch {
			toast.error(t(lang, "needSlots"));
		} finally {
			d.set({ aiBusy: false });
		}
	}
	async function onVideo() {
		if (!mediaFiles.length) {
			mediaRef.current?.click();
			return;
		}
		d.set({
			videoBusy: true,
			aiBusy: true
		});
		try {
			const tap = tapDeskAudio();
			const blob = await renderDeskVideo({
				files: mediaFiles,
				prompt: d.videoPrompt,
				lyrics: d.lyrics,
				duration: 8,
				bpm: d.bpm,
				analyser: tap?.analyser ?? null,
				audio: tap?.stream ?? null,
				width: adapt.videoW,
				height: adapt.videoH
			});
			const a = document.createElement("a");
			a.href = URL.createObjectURL(blob);
			a.download = "steel-visual.webm";
			a.click();
			URL.revokeObjectURL(a.href);
			toast.success("STEEL visual");
		} catch {
			toast.error(t(lang, "needSlots"));
		} finally {
			d.set({
				videoBusy: false,
				aiBusy: false
			});
		}
	}
	const peakDb = d.peak > 0 ? (20 * Math.log10(d.peak)).toFixed(1) : "-∞";
	const loudN = Math.min(1, Math.max(0, (d.lufs + 70) / 70));
	const duckDb = d.duck < .999 ? (20 * Math.log10(Math.max(.001, d.duck))).toFixed(1) : "0.0";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("relative grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]", d.aiBusy && "desk-busy"),
		children: [
			d.aiBusy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "desk-wash",
				"aria-hidden": true
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "min-w-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-2xs tracking-[0.2em] text-steel uppercase",
						children: t(lang, "deskKicker")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 text-3xl sm:text-4xl",
						children: t(lang, "deskTitle")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-prose text-sm leading-relaxed text-muted",
						children: t(lang, "deskLead")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 font-mono text-2xs text-ice",
						children: [
							adapt.label,
							" · ",
							t(lang, "adaptNote")
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 grid gap-3 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlotCard, {
							lang,
							title: t(lang, "slotBeat"),
							name: d.beatName,
							onPick: () => beatRef.current?.click(),
							pickLabel: t(lang, "loadBeat"),
							extra: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "secondary",
								size: "sm",
								onClick: () => void loadDemoBeat(),
								children: t(lang, "demoBeat")
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlotCard, {
							lang,
							title: t(lang, "slotVocal"),
							name: d.vocalName,
							onPick: () => vocalRef.current?.click(),
							pickLabel: t(lang, "loadVocal"),
							extra: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: "secondary",
									size: "sm",
									onClick: () => void loadDemoVocal(),
									children: t(lang, "demoVocal")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: d.recording ? "stamp" : "secondary",
									size: "sm",
									onClick: () => void onRec(),
									children: t(lang, "recVoice")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: d.liveMic ? "live" : "secondary",
									size: "sm",
									onClick: () => void onMic(),
									children: t(lang, "liveMic")
								})
							] })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: beatRef,
						type: "file",
						accept: "audio/*,.mp3,.wav,.m4a,.aac,.ogg,.flac",
						className: "hidden",
						onChange: (e) => {
							const f = e.target.files?.[0];
							if (f) onBeat(f);
							e.target.value = "";
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: vocalRef,
						type: "file",
						accept: "audio/*,.mp3,.wav,.m4a,.aac,.ogg",
						className: "hidden",
						onChange: (e) => {
							const f = e.target.files?.[0];
							if (f) onVocal(f);
							e.target.value = "";
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: recRef,
						type: "file",
						accept: "audio/*",
						capture: "user",
						className: "hidden",
						onChange: (e) => {
							const f = e.target.files?.[0];
							if (f) onVocal(f);
							e.target.value = "";
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: cn("mt-5 flex flex-wrap items-center gap-2", d.playing && "kare-hair"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: d.playing ? "stamp" : "live",
								onClick: () => void onPlay(),
								children: d.playing ? t(lang, "stopMix") : t(lang, "playMix")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "secondary",
								onClick: () => void onAi(),
								disabled: d.aiBusy,
								children: d.aiBusy ? t(lang, "aiBusy") : t(lang, "aiMix")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "secondary",
								onClick: () => void onBounce(),
								children: t(lang, "bounce")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "live",
								onClick: () => void withBusy(applyFix, t(lang, "fixIt")),
								disabled: d.aiBusy,
								children: t(lang, "fixIt")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex min-h-11 items-center gap-2 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									checked: d.autoTakt,
									onChange: (e) => d.set({ autoTakt: e.target.checked })
								}), t(lang, "autoTakt")]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "secondary",
								onClick: () => void onSaveRow(),
								disabled: rowBusy,
								children: t(lang, "saveRow")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-2xs text-faint",
								children: t(lang, "spaceHint")
							})
						]
					}),
					d.error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-clip",
						children: d.error
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-2xs tracking-wider text-muted uppercase",
								children: t(lang, "palve")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								value: d.palve,
								onChange: (e) => d.set({ palve: wordClip(e.target.value, 50) }),
								placeholder: t(lang, "palvePh"),
								rows: 2,
								className: "mt-2 w-full rounded-[var(--radius-md)] border border-rule bg-raised p-3 text-sm"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 font-mono text-2xs text-faint",
								children: [
									wordCount(d.palve),
									" / 50 · ",
									t(lang, "palveNote")
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
							label: `${t(lang, "kare")} · ${t(lang, "vEquals")}`,
							value: d.kare,
							min: .15,
							max: 1,
							onChange: (v) => d.set({ kare: v })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 max-w-prose text-xs leading-relaxed text-muted",
							children: t(lang, "kareLead")
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-2xs tracking-wider text-muted uppercase",
								children: t(lang, "autotune")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 grid gap-4 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
									label: t(lang, "amount"),
									value: d.amount,
									min: 0,
									max: 1,
									onChange: (v) => d.set({ amount: v })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
									label: t(lang, "speed"),
									value: d.speed,
									min: .05,
									max: 1,
									onChange: (v) => d.set({ speed: v })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4 flex flex-wrap gap-2",
								children: [
									[0, t(lang, "chromatic")],
									[1, t(lang, "minor")],
									[2, t(lang, "major")]
								].map(([m, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => d.set({ mode: m }),
									className: cn("min-h-11 rounded-[var(--radius-sm)] border px-3 text-sm", d.mode === m ? "border-ink bg-ink text-paper" : "border-rule text-muted"),
									children: label
								}, m))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "nav-scroll mt-3 flex flex-nowrap gap-1 overflow-x-auto",
								children: NOTE_NAMES.map((n, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => d.set({ tonic: i }),
									className: cn("min-h-11 min-w-11 shrink-0 rounded-[var(--radius-sm)] border px-2 font-mono text-2xs", d.tonic === i ? "border-ink bg-ink text-paper" : "border-rule text-muted"),
									children: n
								}, n))
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-2xs tracking-wider text-muted uppercase",
								children: t(lang, "regions")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex flex-wrap gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										variant: "secondary",
										size: "sm",
										onClick: () => void withBusy(snapToGrid, t(lang, "snapGrid")),
										children: t(lang, "snapGrid")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										variant: "secondary",
										size: "sm",
										onClick: () => void withBusy(cutSelected, t(lang, "cutClip")),
										children: t(lang, "cutClip")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										variant: "secondary",
										size: "sm",
										onClick: () => void withBusy(deleteSelected, t(lang, "delClip")),
										children: t(lang, "delClip")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										variant: "secondary",
										size: "sm",
										onClick: () => void withBusy(makeAdlibs, t(lang, "adlibs")),
										children: t(lang, "adlibs")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										variant: "secondary",
										size: "sm",
										onClick: () => void withBusy(makeBacks, t(lang, "backs")),
										children: t(lang, "backs")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										variant: "secondary",
										size: "sm",
										onClick: () => void withBusy(keepBest, t(lang, "keepBest")),
										children: t(lang, "keepBest")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										variant: d.female ? "live" : "secondary",
										size: "sm",
										onClick: () => void setFemale(!d.female),
										children: t(lang, "femaleBank")
									})
								]
							}),
							d.regions.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm text-faint",
								children: t(lang, "noClip")
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "nav-scroll mt-3 overflow-x-auto rounded-[var(--radius-md)] border border-rule",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "relative h-36 min-w-[640px]",
									children: d.regions.map((c) => {
										const span = timelineSpan(d.regions);
										const left = c.offset / span * 100;
										const width = Math.max(3.2, (c.end - c.start) / span * 100);
										const lane = c.kind === "main" ? "top-1" : c.kind === "adlib" ? "top-14" : "top-24";
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => d.set({ selectedId: c.id }),
											className: cn("absolute h-11 overflow-hidden rounded-[var(--radius-sm)] border px-1.5 text-left", lane, c.muted && "opacity-40", d.selectedId === c.id ? "border-ink bg-ink text-paper" : c.kind === "adlib" ? "border-stamp bg-stamp/20 text-ink" : c.kind === "back" ? "border-live bg-live/20 text-ink" : "border-rule bg-ink/15 text-ink"),
											style: {
												left: `${left}%`,
												width: `${width}%`,
												minWidth: "44px"
											},
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "block font-mono text-2xs uppercase",
												children: c.kind
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "font-mono text-2xs tabular-nums",
												children: [(c.end - c.start).toFixed(2), "s"]
											})]
										}, c.id);
									})
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-2xs tracking-wider text-muted uppercase",
								children: t(lang, "genre")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3 flex flex-wrap gap-2",
								children: GENRES.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => void applyGenre(g.id),
									className: cn("min-h-11 rounded-[var(--radius-sm)] border px-3 text-sm", d.genre === g.id ? "border-ink bg-ink text-paper" : "border-rule text-muted"),
									children: fxLabel(lang, g)
								}, g.id))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 font-mono text-2xs tracking-wider text-muted uppercase",
								children: t(lang, "delay")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 flex flex-wrap gap-2",
								children: DELAYS.map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => void setFx(x.id, d.reverb),
									className: cn("min-h-11 rounded-[var(--radius-sm)] border px-3 font-mono text-2xs", d.delay === x.id ? "border-ink bg-ink text-paper" : "border-rule text-muted"),
									children: fxLabel(lang, x)
								}, x.id))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 font-mono text-2xs tracking-wider text-muted uppercase",
								children: t(lang, "reverb")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 flex flex-wrap gap-2",
								children: REVERBS.map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => void setFx(d.delay, x.id),
									className: cn("min-h-11 rounded-[var(--radius-sm)] border px-3 font-mono text-2xs", d.reverb === x.id ? "border-ink bg-ink text-paper" : "border-rule text-muted"),
									children: fxLabel(lang, x)
								}, x.id))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "mt-4 flex min-h-11 items-center gap-2 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									checked: d.applyMix,
									onChange: (e) => {
										d.set({ applyMix: e.target.checked });
										pushParams();
									}
								}), d.applyMix ? t(lang, "applyMix") : t(lang, "drySnap")]
							}),
							d.micLabel ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 font-mono text-2xs text-faint",
								children: d.micLabel
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 grid gap-3 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
									label: t(lang, "delayMix"),
									value: d.delayMix,
									min: 0,
									max: .6,
									onChange: (v) => d.set({ delayMix: v })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
									label: t(lang, "reverbMix"),
									value: d.reverbMix,
									min: 0,
									max: .6,
									onChange: (v) => d.set({ reverbMix: v })
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-2xs tracking-wider text-muted uppercase",
								children: t(lang, "videoTitle")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 max-w-prose text-sm text-muted",
								children: t(lang, "videoLead")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								value: d.videoPrompt,
								onChange: (e) => d.set({ videoPrompt: wordClip(e.target.value, 80) }),
								placeholder: t(lang, "videoPrompt"),
								rows: 3,
								className: "mt-3 w-full rounded-[var(--radius-md)] border border-rule bg-raised p-3 text-sm"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 font-mono text-2xs text-faint tabular-nums",
								children: [wordCount(d.videoPrompt), " / 80"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 font-mono text-2xs tracking-wider text-muted uppercase",
								children: t(lang, "lyrics")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								value: d.lyrics,
								onChange: (e) => d.set({ lyrics: wordClip(e.target.value, 250) }),
								placeholder: t(lang, "lyricsPh"),
								rows: 5,
								className: "mt-2 w-full rounded-[var(--radius-md)] border border-rule bg-raised p-3 text-sm"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 font-mono text-2xs text-faint tabular-nums",
								children: [wordCount(d.lyrics), " / 250"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex flex-wrap gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										variant: "secondary",
										size: "sm",
										onClick: () => mediaRef.current?.click(),
										children: t(lang, "loadMedia")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										variant: "secondary",
										size: "sm",
										onClick: () => void onVideo(),
										disabled: d.videoBusy,
										children: d.videoBusy ? t(lang, "videoBusy") : t(lang, "videoGo")
									}),
									mediaFiles.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "font-mono text-2xs text-faint",
										children: [mediaFiles.length, " faili"]
									}) : null
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								ref: mediaRef,
								type: "file",
								accept: "image/*,video/*",
								multiple: true,
								className: "hidden",
								onChange: (e) => {
									setMediaFiles(Array.from(e.target.files ?? []).slice(0, 8));
									e.target.value = "";
								}
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "min-w-0 rounded-[var(--radius-lg)] border border-rule bg-raised/60 p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SteelOled, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs leading-relaxed text-faint",
						children: t(lang, "oledNote")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 font-mono text-2xs tracking-wider text-muted uppercase",
						children: t(lang, "analytics")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 space-y-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MeterBar, {
							label: t(lang, "peak"),
							unit: `${peakDb} dBFS`,
							value: d.peak,
							clip: d.peak > .95
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MeterBar, {
							label: t(lang, "loud"),
							unit: `${d.lufs.toFixed(1)} LUFS`,
							value: loudN,
							clip: d.lufs > -9
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 grid grid-cols-2 gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: t(lang, "detected"),
								value: pitchLabel(d.pitch),
								unit: `${d.pitch.toFixed(0)} Hz`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: t(lang, "bpm"),
								value: `${d.bpm}`,
								unit: "BPM"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: t(lang, "duck"),
								value: duckDb,
								unit: "dB"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: t(lang, "clips"),
								value: `${d.clips}`,
								unit: "tun"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
								label: t(lang, "slotBeat"),
								value: d.beatGain,
								min: 0,
								max: 1.2,
								onChange: (v) => d.set({ beatGain: v })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
								label: t(lang, "slotVocal"),
								value: d.vocalGain,
								min: 0,
								max: 1.2,
								onChange: (v) => d.set({ vocalGain: v })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
								label: t(lang, "glue"),
								value: d.glue,
								min: 0,
								max: 1,
								onChange: (v) => d.set({ glue: v })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
								label: t(lang, "fade"),
								value: d.fade,
								min: .004,
								max: .25,
								onChange: (v) => d.set({ fade: v })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
								label: t(lang, "drive"),
								value: d.drive,
								min: 0,
								max: 1,
								onChange: (v) => d.set({ drive: v })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
								label: t(lang, "ceiling"),
								value: d.ceiling,
								min: .5,
								max: .99,
								onChange: (v) => d.set({ ceiling: v })
							})
						]
					}),
					d.aiNote ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 text-sm leading-relaxed text-muted",
						children: d.aiNote
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 border-t border-rule pt-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-2xs tracking-wider text-muted uppercase",
							children: t(lang, "rows")
						}), rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-faint",
							children: t(lang, "noRows")
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-2 divide-y divide-rule",
							children: rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-center justify-between gap-2 py-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate text-sm",
										children: row.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "font-mono text-2xs text-faint tabular-nums",
										children: ["#", row.id]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: "ghost",
									size: "sm",
									onClick: () => loadRow(row),
									children: t(lang, "loadRow")
								})]
							}, row.id))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 text-xs leading-relaxed text-faint",
						children: t(lang, "fxNote")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-xs leading-relaxed text-faint",
						children: t(lang, "tuumNote")
					})
				]
			})
		]
	});
}
function MeterBar({ label, unit, value, clip }) {
	const n = Math.min(1, Math.max(0, value));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex justify-between font-mono text-2xs",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "tracking-wider text-muted uppercase",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("tabular-nums", clip ? "text-clip" : "text-ink"),
			children: unit
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-1 h-1.5 overflow-hidden rounded-full bg-rule",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("h-full origin-left rounded-full transition-transform duration-[var(--motion-quick)] ease-[var(--ease-out)]", clip ? "bg-clip" : "bg-live"),
			style: { transform: `scaleX(${n})` }
		})
	})] });
}
function SlotCard({ lang, title, name, onPick, pickLabel, extra }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-[var(--radius-md)] border border-rule bg-raised/40 p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-2xs tracking-wider text-steel uppercase",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 truncate text-sm",
				children: name ?? t(lang, "emptySlot")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "secondary",
					size: "sm",
					onClick: onPick,
					children: pickLabel
				}), extra]
			})
		]
	});
}
function Stat({ label, value, unit }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-[var(--radius-md)] border border-rule px-3 py-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-2xs tracking-wider text-muted uppercase",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 font-display text-2xl tabular-nums leading-none",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 font-mono text-2xs text-faint",
				children: unit
			})
		]
	});
}
function Slider({ label, value, min, max, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex justify-between font-mono text-2xs text-muted",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "tracking-wider uppercase",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "tabular-nums text-ink",
				children: value.toFixed(2)
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type: "range",
			min,
			max,
			step: (max - min) / 200,
			value,
			onChange: (e) => onChange(Number(e.target.value)),
			className: "mt-1 w-full accent-live"
		})]
	});
}
var HOSTS = [
	{
		id: "fl",
		name: "FL Studio",
		since: "20.8 MIDI engine (the line you called FL 17+) · 21+ current",
		clock: "Link optional · internal 24 ppq",
		midi: [
			"Options → MIDI → Enable MIDI input / output",
			"Controller type: generic controller. Sync: send MIDI clock if Steel is master",
			"Route Steel MIDI Out to an FL input (loopMIDI on Windows, a2jmidid on Linux)",
			"Mixer: insert Steel as an audio input via ASIO4ALL / PipeASIO, not WASAPI shared"
		],
		steps: [
			"Install ASIO4ALL 2.22 (Windows) or PipeWire JACK (Linux).",
			"Audio settings → Device: ASIO4ALL v2 / PipeASIO. Buffer 128–256 at 48 kHz.",
			"Create a loopback MIDI port named STEEL.",
			"In Steel, pick that port. Notes hit MIDI poly; clock follows the transport."
		],
		map: [
			{
				cc: 1,
				dest: "Mod → sat amount"
			},
			{
				cc: 7,
				dest: "Master"
			},
			{
				cc: 10,
				dest: "Input trim"
			},
			{
				cc: 74,
				dest: "EQ high"
			},
			{
				cc: 71,
				dest: "EQ mid"
			},
			{
				cc: 76,
				dest: "High-pass Hz"
			}
		]
	},
	{
		id: "ableton",
		name: "Ableton Live 12",
		since: "Live 12.0 · Extensions SDK 12.4.5+",
		clock: "Ableton Link when the host is on ASIO / PipeASIO",
		midi: [
			"Settings → Link, Tempo & MIDI → MIDI Ports: track / sync in+out on the STEEL port",
			"Control Surface: None (Steel speaks CCs) or a generated v3 remote script",
			"Extensions SDK (Suite 12.4.5+) can open Steel as a right-click tool; MIDI still carries transport",
			"Linux: enable Link only after PipeASIO is the audio device"
		],
		steps: [
			"Audio → Driver Type: ASIO. Device: ASIO4ALL v2 (Win) or PipeASIO (Linux).",
			"Buffer 128 at 48 kHz for tracking; 256 for large sessions.",
			"Arm Link if other peers need the same clock. Steel follows MIDI clock when present.",
			"Map CCs below — Steel applies them live on the kernel."
		],
		map: [
			{
				cc: 1,
				dest: "Mod → sat amount"
			},
			{
				cc: 7,
				dest: "Master"
			},
			{
				cc: 16,
				dest: "Compressor threshold"
			},
			{
				cc: 17,
				dest: "EQ low"
			},
			{
				cc: 18,
				dest: "EQ mid"
			},
			{
				cc: 19,
				dest: "EQ high"
			}
		]
	},
	{
		id: "generic",
		name: "Any ASIO host",
		since: "ASIO 2.x · Reaper, Bitwig, Cubase, Studio One, Mixbus",
		clock: "MIDI clock in · Link only if the host is on ASIO / PipeASIO",
		midi: [
			"Create a loopback port named STEEL (loopMIDI, rtpMIDI, or a2jmidid)",
			"Enable that port as a MIDI input on Steel and as an output in the host",
			"Do not use WASAPI / DirectSound / Pulse shared mode for the round-trip"
		],
		steps: [
			"Windows: ASIO4ALL 2.22 as the device if the interface has no vendor ASIO.",
			"Linux: PipeWire JACK or PipeASIO. Wine 7.5+ for Windows-only hosts.",
			"Match sample rate with Steel (48 kHz default). Buffer 128–256.",
			"Send notes and CCs to Steel; tap Web out if another page needs the stream."
		],
		map: [
			{
				cc: 1,
				dest: "Mod → sat amount"
			},
			{
				cc: 7,
				dest: "Master"
			},
			{
				cc: 10,
				dest: "Input trim"
			},
			{
				cc: 16,
				dest: "Compressor threshold"
			}
		]
	}
];
function SteelHosts() {
	const host = useSteel((s) => s.host);
	const os = useSteel((s) => s.os);
	const lang = useSteel((s) => s.lang);
	const patch = useSteel((s) => s.patch);
	const profile = HOSTS.find((h) => h.id === host) ?? HOSTS[0];
	const osRow = OS_MATRIX.find((o) => o.id === os) ?? OS_MATRIX[1];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "min-w-0",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-2xs tracking-[0.2em] text-steel uppercase",
					children: t(lang, "placeHost")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 text-3xl",
					children: t(lang, "hostTitle")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-prose text-sm text-muted",
					children: t(lang, "hostMirror")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5 flex flex-wrap gap-2",
					children: HOSTS.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => patch({ host: h.id }),
						className: cn("min-h-11 rounded-[var(--radius-sm)] border px-3 py-2 text-sm", host === h.id ? "border-ink bg-ink text-paper" : "border-rule text-muted hover:text-ink"),
						children: h.name
					}, h.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm text-muted",
					children: profile.since
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: profile.clock
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-6 space-y-3",
					children: profile.steps.map((step, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "border-t border-rule pt-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-2xs text-steel",
							children: String(i + 1).padStart(2, "0")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm",
							children: step
						})]
					}, step))
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-2xs tracking-[0.2em] text-muted uppercase",
				children: "Operating system"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 flex flex-wrap gap-2",
				children: OS_MATRIX.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => patch({ os: row.id }),
					className: cn("min-h-11 rounded-[var(--radius-sm)] border px-3 py-2 text-sm", os === row.id ? "border-ink bg-ink text-paper" : "border-rule text-muted hover:text-ink"),
					children: row.label
				}, row.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 rounded-[var(--radius-md)] border border-rule bg-raised/50 p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-2xs tracking-wider text-live uppercase",
					children: osRow.driver
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm leading-relaxed text-muted",
					children: osRow.note
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 font-mono text-2xs tracking-wider text-muted uppercase",
				children: "CC map"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("table", {
				className: "mt-2 w-full text-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: profile.map.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-b border-rule/80",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
						className: "py-2 font-mono text-steel",
						children: ["CC ", row.cc]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "py-2 text-muted",
						children: row.dest
					})]
				}, row.cc)) })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-6 space-y-2 text-sm text-muted",
				children: profile.midi.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: line }, line))
			})
		] })]
	});
}
var PLUGIN_IDS = [
	"edge-cut",
	"mud-void",
	"presence-iron",
	"sat-plate",
	"air-well"
];
var r = (id, name, lane, noteEt, noteEn, curve) => ({
	id,
	name,
	lane,
	noteEt,
	noteEn,
	curve
});
/** Original STEEL banks — style recipes, not artist clones. */
var BANKS = [
	r("glasswire", "GLASSWIRE", "rap", "Õhuline auto, kõrge sosin, digiruum.", "Airy auto, high whisper, digital space.", {
		hp: 90,
		scoopHz: 280,
		scoopDb: -3.5,
		presenceHz: 3400,
		presenceDb: 4.2,
		airHz: 9e3,
		airDb: 2.4,
		sat: .12,
		delay: .22,
		space: .38,
		retune: .018,
		amount: .86,
		formant: 1.12,
		width: .62,
		dirt: .22,
		clear: .7,
		key: 9,
		scale: "minor",
		genre: "trap"
	}),
	r("graveink", "GRAVEINK", "rap", "Tume lõuna, tükeldatud 808, porine vokaal.", "Dark south, chopped 808, grimy vocal.", {
		hp: 70,
		scoopHz: 320,
		scoopDb: -1.5,
		presenceHz: 2200,
		presenceDb: 2.2,
		airHz: 7e3,
		airDb: -.8,
		sat: .42,
		delay: .08,
		space: .22,
		retune: .08,
		amount: .45,
		formant: .92,
		width: .38,
		dirt: .78,
		clear: .28,
		key: 4,
		scale: "minor",
		genre: "trap"
	}),
	r("blockiron", "BLOCKIRON", "rap", "Kõva 808, tänava takt, kuiv kesk.", "Hard 808, street takt, dry mid.", {
		hp: 80,
		scoopHz: 250,
		scoopDb: -2.8,
		presenceHz: 2800,
		presenceDb: 3.6,
		airHz: 8200,
		airDb: .6,
		sat: .28,
		delay: .12,
		space: .16,
		retune: .05,
		amount: .58,
		formant: 1,
		width: .44,
		dirt: .55,
		clear: .48,
		key: 7,
		scale: "minor",
		genre: "rap"
	}),
	r("nightvein", "NIGHTVEIN", "rap", "Öine moll, märg ruum, pikk saba.", "Night minor, wet space, long tail.", {
		hp: 85,
		scoopHz: 360,
		scoopDb: -2.2,
		presenceHz: 3100,
		presenceDb: 3,
		airHz: 1e4,
		airDb: 3.2,
		sat: .16,
		delay: .34,
		space: .55,
		retune: .06,
		amount: .72,
		formant: 1.08,
		width: .7,
		dirt: .32,
		clear: .62,
		key: 2,
		scale: "minor",
		genre: "trap"
	}),
	r("razorlung", "RAZORLUNG", "rap", "Moonutatud kops, lai, metalliline serv.", "Distorted lung, wide, metallic edge.", {
		hp: 110,
		scoopHz: 400,
		scoopDb: -4,
		presenceHz: 3800,
		presenceDb: 5.5,
		airHz: 11e3,
		airDb: 1.8,
		sat: .72,
		delay: .1,
		space: .28,
		retune: .03,
		amount: .64,
		formant: .84,
		width: .78,
		dirt: .88,
		clear: .22,
		key: 11,
		scale: "phrygian",
		genre: "trap"
	}),
	r("rapidlock", "RAPIDLOCK", "rap", "Tihe siseriim, kuiv ette, lühike delay.", "Dense internal rhyme, dry-forward, short delay.", {
		hp: 95,
		scoopHz: 300,
		scoopDb: -3.2,
		presenceHz: 3600,
		presenceDb: 4.8,
		airHz: 8500,
		airDb: 1.1,
		sat: .14,
		delay: .14,
		space: .12,
		retune: .04,
		amount: .38,
		formant: 1,
		width: .32,
		dirt: .18,
		clear: .82,
		key: 0,
		scale: "minor",
		genre: "rap"
	}),
	r("queenscold", "QUEENSCOLD", "rap", "Boom bap, tolmune, napp ruum.", "Boom bap, dusty, sparse room.", {
		hp: 75,
		scoopHz: 270,
		scoopDb: -1.8,
		presenceHz: 2400,
		presenceDb: 2.8,
		airHz: 6500,
		airDb: -.4,
		sat: .24,
		delay: .06,
		space: .18,
		retune: .14,
		amount: .22,
		formant: .96,
		width: .28,
		dirt: .6,
		clear: .4,
		key: 5,
		scale: "minor",
		genre: "rap"
	}),
	r("westgrid", "WESTGRID", "rap", "Rääkiv-laul, terav kohalolu, ründav.", "Talk-sung, sharp presence, aggressive.", {
		hp: 88,
		scoopHz: 310,
		scoopDb: -2.4,
		presenceHz: 3e3,
		presenceDb: 4,
		airHz: 7800,
		airDb: .8,
		sat: .22,
		delay: .1,
		space: .14,
		retune: .07,
		amount: .34,
		formant: 1.04,
		width: .4,
		dirt: .48,
		clear: .55,
		key: 7,
		scale: "minor",
		genre: "rap"
	}),
	r("highwire", "HIGHWIRE", "rap", "Kõrge nina, bounce, lühike noot.", "High nasal, bounce, short notes.", {
		hp: 120,
		scoopHz: 340,
		scoopDb: -3.8,
		presenceHz: 4200,
		presenceDb: 5,
		airHz: 9200,
		airDb: 1.6,
		sat: .18,
		delay: .16,
		space: .2,
		retune: .035,
		amount: .5,
		formant: 1.18,
		width: .48,
		dirt: .35,
		clear: .6,
		key: 9,
		scale: "major",
		genre: "rap"
	}),
	r("vowfire", "VOWFIRE", "rap", "Pikk noot, soe kesk, õhuline saba.", "Long notes, warm mid, airy tail.", {
		hp: 70,
		scoopHz: 240,
		scoopDb: -2,
		presenceHz: 2600,
		presenceDb: 3.4,
		airHz: 8800,
		airDb: 2.8,
		sat: .2,
		delay: .2,
		space: .42,
		retune: .16,
		amount: .4,
		formant: .98,
		width: .52,
		dirt: .3,
		clear: .68,
		key: 2,
		scale: "minor",
		genre: "rap"
	}),
	r("eastmirror", "EASTMIRROR", "rap", "Mellic moll, raske auto, peegelruum.", "Melodic minor, heavy auto, mirror space.", {
		hp: 92,
		scoopHz: 300,
		scoopDb: -2.6,
		presenceHz: 3300,
		presenceDb: 3.8,
		airHz: 9600,
		airDb: 2.6,
		sat: .15,
		delay: .28,
		space: .48,
		retune: .022,
		amount: .9,
		formant: 1.06,
		width: .66,
		dirt: .26,
		clear: .74,
		key: 4,
		scale: "minor",
		genre: "trap"
	}),
	r("punchgale", "PUNCHGALE", "hard", "Euforiline reverse, lai vokaal, 150.", "Euphoric reverse, wide vocal, 150.", {
		hp: 100,
		scoopHz: 380,
		scoopDb: -3,
		presenceHz: 3500,
		presenceDb: 4.4,
		airHz: 10500,
		airDb: 3,
		sat: .26,
		delay: .18,
		space: .4,
		retune: .05,
		amount: .7,
		formant: 1.1,
		width: .72,
		dirt: .28,
		clear: .72,
		key: 7,
		scale: "major",
		genre: "hardstyle"
	}),
	r("ironcrest", "IRONCREST", "hard", "Screech-anthem, pitch-üles, raud.", "Screech anthem, pitch-up, iron.", {
		hp: 105,
		scoopHz: 400,
		scoopDb: -3.4,
		presenceHz: 3700,
		presenceDb: 5,
		airHz: 11200,
		airDb: 2.2,
		sat: .34,
		delay: .14,
		space: .32,
		retune: .04,
		amount: .76,
		formant: 1.14,
		width: .68,
		dirt: .4,
		clear: .6,
		key: 11,
		scale: "minor",
		genre: "hardstyle"
	}),
	r("icefound", "ICEFOUND", "hard", "Toores/euforiline hübriid, formant.", "Raw/euphoric hybrid, formant.", {
		hp: 108,
		scoopHz: 360,
		scoopDb: -3.6,
		presenceHz: 3900,
		presenceDb: 4.6,
		airHz: 10800,
		airDb: 1.8,
		sat: .4,
		delay: .12,
		space: .3,
		retune: .03,
		amount: .8,
		formant: .9,
		width: .6,
		dirt: .52,
		clear: .5,
		key: 9,
		scale: "minor",
		genre: "rawstyle"
	}),
	r("warplate", "WARPLATE", "hard", "Toored kickid, tööstuslik plaat.", "Raw kicks, industrial plate.", {
		hp: 95,
		scoopHz: 280,
		scoopDb: -2,
		presenceHz: 2500,
		presenceDb: 3.2,
		airHz: 8e3,
		airDb: .4,
		sat: .55,
		delay: .08,
		space: .18,
		retune: .09,
		amount: .42,
		formant: .88,
		width: .36,
		dirt: .82,
		clear: .24,
		key: 4,
		scale: "phrygian",
		genre: "rawstyle"
	}),
	r("fistcore", "FISTCORE", "hard", "Gabber-serv, kõva lagi, lühike.", "Gabber edge, hard ceiling, short.", {
		hp: 115,
		scoopHz: 420,
		scoopDb: -4.2,
		presenceHz: 4100,
		presenceDb: 5.2,
		airHz: 9e3,
		airDb: .2,
		sat: .68,
		delay: .05,
		space: .1,
		retune: .06,
		amount: .48,
		formant: .86,
		width: .3,
		dirt: .9,
		clear: .18,
		key: 0,
		scale: "chromatic",
		genre: "rawstyle"
	}),
	r("rawhive", "RAWHIVE", "hard", "Rawstyle drive, kärg, kitsas kick.", "Rawstyle drive, hive, tight kick.", {
		hp: 102,
		scoopHz: 340,
		scoopDb: -3.1,
		presenceHz: 3600,
		presenceDb: 4,
		airHz: 9800,
		airDb: 1.2,
		sat: .48,
		delay: .1,
		space: .22,
		retune: .045,
		amount: .66,
		formant: .94,
		width: .5,
		dirt: .7,
		clear: .38,
		key: 7,
		scale: "minor",
		genre: "rawstyle"
	}),
	r("altarraw", "ALTARRAW", "hard", "Tume raw, altar, madal õhk.", "Dark raw, altar, low air.", {
		hp: 90,
		scoopHz: 260,
		scoopDb: -2.2,
		presenceHz: 2700,
		presenceDb: 3.5,
		airHz: 7400,
		airDb: -.6,
		sat: .5,
		delay: .16,
		space: .26,
		retune: .055,
		amount: .6,
		formant: .91,
		width: .46,
		dirt: .76,
		clear: .3,
		key: 3,
		scale: "phrygian",
		genre: "rawstyle"
	}),
	r("zancut", "ZANCUT", "hard", "Klassikaline hardstyle lead, lõige.", "Classic hardstyle lead, cut.", {
		hp: 98,
		scoopHz: 370,
		scoopDb: -2.8,
		presenceHz: 3400,
		presenceDb: 4.3,
		airHz: 10200,
		airDb: 2,
		sat: .3,
		delay: .15,
		space: .28,
		retune: .05,
		amount: .68,
		formant: 1.05,
		width: .58,
		dirt: .36,
		clear: .64,
		key: 5,
		scale: "major",
		genre: "hardstyle"
	}),
	r("nightpeak", "NIGHTPEAK", "hard", "Peak-time techno, öine lagi.", "Peak-time techno, night ceiling.", {
		hp: 85,
		scoopHz: 300,
		scoopDb: -2.5,
		presenceHz: 2900,
		presenceDb: 3.3,
		airHz: 8600,
		airDb: 1.4,
		sat: .38,
		delay: .09,
		space: .2,
		retune: .1,
		amount: .3,
		formant: .97,
		width: .42,
		dirt: .58,
		clear: .46,
		key: 2,
		scale: "minor",
		genre: "techno"
	})
];
Object.fromEntries(BANKS.map((b) => [b.id, b]));
var NIGHT_HEAR_FIRST = [
	"TAKT-LOCK",
	"ENERGY-MATCH",
	"STEREO-MX"
];
var EXTRA_IDS = [
	"MI44OR-5GEM",
	"WHISP3RER",
	"DIRT-COL",
	"CLEAR-COL",
	"THEORY-SPINE",
	"ENERGY-MATCH",
	"TAKT-LOCK",
	"GYRATOR-AIR",
	"PRESHAPE-SAT",
	"STEREO-MX"
];
function clamp10(n) {
	return Math.max(0, Math.min(10, Math.round(n * 10) / 10));
}
function buildSpine(opts) {
	const curve = opts.curve;
	const dirt = curve ? curve.dirt * (.5 + opts.dirtBias * .5) : .4;
	const clear = curve ? curve.clear * (1.2 - opts.dirtBias * .4) : .55;
	const bpm = opts.bpm;
	const genre = opts.genre;
	const paste = opts.paste.trim();
	const night = Boolean(opts.nightLane);
	const extras = [
		{
			id: "MI44OR-5GEM",
			action: "Five-generation analog mirror on the same container.",
			on: true,
			intensity: clamp10(night ? 6.5 : 6 + (curve?.sat ?? 0) * 4),
			why: night ? "VEC-WDF · keep / even body / odd edge / rounded HF / mid stability." : "Target 5x body vs a free EQ dump."
		},
		{
			id: "WHISP3RER",
			action: "Bit-aware dither in unused slack. No format change.",
			on: true,
			intensity: night ? 4 : clamp10(4 + clear * 3),
			why: night ? "TPDF-DECORR · intensity 4. No payload." : "Keeps the source bit depth honest."
		},
		{
			id: "DIRT-COL",
			action: "Saturation topology from the dirt score.",
			on: dirt > .12,
			intensity: night ? clamp10(Math.max(1, Math.min(4, dirt * 10))) : clamp10(dirt * 10),
			why: night ? "CHEBY · dirt 1–4 on the loud stack." : paste || "Rulebreaker dirt kept as a target."
		},
		{
			id: "CLEAR-COL",
			action: "Subtractive mud/harsh cuts before any boost.",
			on: clear > .35 || night,
			intensity: clamp10(night ? Math.max(5, clear * 10) : clear * 10),
			why: night ? "ERB-CUT · quiet-lead pocket 2.5–5 kHz." : "Cut before boost — analog-mirror law."
		},
		{
			id: "THEORY-SPINE",
			action: "Reusable recipe from pulse, takt, chroma.",
			on: true,
			intensity: 8,
			why: night ? `${genre} @ ${bpm} · quiet lead / loud stack` : `${genre} @ ${bpm}`
		},
		{
			id: "ENERGY-MATCH",
			action: "Crest and transient density aimed at the bank.",
			on: true,
			intensity: clamp10(5 + (curve?.sat ?? .3) * 5),
			why: night ? "SHAPE-GAIN · loudness does not restyle the house." : opts.bank?.name ?? "desk energy"
		},
		{
			id: "TAKT-LOCK",
			action: genre === "rap" || genre === "trap" ? "Trap/boom bar grid for rhyme-lock." : "Four-on-the-floor grid.",
			on: true,
			intensity: night ? 8 : 7,
			why: night ? `${bpm} BPM · PD-MAG. JND-ASYNC only if stack sits off the kit.` : `${bpm} BPM`
		},
		{
			id: "GYRATOR-AIR",
			action: "Circuit-like high shelf, not a drawn curve.",
			on: (curve?.airDb ?? 0) > 0 || night,
			intensity: clamp10(night ? 3.5 : 4 + (curve?.airDb ?? 0)),
			why: night ? "SVF-GYR · air on the lead." : "Air well plugin."
		},
		{
			id: "PRESHAPE-SAT",
			action: "Pull harsh bands out before the saturator.",
			on: true,
			intensity: clamp10(night ? 6.5 : 5 + (curve?.presenceDb ?? 3) * .4),
			why: night ? "PRE-POST · 2.5–5 kHz out of sat on the quiet lead." : "Stops hash on SAT-PLATE."
		},
		{
			id: "STEREO-MX",
			action: night ? "EQUAL on the quiet lead. MODERN on the louder stack." : (curve?.width ?? .5) > .55 ? "MODERN L/R matrix." : "EQUAL L/R matrix.",
			on: true,
			intensity: clamp10(night ? 6 : (curve?.width ?? .5) * 10),
			why: night ? "IACC-SAFE · EQUAL lead / MODERN stack." : "4D width after the melt."
		}
	];
	const hearFirst = night ? [...NIGHT_HEAR_FIRST] : extras.slice().sort((a, b) => Number(b.on) - Number(a.on) || b.intensity - a.intensity).slice(0, 3).map((e) => e.id);
	return {
		pulse: `${bpm} BPM · ${genre === "rap" ? "4/4 boom-trap" : "4/4 floor"}`,
		takt: genre === "rap" || genre === "trap" ? "stress 1+3, 808 on 1" : "kick every quarter",
		pitchHouse: curve ? `key ${curve.key} ${curve.scale}` : "unknown — no bank loaded",
		fn: genre === "hardstyle" ? "drop-dominant loop" : "no-cadence loop",
		tension: dirt > .6 ? "held dissonance, late release" : "short release",
		chroma: clear > dirt ? "bright / mid-forward" : "dark / low-forward",
		crest: dirt > .7 ? "low crest, dense body" : "higher crest, clicky transients",
		transient: genre.includes("style") || genre === "techno" ? "clicky / gated" : "rounded",
		harmonicDirt: dirt > .5 ? "odd harmonics, tape smear" : "clean odd, light sat",
		form: "intro / hook gravity / drop / outro",
		dirt: Math.max(0, Math.min(1, dirt)),
		clear: Math.max(0, Math.min(1, clear)),
		extras,
		hearFirst
	};
}
/** 10 extras × 20 banks + 10 extras × 5 plugins = 250 OS-target cells. Each cell has 3 places. */
var ATLAS_BANKS = BANKS.length;
var ATLAS_PLUGINS = PLUGIN_IDS.length;
var ATLAS_EXTRAS = EXTRA_IDS.length;
var ATLAS_COUNT = ATLAS_EXTRAS * ATLAS_BANKS + ATLAS_EXTRAS * ATLAS_PLUGINS;
function placesFor(extra, target) {
	const lane = EXPANSIONS.find((e) => e.extra === extra) ?? EXPANSIONS[0];
	const tag = target.toUpperCase();
	return {
		os: `${lane.os} · ${tag}`,
		web: `${lane.web} · ${tag}`,
		host: `${lane.host} · ${tag}`
	};
}
function buildAtlas() {
	const cells = [];
	let i = 1;
	for (const extra of EXTRA_IDS) for (const bank of BANKS) cells.push({
		i: i++,
		extra,
		kind: "bank",
		target: bank.id,
		...placesFor(extra, bank.id)
	});
	for (const extra of EXTRA_IDS) for (const plugin of PLUGIN_IDS) cells.push({
		i: i++,
		extra,
		kind: "plugin",
		target: plugin,
		...placesFor(extra, plugin)
	});
	return cells;
}
var ATLAS = buildAtlas();
if (ATLAS.length !== 250 || ATLAS_COUNT !== 250) throw new Error(`OS-target atlas must be 250 cells, got ${ATLAS.length}`);
function SteelAtlas({ compact = false }) {
	const [extra, setExtra] = (0, import_react.useState)(EXTRA_IDS[0]);
	const pins = useRack((s) => s.pins);
	const togglePin = useRack((s) => s.togglePin);
	const cells = (0, import_react.useMemo)(() => ATLAS.filter((c) => c.extra === extra), [extra]);
	const loaded = {
		os: pins.os.length,
		web: pins.web.length,
		host: pins.host.length
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-w-0 max-w-full",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "font-display text-3xl tabular-nums leading-none",
				children: [ATLAS_COUNT, " × 3"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 font-mono text-2xs tracking-wider text-muted uppercase",
				children: "OS-target · 10 extras × 20 banks + 5 plugins · pin per place"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 grid grid-cols-3 gap-2",
				children: PLACES.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-[var(--radius-sm)] border border-rule px-2 py-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-2xs tracking-wider text-muted uppercase",
						children: p.id
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 font-display text-xl tabular-nums leading-none",
						children: [loaded[p.id], /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-mono text-2xs text-faint",
							children: [" / ", ATLAS_COUNT]
						})]
					})]
				}, p.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "nav-scroll mt-3 flex max-w-full flex-nowrap gap-1 overflow-x-auto",
				children: EXTRA_IDS.map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setExtra(id),
					className: cn("min-h-11 shrink-0 rounded-[var(--radius-sm)] border px-2 font-mono text-2xs uppercase", extra === id ? "border-ink bg-ink text-paper" : "border-rule text-muted"),
					children: id
				}, id))
			}),
			compact ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 font-mono text-2xs text-faint",
				children: [
					cells.length,
					" cells on ",
					extra,
					" · click OS / WEB / HOST to pin"
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 max-h-80 divide-y divide-rule overflow-auto border-y border-rule",
				children: cells.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex min-w-0 flex-wrap items-center gap-2 py-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "w-8 font-mono text-2xs tabular-nums text-faint",
							children: c.i
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "w-20 truncate font-mono text-2xs uppercase text-muted",
							children: c.target
						}),
						[
							"os",
							"web",
							"host"
						].map((place) => {
							const on = pins[place].includes(c.i);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-pressed": on,
								onClick: () => togglePin(place, c.i),
								className: cn("min-h-11 min-w-11 rounded-[var(--radius-sm)] border px-2 font-mono text-2xs uppercase", on ? "border-ink bg-ink text-paper" : "border-rule text-muted"),
								children: place
							}, place);
						})
					]
				}, c.i))
			})
		]
	});
}
function SteelKernel() {
	const kernel = useSteel((s) => s.kernel);
	const latest = useSteel((s) => s.latest);
	const updating = useSteel((s) => s.updating);
	const addons = useSteel((s) => s.addons);
	const armed = useSteel((s) => s.armed);
	const lang = useSteel((s) => s.lang);
	const pins = useRack((s) => s.pins);
	const [man, setMan] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		checkChannel().then(setMan).catch((err) => toast.error(err instanceof Error ? err.message : "Channel down"));
	}, []);
	const behind = latest != null && !versionGte(kernel, latest);
	const pinned = pins.os.length + pins.web.length + pins.host.length;
	async function apply() {
		if (!latest) return;
		await applyKernel(latest);
		toast.success(`Kernel ${latest} on this host`);
		const next = await checkChannel();
		setMan(next);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid min-w-0 gap-10 lg:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "min-w-0",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-2xs tracking-[0.2em] text-steel uppercase",
					children: t(lang, "osKicker")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "mt-2 text-3xl",
					children: ["Kernel ", kernel]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-muted",
					children: t(lang, "studioNote")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5 grid grid-cols-3 gap-2",
					children: PLACES.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 rounded-[var(--radius-md)] border border-rule px-3 py-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-2xs tracking-wider text-muted uppercase",
								children: p.id
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm",
								children: lang === "et" ? p.et : lang === "ru" ? p.ru : p.en
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 font-display text-xl tabular-nums leading-none",
								children: [pins[p.id].length, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-mono text-2xs text-faint",
									children: [" / ", ATLAS_COUNT]
								})]
							})
						]
					}, p.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "mt-6 grid grid-cols-2 gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-[var(--radius-md)] border border-rule px-3 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "font-mono text-2xs tracking-wider text-muted uppercase",
							children: armed ? "Armed" : "Idle"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "mt-1 font-display text-2xl",
							children: kernel
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-[var(--radius-md)] border border-rule px-3 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "font-mono text-2xs tracking-wider text-muted uppercase",
							children: "250 × 3"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "mt-1 font-display text-2xl",
							children: pinned
						})]
					})]
				}),
				man?.hosts ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 font-mono text-2xs text-muted",
					children: [
						"FL ",
						man.hosts.fl,
						" · Live ",
						man.hosts.ableton,
						" · Win ",
						man.hosts.windows,
						" · Linux ",
						man.hosts.linux
					]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 font-mono text-2xs text-faint",
					children: ["ASIO4ALL ", man?.asio4all ?? "2.22"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "secondary",
						onClick: () => void checkChannel().then(setMan),
						children: "Check channel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "live",
						disabled: !behind || updating,
						onClick: () => void apply(),
						children: updating ? "Reforming…" : behind ? `Apply ${latest}` : "Up to date"
					})]
				}),
				man ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm text-muted",
					children: man.notes
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-8 font-mono text-2xs tracking-wider text-muted uppercase",
					children: t(lang, "expandTitle")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-prose text-sm text-muted",
					children: t(lang, "expandLead")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 divide-y divide-rule border-y border-rule",
					children: EXPANSIONS.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "grid min-w-0 grid-cols-[6.5rem_minmax(0,1fr)] gap-2 py-2 font-mono text-2xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate uppercase",
							children: e.extra
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "min-w-0 truncate text-faint",
							children: [
								"OS ",
								e.os,
								" · WEB ",
								e.web,
								" · HOST ",
								e.host
							]
						})]
					}, e.extra))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 font-mono text-2xs tracking-wider text-muted uppercase",
					children: t(lang, "addonTitle")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 divide-y divide-rule border-y border-rule",
					children: (man?.addons ?? []).map((addon) => {
						const allowed = versionGte(kernel, addon.minKernel);
						const on = Boolean(addons[addon.id]);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-baseline justify-between gap-3 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: addon.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-mono text-2xs text-muted",
								children: [
									addon.version,
									" · min kernel ",
									addon.minKernel
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-2xs tracking-wider uppercase text-muted",
								children: !allowed ? "locked" : on ? "live" : "off"
							})]
						}, addon.id);
					})
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "min-w-0",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-2xs tracking-wider text-muted uppercase",
					children: t(lang, "atlasTitle")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-prose text-sm text-muted",
					children: t(lang, "atlasLead")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SteelAtlas, {})
				})
			]
		})]
	});
}
var FORMATS = [
	{
		id: "pdf",
		label: "PDF",
		icon: ScrollText
	},
	{
		id: "docx",
		label: "Word",
		icon: FileText
	},
	{
		id: "xlsx",
		label: "Excel",
		icon: FileSpreadsheet
	},
	{
		id: "pptx",
		label: "Slides",
		icon: Presentation
	}
];
async function runExport(id, report) {
	switch (id) {
		case "pdf": return (await import("./pdf-B7GqgE53.mjs")).exportPdf(report);
		case "docx": return (await import("./docx-AOv7S6rK.mjs")).exportDocx(report);
		case "xlsx": return (await import("./xlsx-CK8CnTFs.mjs")).exportXlsx(report);
		case "pptx": return (await import("./pptx-CyFyZ8cb.mjs")).exportPptx(report);
		default: throw new Error("Unknown export");
	}
}
function ExportMenu({ report }) {
	const [busy, setBusy] = (0, import_react.useState)(null);
	async function handle(id, label) {
		setBusy(id);
		try {
			await runExport(id, report);
			toast.success(`${label} report downloaded`);
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Export failed");
		} finally {
			setBusy(null);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-wrap gap-2",
		children: FORMATS.map((fmt) => {
			const Icon = fmt.icon;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				type: "button",
				variant: "secondary",
				size: "sm",
				disabled: busy !== null,
				onClick: () => void handle(fmt.id, fmt.label),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
					className: "size-3.5",
					strokeWidth: 1.75
				}), busy === fmt.id ? "Preparing" : fmt.label]
			}, fmt.id);
		})
	});
}
var ORDER = [
	"critical",
	"high",
	"medium",
	"low",
	"info",
	"pass"
];
function tone(s) {
	if (s === "pass") return "text-sage";
	if (s === "info") return "text-muted";
	return "text-stamp";
}
function FindingsPanel({ findings }) {
	const grouped = ORDER.map((sev) => ({
		sev,
		items: findings.filter((f) => f.severity === sev)
	})).filter((g) => g.items.length);
	let n = 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
		className: "flex flex-col gap-5",
		children: grouped.map((group) => group.items.map((f) => {
			n += 1;
			const id = `F-${String(n).padStart(3, "0")}`;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "find-enter border-t border-rule pt-4",
				style: { animationDelay: `${Math.min(n, 8) * 40}ms` },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-baseline justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: cn("font-mono text-2xs tracking-wider uppercase", tone(f.severity)),
							children: [
								id,
								" · ",
								f.severity
							]
						}), f.location ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "max-w-full truncate font-mono text-2xs text-faint",
							children: f.location
						}) : null]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-1 text-xl text-ink",
						children: f.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-[0.98rem] leading-relaxed text-ink/90",
						children: f.detail
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-sm leading-relaxed text-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium text-ink",
							children: "Fix. "
						}), f.remediation]
					})
				]
			}, f.id);
		}))
	});
}
function ScoreMark({ grade, score, className }) {
	const failed = grade === "D" || grade === "F";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("relative flex size-28 shrink-0 items-center justify-center sm:size-32", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 120 120",
			className: "absolute inset-0",
			"aria-hidden": "true",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "60",
				cy: "60",
				r: "56",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "1.25",
				className: failed ? "text-stamp" : "text-rule"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "60",
				cy: "60",
				r: "50",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "0.6",
				className: "text-rule"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("stamp-grade text-5xl leading-none sm:text-6xl", failed ? "text-stamp" : "text-ink"),
				children: grade
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-1 font-mono text-2xs tracking-wider text-muted tabular-nums",
				children: score
			})]
		})]
	});
}
var NAME = /^[A-Za-z0-9_.-]+$/;
function parseRepoSpec(raw) {
	const parts = raw.trim().replace(/^https?:\/\/(www\.)?github\.com\//i, "").replace(/\.git$/i, "").split("/").filter(Boolean);
	if (parts.length < 2) return null;
	const owner = parts[0];
	const repo = parts[1];
	if (!NAME.test(owner) || !NAME.test(repo)) return null;
	return {
		owner,
		repo
	};
}
function isWorkflowPath(path) {
	return /^\.github\/workflows\/[A-Za-z0-9_.-]+\.(ya?ml)$/.test(path);
}
var scanGithubRepo = createServerFn({ method: "POST" }).validator((input) => {
	const parsed = parseRepoSpec(String(input?.spec ?? ""));
	if (!parsed) throw new Error("repo");
	return parsed;
}).handler(createSsrRpc("082801aca6fbe6a118b65506c472e207df501c662e24e54ff63623116b01efed"));
var fetchGithubWorkflow = createServerFn({ method: "POST" }).validator((input) => {
	const owner = String(input?.owner ?? "");
	const repo = String(input?.repo ?? "");
	const path = String(input?.path ?? "");
	if (!NAME.test(owner) || !NAME.test(repo) || !isWorkflowPath(path)) throw new Error("path");
	return {
		owner,
		repo,
		path
	};
}).handler(createSsrRpc("1a2e004726a3f77617da1daeefc2d368bd47a30778785a09346320bfb9d51f4e"));
var SEVERITY_WEIGHT = {
	critical: 28,
	high: 16,
	medium: 8,
	low: 3,
	info: 0,
	pass: 0
};
var INJECTION_RE = /\$\{\{\s*(github\.(event\.|head_ref|ref\b|actor\b)|inputs\.|matrix\.)/i;
var TOKEN_RE = /secrets\.GITHUB_TOKEN|github\.token|GH_TOKEN|GITHUB_TOKEN/i;
var APP_TOKEN_RE = /create-github-app-token|APP_PRIVATE_KEY|APP_CLIENT_ID/i;
var ACTION_USE_RE = /^([^@]+)@(.+)$/;
var SHA_RE = /^[0-9a-f]{40}$/i;
function asRecord(value) {
	if (value && typeof value === "object" && !Array.isArray(value)) return value;
	return null;
}
function asString(value) {
	return typeof value === "string" ? value : void 0;
}
function runsOn(value) {
	if (typeof value === "string") return value;
	if (Array.isArray(value)) return value.map(String).join(", ");
}
function triggerNames(on) {
	if (!on) return [];
	if (typeof on === "string") return [on];
	if (Array.isArray(on)) return on.map(String);
	const rec = asRecord(on);
	if (!rec) return [];
	return Object.keys(rec);
}
function permissionMap(value) {
	if (typeof value === "string") return { "*": value };
	const rec = asRecord(value);
	if (!rec) return null;
	const out = {};
	for (const [k, v] of Object.entries(rec)) out[k] = String(v);
	return out;
}
function parseSteps(raw) {
	if (!Array.isArray(raw)) return [];
	return raw.map((item) => {
		const rec = asRecord(item) ?? {};
		return {
			name: asString(rec.name),
			uses: asString(rec.uses),
			run: asString(rec.run),
			with: asRecord(rec.with) ?? void 0,
			env: asRecord(rec.env) ?? void 0,
			id: asString(rec.id)
		};
	});
}
function parseWorkflow(yamlText) {
	try {
		const rec = asRecord((0, import_dist.parse)(yamlText));
		if (!rec) return {
			on: void 0,
			jobs: [],
			parseError: "Workflow is not a mapping."
		};
		const jobsRec = asRecord(rec.jobs) ?? {};
		const jobs = Object.entries(jobsRec).map(([id, job]) => {
			const j = asRecord(job) ?? {};
			return {
				id,
				name: asString(j.name),
				runsOn: runsOn(j["runs-on"]),
				permissions: j.permissions,
				steps: parseSteps(j.steps),
				if: asString(j.if)
			};
		});
		return {
			name: asString(rec.name),
			on: rec.on,
			permissions: rec.permissions,
			jobs
		};
	} catch (err) {
		return {
			on: void 0,
			jobs: [],
			parseError: err instanceof Error ? err.message : "YAML parse failed."
		};
	}
}
function finding(id, severity, title, detail, remediation, rule, location) {
	return {
		id,
		severity,
		title,
		detail,
		remediation,
		rule,
		location
	};
}
function flattenUses(jobs) {
	const out = [];
	for (const job of jobs) job.steps.forEach((step, index) => out.push({
		job: job.id,
		step,
		index
	}));
	return out;
}
function auditWorkflow(yamlText) {
	const parsed = parseWorkflow(yamlText);
	const findings = [];
	const triggers = triggerNames(parsed.on);
	const allSteps = flattenUses(parsed.jobs);
	const usesToken = TOKEN_RE.test(yamlText);
	const usesApp = APP_TOKEN_RE.test(yamlText);
	const topPerms = permissionMap(parsed.permissions);
	const anyJobPerms = parsed.jobs.some((j) => j.permissions != null);
	const hasPermissions = Boolean(topPerms) || anyJobPerms;
	if (parsed.parseError) findings.push(finding("parse", "high", "YAML did not parse", parsed.parseError, "Fix the workflow syntax, then re-run the audit. Tabs, unquoted colons, and `on:` boolean coercion are common traps.", "yaml-parse"));
	if (!parsed.parseError && parsed.jobs.length === 0) findings.push(finding("no-jobs", "high", "No jobs found", "A workflow without jobs cannot run, so it cannot be privilege-reviewed.", "Add at least one job with steps.", "structure"));
	if (!hasPermissions && parsed.jobs.length > 0) findings.push(finding("no-permissions", "high", "No permissions block", "Without an explicit permissions key, GITHUB_TOKEN inherits the repository default (permissive or restricted). That default is not visible in the YAML, so reviewers cannot attest least privilege.", "Set workflow-level `permissions:` to the minimum, then raise per job. Start with `contents: read` and add write scopes only where a step needs them.", "permissions-missing"));
	else if (topPerms && (topPerms["*"] === "write-all" || Object.values(topPerms).includes("write-all"))) findings.push(finding("write-all", "critical", "permissions: write-all", "write-all grants every GITHUB_TOKEN scope, including contents, actions, packages, and id-token.", "Replace write-all with an explicit map of the two or three scopes this workflow actually uses.", "permissions-write-all"));
	if (topPerms && topPerms["*"] === "read-all") findings.push(finding("read-all", "medium", "permissions: read-all", "read-all is safer than write-all but still broader than a typical lint or test job needs.", "Prefer `contents: read` (and `pull-requests: read` if required) instead of a blanket read-all.", "permissions-read-all"));
	const writeScopes = /* @__PURE__ */ new Set();
	const collectWrites = (perms, loc) => {
		if (!perms) return;
		for (const [scope, level] of Object.entries(perms)) if (level === "write" || level === "write-all") {
			writeScopes.add(scope);
			if (scope === "contents" && level === "write") {
				if (!(/deploy|release|tag|commit|push|pages/i.test(yamlText) || /peaceiris\/actions-gh-pages|stefanzweifel\/git-auto-commit|softprops\/action-gh-release/i.test(yamlText))) findings.push(finding(`contents-write-${loc}`, "medium", "contents: write may be unnecessary", `Job or workflow '${loc}' grants contents: write. Most issue, comment, and check workflows only need contents: read.`, "Drop contents: write unless a step commits, tags, or publishes to the repo. The Open Issue example only needs contents: read + issues: write.", "permissions-contents-write", loc));
			}
		}
	};
	collectWrites(topPerms, "workflow");
	for (const job of parsed.jobs) collectWrites(permissionMap(job.permissions), job.id);
	if (triggers.includes("pull_request_target")) {
		const checksOutPr = allSteps.some((s) => {
			const ref = s.step.with ? String(s.step.with.ref ?? "") : "";
			return Boolean(s.step.uses?.startsWith("actions/checkout")) && /pull_request\.head|github\.event\.pull_request/i.test(ref);
		});
		findings.push(finding("pr-target", checksOutPr ? "critical" : "high", "pull_request_target runs in the base repo context", checksOutPr ? "This workflow both uses pull_request_target (so GITHUB_TOKEN can write to the base repo) and checks out the pull request head. A fork PR can execute untrusted code with a write token." : "pull_request_target grants a write-capable token from the base repository. Any later checkout of PR code, or interpolation of PR titles into run:, is a privilege escalation.", "Use `pull_request` for CI. If you must label or comment from the base repo, do it in a separate job that does not check out PR code and does not interpolate untrusted fields into run:.", "pull-request-target", "on.pull_request_target"));
	}
	allSteps.forEach(({ job, step, index }) => {
		const loc = `${job} / step ${index + 1}${step.name ? ` (${step.name})` : ""}`;
		if (step.run && INJECTION_RE.test(step.run)) findings.push(finding(`inject-${job}-${index}`, "critical", "Possible script injection in run:", "The script interpolates a GitHub context value directly into bash. Attackers who control a PR title, branch name, or issue body can inject `; evil; #` into the shell.", "Pass untrusted values through `env:` and read `$TITLE` (quoted) inside the script. Never splice `${{ github.event.* }}` into run:.", "script-injection", loc));
		if (step.uses) {
			const match = ACTION_USE_RE.exec(step.uses.trim());
			if (match) {
				const ref = match[2];
				if (!SHA_RE.test(ref.split("#")[0].trim()) && (ref === "main" || ref === "master" || ref.startsWith("v") || ref.includes("."))) {
					const severity = ref === "main" || ref === "master" ? "high" : "medium";
					findings.push(finding(`pin-${job}-${index}`, severity, `Action is not pinned to a SHA`, `${step.uses} follows a moving tag or branch. A compromised publisher can change what your workflow executes without a diff in this file.`, "Pin to a 40-character commit SHA and leave the version in a trailing comment, e.g. `actions/checkout@11bd7190… # v4.2.2`.", "unpinned-action", loc));
				}
			}
		}
		if (step.run && /curl /.test(step.run) && !/--fail\b/.test(step.run)) findings.push(finding(`curl-fail-${job}-${index}`, "low", "curl without --fail", "A 4xx/5xx from the GitHub API would still exit 0, so a failed issue create looks like success.", "Add `--fail` (or `-f`) to curl, as in GitHub's REST example.", "curl-fail", loc));
	});
	if (usesToken && /secrets\.GITHUB_TOKEN/.test(yamlText) && !/github\.token/.test(yamlText)) findings.push(finding("secrets-github-token", "info", "Using secrets.GITHUB_TOKEN", "The automatic token is also available as github.token. Both work. Prefer github.token so it is obvious this is not a stored PAT.", "Set `GH_TOKEN: ${{ github.token }}` (or the authorization header) instead of secrets.GITHUB_TOKEN.", "token-alias"));
	if (triggers.includes("push") && writeScopes.has("issues")) findings.push(finding("issue-on-push", "medium", "Opens issues on every push", "A push trigger plus issues: write will file a new issue for each commit, including force-pushes and bot commits. The GitHub docs example does this to demonstrate the REST call — it is rarely what you want in production.", "Gate on workflow_dispatch, a label, a path filter, or `if: github.event.head_commit.committer.username != 'github-actions[bot]'`.", "noisy-trigger", "on.push"));
	if (usesApp) {
		const appStep = allSteps.find((s) => s.step.uses?.includes("create-github-app-token"));
		if (appStep && /@v\d/.test(appStep.step.uses ?? "")) findings.push(finding("app-token-pin", "medium", "GitHub App token action is tag-pinned", `${appStep.step.uses} mints an installation token from a private key. Treat this like production auth — pin the SHA.`, "Pin `actions/create-github-app-token` to a commit SHA. Keep APP_PRIVATE_KEY in Actions secrets; never echo it. JWTs must expire within 10 minutes.", "app-token", `${appStep.job} / ${appStep.step.name ?? "generate-token"}`));
		if (!/permissions:/.test(yamlText)) findings.push(finding("app-token-no-perms", "info", "App token bypasses GITHUB_TOKEN permissions", "An installation token has the GitHub App's permissions, not the workflow permissions: map. Tight YAML permissions will not shrink what the app can do.", "Review the App's installation permissions in GitHub settings. Mint the token only in jobs that need it, and never pass it to untrusted checkout.", "app-token-scope"));
	}
	if (/Authorization: token /.test(yamlText) && /JWT|YOUR_JWT/.test(yamlText)) findings.push(finding("jwt-bearer", "info", "JWTs must use Bearer", "GitHub accepts `Authorization: token` for installation tokens and PATs, but a GitHub App JWT must be `Authorization: Bearer`.", "Use Bearer for JWTs. Keep iat 60 seconds in the past for clock drift and exp no more than 10 minutes ahead. Sign with RS256.", "jwt-header"));
	const persist = allSteps.find((s) => {
		if (!s.step.uses?.startsWith("actions/checkout")) return false;
		const persistCreds = s.step.with?.["persist-credentials"];
		return persistCreds !== false && persistCreds !== "false";
	});
	if (persist && triggers.includes("pull_request_target")) findings.push(finding("persist-creds", "high", "checkout persist-credentials on untrusted PR", "The default checkout persists GITHUB_TOKEN into local git config. Combined with PR code, later steps can push as the token.", "Set `persist-credentials: false` on checkout, or do not check out PR head in this job.", "persist-credentials", persist.job));
	if (!parsed.parseError && parsed.jobs.length > 0 && findings.every((f) => f.severity === "info" || f.severity === "pass")) findings.push(finding("lean", "pass", "Lean already. Ship.", "No over-privilege or injection findings on this pass. Keep the permissions map explicit when you add jobs.", "Re-run Attest whenever the workflow or the App's permissions change.", "clean"));
	if (hasPermissions && !findings.some((f) => f.rule === "permissions-missing" || f.rule === "permissions-write-all")) findings.push(finding("explicit-permissions", "pass", "Explicit permissions map", "This workflow declares GITHUB_TOKEN scopes in YAML, which is what reviewers (and Attest) can actually attest.", "Keep raising or dropping scopes per job instead of widening the workflow default.", "permissions-present"));
	const penalty = findings.reduce((sum, f) => sum + SEVERITY_WEIGHT[f.severity], 0);
	const score = Math.max(0, Math.min(100, 100 - penalty));
	const grade = score >= 90 ? "A" : score >= 75 ? "B" : score >= 60 ? "C" : score >= 40 ? "D" : "F";
	const criticals = findings.filter((f) => f.severity === "critical").length;
	const highs = findings.filter((f) => f.severity === "high").length;
	const summary = criticals > 0 ? `${criticals} critical finding${criticals === 1 ? "" : "s"}. Do not ship this token as-is.` : highs > 0 ? `${highs} high-severity finding${highs === 1 ? "" : "s"} on GITHUB_TOKEN or untrusted code.` : score >= 90 ? "Least privilege holds. Permissions are explicit and the run: scripts look clean." : "No critical issues, but the token still has room to shrink.";
	const ordered = [...findings].sort((a, b) => SEVERITY_WEIGHT[b.severity] - SEVERITY_WEIGHT[a.severity]);
	return {
		name: parsed.name || "untitled workflow",
		score,
		grade,
		summary,
		findings: ordered,
		stats: {
			jobs: parsed.jobs.length,
			steps: allSteps.length,
			triggers: triggers.length ? triggers : ["(none)"],
			hasPermissions,
			usesGithubToken: usesToken,
			usesAppToken: usesApp
		},
		yaml: yamlText,
		auditedAt: (/* @__PURE__ */ new Date()).toISOString()
	};
}
var SAMPLE_WORKFLOWS = [
	{
		id: "open-issue",
		title: "Open issue (workflow_dispatch)",
		blurb: "GitHub CLI + GITHUB_TOKEN. Least privilege is close — pin it.",
		yaml: `name: Open new issue
on: workflow_dispatch

jobs:
  open-issue:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      issues: write
    steps:
      - run: |
          gh issue --repo \${{ github.repository }} \\
            create --title "Issue title" --body "Issue body"
        env:
          GH_TOKEN: \${{ secrets.GITHUB_TOKEN }}
`
	},
	{
		id: "issue-on-push",
		title: "Create issue on every push",
		blurb: "REST call with Bearer token. Noisy trigger, unpinned defaults.",
		yaml: `name: Create issue on commit

on: [ push ]

jobs:
  create_issue:
    runs-on: ubuntu-latest
    permissions:
      issues: write
    steps:
      - name: Create issue using REST API
        run: |
          curl --request POST \\
          --url https://api.github.com/repos/\${{ github.repository }}/issues \\
          --header 'authorization: Bearer \${{ secrets.GITHUB_TOKEN }}' \\
          --header 'content-type: application/json' \\
          --data '{
            "title": "Automated issue for commit: \${{ github.sha }}",
            "body": "This issue was automatically created by the GitHub Action workflow **\${{ github.workflow }}**. \\n\\n The commit hash was: _\${{ github.sha }}_."
            }' \\
          --fail
`
	},
	{
		id: "app-token",
		title: "GitHub App installation token",
		blurb: "create-github-app-token. Prefer SHA pins and short-lived JWTs.",
		yaml: `on:
  workflow_dispatch:
jobs:
  demo_app_authentication:
    runs-on: ubuntu-latest
    steps:
      - name: Generate a token
        id: generate-token
        uses: actions/create-github-app-token@v3
        with:
          client-id: \${{ vars.APP_CLIENT_ID }}
          private-key: \${{ secrets.APP_PRIVATE_KEY }}

      - name: Use the token
        env:
          GH_TOKEN: \${{ steps.generate-token.outputs.token }}
        run: |
          gh api octocat
`
	},
	{
		id: "pr-target",
		title: "Dangerous pull_request_target",
		blurb: "Untrusted checkout + script injection. Expect a failing grade.",
		yaml: `name: PR comments
on: pull_request_target

jobs:
  greet:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          ref: \${{ github.event.pull_request.head.sha }}
      - name: Comment
        run: |
          echo "Title: \${{ github.event.pull_request.title }}"
          npm test
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
`
	},
	{
		id: "hardened",
		title: "Hardened least privilege",
		blurb: "Pinned action, explicit read-only token, no interpolation in run.",
		yaml: `name: Lint
on:
  pull_request:
    branches: [main]

permissions:
  contents: read

jobs:
  lint:
    runs-on: ubuntu-latest
    permissions:
      contents: read
    steps:
      - uses: actions/checkout@11bd71901bbe5b1630ceea73d27597364c9af683 # v4.2.2
      - uses: actions/setup-node@39370e3970a6d050c480ffad4ff0ed4d3fdee5af # v4.1.0
        with:
          node-version: "22"
          cache: npm
      - name: Install and lint
        run: |
          npm ci
          npm run lint
`
	}
];
var first = SAMPLE_WORKFLOWS[0];
var useAudit = create((set, get) => ({
	yaml: first.yaml,
	sampleId: first.id,
	report: auditWorkflow(first.yaml),
	tab: "audit",
	setYaml: (yaml) => set({
		yaml,
		sampleId: "custom"
	}),
	run: () => set({ report: auditWorkflow(get().yaml) }),
	loadSample: (id) => {
		const sample = SAMPLE_WORKFLOWS.find((s) => s.id === id);
		if (!sample) return;
		set({
			yaml: sample.yaml,
			sampleId: id,
			report: auditWorkflow(sample.yaml)
		});
	},
	setTab: (tab) => set({ tab })
}));
var PRESETS = [
	"actions/cache",
	"actions/checkout",
	"actions/starter-workflows"
];
function AuditWorkspace() {
	const yaml = useAudit((s) => s.yaml);
	const sampleId = useAudit((s) => s.sampleId);
	const report = useAudit((s) => s.report);
	const setYaml = useAudit((s) => s.setYaml);
	const run = useAudit((s) => s.run);
	const loadSample = useAudit((s) => s.loadSample);
	const lang = useSteel((s) => s.lang);
	const et = lang === "et";
	const [spec, setSpec] = (0, import_react.useState)("actions/cache");
	const [scan, setScan] = (0, import_react.useState)(null);
	const [activePath, setActivePath] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [grades, setGrades] = (0, import_react.useState)({});
	async function saveReport() {
		try {
			await createSteelRow({ data: {
				kind: "audit",
				title: `audit ${report.grade} ${report.score}`,
				payloadJson: JSON.stringify({
					grade: report.grade,
					score: report.score,
					name: report.name.slice(0, 80),
					findingCount: report.findings.length,
					rules: report.findings.map((f) => f.rule).slice(0, 24)
				})
			} });
			toast.success(t(lang, "rowSaved"));
		} catch {
			toast.error(t(lang, "rowFail"));
		}
	}
	function ghError(err) {
		const msg = err instanceof Error ? err.message : "";
		if (msg.includes("not-found")) return t(lang, "ghMiss");
		if (msg.includes("rate")) return t(lang, "ghRate");
		if (msg.includes("repo")) return t(lang, "ghMiss");
		return t(lang, "ghFail");
	}
	async function onScan(nextSpec = spec) {
		setBusy(true);
		try {
			const result = await scanGithubRepo({ data: { spec: nextSpec } });
			setScan(result);
			setSpec(`${result.owner}/${result.repo}`);
			setGrades({});
			if (result.files.length === 0) {
				toast.message(t(lang, "ghEmpty"));
				return;
			}
			const pick = result.files.find((f) => f.path.includes("pr-opened")) ?? result.files.find((f) => f.path.endsWith(".yml") || f.path.endsWith(".yaml")) ?? result.files[0];
			await loadRemote(result.owner, result.repo, pick.path);
			gradeListed(result);
		} catch (err) {
			setScan(null);
			toast.error(ghError(err));
		} finally {
			setBusy(false);
		}
	}
	async function gradeListed(result) {
		const slice = result.files.slice(0, 8);
		const rows = await Promise.all(slice.map(async (f) => {
			try {
				const file = await fetchGithubWorkflow({ data: {
					owner: result.owner,
					repo: result.repo,
					path: f.path
				} });
				return [f.path, auditWorkflow(file.yaml).grade];
			} catch {
				return [f.path, "–"];
			}
		}));
		setGrades(Object.fromEntries(rows));
	}
	async function loadRemote(owner, repo, path) {
		setBusy(true);
		try {
			const file = await fetchGithubWorkflow({ data: {
				owner,
				repo,
				path
			} });
			setYaml(file.yaml);
			setActivePath(path);
			useAudit.getState().run();
			toast.success(file.name);
		} catch (err) {
			toast.error(ghError(err));
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "min-w-0",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4 rounded-[var(--radius-md)] border border-rule bg-raised/50 p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-2xs tracking-[0.18em] text-muted uppercase",
							children: t(lang, "ghScan")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							className: "mt-3 flex flex-col gap-2 sm:flex-row",
							onSubmit: (e) => {
								e.preventDefault();
								onScan();
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "sr-only",
									htmlFor: "gh-spec",
									children: t(lang, "ghSpec")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "gh-spec",
									value: spec,
									onChange: (e) => setSpec(e.target.value),
									placeholder: t(lang, "ghSpec"),
									autoComplete: "off",
									className: "min-h-11 min-w-0 flex-1 rounded-[var(--radius-sm)] border border-rule bg-paper px-3 font-mono text-sm text-ink"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "submit",
									variant: "live",
									disabled: busy,
									children: busy ? t(lang, "ghBusy") : t(lang, "ghScan")
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 flex flex-wrap gap-2",
							children: PRESETS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => {
									setSpec(p);
									onScan(p);
								},
								className: "min-h-11 rounded-[var(--radius-sm)] border border-rule px-3 font-mono text-2xs text-muted hover:text-ink",
								children: p
							}, p))
						}),
						scan ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-mono text-2xs tracking-wider text-muted uppercase",
								children: [
									t(lang, "ghFiles"),
									" · ",
									scan.owner,
									"/",
									scan.repo
								]
							}), scan.files.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-faint",
								children: t(lang, "ghEmpty")
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-2 max-h-48 overflow-y-auto divide-y divide-rule",
								children: scan.files.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => void loadRemote(scan.owner, scan.repo, f.path),
									className: "flex min-h-11 w-full items-center justify-between gap-2 px-1 text-left text-sm " + (activePath === f.path ? "text-ink" : "text-muted hover:text-ink"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "truncate font-mono text-2xs",
										children: f.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "shrink-0 font-mono text-2xs tabular-nums text-faint",
										children: grades[f.path] ?? (activePath === f.path ? et ? "avatud" : "open" : "")
									})]
								}) }, f.path))
							})]
						}) : null
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-3 flex items-end justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-2xs tracking-[0.18em] text-muted uppercase",
						children: et ? "Töövoo YAML" : "Workflow YAML"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-1 text-2xl",
						children: et ? "Kleebi, siis attest" : "Paste, then attest"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						onClick: run,
						size: "sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, {
							className: "size-3.5",
							strokeWidth: 2
						}), et ? "Auditeeri" : "Run audit"]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-3 flex flex-wrap gap-2",
					children: SAMPLE_WORKFLOWS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => {
							setActivePath(null);
							loadSample(s.id);
						},
						className: "shrink-0 rounded-[var(--radius-md)] border px-3 py-2 text-left transition-colors duration-[var(--motion-quick)] " + (sampleId === s.id && !activePath ? "border-ink bg-ink text-paper" : "border-rule bg-transparent text-ink hover:bg-ink/[0.04]"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-sm font-medium",
							children: s.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-0.5 block max-w-52 text-2xs leading-snug " + (sampleId === s.id && !activePath ? "text-paper/70" : "text-muted"),
							children: s.blurb
						})]
					}, s.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "sr-only",
					htmlFor: "workflow-yaml",
					children: "GitHub Actions workflow YAML"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					id: "workflow-yaml",
					value: yaml,
					onChange: (e) => {
						setActivePath(null);
						setYaml(e.target.value);
					},
					onKeyDown: (e) => {
						if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
							e.preventDefault();
							run();
						}
					},
					spellCheck: false,
					className: "min-h-72 w-full resize-y rounded-[var(--radius-md)] border border-rule bg-raised p-4 font-mono text-[0.8rem] leading-relaxed text-ink"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-xs text-muted",
					children: et ? "Ctrl/⌘ + Enter käivitab. YAML ei lahku sellest brauserist — GitHubi skann loeb ainult avalikke faile." : "Ctrl/⌘ + Enter runs the audit. Pasted YAML stays here. GitHub scan reads public files only."
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-start justify-between gap-4 border-b border-rule pb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-2xs tracking-[0.18em] text-muted uppercase",
							children: "Verdict"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-1 text-2xl sm:text-3xl",
							children: report.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 max-w-prose text-sm leading-relaxed text-muted",
							children: report.summary
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "mt-4 flex flex-wrap gap-x-5 gap-y-1 font-mono text-2xs tracking-wide text-faint uppercase",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "inline",
									children: "Jobs "
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "inline text-ink tabular-nums",
									children: report.stats.jobs
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "inline",
									children: "Steps "
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "inline text-ink tabular-nums",
									children: report.stats.steps
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "inline",
									children: "On "
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "inline text-ink",
									children: report.stats.triggers.join(", ")
								})] })
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScoreMark, {
					grade: report.grade,
					score: report.score
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4 flex flex-wrap items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-mono text-2xs tracking-[0.18em] text-muted uppercase",
						children: [report.findings.length, " findings · export"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "secondary",
							size: "sm",
							onClick: () => void saveReport(),
							children: t(lang, "saveRow")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExportMenu, { report })]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FindingsPanel, { findings: report.findings })]
			})]
		})]
	});
}
var JWT_CLAIMS = [
	{
		claim: "iat",
		name: {
			et: "Väljastatud",
			en: "Issued at"
		},
		detail: {
			et: "Unix-aeg, millal JWT loodi. GitHub soovitab 60 sekundit minevikku kella triivi jaoks. Hoia host NTP-ga sünkroonis.",
			en: "Unix time the JWT was created. GitHub recommends 60 seconds in the past to absorb clock drift. Keep the host NTP-synced."
		}
	},
	{
		claim: "exp",
		name: {
			et: "Aegub",
			en: "Expires"
		},
		detail: {
			et: "Unix-aeg, pärast mida JWT ei saa installation-tokenit. Kuni 10 minutit pärast iat.",
			en: "Unix time after which the JWT cannot mint an installation token. Must be no more than 10 minutes after iat."
		}
	},
	{
		claim: "iss",
		name: {
			et: "Väljastaja",
			en: "Issuer"
		},
		detail: {
			et: "GitHub App client ID (eelistatud) või numbriline app ID. Selle järgi valitakse allkirja kontrolliv avalik võti.",
			en: "The GitHub App client ID (preferred) or numeric app ID. Used to pick the public key that verifies the signature."
		}
	},
	{
		claim: "alg",
		name: {
			et: "Algoritm",
			en: "Algorithm"
		},
		detail: {
			et: "Peab olema RS256. HMAC algoritmid lükatakse tagasi.",
			en: "Must be RS256. HMAC algorithms are rejected."
		}
	}
];
var SNIPPETS = {
	ruby: `require "openssl"
require "jwt"

private_pem = File.read("YOUR_PATH_TO_PEM")
private_key = OpenSSL::PKey::RSA.new(private_pem)

payload = {
  iat: Time.now.to_i - 60,
  exp: Time.now.to_i + (10 * 60),
  iss: "YOUR_CLIENT_ID"
}

jwt = JWT.encode(payload, private_key, "RS256")
puts jwt`,
	python: `#!/usr/bin/env python3
import sys, time, jwt

pem = sys.argv[1]
client_id = sys.argv[2]
signing_key = open(pem, "rb").read()

payload = {
    "iat": int(time.time()) - 60,
    "exp": int(time.time()) + 600,
    "iss": client_id,
}
print("JWT:", jwt.encode(payload, signing_key, algorithm="RS256"))`,
	bash: `#!/usr/bin/env bash
client_id=$1
pem=$(cat "$2")
now=$(date +%s)
iat=$((now - 60))
exp=$((now + 600))
b64enc() { openssl base64 | tr -d '=' | tr '/+' '_-' | tr -d '\\n'; }
header=$(printf '%s' '{"typ":"JWT","alg":"RS256"}' | b64enc)
payload=$(printf '%s' "{\\"iat\\":$iat,\\"exp\\":$exp,\\"iss\\":\\"$client_id\\"}" | b64enc)
header_payload="$header.$payload"
signature=$(openssl dgst -sha256 -sign <(printf '%s' "$pem") <(printf '%s' "$header_payload") | b64enc)
printf 'JWT: %s\\n' "$header_payload.$signature"`,
	powershell: `$client_id = "YOUR_CLIENT_ID"
$private_key_path = "YOUR_PATH_TO_PEM"
$header = [Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes((ConvertTo-Json @{alg="RS256";typ="JWT"}))).TrimEnd("=").Replace("+","-").Replace("/","_")
$payload = [Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes((ConvertTo-Json @{
  iat = [DateTimeOffset]::UtcNow.AddSeconds(-60).ToUnixTimeSeconds()
  exp = [DateTimeOffset]::UtcNow.AddMinutes(10).ToUnixTimeSeconds()
  iss = $client_id
}))).TrimEnd("=").Replace("+","-").Replace("/","_")
$rsa = [Security.Cryptography.RSA]::Create()
$rsa.ImportFromPem((Get-Content $private_key_path -Raw))
$signature = [Convert]::ToBase64String($rsa.SignData([Text.Encoding]::UTF8.GetBytes("$header.$payload"), "SHA256", [Security.Cryptography.RSASignaturePadding]::Pkcs1)).TrimEnd("=").Replace("+","-").Replace("/","_")
Write-Host "$header.$payload.$signature"`,
	curl: `curl --request GET \\
  --url "https://api.github.com/app" \\
  --header "Accept: application/vnd.github+json" \\
  --header "Authorization: Bearer YOUR_JWT" \\
  --header "X-GitHub-Api-Version: 2026-03-10"`,
	action: ` - name: Generate a token
  id: generate-token
  uses: actions/create-github-app-token@v3
  with:
    client-id: \${{ vars.APP_CLIENT_ID }}
    private-key: \${{ secrets.APP_PRIVATE_KEY }}

- name: Use the token
  env:
    GH_TOKEN: \${{ steps.generate-token.outputs.token }}
  run: gh api octocat`
};
async function mintDemoKey() {
	const { privateKey } = await generateKeyPair("RS256", {
		modulusLength: 2048,
		extractable: true
	});
	return exportPKCS8(privateKey);
}
async function mintGithubAppJwt(opts) {
	const key = await importPKCS8(opts.pkcs8, "RS256");
	const now = Math.floor(Date.now() / 1e3);
	const iat = now - 60;
	const exp = now + 600;
	return {
		jwt: await new SignJWT({}).setProtectedHeader({
			alg: "RS256",
			typ: "JWT"
		}).setIssuedAt(iat).setExpirationTime(exp).setIssuer(opts.clientId).sign(key),
		iat,
		exp
	};
}
function splitJwt(token) {
	const parts = token.split(".");
	if (parts.length !== 3) return null;
	const decode = (part) => {
		const padded = part.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((part.length + 3) % 4);
		try {
			return JSON.parse(atob(padded));
		} catch {
			return part;
		}
	};
	return {
		header: decode(parts[0]),
		payload: decode(parts[1]),
		signature: parts[2]
	};
}
function JwtLab() {
	const uiLang = useSteel((s) => s.lang);
	const [clientId, setClientId] = (0, import_react.useState)("Iv1.attest-demo");
	const [pem, setPem] = (0, import_react.useState)("");
	const [token, setToken] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [snip, setSnip] = (0, import_react.useState)("python");
	const decoded = token ? splitJwt(token) : null;
	async function generateKey() {
		setBusy(true);
		try {
			const next = await mintDemoKey();
			setPem(next);
			toast.success(t(uiLang, "jwtMinted"));
		} catch (err) {
			toast.error(err instanceof Error ? err.message : t(uiLang, "jwtKeyFail"));
		} finally {
			setBusy(false);
		}
	}
	async function sign() {
		if (!pem.trim()) {
			toast.error(t(uiLang, "jwtNeedKey"));
			return;
		}
		setBusy(true);
		try {
			const out = await mintGithubAppJwt({
				clientId: clientId.trim() || "Iv1.attest-demo",
				pkcs8: pem
			});
			setToken(out.jwt);
			toast.success(t(uiLang, "jwtSigned"));
		} catch (err) {
			toast.error(err instanceof Error ? err.message : t(uiLang, "jwtSignFail"));
		} finally {
			setBusy(false);
		}
	}
	async function copyToken() {
		if (!token) return;
		await navigator.clipboard.writeText(token);
		toast.success(t(uiLang, "jwtCopied"));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "min-w-0",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-2xs tracking-[0.18em] text-muted uppercase",
					children: t(uiLang, "jwtKicker")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-1 text-2xl sm:text-3xl",
					children: t(uiLang, "jwtTitle")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-prose text-muted",
					children: t(uiLang, "jwtLead")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
					className: "mt-6 divide-y divide-rule border-y border-rule",
					children: JWT_CLAIMS.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-[4.5rem_1fr] gap-4 py-3 sm:grid-cols-[6rem_1fr]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "font-mono text-sm text-stamp",
							children: row.claim
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: row.name[uiLang === "ru" ? "en" : uiLang]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: row.detail[uiLang === "ru" ? "en" : uiLang]
						})] })]
					}, row.claim))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "nav-scroll mt-6 flex flex-nowrap gap-2 overflow-x-auto",
					children: Object.keys(SNIPPETS).map((key) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setSnip(key),
						className: "min-h-11 shrink-0 rounded-[var(--radius-sm)] border px-3 py-1.5 font-mono text-2xs uppercase tracking-wide " + (snip === key ? "border-ink bg-ink text-paper" : "border-rule text-muted hover:text-ink"),
						children: key
					}, key))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
					className: "mt-3 overflow-x-auto rounded-[var(--radius-lg)] border border-rule bg-raised/70 p-4 font-mono text-xs leading-relaxed",
					children: SNIPPETS[snip]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "min-w-0",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-2xs tracking-[0.18em] text-muted uppercase",
					children: t(uiLang, "jwtSignIn")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "mt-4 block",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-2xs tracking-wider text-muted uppercase",
						children: t(uiLang, "jwtIss")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: clientId,
						onChange: (e) => setClientId(e.target.value),
						className: "mt-1 h-11 w-full rounded-[var(--radius-md)] border border-rule bg-paper px-3 font-mono text-sm outline-none focus:border-ink/40 focus:ring-2 focus:ring-ink/15"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "mt-3 block",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-2xs tracking-wider text-muted uppercase",
						children: t(uiLang, "jwtPem")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						value: pem,
						onChange: (e) => setPem(e.target.value),
						spellCheck: false,
						placeholder: "-----BEGIN PRIVATE KEY-----",
						className: "mt-1 h-36 w-full resize-y rounded-[var(--radius-md)] border border-rule bg-raised/60 p-3 font-mono text-2xs outline-none focus:border-ink/40 focus:ring-2 focus:ring-ink/15"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex flex-wrap gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "secondary",
							disabled: busy,
							onClick: () => void generateKey(),
							children: t(uiLang, "jwtMint")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							disabled: busy,
							onClick: () => void sign(),
							children: t(uiLang, "jwtSign")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "ghost",
							disabled: !token,
							onClick: () => void copyToken(),
							children: t(uiLang, "jwtCopy")
						})
					]
				}),
				token ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-2xs tracking-wider text-muted uppercase",
							children: t(uiLang, "jwtCompact")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 break-all font-mono text-2xs leading-relaxed text-ink",
							children: token
						}),
						decoded ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
							className: "mt-4 overflow-x-auto rounded-[var(--radius-md)] border border-rule bg-paper p-3 font-mono text-2xs",
							children: JSON.stringify({
								header: decoded.header,
								payload: decoded.payload
							}, null, 2)
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-muted",
							children: t(uiLang, "jwtBearerNote")
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 text-sm text-muted",
					children: t(uiLang, "jwtDemoNote")
				})
			]
		})]
	});
}
var SCOPE_CATALOG = [
	{
		id: "actions",
		label: "actions",
		read: "List and download workflow artifacts and logs.",
		write: "Cancel workflows, delete artifacts."
	},
	{
		id: "attestations",
		label: "attestations",
		read: "Read artifact attestations.",
		write: "Create artifact attestations."
	},
	{
		id: "checks",
		label: "checks",
		read: "Read check runs and suites.",
		write: "Create or update checks."
	},
	{
		id: "contents",
		label: "contents",
		read: "Checkout the repo, read blobs and commits.",
		write: "Push commits, create tags and releases."
	},
	{
		id: "deployments",
		label: "deployments",
		read: "Read deployment statuses.",
		write: "Create deployments."
	},
	{
		id: "discussions",
		label: "discussions",
		read: "Read discussions.",
		write: "Create or edit discussions."
	},
	{
		id: "id-token",
		label: "id-token",
		read: "Not used — id-token is write-only.",
		write: "Mint an OIDC token for cloud federated login."
	},
	{
		id: "issues",
		label: "issues",
		read: "Read issues and comments.",
		write: "Open, close, and comment on issues."
	},
	{
		id: "models",
		label: "models",
		read: "Call GitHub Models.",
		write: "Not applicable."
	},
	{
		id: "packages",
		label: "packages",
		read: "Download packages.",
		write: "Publish packages."
	},
	{
		id: "pages",
		label: "pages",
		read: "Read Pages status.",
		write: "Request a Pages build."
	},
	{
		id: "pull-requests",
		label: "pull-requests",
		read: "Read PRs and reviews.",
		write: "Comment, review, merge, request reviewers."
	},
	{
		id: "repository-projects",
		label: "repository-projects",
		read: "Read classic projects.",
		write: "Create and edit classic projects."
	},
	{
		id: "security-events",
		label: "security-events",
		read: "Read code scanning and Dependabot alerts.",
		write: "Upload SARIF, dismiss alerts."
	},
	{
		id: "statuses",
		label: "statuses",
		read: "Read commit statuses.",
		write: "Set commit statuses."
	}
];
function permissionsToYaml(name, trigger, jobId, map) {
	const entries = Object.entries(map).filter(([, level]) => level && level !== "none");
	return `name: ${name}
on: ${trigger}

permissions:
${entries.map(([scope, level]) => `  ${scope}: ${level}`).join("\n") || "  contents: read"}

jobs:
  ${jobId}:
    runs-on: ubuntu-latest
    permissions:
${entries.map(([scope, level]) => `      ${scope}: ${level}`).join("\n") || "      contents: read"}
    steps:
      - uses: actions/checkout@11bd71901bbe5b1630ceea73d27597364c9af683 # v4.2.2
`;
}
var INITIAL = {
	contents: "read",
	issues: "write"
};
function PermissionBuilder() {
	const lang = useSteel((s) => s.lang);
	const [map, setMap] = (0, import_react.useState)(INITIAL);
	const [name, setName] = (0, import_react.useState)("Open new issue");
	const [trigger, setTrigger] = (0, import_react.useState)("workflow_dispatch");
	const [jobId, setJobId] = (0, import_react.useState)("open-issue");
	const loadCustom = useAudit((s) => s.setYaml);
	const run = useAudit((s) => s.run);
	const setTab = useAudit((s) => s.setTab);
	const yaml = (0, import_react.useMemo)(() => permissionsToYaml(name, trigger, jobId, map), [
		name,
		trigger,
		jobId,
		map
	]);
	function setLevel(scope, level) {
		setMap((prev) => ({
			...prev,
			[scope]: level
		}));
	}
	function attest() {
		loadCustom(yaml);
		run();
		setTab("audit");
		toast.success(t(lang, "permSent"));
	}
	async function copy() {
		await navigator.clipboard.writeText(yaml);
		toast.success(t(lang, "permCopied"));
	}
	const levelLabel = {
		none: t(lang, "permNone"),
		read: t(lang, "permRead"),
		write: t(lang, "permWrite")
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.9fr)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "min-w-0",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-2xs tracking-[0.18em] text-muted uppercase",
					children: t(lang, "permKicker")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-1 text-2xl sm:text-3xl",
					children: t(lang, "permTitle")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-prose text-muted",
					children: t(lang, "permLead")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 grid gap-3 sm:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t(lang, "permName"),
							value: name,
							onChange: setName
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t(lang, "permTrigger"),
							value: trigger,
							onChange: setTrigger
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t(lang, "permJob"),
							value: jobId,
							onChange: setJobId
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full min-w-[34rem] border-collapse text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-rule text-left font-mono text-2xs tracking-wider text-muted uppercase",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2 pr-3 font-medium",
									children: t(lang, "permScope")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2 pr-3 font-medium",
									children: t(lang, "permNone")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2 pr-3 font-medium",
									children: t(lang, "permRead")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2 pr-3 font-medium",
									children: t(lang, "permWrite")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2 font-medium",
									children: t(lang, "permUnlock")
								})
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: SCOPE_CATALOG.map((scope) => {
							const level = map[scope.id] ?? "none";
							const hint = level === "write" ? scope.write : scope.read;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-b border-rule/70",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-3 pr-3 text-left font-mono text-sm font-medium",
										children: scope.label
									}),
									[
										"none",
										"read",
										"write"
									].map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-3 pr-3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											"aria-pressed": level === opt,
											onClick: () => setLevel(scope.id, opt),
											className: cn("min-h-11 rounded-[var(--radius-sm)] border px-2.5 py-1 font-mono text-2xs uppercase tracking-wide transition-colors duration-[var(--motion-quick)]", level === opt ? "border-ink bg-ink text-paper" : "border-rule text-muted hover:border-ink/40 hover:text-ink"),
											children: levelLabel[opt]
										})
									}, opt)),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-3 text-muted",
										children: hint
									})
								]
							}, scope.id);
						}) })]
					})
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "min-w-0 lg:sticky lg:top-24 lg:self-start",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-2xs tracking-[0.18em] text-muted uppercase",
					children: t(lang, "permYaml")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
					className: "mt-3 overflow-x-auto rounded-[var(--radius-lg)] border border-rule bg-raised/70 p-4 font-mono text-xs leading-relaxed text-ink",
					children: yaml
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						onClick: attest,
						children: t(lang, "permAttest")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "secondary",
						onClick: () => void copy(),
						children: t(lang, "permCopyBtn")
					})]
				})
			]
		})]
	});
}
function Field({ label, value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-mono text-2xs tracking-wider text-muted uppercase",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			value,
			onChange: (e) => onChange(e.target.value),
			className: "mt-1 h-11 w-full rounded-[var(--radius-md)] border border-rule bg-paper px-3 text-sm text-ink outline-none focus:border-ink/40 focus:ring-2 focus:ring-ink/15"
		})]
	});
}
var INNER = [
	{
		id: "audit",
		et: "Töövoog",
		en: "Workflow"
	},
	{
		id: "jwt",
		et: "JWT",
		en: "JWT"
	},
	{
		id: "permissions",
		et: "Õigused",
		en: "Permissions"
	}
];
function SteelAudit() {
	const lang = useSteel((s) => s.lang);
	const tab = useAudit((s) => s.tab);
	const setTab = useAudit((s) => s.setTab);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-mono text-2xs tracking-[0.2em] text-steel uppercase",
			children: t(lang, "auditKicker")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-2 text-3xl sm:text-4xl",
			children: t(lang, "auditTitle")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 max-w-prose text-sm leading-relaxed text-muted",
			children: t(lang, "auditLead")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "nav-scroll mt-5 flex flex-nowrap gap-1 overflow-x-auto",
			children: INNER.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setTab(item.id),
				className: cn("min-h-11 shrink-0 rounded-[var(--radius-sm)] px-3 text-sm", tab === item.id ? "bg-ink text-paper" : "text-muted hover:bg-ink/[0.06] hover:text-ink"),
				children: lang === "et" ? item.et : item.en
			}, item.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8",
			children: [
				tab === "audit" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuditWorkspace, {}) : null,
				tab === "jwt" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(JwtLab, {}) : null,
				tab === "permissions" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PermissionBuilder, {}) : null
			]
		})
	] });
}
var NODES = [
	{
		id: "in",
		label: "Desk in",
		sub: "Mic · ASIO loop · MIDI"
	},
	{
		id: "hpf",
		label: "High-pass",
		sub: "DC / rumble"
	},
	{
		id: "eq",
		label: "EQ",
		sub: "Lo · mid · hi"
	},
	{
		id: "sat",
		label: "Tape sat",
		sub: "Soft tanh"
	},
	{
		id: "comp",
		label: "Bus comp",
		sub: "Feed-forward"
	},
	{
		id: "transient",
		label: "Transient",
		sub: "Kernel 3.5+"
	},
	{
		id: "limit",
		label: "Brickwall",
		sub: "0.95 ceil"
	},
	{
		id: "out",
		label: "Web out",
		sub: "Worklet → page"
	}
];
function SteelPipeline() {
	const addons = useSteel((s) => s.addons);
	const kernel = useSteel((s) => s.kernel);
	const webOut = useSteel((s) => s.webOut);
	const patch = useSteel((s) => s.patch);
	const peak = useSteel((s) => s.peak);
	const armed = useSteel((s) => s.armed);
	function toggle(id) {
		if (id === "in" || id === "out") return;
		if (id === "transient" && !versionGte(kernel, "3.5.0")) return;
		patch({ addons: {
			...addons,
			[id]: !addons[id]
		} });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-mono text-2xs tracking-[0.2em] text-steel uppercase",
			children: "Insert chain"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-2 text-3xl",
			children: "Steel-structure the graph, then push it to the page."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 max-w-prose text-sm text-muted",
			children: "Every block is an AudioWorklet insert. Bypass is a parameter, not a graph rebuild. Web out is a MediaStream destination — a virtual input the rest of the site (or a WebRTC peer) can tap."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
			children: NODES.map((node, i) => {
				const locked = node.id === "transient" && !versionGte(kernel, "3.5.0");
				const on = node.id === "in" || node.id === "out" ? node.id === "out" ? webOut : true : Boolean(addons[node.id]);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => {
						if (node.id === "out") setWebTap(!webOut);
						else toggle(node.id);
					},
					disabled: locked,
					className: cn("flex h-full min-h-28 w-full flex-col rounded-[var(--radius-md)] border px-4 py-4 text-left transition-colors duration-[var(--motion-quick)]", on ? "border-live/50 bg-live/10" : "border-rule bg-raised/40", locked && "opacity-40"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-2xs text-faint",
							children: String(i + 1).padStart(2, "0")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-2 font-display text-xl",
							children: node.label
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-1 text-xs text-muted",
							children: locked ? "Needs kernel 3.5.0" : node.sub
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: cn("mt-3 font-mono text-2xs uppercase tracking-wider", on ? "text-live" : "text-faint"),
							children: on ? "in circuit" : "bypassed"
						})
					]
				}) }, node.id);
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 rounded-[var(--radius-md)] border border-rule px-4 py-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-2xs tracking-wider text-muted uppercase",
				children: "Web pipeline"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-sm text-muted",
				children: [
					"Processed audio is mixed to the page output and cloned to a MediaStream. Peak",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-mono text-ink tabular-nums",
						children: [(peak * 100).toFixed(0), "%"]
					}),
					armed ? " · kernel armed" : " · arm the kernel first",
					". Tap the keys or a DAW MIDI port — the same graph feeds speakers and the web tap."
				]
			})]
		})
	] });
}
var BUS_OBJECTS = [
	{
		id: "HOST-FACE",
		wave: 26,
		door: "command-block",
		why: "Contract object only. Not a second motor."
	},
	{
		id: "STAB-NOTE",
		wave: 26,
		door: "theory-mirror",
		why: "Spine slot. Mid stability inside MI44OR-5GEM."
	},
	{
		id: "WRITE-LAYOUT",
		wave: 26,
		door: "equalizer",
		why: "Same compiled graph. Keep rate and depth."
	},
	{
		id: "FILE-DATE",
		wave: 26,
		door: "ip-api-lookup",
		why: "Date on disk. Not lat/lon. No third vendor."
	},
	{
		id: "ENJAMB-NOTE",
		wave: 27,
		door: "rhyme-lock",
		why: "Line-break vs TAKT-LOCK. Seed stays locked."
	},
	{
		id: "STAGE-NOTE",
		wave: 27,
		door: "equalizer",
		why: "Write constraint. LADDER-CORE stays the engine."
	},
	{
		id: "LADDER-EARLY",
		wave: 27,
		door: "equalizer",
		why: "When a write is thinned, keep earlier-stage nonlinearities first."
	},
	{
		id: "WDF-STATIC",
		wave: 27,
		door: "equalizer",
		why: "Same compiled graph we already name."
	},
	{
		id: "CV-GR",
		wave: 27,
		door: "equalizer",
		why: "Three numbers only. No fourth loudness pane."
	},
	{
		id: "METER-NOTE",
		wave: 27,
		door: "theory-mirror",
		why: "Crest / LUFS slot. Loudness does not restyle the house."
	},
	{
		id: "ONSET-NOTE",
		wave: 27,
		door: "theory-mirror",
		why: "PD magnitude into TAKT-LOCK. Not a pianist extra."
	},
	{
		id: "FORM-NOTE",
		wave: 27,
		door: "theory-mirror",
		why: "Form geometry, file-only. No timeline extra."
	},
	{
		id: "TSI-FORM",
		wave: 27,
		door: "theory-mirror",
		why: "File-only. α/β not printed."
	},
	{
		id: "GEO-MMDB",
		wave: 27,
		door: "ip-api-lookup",
		why: "Fallback when live dies. Same field mask."
	},
	{
		id: "R128-96K",
		wave: 27,
		door: "equalizer",
		why: "BS.1770-5 still in force. No fake I from upsample."
	},
	{
		id: "LANG-MIX",
		wave: 27,
		door: "rhyme-lock",
		why: "ET/EN/RU/ES/DE follows the seed. No A–Z fold."
	},
	{
		id: "TAG-WRITE",
		wave: 27,
		door: "equalizer",
		why: "Metadata only. PCM untouched."
	}
];
/** Published lyrics from the promoted brief. Not a voice-print. URL never enters ffmpeg. */
var BUS_DROPS = [{
	id: "drop-a",
	brief: "DEMXNS & ANGELS — sky, limits, angels fall. Brief only.",
	seed: [
		"In the sky, no ones watching us",
		"in the sky, no ones waiting",
		"the angels, will fall down",
		"the angels will fall",
		"",
		"how long can i pretend im fine, and my limits",
		"they’re all in my mind",
		"i dont know how much i can take",
		"i dont know how much i can take"
	].join("\n"),
	objects: [
		"ENJAMB-NOTE",
		"TAKT-LOCK",
		"LANG-MIX",
		"STAGE-NOTE"
	],
	ffmpeg: false,
	clone: false
}, {
	id: "drop-b",
	brief: "33rd glass — trap/boom stress. No published bars on the brief. Tags only.",
	seed: "",
	objects: [
		"ONSET-NOTE",
		"TAKT-LOCK",
		"DIRT-COL"
	],
	ffmpeg: false,
	clone: false
}];
function busGazette() {
	return {
		wave: 27,
		extras: [...EXTRA_IDS],
		extrasCount: EXTRA_IDS.length,
		objects: BUS_OBJECTS,
		drops: BUS_DROPS.map((d) => ({
			id: d.id,
			brief: d.brief,
			hasSeed: Boolean(d.seed.trim()),
			ffmpeg: false,
			clone: false
		})),
		fiveX: "spine + dirt/clear + container honesty + takt lock + written curve",
		geo: "ip-api-lookup only. FILE-DATE is a date, not lat/lon.",
		commandBlock: "impulse → chain. Signal forwards. MOTOR always.",
		clone: false,
		extra11: false
	};
}
var lookupHost = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("c244bf9d2a84abd80e71350a3b24ae789f10e088f6681ba97f3513e34509772a"));
var LOCK = {
	GEO_LOOKUP: false,
	RHYME_LOCK: true,
	THEORY_EMIT: false,
	EQ_WRITE: true,
	MOTOR: false,
	STANDIN: false,
	MEASURE: false,
	MIMIC: false
};
function nightChain() {
	const ops = [
		{
			kind: "impulse",
			cond: "always",
			op: "THEORY_EMIT"
		},
		{
			kind: "chain",
			cond: "seed",
			op: "RHYME_LOCK"
		},
		{
			kind: "chain",
			cond: "always",
			op: "GEO_LOOKUP"
		},
		{
			kind: "chain",
			cond: "always",
			op: "EQ_WRITE"
		},
		{
			kind: "chain",
			cond: "always",
			op: "MOTOR"
		}
	];
	return ops.map((b, i) => ({
		...b,
		i,
		facing: i + 1 < ops.length ? i + 1 : null,
		activated: true
	}));
}
function gate(block, prevSuccess, ctx) {
	if (block.cond === "ok" && prevSuccess <= 0) return {
		ok: false,
		note: "cond ok — predecessor success 0"
	};
	if (block.cond === "fail" && prevSuccess > 0) return {
		ok: false,
		note: "cond fail — predecessor success > 0"
	};
	if (block.cond === "seed" && !ctx.seed.trim()) return {
		ok: false,
		note: "tags — empty seed"
	};
	if (block.cond === "rap" && !ctx.rapped) return {
		ok: false,
		note: "mimic waits for a rapped take"
	};
	if (block.cond === "armed" && !ctx.armed) return {
		ok: false,
		note: "needs arm"
	};
	return {
		ok: true,
		note: "fire"
	};
}
function execOp(op, ctx) {
	if (op === "RHYME_LOCK") {
		if (!ctx.seed.trim()) return {
			ok: false,
			note: "tags — empty seed"
		};
		return {
			ok: true,
			note: "seed locked verbatim"
		};
	}
	if (op === "GEO_LOOKUP") return ctx.geoOk ? {
		ok: true,
		note: "geoBusy only"
	} : {
		ok: false,
		note: "geo fail — processing untouched"
	};
	if (op === "MIMIC") {
		if (!ctx.rapped) return {
			ok: false,
			note: "refuse — no rapped take"
		};
		return {
			ok: true,
			note: "dsp toward scalars"
		};
	}
	if (op === "THEORY_EMIT") return {
		ok: true,
		note: "extras 10"
	};
	if (op === "MOTOR") return {
		ok: true,
		note: "motor independent of geo"
	};
	if (op === "STANDIN") return {
		ok: true,
		note: "stand-in tags, not a clone"
	};
	if (op === "MEASURE") return {
		ok: true,
		note: "scalars only"
	};
	if (op === "EQ_WRITE") return {
		ok: true,
		note: "keep rate, no upsample"
	};
	return {
		ok: true,
		note: "ok"
	};
}
/**
* Minecraft analog:
* - Any fired block triggers the chain it faces, same tick, arrow order.
* - Conditional skips the command when the block behind did not succeed.
* - Skip still forwards. Loops fire each block at most once per tick.
* - Inactive (needs not met) forwards without executing.
*/
function runChain(blocks, ctx) {
	const log = [];
	const success = new Array(blocks.length).fill(0);
	const seen = /* @__PURE__ */ new Set();
	const trigger = (i, prevSuccess) => {
		const b = blocks[i];
		if (!b) return;
		if (seen.has(i)) return;
		seen.add(i);
		const lockProcessing = Boolean(LOCK[b.op]);
		if (!b.activated) {
			success[i] = 0;
			log.push({
				i,
				op: b.op,
				kind: b.kind,
				cond: b.cond,
				fired: false,
				forwarded: b.facing !== null,
				success: 0,
				note: "inactive — forward",
				lockProcessing
			});
			if (b.facing !== null) trigger(b.facing, 0);
			return;
		}
		const g = gate(b, prevSuccess, ctx);
		if (!g.ok) {
			success[i] = 0;
			log.push({
				i,
				op: b.op,
				kind: b.kind,
				cond: b.cond,
				fired: false,
				forwarded: b.facing !== null,
				success: 0,
				note: g.note,
				lockProcessing: false
			});
			if (b.facing !== null) trigger(b.facing, 0);
			return;
		}
		const result = execOp(b.op, ctx);
		success[i] = result.ok ? 1 : 0;
		log.push({
			i,
			op: b.op,
			kind: b.kind,
			cond: b.cond,
			fired: true,
			forwarded: b.facing !== null,
			success: success[i],
			note: result.note,
			lockProcessing: b.op === "GEO_LOOKUP" ? false : lockProcessing
		});
		if (b.facing !== null) trigger(b.facing, success[i]);
	};
	if (blocks.length) trigger(0, 1);
	return log;
}
var lockRhyme = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("e366012e87c7f9f61afe69826e18e78acf2adce9c73cb30ecb29117424df0845"));
function deskGenre(g) {
	if (g === "rawstyle") return "rawstyle";
	if (g === "techno") return "hardtechno";
	if (g === "hardstyle") return "hardstyle";
	return "commercial";
}
function studioGenre(g) {
	if (g === "rawstyle") return "rawstyle";
	if (g === "hardtechno") return "techno";
	if (g === "hardstyle") return "hardstyle";
	return "rap";
}
function curveToEq(curve) {
	const g = emptyEq();
	const scoop = nearestBand(curve.scoopHz);
	const presence = nearestBand(curve.presenceHz);
	const air = nearestBand(curve.airHz);
	g[scoop] = clampEq(curve.scoopDb);
	g[presence] = clampEq(curve.presenceDb);
	g[air] = clampEq(curve.airDb);
	if (g[2] === 0) g[2] = clampEq(curve.scoopDb * .35);
	return g;
}
function applyExtras(extras) {
	const desk = useDesk.getState();
	const grab = (id) => extras.find((e) => e.id === id);
	const gem = grab("MI44OR-5GEM");
	const dirt = grab("DIRT-COL");
	const energy = grab("ENERGY-MATCH");
	const stereo = grab("STEREO-MX");
	const takt = grab("TAKT-LOCK");
	desk.set({
		kare: Math.min(1, Math.max(.15, (gem?.intensity ?? 7) / 10)),
		drive: Math.min(1, (dirt?.on ? dirt.intensity : 2) / 12),
		glue: Math.min(1, (energy?.intensity ?? 5) / 10),
		width: Math.min(1, (stereo?.intensity ?? 5) / 10),
		autoTakt: Boolean(takt?.on),
		applyMix: true
	});
	pushParams();
}
async function runOp(op, ctx) {
	const rack = useRack.getState();
	const desk = useDesk.getState();
	if (op === "THEORY_EMIT") {
		const genre = studioGenre(desk.genre);
		const bank = BANKS.find((b) => b.curve.genre === genre) ?? BANKS[0];
		const spine = buildSpine({
			genre,
			bpm: desk.bpm,
			bank,
			curve: bank.curve,
			paste: rack.paste || desk.palve,
			dirtBias: .45,
			nightLane: true
		});
		useRack.getState().set({
			spine,
			extras: spine.extras
		});
		applyExtras(spine.extras);
		await applyGenre(deskGenre(genre));
		return {
			ok: true,
			note: `extras ${spine.extras.length}`
		};
	}
	if (op === "RHYME_LOCK") {
		const seed = (ctx.seed || rack.seed || desk.lyrics || desk.palve).trim();
		if (!seed) {
			useRack.getState().set({
				rhymeOut: "",
				note: "tags — empty seed"
			});
			return {
				ok: false,
				note: "tags — empty seed"
			};
		}
		const lang = desk.lyrics.match(/[а-яё]/i) ? "ru" : desk.lyrics.match(/[õäöüšž]/i) ? "et" : "en";
		const res = await lockRhyme({ data: {
			seed,
			bpm: desk.bpm,
			lang,
			want: "fix"
		} });
		if (!res.ok) {
			useDesk.getState().set({ lyrics: seed });
			useRack.getState().set({
				rhymeOut: seed,
				seed
			});
			return {
				ok: true,
				note: `verbatim · ${res.error}`
			};
		}
		useDesk.getState().set({ lyrics: res.text.slice(0, 2e3) });
		useRack.getState().set({
			rhymeOut: res.text,
			seed
		});
		return {
			ok: true,
			note: "seed locked verbatim"
		};
	}
	if (op === "GEO_LOOKUP") {
		useRack.getState().set({ geoBusy: true });
		try {
			const res = await lookupHost({ data: { query: rack.geoQuery || void 0 } });
			if (res.ok) {
				useRack.getState().set({
					geoLine: `${res.line} · ${res.isp}`,
					geoBusy: false
				});
				return {
					ok: true,
					note: "geoBusy only"
				};
			}
			useRack.getState().set({
				geoLine: res.error,
				geoBusy: false
			});
			return {
				ok: false,
				note: `geo fail — processing untouched`
			};
		} catch {
			useRack.getState().set({
				geoBusy: false,
				geoLine: "timeout"
			});
			return {
				ok: false,
				note: "geo fail — processing untouched"
			};
		}
	}
	if (op === "EQ_WRITE") {
		const genre = studioGenre(desk.genre);
		const bank = BANKS.find((b) => b.curve.genre === genre) ?? BANKS[0];
		const gains = curveToEq(bank.curve);
		useDesk.getState().set({ eq: gains });
		setEqGains(gains);
		return {
			ok: true,
			note: `keep rate · ${bank.name}`
		};
	}
	if (op === "MOTOR") {
		const steel = useSteel.getState();
		if (steel.armed) {
			pushParams$1();
			playNote(true, 36, .55);
			window.setTimeout(() => void playNote(false, 36), 120);
		}
		try {
			if (!useDesk.getState().playing) await playMix();
			return {
				ok: true,
				note: steel.armed ? "OS motor + web mix" : "web mix — OS not armed"
			};
		} catch {
			return {
				ok: true,
				note: steel.armed ? "OS motor · mix slots empty" : "motor ready — load mix slots"
			};
		}
	}
	return {
		ok: true,
		note: "ok"
	};
}
/** Night default, then execute each fired op. Skip still forwards. Geo never jams processing. */
async function fireNightPacket() {
	const rack = useRack.getState();
	const desk = useDesk.getState();
	const seed = (rack.seed || desk.lyrics || desk.palve).trim();
	const ctx = {
		seed,
		rapped: false,
		armed: useSteel.getState().armed,
		geoOk: true
	};
	const plan = runChain(nightChain(), ctx);
	const out = [];
	for (const step of plan) {
		if (!step.fired) {
			out.push(step);
			continue;
		}
		const result = await runOp(step.op, {
			...ctx,
			seed
		});
		out.push({
			...step,
			success: result.ok ? 1 : 0,
			note: result.note,
			lockProcessing: step.op === "GEO_LOOKUP" ? false : step.lockProcessing
		});
	}
	useRack.getState().set({
		chainLog: out,
		busy: false,
		place: "os"
	});
	return out;
}
async function exportBankBook() {
	const wb = new import_excel.default.Workbook();
	wb.creator = "STEEL";
	wb.created = /* @__PURE__ */ new Date();
	const sheet = wb.addWorksheet("Banks", { views: [{
		state: "frozen",
		ySplit: 1
	}] });
	sheet.columns = [
		{
			header: "id",
			width: 14
		},
		{
			header: "name",
			width: 14
		},
		{
			header: "lane",
			width: 8
		},
		{
			header: "genre",
			width: 12
		},
		{
			header: "hp",
			width: 8
		},
		{
			header: "scoopHz",
			width: 10
		},
		{
			header: "scoopDb",
			width: 10
		},
		{
			header: "presenceHz",
			width: 12
		},
		{
			header: "presenceDb",
			width: 12
		},
		{
			header: "airHz",
			width: 10
		},
		{
			header: "airDb",
			width: 8
		},
		{
			header: "sat",
			width: 8
		},
		{
			header: "delay",
			width: 8
		},
		{
			header: "space",
			width: 8
		},
		{
			header: "retune",
			width: 10
		},
		{
			header: "amount",
			width: 10
		},
		{
			header: "formant",
			width: 10
		},
		{
			header: "width",
			width: 8
		},
		{
			header: "dirt",
			width: 8
		},
		{
			header: "clear",
			width: 8
		},
		{
			header: "key",
			width: 8
		},
		{
			header: "scale",
			width: 12
		},
		{
			header: "note",
			width: 42
		}
	];
	for (const b of BANKS) {
		const c = b.curve;
		sheet.addRow([
			b.id,
			b.name,
			b.lane,
			c.genre,
			c.hp,
			c.scoopHz,
			c.scoopDb,
			c.presenceHz,
			c.presenceDb,
			c.airHz,
			c.airDb,
			c.sat,
			c.delay,
			c.space,
			c.retune,
			c.amount,
			c.formant,
			c.width,
			c.dirt,
			c.clear,
			c.key,
			c.scale,
			b.noteEn
		]);
	}
	const plug = wb.addWorksheet("Plugins");
	plug.columns = [{
		header: "id",
		width: 18
	}, {
		header: "loads after select",
		width: 28
	}];
	for (const id of PLUGIN_IDS) plug.addRow([id, "yes — container sealed until pick"]);
	const extras = wb.addWorksheet("Extras");
	extras.columns = [
		{
			header: "id",
			width: 16
		},
		{
			header: "os",
			width: 28
		},
		{
			header: "web",
			width: 28
		},
		{
			header: "host",
			width: 28
		}
	];
	for (const lane of EXPANSIONS) extras.addRow([
		lane.extra,
		lane.os,
		lane.web,
		lane.host
	]);
	const places = wb.addWorksheet("Places");
	places.columns = [
		{
			header: "place",
			width: 10
		},
		{
			header: "et",
			width: 18
		},
		{
			header: "en",
			width: 18
		},
		{
			header: "ru",
			width: 18
		},
		{
			header: "note",
			width: 52
		}
	];
	for (const p of PLACES) places.addRow([
		p.id,
		p.et,
		p.en,
		p.ru,
		p.note
	]);
	const atlas = wb.addWorksheet("Atlas250", { views: [{
		state: "frozen",
		ySplit: 1
	}] });
	atlas.columns = [
		{
			header: "i",
			width: 6
		},
		{
			header: "extra",
			width: 16
		},
		{
			header: "kind",
			width: 10
		},
		{
			header: "target",
			width: 16
		},
		{
			header: "os",
			width: 36
		},
		{
			header: "web",
			width: 36
		},
		{
			header: "host",
			width: 36
		}
	];
	for (const c of ATLAS) atlas.addRow([
		c.i,
		c.extra,
		c.kind,
		c.target,
		c.os,
		c.web,
		c.host
	]);
	if (ATLAS.length !== ATLAS_COUNT) throw new Error("atlas sheet must be 250");
	const bus = wb.addWorksheet("Bus27");
	bus.columns = [
		{
			header: "id",
			width: 16
		},
		{
			header: "wave",
			width: 8
		},
		{
			header: "door",
			width: 18
		},
		{
			header: "why",
			width: 52
		}
	];
	for (const o of BUS_OBJECTS) bus.addRow([
		o.id,
		o.wave,
		o.door,
		o.why
	]);
	const buf = await wb.xlsx.writeBuffer();
	downloadBlob(new Blob([buf], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }), "steel-atlas-250.xlsx");
}
var SKILLS = [
	{
		id: "theory-mirror",
		door: "10 extras · no 11th"
	},
	{
		id: "rhyme-lock",
		door: "seed verbatim"
	},
	{
		id: "equalizer",
		door: "10-band · keep rate"
	},
	{
		id: "ip-api-lookup",
		door: "geoBusy only"
	},
	{
		id: "command-block",
		door: "impulse → chain → motor"
	},
	{
		id: "addable-bus",
		door: "wave 27 objects"
	},
	{
		id: "xlsx",
		door: "banks + places book"
	},
	{
		id: "skill-creator",
		door: "this rack"
	}
];
function SteelStudio() {
	const lang = useSteel((s) => s.lang);
	const rack = useRack();
	const desk = useDesk();
	const [eqOpen, setEqOpen] = (0, import_react.useState)(true);
	const gazette = (0, import_react.useMemo)(() => busGazette(), []);
	async function onImpulse() {
		rack.set({
			busy: true,
			note: null
		});
		try {
			const motor = (await fireNightPacket()).find((s) => s.op === "MOTOR");
			toast.success(motor?.note ?? t(lang, "chainFire"));
		} catch {
			toast.error(t(lang, "needSlots"));
			rack.set({ busy: false });
		}
	}
	async function onRhyme() {
		const seed = (rack.seed || desk.lyrics || desk.palve).trim();
		if (!seed) {
			toast.error(t(lang, "rhymeEmpty"));
			return;
		}
		rack.set({ busy: true });
		const res = await lockRhyme({ data: {
			seed,
			bpm: desk.bpm,
			lang: lang === "ru" ? "ru" : lang === "et" ? "et" : "en",
			want: "fix"
		} });
		rack.set({
			busy: false,
			seed,
			rhymeOut: res.ok ? res.text : seed
		});
		if (res.ok) desk.set({ lyrics: res.text.slice(0, 2e3) });
		toast.success(res.ok ? t(lang, "rhymeOk") : t(lang, "rhymeVerbatim"));
	}
	async function onGeo() {
		rack.set({ geoBusy: true });
		const res = await lookupHost({ data: { query: rack.geoQuery || void 0 } });
		rack.set({
			geoBusy: false,
			geoLine: res.ok ? `${res.line} · ${res.isp}` : res.error
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "min-w-0",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-2xs tracking-[0.2em] text-steel uppercase",
					children: t(lang, "studioKicker")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 text-3xl sm:text-4xl",
					children: t(lang, "studioTitle")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-prose text-sm leading-relaxed text-muted",
					children: t(lang, "studioLead")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "live",
						"data-qa": "impulse",
						"aria-label": "Impulse",
						onClick: () => void onImpulse(),
						disabled: rack.busy,
						children: rack.busy ? t(lang, "aiBusy") : t(lang, "impulse")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "secondary",
						onClick: () => void exportBankBook(),
						children: t(lang, "xlsxGo")
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 font-mono text-2xs text-faint",
					children: t(lang, "chainHint")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-2xs tracking-wider text-muted uppercase",
							children: t(lang, "rhymeTitle")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: rack.seed,
							onChange: (e) => rack.set({ seed: e.target.value }),
							placeholder: t(lang, "rhymePh"),
							rows: 4,
							className: "mt-2 w-full rounded-[var(--radius-md)] border border-rule bg-raised p-3 text-sm"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "secondary",
								size: "sm",
								onClick: () => void onRhyme(),
								disabled: rack.busy,
								children: t(lang, "rhymeGo")
							})
						}),
						rack.rhymeOut ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
							className: "mt-3 max-h-40 overflow-auto whitespace-pre-wrap rounded-[var(--radius-md)] border border-rule bg-paper p-3 font-mono text-2xs leading-relaxed text-muted",
							children: rack.rhymeOut
						}) : null
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-2xs tracking-wider text-muted uppercase",
							children: t(lang, "eqTitle")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "mt-1 font-mono text-2xs text-faint",
							onClick: () => setEqOpen((v) => !v),
							children: eqOpen ? t(lang, "less") : t(lang, "more")
						}),
						eqOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "nav-scroll mt-3 flex gap-2 overflow-x-auto pb-2",
							children: EQ_HZ.map((hz, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex w-11 shrink-0 flex-col items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-2xs tabular-nums text-muted",
										children: (desk.eq[i] ?? 0).toFixed(0)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "range",
										min: -12,
										max: 12,
										step: .5,
										value: desk.eq[i] ?? 0,
										onChange: (e) => {
											const next = desk.eq.slice();
											next[i] = Number(e.target.value);
											desk.set({ eq: next });
											setEqGains(next);
										},
										className: "h-28 w-11 cursor-pointer appearance-none bg-transparent",
										style: {
											writingMode: "vertical-lr",
											direction: "rtl"
										},
										"aria-label": `${labelHz(hz)} Hz`
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-2xs text-faint",
										children: labelHz(hz)
									})
								]
							}, hz))
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 font-mono text-2xs text-faint",
							children: t(lang, "eqNote")
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-2xs tracking-wider text-muted uppercase",
							children: t(lang, "geoTitle")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 flex flex-wrap gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: rack.geoQuery,
								onChange: (e) => rack.set({ geoQuery: e.target.value }),
								placeholder: "ipv4 / domain",
								className: "min-h-11 min-w-0 flex-1 rounded-[var(--radius-md)] border border-rule bg-raised px-3 text-sm"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "secondary",
								onClick: () => void onGeo(),
								disabled: rack.geoBusy,
								children: rack.geoBusy ? t(lang, "aiBusy") : t(lang, "geoGo")
							})]
						}),
						rack.geoLine ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 font-mono text-2xs text-muted",
							children: rack.geoLine
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 font-mono text-2xs text-faint",
							children: t(lang, "geoNote")
						})
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "min-w-0 rounded-[var(--radius-lg)] border border-rule bg-raised/60 p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-2xs tracking-wider text-muted uppercase",
					children: t(lang, "skillRack")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 divide-y divide-rule",
					children: SKILLS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-baseline justify-between gap-3 py-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-2xs tracking-wider uppercase",
							children: s.id
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-2xs text-faint",
							children: s.door
						})]
					}, s.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 font-mono text-2xs tracking-wider text-muted uppercase",
					children: t(lang, "extrasTitle")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-2 space-y-1",
					children: (rack.extras.length ? rack.extras : EXPANSIONS.map((e) => ({
						id: e.extra,
						on: true,
						intensity: 6,
						action: e.web,
						why: e.os
					}))).map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "grid min-w-0 grid-cols-[7rem_minmax(0,1fr)] gap-2 font-mono text-2xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: cn("uppercase", "on" in e && e.on === false ? "text-faint" : "text-ink"),
							children: e.id
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate text-faint",
							children: e.why ?? e.action
						})]
					}, e.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 font-mono text-2xs text-faint",
					children: [
						"extras ",
						gazette.extrasCount,
						" · extra11 false · clone false"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 font-mono text-2xs tracking-wider text-muted uppercase",
					children: t(lang, "chainFire")
				}),
				rack.chainLog.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-faint",
					children: t(lang, "chainEmpty")
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-2 space-y-1",
					children: rack.chainLog.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "font-mono text-2xs text-muted",
						children: [
							s.i,
							" ",
							s.op,
							" · ",
							s.fired ? "fire" : "skip",
							" · fwd ",
							s.forwarded ? "yes" : "no",
							" · ",
							s.note
						]
					}, s.i))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 font-mono text-2xs tracking-wider text-muted uppercase",
					children: t(lang, "busTitle")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-2 max-h-48 space-y-1 overflow-auto",
					children: BUS_OBJECTS.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "font-mono text-2xs text-muted",
						children: [
							o.id,
							" · ",
							o.door
						]
					}, o.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-xs leading-relaxed text-faint",
					children: t(lang, "studioNote")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 border-t border-rule pt-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-2xs tracking-wider text-muted uppercase",
						children: t(lang, "atlasTitle")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SteelAtlas, { compact: true })
					})]
				})
			]
		})]
	});
}
var routes_exports = /* @__PURE__ */ __exportAll({ component: () => Home });
function Home() {
	const tab = useSteel((s) => s.tab);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		tab === "desk" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SteelDesk, {}) : null,
		tab === "studio" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SteelStudio, {}) : null,
		tab === "console" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SteelConsole, {}) : null,
		tab === "aura" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuraStage, {}) : null,
		tab === "pipeline" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SteelPipeline, {}) : null,
		tab === "hosts" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SteelHosts, {}) : null,
		tab === "kernel" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SteelKernel, {}) : null,
		tab === "audit" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SteelAudit, {}) : null
	] });
}
//#endregion
export { slugify as i, downloadBlob as n, formatStampDate as r, routes_exports as t };
