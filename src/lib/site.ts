/* ─────────────────────────────────────────────────────────────
   LONGIVET · Configuración central compartida
   Fuente única de verdad para contacto, horarios y navegación.
   ───────────────────────────────────────────────────────────── */

export const site = {
  name: "LONGIVET",
  legalName: "LONGIVET Servicios Veterinarios",
  tagline: "Medicina veterinaria con énfasis en geriatría",
  description:
    "Clínica veterinaria especializada en el cuidado de mascotas senior: geriatría, manejo del dolor, rehabilitación, odontología y medicina preventiva. Atención con cita y guía Telefónica permanente.",
  url: "https://longivet.cr",
  phone: "+506 7139 9239",
  phoneHref: "tel:+50671399239",
  emergencyPhone: "+506 7139 9239",
  emergencyPhoneHref: "tel:+50671399239",
  whatsappNumber: "50671399239",
  whatsappHref:
    "https://wa.me/50671399239?text=" +
    encodeURIComponent("Hola Dra. Junibeth, quiero información sobre la atención geriátrica para mi mascota senior."),
  email: "hola@longivet.cr",
  address: {
    street: "Avenida Esqualí 145, San Rafael",
    locality: "Escazú",
    region: "San José",
    postalCode: "10201",
    country: "CR",
    countryName: "Costa Rica",
  },
  addressFull: "Avenida Esqualí 145, San Rafael, Escazú, San José",
  mapsQuery: "Avenida+Esquali+145+Escazu+San+Jose+Costa+Rica",
  hours: [
    { days: "Lunes a Viernes", time: "8:00 a. m. – 6:00 p. m." },
    { days: "Sábados", time: "9:00 a. m. – 2:00 p. m." },
    { days: "Domingos", time: "Guardia telefónica y urgencias" },
  ],
  hoursSchema: "Mo-Sa 08:00-18:00",
  social: {
    facebook: "https://facebook.com/longivet.cr",
    instagram: "https://instagram.com/longivet.cr",
    tiktok: "https://tiktok.com/@longivet.cr",
  },
  emergencyNote:
    "Si tu mascota presenta un riesgo vital, llámanos de inmediato: evaluamos el caso y te guiamos durante el traslado.",
} as const;

export const navLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#servicios", label: "Servicios" },
  { href: "#galeria", label: "Galería" },
  { href: "#programa-senior", label: "Programa Senior" },
  { href: "#equipo", label: "Equipo" },
  { href: "#faq", label: "Preguntas frecuentes" },
] as const;

export const stats = [
  { value: "+12", label: "años cuidando generaciones", icon: "award" },
  { value: "8.500+", label: "pacientes atendidos", icon: "paw" },
  { value: "94 %", label: "pacientes senior estables", icon: "heart" },
  { value: "5", label: "especialidades certificadas", icon: "stethoscope" },
] as const;

export const timeSlotsAm = ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30"];
export const timeSlotsPm = ["14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"];

export function buildWhatsAppGreeting(petName?: string, service?: string) {
  const base = `Hola ${site.name}`;
  const detail =
    petName && service
      ? `, quiero agendar ${service} para ${petName}.`
      : ", quiero agendar una cita para mi mascota.";
  return encodeURIComponent(base + detail);
}
