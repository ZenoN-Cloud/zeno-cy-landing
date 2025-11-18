"use client";

import { motion } from "framer-motion";
import { ArrowRight, FileText, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/content/translations";

export function DemoLink() {
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage as keyof typeof translations]?.demo || translations.en.demo;
  return (
    <motion.section
      className="relative overflow-hidden rounded-3xl border border-lime-200/30 bg-gradient-to-br from-lime-400/10 via-emerald-400/10 to-lime-300/10 p-8 md:p-12"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-2 w-2 rounded-full bg-lime-300/30"
            initial={{ x: -100, y: Math.random() * 400 }}
            animate={{
              x: [null, 800],
              y: [null, Math.random() * 400],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center gap-8 md:flex-row md:justify-between">
        {/* Left side - Animation */}
        <div className="relative flex items-center gap-4">
          {/* Flying documents */}
          <div className="relative">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute"
                initial={{ x: -60, y: i * 15, opacity: 0.3, rotate: -15 }}
                animate={{
                  x: [null, 40, 80],
                  opacity: [0.3, 0.8, 0],
                  rotate: [null, 0, 15],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.4,
                  ease: "easeInOut",
                }}
              >
                <FileText className="h-8 w-8 text-red-400" />
              </motion.div>
            ))}
          </div>

          {/* Zeno processor */}
          <motion.div
            className="relative ml-20 flex h-24 w-24 items-center justify-center rounded-2xl border-2 border-lime-300 bg-lime-400/20 backdrop-blur"
            animate={{
              boxShadow: [
                "0 0 20px rgba(190, 255, 94, 0.3)",
                "0 0 40px rgba(190, 255, 94, 0.6)",
                "0 0 20px rgba(190, 255, 94, 0.3)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="h-10 w-10 text-lime-300" />
          </motion.div>

          {/* Normalized documents */}
          <div className="relative ml-4">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute"
                initial={{ x: 0, y: i * 15, opacity: 0 }}
                animate={{
                  x: [null, 40, 80],
                  opacity: [0, 0.8, 0.3],
                  rotate: [null, 0, 5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.4 + 1,
                  ease: "easeInOut",
                }}
              >
                <FileText className="h-8 w-8 text-lime-300" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right side - CTA */}
        <div className="flex flex-col items-center gap-4 text-center md:items-end md:text-right">
          <div>
            <motion.p
              className="text-sm uppercase tracking-[0.3em] text-lime-200"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {t.badge}
            </motion.p>
            <h3 className="mt-2 text-3xl font-bold text-white md:text-4xl">
              {t.title}
            </h3>
            <p className="mt-2 text-lg text-slate-300">
              {t.subtitle}
            </p>
          </div>

          <motion.a
            href="https://app.zeno-cy.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 rounded-full bg-lime-300 px-8 py-4 text-lg font-semibold text-slate-900 shadow-lg shadow-lime-300/30 transition-all hover:scale-105 hover:bg-lime-200 hover:shadow-xl hover:shadow-lime-300/50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t.cta}
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </motion.a>

          <p className="text-xs text-slate-400">
            {t.note}
          </p>
        </div>
      </div>
    </motion.section>
  );
}
