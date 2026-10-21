"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <form
      className="mt-4"
      onSubmit={(event) => {
        event.preventDefault();
        if (!email) return;
        setDone(true);
      }}
    >
      {done ? (
        <div className="flex h-11 items-center gap-2 rounded-full border border-lime/30 bg-lime/10 px-4 text-[13px] text-lime">
          <Check className="h-4 w-4" />
          You are on the list (demo)
        </div>
      ) : (
        <div className="flex h-11 items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] pl-4 pr-1 transition-colors focus-within:border-white/25">
          <input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@studio.com"
            aria-label="Email address"
            className="h-full min-w-0 flex-1 bg-transparent text-[13px] text-paper placeholder:text-white/30"
          />
          <button
            type="submit"
            aria-label="Subscribe"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-lime text-ink transition-colors hover:bg-paper"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </form>
  );
}
