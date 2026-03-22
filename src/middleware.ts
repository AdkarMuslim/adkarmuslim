import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/**
 * مسارات عربية بديلة (للروابط المشتركة / SEO) → 301 إلى الـ URL الرسمي الواحد.
 * يمنع المحتوى المكرر: محركات البحث تفهرس /adkar/sabah فقط.
 *
 * ملاحظة: توجيهات `/hadith/صحيح-…` تُعرَّف في `next.config.mjs` (redirects)
 * حتى لا نوسّع الـ matcher على كل مسارات الحديث — كان يُسبب مشاكل في التطوير.
 */
const ADKAR_AR_ALIASES: Record<string, string> = {
  "/adkar/أذكار-الصباح": "/adkar/sabah",
  "/adkar/أذكار-المساء": "/adkar/massa",
  "/adkar/أذكار-النوم": "/adkar/nawm",
  "/adkar/أذكار-الاستيقاظ": "/adkar/istiqadh",
  "/adkar/أذكار-بعد-الصلاة": "/adkar/salat",
  "/adkar/أذكار-الوضوء": "/adkar/wudoo",
  "/adkar/أذكار-المسجد": "/adkar/masjid",
  "/adkar/أذكار-الأذان": "/adkar/athan",
  "/adkar/الرقية-الشرعية": "/adkar/ruqyah",
  "/adkar/أسماء-الله-الحسنى": "/adkar/asma-alhusna",
  "/adkar/حصن-المنزل": "/adkar/manzil",
};

const DUAA_AR_ALIASES: Record<string, string> = {
  "/duaa/جوامع-الدعاء": "/duaa/jawami3",
  "/duaa/الأدعية-القرآنية": "/duaa/quranic",
  "/duaa/أدعية-الأنبياء": "/duaa/anbiya",
};

function normalizePathname(pathname: string): string {
  try {
    return decodeURIComponent(pathname);
  } catch {
    return pathname;
  }
}

function resolveAlias(
  raw: string,
  decoded: string,
  map: Record<string, string>,
): string | undefined {
  return map[raw] ?? map[decoded];
}

export function middleware(request: NextRequest) {
  const raw = request.nextUrl.pathname;
  const decoded = normalizePathname(raw);

  const adkarTarget = resolveAlias(raw, decoded, ADKAR_AR_ALIASES);
  if (adkarTarget) {
    const url = request.nextUrl.clone();
    url.pathname = adkarTarget;
    url.search = "";
    return NextResponse.redirect(url, 301);
  }

  const duaaTarget = resolveAlias(raw, decoded, DUAA_AR_ALIASES);
  if (duaaTarget) {
    const url = request.nextUrl.clone();
    url.pathname = duaaTarget;
    url.search = "";
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/adkar/:path*", "/duaa/:path*"],
};
