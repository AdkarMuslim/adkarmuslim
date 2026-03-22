import type { Metadata } from "next";
import type { ReactNode } from "react";
import { arSeoMeta } from "../../../lib/ar-seo-meta";

export const metadata: Metadata = arSeoMeta({
  title: "الدعاء المأثور",
  description:
    "جوامع الدعاء من القرآن والسنة: أدعية مختارة مع ترجمة ومصادر، وعداد لتسهيل الحفظ والتكرار.",
  path: "/duaa/jawami3",
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
