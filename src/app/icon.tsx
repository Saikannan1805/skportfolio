import { ImageResponse } from "next/og";

export const runtime     = "edge";
export const size        = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "transparent",
        }}
      >
        <span
          style={{
            fontSize: 38,
            fontWeight: 800,
            background: "linear-gradient(135deg, #60A5FA, #818CF8, #6366F1, #A855F7)",
            backgroundClip: "text",
            color: "transparent",
            fontFamily: "serif",
            lineHeight: 1,
          }}
        >
          S
        </span>
      </div>
    ),
    size
  );
}
