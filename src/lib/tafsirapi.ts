export type TafsirSegment = {
  id: number;
  tafsirId: number;
  name: string;
  url: string;
  surahId: number;
};

type TafsirApiShape = {
  tafasir?: {
    name?: string;
    soar?: Array<{
      id?: number;
      tafsir_id?: number;
      name?: string;
      url?: string;
      sura_id?: number;
    }>;
  };
};

const TAFSIR_JSON_URL = "https://raw.githubusercontent.com/itsSamBz/Islamic-Api/main/tafsir.json";

export async function getTafsirBySurah(surahId: number): Promise<{
  sourceName: string;
  segments: TafsirSegment[];
}> {
  if (!Number.isFinite(surahId) || surahId < 1 || surahId > 114) {
    return { sourceName: "التفسير", segments: [] };
  }

  try {
    const res = await fetch(TAFSIR_JSON_URL, { next: { revalidate: 86400 } });
    if (!res.ok) return { sourceName: "التفسير", segments: [] };

    const json = (await res.json()) as TafsirApiShape;
    const sourceName = String(json?.tafasir?.name ?? "التفسير");
    const list = Array.isArray(json?.tafasir?.soar) ? json.tafasir.soar : [];

    const segments = list
      .filter((s) => Number(s?.sura_id) === surahId && typeof s?.url === "string")
      .map((s) => ({
        id: Number(s?.id ?? 0),
        tafsirId: Number(s?.tafsir_id ?? 0),
        name: String(s?.name ?? ""),
        url: String(s?.url ?? ""),
        surahId: Number(s?.sura_id ?? 0),
      }))
      .filter((s) => s.id > 0 && s.surahId > 0 && Boolean(s.url));

    return { sourceName, segments };
  } catch {
    return { sourceName: "التفسير", segments: [] };
  }
}

/** جميع مقاطع التفسير مصنّفة حسب رقم السورة (1–114) */
export async function getAllTafsirData(): Promise<{
  sourceName: string;
  segmentsBySurah: Record<number, TafsirSegment[]>;
}> {
  try {
    const res = await fetch(TAFSIR_JSON_URL, { next: { revalidate: 86400 } });
    if (!res.ok) return { sourceName: "التفسير", segmentsBySurah: {} };

    const json = (await res.json()) as TafsirApiShape;
    const sourceName = String(json?.tafasir?.name ?? "التفسير");
    const list = Array.isArray(json?.tafasir?.soar) ? json.tafasir.soar : [];

    const segmentsBySurah: Record<number, TafsirSegment[]> = {};
    for (const s of list) {
      const surahId = Number(s?.sura_id);
      if (!Number.isFinite(surahId) || surahId < 1 || surahId > 114 || typeof s?.url !== "string") continue;
      const seg: TafsirSegment = {
        id: Number(s?.id ?? 0),
        tafsirId: Number(s?.tafsir_id ?? 0),
        name: String(s?.name ?? ""),
        url: String(s?.url ?? ""),
        surahId,
      };
      if (seg.id > 0) {
        if (!segmentsBySurah[surahId]) segmentsBySurah[surahId] = [];
        segmentsBySurah[surahId].push(seg);
      }
    }

    return { sourceName, segmentsBySurah };
  } catch {
    return { sourceName: "التفسير", segmentsBySurah: {} };
  }
}

