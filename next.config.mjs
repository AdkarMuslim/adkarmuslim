/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  /** روابط عربية شائعة للحديث → المسار الرسمي (بدون middleware على كل /hadith/*) */
  async redirects() {
    return [
      {
        source: "/hadith/صحيح-البخاري",
        destination: "/hadith/bukhari",
        permanent: true,
      },
      {
        source: "/hadith/صحيح-مسلم",
        destination: "/hadith/muslim",
        permanent: true,
      },
    ];
  },

  /** رؤوس آمنة لأصول البناء — تساعد الـ CDN ولا تغيّر مسارات الملفات */
  async headers() {
    return [
      {
        source: "/_next/static/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
          { key: "X-Content-Type-Options", value: "nosniff" },
        ],
      },
    ];
  },
};

export default nextConfig;
