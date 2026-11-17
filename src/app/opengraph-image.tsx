import { ImageResponse } from "next/og";

export const runtime     = "edge";
export const alt         = "Saikannan Sathish, AI Engineer and Software Engineer";
export const size        = { width: 1200, height: 630 };
export const contentType = "image/png";

/* Lagoon palette (light theme) */
const C = {
  bg:        "#F4FAFB",
  deep:      "#003135",
  secondary: "#33585C",
  tertiary:  "#5A7E82",
  accent:    "#0A7C85",
  accentLt:  "#0FA4AF",
  pale:      "#AFDDE5",
  soft:      "#CBE9EE",
  surface:   "#FFFFFF",
  pop:       "#964734",
};

const IMPACT = [
  { value: "43.5%",    label: "faster voice replies" },
  { value: "40%",      label: "fewer hallucinations" },
  { value: "80%",      label: "lower LLM cost" },
];

/* ── Fonts ─────────────────────────────────────────────────────────────
   Every line names an explicit font. Without that, the renderer borrows
   glyphs from whatever custom font is loaded and mixes typefaces.     */
const DISPLAY_TEXT = "SaikannanSathish" + IMPACT.map((i) => i.value).join("");

/** Fetch a Google Font as TTF (optionally subset to `text`); null on any failure. */
async function loadGoogleFont(family: string, weight: number, text?: string): Promise<ArrayBuffer | null> {
  try {
    const params = `family=${family.replace(/ /g, "+")}:wght@${weight}${text ? `&text=${encodeURIComponent(text)}` : ""}`;
    const css = await fetch(`https://fonts.googleapis.com/css2?${params}`).then((r) => r.text());
    const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
    if (!url) return null;
    const res = await fetch(url);
    return res.ok ? await res.arrayBuffer() : null;
  } catch {
    return null; // fall back to the default font rather than failing the image
  }
}

const FONT_SPECS = [
  { name: "Inter",            weight: 400 as const },
  { name: "Inter",            weight: 600 as const },
  { name: "Geist Mono",       weight: 400 as const },
  { name: "Playfair Display", weight: 800 as const, text: DISPLAY_TEXT },
];

async function loadFonts() {
  const data = await Promise.all(FONT_SPECS.map((f) => loadGoogleFont(f.name, f.weight, f.text)));
  return FONT_SPECS.flatMap((f, i) =>
    data[i] ? [{ name: f.name, data: data[i] as ArrayBuffer, weight: f.weight, style: "normal" as const }] : []
  );
}

const DISPLAY = '"Playfair Display", serif';
const SANS    = "Inter, sans-serif";
const MONO    = '"Geist Mono", monospace';

/* Contour rings — nested ellipses centred off the right edge */
const RINGS = Array.from({ length: 11 }, (_, i) => i + 1);

export default async function Image() {
  const fonts = await loadFonts();

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
          position: "relative",
          background: [
            "radial-gradient(circle at 0% 0%, rgba(15,164,175,0.24) 0%, rgba(15,164,175,0) 45%)",
            "radial-gradient(circle at 100% 35%, rgba(175,221,229,0.75) 0%, rgba(175,221,229,0) 50%)",
            "radial-gradient(circle at 55% 115%, rgba(150,71,52,0.10) 0%, rgba(150,71,52,0) 40%)",
            C.bg,
          ].join(", "),
        }}
      >
        {/* Contour rings */}
        {RINGS.map((r) => (
          <div
            key={r}
            style={{
              position: "absolute",
              display: "flex",
              left: 980 - r * 44,
              top: 250 - r * 32,
              width: r * 88,
              height: r * 64,
              borderRadius: "50%",
              border: `1px solid rgba(10,124,133,${0.2 - r * 0.012})`,
            }}
          />
        ))}

        {/* Status — top left */}
        <div style={{ position: "absolute", top: 60, left: 80, display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              display: "flex",
              width: 10,
              height: 10,
              borderRadius: 999,
              background: C.pop,
              boxShadow: "0 0 0 5px rgba(150,71,52,0.15)",
            }}
          />
          <span style={{ fontSize: 15, color: C.secondary, letterSpacing: "0.16em", fontFamily: MONO }}>
            AVAILABLE FOR FULL-TIME ROLES · DEC 2026
          </span>
        </div>

        {/* Monogram — top right */}
        <div
          style={{
            position: "absolute",
            top: 52,
            right: 80,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 52,
            height: 52,
            borderRadius: 16,
            background: C.surface,
            boxShadow: "0 10px 28px -14px rgba(0,49,53,0.35)",
            fontSize: 30,
            fontWeight: 800,
            color: C.accent,
            fontFamily: DISPLAY,
          }}
        >
          S
        </div>

        {/* Name */}
        <div style={{ display: "flex", flexDirection: "column", marginBottom: 28 }}>
          <span style={{ fontSize: 104, fontWeight: 800, color: C.deep, lineHeight: 1, fontFamily: DISPLAY, letterSpacing: "-3px" }}>
            Saikannan
          </span>
          <span style={{ fontSize: 104, fontWeight: 800, color: C.accent, lineHeight: 1.05, fontFamily: DISPLAY, letterSpacing: "-3px" }}>
            Sathish
          </span>
        </div>

        {/* Role + university */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <span style={{ fontSize: 26, color: C.secondary, fontFamily: SANS }}>
            AI Engineer · Software Engineer
          </span>
          <span style={{ fontSize: 16, color: C.tertiary, fontFamily: MONO, letterSpacing: "0.06em" }}>
            MS Computer Science (AI) · Binghamton University
          </span>
        </div>

        {/* Impact row + CTA */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginTop: 40 }}>
          <div style={{ display: "flex", gap: 14 }}>
            {IMPACT.map((item) => (
              <div
                key={item.label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "14px 20px",
                  borderRadius: 16,
                  background: "rgba(255,255,255,0.8)",
                  boxShadow: "0 10px 28px -16px rgba(0,49,53,0.3)",
                }}
              >
                <span style={{ fontSize: 30, fontWeight: 800, color: C.deep, fontFamily: DISPLAY, lineHeight: 1 }}>
                  {item.value}
                </span>
                <span style={{ marginTop: 6, fontSize: 15, color: C.secondary, fontFamily: SANS }}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "14px 28px",
              borderRadius: 999,
              background: C.soft,
              fontSize: 18,
              fontWeight: 600,
              color: C.deep,
              fontFamily: SANS,
            }}
          >
            View portfolio →
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: fonts.length ? fonts : undefined,
    }
  );
}
