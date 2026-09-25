/**
 * Desk audio engine — recovered from compiled routes-DFtXkjIc.mjs (App Builder dump history).
 * Not invented; decompiled/restored for canonical src/. Prefer replacing with original TS when VCS recovers.
 *
 * F3: restored missing ./fx + ./clips + makeDemoVocal imports (nocheck had hidden ReferenceErrors),
 * added DeskHandle + export param types so this file typechecks without @ts-nocheck.
 */
import { makeBoomBap, makeDemoVocal, bufferToWav } from "./boom";
import {
	composeClips,
	detectClips,
	keepBestTakes,
	makeAdlibClips,
	makeBackClips,
	placeOnGrid,
	pitchToTonic,
	splitClipOnGrid,
	type VocalClip,
} from "./clips";
import { EQ_HZ, EQ_Q, type EqGains } from "./eq";
import {
	classifyMic,
	delaySeconds,
	genrePreset,
	irFor,
	kareFromV,
	type DelayId,
	type GenreId,
	type ReverbId,
} from "./fx";
import { useDesk, type TuneMode } from "./store";

type DeskSlot = {
	buffer: AudioBuffer | null;
	source: AudioBufferSourceNode | null;
	gain: GainNode;
};

/** Internal Web Audio graph handle for the Desk mix bus. */
type DeskHandle = {
	ctx: AudioContext;
	beat: DeskSlot;
	vocal: DeskSlot;
	vocalRaw: AudioBuffer | null;
	composed: AudioBuffer | null;
	tune: AudioWorkletNode;
	vocalIn: GainNode;
	mix: GainNode;
	duck: GainNode;
	glue: DynamicsCompressorNode;
	dest: MediaStreamAudioDestinationNode;
	analyser: AnalyserNode;
	vocalAn: AnalyserNode;
	mixBuf: Uint8Array<ArrayBuffer>;
	vocalBuf: Uint8Array<ArrayBuffer>;
	mic: MediaStreamAudioSourceNode | null;
	micStream: MediaStream | null;
	hpf: BiquadFilterNode;
	presence: BiquadFilterNode;
	air: BiquadFilterNode;
	delay: DelayNode;
	delayGain: GainNode;
	delayFb: GainNode;
	ping: DelayNode;
	convolver: ConvolverNode;
	revGain: GainNode;
	female: GainNode;
	femaleOsc: OscillatorNode[];
	tunnelLp: BiquadFilterNode;
	tunnelGain: GainNode;
	beatHp: BiquadFilterNode;
	nest: DelayNode;
	nestGain: GainNode;
	mirror: DelayNode;
	mirrorGain: GainNode;
	eq: BiquadFilterNode[];
};

let handle: DeskHandle | null = null;
let rec: MediaRecorder | null = null;
let recChunks: Blob[] = [];
let meterRaf = 0;
let micEq = {
	presence: 3.5,
	air: 1.5,
	hpf: 90,
	hz: 3200,
};
function estimateBpm(buffer: AudioBuffer) {
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
function applyGlue(h: DeskHandle, glue: number) {
	const t = h.ctx.currentTime;
	const g = Math.min(1, Math.max(0, glue));
	h.glue.threshold.setTargetAtTime(-8 - g * 16, t, .05);
	h.glue.knee.setTargetAtTime(4 + g * 8, t, .05);
	h.glue.ratio.setTargetAtTime(1.4 + g * 4.6, t, .05);
	h.glue.attack.setTargetAtTime(.006, t, .02);
	h.glue.release.setTargetAtTime(.12 + g * .16, t, .05);
}
function wireGlue(ctx: BaseAudioContext, glueAmt: number) {
	const glue = ctx.createDynamicsCompressor();
	const g = Math.min(1, Math.max(0, glueAmt));
	glue.threshold.value = -8 - g * 16;
	glue.knee.value = 4 + g * 8;
	glue.ratio.value = 1.4 + g * 4.6;
	glue.attack.value = .006;
	glue.release.value = .12 + g * .16;
	return glue;
}
function femaleMidi(tonic: number, mode: TuneMode | number) {
	const root = 48 + tonic;
	const third = mode === 2 ? 4 : 3;
	return [
		root,
		root + 7,
		root + 12,
		root + 12 + third
	];
}
function midiHz(m: number) {
	return 440 * Math.pow(2, (m - 69) / 12);
}
function retuneFemale(h: DeskHandle, tonic: number, mode: TuneMode | number) {
	const freqs = femaleMidi(tonic, mode).map(midiHz);
	const t = h.ctx.currentTime;
	h.femaleOsc.forEach((o: OscillatorNode, i: number) => {
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
	convolver.buffer = irFor(ctx, "gated" as ReverbId);
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
	const femaleOsc: OscillatorNode[] = [];
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
		mixBuf: new Uint8Array(analyser.fftSize) as Uint8Array<ArrayBuffer>,
		vocalBuf: new Uint8Array(vocalAn.fftSize) as Uint8Array<ArrayBuffer>,
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
export function tapDeskAudio() {
	if (!handle) return null;
	return {
		analyser: handle.analyser,
		stream: handle.dest.stream,
		ctx: handle.ctx
	};
}
export function pushParams() {
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
		handle.delay.delayTime.setTargetAtTime(delaySeconds(s.delay as DelayId, s.bpm), t, .04);
		handle.delayGain.gain.setTargetAtTime(s.delay === "off" || !s.applyMix ? 0 : s.delayMix, t, .04);
		handle.ping.delayTime.setTargetAtTime(s.delay === "ping" ? delaySeconds("1/16" as DelayId, s.bpm) : .004, t, .04);
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
			handle.eq.forEach((node: BiquadFilterNode, i: number) => {
				node.gain.setTargetAtTime(bands[i] ?? 0, t, .05);
			});
		}
		if (s.applyMix) handle.vocal.gain.gain.setTargetAtTime(Math.min(1.2, s.vocalGain * k.vocalPush), t, .04);
		applyGlue(handle, s.applyMix ? s.glue : s.glue * .4);
		if (handle.femaleOsc.length) retuneFemale(handle, s.tonic, s.mode);
	}
}
export function setEqGains(gains: EqGains) {
	useDesk.getState().set({ eq: gains.slice(0, EQ_HZ.length) });
	if (!handle) return;
	const t = handle.ctx.currentTime;
	handle.eq.forEach((node: BiquadFilterNode, i: number) => {
		node.gain.setTargetAtTime(gains[i] ?? 0, t, .04);
	});
}
export async function setFx(delay: DelayId | string, reverb: ReverbId | string) {
	const h = await ensure();
	h.convolver.buffer = irFor(h.ctx, (reverb === "off" ? "plate" : reverb) as ReverbId);
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
export async function setFemale(on: boolean) {
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
export async function decodeSlot(file: Blob) {
	const h = await ensure();
	const arr = await file.arrayBuffer();
	try {
		return await h.ctx.decodeAudioData(arr.slice(0));
	} catch {
		throw new Error("decode");
	}
}
export async function setBeatBuffer(buffer: AudioBuffer, name: string) {
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
function strongestTonic(regions: VocalClip[], fallback: number) {
	const ranked = [...regions].filter((c) => !c.muted && c.pitchHz > 70).sort((a, b) => b.score - a.score);
	if (!ranked[0]) return fallback;
	return pitchToTonic(ranked[0].pitchHz);
}
export async function setVocalBuffer(buffer: AudioBuffer, name: string) {
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
		selectedId: regions.find((c: VocalClip) => !c.muted)?.id ?? regions[0]?.id ?? null,
		tonic,
		aiNote: s.autoTakt ? "AI takt · beat + noot" : null
	});
}
export async function loadDemoBeat() {
	const h = await ensure();
	const buf = makeBoomBap(h.ctx, 8);
	h.beat.buffer = buf;
	useDesk.getState().set({
		beatName: "demo-90bpm.wav",
		error: null,
		bpm: 90
	});
}
export async function loadDemoVocal() {
	await setVocalBuffer(makeDemoVocal((await ensure()).ctx, 4), "demo-vocal.wav");
}
function startLoop(slot: DeskSlot, dest: AudioNode, ctx: AudioContext) {
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
export async function playMix() {
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
export function stopMix() {
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
function applyMicToGraph(label: string, sampleRate?: number, channels?: number) {
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
export async function startLiveMic() {
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
export function stopLiveMic() {
	if (!handle) return;
	handle.mic?.disconnect();
	handle.micStream?.getTracks().forEach((t: MediaStreamTrack) => t.stop());
	handle.mic = null;
	handle.micStream = null;
	useDesk.getState().set({ liveMic: false });
}
export async function toggleVoiceRec() {
	if (rec && rec.state === "recording") {
		const blob = await new Promise<Blob>((resolve) => {
			rec!.onstop = () => resolve(new Blob(recChunks, { type: rec!.mimeType || "audio/webm" }));
			rec!.stop();
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
export async function bounceWav() {
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
		delay.delayTime.value = delaySeconds(s.delay as DelayId, s.bpm);
		const dg = off.createGain();
		dg.gain.value = s.delay === "off" || !s.applyMix ? 0 : s.delayMix;
		const conv = off.createConvolver();
		conv.buffer = irFor(off, (s.reverb === "off" ? "plate" : s.reverb) as ReverbId);
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
export function sharpMix() {
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
export async function applyGenre(g: GenreId) {
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
export async function snapToGrid() {
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
export async function deleteSelected() {
	const s = useDesk.getState();
	if (!s.selectedId) return;
	const next = s.regions.filter((c: VocalClip) => c.id !== s.selectedId);
	useDesk.getState().set({
		regions: next,
		selectedId: next[0]?.id ?? null
	});
	await rebuildComposed();
}
export async function cutSelected() {
	const s = useDesk.getState();
	const clip = s.regions.find((c: VocalClip) => c.id === s.selectedId);
	if (!clip) return;
	const parts = splitClipOnGrid(clip, s.bpm);
	const next = s.regions.flatMap((c: VocalClip) => c.id === clip.id ? parts : [c]);
	useDesk.getState().set({
		regions: next,
		selectedId: parts[0]?.id ?? null
	});
	await rebuildComposed();
}
export async function makeAdlibs() {
	const s = useDesk.getState();
	const next = placeOnGrid(makeAdlibClips(s.regions, s.bpm), s.bpm);
	useDesk.getState().set({
		regions: next,
		aiNote: "Adlibid · sama take, pitch + tanh"
	});
	await rebuildComposed();
}
export async function makeBacks() {
	const s = useDesk.getState();
	const next = placeOnGrid(makeBackClips(s.regions, s.bpm), s.bpm);
	useDesk.getState().set({
		regions: next,
		backs: true,
		aiNote: "Backid · unison + oktav alla, sama take"
	});
	await rebuildComposed();
}
export async function keepBest() {
	const next = keepBestTakes(useDesk.getState().regions);
	useDesk.getState().set({
		regions: next,
		selectedId: next.find((c: VocalClip) => !c.muted)?.id ?? null,
		aiNote: "Nõrgad takes vaigistatud"
	});
	await rebuildComposed();
}
export async function applyFix() {
	const s = useDesk.getState();
	const kept = keepBestTakes(s.regions.filter((c: VocalClip) => c.score >= .018 || c.kind !== "main"));
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
export async function teardownDesk() {
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
export function pitchLabel(hz: number) {
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
