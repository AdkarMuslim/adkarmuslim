"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto flex min-h-[50vh] w-full max-w-lg flex-col items-center justify-center gap-4 px-4 py-16 text-center">
      <h1 className="text-xl font-bold text-white">حدث خطأ</h1>
      <p className="text-sm text-white/65 leading-relaxed">
        تعذّر تحميل هذه الصفحة. جرّب التحديث أو أعد المحاولة.
      </p>
      <button
        type="button"
        onClick={() => reset()}
        className="focus-ring rounded-2xl bg-gradient-to-r from-primary/80 to-accent/80 px-5 py-2.5 text-sm font-bold text-black shadow-soft"
      >
        إعادة المحاولة
      </button>
    </main>
  );
}
