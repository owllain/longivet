import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { MobileStickyBar } from "@/components/layout/mobile-sticky-bar";
import { ScrollProgress } from "@/components/layout/ux-details";
import { TrustOverview, VisitOverview } from "@/components/sections/visit-overview";
import { Testimonials } from "@/components/sections/testimonials";
import { Hero } from "@/components/sections/hero";
import { StatsStrip } from "@/components/sections/stats-strip";
import { Services } from "@/components/sections/services";
import { PricingSection } from "@/components/sections/pricing-section";
import { SeniorProgram } from "@/components/sections/senior-program";
import { Team } from "@/components/sections/team";
import { Contact } from "@/components/sections/contact";
import ShowcaseGallery from "@/components/gallery/showcase-gallery";
import FaqSection from "@/components/faq/faq-section";
import BookingSection from "@/components/booking/booking-section";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollProgress />
      <Navbar />
      <main tabIndex={-1} id="contenido" className="min-w-0 flex-1">
        <Hero />
        <TrustOverview />
        <Services />
        <VisitOverview />
        <PricingSection />
        <SeniorProgram />
        <Team />
        <BookingSection />
        <ShowcaseGallery />
        <Testimonials />
        <StatsStrip />
        <FaqSection />
        <Contact />
      </main>
      <Footer />
      {/* Espacio para la barra fija móvil (Ley de Fitts) sin tapar el footer */}
      <div aria-hidden className="h-[calc(76px+env(safe-area-inset-bottom))] md:hidden" />
      <MobileStickyBar />

    </div>
  );
}
