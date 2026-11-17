/**
 * Site-wide "Tide + Contour" background.
 * One fixed layer behind every section: slowly drifting blurred orbs (tide)
 * plus faint topographic contour lines that fade out before reaching content.
 * Pure server component — the SVG paths are computed once at render time.
 */

/** Nested, gently wobbling closed loops — like map contours around a peak. */
function contourPaths(cx: number, cy: number, rings: number, spacing: number, seed: number) {
  const paths: string[] = [];
  const N = 120;
  for (let r = 1; r <= rings; r++) {
    const base = r * spacing;
    let d = "";
    for (let i = 0; i <= N; i++) {
      const t = (i / N) * Math.PI * 2;
      const wob =
        1 +
        0.1 * Math.sin(3 * t + r * 0.55 + seed) +
        0.06 * Math.sin(5 * t - r * 0.3 + seed * 2) +
        0.04 * Math.cos(2 * t + r + seed);
      const x = cx + Math.cos(t) * base * 1.35 * wob;
      const y = cy + Math.sin(t) * base * wob;
      d += `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`;
    }
    paths.push(`${d}Z`);
  }
  return paths;
}

const PATHS = [
  ...contourPaths(1180, 360, 22, 34, 0),
  ...contourPaths(140, 980, 10, 34, 1.7),
];

export default function Backdrop() {
  return (
    <div aria-hidden className="backdrop pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="backdrop-orb backdrop-orb-1" />
      <div className="backdrop-orb backdrop-orb-2" />
      <div className="backdrop-orb backdrop-orb-3" />

      <svg
        className="backdrop-contour absolute inset-0 h-full w-full"
        viewBox="0 0 1440 1000"
        preserveAspectRatio="xMidYMid slice"
      >
        <g>
          {PATHS.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </g>
      </svg>
    </div>
  );
}
