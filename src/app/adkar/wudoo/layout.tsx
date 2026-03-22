import type { Metadata } from "next";
import type { ReactNode } from "react";
import { arSeoMeta } from "../../../lib/ar-seo-meta";

export const metadata: Metadata = arSeoMeta({
  title: "أذكار الوضوء",
  description:
    "دعاء قبل وبعد الوضوء وأذكار الطهارة الشرعية، منظمة لتسهيل الحفظ والمراجعة اليومية.",
  path: "/adkar/wudoo",
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
