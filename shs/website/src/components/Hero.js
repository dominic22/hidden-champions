import React from "react";
import { Button, Link, Chip } from "@heroui/react";
import { LuArrowRight, LuSparkles, LuLightbulb, LuShieldCheck } from "react-icons/lu";

const badges = [
  { icon: LuLightbulb, label: "Beratung" },
  { icon: LuSparkles, label: "Integration vor Ort" },
  { icon: LuShieldCheck, label: "Herstellerübergreifend" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-warm-gradient opacity-70" />
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-peach/60 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 left-1/4 h-72 w-72 rounded-full bg-butter/50 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:py-28">
        <div className="flex flex-col justify-center">
          <Chip
            variant="flat"
            className="mb-6 w-fit bg-white/70 font-medium uppercase tracking-widest text-terracotta-500"
          >
            Smart Home Services
          </Chip>
          <h1 className="font-serif text-4xl font-semibold leading-tight text-terracotta-700 text-balance sm:text-5xl lg:text-6xl">
            Ihr Zuhause,
            <br />
            klug vernetzt.
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-terracotta-800/80">
            Wir beraten Sie bei der Produktauswahl und übernehmen die
            Integration vor Ort – vom unkomplizierten Einstieg bis zur festen
            Elektro-Installation mit Partner-Elektriker.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button
              as={Link}
              href="#leistungen"
              size="lg"
              radius="full"
              endContent={<LuArrowRight aria-hidden />}
              className="bg-terracotta-500 font-medium text-white shadow-lg shadow-terracotta-500/30"
            >
              Service-Modelle ansehen
            </Button>
            <Button
              as={Link}
              href="#kontakt"
              size="lg"
              radius="full"
              variant="bordered"
              className="border-terracotta-300 font-medium text-terracotta-700"
            >
              Kostenlos beraten lassen
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap gap-6">
            {badges.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 text-sm font-medium text-terracotta-700"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/70 text-terracotta-500">
                  <Icon aria-hidden className="h-4 w-4" />
                </span>
                {label}
              </div>
            ))}
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="relative w-full max-w-md rounded-[2rem] bg-white/70 p-6 shadow-2xl shadow-terracotta-500/10 backdrop-blur">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 rounded-3xl bg-sage p-6">
                <p className="font-serif text-lg text-terracotta-800">
                  „Ein System. Eine App. Alle Marken.“
                </p>
              </div>
              <div className="rounded-3xl bg-peach p-6">
                <p className="text-3xl font-semibold text-terracotta-700">3</p>
                <p className="text-sm text-terracotta-800/80">Service-Modelle</p>
              </div>
              <div className="rounded-3xl bg-butter p-6">
                <p className="text-3xl font-semibold text-terracotta-700">1:1</p>
                <p className="text-sm text-terracotta-800/80">
                  Beratung & Übergabe
                </p>
              </div>
              <div className="col-span-2 rounded-3xl bg-sky p-6">
                <p className="text-sm text-terracotta-800/80">
                  Zigbee · Matter · Homematic IP · Shelly · Philips Hue
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
