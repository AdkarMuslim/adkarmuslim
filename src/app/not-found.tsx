import Link from "next/link";
import type { Metadata } from "next";

import { notFound404Metadata } from "../lib/ar-seo-meta";

export const metadata: Metadata = notFound404Metadata();

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[50vh] w-full max-w-lg flex-col items-center justify-center gap-4 px-4 py-16 text-center">
      <h1 className="text-xl font-bold text-zinc-900 dark:text-white">الصفحة غير موجودة</h1>
      <p className="text-sm text-zinc-600 dark:text-white/65">
        الرابط غير صحيح أو تم نقل المحتوى. جرّب الروابط أدناه أو ارجع للرئيسية.
      </p>
      <Link
        href="/"
        className="focus-ring rounded-2xl bg-gradient-to-r from-primary/80 to-accent/80 px-5 py-2.5 text-sm font-bold text-black shadow-soft"
      >
        العودة للرئيسية
      </Link>
      <nav
        className="mt-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-primary dark:text-accent"
        aria-label="روابط سريعة"
      >
        <Link href="/hadith" className="underline-offset-2 hover:underline">
          الحديث النبوي
        </Link>
        <span className="text-zinc-300 dark:text-white/25" aria-hidden>
          |
        </span>
        <Link href="/quran" className="underline-offset-2 hover:underline">
          القرآن
        </Link>
        <span className="text-zinc-300 dark:text-white/25" aria-hidden>
          |
        </span>
        <Link href="/adkar" className="underline-offset-2 hover:underline">
          الأذكار
        </Link>
      </nav>
    </main>
  );
}
