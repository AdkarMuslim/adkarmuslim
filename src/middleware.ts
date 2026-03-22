import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/**
 * مسارات عربية بديلة (للروابط المشتركة / SEO) → 301 إلى الـ URL الرسمي الواحد.
 * يمنع المحتوى المكرر: محركات البحث تفهرس /adkar/sabah فقط.
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

export function middleware(request: NextRequest) {
  const raw = request.nextUrl.pathname;
  const decoded = normalizePathname(raw);
  const target = ADKAR_AR_ALIASES[raw] ?? ADKAR_AR_ALIASES[decoded];
  if (target) {
    const url = request.nextUrl.clone();
    url.pathname = target;
    url.search = "";
    return NextResponse.redirect(url, 301);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/adkar/:path*", "/duaa/:path*"],
};
