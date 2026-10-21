"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { plans } from "@/lib/content";

export function LoginForm({ planId }: { planId?: string }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const plan = plans.find((item) => item.id === planId);

  function enter() {
    setLoading(true);
    try {
      window.localStorage.setItem(
        "zupona:user",
        JSON.stringify({ email: email.trim() || "guest@zupona.ai" }),
      );
    } catch {
      // Ignore storage failures.
    }
    window.setTimeout(() => router.push("/studio"), 450);
  }

  return (
    <div className="w-full max-w-md">
      {plan ? (
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-lime/20 bg-lime/[0.07] px-3 py-1.5 text-[10.5px] text-lime/80">
          <Sparkles className="h-3 w-3" />
          {plan.name} selected · ${plan.annual}/mo annual
        </div>
      ) : (
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-[10.5px] text-white/40">
          <Sparkles className="h-3 w-3 text-lime/70" />
          Demo access · no account is created
        </div>
      )}

      <h1 className="display text-[44px] leading-[0.96] text-paper sm:text-[54px]">
        Step inside
        <span className="text-lime">.</span>
      </h1>
      <p className="pretty mt-4 text-[14px] leading-relaxed text-white/45">
        Sign in to your workspace, or continue as a guest. In this prototype,
        either path opens the studio with 60 credits.
      </p>

      <form
        className="mt-8 space-y-3"
        onSubmit={(event) => {
          event.preventDefault();
          enter();
        }}
      >
        <div>
          <label
            htmlFor="email"
            className="text-[10px] font-semibold uppercase tracking-[0.13em] text-white/35"
          >
            Work email
          </label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@studio.com"
            className="mt-2 h-12 w-full rounded-xl border border-white/[0.09] bg-black/25 px-4 text-[13px] text-paper placeholder:text-white/20 transition-colors focus:border-white/25"
          />
        </div>

        <Button type="submit" disabled={loading} className="h-12 w-full">
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Opening your studio…
            </>
          ) : (
            <>
              Continue to studio
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </form>

      <div className="my-5 flex items-center gap-3 text-[9px] uppercase tracking-[0.14em] text-white/20">
        <span className="h-px flex-1 bg-white/[0.07]" />
        or
        <span className="h-px flex-1 bg-white/[0.07]" />
      </div>

      <Button variant="secondary" className="h-12 w-full" onClick={enter}>
        Continue as guest
      </Button>

      <p className="mt-6 text-[10px] leading-relaxed text-white/25">
        This is a concept build. Authentication, billing and email delivery are
        simulated. Nothing you type is sent anywhere.
      </p>
    </div>
  );
}
