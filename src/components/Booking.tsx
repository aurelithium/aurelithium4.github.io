import { useEffect, useState, type FormEvent } from "react";
import { cn } from "@/utils/cn";
import { CLINIC, SERVICES } from "@/data";
import { Icon, Reveal, SectionHead, WarningStrip } from "./ui";

const TIMES = ["Ближайшее время", "Утро (09:00–12:00)", "День (12:00–17:00)", "Вечер (17:00–21:00)"];

function formatPhone(v: string) {
  let d = v.replace(/\D/g, "");
  if (!d) return "";
  if (d.startsWith("8")) d = "7" + d.slice(1);
  if (!d.startsWith("7")) d = "7" + d;
  d = d.slice(0, 11);
  let out = "+7";
  if (d.length > 1) out += " (" + d.slice(1, 4);
  if (d.length >= 5) out += ") " + d.slice(4, 7);
  if (d.length >= 8) out += "-" + d.slice(7, 9);
  if (d.length >= 10) out += "-" + d.slice(9, 11);
  return out;
}

interface Sent {
  name: string;
  phone: string;
  service: string;
  time: string;
}

export default function Booking({
  prefill,
  openDoc,
}: {
  prefill: string | null;
  openDoc: (id: string) => void;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("Бесплатная консультация");
  const [time, setTime] = useState(TIMES[0]);
  const [comment, setComment] = useState("");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; phone?: string; consent?: string }>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState<Sent | null>(null);

  useEffect(() => {
    if (prefill) {
      setService(prefill);
      setSent(null);
    }
  }, [prefill]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const errs: typeof errors = {};
    if (name.trim().length < 2) errs.name = "Пожалуйста, укажите имя";
    if (phone.replace(/\D/g, "").length !== 11) errs.phone = "Укажите номер телефона полностью";
    if (!consent) errs.consent = "Для отправки заявки необходимо согласие";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setSending(true);
    window.setTimeout(() => {
      const record = { name: name.trim(), phone, service, time, comment, date: new Date().toISOString() };
      try {
        const prev = JSON.parse(localStorage.getItem("inlight-requests") ?? "[]") as unknown[];
        localStorage.setItem("inlight-requests", JSON.stringify([...prev, record]));
      } catch {
        /* storage unavailable — заявка всё равно показана пользователю */
      }
      setSending(false);
      setSent({ name: name.trim(), phone, service, time });
    }, 900);
  };

  const reset = () => {
    setSent(null);
    setName("");
    setPhone("");
    setComment("");
    setConsent(false);
    setService("Бесплатная консультация");
    setTime(TIMES[0]);
    setErrors({});
  };

  return (
    <section id="booking" className="relative overflow-hidden bg-olive-night py-24 md:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-[-8%] h-[520px] w-[520px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(169,138,79,0.28), transparent 65%)" }}
      />
      <Icon
        name="tooth"
        className="pointer-events-none absolute right-[-4%] bottom-[-8%] hidden h-[420px] w-[420px] rotate-12 text-cream opacity-[0.04] lg:block"
        strokeWidth={0.5}
      />

      <div className="relative mx-auto grid w-full max-w-7xl gap-14 px-5 md:px-6 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col justify-center">
          <SectionHead
            dark
            no="05"
            label="Запись на приём"
            title={
              <>
                Начните с <em className="text-brass-soft italic">бесплатной</em> консультации
              </>
            }
            text="Оставьте заявку — администратор перезвонит, ответит на вопросы и подберёт удобное время. Первичная консультация врача любого направления — 0 ₽ и ни к чему не обязывает."
          />
          <Reveal delay={150}>
            <div className="mt-10 space-y-5">
              <a
                href={CLINIC.phoneHref}
                className="font-display block text-3xl font-semibold text-brass-soft transition hover:text-cream md:text-4xl"
              >
                {CLINIC.phone}
              </a>
              <p className="flex items-center gap-3 text-sm text-cream/70">
                <Icon name="clock" className="h-4.5 w-4.5 text-brass-soft" />
                {CLINIC.hours}
              </p>
              <p className="flex items-center gap-3 text-sm text-cream/70">
                <Icon name="pin" className="h-4.5 w-4.5 text-brass-soft" />
                {CLINIC.address} · {CLINIC.metro}
              </p>
            </div>
          </Reveal>
          <Reveal delay={230}>
            <ul className="mt-10 space-y-3 border-t border-cream/15 pt-8">
              {[
                "Перезвоним в течение 15 минут в часы работы клиники",
                "Напомним о визите накануне — смс или звонком",
                "Никаких навязанных услуг: план лечения согласуем с вами",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3 text-[0.85rem] text-cream/75">
                  <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-brass-soft" strokeWidth={2} />
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* form card */}
        <Reveal delay={120}>
          <div className="rounded-2xl border border-brass/25 bg-cream p-7 shadow-2xl shadow-black/30 md:p-9">
            {sent ? (
              <div className="rise-in flex min-h-[430px] flex-col items-center justify-center text-center">
                <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-ok/10 text-ok">
                  <Icon name="check" className="h-8 w-8" strokeWidth={2} />
                </span>
                <h3 className="font-display mt-6 text-3xl font-semibold text-olive-deep">
                  Заявка отправлена
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-soft">
                  {sent.name}, спасибо! Администратор перезвонит на номер{" "}
                  <strong className="text-olive-deep">{sent.phone}</strong> в течение 15 минут
                  в часы работы клиники и подтвердит запись.
                </p>
                <dl className="mt-7 w-full max-w-sm space-y-2.5 rounded-xl border border-line bg-card p-5 text-left text-[0.82rem]">
                  <div className="flex justify-between gap-4">
                    <dt className="text-ink-faint">Направление</dt>
                    <dd className="text-right font-semibold text-olive-deep">{sent.service}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-ink-faint">Удобное время</dt>
                    <dd className="text-right font-semibold text-olive-deep">{sent.time}</dd>
                  </div>
                </dl>
                <button
                  onClick={reset}
                  className="label-caps mt-8 text-[0.62rem] text-brass underline-offset-4 transition hover:text-olive-deep hover:underline"
                >
                  Отправить ещё одну заявку
                </button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate>
                <h3 className="font-display text-[1.7rem] font-semibold text-olive-deep">
                  Заявка на приём
                </h3>
                <p className="mt-1 text-[0.78rem] text-ink-faint">
                  Заполните форму — это займёт меньше минуты.
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="bk-name" className="label-caps mb-1.5 block text-[0.55rem] text-ink-faint">
                      Ваше имя *
                    </label>
                    <input
                      id="bk-name"
                      type="text"
                      autoComplete="name"
                      placeholder="Анна"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={cn("field", errors.name && "field-error")}
                    />
                    {errors.name && <p className="mt-1 text-[0.7rem] text-danger">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="bk-phone" className="label-caps mb-1.5 block text-[0.55rem] text-ink-faint">
                      Телефон *
                    </label>
                    <input
                      id="bk-phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder="+7 (___) ___-__-__"
                      value={phone}
                      onChange={(e) => setPhone(formatPhone(e.target.value))}
                      className={cn("field", errors.phone && "field-error")}
                    />
                    {errors.phone && <p className="mt-1 text-[0.7rem] text-danger">{errors.phone}</p>}
                  </div>
                </div>

                <div className="mt-4">
                  <label htmlFor="bk-service" className="label-caps mb-1.5 block text-[0.55rem] text-ink-faint">
                    Направление
                  </label>
                  <select
                    id="bk-service"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="field"
                  >
                    {SERVICES.map((s) => (
                      <option key={s.id} value={s.title}>
                        {s.title}
                        {s.id === "consult" ? " — 0 ₽" : ""}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mt-4">
                  <label htmlFor="bk-time" className="label-caps mb-1.5 block text-[0.55rem] text-ink-faint">
                    Удобное время
                  </label>
                  <select id="bk-time" value={time} onChange={(e) => setTime(e.target.value)} className="field">
                    {TIMES.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div className="mt-4">
                  <label htmlFor="bk-comment" className="label-caps mb-1.5 block text-[0.55rem] text-ink-faint">
                    Комментарий
                  </label>
                  <textarea
                    id="bk-comment"
                    rows={2}
                    placeholder="Что беспокоит? Острая боль, вопрос по лечению…"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="field resize-none"
                  />
                </div>

                <label className="mt-5 flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 h-4 w-4 shrink-0 accent-olive"
                  />
                  <span className="text-[0.72rem] leading-relaxed text-ink-soft">
                    Я даю{" "}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        openDoc("consent");
                      }}
                      className="font-semibold text-info underline underline-offset-2 hover:text-olive-deep"
                    >
                      согласие на обработку персональных данных
                    </button>{" "}
                    и ознакомлен(а) с{" "}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        openDoc("privacy");
                      }}
                      className="font-semibold text-info underline underline-offset-2 hover:text-olive-deep"
                    >
                      политикой конфиденциальности
                    </button>
                    .
                  </span>
                </label>
                {errors.consent && <p className="mt-1.5 text-[0.7rem] text-danger">{errors.consent}</p>}

                <button
                  type="submit"
                  disabled={sending}
                  className="mt-6 flex w-full items-center justify-center gap-2.5 rounded-full bg-olive py-4 text-sm font-bold text-cream shadow-lg shadow-olive/25 transition hover:bg-olive-night disabled:cursor-wait disabled:opacity-70"
                >
                  {sending ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-cream/40 border-t-cream" />
                      Отправляем…
                    </>
                  ) : (
                    <>
                      Отправить заявку
                      <Icon name="arrow-right" className="h-4 w-4" />
                    </>
                  )}
                </button>
                <p className="mt-3.5 text-center text-[0.66rem] text-ink-faint">
                  Данные хранятся на территории РФ и не передаются третьим лицам (152-ФЗ).
                </p>
              </form>
            )}
          </div>
        </Reveal>
      </div>

      <WarningStrip dark className="relative mt-16 px-6" />
    </section>
  );
}