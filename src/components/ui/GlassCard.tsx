import { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

export function GlassCard({ children, className }: PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={cn(
        "rounded-[32px] border border-white/10 bg-white/10 p-4 shadow-[0_25px_120px_rgba(15,23,42,0.4)] backdrop-blur-2xl",
        className,
      )}
    >
      {children}
    </div>
  );
}

