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
                The realm name is only worth printing once the empire is
                divided. Before 1260 there is one throne and labelling it
                "Mongol Empire" above every khan is noise.
              */}
              {divided && (
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

      {divided && (
        <p className="mt-4 border-t border-rule/60 pt-3 text-[0.78rem] leading-snug text-ink-faint">
          After 1260 the Great Khan is nominally senior but holds no authority
          over the other three uluses. They fight each other.
        </p>
      )}
    </section>
  );
}
