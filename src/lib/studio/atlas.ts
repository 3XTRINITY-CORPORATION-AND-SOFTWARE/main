import { BANKS, PLUGIN_IDS } from "./banks";
import { EXPANSIONS, type PlaceId } from "./places";
import { EXTRA_IDS, type ExtraId } from "./theory";

/** 10 extras × 20 banks + 10 extras × 5 plugins = 250 OS-target cells. Each cell has 3 places. */
export const ATLAS_BANKS = BANKS.length;
export const ATLAS_PLUGINS = PLUGIN_IDS.length;
export const ATLAS_EXTRAS = EXTRA_IDS.length;
export const ATLAS_COUNT = ATLAS_EXTRAS * ATLAS_BANKS + ATLAS_EXTRAS * ATLAS_PLUGINS;

export type AtlasKind = "bank" | "plugin";

export type AtlasCell = {
  i: number;
  extra: ExtraId;
  kind: AtlasKind;
  target: string;
  os: string;
  web: string;
  host: string;
};

function placesFor(extra: ExtraId, target: string) {
  const lane = EXPANSIONS.find((e) => e.extra === extra) ?? EXPANSIONS[0];
  const tag = target.toUpperCase();
  return {
    os: `${lane.os} · ${tag}`,
    web: `${lane.web} · ${tag}`,
    host: `${lane.host} · ${tag}`,
  };
}

function buildAtlas(): AtlasCell[] {
  const cells: AtlasCell[] = [];
  let i = 1;
  for (const extra of EXTRA_IDS) {
    for (const bank of BANKS) {
      cells.push({ i: i++, extra, kind: "bank", target: bank.id, ...placesFor(extra, bank.id) });
    }
  }
  for (const extra of EXTRA_IDS) {
    for (const plugin of PLUGIN_IDS) {
      cells.push({ i: i++, extra, kind: "plugin", target: plugin, ...placesFor(extra, plugin) });
    }
  }
  return cells;
}

export const ATLAS: AtlasCell[] = buildAtlas();

if (ATLAS.length !== 250 || ATLAS_COUNT !== 250) {
  throw new Error(`OS-target atlas must be 250 cells, got ${ATLAS.length}`);
}

export function atlasForKind(kind: AtlasKind) {
  return ATLAS.filter((c) => c.kind === kind);
}

export function placeLine(cell: AtlasCell, place: PlaceId) {
  return cell[place];
}
