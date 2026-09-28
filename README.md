# LONGEVET · Servicios Veterinarios (Especialidad en Geriatría)

Sitio web oficial y sistema de reservas WhatsApp-First para **LONGEVET - Hospital & Servicios Veterinarios**.

## 🛠️ Stack Tecnológico

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router) + React 19
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS 4 + Radix UI + shadcn/ui
- **Arquitectura**: **Database-less & WhatsApp-First** (cero dependencias externas, cero costos de base de datos)
- **Animaciones**: Framer Motion
- **Iconografía**: Lucide React
- **Validaciones**: Zod + React Hook Form

## 🚀 Despliegue en Vercel (1 Clic)

1. Conecta tu cuenta de Vercel con el repositorio: `https://github.com/owllain/longivet`.
2. Haz clic en **Deploy**.
3. **¡Listo!** No necesitas configurar bases de datos, contraseñas ni variables de entorno. Vercel compila el proyecto directamente en segundos.

## 📱 Flujo de Citas (WhatsApp-First)

1. El tutor completa los 4 pasos del asistente (Mascota → Servicio → Horario → Datos).
2. Se genera un código único de confirmación (ej. `LV-DRKVOC`) y se guarda en el navegador del cliente.
3. Se arma automáticamente un mensaje estructurado con todos los datos clínicos y de contacto.
4. Se abre **WhatsApp** con el mensaje listo para enviar al equipo de LONGEVET.
5. La clínica confirma la cita y coordina detalles directamente con el tutor.
6. El tutor puede consultar o gestionar la cancelación de su cita directamente desde el sitio con su código o por WhatsApp.

## 💻 Desarrollo Local

1. Instala las dependencias:
   ```bash
   npm install
   ```

2. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
   Abre [http://localhost:3000](http://localhost:3000) en tu navegador.
