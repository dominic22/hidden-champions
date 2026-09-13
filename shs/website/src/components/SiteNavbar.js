import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Button,
  Link,
} from "@heroui/react";
import { LuHouse } from "react-icons/lu";

const navLinks = [
  { label: "Leistungen", href: "#leistungen" },
  { label: "Kosten", href: "#kosten" },
  { label: "Ablauf", href: "#ablauf" },
  { label: "Über uns", href: "#ueber-uns" },
  { label: "FAQ", href: "#faq" },
];

export default function SiteNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="xl"
      position="sticky"
      classNames={{
        base: "bg-cream/80 backdrop-blur-md border-b border-terracotta-100/60",
        wrapper: "px-4 sm:px-6",
      }}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Menü schließen" : "Menü öffnen"}
          className="sm:hidden text-terracotta-700"
        />
        <NavbarBrand>
          <Link href="#" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-terracotta-500 text-white">
              <LuHouse aria-hidden className="h-5 w-5" />
            </span>
            <span className="font-serif text-xl font-semibold text-terracotta-700">
              SHS
              <span className="ml-1 hidden font-sans text-xs font-medium uppercase tracking-widest text-terracotta-400 sm:inline">
                Smart Home Services
              </span>
            </span>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden gap-8 sm:flex" justify="center">
        {navLinks.map((item) => (
          <NavbarItem key={item.href}>
            <Link
              href={item.href}
              className="text-sm font-medium text-terracotta-800 transition-colors hover:text-terracotta-500"
            >
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <Button
            as={Link}
            href="#kontakt"
            radius="full"
            className="bg-terracotta-500 font-medium text-white shadow-sm shadow-terracotta-500/30"
          >
            Kontakt
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="bg-cream/95 pt-6">
        {navLinks.map((item) => (
          <NavbarMenuItem key={item.href}>
            <Link
              href={item.href}
              size="lg"
              className="w-full text-terracotta-800"
              onPress={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
