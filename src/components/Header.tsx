import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";
import { CLINIC, NAV } from "@/data";
import { Icon, Wordmark } from "./ui";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = [...NAV.map((n) => n.id), "booking"];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-50 lg:-top-9">
        {/* utility bar */}
        <div className="hidden h-9 items-center bg-olive-night text-cream/75 lg:flex">
          <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 text-[0.72rem] font-medium">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-2">
                <Icon name="clock" className="h-3.5 w-3.5 text-brass-soft" />
                {CLINIC.hours}
              </span>
              <span className="flex items-center gap-2">
                <Icon name="pin" className="h-3.5 w-3.5 text-brass-soft" />
                {CLINIC.address} · {CLINIC.metro}
              </span>
            </div>
            <div className="flex items-center gap-6">
              <span className="text-cream/50">Прейскурант обновлён: {CLINIC.updated}</span>
              <a href={CLINIC.phoneHref} className="font-semibold text-cream transition hover:text-brass-soft">
                {CLINIC.phone}
              </a>
            </div>
          </div>
        </div>

        {/* main bar */}
        <div
          className={cn(
            "border-b transition-all duration-300",
            scrolled
              ? "border-line bg-paper/90 shadow-[0_10px_40px_-18px_rgba(38,35,25,0.35)] backdrop-blur-md"
              : "border-transparent bg-paper",
          )}
        >
          <div className="mx-auto flex h-[76px] w-full max-w-7xl items-center justify-between gap-6 px-5 md:px-6">
            <a href="#top" aria-label="Инлайт — на главную" className="transition hover:opacity-80">
              <Wordmark />
            </a>

            <nav className="hidden items-center gap-7 lg:flex" aria-label="Основная навигация">
              {NAV.map((n) => (
                <a
                  key={n.id}
                  href={`#${n.id}`}
                  className={cn(
                    "label-caps relative py-2 text-[0.64rem] transition-colors",
                    active === n.id ? "text-brass" : "text-ink-soft hover:text-olive-deep",
                  )}
                >
                  {n.label}
                  <span
                    className={cn(
                      "absolute inset-x-0 -bottom-0.5 h-px bg-brass transition-transform duration-300",
                      active === n.id ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <a
                href={CLINIC.phoneHref}
                className="hidden items-center gap-2 text-sm font-bold text-olive-deep transition hover:text-brass xl:flex"
              >
                <Icon name="phone" className="h-4 w-4 text-brass" />
                {CLINIC.phone}
              </a>
              <a
                href="#booking"
                className="hidden rounded-full bg-olive px-5 py-2.5 text-[0.8rem] font-bold text-cream shadow-md shadow-olive/25 transition hover:bg-olive-night sm:inline-flex"
              >
                Записаться
              </a>
              <button
                onClick={() => setOpen(true)}
                aria-label="Открыть меню"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-olive-deep transition hover:border-brass lg:hidden"
              >
                <Icon name="menu" className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* mobile menu */}
      {open && (
        <div className="fade-in fixed inset-0 z-[75] flex flex-col bg-olive-night lg:hidden" role="dialog" aria-modal="true">
          <div className="flex h-[76px] items-center justify-between px-5">
            <Wordmark light />
            <button
              onClick={() => setOpen(false)}
              aria-label="Закрыть меню"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-cream/25 text-cream transition hover:border-brass-soft"
            >
              <Icon name="close" className="h-5 w-5" />
            </button>
          </div>
          <nav className="flex flex-1 flex-col justify-center gap-1 px-8" aria-label="Мобильная навигация">
            {NAV.map((n, i) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                onClick={() => setOpen(false)}
                className="rise-in group flex items-baseline gap-4 border-b border-cream/10 py-4"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <span className="font-display text-sm italic text-brass-soft">0{i + 1}</span>
                <span className="font-display text-4xl font-medium text-cream transition group-hover:text-brass-soft">
                  {n.label}
                </span>
              </a>
            ))}
            <a
              href="#booking"
              onClick={() => setOpen(false)}
              className="rise-in mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-brass px-6 py-4 text-sm font-bold text-olive-night"
              style={{ animationDelay: "320ms" }}
            >
              Записаться на приём
              <Icon name="arrow-right" className="h-4 w-4" />
            </a>
          </nav>
          <div className="px-8 pb-8 text-center">
            <a href={CLINIC.phoneHref} className="font-display text-2xl text-cream">
              {CLINIC.phone}
            </a>
            <p className="mt-2 text-xs text-cream/55">
              {CLINIC.hours} · {CLINIC.address}
            </p>
          </div>
        </div>
      )}
    </>
  );
}