import { readFile } from "node:fs/promises";
import path from "node:path";
import { Resvg } from "@resvg/resvg-js";
import satori from "satori";

const WIDTH = 1200;
const HEIGHT = 630;

const COLORS = {
  background: "#141413",
  foreground: "#FBFBFA",
  muted: "#A3A39C",
  primary: "#0055FF",
  primaryLight: "#3385FF",
  pillBorder: "#3D3D39",
};

// Satori reads woff/ttf, not woff2.
const fontDir = path.join(process.cwd(), "node_modules/@fontsource/inter/files");
let fontsPromise: Promise<{ regular: Buffer; bold: Buffer }> | undefined;

function loadFonts() {
  fontsPromise ??= Promise.all([
    readFile(path.join(fontDir, "inter-latin-400-normal.woff")),
    readFile(path.join(fontDir, "inter-latin-700-normal.woff")),
  ]).then(([regular, bold]) => ({ regular, bold }));
  return fontsPromise;
}

export type OgImageInput = {
  title: string;
  eyebrow?: string;
  subtitle?: string;
  tags?: string[];
};

function titleFontSize(title: string) {
  if (title.length > 70) return 52;
  if (title.length > 40) return 60;
  return 72;
}

export async function renderOgImage({
  title,
  eyebrow,
  subtitle,
  tags = [],
}: OgImageInput): Promise<Buffer> {
  const fonts = await loadFonts();

  const svg = await satori(
    <div
      style={{
        width: WIDTH,
        height: HEIGHT,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        backgroundColor: COLORS.background,
        color: COLORS.foreground,
        fontFamily: "Inter",
        borderTop: `12px solid ${COLORS.primary}`,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {eyebrow ? (
          <div
            style={{
              fontSize: 26,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: COLORS.primaryLight,
            }}
          >
            {eyebrow}
          </div>
        ) : null}
        <div
          style={{
            fontSize: titleFontSize(title),
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: -1,
          }}
        >
          {title}
        </div>
        {subtitle ? (
          <div style={{ fontSize: 32, color: COLORS.muted, lineHeight: 1.4 }}>
            {subtitle}
          </div>
        ) : null}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
        }}
      >
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {tags.slice(0, 4).map((tag) => (
            <div
              key={tag}
              style={{
                fontSize: 24,
                padding: "8px 18px",
                borderRadius: 999,
                border: `2px solid ${COLORS.pillBorder}`,
                color: COLORS.foreground,
              }}
            >
              {tag}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", fontSize: 28, color: COLORS.muted }}>
          <span style={{ color: COLORS.foreground, fontWeight: 700 }}>
            Rayson Lim
          </span>
          <span style={{ margin: "0 12px" }}>·</span>
          <span>raysonlim.com</span>
        </div>
      </div>
    </div>,
    {
      width: WIDTH,
      height: HEIGHT,
      fonts: [
        { name: "Inter", data: fonts.regular, weight: 400, style: "normal" },
        { name: "Inter", data: fonts.bold, weight: 700, style: "normal" },
      ],
    },
  );

  return new Resvg(svg, { fitTo: { mode: "width", value: WIDTH } })
    .render()
    .asPng();
}
