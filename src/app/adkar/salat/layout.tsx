import type { Metadata } from "next";
import type { ReactNode } from "react";
import { arSeoMeta } from "../../../lib/ar-seo-meta";

export const metadata: Metadata = arSeoMeta({
  title: "أذكار الصلاة",
  description:
    "أذكار وأدعية مرتبطة بالصلاة: التكبير والقيام والركوع والسجود بين السجدتين، منظمة مع عداد لتسهيل المراجعة.",
  path: "/adkar/salat",
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
