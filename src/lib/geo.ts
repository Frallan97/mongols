import { geoAzimuthalEqualArea, geoPath, geoGraticule10 } from 'd3-geo';
import { feature } from 'topojson-client';
import landTopo from 'world-atlas/land-50m.json';
import type { Topology } from 'topojson-specification';
import type { FeatureCollection, MultiPolygon, Polygon } from 'geojson';

/** SVG user-space size. The map is drawn once at this size and scaled by CSS. */
export const WIDTH = 1200;
/**
 * Wide and short, because the subject is. The empire runs 116° of longitude
 * and about 42° of latitude; at this centre that is roughly a 2.1:1 box, so a
 * squarer frame would just add empty ocean above and below.
 */
export const HEIGHT = 570;

/**
 * A lon/lat rectangle as a *densified* ring.
 *
 * Four corners is not enough. Every projection worth using bends meridians
 * and parallels, so a four-point rectangle projects to a quadrilateral whose
 * straight edges cut across the curves the real boundary follows — and
 * `fitExtent` then fits the wrong shape. Sampling every two degrees makes the
 * ring follow the projection's actual curvature.
 *
 * The ring is reversed at the end so it winds the way d3-geo expects; see
 * `windClockwise` below for why that matters so much.
 */
function lonLatBox(
  lon0: number,
  lon1: number,
  lat0: number,
  lat1: number,
  step = 2,
): Polygon {
  const pts: [number, number][] = [];
  for (let x = lon0; x <= lon1; x += step) pts.push([x, lat0]);
  for (let y = lat0; y <= lat1; y += step) pts.push([lon1, y]);
  for (let x = lon1; x >= lon0; x -= step) pts.push([x, lat1]);
  for (let y = lat1; y >= lat0; y -= step) pts.push([lon0, y]);
  pts.push([lon0, lat0]);
  return { type: 'Polygon', coordinates: [pts.reverse()] };
}

/**
 * The window on the world, fixed for every year.
 *
 * This is deliberately not fitted to the territory of the selected year. A
 * projection that reframed as the empire grew would keep the shape roughly
 * the same size on screen and the expansion would be invisible — the one
 * thing the whole page exists to show. So the frame is nailed to the region
 * and the shape grows inside it.
 */
const VIEW_EXTENT = lonLatBox(20, 136, 16, 58);

/**
 * Lambert azimuthal equal-area, centred on Central Asia.
 *
 * Equal-area matters here: on Mercator the Siberian steppe would dwarf
 * everything south of it and the map would overstate the empire badly in
 * exactly the direction people already misjudge it. Azimuthal rather than
 * conic because the region spans 118° of longitude — far too wide for a cone,
 * which fans the frame into a wedge and wastes most of it. Centred on the
 * middle of the empire, distortion is small everywhere that matters.
 */
export const projection = geoAzimuthalEqualArea()
  .rotate([-77, -38])
  .fitExtent(
    [
      [10, 10],
      [WIDTH - 10, HEIGHT - 10],
    ],
    VIEW_EXTENT,
  );

export const path = geoPath(projection);

const landFc = feature(
  landTopo as unknown as Topology,
  (landTopo as unknown as Topology).objects.land,
) as unknown as FeatureCollection<MultiPolygon>;

/** All land as one SVG path string — used for the basemap and as the clip. */
export const LAND_PATH: string = path(landFc) ?? '';

export const GRATICULE_PATH: string = path(geoGraticule10()) ?? '';

/**
 * Force a ring to the winding order d3-geo treats as "the inside is here".
 *
 * d3-geo does spherical clipping, and on a sphere a closed ring divides the
 * surface into two finite parts with no way to tell which is meant except by
 * winding order. Hand it a ring wound the wrong way and it renders the
 * complement — the entire planet except Mongolia — which is exactly the bug
 * the first version of this map had. Note the convention is the opposite of
 * GeoJSON's (RFC 7946 wants counter-clockwise exteriors), so authored rings
 * are normalised here rather than trusted.
 */
function windClockwise(ring: [number, number][]): [number, number][] {
  let area = 0;
  for (let i = 0, n = ring.length - 1; i < n; i++) {
    const [x0, y0] = ring[i];
    const [x1, y1] = ring[i + 1];
    area += x0 * y1 - x1 * y0;
  }
  // Positive shoelace is counter-clockwise in lon/lat; d3-geo wants the other.
  return area > 0 ? [...ring].reverse() : ring;
}

/** Projected path for a set of closed [lon, lat] rings. */
export function ringsToPath(rings: [number, number][][]): string {
  const wound = rings.map(windClockwise);
  const geom: Polygon | MultiPolygon =
    wound.length === 1
      ? { type: 'Polygon', coordinates: [wound[0]] }
      : { type: 'MultiPolygon', coordinates: wound.map((r) => [r]) };
  return path(geom) ?? '';
}

/** Projected [x, y] for a lon/lat, or null if it falls outside the projection. */
export function project(lon: number, lat: number): [number, number] | null {
  return projection([lon, lat]);
}
