import { Chip } from "@heroui/react";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  DetailShell,
  entityLinkClassName,
} from "@/components/detail-shell";
import { formatRelationshipType } from "@/components/format";
import { SourcesList } from "@/components/sources-list";
import { getRelationship } from "@/lib/data";

type RelationshipPageProps = {
  params: Promise<{ id: string }>;
};

export default async function RelationshipPage({
  params,
}: RelationshipPageProps) {
  const { id } = await params;
  const relationship = await getRelationship(id);
  if (!relationship) notFound();

  const personSide =
    relationship.from.kind === "person"
      ? relationship.from
      : relationship.to.kind === "person"
        ? relationship.to
        : null;
  const backHref = personSide
    ? `/people/${personSide.id}`
    : relationship.fromHref;
  const backLabel =
    personSide != null
      ? relationship.from.kind === "person"
        ? relationship.fromLabel
        : relationship.toLabel
      : "Back";

  return (
    <DetailShell backHref={backHref} backLabel={`Back to ${backLabel}`}>
      <p className="font-display text-sm font-medium tracking-[0.2em] text-[var(--hc-gold)] uppercase">
        Relationship
      </p>
      <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-[var(--hc-ink)] sm:text-5xl">
        {formatRelationshipType(relationship.type)}
      </h1>
      {relationship.notes ? (
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--hc-muted)]">
          {relationship.notes}
        </p>
      ) : null}

      <dl className="mt-12 grid gap-8 sm:grid-cols-2">
        <div>
          <dt className="text-xs font-medium tracking-wide text-[var(--hc-muted)] uppercase">
            Type
          </dt>
          <dd className="mt-2">
            <Chip>
              <Chip.Label>
                {formatRelationshipType(relationship.type)}
              </Chip.Label>
            </Chip>
          </dd>
        </div>
        <div>
          <dt className="text-xs font-medium tracking-wide text-[var(--hc-muted)] uppercase">
            Period
          </dt>
          <dd className="mt-2 text-lg tabular-nums text-[var(--hc-ink)]">
            {[relationship.since, relationship.until]
              .filter(Boolean)
              .join(" → ") || "—"}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-medium tracking-wide text-[var(--hc-muted)] uppercase">
            From
          </dt>
          <dd className="mt-2 text-lg">
            <Link href={relationship.fromHref} className={entityLinkClassName()}>
              {relationship.fromLabel}
            </Link>
            <span className="ml-2 text-sm text-[var(--hc-muted)]">
              ({relationship.from.kind})
            </span>
          </dd>
        </div>
        <div>
          <dt className="text-xs font-medium tracking-wide text-[var(--hc-muted)] uppercase">
            To
          </dt>
          <dd className="mt-2 text-lg">
            <Link href={relationship.toHref} className={entityLinkClassName()}>
              {relationship.toLabel}
            </Link>
            <span className="ml-2 text-sm text-[var(--hc-muted)]">
              ({relationship.to.kind})
            </span>
          </dd>
        </div>
      </dl>

      <SourcesList sources={relationship.sources} />
    </DetailShell>
  );
}
