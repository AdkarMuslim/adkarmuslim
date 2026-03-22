This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

### إذا ظهر الموقع بدون تنسيق (CSS / Tailwind)

1. **Root Directory** في Vercel → Settings → General: لازم يكون **فارغ** إذا كان `package.json` في جذر الريبو، أو مثلاً `adkarmuslim` إذا كان الريبو فيه مجلد فرعي فقط للمشروع. غلط واحد هنا = نشر بدون Next صحيح.
2. **Output Directory** لازم يبقى **فارغ** لمشاريع Next.js (ما تستعمل `out` إلا إذا عملت static export بشكل صريح).
3. **Framework Preset** = Next.js (تلقائي غالباً).
4. لا تضبط Install Command يحذف الحزم المطلوبة للبناء (مثل `npm install --omit=dev`).
5. في **Environment Variables**: `NEXT_PUBLIC_SITE_URL` = `https://www.adkarmuslim.com` (الدومين الكنسي النهائي مع www).
6. إذا الدومين يمر على **Cloudflare**: عطّل **Rocket Loader** و **Auto Minify (HTML/JS/CSS)** للدومين ديالك؛ أحياناً كيكسروا تحميل ملفات `_next/static`.
7. دفع آخر commit ثم **Redeploy** (أو Clear cache ثم redeploy).
8. **معاينات فيسبوك/تويتر (OG):** المشروع ما كيستعملش `opengraph-image.tsx` (Satori كيعطي أخطاء على Vercel). الصورة من `metadata` تشير لـ `/logo.png` — لازم يكون `public/logo.png` موجود فالريبو. للأحسن: صورة أفقية **1200×630** باسم مثلاً `opengraph-image.png` وحدّث `layout.tsx` → `openGraph.images` و `twitter.images`.

إذا ظهر الموقع **بدون تنسيق**: تحقق من تحميل `/_next/static/css/...` في Network، ومن إعدادات Vercel/Cloudflare أعلاه (لا تضف ملف CSS احتياطي يكرر أسماء كلاسات Tailwind لأنه يكسر التخطيط).

### رسالة `missing required error components, refreshing...` (localhost)

هادا غالباً من **تعارض مجلد `.next`** مع السيرفر (مثلاً: `npm run build` وهو `next dev` شغال، أو جوج terminals فيهم `next dev`).

1. **وقّف كل شي**: `Ctrl+C` فكل نوافذ الطرفية.
2. احذف الكاش: `npm run clean` (أو احذف يدوياً مجلد `.next` بعد إيقاف السيرفر).
3. شغّل بس: `npm run dev` وافتح من جديد `http://localhost:3000`.

المشروع فيه الآن `src/app/error.tsx` و `global-error.tsx` و `not-found.tsx` باش Next يقدر يعرض الأخطاء بشكل صحيح.

### خطأ `Cannot find module './8948.js'` أو صفحة بيضاء بدون ستايل (localhost)

1. وقّف **كل** `next dev` / `next start` (Ctrl+C) وسدّ تبويبات localhost.
2. من جذر المشروع: `npm run clean` (أو احذف مجلد `.next` يدوياً).
3. شغّل **سيرفر واحد** فقط: `npm run dev`  
   أو مرة واحدة: `npm run dev:clean` (ينظف ثم يشغّل dev — إلا فشل الحذف، اتبع رسالة EPERM أعلاه).
4. افتح نفس البورت اللي يطبع فالطرفية (3000 أو 3001…).

### الموقع بلا CSS على Vercel (HTML عادي، خلفية بيضاء)

- **Root Directory**: لازم يطابق مكان `package.json` (فارغ إلا كان المشروع فجذر الريبو، أو `adkarmuslim` إلا كان داخل مجلد).
- **Output Directory**: فارغ لمشاريع Next.
- فـ المتصفح → **Network**: تحقق واش ملف `/_next/static/css/....css` كيتحمّل **200** ماشي 404.
- **Cloudflare**: عطّل Rocket Loader و Auto Minify (انظر القسم أعلاه).

### خلفية داكنة ولكن Tailwind مفكّك (عمود ضيق، روابط زرقاء)

- غالباً **ملف CSS ديال Next ما كيتحمّلش بالكامل** أو **PostCSS ما خدمش** فالبناء. المشروع كيستعمل **`postcss.config.js`** (CommonJS) باش Vercel/Next يقراوه بثبات.
- **ما تزيدش** `<head>` يدوي فـ `layout.tsx` — كيقدر يتعارض مع حقن `<link>` ديال الستايلات؛ الاحتياطي الخفيف كيبان فـ أول عنصر فـ `<body>`.
