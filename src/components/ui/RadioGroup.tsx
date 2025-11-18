import { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

export function RadioGroup({ children }: PropsWithChildren) {
  return <div className="flex flex-col gap-3">{children}</div>;
}

export function RadioCard({
  label,
  description,
  value,
  isActive,
  onSelect,
}: {
  label: string;
  description: string;
  value: string;
  isActive: boolean;
  onSelect: (value: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(value)}
      className={cn(
        "w-full rounded-2xl border px-4 py-3 text-left transition",
        isActive ? "border-lime-200 bg-white/10" : "border-white/10 hover:border-white/20",
      )}
    >
      <p className="text-base font-semibold text-white">{label}</p>
      <p className="text-sm text-slate-400">{description}</p>
    </button>
  );
}

