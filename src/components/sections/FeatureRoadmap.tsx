"use client";

import { RoadmapContent } from "@/content/sections";
import { translations } from "@/content/translations";
import { useLanguage } from "@/context/LanguageContext";

export function FeatureRoadmap({ content }: { content: RoadmapContent }) {
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage as keyof typeof translations] || translations.en;
  
  const roadmapData = t.roadmap || {
    eyebrow: "BUILD ROADMAP",
    title: "Shipping weekly with your feedback",
    subtitle: "Have a feature request? Add it in the form below.",
    currentTitle: "In the demo today",
    upcomingTitle: "Coming soon",
    current: content.current,
    upcoming: content.upcoming,
  };

  return (
    <section className="rounded-3xl border border-white/10 bg-slate-950/50 p-8 text-white">
      <header className="flex flex-col gap-1">
        <p className="text-sm uppercase tracking-[0.3em] text-lime-200">
          {roadmapData.eyebrow || "BUILD ROADMAP"}
        </p>
        <h2 className="text-3xl font-semibold">{roadmapData.title}</h2>
      </header>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Column title={roadmapData.currentTitle} items={roadmapData.current || content.current} />
        <Column title={roadmapData.upcomingTitle} items={roadmapData.upcoming || content.upcoming} />
      </div>
      <p className="mt-6 text-sm text-slate-400">
        {roadmapData.subtitle}
      </p>
    </section>
  );
}

function Column({ title, items }: { title: string; items: RoadmapContent["current"] }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <h3 className="text-lg font-semibold">{title}</h3>
      <ul className="mt-4 space-y-4">
        {items.map((item) => (
          <li key={item.label} className="rounded-xl border border-white/10 p-4">
            <p className="text-base font-semibold">{item.label}</p>
            <p className="text-sm text-slate-300">{item.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
