import type { Metadata } from "next";
import type { ReactNode } from "react";
import { arSeoMeta } from "../../../lib/ar-seo-meta";

export const metadata: Metadata = arSeoMeta({
  title: "حصن المنزل",
  description:
    "مجموعة «المنزل»: آيات وأدعية مأثورة للحفظ اليومي، مع عداد وترتيب يسهّل المراجعة المنتظمة.",
  path: "/adkar/manzil",
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
