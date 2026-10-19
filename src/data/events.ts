import type { HistoricalEvent } from './types';

/**
 * Turning points only. The test for inclusion is whether the empire looked
 * different afterwards — a conquest that redrew the map, a succession that
 * changed who the empire answered to, or a defeat that set a limit it never
 * passed. Secondary campaigns and raids are left out on purpose; the slider
 * is the narrative, and these are captions on it.
 *
 * Some years carry two entries. 1260 carries three, which is the point: it is
 * the year the expansion stopped and the empire turned on itself.
 */
export const EVENTS: HistoricalEvent[] = [
  {
    year: 1206,
    title: 'Proclaimed Genghis Khan',
    text: 'A kurultai on the Onon river acclaims Temüjin as ruler of all the tribes of the felt-walled tents, ending twenty years of steppe civil war.',
  },
  {
    year: 1209,
    title: 'Western Xia submits',
    text: 'The Tangut kingdom becomes the first settled state to accept Mongol overlordship, giving Genghis a tributary and a route south.',
  },
  {
    year: 1211,
    title: 'War with Jin China begins',
    text: 'The Mongols cross the Gobi against the Jurchen Jin, beginning a campaign that will take twenty-three years to finish.',
  },
  {
    year: 1215,
    title: 'Zhongdu falls',
    text: 'The Jin capital — on the site of modern Beijing — is stormed and burned after a year-long siege.',
  },
  {
    year: 1218,
    title: 'Qara Khitai absorbed',
    text: 'Jebe takes the Qara Khitai empire almost without a battle, putting the Mongols on the frontier of Khwarezm.',
  },
  {
    year: 1219,
    title: 'The Otrar massacre',
    text: 'Khwarezm executes a Mongol trade caravan and then the envoys sent to protest, and Genghis turns his whole army west.',
  },
  {
    year: 1220,
    title: 'Bukhara and Samarkand',
    text: 'The great cities of Transoxiana fall within months of each other, and the Khwarezmian state collapses faster than it can be defended.',
  },
  {
    year: 1221,
    title: 'The Khurasan massacres',
    text: 'Merv, Nishapur and Urgench are systematically destroyed — the atrocity that fixed the Mongol reputation in the Islamic world for centuries.',
  },
  {
    year: 1223,
    title: 'Battle of the Kalka River',
    text: 'A reconnaissance force under Jebe and Subutai annihilates a combined Rus and Cuman army, then rides home.',
  },
  {
    year: 1227,
    title: 'Death of Genghis Khan',
    text: 'Genghis dies on campaign against the Tanguts, who are exterminated as his funeral rite.',
  },
  {
    year: 1229,
    title: 'Ögedei elected',
    text: 'A kurultai confirms Genghis’s third son as Great Khan, and the empire proves it can survive its founder.',
  },
  {
    year: 1234,
    title: 'The Jin destroyed',
    text: 'The last Jin emperor dies at Caizhou and northern China passes entirely into Mongol hands.',
  },
  {
    year: 1235,
    title: 'Karakorum walled',
    text: 'Ögedei gives the empire a fixed capital and a bureaucracy, and a kurultai there resolves to invade the west.',
  },
  {
    year: 1236,
    title: "Batu's western campaign opens",
    text: 'Volga Bulgaria is destroyed and the Kipchak steppe overrun, opening the road into Europe.',
  },
  {
    year: 1237,
    title: 'The Rus principalities fall',
    text: 'Ryazan is destroyed in a winter campaign and the Rus princes are subjugated one by one over the next three years.',
  },
  {
    year: 1240,
    title: 'Kiev sacked',
    text: 'The mother of Rus cities is taken and levelled, and Rus enters two centuries under the Horde.',
  },
  {
    year: 1241,
    title: 'Legnica and Mohi',
    text: 'Mongol armies destroy a Polish-German force and the Hungarian royal army within two days of each other, and Europe has no answer.',
  },
  {
    year: 1241,
    title: "Ögedei's death saves Europe",
    text: 'News of the Great Khan’s death reaches the Danube and the princes turn back east for the succession — the high-water mark in the west.',
  },
  {
    year: 1246,
    title: 'Güyük elected',
    text: 'After five years of regency a kurultai chooses Güyük, watched by the first papal envoy ever sent to the Mongols.',
  },
  {
    year: 1251,
    title: 'The Toluid coup',
    text: 'Möngke takes the throne with Batu’s backing and purges the house of Ögedei, permanently narrowing who may rule.',
  },
  {
    year: 1256,
    title: 'Alamut taken',
    text: 'Hülegü destroys the Nizari Ismaili strongholds in the Elburz, ending the Assassins as a power.',
  },
  {
    year: 1258,
    title: 'The sack of Baghdad',
    text: 'The Abbasid Caliphate — five centuries old — is extinguished and the last caliph executed.',
  },
  {
    year: 1259,
    title: 'Möngke dies in Sichuan',
    text: 'The Great Khan dies on campaign against the Song, and the empire has no agreed way to replace him.',
  },
  {
    year: 1260,
    title: 'Ain Jalut',
    text: 'A Mamluk army defeats the Mongols in Galilee — the first strategic defeat they do not reverse, fixing the empire’s limit in the southwest.',
  },
  {
    year: 1260,
    title: 'Two Great Khans proclaimed',
    text: 'Kublai and Ariq Böke are each elected by rival kurultais, and the Toluid Civil War begins.',
  },
  {
    year: 1264,
    title: 'The empire divides for good',
    text: 'Ariq Böke surrenders, but by now the four uluses answer to themselves and no Great Khan rules the whole again.',
  },
  {
    year: 1266,
    title: 'Berke-Hülegü war',
    text: 'The Golden Horde and the Ilkhanate fight openly over the Caucasus — Mongol against Mongol, with the Horde allied to the Mamluks.',
  },
  {
    year: 1271,
    title: 'The Yuan dynasty declared',
    text: 'Kublai proclaims a Chinese dynasty with himself as emperor, governing from Dadu rather than the steppe.',
  },
  {
    year: 1274,
    title: 'First invasion of Japan',
    text: 'A seaborne force lands at Hakata Bay, withdraws after a storm, and reveals the limit of Mongol power at sea.',
  },
  {
    year: 1276,
    title: 'Hangzhou surrenders',
    text: 'The Song capital is handed over intact and the richest state on earth passes to the Yuan.',
  },
  {
    year: 1279,
    title: 'Yamen — the Song extinguished',
    text: 'The last Song loyalists are destroyed at sea and China is unified under foreign rule for the first time.',
  },
  {
    year: 1281,
    title: 'The kamikaze',
    text: 'A second and far larger invasion fleet is wrecked by a typhoon off Kyushu, and Japan is never attempted again.',
  },
  {
    year: 1285,
    title: 'Repulsed in Vietnam',
    text: 'Đại Việt defeats a Yuan invasion in the field, and the jungle frontier proves as hard a limit as the sea.',
  },
  {
    year: 1293,
    title: 'The Java expedition fails',
    text: 'A fleet sent to punish Java is outmanoeuvred and driven off — the furthest the Mongols ever projected force.',
  },
  {
    year: 1294,
    title: 'Death of Kublai Khan',
    text: 'The last Great Khan whose title meant anything outside his own realm dies at Dadu, and four separate empires remain.',
  },
];

/** All events falling in `year`, in authored order. */
export function eventsInYear(year: number): HistoricalEvent[] {
  return EVENTS.filter((e) => e.year === year);
}

/** Years that carry at least one event — used to draw ticks on the slider. */
export const EVENT_YEARS: number[] = [...new Set(EVENTS.map((e) => e.year))].sort(
  (a, b) => a - b,
);
