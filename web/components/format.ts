export function formatNetWorth(usd: number | null | undefined): string {
  if (usd == null || Number.isNaN(usd)) return "—";
  const billions = usd / 1_000_000_000;
  if (billions >= 100) return `$${billions.toFixed(0)}B`;
  if (billions >= 10) return `$${billions.toFixed(1)}B`;
  if (billions >= 1) return `$${billions.toFixed(2)}B`;
  const millions = usd / 1_000_000;
  if (millions >= 1) return `$${millions.toFixed(0)}M`;
  return `$${usd.toLocaleString("en-US")}`;
}

export function formatUsd(usd: number | null | undefined): string {
  if (usd == null || Number.isNaN(usd)) return "—";
  return `$${usd.toLocaleString("en-US")}`;
}

export function formatRank(rank: number | null | undefined): string {
  if (rank == null) return "—";
  return `#${rank.toLocaleString("en-US")}`;
}

export function formatLabel(value: string): string {
  return value.replaceAll("_", " ");
}

export function formatWealthSource(source: string): string {
  return formatLabel(source);
}

export function formatAssetCategory(category: string): string {
  return formatLabel(category);
}

export function formatStakeType(stakeType: string): string {
  return formatLabel(stakeType);
}

export function formatHoldingRole(role: string | null | undefined): string {
  if (!role) return "—";
  return formatLabel(role);
}

export function formatRelationshipType(type: string): string {
  return formatLabel(type);
}

export function formatOrganizationType(type: string): string {
  return formatLabel(type);
}

export function formatCitizenship(codes: string[]): string {
  if (codes.length === 0) return "—";
  return codes.join(", ");
}

export function formatLocation(location: {
  label?: string;
  city?: string;
  region?: string;
  country?: string;
} | null | undefined): string {
  if (!location) return "—";
  if (location.label) return location.label;
  const parts = [location.city, location.region, location.country].filter(
    Boolean,
  );
  return parts.length > 0 ? parts.join(", ") : "—";
}

export function formatPercent(value: number | null | undefined): string {
  if (value == null || Number.isNaN(value)) return "—";
  return `${value}%`;
}
