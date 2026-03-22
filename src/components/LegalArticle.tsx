import type { ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
};

/** صفحة قانونية بسيطة بنفس أسلوب الموقع */
export default function LegalArticle({ title, children }: Props) {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 pb-28 pt-2 sm:px-6">
      <article className="glass-panel ring-accent/0 p-5 sm:p-8">
        <h1 className="text-2xl font-bold text-white sm:text-3xl">{title}</h1>
        <div className="prose-legal mt-6 space-y-4 text-sm leading-relaxed text-white/75">{children}</div>
      </article>
    </main>
  );
}
