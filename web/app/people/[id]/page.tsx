import { Chip, Table } from "@heroui/react";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  DetailSection,
  DetailShell,
  entityLinkClassName,
} from "@/components/detail-shell";
import {
  formatAssetCategory,
  formatCitizenship,
  formatHoldingRole,
  formatNetWorth,
  formatPercent,
  formatRank,
  formatRelationshipType,
  formatStakeType,
  formatWealthSource,
} from "@/components/format";
import { SourcesList } from "@/components/sources-list";
import { getChampion } from "@/lib/data";

type PersonPageProps = {
  params: Promise<{ id: string }>;
};

export default async function PersonPage({ params }: PersonPageProps) {
  const { id } = await params;
  const champion = await getChampion(id);
  if (!champion) notFound();

  const { person, latest, netWorth, assets, holdings, relationships } =
    champion;

  return (
    <DetailShell backHref="/#directory" backLabel="Back to roster">
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

      {netWorth.length > 1 ? (
        <DetailSection title="Net worth history">
          <Table>
            <Table.ScrollContainer>
              <Table.Content aria-label="Net worth history">
                <Table.Header>
                  <Table.Column isRowHeader>As of</Table.Column>
                  <Table.Column>Net worth</Table.Column>
                  <Table.Column>Rank</Table.Column>
                </Table.Header>
                <Table.Body>
                  {netWorth.map((snapshot) => (
                    <Table.Row key={snapshot.id} id={snapshot.id}>
                      <Table.Cell className="tabular-nums">
                        {snapshot.asOf}
                      </Table.Cell>
                      <Table.Cell className="tabular-nums font-medium">
                        {formatNetWorth(snapshot.netWorthUsd)}
                      </Table.Cell>
                      <Table.Cell className="tabular-nums text-[var(--hc-muted)]">
                        {formatRank(snapshot.rank)}
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Content>
            </Table.ScrollContainer>
          </Table>
        </DetailSection>
      ) : null}

      {assets.length > 0 ? (
        <DetailSection title="Assets">
          <Table>
            <Table.ScrollContainer>
              <Table.Content aria-label="Assets">
                <Table.Header>
                  <Table.Column isRowHeader>Name</Table.Column>
                  <Table.Column>Category</Table.Column>
                  <Table.Column>Est. value</Table.Column>
                </Table.Header>
                <Table.Body>
                  {assets.map((asset) => (
                    <Table.Row key={asset.id} id={asset.id}>
                      <Table.Cell>
                        <Link
                          href={`/assets/${asset.id}`}
                          className={entityLinkClassName()}
                        >
                          {asset.name}
                        </Link>
                      </Table.Cell>
                      <Table.Cell>
                        <Chip size="sm" variant="soft">
                          <Chip.Label>
                            {formatAssetCategory(asset.category)}
                          </Chip.Label>
                        </Chip>
                      </Table.Cell>
                      <Table.Cell className="tabular-nums">
                        {formatNetWorth(asset.estimatedValueUsd)}
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Content>
            </Table.ScrollContainer>
          </Table>
        </DetailSection>
      ) : null}

      {holdings.length > 0 ? (
        <DetailSection title="Holdings">
          <Table>
            <Table.ScrollContainer>
              <Table.Content aria-label="Holdings">
                <Table.Header>
                  <Table.Column isRowHeader>Organization</Table.Column>
                  <Table.Column>Stake</Table.Column>
                  <Table.Column>Role</Table.Column>
                  <Table.Column>Ownership</Table.Column>
                </Table.Header>
                <Table.Body>
                  {holdings.map((holding) => (
                    <Table.Row key={holding.id} id={holding.id}>
                      <Table.Cell>
                        <div className="flex flex-col gap-1">
                          <Link
                            href={`/organizations/${holding.organizationId}`}
                            className={entityLinkClassName()}
                          >
                            {holding.organizationName ?? holding.organizationId}
                          </Link>
                          <Link
                            href={`/holdings/${holding.id}`}
                            className="text-sm text-[var(--hc-muted)] underline-offset-2 hover:underline"
                          >
                            View holding
                          </Link>
                        </div>
                      </Table.Cell>
                      <Table.Cell>
                        {formatStakeType(holding.stakeType)}
                      </Table.Cell>
                      <Table.Cell>
                        {formatHoldingRole(holding.role)}
                      </Table.Cell>
                      <Table.Cell className="tabular-nums">
                        {formatPercent(holding.ownershipPercent)}
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Content>
            </Table.ScrollContainer>
          </Table>
        </DetailSection>
      ) : null}

      {relationships.length > 0 ? (
        <DetailSection title="Relationships">
          <Table>
            <Table.ScrollContainer>
              <Table.Content aria-label="Relationships">
                <Table.Header>
                  <Table.Column isRowHeader>Type</Table.Column>
                  <Table.Column>From</Table.Column>
                  <Table.Column>To</Table.Column>
                </Table.Header>
                <Table.Body>
                  {relationships.map((relationship) => (
                    <Table.Row key={relationship.id} id={relationship.id}>
                      <Table.Cell>
                        <Link
                          href={`/relationships/${relationship.id}`}
                          className={entityLinkClassName()}
                        >
                          {formatRelationshipType(relationship.type)}
                        </Link>
                      </Table.Cell>
                      <Table.Cell>
                        <Link
                          href={relationship.fromHref}
                          className={entityLinkClassName()}
                        >
                          {relationship.fromLabel}
                        </Link>
                      </Table.Cell>
                      <Table.Cell>
                        <Link
                          href={relationship.toHref}
                          className={entityLinkClassName()}
                        >
                          {relationship.toLabel}
                        </Link>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Content>
            </Table.ScrollContainer>
          </Table>
        </DetailSection>
      ) : null}

      <SourcesList sources={person.sources} />
    </DetailShell>
  );
}
