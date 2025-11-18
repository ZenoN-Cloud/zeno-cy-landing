"use client";


import { sectionsCopy } from "@/content/sections";
import { translations } from "@/content/translations";
import { useLanguage } from "@/context/LanguageContext";
import { Hero } from "@/components/sections/Hero";
import { DemoLink } from "@/components/sections/DemoLink";
import { PrivacyHook } from "@/components/sections/PrivacyHook";
import { FeatureRoadmap } from "@/components/sections/FeatureRoadmap";

import { FoundersCircle } from "@/components/sections/FoundersCircle";
import { LanguageMenu } from "@/components/sections/LanguageMenu";

export default function Home() {
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage as keyof typeof translations] || translations.en;
  const { roadmap } = sectionsCopy;
  
  const hero = {
    ...sectionsCopy.hero,
    ...t.hero,
  };
  
  const founderCta = {
    ...sectionsCopy.founderCta,
    ...t.founderCta,
  };
  
  const privacy = sectionsCopy.privacy;

  return (
    <div className="relative overflow-hidden bg-transparent">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute -top-24 left-1/3 h-96 w-96 rounded-full bg-lime-300 blur-[180px]" />
        <div className="absolute top-1/4 -right-20 h-[28rem] w-[28rem] rounded-full bg-emerald-400 blur-[220px]" />
      </div>
      <main className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-col gap-20 px-6 py-14 sm:px-12 md:px-16">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 shadow-lg shadow-black/30 ring-1 ring-white/20">
              <img
                src="/logo_zeno.png"
                alt="Zeno CY logo"
                className="h-8 w-8 rounded-full object-cover"
              />
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
                Zeno CY
              </p>
              <p className="text-base text-slate-200">
                GDPR-first fintech automation
              </p>
            </div>
          </div>
          <LanguageMenu />
        </header>

        <Hero content={hero} />
        <DemoLink />
        <PrivacyHook content={privacy} />
        <FeatureRoadmap content={roadmap} />
        {/* <TrustSignals content={trust} /> */}
        <FoundersCircle content={founderCta} />
      </main>
    </div>
  );
}
