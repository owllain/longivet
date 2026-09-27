export const appointmentServices = [
  "Consulta geriátrica", "Consulta general", "Manejo del dolor y movilidad",
  "Vacunación", "Toma de muestras para laboratorio", "Seguimiento", "Cuidados paliativos",
] as const;
export function validatePreference(date = "", time = "", now = new Date()): string {
  if (date && (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !Number.isFinite(Date.parse(`${date}T12:00:00Z`)) || new Date(`${date}T12:00:00Z`).toISOString().slice(0, 10) !== date)) return "Elige una fecha válida.";
  if (time && !/^([01]\d|2[0-3]):[0-5]\d$/.test(time)) return "Elige una hora válida.";
  const today = now.toLocaleDateString("en-CA", { timeZone: "America/Costa_Rica" });
  if (date && date < today) return "Elige una fecha de hoy en adelante.";
  const day = date ? new Date(`${date}T12:00:00Z`).getUTCDay() : null;
  if (day === 0) return "Las visitas se coordinan de lunes a sábado. Elige otro día o deja la fecha sin seleccionar.";
  if (time && date) {
    const start = day === 6 ? "09:00" : "08:00";
    const end = day === 6 ? "16:00" : "18:00";
    if (time < start || time >= end) return `Elige una hora entre ${start} y antes de ${end}, o indica una preferencia alternativa.`;
    const currentTime = now.toLocaleTimeString("en-GB", { timeZone: "America/Costa_Rica", hour: "2-digit", minute: "2-digit", hourCycle: "h23" });
    if (date === today && time <= currentTime) return "Esa hora ya pasó. Elige una hora posterior o deja el horario sin seleccionar.";
  }
  return "";
}
export function validateAppointment(data: Record<string, unknown>, now = new Date()): string {
  const limits: Record<string, number> = { tutor: 100, pet: 100, zone: 160, speciesAge: 100, service: 100, date: 10, time: 5, alternateTime: 30, alternateDays: 30, notes: 1200, consent: 2 };
  for (const [key, limit] of Object.entries(limits)) {
    const value = data[key];
    if (value === undefined) continue;
    if (typeof value !== "string" || value.length > limit) return "Revisa los datos: alguno de los campos tiene un formato o una longitud no permitidos.";
    // Evita controles invisibles y saltos que suplanten etiquetas del mensaje.
    if (Array.from(value).some(char => {
      const code = char.charCodeAt(0);
      return (code < 32 && !(key === "notes" && [9, 10, 13].includes(code))) || code === 127 || (code >= 0x202a && code <= 0x202e) || (code >= 0x2066 && code <= 0x2069);
    })) return "Revisa los campos: contienen caracteres de control no permitidos.";
  }
  for (const key of ["tutor", "pet", "zone"]) {
    if (!(data[key] as string | undefined)?.trim()) return "Completa tu nombre, el nombre de tu mascota y la zona de visita.";
  }
  const choices: Record<string, readonly string[]> = {
    service: appointmentServices,
    alternateTime: ["Sin preferencia", "Mañana", "Tarde", "Noche"],
    alternateDays: ["Sin preferencia", "Entresemana", "Fin de semana"],
  };
  for (const [key, options] of Object.entries(choices)) {
    if (data[key] && !options.includes(data[key] as string)) return "Elige una de las opciones disponibles en el formulario.";
  }
  if (data.consent !== "on") return "Acepta la política de privacidad para preparar el mensaje.";
  return validatePreference(data.date as string | undefined, data.time as string | undefined, now);
}
export function buildAppointmentMessage(data: Record<string, string>): string {
  return [
    "Hola Dra. Junibeth, quisiera coordinar una visita veterinaria a domicilio.",
    `Mi nombre: ${data.tutor?.trim() || ""}`,
    `Mascota: ${data.pet?.trim() || ""}`,
    `Zona: ${data.zone?.trim() || ""}`,
    data.speciesAge?.trim() && `Especie y edad: ${data.speciesAge.trim()}`,
    `Servicio: ${data.service || "Por definir con la doctora"}`,
    data.date && `Día preferido: ${data.date.split("-").reverse().join("/")}`,
    data.time && `Hora preferida: ${data.time}`,
    `Alternativa horaria: ${data.alternateTime || "Sin preferencia"}`,
    `Días alternativos: ${data.alternateDays || "Sin preferencia"}`,
    data.notes?.trim() && `Comentarios: ${data.notes.trim()}`,
    "Quedo pendiente de confirmar cobertura, fecha y logística de la visita.",
  ].filter(Boolean).join("\n");
}
