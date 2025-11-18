"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type LanguageContextType = {
  currentLanguage: string;
  setLanguage: (lang: string) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function getBrowserLanguage(): string {
  if (typeof window === "undefined") return "en";
  const browserLang = navigator.language.split("-")[0];
  const supportedLangs = ["en", "ru", "el", "de", "nl", "pt", "es", "cy", "cs"];
  return supportedLangs.includes(browserLang) ? browserLang : "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState(getBrowserLanguage);

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage: setCurrentLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}