import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "dark" | "outlineLight";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 disabled:pointer-events-none disabled:opacity-40 whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "bg-lime text-[#0a0b05] hover:bg-[#e7ff8c] active:scale-[0.985] shadow-[0_0_0_1px_rgba(217,255,67,0.2),0_12px_30px_-12px_rgba(217,255,67,0.55)]",
  secondary:
    "border border-white/12 bg-white/[0.04] text-paper hover:border-white/25 hover:bg-white/[0.08] active:scale-[0.985]",
  ghost: "text-white/65 hover:text-paper hover:bg-white/[0.05]",
  dark: "bg-ink text-paper hover:bg-[#14161a] active:scale-[0.985]",
  outlineLight:
    "border border-black/20 text-ink hover:border-black/50 hover:bg-black/[0.04] active:scale-[0.985]",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[12px]",
  md: "h-11 px-5 text-[13.5px]",
  lg: "h-12 px-6 text-sm",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ComponentProps<"button"> & { variant?: Variant; size?: Size }) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  );
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ComponentProps<typeof Link> & {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </Link>
  );
}
