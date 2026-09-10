import { CalendarCheck, Phone } from "lucide-react";

import { site } from "@/lib/site";

/**
 * Glifo oficial de WhatsApp (lucide-react no incluye iconografía de marcas).
 * Decorativo: la etiqueta de texto adyacente transmite el significado.
 */
export function WhatsappIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

/**
 * MobileStickyBar · Barra inferior fija SOLO móvil (Ley de Fitts: zona del pulgar).
 * Tres acciones de ≥56 px de alto con safe-area para iPhones con notch.
 */
export function MobileStickyBar() {
  return (
    <nav
      aria-label="Acciones rápidas"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 backdrop-blur-lg md:hidden"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-3 pb-[env(safe-area-inset-bottom)]">
        <a
          href={site.phoneHref}
          aria-label="Llamar a LONGIVET"
          className="flex min-h-14 flex-col items-center justify-center gap-1 px-1 text-brand-navy transition-colors hover:bg-primary/5"
        >
          <Phone aria-hidden="true" className="size-5" />
          <span className="text-[11px] font-semibold leading-none">Llamar</span>
        </a>

        <a
          href={site.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Escribir por WhatsApp"
          className="flex min-h-14 flex-col items-center justify-center gap-1 px-1 text-foreground transition-colors hover:bg-brand-emerald/5"
        >
          <WhatsappIcon className="size-5 text-brand-emerald" />
          <span className="text-[11px] font-semibold leading-none">WhatsApp</span>
        </a>

        {/* Acción primaria resaltada: pastilla full-height en teal */}
        <a
          href="#agendar"
          aria-label="Agendar una cita"
          className="m-1.5 flex min-h-14 flex-col items-center justify-center gap-1 rounded-2xl bg-brand-teal-dark px-1 text-white shadow-sm transition-colors hover:bg-brand-teal"
        >
          <CalendarCheck aria-hidden="true" className="size-5" />
          <span className="text-[11px] font-bold leading-none">Agendar</span>
        </a>
      </div>
    </nav>
  );
}
