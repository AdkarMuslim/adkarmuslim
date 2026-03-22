import type { SectionSeoInput } from "./section-seo";

/** صفحات فهرس (مستويان في الـ breadcrumb) */
export const INDEX_PAGES = {
  duaa: {
    path: "/duaa",
    title: "الأدعية المأثورة",
    absoluteTitle: "الأدعية المأثورة — جوامع وقرآن وأنبياء - AdkarMuslim",
    description:
      "تصفح الأدعية المأثورة: جوامع الدعاء، الأدعية القرآنية، وأدعية الأنبياء — نصوص واضحة مع عداد على AdkarMuslim.",
    breadcrumbName: "الأدعية",
  },
  quran: {
    path: "/quran",
    title: "القرآن الكريم — المصحف",
    absoluteTitle: "القرآن الكريم مكتوب كاملاً مع تلاوة - AdkarMuslim",
    description:
      "المصحف الشريف: اقرأ كل سورة بخط مريح، غيّر القارئ، واستمع للتلاوة، ثم انتقل لتفسير صوتي. تجربة عربية على AdkarMuslim.",
    breadcrumbName: "القرآن الكريم",
  },
  hadith: {
    path: "/hadith",
    title: "الحديث النبوي الشريف",
    absoluteTitle: "صحيح البخاري ومسلم — أحاديث مكتوبة - AdkarMuslim",
    description:
      "صحيح البخاري وصحيح مسلم: تصفح الأحاديث برقمها، اقرأ النص بوضوح، وتنقّل بين الصفحات — AdkarMuslim.",
    breadcrumbName: "الحديث",
  },
  prayerTimes: {
    path: "/prayer-times",
    title: "مواقيت الصلاة",
    absoluteTitle: "مواقيت الصلاة حسب المدينة وGPS - AdkarMuslim",
    description:
      "أوقات الفجر والظهر والعصر والمغرب والعشاء حسب موقعك أو المدينة، مع ضبط طريقة الحساب وتجربة سريعة على الجوال — AdkarMuslim.",
    breadcrumbName: "مواقيت الصلاة",
  },
} as const;

/** صفحة فرعية تحت القرآن (3 مستويات في الـ breadcrumb) */
export const QURAN_CHILD_PAGES = {
  tafsir: {
    path: "/quran/tafsir",
    title: "تفسير القرآن الصوتي",
    absoluteTitle: "تفسير القرآن صوتياً — مقاطع مرتبة - AdkarMuslim",
    description:
      "استمع لتفسير مقاطع من سور القرآن: اختر السورة والمقطع المتاح، بتجربة عربية بسيطة وواضحة على AdkarMuslim.",
    breadcrumbName: "تفسير القرآن الصوتي",
  },
} as const;

/** إعدادات SEO لصفحات الأذكار (مسارات /adkar/...) */
export const ADKAR_ROUTES: Record<string, SectionSeoInput> = {
  salah: {
    section: "adkar",
    path: "/adkar/salah",
    title: "أذكار الصلاة",
    breadcrumbName: "أذكار الصلاة",
    absoluteTitle: "أذكار الصلاة مكتوبة كاملة - AdkarMuslim",
    description:
      "أذكار الصلاة مكتوبة كاملة من الاستفتاح إلى السجود والتشهد والقنوت: نصوص واضحة من السنة مع عداد تفاعلي لمراجعة أذكارك داخل الصلاة على AdkarMuslim.",
  },
  athan: {
    section: "adkar",
    path: "/adkar/athan",
    title: "أذكار الأذان والإقامة",
    breadcrumbName: "أذكار الأذان والإقامة",
    absoluteTitle: "أذكار الأذان والإقامة مكتوبة كاملة - AdkarMuslim",
    description:
      "أذكار الأذان والإقامة مكتوبة كاملة: الدعاء عند سماع الأذان والإقامة وفق السنة، مع عداد بسيط لحصن المسلم اليومي على AdkarMuslim.",
  },
  masjid: {
    section: "adkar",
    path: "/adkar/masjid",
    title: "أذكار المسجد",
    breadcrumbName: "أذكار المسجد",
    absoluteTitle: "أذكار المسجد مكتوبة كاملة - AdkarMuslim",
    description:
      "أذكار المسجد مكتوبة كاملة: الدخول والخروج والصلاة فيه وآداب بيت الله، مع عداد تفاعلي ونصوص من السنة على AdkarMuslim.",
  },
  wudoo: {
    section: "adkar",
    path: "/adkar/wudoo",
    title: "أذكار الوضوء",
    breadcrumbName: "أذكار الوضوء",
    absoluteTitle: "أذكار الوضوء مكتوبة كاملة - AdkarMuslim",
    description:
      "أذكار الوضوء مكتوبة كاملة: دعاء قبل وبعد الوضوء وأذكار الطهارة الشرعية مع عداد يسهّل الحفظ اليومي ضمن حصن المسلم على AdkarMuslim.",
  },
  khalaa: {
    section: "adkar",
    path: "/adkar/khalaa",
    title: "أذكار اللباس",
    breadcrumbName: "أذكار اللباس",
    absoluteTitle: "أذكار اللباس مكتوبة كاملة - AdkarMuslim",
    description:
      "أذكار لباس الثوب وخلعه مكتوبة كاملة من الأدعية المأثورة، مع عداد وترتيب واضح للمراجعة اليومية على AdkarMuslim.",
  },
  taam: {
    section: "adkar",
    path: "/adkar/taam",
    title: "أذكار الطعام والشراب",
    breadcrumbName: "أذكار الطعام والشراب",
    absoluteTitle: "أذكار الطعام والشراب مكتوبة كاملة - AdkarMuslim",
    description:
      "أذكار الطعام والشراب مكتوبة كاملة: بسم الله وأذكار قبل وبعد الأكل والضيافة من السنة، مع عداد تفاعلي على AdkarMuslim.",
  },
  "hajj-umrah": {
    section: "adkar",
    path: "/adkar/hajj-umrah",
    title: "أذكار الحج والعمرة",
    breadcrumbName: "أذكار الحج والعمرة",
    absoluteTitle: "أذكار الحج والعمرة مكتوبة كاملة - AdkarMuslim",
    description:
      "أذكار الحج والعمرة مكتوبة كاملة: تلبية وأدعية ومناسك مختصرة مرتبة، مع عداد لتسهيل المراجعة في الرحلة على AdkarMuslim.",
  },
  "khatm-quran": {
    section: "adkar",
    path: "/adkar/khatm-quran",
    title: "أذكار ختم القرآن",
    breadcrumbName: "أذكار ختم القرآن",
    absoluteTitle: "أذكار ختم القرآن مكتوبة كاملة - AdkarMuslim",
    description:
      "أذكار ختم القرآن مكتوبة كاملة: أدعية وذكر عند إتمام ختمة المصحف، بصياغة واضحة للاحتفال الروحي بالكتاب على AdkarMuslim.",
  },
  mayit: {
    section: "adkar",
    path: "/adkar/mayit",
    title: "أدعية للميت",
    breadcrumbName: "أدعية للميت",
    absoluteTitle: "أدعية للميت مكتوبة كاملة - AdkarMuslim",
    description:
      "أدعية للميت مكتوبة كاملة: استغفار ورحمة وذكر شرعي، مع عداد وترتيب يسهّل المراجعة عند الفقد أو زيارة القبر على AdkarMuslim.",
  },
  ruqyah: {
    section: "adkar",
    path: "/adkar/ruqyah",
    title: "الرقية الشرعية",
    breadcrumbName: "الرقية الشرعية",
    absoluteTitle: "الرقية الشرعية مكتوبة كاملة - AdkarMuslim",
    description:
      "الرقية الشرعية مكتوبة كاملة: آيات وأدعية من القرآن والسنة المأثورة للتلاوة والمداومة بطمأنينة، مع عداد على AdkarMuslim.",
  },
  "asma-alhusna": {
    section: "adkar",
    path: "/adkar/asma-alhusna",
    title: "أسماء الله الحسنى",
    breadcrumbName: "أسماء الله الحسنى",
    absoluteTitle: "أسماء الله الحسنى مكتوبة كاملة - AdkarMuslim",
    description:
      "أسماء الله الحسنى مكتوبة كاملة للذكر والتأمل: ترتيب واضح مع عداد يساعد على الحفظ والدعاء بأسمائه تعالى على AdkarMuslim.",
  },
  manzil: {
    section: "adkar",
    path: "/adkar/manzil",
    title: "حصن المنزل",
    breadcrumbName: "حصن المنزل",
    absoluteTitle: "حصن المنزل مكتوب كاملاً - AdkarMuslim",
    description:
      "حصن المنزل مكتوب كاملاً: مجموعة آيات وأدعية مأثورة للمراجعة اليومية، مع عداد وترتيب على AdkarMuslim.",
  },
  tasabih: {
    section: "adkar",
    path: "/adkar/tasabih",
    title: "التسبيح والتهليل",
    breadcrumbName: "التسبيح والتهليل",
    absoluteTitle: "أذكار التسبيح مكتوبة كاملة - AdkarMuslim",
    description:
      "أذكار التسبيح والتهليل مكتوبة كاملة بعد الصلاة وفي أوقات النهار، مع عداد تفاعلي ضمن حصن المسلم على AdkarMuslim.",
  },
};

/** صفحات الأدعية الفرعية */
export const DUAA_ROUTES: Record<string, SectionSeoInput> = {
  jawami3: {
    section: "duaa",
    path: "/duaa/jawami3",
    title: "الدعاء المأثور — جوامع الدعاء",
    breadcrumbName: "جوامع الدعاء",
    absoluteTitle: "جوامع الدعاء مكتوبة كاملة - AdkarMuslim",
    description:
      "جوامع الدعاء مكتوبة كاملة من القرآن والسنة: أدعية جامعة مع فضلها وعداد للحفظ والتكرار — صفحة عربية واضحة على AdkarMuslim.",
  },
  quranic: {
    section: "duaa",
    path: "/duaa/quranic",
    title: "الأدعية القرآنية",
    breadcrumbName: "الأدعية القرآنية",
    absoluteTitle: "الأدعية القرآنية مكتوبة كاملة - AdkarMuslim",
    description:
      "الأدعية القرآنية مكتوبة كاملة: أدعية مستخرجة من الآيات مع سياقها، وعداد يسهّل المراجعة والحفظ على AdkarMuslim.",
  },
  anbiya: {
    section: "duaa",
    path: "/duaa/anbiya",
    title: "أدعية الأنبياء",
    breadcrumbName: "أدعية الأنبياء",
    absoluteTitle: "أدعية الأنبياء مكتوبة كاملة - AdkarMuslim",
    description:
      "أدعية الأنبياء مكتوبة كاملة كما وردت في القرآن: نص واضح مع عداد للتأمل والحفظ — AdkarMuslim.",
  },
};
