# الموقع يظهر بلا ستايل (HTML فقط، خلفية بيضاء)

هاد **ما كيجيش** من كود Next عادي: ملفات CSS كاتتحمّل من `/_next/static/...` على **نفس الدومين** اللي فتحتي فيه الصفحة.

## 1) تحقق سريع في المتصفح

1. **F12** → **Network** → صفّي **CSS**
2. شوف `/_next/static/css/...`  
   - **200** = الملف وصل؛ المشكل شيء آخر (نادر)  
   - **404** أو **blocked** = السبب هنا

## 2) كاش ونشر

- **Ctrl+F5** أو نافذة خاصة  
- فـ **Vercel**: **Redeploy** آخر نسخة (مرة بدون كاش إلا متوفر)

## 3) Cloudflare (إلا مستعملو)

- **SSL/TLS** = **Full (strict)** مع Vercel (ما تخلي **Flexible**)
- عطّل **Rocket Loader** و **Auto Minify** للـ HTML (كتكسر Next أحياناً)
- شوف **Scrape Shield** / **Email Obfuscation** — جرّب تعطيل مؤقتاً للاختبار
- **Purge Everything** للكاش بعد نشر جديد

## 4) المتغيرات في Vercel

```
NEXT_PUBLIC_SITE_URL=https://www.adkarmuslim.com
```

(بدون `/` فالأخير)

## 5) ملاحظة تقنية

`metadataBase` (SEO) **ما كيغيّرش** روابط `/_next/static` فـ Next 14 — إلا كان Network كيعطي 404 لـ CSS، المشكل **نشر / CDN / إعدادات** ماشي `metadataBase`.
