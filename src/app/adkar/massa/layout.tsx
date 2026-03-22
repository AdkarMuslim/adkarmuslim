import type { Metadata } from "next";
import type { ReactNode } from "react";
import { arSeoMeta } from "../../../lib/ar-seo-meta";

export const metadata: Metadata = arSeoMeta({
  title: "أذكار المساء",
  description:
    "أذكار المساء والعشية من السنة مع عداد وترتيب واضح، وترجمة مختصرة. مناسبة للحفظ بعد العصر والمغرب وقبل النوم.",
  path: "/adkar/massa",
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
