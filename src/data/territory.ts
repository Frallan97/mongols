import type { Realm, TerritorySnapshot } from './types';

/**
 * APPROXIMATE EXTENT. Read this before trusting a line on the map.
 *
 * These rings are hand-authored from the extents shown in standard reference
 * atlases. They are not survey data and there is no underlying source that
 * could make them so: the Mongol empire controlled armies, roads, cities and
 * tribute, not a cartographic boundary, and historians disagree about where
 * its edges ran in any given year. Three specific kinds of lie are baked in:
 *
 *  1. Vassals are drawn the same as directly ruled land. Goryeo, the Rus
 *     principalities and Seljuk Anatolia paid tribute and kept their own
 *     rulers; here they are solid fill like Khurasan, which was administered
 *     outright.
 *  2. Deserts and mountains are drawn as held. Nobody held the Taklamakan.
 *  3. The dates are the year a campaign concluded, not the year control was
 *     consolidated, which often took a decade longer.
 *
 * Rings are generous and frequently run out over water — the renderer clips
 * every realm to the coastline, so a ring crossing the Black Sea or the Gulf
 * is harmless and keeps the shapes smooth.
 *
 * Snapshots are sparse: one per change worth seeing. The slider shows the
 * most recent snapshot at or before the selected year, and consecutive
 * snapshots cross-fade. They are not interpolated — the rings have different
 * vertex counts and tweening between them would invent borders that never
 * existed, which is a worse lie than the three above.
 */

const ring = (pts: [number, number][]) => pts;

// --- The undivided empire, 1206-1259 ----------------------------------

/** Mongolia proper: Altai to the Khingan, the Gobi edge to the Selenge. */
const MONGOLIA_1206 = ring([
  [89, 47], [95, 43], [103, 42], [112, 43], [119, 46], [120, 49],
  [115, 51], [107, 52], [99, 51], [91, 50], [89, 47],
]);

/** + the Siberian forest peoples (1207) and Western Xia (1209). */
const EMPIRE_1209 = ring([
  [89, 47], [95, 43], [98, 38], [101, 36], [106, 36], [111, 38],
  [112, 41], [113, 43], [119, 46], [120, 49], [115, 51], [107, 52],
  [99, 54], [93, 55], [88, 52], [89, 47],
]);

/** Campaigning across the Gobi into Jin territory. */
const EMPIRE_1211 = ring([
  [89, 47], [95, 43], [98, 38], [101, 36], [106, 36], [111, 38],
  [114, 40], [118, 43], [121, 46], [120, 49], [115, 51], [107, 52],
  [99, 54], [93, 55], [88, 52], [89, 47],
]);

/** Zhongdu taken; Jin China north of the Yellow River overrun. */
const EMPIRE_1215 = ring([
  [89, 47], [95, 43], [98, 38], [101, 36], [106, 36], [110, 35],
  [114, 35], [119, 37], [122, 41], [122, 45], [120, 49], [115, 51],
  [107, 52], [99, 54], [93, 55], [88, 52], [89, 47],
]);

/** + Qara Khitai: Semirechye, the Ili valley and the Tarim. */
const EMPIRE_1218 = ring([
  [73, 45], [74, 42], [76, 39], [80, 37], [88, 38], [92, 41],
  [95, 43], [98, 38], [101, 36], [106, 36], [110, 35], [114, 35],
  [119, 37], [122, 41], [122, 45], [120, 49], [115, 51], [107, 52],
  [99, 54], [93, 55], [88, 52], [82, 50], [75, 48], [73, 45],
]);

/** + Khwarezm: Transoxiana, Khurasan, and south to the Indus. */
const EMPIRE_1221 = ring([
  [58, 44], [55, 41], [54, 38], [57, 36], [59, 34], [63, 33],
  [67, 33], [70, 31], [73, 34], [75, 38], [80, 37], [88, 38],
  [92, 41], [95, 43], [98, 38], [101, 36], [106, 36], [110, 35],
  [114, 35], [119, 37], [122, 41], [122, 45], [120, 49], [115, 51],
  [107, 52], [99, 54], [93, 55], [88, 52], [82, 50], [75, 48],
  [68, 47], [61, 46], [58, 44],
]);

/** Genghis dies; the Kipchak steppe east of the Ural is Jochi's grazing. */
const EMPIRE_1227 = ring([
  [52, 46], [54, 42], [55, 40], [54, 38], [57, 36], [59, 34],
  [63, 33], [67, 33], [70, 31], [73, 34], [75, 38], [80, 37],
  [88, 38], [92, 41], [95, 43], [98, 38], [101, 36], [106, 36],
  [110, 35], [114, 35], [119, 37], [122, 41], [122, 45], [120, 49],
  [115, 51], [107, 52], [99, 54], [93, 55], [88, 53], [80, 53],
  [70, 53], [60, 51], [54, 50], [52, 46],
]);

/** Jin destroyed: all China down to the Huai. */
const EMPIRE_1234 = ring([
  [52, 46], [54, 42], [55, 40], [54, 38], [57, 36], [59, 34],
  [63, 33], [67, 33], [70, 31], [73, 34], [75, 38], [80, 37],
  [88, 38], [92, 41], [95, 43], [98, 38], [101, 34], [106, 33],
  [110, 33], [114, 33], [119, 33], [122, 38], [122, 45], [120, 49],
  [115, 51], [107, 52], [99, 54], [93, 55], [88, 53], [80, 53],
  [70, 53], [60, 51], [54, 50], [52, 46],
]);

/** + Volga Bulgaria and the Kipchak steppe west to the Volga. */
const EMPIRE_1237 = ring([
  [45, 48], [47, 45], [50, 45], [53, 42], [55, 40], [54, 38],
  [57, 36], [59, 34], [63, 33], [67, 33], [70, 31], [73, 34],
  [75, 38], [80, 37], [88, 38], [92, 41], [95, 43], [98, 38],
  [101, 34], [106, 33], [110, 33], [114, 33], [119, 33], [122, 38],
  [122, 45], [120, 49], [115, 51], [107, 52], [99, 54], [93, 55],
  [88, 53], [80, 53], [70, 53], [60, 52], [52, 54], [47, 55],
  [45, 52], [45, 48],
]);

/** + the Rus principalities, the Caucasus, and Persia under Chormaqan. */
const EMPIRE_1241 = ring([
  [28, 52], [34, 56], [40, 58], [47, 58], [54, 56], [62, 54],
  [72, 53], [80, 53], [88, 53], [93, 55], [99, 54], [107, 52],
  [115, 51], [120, 49], [122, 45], [122, 38], [119, 33], [114, 33],
  [110, 33], [106, 33], [101, 34], [98, 36], [92, 37], [86, 36],
  [80, 36], [75, 37], [72, 34], [69, 32], [66, 31], [62, 32],
  [58, 30], [54, 29], [50, 30], [47, 33], [45, 37], [44, 40],
  [42, 42], [40, 44], [36, 45], [32, 46], [29, 49], [28, 52],
]);

/** + Seljuk Anatolia, vassalised after Köse Dağ. */
const EMPIRE_1243 = ring([
  [28, 52], [34, 56], [40, 58], [47, 58], [54, 56], [62, 54],
  [72, 53], [80, 53], [88, 53], [93, 55], [99, 54], [107, 52],
  [115, 51], [120, 49], [122, 45], [122, 38], [119, 33], [114, 33],
  [110, 33], [106, 33], [101, 34], [98, 36], [92, 37], [86, 36],
  [80, 36], [75, 37], [72, 34], [69, 32], [66, 31], [62, 32],
  [58, 30], [54, 29], [50, 30], [47, 33], [45, 35], [42, 37],
  [38, 37], [34, 37], [30, 38], [30, 41], [31, 44], [31, 46],
  [28, 49], [28, 52],
]);

/** + Dali (Yunnan) and the Tibetan marches, taken by Kublai for Möngke. */
const EMPIRE_1253 = ring([
  [28, 52], [34, 56], [40, 58], [47, 58], [54, 56], [62, 54],
  [72, 53], [80, 53], [88, 53], [93, 55], [99, 54], [107, 52],
  [115, 51], [120, 49], [122, 45], [122, 38], [119, 33], [114, 33],
  [110, 33], [106, 33], [102, 31], [100, 25], [97, 24], [97, 29],
  [95, 32], [90, 31], [85, 32], [81, 34], [84, 37], [80, 37],
  [75, 37], [72, 34], [69, 32], [66, 31], [62, 32], [58, 30],
  [54, 29], [50, 30], [47, 33], [45, 35], [42, 37], [38, 37],
  [34, 37], [30, 38], [30, 41], [31, 44], [31, 46], [28, 49],
  [28, 52],
]);

/** + Iraq and upper Mesopotamia: the Caliphate is gone. Peak undivided extent. */
const EMPIRE_1258 = ring([
  [28, 52], [34, 56], [40, 58], [47, 58], [54, 56], [62, 54],
  [72, 53], [80, 53], [88, 53], [93, 55], [99, 54], [107, 52],
  [115, 51], [120, 49], [122, 45], [122, 38], [119, 33], [114, 33],
  [110, 33], [106, 33], [102, 31], [100, 25], [97, 24], [97, 29],
  [95, 32], [90, 31], [85, 32], [81, 34], [84, 37], [80, 37],
  [75, 37], [72, 34], [69, 32], [66, 31], [62, 32], [58, 30],
  [54, 29], [50, 30], [47, 30], [44, 31], [41, 33], [39, 36],
  [36, 37], [34, 37], [30, 38], [30, 41], [31, 44], [31, 46],
  [28, 49], [28, 52],
]);

// --- After the 1260 rupture -------------------------------------------
//
// The four uluses existed as appanages from the 1220s, but they are not drawn
// separately until 1260 because until then they were provinces of one empire
// under one Great Khan. 1260 is where that stops being true: two rival
// kurultais elect two Great Khans, and the uluses never answer to a single
// authority again.

/**
 * Jochid ulus: the Pontic-Caspian steppe, the Rus, Khwarezm, western Siberia.
 *
 * The southern edge is pulled down to meet the Ilkhanate along the Caucasus
 * watershed. They did not in fact meet neatly — the two khanates fought over
 * exactly this ground for decades — but leaving the two-degree band between
 * them unfilled read on the map as a hole rather than as a frontier.
 */
const GOLDEN_HORDE = ring([
  [28, 52], [34, 56], [40, 58], [47, 58], [54, 56], [62, 54],
  [72, 53], [74, 50], [70, 46], [65, 44], [60, 43], [56, 42],
  [53, 44], [50, 44.5], [47, 44], [44, 43.5], [40, 42.5], [36, 44],
  [32, 46], [29, 49], [28, 52],
]);

/**
 * Hülegüid ulus: Anatolia, the Caucasus, Iraq and Iran to the Oxus.
 *
 * The southwestern edge follows the Euphrates and then the Taurus, which is
 * the point at which this ring stops being a rough blob and has to be traced.
 * An earlier version cut a straight line from Basra to the Aegean and so
 * claimed Syria and most of the Arabian peninsula for the Ilkhanate — both
 * Mamluk, and the second of them nobody's. Syria in particular is the thing
 * Ain Jalut was fought over; drawing it Ilkhanid contradicts the event note
 * four panels away.
 */
const ILKHANATE = ring([
  // Anatolia, west to east along the Black Sea coast.
  [30, 38], [33, 41], [37, 41], [40, 41.5],
  // The Caucasus: Georgia and Armenia, up to the Horde's frontier at Derbent.
  // Deliberately overlapping the Horde's southern edge by about half a
  // degree — a hairline of bare paper between two adjacent realms reads as a
  // hole in the map rather than as a border.
  [43, 43.5], [46, 44], [48, 42.5],
  // Northern Iran along the Elburz and on to the Oxus.
  [51, 40], [55, 40], [59, 39], [63, 38], [66, 36],
  // Down the eastern edge and back along the coast. These points sit inland
  // of the Persian Gulf on purpose: put them on the water and the chords
  // between them cross to the Arabian shore, where the land clip cheerfully
  // renders the Ilkhanate as the owner of Qatar and Oman.
  [66, 32], [63, 28], [61, 26], [59, 26.5], [57, 27.5], [55, 27.5],
  [52, 29], [49, 30.5],
  // Up the Euphrates and back along the Taurus. Syria stays Mamluk.
  [47, 30], [45, 31], [42, 33], [40, 35], [38, 37], [35, 37],
  [32, 37], [30, 38],
]);

/** Chagatai ulus: Transoxiana, Semirechye, the Tarim. */
const CHAGATAI = ring([
  [56, 42], [60, 43], [65, 44], [70, 46], [74, 50], [81, 50],
  [88, 48], [92, 45], [91, 41], [87, 38], [82, 36], [76, 36],
  [72, 34], [68, 35], [64, 37], [60, 39], [57, 39], [56, 42],
]);

/** Great Khan's domain at the split: Mongolia, north China, Tibet, Yunnan. */
const YUAN_1260 = ring([
  [88, 52], [93, 55], [99, 54], [107, 52], [115, 51], [120, 49],
  [122, 45], [122, 38], [119, 33], [114, 33], [110, 33], [106, 33],
  [102, 31], [100, 25], [97, 24], [97, 29], [95, 32], [90, 31],
  [85, 32], [81, 34], [84, 37], [88, 38], [92, 45], [88, 48],
  [88, 52],
]);

/** Goryeo, a tributary from 1259 — drawn with the Yuan throughout. */
const KOREA = ring([
  [124, 38], [126, 43], [130, 43], [129, 38], [129, 35], [126, 34],
  [124, 38],
]);

/** Xiangyang has fallen; the Yuan are across the Yangtze. */
const YUAN_1274 = ring([
  [88, 52], [93, 55], [99, 54], [107, 52], [115, 51], [120, 49],
  [122, 45], [122, 38], [121, 31], [118, 29], [113, 28], [108, 27],
  [103, 26], [100, 25], [97, 24], [97, 29], [95, 32], [90, 31],
  [85, 32], [81, 34], [84, 37], [88, 38], [92, 45], [88, 48],
  [88, 52],
]);

/** Hangzhou surrendered; the Song court is a fugitive on the coast. */
const YUAN_1276 = ring([
  [88, 52], [93, 55], [99, 54], [107, 52], [115, 51], [120, 49],
  [122, 45], [122, 38], [122, 30], [119, 27], [115, 25], [110, 24],
  [105, 24], [100, 25], [97, 24], [97, 29], [95, 32], [90, 31],
  [85, 32], [81, 34], [84, 37], [88, 38], [92, 45], [88, 48],
  [88, 52],
]);

/** Yamen: the Song are extinguished and China is whole under the Yuan. */
const YUAN_1279 = ring([
  [88, 52], [93, 55], [99, 54], [107, 52], [115, 51], [120, 49],
  [122, 45], [122, 38], [122, 30], [120, 25], [116, 22], [112, 21],
  [108, 20], [106, 22], [103, 23], [100, 25], [97, 24], [97, 29],
  [95, 32], [90, 31], [85, 32], [81, 34], [84, 37], [88, 38],
  [92, 45], [88, 48], [88, 52],
]);

const undivided = (year: number, rings: [number, number][][]): TerritorySnapshot => ({
  year,
  realms: [{ realm: 'mongol' as Realm, rings }],
});

const divided = (year: number, yuanRings: [number, number][][]): TerritorySnapshot => ({
  year,
  realms: [
    { realm: 'yuan', rings: yuanRings },
    { realm: 'golden-horde', rings: [GOLDEN_HORDE] },
    { realm: 'ilkhanate', rings: [ILKHANATE] },
    { realm: 'chagatai', rings: [CHAGATAI] },
  ],
});

export const SNAPSHOTS: TerritorySnapshot[] = [
  undivided(1206, [MONGOLIA_1206]),
  undivided(1209, [EMPIRE_1209]),
  undivided(1211, [EMPIRE_1211]),
  undivided(1215, [EMPIRE_1215]),
  undivided(1218, [EMPIRE_1218]),
  undivided(1221, [EMPIRE_1221]),
  undivided(1227, [EMPIRE_1227]),
  undivided(1234, [EMPIRE_1234]),
  undivided(1237, [EMPIRE_1237]),
  undivided(1241, [EMPIRE_1241]),
  undivided(1243, [EMPIRE_1243]),
  undivided(1253, [EMPIRE_1253]),
  undivided(1258, [EMPIRE_1258]),
  divided(1260, [YUAN_1260, KOREA]),
  divided(1274, [YUAN_1274, KOREA]),
  divided(1276, [YUAN_1276, KOREA]),
  divided(1279, [YUAN_1279, KOREA]),
];

export const START_YEAR = 1206;
export const END_YEAR = 1294;

/** The snapshot in force for `year` — the latest one at or before it. */
export function snapshotForYear(year: number): TerritorySnapshot {
  let current = SNAPSHOTS[0];
  for (const s of SNAPSHOTS) {
    if (s.year <= year) current = s;
    else break;
  }
  return current;
}

/** True once the empire has split into rival uluses. */
export function isDivided(year: number): boolean {
  return year >= 1260;
}

export const REALM_LABEL: Record<Realm, string> = {
  mongol: 'Mongol Empire',
  yuan: 'Great Khan / Yuan',
  'golden-horde': 'Golden Horde',
  ilkhanate: 'Ilkhanate',
  chagatai: 'Chagatai Khanate',
};
