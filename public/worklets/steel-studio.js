/* STEEL STUDIO kernel — AudioWorklet, ASIO-style quantum, 4D matrix, Kärestik meters. */
const TRACKS = 6;
const STEPS = 16;
const KICK = 0;
const BASS = 1;
const HAT = 2;
const PERC = 3;
const LEAD = 4;
const VOCAL = 5;

class SteelStudioProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.sr = sampleRate;
    this.invSr = 1 / sampleRate;
    this.bpm = 150;
    this.swing = 0;
    this.genre = 0;
    this.playing = 0;
    this.step = 0;
    this.acc = 0;
    this.samplesPerStep = this.sr * (60 / this.bpm) / 4;
    this.pattern = new Float32Array(TRACKS * STEPS);
    this.bassMidi = new Float32Array(STEPS);
    this.leadMidi = new Float32Array(STEPS);
    this.gain = new Float32Array([0.92, 0.78, 0.42, 0.38, 0.55, 0.86]);
    this.pan = new Float32Array([0, 0, 0.15, -0.22, 0.08, 0]);
    this.mute = new Float32Array(TRACKS);
    this.send = new Float32Array([0, 0, 0.08, 0.12, 0.22, 0.28]);
    this.master = 0.82;
    this.drive = 0.45;
    this.glue = 0.5;
    this.ceiling = 0.92;
    this.width = 0.55;
    this.centerLock = 1;
    this.translate = 0;
    this.fxMix = 0.28;
    this.fxFb = 0.32;
    this.tuneAmt = 0.7;
    this.restore = 1;
    this.vocalHpf = 80;
    this.inGain = 1;
    this.formant = 1;
    this.retune = 0.05;
    this.scoopHz = 320;
    this.scoopDb = -2;
    this.presenceHz = 3200;
    this.presenceDb = 3;
    this.airHz = 8000;
    this.airDb = 1.2;
    this.bankSat = 0.2;
    this.bankDelay = 0.12;
    this.bankSpace = 0.2;
    this.melt = 0.86;
    this.vocalEnv = 0;
    this.key = 0;
    this.scaleIdx = 0;
    this.smoothRatio = 1;

    this.kickT = 99;
    this.kickPh = 0;
    this.kickVel = 0;
    this.bassT = 99;
    this.bassPh = 0;
    this.bassFreq = 49;
    this.bassVel = 0;
    this.bassSlide = 0;
    this.hatT = 99;
    this.hatOpen = 0;
    this.hatVel = 0;
    this.percT = 99;
    this.percVel = 0;
    this.leadT = 99;
    this.leadPh = 0;
    this.leadPh2 = 0;
    this.leadFreq = 440;
    this.leadVel = 0;
    this.liveLead = 0;
    this.liveFreq = 440;

    this.hpV = 0;
    this.hpK = 0;
    this.lpL = 0;
    this.lpR = 0;
    this.bpL = 0;
    this.bpR = 0;
    this.comp = 0;
    this.limit = 1;
    this.peakL = 0;
    this.peakR = 0;
    this.rmsAcc = 0;
    this.midAcc = 0;
    this.sideAcc = 0;
    this.frames = 0;
    this.voices = 0;
    this.dcL = 0;
    this.dcR = 0;

    this.delayLen = Math.min(this.sr * 2, 96000) | 0;
    this.dL = new Float32Array(this.delayLen);
    this.dR = new Float32Array(this.delayLen);
    this.dw = 0;
    this.dampL = 0;
    this.dampR = 0;

    this.cap = new Float32Array(1024);
    this.ci = 0;
    this.detected = 0;
    this.grain = new Float32Array(4096);
    this.gw = 0;
    this.gr = 0;
    this.scoopSt = 0;
    this.airSt = 0;
    this.presSt = 0;

    this.port.onmessage = (e) => this.onMsg(e.data);
  }

  onMsg(data) {
    if (!data || typeof data !== "object") return;
    switch (data.type) {
      case "params":
        Object.assign(this, data.params);
        this.samplesPerStep = this.sr * (60 / Math.max(40, this.bpm)) / 4;
        break;
      case "pattern":
        if (data.pattern) this.pattern.set(data.pattern);
        if (data.bassMidi) this.bassMidi.set(data.bassMidi);
        if (data.leadMidi) this.leadMidi.set(data.leadMidi);
        break;
      case "mix":
        if (data.gain) this.gain.set(data.gain);
        if (data.pan) this.pan.set(data.pan);
        if (data.mute) this.mute.set(data.mute);
        if (data.send) this.send.set(data.send);
        break;
      case "play":
        this.playing = data.on ? 1 : 0;
        if (data.on) {
          this.step = 0;
          this.acc = this.samplesPerStep;
        }
        break;
      case "noteOn": {
        this.liveLead = 1;
        this.liveFreq = 440 * Math.pow(2, ((data.note ?? 60) - 69) / 12);
        this.leadT = 0;
        this.leadVel = Math.max(0.05, Math.min(1, data.vel ?? 0.85));
        this.leadFreq = this.liveFreq;
        break;
      }
      case "noteOff":
        this.liveLead = 0;
        break;
      case "panic":
        this.playing = 0;
        this.liveLead = 0;
        this.kickT = 99;
        this.bassT = 99;
        this.hatT = 99;
        this.percT = 99;
        this.leadT = 99;
        break;
      default:
        break;
    }
  }

  trig(track) {
    const vel = this.pattern[track * STEPS + this.step];
    if (vel <= 0.02) return;
    if (this.mute[track] > 0.5) return;
    if (track === KICK) {
      this.kickT = 0;
      this.kickPh = 0;
      this.kickVel = vel;
    } else if (track === BASS) {
      this.bassT = 0;
      this.bassPh = 0;
      this.bassVel = vel;
      const midi = this.bassMidi[this.step] || 36;
      this.bassSlide = this.bassFreq;
      this.bassFreq = 440 * Math.pow(2, (midi - 69) / 12);
    } else if (track === HAT) {
      this.hatT = 0;
      this.hatVel = vel;
      this.hatOpen = this.step % 4 === 2 ? 1 : 0;
    } else if (track === PERC) {
      this.percT = 0;
      this.percVel = vel;
    } else if (track === LEAD) {
      this.leadT = 0;
      this.leadPh = 0;
      this.leadPh2 = 0.13;
      this.leadVel = vel;
      const midi = this.leadMidi[this.step] || 76;
      this.leadFreq = 440 * Math.pow(2, (midi - 69) / 12);
    }
  }

  tick(n) {
    if (!this.playing) return;
    let left = n;
    while (left > 0) {
      const remain = this.samplesPerStep - this.acc;
      if (remain <= 0.5) {
        const even = this.step % 2 === 1;
        const swingSamp = even ? this.swing * this.samplesPerStep * 0.45 : 0;
        this.acc = -swingSamp;
        this.trig(KICK);
        this.trig(BASS);
        this.trig(HAT);
        this.trig(PERC);
        this.trig(LEAD);
        this.step = (this.step + 1) % STEPS;
        left -= 1;
      } else {
        const take = Math.min(left, remain);
        this.acc += take;
        left -= take;
      }
    }
  }

  sat(x, amt) {
    const a = 1 + amt * 3.2;
    const y = Math.tanh(x * a);
    return y / Math.tanh(a);
  }

  process(inputs, outputs) {
    const out = outputs[0];
    if (!out || !out[0]) return true;
    const left = out[0];
    const right = out[1] || out[0];
    const n = left.length;
    const input = inputs[0];
    const iL = input && input[0] ? input[0] : null;
    const iR = input && input[1] ? input[1] : iL;

    this.tick(n);

    const hpCoeff = 1 - Math.exp((-2 * Math.PI * this.vocalHpf) / this.sr);
    const kickHp = 1 - Math.exp((-2 * Math.PI * 28) / this.sr);
    const glueAtk = 1 - Math.exp(-1 / (0.004 * this.sr));
    const glueRel = 1 - Math.exp(-1 / ((0.08 + this.glue * 0.18) * this.sr));
    const limAtk = 1 - Math.exp(-1 / (0.0015 * this.sr));
    const limRel = 1 - Math.exp(-1 / (0.08 * this.sr));
    const delaySamp = Math.max(
      64,
      Math.min(this.delayLen - 4, Math.floor(this.sr * (60 / Math.max(40, this.bpm)) * (this.genre >= 3 ? 0.75 : 0.375))),
    );
    const width = this.width;
    const drive = this.drive;
    const trans = this.translate;
    const gMaster = this.master * this.master;

    let peakL = this.peakL;
    let peakR = this.peakR;
    let rms = 0;
    let midA = 0;
    let sideA = 0;
    let voices = 0;

    for (let i = 0; i < n; i++) {
      let kL = 0;
      let kR = 0;
      let sL = 0;
      let sR = 0;

      if (this.kickT < 0.55) {
        voices++;
        const t = this.kickT;
        const drop = this.genre === 1 ? 55 : this.genre === 2 ? 38 : 48;
        const f = drop + (this.genre === 1 ? 220 : 170) * Math.exp(-t * (this.genre === 2 ? 38 : 46));
        this.kickPh += f * this.invSr;
        let body = Math.sin(2 * Math.PI * this.kickPh);
        body += 0.22 * Math.sin(4 * Math.PI * this.kickPh);
        const env = Math.exp(-t * (this.genre === 3 ? 9 : 11.5)) * this.kickVel;
        const click = (Math.random() * 2 - 1) * Math.exp(-t * 160) * 0.42 * this.kickVel;
        let s = this.sat(body, 0.25 + drive * 0.7) * env + click;
        this.hpK += kickHp * (s - this.hpK);
        s -= this.hpK;
        kL += s * this.gain[KICK];
        kR += s * this.gain[KICK];
        this.kickT += this.invSr;
      }

      if (this.bassT < (this.genre >= 4 ? 1.6 : 0.55)) {
        voices++;
        const t = this.bassT;
        const target = this.bassFreq;
        const freq = this.bassSlide + (target - this.bassSlide) * Math.min(1, t * (this.genre >= 4 ? 6 : 40));
        this.bassPh += freq * this.invSr;
        const env = Math.min(1, t * 90) * Math.exp(-t * (this.genre >= 4 ? 1.6 : 5.2)) * this.bassVel;
        let s = Math.sin(2 * Math.PI * this.bassPh) * env;
        s += 0.14 * Math.sin(4 * Math.PI * this.bassPh) * env;
        s = this.sat(s, 0.15 + drive * 0.45);
        kL += s * this.gain[BASS];
        kR += s * this.gain[BASS];
        this.bassT += this.invSr;
      }

      if (this.hatT < 0.22) {
        voices++;
        const t = this.hatT;
        const decay = this.hatOpen ? 18 : 70;
        const env = Math.exp(-t * decay) * this.hatVel * this.gain[HAT];
        const nz = (Math.random() * 2 - 1) * env;
        const p = this.pan[HAT];
        sL += nz * (1 - Math.max(0, p));
        sR += nz * (1 + Math.min(0, p));
        this.hatT += this.invSr;
      }

      if (this.percT < 0.28) {
        voices++;
        const t = this.percT;
        const env = Math.exp(-t * 22) * this.percVel * this.gain[PERC];
        const tone = Math.sin(2 * Math.PI * 190 * t) * Math.exp(-t * 18);
        const nz = Math.random() * 2 - 1;
        const s = (nz * 0.62 + tone * 0.5) * env;
        const p = this.pan[PERC];
        sL += s * (1 - Math.max(0, p));
        sR += s * (1 + Math.min(0, p));
        this.percT += this.invSr;
      }

      const leadOn = this.leadT < 0.85 || this.liveLead;
      if (leadOn) {
        voices++;
        const t = this.leadT;
        const env = this.liveLead
          ? this.leadVel
          : Math.min(1, t * 40) * Math.exp(-t * 3.4) * this.leadVel;
        const f = this.liveLead ? this.liveFreq : this.leadFreq;
        this.leadPh += f * this.invSr;
        this.leadPh2 += f * 1.007 * this.invSr;
        const saw = 2 * (this.leadPh % 1) - 1;
        const sq = this.leadPh2 % 1 > 0.5 ? 1 : -1;
        const ff = 700 + 2600 * Math.exp(-t * 6);
        const coef = 1 - Math.exp((-2 * Math.PI * ff) / this.sr);
        this.lpL += coef * (saw * 0.55 + sq * 0.28 - this.lpL);
        let s = this.sat(this.lpL, 0.3 + drive * 0.5) * env * this.gain[LEAD];
        const p = this.pan[LEAD];
        sL += s * (1 - Math.max(0, p));
        sR += s * (1 + Math.min(0, p));
        if (!this.liveLead) this.leadT += this.invSr;
      }

      let v = 0;
      if (iL) {
        v = (iL[i] + (iR ? iR[i] : iL[i])) * 0.5 * this.inGain;
        this.cap[this.ci] = v;
        this.ci = (this.ci + 1) & 1023;
        const hpF = this.vocalHpf > 20 ? this.vocalHpf : 80;
        const hpC = 1 - Math.exp((-2 * Math.PI * hpF) / this.sr);
        this.hpV += hpC * (v - this.hpV);
        v -= this.hpV;
        const scoopC = 1 - Math.exp((-2 * Math.PI * this.scoopHz) / this.sr);
        this.scoopSt += scoopC * (v - this.scoopSt);
        v += this.scoopSt * (this.scoopDb / 24);
        const presC = 1 - Math.exp((-2 * Math.PI * this.presenceHz * this.formant) / this.sr);
        this.presSt += presC * (v - this.presSt);
        v += this.presSt * (this.presenceDb / 18);
        const airC = 1 - Math.exp((-2 * Math.PI * this.airHz) / this.sr);
        this.airSt += airC * (v - this.airSt);
        v += (v - this.airSt) * (this.airDb / 18);
        if (this.restore) {
          v = this.sat(v * 1.15, 0.12 + this.bankSat);
        } else {
          v = this.sat(v, this.bankSat);
        }
        if (this.tuneAmt > 0.02 && (this.ci & 255) === 0) {
          this.detected = this.detect();
        }
        if (this.tuneAmt > 0.04 && this.detected > 70) {
          const target = this.snap(this.detected);
          const want = this.detected > 0 ? target / this.detected : 1;
          const k = 1 - Math.exp(-1 / (Math.max(0.008, this.retune) * this.sr));
          this.smoothRatio += k * (want - this.smoothRatio);
          this.grain[this.gw] = v;
          this.gr += this.smoothRatio;
          if (this.gr >= 4096) this.gr -= 4096;
          this.gw = (this.gw + 1) & 4095;
          const i0 = this.gr | 0;
          const t = this.gr - i0;
          const a = this.grain[i0 & 4095];
          const b = this.grain[(i0 + 1) & 4095];
          const wet = a * (1 - t) + b * t;
          v = v * (1 - this.tuneAmt) + wet * this.tuneAmt;
        }
        v *= this.gain[VOCAL] * (0.55 + this.melt * 0.45);
        if (this.mute[VOCAL] > 0.5) v = 0;
      }
      this.vocalEnv += (Math.abs(v) - this.vocalEnv) * 0.08;
      const duck = 1 - Math.min(0.4, this.vocalEnv * 0.55 * this.melt);
      sL *= duck;
      sR *= duck;
      const vL = v * (1 + width * 0.15);
      const vR = v * (1 - width * 0.15);
      sL += vL;
      sR += vR;

      const send =
        (kL + kR) * 0.04 * this.send[KICK] +
        sL * this.send[HAT] * 0.4 +
        sR * this.send[PERC] * 0.3 +
        (sL + sR) * 0.2 * this.send[LEAD] +
        v * (this.send[VOCAL] + this.bankSpace * 0.5 + this.bankDelay * 0.25);
      const ri = (this.dw - delaySamp + this.delayLen) % this.delayLen;
      const delayedL = this.dL[ri];
      const delayedR = this.dR[ri];
      this.dampL = this.dampL * 0.72 + delayedL * 0.28;
      this.dampR = this.dampR * 0.72 + delayedR * 0.28;
      this.dL[this.dw] = send * 0.7 + this.dampR * this.fxFb;
      this.dR[this.dw] = send * 0.7 + this.dampL * this.fxFb * 0.92;
      this.dw++;
      if (this.dw >= this.delayLen) this.dw = 0;
      sL += delayedL * this.fxMix;
      sR += delayedR * this.fxMix;

      let L = kL + sL;
      let R = kR + sR;

      if (this.centerLock) {
        const kickBass = (kL + kR) * 0.5;
        const mid = (sL + sR) * 0.5;
        const side = (sL - sR) * width;
        L = kickBass + mid + side;
        R = kickBass + mid - side;
      }

      if (trans === 1) {
        const mono = (L + R) * 0.5;
        this.bpR += (1 - Math.exp((-2 * Math.PI * 1700) / this.sr)) * (mono - this.bpR);
        this.hpV = this.hpV;
        L = this.bpR * 0.95;
        R = this.bpR * 0.95;
      } else if (trans === 2) {
        L = L * 1.05 + kL * 0.08;
        R = R * 1.05 + kR * 0.08;
      }

      const abs = Math.max(Math.abs(L), Math.abs(R));
      const env = abs > this.comp ? glueAtk : glueRel;
      this.comp += env * (abs - this.comp);
      const thr = 0.42 - this.glue * 0.22;
      const gr = this.comp > thr ? thr / (this.comp + 1e-6) : 1;
      const glueG = 1 - (1 - gr) * (0.35 + this.glue * 0.5);
      L *= glueG;
      R *= glueG;

      const pk = Math.max(Math.abs(L), Math.abs(R));
      const want = pk > this.ceiling ? this.ceiling / (pk + 1e-6) : 1;
      const le = want < this.limit ? limAtk : limRel;
      this.limit += le * (want - this.limit);
      L *= this.limit * gMaster;
      R *= this.limit * gMaster;

      this.dcL = this.dcL * 0.995 + L * 0.005;
      this.dcR = this.dcR * 0.995 + R * 0.005;
      L -= this.dcL;
      R -= this.dcR;

      if (L > 1) L = 1;
      else if (L < -1) L = -1;
      if (R > 1) R = 1;
      else if (R < -1) R = -1;

      left[i] = L;
      right[i] = R;
      const aL = Math.abs(L);
      const aR = Math.abs(R);
      if (aL > peakL) peakL = aL;
      if (aR > peakR) peakR = aR;
      rms += L * L + R * R;
      const m = (L + R) * 0.5;
      const s = (L - R) * 0.5;
      midA += m * m;
      sideA += s * s;
    }

    this.peakL = peakL * 0.86;
    this.peakR = peakR * 0.86;
    this.rmsAcc = rms / (n * 2);
    this.midAcc = midA / n;
    this.sideAcc = sideA / n;
    this.voices = voices;
    this.frames++;
    if (this.frames % 3 === 0) {
      const T = n / this.sr;
      const S = (2 + voices) * this.sr;
      const Vplus = S / Math.max(1e-6, T);
      const Vminus = -Vplus * Math.exp(-0.35);
      this.port.postMessage({
        type: "meter",
        peak: Math.max(peakL, peakR),
        rms: Math.sqrt(this.rmsAcc),
        voices,
        step: this.step,
        cpu: Math.min(100, voices * 6 + Math.max(peakL, peakR) * 28),
        latency: (n / this.sr) * 1000,
        signal: S,
        need: T,
        velocity: Vplus + Vminus,
        mid: Math.sqrt(this.midAcc),
        side: Math.sqrt(this.sideAcc),
        pitch: this.detected,
      });
    }
    return true;
  }

  detect() {
    const buf = this.cap;
    const n = buf.length;
    let e = 0;
    for (let i = 0; i < n; i++) e += buf[i] * buf[i];
    if (Math.sqrt(e / n) < 0.012) return 0;
    const minP = Math.floor(this.sr / 720);
    const maxP = Math.floor(this.sr / 80);
    let best = 1e9;
    let bestP = minP;
    for (let p = minP; p < maxP; p += 2) {
      let s = 0;
      const m = n - p;
      for (let i = 0; i < m; i += 3) {
        const d = buf[i] - buf[i + p];
        s += d * d;
      }
      if (s < best) {
        best = s;
        bestP = p;
      }
    }
    return this.sr / bestP;
  }

  snap(hz) {
    const scales = [
      [0, 2, 3, 5, 7, 8, 10],
      [0, 2, 4, 5, 7, 9, 11],
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      [0, 1, 3, 5, 7, 8, 10],
    ];
    const set = scales[this.scaleIdx | 0] || scales[0];
    const key = this.key | 0;
    const midi = 69 + 12 * Math.log(hz / 440) / Math.log(2);
    let best = midi;
    let bestD = 99;
    const base = Math.round(midi);
    for (let d = -12; d <= 12; d++) {
      const n = base + d;
      const pc = ((n - key) % 12 + 12) % 12;
      if (set.indexOf(pc) < 0) continue;
      const dist = Math.abs(n - midi);
      if (dist < bestD) {
        bestD = dist;
        best = n;
      }
    }
    return 440 * Math.pow(2, (best - 69) / 12);
  }
}

registerProcessor("steel-studio", SteelStudioProcessor);
