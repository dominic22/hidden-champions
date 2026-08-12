import type { SourceClaim } from "@/lib/data";

type SourcesListProps = {
  sources: SourceClaim[];
  title?: string;
};

export function SourcesList({
  sources,
  title = "Sources",
}: SourcesListProps) {
  if (sources.length === 0) return null;

  return (
    <section className="mt-14 border-t border-[var(--hc-ink)]/10 pt-10">
      <h2 className="font-display text-xl font-semibold text-[var(--hc-ink)]">
        {title}
      </h2>
      <ul className="mt-4 space-y-3">
        {sources.map((source, index) => (
          <li
            key={`${source.source}-${index}`}
            className="text-[var(--hc-muted)]"
          >
            {source.url ? (
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--hc-forest)] underline-offset-4 hover:text-[var(--hc-gold)] hover:underline"
              >
                {source.source}
              </a>
            ) : (
              <span className="capitalize">{source.source}</span>
            )}
            {source.note ? (
              <span className="text-[var(--hc-muted)]"> — {source.note}</span>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
}
