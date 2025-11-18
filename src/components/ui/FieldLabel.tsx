import { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

export function FieldLabel({ children, className }: PropsWithChildren<{ className?: string }>) {
  return (
    <label className={cn("text-sm font-medium text-slate-200", className)}>
      {children}
    </label>
  );
}

