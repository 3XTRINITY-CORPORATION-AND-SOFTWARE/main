/* Steel audio kernel — AudioWorklet, 128-sample quantum, ASIO-style insert chain. */
class SteelKernel extends AudioWorkletProcessor {
  constructor() {
    super();
    this.sr = sampleRate;
    this.invSr = 1 / sampleRate;
    this.notes = [];
    for (let i = 0; i < 12; i++) {
      this.notes.push({ on: false, freq: 440, vel: 0, env: 0, phase: 0 });
    }
    this.hp = 0;
    this.comp = 0;
    this.limitGain = 1;
    this.dc = 0;
    this.peakL = 0;
    this.peakR = 0;
    this.rmsAcc = 0;
    this.frames = 0;
    this.postEvery = 3;
    this.p = {
      inGain: 1,
      outGain: 0.85,
      hpf: 1,
      hpHz: 80,
      eqLo: 1,
      eqMid: 1,
      eqHi: 1,
      sat: 1,
      satAmt: 0.35,
      comp: 1,
      thresh: 0.35,
      limit: 1,
      synth: 1,
      transient: 0,
      transAmt: 0.4,
      master: 0.8,
    };
    this.port.onmessage = (e) => this.onMsg(e.data);
  }

  onMsg(data) {
    if (!data || typeof data !== "object") return;
    if (data.type === "params") {
      Object.assign(this.p, data.params);
    } else if (data.type === "noteOn") {
      const slot = this.notes.find((n) => !n.on) || this.notes[0];
      slot.on = true;
      slot.freq = 440 * Math.pow(2, (data.note - 69) / 12);
      slot.vel = Math.max(0.05, Math.min(1, data.vel ?? 0.8));
      slot.env = 0.001;
      slot.phase = 0;
    } else if (data.type === "noteOff") {
      const freq = 440 * Math.pow(2, (data.note - 69) / 12);
      for (const n of this.notes) {
        if (n.on && Math.abs(n.freq - freq) < 0.5) n.on = false;
      }
    } else if (data.type === "panic") {
      for (const n of this.notes) {
        n.on = false;
        n.env = 0;
      }
    }
  }

  process(inputs, outputs) {
    const output = outputs[0];
    if (!output || !output[0]) return true;
    const left = output[0];
    const right = output[1] || output[0];
    const input = inputs[0];
    const iL = input && input[0] ? input[0] : null;
    const iR = input && input[1] ? input[1] : iL;
    const n = left.length;
    const p = this.p;
    const hpCoeff = 1 - Math.exp((-2 * Math.PI * p.hpHz) / this.sr);
    const attack = 1 - Math.exp(-1 / (0.003 * this.sr));
    const release = 1 - Math.exp(-1 / (0.12 * this.sr));
    const envA = 1 - Math.exp(-1 / (0.005 * this.sr));
    const envR = 1 - Math.exp(-1 / (0.18 * this.sr));

    let peak = 0;
    let rms = 0;

    for (let i = 0; i < n; i++) {
      let x = ((iL ? iL[i] : 0) + (iR ? iR[i] : 0)) * 0.5 * p.inGain;

      if (p.synth > 0.5) {
        let s = 0;
        for (const note of this.notes) {
          const target = note.on ? 1 : 0;
          note.env += (target - note.env) * (note.on ? envA : envR);
          if (note.env < 0.0001) continue;
          note.phase += note.freq * this.invSr;
          if (note.phase >= 1) note.phase -= 1;
          const t = note.phase;
          const saw = 2 * t - 1;
          const sq = t < 0.5 ? 1 : -1;
          s += (saw * 0.55 + sq * 0.2) * note.vel * note.env;
        }
        x += s * 0.22;
      }

      this.hp += hpCoeff * (x - this.hp);
      if (p.hpf > 0.5) x = x - this.hp;

      if (p.transient > 0.5) {
        const fast = Math.abs(x);
        const delta = fast - this.comp;
        x += Math.max(0, delta) * p.transAmt;
      }

      if (p.sat > 0.5) {
        const a = 1 + p.satAmt * 4;
        x = Math.tanh(x * a) / Math.tanh(a);
      }

      const lo = this.hp;
      const hi = x - this.hp;
      const mid = x;
      x = lo * p.eqLo * 0.35 + mid * p.eqMid * 0.4 + hi * p.eqHi * 0.35;

      const env = Math.abs(x);
      const coeff = env > this.comp ? attack : release;
      this.comp += coeff * (env - this.comp);
      if (p.comp > 0.5 && this.comp > p.thresh) {
        const over = this.comp / p.thresh;
        x /= over;
      }

      if (p.limit > 0.5) {
        const mag = Math.abs(x);
        if (mag > 0.95) {
          this.limitGain = 0.95 / mag;
        } else {
          this.limitGain += (1 - this.limitGain) * 0.002;
        }
        x *= this.limitGain;
      }

      x *= p.outGain * p.master;
      this.dc += 0.0005 * (x - this.dc);
      x -= this.dc * 0.25;
      if (x > 1) x = 1;
      else if (x < -1) x = -1;

      left[i] = x;
      right[i] = x;
      const ax = Math.abs(x);
      if (ax > peak) peak = ax;
      rms += x * x;
    }

    this.peakL = Math.max(this.peakL * 0.92, peak);
    this.rmsAcc += rms / n;
    this.frames++;
    if (this.frames >= this.postEvery) {
      this.port.postMessage({
        type: "meter",
        peak: this.peakL,
        rms: Math.sqrt(this.rmsAcc / this.frames),
        voices: this.notes.filter((n) => n.env > 0.01).length,
      });
      this.frames = 0;
      this.rmsAcc = 0;
    }
    return true;
  }
}

registerProcessor("steel-kernel", SteelKernel);
