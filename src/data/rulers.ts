import type { Ruler } from './types';

/**
 * Reign dates follow the conventional dating used in the standard surveys
 * listed in `sources.ts` (Morgan, Jackson, Atwood). Where those disagree by a
 * year — common for the khanates, whose accessions are dated variously from
 * election, enthronement, or the predecessor's death — the more widely cited
 * year is used, and the app does not flag the dispute.
 *
 * Each ruler's `source` links to their encyclopedia article: an entry point
 * for a reader checking a claim, not the work this was written from.
 *
 * Regencies are included rather than smoothed over. The gaps between khans
 * were not administrative footnotes: the five years between Ögedei's death
 * and Güyük's election stopped the invasion of Europe, and the manoeuvring
 * under Oghul Qaimish put the Toluids on the throne.
 */
export const RULERS: Ruler[] = [
  // ---------------------------------------------------------------------
  // The undivided empire — Great Khans
  // ---------------------------------------------------------------------
  {
    id: 'genghis',
    source: {
      url: 'https://en.wikipedia.org/wiki/Genghis_Khan',
      title: 'Genghis Khan',
    },
    name: 'Genghis Khan',
    realm: 'mongol',
    from: 1206,
    to: 1227,
    note: 'Born Temüjin; united the steppe tribes and turned them outward.',
  },
  {
    id: 'tolui-regency',
    source: {
      url: 'https://en.wikipedia.org/wiki/Tolui',
      title: 'Tolui',
    },
    name: 'Regency of Tolui',
    realm: 'mongol',
    from: 1227,
    to: 1229,
    note: "Genghis's youngest son held the throne while the succession was settled.",
    interregnum: true,
  },
  {
    id: 'ogedei',
    source: {
      url: 'https://en.wikipedia.org/wiki/%C3%96gedei_Khan',
      title: 'Ögedei Khan',
    },
    name: 'Ögedei Khan',
    realm: 'mongol',
    from: 1229,
    to: 1241,
    note: 'Built Karakorum, finished the Jin, and launched the campaign into Europe.',
  },
  {
    id: 'toregene-regency',
    source: {
      url: 'https://en.wikipedia.org/wiki/T%C3%B6regene_Khatun',
      title: 'Töregene Khatun',
    },
    name: 'Regency of Töregene',
    realm: 'mongol',
    from: 1241,
    to: 1246,
    note: "Ögedei's widow ruled for five years while securing the throne for her son.",
    interregnum: true,
  },
  {
    id: 'guyuk',
    source: {
      url: 'https://en.wikipedia.org/wiki/G%C3%BCy%C3%BCk_Khan',
      title: 'Güyük Khan',
    },
    name: 'Güyük Khan',
    realm: 'mongol',
    from: 1246,
    to: 1248,
    note: 'Reigned barely two years; received the first papal embassy to the Mongols.',
  },
  {
    id: 'oghul-regency',
    source: {
      url: 'https://en.wikipedia.org/wiki/Oghul_Qaimish',
      title: 'Oghul Qaimish',
    },
    name: 'Regency of Oghul Qaimish',
    realm: 'mongol',
    from: 1248,
    to: 1251,
    note: "Güyük's widow lost control to Batu, who engineered a Toluid succession.",
    interregnum: true,
  },
  {
    id: 'mongke',
    source: {
      url: 'https://en.wikipedia.org/wiki/M%C3%B6ngke_Khan',
      title: 'Möngke Khan',
    },
    name: 'Möngke Khan',
    realm: 'mongol',
    from: 1251,
    to: 1259,
    note: 'Purged the Ögedeids and opened two fronts at once: Song China and Persia.',
  },

  // ---------------------------------------------------------------------
  // Yuan / the Great Khan's domain, after the 1260 rupture
  // ---------------------------------------------------------------------
  {
    id: 'kublai',
    source: {
      url: 'https://en.wikipedia.org/wiki/Kublai_Khan',
      title: 'Kublai Khan',
    },
    name: 'Kublai Khan',
    realm: 'yuan',
    from: 1260,
    to: 1294,
    note: 'Won the civil war, conquered the Song, and ruled China as the Yuan emperor.',
  },

  // ---------------------------------------------------------------------
  // Golden Horde (Jochid ulus)
  // ---------------------------------------------------------------------
  {
    id: 'berke',
    source: {
      url: 'https://en.wikipedia.org/wiki/Berke',
      title: 'Berke',
    },
    name: 'Berke Khan',
    realm: 'golden-horde',
    from: 1257,
    to: 1266,
    note: 'First Mongol ruler to convert to Islam; went to war against his own cousin Hülegü.',
  },
  {
    id: 'mengu-timur',
    source: {
      url: 'https://en.wikipedia.org/wiki/Mengu-Timur',
      title: 'Mengu-Timur',
    },
    name: 'Mengu-Timur',
    realm: 'golden-horde',
    from: 1266,
    to: 1280,
    note: 'Ruled as an openly independent khan and struck his own coinage.',
  },
  {
    id: 'tode-mongke',
    source: {
      url: 'https://en.wikipedia.org/wiki/Tode_Mongke',
      title: 'Töde Möngke',
    },
    name: 'Töde Möngke',
    realm: 'golden-horde',
    from: 1280,
    to: 1287,
    note: 'A devout and disengaged khan; real power sat with the general Nogai.',
  },
  {
    id: 'talabuga',
    source: {
      url: 'https://en.wikipedia.org/wiki/Talabuga',
      title: 'Talabuga',
    },
    name: 'Talabuga',
    realm: 'golden-horde',
    from: 1287,
    to: 1291,
    note: 'Raided Poland and Hungary before Nogai deposed and killed him.',
  },
  {
    id: 'toqta',
    source: {
      url: 'https://en.wikipedia.org/wiki/Toqta',
      title: 'Toqta',
    },
    name: 'Toqta',
    realm: 'golden-horde',
    from: 1291,
    to: 1294,
    note: 'Installed by Nogai, then spent his reign destroying him.',
  },

  // ---------------------------------------------------------------------
  // Ilkhanate (Hülegüid ulus)
  // ---------------------------------------------------------------------
  {
    id: 'hulegu',
    source: {
      url: 'https://en.wikipedia.org/wiki/Hulegu_Khan',
      title: 'Hülegü Khan',
    },
    name: 'Hülegü Khan',
    realm: 'ilkhanate',
    from: 1256,
    to: 1265,
    note: "Destroyed the Assassins and the Caliphate, then founded his own dynasty in Persia.",
  },
  {
    id: 'abaqa',
    source: {
      url: 'https://en.wikipedia.org/wiki/Abaqa_Khan',
      title: 'Abaqa Khan',
    },
    name: 'Abaqa Khan',
    realm: 'ilkhanate',
    from: 1265,
    to: 1282,
    note: 'Sought a Christian alliance against the Mamluks and never got one.',
  },
  {
    id: 'tekuder',
    source: {
      url: 'https://en.wikipedia.org/wiki/Tekuder',
      title: 'Tekuder',
    },
    name: 'Tekuder (Ahmad)',
    realm: 'ilkhanate',
    from: 1282,
    to: 1284,
    note: 'Converted to Islam and sued for peace with Cairo; his own army removed him.',
  },
  {
    id: 'arghun',
    source: {
      url: 'https://en.wikipedia.org/wiki/Arghun',
      title: 'Arghun',
    },
    name: 'Arghun Khan',
    realm: 'ilkhanate',
    from: 1284,
    to: 1291,
    note: 'Reversed the Islamic turn and sent embassies as far as England and Rome.',
  },
  {
    id: 'gaykhatu',
    source: {
      url: 'https://en.wikipedia.org/wiki/Gaykhatu',
      title: 'Gaykhatu',
    },
    name: 'Gaykhatu',
    realm: 'ilkhanate',
    from: 1291,
    to: 1294,
    note: 'Wrecked the economy by trying to impose Chinese-style paper money on Persia.',
  },

  // ---------------------------------------------------------------------
  // Chagatai ulus
  // ---------------------------------------------------------------------
  {
    id: 'alghu',
    source: {
      url: 'https://en.wikipedia.org/wiki/Alghu',
      title: 'Alghu',
    },
    name: 'Alghu',
    realm: 'chagatai',
    from: 1260,
    to: 1266,
    note: 'Installed by Ariq Böke, then promptly turned on him and backed Kublai.',
  },
  {
    id: 'mubarak-baraq',
    source: {
      url: 'https://en.wikipedia.org/wiki/Ghiyas-ud-din_Baraq',
      title: 'Ghiyas-ud-din Baraq',
    },
    name: 'Baraq',
    realm: 'chagatai',
    from: 1266,
    to: 1271,
    note: "Sent east by Kublai to take the ulus, he invaded the Ilkhanate instead and lost.",
  },
  {
    id: 'chagatai-contested',
    source: {
      url: 'https://en.wikipedia.org/wiki/Chagatai_Khanate',
      title: 'Chagatai Khanate',
    },
    name: 'Contested succession',
    realm: 'chagatai',
    from: 1271,
    to: 1282,
    note: 'A decade of short-lived khans ruling at the pleasure of Qaidu.',
    interregnum: true,
  },
  {
    id: 'duwa',
    source: {
      url: 'https://en.wikipedia.org/wiki/Duwa',
      title: 'Duwa',
    },
    name: 'Duwa',
    realm: 'chagatai',
    from: 1282,
    to: 1294,
    note: "Qaidu's lieutenant and the ruler who made the Chagatai ulus a real power again.",
  },
];

const REALM_ORDER: Record<string, number> = {
  mongol: 0,
  yuan: 1,
  'golden-horde': 2,
  ilkhanate: 3,
  chagatai: 4,
};

/**
 * One ruler per realm for `year`.
 *
 * Reigns deliberately share their boundary year — Genghis's `to` and Tolui's
 * `from` are both 1227 — because a death and a succession happen in the same
 * year and both are true of it. For display we resolve that to a single name
 * per throne by taking the latest accession, so the transition year shows who
 * came next rather than two names in one slot.
 */
export function rulersInYear(year: number): Ruler[] {
  const byRealm = new Map<string, Ruler>();
  for (const r of RULERS) {
    if (year < r.from || year > r.to) continue;
    const held = byRealm.get(r.realm);
    if (!held || r.from > held.from) byRealm.set(r.realm, r);
  }
  return [...byRealm.values()].sort(
    (a, b) => REALM_ORDER[a.realm] - REALM_ORDER[b.realm],
  );
}
