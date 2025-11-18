import Image from "next/image";
import { TrustContent } from "@/content/sections";

export function TrustSignals({ content }: { content: TrustContent }) {
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/40 p-8 text-white">
      <p className="text-sm uppercase tracking-[0.3em] text-lime-200">Partners</p>
      <div className="mt-6 grid gap-6 sm:grid-cols-3">
        {content.partners.map((partner) => (
          <div key={partner.name} className="rounded-2xl border border-white/10 p-4 text-center text-slate-300">
            <div className="mx-auto h-16 w-32">
              <Image src={partner.logo} alt={partner.name} width={200} height={80} className="h-full w-full object-contain" />
            </div>
            <p className="mt-3 text-sm font-semibold text-white">{partner.name}</p>
            {partner.status === "placeholder" && (
              <span className="text-xs text-slate-500">Pending confirmation</span>
            )}
          </div>
        ))}
      </div>
      <blockquote className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 text-lg italic text-slate-200">
        “{content.quote.body}”
        <footer className="mt-4 text-sm not-italic text-slate-400">
          — {content.quote.author}, {content.quote.role}
        </footer>
      </blockquote>
    </section>
  );
}

