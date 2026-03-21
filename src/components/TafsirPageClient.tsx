"use client";

import { useEffect, useMemo, useState } from "react";
import TafsirAudioPicker from "./TafsirAudioPicker";

type SurahItem = { id: number; name: string };
type TafsirSegment = { id: number; name: string; url: string };

type Props = {
  surahs: SurahItem[];
  sourceName: string;
  segmentsBySurah: Record<number, TafsirSegment[]>;
  defaultSurahId?: number;
};

export default function TafsirPageClient({
  surahs,
  sourceName,
  segmentsBySurah,
  defaultSurahId = 1,
}: Props) {
  const [selectedSurahId, setSelectedSurahId] = useState<number>(defaultSurahId);

  useEffect(() => {
    setSelectedSurahId(defaultSurahId);
  }, [defaultSurahId]);

  const segments = useMemo(
    () => segmentsBySurah[selectedSurahId] ?? [],
    [segmentsBySurah, selectedSurahId],
  );

  return (
    <div className="mt-6 space-y-4" dir="rtl">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
        <label htmlFor="tafsir-surah-select" className="mb-2 block text-sm font-medium text-white/80">
          اختر السورة
        </label>
        <select
          id="tafsir-surah-select"
          dir="rtl"
          className="focus-ring w-full cursor-pointer rounded-xl border border-white/10 bg-[#0a0a1a]/80 px-3 py-2.5 text-sm text-white/90 outline-none transition hover:border-accent/30"
          value={selectedSurahId}
          onChange={(e) => setSelectedSurahId(Number.parseInt(e.target.value, 10))}
        >
          {surahs.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      {segments.length > 0 ? (
        <TafsirAudioPicker sourceName={sourceName} segments={segments} />
      ) : (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center text-sm text-white/55">
          لا يوجد تفسير صوتي متاح لهذه السورة.
        </div>
      )}
    </div>
  );
}
