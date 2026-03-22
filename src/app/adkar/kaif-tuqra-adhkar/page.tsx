import Link from "next/link";
import type { Metadata } from "next";
import ContentPageFooter from "../../../components/ContentPageFooter";
import JsonLd from "../../../components/JsonLd";
import SeoContentArticle from "../../../components/SeoContentArticle";
import { arSeoMeta } from "../../../lib/ar-seo-meta";
import { buildArticleJsonLd, buildBreadcrumbJsonLd, buildWebPageJsonLd } from "../../../lib/seo";

const PATH = "/adkar/kaif-tuqra-adhkar";
const DESC =
  "كيف تقرأ الأذكار عملياً: العدّ، الفهم، الخشوع، والاستمرار — دليل مختصر يربطك بأذكار الصباح والمساء والصلاة على أذكار المسلم.";

export const metadata: Metadata = arSeoMeta({
  title: "كيف تقرأ الأذكار",
  absoluteTitle: "كيف تقرأ الأذكار — دليل عملي للمبتدئ | AdkarMuslim",
  description: DESC,
  path: PATH,
  ogType: "article",
});

export default function KaifTuqraAdhkarPage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "الرئيسية", path: "/" },
    { name: "الأذكار", path: "/adkar" },
    { name: "كيف تقرأ الأذكار", path: PATH },
  ]);
  const webPageJsonLd = buildWebPageJsonLd({
    path: PATH,
    name: "كيف تقرأ الأذكار",
    description: DESC,
  });
  const articleJsonLd = buildArticleJsonLd({
    path: PATH,
    headline: "كيف تقرأ الأذكار",
    description: DESC,
  });

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={webPageJsonLd} />
      <JsonLd data={articleJsonLd} />
      <SeoContentArticle
        title="كيف تقرأ الأذكار؟"
        footer={
          <ContentPageFooter
            primaryLink={{ href: "/adkar", label: "فهرس الأذكار" }}
            related={[
              { href: "/adkar/sabah", label: "أذكار الصباح" },
              { href: "/adkar/massa", label: "أذكار المساء" },
              { href: "/adkar/salah", label: "أذكار الصلاة" },
            ]}
            peerHub={{ href: "/duaa", label: "الأدعية" }}
          />
        }
      >
        <p>
          كثيرٌ من المسلمين يريدون الاستمرار على الأذكار لكن يتوقفون لأنهم لا يعرفون من أين يبدأون أو كيف
          يضبطون العدّ. الموقع يوفّر لك النصوص جاهزة — مثل{" "}
          <Link href="/adkar/sabah">أذكار الصباح</Link> و<Link href="/adkar/massa">أذكار المساء</Link> مع
          عدّاد — وهذا المقال يبيّن أسلوباً بسيطاً للقراءة دون تعقيد.
        </p>

        <h2>ابدأ بقليلٍ ثابت</h2>
        <p>
          لا تشترط إكمال كل الأذكار من أول يوم. اختر مجموعة قصيرة تثبت عليها، ثم ازدد تدريجياً. الهدف
          الاستمرار لا الإرهاق ليوم واحد.
        </p>

        <h2>العدّ: بلسانك وإصبعك</h2>
        <p>
          العدّ المادّي (التسبيح أو الضغط على العداد في التطبيق) مجرّد مساعد؛ المقصود أن تبقى نفسك حاضرة.
          إن شغلتك كثيرة، اقرأ حتى ولو بصوتٍ منخفض أثناء التنقّل، مع مراعاة الأدب مع أسماء الله وآياته.
        </p>

        <h2>الفهم يزيد الخشوع</h2>
        <p>
          إن تعرّفت على معنى الذكر بشكل عام — حمد، تسبيح، استغفار، دعاء — ازدادت لذّته. لا يلزم أن تشرح
          كل كلمة قبل البدء؛ يكفي أن تزيد المعرفة مع الوقت عبر كتب موثوقة أو علماء أثقات.
        </p>

        <h3>أذكار مرتبطة بالصلاة</h3>
        <p>
          بعد الصلاة لك أذكارٌ خاصة؛ راجع <Link href="/adkar/salat">أذكار بعد الصلاة</Link> و{" "}
          <Link href="/adkar/salah">أذكار أثناء الصلاة</Link> لربط الصلوات الخمس بالذكر.
        </p>

        <h2>الدعاء والأذكار</h2>
        <p>
          الأدعية المأثورة تكمّل حياتك الروحية؛ تصفّح{" "}
          <Link href="/duaa/jawami3">جوامع الدعاء</Link> عندما تريد تنويعاً بين الذكر والدعاء.
        </p>

        <p className="text-white/60">
          نصيحة عامة للتذكير؛ للتفاصيل الفقهية راجع أهل الاختصاص في بلدك.
        </p>
      </SeoContentArticle>
    </>
  );
}
