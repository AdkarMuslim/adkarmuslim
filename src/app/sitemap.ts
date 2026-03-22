import type { MetadataRoute } from "next";

const BASE_URL = "https://adkarmuslim.com";

const STATIC_ROUTES = [
  "",
  "/adkar",
  "/duaa",
  "/duaa/jawami3",
  "/duaa/quranic",
  "/duaa/anbiya",
  "/quran",
  "/quran/tafsir",
  "/hadith",
  "/hadith/bukhari",
  "/hadith/muslim",
  "/prayer-times",
  "/about",
  "/contact",
  "/copyright",
  "/privacy",
  "/terms",
] as const;

const ADKAR_ROUTES = [
  "/adkar/sabah",
  "/adkar/massa",
  "/adkar/salat",
  "/adkar/salah",
  "/adkar/nawm",
  "/adkar/istiqadh",
  "/adkar/athan",
  "/adkar/masjid",
  "/adkar/wudoo",
  "/adkar/khalaa",
  "/adkar/taam",
  "/adkar/hajj-umrah",
  "/adkar/khatm-quran",
  "/adkar/mayit",
  "/adkar/ruqyah",
  "/adkar/asma-alhusna",
  "/adkar/manzil",
  "/adkar/tasabih",
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = [...STATIC_ROUTES, ...ADKAR_ROUTES].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency: "daily",
    priority: path === "" ? 1 : 0.8,
  }));

  const quranEntries: MetadataRoute.Sitemap = Array.from({ length: 114 }, (_, i) => ({
    url: `${BASE_URL}/quran/${i + 1}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticEntries, ...quranEntries];
}
