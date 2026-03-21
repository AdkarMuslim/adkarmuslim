import { Scheherazade_New } from "next/font/google";

/**
 * خط مناسب للنص القرآني (نسخ عربي موسّع + تشكيل).
 * النص لا يزال من Quran API — التحسين بصريّاً هنا.
 */
export const quranMushafFont = Scheherazade_New({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});
