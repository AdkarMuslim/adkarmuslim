# نشر AdkarMuslim (Vercel + GitHub)

ما كانش عندك Git = ما تقدرش ترجع نسخة قديمة بسهولة. **ابدأ Git دابا** باش ما تضيعش التعديلات.

## 1) Git محلياً (مرة واحدة)

```bash
cd adkarmuslim
git init
git add .
git commit -m "AdkarMuslim: baseline يعمل"
```

أنشئ ريبو على GitHub ثم:

```bash
git remote add origin https://github.com/USER/REPO.git
git branch -M main
git push -u origin main
```

## 2) Vercel

- **Import** الريبو من GitHub.
- **Root Directory**:  
  - إلا `package.json` فجذر الريبو → **فارغ**  
  - إلا المشروع داخل `adkarmuslim` → اكتب **`adkarmuslim`**
- **Output Directory**: **فارغ**
- **Environment Variables**:
  - `NEXT_PUBLIC_SITE_URL` = `https://www.adkarmuslim.com`
  - (اختياري) `NEXT_PUBLIC_CONTACT_EMAIL` = بريدك لصفحات «اتصل بنا» و«حقوق النشر»

## 3) إلا الموقع بلا Tailwind (صفحة مفكّكة)

1. تحقق فـ Network من `/_next/static/css/....css` → لازم **200**.
2. راجع **Root Directory** (أشيع سبب).
3. Cloudflare: عطّل Rocket Loader و Auto Minify.

## 4) localhost معطّل

```bash
npm run clean
npm run dev
```

سيرفر **واحد** فقط، نفس البورت اللي يطبع فالطرفية.
