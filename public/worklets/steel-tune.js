/* Vocal pitch corrector + master meters. 128-sample quantum. */
class SteelTune extends AudioWorkletProcessor {
  constructor() {
    super();
    this.sr = sampleRate;
    this.n = 1024;
    this.cap = new Float32Array(this.n);
    this.ci = 0;
    this.delay = new Float32Array(8192);
    this.dw = 0;
    this.r1 = 0;
    this.r2 = 4096;
    this.grain = 1024;
    this.detected = 0;
    this.smooth = 1;
    this.comp = 0;
    this.limit = 1;
    this.hp = 0;
    this.peak = 0;
    this.rmsAcc = 0;
    this.frames = 0;
    this.clips = 0;
    this.p = { amount: 0.75, speed: 0.35, tonic: 0, mode: 0, drive: 0.2, ceiling: 0.89, hpf: 80 };
    this.port.onmessage = (e) => {
      if (e.data?.type === "params") Object.assign(this.p, e.data.params);
    };
  }

  snap(freq) {
    if (freq < 70 || freq > 900) return freq;
    const midi = 69 + 12 * Math.log2(freq / 440);
    let q = Math.round(midi);
    if (this.p.mode > 0.5) {
      const pc = ((q - this.p.tonic) % 12 + 12) % 12;
      const minor = [0, 2, 3, 5, 7, 8, 10];
      const major = [0, 2, 4, 5, 7, 9, 11];
      const scale = this.p.mode > 1.5 ? major : minor;
      let best = scale[0];
      let bestD = 99;
      for (const s of scale) {
        const d = Math.min((pc - s + 12) % 12, (s - pc + 12) % 12);
        if (d < bestD) {
          bestD = d;
          best = s;
        }
      }
      q = q - pc + best;
    }
    return 440 * Math.pow(2, (q - 69) / 12);
  }

  detect() {
    const buf = this.cap;
    const n = buf.length;
    let rms = 0;
    for (let i = 0; i < n; i++) rms += buf[i] * buf[i];
    rms = Math.sqrt(rms / n);
    if (rms < 0.012) return 0;
    const minP = Math.floor(this.sr / 720);
    const maxP = Math.floor(this.sr / 80);
    let best = 1e9;
    let bestP = minP;
    for (let p = minP; p < maxP; p += 1) {
      let s = 0;
      const m = n - p;
      for (let i = 0; i < m; i += 2) {
        const d = buf[i] - buf[i + p];
        s += d * d;
      }
      s /= m;
      if (s < best) {
        best = s;
        bestP = p;
      }
    }
    return this.sr / bestP;
  }

  process(inputs, outputs) {
    const output = outputs[0];
    if (!output || !output[0]) return true;
    const left = output[0];
    const right = output[1] || output[0];
    const input = inputs[0];
    const iL = input && input[0] ? input[0] : null;
    const n = left.length;
    const p = this.p;
    const hpC = 1 - Math.exp((-2 * Math.PI * p.hpf) / this.sr);
    const mask = this.delay.length - 1;
    const amount = Math.min(1, Math.max(0, p.amount));
    const speed = 0.02 + Math.min(1, p.speed) * 0.25;

    for (let i = 0; i < n; i++) {
      let x = iL ? iL[i] : 0;
      this.hp += hpC * (x - this.hp);
      x = x - this.hp;
      this.cap[this.ci] = x;
      this.ci = (this.ci + 1) % this.n;

      this.delay[this.dw] = x;
      let y;
      if (amount < 0.01) {
        y = x;
        this.smooth = 1;
        this.r1 = (this.dw - this.grain + this.delay.length) & mask;
        this.r2 = (this.dw - this.grain * 2 + this.delay.length) & mask;
        this.dw = (this.dw + 1) & mask;
      } else {
        let ratio = 1;
        if (this.detected > 0) {
          const target = this.snap(this.detected);
          const want = this.detected / Math.max(40, target);
          const mixed = 1 + (want - 1) * amount;
          this.smooth += (mixed - this.smooth) * speed;
          ratio = this.smooth;
        }
        this.r1 += ratio;
        this.r2 += ratio;
        const g = this.grain;
        const hann = (ph) => 0.5 - 0.5 * Math.cos((2 * Math.PI * ph) / g);
        const read = (pos) => {
          const i0 = Math.floor(pos) & mask;
          const i1 = (i0 + 1) & mask;
          const f = pos - Math.floor(pos);
          return this.delay[i0] * (1 - f) + this.delay[i1] * f;
        };
        const a = read(this.r1);
        const b = read(this.r2);
        const w1 = hann(this.r1 % g);
        const w2 = hann(this.r2 % g);
        const den = w1 + w2 + 1e-6;
        y = (a * w1 + b * w2) / den;
        if (this.r1 >= this.delay.length) this.r1 -= this.delay.length;
        if (this.r2 >= this.delay.length) this.r2 -= this.delay.length;
        this.dw = (this.dw + 1) & mask;
      }

      const drv = 1 + p.drive * 3;
      y = Math.tanh(y * drv) / Math.tanh(drv);

      const env = Math.abs(y);
      this.comp += (env - this.comp) * (env > this.comp ? 0.08 : 0.01);
      if (this.comp > 0.28) y *= 0.28 / this.comp;

      const mag = Math.abs(y);
      if (mag > p.ceiling) {
        this.limit = p.ceiling / mag;
        this.clips++;
      } else {
        this.limit += (1 - this.limit) * 0.004;
      }
      y *= this.limit;
      if (y > 1) y = 1;
      else if (y < -1) y = -1;

      left[i] = y;
      right[i] = y;
      const ax = Math.abs(y);
      if (ax > this.peak) this.peak = ax;
      this.rmsAcc += y * y;
    }

    if (this.ci % 256 < n) {
      const f = this.detect();
      if (f > 0) this.detected = this.detected * 0.7 + f * 0.3;
      else this.detected *= 0.92;
    }

    this.frames++;
    if (this.frames >= 4) {
      this.port.postMessage({
        type: "meter",
        peak: this.peak,
        rms: Math.sqrt(this.rmsAcc / (this.frames * n)),
        pitch: this.detected,
        clips: this.clips,
      });
      this.peak *= 0.72;
      this.rmsAcc = 0;
      this.frames = 0;
      this.clips = 0;
    }
    return true;
  }
}

registerProcessor("steel-tune", SteelTune);
