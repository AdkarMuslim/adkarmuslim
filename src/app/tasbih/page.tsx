import type { Metadata } from "next";
import ComingSoonCard from "../../components/ComingSoonCard";
import { arSeoMeta } from "../../lib/ar-seo-meta";

export const metadata: Metadata = arSeoMeta({
  title: "المسبحة الإلكترونية",
  description:
    "قريباً: مسبحة رقمية أنيقة مع تتبع للجلسات — ضمن أذكار المسلم. الصفحة قيد الإعداد ولا تُفهرس بعد.",
  path: "/tasbih",
  index: false,
});

export default function TasbihPage() {
  return (
    <ComingSoonCard
      title="المسبحة الإلكترونية"
      description="عداد دائري أنيق على اللمس، أوضاع مخصصة، وتاريخ الجلسات."
    />
  );
}

