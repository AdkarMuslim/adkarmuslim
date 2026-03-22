import Link from "next/link";
import type { Metadata } from "next";
import ContentPageFooter from "../../../components/ContentPageFooter";
import JsonLd from "../../../components/JsonLd";
import SeoContentArticle from "../../../components/SeoContentArticle";
import { arSeoMeta } from "../../../lib/ar-seo-meta";
import { buildArticleJsonLd, buildBreadcrumbJsonLd, buildWebPageJsonLd } from "../../../lib/seo";

const PATH = "/duaa/hal-duaa-yughayyir-alqadar";
const DESC =
  "هل الدعاء يغيّر القدر؟ عرضٌ مختصر لما ورد في السنة والكلام المعتدل: الدعاء من الأسباب، والإيمان بحكمة الله — بدون إطالة. من أذكار المسلم.";

export const metadata: Metadata = arSeoMeta({
  title: "هل الدعاء يغيّر القدر؟",
  absoluteTitle: "هل الدعاء يغيّر القدر؟ — تذكير إيماني مختصر | AdkarMuslim",
  description: DESC,
  path: PATH,
  ogType: "article",
});

export default function HalDuaaYughayyirAlqadarPage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "الرئيسية", path: "/" },
    { name: "الأدعية", path: "/duaa" },
    { name: "هل الدعاء يغيّر القدر؟", path: PATH },
  ]);
  const webPageJsonLd = buildWebPageJsonLd({
    path: PATH,
    name: "هل الدعاء يغيّر القدر؟",
    description: DESC,
  });
  const articleJsonLd = buildArticleJsonLd({
    path: PATH,
    headline: "هل الدعاء يغيّر القدر؟",
    description: DESC,
  });

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={webPageJsonLd} />
      <JsonLd data={articleJsonLd} />
      <SeoContentArticle
        title="هل الدعاء يغيّر القدر؟"
        footer={
          <ContentPageFooter
            primaryLink={{ href: "/duaa", label: "فهرس الأدعية" }}
            related={[
              { href: "/duaa/jawami3", label: "جوامع الدعاء" },
              { href: "/duaa/afdal-awqat-duaa", label: "أفضل أوقات الدعاء" },
              { href: "/duaa/anbiya", label: "أدعية الأنبياء" },
            ]}
            peerHub={{ href: "/adkar", label: "الأذكار" }}
          />
        }
      >
        <p>
          سؤالٌ يطرحه كثيرٌ من الناس: إذا كان القدر مكتوباً، فما فائدة الدعاء؟ الجواب المختصر عند أهل
          السنة: الإيمان بالقدر لا يلغي الأسباب؛ والدعاء سببٌ مشروعٌ يرجى به الخير. هذا المقال تذكيرٌ عامٌ
          لا يغني عن دراسةٍ مع شيخٍ أو عالمٍ عند الحاجة.
        </p>

        <h2>الدعاء والأسباب</h2>
        <p>
          الله تعالى قدّر الأشياء وأحكمها، وجعل لبعضها أسباباً يأمرنا بها: الصلاة، الصبر، السعي،
          والدعاء. فالمسلم يدعو ويثق أن الله يعلم حاجته، وقد يصرف عنه ما يكره أو يأتيه بما ينفع في الدين
          والدنيا على وجهٍ أعظم مما تخيّل.
        </p>

        <h2>ما المقصود بـ«تغيير القدر»؟</h2>
        <p>
          العلماء يفرّقون بين ما كتب في علم الله الأزلي وبين ما يُعرض على العبد في حياته. الدعاء قد ينزل
          ببركةٍ أو يدفع بلاءً بما شاء الله — دون أن يُقال إن العبد يغيّر علم الله. الفكرة الخاطئة هي
          الجمع بين الجبر المنكر وبين ترك الدعاء بحجة أن «كل شيء مقدّر».
        </p>

        <h2>فاستمروا على الدعاء</h2>
        <p>
          النبي <span className="text-white/55">ﷺ</span> حثّ على الإلحاح في الدعاء؛ فلا تملّ من طلب
          الحلال والعفو والعافية. زد من أدعيةٍ مأثورة عبر{" "}
          <Link href="/duaa/jawami3">جوامع الدعاء</Link>، واطّلع على{" "}
          <Link href="/duaa/afdal-awqat-duaa">أفضل أوقات الدعاء</Link> لاغتنام الساعات المباركة.
        </p>

        <h3>تنبيه</h3>
        <p className="text-white/60">
          الموضوع أوسع من فقرة؛ إن أردت التفصيل العقدي راجع كتب العقيدة عند أئمة السنة أو اسأل عالماً
          ثقة في بلدك.
        </p>
      </SeoContentArticle>
    </>
  );
}
