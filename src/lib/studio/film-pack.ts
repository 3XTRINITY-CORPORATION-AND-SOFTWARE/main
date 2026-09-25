import { vaultJson, loadVault, saveVault, type ConnectorVault } from "./connectors";
import { downloadBlob } from "@/lib/utils";
import { zipStore } from "./zip";

export function filmIndexHtml(vault: ConnectorVault) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>STEEL FILM</title>
  <style>
    html,body{margin:0;background:#0c0d0b;color:#e6e1d4;font-family:"IBM Plex Sans",system-ui,sans-serif;overflow:hidden;height:100%}
    canvas{display:block;width:100%;height:100%;background:#0c0d0b}
    .hud{position:fixed;left:16px;top:16px;font:11px/1.4 ui-monospace,Menlo,monospace;letter-spacing:.18em;text-transform:uppercase;color:#8a877c;pointer-events:none}
  </style>
</head>
<body>
  <canvas id="c"></canvas>
  <div class="hud">STEEL FILM · 1000-BIN · LIP LOCK</div>
  <script id="vault" type="application/json">${vaultJson(vault).replace(/</g, "\\u003c")}</script>
  <script>
  const vault = JSON.parse(document.getElementById("vault").textContent);
  const canvas = document.getElementById("c");
  const ctx = canvas.getContext("2d");
  const ac = new (window.AudioContext || window.webkitAudioContext)();
  const an = ac.createAnalyser();
  an.fftSize = 2048;
  const wave = new Uint8Array(an.fftSize);
  const freq = new Uint8Array(an.frequencyBinCount);
  navigator.mediaDevices.getUserMedia({audio:true}).then((s) => {
    ac.createMediaStreamSource(s).connect(an);
    ac.resume();
  }).catch(() => {});
  const N = 1000;
  const bins = new Float32Array(N);
  const visemes = vault.visemes || ["rest","closed","wide","round","teeth","open"];
  function resize(){
    const dpr = Math.min(2, devicePixelRatio||1);
    canvas.width = innerWidth * dpr; canvas.height = innerHeight * dpr;
    ctx.setTransform(dpr,0,0,dpr,0,0);
  }
  addEventListener("resize", resize); resize();
  function lerp(a,b,t){return a+(b-a)*t}
  function loop(){
    an.getByteTimeDomainData(wave);
    an.getByteFrequencyData(freq);
    const w = innerWidth, h = innerHeight;
    ctx.fillStyle = "#0c0d0b"; ctx.fillRect(0,0,w,h);
    for (let i=0;i<N;i++){
      const x = i / (N-1) * (wave.length-1);
      const i0 = x|0, i1 = Math.min(wave.length-1, i0+1);
      bins[i] = lerp(wave[i0], wave[i1], x-i0) / 128 - 1;
    }
    ctx.beginPath();
    ctx.strokeStyle = "#e6e1d4";
    ctx.lineWidth = 1.25;
    for (let i=0;i<N;i++){
      const x = (i/(N-1))*w;
      const y = h*0.52 + bins[i]*h*0.22;
      i?ctx.lineTo(x,y):ctx.moveTo(x,y);
    }
    ctx.stroke();
    let rms=0; for (let i=0;i<N;i++) rms += bins[i]*bins[i];
    rms = Math.sqrt(rms/N);
    const shape = visemes[Math.min(visemes.length-1, Math.floor(rms * visemes.length))] || "open";
    const cx=w*0.5, cy=h*0.34;
    const mw = shape==="closed"?28:shape==="round"?24:40+rms*90;
    const mh = shape==="closed"?6:shape==="round"?24:8+rms*48;
    ctx.strokeStyle = "#6aa56f";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(cx, cy, mw, mh, 0, 0, Math.PI*2);
    ctx.stroke();
    requestAnimationFrame(loop);
  }
  loop();
  </script>
</body>
</html>`;
}

export function filmReadme() {
  return `STEEL FILM
Standalone wave + lip lock. Drop on any machine; it talks to the STEEL connector vault (connectors.json) that was sealed when you downloaded this pack.

Mic permission draws a 1000-bin waveform and a mouth from RMS + visemes.json. banks.json lists the containers that were open.

No cloud. No artist clones. Camera is yours.
`;
}

export function filmZipBlob() {
  const vault = saveVault(loadVault());
  return zipStore([
    { name: "STEEL-FILM/index.html", text: filmIndexHtml(vault) },
    { name: "STEEL-FILM/README.txt", text: filmReadme() },
    { name: "STEEL-FILM/connectors.json", text: JSON.stringify(vault, null, 2) },
    { name: "STEEL-FILM/visemes.json", text: JSON.stringify(vault.visemes, null, 2) },
    { name: "STEEL-FILM/banks.json", text: JSON.stringify(vault.banks, null, 2) },
  ]);
}

export function downloadFilmPack() {
  downloadBlob(filmZipBlob(), "steel-film.zip");
}
