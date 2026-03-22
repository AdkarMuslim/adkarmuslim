import type { Metadata } from "next";
import type { ReactNode } from "react";
import { arSeoMeta } from "../../../lib/ar-seo-meta";

export const metadata: Metadata = arSeoMeta({
  title: "الأدعية القرآنية",
  description:
    "أدعية مستخرجة من آيات القرآن الكريم مع ذكر السياق والفائدة، منظمة للمراجعة والحفظ.",
  path: "/duaa/quranic",
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
