"use client";

import { useState } from "react";
import { FounderCTAContent } from "@/content/sections";
import { FieldLabel } from "@/components/ui/FieldLabel";
import { Input } from "@/components/ui/Input";
import { RadioGroup, RadioCard } from "@/components/ui/RadioGroup";
import { MultiSelect } from "@/components/ui/MultiSelect";
import { Textarea } from "@/components/ui/Textarea";
import { PrimaryButton } from "@/components/ui/PrimaryButton";

const bankOptions = [
  { label: "Hellenic Bank", value: "hellenic" },
  { label: "Bank of Cyprus", value: "boc" },
  { label: "Alpha Bank", value: "alpha" },
  { label: "Eurobank", value: "eurobank" },
  { label: "Other", value: "other" },
];

export function FoundersCircle({ content }: { content: FounderCTAContent & { eyebrow: string } }) {
  const [form, setForm] = useState({
    email: "",
    companySize: "",
    banks: [] as string[],
    pain: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const updateField = (key: keyof typeof form, value: string | string[]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.email || !form.companySize || !form.banks.length) {
      setStatus("error");
      return;
    }
    try {
      setStatus("loading");
      // Create mailto link with form data
      const subject = encodeURIComponent("Beta Access Request - Zeno CY");
      const body = encodeURIComponent(`
Email: ${form.email}
Company Size: ${form.companySize}
Banks: ${form.banks.join(", ")}
Feature Requests: ${form.pain || "None"}
Submitted: ${new Date().toLocaleString()}
      `);
      
      // Open email client
      window.open(`mailto:max@zeno-cy.com?subject=${subject}&body=${body}`, '_blank');
      
      // Simulate successful response
      const response = { ok: true };
      if (!response.ok) throw new Error("Request failed");
      setStatus("success");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <section id="founders-form" className="rounded-3xl border border-white/10 bg-slate-950/70 p-8 text-white">
      <p className="text-sm uppercase tracking-[0.3em] text-lime-200">{content.eyebrow}</p>
      <div className="mt-4 flex flex-col gap-6 md:flex-row">
        <div className="md:w-1/2">
          <h2 className="text-3xl font-semibold">{content.headline}</h2>
          <p className="mt-3 text-lg text-slate-300">{content.subcopy}</p>
          <p className="mt-4 text-sm text-slate-400">{content.slotsRemaining}</p>
          <p className="mt-1 text-sm text-slate-400">{content.conciergeDetails}</p>
        </div>
        <form className="md:w-1/2 space-y-5" onSubmit={handleSubmit}>
          <div>
            <FieldLabel>Email</FieldLabel>
            <Input
              type="email"
              placeholder="you@company.com"
              value={form.email}
              onChange={(event) => updateField("email", event.target.value)}
              required
            />
          </div>
          <div>
            <FieldLabel>Company size</FieldLabel>
            <RadioGroup>
              {[
                { label: "1–5", description: "Small boutique", value: "1-5" },
                { label: "6–20", description: "Growing team", value: "6-20" },
                { label: "21+", description: "Agency scale", value: "21+" },
              ].map((option) => (
                <RadioCard
                  key={option.value}
                  label={option.label}
                  description={option.description}
                  value={option.value}
                  isActive={form.companySize === option.value}
                  onSelect={(value) => updateField("companySize", value)}
                />
              ))}
            </RadioGroup>
          </div>
          <div>
            <FieldLabel>Which banks do you service?</FieldLabel>
            <MultiSelect
              options={bankOptions}
              selected={form.banks}
              onChange={(value) => updateField("banks", value)}
            />
          </div>
          <div>
            <FieldLabel>Feature requests or CSV pain points</FieldLabel>
            <Textarea
              rows={4}
              placeholder="Share CSV volume, tricky formats, missing features..."
              value={form.pain}
              onChange={(event) => updateField("pain", event.target.value)}
            />
          </div>
          <div className="space-y-2">
            <PrimaryButton disabled={status === "loading" || status === "success"}>
              {status === "success" ? "Request received" : content.ctaLabel}
            </PrimaryButton>
            <p className="text-xs text-slate-400">{content.privacyNote}</p>
            {status === "error" && (
              <p className="text-xs text-red-300">Check required fields and try again.</p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}

