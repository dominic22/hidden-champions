import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Chip,
  Link,
  Divider,
} from "@heroui/react";
import { LuArrowRight, LuBox } from "react-icons/lu";
import { services } from "../data/services";

const accentBg = {
  sage: "bg-sage",
  butter: "bg-butter",
  sky: "bg-sky",
};

export default function Services() {
  return (
    <section id="leistungen" className="scroll-mt-20 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Chip
            variant="flat"
            className="mb-4 bg-terracotta-50 font-medium uppercase tracking-widest text-terracotta-500"
          >
            Unsere Leistungen
          </Chip>
          <h2 className="font-serif text-3xl font-semibold text-terracotta-700 text-balance sm:text-4xl">
            Drei Modelle – für jeden Anspruch das Richtige
          </h2>
          <p className="mt-4 text-terracotta-800/80">
            Ob unkomplizierter Einstieg, flexible Zentrale oder feste
            Installation: Wir finden die passende Lösung für Ihr Zuhause.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {services.map((service) => (
            <Card
              key={service.id}
              className={`relative overflow-visible border border-terracotta-100/70 bg-white/80 p-2 shadow-sm transition-transform hover:-translate-y-1 ${
                service.highlight ? "ring-2 ring-terracotta-400" : ""
              }`}
              shadow="none"
            >
              {service.highlight && (
                <Chip
                  size="sm"
                  className="absolute -top-3 left-1/2 -translate-x-1/2 bg-terracotta-500 font-medium text-white"
                >
                  Empfehlung
                </Chip>
              )}
              <CardHeader className="flex flex-col items-start gap-3 pb-0">
                <div className="flex w-full items-center justify-between">
                  <span
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl text-terracotta-700 shadow-inner ${
                      accentBg[service.accent]
                    }`}
                  >
                    <service.icon aria-hidden className="h-7 w-7" />
                  </span>
                  <span className="text-xs font-medium uppercase tracking-widest text-terracotta-400">
                    Modell {service.tier}
                  </span>
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-semibold text-terracotta-700">
                    {service.name}
                  </h3>
                  <p className="text-sm font-medium text-terracotta-500">
                    {service.tagline}
                  </p>
                </div>
              </CardHeader>

              <CardBody className="gap-5">
                <p className="text-sm leading-relaxed text-terracotta-800/80">
                  {service.intro}
                </p>

                <div className="flex flex-wrap gap-2">
                  {service.products.map((product) => (
                    <Chip
                      key={product}
                      size="sm"
                      variant="flat"
                      startContent={
                        <LuBox aria-hidden className="h-3.5 w-3.5" />
                      }
                      className="bg-terracotta-50 text-terracotta-700"
                    >
                      {product}
                    </Chip>
                  ))}
                </div>

                <Divider className="bg-terracotta-100/70" />

                <ul className="flex flex-col gap-3">
                  {service.features.map((feature) => (
                    <li
                      key={feature.text}
                      className="flex items-start gap-3 text-sm text-terracotta-800/90"
                    >
                      <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-lg bg-terracotta-100 text-terracotta-600">
                        <feature.icon aria-hidden className="h-3.5 w-3.5" />
                      </span>
                      {feature.text}
                    </li>
                  ))}
                </ul>
              </CardBody>

              <CardFooter>
                <Button
                  as={Link}
                  href="#kontakt"
                  fullWidth
                  radius="full"
                  endContent={<LuArrowRight aria-hidden />}
                  className={
                    service.highlight
                      ? "bg-terracotta-500 font-medium text-white"
                      : "bg-terracotta-50 font-medium text-terracotta-700"
                  }
                >
                  {service.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
