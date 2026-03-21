"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, Share2 } from "lucide-react";
import names from "../../../../data/asma-alhusna.json";

type NameItem = {
  id: number;
  name: string;
  fullMeaning: string;
  words: Array<{ word: string; meaning: string }>;
};

const STORAGE_KEY = "am_asma_alhusna_v1";

export default function AsmaAlhusnaPage() {
  const items = useMemo(() => names as NameItem[], []);
  const [selectedId, setSelectedId] = useState<number>(items[0]?.id ?? 1);
  const [copied, setCopied] = useState(false);
  const [showParts, setShowParts] = useState(true);
  const [showQuranBlock, setShowQuranBlock] = useState(true);
  const [showHadithBlock, setShowHadithBlock] = useState(false);
  const [mobileSheetOpen, setMobileSheetOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as { selectedId?: number };
      if (parsed?.selectedId) setSelectedId(parsed.selectedId);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ selectedId }));
    } catch {
      // ignore
    }
  }, [selectedId]);

  const selected = useMemo(() => items.find((n) => n.id === selectedId) ?? items[0], [items, selectedId]);

  useEffect(() => {
    // On mobile, show the details in a bottom sheet to avoid scrolling.
    setMobileSheetOpen(true);
  }, [selectedId]);

  const onCopyName = async () => {
    const text = selected?.name ?? "";
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback: best-effort
        const ta = document.createElement("textarea");
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      // ignore
    }
  };

  const onShare = async () => {
    const text = `${selected?.name ?? ""} - ${selected?.fullMeaning ?? ""}`;
    try {
      if (navigator.share) await navigator.share({ text });
      else if (navigator.clipboard) await navigator.clipboard.writeText(text);
    } catch {
      // ignore
    }
  };

  return (
    <main className="mx-auto w-full max-w-6xl px-2 pb-6">
      <section className="glass-panel p-4 sm:p-7">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white sm:text-3xl">أسماء الله الحسنى</h1>
            <p className="mt-2 text-sm text-white/60">
              اضغط على أي اسم لعرض الشرح (معنى كل جزء من الاسم).
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onCopyName}
              className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/75 transition hover:bg-white/10"
              aria-label="نسخ"
              title="نسخ الاسم"
            >
              {copied ? <Check className="h-5 w-5 text-accent" aria-hidden="true" /> : <Copy className="h-5 w-5 text-accent" aria-hidden="true" />}
            </button>
            <button
              type="button"
              onClick={onShare}
              className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/75 transition hover:bg-white/10"
              aria-label="مشاركة"
              title="مشاركة"
            >
              <Share2 className="h-5 w-5 text-accent" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Desktop details */}
        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-5">
          <div className="min-w-0 lg:col-span-3">
            <div className="text-xs text-white/55">الأسماء</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {items.map((item) => {
                const active = item.id === selectedId;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedId(item.id)}
                    className={[
                      "rounded-xl px-3 py-2 text-base font-bold transition",
                      "border border-white/10 bg-white/5 text-white/85",
                      active
                        ? "border-accent/40 bg-accent/15 text-accent shadow-soft"
                        : "hover:bg-white/10",
                    ].join(" ")}
                    aria-pressed={active}
                    aria-label={`عرض شرح ${item.name}`}
                    title={item.name}
                  >
                    {item.name}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="hidden min-w-0 lg:block lg:col-span-2">
            <div className="text-xs text-white/55">الشرح</div>
            <div className="mt-2 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-center text-lg font-bold text-white">{selected?.name}</div>
              <div className="mt-2 text-sm leading-relaxed text-white/70">
                {selected?.fullMeaning}
              </div>

              <div className="mt-4 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => setShowParts((s) => !s)}
                  className={[
                    "w-full rounded-xl border px-4 py-3 text-right transition",
                    "border-accent/25 bg-accent/10 text-accent",
                  ].join(" ")}
                  aria-expanded={showParts}
                >
                  معنى كل جزء
                </button>

                <AnimatePresence initial={false}>
                  {showParts ? (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="mt-2 flex flex-col gap-2"
                    >
                      {selected?.words.map((w, idx) => (
                        <div
                          key={`${w.word}-${idx}`}
                          className="rounded-xl border border-white/10 bg-black/10 p-3"
                        >
                          <div className="text-accent font-bold">{w.word}</div>
                          <div className="mt-1 text-sm text-white/70">{w.meaning}</div>
                        </div>
                      ))}
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>

              <div className="mt-4 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => setShowQuranBlock((s) => !s)}
                  className={[
                    "w-full rounded-xl border px-4 py-3 text-right transition",
                    "border-white/10 bg-white/5 text-white/85 hover:bg-white/10",
                  ].join(" ")}
                  aria-expanded={showQuranBlock}
                >
                  الأسماء الحسنى في القرآن
                </button>

                <AnimatePresence initial={false}>
                  {showQuranBlock ? (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="mt-1"
                    >
                      <div className="rounded-xl border border-white/10 bg-black/10 p-3">
                        <div className="text-xs text-white/55">قال تعالى :</div>
                        <div className="mt-2 space-y-2 text-sm leading-relaxed text-white/75">
                          <div>
                            "وَلِلّهِ الأَسْمَاء الْحُسْنَى فَادْعُوهُ بِهَا وَذَرُواْ الَّذِينَ يُلْحِدُونَ فِي أَسْمَآئِهِ سَيُجْزَوْنَ مَا كَانُواْ يَعْمَلُونَ".
                            <span className="text-white/50"> [الأعراف - 180]</span>
                          </div>
                          <div>
                            "قُلِ ادْعُوا اللَّهَ أَوِ ادْعُوا الرَّحْمَنَ أَيًّا مَا تَدْعُوا فَلَهُ الْأَسْمَاءُ الْحُسْنَى وَلَا تَجْهَرْ بِصَلَاتِكَ وَلَا تُخَافِتْ بِهَا وَابْتَغِ بَيْنَ ذَلِكَ سَبِيلًا".
                            <span className="text-white/50"> [الإسراء - 110]</span>
                          </div>
                          <div>
                            "اللَّهُ لَا إِلَهَ إِلَّا هُوَ لَهُ الْأَسْمَاءُ الْحُسْنَى".
                            <span className="text-white/50"> [طه - 8]</span>
                          </div>
                          <div>
                            "هُوَ اللَّهُ الْخَالِقُ الْبَارِئُ الْمُصَوِّرُ لَهُ الْأَسْمَاءُ الْحُسْنَى يُسَبِّحُ لَهُ مَا فِي السَّمَاوَاتِ وَالْأَرْضِ وَهُوَ الْعَزِيزُ الْحَكِيمُ".
                            <span className="text-white/50"> [الحشر - 24]</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>

                <button
                  type="button"
                  onClick={() => setShowHadithBlock((s) => !s)}
                  className={[
                    "w-full rounded-xl border px-4 py-3 text-right transition",
                    "border-white/10 bg-white/5 text-white/85 hover:bg-white/10",
                  ].join(" ")}
                  aria-expanded={showHadithBlock}
                >
                  الأسماء الحسنى في الحديث
                </button>

                <AnimatePresence initial={false}>
                  {showHadithBlock ? (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="mt-1"
                    >
                      <div className="rounded-xl border border-white/10 bg-black/10 p-3">
                        <div className="text-xs text-white/55">قَالَ رَسُولُ اللَّهِ ﷺ :</div>
                        <div className="mt-2 text-sm leading-relaxed text-white/75">
                          "إِنَّ لِلَّهِ تِسْعَةً وَتِسْعِينَ اسْمًا مِائَةً إِلا وَاحِدًا مَنْ أَحْصَاهَا دَخَلَ الْجَنَّةَ".
                        </div>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile bottom sheet */}
        <AnimatePresence>
          {mobileSheetOpen ? (
            <>
              <motion.div
                className="fixed inset-0 z-50 bg-black/40 lg:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileSheetOpen(false)}
              />
              <motion.div
                role="dialog"
                aria-modal="true"
                className="fixed inset-x-0 bottom-0 z-50 lg:hidden"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", stiffness: 260, damping: 24 }}
              >
                <div className="rounded-t-3xl border-t border-white/10 bg-[#0a0a1a] p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-xs text-white/55">الشرح</div>
                      <div className="mt-1 text-lg font-bold text-white">{selected?.name}</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setMobileSheetOpen(false)}
                      className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/75"
                      aria-label="إغلاق"
                      title="إغلاق"
                    >
                      ×
                    </button>
                  </div>

                  <div className="mt-2 text-sm leading-relaxed text-white/70">
                    {selected?.fullMeaning}
                  </div>

                  <div className="mt-4 flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => setShowParts((s) => !s)}
                      className={[
                        "w-full rounded-xl border px-4 py-3 text-right transition",
                        "border-accent/25 bg-accent/10 text-accent",
                      ].join(" ")}
                      aria-expanded={showParts}
                    >
                      معنى كل جزء
                    </button>

                    <AnimatePresence initial={false}>
                      {showParts ? (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="flex flex-col gap-2"
                        >
                          {selected?.words.map((w, idx) => (
                            <div
                              key={`${w.word}-${idx}`}
                              className="rounded-xl border border-white/10 bg-black/10 p-3"
                            >
                              <div className="text-accent font-bold">{w.word}</div>
                              <div className="mt-1 text-sm text-white/70">{w.meaning}</div>
                            </div>
                          ))}
                        </motion.div>
                      ) : null}
                    </AnimatePresence>

                    <button
                      type="button"
                      onClick={() => setShowQuranBlock((s) => !s)}
                      className={[
                        "w-full rounded-xl border px-4 py-3 text-right transition",
                        "border-white/10 bg-white/5 text-white/85 hover:bg-white/10",
                      ].join(" ")}
                      aria-expanded={showQuranBlock}
                    >
                      الأسماء الحسنى في القرآن
                    </button>

                    <AnimatePresence initial={false}>
                      {showQuranBlock ? (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="mt-1 rounded-xl border border-white/10 bg-black/10 p-3">
                            <div className="text-xs text-white/55">قال تعالى :</div>
                            <div className="mt-2 space-y-2 text-sm leading-relaxed text-white/75">
                              <div>
                                "وَلِلّهِ الأَسْمَاء الْحُسْنَى فَادْعُوهُ بِهَا وَذَرُواْ الَّذِينَ يُلْحِدُونَ فِي أَسْمَآئِهِ سَيُجْزَوْنَ مَا كَانُواْ يَعْمَلُونَ".
                                <span className="text-white/50"> [الأعراف - 180]</span>
                              </div>
                              <div>
                                "قُلِ ادْعُوا اللَّهَ أَوِ ادْعُوا الرَّحْمَنَ أَيًّا مَا تَدْعُوا فَلَهُ الْأَسْمَاءُ الْحُسْنَى وَلَا تَجْهَرْ بِصَلَاتِكَ وَلَا تُخَافِتْ بِهَا وَابْتَغِ بَيْنَ ذَلِكَ سَبِيلًا".
                                <span className="text-white/50"> [الإسراء - 110]</span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>

                    <button
                      type="button"
                      onClick={() => setShowHadithBlock((s) => !s)}
                      className={[
                        "w-full rounded-xl border px-4 py-3 text-right transition",
                        "border-white/10 bg-white/5 text-white/85 hover:bg-white/10",
                      ].join(" ")}
                      aria-expanded={showHadithBlock}
                    >
                      الأسماء الحسنى في الحديث
                    </button>

                    <AnimatePresence initial={false}>
                      {showHadithBlock ? (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="mt-1 rounded-xl border border-white/10 bg-black/10 p-3">
                            <div className="text-xs text-white/55">
                              قَالَ رَسُولُ اللَّهِ ﷺ :
                            </div>
                            <div className="mt-2 text-sm leading-relaxed text-white/75">
                              "إِنَّ لِلَّهِ تِسْعَةً وَتِسْعِينَ اسْمًا مِائَةً إِلا وَاحِدًا مَنْ أَحْصَاهَا دَخَلَ الْجَنَّةَ".
                            </div>
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>

                  <div className="mt-3 text-[11px] text-white/50">
                    ملاحظة: يمكنك إغلاق الشرح بالزر أو بالضغط خارج النافذة.
                  </div>
                </div>
              </motion.div>
            </>
          ) : null}
        </AnimatePresence>
      </section>
    </main>
  );
}

