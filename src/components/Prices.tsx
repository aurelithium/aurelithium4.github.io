import { useState } from "react";
import { cn } from "@/utils/cn";
import { CLINIC, PRICE_GROUPS, WARNING } from "@/data";
import { Icon, Reveal, SectionHead, WarningStrip } from "./ui";

function printPriceList() {
  const rows = PRICE_GROUPS.map(
    (g) => `
      <h2>${g.label}</h2>
      <table>
        ${g.items
          .map(
            (it) => `<tr>
              <td>${it.name}${it.turnkey ? ' <span class="tk">под ключ</span>' : ""}${it.star ? "*" : ""}</td>
              <td class="price">${it.price}</td>
            </tr>`,
          )
          .join("")}
      </table>`,
  ).join("");

  const html = `<!doctype html><html lang="ru"><head><meta charset="utf-8">
    <title>Прейскурант — Инлайт, частная стоматология</title>
    <style>
      body{font-family:Georgia,'Times New Roman',serif;color:#26231a;margin:48px;font-size:13px}
      .head{display:flex;justify-content:space-between;align-items:baseline;border-bottom:2px solid #48523a;padding-bottom:14px}
      .brand{font-size:26px;letter-spacing:8px;font-weight:bold;color:#333d28}
      .muted{color:#6b6552;font-size:11px}
      h1{font-size:20px;margin:26px 0 4px}
      h2{font-size:15px;margin:22px 0 8px;color:#48523a;text-transform:uppercase;letter-spacing:2px}
      table{width:100%;border-collapse:collapse}
      td{padding:7px 4px;border-bottom:1px dotted #b9b19a;vertical-align:top}
      .price{text-align:right;white-space:nowrap;font-weight:bold;width:130px}
      .tk{font-size:9px;border:1px solid #a98a4f;color:#a98a4f;border-radius:8px;padding:1px 6px;white-space:nowrap}
      .legal{margin-top:26px;font-size:10px;color:#6b6552;line-height:1.6}
      .warn{margin-top:16px;border:1px solid #48523a;padding:10px;text-align:center;letter-spacing:2px;font-size:10px;text-transform:uppercase}
    </style></head><body>
    <div class="head">
      <div><div class="brand">ИНЛАЙТ</div><div class="muted">частная стоматология для взрослых</div></div>
      <div class="muted" style="text-align:right">${CLINIC.address}<br>${CLINIC.phone} · ${CLINIC.hours}</div>
    </div>
    <h1>Прейскурант на медицинские услуги</h1>
    <div class="muted">Действует с ${CLINIC.updated} г. · Данные актуальны</div>
    ${rows}
    <div class="legal">
      * Norma — комплексный протокол профессиональной гигиены для обеих челюстей.<br>
      Информация о ценах не является публичной офертой (ст. 437 ГК РФ). Итоговая стоимость определяется врачом после осмотра
      и фиксируется в договоре. ${CLINIC.legalName}, ИНН ${CLINIC.inn}. Лицензия ${CLINIC.license}, выдана: ${CLINIC.licenseIssuer}.
    </div>
    <div class="warn">${WARNING}</div>
    <script>window.onload=function(){setTimeout(function(){window.print()},250)}<\/script>
    </body></html>`;

  const w = window.open("", "_blank", "width=860,height=960");
  if (!w) {
    window.alert("Чтобы сохранить прайс в PDF, разрешите всплывающие окна для этого сайта.");
    return;
  }
  w.document.write(html);
  w.document.close();
  w.focus();
}

export default function Prices({ onBook }: { onBook: (service: string) => void }) {
  const [active, setActive] = useState("consult");
  const group = PRICE_GROUPS.find((g) => g.id === active) ?? PRICE_GROUPS[0];

  return (
    <section id="prices" className="border-y border-line bg-cream py-24 md:py-28">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-6">
        <SectionHead
          no="02"
          label="Прейскурант"
          title={
            <>
              Честные цены — <em className="text-brass italic">«под ключ»</em>
            </>
          }
          text="Стоимость лечения фиксируется в плане и договоре до его начала. «Под ключ» означает, что в цену уже включены анестезия, материалы и работа врача."
          center
        />

        {/* meta row */}
        <Reveal delay={120} className="mt-12">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-2 rounded-full border border-ok/25 bg-ok/10 px-3.5 py-1.5 text-[0.7rem] font-bold text-ok">
                <span className="h-1.5 w-1.5 rounded-full bg-ok" />
                Данные актуальны
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-3.5 py-1.5 text-[0.7rem] font-semibold text-ink-soft">
                <Icon name="calendar" className="h-3.5 w-3.5 text-brass" />
                Действует с {CLINIC.updated}
              </span>
            </div>
            <button
              onClick={printPriceList}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-4 py-2 text-[0.72rem] font-bold text-ink-soft transition hover:border-brass hover:text-brass"
            >
              <Icon name="print" className="h-4 w-4" />
              Сохранить прайс в PDF
            </button>
          </div>
        </Reveal>

        {/* tabs */}
        <Reveal delay={160} className="mt-6">
          <div className="flex flex-wrap gap-2.5" role="tablist" aria-label="Разделы прейскуранта">
            {PRICE_GROUPS.map((g) => (
              <button
                key={g.id}
                role="tab"
                aria-selected={active === g.id}
                onClick={() => setActive(g.id)}
                className={cn(
                  "rounded-full border px-5 py-2.5 text-[0.82rem] font-bold transition-all",
                  active === g.id
                    ? "border-olive bg-olive text-cream shadow-md shadow-olive/25"
                    : "border-line bg-card text-ink-soft hover:border-olive-soft hover:text-olive-deep",
                )}
              >
                {g.label}
                <span className={cn("font-display ml-2 italic", active === g.id ? "text-brass-soft" : "text-brass")}>
                  {g.items.length}
                </span>
              </button>
            ))}
          </div>
        </Reveal>

        {/* price rows */}
        <Reveal delay={200} className="mt-5">
          <div key={group.id} className="rise-in overflow-hidden rounded-2xl border border-line bg-card shadow-sm">
            <ul className="divide-y divide-line">
              {group.items.map((it) => (
                <li
                  key={it.name}
                  className="group flex flex-wrap items-baseline gap-x-3 gap-y-1.5 px-6 py-5 transition-colors hover:bg-cream md:px-8"
                >
                  <span className="text-[0.93rem] font-semibold text-ink">
                    {it.name}
                    {it.star && <sup className="text-brass">*</sup>}
                  </span>
                  {it.turnkey && (
                    <span className="label-caps rounded-full border border-brass/40 px-2.5 py-1 text-[0.5rem] whitespace-nowrap text-brass">
                      под ключ
                    </span>
                  )}
                  <span className="leader hidden sm:block" aria-hidden />
                  <span
                    className={cn(
                      "font-display ml-auto text-xl font-semibold whitespace-nowrap sm:ml-0 md:text-[1.45rem]",
                      it.free ? "text-ok italic" : "text-olive-deep",
                    )}
                  >
                    {it.price}
                  </span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line bg-paper px-6 py-4 md:px-8">
              <p className="text-[0.75rem] text-ink-faint">
                Не нашли нужную услугу? Полный прейскурант — на ресепшен и по телефону.
              </p>
              <a
                href="#booking"
                onClick={() => onBook("Бесплатная консультация")}
                className="label-caps group inline-flex items-center gap-2 text-[0.6rem] text-brass transition hover:text-olive-deep"
              >
                Записаться на консультацию
                <Icon name="arrow-right" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120} className="mt-7">
          <div className="mx-auto max-w-3xl space-y-2 text-center text-[0.76rem] leading-relaxed text-ink-faint">
            <p>
              * Norma — комплексный протокол профессиональной гигиены для обеих челюстей: ультразвук,
              воздушно-абразивная обработка, полировка и укрепление эмали.
            </p>
            <p>
              Информация о ценах не является публичной офертой (ст. 437 ГК РФ). Итоговая стоимость
              определяется врачом после осмотра и закрепляется в договоре и плане лечения.
            </p>
          </div>
          <WarningStrip className="mt-8" />
        </Reveal>
      </div>
    </section>
  );
}