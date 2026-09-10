"use client";

/* ─────────────────────────────────────────────────────────────
   LONGIVET · Badge «Abierto ahora / Cerrado» en vivo
   ─────────────────────────────────────────────────────────────
   Hidratación segura: el render inicial (servidor y primer frame del
   cliente) es un esqueleto neutro; el estado real se calcula SOLO en
   el cliente dentro de useEffect y se refresca cada 60 s.
   Accesibilidad: role="status" + aria-live="polite" anuncian los
   cambios (p. ej. abierto → cerrado) a lectores de pantalla.
   ───────────────────────────────────────────────────────────── */

import { useEffect, useState } from "react";

import { estadoHorario, type EstadoHorario } from "@/lib/horario";
import { cn } from "@/lib/utils";

const REFRESCO_MS = 60_000;

export function OpenNowBadge({ className }: { className?: string }) {
  const [estado, setEstado] = useState<EstadoHorario | null>(null);

  useEffect(() => {
    const actualizar = () => setEstado(estadoHorario(new Date()));
    actualizar();
    const intervalo = setInterval(actualizar, REFRESCO_MS);
    return () => clearInterval(intervalo);
  }, []);

  /* Esqueleto neutro del mismo tamaño: evita salto de layout y cualquier
     desajuste de hidratación (el estado depende del reloj del equipo). */
  if (!estado) {
    return (
      <span
        aria-hidden="true"
        className={cn(
          "inline-flex h-8 items-center gap-2 rounded-full border border-border bg-muted/50 px-3",
          className,
        )}
      >
        <span className="size-2 animate-pulse rounded-full bg-muted-foreground/50" />
        <span className="h-2 w-24 animate-pulse rounded-full bg-muted-foreground/50" />
      </span>
    );
  }

  const { modo, etiqueta, detalle } = estado;

  return (
    <span
      role="status"
      aria-live="polite"
      title={detalle}
      className={cn(
        "inline-flex h-8 max-w-full items-center gap-2 rounded-full border px-3 text-xs font-semibold text-foreground",
        modo === "abierto" && "border-brand-emerald/40 bg-brand-emerald/10",
        modo === "guardia" && "border-brand-gold/60 bg-brand-gold/15",
        modo === "cerrado" && "border-destructive/30 bg-destructive/5",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "size-2 shrink-0 rounded-full",
          modo === "abierto" && "animate-pulse bg-brand-emerald",
          modo === "guardia" && "bg-brand-gold",
          modo === "cerrado" && "bg-destructive/70",
        )}
      />
      <span className="truncate">{etiqueta}</span>
      <span className="sr-only">. {detalle}</span>
    </span>
  );
}
