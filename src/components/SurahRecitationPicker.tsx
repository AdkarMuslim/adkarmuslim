"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { QuranApiChapterAudioEntry } from "../lib/quranapi";

const STORAGE_KEY = "am_quran_reciter_v1";
const RECITER_IDS = [1, 2, 3, 4, 5] as const;
/** مرجع ثابت باش ما نعاودش نولّد `{}` كل render (useEffect deps) */
const EMPTY_AUDIO: Record<string, QuranApiChapterAudioEntry> = {};

type Props = {
  audio?: Record<string, QuranApiChapterAudioEntry> | null;
  /** أول تحميل وبداية SSR: من env `QURANAPI_RECITER_ID` أو 1 */
  serverDefaultReciterId: number;
  /** عند تمرير هذا المفتاح: نحفظ زمن التشغيل وحالة play/resume */
  persistenceKey?: string;
};

function clampReciterId(n: number): number {
  if (!Number.isFinite(n)) return 1;
  if (n < 1) return 1;
  if (n > 5) return 5;
  return Math.floor(n);
}

function audioSrc(entry: QuranApiChapterAudioEntry | undefined): string | null {
  if (!entry) return null;
  const src = entry.originalUrl?.trim() || entry.url?.trim();
  return src || null;
}

/**
 * اختيار القارئ (Quran API: 1–5) + مشغّل MP3، مع تذكّر الاختيار في المتصفح.
 */
export default function SurahRecitationPicker({
  audio: audioProp,
  serverDefaultReciterId,
  persistenceKey,
}: Props) {
  const audio = audioProp ?? EMPTY_AUDIO;
  const initial = clampReciterId(serverDefaultReciterId);
  const [reciterId, setReciterId] = useState(initial);
  const playerRef = useRef<HTMLAudioElement | null>(null);
  const shouldResumeRef = useRef(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw == null) return;
      const parsed = clampReciterId(Number.parseInt(raw, 10));
      if (
        RECITER_IDS.includes(parsed as (typeof RECITER_IDS)[number]) &&
        audioSrc(audio[String(parsed)])
      ) {
        setReciterId(parsed);
      }
    } catch {
      /* ignore */
    }
  }, [audio]);

  const options = useMemo(() => {
    return RECITER_IDS.map((id) => {
      const entry = audio[String(id)];
      return {
        id,
        name: entry?.reciter ?? `قارئ ${id}`,
        available: Boolean(audioSrc(entry)),
      };
    });
  }, [audio]);

  const currentEntry = audio[String(reciterId)];
  const src = audioSrc(currentEntry);
  const progressKey = persistenceKey ? `${persistenceKey}:progress` : "";

  const onReciterChange = (next: number) => {
    const id = clampReciterId(next);
    setReciterId(id);
    try {
      localStorage.setItem(STORAGE_KEY, String(id));
    } catch {
      /* ignore */
    }
  };

  useEffect(() => {
    if (!progressKey || !src) return;
    try {
      const raw = localStorage.getItem(progressKey);
      if (!raw) return;
      const saved = JSON.parse(raw) as { src?: string; time?: number; playing?: boolean };
      if (saved?.src === src && typeof saved.time === "number" && saved.time > 0) {
        const el = playerRef.current;
        if (el) {
          el.currentTime = saved.time;
          shouldResumeRef.current = Boolean(saved.playing);
        }
      }
    } catch {
      /* ignore */
    }
  }, [progressKey, src]);

  const persist = (el: HTMLAudioElement, playing?: boolean) => {
    if (!progressKey || !src) return;
    try {
      localStorage.setItem(
        progressKey,
        JSON.stringify({
          src,
          time: Number.isFinite(el.currentTime) ? el.currentTime : 0,
          playing: typeof playing === "boolean" ? playing : !el.paused,
        }),
      );
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="mt-5 space-y-3">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
        <label
          htmlFor="quran-reciter-select"
          className="mb-2 block text-right text-xs font-medium text-white/55"
          dir="rtl"
        >
          القارئ
        </label>
        <select
          id="quran-reciter-select"
          dir="rtl"
          className="focus-ring w-full cursor-pointer rounded-xl border border-white/10 bg-[#0a0a1a]/80 px-3 py-2.5 text-sm text-white/90 outline-none transition hover:border-accent/30"
          value={reciterId}
          onChange={(e) => onReciterChange(Number.parseInt(e.target.value, 10))}
        >
          {options.map((o) => (
            <option key={o.id} value={o.id} disabled={!o.available}>
              {o.id}. {o.name}
              {!o.available ? " — غير متوفر" : ""}
            </option>
          ))}
        </select>
        <p className="mt-2 text-right text-[11px] text-white/45" dir="rtl">
          يُحفظ اختيار القارئ على هذا الجهاز.
        </p>
      </div>

      {src ? (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          {currentEntry ? (
            <div className="mb-3 text-right text-xs text-white/55" dir="rtl">
              تلاوة: {currentEntry.reciter}
            </div>
          ) : null}
          <audio
            key={src}
            ref={playerRef}
            controls
            className="h-10 w-full accent-accent"
            preload="metadata"
            src={src}
            onLoadedMetadata={(e) => {
              const el = e.currentTarget;
              if (shouldResumeRef.current) {
                shouldResumeRef.current = false;
                void el.play().catch(() => {
                  /* autoplay may be blocked by browser policy */
                });
              }
            }}
            onTimeUpdate={(e) => persist(e.currentTarget)}
            onPause={(e) => persist(e.currentTarget, false)}
            onPlay={(e) => persist(e.currentTarget, true)}
          >
            متصفحك لا يدعم تشغيل الصوت.
          </audio>
        </div>
      ) : (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-right text-sm text-white/55" dir="rtl">
          لا يوجد ملف صوتي لهذا القارئ لهذه السورة.
        </div>
      )}
    </div>
  );
}
