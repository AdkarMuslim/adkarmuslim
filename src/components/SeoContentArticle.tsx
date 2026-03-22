import type { ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
  /** تذييل روابط داخلية (ContentPageFooter) */
  footer?: ReactNode;
};

/**
 * مقال إرشادي ثابت (SEO) — نفس أسلوب الموقع: لوحة زجاجية، عرض مناسب للموبايل.
 */
export default function SeoContentArticle({ title, children, footer }: Props) {
  return (
    <main className="mx-auto w-full max-w-4xl px-3 pb-28 sm:px-4">
      <article className="glass-panel ring-accent/0 p-5 sm:p-7">
        <h1 className="text-2xl font-bold text-white sm:text-3xl">{title}</h1>
        <div
          className={[
            "mt-6 space-y-4 text-sm leading-relaxed text-white/75",
            "[&_h2]:mt-8 [&_h2]:scroll-mt-24 [&_h2]:text-base [&_h2]:font-bold [&_h2]:text-white sm:[&_h2]:text-lg",
            "[&_h3]:mt-5 [&_h3]:text-sm [&_h3]:font-semibold [&_h3]:text-white/90",
            "[&_ul]:mr-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:text-white/75",
            "[&_a]:text-accent [&_a]:underline-offset-2 hover:[&_a]:underline",
          ].join(" ")}
        >
          {children}
        </div>
        {footer}
      </article>
    </main>
  );
}
