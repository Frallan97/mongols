import { geoContains } from 'd3-geo';
import { describe, expect, it } from 'vitest';
import type { Polygon } from 'geojson';
import { SNAPSHOTS, snapshotForYear } from './territory';
import { RULERS, rulersInYear } from './rulers';
import { EVENTS } from './events';
import { DATA_CREDITS, PRIMARY, SECONDARY } from './sources';
import type { Realm } from './types';

/*
 * The territory rings are the one part of this app that can be badly wrong
 * while still looking plausible. They are drawn in a rotated azimuthal
 * projection, which makes them genuinely hard to check by eye — during
 * development the Ilkhanate was twice read off a screenshot as covering
 * Arabia when it did not, and once as *not* covering Arabia when it did.
 *
 * So the rings are checked against named places instead of against
 * screenshots. Each assertion below is a claim about history, not about
 * pixels, and it fails loudly if a ring is edited into the wrong shape.
 */

/** Same winding normalisation the renderer applies; see lib/geo.ts. */
function wind(r: [number, number][]): [number, number][] {
  let area = 0;
  for (let i = 0; i < r.length - 1; i++) {
    area += r[i][0] * r[i + 1][1] - r[i + 1][0] * r[i][1];
  }
  return area > 0 ? [...r].reverse() : r;
}

function holds(year: number, realm: Realm, lon: number, lat: number): boolean {
  const extent = snapshotForYear(year).realms.find((r) => r.realm === realm);
  if (!extent) return false;
  return extent.rings.some((ring) => {
    const poly: Polygon = { type: 'Polygon', coordinates: [wind(ring)] };
    return geoContains(poly, [lon, lat]);
  });
}

const PLACES: Record<string, [number, number]> = {
  Karakorum: [102.8, 47.2],
  Zhongdu: [116.4, 39.9],
  Samarkand: [66.9, 39.7],
  Bukhara: [64.4, 39.8],
  Baghdad: [44.4, 33.3],
  Tabriz: [46.3, 38.1],
  Kiev: [30.5, 50.4],
  Sarai: [47.5, 46.8],
  Hangzhou: [120.2, 30.3],
  Guangzhou: [113.3, 23.1],
  Dali: [100.2, 25.6],
  Lhasa: [91.1, 29.7],
  Konya: [32.5, 37.9],
  Damascus: [36.3, 33.5],
  Aleppo: [37.2, 36.2],
  Cairo: [31.2, 30.0],
  Riyadh: [46.7, 24.7],
  Muscat: [58.5, 23.6],
  Delhi: [77.2, 28.6],
  Kaesong: [126.6, 37.9],
  Kyoto: [135.8, 35.0],
  Moscow: [37.6, 55.8],
};

const at = (name: keyof typeof PLACES) => PLACES[name];

describe('undivided empire', () => {
  it('starts as Mongolia alone', () => {
    expect(holds(1206, 'mongol', ...at('Karakorum'))).toBe(true);
    expect(holds(1206, 'mongol', ...at('Zhongdu'))).toBe(false);
    expect(holds(1206, 'mongol', ...at('Samarkand'))).toBe(false);
  });

  it('takes Zhongdu in 1215 but not Khwarezm', () => {
    expect(holds(1215, 'mongol', ...at('Zhongdu'))).toBe(true);
    expect(holds(1215, 'mongol', ...at('Samarkand'))).toBe(false);
  });

  it('holds Transoxiana after the Khwarezmian campaign', () => {
    expect(holds(1221, 'mongol', ...at('Samarkand'))).toBe(true);
    expect(holds(1221, 'mongol', ...at('Bukhara'))).toBe(true);
    expect(holds(1221, 'mongol', ...at('Kiev'))).toBe(false);
  });

  it('holds the Rus after 1240 but not before', () => {
    expect(holds(1237, 'mongol', ...at('Kiev'))).toBe(false);
    expect(holds(1241, 'mongol', ...at('Kiev'))).toBe(true);
  });

  it('takes Anatolia only after Köse Dağ', () => {
    expect(holds(1241, 'mongol', ...at('Konya'))).toBe(false);
    expect(holds(1243, 'mongol', ...at('Konya'))).toBe(true);
  });

  it('takes Baghdad only in 1258', () => {
    expect(holds(1253, 'mongol', ...at('Baghdad'))).toBe(false);
    expect(holds(1258, 'mongol', ...at('Baghdad'))).toBe(true);
  });

  it('never reaches Egypt, Arabia or Delhi', () => {
    for (const year of [1221, 1241, 1253, 1258]) {
      expect(holds(year, 'mongol', ...at('Cairo'))).toBe(false);
      expect(holds(year, 'mongol', ...at('Riyadh'))).toBe(false);
      expect(holds(year, 'mongol', ...at('Delhi'))).toBe(false);
    }
  });

  it('never holds the southern Song before the split', () => {
    expect(holds(1258, 'mongol', ...at('Hangzhou'))).toBe(false);
    expect(holds(1258, 'mongol', ...at('Guangzhou'))).toBe(false);
  });
});

describe('the four khanates after 1260', () => {
  it('splits into exactly four realms', () => {
    expect(snapshotForYear(1260).realms.map((r) => r.realm).sort()).toEqual([
      'chagatai',
      'golden-horde',
      'ilkhanate',
      'yuan',
    ]);
    expect(snapshotForYear(1259).realms.map((r) => r.realm)).toEqual(['mongol']);
  });

  it('puts Persia and Iraq in the Ilkhanate, and Syria outside it', () => {
    expect(holds(1279, 'ilkhanate', ...at('Tabriz'))).toBe(true);
    expect(holds(1279, 'ilkhanate', ...at('Baghdad'))).toBe(true);
    expect(holds(1279, 'ilkhanate', ...at('Konya'))).toBe(true);
    // Mamluk, and the whole point of Ain Jalut.
    expect(holds(1279, 'ilkhanate', ...at('Damascus'))).toBe(false);
    expect(holds(1279, 'ilkhanate', ...at('Aleppo'))).toBe(false);
    expect(holds(1279, 'ilkhanate', ...at('Cairo'))).toBe(false);
    // Arabia was nobody's; this was wrong in an earlier draft.
    expect(holds(1279, 'ilkhanate', ...at('Riyadh'))).toBe(false);
    expect(holds(1279, 'ilkhanate', ...at('Muscat'))).toBe(false);
  });

  it('puts the Rus and the lower Volga in the Golden Horde', () => {
    expect(holds(1279, 'golden-horde', ...at('Kiev'))).toBe(true);
    expect(holds(1279, 'golden-horde', ...at('Sarai'))).toBe(true);
    expect(holds(1279, 'golden-horde', ...at('Baghdad'))).toBe(false);
  });

  it('puts Transoxiana in the Chagatai ulus', () => {
    expect(holds(1279, 'chagatai', ...at('Samarkand'))).toBe(true);
    expect(holds(1279, 'chagatai', ...at('Bukhara'))).toBe(true);
  });

  it('gives the Yuan all of China only after Yamen', () => {
    expect(holds(1260, 'yuan', ...at('Hangzhou'))).toBe(false);
    expect(holds(1276, 'yuan', ...at('Hangzhou'))).toBe(true);
    expect(holds(1276, 'yuan', ...at('Guangzhou'))).toBe(false);
    expect(holds(1279, 'yuan', ...at('Guangzhou'))).toBe(true);
  });

  it('includes Korea and excludes Japan', () => {
    expect(holds(1279, 'yuan', ...at('Kaesong'))).toBe(true);
    expect(holds(1279, 'yuan', ...at('Kyoto'))).toBe(false);
  });

  it('keeps the khanates from claiming each other’s capitals', () => {
    expect(holds(1279, 'yuan', ...at('Samarkand'))).toBe(false);
    expect(holds(1279, 'chagatai', ...at('Karakorum'))).toBe(false);
    expect(holds(1279, 'golden-horde', ...at('Tabriz'))).toBe(false);
  });
});

describe('dataset integrity', () => {
  it('has snapshots in ascending year order', () => {
    const years = SNAPSHOTS.map((s) => s.year);
    expect([...years].sort((a, b) => a - b)).toEqual(years);
  });

  it('closes every ring', () => {
    for (const snap of SNAPSHOTS) {
      for (const realm of snap.realms) {
        for (const r of realm.rings) {
          expect(r.length).toBeGreaterThan(3);
          expect(r[0]).toEqual(r[r.length - 1]);
        }
      }
    }
  });

  it('keeps every coordinate on Earth and inside the drawn frame', () => {
    for (const snap of SNAPSHOTS) {
      for (const realm of snap.realms) {
        for (const r of realm.rings) {
          for (const [lon, lat] of r) {
            expect(lon).toBeGreaterThanOrEqual(18);
            expect(lon).toBeLessThanOrEqual(138);
            expect(lat).toBeGreaterThanOrEqual(14);
            expect(lat).toBeLessThanOrEqual(60);
          }
        }
      }
    }
  });

  it('has events in ascending year order and inside the timeline', () => {
    const years = EVENTS.map((e) => e.year);
    expect([...years].sort((a, b) => a - b)).toEqual(years);
    for (const e of EVENTS) {
      expect(e.year).toBeGreaterThanOrEqual(1206);
      expect(e.year).toBeLessThanOrEqual(1294);
    }
  });

  it('always has at least one ruler, and one per realm', () => {
    for (let y = 1206; y <= 1294; y++) {
      const rulers = rulersInYear(y);
      expect(rulers.length, `no ruler in ${y}`).toBeGreaterThan(0);
      const realms = rulers.map((r) => r.realm);
      expect(new Set(realms).size, `duplicate throne in ${y}`).toBe(
        realms.length,
      );
    }
  });

  it('shows four thrones once divided and one before', () => {
    expect(rulersInYear(1230)).toHaveLength(1);
    expect(rulersInYear(1290)).toHaveLength(4);
  });
});

/*
 * These check the *shape* of every source link, not that it resolves —
 * reaching Wikipedia from a unit test would make the suite fail whenever the
 * network does. `npm run check:links` does the fetching; this makes sure
 * nothing ships with a missing, relative or malformed URL in the first place.
 */
describe('sources', () => {
  const works = [...SECONDARY, ...PRIMARY];
  const everySource = [
    ...RULERS.map((r) => [`ruler ${r.id}`, r.source] as const),
    ...EVENTS.map((e) => [`event ${e.year} ${e.title}`, e.source] as const),
    ...works.map((w) => [`work ${w.title}`, w.source] as const),
    ...DATA_CREDITS.map((c) => [`credit ${c.title}`, c] as const),
  ];

  it('gives every ruler a source', () => {
    for (const r of RULERS) expect(r.source?.url, r.id).toBeTruthy();
  });

  it('gives every event a source', () => {
    for (const e of EVENTS) expect(e.source?.url, `${e.year} ${e.title}`).toBeTruthy();
  });

  it('uses absolute https URLs everywhere', () => {
    for (const [where, s] of everySource) {
      expect(s.url.startsWith('https://'), `${where}: ${s.url}`).toBe(true);
      expect(() => new URL(s.url), where).not.toThrow();
    }
  });

  it('percent-encodes non-ASCII titles rather than embedding raw characters', () => {
    // Ögedei, Güyük, Möngke and the Berke–Hulegu en-dash all need escaping;
    // a raw character here means someone hand-edited a URL.
    for (const [where, s] of everySource) {
      // eslint-disable-next-line no-control-regex
      expect(/[^\x00-\x7F]/.test(s.url), `${where}: ${s.url}`).toBe(false);
    }
  });

  it('gives every source a non-empty human-readable title', () => {
    for (const [where, s] of everySource) {
      expect(s.title.trim().length, where).toBeGreaterThan(0);
    }
  });
});
