import type { Metadata } from "next";
import type { ReactNode } from "react";
import { arSeoMeta } from "../../../lib/ar-seo-meta";

export const metadata: Metadata = arSeoMeta({
  title: "أذكار النوم",
  description:
    "آيات وأدعية قبل النوم من السنة: المعوذات، آية الكرسي، وأذكار الاستسلام للراحة الروحية مع تتبع التكرار.",
  path: "/adkar/nawm",
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
