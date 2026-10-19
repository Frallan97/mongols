import { useCallback, useEffect, useState } from 'react';
import { EventNote } from './components/EventNote';
import { LeaderPanel } from './components/LeaderPanel';
import { MapView } from './components/MapView';
import { Sources } from './components/Sources';
import { Timeline } from './components/Timeline';
import { EVENT_YEARS } from './data/events';
import { END_YEAR, START_YEAR } from './data/territory';

/** Milliseconds per year during playback. */
const STEP_MS = 230;
/**
 * Years carrying an event hold longer, because otherwise playback is a
 * pretty animation you cannot read. The whole run is ~45 seconds: fast
 * through the quiet stretches, a beat on each turning point.
 */
const EVENT_HOLD_MS = 1250;

const eventYears = new Set(EVENT_YEARS);

const clampYear = (n: number) =>
  Math.min(END_YEAR, Math.max(START_YEAR, Math.round(n)));

/** Read `#y=1241` off the URL so a particular year can be linked to. */
function yearFromHash(): number {
  const m = /(?:^|[#&])y=(-?\d+)/.exec(window.location.hash);
  return m ? clampYear(Number(m[1])) : START_YEAR;
}

export default function App() {
  const [year, setYear] = useState(yearFromHash);
  const [playing, setPlaying] = useState(false);

  // Keep the URL in step with the year, without pushing 88 history entries
  // during playback — replaceState means Back still leaves the page.
  useEffect(() => {
    const hash = `#y=${year}`;
    if (window.location.hash !== hash) {
      window.history.replaceState(null, '', hash);
    }
  }, [year]);

  // Advance one year at a time. A chain of timeouts rather than an interval,
  // so the per-year delay can vary with whether the year has something to say.
  useEffect(() => {
    if (!playing) return;
    if (year >= END_YEAR) {
      setPlaying(false);
      return;
    }
    const delay = eventYears.has(year) ? EVENT_HOLD_MS : STEP_MS;
    const id = window.setTimeout(() => setYear((y) => y + 1), delay);
    return () => window.clearTimeout(id);
  }, [playing, year]);

  // Scrubbing takes over from playback — a slider that fights the user is
  // worse than no autoplay at all.
  const handleYearChange = useCallback((next: number) => {
    setPlaying(false);
    setYear(next);
  }, []);

  const handleTogglePlay = useCallback(() => {
    setPlaying((p) => {
      if (p) return false;
      // Pressing play at the end replays from the beginning rather than
      // doing nothing, which is what a stopped-at-the-end player should do.
      setYear((y) => (y >= END_YEAR ? START_YEAR : y));
      return true;
    });
  }, []);

  // Arrow keys nudge the year from anywhere on the page.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.tagName === 'INPUT') return; // the slider handles its own
      if (e.key === 'ArrowLeft') {
        handleYearChange(Math.max(START_YEAR, year - 1));
      } else if (e.key === 'ArrowRight') {
        handleYearChange(Math.min(END_YEAR, year + 1));
      } else if (e.key === ' ') {
        e.preventDefault();
        handleTogglePlay();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [year, handleYearChange, handleTogglePlay]);

  // Content height, not viewport height. An earlier version stretched to
  // min-h-full and pinned the footer to the bottom, which on a tall window
  // left a few hundred pixels of empty paper between the map and the slider —
  // the two things the page most wants you to connect.
  return (
    <div className="relative z-10 mx-auto flex max-w-[1500px] flex-col gap-5 px-5 py-6 lg:px-8">
      <header className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-rule pb-3">
        <h1 className="text-[1.65rem] leading-none tracking-wide">
          The Mongol Empire
        </h1>
        <p className="text-sm text-ink-soft">
          Expansion and division, {START_YEAR}–{END_YEAR}
        </p>
      </header>

      <main className="flex flex-col gap-6 lg:flex-row">
        <div className="min-w-0 flex-1">
          <div className="overflow-hidden rounded-sm border border-rule bg-sea shadow-[0_1px_0_rgb(255_255_255/0.5)_inset,0_2px_8px_rgb(59_47_36/0.1)]">
            <MapView year={year} />
          </div>
          <p className="mt-2 text-[0.7rem] leading-snug text-ink-faint">
            Borders are approximate and contested. The empire controlled
            armies, cities, roads and tribute rather than a surveyed frontier;
            vassal states such as Goryeo and the Rus principalities are drawn
            the same as directly ruled land.
          </p>
        </div>

        <aside className="flex w-full shrink-0 flex-col gap-6 lg:w-[22rem]">
          <LeaderPanel year={year} />
          <div className="border-t border-rule/60 pt-5">
            <EventNote year={year} />
          </div>
        </aside>
      </main>

      <footer className="border-t border-rule pt-4">
        <Timeline
          year={year}
          playing={playing}
          onYearChange={handleYearChange}
          onTogglePlay={handleTogglePlay}
        />
        <p className="mt-3 text-[0.7rem] text-ink-faint">
          Drag to scrub, or press play. Arrow keys step a year; space toggles
          playback. Ticks mark the years the map changes; dots mark the years
          with a note. Every ruler and event links to its source.
        </p>
        <Sources />
      </footer>
    </div>
  );
}
