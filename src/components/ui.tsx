import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/utils/cn";

/* ── line icon set, drawn for the clinic ────────────────────── */

const PATHS: Record<string, ReactNode> = {
  tooth: (
    <path d="M12 4.2c-1.8 0-2.7-1.2-4.6-1.2C4.9 3 3.4 5 3.4 7.4c0 3.6 1.8 5.2 2.5 8.7.4 2 .6 5.9 2.5 5.9 2 0 1.2-4.5 2.9-6.3.4-.4 1-.4 1.4 0 1.7 1.8.9 6.3 2.9 6.3 1.9 0 2.1-3.9 2.5-5.9.7-3.5 2.5-5.1 2.5-8.7C20.6 5 19.1 3 16.6 3c-1.9 0-2.8 1.2-4.6 1.2Z" />
  ),
  scalpel: (
    <>
      <path d="M8.2 3.2c-2.1 4.2-2 8 1 11l2.8 2.8" />
      <path d="M15.8 3.2c2.1 4.2 2 8-1 11L12 17" />
      <path d="M12 17v4.2" />
    </>
  ),
  braces: (
    <>
      <path d="M3 13c0-5.5 4-9 9-9s9 3.5 9 9" />
      <rect x="4.6" y="10.6" width="4" height="5" rx="1" />
      <rect x="10" y="11.8" width="4" height="5" rx="1" />
      <rect x="15.4" y="10.6" width="4" height="5" rx="1" />
    </>
  ),
  crown: (
    <>
      <path d="M4.5 18.5h15" />
      <path d="m5.5 18.5-1.4-9 5 3 2.9-6 2.9 6 5-3-1.4 9" />
    </>
  ),
  implant: (
    <>
      <path d="M8.8 3h6.4" />
      <path d="M9 3c0 7 .8 12.6 2.4 17.1.3.9 1 .9 1.3 0C14.2 15.6 15 10 15 3" />
      <path d="M9.3 7h5.4M9.7 10.5h4.6M10.3 14h3.4M11 17.5h2" />
    </>
  ),
  gum: (
    <>
      <path d="M20 4C10.5 4 4.5 10 4 20c10-.5 16-6.5 16-16Z" />
      <path d="M4.5 19.5C9.5 14.5 13.5 10.5 19.5 4.5" />
    </>
  ),
  scan: (
    <>
      <path d="M3 8V5a2 2 0 0 1 2-2h3M16 3h3a2 2 0 0 1 2 2v3M21 16v3a2 2 0 0 1-2 2h-3M8 21H5a2 2 0 0 1-2-2v-3" />
      <path d="M3 12h18" />
    </>
  ),
  chat: (
    <>
      <path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5H4l1.9-3.3A8.5 8.5 0 1 1 21 11.5Z" />
      <path d="M8.5 11.5h.01M12.5 11.5h.01M16.5 11.5h.01" />
    </>
  ),
  alert: (
    <>
      <circle cx="12" cy="12" r="8.7" />
      <path d="M12 8v8M8 12h8" />
    </>
  ),
  card: (
    <>
      <rect x="2.5" y="5.5" width="19" height="13" rx="2.5" />
      <path d="M2.5 10h19M6 14.5h4" />
    </>
  ),
  cash: (
    <>
      <rect x="2.5" y="6" width="19" height="12" rx="2" />
      <circle cx="12" cy="12" r="2.6" />
      <path d="M5.8 9.2h.01M18.2 14.8h.01" />
    </>
  ),
  qr: (
    <>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1" />
      <path d="M13.5 13.5h3v3h-3zM17.5 17.5h3v3h-3zM13.5 20.5h.01M20.5 13.5h.01" />
    </>
  ),
  phone: (
    <path d="M5.5 3.5h3l1.7 4.3-2.1 1.6a12.8 12.8 0 0 0 6.5 6.5l1.6-2.1 4.3 1.7v3a2 2 0 0 1-2.2 2A16.8 16.8 0 0 1 3.5 5.7a2 2 0 0 1 2-2.2Z" />
  ),
  pin: (
    <>
      <path d="M12 21.5s-7-6.1-7-11.3a7 7 0 0 1 14 0c0 5.2-7 11.3-7 11.3Z" />
      <circle cx="12" cy="10" r="2.6" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.7" />
      <path d="M12 7v5l3.2 2" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </>
  ),
  check: <path d="m4.5 12.5 5 5L19.5 7" />,
  "arrow-right": <path d="M4 12h16m0 0-6-6m6 6-6 6" />,
  "arrow-up": <path d="M12 20V4m0 0-6 6m6-6 6 6" />,
  close: <path d="m5 5 14 14M19 5 5 19" />,
  menu: <path d="M3.5 8.5h17M3.5 15.5h17" />,
  sparkle: (
    <path d="M12 3c.6 4.5 2.4 6.9 9 9-6.6 2.1-8.4 4.5-9 9-.6-4.5-2.4-6.9-9-9 6.6-2.1 8.4-4.5 9-9Z" />
  ),
  shield: (
    <>
      <path d="M12 2.8 4.5 5.6v6c0 4.6 3.1 7.9 7.5 9.6 4.4-1.7 7.5-5 7.5-9.6v-6L12 2.8Z" />
      <path d="m8.7 11.8 2.3 2.3 4.3-4.6" />
    </>
  ),
  doc: (
    <>
      <path d="M6 2.8h8l4 4v14.4H6V2.8Z" />
      <path d="M14 2.8v4h4M9 12h6M9 15.5h6M9 8.5h2" />
    </>
  ),
  print: (
    <>
      <path d="M7 8V3h10v5M7 17H4a1 1 0 0 1-1-1v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a1 1 0 0 1-1 1h-3" />
      <rect x="7" y="14" width="10" height="7" rx="1" />
    </>
  ),
  "chevron-left": <path d="m14.5 5.5-6.5 6.5 6.5 6.5" />,
  "chevron-right": <path d="m9.5 5.5 6.5 6.5-6.5 6.5" />,
  external: (
    <>
      <path d="M13.5 4.5h6v6M19.5 4.5 11 13" />
      <path d="M19.5 14v4.5a2 2 0 0 1-2 2h-11a2 2 0 0 1-2-2v-11a2 2 0 0 1 2-2H10" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="16" rx="2.5" />
      <path d="M3.5 10h17M8 2.8V7M16 2.8V7" />
    </>
  ),
};

export function Icon({
  name,
  className,
  strokeWidth = 1.5,
}: {
  name: string;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("h-5 w-5 shrink-0", className)}
    >
      {PATHS[name] ?? PATHS.tooth}
    </svg>
  );
}

/* ── brand monogram: intertwined ИЛ inside a tooth ──────────── */

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 56 56" fill="none" aria-hidden="true" className={cn("h-11 w-11", className)}>
      <path
        d="M28 8.6c-3.6 0-5.2-2.5-9-2.5-4.9 0-8 4-8 8.8 0 7.2 3.6 10.4 5 17.4.8 4 1.2 11.6 5 11.6 4 0 2.5-8.9 5.8-12.5.7-.8 1.7-.8 2.4 0 3.3 3.6 1.8 12.5 5.8 12.5 3.8 0 4.2-7.6 5-11.6 1.4-7 5-10.2 5-17.4 0-4.8-3.1-8.8-8-8.8-3.8 0-5.4 2.5-9 2.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        opacity="0.9"
      />
      <text
        x="16.2"
        y="30.5"
        fontFamily="Cormorant, Georgia, serif"
        fontWeight="600"
        fontSize="21"
        fill="currentColor"
      >
        И
      </text>
      <text
        x="26"
        y="36.5"
        fontFamily="Cormorant, Georgia, serif"
        fontWeight="600"
        fontSize="21"
        fill="currentColor"
        opacity="0.85"
      >
        Л
      </text>
    </svg>
  );
}

export function Wordmark({ className, light }: { className?: string; light?: boolean }) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <LogoMark className={light ? "text-brass-soft" : "text-olive"} />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[1.55rem] font-semibold uppercase tracking-[0.26em]",
            light ? "text-cream" : "text-olive-deep",
          )}
        >
          Инлайт
        </span>
        <span
          className={cn(
            "label-caps mt-1.5 text-[0.5rem] tracking-[0.3em]",
            light ? "text-cream/60" : "text-ink-faint",
          )}
        >
          Частная стоматология
        </span>
      </span>
    </span>
  );
}

/* ── reveal on scroll ───────────────────────────────────────── */

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn("reveal", inView && "is-in", className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

/* ── section heading ────────────────────────────────────────── */

export function SectionHead({
  no,
  label,
  title,
  text,
  dark,
  center,
}: {
  no: string;
  label: string;
  title: ReactNode;
  text?: string;
  dark?: boolean;
  center?: boolean;
}) {
  return (
    <Reveal className={cn("max-w-3xl", center && "mx-auto text-center")}>
      <div className={cn("flex items-center gap-4", center && "justify-center")}>
        <span className="font-display text-lg italic text-brass">{no}</span>
        <span className="h-px w-12 bg-brass-soft" />
        <span className={cn("label-caps", dark ? "text-brass-soft" : "text-brass")}>{label}</span>
      </div>
      <h2
        className={cn(
          "font-display mt-5 text-4xl leading-[1.06] font-semibold text-balance md:text-[3.4rem]",
          dark ? "text-cream" : "text-olive-deep",
        )}
      >
        {title}
      </h2>
      {text && (
        <p
          className={cn(
            "mt-5 max-w-2xl text-[0.95rem] leading-relaxed",
            dark ? "text-cream/70" : "text-ink-soft",
            center && "mx-auto",
          )}
        >
          {text}
        </p>
      )}
    </Reveal>
  );
}

/* ── legally required warning strip ─────────────────────────── */

export function WarningStrip({ className, dark }: { className?: string; dark?: boolean }) {
  return (
    <p
      className={cn(
        "label-caps text-center text-[0.65rem] leading-relaxed tracking-[0.28em]",
        dark ? "text-cream/55" : "text-ink-faint",
        className,
      )}
    >
      Имеются противопоказания. Необходима консультация специалиста
    </p>
  );
}