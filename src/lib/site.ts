const whatsappNumber = "50671399239";
const whatsappDefaultMessage = "Hola Dra. Junibeth, quiero agendar una consulta veterinaria a domicilio en Cartago y San José para mi mascota.";
export const site = {
  name: "LONGIVET",
  legalName: "LONGIVET Servicios Veterinarios",
  tagline: "Medicina geriátrica veterinaria a domicilio",
  description: "Medicina geriátrica veterinaria a domicilio en Cartago y San José. Atención y seguimiento con la Dra. Junibeth González Ramírez, manejo del dolor y cuidado personalizado para mascotas senior.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://longivet.vercel.app",
  phone: "+506 7139 9239",
  phoneHref: "tel:+50671399239",
  whatsappNumber, whatsappDefaultMessage,
  whatsappHref: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappDefaultMessage)}`,
  coverage: "Cartago, San José y zonas cercanas, previa consulta de cobertura",
  hours: [
    { days: "Lunes a viernes", time: "8:00 a. m. – 6:00 p. m." },
    { days: "Sábados", time: "9:00 a. m. – 4:00 p. m." },
    { days: "Domingos", time: "Sin consultas programadas" },
  ],
  social: {
    facebook: "https://facebook.com/longivet.cr",
    instagram: "https://www.instagram.com/paquito_zagua/",
    tiktok: "https://tiktok.com/@longivet.cr",
  },
} as const;
export const navLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#servicios", label: "Servicios" },
  { href: "#tarifas", label: "Tarifas" },
  { href: "#programa-senior", label: "Planes Senior" },
  { href: "#equipo", label: "Tu veterinaria" },
  { href: "#agendar", label: "Agendar cita" },
  { href: "#galeria", label: "Pacientes" },
  { href: "#faq", label: "Preguntas frecuentes" },
] as const;
export function buildWhatsAppUrl(message: string = site.whatsappDefaultMessage) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
