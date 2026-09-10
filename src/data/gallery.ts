/* ─────────────────────────────────────────────────────────────
   LONGIVET · Datos de la galería interactiva (#galeria)
   6 slides. Las imágenes son placeholders en /public/images/
   (el cliente las reemplazará conservando los mismos nombres).
   ───────────────────────────────────────────────────────────── */

export interface GallerySlide {
  id: string;
  src: string;
  alt: string;
  title: string;
  description: string;
  tag: string;
}

export const gallerySlides: GallerySlide[] = [
  {
    id: "geriatria",
    src: "/images/hero-senior-dog.png",
    alt: "Veterinaria de LONGIVET examinando con delicadeza a un golden retriever senior de hocico canoso",
    title: "Medicina geriátrica especializada",
    description:
      "Chequeos integrales para perros y gatos mayores de 7 años, con planes de detección temprana adaptados a cada especie y estilo de vida.",
    tag: "Geriatría",
  },
  {
    id: "hospital-felino",
    src: "/images/gallery-1.png",
    alt: "Gato tabby senior calmado en sala de examen felina libre de perros",
    title: "Área felina libre de estrés",
    description:
      "Sala exclusiva para gatos, feromonas ambientales y manipulación de bajo estrés certificada.",
    tag: "Hospital felino",
  },
  {
    id: "rehabilitacion",
    src: "/images/gallery-2.png",
    alt: "Perro senior realizando fisioterapia en cinta de correr subacuática",
    title: "Rehabilitación y movilidad",
    description:
      "Cinta subacuática, terapia láser y ejercicios para devolver la alegría de caminar a las articulaciones veteranas.",
    tag: "Rehabilitación",
  },
  {
    id: "instalaciones",
    src: "/images/gallery-3.png",
    alt: "Recepción moderna y cálida de la clínica LONGIVET con madera y plantas",
    title: "Instalaciones pensadas para ellos",
    description:
      "Iluminación cálida, pisos antideslizantes y salas de espera separadas por especie.",
    tag: "Instalaciones",
  },
  {
    id: "diagnostico",
    src: "/images/gallery-4.png",
    alt: "Veterinaria mostrando una radiografía digital a una tutora adulta mayor con su beagle",
    title: "Diagnóstico claro, decisiones tranquilas",
    description:
      "Radiografía digital y laboratorio con resultados el mismo día, explicados sin tecnicismos.",
    tag: "Diagnóstico",
  },
  {
    id: "laboratorio",
    src: "/images/gallery-5.png",
    alt: "Manos enguantadas preparando muestras en el laboratorio clínico veterinario",
    title: "Laboratorio clínico propio",
    description:
      "Hematología, bioquímica y perfil geriátrico completo en minutos, sin derivaciones externas.",
    tag: "Laboratorio",
  },
];
