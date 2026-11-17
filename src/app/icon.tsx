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
            background: "linear-gradient(135deg, #3FC1CA, #0FA4AF, #0A7C85)",
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
