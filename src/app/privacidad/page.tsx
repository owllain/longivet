import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: "Cómo LONGIVET utiliza los datos para coordinar la atención veterinaria a domicilio y cómo ejercer tus derechos.",
  alternates: { canonical: "/privacidad" },
  openGraph: { title: "Política de privacidad | LONGIVET", url: "/privacidad" },
};

export default function PrivacyPage() {
  return <LegalPage title="Política de privacidad" intro="Te explicamos qué información utilizamos y para qué, cuando consultas por la atención veterinaria de tu mascota.">
    <section><h2>1. Responsable y contacto</h2><p>La Dra. Junibeth González Ramírez, bajo el nombre comercial LONGIVET, es responsable del uso de los datos que recibe para coordinar y prestar la atención veterinaria a domicilio en Costa Rica. Puedes dirigir tus consultas sobre privacidad al WhatsApp +506 7139 9239.</p></section>
    <section><h2>2. Información que compartes</h2><p>Podemos recibir tu nombre, teléfono de WhatsApp, zona y dirección de visita, datos de tu mascota, motivo de consulta, preferencias de horario y antecedentes que decidas proporcionar. Pedimos la información necesaria para organizar la atención. Los campos opcionales del formulario pueden dejarse en blanco.</p></section>
    <section><h2>3. Formulario y finalidad</h2><p>El formulario prepara un mensaje en tu navegador; no crea una cuenta ni una reserva automática. Al continuar, los datos del mensaje se pasan a WhatsApp. Debes pulsar enviar allí para que la doctora los reciba. Utilizamos la información para responder, confirmar cobertura, coordinar citas y dar seguimiento a la atención solicitada. No implica autorización para publicidad.</p></section>
    <section><h2>4. Servicios externos y preferencias</h2><p>WhatsApp, Instagram y Dailymotion tienen sus propias políticas de privacidad. La portada del video se carga desde Dailymotion y el reproductor se activa al pulsar reproducir; el proveedor puede recibir datos de conexión y utilizar sus tecnologías de almacenamiento. El sitio recuerda la preferencia de apariencia en el navegador. El alojamiento puede registrar datos técnicos, como la dirección IP, para operar y proteger el servicio.</p></section>
    <section><h2>5. Uso, conservación y comunicación</h2><p>La información recibida se limita a la coordinación y al seguimiento clínico o administrativo que corresponda, durante el tiempo necesario para esas finalidades y las obligaciones aplicables. No vendemos tus datos. Si una atención requiere compartir información con un laboratorio u otro profesional, te informaremos y solicitaremos la autorización que corresponda. La publicación de imágenes o historias identificables requiere autorización separada.</p></section>
    <section><h2>6. Tus derechos</h2><p>Puedes solicitar acceso, corrección o supresión de tus datos, o retirar una autorización, por WhatsApp. Se verificará tu identidad de forma proporcional a la solicitud. La supresión puede estar limitada por obligaciones de conservación aplicables; en ese caso se te explicará el motivo. Estas solicitudes se atenderán conforme a la Ley costarricense n.º 8968 y demás normativa aplicable.</p></section>
    <section><h2>7. Actualizaciones</h2><p>Publicaremos los cambios en esta página con su fecha de actualización. Si cambia la finalidad para la que se solicitan datos, se informará y se recabará la autorización necesaria antes de utilizarlos para esa nueva finalidad.</p></section>
  </LegalPage>;
}
