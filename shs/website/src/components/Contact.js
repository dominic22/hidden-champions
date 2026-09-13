import React, { useState } from "react";
import {
  Card,
  CardBody,
  Input,
  Textarea,
  Select,
  SelectItem,
  Button,
  Chip,
  Link,
} from "@heroui/react";
import { LuMail, LuArrowRight, LuMapPin } from "react-icons/lu";
import { services } from "../data/services";

const CONTACT_EMAIL = "hallo@shs-smarthome.de";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    model: "",
    message: "",
  });

  const update = (key) => (event) =>
    setForm((prev) => ({ ...prev, [key]: event.target.value }));

  const handleSubmit = (event) => {
    event.preventDefault();
    const subject = encodeURIComponent(
      `Smart-Home-Anfrage${form.model ? ` – Modell ${form.model}` : ""}`
    );
    const body = encodeURIComponent(
      `Name: ${form.name}\nE-Mail: ${form.email}\nModell: ${form.model || "–"}\n\n${form.message}`
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="kontakt" className="scroll-mt-20 py-20 lg:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
        <div>
          <Chip
            variant="flat"
            className="mb-4 bg-terracotta-50 font-medium uppercase tracking-widest text-terracotta-500"
          >
            Kontakt
          </Chip>
          <h2 className="font-serif text-3xl font-semibold text-terracotta-700 text-balance sm:text-4xl">
            Lassen Sie uns über Ihr Zuhause sprechen
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-terracotta-800/80">
            Schreiben Sie uns, was Sie sich wünschen. Das Erstgespräch ist
            kostenlos und unverbindlich – wir melden uns zeitnah bei Ihnen.
          </p>

          <div className="mt-8 flex flex-col gap-4">
            <Link
              href={`mailto:${CONTACT_EMAIL}`}
              className="flex items-center gap-3 text-terracotta-700"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-peach text-terracotta-600">
                <LuMail aria-hidden className="h-5 w-5" />
              </span>
              {CONTACT_EMAIL}
            </Link>
            <div className="flex items-center gap-3 text-terracotta-700">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sage text-terracotta-600">
                <LuMapPin aria-hidden className="h-5 w-5" />
              </span>
              Beratung & Integration vor Ort
            </div>
          </div>
        </div>

        <Card className="border border-terracotta-100/70 bg-white/80" shadow="none">
          <CardBody className="p-6 sm:p-8">
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <Input
                isRequired
                label="Name"
                variant="bordered"
                value={form.name}
                onChange={update("name")}
              />
              <Input
                isRequired
                type="email"
                label="E-Mail"
                variant="bordered"
                value={form.email}
                onChange={update("email")}
              />
              <Select
                label="Interessantes Modell"
                variant="bordered"
                selectedKeys={form.model ? [form.model] : []}
                onChange={update("model")}
              >
                {services.map((service) => (
                  <SelectItem key={service.name}>
                    {`${service.name} – ${service.tagline}`}
                  </SelectItem>
                ))}
              </Select>
              <Textarea
                isRequired
                label="Ihre Nachricht"
                variant="bordered"
                minRows={4}
                value={form.message}
                onChange={update("message")}
              />
              <Button
                type="submit"
                size="lg"
                radius="full"
                endContent={<LuArrowRight aria-hidden />}
                className="bg-terracotta-500 font-medium text-white"
              >
                Anfrage senden
              </Button>
              <p className="text-center text-xs text-terracotta-800/60">
                Öffnet Ihr E-Mail-Programm mit vorausgefüllter Nachricht.
              </p>
            </form>
          </CardBody>
        </Card>
      </div>
    </section>
  );
}
