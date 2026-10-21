"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { ButtonLink } from "@/components/ui/button";
import { USER_KEY } from "@/lib/generation";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/store", label: "Storefront", dot: true },
  { href: "/studio", label: "Studio" },
  { href: "/library", label: "Library" },
  { href: "/pricing", label: "Pricing" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(USER_KEY);
      if (!stored) return;
      const parsed = JSON.parse(stored) as { email?: unknown };
      if (typeof parsed.email === "string" && parsed.email) {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from localStorage
        setUser(parsed.email);
      }
    } catch {
      // Local storage may be unavailable.
    }
  }, []);

  function signOut() {
    try {
      window.localStorage.removeItem(USER_KEY);
    } catch {
      // Ignore storage failures.
    }
    setUser(null);
    setOpen(false);
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-300",
        scrolled
          ? "border-white/[0.07] bg-ink/80 backdrop-blur-xl"
          : "border-transparent bg-ink/40 backdrop-blur-md",
      )}
    >
      <div className="shell flex h-[68px] items-center justify-between gap-6">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {nav.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors",
                  active
                    ? "bg-white/[0.07] text-paper"
                    : "text-white/55 hover:bg-white/[0.04] hover:text-paper",
                )}
              >
                {item.label}
                {item.dot ? (
                  <span className="absolute right-1.5 top-1.5 h-1 w-1 rounded-full bg-lime" />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 sm:flex">
          {user ? (
            <>
              <span className="flex h-8 max-w-[190px] items-center gap-2 rounded-full border border-white/[0.09] bg-white/[0.03] py-1 pl-1.5 pr-3 text-[11.5px] text-white/55">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-lilac to-sky text-[9px] font-bold text-ink">
                  {user.charAt(0).toUpperCase()}
                </span>
                <span className="truncate">{user.split("@")[0]}</span>
              </span>
              <button
                type="button"
                onClick={signOut}
                className="rounded-full px-3 py-2 text-[12.5px] font-medium text-white/40 transition-colors hover:text-paper"
              >
                Sign out
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="rounded-full px-3.5 py-2 text-[13px] font-medium text-white/60 transition-colors hover:text-paper"
            >
              Sign in
            </Link>
          )}
          <ButtonLink href="/studio" size="sm" className="group">
            Open studio
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </ButtonLink>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-paper sm:hidden"
        >
          {open ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-white/[0.07] bg-ink/95 px-5 pb-6 pt-4 backdrop-blur-xl sm:hidden">
          <nav className="flex flex-col" aria-label="Mobile">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between border-b border-white/[0.06] py-3.5 text-[15px] text-white/80"
              >
                {item.label}
                <ArrowUpRight className="h-4 w-4 text-white/30" />
              </Link>
            ))}
            {user ? (
              <div className="flex items-center justify-between py-3.5">
                <span className="flex items-center gap-2.5 text-[15px] text-white/80">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-lilac to-sky text-[10px] font-bold text-ink">
                    {user.charAt(0).toUpperCase()}
                  </span>
                  <span className="max-w-[190px] truncate">
                    {user.split("@")[0]}
                  </span>
                </span>
                <button
                  type="button"
                  onClick={signOut}
                  className="text-[12px] font-medium text-white/40 transition-colors hover:text-paper"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="flex items-center justify-between py-3.5 text-[15px] text-white/80"
              >
                Sign in
                <ArrowUpRight className="h-4 w-4 text-white/30" />
              </Link>
            )}
          </nav>
          <ButtonLink
            href="/studio"
            onClick={() => setOpen(false)}
            className="mt-4 w-full"
          >
            Open the studio
            <ArrowUpRight className="h-4 w-4" />
          </ButtonLink>
        </div>
      ) : null}
    </header>
  );
}
