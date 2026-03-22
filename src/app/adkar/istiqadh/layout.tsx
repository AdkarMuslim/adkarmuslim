import type { Metadata } from "next";
import type { ReactNode } from "react";
import { arSeoMeta } from "../../../lib/ar-seo-meta";

export const metadata: Metadata = arSeoMeta({
  title: "أذكار الاستيقاظ",
  description:
    "ما يقال عند الاستيقاظ من النوم من الأدعية المأثورة، مع عداد وترتيب يسهّل الحفظ كل صباح.",
  path: "/adkar/istiqadh",
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
