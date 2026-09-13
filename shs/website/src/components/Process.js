import React from "react";
import { Chip } from "@heroui/react";
import {
  LuPhone,
  LuClipboardList,
  LuWrench,
  LuKeyRound,
} from "react-icons/lu";

const steps = [
  {
    icon: LuPhone,
    title: "Erstgespräch",
    text: "Wir hören zu, verstehen Ihre Wünsche und Ihr Zuhause – kostenlos und unverbindlich.",
  },
  {
    icon: LuClipboardList,
    title: "Produktauswahl",
    text: "Sie erhalten eine passende, herstellerübergreifende Empfehlung ohne Marken-Zwang.",
  },
  {
    icon: LuWrench,
    title: "Integration vor Ort",
    text: "Wir richten alles ein. Die feste 230V-Installation übernimmt eine qualifizierte Elektrofachkraft.",
  },
  {
    icon: LuKeyRound,
    title: "Übergabe",
    text: "Ihr System läuft. Wir zeigen Ihnen alles und stehen für Fragen bereit.",
  },
];

export default function Process() {
  return (
    <section
      id="ablauf"
      className="scroll-mt-20 bg-sand/60 py-20 lg:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Chip
            variant="flat"
            className="mb-4 bg-white/70 font-medium uppercase tracking-widest text-terracotta-500"
          >
            So arbeiten wir
          </Chip>
          <h2 className="font-serif text-3xl font-semibold text-terracotta-700 text-balance sm:text-4xl">
            In vier Schritten zum smarten Zuhause
          </h2>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ icon: Icon, title, text }, index) => (
            <div
              key={title}
              className="relative rounded-3xl bg-white/80 p-6 shadow-sm"
            >
              <span className="absolute right-5 top-5 font-serif text-4xl font-semibold text-terracotta-100">
                {index + 1}
              </span>
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-terracotta-500 text-white">
                <Icon aria-hidden className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-serif text-xl font-semibold text-terracotta-700">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-terracotta-800/80">
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
