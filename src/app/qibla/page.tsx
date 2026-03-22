import type { Metadata } from "next";
import ComingSoonCard from "../../components/ComingSoonCard";
import { arSeoMeta } from "../../lib/ar-seo-meta";

export const metadata: Metadata = arSeoMeta({
  title: "اتجاه القبلة",
  description:
    "قريباً: بوصلة قبلة بدقة مع GPS ضمن أذكار المسلم — تابع التحديثات على الموقع.",
  path: "/qibla",
  index: false,
});

export default function QiblaPage() {
  return (
    <ComingSoonCard
      title="اتجاه القبلة"
      description="بوصلة على جهازك باستعمال الحساسات وGPS، مع مسافة تقديرية لمكة."
    />
  );
}

