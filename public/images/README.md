# Imágenes del sitio LONGIVET

Estas imágenes son **placeholders generados con IA** para que el sitio se vea
completo durante el desarrollo.

## Cómo reemplazarlas con tus fotos reales

Sube tus fotos a esta carpeta (`/public/images/`) manteniendo **exactamente
los mismos nombres de archivo**. El sitio las detectará automáticamente, sin
tocar código.

| Archivo | Sección | Recomendado |
|---|---|---|
| `hero-senior-dog.png` | Hero (portada) + Open Graph | 1344×768 o superior, horizontal |
| `gallery-1.png` | Galería · Área felina | 1344×768, horizontal |
| `gallery-2.png` | Galería · Rehabilitación | 1344×768, horizontal |
| `gallery-3.png` | Galería · Instalaciones | 1344×768, horizontal |
| `gallery-4.png` | Galería · Consulta/diagnóstico | 1344×768, horizontal |
| `gallery-5.png` | Galería · Laboratorio | 1344×768, horizontal |
| `senior-comfort.png` | Programa Senior (imagen lateral) | 1152×864, horizontal |

## Consejos para las fotos definitivas

- Fotografía real de la clínica, el equipo y pacientes (nada de stock obvio).
- Buena luz natural, tonos cálidos, animales serenos (coherente con Fear Free).
- Si cambias la extensión (jpg en vez de png), actualiza también las rutas en:
  `src/data/gallery.ts`, `src/components/sections/hero.tsx`,
  `src/components/sections/senior-program.tsx` y `src/app/layout.tsx` (Open Graph).
- Los textos alternativos (alt) están en español y pensados para accesibilidad:
  actualízalos si el contenido de la foto cambia.
