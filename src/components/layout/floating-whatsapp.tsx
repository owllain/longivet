"use client";

/* ─────────────────────────────────────────────────────────────
    LONGEVET · Botón flotante de WhatsApp (SOLO escritorio)
   - En móvil no se muestra: MobileStickyBar ya ofrece WhatsApp.
   - Aparece tras 500 px de scroll (listener pasivo + rAF).
   - Pastilla expandible al hover/foco: «¿Consultamos tu caso?»
     (transición de max-width, texto siempre en el DOM con
     aria-label completo en el enlace).
   - AA: icono y texto en brand-navy-deep sobre el verde oficial
     de WhatsApp (#25d366) = 7.4:1 de contraste; blanco sobre ese
     verde daría 1.97:1 y fallaría AA. Único hex arbitrario
     permitido: el verde de marca de WhatsApp.
   - Posición: bottom-6 right-6. BackToTop se reubicó a
     md:bottom-24 para no superponerse en escritorio.
   ───────────────────────────────────────────────────────────── */

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { WhatsappIcon } from "@/components/layout/mobile-sticky-bar";

const SCROLL_PARA_APARECER_PX = 500;

export interface FloatingWhatsappProps {
  /** Mensaje predeterminado para iniciar la conversación */
  message?: string;
  /** Número de WhatsApp opcional con código de país (por defecto el de LONGEVET) */
  phoneNumber?: string;
  /** Texto que se muestra al expandir la pastilla */
  label?: string;
  className?: string;
}

export function FloatingWhatsapp({
  message,
  phoneNumber,
  label = "¿Consultamos tu caso?",
  className,
}: FloatingWhatsappProps = {}) {
  const [visible, setVisible] = useState(false);
  const [expandido, setExpandido] = useState(false);
  const rafId = useRef(0);

  const whatsappHref =
    message || phoneNumber
      ? `https://wa.me/${phoneNumber || site.whatsappNumber}?text=${encodeURIComponent(
          message || site.whatsappDefaultMessage
        )}`
      : site.whatsappHref;

  useEffect(() => {
    const update = () => setVisible(window.scrollY > SCROLL_PARA_APARECER_PX);
    const onScroll = () => {
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Escríbenos por WhatsApp a la Dra. Junibeth (se abre en una pestaña nueva)"
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.9 }}
          transition={{ duration: 0.25 }}
          onMouseEnter={() => setExpandido(true)}
          onMouseLeave={() => setExpandido(false)}
          onFocus={() => setExpandido(true)}
          onBlur={() => setExpandido(false)}
          className={cn(
            "fixed bottom-6 right-6 z-40 hidden h-14 items-center overflow-hidden rounded-full bg-[#25d366] text-brand-navy-deep shadow-xl ring-1 ring-brand-navy-deep/10 md:flex",
            "transition-[max-width,background-color,box-shadow] duration-300 ease-out hover:bg-[#25d366]/90 hover:shadow-2xl",
            expandido ? "max-w-[17rem]" : "max-w-14",
            className
          )}
        >
          <WhatsappIcon className="ml-3.5 size-7 shrink-0" />
          <span
            className={cn(
              "ml-3 whitespace-nowrap text-sm font-bold transition-opacity duration-200",
              expandido ? "opacity-100 delay-150" : "opacity-0"
            )}
          >
            {label}
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
