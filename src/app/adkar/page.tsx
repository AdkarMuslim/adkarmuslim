import Link from "next/link";
import ComingSoonCard from "../../components/ComingSoonCard";
import ContentPageFooter from "../../components/ContentPageFooter";
import { CircleDot, Moon, Sparkles, Sun } from "lucide-react";
import type { Metadata } from "next";
import JsonLd from "../../components/JsonLd";
import { arSeoMeta } from "../../lib/ar-seo-meta";
import { buildBreadcrumbJsonLd, buildWebPageJsonLd } from "../../lib/seo";

export const metadata: Metadata = arSeoMeta({
  title: "الأذكار اليومية",
  description:
    "أذكار الصباح والمساء، النوم، الصلاة، المسجد، الوضوء، الرقية، أسماء الله الحسنى وأكثر — مع عداد وتجربة عربية سلسة.",
  path: "/adkar",
});

export default function AdkarIndexPage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "الرئيسية", path: "/" },
    { name: "الأذكار", path: "/adkar" },
  ]);
  const webPageJsonLd = buildWebPageJsonLd({
    path: "/adkar",
    name: "الأذكار اليومية",
    description:
      "أذكار الصباح والمساء، النوم، الصلاة، المسجد، الوضوء، الرقية، أسماء الله الحسنى وأكثر — مع عداد وتجربة عربية سلسة.",
  });

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={webPageJsonLd} />
      <section className="mx-auto w-full max-w-6xl px-4">
        <div className="glass-panel ring-accent/0 p-5 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white sm:text-3xl">
              الأذكار
            </h1>
            <p className="mt-2 text-sm text-white/60">
              اختر القسم الذي تريد، وكلما أكملت العدّ سننتقل للذكر الموالي.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-white/65">
              للبداية السريعة:{" "}
              <Link href="/adkar/sabah" className="font-medium text-accent underline-offset-2 hover:underline">
                أذكار الصباح
              </Link>{" "}
              مكتوبة كاملة مع عداد، ثم{" "}
              <Link href="/adkar/massa" className="font-medium text-accent underline-offset-2 hover:underline">
                أذكار المساء
              </Link>
              ،{" "}
              <Link href="/adkar/nawm" className="font-medium text-accent underline-offset-2 hover:underline">
                أذكار النوم
              </Link>
              ،{" "}
              <Link href="/adkar/istiqadh" className="font-medium text-accent underline-offset-2 hover:underline">
                أذكار الاستيقاظ
              </Link>
              ، و{" "}
              <Link href="/adkar/salat" className="font-medium text-accent underline-offset-2 hover:underline">
                أذكار بعد الصلاة
              </Link>
              .
            </p>
            <p className="mt-3 text-xs leading-relaxed text-white/50 sm:text-sm">
              للقراءة:{" "}
              <Link href="/adkar/fadl-adhkar-sabah" className="text-accent underline-offset-2 hover:underline">
                فضل أذكار الصباح
              </Link>
              {" · "}
              <Link href="/adkar/fadl-adhkar-masaa" className="text-accent underline-offset-2 hover:underline">
                فضل أذكار المساء
              </Link>
              {" · "}
              <Link href="/adkar/kaif-tuqra-adhkar" className="text-accent underline-offset-2 hover:underline">
                كيف تقرأ الأذكار
              </Link>
            </p>
          </div>
          <div className="hidden sm:block">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/20 text-accent">
              <Sparkles className="h-6 w-6" aria-hidden="true" />
            </span>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Link href="/adkar/sabah" className="glass-card p-5 transition hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-white/55">الأذكار</div>
                <div className="mt-1 text-lg font-semibold text-white">
                  أذكار الصباح
                </div>
              </div>
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/20 text-accent">
                <Sun className="h-5 w-5" aria-hidden="true" />
              </span>
            </div>
            <div className="mt-3 text-sm text-white/60">
              عدّ تفاعلي + حفظ تقدمك على جهازك.
            </div>
          </Link>

          <Link href="/adkar/massa" className="glass-card p-5 transition hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-white/55">الأذكار</div>
                <div className="mt-1 text-lg font-semibold text-white">
                  أذكار المساء
                </div>
              </div>
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/20 text-accent">
                <Moon className="h-5 w-5" aria-hidden="true" />
              </span>
            </div>
            <div className="mt-3 text-sm text-white/60">
              نفس تجربة العداد التفاعلي.
            </div>
          </Link>

          <Link href="/adkar/salat" className="glass-card p-5 transition hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-white/55">الأذكار</div>
                <div className="mt-1 text-lg font-semibold text-white">
                  أذكار بعد الصلاة
                </div>
              </div>
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/20 text-accent">
                <Sparkles className="h-5 w-5" aria-hidden="true" />
              </span>
            </div>
            <div className="mt-3 text-sm text-white/60">
              بعد السلام من الصلاة المفروضة.
            </div>
          </Link>

          <Link href="/adkar/salah" className="glass-card p-5 transition hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-white/55">الأذكار</div>
                <div className="mt-1 text-lg font-semibold text-white">
                  أذكار الصلاة
                </div>
              </div>
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/20 text-accent">
                <Sparkles className="h-5 w-5" aria-hidden="true" />
              </span>
            </div>
            <div className="mt-3 text-sm text-white/60">
              أذكار داخل الصلاة من الاستفتاح إلى القنوت.
            </div>
          </Link>

          <Link href="/adkar/tasabih" className="glass-card p-5 transition hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-white/55">الأذكار</div>
                <div className="mt-1 text-lg font-semibold text-white">
                  تسابيح
                </div>
              </div>
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/20 text-accent">
                <CircleDot className="h-5 w-5" aria-hidden="true" />
              </span>
            </div>
            <div className="mt-3 text-sm text-white/60">
              تسبيح وذكر بعدّاد سهل.
            </div>
          </Link>

          <Link href="/adkar/nawm" className="glass-card p-5 transition hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-white/55">الأذكار</div>
                <div className="mt-1 text-lg font-semibold text-white">
                  أذكار النوم
                </div>
              </div>
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/20 text-accent">
                <Moon className="h-5 w-5" aria-hidden="true" />
              </span>
            </div>
            <div className="mt-3 text-sm text-white/60">
              أذكار النوم والأحلام.
            </div>
          </Link>

          <Link href="/adkar/istiqadh" className="glass-card p-5 transition hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-white/55">الأذكار</div>
                <div className="mt-1 text-lg font-semibold text-white">
                  أذكار الاستيقاظ
                </div>
              </div>
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/20 text-accent">
                <Sun className="h-5 w-5" aria-hidden="true" />
              </span>
            </div>
            <div className="mt-3 text-sm text-white/60">
              أذكار الاستيقاظ من النوم.
            </div>
          </Link>

          <Link href="/adkar/athan" className="glass-card p-5 transition hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-white/55">الأذكار</div>
                <div className="mt-1 text-lg font-semibold text-white">
                  أذكار الآذان
                </div>
              </div>
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/20 text-accent">
                <Sparkles className="h-5 w-5" aria-hidden="true" />
              </span>
            </div>
            <div className="mt-3 text-sm text-white/60">
              ما يقال عند سماع الأذان وما بعده.
            </div>
          </Link>

          <Link href="/adkar/masjid" className="glass-card p-5 transition hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-white/55">الأذكار</div>
                <div className="mt-1 text-lg font-semibold text-white">
                  أذكار المسجد
                </div>
              </div>
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/20 text-accent">
                <Sparkles className="h-5 w-5" aria-hidden="true" />
              </span>
            </div>
            <div className="mt-3 text-sm text-white/60">
              عند الذهاب والدخول والخروج.
            </div>
          </Link>

          <Link href="/adkar/wudoo" className="glass-card p-5 transition hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-white/55">الأذكار</div>
                <div className="mt-1 text-lg font-semibold text-white">
                  أذكار الوضوء
                </div>
              </div>
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/20 text-accent">
                <Sparkles className="h-5 w-5" aria-hidden="true" />
              </span>
            </div>
            <div className="mt-3 text-sm text-white/60">
              قبل الوضوء وبعده.
            </div>
          </Link>

          <Link href="/adkar/manzil" className="glass-card p-5 transition hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-white/55">الأذكار</div>
                <div className="mt-1 text-lg font-semibold text-white">
                  أذكار المنزل
                </div>
              </div>
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/20 text-accent">
                <Sparkles className="h-5 w-5" aria-hidden="true" />
              </span>
            </div>
            <div className="mt-3 text-sm text-white/60">
              دخول المنزل والخروج منه.
            </div>
          </Link>

          <Link href="/adkar/khalaa" className="glass-card p-5 transition hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-white/55">الأذكار</div>
                <div className="mt-1 text-lg font-semibold text-white">
                  أذكار الخلاء
                </div>
              </div>
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/20 text-accent">
                <Sparkles className="h-5 w-5" aria-hidden="true" />
              </span>
            </div>
            <div className="mt-3 text-sm text-white/60">
              عند الدخول والخروج.
            </div>
          </Link>

          <Link href="/adkar/taam" className="glass-card p-5 transition hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-white/55">الأذكار</div>
                <div className="mt-1 text-lg font-semibold text-white">
                  أذكار الطعام
                </div>
              </div>
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/20 text-accent">
                <Sparkles className="h-5 w-5" aria-hidden="true" />
              </span>
            </div>
            <div className="mt-3 text-sm text-white/60">
              عند الطعام والشراب والضيف.
            </div>
          </Link>

          <Link
            href="/adkar/hajj-umrah"
            className="glass-card p-5 transition hover:-translate-y-1"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-white/55">الأذكار</div>
                <div className="mt-1 text-lg font-semibold text-white">
                  أذكار الحج والعمرة
                </div>
              </div>
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/20 text-accent">
                <Sparkles className="h-5 w-5" aria-hidden="true" />
              </span>
            </div>
            <div className="mt-3 text-sm text-white/60">
              أدعية وأذكار في محطات الحج والعمرة.
            </div>
          </Link>

          <Link
            href="/adkar/khatm-quran"
            className="glass-card p-5 transition hover:-translate-y-1"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-white/55">الأذكار</div>
                <div className="mt-1 text-lg font-semibold text-white">
                  دعاء ختم القرآن الكريم
                </div>
              </div>
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/20 text-accent">
                <Sparkles className="h-5 w-5" aria-hidden="true" />
              </span>
            </div>
            <div className="mt-3 text-sm text-white/60">
              ذكر عند إتمام قراءة القرآن.
            </div>
          </Link>

          <Link
            href="/adkar/asma-alhusna"
            className="glass-card p-5 transition hover:-translate-y-1"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-white/55">الأذكار</div>
                <div className="mt-1 text-lg font-semibold text-white">
                  أسماء الله الحسنى
                </div>
              </div>
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/20 text-accent">
                <Sparkles className="h-5 w-5" aria-hidden="true" />
              </span>
            </div>
            <div className="mt-3 text-sm text-white/60">
              اضغط على الاسم لعرض الشرح.
            </div>
          </Link>

          <Link
            href="/adkar/mayit"
            className="glass-card p-5 transition hover:-translate-y-1"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-white/55">الأذكار</div>
                <div className="mt-1 text-lg font-semibold text-white">
                  أدعية للميّت
                </div>
              </div>
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/20 text-accent">
                <Sparkles className="h-5 w-5" aria-hidden="true" />
              </span>
            </div>
            <div className="mt-3 text-sm text-white/60">
              أدعية للميت ودعاء صلاة الجنازة.
            </div>
          </Link>

          <Link
            href="/adkar/ruqyah"
            className="glass-card p-5 transition hover:-translate-y-1"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-white/55">الأذكار</div>
                <div className="mt-1 text-lg font-semibold text-white">
                  الرُّقية الشرعية
                </div>
              </div>
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/20 text-accent">
                <Sparkles className="h-5 w-5" aria-hidden="true" />
              </span>
            </div>
            <div className="mt-3 text-sm text-white/60">
              رقية من القرآن والسنة.
            </div>
          </Link>
        </div>

        <ContentPageFooter
          primaryLink={{ href: "/", label: "الرئيسية" }}
          related={[
            { href: "/adkar/sabah", label: "أذكار الصباح" },
            { href: "/adkar/massa", label: "أذكار المساء" },
            { href: "/duaa", label: "الأدعية" },
          ]}
        />
        </div>
      </section>
    </>
  );
}

