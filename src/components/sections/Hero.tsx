"use client";

import { HeroContent } from "@/content/sections";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { useState, useEffect } from "react";

export function Hero({ content }: { content: HeroContent }) {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
      <div className="space-y-6">
        <p className="text-sm uppercase tracking-[0.4em] text-lime-200">
          {content.eyebrow}
        </p>
        <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl md:text-6xl">
          {content.headline}
        </h1>
        <p className="text-lg text-slate-300 sm:text-xl">
          {content.subcopy}
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <PrimaryButton onClick={() => document.getElementById('founders-form')?.scrollIntoView({ behavior: 'smooth' })}>
            {content.ctaLabel}
          </PrimaryButton>
          <span className="text-sm text-slate-400">
            {content.privacyNote}
          </span>
        </div>
        <dl className="grid grid-cols-3 gap-2 md:gap-4 text-center sm:text-left">
          {content.stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-white/10 p-4">
              <dt className="text-xs uppercase tracking-[0.3em] text-slate-400">
                {stat.label}
              </dt>
              <dd className="mt-2 text-2xl font-semibold text-white">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
      <GlassCard>
        <div className="relative overflow-hidden rounded-3xl">
          <video
            className="h-full w-full"
            src={content.demoVideo.src}
            poster={content.demoVideo.poster}
            autoPlay={!isMobile}
            muted
            loop
            playsInline
            preload={isMobile ? "none" : "metadata"}
            width="1920"
            height="1080"
          />
          <div className="absolute inset-0 rounded-3xl border border-white/20" />
          <div className="absolute bottom-4 left-4 rounded-full bg-black/60 px-4 py-1 text-sm text-white">
            {content.perWeekSavings}
          </div>
        </div>
      </GlassCard>
    </section>
  );
}

