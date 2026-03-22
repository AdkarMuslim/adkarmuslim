import type { Metadata } from "next";
import type { ReactNode } from "react";
import { arSeoMeta } from "../../../lib/ar-seo-meta";

export const metadata: Metadata = arSeoMeta({
  title: "أذكار اللباس",
  description:
    "ما يقال عند لبس الثوب الجديد وعند خلعه من الأدعية المأثورة، مع عرض بسيط وعداد.",
  path: "/adkar/khalaa",
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
