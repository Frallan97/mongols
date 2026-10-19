import { SourceLink } from './SourceLink';
import { EVENTS, eventsInYear } from '../data/events';
import type { HistoricalEvent } from '../data/types';

/** The most recent event at or before `year`, for the quiet years. */
function lastEventBefore(year: number): HistoricalEvent | null {
  let found: HistoricalEvent | null = null;
  for (const e of EVENTS) {
    if (e.year <= year) found = e;
    else break;
  }
  return found;
}

interface Props {
  year: number;
}

export function EventNote({ year }: Props) {
  const current = eventsInYear(year);

  /*
   * Most of the 88 years have no event, and an empty panel on two thirds of
   * the timeline reads as a bug. So a quiet year shows the last thing that
   * happened, visibly marked as "most recently" rather than as news — the
   * year stays in the caption, so nothing is being attributed to the wrong
   * date.
   */
  if (current.length === 0) {
    const previous = lastEventBefore(year);
    if (!previous) return null;
    return (
      <section aria-labelledby="what-happened">
        <h2 id="what-happened" className="label mb-2 text-xs">
          Most recently
        </h2>
        <article className="opacity-65">
          <h3 className="text-[0.95rem] leading-snug">
            <span className="tabular-nums text-ink-faint">{previous.year}</span>{' '}
            ·{' '}
            <SourceLink source={previous.source} describes={previous.title}>
              {previous.title}
            </SourceLink>
          </h3>
          <p className="mt-1 text-[0.85rem] leading-relaxed text-ink-soft">
            {previous.text}
          </p>
        </article>
      </section>
    );
  }

  return (
    <section aria-labelledby="what-happened">
      <h2 id="what-happened" className="label mb-2 text-xs">
        {current.length > 1 ? `${year} — this year` : 'This year'}
      </h2>
      <div className="space-y-4">
        {current.map((e) => (
          <article key={e.title}>
            <h3 className="text-[1.05rem] leading-snug">
              <SourceLink source={e.source} describes={e.title}>
                {e.title}
              </SourceLink>
            </h3>
            <p className="mt-1 text-[0.88rem] leading-relaxed text-ink-soft">
              {e.text}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
