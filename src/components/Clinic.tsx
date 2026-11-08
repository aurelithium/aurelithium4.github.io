import operatoryPhoto from "../assets/images/operatory.jpg";
import unitDetailPhoto from "../assets/images/unit-detail.jpg";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/utils/cn";
import { PHOTOS } from "@/data";
import { Icon, Reveal, SectionHead } from "./ui";

const PRINCIPLES = [
  {
    icon: "shield",
    title: "Безопасность прежде всего",
    text: "Стерилизация инструмента класса B с контролем каждого цикла, одноразовые расходные материалы, кварцевание кабинетов по СанПиН.",
  },
  {
    icon: "tooth",
    title: "Материалы, которым доверяем",
    text: "Сертифицированные материалы ведущих производителей, включая слепочные системы Coltene, — для точных и долговечных реставраций.",
  },
  {
    icon: "scan",
    title: "Цифровая диагностика",
    text: "Панорамный снимок ОПТГ выполняется прямо в клинике и сразу попадает к врачу — без лишних поездок и ожидания.",
  },
];

function Lightbox({
  index,
  onClose,
  onNav,
}: {
  index: number;
  onClose: () => void;
  onNav: (dir: 1 | -1) => void;
}) {
  const photo = PHOTOS[index];
  const touchX = useRef<number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNav(1);
      if (e.key === "ArrowLeft") onNav(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onNav]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={photo.caption}
      className="fade-in fixed inset-0 z-[80] flex flex-col items-center justify-center bg-olive-night/95 px-4 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 48) onNav(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      <button
        onClick={onClose}
        aria-label="Закрыть просмотр"
        className="absolute top-5 right-5 inline-flex h-11 w-11 items-center justify-center rounded-full border border-cream/25 text-cream transition hover:border-brass-soft hover:text-brass-soft"
      >
        <Icon name="close" className="h-5 w-5" />
      </button>

      <button
        onClick={() => onNav(-1)}
        aria-label="Предыдущее фото"
        className="absolute left-3 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-cream/25 text-cream transition hover:border-brass-soft hover:text-brass-soft md:left-6"
      >
        <Icon name="chevron-left" className="h-5 w-5" />
      </button>
      <button
        onClick={() => onNav(1)}
        aria-label="Следующее фото"
        className="absolute right-3 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-cream/25 text-cream transition hover:border-brass-soft hover:text-brass-soft md:right-6"
      >
        <Icon name="chevron-right" className="h-5 w-5" />
      </button>

      <figure className="pointer-events-none flex max-w-5xl flex-col items-center">
        <img
          key={photo.src}
          src={photo.src}
          alt={photo.alt}
          className="rise-in max-h-[74vh] w-auto max-w-full rounded-lg object-contain shadow-2xl"
        />
        <figcaption className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-1 px-10 text-center">
          <span className="font-display text-xl italic text-cream md:text-2xl">{photo.caption}</span>
          <span className="label-caps text-[0.6rem] text-cream/50">
            {String(index + 1).padStart(2, "0")} / {String(PHOTOS.length).padStart(2, "0")}
          </span>
        </figcaption>
      </figure>
    </div>
  );
}

export default function Clinic() {
  const [lb, setLb] = useState<number | null>(null);

  const nav = (dir: 1 | -1) =>
    setLb((cur) => (cur === null ? cur : (cur + dir + PHOTOS.length) % PHOTOS.length));

  return (
    <section id="clinic" className="relative overflow-hidden py-24 md:py-28">
      <Icon
        name="tooth"
        className="pointer-events-none absolute -left-24 top-40 hidden h-[380px] w-[380px] -rotate-12 text-olive opacity-[0.045] lg:block"
        strokeWidth={0.5}
      />
      <div className="relative mx-auto w-full max-w-7xl px-5 md:px-6">
        <SectionHead
          no="03"
          label="Клиника"
          title={
            <>
              Пространство, продуманное <em className="text-brass italic">до мелочей</em>
            </>
          }
          text="«Инлайт» — камерная частная стоматология для взрослых. Тёплый свет, тишина, отсутствие больничных запахов и очередей — всё, чтобы визит к стоматологу перестал быть испытанием."
        />

        <div className="mt-16 grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
          {/* photo composition */}
          <Reveal className="relative order-2 lg:order-1">
            <div className="frame-brass arch w-[74%]">
              <div className="arch aspect-[4/5] overflow-hidden bg-olive-mist">
                <img
                  src={operatoryPhoto}
                  alt="Стоматологический кабинет клиники «Инлайт»"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="absolute -bottom-8 right-0 w-[46%] overflow-hidden rounded-xl border-[6px] border-card shadow-2xl shadow-ink/25">
              <img
                src={unitDetailPhoto}
                alt="Оснащение стоматологической установки"
                className="aspect-[3/4] w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute top-6 right-0 flex items-center gap-3 rounded-xl border border-line bg-card px-4 py-3 shadow-lg shadow-ink/10 sm:right-4">
              <Icon name="shield" className="h-6 w-6 text-ok" />
              <div>
                <p className="text-[0.78rem] font-bold text-ink">Стерилизация класса B</p>
                <p className="text-[0.66rem] text-ink-faint">по СанПиН 2.1.3678-20</p>
              </div>
            </div>
          </Reveal>

          {/* principles */}
          <div className="order-1 lg:order-2">
            <Reveal>
              <p className="text-[0.95rem] leading-relaxed text-ink-soft">
                Мы построили клинику, в которую не страшно приходить: врач сначала объясняет,
                а потом лечит; администратор помнит ваше имя; стоимость не меняется в процессе.
                Каждый кабинет оснащён современной стоматологической установкой, а инструмент
                проходит полный цикл обработки перед каждым пациентом.
              </p>
            </Reveal>
            <div className="mt-9 space-y-7">
              {PRINCIPLES.map((p, i) => (
                <Reveal key={p.title} delay={i * 90}>
                  <div className="flex gap-5">
                    <span className="mt-0.5 inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-brass/40 text-brass">
                      <Icon name={p.icon} className="h-5.5 w-5.5" />
                    </span>
                    <div>
                      <h3 className="font-display text-xl font-semibold text-olive-deep">{p.title}</h3>
                      <p className="mt-1.5 text-[0.875rem] leading-relaxed text-ink-soft">{p.text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* gallery */}
        <div className="mt-28">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h3 className="font-display text-3xl font-semibold text-olive-deep md:text-4xl">
                Фотографии клиники
              </h3>
              <p className="label-caps flex items-center gap-2 pb-1.5 text-[0.58rem] text-ink-faint">
                <Icon name="scan" className="h-4 w-4 text-brass" />
                Нажмите на фото, чтобы рассмотреть
              </p>
            </div>
          </Reveal>

          <div className="mt-9 columns-1 gap-4 sm:columns-2 lg:columns-3">
            {PHOTOS.map((ph, i) => (
              <Reveal key={ph.src} delay={(i % 3) * 70} className="mb-4 break-inside-avoid">
                <figure
                  className="group relative cursor-zoom-in overflow-hidden rounded-xl bg-olive-mist"
                  onClick={() => setLb(i)}
                >
                  <button
                    aria-label={`Открыть фото: ${ph.caption}`}
                    className="block w-full cursor-zoom-in"
                    onClick={(e) => {
                      e.stopPropagation();
                      setLb(i);
                    }}
                  >
                    <img
                      src={ph.src}
                      alt={ph.alt}
                      loading="lazy"
                      style={ph.pos ? { objectPosition: ph.pos } : undefined}
                      className={cn(
                        "w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]",
                        ph.wide ? "aspect-[16/11]" : "aspect-[4/5]",
                      )}
                    />
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink/70 to-transparent opacity-80 transition-opacity group-hover:opacity-100"
                    />
                    <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between p-4">
                      <span className="font-display text-lg italic text-cream">{ph.caption}</span>
                      <span className="label-caps pb-0.5 text-[0.52rem] text-cream/65">
                        {String(i + 1).padStart(2, "0")} / {String(PHOTOS.length).padStart(2, "0")}
                      </span>
                    </span>
                  </button>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {lb !== null && <Lightbox index={lb} onClose={() => setLb(null)} onNav={nav} />}
    </section>
  );
}