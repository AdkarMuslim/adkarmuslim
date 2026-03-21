import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "أذكار المسلم",
    short_name: "أذكار المسلم",
    description: "أذكار، قرآن، أدعية، حديث، ومواقيت الصلاة.",
    start_url: "/",
    display: "standalone",
    background_color: "#0b0d1f",
    theme_color: "#0b0d1f",
    lang: "ar",
    dir: "rtl",
    icons: [
      {
        src: "/logo.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
