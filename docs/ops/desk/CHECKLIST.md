# Weekly Desk UX Checklist — STEEL

**Owner:** Desk · **Cadence:** weekly (or before any “Desk playable” claim)  
**App chrome:** PlaceBar + tab nav in `app-shell.tsx` · Home mounts in `index.tsx`  
**Smoke baseline:** `browser-smoke.mjs` (desktop 1280×800 + mobile 390×844) — extend with Desk cases below; do not treat canvas-only as Desk green.

---

## 0. Layout gate (blockers first)

- [ ] `src/` restore landed for Desk slice OR temporary alias bridge documented (`tsconfig` `@/*` → `./src/*` today; sources still flat)  
- [ ] `src/routes/__root.tsx` + `src/routes/index.tsx` match `routeTree.gen.ts` imports (not orphan root `__root.tsx` / `index.tsx`)  
- [ ] `@/lib/desk/{engine,store,adapt,oled,clips,fx,video}` and `@/components/{steel-desk,steel-oled,place-bar,app-shell}` resolve without colliding with steel/studio `engine.ts` / `store.ts`  
- [ ] Clean `npm run dev` loads `/` without module-not-found on Desk imports  

*If any box fails → stop; UX below is not trustworthy.*

---

## 1. Place / shell (every week)

- [ ] PlaceBar shows **os / web / host** (`data-place`); labels i18n (`placeKicker`)  
- [ ] WEB home lands on **desk**; HOST → **hosts**; OS → **kernel** (`PLACE_HOME` in `places.ts`)  
- [ ] Switching place calls isolate: leaving Desk stops mix/mic; OS arm not disarmed when staying on remote (`isolate.ts`)  
- [ ] Lab tabs **aura** + **audit** still reachable from shell  
- [ ] Lang cycle et → en → ru updates Desk/Hosts copy (`i18n.ts`)  
- [ ] Skip link `#main` + sticky header usable on mobile (no dead header overlap)

---

## 2. Desk mix surface (`steel-desk.tsx`)

- [ ] Beat + vocal slot cards load real files; **demo beat / demo vocal** succeed  
- [ ] Play / stop (Space when not in input); toast on missing slots (`needSlots`)  
- [ ] Live mic + voice rec paths; mic-blocked toast if denied  
- [ ] Genre / delay / reverb / Fix-it / auto-takt respond without freezing UI  
- [ ] Timeline: snap / keep-best / cut / delete / adlibs / backs (clip tools)  
- [ ] Bounce downloads `steel-mix.wav`  
- [ ] Media pick → `renderDeskVideo` downloads `steel-visual.webm` (uses `adapt.videoW/H`)  
- [ ] Adapt label updates at ≤700px (`probeDesk` remote 720p) vs desktop desk 1080p  
- [ ] Steel-row save/load mix params (or graceful `rowFail` if DB gated)  
- [ ] `desk-busy` wash does not trap focus / scroll

---

## 3. OLED (`steel-oled.tsx` / `oled.ts`)

- [ ] Canvas 128×64 visible on Desk; LIVE/IDLE tracks `playing`  
- [ ] Peak / LUFS / BPM / key / crawl update while playing  
- [ ] `prefers-reduced-motion: reduce` freezes scroll time (`t=0`)  
- [ ] Honesty: UI does not claim I2C/SPI hardware drive (`oledNote`)

---

## 4. Hosts (`steel-hosts.tsx` / `hosts.ts`)

- [ ] Three host chips: FL Studio, Ableton Live 12, Any ASIO host  
- [ ] since / clock / numbered steps update on chip change  
- [ ] OS matrix selection updates driver + note (`OS_MATRIX` in `asio.ts`)  
- [ ] CC map + MIDI bullets readable on phone (no horizontal clip of table)  
- [ ] Typecheck: host id `generic` aligns with `HostId` (today `types.ts` lacks `generic` — see TOP5)

---

## 5. Console arm honesty (Desk ↔ OS)

- [ ] Arm kernel → Armed + measured RTL class string  
- [ ] Buffer / sample rate change; re-arm note respected  
- [ ] Panic works when armed  
- [ ] Leave Console to Desk: mix remote usable; leave Console to non-remote/non-OS: panic path runs  

---

## 6. Mobile / overflow (390×844)

- [ ] `browser-smoke` mobile: `horizontalOverflow === false` on Desk after opening web+desk  
- [ ] PlaceBar + module nav scroll (`nav-scroll`) without covering primary CTAs  
- [ ] Slot buttons ≥44px (`min-h-11` pattern) still tappable  
- [ ] OLED panel readable (`max-w-sm`) without crushing mix column  

---

## 7. Smoke evidence to attach

- [ ] Desktop + mobile PNGs after Desk interactions (not only cold load)  
- [ ] Verdict JSON: no pageErrors on Desk play/bounce paths  
- [ ] Optional: screenshot parity vs root fixtures `desk-web.png`, `desk-mobile-oled.png`, `hosts.png`, `oled-live.png` (visual only)

---

## Sign-off

| Field | Value |
|-------|-------|
| Date (PT) | |
| Build / URL | |
| Layout gate | PASS / FAIL |
| Desk playable | PASS / FAIL |
| Notes | |

*Weekly Desk UX — STEEL Desk Ops.*
