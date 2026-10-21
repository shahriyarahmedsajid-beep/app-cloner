import Link from "next/link";
import { Logo } from "@/components/logo";
import { NewsletterForm } from "@/components/newsletter-form";
import { footerColumns } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.07] bg-ink">
      <div className="pointer-events-none absolute -bottom-40 left-1/2 h-72 w-[780px] -translate-x-1/2 rounded-full bg-lime/[0.055] blur-[110px]" />
      <div className="shell relative py-14 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-[14px] leading-relaxed text-white/45">
              The creative storefront and studio for people who ship. Discover a
              workflow, make it yours, publish everywhere.
            </p>
            <div className="mt-8 max-w-[300px]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/35">
                Product updates, no noise
              </p>
              <NewsletterForm />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/35">
                  {column.title}
                </p>
                <ul className="mt-4 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-[13.5px] text-white/55 transition-colors hover:text-paper"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-5 border-t border-white/[0.07] pt-7 text-[11.5px] text-white/30 md:flex-row md:items-start md:justify-between">
          <div className="max-w-2xl space-y-2">
            <p>© 2026 Zupona Labs. A concept product, built for the demo web.</p>
            <p className="max-w-xl leading-relaxed text-white/25">
              Zupona is an independent prototype and is not affiliated with or
              endorsed by GitHub, Google, OpenAI, Kuaishou, Higgsfield, InVideo or
              any model provider named on this site. Model names are trademarks of
              their owners. Demo renders are generated locally, not by external AI.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href="/research" className="transition-colors hover:text-white/60">
              Research
            </Link>
            <Link href="/legal#terms" className="transition-colors hover:text-white/60">
              Terms
            </Link>
            <Link href="/legal#privacy" className="transition-colors hover:text-white/60">
              Privacy
            </Link>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-lime" />
              All systems demo
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
