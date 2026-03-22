import type { Metadata } from "next";
import type { ReactNode } from "react";
import { arSeoMeta } from "../../../lib/ar-seo-meta";

export const metadata: Metadata = arSeoMeta({
  title: "أذكار ختم القرآن",
  description:
    "أدعية وذكر شرعي عند إتمام ختمة المصحف الشريف، بصياغة واضحة للاحتفال الروحي بالكتاب.",
  path: "/adkar/khatm-quran",
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
