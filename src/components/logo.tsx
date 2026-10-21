import Link from "next/link";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={cn("h-8 w-8", className)}
    >
      <rect width="32" height="32" rx="9" fill="#D9FF43" />
      <path
        d="M9.5 10.75h13.25L12.2 21.25h10.3"
        stroke="#0A0B05"
        strokeWidth="3.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Zupona AI home"
      className={cn(
        "group inline-flex items-center gap-2.5 transition-opacity hover:opacity-90",
        className,
      )}
    >
      <LogoMark />
      <span className="font-display text-[20px] font-semibold tracking-[-0.045em] text-paper">
        zupona
      </span>
      <span className="mb-1.5 inline-flex h-[17px] items-center rounded-[4px] border border-white/15 bg-white/[0.05] px-1.5 text-[9px] font-bold uppercase tracking-[0.14em] text-white/60">
        ai
      </span>
    </Link>
  );
}
