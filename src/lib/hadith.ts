export type HadithCollectionId = "bukhari" | "muslim";

export type HadithItem = {
  hadith_number: number;
  page: number;
  text: string;
};

type HadithApiShape = {
  hadiths: HadithItem[];
};

const SOURCES: Record<HadithCollectionId, { title: string; url: string }> = {
  bukhari: {
    title: "صحيح البخاري",
    url: "https://raw.githubusercontent.com/itsSamBz/Islamic-Api/main/hadith/bukhari.json",
  },
  muslim: {
    title: "صحيح مسلم",
    url: "https://raw.githubusercontent.com/itsSamBz/Islamic-Api/main/hadith/muslim.json",
  },
};

export function getHadithCollectionMeta(id: HadithCollectionId) {
  return SOURCES[id];
}

export function isHadithCollectionId(v: string): v is HadithCollectionId {
  return v === "bukhari" || v === "muslim";
}

export async function getHadithCollection(id: HadithCollectionId): Promise<HadithItem[]> {
  const src = SOURCES[id];
  const res = await fetch(src.url, { next: { revalidate: 86400 } });
  if (!res.ok) return [];
  const json = (await res.json()) as Partial<HadithApiShape>;
  if (!json?.hadiths || !Array.isArray(json.hadiths)) return [];
  return json.hadiths
    .filter((h) => typeof h?.hadith_number === "number" && typeof h?.text === "string")
    .map((h) => ({
      hadith_number: h.hadith_number,
      page: Number(h.page ?? 0),
      text: String(h.text ?? ""),
    }));
}

