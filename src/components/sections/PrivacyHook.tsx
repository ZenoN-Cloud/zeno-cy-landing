"use client";

import { SectionCopy } from "@/content/sections";
import { translations } from "@/content/translations";
import { useLanguage } from "@/context/LanguageContext";
import { Shield, Cpu, EyeOff } from "lucide-react";

const iconMap = {
  shield: Shield,
  chip: Cpu,
  eyeOff: EyeOff,
};

export function PrivacyHook({ content }: { content: SectionCopy["privacy"] }) {
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage as keyof typeof translations] || translations.en;
  
  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-8 text-white shadow-2xl backdrop-blur-lg">
      <div className="flex flex-wrap items-center gap-3 text-sm uppercase tracking-[0.3em] text-lime-200">
        <span className="rounded-full border border-lime-200/40 px-3 py-1 text-xs text-lime-100">
          {content.badge}
        </span>
        <span className="text-white/70">Privacy-first</span>
      </div>
      <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
        {content.title}
      </h2>
      <div className="mt-8 grid gap-6 sm:grid-cols-3">
        {[
          { key: "zeroStorage", icon: "shield" as const },
          { key: "localProcessing", icon: "chip" as const },
          { key: "noTracking", icon: "eyeOff" as const },
        ].map((item) => {
          const Icon = iconMap[item.icon];
          const pillar = t.privacy?.pillars?.[item.key as keyof typeof t.privacy.pillars] || content.pillars.find((p) => p.icon === item.icon);
          return (
            <article key={item.key} className="rounded-2xl border border-white/10 bg-slate-900/40 p-5">
              <Icon className="h-9 w-9 text-lime-200" />
              <h3 className="mt-4 text-lg font-semibold">{pillar?.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{pillar?.description}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
