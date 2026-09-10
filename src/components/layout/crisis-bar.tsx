import { PhoneCall } from "lucide-react";

import { site } from "@/lib/site";

/**
 * CrisisBar · Cintillo superior de urgencias 24/7.
 * NO es sticky: fluye con la página. El número crítico va en pastilla blanca
 * con texto brand-coral-dark para garantizar contraste AA sobre el coral.
 * El pulso (animate-ping) está limitado a un puntito decorativo; la media
 * query prefers-reduced-motion de globals.css lo neutraliza.
 */
export function CrisisBar() {
  return (
    <div
      role="region"
      aria-label="Aviso de urgencias"
      className="bg-brand-coral text-white"
    >
      <div className="mx-auto flex min-h-10 max-w-7xl flex-wrap items-center justify-center gap-x-2.5 gap-y-1 px-4 py-1.5 sm:px-6 lg:px-8">
        {/* Puntito con pulso sutil (único elemento animado del cintillo) */}
        <span aria-hidden="true" className="relative flex size-2.5 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/60" />
          <span className="relative inline-flex size-2.5 rounded-full bg-white" />
        </span>

        <PhoneCall aria-hidden="true" className="size-4 shrink-0" />

        <p className="text-sm font-semibold leading-tight">
          Urgencias 24/7:{" "}
          <span className="hidden sm:inline">
            si tu mascota presenta un riesgo vital, llámanos ahora.
          </span>
        </p>

        <a
          href={site.emergencyPhoneHref}
          aria-label="Llamar a urgencias veterinarias"
          className="-my-3 inline-flex items-center rounded-full bg-white px-3 py-2.5 text-sm font-extrabold tracking-tight text-brand-coral-dark shadow-sm transition-colors hover:bg-brand-sand"
        >
          {site.emergencyPhone}
        </a>
      </div>
    </div>
  );
}
