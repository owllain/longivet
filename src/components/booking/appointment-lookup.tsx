"use client";

/* ─────────────────────────────────────────────────────────────
   LONGIVET · Panel «Consultar mi cita»
   Consulta y cancelación de una reserva mediante el código
   LV-XXXXXX (modelo boarding pass). Conecta con:
     GET   /api/appointments/[code]
     PATCH /api/appointments/[code]  { action: "cancelar" }
   Diseño: ticket con perforaciones + marca de agua de pata.
   ───────────────────────────────────────────────────────────── */

import { useCallback, useId, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import {
  CalendarDays,
  Clock3,
  Loader2,
  PawPrint,
  Search,
  Stethoscope,
  Ticket,
  UserRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { formatFechaLarga, services, vets } from "@/lib/booking";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/* ── Tipos ── */

interface CitaPublica {
  code: string;
  petName: string;
  species: string;
  service: string;
  preferredVet: string | null;
  date: string;
  timeSlot: string;
  tutorName: string;
  status: string;
  emailMasked: string;
  phoneMasked: string;
}

type EstadoConsulta =
  | { fase: "inicial" }
  | { fase: "cargando" }
  | { fase: "no-encontrada"; mensaje: string }
  | { fase: "encontrada"; cita: CitaPublica };

/* ── Helpers ── */

/* El input solo guarda el cuerpo del código (6 caracteres); el prefijo
   «LV-» es un adorno fijo. Si el usuario pega el código completo
   (LV-DRKVOC), se detecta por longitud (>6 tras limpiar) y se le quita
   el prefijo para no duplicarlo. */
function limpiarCuerpo(entrada: string): string {
  const alfanumerico = entrada.toUpperCase().replace(/[^A-Z0-9]/g, "");
  const sinPrefijo =
    alfanumerico.length > 6 && alfanumerico.startsWith("LV") ? alfanumerico.slice(2) : alfanumerico;
  return sinPrefijo.slice(0, 6);
}

const ETIQUETA_ESTADO: Record<string, { texto: string; clases: string }> = {
  CONFIRMADA: {
    texto: "Cita confirmada",
    clases: "bg-brand-emerald/15 text-brand-emerald ring-1 ring-inset ring-brand-emerald/40",
  },
  CANCELADA: {
    texto: "Cita cancelada",
    clases: "bg-muted text-muted-foreground ring-1 ring-inset ring-border",
  },
  ATENDIDA: {
    texto: "Cita atendida",
    clases: "bg-brand-navy/10 text-brand-navy ring-1 ring-inset ring-brand-navy/30 dark:bg-white/10 dark:text-brand-teal-soft dark:ring-white/25",
  },
};

/* ── Componente principal ── */

export function AppointmentLookup() {
  const [cuerpo, setCuerpo] = useState("");
  const [estado, setEstado] = useState<EstadoConsulta>({ fase: "inicial" });
  const [consultando, setConsultando] = useState(false);
  const [cancelando, setCancelando] = useState(false);
  const [dialogoCancelar, setDialogoCancelar] = useState(false);
  const [errorCancelar, setErrorCancelar] = useState<string | null>(null);
  const inputId = useId();
  const estadoCita = estado.fase === "encontrada" ? (ETIQUETA_ESTADO[estado.cita.status] ?? null) : null;
  const cancelable = estado.fase === "encontrada" && estado.cita.status === "CONFIRMADA";

  const codigo = `LV-${cuerpo}`;
  const codigoValido = /^[A-Z2-9]{6}$/.test(cuerpo);

  const consultar = useCallback(
    async (codigoAConsultar: string) => {
      if (!/^LV-[A-Z2-9]{6}$/.test(codigoAConsultar)) {
        setEstado({ fase: "no-encontrada", mensaje: "Escribe tu código completo con el formato LV-XXXXXX." });
        return;
      }

      setConsultando(true);
      setErrorCancelar(null);
      try {
        const res = await fetch(`/api/appointments/${encodeURIComponent(codigoAConsultar)}`, { cache: "no-store" });
        const json = (await res.json().catch(() => null)) as
          | { ok?: boolean; appointment?: CitaPublica; error?: string }
          | null;

        if (res.ok && json?.ok && json.appointment) {
          setEstado({ fase: "encontrada", cita: json.appointment });
        } else {
          setEstado({ fase: "no-encontrada", mensaje: json?.error ?? "No encontramos una cita con ese código." });
        }
      } catch {
        setEstado({
          fase: "no-encontrada",
          mensaje: "Tuvimos un problema de conexión. Verifica tu internet e intenta de nuevo.",
        });
      } finally {
        setConsultando(false);
      }
    },
    [],
  );

  const enviarConsulta = (evento: FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    void consultar(codigo);
  };

  const cancelarCita = async () => {
    if (estado.fase !== "encontrada") return;
    setCancelando(true);
    setErrorCancelar(null);
    try {
      const res = await fetch(`/api/appointments/${encodeURIComponent(estado.cita.code)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "cancelar" }),
      });
      const json = (await res.json().catch(() => null)) as
        | { ok?: boolean; appointment?: CitaPublica; error?: string }
        | null;

      if (res.ok && json?.ok && json.appointment) {
        setEstado({ fase: "encontrada", cita: json.appointment });
        toast.success("Tu cita fue cancelada. La franja queda libre para otros pacientes.", {
          description: "Si te arrepientes, agenda de nuevo cuando quieras: no hay penalidad.",
        });
      } else {
        const mensaje = json?.error ?? "No pudimos cancelar tu cita. Llámanos y lo hacemos por teléfono.";
        setErrorCancelar(mensaje);
        toast.error(mensaje);
      }
    } catch {
      const mensaje = "Tuvimos un problema de conexión al cancelar. Intenta de nuevo o llámanos.";
      setErrorCancelar(mensaje);
      toast.error(mensaje);
    } finally {
      setCancelando(false);
      setDialogoCancelar(false);
    }
  };

  return (
    <section
      aria-labelledby="titulo-consultar-cita"
      className="mt-10 rounded-3xl border border-border bg-card p-6 shadow-sm md:p-8"
    >
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 id="titulo-consultar-cita" className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-foreground">
            <Ticket className="h-5 w-5 text-brand-teal-dark" aria-hidden="true" />
            ¿Ya tienes una cita?
          </h3>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Consulta los detalles con tu código de confirmación y cancela aquí si lo necesitas.
          </p>
        </div>
      </div>

      <form onSubmit={enviarConsulta} className="mt-5 flex flex-col gap-2 sm:flex-row" noValidate>
        <div className="flex-1">
          <label htmlFor={inputId} className="sr-only">
            Código de confirmación de la cita (los 6 caracteres después de LV-)
          </label>
          <div
            className={cn(
              "flex h-11 items-center overflow-hidden rounded-xl border-2 border-input bg-transparent shadow-xs transition-colors focus-within:border-brand-teal-dark focus-within:ring-3 focus-within:ring-brand-teal-dark/30",
              estado.fase === "no-encontrada" && "border-destructive/60 focus-within:border-destructive focus-within:ring-destructive/30",
            )}
          >
            <span
              aria-hidden="true"
              className="flex h-full items-center border-r border-dashed border-border bg-muted px-3 font-mono text-base font-bold tracking-widest text-muted-foreground"
            >
              LV-
            </span>
            <Input
              id={inputId}
              value={cuerpo}
              onChange={(evento) => setCuerpo(limpiarCuerpo(evento.target.value))}
              placeholder="XXXXXX"
              inputMode="text"
              autoCapitalize="characters"
              autoComplete="off"
              spellCheck={false}
              maxLength={6}
              aria-describedby={`${inputId}-ayuda`}
              aria-invalid={estado.fase === "no-encontrada" || undefined}
              className="h-full flex-1 rounded-none border-0 bg-transparent font-mono text-base font-bold tracking-[0.3em] uppercase shadow-none focus-visible:border-0 focus-visible:ring-0 dark:bg-transparent"
            />
          </div>
        </div>
        <Button
          type="submit"
          disabled={consultando || !codigoValido}
          className="h-11 rounded-xl bg-brand-teal-dark px-6 font-bold text-white hover:bg-brand-teal"
        >
          {consultando ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            <Search className="h-4 w-4" aria-hidden="true" />
          )}
          {consultando ? "Buscando…" : "Consultar"}
        </Button>
      </form>
      <p id={`${inputId}-ayuda`} className="mt-2 text-xs text-muted-foreground">
        Escribe los 6 caracteres después de «LV-». Te lo dimos al confirmar la reserva y también aparece en tu
        pantalla de confirmación (puedes pegarlo completo, con o sin prefijo).
      </p>

      <div aria-live="polite" className="mt-4">
        <AnimatePresence mode="wait" initial={false}>
          {estado.fase === "no-encontrada" && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              role="alert"
              className="flex items-start gap-3 rounded-2xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-foreground"
            >
              <PawPrint className="mt-0.5 h-5 w-5 shrink-0 text-destructive" aria-hidden="true" />
              <span>
                {estado.mensaje}{" "}
                <a
                  href={site.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold underline underline-offset-2"
                >
                  Escríbenos por WhatsApp
                  <span className="sr-only"> (abre en una pestaña nueva)</span>
                </a>{" "}
                y te ayudamos a encontrarla.
              </span>
            </motion.div>
          )}

          {estado.fase === "encontrada" && (
            <motion.article
              key={estado.cita.code + estado.cita.status}
              initial={{ opacity: 0, y: 10, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              aria-label={`Cita ${estado.cita.code} de ${estado.cita.petName}`}
              className="relative overflow-hidden rounded-2xl border-2 border-dashed border-brand-navy/25 bg-brand-sand dark:border-white/20 dark:bg-muted"
            >
              {/* Marca de agua de pata (esquina inferior derecha) */}
              <PawPrint
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-5 -right-4 h-28 w-28 rotate-[-18deg] text-brand-navy/[0.06] dark:text-white/[0.05]"
              />

              {/* Cabecera del ticket */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-dashed border-brand-navy/20 px-5 py-4 dark:border-white/15">
                <p className="font-mono text-lg font-bold tracking-[0.2em] text-brand-navy dark:text-brand-teal-soft">
                  {estado.cita.code}
                </p>
                {estadoCita && (
                  <span className={cn("rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide", estadoCita.clases)}>
                    {estadoCita.texto}
                  </span>
                )}
              </div>

              {/* Detalles */}
              <dl className="grid gap-x-6 gap-y-3 px-5 py-4 text-sm sm:grid-cols-2">
                <div className="flex items-start gap-2.5">
                  <PawPrint className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal-dark" aria-hidden="true" />
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Mascota</dt>
                    <dd className="font-bold text-foreground">
                      {estado.cita.petName} <span className="font-normal text-muted-foreground">({estado.cita.species})</span>
                    </dd>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Stethoscope className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal-dark" aria-hidden="true" />
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Servicio</dt>
                    <dd className="font-bold text-foreground">
                      {services.find((s) => s.id === estado.cita.service)?.label ?? estado.cita.service}
                    </dd>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal-dark" aria-hidden="true" />
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Fecha</dt>
                    <dd className="font-bold text-foreground">{formatFechaLarga(estado.cita.date)}</dd>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal-dark" aria-hidden="true" />
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Hora</dt>
                    <dd className="font-bold text-foreground">{estado.cita.timeSlot} h</dd>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <UserRound className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal-dark" aria-hidden="true" />
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Tutor</dt>
                    <dd className="font-bold text-foreground">
                      {estado.cita.tutorName}
                      <span className="block text-xs font-normal text-muted-foreground">
                        {estado.cita.emailMasked} · {estado.cita.phoneMasked}
                      </span>
                    </dd>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Stethoscope className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal-dark" aria-hidden="true" />
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Profesional</dt>
                    <dd className="font-bold text-foreground">
                      {vets.find((v) => v.id === estado.cita.preferredVet)?.label ?? "Sin preferencia"}
                    </dd>
                  </div>
                </div>
              </dl>

              {/* Acciones */}
              <div className="flex flex-col gap-2 border-t border-dashed border-brand-navy/20 px-5 py-4 dark:border-white/15 sm:flex-row sm:items-center">
                {cancelable ? (
                  <>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setDialogoCancelar(true)}
                      disabled={cancelando}
                      className="h-10 rounded-xl border-destructive/50 text-destructive hover:bg-destructive/10 hover:text-destructive"
                    >
                      {cancelando ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}
                      Cancelar cita
                    </Button>
                    <p className="text-xs text-muted-foreground sm:ml-auto sm:text-right">
                      Sin costo hasta 24 h antes. La franja queda libre al cancelar.
                    </p>
                  </>
                ) : estado.cita.status === "CANCELADA" ? (
                  <p className="text-xs text-muted-foreground">
                    Esta cita quedó cancelada. Puedes agendar una nueva cuando quieras desde el asistente de arriba.
                  </p>
                ) : (
                  <p className="text-xs text-muted-foreground">
                    Gracias por tu visita. Si necesitas algo más, escríbenos por WhatsApp.
                  </p>
                )}
              </div>
            </motion.article>
          )}
        </AnimatePresence>
      </div>

      {errorCancelar && (
        <p role="alert" className="mt-3 text-sm font-semibold text-destructive">
          {errorCancelar}
        </p>
      )}

      {/* Confirmación de cancelación */}
      <AlertDialog open={dialogoCancelar} onOpenChange={setDialogoCancelar}>
        <AlertDialogContent className="rounded-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle>¿Seguro que deseas cancelar esta cita?</AlertDialogTitle>
            <AlertDialogDescription>
              {estado.fase === "encontrada" && (
                <>
                  Liberaremos la franja del <strong>{formatFechaLarga(estado.cita.date)}</strong> a las{" "}
                  <strong>{estado.cita.timeSlot} h</strong> para {estado.cita.petName}. Puedes agendar de nuevo cuando
                  quieras, sujeto a disponibilidad.
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-xl">Mantener mi cita</AlertDialogCancel>
            <AlertDialogAction
              onClick={(evento) => {
                evento.preventDefault();
                void cancelarCita();
              }}
              disabled={cancelando}
              className="rounded-xl bg-destructive text-white hover:bg-destructive/90"
            >
              {cancelando ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}
              Sí, cancelar cita
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}
