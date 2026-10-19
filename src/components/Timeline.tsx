import { useMemo } from 'react';
import { EVENT_YEARS } from '../data/events';
import { END_YEAR, SNAPSHOTS, START_YEAR } from '../data/territory';

interface Props {
  year: number;
  playing: boolean;
  onYearChange: (year: number) => void;
  onTogglePlay: () => void;
}

const SPAN = END_YEAR - START_YEAR;
const pct = (y: number) => ((y - START_YEAR) / SPAN) * 100;

/** Decade labels under the track, plus the two endpoints. */
const DECADES = Array.from(
  { length: Math.floor(END_YEAR / 10) - Math.ceil(START_YEAR / 10) + 1 },
  (_, i) => (Math.ceil(START_YEAR / 10) + i) * 10,
);

export function Timeline({ year, playing, onYearChange, onTogglePlay }: Props) {
  const snapshotYears = useMemo(() => SNAPSHOTS.map((s) => s.year), []);

  return (
    <div className="w-full">
      <div className="flex items-end gap-5">
        <button
          type="button"
          onClick={onTogglePlay}
          aria-label={playing ? 'Pause' : 'Play the expansion from this year'}
          className="mb-1 flex size-12 shrink-0 items-center justify-center rounded-full border border-ink-soft/50 bg-paper-deep text-ink transition hover:bg-paper-edge focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
        >
          {playing ? (
            <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
              <rect x="6" y="5" width="4" height="14" fill="currentColor" />
              <rect x="14" y="5" width="4" height="14" fill="currentColor" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
              <path d="M7 4.5 19 12 7 19.5Z" fill="currentColor" />
            </svg>
          )}
        </button>

        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-baseline justify-between">
            <span className="label text-xs">{START_YEAR}</span>
            <span className="font-serif-display text-4xl leading-none tabular-nums">
              {year}
            </span>
            <span className="label text-xs">{END_YEAR}</span>
          </div>

          <div className="relative">
            {/*
              Ticks sit behind the input. Snapshot ticks are the years the map
              actually changes; event ticks are the years with a note. They are
              drawn separately because they answer different questions — "when
              does the shape move" versus "when did something happen" — and
              they only partly coincide.
            */}
            <div
              className="pointer-events-none absolute inset-x-0 top-1/2 h-5 -translate-y-1/2"
              aria-hidden="true"
            >
              {snapshotYears.map((y) => (
                <span
                  key={`snap-${y}`}
                  className="absolute top-0 h-5 w-px bg-ink-soft/45"
                  style={{ left: `${pct(y)}%` }}
                />
              ))}
              {EVENT_YEARS.map((y) => (
                <span
                  key={`evt-${y}`}
                  className="absolute top-0 size-[5px] -translate-x-1/2 rounded-full bg-mongol/70"
                  style={{ left: `${pct(y)}%` }}
                />
              ))}
            </div>

            <input
              type="range"
              className="year-slider relative"
              min={START_YEAR}
              max={END_YEAR}
              step={1}
              value={year}
              aria-label="Year"
              aria-valuetext={`Year ${year}`}
              onChange={(e) => onYearChange(Number(e.target.value))}
            />
          </div>

          <div className="relative mt-0.5 h-4" aria-hidden="true">
            {DECADES.map((y) => (
              <span
                key={y}
                className="absolute -translate-x-1/2 text-[10px] text-ink-faint tabular-nums"
                style={{ left: `${pct(y)}%` }}
              >
                {y}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
