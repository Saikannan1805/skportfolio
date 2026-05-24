import { ImageResponse } from "next/og";

export const runtime     = "edge";
export const alt         = "Saikannan Sathish — Software Engineer";
export const size        = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "64px 80px",
          background:
            "radial-gradient(ellipse at 0% 0%, rgba(99,102,241,0.20) 0%, transparent 55%), #080808",
          position: "relative",
        }}
      >
        {/* SK monogram — top right */}
        <div
          style={{
            position: "absolute",
            top: 56,
            right: 80,
            display: "flex",
            fontSize: 18,
            fontWeight: 700,
            color: "#F2F2F2",
            letterSpacing: "0.35em",
            fontFamily: "monospace",
          }}
        >
          SK
        </div>

        {/* Status — top left */}
        <div
          style={{
            position: "absolute",
            top: 56,
            left: 80,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#22c55e",
              display: "flex",
            }}
          />
          <span
            style={{
              fontSize: 13,
              color: "#555555",
              letterSpacing: "0.15em",
              fontFamily: "monospace",
              textTransform: "uppercase",
            }}
          >
            Available for full-time roles · 2026
          </span>
        </div>

        {/* Name */}
        <div style={{ display: "flex", flexDirection: "column", marginBottom: 32 }}>
          <span
            style={{
              fontSize: 100,
              fontWeight: 800,
              color: "#F2F2F2",
              lineHeight: 1,
              fontFamily: "serif",
              letterSpacing: "-3px",
            }}
          >
            Saikannan
          </span>
          <span
            style={{
              fontSize: 100,
              fontWeight: 800,
              color: "#6366F1",
              lineHeight: 1,
              fontFamily: "serif",
              letterSpacing: "-3px",
            }}
          >
            Sathish
          </span>
        </div>

        {/* Divider */}
        <div
          style={{
            width: 56,
            height: 1,
            background: "#1f1f1f",
            marginBottom: 28,
            display: "flex",
          }}
        />

        {/* Role + university */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <span
            style={{
              fontSize: 22,
              color: "#888888",
              fontFamily: "sans-serif",
              fontWeight: 300,
              letterSpacing: "0.02em",
            }}
          >
            Software Engineer · AI / ML Engineer
          </span>
          <span
            style={{
              fontSize: 15,
              color: "#555555",
              fontFamily: "monospace",
              letterSpacing: "0.08em",
            }}
          >
            MS Computer Science (AI) · Binghamton University
          </span>
        </div>

        {/* GitHub — bottom right */}
        <div
          style={{
            position: "absolute",
            bottom: 56,
            right: 80,
            display: "flex",
            fontSize: 13,
            color: "#444444",
            fontFamily: "monospace",
            letterSpacing: "0.08em",
          }}
        >
          github.com/Saikannan1805
        </div>
      </div>
    ),
    size
  );
}
