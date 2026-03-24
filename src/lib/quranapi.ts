/**
 * نصوص القرآن + التلاوة.
 * - أولاً: قراءة من `data/quran-chapters/` إن وُجدت (بلا اتصال بالشبكة).
 * - وإلا: جلب من quranapi.pages.dev (احتياط).
 * التوثيق: https://quranapi.pages.dev/introduction
 */

import { readFile } from "node:fs/promises";
import path from "node:path";

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

function localChaptersDir(): string {
  return path.join(process.cwd(), "data", "quran-chapters");
}

function parseChapterJson(
  data: Partial<QuranApiChapter> & {
    arabic1?: unknown;
    english?: unknown;
    urdu?: unknown;
    bengali?: unknown;
  },
  surahNo: number,
): QuranApiChapter | null {
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
}

async function readLocalChapter(surahNo: number): Promise<QuranApiChapter | null> {
  try {
    const filePath = path.join(localChaptersDir(), `${surahNo}.json`);
    const raw = await readFile(filePath, "utf8");
    const data = JSON.parse(raw) as Parameters<typeof parseChapterJson>[0];
    return parseChapterJson(data, surahNo);
  } catch {
    return null;
  }
}

async function readLocalSurahList(): Promise<QuranApiSurahListItem[] | null> {
  try {
    const filePath = path.join(localChaptersDir(), "surah.json");
    const raw = await readFile(filePath, "utf8");
    const list = JSON.parse(raw) as unknown;
    if (!Array.isArray(list)) return null;
    return list as QuranApiSurahListItem[];
  } catch {
    return null;
  }
}

export async function getQuranApiSurahList(): Promise<QuranApiSurahListItem[]> {
  const local = await readLocalSurahList();
  if (local && local.length > 0) return local;

  try {
    const res = await fetch(`${QURAN_API_BASE}/surah.json`, {
      next: { revalidate: 86400 },
    });
    if (!res.ok) return [];
    return (await res.json()) as QuranApiSurahListItem[];
  } catch {
    return [];
  }
}

export async function getQuranApiChapter(surahNo: number): Promise<QuranApiChapter | null> {
  if (!Number.isFinite(surahNo) || surahNo < 1 || surahNo > 114) return null;

  const fromDisk = await readLocalChapter(surahNo);
  if (fromDisk) return fromDisk;

  try {
    const res = await fetch(`${QURAN_API_BASE}/${surahNo}.json`, {
      next: { revalidate: 86400 },
    });
    if (!res.ok) return null;

    const data = (await res.json()) as Parameters<typeof parseChapterJson>[0];
    return parseChapterJson(data, surahNo);
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
