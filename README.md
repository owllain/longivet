# LONGIVET · Servicios Veterinarios (Especialidad en Geriatría)

Sitio web oficial y sistema de reservas de citas para **LONGIVET - Hospital & Servicios Veterinarios**.

## 🛠️ Stack Tecnológico

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router) + React 19
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS 4 + Radix UI + shadcn/ui
- **Base de Datos & ORM**: PostgreSQL + [Prisma ORM](https://www.prisma.io/)
- **Animaciones**: Framer Motion
- **Iconografía**: Lucide React
- **Validaciones**: Zod + React Hook Form

## 🚀 Despliegue en Vercel

1. **Subir a GitHub**:
   El proyecto ya está configurado para desplegarse automáticamente desde tu repositorio de GitHub.

2. **Crear Base de Datos PostgreSQL gratuita**:
   Puedes crear una base de datos PostgreSQL en cuestión de segundos en:
   - [Neon](https://neon.tech/) (Recomendado, 1-click integration con Vercel)
   - [Supabase](https://supabase.com/)

3. **Configurar en Vercel**:
   - Conecta tu repositorio en Vercel.
   - En **Settings > Environment Variables**, agrega:
     ```env
     DATABASE_URL="tu_cadena_de_conexion_postgresql"
     ```
   - ¡Listo! Vercel ejecutará automáticamente `prisma generate && next build`.

4. **Sincronizar las tablas en producción**:
   Una vez configurada la variable `DATABASE_URL`, ejecuta desde tu terminal para crear las tablas en la base de datos:
   ```bash
   npx prisma db push
   ```

## 💻 Desarrollo Local

1. Clona el repositorio e instala las dependencias:
   ```bash
   npm install
   ```

2. Copia el archivo `.env.example` a `.env`:
   ```bash
   cp .env.example .env
   ```

3. Genera el cliente de Prisma:
   ```bash
   npm run db:generate
   ```

4. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
   Abre [http://localhost:3000](http://localhost:3000) en tu navegador.
