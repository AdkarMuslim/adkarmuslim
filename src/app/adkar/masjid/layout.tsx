import type { Metadata } from "next";
import type { ReactNode } from "react";
import { arSeoMeta } from "../../../lib/ar-seo-meta";

export const metadata: Metadata = arSeoMeta({
  title: "أذكار المسجد",
  description:
    "آداب المسجد والدعاء عند الدخول والخروج والصلاة فيه، بأذكار مرتبة من السنة مع عداد تفاعلي.",
  path: "/adkar/masjid",
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
