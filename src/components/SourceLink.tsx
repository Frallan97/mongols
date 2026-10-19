import type { Source } from '../data/types';

interface Props {
  source: Source;
  children: React.ReactNode;
  /** Extra context for screen readers, e.g. the ruler or event this is about. */
  describes?: string;
}

/**
 * An outbound link to a source.
 *
 * `rel="noreferrer"` as well as `noopener`: these go to a third party, and
 * there is no reason to tell Wikipedia which year of the slider someone was
 * looking at when they clicked. The page URL carries the year in its
 * fragment, which is not sent in a referrer anyway, but the host and path
 * are, and withholding them costs nothing.
 *
 * The accessible name says where the link goes and that it leaves the site,
 * because "Genghis Khan" on its own tells a screen-reader user nothing about
 * what activating it will do.
 */
export function SourceLink({ source, children, describes }: Props) {
  const subject = describes ? `${describes}: ` : '';
  return (
    <a
      className="src-link"
      href={source.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${subject}${source.title} on Wikipedia (opens in a new tab)`}
    >
      {children}
    </a>
  );
}
