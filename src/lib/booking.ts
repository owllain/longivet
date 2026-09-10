/* ─────────────────────────────────────────────────────────────
   LONGIVET · Módulo «Agendar cita»
   Constantes, validación (zod) y helpers compartidos entre
   cliente y servidor. REGLA: este archivo NO debe importar
   la base de datos (@/lib/db) ni ningún SDK de servidor.
   ───────────────────────────────────────────────────────────── */

import { z } from "zod";

/* ── Catálogo de servicios reservables (sin iconos para evitar acoplamiento) ── */
export const services = [
  {
    id: "geriatria",
    label: "Consulta geriátrica integral",
    desc: "Evaluación completa para mascotas 7+: movilidad, dolor, laboratorio y plan personalizado.",
    priceHint: "Desde ₡28.000",
  },
  {
    id: "preventivo",
    label: "Chequeo preventivo y vacunación",
    desc: "Examen físico, vacunas al día y plan de desparasitación.",
    priceHint: "Desde ₡18.000",
  },
  {
    id: "dolor",
    label: "Manejo del dolor y movilidad",
    desc: "Protocolos multimodales para artritis y movilidad reducida.",
    priceHint: "Desde ₡25.000",
  },
  {
    id: "odontologia",
    label: "Odontología veterinaria",
    desc: "Profilaxis dental con sedación monitorizada.",
    priceHint: "Desde ₡45.000",
  },
  {
    id: "diagnostico",
    label: "Diagnóstico por imagen y laboratorio",
    desc: "Radiografía digital y laboratorio con resultados el mismo día.",
    priceHint: "Desde ₡20.000",
  },
  {
    id: "paliativo",
    label: "Cuidado paliativo y calidad de vida",
    desc: "Acompañamiento compasivo en la etapa final.",
    priceHint: "Evaluación personalizada",
  },
] as const;

/* ── Preselección desde el catálogo visual de Servicios (#servicios) ──
   La sección de Servicios muestra 8 especialidades; el asistente maneja
   6 servicios reservables. Este mapa traduce el título EXACTO del catálogo
   (services.tsx, campo `titulo`) al id reservable.
   ⚠️ MANTENIMIENTO: si se renombra un `titulo` en services.tsx,
   actualizar este mapa (la búsqueda devuelve null y el enlace «Agendar»
   de esa tarjeta dejaría de preseleccionar). */
export type ServicioReservableId = (typeof services)[number]["id"];

export const serviceMapFromCatalog: Readonly<
  Record<string, ServicioReservableId>
> = {
  "Geriatría y medicina senior": "geriatria",
  "Manejo del dolor y movilidad": "dolor",
  "Medicina interna": "geriatria",
  "Medicina preventiva": "preventivo",
  "Diagnóstico por imagen": "diagnostico",
  "Laboratorio clínico": "diagnostico",
  "Odontología veterinaria": "odontologia",
  "Cuidado paliativo y duelo": "paliativo",
};

/** Título del catálogo de Servicios → id reservable (null si no hay mapeo). */
export function servicioReservableDeCatalogo(
  tituloCatalogo: string,
): ServicioReservableId | null {
  return serviceMapFromCatalog[tituloCatalogo] ?? null;
}

/* ── Evento global para preseleccionar servicio en el asistente ──
   Las tarjetas de #servicios disparan CustomEvent detail { serviceId }
   y el asistente de reserva (booking-section.tsx) lo escucha. */
export const EVENTO_PRESELECCION_SERVICIO =
  "longivet:preseleccionar-servicio" as const;

/* ── Profesionales disponibles ── */
export const vets = [
  {
    id: "sin-preferencia",
    label: "Sin preferencia",
    role: "Te asignamos el primer espacio disponible",
  },
  {
    id: "dra-solis",
    label: "Dra. Mariana Solís",
    role: "Geriatría y medicina interna",
  },
  {
    id: "dr-rojas",
    label: "Dr. Andrés Rojas",
    role: "Cirugía y rehabilitación",
  },
  {
    id: "dra-ferrara",
    label: "Dra. Lucía Ferrara",
    role: "Medicina felina y dolor",
  },
] as const;

/* ── Franjas horarias (24 h, formato HH:mm) ── */
export const morningSlots = ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30"] as const;
export const afternoonSlots = ["14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"] as const;

/* ── Validación de la reserva (compartida cliente/servidor) ── */
export const appointmentSchema = z.object({
  petName: z.string().trim().min(2, "Escribe el nombre de tu mascota (mínimo 2 letras)."),
  species: z.enum(["perro", "gato", "otro"]),
  breed: z.string().max(60, "La raza no puede superar los 60 caracteres.").optional().or(z.literal("")),
  ageYears: z.number().min(0, "Edad fuera de rango.").max(30, "Edad fuera de rango.").nullable(),
  service: z.string().min(2, "Selecciona el servicio que tu mascota necesita."),
  preferredVet: z.string(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Selecciona una fecha válida."),
  timeSlot: z.string().regex(/^\d{2}:\d{2}$/, "Selecciona un horario válido."),
  tutorName: z.string().trim().min(3, "Escribe tu nombre completo."),
  email: z.string().email("Escribe un correo electrónico válido."),
  phone: z
    .string()
    .trim()
    .min(8, "El teléfono debe tener al menos 8 dígitos.")
    .regex(/^[\d\s+()-]+$/, "El teléfono solo acepta números y los símbolos + ( ) -"),
  notes: z.string().max(500, "Las notas no pueden superar los 500 caracteres.").optional().or(z.literal("")),
  consent: z.literal(true),
});

export type AppointmentInput = z.infer<typeof appointmentSchema>;

/* ── Helpers ── */

/**
 * Formatea una fecha ISO «YYYY-MM-DD» como texto largo en español de Costa Rica.
 * Ej.: «Martes, 4 de marzo».
 *
 * ⚠️ HIDRATACIÓN: usa Intl/locale y por eso SOLO debe invocarse en el CLIENTE,
 * después de una interacción del usuario (resumen del paso 4 o pantalla de
 * confirmación). Nunca durante el primer render del servidor.
 *
 * Se usa timeZone «UTC» al parsear para evitar que la zona local corrija la
 * fecha un día atrás (YYYY-MM-DD se interpreta como medianoche UTC).
 */
export function formatFechaLarga(iso: string): string {
  const partes = iso.split("-");
  const fecha = new Date(Date.UTC(Number(partes[0]), Number(partes[1]) - 1, Number(partes[2])));
  const texto = new Intl.DateTimeFormat("es-CR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: "UTC",
  }).format(fecha);
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

const CODIGO_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ23456789";

/**
 * Genera un código de confirmación «LV-XXXXXX» (letras A–Z y dígitos 2–9).
 *
 * ⚠️ SERVIDOR únicamente: depende de crypto.getRandomValues. Nunca llamar
 * durante el render del cliente.
 */
export function generarCodigo(): string {
  const bytes = new Uint8Array(6);
  crypto.getRandomValues(bytes);
  let codigo = "";
  for (const byte of bytes) {
    codigo += CODIGO_CHARS.charAt(byte % CODIGO_CHARS.length);
  }
  return `LV-${codigo}`;
}
