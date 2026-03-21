"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RotateCcw, Share2 } from "lucide-react";
import items from "../../../../data/quranic-duaa.json";

type Item = {
  id: number;
  text: string;
  count: number;
  virtue?: string;
};

const STORAGE_KEY = "am_quranic_duaa_v1";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function QuranicDuaaPage() {
  const duaas = useMemo(() => items as Item[], []);
  const totalTarget = useMemo(() => duaas.reduce((a, d) => a + d.count, 0), [duaas]);

  const [doneById, setDoneById] = useState<Record<number, number>>({});
  const [justCompletedId, setJustCompletedId] = useState<number | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as { doneById?: Record<number, number> };
      if (parsed.doneById) setDoneById(parsed.doneById);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ doneById }));
    } catch {
      // ignore
    }
  }, [doneById]);

  const completedTotal = useMemo(
    () => duaas.reduce((a, d) => a + clamp(doneById[d.id] ?? 0, 0, d.count), 0),
    [duaas, doneById]
  );
  const progressPct = totalTarget ? Math.round((completedTotal / totalTarget) * 100) : 0;

  const increment = (item: Item) => {
    setDoneById((prev) => {
      const current = clamp(prev[item.id] ?? 0, 0, item.count);
      const next = Math.min(item.count, current + 1);
      const result = { ...prev, [item.id]: next };
      if (next === item.count) {
        setJustCompletedId(item.id);
        window.setTimeout(() => {
          setJustCompletedId((c) => (c === item.id ? null : c));
        }, 500);
      }
      return result;
    });
  };

  const reset = () => {
    setDoneById({});
    setJustCompletedId(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  const onShare = async () => {
    const text = "الأدعية القرآنية - أدعية من القرآن الكريم.";
    try {
      if (navigator.share) await navigator.share({ text });
      else if (navigator.clipboard) await navigator.clipboard.writeText(text);
    } catch {
      // ignore
    }
  };

  return (
    <main className="mx-auto w-full max-w-3xl px-2 pb-6">
      <section className="glass-panel p-5 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white sm:text-3xl">الأدعية القرآنية</h1>
            <p className="mt-2 text-sm text-white/60">أدعية من آيات القرآن الكريم.</p>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" onClick={onShare} className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5">
              <Share2 className="h-4 w-4 text-accent" />
            </button>
            <button type="button" onClick={reset} className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5">
              <RotateCcw className="h-4 w-4 text-accent" />
            </button>
          </div>
        </div>

        <div className="mt-5">
          <div className="flex items-center justify-between">
            <div className="text-xs text-white/55">التقدم</div>
            <div className="text-xs text-white/65">{progressPct}% ({completedTotal}/{totalTarget})</div>
          </div>
          <div className="mt-2 h-3 rounded-full border border-white/10 bg-white/5">
            <div className="h-full rounded-full bg-gradient-to-r from-primary/80 to-accent/80" style={{ width: `${progressPct}%` }} />
          </div>
        </div>

        <div className="mt-6 grid gap-3">
          {duaas.map((d, idx) => {
            const done = clamp(doneById[d.id] ?? 0, 0, d.count);
            const complete = done >= d.count;
            return (
              <motion.article key={d.id} className={["glass-card p-4 sm:p-5 border-white/10", complete ? "border-accent/30" : ""].join(" ")} initial={false} animate={{ scale: 1, opacity: 1 }}>
                <div className="text-[11px] text-white/55">الدعاء {idx + 1}</div>
                <div className="mt-2 max-h-[42vh] overflow-auto rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-right text-[1.45rem] font-bold leading-[1.75] text-white md:text-[1.9rem] lg:text-[2rem]">{d.text}</div>
                </div>
                {d.virtue ? (
                  <div className="mt-3 rounded-2xl border border-accent/25 bg-accent/10 p-3 text-sm leading-relaxed text-white/85">
                    <span className="text-accent font-semibold">الفضل: </span>
                    {d.virtue}
                  </div>
                ) : null}
                <div className="mt-3">
                  <button
                    type="button"
                    onClick={() => increment(d)}
                    className={[
                      "w-full rounded-2xl px-4 py-3 text-base font-bold transition",
                      complete ? "bg-white/10 text-white/85 border border-accent/25" : "bg-gradient-to-r from-primary/80 to-accent/80 text-black shadow-soft",
                    ].join(" ")}
                  >
                    {done} / {d.count}
                  </button>
                </div>

                <AnimatePresence>
                  {justCompletedId === d.id ? (
                    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }} className="mt-3 text-xs text-accent">
                      تمّ إكمال هذا الدعاء.
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </div>
      </section>
    </main>
  );
}

