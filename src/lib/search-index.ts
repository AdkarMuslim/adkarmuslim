/**
 * Static index for site-wide search (Arabic + Latin keywords).
 * Normalization helps match أ/إ/آ and common variants.
 */

import { getQuranSurahSearchItems, QURAN_SURAH_ARABIC_NAMES } from "./quran-surah-list";

export type SearchItem = {
  href: string;
  title: string;
  /** Extra text matched against the query (Arabic + transliteration hints). */
  keywords: string;
};

function normalizeForSearch(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/[\u064B-\u065F\u0670]/g, "") // harakat
    .replace(/[أإآٱ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ة/g, "ه")
    .replace(/\s+/g, " ");
}

const STATIC_SEARCH_INDEX: SearchItem[] = [
  { href: "/", title: "الرئيسية", keywords: "home adkar muslim بداية" },
  { href: "/adkar", title: "الأذكار", keywords: "اذكار athkar أدعية ذكر" },
  { href: "/adkar/sabah", title: "أذكار الصباح", keywords: "صباح morning" },
  { href: "/adkar/massa", title: "أذكار المساء", keywords: "مساء evening" },
  { href: "/adkar/salat", title: "أذكار الصلاة", keywords: "صلاة salah prayer" },
  { href: "/adkar/salah", title: "أذكار الصلاة", keywords: "صلاة salah" },
  { href: "/adkar/nawm", title: "أذكار النوم", keywords: "نوم sleep" },
  { href: "/adkar/istiqadh", title: "أذكار الاستيقاظ", keywords: "استيقاظ wake" },
  { href: "/adkar/athan", title: "عند سماع الأذان", keywords: "أذان اذان adhan" },
  { href: "/adkar/masjid", title: "أذكار المسجد", keywords: "مسجد mosque" },
  { href: "/adkar/wudoo", title: "أذكار الوضوء", keywords: "وضوء wudu" },
  { href: "/adkar/khalaa", title: "لباس وخلع الثوب", keywords: "ثوب لباس" },
  { href: "/adkar/taam", title: "أذكار الأكل والشرب", keywords: "طعام شراب أكل" },
  { href: "/adkar/hajj-umrah", title: "أذكار الحج والعمرة", keywords: "حج عمرة hajj umrah" },
  { href: "/adkar/khatm-quran", title: "ختم القرآن", keywords: "ختم مصحف" },
  { href: "/adkar/mayit", title: "أدعية للميت", keywords: "ميت جنازة دفن" },
  { href: "/adkar/ruqyah", title: "الرقية الشرعية", keywords: "رقية ruqyah" },
  { href: "/adkar/asma-alhusna", title: "أسماء الله الحسنى", keywords: "اسماء الله" },
  { href: "/adkar/manzil", title: "المنزل", keywords: "منزل manzil" },
  { href: "/adkar/tasabih", title: "التسبيح", keywords: "تسبيح سبحان" },
  { href: "/duaa", title: "الأدعية", keywords: "دعاء dua supplication" },
  { href: "/duaa/jawami3", title: "الدعاء المأثور", keywords: "مأثور جوامع" },
  { href: "/duaa/quranic", title: "أدعية قرآنية", keywords: "قرآن آيات" },
  { href: "/duaa/anbiya", title: "دعاء الأنبياء", keywords: "انبياء نبي" },
  { href: "/quran", title: "القرآن الكريم", keywords: "مصحف تلاوة quran mushaf" },
  { href: "/quran/tafsir", title: "تفسير القرآن", keywords: "تفسير tafsir" },
  { href: "/hadith", title: "الحديث الشريف", keywords: "حديث hadith سنة" },
  { href: "/hadith/bukhari", title: "صحيح البخاري", keywords: "بخاري bukhari" },
  { href: "/hadith/muslim", title: "صحيح مسلم", keywords: "مسلم muslim" },
  { href: "/prayer-times", title: "مواقيت الصلاة", keywords: "صلاة أوقات ميقات salat times" },
  { href: "/qibla", title: "اتجاه القبلة", keywords: "قبلة qibla" },
  { href: "/tasbih", title: "المسبحة", keywords: "تسبيح سبحة tasbih" },
  { href: "/calendar", title: "التقويم الهجري", keywords: "هجري تقويم hijri" },
  { href: "/favorites", title: "المفضلة", keywords: "مفضلة محفوظات" },
  { href: "/settings", title: "الإعدادات", keywords: "اعدادات settings" },
  { href: "/about", title: "من نحن", keywords: "about حول الموقع" },
  { href: "/contact", title: "اتصل بنا", keywords: "contact تواصل" },
  { href: "/copyright", title: "حقوق النشر", keywords: "copyright" },
  { href: "/privacy", title: "سياسة الخصوصية", keywords: "privacy خصوصية" },
  { href: "/terms", title: "شروط الاستخدام", keywords: "terms شروط" },
];

/** فهرس كامل: صفحات ثابتة + السور 1–114 (بحث مثل: البقرة، يس، kahf). */
export const SITE_SEARCH_INDEX: SearchItem[] = [
  ...STATIC_SEARCH_INDEX,
  ...getQuranSurahSearchItems(),
];

export function searchSite(rawQuery: string): SearchItem[] {
  const trimmed = rawQuery.trim();
  if (!trimmed) return [];

  /** أرقام فقط → سورة بالرقم (ما يخلطش "2" مع 12 و 102) */
  const digitsOnly = trimmed.replace(/[\s\u200f\u200e]/g, "");
  if (/^\d{1,3}$/.test(digitsOnly)) {
    const num = parseInt(digitsOnly, 10);
    if (num >= 1 && num <= 114) {
      const name = QURAN_SURAH_ARABIC_NAMES[num - 1];
      return [
        {
          href: `/quran/${num}`,
          title: `سورة ${name}`,
          keywords: String(num),
        },
      ];
    }
    return [];
  }

  const nq = normalizeForSearch(trimmed);
  if (!nq) return [];

  return SITE_SEARCH_INDEX.filter((item) => {
    const hay = normalizeForSearch(`${item.title} ${item.keywords}`);
    return hay.includes(nq);
  });
}
