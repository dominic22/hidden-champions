export function formatNetWorth(usd: number | null | undefined): string {
  if (usd == null || Number.isNaN(usd)) return "—";
  const billions = usd / 1_000_000_000;
  if (billions >= 100) return `$${billions.toFixed(0)}B`;
  if (billions >= 10) return `$${billions.toFixed(1)}B`;
  if (billions >= 1) return `$${billions.toFixed(2)}B`;
  const millions = usd / 1_000_000;
  return `$${millions.toFixed(0)}M`;
}

export function formatRank(rank: number | null | undefined): string {
  if (rank == null) return "—";
  return `#${rank.toLocaleString("en-US")}`;
}

export function formatWealthSource(source: string): string {
  return source.replaceAll("_", " ");
}

export function formatCitizenship(codes: string[]): string {
  if (codes.length === 0) return "—";
  return codes.join(", ");
}
