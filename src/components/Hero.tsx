import receptionDocsPhoto from "../assets/images/reception-docs.jpg";
import consultationPhoto from "../assets/images/consultation.jpg";
import { Icon, Reveal, WarningStrip } from "./ui";

const MARQUEE = [
  "Терапия",
  "Хирургия",
  "Ортодонтия",
  "Ортопедия",
  "Имплантация",
  "Пародонтология",
  "Гигиена Norma",
  "Отбеливание",
  "Диагностика ОПТГ",
];

function MarqueeRow({ hidden }: { hidden?: boolean }) {
  return (
    <span className="flex items-center" aria-hidden={hidden || undefined}>
      {MARQUEE.map((m) => (
        <span key={m} className="flex items-center">
          <span className="font-display px-7 text-xl italic text-cream/85 md:text-2xl">{m}</span>
          <Icon name="sparkle" className="h-3.5 w-3.5 text-brass-soft" strokeWidth={1.2} />
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* atmosphere */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-44 right-[-12%] h-[620px] w-[620px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(203,179,135,0.32), transparent 65%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-[-10%] h-[420px] w-[520px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(120,130,95,0.16), transparent 65%)" }}
      />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-1/4 hidden w-px bg-olive/5 md:block" />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-2/4 hidden w-px bg-olive/5 md:block" />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-3/4 hidden w-px bg-olive/5 md:block" />
      <Icon
        name="tooth"
        className="pointer-events-none absolute right-[4%] top-16 hidden h-[430px] w-[430px] rotate-12 text-olive opacity-[0.05] lg:block"
        strokeWidth={0.5}
      />

      <div className="relative mx-auto grid w-full max-w-7xl gap-14 px-5 pt-12 pb-16 md:px-6 lg:grid-cols-12 lg:gap-10 lg:pt-20 lg:pb-20">
        {/* copy */}
        <div className="flex flex-col justify-center lg:col-span-6">
          <Reveal>
            <p className="flex items-center gap-3">
              <Icon name="sparkle" className="h-4 w-4 text-brass" strokeWidth={1.2} />
              <span className="label-caps text-brass">Инлайт · частная стоматология · Москва</span>
            </p>
          </Reveal>
          <Reveal delay={90}>
            <h1 className="font-display mt-6 text-[2.85rem] leading-[1.02] font-semibold text-olive-deep md:text-[4.3rem]">
              Стоматология,
              <br />
              в которой <em className="text-brass italic">спокойно</em>
            </h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-6 max-w-xl text-[0.98rem] leading-relaxed text-ink-soft">
              Клиника «Инлайт» — полный цикл лечения для взрослых: от бесплатной консультации
              и цифрового снимка ОПТГ до имплантации и протезирования. Понятный план лечения
              и цены «под ключ» — с первого визита.
            </p>
          </Reveal>
          <Reveal delay={260}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#booking"
                className="group inline-flex items-center gap-2.5 rounded-full bg-olive px-7 py-3.5 text-sm font-bold text-cream shadow-lg shadow-olive/25 transition hover:bg-olive-night"
              >
                Записаться на приём
                <Icon name="arrow-right" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#prices"
                className="inline-flex items-center gap-2.5 rounded-full border border-olive/25 px-7 py-3.5 text-sm font-bold text-olive-deep transition hover:border-brass hover:text-brass"
              >
                Смотреть цены
              </a>
            </div>
          </Reveal>
          <Reveal delay={340}>
            <ul className="mt-9 flex flex-wrap gap-x-7 gap-y-2.5">
              {["Консультация — 0 ₽", "ОПТГ прямо в клинике", "Приём при острой боли"].map((t) => (
                <li key={t} className="flex items-center gap-2 text-[0.82rem] font-semibold text-ink-soft">
                  <Icon name="check" className="h-4 w-4 text-ok" strokeWidth={2} />
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* composition */}
        <div className="relative lg:col-span-6">
          <Reveal delay={150} className="relative">
            <div className="frame-brass arch relative ml-auto w-[86%] sm:w-[72%] lg:w-[80%]">
              <div className="arch aspect-[4/5] overflow-hidden bg-olive-mist">
                <img
                  src={receptionDocsPhoto}
                  alt="Врач-стоматолог беседует с пациентом в кабинете"
                  className="kenburns h-full w-full object-cover"
                  style={{ objectPosition: "62% 50%" }}
                  loading="eager"
                />
              </div>
            </div>

            <div className="floaty absolute top-8 left-0 rounded-2xl border border-line bg-card px-5 py-4 shadow-xl shadow-ink/10 sm:left-4">
              <p className="label-caps text-[0.58rem] text-brass">Первичный приём</p>
              <p className="font-display mt-1 text-4xl font-semibold text-olive-deep">0 ₽</p>
              <p className="mt-1 max-w-[10.5rem] text-[0.7rem] leading-snug text-ink-faint">
                консультация врача любого направления
              </p>
            </div>

            <div className="absolute -bottom-9 left-0 w-[54%] overflow-hidden rounded-xl border-[6px] border-card shadow-2xl shadow-ink/25 sm:w-[48%] lg:-left-2">
              <img
                src={consultationPhoto}
                alt="Врач-стоматолог беседует с пациентом"
                className="aspect-[16/10] w-full object-cover"
                loading="eager"
              />
            </div>
          </Reveal>
        </div>
      </div>

      {/* fact strip */}
      <div className="relative mx-auto w-full max-w-7xl px-5 pb-16 md:px-6">
        <Reveal>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-8 border-t border-line pt-9 md:grid-cols-4">
            {[
              ["8", "направлений помощи взрослым"],
              ["0 ₽", "первичная консультация"],
              ["ОПТГ", "цифровая диагностика на месте"],
              ["7 дней", "в неделю, с 09:00 до 21:00"],
            ].map(([v, l]) => (
              <div key={l}>
                <dt className="sr-only">{l}</dt>
                <dd className="font-display text-3xl font-semibold text-olive-deep md:text-4xl">{v}</dd>
                <dd className="label-caps mt-2.5 text-[0.58rem] leading-relaxed text-ink-faint">{l}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>

      {/* services marquee */}
      <div className="marquee overflow-hidden border-y border-brass/25 bg-olive-night py-4">
        <div className="marquee-track flex w-max">
          <MarqueeRow />
          <MarqueeRow hidden />
        </div>
      </div>

      {/* statutory warning */}
      <div className="border-b border-line bg-cream px-4 py-3.5">
        <WarningStrip />
      </div>
    </section>
  );
}