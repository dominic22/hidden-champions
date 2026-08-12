"use client";

import {
  Chip,
  Label,
  ListBox,
  Pagination,
  SearchField,
  Select,
  Table,
} from "@heroui/react";
import Link from "next/link";
import { useMemo, useState } from "react";

import type { ChampionSummary } from "@/lib/data";
import {
  formatCitizenship,
  formatNetWorth,
  formatRank,
  formatWealthSource,
} from "@/components/format";

const PAGE_SIZE = 25;

type SortKey = "rank" | "netWorth" | "name";

type ChampionsDirectoryProps = {
  champions: ChampionSummary[];
};

function pageWindow(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages = new Set<number>();
  pages.add(1);
  pages.add(total);
  for (let p = current - 1; p <= current + 1; p++) {
    if (p >= 1 && p <= total) pages.add(p);
  }

  const sorted = [...pages].sort((a, b) => a - b);
  const result: (number | "ellipsis")[] = [];
  for (let i = 0; i < sorted.length; i++) {
    const page = sorted[i]!;
    const prev = sorted[i - 1];
    if (prev != null && page - prev > 1) result.push("ellipsis");
    result.push(page);
  }
  return result;
}

export function ChampionsDirectory({ champions }: ChampionsDirectoryProps) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("rank");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = q
      ? champions.filter((c) => c.name.toLowerCase().includes(q))
      : champions;

    const sorted = [...list];
    sorted.sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name);
      if (sort === "netWorth") {
        const aw = a.netWorthUsd ?? -1;
        const bw = b.netWorthUsd ?? -1;
        return bw - aw;
      }
      const ar = a.rank ?? Number.POSITIVE_INFINITY;
      const br = b.rank ?? Number.POSITIVE_INFINITY;
      if (ar !== br) return ar - br;
      return a.name.localeCompare(b.name);
    });
    return sorted;
  }, [champions, query, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const startIndex = (safePage - 1) * PAGE_SIZE;
  const pageItems = filtered.slice(startIndex, startIndex + PAGE_SIZE);
  const rangeStart = filtered.length === 0 ? 0 : startIndex + 1;
  const rangeEnd = Math.min(startIndex + PAGE_SIZE, filtered.length);
  const pages = pageWindow(safePage, totalPages);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <SearchField
          className="w-full sm:max-w-sm"
          value={query}
          onChange={(value) => {
            setQuery(value);
            setPage(1);
          }}
          aria-label="Search champions"
        >
          <Label className="sr-only">Search champions</Label>
          <SearchField.Group>
            <SearchField.SearchIcon />
            <SearchField.Input placeholder="Search by name…" />
            <SearchField.ClearButton />
          </SearchField.Group>
        </SearchField>

        <Select
          className="w-full sm:w-56"
          selectedKey={sort}
          onSelectionChange={(key) => {
            if (key == null) return;
            setSort(String(key) as SortKey);
            setPage(1);
          }}
          aria-label="Sort champions"
        >
          <Label className="sr-only">Sort by</Label>
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              <ListBox.Item id="rank" textValue="Rank">
                Rank
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="netWorth" textValue="Net worth">
                Net worth
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="name" textValue="Name">
                Name
                <ListBox.ItemIndicator />
              </ListBox.Item>
            </ListBox>
          </Select.Popover>
        </Select>
      </div>

      <Table>
        <Table.ScrollContainer>
          <Table.Content
            aria-label="Hidden champions directory"
            className="min-w-[720px]"
          >
            <Table.Header>
              <Table.Column>Rank</Table.Column>
              <Table.Column isRowHeader>Name</Table.Column>
              <Table.Column>Net worth</Table.Column>
              <Table.Column>Wealth source</Table.Column>
              <Table.Column>Citizenship</Table.Column>
            </Table.Header>
            <Table.Body>
              {pageItems.length === 0 ? (
                <Table.Row id="empty">
                  <Table.Cell>—</Table.Cell>
                  <Table.Cell>No champions match your search.</Table.Cell>
                  <Table.Cell>—</Table.Cell>
                  <Table.Cell>—</Table.Cell>
                  <Table.Cell>—</Table.Cell>
                </Table.Row>
              ) : (
                pageItems.map((champion) => (
                  <Table.Row key={champion.id} id={champion.id}>
                    <Table.Cell className="tabular-nums text-[var(--hc-muted)]">
                      {formatRank(champion.rank)}
                    </Table.Cell>
                    <Table.Cell>
                      <Link
                        href={`/people/${champion.id}`}
                        className="font-medium text-[var(--hc-ink)] underline-offset-4 transition-colors hover:text-[var(--hc-gold)] hover:underline"
                      >
                        {champion.name}
                      </Link>
                    </Table.Cell>
                    <Table.Cell className="tabular-nums font-medium">
                      {formatNetWorth(champion.netWorthUsd)}
                    </Table.Cell>
                    <Table.Cell>
                      <Chip size="sm" variant="soft">
                        <Chip.Label>
                          {formatWealthSource(champion.primaryWealthSource)}
                        </Chip.Label>
                      </Chip>
                    </Table.Cell>
                    <Table.Cell className="text-[var(--hc-muted)]">
                      {formatCitizenship(champion.citizenship)}
                    </Table.Cell>
                  </Table.Row>
                ))
              )}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
        <Table.Footer>
          <Pagination size="sm" className="w-full flex-wrap justify-between gap-3">
            <Pagination.Summary>
              {rangeStart} to {rangeEnd} of {filtered.length.toLocaleString("en-US")}{" "}
              champions
            </Pagination.Summary>
            <Pagination.Content>
              <Pagination.Item>
                <Pagination.Previous
                  isDisabled={safePage === 1}
                  onPress={() => setPage((p) => Math.max(1, p - 1))}
                >
                  <Pagination.PreviousIcon />
                  Prev
                </Pagination.Previous>
              </Pagination.Item>
              {pages.map((p, index) =>
                p === "ellipsis" ? (
                  <Pagination.Item key={`e-${index}`}>
                    <Pagination.Ellipsis />
                  </Pagination.Item>
                ) : (
                  <Pagination.Item key={p}>
                    <Pagination.Link
                      isActive={p === safePage}
                      onPress={() => setPage(p)}
                    >
                      {p}
                    </Pagination.Link>
                  </Pagination.Item>
                ),
              )}
              <Pagination.Item>
                <Pagination.Next
                  isDisabled={safePage === totalPages}
                  onPress={() => setPage((p) => Math.min(totalPages, p + 1))}
                >
                  Next
                  <Pagination.NextIcon />
                </Pagination.Next>
              </Pagination.Item>
            </Pagination.Content>
          </Pagination>
        </Table.Footer>
      </Table>
    </div>
  );
}
