import { useMemo } from 'react';
import { GRATICULE_PATH, HEIGHT, LAND_PATH, WIDTH, project, ringsToPath } from '../lib/geo';
import { SNAPSHOTS, snapshotForYear } from '../data/territory';
import type { Realm } from '../data/types';

const REALM_FILL: Record<Realm, string> = {
  mongol: 'var(--color-mongol)',
  yuan: 'var(--color-yuan)',
  'golden-horde': 'var(--color-horde)',
  ilkhanate: 'var(--color-ilkhan)',
  chagatai: 'var(--color-chagatai)',
};

/**
 * Where to write each khanate's name on the map, in lon/lat.
 *
 * Hand-placed rather than computed from a centroid: the centroid of the
 * Golden Horde's ring lands in the middle of the Caspian, and the
 * Ilkhanate's lands in the Dasht-e Kavir where the label collides with its
 * own southern edge.
 */
const REALM_LABEL_AT: Record<Realm, [number, number]> = {
  // Below Karakorum, which sits at 102.8/47.2 and collided with the label.
  mongol: [103, 43.5],
  yuan: [112, 44],
  'golden-horde': [48, 50],
  ilkhanate: [53, 34],
  chagatai: [74, 42],
};

const REALM_LABEL_TEXT: Record<Realm, string> = {
  mongol: 'Mongol Empire',
  yuan: 'Yuan',
  'golden-horde': 'Golden Horde',
  ilkhanate: 'Ilkhanate',
  chagatai: 'Chagatai',
};

/** Cities worth anchoring the eye, drawn always and labelled always. */
const CITIES: { name: string; lon: number; lat: number; dx?: number; dy?: number }[] = [
  { name: 'Karakorum', lon: 102.8, lat: 47.2, dy: -8 },
  { name: 'Dadu', lon: 116.4, lat: 39.9, dx: 8 },
  { name: 'Samarkand', lon: 66.9, lat: 39.7, dy: 14 },
  { name: 'Baghdad', lon: 44.4, lat: 33.3, dx: -8 },
  { name: 'Sarai', lon: 47.5, lat: 46.8, dx: -8 },
  { name: 'Kiev', lon: 30.5, lat: 50.4, dy: -8 },
  { name: 'Tabriz', lon: 46.3, lat: 38.1, dx: -8 },
  { name: 'Hangzhou', lon: 120.2, lat: 30.3, dx: 8 },
];

interface Props {
  year: number;
}

export function MapView({ year }: Props) {
  /**
   * Every snapshot's shapes are rendered once and held in the DOM; only
   * opacity changes with the year. That is what makes the cross-fade free —
   * CSS animates the swap and React does no path recomputation on scrub,
   * which matters because scrubbing fires a change per year.
   */
  const shapes = useMemo(
    () =>
      SNAPSHOTS.map((snap) => ({
        year: snap.year,
        realms: snap.realms.map((r) => ({
          realm: r.realm,
          d: ringsToPath(r.rings),
        })),
      })),
    [],
  );

  const active = snapshotForYear(year);

  const cities = useMemo(
    () =>
      CITIES.map((c) => {
        const p = project(c.lon, c.lat);
        return p ? { ...c, x: p[0], y: p[1] } : null;
      }).filter((c): c is NonNullable<typeof c> => c !== null),
    [],
  );

  const labels = useMemo(
    () =>
      (Object.keys(REALM_LABEL_AT) as Realm[])
        .map((realm) => {
          const [lon, lat] = REALM_LABEL_AT[realm];
          const p = project(lon, lat);
          return p ? { realm, x: p[0], y: p[1] } : null;
        })
        .filter((l): l is NonNullable<typeof l> => l !== null),
    [],
  );

  const activeRealms = new Set(active.realms.map((r) => r.realm));

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      className="h-full w-full"
      role="img"
      aria-label={`Approximate extent of the Mongol empire in ${year}`}
    >
      <defs>
        {/*
          Territory is clipped to the coastline. This is what lets the rings in
          territory.ts be drawn loosely — several of them run out over the Black
          Sea or the Persian Gulf, and clipping removes the spill instead of
          requiring every ring to trace a coast by hand.
        */}
        <clipPath id="land-clip">
          <path d={LAND_PATH} />
        </clipPath>
      </defs>

      <rect width={WIDTH} height={HEIGHT} fill="var(--color-sea)" />

      <path d={LAND_PATH} fill="var(--color-land)" />

      {/*
        Graticule over the land rather than under it. Under the fills it was
        invisible on land and only showed at sea, which made it read as a
        decorative texture on the water instead of as a coordinate grid.
      */}
      <path
        d={GRATICULE_PATH}
        fill="none"
        stroke="var(--color-ink-faint)"
        strokeWidth={0.5}
        opacity={0.35}
      />

      <g clipPath="url(#land-clip)">
        {shapes.map((snap) =>
          snap.realms.map((r) => (
            <path
              key={`${snap.year}-${r.realm}`}
              className="realm-shape"
              d={r.d}
              fill={REALM_FILL[r.realm]}
              opacity={snap.year === active.year ? 0.8 : 0}
            />
          )),
        )}
      </g>

      {/* Coastline drawn over the fills so the land edge stays legible. */}
      <path
        d={LAND_PATH}
        fill="none"
        stroke="var(--color-ink-soft)"
        strokeWidth={0.9}
        opacity={0.85}
      />

      {cities.map((c) => (
        <g key={c.name}>
          <circle cx={c.x} cy={c.y} r={2.6} fill="var(--color-ink)" />
          <text
            x={c.x + (c.dx ?? 0)}
            y={c.y + (c.dy ?? 4)}
            textAnchor={c.dx && c.dx < 0 ? 'end' : c.dx ? 'start' : 'middle'}
            fontSize={13}
            fill="var(--color-ink)"
            stroke="var(--color-land)"
            strokeWidth={3}
            paintOrder="stroke"
            className="pointer-events-none"
          >
            {c.name}
          </text>
        </g>
      ))}

      {labels.map((l) => (
        <text
          key={l.realm}
          x={l.x}
          y={l.y}
          textAnchor="middle"
          fontSize={17}
          letterSpacing="0.14em"
          fill="var(--color-paper)"
          stroke="rgb(59 47 36 / 0.45)"
          strokeWidth={3}
          paintOrder="stroke"
          className="realm-shape pointer-events-none select-none"
          style={{ fontVariantCaps: 'all-small-caps' }}
          opacity={activeRealms.has(l.realm) ? 1 : 0}
        >
          {REALM_LABEL_TEXT[l.realm]}
        </text>
      ))}
    </svg>
  );
}
