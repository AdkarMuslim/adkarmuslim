"use client";

import ContentPageFooter from "../../../components/ContentPageFooter";
import { useEffect, useMemo, useState } from "react";
import dhikrsData from "../../../../data/adkar-sabah.json";
import { CheckCircle2, RotateCcw, Share2 } from "lucide-react";

type Dhikr = {
  id: number;
  text: string;
  transliteration?: string;
  translation_fr: string;
  translation_en?: string;
  count: number;
  source?: string;
  virtue?: string;
  audio?: string;
  category?: string;
};

const STORAGE_KEY = "am_adkar_sabah_v1";

type SabahStored = {
  doneById?: Record<number, number>;
};

function formatCountTarget(n: number) {
  if (n === 1) return "مرة واحدة";
  return `${n} مرات`;
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function AdkarSabahPage() {
  const dhikrs = useMemo(() => dhikrsData as Dhikr[], []);
  const totalTarget = useMemo(() => dhikrs.reduce((acc, d) => acc + d.count, 0), [dhikrs]);

  const [doneById, setDoneById] = useState<Record<number, number>>({});

  const [justCompletedId, setJustCompletedId] = useState<number | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as SabahStored & { persistProgress?: boolean };
      if (parsed.doneById) setDoneById(parsed.doneById);
    } catch {
      // ignore
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          doneById,
        } satisfies SabahStored),
      );
    } catch {
      // ignore
    }
  }, [doneById]);

  const completedTotal = useMemo(() => {
    return dhikrs.reduce((acc, d) => acc + clamp(doneById[d.id] ?? 0, 0, d.count), 0);
  }, [dhikrs, doneById]);

  const progressPct = totalTarget === 0 ? 0 : Math.round((completedTotal / totalTarget) * 100);

  const incrementDhikr = (dhikr: Dhikr) => {
    if (!dhikr) return;

    setDoneById((prev) => {
      const currentDone = clamp(prev[dhikr.id] ?? 0, 0, dhikr.count);
      const nextDone = Math.min(dhikr.count, currentDone + 1);
      const next = { ...prev, [dhikr.id]: nextDone };

      if (nextDone === dhikr.count) {
        setJustCompletedId(dhikr.id);
        window.setTimeout(() => {
          setJustCompletedId((current) => (current === dhikr.id ? null : current));
        }, 500);
      }

      return next;
    });
  };

  const resetProgress = () => {
    setDoneById({});
    setJustCompletedId(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  const onShare = async () => {
    // Share is optional; keep it safe if not supported.
    const text =
      "أذكار الصباح - أكملت جزءًا منها اليوم. بارك الله فيك.";
    try {
      if (navigator.share) {
        await navigator.share({ text });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
      }
    } catch {
      // ignore
    }
  };

  return (
    <main className="mx-auto w-full max-w-3xl px-2 pb-6">
      <section className="glass-panel ring-accent/0 p-5 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white sm:text-3xl">أذكار الصباح</h1>
            <p className="mt-3 text-sm leading-relaxed text-white/75">
              هنا تجد أذكار الصباح مكتوبة كاملة ضمن حصن المسلم اليومي: نصوص من القرآن والسنة مع ترجمة تسهّل الفهم.
              استخدم العداد بعد الفجر لمراجعة الأذكار بخشوع؛ لا يشترط إتمام الذكر الأول قبل الثاني.
            </p>
            <p className="mt-2 text-sm text-white/55">
              اختَر أي ذكر تريده، واضغط على زرّ العدّ الخاص به.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onShare}
              className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/75 transition hover:bg-white/10"
              aria-label="مشاركة"
              title="مشاركة"
            >
              <Share2 className="h-4 w-4 text-accent" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={resetProgress}
              className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/75 transition hover:bg-white/10"
              aria-label="إعادة"
              title="إعادة"
            >
              <RotateCcw className="h-4 w-4 text-accent" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="mt-5">
          <div className="flex items-center justify-between gap-4">
            <div className="text-xs text-white/55">التقدم</div>
            <div className="text-xs text-white/65">
              {progressPct}% ({completedTotal}/{totalTarget})
            </div>
          </div>
          <div className="mt-2 h-3 rounded-full border border-white/10 bg-white/5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary/80 to-accent/80"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        <div className="mt-6 grid gap-3">
          {dhikrs.map((d, idx) => {
            const done = clamp(doneById[d.id] ?? 0, 0, d.count);
            const target = d.count;
            const completed = done >= target;

            return (
              <article
                key={d.id}
                className={[
                  "glass-card p-4 sm:p-5",
                  "border-white/10",
                  completed ? "border-accent/30" : "",
                ].join(" ")}
              >
                <div className="flex flex-col gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <div className="text-[11px] text-white/55">الذكر {idx + 1}</div>
                      {completed ? (
                        <span className="inline-flex items-center gap-1 text-xs text-accent">
                          <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                          مكتمل
                        </span>
                      ) : null}
                    </div>
                    <div className="mt-2 max-h-[42vh] w-full overflow-auto overscroll-contain rounded-2xl border border-white/10 bg-white/5 p-4 ">
                      <div className="w-full text-right text-[1.45rem] font-bold leading-[1.75] text-white md:text-[1.9rem] lg:text-[2rem]">
                        {d.text}
                      </div>
                    </div>

                    {d.virtue ? (
                      <div className="mt-3 rounded-2xl border border-accent/25 bg-accent/10 p-3 text-sm leading-relaxed text-white/85">
                        <span className="text-accent font-semibold">الفضل: </span>
                        {d.virtue}
                      </div>
                    ) : null}

                    {/* إخفاء سطر المصدر في الواجهة بناء على طلبك */}
                  </div>

                  <div className="flex flex-col items-stretch gap-2">
                    <div className="text-[11px] text-white/55">{formatCountTarget(target)}</div>

                    <button
                      type="button"
                      onClick={() => incrementDhikr(d)}
                      className={[
                        "w-full rounded-2xl px-4 py-3 text-base font-bold transition",
                        completed
                          ? "bg-white/10 text-white/85 border border-accent/25"
                          : "bg-gradient-to-r from-primary/80 to-accent/80 text-black shadow-soft",
                      ].join(" ")}
                      aria-label="زيادة العدّ لهذا الذكر"
                    >
                      {done} / {target}
                    </button>

                    <div className="text-[11px] text-white/55">
                      اضغط على الزر حتى تُكمل {formatCountTarget(target)}.
                    </div>

                    <div className="h-2 w-full rounded-full border border-white/10 bg-white/5">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-primary/70 to-accent/70"
                        style={{ width: `${target === 0 ? 0 : Math.round((done / target) * 100)}%` }}
                      />
                    </div>
                  </div>
                </div>

                {justCompletedId === d.id ? (
                  <div className="mt-3 text-xs text-accent">تمّ الإكمال. ننتقل للذكر التالي...</div>
                ) : null}
              </article>
            );
          })}
        </div>

        <ContentPageFooter
          primaryLink={{ href: "/adkar", label: "فهرس الأذكار" }}
          related={[
            { href: "/adkar/massa", label: "أذكار المساء" },
            { href: "/adkar/nawm", label: "أذكار النوم" },
            { href: "/quran", label: "القرآن الكريم" },
          ]}
          peerHub={{ href: "/duaa", label: "الأدعية" }}
        />
      </section>
    </main>
  );
}

