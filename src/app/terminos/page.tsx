import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";

export const metadata: Metadata = {
  title: "Términos de atención",
  description: "Condiciones básicas para coordinar visitas, planes senior y pagos de la atención veterinaria a domicilio de LONGIVET.",
  alternates: { canonical: "/terminos" },
  openGraph: { title: "Términos de atención | LONGIVET", url: "/terminos" },
};

export default function TermsPage() {
  return <LegalPage title="Términos de atención" intro="Información para coordinar con claridad la visita y el cuidado de tu mascota.">
    <section><h2>1. Servicio a domicilio</h2><p>LONGIVET ofrece atención veterinaria programada con la Dra. Junibeth González Ramírez, colegiada #002640, en Cartago, San José y zonas cercanas, previa confirmación de cobertura. No contamos con un establecimiento de atención al público. Los procedimientos que requieran otras instalaciones se valoran y coordinan según cada paciente.</p></section>
    <section><h2>2. Solicitud y confirmación</h2><p>Las citas se acuerdan por WhatsApp. Completar el formulario, elegir una fecha o abrir el mensaje no reserva un espacio. La visita queda acordada cuando la doctora confirma contigo fecha, horario, cobertura y condiciones de atención. Horarios de consulta: lunes a viernes de 8 a. m. a 6 p. m. y sábados de 9 a. m. a 4 p. m.</p></section>
    <section><h2>3. Tarifas, planes y pagos</h2><p>Los precios se expresan en colones costarricenses. Los planes son paquetes de los servicios indicados, con el ahorro mostrado respecto de sus precios individuales; no son mensualidades ni suscripciones automáticas. Los controles con plazo de 15 días se coordinan dentro de ese período. Medicamentos, estudios adicionales y cualquier costo de traslado aplicable se comunican antes de su aceptación. Se aceptan SINPE Móvil y transferencias bancarias; los datos de pago se facilitan directamente al coordinar.</p></section>
    <section><h2>4. Preparación y cambios de cita</h2><p>Comparte información precisa sobre la dirección, el acceso al hogar, los antecedentes y la medicación de tu mascota. Prepara un espacio seguro para la valoración y sigue las indicaciones específicas de la doctora. Si necesitas cancelar o reprogramar, avisa por WhatsApp con la mayor anticipación posible. Cualquier condición económica particular se informará antes de acordar el servicio.</p></section>
    <section><h2>5. Valoración y seguimiento</h2><p>El plan de atención depende de la valoración profesional y de la evolución de cada paciente. Los materiales del sitio y los mensajes informativos no sustituyen esa valoración ni garantizan un resultado clínico. Los tiempos de entrega de laboratorio se coordinan según los exámenes solicitados. Cada procedimiento que lo requiera tendrá su consentimiento específico.</p></section>
    <section><h2>6. Alcance de la atención</h2><p>El servicio es de consulta programada y no ofrece atención de emergencias. Ante una emergencia, contacta un centro veterinario que disponga de ese servicio; no esperes una confirmación de cita por esta página.</p></section>
    <section><h2>7. Consultas, privacidad y derechos</h2><p>Para aclaraciones sobre la atención, presupuestos o pagos, contacta a la doctora por WhatsApp. El tratamiento de datos se describe en la <a href="/privacidad">política de privacidad</a>. Estas condiciones se interpretan conforme a la normativa costarricense y no limitan los derechos que la legislación reconoce a las personas consumidoras. La sola navegación por este sitio no constituye contratación de una consulta.</p></section>
  </LegalPage>;
}
