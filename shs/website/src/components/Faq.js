import React from "react";
import { Accordion, AccordionItem, Chip } from "@heroui/react";

const faqs = [
  {
    q: "Brauche ich für den Einstieg einen Elektriker?",
    a: "Nein. Das Basic-Modell mit Philips Hue oder IKEA DIRIGERA ist Plug & Play und ohne Elektriker sofort betriebsbereit. Einen Elektriker benötigen Sie erst beim Pro-Modell mit fester 230V-Installation.",
  },
  {
    q: "Bin ich an eine bestimmte Marke gebunden?",
    a: "Nein. Besonders beim Advanced-Modell verknüpfen wir verschiedene Marken (Zigbee/Matter) in einer App – ganz ohne teure Hersteller-Zentrale. Wir beraten herstellerübergreifend.",
  },
  {
    q: "Was kostet der Support beim Basic-Modell?",
    a: "Für das Basic-Modell bieten wir einen kostenlosen E-Mail-Support an. So kommen Sie auch ohne Vor-Ort-Termin gut zurecht.",
  },
  {
    q: "Wer übernimmt die Installation an der 230V-Netzspannung?",
    a: "Beim Pro-Modell wird die fachgerechte Montage und der Anschluss an das Stromnetz von einer qualifizierten Elektrofachkraft ausgeführt. Wir richten das System anschließend ein und übergeben es Ihnen.",
  },
  {
    q: "Läuft mein Smart Home auch ohne Cloud?",
    a: "Ja. Mit einer lokalen Zentrale wie Home Assistant oder Homey Pro läuft Ihr System weitgehend lokal – das ist gut für Datenschutz und Zuverlässigkeit.",
  },
];

export default function Faq() {
  return (
    <section id="faq" className="scroll-mt-20 bg-sand/60 py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="text-center">
          <Chip
            variant="flat"
            className="mb-4 bg-white/70 font-medium uppercase tracking-widest text-terracotta-500"
          >
            Häufige Fragen
          </Chip>
          <h2 className="font-serif text-3xl font-semibold text-terracotta-700 text-balance sm:text-4xl">
            Gut zu wissen
          </h2>
        </div>

        <Accordion
          variant="splitted"
          className="mt-12 px-0"
          itemClasses={{
            base: "bg-white/80 shadow-none border border-terracotta-100/70",
            title: "font-serif text-terracotta-700 text-lg",
            content: "text-terracotta-800/80 text-sm leading-relaxed pb-4",
            trigger: "py-4",
          }}
        >
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              aria-label={faq.q}
              title={faq.q}
            >
              {faq.a}
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
