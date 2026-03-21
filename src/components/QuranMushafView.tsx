"use client";

import { useMemo, useState } from "react";
import { quranMushafFont } from "../lib/quran-font";

type Props = {
  arabic: string[];
  english?: string[];
};

type TranslationMode = "off" | "english";

function toArabicIndic(n: number): string {
  return String(n).replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[Number(d)]);
}

export default function QuranMushafView({ arabic, english = [] }: Props) {
  const [mode, setMode] = useState<TranslationMode>("off");

  const translation = useMemo(() => {
    if (mode === "english") return english;
    return [];
  }, [mode, english]);

  return (
    <div className="mt-8 space-y-4">
      <div className="flex flex-wrap items-center justify-end gap-2">
        <button
          type="button"
          onClick={() => setMode("off")}
          className={`rounded-xl border px-3 py-1.5 text-xs transition ${
            mode === "off"
              ? "border-accent/40 bg-accent/15 text-accent"
              : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
          }`}
        >
          بلا ترجمة
        </button>
        <button
          type="button"
          onClick={() => setMode("english")}
          className={`rounded-xl border px-3 py-1.5 text-xs transition ${
            mode === "english"
              ? "border-accent/40 bg-accent/15 text-accent"
              : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
          }`}
        >
          English
        </button>
      </div>

      <div
        className={`quran-mushaf rounded-2xl border border-white/10 bg-black/20 px-4 py-5 sm:px-6 sm:py-6 ${quranMushafFont.className}`}
        dir="rtl"
      >
        {arabic.map((line, idx) => {
          const text = line.trim().replace(/\s*\n+\s*/g, " ");
          return (
            <div key={idx} className="mb-5 last:mb-0">
              <p className="quran-ayah">
                {text} <span className="text-accent/90">۝ {toArabicIndic(idx + 1)}</span>
              </p>
              {mode !== "off" && translation[idx] ? (
                <p dir="ltr" className="mt-1 text-sm leading-7 text-white/65">
                  {translation[idx]}
                </p>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

