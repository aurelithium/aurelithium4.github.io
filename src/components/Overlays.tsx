import { useEffect, useRef, useState } from "react";
import { cn } from "@/utils/cn";
import type { LegalDoc } from "@/data";
import { Icon, WarningStrip } from "./ui";

/* ── legal document modal ───────────────────────────────────── */

export function LegalModal({ doc, onClose }: { doc: LegalDoc; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fade-in fixed inset-0 z-[85] flex items-center justify-center bg-ink/60 p-4 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={doc.title}
    >
      <div className="rise-in flex max-h-[86vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-line bg-cream shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-line px-6 py-5 md:px-8">
          <div>
            <p className="label-caps text-[0.52rem] text-brass">Инлайт · правовая информация</p>
            <h3 className="font-display mt-1.5 text-2xl leading-tight font-semibold text-olive-deep">
              {doc.title}
            </h3>
            <p className="mt-1 text-[0.72rem] text-ink-faint">{doc.subtitle}</p>
          </div>
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Закрыть документ"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-ink-soft transition hover:border-brass hover:text-brass"
          >
            <Icon name="close" className="h-4.5 w-4.5" />
          </button>
        </div>
        <div className="doc-body flex-1 overflow-y-auto px-6 py-5 md:px-8">
          {doc.sections.map((s, i) => (
            <div key={i}>
              {s.h && <h4>{s.h}</h4>}
              {s.p.map((p, j) => (
                <p key={j}>{p}</p>
              ))}
            </div>
          ))}
        </div>
        <div className="border-t border-line bg-paper px-6 py-4">
          <WarningStrip className="text-[0.52rem]" />
        </div>
      </div>
    </div>
  );
}

/* ── cookie consent ─────────────────────────────────────────── */

export function CookieBanner({
  onClose,
  openDoc,
}: {
  onClose: (choice: "all" | "necessary") => void;
  openDoc: (id: string) => void;
}) {
  return (
    <div className="rise-in fixed inset-x-4 bottom-4 z-[65] mx-auto max-w-3xl rounded-2xl border border-brass/25 bg-olive-night p-5 text-cream shadow-2xl shadow-black/40 md:p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <p className="flex-1 text-[0.78rem] leading-relaxed text-cream/75">
          Мы используем файлы cookie для корректной работы сайта и записи на приём. Оставаясь
          на сайте, вы соглашаетесь с{" "}
          <button
            onClick={() => openDoc("privacy")}
            className="font-semibold text-brass-soft underline underline-offset-2 transition hover:text-cream"
          >
            политикой обработки персональных данных
          </button>
          .
        </p>
        <div className="flex shrink-0 gap-2.5">
          <button
            onClick={() => onClose("necessary")}
            className="rounded-full border border-cream/25 px-4 py-2.5 text-[0.7rem] font-bold text-cream/80 transition hover:border-brass-soft hover:text-brass-soft"
          >
            Только необходимые
          </button>
          <button
            onClick={() => onClose("all")}
            className="rounded-full bg-brass px-5 py-2.5 text-[0.7rem] font-bold text-olive-night transition hover:bg-brass-soft"
          >
            Принять
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── back to top ────────────────────────────────────────────── */

export function BackToTop({ hidden }: { hidden: boolean }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 900);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Наверх"
      className={cn(
        "fixed right-5 bottom-6 z-[55] inline-flex h-12 w-12 items-center justify-center rounded-full border border-brass/40 bg-olive text-cream shadow-xl shadow-ink/30 transition-all duration-300 hover:bg-olive-night",
        visible && !hidden ? "opacity-100" : "pointer-events-none translate-y-3 opacity-0",
      )}
    >
      <Icon name="arrow-up" className="h-5 w-5" />
    </button>
  );
}