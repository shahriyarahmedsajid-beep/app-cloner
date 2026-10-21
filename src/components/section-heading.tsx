import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  align = "left",
  tone = "dark",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 md:flex-row md:items-end md:justify-between",
        align === "center" && "md:flex-col md:items-center md:text-center",
        className,
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        {eyebrow ? (
          <p
            className={cn(
              "eyebrow mb-5",
              tone === "light" && "text-ink/45",
            )}
          >
            <span
              className={cn(
                "h-1 w-1 rounded-full",
                tone === "light" ? "bg-ink" : "bg-lime",
              )}
            />
            {eyebrow}
          </p>
        ) : null}
        <h2
          className={cn(
            "display text-balance text-[34px] leading-[1.02] sm:text-[44px] md:text-[52px]",
            tone === "light" ? "text-ink" : "text-paper",
          )}
        >
          {title}
        </h2>
        {description ? (
          <p
            className={cn(
              "pretty mt-5 max-w-xl text-[15px] leading-relaxed md:text-base",
              tone === "light" ? "text-ink/55" : "text-white/50",
            )}
          >
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
