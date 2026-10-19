import { rulersInYear } from '../data/rulers';
import { REALM_LABEL, isDivided } from '../data/territory';
import type { Realm } from '../data/types';

const REALM_SWATCH: Record<Realm, string> = {
  mongol: 'bg-mongol',
  yuan: 'bg-yuan',
  'golden-horde': 'bg-horde',
  ilkhanate: 'bg-ilkhan',
  chagatai: 'bg-chagatai',
};

interface Props {
  year: number;
}

export function LeaderPanel({ year }: Props) {
  const rulers = rulersInYear(year);
  const divided = isDivided(year);

  /*
   * Hülegü takes Persia in 1256 and Berke the Horde in 1257, three years
   * before the empire formally breaks apart — so there is a window where
   * three names are listed under one undivided map. Realm names are keyed to
   * that, not to the split: any time more than one throne is shown, each one
   * has to say which throne it is. Keying them to `divided` left 1256-1259
   * showing three unlabelled rulers and a colour swatch that matched nothing
   * on the map.
   */
  const showRealms = rulers.length > 1;

  return (
    <section aria-labelledby="who-ruled">
      <h2 id="who-ruled" className="label mb-2 text-xs">
        {divided ? 'Who ruled — four khanates' : 'Who ruled'}
      </h2>

      <ul className="space-y-3">
        {rulers.map((r) => (
          <li key={r.id} className="flex gap-2.5">
            <span
              className={`mt-[0.45rem] size-2.5 shrink-0 rounded-sm ${REALM_SWATCH[r.realm]}`}
              aria-hidden="true"
            />
            <div className="min-w-0">
              {/*
                Skipped when there is only one throne: labelling a lone khan
                "Mongol Empire" is noise.
              */}
              {showRealms && (
                <div className="label text-[0.65rem] leading-tight">
                  {REALM_LABEL[r.realm]}
                </div>
              )}
              <div
                className={`text-[1.05rem] leading-snug ${r.interregnum ? 'italic text-ink-soft' : ''}`}
              >
                {r.name}
              </div>
              <div className="text-xs text-ink-faint tabular-nums">
                r. {r.from}–{r.to}
              </div>
              <p className="mt-0.5 text-[0.82rem] leading-snug text-ink-soft">
                {r.note}
              </p>
            </div>
          </li>
        ))}
      </ul>

      {divided ? (
        <p className="mt-4 border-t border-rule/60 pt-3 text-[0.78rem] leading-snug text-ink-faint">
          After 1260 the Great Khan is nominally senior but holds no authority
          over the other three uluses. They fight each other.
        </p>
      ) : (
        showRealms && (
          <p className="mt-4 border-t border-rule/60 pt-3 text-[0.78rem] leading-snug text-ink-faint">
            These western rulers still answer to the Great Khan — the uluses
            are commands, not yet kingdoms. That ends in 1260.
          </p>
        )
      )}
    </section>
  );
}
