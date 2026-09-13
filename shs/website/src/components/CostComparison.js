import React from "react";
import { Chip } from "@heroui/react";
import { LuHouse, LuInfo } from "react-icons/lu";
import {
  referenceScope,
  comparisonSystems,
  comparisonRows,
  comparisonNote,
} from "../data/comparison";

const accentBg = {
  sage: "bg-sage",
  butter: "bg-butter",
  sky: "bg-sky",
  peach: "bg-peach",
};

export default function CostComparison() {
  return (
    <section id="kosten" className="scroll-mt-20 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Chip
            variant="flat"
            className="mb-4 bg-terracotta-50 font-medium uppercase tracking-widest text-terracotta-500"
          >
            Kosten & Vergleich
          </Chip>
          <h2 className="font-serif text-3xl font-semibold text-terracotta-700 text-balance sm:text-4xl">
            Was kostet ein Smart Home für 90 m²?
          </h2>
          <p className="mt-4 text-terracotta-800/80">
            Transparenter Kostenvergleich unserer drei Modelle – und im direkten
            Vergleich zum kabelgebundenen KNX-Bus.
          </p>
        </div>

        {/* Referenzwohnung */}
        <div className="mx-auto mt-10 flex max-w-3xl flex-col items-center gap-3 rounded-3xl border border-terracotta-100/70 bg-white/70 p-6 sm:flex-row sm:gap-6">
          <span className="flex h-12 w-12 flex-none items-center justify-center rounded-2xl bg-terracotta-500 text-white">
            <LuHouse aria-hidden className="h-6 w-6" />
          </span>
          <div className="text-center sm:text-left">
            <p className="font-serif text-lg font-semibold text-terracotta-700">
              Referenzwohnung: 90 m², 4 Zimmer
            </p>
            <p className="mt-1 text-sm text-terracotta-800/70">
              {referenceScope.join(" · ")}
            </p>
          </div>
        </div>

        {/* Vergleichstabelle */}
        <div className="mt-10 overflow-x-auto rounded-3xl border border-terracotta-100/70 bg-white/80 shadow-sm">
          <table className="w-full min-w-[720px] border-collapse text-left text-sm">
            <thead>
              <tr>
                <th className="sticky left-0 z-10 bg-white/95 p-4 align-bottom font-sans text-xs font-medium uppercase tracking-widest text-terracotta-400">
                  Kriterium
                </th>
                {comparisonSystems.map((system) => (
                  <th
                    key={system.id}
                    className={`p-4 align-bottom ${
                      system.highlight ? "bg-terracotta-50/60" : ""
                    }`}
                  >
                    <div className="flex flex-col gap-2">
                      <span
                        className={`flex h-9 w-9 items-center justify-center rounded-xl font-serif text-sm font-semibold text-terracotta-700 ${
                          accentBg[system.accent]
                        }`}
                        aria-hidden
                      >
                        {system.name.charAt(0)}
                      </span>
                      <span className="font-serif text-lg font-semibold text-terracotta-700">
                        {system.name}
                        {system.highlight && (
                          <Chip
                            size="sm"
                            className="ml-2 bg-terracotta-500 text-[10px] font-medium text-white"
                          >
                            Beliebt
                          </Chip>
                        )}
                        {system.reference && (
                          <Chip
                            size="sm"
                            variant="flat"
                            className="ml-2 bg-terracotta-50 text-[10px] font-medium text-terracotta-500"
                          >
                            Referenz
                          </Chip>
                        )}
                      </span>
                      <span className="text-xs font-normal text-terracotta-800/60">
                        {system.tagline}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr
                  key={row.label}
                  className={`border-t border-terracotta-100/70 ${
                    row.highlightRow ? "bg-terracotta-50/40" : ""
                  }`}
                >
                  <th
                    scope="row"
                    className={`sticky left-0 z-10 p-4 align-top font-sans font-medium text-terracotta-700 ${
                      row.highlightRow ? "bg-terracotta-50/95" : "bg-white/95"
                    }`}
                  >
                    {row.label}
                  </th>
                  {row.values.map((value, index) => {
                    const system = comparisonSystems[index];
                    return (
                      <td
                        key={system.id}
                        className={`p-4 align-top text-terracotta-800/90 ${
                          system.highlight && !row.highlightRow
                            ? "bg-terracotta-50/30"
                            : ""
                        } ${
                          row.highlightRow
                            ? "font-serif text-base font-semibold text-terracotta-700"
                            : ""
                        }`}
                      >
                        {value}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Hinweis */}
        <div className="mx-auto mt-6 flex max-w-3xl items-start gap-3 text-xs leading-relaxed text-terracotta-800/60">
          <LuInfo aria-hidden className="mt-0.5 h-4 w-4 flex-none text-terracotta-400" />
          <p>{comparisonNote}</p>
        </div>
      </div>
    </section>
  );
}
