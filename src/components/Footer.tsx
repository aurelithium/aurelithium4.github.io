import receptionDeskPhoto from "../assets/images/reception-desk.jpg";
import { CLINIC, DOCS, NAV, WARNING } from "@/data";
import { Icon, Reveal, SectionHead, Wordmark } from "./ui";

export default function Footer({ openDoc }: { openDoc: (id: string) => void }) {
  return (
    <>
      {/* ── contacts ── */}
      <section id="contacts" className="py-24 md:py-28">
        <div className="mx-auto w-full max-w-7xl px-5 md:px-6">
          <SectionHead
            no="06"
            label="Контакты"
            title={
              <>
                Мы рядом — <em className="text-brass italic">в пяти минутах от метро</em>
              </>
            }
          />

          <div className="mt-14 grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
            <div>
              <div className="space-y-7">
                {[
                  {
                    icon: "pin",
                    label: "Адрес",
                    value: CLINIC.address,
                    sub: CLINIC.metro,
                  },
                  {
                    icon: "phone",
                    label: "Телефон",
                    value: CLINIC.phone,
                    sub: "Звонки принимаем ежедневно",
                    href: CLINIC.phoneHref,
                  },
                  {
                    icon: "mail",
                    label: "Почта",
                    value: CLINIC.email,
                    sub: "Ответим в течение рабочего дня",
                    href: `mailto:${CLINIC.email}`,
                  },
                  {
                    icon: "clock",
                    label: "Режим работы",
                    value: CLINIC.hours,
                    sub: "Неотложная помощь — в часы работы клиники",
                  },
                ].map((c, i) => (
                  <Reveal key={c.label} delay={i * 70}>
                    <div className="flex items-start gap-5">
                      <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-brass/40 text-brass">
                        <Icon name={c.icon} className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="label-caps text-[0.55rem] text-ink-faint">{c.label}</p>
                        {c.href ? (
                          <a
                            href={c.href}
                            className="font-display mt-1 block text-2xl font-semibold text-olive-deep transition hover:text-brass"
                          >
                            {c.value}
                          </a>
                        ) : (
                          <p className="font-display mt-1 text-2xl font-semibold text-olive-deep">{c.value}</p>
                        )}
                        <p className="mt-0.5 text-[0.78rem] text-ink-faint">{c.sub}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={200}>
                <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-line pt-8">
                  <a
                    href={CLINIC.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 rounded-full bg-olive px-6 py-3 text-sm font-bold text-cream shadow-md shadow-olive/25 transition hover:bg-olive-night"
                  >
                    Маршрут в Яндекс.Картах
                    <Icon name="external" className="h-4 w-4" />
                  </a>
                  <div className="flex flex-wrap gap-2">
                    {[
                      ["card", "Карта"],
                      ["cash", "Наличные"],
                      ["qr", "QR · СБП"],
                    ].map(([ic, t]) => (
                      <span
                        key={t}
                        className="inline-flex items-center gap-1.5 rounded-full border border-line bg-card px-3 py-1.5 text-[0.68rem] font-semibold text-ink-soft"
                      >
                        <Icon name={ic} className="h-3.5 w-3.5 text-brass" />
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>

            <Reveal delay={150} className="relative">
              <div className="frame-brass arch mx-auto w-[82%] sm:w-[64%] lg:w-[74%]">
                <div className="arch aspect-[4/5] overflow-hidden bg-olive-mist">
                  <img
                    src={receptionDeskPhoto}
                    alt="Стойка ресепшен клиники «Инлайт»"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="floaty absolute bottom-8 left-2 flex items-center gap-3 rounded-xl border border-line bg-card px-4 py-3 shadow-xl shadow-ink/10 sm:left-8">
                <Icon name="pin" className="h-5 w-5 text-brass" />
                <p className="text-[0.75rem] leading-snug font-bold text-ink">
                  5 минут пешком
                  <span className="block font-medium text-ink-faint">от м. Беляево</span>
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── footer ── */}
      <footer className="border-t border-brass/20 bg-olive-night pt-16 pb-8 text-cream/70">
        <div className="mx-auto w-full max-w-7xl px-5 md:px-6">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Wordmark light />
              <p className="mt-6 max-w-xs text-[0.82rem] leading-relaxed text-cream/55">
                Частная стоматология для взрослых в Москве. Лицензированная медицинская
                деятельность, доказательные протоколы, спокойная атмосфера.
              </p>
              <div className="mt-6 flex items-center gap-3">
                <span className="rounded-md border border-cream/25 px-2 py-0.5 text-[0.7rem] font-bold text-cream/70">
                  18+
                </span>
                <span className="flex items-center gap-2 text-[0.7rem] text-cream/50">
                  <span className="h-1.5 w-1.5 rounded-full bg-ok" />
                  Данные актуальны · обновлено {CLINIC.updated}
                </span>
              </div>
            </div>

            <div className="lg:col-span-2">
              <p className="label-caps text-[0.58rem] text-brass-soft">Навигация</p>
              <ul className="mt-5 space-y-2.5 text-[0.82rem]">
                {NAV.map((n) => (
                  <li key={n.id}>
                    <a href={`#${n.id}`} className="transition hover:text-brass-soft">
                      {n.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a href="#booking" className="font-semibold text-brass-soft transition hover:text-cream">
                    Запись на приём
                  </a>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-3">
              <p className="label-caps text-[0.58rem] text-brass-soft">Документы</p>
              <ul className="mt-5 space-y-2.5 text-[0.82rem]">
                {DOCS.map((d) => (
                  <li key={d.id}>
                    <button onClick={() => openDoc(d.id)} className="text-left transition hover:text-brass-soft">
                      {d.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-3">
              <p className="label-caps text-[0.58rem] text-brass-soft">Реквизиты</p>
              <div className="mt-5 space-y-1.5 text-[0.76rem] leading-relaxed text-cream/55">
                <p className="font-semibold text-cream/80">{CLINIC.legalName}</p>
                <p>ИНН {CLINIC.inn} · КПП {CLINIC.kpp}</p>
                <p>ОГРН {CLINIC.ogrn}</p>
                <p>{CLINIC.addressFull}</p>
                <p className="pt-2">
                  Лицензия на медицинскую деятельность {CLINIC.license}
                  <br />
                  Выдана: {CLINIC.licenseIssuer}
                </p>
                <button
                  onClick={() => openDoc("authorities")}
                  className="pt-2 font-semibold text-brass-soft underline-offset-4 transition hover:text-cream hover:underline"
                >
                  Контролирующие организации →
                </button>
              </div>
            </div>
          </div>

          {/* statutory warning — prominent */}
          <div className="mt-14 rounded-xl border border-cream/25 px-6 py-6 text-center">
            <p className="label-caps text-[0.72rem] leading-relaxed tracking-[0.3em] text-cream/80">
              {WARNING}
            </p>
          </div>

          <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-cream/10 pt-6 text-center text-[0.68rem] text-cream/40 md:flex-row md:text-left">
            <p>© 2026 {CLINIC.legalName}. Все права защищены.</p>
            <p>Информация на сайте не является публичной офертой (ст. 437 ГК РФ).</p>
            <button
              onClick={() => openDoc("privacy")}
              className="underline-offset-4 transition hover:text-brass-soft hover:underline"
            >
              Политика обработки персональных данных
            </button>
          </div>
        </div>
      </footer>
    </>
  );
}