import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { MobileStickyBar } from "@/components/layout/mobile-sticky-bar";
import { BackToTop, ScrollProgress } from "@/components/layout/ux-details";
import { FloatingWhatsapp } from "@/components/layout/floating-whatsapp";
import { Hero } from "@/components/sections/hero";
import { StatsStrip } from "@/components/sections/stats-strip";
import { Services } from "@/components/sections/services";
import { SeniorProgram } from "@/components/sections/senior-program";
import { Triage } from "@/components/sections/triage";
import { Team } from "@/components/sections/team";
import { Testimonials } from "@/components/sections/testimonials";
import { Recursos } from "@/components/sections/recursos";
import { Contact } from "@/components/sections/contact";
import ShowcaseGallery from "@/components/gallery/showcase-gallery";
import FaqSection from "@/components/faq/faq-section";
import BookingSection from "@/components/booking/booking-section";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollProgress />
      <Navbar />
      <main id="contenido" className="flex-1">
        {/* Hero dual-path: ruta planificada + ruta de urgencia (Ley de Hick) */}
        <Hero />
        {/* Validación cuantitativa de confianza */}
        <StatsStrip />
        {/* Catálogo de servicios con énfasis geriátrico */}
        <Services />
        {/* Galería interactiva de instalaciones y casos */}
        <ShowcaseGallery />
        {/* Programa de membresías senior */}
        <SeniorProgram />
        {/* Triaje digital de sintomatología */}
        <Triage />
        {/* Equipo médico y credenciales (E-E-A-T) */}
        <Team />
        {/* Prueba social */}
        <Testimonials />
        {/* Biblioteca senior: guías expandibles */}
        <Recursos />
        {/* Preguntas frecuentes con búsqueda y esquema FAQPage */}
        <FaqSection />
        {/* Asistente de reservas multipaso (Ley de Miller) */}
        <BookingSection />
        {/* Ubicación, horarios y canal de urgencias */}
        <Contact />
      </main>
      <Footer />
      {/* Espacio para la barra fija móvil (Ley de Fitts) sin tapar el footer */}
      <div aria-hidden className="h-[76px] md:hidden" />
      <MobileStickyBar />
      <BackToTop />
      {/* Botón flotante de WhatsApp (solo escritorio) */}
      <FloatingWhatsapp />
    </div>
  );
}
