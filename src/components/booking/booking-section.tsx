"use client";

/* ─────────────────────────────────────────────────────────────
   LONGIVET · Sección «Agendar cita»
   Asistente multipaso (Ley de Miller: 4 pasos) con flujo
   Database-less y WhatsApp-First.
   ───────────────────────────────────────────────────────────── */

import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { toast } from "sonner";
import {
  BadgeCheck,
  CalendarCheck,
  CalendarClock,
  CalendarPlus,
  Cat,
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  Dog,
  Info,
  Loader2,
  MessageCircle,
  PawPrint,
  Phone,
  Siren,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster as ToasterSonner } from "@/components/ui/sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { AppointmentLookup } from "@/components/booking/appointment-lookup";
import {
  afternoonSlots,
  EVENTO_PRESELECCION_SERVICIO,
  formatFechaLarga,
  generarCodigo,
  generarMensajeWhatsApp,
  morningSlots,
  services,
  vets,
  type AppointmentInput,
} from "@/lib/booking";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/* ── Tipos y constantes locales ── */

type Especie = "perro" | "gato" | "otro";

interface Formulario {
  petName: string;
  species: Especie | "";
  breed: string;
  ageYears: number | null;
  service: string;
  preferredVet: string;
  date: string;
  timeSlot: string;
  tutorName: string;
  email: string;
  phone: string;
  notes: string;
  consent: boolean;
}

const FORM_INICIAL: Formulario = {
  petName: "",
  species: "",
  breed: "",
  ageYears: null,
  service: "",
  preferredVet: "sin-preferencia",
  date: "",
  timeSlot: "",
  tutorName: "",
  email: "",
  phone: "",
  notes: "",
  consent: false,
};

interface Confirmacion {
  code: string;
  date: string;
  timeSlot: string;
  service: string;
  petName: string;
  tutorName: string;
}

interface DiaOption {
  iso: string;
  weekday: string;
  diaMes: string;
  esDomingo: boolean;
}

/* Descarga un archivo .ics (Apple/Google/Outlook) con la cita.
   Costa Rica usa UTC-6 todo el año (sin horario de verano). */
function descargarIcs(cita: Confirmacion) {
  const [anio, mes, dia] = cita.date.split("-").map(Number);
  const [hora, minuto] = cita.timeSlot.split(":").map(Number);
  const inicioUtc = new Date(Date.UTC(anio, mes - 1, dia, hora + 6, minuto));
  const finUtc = new Date(inicioUtc.getTime() + 45 * 60 * 1000);
  const formatoUtc = (fecha: Date) => fecha.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

  const servicio = services.find((s) => s.id === cita.service)?.label ?? cita.service;
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//LONGIVET//Citas Veterinarias//ES",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${cita.code}@longivet.cr`,
    `DTSTAMP:${formatoUtc(new Date())}`,
    `DTSTART:${formatoUtc(inicioUtc)}`,
    `DTEND:${formatoUtc(finUtc)}`,
    `SUMMARY:Cita veterinaria — ${cita.petName} · LONGIVET`,
    `DESCRIPTION:Servicio: ${servicio}. Código de confirmación: ${cita.code}. Te esperamos 10 minutos antes.`,
    `LOCATION:${site.addressFull}, Costa Rica`,
    "BEGIN:VALARM",
    "TRIGGER:-PT24H",
    "ACTION:DISPLAY",
    "DESCRIPTION:Recordatorio: cita mañana en LONGIVET",
    "END:VALARM",
    "BEGIN:VALARM",
    "TRIGGER:-PT2H",
    "ACTION:DISPLAY",
    "DESCRIPTION:Recordatorio: cita en 2 horas en LONGIVET",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const enlace = document.createElement("a");
  enlace.href = url;
  enlace.download = `cita-longivet-${cita.code}.ics`;
  document.body.appendChild(enlace);
  enlace.click();
  enlace.remove();
  URL.revokeObjectURL(url);
}

const PASOS = [
  { numero: 1, titulo: "Mascota" },
  { numero: 2, titulo: "Profesional" },
  { numero: 3, titulo: "Fecha y hora" },
  { numero: 4, titulo: "Tus datos" },
] as const;

const OPCIONES_ESPECIE = [
  { valor: "perro", etiqueta: "Perro", Icono: Dog },
  { valor: "gato", etiqueta: "Gato", Icono: Cat },
  { valor: "otro", etiqueta: "Otro", Icono: PawPrint },
] as const;

const OPCIONES_EDAD = [
  { valor: "", etiqueta: "Edad (opcional)" },
  { valor: "0.5", etiqueta: "Menos de 1 año" },
  { valor: "2", etiqueta: "1–3 años" },
  { valor: "5", etiqueta: "4–6 años" },
  { valor: "8", etiqueta: "7–9 años" },
  { valor: "11", etiqueta: "10–12 años" },
  { valor: "13", etiqueta: "13+ años" },
] as const;

const DESPUES_DE_RESERVAR = [
  {
    Icono: BadgeCheck,
    titulo: "Confirmación inmediata con código",
    detalle: "Tu código LV-XXXXXX aparece al terminar y queda asociado a tu cita.",
  },
  {
    Icono: MessageCircle,
    titulo: "Recordatorio por WhatsApp",
    detalle: "Te escribimos 24 horas y 2 horas antes de la consulta.",
  },
  {
    Icono: CalendarClock,
    titulo: "Reprogramación sin costo",
    detalle: "Mueve tu cita sin cargo hasta 24 horas antes.",
  },
] as const;

const DIAS_HORIZONTE = 21;
const DURACION_DESTELLO_MS = 2200;

/* ── Helpers puros ── */

/**
 * Genera los próximos `cantidad` días (hoy incluido) según la fecha de
 * Costa Rica. Solo debe ejecutarse EN CLIENTE (tras el mount) para no
 * romper la hidratación: depende del reloj del dispositivo.
 */
function generarDias(cantidad: number): DiaOption[] {
  const hoyCR = new Date().toLocaleDateString("en-CA", { timeZone: "America/Costa_Rica" });
  const partes = hoyCR.split("-");
  const base = new Date(Date.UTC(Number(partes[0]), Number(partes[1]) - 1, Number(partes[2])));
  const fmtSemana = new Intl.DateTimeFormat("es-CR", { weekday: "short", timeZone: "UTC" });
  const fmtDia = new Intl.DateTimeFormat("es-CR", { day: "numeric", timeZone: "UTC" });
  const dias: DiaOption[] = [];
  for (let i = 0; i < cantidad; i++) {
    const fecha = new Date(base.getTime() + i * 86_400_000);
    dias.push({
      iso: fecha.toISOString().slice(0, 10),
      weekday: fmtSemana.format(fecha).replace(".", ""),
      diaMes: fmtDia.format(fecha),
      esDomingo: fecha.getUTCDay() === 0,
    });
  }
  return dias;
}

/** «Dra. Mariana Solís» → «MS» · «Sin preferencia» → «SP». */
function inicialesProfesional(label: string): string {
  const limpio = label.replace(/^Dra?\.?\s+/i, "");
  const iniciales = limpio
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((palabra) => palabra.charAt(0).toUpperCase());
  return iniciales.join("") || "LV";
}

/* ── Piezas visuales reutilizables ── */

function FilaResumen({ termino, valor }: { termino: string; valor: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="shrink-0 text-muted-foreground">{termino}</dt>
      <dd className="text-right font-semibold text-foreground">{valor}</dd>
    </div>
  );
}

function GrupoHorarios({
  titulo,
  slots,
  ocupados,
  valor,
  onSelect,
}: {
  titulo: string;
  slots: readonly string[];
  ocupados: string[];
  valor: string;
  onSelect: (slot: string) => void;
}) {
  return (
    <div>
      <h4 className="mb-2 text-sm font-bold text-foreground">{titulo}</h4>
      <div className="grid grid-cols-4 gap-2">
        {slots.map((slot) => {
          const ocupado = ocupados.includes(slot);
          const activo = valor === slot;
          return (
            <button
              key={slot}
              type="button"
              disabled={ocupado}
              title={ocupado ? "Reservado" : undefined}
              aria-pressed={activo}
              onClick={() => onSelect(slot)}
              className={cn(
                "flex h-12 items-center justify-center rounded-xl border text-sm font-semibold tabular-nums transition-all",
                ocupado
                  ? "cursor-not-allowed border-border bg-muted/50 text-muted-foreground line-through opacity-40"
                  : activo
                    ? "border-transparent bg-brand-teal-dark text-white shadow-sm"
                    : "border-border bg-card hover:border-brand-teal hover:shadow-sm",
              )}
            >
              {slot}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ── Sección principal ── */

export default function BookingSection() {
  const [paso, setPaso] = useState(1);
  const [form, setForm] = useState<Formulario>(FORM_INICIAL);
  const [errores, setErrores] = useState<Record<string, string>>({});
  const [dias, setDias] = useState<DiaOption[]>([]);
  const [disponibilidad, setDisponibilidad] = useState<{ closed: boolean; taken: string[] } | null>(null);
  const [cargandoDispo, setCargandoDispo] = useState(false);
  const [errorDispo, setErrorDispo] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [confirmacion, setConfirmacion] = useState<Confirmacion | null>(null);
  const [codigoCopiado, setCodigoCopiado] = useState(false);
  const [servicioDestacado, setServicioDestacado] = useState<string | null>(null);
  const tarjetaRef = useRef<HTMLDivElement>(null);
  const montadoRef = useRef(false);

  /* Actualiza un campo y limpia su error asociado. */
  const actualizar = useCallback(<K extends keyof Formulario>(campo: K, valor: Formulario[K]) => {
    setForm((prev) => ({ ...prev, [campo]: valor }));
    setErrores((prev) => {
      if (!(campo in prev)) return prev;
      const siguientes = { ...prev };
      delete siguientes[campo as string];
      return siguientes;
    });
  }, []);

  /* Días del calendario: se generan tras el mount (hidratación segura). */
  useEffect(() => {
    setDias(generarDias(DIAS_HORIZONTE));
  }, []);

  /* Mantiene el asistente a la vista al cambiar de paso o al confirmar (sin saltar al montar). */
  useEffect(() => {
    if (!montadoRef.current) {
      montadoRef.current = true;
      return;
    }
    tarjetaRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [paso, confirmacion]);

  /* Preselección de servicio desde las tarjetas de #servicios:
     el enlace «Agendar» dispara un CustomEvent global; aquí lo recibimos,
     volvemos al paso 1, precargamos el servicio y avisamos con un toast.
     Los setters de React son estables, así que el listener se registra una
     sola vez (el scroll al ancla lo hace el navegador de forma nativa). */
  useEffect(() => {
    const preseleccionar = (evento: Event) => {
      const detail = (evento as CustomEvent<{ serviceId?: unknown }>).detail;
      const serviceId = typeof detail?.serviceId === "string" ? detail.serviceId : "";
      const servicio = services.find((s) => s.id === serviceId);
      if (!servicio) return; // id desconocido: se ignora el evento

      setConfirmacion(null); // si había una confirmación en pantalla, volver al asistente
      setPaso(1);
      setErrores({});
      setForm((prev) => ({ ...prev, service: servicio.id }));
      setServicioDestacado(servicio.id);
      toast.success(`Servicio seleccionado: ${servicio.label} — continúa con tu reserva`, {
        description: "Revisa los datos de tu mascota y elige el día de tu cita.",
      });
    };

    window.addEventListener(EVENTO_PRESELECCION_SERVICIO, preseleccionar);
    return () =>
      window.removeEventListener(EVENTO_PRESELECCION_SERVICIO, preseleccionar);
  }, []);

  /* El resaltado del servicio preseleccionado dura ~2 s. */
  useEffect(() => {
    if (!servicioDestacado) return;
    const temporizador = setTimeout(() => setServicioDestacado(null), DURACION_DESTELLO_MS);
    return () => clearTimeout(temporizador);
  }, [servicioDestacado]);

  const consultarDisponibilidad = useCallback((fecha: string) => {
    setCargandoDispo(true);
    setErrorDispo(false);
    try {
      // Domingo cerrado. Se parsea al mediodía UTC para evitar desfase de zona horaria.
      const diaSemana = new Date(`${fecha}T12:00:00Z`).getUTCDay();
      const esDomingo = diaSemana === 0;
      setDisponibilidad({ closed: esDomingo, taken: [] });
    } catch {
      setDisponibilidad(null);
      setErrorDispo(true);
    } finally {
      setCargandoDispo(false);
    }
  }, []);

  const elegirDia = (iso: string) => {
    setForm((prev) => ({ ...prev, date: iso, timeSlot: "" }));
    setErrores((prev) => {
      if (!prev.date && !prev.timeSlot) return prev;
      const siguientes = { ...prev };
      delete siguientes.date;
      delete siguientes.timeSlot;
      return siguientes;
    });
    void consultarDisponibilidad(iso);
  };

  /* Validación manual por paso (campos requeridos visibles + error inline). */
  const validarPaso = (numero: number): Record<string, string> => {
    const encontrados: Record<string, string> = {};
    if (numero === 1) {
      if (form.petName.trim().length < 2) {
        encontrados.petName = "Escribe el nombre de tu mascota (mínimo 2 letras).";
      }
      if (!form.species) encontrados.species = "Selecciona la especie de tu mascota.";
      if (!form.service) encontrados.service = "Selecciona el servicio que tu mascota necesita.";
      if (form.breed.trim().length > 60) encontrados.breed = "La raza no puede superar los 60 caracteres.";
    }
    if (numero === 3) {
      if (!form.date) encontrados.date = "Elige el día de tu cita.";
      if (!form.timeSlot) encontrados.timeSlot = "Elige un horario disponible.";
    }
    if (numero === 4) {
      if (form.tutorName.trim().length < 3) encontrados.tutorName = "Escribe tu nombre completo.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
        encontrados.email = "Escribe un correo electrónico válido.";
      }
      const tel = form.phone.trim();
      if (tel.length < 8 || !/^[\d\s+()-]+$/.test(tel)) {
        encontrados.phone = "Escribe un teléfono válido (mínimo 8 dígitos).";
      }
      if (form.notes.length > 500) encontrados.notes = "Las notas no pueden superar los 500 caracteres.";
      if (!form.consent) encontrados.consent = "Necesitamos tu autorización para coordinar la cita.";
    }
    return encontrados;
  };

  const avanzar = () => {
    const encontrados = validarPaso(paso);
    if (Object.keys(encontrados).length > 0) {
      setErrores(encontrados);
      return;
    }
    setErrores({});
    setPaso((prev) => Math.min(PASOS.length, prev + 1));
  };

  const retroceder = () => {
    setErrores({});
    setPaso((prev) => Math.max(1, prev - 1));
  };

  /* Enter en pasos 1–3 solo avanza (nunca envía); en el paso 4 envía. */
  const enviarReserva = async (evento: FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    if (paso < PASOS.length) {
      avanzar();
      return;
    }

    const encontrados = validarPaso(4);
    if (Object.keys(encontrados).length > 0) {
      setErrores(encontrados);
      return;
    }
    setErrores({});
    setEnviando(true);

    try {
      const code = generarCodigo();
      const citaCompleta = {
        code,
        petName: form.petName.trim(),
        species: form.species as Especie,
        breed: form.breed.trim() || null,
        ageYears: form.ageYears,
        service: form.service,
        preferredVet: form.preferredVet,
        date: form.date,
        timeSlot: form.timeSlot,
        tutorName: form.tutorName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        notes: form.notes.trim() || null,
      };

      // Guardar localmente en el navegador para que el tutor pueda consultarla en el lookup
      try {
        localStorage.setItem("longivet_last_appointment", JSON.stringify(citaCompleta));
      } catch {
        // Ignorar si storage está deshabilitado
      }

      setConfirmacion({
        code,
        date: citaCompleta.date,
        timeSlot: citaCompleta.timeSlot,
        service: citaCompleta.service,
        petName: citaCompleta.petName,
        tutorName: citaCompleta.tutorName,
      });

      // Abrir WhatsApp automáticamente con todos los datos formateados
      const textoWhatsApp = generarMensajeWhatsApp(citaCompleta);
      const urlWhatsApp = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(textoWhatsApp)}`;
      if (typeof window !== "undefined") {
        window.open(urlWhatsApp, "_blank", "noopener,noreferrer");
      }

      toast.success("¡Reserva preparada! Abriendo WhatsApp para confirmar con la clínica...");
    } catch {
      toast.error("Ocurrió un error al preparar tu reserva. Intenta de nuevo.");
    } finally {
      setEnviando(false);
    }
  };

  const reiniciar = () => {
    setForm(FORM_INICIAL);
    setErrores({});
    setPaso(1);
    setDisponibilidad(null);
    setErrorDispo(false);
    setCargandoDispo(false);
    setConfirmacion(null);
    setCodigoCopiado(false);
  };

  /* Copia el código de confirmación al portapapeles (con fallback heredado
     para navegadores/ contextos sin Clipboard API). */
  const copiarCodigo = useCallback(async () => {
    if (!confirmacion) return;
    const codigo = confirmacion.code;
    try {
      await navigator.clipboard.writeText(codigo);
      setCodigoCopiado(true);
      toast.success("Código copiado al portapapeles");
      setTimeout(() => setCodigoCopiado(false), 2400);
      return;
    } catch {
      /* Clipboard API bloqueada: se intenta el método heredado. */
    }
    try {
      const area = document.createElement("textarea");
      area.value = codigo;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      const ok = document.execCommand("copy");
      area.remove();
      if (!ok) throw new Error("execCommand falló");
      setCodigoCopiado(true);
      toast.success("Código copiado al portapapeles");
      setTimeout(() => setCodigoCopiado(false), 2400);
    } catch {
      toast.error("No pudimos copiar el código. Anótalo manualmente, por favor.");
    }
  }, [confirmacion]);

  const servicioElegido = services.find((servicio) => servicio.id === form.service);
  const profesionalElegido = vets.find((vet) => vet.id === form.preferredVet);
  const tituloPasoActual = PASOS[paso - 1]?.titulo ?? "";
  const pasoActual = confirmacion ? PASOS.length : paso;

  /* Enlace de WhatsApp con confirmación estructurada (solo tras confirmar). */
  const waConfirmHref = confirmacion
    ? `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(
        generarMensajeWhatsApp({
          code: confirmacion.code,
          petName: confirmacion.petName,
          species: form.species || "perro",
          breed: form.breed || null,
          ageYears: form.ageYears,
          service: confirmacion.service,
          preferredVet: form.preferredVet,
          date: confirmacion.date,
          timeSlot: confirmacion.timeSlot,
          tutorName: confirmacion.tutorName,
          email: form.email,
          phone: form.phone,
          notes: form.notes || null,
        }),
      )}`
    : "#";

  return (
    <MotionConfig reducedMotion="user">
      {/* Sonner: montado aquí porque el layout solo monta el Toaster de radix;
          así los toasts de sonner (preselección, 409, éxito) sí se ven. */}
      <ToasterSonner position="top-center" closeButton />
      <section id="agendar" aria-labelledby="titulo-agendar" className="bg-background py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Encabezado de la sección */}
          <div className="mx-auto mb-12 max-w-2xl text-center lg:mb-16">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-teal">
              Reserva en menos de 1 minuto
            </p>
            <h2
              id="titulo-agendar"
              className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl"
            >
              Agenda la cita de tu compañero
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Cuatro pasos sencillos para reservar la consulta de tu mascota senior: sin registros ni llamadas
              obligatorias.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-5">
            {/* ── Panel informativo (sticky) ── */}
            <div className="lg:col-span-2">
              <div className="space-y-4 lg:sticky lg:top-24">
                <div className="rounded-3xl bg-primary p-8 text-primary-foreground dark:bg-brand-navy">
                  <h3 className="text-xl font-bold tracking-tight">Qué pasa después de reservar</h3>
                  <ul className="mt-6 space-y-5">
                    {DESPUES_DE_RESERVAR.map((item) => (
                      <li key={item.titulo} className="flex items-start gap-3">
                        <item.Icono className="mt-0.5 h-6 w-6 shrink-0 text-brand-teal-soft" aria-hidden="true" />
                        <p className="text-sm leading-snug">
                          <span className="block font-bold">{item.titulo}</span>
                          <span className="mt-0.5 block text-primary-foreground/80">{item.detalle}</span>
                        </p>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 rounded-2xl border border-white/20 bg-white/10 p-4">
                    <p className="flex items-start gap-3 text-sm leading-snug">
                      <Siren className="mt-0.5 h-5 w-5 shrink-0 text-brand-gold" aria-hidden="true" />
                      <span>
                        <strong className="font-bold">¿Es una urgencia?</strong> No agendes:{" "}
                        <a
                          href={site.emergencyPhoneHref}
                          className="font-bold underline underline-offset-2 transition-colors hover:text-brand-gold"
                          aria-label={`Llamar ahora a urgencias veterinarias al ${site.emergencyPhone}`}
                        >
                          llámanos ya
                        </a>{" "}
                        y te guiamos durante el traslado.
                      </span>
                    </p>
                  </div>

                  <div className="mt-5 flex flex-col gap-2">
                    <a
                      href={site.phoneHref}
                      className="flex min-h-[44px] items-center gap-2.5 rounded-xl bg-white/5 px-3 text-sm font-semibold transition-colors hover:bg-white/15"
                    >
                      <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                      {site.phone}
                      <span className="sr-only">— llamada directa a la clínica</span>
                    </a>
                    <a
                      href={site.whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-h-[44px] items-center gap-2.5 rounded-xl bg-white/5 px-3 text-sm font-semibold transition-colors hover:bg-white/15"
                    >
                      <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                      WhatsApp
                      <span className="sr-only">(abre en una pestaña nueva)</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Asistente de reserva ── */}
            <div ref={tarjetaRef} className="lg:col-span-3">
              <div className="rounded-3xl border border-border bg-card p-6 shadow-sm md:p-8">
                <AnimatePresence mode="wait" initial={false}>
                  {confirmacion ? (
                    /* ══ Pantalla de éxito (solo se renderiza tras la interacción) ══ */
                    <motion.div
                      key="exito"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      role="status"
                      className="flex flex-col items-center py-4 text-center"
                    >
                      <motion.div
                        initial={{ scale: 0.6, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.05 }}
                        className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-emerald/15"
                      >
                        <motion.svg
                          viewBox="0 0 52 52"
                          fill="none"
                          className="h-10 w-10 text-brand-emerald"
                          aria-hidden="true"
                        >
                          <motion.path
                            d="M14 27l8 8 16-16"
                            stroke="currentColor"
                            strokeWidth={5}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.45, delay: 0.25, ease: "easeOut" }}
                          />
                        </motion.svg>
                      </motion.div>

                      <h3 className="mt-6 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                        ¡Reserva confirmada, {confirmacion.tutorName.split(/\s+/)[0] || confirmacion.tutorName}!
                      </h3>
                      <p className="mt-2 max-w-md text-sm text-muted-foreground">
                        Guarda tu código de confirmación:
                      </p>

                      {/* Ticket del código: perforaciones laterales + copiar */}
                      <div className="relative mt-5 flex items-center justify-between gap-3 rounded-2xl border-2 border-dashed border-brand-gold/70 bg-brand-navy py-3 pl-7 pr-3 shadow-sm">
                        <span
                          aria-hidden="true"
                          className="absolute -left-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full border border-brand-gold/40 bg-card"
                        />
                        <span
                          aria-hidden="true"
                          className="absolute -right-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full border border-brand-gold/40 bg-card"
                        />
                        <p
                          className="font-mono text-2xl font-bold tracking-[0.22em] text-white sm:text-3xl"
                          aria-label={`Código de confirmación ${confirmacion.code.split("").join(" ")}`}
                        >
                          {confirmacion.code}
                        </p>
                        <button
                          type="button"
                          onClick={() => void copiarCodigo()}
                          aria-label={`Copiar el código de confirmación ${confirmacion.code}`}
                          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white transition-colors hover:bg-white/25 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
                        >
                          {codigoCopiado ? (
                            <Check className="h-5 w-5 text-brand-emerald" aria-hidden="true" />
                          ) : (
                            <Copy className="h-5 w-5" aria-hidden="true" />
                          )}
                        </button>
                      </div>
                      <p className="mt-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                        Preséntalo al llegar a la clínica
                      </p>

                      <dl className="mt-6 w-full max-w-sm space-y-1.5 rounded-2xl bg-brand-sand p-4 text-sm dark:bg-muted">
                        <FilaResumen termino="Mascota" valor={confirmacion.petName} />
                        <FilaResumen
                          termino="Servicio"
                          valor={
                            services.find((servicio) => servicio.id === confirmacion.service)?.label ??
                            confirmacion.service
                          }
                        />
                        <FilaResumen termino="Fecha" valor={formatFechaLarga(confirmacion.date)} />
                        <FilaResumen termino="Hora" valor={`${confirmacion.timeSlot} h`} />
                      </dl>

                      <div className="mt-6 flex w-full max-w-sm flex-col gap-2 sm:flex-row">
                        <Button
                          asChild
                          className="h-11 flex-1 rounded-xl bg-brand-teal-dark font-bold text-white hover:bg-brand-teal"
                        >
                          <a href={waConfirmHref} target="_blank" rel="noopener noreferrer">
                            <MessageCircle className="h-4 w-4" aria-hidden="true" />
                            Confirmar por WhatsApp
                          </a>
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => descargarIcs(confirmacion)}
                          className="h-11 flex-1 rounded-xl border-brand-navy/30 font-bold text-brand-navy hover:bg-brand-navy/5 hover:text-brand-navy dark:border-white/25 dark:text-brand-teal-soft dark:hover:bg-white/10 dark:hover:text-brand-teal-soft"
                        >
                          <CalendarPlus className="h-4 w-4" aria-hidden="true" />
                          Añadir al calendario
                          <span className="sr-only">: descarga un archivo para tu agenda con recordatorios</span>
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        onClick={reiniciar}
                        className="mt-2 h-10 rounded-xl text-muted-foreground hover:text-foreground"
                      >
                        Agendar otra cita
                      </Button>
                    </motion.div>
                  ) : (
                    /* ══ Asistente de 4 pasos ══ */
                    <motion.div
                      key="asistente"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h3 className="sr-only">Asistente de reserva en cuatro pasos</h3>

                      {/* Encabezado de pasos */}
                      <ol aria-label="Progreso del asistente" className="mb-6 flex items-start">
                        {PASOS.map((item, indice) => {
                          const completado = pasoActual > item.numero;
                          const actual = pasoActual === item.numero;
                          return (
                            <li
                              key={item.numero}
                              className={cn("flex items-start", indice < PASOS.length - 1 && "flex-1")}
                            >
                              <div className="flex flex-col items-center gap-1.5 text-center">
                                <span
                                  aria-hidden="true"
                                  className={cn(
                                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-sm font-bold transition-colors",
                                    completado && "border-transparent bg-brand-navy text-white",
                                    actual && "border-transparent bg-brand-teal-dark text-white",
                                    !completado && !actual && "border-border bg-muted text-muted-foreground",
                                  )}
                                >
                                  {completado ? <Check className="h-5 w-5" /> : item.numero}
                                </span>
                                <span
                                  aria-current={actual ? "step" : undefined}
                                  className={cn(
                                    "text-[11px] font-semibold leading-tight sm:text-xs",
                                    actual ? "text-foreground" : "text-muted-foreground",
                                  )}
                                >
                                  {item.titulo}
                                </span>
                              </div>
                              {indice < PASOS.length - 1 && (
                                <span
                                  aria-hidden="true"
                                  className="mx-2 mt-5 h-0.5 flex-1 rounded-full bg-border sm:mx-3"
                                />
                              )}
                            </li>
                          );
                        })}
                      </ol>
                      <p aria-live="polite" className="sr-only">
                        Paso {paso} de {PASOS.length}: {tituloPasoActual}
                      </p>
                      <div
                        role="progressbar"
                        aria-valuemin={1}
                        aria-valuemax={PASOS.length}
                        aria-valuenow={paso}
                        aria-label="Progreso de la reserva"
                        className="mb-8 h-1.5 overflow-hidden rounded-full bg-muted"
                      >
                        <div
                          className="h-full rounded-full bg-brand-teal transition-all duration-300"
                          style={{ width: `${(paso / PASOS.length) * 100}%` }}
                        />
                      </div>

                      <form onSubmit={enviarReserva} noValidate>
                        <AnimatePresence mode="wait" initial={false}>
                          <motion.div
                            key={paso}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -12 }}
                            transition={{ duration: 0.22, ease: "easeOut" }}
                          >
                            {/* ══ Paso 1 · Mascota y servicio ══ */}
                            {paso === 1 && (
                              <fieldset className="space-y-6">
                                <legend className="sr-only">Paso 1: datos de tu mascota y servicio</legend>

                                <div className="space-y-2">
                                  <Label htmlFor="petName">Nombre de tu mascota *</Label>
                                  <Input
                                    id="petName"
                                    value={form.petName}
                                    onChange={(evento) => actualizar("petName", evento.target.value)}
                                    placeholder="Ej. Rocko"
                                    required
                                    autoComplete="off"
                                    aria-invalid={Boolean(errores.petName) || undefined}
                                    aria-describedby={errores.petName ? "error-petName" : undefined}
                                    className="h-11 rounded-xl"
                                  />
                                  {errores.petName && (
                                    <p id="error-petName" className="text-sm text-destructive">
                                      {errores.petName}
                                    </p>
                                  )}
                                </div>

                                <div className="space-y-2">
                                  <span id="etiqueta-especie" className="text-sm font-medium">
                                    Especie *
                                  </span>
                                  <div
                                    role="radiogroup"
                                    aria-labelledby="etiqueta-especie"
                                    aria-describedby={errores.species ? "error-species" : undefined}
                                    className="grid grid-cols-3 gap-2 sm:gap-3"
                                  >
                                    {OPCIONES_ESPECIE.map(({ valor, etiqueta, Icono }) => (
                                      <label
                                        key={valor}
                                        className={cn(
                                          "flex min-h-[72px] cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border bg-card p-3 text-sm font-semibold transition-all hover:border-brand-teal/60",
                                          "has-[:checked]:border-brand-teal has-[:checked]:bg-brand-teal-soft",
                                          "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring has-[:focus-visible]:ring-offset-2",
                                        )}
                                      >
                                        <input
                                          type="radio"
                                          name="especie"
                                          value={valor}
                                          checked={form.species === valor}
                                          onChange={() => actualizar("species", valor)}
                                          className="sr-only"
                                        />
                                        <Icono className="h-5 w-5" aria-hidden="true" />
                                        <span>{etiqueta}</span>
                                      </label>
                                    ))}
                                  </div>
                                  {errores.species && (
                                    <p id="error-species" className="text-sm text-destructive">
                                      {errores.species}
                                    </p>
                                  )}
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2">
                                  <div className="space-y-2">
                                    <Label htmlFor="breed">Raza (opcional)</Label>
                                    <Input
                                      id="breed"
                                      value={form.breed}
                                      onChange={(evento) => actualizar("breed", evento.target.value)}
                                      placeholder="Ej. Golden retriever"
                                      maxLength={60}
                                      aria-invalid={Boolean(errores.breed) || undefined}
                                      aria-describedby={errores.breed ? "error-breed" : undefined}
                                      className="h-11 rounded-xl"
                                    />
                                    {errores.breed && (
                                      <p id="error-breed" className="text-sm text-destructive">
                                        {errores.breed}
                                      </p>
                                    )}
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="ageYears">Edad</Label>
                                    <select
                                      id="ageYears"
                                      value={form.ageYears === null ? "" : String(form.ageYears)}
                                      onChange={(evento) =>
                                        actualizar(
                                          "ageYears",
                                          evento.target.value === "" ? null : Number(evento.target.value),
                                        )
                                      }
                                      className="h-11 w-full rounded-xl border border-input bg-card px-3 text-sm text-foreground shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                                    >
                                      {OPCIONES_EDAD.map((opcion) => (
                                        <option key={opcion.valor} value={opcion.valor}>
                                          {opcion.etiqueta}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                </div>

                                <div className="space-y-2">
                                  <span id="etiqueta-servicio" className="text-sm font-medium">
                                    ¿Qué necesita tu mascota? *
                                  </span>
                                  <div
                                    role="radiogroup"
                                    aria-labelledby="etiqueta-servicio"
                                    aria-describedby={errores.service ? "error-service" : undefined}
                                    className="grid gap-2 md:grid-cols-2"
                                  >
                                    {services.map((servicio) => (
                                      <label
                                        key={servicio.id}
                                        className={cn(
                                          "flex cursor-pointer items-start justify-between gap-3 rounded-xl border bg-card p-4 transition-all hover:border-brand-teal/60",
                                          "has-[:checked]:border-brand-teal has-[:checked]:bg-brand-teal-soft",
                                          "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring has-[:focus-visible]:ring-offset-2",
                                          servicioDestacado === servicio.id &&
                                            "border-brand-teal bg-brand-teal-soft ring-2 ring-brand-teal ring-offset-2 ring-offset-card",
                                        )}
                                      >
                                        <input
                                          type="radio"
                                          name="servicio"
                                          value={servicio.id}
                                          checked={form.service === servicio.id}
                                          onChange={() => actualizar("service", servicio.id)}
                                          className="sr-only"
                                        />
                                        <span className="min-w-0">
                                          <span className="block text-sm font-bold leading-snug">
                                            {servicio.label}
                                          </span>
                                          <span className="mt-1 block text-sm leading-snug text-muted-foreground">
                                            {servicio.desc}
                                          </span>
                                        </span>
                                        <span className="shrink-0 rounded-full bg-brand-sand px-2.5 py-1 text-[11px] font-bold text-brand-navy dark:bg-muted dark:text-foreground">
                                          {servicio.priceHint}
                                        </span>
                                      </label>
                                    ))}
                                  </div>
                                  {errores.service && (
                                    <p id="error-service" className="text-sm text-destructive">
                                      {errores.service}
                                    </p>
                                  )}
                                </div>
                              </fieldset>
                            )}

                            {/* ══ Paso 2 · Profesional ══ */}
                            {paso === 2 && (
                              <fieldset className="space-y-4">
                                <legend id="etiqueta-vet" className="sr-only">
                                  Paso 2: profesional de preferencia
                                </legend>
                                <p className="text-sm text-muted-foreground">
                                  Elige con quién te gustaría atender a{" "}
                                  {form.petName.trim() || "tu mascota"}. Si no tienes preferencia, te asignamos el
                                  primer espacio disponible.
                                </p>
                                <div
                                  role="radiogroup"
                                  aria-labelledby="etiqueta-vet"
                                  className="grid gap-2 sm:grid-cols-2"
                                >
                                  {vets.map((vet) => (
                                    <label
                                      key={vet.id}
                                      className={cn(
                                        "flex cursor-pointer items-center gap-3 rounded-xl border bg-card p-4 transition-all hover:border-brand-teal/60",
                                        "has-[:checked]:border-brand-teal has-[:checked]:bg-brand-teal-soft",
                                        "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring has-[:focus-visible]:ring-offset-2",
                                      )}
                                    >
                                      <input
                                        type="radio"
                                        name="veterinario"
                                        value={vet.id}
                                        checked={form.preferredVet === vet.id}
                                        onChange={() => actualizar("preferredVet", vet.id)}
                                        className="sr-only"
                                      />
                                      <span
                                        aria-hidden="true"
                                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-navy to-brand-teal text-sm font-bold text-white"
                                      >
                                        {inicialesProfesional(vet.label)}
                                      </span>
                                      <span className="min-w-0">
                                        <span className="block text-sm font-bold leading-snug">{vet.label}</span>
                                        <span className="block text-sm leading-snug text-muted-foreground">
                                          {vet.role}
                                        </span>
                                      </span>
                                    </label>
                                  ))}
                                </div>
                              </fieldset>
                            )}

                            {/* ══ Paso 3 · Fecha y hora ══ */}
                            {paso === 3 && (
                              <fieldset className="space-y-6">
                                <legend className="sr-only">Paso 3: elige fecha y hora</legend>

                                <div className="space-y-2">
                                  <span id="etiqueta-dias" className="text-sm font-medium">
                                    Elige el día *
                                  </span>
                                  {dias.length === 0 ? (
                                    <div className="flex gap-2 overflow-hidden" aria-hidden="true">
                                      {Array.from({ length: 8 }).map((_, indice) => (
                                        <Skeleton
                                          key={indice}
                                          className="h-[72px] w-[72px] shrink-0 rounded-xl"
                                        />
                                      ))}
                                    </div>
                                  ) : (
                                    <div
                                      role="group"
                                      aria-labelledby="etiqueta-dias"
                                      aria-describedby={errores.date ? "error-date" : undefined}
                                      className="scrollbar-fina -mx-1 flex gap-2 overflow-x-auto px-1 pb-2"
                                    >
                                      {dias.map((dia) => {
                                        const activo = form.date === dia.iso;
                                        return (
                                          <button
                                            key={dia.iso}
                                            type="button"
                                            disabled={dia.esDomingo}
                                            aria-disabled={dia.esDomingo || undefined}
                                            aria-pressed={activo}
                                            title={dia.esDomingo ? "Cerrado los domingos" : undefined}
                                            onClick={() => elegirDia(dia.iso)}
                                            className={cn(
                                              "flex h-[72px] w-[72px] shrink-0 flex-col items-center justify-center gap-0.5 rounded-xl border text-center transition-all",
                                              activo
                                                ? "border-transparent bg-brand-navy text-white shadow-sm"
                                                : dia.esDomingo
                                                  ? "cursor-not-allowed border-border bg-muted/50 text-muted-foreground opacity-40"
                                                  : "border-border bg-card hover:border-brand-teal hover:shadow-sm",
                                            )}
                                          >
                                            <span className="text-xs font-medium capitalize">{dia.weekday}</span>
                                            <span className="text-lg font-bold leading-none">{dia.diaMes}</span>
                                          </button>
                                        );
                                      })}
                                    </div>
                                  )}
                                  {errores.date && (
                                    <p id="error-date" className="text-sm text-destructive">
                                      {errores.date}
                                    </p>
                                  )}
                                </div>

                                <div className="space-y-2">
                                  <span id="etiqueta-horas" className="text-sm font-medium">
                                    Elige la hora *
                                  </span>
                                  {cargandoDispo ? (
                                    <div className="space-y-3" aria-hidden="true">
                                      <Skeleton className="h-4 w-20 rounded-full" />
                                      <div className="grid grid-cols-4 gap-2">
                                        {Array.from({ length: 8 }).map((_, indice) => (
                                          <Skeleton key={`am-${indice}`} className="h-12 rounded-xl" />
                                        ))}
                                      </div>
                                      <Skeleton className="h-4 w-16 rounded-full" />
                                      <div className="grid grid-cols-4 gap-2">
                                        {Array.from({ length: 8 }).map((_, indice) => (
                                          <Skeleton key={`pm-${indice}`} className="h-12 rounded-xl" />
                                        ))}
                                      </div>
                                    </div>
                                  ) : errorDispo ? (
                                    <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-destructive/40 bg-destructive/5 p-4">
                                      <p className="text-sm text-foreground">
                                        No pudimos cargar los horarios disponibles.
                                      </p>
                                      <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => form.date && consultarDisponibilidad(form.date)}
                                      >
                                        Reintentar
                                      </Button>
                                    </div>
                                  ) : disponibilidad?.closed ? (
                                    <p className="flex items-center gap-2 rounded-xl border border-brand-gold/40 bg-brand-sand p-4 text-sm text-foreground dark:bg-muted">
                                      <Info className="h-5 w-5 shrink-0 text-brand-gold" aria-hidden="true" />
                                      No abrimos los domingos, elige otro día.
                                    </p>
                                  ) : disponibilidad ? (
                                    <div className="space-y-4">
                                      <GrupoHorarios
                                        titulo="Mañana"
                                        slots={morningSlots}
                                        ocupados={disponibilidad.taken}
                                        valor={form.timeSlot}
                                        onSelect={(slot) => actualizar("timeSlot", slot)}
                                      />
                                      <GrupoHorarios
                                        titulo="Tarde"
                                        slots={afternoonSlots}
                                        ocupados={disponibilidad.taken}
                                        valor={form.timeSlot}
                                        onSelect={(slot) => actualizar("timeSlot", slot)}
                                      />
                                    </div>
                                  ) : (
                                    <p className="rounded-xl bg-muted p-4 text-sm text-muted-foreground">
                                      Primero elige un día para ver los horarios disponibles.
                                    </p>
                                  )}
                                  {errores.timeSlot && (
                                    <p id="error-timeSlot" className="text-sm text-destructive">
                                      {errores.timeSlot}
                                    </p>
                                  )}
                                </div>
                              </fieldset>
                            )}

                            {/* ══ Paso 4 · Datos del tutor ══ */}
                            {paso === 4 && (
                              <fieldset className="space-y-5">
                                <legend className="sr-only">Paso 4: tus datos de contacto</legend>

                                <div className="grid gap-4 sm:grid-cols-2">
                                  <div className="space-y-2">
                                    <Label htmlFor="tutorName">Tu nombre completo *</Label>
                                    <Input
                                      id="tutorName"
                                      value={form.tutorName}
                                      onChange={(evento) => actualizar("tutorName", evento.target.value)}
                                      placeholder="Ej. María Rodríguez"
                                      autoComplete="name"
                                      required
                                      aria-invalid={Boolean(errores.tutorName) || undefined}
                                      aria-describedby={errores.tutorName ? "error-tutorName" : undefined}
                                      className="h-11 rounded-xl"
                                    />
                                    {errores.tutorName && (
                                      <p id="error-tutorName" className="text-sm text-destructive">
                                        {errores.tutorName}
                                      </p>
                                    )}
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="email">Correo electrónico *</Label>
                                    <Input
                                      id="email"
                                      type="email"
                                      value={form.email}
                                      onChange={(evento) => actualizar("email", evento.target.value)}
                                      placeholder="maria@ejemplo.cr"
                                      autoComplete="email"
                                      required
                                      aria-invalid={Boolean(errores.email) || undefined}
                                      aria-describedby={errores.email ? "error-email" : undefined}
                                      className="h-11 rounded-xl"
                                    />
                                    {errores.email && (
                                      <p id="error-email" className="text-sm text-destructive">
                                        {errores.email}
                                      </p>
                                    )}
                                  </div>
                                </div>

                                <div className="space-y-2">
                                  <Label htmlFor="phone">Teléfono *</Label>
                                  <Input
                                    id="phone"
                                    type="tel"
                                    inputMode="tel"
                                    value={form.phone}
                                    onChange={(evento) => actualizar("phone", evento.target.value)}
                                    placeholder="8888-0000"
                                    autoComplete="tel"
                                    required
                                    aria-invalid={Boolean(errores.phone) || undefined}
                                    aria-describedby={errores.phone ? "error-phone" : undefined}
                                    className="h-11 rounded-xl"
                                  />
                                  {errores.phone && (
                                    <p id="error-phone" className="text-sm text-destructive">
                                      {errores.phone}
                                    </p>
                                  )}
                                </div>

                                <div className="space-y-2">
                                  <Label htmlFor="notes">Notas para el equipo (opcional)</Label>
                                  <Textarea
                                    id="notes"
                                    value={form.notes}
                                    onChange={(evento) => actualizar("notes", evento.target.value)}
                                    rows={4}
                                    maxLength={500}
                                    placeholder="Cuéntanos síntomas, dificultades de movilidad o si tu mascota se pone nerviosa en las consultas…"
                                    aria-describedby={errores.notes ? "error-notes contador-notes" : "contador-notes"}
                                    className="rounded-xl"
                                  />
                                  <p id="contador-notes" className="text-xs text-muted-foreground">
                                    {form.notes.length}/500 caracteres
                                  </p>
                                  {errores.notes && (
                                    <p id="error-notes" className="text-sm text-destructive">
                                      {errores.notes}
                                    </p>
                                  )}
                                </div>

                                <div className="space-y-1.5">
                                  <div className="flex items-start gap-3">
                                    <Checkbox
                                      id="consent"
                                      checked={form.consent}
                                      onCheckedChange={(marcado) => actualizar("consent", marcado === true)}
                                      aria-invalid={Boolean(errores.consent) || undefined}
                                      aria-describedby={errores.consent ? "error-consent" : undefined}
                                      className="mt-0.5 size-5"
                                    />
                                    <Label htmlFor="consent" className="text-sm font-normal leading-snug">
                                      Acepto ser contactado por LONGIVET para coordinar esta cita *
                                    </Label>
                                  </div>
                                  {errores.consent && (
                                    <p id="error-consent" className="text-sm text-destructive">
                                      {errores.consent}
                                    </p>
                                  )}
                                </div>

                                {/* Resumen de la cita */}
                                <dl className="rounded-2xl bg-brand-sand p-4 text-sm dark:bg-muted">
                                  <h4 className="mb-2 text-sm font-bold text-foreground">Resumen de tu cita</h4>
                                  <div className="space-y-1.5">
                                    <FilaResumen
                                      termino="Mascota"
                                      valor={
                                        `${form.petName.trim()}${form.breed.trim() ? ` · ${form.breed.trim()}` : ""}` ||
                                        "—"
                                      }
                                    />
                                    <FilaResumen termino="Servicio" valor={servicioElegido?.label ?? "—"} />
                                    <FilaResumen termino="Profesional" valor={profesionalElegido?.label ?? "—"} />
                                    <FilaResumen
                                      termino="Fecha"
                                      valor={form.date ? formatFechaLarga(form.date) : "—"}
                                    />
                                    <FilaResumen termino="Hora" valor={form.timeSlot ? `${form.timeSlot} h` : "—"} />
                                  </div>
                                </dl>

                                <Button
                                  type="submit"
                                  disabled={enviando}
                                  className="h-12 w-full rounded-xl bg-brand-teal-dark text-base font-bold text-white hover:bg-brand-teal"
                                >
                                  {enviando ? (
                                    <>
                                      <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                                      Confirmando…
                                    </>
                                  ) : (
                                    <>
                                      <CalendarCheck className="h-5 w-5" aria-hidden="true" />
                                      Confirmar reserva
                                    </>
                                  )}
                                </Button>
                              </fieldset>
                            )}
                          </motion.div>
                        </AnimatePresence>

                        {/* Navegación */}
                        <div className="mt-8 flex items-center justify-between gap-3">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={retroceder}
                            disabled={paso === 1 || enviando}
                            aria-label="Volver al paso anterior"
                            className="h-11 rounded-xl"
                          >
                            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                            Atrás
                          </Button>
                          {paso < PASOS.length ? (
                            <Button type="button" onClick={avanzar} className="h-11 rounded-xl">
                              Continuar
                              <ChevronRight className="h-4 w-4" aria-hidden="true" />
                            </Button>
                          ) : (
                            <p className="text-sm text-muted-foreground">Último paso: confirma tu reserva.</p>
                          )}
                        </div>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* ── Consulta / cancelación de una cita existente por código ── */}
              <AppointmentLookup />
            </div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
