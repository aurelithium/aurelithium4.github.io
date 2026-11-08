import { cn } from "@/utils/cn";
import { CLINIC, SERVICES } from "@/data";
import { Icon, Reveal, SectionHead } from "./ui";

export default function Services({ onBook }: { onBook: (service: string) => void }) {
  return (
    <section id="services" className="relative py-24 md:py-28">
      <div className="mx-auto w-full max-w-7xl px-5 md:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead
            no="01"
            label="Направления"
            title={
              <>
                Полный спектр <em className="text-brass italic">взрослой</em> стоматологии
              </>
            }
            text="Восемь направлений помощи в одной клинике — вам не придётся ездить по городу. Первичная консультация любого специалиста бесплатна."
          />
          <Reveal delay={150}>
            <a
              href="#prices"
              className="label-caps group mb-2 hidden items-center gap-2 text-[0.62rem] text-brass transition hover:text-olive-deep md:inline-flex"
            >
              Прайс-лист
              <Icon name="arrow-right" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </a>
          </Reveal>
        </div>

        <Reveal delay={120} className="mt-14">
          <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line shadow-sm md:grid-cols-2">
            {SERVICES.map((s, i) => (
              <article
                key={s.id}
                className={cn(
                  "group relative flex flex-col p-7 transition-colors duration-300 md:p-9",
                  s.dark ? "bg-olive-night hover:bg-olive-deep" : "bg-paper hover:bg-cream",
                )}
              >
                <div className="flex items-start justify-between">
                  <span
                    className={cn(
                      "inline-flex h-13 w-13 items-center justify-center rounded-full border transition-colors duration-300",
                      s.dark
                        ? "border-brass-soft/40 text-brass-soft"
                        : "border-olive/20 text-olive group-hover:border-brass group-hover:text-brass",
                    )}
                    style={{ width: "3.25rem", height: "3.25rem" }}
                  >
                    <Icon name={s.icon} className="h-6 w-6" />
                  </span>
                  <span className="flex items-center gap-3">
                    {s.badge && (
                      <span
                        className={cn(
                          "rounded-full px-3 py-1 text-[0.7rem] font-bold",
                          s.dark ? "bg-brass text-olive-night" : "bg-brass/15 text-brass",
                        )}
                      >
                        {s.badge}
                      </span>
                    )}
                    <span
                      className={cn(
                        "font-display text-xl italic",
                        s.dark ? "text-cream/35" : "text-ink-faint/70",
                      )}
                    >
                      0{i + 1}
                    </span>
                  </span>
                </div>

                <h3
                  className={cn(
                    "font-display mt-6 text-[1.65rem] leading-tight font-semibold",
                    s.dark ? "text-cream" : "text-olive-deep",
                  )}
                >
                  {s.title}
                </h3>
                <p className={cn("label-caps mt-2 text-[0.56rem]", s.dark ? "text-brass-soft" : "text-brass")}>
                  {s.role}
                </p>
                <p
                  className={cn(
                    "mt-3.5 flex-1 text-[0.875rem] leading-relaxed",
                    s.dark ? "text-cream/70" : "text-ink-soft",
                  )}
                >
                  {s.desc}
                </p>

                <a
                  href="#booking"
                  onClick={() => onBook(s.title)}
                  className={cn(
                    "label-caps mt-7 inline-flex items-center gap-2 text-[0.62rem] transition-colors",
                    s.dark ? "text-brass-soft hover:text-cream" : "text-olive-deep hover:text-brass",
                  )}
                >
                  Записаться
                  <Icon name="arrow-right" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1.5" />
                </a>
              </article>
            ))}
          </div>
        </Reveal>

        {/* urgent care band */}
        <Reveal delay={100} className="mt-10">
          <div className="relative flex flex-col items-start gap-8 overflow-hidden rounded-2xl bg-olive-night p-8 md:flex-row md:items-center md:p-10">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(169,138,79,0.35), transparent 65%)" }}
            />
            <div className="relative flex-1">
              <p className="flex items-center gap-3">
                <span className="pulse-ring inline-block h-2.5 w-2.5 rounded-full bg-brass-soft" />
                <span className="label-caps text-[0.6rem] text-brass-soft">
                  Неотложная помощь взрослым · в день обращения
                </span>
              </p>
              <h3 className="font-display mt-4 text-3xl font-semibold text-cream md:text-4xl">
                Острая боль? Не терпите — позвоните.
              </h3>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-cream/60">
                Подберём ближайшее окно и примем вас сегодня в часы работы клиники.
                При состояниях, угрожающих жизни, немедленно звоните 103.
              </p>
            </div>
            <div className="relative flex flex-col items-start gap-4 md:items-end">
              <a
                href={CLINIC.phoneHref}
                className="font-display text-3xl font-semibold text-brass-soft transition hover:text-cream md:text-4xl"
              >
                {CLINIC.phone}
              </a>
              <a
                href={CLINIC.phoneHref}
                className="inline-flex items-center gap-2.5 rounded-full bg-brass px-6 py-3 text-sm font-bold text-olive-night transition hover:bg-brass-soft"
              >
                <Icon name="phone" className="h-4 w-4" strokeWidth={1.8} />
                Позвонить сейчас
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}