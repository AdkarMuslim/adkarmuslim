import type { Metadata } from "next";
import JsonLd from "../../components/JsonLd";
import LegalArticle from "../../components/LegalArticle";
import { arSeoMeta } from "../../lib/ar-seo-meta";
import { buildBreadcrumbJsonLd, buildWebPageJsonLd, SITE_NAME, SITE_URL } from "../../lib/seo";

export const metadata: Metadata = arSeoMeta({
  title: "شروط الاستخدام",
  description: `شروط استخدام ${SITE_NAME} وAdkarMuslim.com: المسؤولية، المحتوى، والاستخدام المقبول للخدمة.`,
  path: "/terms",
});

export default function TermsPage() {
  const breadcrumb = buildBreadcrumbJsonLd([
    { name: "الرئيسية", path: "/" },
    { name: "شروط الاستخدام", path: "/terms" },
  ]);
  const webPage = buildWebPageJsonLd({
    path: "/terms",
    name: "شروط الاستخدام",
    description: `شروط استخدام ${SITE_NAME}.`,
  });

  return (
    <>
      <JsonLd data={breadcrumb} />
      <JsonLd data={webPage} />
      <LegalArticle title="شروط الاستخدام">
        <p>
          باستخدامك لموقع <strong className="text-white/90">{SITE_NAME}</strong> على العنوان{" "}
          <strong className="text-white/90">{SITE_URL}</strong>، فإنك توافق على الشروط التالية. إن لم
          توافق، يُرجى عدم استخدام الموقع.
        </p>

        <h2 className="text-lg font-semibold text-white/90">طبيعة الخدمة</h2>
        <p>
          الموقع يقدّم أدوات ومحتوى إسلامياً عاماً (أذكار، قرآن، أدعية، حديث، مواقيت، وغيرها) «كما هو»
          (as is). نسعى للدقة، لكن قد تحدث أخطاء تقنية أو في العرض؛ لا نضمن خلوّ الموقع من الانقطاع
          أو الأخطاء في كل الأوقات.
        </p>

        <h2 className="text-lg font-semibold text-white/90">الجانب الشرعي</h2>
        <p>
          المحتوى المعروض للتذكير والفائدة. <strong className="text-white/90">لا يُعتبر الموقع فتوى</strong>{" "}
          رسمية؛ للأحكام المعقّدة يلزم الرجوع إلى عالم موثوق أو جهة شرعية معتبرة في بلدك.
        </p>

        <h2 className="text-lg font-semibold text-white/90">الاستخدام المسموح</h2>
        <p>
          يُرجى استخدام الموقع بطريقة مشروعة ومهذّبة. يُحظر محاولة تعطيل الخدمة، اختراقها، أو إساءة
          استخدام الموارد (مثل إرسال طلبات مفرطة آلياً دون إذن).
        </p>

        <h2 className="text-lg font-semibold text-white/90">الروابط الخارجية والمصادر</h2>
        <p>
          قد يتضمن الموقع روابط أو بيانات من مصادر خارجية (واجهات برمجية، مواقع خطوط، إلخ). لا نتحكم
          في سياسات تلك الجهات ولا نتحمل مسؤولية محتواها.
        </p>

        <h2 className="text-lg font-semibold text-white/90">التعديلات</h2>
        <p>
          نحتفظ بحق تعديل هذه الشروط أو ميزات الموقع. استمرار الاستخدام بعد نشر التعديلات يعني الموافقة
          عليها قدر الممكن؛ يُفضّل مراجعة الصفحة من وقت لآخر.
        </p>

        <h2 className="text-lg font-semibold text-white/90">حدود المسؤولية</h2>
        <p>
          إلى أقصى حد يسمح به القانون المعمول به، لا نتحمل المسؤولية عن أي ضرر مباشر أو غير مباشر
          ناتج عن استخدامك للموقع أو عدم قدرتك على استخدامه.
        </p>

        <h2 className="text-lg font-semibold text-white/90">التواصل</h2>
        <p>
          لأي استفسار:{" "}
          <a href="/contact" className="text-accent underline-offset-2 hover:underline">
            اتصل بنا
          </a>
          .
        </p>
      </LegalArticle>
    </>
  );
}
