import Image from "next/image";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-xl border border-brand-teal/25 bg-[#FAF7F2] p-1 shadow-sm",
        className || "size-11"
      )}
    >
      <Image
        src="/images/tab-logo.png"
        alt="Isotipo Dra. Junibeth González Ramírez"
        width={64}
        height={88}
        className="h-full w-auto object-contain"
        priority
      />
    </span>
  );
}

export function Logo({
  className,
  tone = "dark",
  showSubtitle = true,
}: {
  className?: string;
  /** dark = texto oscuro para fondos claros · light = texto blanco para fondos oscuros */
  tone?: "dark" | "light";
  showSubtitle?: boolean;
}) {
  return (
    <span className={cn("inline-flex min-w-0 items-center gap-2 sm:gap-3", className)}>
      <span className="relative flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-brand-teal/25 bg-[#FAF7F2] p-1 shadow-sm ring-1 ring-black/5">
        <Image
          src="/images/tab-logo.png"
          alt="Dra. Junibeth González Ramírez — Isotipo"
          width={64}
          height={88}
          className="h-full w-auto object-contain"
          priority
        />
      </span>
      <span className="flex min-w-0 flex-col leading-tight">
        <span
          className={cn(
            "text-sm sm:text-lg font-extrabold tracking-tight",
            tone === "dark"
              ? "text-brand-navy dark:text-foreground"
              : "text-white"
          )}
        >
          Dra. Junibeth González
        </span>
        {showSubtitle && (
          <span
            className={cn(
              "text-[10px] sm:text-[10.5px] font-bold uppercase tracking-[0.08em] sm:tracking-[0.14em]",
              tone === "dark"
                ? "text-brand-teal dark:text-brand-teal-soft"
                : "text-brand-gold"
            )}
          >
            Medicina Geriátrica Veterinaria
          </span>
        )}
      </span>
    </span>
  );
}
