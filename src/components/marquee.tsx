import { cn } from "@/lib/utils";

export function Marquee({
  items,
  className,
  slow = false,
}: {
  items: string[];
  className?: string;
  slow?: boolean;
}) {
  const group = (
    <div className="flex shrink-0 items-center">
      {items.map((item) => (
        <span
          key={`${item}-1`}
          className="flex items-center gap-6 whitespace-nowrap px-6 text-[13px] font-medium text-white/40"
        >
          <span className="h-1 w-1 rounded-full bg-lime/60" />
          {item}
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={cn(
        "relative flex overflow-hidden",
        "[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]",
        className,
      )}
      aria-hidden="true"
    >
      <div
        className={cn(
          "flex w-max",
          slow ? "animate-marquee-slow" : "animate-marquee",
        )}
      >
        {group}
        {group}
      </div>
    </div>
  );
}
