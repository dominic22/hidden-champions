import { Chip } from "@heroui/react";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  DetailShell,
  entityLinkClassName,
} from "@/components/detail-shell";
import {
  formatHoldingRole,
  formatPercent,
  formatStakeType,
} from "@/components/format";
import { SourcesList } from "@/components/sources-list";
import { getHolding } from "@/lib/data";

type HoldingPageProps = {
  params: Promise<{ id: string }>;
};

export default async function HoldingPage({ params }: HoldingPageProps) {
  const { id } = await params;
  const holding = await getHolding(id);
  if (!holding) notFound();

  return (
    <DetailShell
      backHref={`/people/${holding.personId}`}
      backLabel={holding.personName ?? "Back to person"}
    >
      <p className="font-display text-sm font-medium tracking-[0.2em] text-[var(--hc-gold)] uppercase">
        Holding
      </p>
      <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-[var(--hc-ink)] sm:text-5xl">
        {holding.organizationName ?? holding.organizationId}
      </h1>
      <p className="mt-3 text-lg text-[var(--hc-muted)]">
        Stake held by{" "}
        <Link
          href={`/people/${holding.personId}`}
          className={entityLinkClassName()}
        >
          {holding.personName ?? holding.personId}
        </Link>
      </p>

      <dl className="mt-12 grid gap-8 sm:grid-cols-2">
        <div>
          <dt className="text-xs font-medium tracking-wide text-[var(--hc-muted)] uppercase">
            Organization
          </dt>
          <dd className="mt-2 text-lg">
            <Link
              href={`/organizations/${holding.organizationId}`}
              className={entityLinkClassName()}
            >
              {holding.organizationName ?? holding.organizationId}
            </Link>
          </dd>
        </div>
        <div>
          <dt className="text-xs font-medium tracking-wide text-[var(--hc-muted)] uppercase">
            Stake type
          </dt>
          <dd className="mt-2">
            <Chip>
              <Chip.Label>{formatStakeType(holding.stakeType)}</Chip.Label>
            </Chip>
          </dd>
        </div>
        <div>
          <dt className="text-xs font-medium tracking-wide text-[var(--hc-muted)] uppercase">
            Ownership
          </dt>
          <dd className="mt-2 font-display text-2xl font-semibold tabular-nums text-[var(--hc-ink)]">
            {formatPercent(holding.ownershipPercent)}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-medium tracking-wide text-[var(--hc-muted)] uppercase">
            Role
          </dt>
          <dd className="mt-2 text-lg text-[var(--hc-ink)]">
            {formatHoldingRole(holding.role)}
          </dd>
        </div>
        {holding.asOf ? (
          <div>
            <dt className="text-xs font-medium tracking-wide text-[var(--hc-muted)] uppercase">
              As of
            </dt>
            <dd className="mt-2 text-lg tabular-nums text-[var(--hc-ink)]">
              {holding.asOf}
            </dd>
          </div>
        ) : null}
      </dl>

      <SourcesList sources={holding.sources} />
    </DetailShell>
  );
}
