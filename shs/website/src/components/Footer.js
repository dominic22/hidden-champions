import React from "react";
import { Link } from "@heroui/react";
import { LuHouse } from "react-icons/lu";

const footerLinks = [
  { label: "Leistungen", href: "#leistungen" },
  { label: "Ablauf", href: "#ablauf" },
  { label: "Über uns", href: "#ueber-uns" },
  { label: "FAQ", href: "#faq" },
  { label: "Kontakt", href: "#kontakt" },
];

export default function Footer() {
  return (
    <footer className="border-t border-terracotta-100/70 bg-cream">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-terracotta-500 text-white">
            <LuHouse aria-hidden className="h-5 w-5" />
          </span>
          <span className="font-serif text-lg font-semibold text-terracotta-700">
            SHS – Smart Home Services
          </span>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          {footerLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              size="sm"
              className="text-terracotta-800/80 hover:text-terracotta-500"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="border-t border-terracotta-100/70">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-terracotta-800/60 sm:flex-row sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} SHS – Smart Home Services</p>
          <p>Beratung · Produktauswahl · Integration vor Ort</p>
        </div>
      </div>
    </footer>
  );
}
