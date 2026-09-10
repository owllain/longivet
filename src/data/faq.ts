/* ─────────────────────────────────────────────────────────────
   LONGIVET · Preguntas frecuentes (FAQ)
   Fuente única de verdad para la sección #faq, la búsqueda en vivo
   y el JSON-LD de tipo FAQPage. Español de Costa Rica, tono
   cálido-profesional. Sin teléfonos hardcodeados: referencias
   genéricas («nuestra línea de guardia», «nuestro equipo»).
   ───────────────────────────────────────────────────────────── */

export interface FaqItem {
  q: string;
  a: string;
  cat: FaqCategory;
}

export const faqCategories = [
  "Citas y horarios",
  "Geriatría: cuándo y por qué",
  "Servicios y especialidades",
  "Precios y pagos",
  "Urgencias 24/7",
  "Antes de tu visita",
] as const;

export type FaqCategory = (typeof faqCategories)[number];

export const faqItems: FaqItem[] = [
  /* ── Citas y horarios ── */
  {
    cat: "Citas y horarios",
    q: "¿Cómo agendo una cita para mi mascota?",
    a: "Puedes agendar de tres formas: llenando el formulario de citas de nuestra página, escribiéndonos por WhatsApp o llamando directamente a la clínica. Te confirmamos por el mismo medio en pocos minutos y recibirás un recordatorio antes de tu visita. Si es tu primera vez con nosotros, cuéntanos la edad de tu mascota para reservarte el tiempo de consulta adecuado.",
  },
  {
    cat: "Citas y horarios",
    q: "¿Cuáles son los horarios de atención y qué pasa si llego tarde?",
    a: "Atendemos de lunes a viernes de 8:00 a. m. a 6:00 p. m. y sábados de 9:00 a. m. a 2:00 p. m.; los domingos mantenemos guardia telefónica para orientarte. Si llegas con unos minutos de retraso intentamos acomodarte en la misma consulta; si el retraso es mayor, reprogramamos sin costo para no recortar el tiempo de las demás familias.",
  },
  {
    cat: "Citas y horarios",
    q: "¿Puedo traer a mi mascota sin cita?",
    a: "Las consultas programadas funcionan con cita para darte atención completa y sin esperas. Las urgencias se atienden siempre sin cita y de inmediato; en ese caso, llámanos antes de salir para prepararnos y recibirte con el equipo listo. Si no sabes si tu caso es urgente, escríbenos y te orientamos.",
  },
  {
    cat: "Citas y horarios",
    q: "¿Cómo cancelo o reprogramo mi cita sin costo?",
    a: "Avísanos con al menos 24 horas de anticipación por WhatsApp o teléfono y reprogramamos sin ningún cargo: entendemos que los imprevistos pasan, sobre todo con mascotas senior. El espacio que liberas lo asignamos a otra familia que lo espera. También puedes cambiar la fecha desde la confirmación que te enviamos al agendar.",
  },

  /* ── Geriatría: cuándo y por qué ── */
  {
    cat: "Geriatría: cuándo y por qué",
    q: "¿A qué edad se considera senior mi mascota?",
    a: "Depende de la especie y el tamaño: los perros pequeños y medianos entran a la etapa senior alrededor de los 7 años, las razas grandes y gigantes cerca de los 5, y los gatos alrededor de los 10. No significa que estén «viejos», sino que merecen un seguimiento más cercano. Si tu compañero alcanza esas edades, es el momento ideal para una primera valoración geriátrica.",
  },
  {
    cat: "Geriatría: cuándo y por qué",
    q: "¿Cada cuánto debe chequearse una mascota senior y qué incluye el chequeo geriátrico?",
    a: "Recomendamos una valoración geriátrica completa cada 6 meses, porque en esta etapa los cambios pueden avanzar con rapidez. El chequeo incluye hemograma y perfil bioquímico en nuestro laboratorio interno con resultados el mismo día, medición de presión arterial, evaluación de movilidad y articulaciones, y revisión dental. Con esos resultados, el médico arma un plan de cuidado a la medida de tu compañero.",
  },
  {
    cat: "Geriatría: cuándo y por qué",
    q: "¿Qué señales de alerta debo observar en casa?",
    a: "Fíjate si tu mascota tiene menos actividad o ganas de jugar, bebe más agua de lo habitual, aparecen bultos nuevos en la piel, se desorienta o cambia su ciclo de sueño (lo que llamamos disfunción cognitiva) o le cuesta subir escaleras y saltar al sofá. Ninguna de estas señales es «cosas de la edad» que haya que aceptar: todas se pueden evaluar y tratar. Anótalas y coméntalas en la próxima consulta.",
  },
  {
    cat: "Geriatría: cuándo y por qué",
    q: "¿Se puede tratar el dolor y la artritis en perros y gatos senior?",
    a: "Sí, y es de los cambios que más mejora su calidad de vida. Trabajamos con un plan multimodal que combina medicamentos seguros para senior, control de peso, fisioterapia y ajustes en casa como camas ortopédicas o rampas. Los gatos son expertos en ocultar el dolor: si tu gato se acicala menos o ya no salta como antes, vale la pena una valoración.",
  },

  /* ── Servicios y especialidades ── */
  {
    cat: "Servicios y especialidades",
    q: "¿En qué se diferencia la consulta geriátrica de una consulta general?",
    a: "La consulta general resuelve lo puntual: una vacuna, una infección, un malestar. La geriátrica es más extensa: el médico evalúa cada sistema del cuerpo, revisa los resultados de laboratorio, mide la presión y valora movilidad y conducta para detectar enfermedades antes de que den síntomas. Sales con un plan escrito de seguimiento, nutrición y cuidado en casa.",
  },
  {
    cat: "Servicios y especialidades",
    q: "¿Ofrecen rehabilitación y fisioterapia?",
    a: "Sí: contamos con un área de rehabilitación con cinta subacuática y láser terapéutico, ideal para perros y gatos con artritis, en recuperación de cirugías o con poca movilidad. Cada sesión la adapta el equipo según la condición y la resistencia de tu mascota. Muchas familias notan mejoría en el ánimo y en el caminar desde las primeras semanas.",
  },
  {
    cat: "Servicios y especialidades",
    q: "¿Hacen limpiezas dentales en mascotas senior?",
    a: "Sí, la odontología es clave en geriatría porque el dolor bucal suele pasar desapercibido. Realizamos los procedimientos con sedación monitorizada y una evaluación previa completa (sangre y corazón) para reducir los riesgos al máximo. Una boca sana mejora el apetito, el aliento y hasta el ánimo de tu compañero.",
  },
  {
    cat: "Servicios y especialidades",
    q: "¿Cómo atienden a los gatos sin estresarlos?",
    a: "Contamos con una sala de consulta exclusiva para felinos, separada de los perros, con feromonas calmantes, manejo suave y la menor espera posible. El equipo está entrenado en leer las señales de estrés del gato para ajustar el ritmo de la consulta. Llega con el transportador cubierto por una manta ligera: funciona de maravilla.",
  },
  {
    cat: "Servicios y especialidades",
    q: "¿Qué es el cuidado paliativo y cómo puede ayudar a mi mascota?",
    a: "Es el acompañamiento que prioriza la comodidad y la dignidad cuando la enfermedad ya no tiene cura. Nuestro equipo evalúa junto a ti la felicidad, la hidratación, la higiene y la movilidad con una escala de calidad de vida (HHHHHM), y ajusta el plan en cada etapa, siempre con el manejo del dolor como prioridad. Te acompañamos con honestidad y cariño, incluida una despedida digna cuando llegue el momento.",
  },

  /* ── Precios y pagos ── */
  {
    cat: "Precios y pagos",
    q: "¿Qué formas de pago aceptan?",
    a: "Aceptamos efectivo, tarjeta de débito o crédito, transferencia bancaria y SINPE Móvil. Todas las facturas son electrónicas y desglosan el IVA, tal como corresponde en Costa Rica. Puedes pedir la factura a nombre de quien prefieras al finalizar la consulta.",
  },
  {
    cat: "Precios y pagos",
    q: "¿Qué incluyen los Planes Senior?",
    a: "El Plan Integral reúne lo esencial de la geriatría en una cuota pensada para el año: consultas geriátricas periódicas, exámenes de laboratorio, control dental, manejo del dolor y descuentos en procedimientos. Antes de inscribirte hacemos una valoración inicial para recomendarte el plan que de verdad conviene. Pide los detalles y precios actualizados por WhatsApp, sin ningún compromiso.",
  },
  {
    cat: "Precios y pagos",
    q: "¿Tienen descuentos disponibles?",
    a: "Sí: aplicamos un 10 % de descuento a la segunda mascota de la misma familia y un 15 % para mascotas senior adoptadas, porque admiramos mucho esa decisión. Los descuentos se combinan con las promociones vigentes del momento. Menciónalo al agendar y lo aplicamos de inmediato.",
  },
  {
    cat: "Precios y pagos",
    q: "¿Me entregan un presupuesto antes de un procedimiento?",
    a: "Siempre: antes de cualquier cirugía, limpieza dental o estudio complementario recibes un presupuesto detallado por escrito para decidir con calma. Si tu mascota tiene seguro, te ayudamos con los formularios y la documentación que solicita la aseguradora para el reembolso. Sin sorpresas al momento de pagar: así trabajamos.",
  },

  /* ── Urgencias 24/7 ── */
  {
    cat: "Urgencias 24/7",
    q: "¿Qué situaciones se consideran una urgencia veterinaria?",
    a: "Acude de inmediato si tu mascota presenta dificultad para respirar, convulsiones, intenta orinar sin lograrlo, letargo severo, abdomen distendido, signos de intoxicación (vómito, temblores, saliva excesiva) o un traumatismo como una caída o un atropello. Ante la duda, llámanos: es mejor descartar que arrepentirse.",
  },
  {
    cat: "Urgencias 24/7",
    q: "¿Qué hago si mi mascota tiene una emergencia de noche?",
    a: "Llama a nuestra línea de guardia, disponible las 24 horas: un médico responde con una guía telefónica inmediata sobre qué observar, qué hacer (o no hacer) y si conviene trasladarte de una vez. Ten el número guardado en tu teléfono o pegado en la refrigeradora; en una emergencia, cada minuto cuenta.",
  },
  {
    cat: "Urgencias 24/7",
    q: "¿Qué debo hacer durante el traslado a la clínica?",
    a: "Mantén la calma y el vehículo ventilado, y cubre a tu mascota con una manta ligera para darle seguridad sin sofocarla. No le des medicamentos humanos ni comida, aunque parezca mejorarse: varios son tóxicos para perros y gatos. Si puedes, avísanos durante el camino y el equipo de guardia te espera con todo listo.",
  },
  {
    cat: "Urgencias 24/7",
    q: "¿Cuánto tardan en atender a mi mascota al llegar con una urgencia?",
    a: "Al llegar hacemos un triage: una evaluación rápida en menos de 5 minutos que determina la gravedad y el orden de atención. Los casos con riesgo vital pasan primero, aunque hayan llegado después que otros. Sabemos que esperar angustia, así que te mantenemos informado en todo momento.",
  },

  /* ── Antes de tu visita ── */
  {
    cat: "Antes de tu visita",
    q: "¿Cómo preparo a mi mascota para la consulta?",
    a: "Si tu cita incluye análisis de sangre o sedación, retira el alimento unas 4 horas antes, pero el agua nunca debe faltar. Trae el historial médico o cartilla de vacunas, la lista de medicamentos actuales y, si el médico lo pidió, una muestra fresca de orina o heces recién recolectada en un recipiente limpio y tapado. Si no tienes historial previo, no te preocupes: lo abrimos nosotros ese mismo día.",
  },
  {
    cat: "Antes de tu visita",
    q: "¿Cómo transporto a mi perro grande con comodidad y seguridad?",
    a: "Para perros grandes usa un arnés con cinturón de seguridad o una caja de transporte en la parte trasera del vehículo, y lleva una manta: la aprovechamos para ayudarlos a subir si les cuesta saltar. Coloca una superficie antideslizante donde viaje para que no resbale en las curvas. Si tu mascota tiene dificultad para moverse, avísanos al llegar y salimos a ayudarte.",
  },
  {
    cat: "Antes de tu visita",
    q: "¿Qué hago si mi mascota se estresa mucho al ir al veterinario?",
    a: "Agenda una primera visita corta y positiva: pasamos directo a una sala tranquila y pesamos a tu mascota en el piso, sin mesa de exploración. Recomendamos feromonas calmantes en el transportador o en el collar antes de salir y, en gatos, llegar con el transportador cubierto. Cuéntanoslo al reservar y preparamos todo para que sea una buena experiencia.",
  },
];
