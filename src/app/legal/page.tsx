import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check, FileText, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms, privacy & credits",
  description:
    "Plain-language terms, privacy notes and credit rules for the Zupona AI concept prototype.",
};

const sections = [
  { id: "terms", label: "Terms of use" },
  { id: "privacy", label: "Privacy" },
  { id: "credits", label: "Credits & billing" },
  { id: "acceptable-use", label: "Acceptable use" },
  { id: "disclaimers", label: "Disclaimers" },
  { id: "contact", label: "Contact" },
];

function Section({
  id,
  index,
  title,
  children,
}: {
  id: string;
  index: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 border-b border-white/[0.07] pb-10 last:border-0">
      <p className="text-[9.5px] uppercase tracking-[0.14em] text-lime/50">
        {index}
      </p>
      <h2 className="mt-2 font-display text-[26px] font-semibold tracking-[-0.03em] text-paper">
        {title}
      </h2>
      <div className="mt-4 space-y-3.5 text-[12.5px] leading-relaxed text-white/40">
        {children}
      </div>
    </section>
  );
}

export default function LegalPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-white/[0.06] pt-14 md:pt-20">
        <div className="pointer-events-none absolute inset-0 grid-fade opacity-30" />
        <div className="pointer-events-none absolute left-1/2 top-[-80%] h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(196,181,253,0.1),transparent_65%)]" />
        <div className="shell relative pb-12 md:pb-16">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-[11px] text-white/30 transition-colors hover:text-white/60"
          >
            <ArrowLeft className="h-3 w-3" />
            Back home
          </Link>
          <div className="mt-8 grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
            <div>
              <p className="eyebrow mb-4">
                <span className="h-1 w-1 rounded-full bg-lime" />
                Legal · Last updated 21 October 2026
              </p>
              <h1 className="display max-w-2xl text-[42px] leading-[0.96] text-paper sm:text-[56px]">
                The fine print,
                <br />
                <span className="text-white/30">in plain language.</span>
              </h1>
              <p className="pretty mt-5 max-w-xl text-[14px] leading-relaxed text-white/45">
                Zupona is a concept prototype, not a live commercial service.
                These pages explain how the demo behaves, what data it touches and
                how the credit system is meant to work once the product is real.
              </p>
            </div>
            <div className="rounded-[22px] border border-amber-200/15 bg-amber-200/[0.04] p-5">
              <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.13em] text-amber-100/60">
                <Shield className="h-3.5 w-3.5" />
                Prototype notice
              </p>
              <p className="mt-3 text-[11px] leading-relaxed text-white/40">
                Nothing here is a binding commercial contract, legal advice or a
                promise of future terms. No payments are processed and no real
                accounts are created. Production terms would be reviewed by
                counsel before launch.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="shell py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[220px_1fr] lg:gap-16">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <p className="text-[9.5px] font-semibold uppercase tracking-[0.14em] text-white/25">
              On this page
            </p>
            <nav className="mt-4 space-y-1">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="block rounded-lg px-3 py-2 text-[11.5px] text-white/35 transition-colors hover:bg-white/[0.03] hover:text-white/65"
                >
                  {section.label}
                </a>
              ))}
            </nav>
            <div className="mt-6 rounded-xl border border-white/[0.07] bg-white/[0.02] p-3.5">
              <p className="flex items-center gap-1.5 text-[10px] text-white/40">
                <FileText className="h-3 w-3 text-lime/60" />
                Full product docs
              </p>
              <Link
                href="/research"
                className="mt-2 inline-flex items-center gap-1 text-[10px] text-white/30 transition-colors hover:text-white/60"
              >
                Research & PRD
                <ArrowUpRight className="h-2.5 w-2.5" />
              </Link>
            </div>
          </aside>

          <div className="max-w-2xl space-y-10">
            <Section id="terms" index="01" title="Terms of use">
              <p>
                By using this prototype you agree to use it for lawful,
                exploratory purposes. The service is provided “as is” and “as
                available”, without warranties of any kind. Features, pricing and
                availability may change or disappear at any time.
              </p>
              <p>
                You keep ownership of prompts and other content you submit. You
                grant the demo permission to process prompts locally in your
                browser and, when you run a generation, on the local mock server
                that renders the result. Zupona claims no ownership of your inputs
                or outputs.
              </p>
              <p>
                Demo outputs are synthetic SVG artwork generated deterministically
                from a job ID and prompt. They are illustrative only and are not
                produced by any third-party AI model.
              </p>
              <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/30">
                  In production, terms would additionally cover
                </p>
                <ul className="mt-3 space-y-1.5">
                  {[
                    "Account eligibility and security",
                    "Subscription renewal and cancellation",
                    "Commercial usage rights per plan",
                    "IP indemnity and takedown process",
                    "Limitation of liability and dispute resolution",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-[11px]">
                      <Check className="mt-0.5 h-3 w-3 shrink-0 text-lime/50" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Section>

            <Section id="privacy" index="02" title="Privacy">
              <p>
                The prototype has no accounts, no analytics scripts and no
                advertising trackers. It stores the following in your browser’s
                localStorage:
              </p>
              <div className="grid gap-2 sm:grid-cols-2">
                {[
                  ["zupona:credits", "Your remaining demo credits"],
                  ["zupona:library", "Saved render metadata and SVG data URLs"],
                ].map(([key, body]) => (
                  <div
                    key={key}
                    className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-3"
                  >
                    <code className="font-mono text-[10.5px] text-lime/60">
                      {key}
                    </code>
                    <p className="mt-1.5 text-[10px] leading-relaxed text-white/30">
                      {body}
                    </p>
                  </div>
                ))}
              </div>
              <p>
                You can clear both at any time from your browser settings or by
                using the reset control in the studio. Clearing them removes your
                demo library and restores the starting credit balance.
              </p>
              <p>
                The mock generation API keeps jobs in server memory only. Jobs are
                lost when the server restarts and are not sold, shared or used for
                training. The newsletter form is a demo and does not transmit your
                email anywhere.
              </p>
              <p>
                A production build would collect account, billing and usage data,
                publish a sub-processor list, honour data-subject requests and
                document retention windows. None of that exists in this prototype.
              </p>
            </Section>

            <Section id="credits" index="03" title="Credits & billing">
              <p>
                The demo starts with 120 credits stored in your browser. Each
                model shows its credit cost before you render. Costs are
                illustrative and do not correspond to real money.
              </p>
              <div className="overflow-hidden rounded-xl border border-white/[0.07]">
                <div className="grid grid-cols-[1fr_auto] gap-3 border-b border-white/[0.07] bg-white/[0.03] px-4 py-2.5 text-[9.5px] uppercase tracking-[0.1em] text-white/30">
                  <span>Rule</span>
                  <span>Demo behaviour</span>
                </div>
                {[
                  ["Cost visibility", "Shown before every render"],
                  ["Insufficient credits", "Render is blocked, no partial spend"],
                  ["Failed job", "Full refund, no support ticket needed"],
                  ["Daily allowance", "Not enforced in the demo"],
                  ["Saved library", "Survives reloads via localStorage"],
                  ["Real payments", "Not connected; no card is collected"],
                ].map(([rule, behaviour]) => (
                  <div
                    key={rule}
                    className="grid grid-cols-[1fr_auto] gap-3 border-b border-white/[0.05] px-4 py-2.5 text-[10.5px] last:border-0"
                  >
                    <span className="text-white/45">{rule}</span>
                    <span className="text-right text-white/30">{behaviour}</span>
                  </div>
                ))}
              </div>
              <p>
                Paid plans shown on the pricing page are product hypotheses. No
                checkout, subscription or renewal exists. In production, credits
                would be reserved atomically before a render, refunded on failure,
                and governed by a published rate card and rollover policy.
              </p>
            </Section>

            <Section id="acceptable-use" index="04" title="Acceptable use">
              <p>
                Do not use the prototype to generate or promote illegal content,
                sexual content involving minors, non-consensual intimate imagery,
                credible threats, harassment, malware or content that infringes
                another person’s intellectual property.
              </p>
              <p>
                Do not attempt to disrupt the demo service, probe its
                infrastructure, or misrepresent demo output as real commercial AI
                work. A production service would pair these rules with automated
                moderation, human review, age gating and an appeals process.
              </p>
            </Section>

            <Section id="disclaimers" index="05" title="Disclaimers">
              <p>
                Zupona is an independent concept and is not affiliated with,
                endorsed by or sponsored by Google, Higgsfield, InVideo, Kuaishou,
                GitHub, OpenAI or any other company named on this site. All
                third-party product names, model names and logos are trademarks of
                their respective owners.
              </p>
              <p>
                Competitor pricing, features and market data referenced in the
                research are point-in-time snapshots and may be inaccurate or out
                of date. They are provided for commentary and comparison, not as
                advice.
              </p>
            </Section>

            <Section id="contact" index="06" title="Contact">
              <p>
                Questions about the concept, research or this prototype can go to{" "}
                <a
                  href="mailto:hello@zupona.ai"
                  className="text-white/65 underline decoration-white/20 underline-offset-2 transition-colors hover:text-paper"
                >
                  hello@zupona.ai
                </a>
                . This inbox is illustrative, but the research and PRD are in the
                repository for anyone who wants the longer version.
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                <Link
                  href="/research"
                  className="inline-flex h-9 items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.04] px-4 text-[11px] font-medium text-white/60 transition-colors hover:bg-white/[0.08]"
                >
                  Research & PRD
                  <ArrowUpRight className="h-3 w-3" />
                </Link>
                <Link
                  href="/studio"
                  className="inline-flex h-9 items-center gap-1.5 rounded-full bg-lime px-4 text-[11px] font-semibold text-ink transition-colors hover:bg-[#e7ff8c]"
                >
                  Open the studio
                  <ArrowUpRight className="h-3 w-3" />
                </Link>
              </div>
            </Section>
          </div>
        </div>
      </section>
    </>
  );
}
