/**
 * Shared shapes for the three hand-authored datasets: territory, rulers, events.
 *
 * A note on the whole premise, since it governs every type below. The Mongol
 * empire did not have borders in the modern sense. It had armies, tribute
 * relationships, garrisoned cities and seasonal pasture. Drawing it as filled
 * polygons is a convention inherited from print atlases, not a claim about
 * where a line stood in a given year. Everything here is approximate and the
 * UI says so out loud.
 */

/** The political divisions the map ever needs to colour. */
export type Realm =
  | 'mongol' // the undivided empire, 1206-1259
  | 'yuan' // Great Khan's domain / Yuan dynasty
  | 'golden-horde' // Jochid ulus
  | 'ilkhanate' // Hulegu's ulus in Persia
  | 'chagatai'; // Chagatai ulus in Central Asia

/**
 * A dated snapshot of the empire's extent.
 *
 * Snapshots are sparse — roughly one per significant change — and the slider
 * shows the most recent one at or before the selected year. Consecutive
 * snapshots cross-fade rather than morph: the polygons have different vertex
 * counts and interpolating between them produces garbage, not history.
 */
export interface TerritorySnapshot {
  /** The year this extent is taken to be true from, until the next snapshot. */
  year: number;
  /** One entry per realm present in this year. */
  realms: RealmExtent[];
}

export interface RealmExtent {
  realm: Realm;
  /**
   * Closed rings in [lon, lat]. Multiple rings = disjoint territory (the
   * Ilkhanate's Anatolian holdings, for instance, read better as their own
   * shape than as a tendril off Persia).
   */
  rings: [number, number][][];
}

/** A person holding a throne over a continuous span. */
export interface Ruler {
  id: string;
  name: string;
  realm: Realm;
  /** Reign start. Elections after a khan's death leave real gaps; see `interregnum`. */
  from: number;
  /** Reign end, inclusive. */
  to: number;
  /** One line on why they matter. Shown under the name in the leader panel. */
  note: string;
  /**
   * True for regency or contested periods where `name` describes a situation
   * rather than a crowned ruler ("Regency of Töregene"). Rendered in italics.
   */
  interregnum?: boolean;
}

/** A turning point, pinned to a year. */
export interface HistoricalEvent {
  year: number;
  title: string;
  /** Deliberately one sentence. The slider is the medium; this is a caption. */
  text: string;
}
