import { buttonVariants } from "@heroui/react";
import Link from "next/link";

import { ChampionsDirectory } from "@/components/champions-directory";
import { getChampions } from "@/lib/data";

export default async function Home() {
  const champions = await getChampions();
  const countLabel = champions.length.toLocaleString("en-US");

  return (
    <div className="flex flex-1 flex-col">
      <section className="hc-hero-bg relative flex min-h-[100svh] items-center overflow-hidden text-[var(--hc-mist)]">
        <div className="hc-noise pointer-events-none absolute inset-0" aria-hidden />
        <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-24 sm:px-10">
          <p className="hc-animate-fade font-display text-sm font-medium tracking-[0.28em] text-[var(--hc-gold-soft)] uppercase">
            Curated roster
          </p>
          <h1 className="hc-animate-rise font-display text-5xl leading-[0.95] font-semibold tracking-tight text-white sm:text-7xl md:text-8xl">
            Hidden
            <br />
            Champions
          </h1>
          <p className="hc-animate-rise-delay max-w-xl text-lg leading-relaxed text-[var(--hc-mist)]/85 sm:text-xl">
            A living index of {countLabel} billionaires — their wealth, origins,
            and the quiet power behind global capital.
          </p>
          <div className="hc-animate-rise-delay-2">
            <Link
              href="#directory"
              className={buttonVariants({
                variant: "primary",
                size: "lg",
                className:
                  "bg-[var(--hc-gold)] text-[var(--hc-ink)] hover:bg-[var(--hc-gold-soft)]",
              })}
            >
              Browse the roster
            </Link>
          </div>
        </div>
      </section>

      <section
        id="directory"
        className="mx-auto w-full max-w-6xl scroll-mt-8 px-6 py-16 sm:px-10 sm:py-24"
      >
        <div className="mb-10 max-w-2xl">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-[var(--hc-ink)] sm:text-4xl">
            The roster
          </h2>
          <p className="mt-3 text-[var(--hc-muted)]">
            Search and sort the curated list by rank, net worth, or name.
          </p>
        </div>
        <ChampionsDirectory champions={champions} />
      </section>
    </div>
  );
}
