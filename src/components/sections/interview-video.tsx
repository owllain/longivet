"use client";
import { useState } from "react";
import { Play } from "lucide-react";
export function InterviewVideo() {
  const [started, setStarted] = useState(false);
  return <div className="relative aspect-video overflow-hidden rounded-2xl border bg-brand-navy">
    {started ? <iframe src="https://www.dailymotion.com/embed/video/x9u4q44?mute=false" title="Entrevista a la Dra. Junibeth en Su Lado Positivo, Canal 13" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen className="h-full w-full border-0" /> :
      <button type="button" onClick={() => setStarted(true)} aria-label="Reproducir entrevista de la Dra. Junibeth en Canal 13" className="group relative flex h-full w-full items-center justify-center text-white focus-visible:outline-4 focus-visible:outline-offset-[-4px] focus-visible:outline-brand-gold">
        <img src="https://www.dailymotion.com/thumbnail/video/x9u4q44" alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        <span className="absolute inset-0 bg-black/25 transition group-hover:bg-black/40" />
        <span className="relative flex flex-col items-center gap-3"><span className="flex size-16 items-center justify-center rounded-full bg-white text-brand-navy shadow-xl"><Play className="ml-1 size-7 fill-current" aria-hidden /></span><span className="rounded-full bg-black/65 px-4 py-2 text-sm font-bold">Reproducir entrevista</span></span>
      </button>}
  </div>;
}
