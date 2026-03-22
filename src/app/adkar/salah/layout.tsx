import type { Metadata } from "next";
import type { ReactNode } from "react";
import { arSeoMeta } from "../../../lib/ar-seo-meta";

export const metadata: Metadata = arSeoMeta({
  title: "أذكار ما حول الصلاة",
  description:
    "أذكار قبل وبعد الصلاة وبين السجدتين وعند دخول وخروج المسجد، وفق السنة، بعرض مرتب وعداد تفاعلي.",
  path: "/adkar/salah",
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
