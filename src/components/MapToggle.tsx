interface Props {
  checked: boolean;
  onChange: (next: boolean) => void;
}

/**
 * The modern-borders switch.
 *
 * A real `<input type="checkbox">` with the native control visually hidden
 * rather than a `<div role="switch">`: it gets keyboard focus, space-toggling,
 * form semantics and the screen-reader checked state for free, and all of
 * those are things a hand-rolled switch has to reimplement and usually gets
 * at least one of wrong.
 */
export function MapToggle({ checked, onChange }: Props) {
  return (
    <label className="group inline-flex cursor-pointer select-none items-center gap-2 text-[0.8rem] text-ink-soft hover:text-ink">
      <input
        type="checkbox"
        className="peer sr-only"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />

      {/*
        The knob's state classes are written as `peer-checked:[&>span]:…` on
        the track rather than `peer-checked:…` on the knob itself. Tailwind's
        peer variant compiles to a general-sibling selector (`~`), and the
        knob is a *descendant* of the input's sibling, not a sibling — so the
        plain form silently never matches and the switch renders as a toggle
        that does not move.
      */}
      <span
        aria-hidden="true"
        className="relative h-[1.1rem] w-8 rounded-full border border-rule bg-paper-deep transition-colors peer-checked:border-ink-soft peer-checked:bg-ink-soft peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink peer-checked:[&>span]:translate-x-[0.9rem] peer-checked:[&>span]:bg-paper"
      >
        <span className="absolute top-[0.1rem] left-[0.1rem] size-[0.8rem] rounded-full bg-ink-faint transition-transform duration-150 group-hover:bg-ink-soft" />
      </span>

      Modern borders
    </label>
  );
}
