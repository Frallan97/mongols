/**
 * Fetch every source URL in the app and fail on anything that is not a 200.
 *
 * Run with `npm run check:links`. This is deliberately NOT part of `npm test`
 * or of CI: it talks to the network, so putting it in the build would mean a
 * Wikipedia blip or a rate limit could block a deploy for reasons that have
 * nothing to do with the change being deployed. Link rot is real but slow —
 * this is a thing to run occasionally and before claiming the links work, not
 * on every commit.
 *
 * Redirects are followed and reported rather than treated as failures: a
 * Wikipedia page getting renamed leaves a redirect behind and the link still
 * works, but it is worth knowing so the canonical title can be updated.
 */
import { EVENTS } from '../src/data/events';
import { RULERS } from '../src/data/rulers';
import { DATA_CREDITS, PRIMARY, SECONDARY } from '../src/data/sources';

interface Target {
  url: string;
  where: string;
}

const targets: Target[] = [
  ...RULERS.map((r) => ({ url: r.source.url, where: `ruler ${r.id}` })),
  ...EVENTS.map((e) => ({ url: e.source.url, where: `event ${e.year} ${e.title}` })),
  ...[...SECONDARY, ...PRIMARY].map((w) => ({
    url: w.source.url,
    where: `work ${w.title}`,
  })),
  ...DATA_CREDITS.map((c) => ({ url: c.url, where: `credit ${c.title}` })),
];

// Several URLs repeat (Genghis Khan is both a ruler and two events), so check
// each distinct URL once and report every place it is used.
const byUrl = new Map<string, string[]>();
for (const t of targets) {
  byUrl.set(t.url, [...(byUrl.get(t.url) ?? []), t.where]);
}

const UA = 'mongols-map-link-check/1.0 (+https://mongols.vibeoholic.com)';

async function check(url: string) {
  try {
    // HEAD first — cheaper, and Wikipedia supports it. Some hosts don't, so
    // fall back to GET rather than reporting a false failure.
    let res = await fetch(url, { method: 'HEAD', headers: { 'User-Agent': UA } });
    if (res.status === 405 || res.status === 501) {
      res = await fetch(url, { headers: { 'User-Agent': UA } });
    }
    return { status: res.status, finalUrl: res.url };
  } catch (err) {
    return { status: 0, finalUrl: url, error: String(err) };
  }
}

const urls = [...byUrl.keys()].sort();
console.log(`Checking ${urls.length} distinct URLs across ${targets.length} references…\n`);

const results = await Promise.all(
  urls.map(async (u) => ({ url: u, ...(await check(u)) })),
);

let failures = 0;
let redirects = 0;

for (const r of results) {
  const uses = byUrl.get(r.url)!;
  if (r.status !== 200) {
    failures++;
    console.error(`FAIL ${r.status || 'ERR'}  ${r.url}`);
    for (const u of uses) console.error(`              used by: ${u}`);
    if ('error' in r && r.error) console.error(`              ${r.error}`);
  } else if (decodeURI(r.finalUrl) !== decodeURI(r.url)) {
    redirects++;
    console.warn(`REDIR 200  ${r.url}\n           -> ${r.finalUrl}`);
  }
}

console.log(
  `\n${urls.length} checked · ${failures} failed · ${redirects} redirected · ` +
    `${urls.length - failures - redirects} exact`,
);

if (failures > 0) {
  console.error('\nSource links are broken. Fix them before claiming otherwise.');
  process.exit(1);
}
