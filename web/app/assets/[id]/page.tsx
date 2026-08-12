import { Chip } from "@heroui/react";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  DetailShell,
  entityLinkClassName,
} from "@/components/detail-shell";
import {
  formatAssetCategory,
  formatLocation,
  formatNetWorth,
} from "@/components/format";
import { SourcesList } from "@/components/sources-list";
import { getAsset } from "@/lib/data";

type AssetPageProps = {
  params: Promise<{ id: string }>;
};

export default async function AssetPage({ params }: AssetPageProps) {
  const { id } = await params;
  const asset = await getAsset(id);
  if (!asset) notFound();

  const detailEntries = Object.entries(asset.details ?? {}).filter(
    ([, value]) => value != null && value !== "",
  );

  return (
    <DetailShell
      backHref={`/people/${asset.ownerPersonId}`}
      backLabel={asset.ownerName ?? "Back to owner"}
    >
      <p className="font-display text-sm font-medium tracking-[0.2em] text-[var(--hc-gold)] uppercase">
        Asset
      </p>
      <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-[var(--hc-ink)] sm:text-5xl">
        {asset.name}
      </h1>

      <dl className="mt-12 grid gap-8 sm:grid-cols-2">
        <div>
          <dt className="text-xs font-medium tracking-wide text-[var(--hc-muted)] uppercase">
            Category
          </dt>
          <dd className="mt-2">
            <Chip>
              <Chip.Label>{formatAssetCategory(asset.category)}</Chip.Label>
            </Chip>
          </dd>
        </div>
        <div>
          <dt className="text-xs font-medium tracking-wide text-[var(--hc-muted)] uppercase">
            Estimated value
          </dt>
          <dd className="mt-2 font-display text-2xl font-semibold tabular-nums text-[var(--hc-ink)]">
            {formatNetWorth(asset.estimatedValueUsd)}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-medium tracking-wide text-[var(--hc-muted)] uppercase">
            Location
          </dt>
          <dd className="mt-2 text-lg text-[var(--hc-ink)]">
            {formatLocation(asset.location)}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-medium tracking-wide text-[var(--hc-muted)] uppercase">
            Owner
          </dt>
          <dd className="mt-2 text-lg">
            <Link
              href={`/people/${asset.ownerPersonId}`}
              className={entityLinkClassName()}
            >
              {asset.ownerName ?? asset.ownerPersonId}
            </Link>
          </dd>
        </div>
      </dl>

      {asset.notes ? (
        <p className="mt-10 text-lg leading-relaxed text-[var(--hc-muted)]">
          {asset.notes}
        </p>
      ) : null}

      {detailEntries.length > 0 ? (
        <dl className="mt-10 grid gap-6 sm:grid-cols-2">
          {detailEntries.map(([key, value]) => (
            <div key={key}>
              <dt className="text-xs font-medium tracking-wide text-[var(--hc-muted)] uppercase">
                {key.replaceAll(/([A-Z])/g, " $1").trim()}
              </dt>
              <dd className="mt-2 text-lg text-[var(--hc-ink)]">
                {String(value)}
              </dd>
            </div>
          ))}
        </dl>
      ) : null}

      <SourcesList sources={asset.sources} />
    </DetailShell>
  );
}
