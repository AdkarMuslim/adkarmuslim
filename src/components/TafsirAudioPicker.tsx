"use client";

import { useMemo, useState } from "react";

type TafsirSegment = {
  id: number;
  name: string;
  url: string;
};

type Props = {
  sourceName: string;
  segments: TafsirSegment[];
};

export default function TafsirAudioPicker({ sourceName, segments }: Props) {
  const [selectedId, setSelectedId] = useState<number>(segments[0]?.id ?? 0);

  const current = useMemo(
    () => segments.find((s) => s.id === selectedId) ?? segments[0],
    [segments, selectedId],
  );

  if (!current) return null;

  return (
    <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4" dir="rtl">
      <h2 className="text-base font-semibold text-white">تفسير السورة (صوت)</h2>
      <p className="mt-1 text-xs text-white/55">المصدر: {sourceName}</p>

      <div className="mt-3 rounded-xl border border-white/10 bg-black/20 p-3">
        <label htmlFor="tafsir-segment-select" className="mb-2 block text-xs text-white/65">
          اختر مقطع التفسير
        </label>
        <select
          id="tafsir-segment-select"
          dir="rtl"
          className="focus-ring w-full cursor-pointer rounded-xl border border-white/10 bg-[#0a0a1a]/80 px-3 py-2.5 text-sm text-white/90 outline-none transition hover:border-accent/30"
          value={current.id}
          onChange={(e) => setSelectedId(Number.parseInt(e.target.value, 10))}
        >
          {segments.map((seg) => (
            <option key={seg.id} value={seg.id}>
              {seg.name}
            </option>
          ))}
        </select>

        <audio key={current.url} controls preload="none" className="mt-3 h-10 w-full accent-accent" src={current.url}>
          متصفحك لا يدعم تشغيل الصوت.
        </audio>
      </div>
    </div>
  );
}

