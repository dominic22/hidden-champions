import { Chip, Table } from "@heroui/react";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  DetailSection,
  DetailShell,
  entityLinkClassName,
} from "@/components/detail-shell";
import {
  formatHoldingRole,
  formatOrganizationType,
  formatPercent,
  formatRelationshipType,
  formatStakeType,
} from "@/components/format";
import { SourcesList } from "@/components/sources-list";
import { getOrganization } from "@/lib/data";

type OrganizationPageProps = {
  params: Promise<{ id: string }>;
};

export default async function OrganizationPage({
  params,
}: OrganizationPageProps) {
  const { id } = await params;
  const organization = await getOrganization(id);
  if (!organization) notFound();

  const backHolding = organization.holdings[0];
  const backHref = backHolding
    ? `/people/${backHolding.personId}`
    : "/#directory";
  const backLabel = backHolding?.personName
    ? `Back to ${backHolding.personName}`
    : "Back to roster";

  return (
    <DetailShell backHref={backHref} backLabel={backLabel}>
      <p className="font-display text-sm font-medium tracking-[0.2em] text-[var(--hc-gold)] uppercase">
        Organization
      </p>
      <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-[var(--hc-ink)] sm:text-5xl">
        {organization.name}
      </h1>
      {organization.summary ? (
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--hc-muted)]">
          {organization.summary}
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
                {formatOrganizationType(organization.type)}
              </Chip.Label>
            </Chip>
          </dd>
        </div>
        <div>
          <dt className="text-xs font-medium tracking-wide text-[var(--hc-muted)] uppercase">
            HQ / tax
          </dt>
          <dd className="mt-2 text-lg text-[var(--hc-ink)]">
            {[organization.hqCountry, organization.taxDomicile]
              .filter(Boolean)
              .join(" / ") || "—"}
          </dd>
        </div>
        {organization.website ? (
          <div className="sm:col-span-2">
            <dt className="text-xs font-medium tracking-wide text-[var(--hc-muted)] uppercase">
              Website
            </dt>
            <dd className="mt-2">
              <a
                href={organization.website}
                target="_blank"
                rel="noopener noreferrer"
                className={entityLinkClassName()}
              >
                {organization.website}
              </a>
            </dd>
          </div>
        ) : null}
      </dl>

      {organization.holdings.length > 0 ? (
        <DetailSection title="Holdings">
          <Table>
            <Table.ScrollContainer>
              <Table.Content aria-label="Organization holdings">
                <Table.Header>
                  <Table.Column isRowHeader>Person</Table.Column>
                  <Table.Column>Stake</Table.Column>
                  <Table.Column>Role</Table.Column>
                  <Table.Column>Ownership</Table.Column>
                </Table.Header>
                <Table.Body>
                  {organization.holdings.map((holding) => (
                    <Table.Row key={holding.id} id={holding.id}>
                      <Table.Cell>
                        <div className="flex flex-col gap-1">
                          <Link
                            href={`/people/${holding.personId}`}
                            className={entityLinkClassName()}
                          >
                            {holding.personName ?? holding.personId}
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

      {organization.relationships.length > 0 ? (
        <DetailSection title="Relationships">
          <Table>
            <Table.ScrollContainer>
              <Table.Content aria-label="Organization relationships">
                <Table.Header>
                  <Table.Column isRowHeader>Type</Table.Column>
                  <Table.Column>From</Table.Column>
                  <Table.Column>To</Table.Column>
                </Table.Header>
                <Table.Body>
                  {organization.relationships.map((relationship) => (
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

      <SourcesList sources={organization.sources} />
    </DetailShell>
  );
}
