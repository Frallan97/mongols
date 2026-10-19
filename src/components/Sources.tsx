import { SourceLink } from './SourceLink';
import { DATA_CREDITS, PRIMARY, SECONDARY, type Work } from '../data/sources';

function WorkList({ works }: { works: Work[] }) {
  return (
    <ul className="space-y-2">
      {works.map((w) => (
        <li key={w.title}>
          <span className="text-ink">
            <SourceLink source={w.source} describes={w.author}>
              {w.author}
            </SourceLink>
            , <cite className="italic">{w.title}</cite>
          </span>
          <span className="block text-ink-faint">{w.note}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * Collapsed by default.
 *
 * Not because the sources are an afterthought — every ruler and event on the
 * page already links out individually — but because this is the apparatus
 * rather than the argument, and expanded it is taller than the timeline it
 * sits under. A `<details>` keeps it one click away, works without
 * JavaScript, and is findable by in-page search even while closed in most
 * browsers.
 */
export function Sources() {
  return (
    <details className="group mt-4 text-[0.78rem]">
      <summary className="label cursor-pointer list-none text-xs marker:content-none hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink">
        <span className="inline-block w-3 transition-transform group-open:rotate-90">
          ›
        </span>
        Sources
      </summary>

      <div className="mt-3 grid gap-6 border-t border-rule/60 pt-4 sm:grid-cols-3">
        <section>
          <h3 className="label mb-2 text-[0.65rem]">Modern scholarship</h3>
          <WorkList works={SECONDARY} />
        </section>

        <section>
          <h3 className="label mb-2 text-[0.65rem]">Contemporary sources</h3>
          <WorkList works={PRIMARY} />
        </section>

        <section>
          <h3 className="label mb-2 text-[0.65rem]">Map data</h3>
          <ul className="space-y-2 text-ink-faint">
            {DATA_CREDITS.map((c) => (
              <li key={c.url}>
                <SourceLink source={c}>{c.title}</SourceLink>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <p className="mt-4 max-w-3xl leading-relaxed text-ink-faint">
        Each ruler and each event above links to its own article — those are
        starting points for checking a claim, not the works this was written
        from. The reign dates and framing follow the modern scholarship
        listed here; where those works disagree with one another, which is
        common for the khanate successions, the more widely cited year is used
        without flagging the dispute. The territory outlines have no source in
        this sense: they are an interpretation of the extents shown in
        reference atlases, and the limits of that are set out beside the map.
      </p>
    </details>
  );
}
