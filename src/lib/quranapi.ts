/**
 * Quran API (Cloudflare Pages) — نصوص + تلاوة سورة.
 * التوثيق: https://quranapi.pages.dev/introduction
 *
 * الصوت: يُفضّل استخدام `originalUrl` كما في التوثيق (غالباً من MP3Quran).
 * معرّفات القرّاء: 1–5 (انظر صفحة Audio Recitation).
 */

export const QURAN_API_BASE = "https://quranapi.pages.dev/api";

export type QuranApiSurahListItem = {
  surahName: string;
  surahNameArabic: string;
  surahNameArabicLong: string;
  surahNameTranslation: string;
  revelationPlace: string;
  totalAyah: number;
};

export type QuranApiChapterAudioEntry = {
  reciter: string;
  url: string;
  originalUrl: string;
};

export type QuranApiChapter = {
  surahName: string;
  surahNameArabic: string;
  surahNameArabicLong: string;
  surahNameTranslation: string;
  revelationPlace: string;
  totalAyah: number;
  surahNo: number;
  audio: Record<string, QuranApiChapterAudioEntry>;
  arabic1: string[];
  english: string[];
  urdu: string[];
  bengali: string[];
};

/** Mishary Rashid Al Afasy — الحقل "1" في كائن audio */
export const DEFAULT_QURANAPI_RECITER_ID = 1;

export async function getQuranApiSurahList(): Promise<QuranApiSurahListItem[]> {
  const res = await fetch(`${QURAN_API_BASE}/surah.json`, {
    next: { revalidate: 86400 },
  });
  if (!res.ok) return [];
  return (await res.json()) as QuranApiSurahListItem[];
}

export async function getQuranApiChapter(surahNo: number): Promise<QuranApiChapter | null> {
  if (!Number.isFinite(surahNo) || surahNo < 1 || surahNo > 114) return null;

  try {
    const res = await fetch(`${QURAN_API_BASE}/${surahNo}.json`, {
      next: { revalidate: 86400 },
    });
    if (!res.ok) return null;

    const data = (await res.json()) as Partial<QuranApiChapter> & {
      arabic1?: unknown;
      english?: unknown;
      urdu?: unknown;
      bengali?: unknown;
    };

    if (!data || !Array.isArray(data.arabic1) || data.arabic1.length === 0) {
      return null;
    }

    const audioRaw = data.audio;
    const audio: Record<string, QuranApiChapterAudioEntry> =
      audioRaw && typeof audioRaw === "object" && !Array.isArray(audioRaw)
        ? (audioRaw as Record<string, QuranApiChapterAudioEntry>)
        : {};

    return {
      surahName: String(data.surahName ?? ""),
      surahNameArabic: String(data.surahNameArabic ?? ""),
      surahNameArabicLong: String(data.surahNameArabicLong ?? `سورة ${surahNo}`),
      surahNameTranslation: String(data.surahNameTranslation ?? ""),
      revelationPlace: String(data.revelationPlace ?? ""),
      totalAyah: Number(data.totalAyah) || data.arabic1.length,
      surahNo: Number(data.surahNo) || surahNo,
      audio,
      arabic1: data.arabic1.map((line) => String(line ?? "")),
      english: Array.isArray(data.english) ? data.english.map((line) => String(line ?? "")) : [],
      urdu: Array.isArray(data.urdu) ? data.urdu.map((line) => String(line ?? "")) : [],
      bengali: Array.isArray(data.bengali) ? data.bengali.map((line) => String(line ?? "")) : [],
    };
  } catch {
    return null;
  }
}

export function getConfiguredQuranApiReciterId(): number {
  const raw = process.env.QURANAPI_RECITER_ID;
  const n = raw ? Number.parseInt(raw, 10) : DEFAULT_QURANAPI_RECITER_ID;
  if (!Number.isFinite(n) || n < 1 || n > 5) return DEFAULT_QURANAPI_RECITER_ID;
  return n;
}

/** يعطي رابط MP3 مناسب للمشغّل + اسم القارئ */
export function pickChapterAudio(
  chapter: QuranApiChapter,
  reciterId: number,
): { src: string; reciterName: string } | null {
  const entry = chapter.audio?.[String(reciterId)];
  if (!entry) return null;
  const src = entry.originalUrl?.trim() || entry.url?.trim();
  if (!src) return null;
  return { src, reciterName: entry.reciter };
}
