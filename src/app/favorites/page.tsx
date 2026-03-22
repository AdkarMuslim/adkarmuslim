import type { Metadata } from "next";
import ComingSoonCard from "../../components/ComingSoonCard";
import { arSeoMeta } from "../../lib/ar-seo-meta";

export const metadata: Metadata = arSeoMeta({
  title: "المفضلة",
  description:
    "قريباً: احفظ آيات، أحاديث، أدعية، وأذكار في مفضلة واحدة داخل أذكار المسلم — جاري تطوير الصفحة.",
  path: "/favorites",
  index: false,
});

export default function FavoritesPage() {
  return (
    <ComingSoonCard
      title="المفضلة"
      description="كل ما حفظته: آيات القرآن، أحاديث، أدعية، وأذكار - مرتبة حسب الفئة."
    />
  );
}

