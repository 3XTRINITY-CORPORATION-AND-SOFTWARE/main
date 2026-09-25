export const BUFFER_SIZES = [64, 128, 256, 512, 1024, 2048] as const;
export const SAMPLE_RATES = [44100, 48000, 88200, 96000] as const;
export const ASIO4ALL_VERSION = "2.22";

export function roundTripMs(buffer: number, rate: number, extraBuffers = 2) {
  return (buffer / rate) * extraBuffers * 1000;
}

export function asioClass(rtl: number) {
  if (rtl <= 8) return "Tracking";
  if (rtl <= 16) return "Mixing";
  if (rtl <= 32) return "Producing";
  return "Playback";
}

export const OS_MATRIX = [
  {
    id: "win8" as const,
    label: "Windows 8 / 8.1",
    driver: `ASIO4ALL ${ASIO4ALL_VERSION}`,
    note: "Confirmed by Michael Tippach. Minor GUI artefacts. Use 48 kHz / 256 if USB devices drop.",
  },
  {
    id: "win10" as const,
    label: "Windows 10",
    driver: `ASIO4ALL ${ASIO4ALL_VERSION}`,
    note: "Official floor for the 2.21 installer. Enable the device in the WDM list, hardware buffer off unless the vendor driver is stable.",
  },
  {
    id: "win11" as const,
    label: "Windows 11 / ARM64",
    driver: `ASIO4ALL ${ASIO4ALL_VERSION}`,
    note: "2.22 adds native and EC ARM64, including USB Audio Class devices without vendor drivers.",
  },
  {
    id: "linux" as const,
    label: "Linux (Wine 7.5+ / PipeWire)",
    driver: "PipeASIO · JACK2 · ALSA",
    note: "No kernel ASIO. PipeWire 0.3+ or JACK is the low-latency path. Wine 7.5+ runs FL / Live; Ableton-Linux uses PipeASIO so Link can arm.",
  },
];
