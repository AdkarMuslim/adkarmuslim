import type { Metadata } from "next";
import type { ReactNode } from "react";
import { arSeoMeta } from "../../../lib/ar-seo-meta";

export const metadata: Metadata = arSeoMeta({
  title: "الرقية الشرعية",
  description:
    "آيات وأدعية الرقية من القرآن والسنة المأثورة، منظمة للتلاوة والمداومة بطمأنينة وثقة بالله.",
  path: "/adkar/ruqyah",
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
