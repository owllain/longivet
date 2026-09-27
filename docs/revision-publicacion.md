# Revisión previa a publicación

## Cambios de esta revisión

- Historias: carrusel manual con deslizamiento, flechas, indicadores y teclado (izquierda, derecha, Inicio, Fin). Respeta movimiento reducido. No avanza mientras alguien lee.
- Responsive: menú compacto hasta 1536 px, marca flexible, barra móvil con tarifas y una única acción de WhatsApp, espacio inferior que considera el área segura del dispositivo. Las tarifas ya tienen tarjetas móviles y tabla para pantallas mayores.
- Formulario: límites, tipos, opciones permitidas, fechas reales, horas y consentimiento verificados antes de preparar el mensaje. Se rechazan controles invisibles y saltos en campos de una línea. La URL de WhatsApp conserva un destino fijo y codifica el texto.
- Datos estructurados: escape de `<` antes de insertarlos como JSON-LD.
- Cabeceras: restricciones de orígenes mediante CSP, bloqueo de incrustación del sitio en marcos externos, bloqueo de objetos, `nosniff`, política de referencia y permisos de cámara/micrófono/geolocalización desactivados. La entrevista de Dailymotion está permitida.
- Dependencias: eliminadas las bibliotecas sin uso de edición MDX y resaltado de código; actualizado Sharp. Auditoría de npm tras la actualización: cero vulnerabilidades conocidas.
- Se conserva `package-lock.json` como único bloqueo de dependencias, siguiendo el uso de npm del README; se retira el bloqueo antiguo de Bun para evitar instalaciones con versiones distintas.
- Compilación: se vuelve a exigir comprobación de tipos. Los ejemplos de WebSocket ajenos al sitio quedan excluidos del proyecto de producción.
- SEO: sitemap con inicio y páginas legales; robots generado a partir del dominio configurado. Se evita publicar una fecha ficticia de modificación con cada compilación. Ya existen título, descripción, URL canónica, datos estructurados y metadatos sociales.

## Límites de la revisión

Comprobaciones realizadas: compilación de producción con TypeScript, ESLint en los archivos modificados y diez pruebas automatizadas satisfactorias (formulario, codificación de mensajes, escape de JSON-LD, cabeceras y carga de entrevista).

El sitio no recibe ni almacena solicitudes del formulario en un servidor: prepara el mensaje localmente y la persona lo envía desde WhatsApp. La validación del navegador no sería una barrera suficiente para una futura API; si se incorpora almacenamiento, correo o reservas, será necesaria validación en servidor, controles de abuso y autorización adecuados.

La CSP admite scripts y estilos inline por compatibilidad con las páginas estáticas de Next y el tema. Reduce orígenes y posibilidades de incrustación; no constituye una protección completa contra XSS. Mantener escape de contenido y no renderizar HTML proporcionado por visitantes. No se trata de una auditoría de penetración ni de una garantía de ausencia de vulnerabilidades.

No se completó la prueba visual/interactiva en navegador por la restricción de acceso de esta sesión. Antes de publicar, comprobar a 320, 375, 768, 1024, 1280 y 1536 px: ausencia de desplazamiento horizontal de la página, menú completo, tarjetas de tarifas, apertura y envío del formulario, deslizamiento y teclado del carrusel, reproducción de la entrevista, modo oscuro, zoom al 200 % y controles de móvil. Verificar las cabeceras aplicadas por el alojamiento y que la CSP no bloquee recursos legítimos.

## Publicación y captación

1. Configurar `NEXT_PUBLIC_SITE_URL` con el dominio definitivo, sin ruta ni barra final, y reconstruir. Comprobar que canonical, robots y sitemap usan ese dominio.
2. Configurar DNS y HTTPS en el alojamiento. En Vercel el certificado se emite automáticamente tras verificar correctamente el dominio; no hace falta comprar otro por defecto.
3. Verificar Google Search Console con `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` y enviar `/sitemap.xml`. Revisar indexación y datos estructurados; tener metadatos no garantiza posicionamiento ni resultados enriquecidos.
4. Confirmar autorizaciones de fotos y testimonios y datos comerciales antes de publicar.
5. Tras validar móvil y publicar, medir clics de WhatsApp y consultas recibidas antes de seguir añadiendo elementos visuales. No enviar nombres, síntomas ni contenido del formulario a herramientas de analítica.

Referencias: [CSP de Next.js](https://nextjs.org/docs/app/guides/content-security-policy), [datos estructurados de Next.js](https://nextjs.org/docs/app/guides/json-ld), [sitemaps de Google](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap), [HTTPS en Vercel](https://vercel.com/docs/domains/working-with-ssl).
