import { CLINIC, DOCS, PAYMENTS, STEPS } from "@/data";
import { Icon, Reveal, SectionHead } from "./ui";

export default function Patients({ openDoc }: { openDoc: (id: string) => void }) {
  return (
    <section id="patients" className="border-y border-line bg-cream py-24 md:py-28">
      <div className="mx-auto w-full max-w-7xl px-5 md:px-6">
        <SectionHead
          no="04"
          label="Пациентам"
          title={
            <>
              Всё прозрачно — <em className="text-brass italic">до начала лечения</em>
            </>
          }
          text="Договор, план лечения и смета оформляются до первого вмешательства. Вы всегда знаете, что, зачем и сколько будет стоить."
        />

        {/* patient journey */}
        <div className="mt-16 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 90}>
              <div className="relative border-t-2 border-brass/40 pt-6">
                <span className="font-display absolute -top-5 right-0 bg-cream pl-3 text-4xl italic text-brass/60">
                  {s.n}
                </span>
                <h3 className="pr-12 text-[1.02rem] font-bold text-olive-deep">{s.title}</h3>
                <p className="mt-2.5 text-[0.85rem] leading-relaxed text-ink-soft">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* payments */}
        <div className="mt-20 grid gap-5 md:grid-cols-3">
          {PAYMENTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 80}>
              <div className="group h-full rounded-2xl border border-line bg-card p-7 transition hover:border-brass/50 hover:shadow-md">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-olive-mist text-olive transition group-hover:bg-olive group-hover:text-cream">
                  <Icon name={p.icon} className="h-5.5 w-5.5" />
                </span>
                <h3 className="mt-5 text-[1.02rem] font-bold text-olive-deep">{p.title}</h3>
                <p className="mt-1.5 text-[0.82rem] text-ink-faint">{p.note}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120} className="mt-5">
          <div className="flex flex-wrap items-start gap-4 rounded-2xl border border-brass/30 bg-brass-pale/45 p-6 md:items-center">
            <Icon name="doc" className="h-7 w-7 shrink-0 text-brass" />
            <p className="min-w-0 flex-1 text-[0.875rem] leading-relaxed text-ink-soft">
              <strong className="text-olive-deep">Налоговый вычет 13 %.</strong> Подготовим справку
              об оплате медицинских услуг и копии документов для возврата НДФЛ — вычет можно
              оформить за себя и близких родственников (ст. 219 НК РФ).
            </p>
            <span className="label-caps rounded-full border border-brass/40 px-3.5 py-1.5 text-[0.55rem] whitespace-nowrap text-brass">
              документы за 1 день
            </span>
          </div>
        </Reveal>

        {/* legal documents */}
        <div className="mt-20">
          <Reveal>
            <h3 className="font-display text-3xl font-semibold text-olive-deep md:text-4xl">
              Документы и правовая информация
            </h3>
            <p className="mt-3 max-w-2xl text-[0.875rem] text-ink-soft">
              Публикуем обязательные сведения в соответствии с ФЗ-323 «Об основах охраны здоровья
              граждан», Правилами предоставления платных медицинских услуг (ПП РФ № 736) и ФЗ-152
              «О персональных данных».
            </p>
          </Reveal>
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {DOCS.map((d, i) => (
              <Reveal key={d.id} delay={(i % 3) * 70}>
                <button
                  onClick={() => openDoc(d.id)}
                  className="group h-full w-full rounded-xl border border-line bg-card p-6 text-left transition hover:border-brass hover:shadow-md"
                >
                  <span className="flex items-start justify-between">
                    <Icon name="doc" className="h-6 w-6 text-olive transition group-hover:text-brass" />
                    <Icon
                      name="arrow-right"
                      className="h-4 w-4 -rotate-45 text-brass opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100"
                    />
                  </span>
                  <span className="mt-4 block text-[0.95rem] leading-snug font-bold text-ink">
                    {d.title}
                  </span>
                  <span className="mt-2 block text-[0.72rem] leading-relaxed text-ink-faint">
                    {d.subtitle}
                  </span>
                </button>
              </Reveal>
            ))}
          </div>
          <Reveal delay={100}>
            <p className="mt-8 max-w-3xl text-[0.76rem] leading-relaxed text-ink-faint">
              Медицинская деятельность осуществляется на основании лицензии {CLINIC.license}{" "}
              ({CLINIC.licenseIssuer}). Сведения о врачах, их образовании, квалификации,
              аккредитации и графике работы предоставляются по телефону {CLINIC.phone} и на
              информационном стенде клиники.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}