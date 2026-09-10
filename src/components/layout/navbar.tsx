"use client";

import { useEffect, useState } from "react";
import { CalendarCheck, ChevronRight, Menu, Phone } from "lucide-react";

import { Logo } from "@/components/brand/logo";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navLinks, site } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Navbar · Sticky top-0 z-50.
 * - Transparente en reposo; con scroll >8 px gana fondo blur + borde + sombra
 *   (listener pasivo con requestAnimationFrame, limpieza en el return del efecto).
 * - aria-current resalta la sección visible (IntersectionObserver,
 *   rootMargin "-40% 0px -55% 0px").
 * - En móvil abre un Sheet (shadcn/ui) lado derecho; se cierra al elegir enlace.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>(navLinks[0].href);

  /* Fondo/sombra al hacer scroll (>8 px), throttled con rAF */
  useEffect(() => {
    let rafId = 0;
    const update = () => setScrolled(window.scrollY > 8);
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  /* Sección visible → aria-current */
  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.href.slice(1)))
      .filter((section): section is HTMLElement => section !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-[background-color,border-color,box-shadow] duration-300",
        scrolled
          ? "border-b border-border bg-background/85 shadow-sm backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <a
          href="#inicio"
          aria-label="LONGIVET — ir al inicio"
          className="-m-2 inline-flex rounded-2xl p-2"
        >
          <Logo tone="dark" />
        </a>

        {/* Navegación desktop: píldoras con smooth-scroll (CSS scroll-behavior) */}
        <nav aria-label="Navegación principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={active === link.href ? "true" : undefined}
                  className={cn(
                    "inline-flex h-11 items-center rounded-full px-4 text-sm font-semibold transition-colors",
                    active === link.href
                      ? "bg-primary/10 text-primary"
                      : "text-foreground/75 hover:bg-primary/5 hover:text-primary"
                  )}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* CTA desktop + toggle de tema */}
        <div className="hidden items-center gap-2 lg:flex">
          <ThemeToggle />
          <a
            href="#agendar"
            className="inline-flex h-11 items-center gap-2 rounded-full bg-brand-teal-dark px-5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-brand-teal"
          >
            <CalendarCheck aria-hidden="true" className="size-5" />
            Agendar cita
          </a>
        </div>

        {/* Menú móvil (Sheet lado derecho) */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button
              type="button"
              aria-label="Abrir menú de navegación"
              aria-expanded={open}
              aria-controls="menu-movil"
              className="inline-flex size-12 items-center justify-center rounded-full text-brand-navy transition-colors hover:bg-primary/10 lg:hidden"
            >
              <Menu aria-hidden="true" className="size-6" />
            </button>
          </SheetTrigger>

          <SheetContent
            id="menu-movil"
            side="right"
            className="flex w-[min(20rem,88vw)] flex-col gap-0 p-0"
          >
            <SheetTitle className="sr-only">Menú de navegación</SheetTitle>
            <SheetDescription className="sr-only">
              Secciones del sitio y contactos rápidos de LONGIVET.
            </SheetDescription>

            <div className="flex h-16 items-center border-b border-border px-5">
              <SheetClose asChild>
                <a
                  href="#inicio"
                  aria-label="LONGIVET — ir al inicio"
                  className="-m-2 inline-flex rounded-2xl p-2"
                >
                  <Logo tone="dark" />
                </a>
              </SheetClose>
            </div>

            <nav
              aria-label="Navegación móvil"
              className="flex-1 overflow-y-auto px-3 py-3"
            >
              <ul className="divide-y divide-border">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <SheetClose asChild>
                      <a
                        href={link.href}
                        aria-current={active === link.href ? "true" : undefined}
                        className="flex h-12 items-center justify-between rounded-xl px-3 text-lg font-semibold text-foreground transition-colors hover:bg-primary/5 hover:text-primary"
                      >
                        {link.label}
                        <ChevronRight
                          aria-hidden="true"
                          className="size-5 text-muted-foreground"
                        />
                      </a>
                    </SheetClose>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="space-y-3 border-t border-border p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
              <div className="flex items-center justify-between rounded-2xl border border-border px-4 py-2">
                <span className="text-sm font-semibold text-foreground">
                  Apariencia del sitio
                </span>
                <ThemeToggle />
              </div>
              <SheetClose asChild>
                <a
                  href="#agendar"
                  className="flex h-12 items-center justify-center gap-2 rounded-full bg-brand-teal-dark text-base font-bold text-white transition-colors hover:bg-brand-teal"
                >
                  <CalendarCheck aria-hidden="true" className="size-5" />
                  Agendar cita
                </a>
              </SheetClose>
              <SheetClose asChild>
                <a
                  href={site.emergencyPhoneHref}
                  aria-label="Llamar a urgencias veterinarias 24/7"
                  className="flex h-12 items-center justify-center gap-2 rounded-full border-2 border-brand-coral/70 text-base font-bold text-brand-coral-dark transition-colors hover:border-brand-coral-dark hover:bg-brand-coral-dark hover:text-white"
                >
                  <Phone aria-hidden="true" className="size-5" />
                  Llamar urgencias 24/7
                </a>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
