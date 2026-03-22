import type { Metadata } from "next";
import type { ReactNode } from "react";
import { arSeoMeta } from "../../../lib/ar-seo-meta";

export const metadata: Metadata = arSeoMeta({
  title: "أذكار الصباح",
  description:
    "حصن المسلم صباحاً: أذكار من القرآن والسنة مع عداد ذكي وترجمة ومصادر. للمراجعة اليومية بعد الفجر وبداية النهار.",
  path: "/adkar/sabah",
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
