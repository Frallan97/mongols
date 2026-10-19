import { useEffect, useState } from 'react';
import { loadCountryBorders } from './geo';

/**
 * The modern-borders path, fetched the first time the overlay is switched on.
 *
 * Returns `null` until the chunk has loaded. There is deliberately no
 * spinner: this is a decoration on a map that is already fully drawn, the
 * chunk is small, and a loading indicator for a layer that appears a moment
 * later draws more attention to the wait than the wait deserves. Flipping the
 * toggle off and on again is free — `loadCountryBorders` memoises.
 */
export function useCountryBorders(enabled: boolean): string | null {
  const [path, setPath] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled || path !== null) return;
    let cancelled = false;
    loadCountryBorders().then(
      (d) => {
        // Guard against setting state after unmount, and against a late
        // resolve overwriting a path we already have.
        if (!cancelled) setPath(d);
      },
      (err) => {
        // A failed chunk load should cost the overlay, not the whole map.
        console.error('Could not load modern borders:', err);
      },
    );
    return () => {
      cancelled = true;
    };
  }, [enabled, path]);

  return path;
}
