"use client";

import { useState } from "react";
import { languageOptions } from "@/content/languages";
import { useLanguage } from "@/context/LanguageContext";
import { Globe } from "lucide-react";

export function LanguageMenu() {
  const [open, setOpen] = useState(false);
  const { currentLanguage, setLanguage } = useLanguage();
  const activeLanguage = languageOptions.find((lang) => lang.code === currentLanguage) ?? languageOptions[0];

  return (
    <div className="relative">
      <button
        type="button"
        className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10"
        onClick={() => setOpen((prev) => !prev)}
      >
        <Globe size={16} />
        <span>{activeLanguage.flag}</span>
        <span className="hidden sm:inline">{activeLanguage.code.toUpperCase()}</span>
      </button>
      {open && (
        <div className="absolute right-0 mt-3 w-52 rounded-2xl border border-white/15 bg-slate-950/90 p-2 shadow-2xl backdrop-blur z-50">
          <ul className="max-h-80 overflow-y-auto text-sm text-white">
            {languageOptions.map((lang) => (
              <li key={lang.code}>
                <button
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left ${
                    lang.code === currentLanguage ? "bg-white/10" : "hover:bg-white/5"
                  }`}
                  onClick={() => {
                    setLanguage(lang.code);
                    setOpen(false);
                  }}
                >
                  <span>{lang.flag}</span>
                  <span className="flex-1">
                    <span className="font-semibold text-white">{lang.nativeLabel}</span>
                    <span className="block text-xs text-slate-400">{lang.label}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-xs text-slate-400">
            Localized copy coming soon
          </p>
        </div>
      )}
    </div>
  );
}

