import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function PrimaryButton({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={cn(
        "inline-flex items-center justify-center rounded-full bg-lime-300 px-6 py-3 text-base font-semibold text-slate-900 transition hover:scale-[1.01] hover:bg-lime-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-lime-200",
        "disabled:cursor-not-allowed disabled:opacity-60",
        className,
      )}
    />
  );
}

