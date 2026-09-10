"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";

/** Barra fina de progreso de lectura bajo el header (decorativa + aria-hidden). */
export function ScrollProgress() {
  const [progreso, setProgreso] = useState(0);

  useEffect(() => {
    let rafId = 0;
    const update = () => {
      const doc = document.documentElement;
      const total = doc.scrollHeight - doc.clientHeight;
      setProgreso(total > 0 ? Math.min(1, doc.scrollTop / total) : 0);
    };
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div aria-hidden="true" className="fixed inset-x-0 top-0 z-[60] h-1 bg-transparent">
      <div
        className="h-full origin-left bg-gradient-to-r from-brand-teal via-brand-teal to-brand-gold transition-transform duration-150 ease-out"
        style={{ transform: `scaleX(${progreso})` }}
      />
    </div>
  );
}

/** Botón flotante «volver arriba»: aparece tras 600 px de scroll. */
export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    let rafId = 0;
    const update = () => setVisible(window.scrollY > 600);
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.9 }}
          transition={{ duration: 0.25 }}
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: reduce ? "auto" : "smooth",
            })
          }
          aria-label="Volver arriba"
          title="Volver arriba"
          className="fixed bottom-[5.5rem] right-4 z-40 inline-flex size-11 items-center justify-center rounded-full border border-border bg-card/90 text-brand-navy shadow-lg backdrop-blur transition-colors hover:border-brand-teal hover:text-brand-teal-dark md:bottom-24 md:right-6 dark:text-foreground"
        >
          <ArrowUp aria-hidden="true" className="size-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
