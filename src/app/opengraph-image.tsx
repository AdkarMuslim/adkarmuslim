import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0b0d1f 0%, #101633 100%)",
          color: "#f0c15a",
          padding: "70px",
        }}
      >
        <div style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.2 }}>أذكار المسلم</div>
        <div style={{ marginTop: 24, fontSize: 34, color: "#ffffffcc" }}>
          أذكار - قرآن - أدعية - حديث - مواقيت الصلاة
        </div>
        <div style={{ marginTop: 28, fontSize: 28, color: "#ffffff99" }}>AdkarMuslim.com</div>
      </div>
    ),
    { ...size },
  );
}
