import React from "react";
import { Chip } from "@heroui/react";
import { LuHeart, LuUsers, LuShieldCheck } from "react-icons/lu";

const values = [
  {
    icon: LuHeart,
    title: "Aus Leidenschaft",
    text: "Smart Home ist für uns kein Selbstzweck, sondern soll Ihren Alltag spürbar einfacher machen.",
  },
  {
    icon: LuUsers,
    title: "Unabhängig beraten",
    text: "Wir sind keinem Hersteller verpflichtet und empfehlen genau das, was zu Ihnen passt.",
  },
  {
    icon: LuShieldCheck,
    title: "Fachgerecht & sicher",
    text: "Die feste 230V-Installation wird ausschließlich von einer qualifizierten Elektrofachkraft ausgeführt.",
  },
];

export default function About() {
  return (
    <section id="ueber-uns" className="scroll-mt-20 py-20 lg:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
        <div>
          <Chip
            variant="flat"
            className="mb-4 bg-terracotta-50 font-medium uppercase tracking-widest text-terracotta-500"
          >
            Wer wir sind
          </Chip>
          <h2 className="font-serif text-3xl font-semibold text-terracotta-700 text-balance sm:text-4xl">
            Ein Team, das Technik verständlich macht
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-terracotta-800/80">
            Wir verbinden die Freude an smarter Technik mit ehrlicher Beratung.
            Statt Sie mit Fachbegriffen allein zu lassen, übersetzen wir Ihre
            Wünsche in ein System, das einfach funktioniert – und Ihnen
            gehört.
          </p>
          <p className="mt-4 leading-relaxed text-terracotta-800/70">
            Vom ersten Gespräch bis zur Übergabe sind wir Ihr Ansprechpartner.
            Danach bleiben wir für Fragen erreichbar.
          </p>
        </div>

        <div className="grid gap-4">
          {values.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="flex gap-4 rounded-3xl border border-terracotta-100/70 bg-white/70 p-6"
            >
              <span className="flex h-12 w-12 flex-none items-center justify-center rounded-2xl bg-peach text-terracotta-600">
                <Icon aria-hidden className="h-6 w-6" />
              </span>
              <div>
                <h3 className="font-serif text-lg font-semibold text-terracotta-700">
                  {title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-terracotta-800/80">
                  {text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
