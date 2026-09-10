"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

/**
 * Interruptor de tema claro/oscuro.
 * Sin estado de montaje: los iconos se intercambian por CSS (clase `dark`
 * en <html> gestionada por next-themes), así no hay desajuste de hidratación.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Cambiar entre modo claro y modo oscuro"
      title="Modo claro / oscuro"
      className={
        className ??
        "inline-flex size-11 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:border-brand-teal hover:text-brand-teal-dark"
      }
    >
      <Sun
        aria-hidden="true"
        className="hidden size-5 dark:block"
      />
      <Moon
        aria-hidden="true"
        className="block size-5 dark:hidden"
      />
    </button>
  );
}
