import type { Source } from './types';

/**
 * Where this app's claims come from, and what each kind of link is for.
 *
 * Two different things are being credited here and it is worth not blurring
 * them:
 *
 *  - The per-ruler and per-event links in `rulers.ts` and `events.ts` go to
 *    encyclopedia articles. They are *entry points for checking*, chosen
 *    because they are stable, free to read, and carry their own footnotes to
 *    the primary and secondary literature. They are not what the prose was
 *    written from.
 *  - The works below are the standard scholarship the dates, reign spans and
 *    framing follow. Where they disagree with each other — and on khanate
 *    accession years they often do, because different sources date a reign
 *    from election, enthronement or the predecessor's death — the app uses
 *    the more widely cited year and does not flag the dispute.
 *
 * The map itself has no source in this sense, and `territory.ts` says so at
 * length: the rings are an interpretation, not a transcription.
 */

export interface Work {
  author: string;
  title: string;
  note: string;
  source: Source;
}

/** Modern scholarship the dates and framing follow. */
export const SECONDARY: Work[] = [
  {
    author: 'David Morgan',
    title: 'The Mongols',
    note: 'The standard single-volume survey; the spine of the chronology used here.',
    source: {
      url: 'https://en.wikipedia.org/wiki/David_Morgan_(historian)',
      title: 'David Morgan (historian)',
    },
  },
  {
    author: 'Peter Jackson',
    title: 'The Mongols and the West',
    note: 'On the European campaigns and why 1241 was the limit rather than a pause.',
    source: {
      url: 'https://en.wikipedia.org/wiki/Peter_Jackson_(historian)',
      title: 'Peter Jackson (historian)',
    },
  },
  {
    author: 'Christopher Atwood',
    title: 'Encyclopedia of Mongolia and the Mongol Empire',
    note: 'Reference for reign dates, especially the contested khanate successions.',
    source: {
      url: 'https://en.wikipedia.org/wiki/Christopher_Atwood',
      title: 'Christopher Atwood',
    },
  },
];

/** Thirteenth and fourteenth century sources the above are built on. */
export const PRIMARY: Work[] = [
  {
    author: 'Anonymous, 13th c.',
    title: 'The Secret History of the Mongols',
    note: 'The only substantial account written from inside the Mongol world.',
    source: {
      url: 'https://en.wikipedia.org/wiki/The_Secret_History_of_the_Mongols',
      title: 'The Secret History of the Mongols',
    },
  },
  {
    author: 'Rashid al-Din',
    title: 'Jamiʿ al-tawarikh',
    note: 'Compiled at the Ilkhanid court — the fullest near-contemporary history.',
    source: {
      url: "https://en.wikipedia.org/wiki/Jami'_al-tawarikh",
      title: "Jami' al-tawarikh",
    },
  },
];

/** Credits for the things the map is drawn with rather than drawn from. */
export const DATA_CREDITS: Source[] = [
  {
    url: 'https://www.naturalearthdata.com/',
    title: 'Natural Earth — public domain coastline (1:50m land)',
  },
  {
    url: 'https://github.com/topojson/world-atlas',
    title: 'world-atlas — the TopoJSON build of it used here',
  },
  {
    url: 'https://en.wikipedia.org/wiki/Mongol_Empire',
    title: 'Mongol Empire — general overview and further reading',
  },
];
