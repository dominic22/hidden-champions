import { buttonVariants } from "@heroui/react";
import Link from "next/link";
import type { ReactNode } from "react";

type DetailShellProps = {
  backHref: string;
  backLabel: string;
  children: ReactNode;
};

export function DetailShell({
  backHref,
  backLabel,
  children,
}: DetailShellProps) {
  return (
    <div className="flex flex-1 flex-col bg-[var(--hc-paper)]">
      <div className="border-b border-[var(--hc-ink)]/10 bg-[var(--hc-mist)]/60">
        <div className="mx-auto flex w-full max-w-3xl items-center px-6 py-4 sm:px-10">
          <Link
            href={backHref}
            className={buttonVariants({ variant: "ghost", size: "sm" })}
          >
            ← {backLabel}
          </Link>
        </div>
      </div>
      <article className="mx-auto w-full max-w-3xl px-6 py-12 sm:px-10 sm:py-16">
        {children}
      </article>
    </div>
  );
}

type SectionProps = {
  title: string;
  children: ReactNode;
};

export function DetailSection({ title, children }: SectionProps) {
  return (
    <section className="mt-14 border-t border-[var(--hc-ink)]/10 pt-10">
      <h2 className="font-display text-xl font-semibold text-[var(--hc-ink)]">
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export function entityLinkClassName(): string {
  return "font-medium text-[var(--hc-forest)] underline-offset-4 transition-colors hover:text-[var(--hc-gold)] hover:underline";
}
