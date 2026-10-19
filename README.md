# The Mongol Empire, 1206–1294

An interactive map of the Mongol empire's expansion and division. Drag the
year slider or press play; the map redraws, the leader panel shows who held
which throne that year, and a note explains what happened.

Live at <https://mongols.vibeoholic.com>.

## What it is

- **1206–1294**, year by year. Genghis proclaimed Khan to the death of Kublai.
- **Four khanates after 1260.** Before the split the leader panel shows one
  Great Khan; after it, all four concurrent rulers, colour-matched to the map.
- **~35 turning points**, one sentence each, pinned to the year they happened.
- **Every claim is sourced.** Each ruler and each event links to its own
  article; the standard scholarship behind the dates is credited under
  *Sources* at the foot of the page.
- **No backend.** Four hand-authored TypeScript datasets and a bundled
  coastline. Nothing is fetched at runtime.

Deep-link to a year with the URL fragment: `/#y=1241`.

## The honest caveat

**The borders are approximate and contested, and that is not a disclaimer
that can be engineered away.** There is no authoritative machine-readable
dataset of Mongol borders by year, and "border" is an anachronism for a state
that controlled armies, cities, roads and tribute rather than a surveyed
frontier. The rings in [`src/data/territory.ts`](src/data/territory.ts) are
drawn from the extents in standard reference atlases, and the file documents
the three specific distortions baked into them — vassals drawn as directly
ruled, deserts drawn as held, and campaign-end dates standing in for the much
slower consolidation of control.

What the app *can* guarantee is internal consistency, and that is what
`src/data/territory.test.ts` enforces: assertions in terms of named places
("Damascus is never Ilkhanid", "the Yuan hold Guangzhou only after 1279")
rather than pixels. Those tests caught three real errors that looked fine on
screen — the Ilkhanate annexing Arabia, Kiev falling outside the Golden Horde,
and Konya outside Mongol Anatolia. Edit a ring, run `npm test`.

## Sources

Every ruler (22) and every event (35) carries a `source` with a verified URL,
living next to the data it supports in `src/data/rulers.ts` and
`src/data/events.ts`. The bibliography — Morgan, Jackson, Atwood, plus the
*Secret History* and Rashid al-Din — is in `src/data/sources.ts` and renders
in the collapsed *Sources* panel under the timeline.

Two different things are being credited, and the app does not blur them:

- **The per-item links go to encyclopedia articles.** They are entry points
  for *checking* a claim — stable, free to read, and carrying their own
  footnotes into the literature. They are not what the prose was written
  from.
- **The works in `sources.ts` are the scholarship the dates follow.** Where
  they disagree with each other — common for khanate accessions, which are
  dated variously from election, enthronement, or a predecessor's death —
  the more widely cited year is used and the dispute is not flagged.

```bash
npm run check:links    # fetches all 56 distinct URLs, fails on any non-200
```

That script is deliberately **not** in CI: it talks to the network, so a
Wikipedia blip could otherwise block a deploy for reasons unrelated to the
change. Link rot is real but slow — run it occasionally. The unit tests do
check link *shape* (absolute, https, percent-encoded, non-empty title), so a
malformed URL can't ship either way.

## Stack

| | |
|---|---|
| Build | Vite 8, React 19, TypeScript |
| Map | `d3-geo` + inline SVG — no tile server, no API key, works offline |
| Projection | Lambert azimuthal equal-area centred on Central Asia |
| Basemap | Natural Earth 50m land via `world-atlas`, bundled |
| Styling | Tailwind v4 |
| Tests | Vitest |
| Serving | nginx on Alpine |

No map library. Leaflet and MapLibre are built for present-day web-mercator
tiles and fight you when the geometry is hand-authored and historical; with
`d3-geo` the projection is yours and territories are just `<path>` elements
that CSS can cross-fade.

### Two things that will bite you if you edit the map

1. **Ring winding order.** d3-geo clips on the sphere, where a closed ring
   divides the surface into two finite parts and only winding order says
   which one you meant. A ring wound the wrong way renders as the entire
   planet minus your shape. `ringsToPath` normalises this; don't bypass it.
2. **Territory is clipped to the coastline.** That is deliberate, and it is
   what lets the rings be drawn loosely. But it means a ring that strays
   across a sea onto the far shore will claim the land it finds there — how
   the Ilkhanate briefly acquired Oman.

## Development

```bash
npm install
npm run dev        # http://localhost:5173
npm test           # territory / ruler / event assertions
npm run build      # tsc -b && vite build
```

## Deployment

GitOps via ArgoCD onto the k3s cluster, as a standalone `Application` rather
than an app-of-apps entry — that ApplicationSet derives image names as
`{{name}}-backend` / `{{name}}-frontend`, and this app is a single image with
no backend at all.

Push to `main` → GitHub Actions runs the tests, builds, and pushes
`ghcr.io/frallan97/mongols` → ArgoCD Image Updater rolls it out.

The chart is in [`charts/mongols`](charts/mongols).
