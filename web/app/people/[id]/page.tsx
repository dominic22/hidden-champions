import { buttonVariants, Chip } from "@heroui/react";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  formatCitizenship,
  formatNetWorth,
  formatRank,
  formatWealthSource,
} from "@/components/format";
import { getChampion } from "@/lib/data";

type PersonPageProps = {
  params: Promise<{ id: string }>;
};

export default async function PersonPage({ params }: PersonPageProps) {
  const { id } = await params;
  const champion = await getChampion(id);
  if (!champion) notFound();

  const { person, latest } = champion;

  return (
    <div className="flex flex-1 flex-col bg-[var(--hc-paper)]">
      <div className="border-b border-[var(--hc-ink)]/10 bg-[var(--hc-mist)]/60">
        <div className="mx-auto flex w-full max-w-3xl items-center px-6 py-4 sm:px-10">
          <Link
            href="/#directory"
            className={buttonVariants({ variant: "ghost", size: "sm" })}
          >
            ← Back to roster
          </Link>
        </div>
      </div>

      <article className="mx-auto w-full max-w-3xl px-6 py-12 sm:px-10 sm:py-16">
        <p className="font-display text-sm font-medium tracking-[0.2em] text-[var(--hc-gold)] uppercase">
          {formatRank(latest?.rank)} · {person.status}
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-[var(--hc-ink)] sm:text-5xl">
          {person.name.full}
        </h1>
        {person.summary ? (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--hc-muted)]">
            {person.summary}
          </p>
        ) : null}

        <dl className="mt-12 grid gap-8 sm:grid-cols-2">
          <div>
            <dt className="text-xs font-medium tracking-wide text-[var(--hc-muted)] uppercase">
              Net worth
            </dt>
            <dd className="mt-2 font-display text-3xl font-semibold tabular-nums text-[var(--hc-ink)]">
              {formatNetWorth(latest?.netWorthUsd)}
            </dd>
            {latest?.asOf ? (
              <p className="mt-1 text-sm text-[var(--hc-muted)]">
                As of {latest.asOf}
              </p>
            ) : null}
          </div>
          <div>
            <dt className="text-xs font-medium tracking-wide text-[var(--hc-muted)] uppercase">
              Primary wealth source
            </dt>
            <dd className="mt-2">
              <Chip>
                <Chip.Label>
                  {formatWealthSource(person.primaryWealthSource)}
                </Chip.Label>
              </Chip>
            </dd>
          </div>
          <div>
            <dt className="text-xs font-medium tracking-wide text-[var(--hc-muted)] uppercase">
              Citizenship
            </dt>
            <dd className="mt-2 text-lg text-[var(--hc-ink)]">
              {formatCitizenship(person.citizenship)}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-medium tracking-wide text-[var(--hc-muted)] uppercase">
              Residence
            </dt>
            <dd className="mt-2 text-lg text-[var(--hc-ink)]">
              {formatCitizenship(person.residenceCountries)}
            </dd>
          </div>
        </dl>

        {person.sources.length > 0 ? (
          <section className="mt-14 border-t border-[var(--hc-ink)]/10 pt-10">
            <h2 className="font-display text-xl font-semibold text-[var(--hc-ink)]">
              Sources
            </h2>
            <ul className="mt-4 space-y-3">
              {person.sources.map((source, index) => (
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
        ) : null}
      </article>
    </div>
  );
}
