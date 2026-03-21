"use client";

/**
 * يستبدل الـ root layout عند فشل خطير؛ لذلك نعرّف html/body هنا
 * ونستعمل أنماطاً مضمّنة لأن globals قد لا تُحمَّل في هذا السيناريو.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          background: "linear-gradient(160deg, #0b1220 0%, #0f172a 45%, #111827 100%)",
          color: "#f8fafc",
          fontFamily: "system-ui, Tahoma, sans-serif",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1.5rem",
        }}
      >
        <div style={{ maxWidth: "28rem", textAlign: "center" }}>
          <h1 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.75rem" }}>
            خطأ في التطبيق
          </h1>
          <p style={{ fontSize: "0.875rem", opacity: 0.75, lineHeight: 1.7, marginBottom: "1.25rem" }}>
            حدثت مشكلة أثناء التشغيل. أوقف السيرفر ثم شغّل من جديد، أو احذف مجلد{" "}
            <code style={{ opacity: 0.9 }}>.next</code> ثم نفّذ{" "}
            <code style={{ opacity: 0.9 }}>npm run dev</code>.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            style={{
              border: "none",
              borderRadius: "1rem",
              padding: "0.65rem 1.25rem",
              fontWeight: 700,
              fontSize: "0.875rem",
              cursor: "pointer",
              background: "linear-gradient(90deg, #22c55e, #14b8a6)",
              color: "#020617",
            }}
          >
            إعادة المحاولة
          </button>
        </div>
      </body>
    </html>
  );
}
