import { ImageResponse } from "next/og";

export const alt = "Zupona AI — The creative storefront and studio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#07080a",
          color: "#f5f3ec",
          padding: "64px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 700,
            height: 700,
            borderRadius: 999,
            background: "#d9ff43",
            opacity: 0.12,
            filter: "blur(90px)",
            top: -260,
            right: -120,
            display: "flex",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 15,
              background: "#d9ff43",
              color: "#0a0b05",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 34,
              fontWeight: 700,
            }}
          >
            Z
          </div>
          <div style={{ display: "flex", fontSize: 30, letterSpacing: -1 }}>
            zupona
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 14,
              letterSpacing: 3,
              color: "#8a8d92",
              border: "1px solid #2a2d33",
              padding: "4px 10px",
              borderRadius: 6,
            }}
          >
            AI
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              display: "flex",
              fontFamily: "sans-serif",
              fontSize: 82,
              lineHeight: 1,
              letterSpacing: -4,
              maxWidth: 920,
            }}
          >
            Your imagination,
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "sans-serif",
              fontSize: 82,
              lineHeight: 1,
              letterSpacing: -4,
              color: "#d9ff43",
              maxWidth: 920,
            }}
          >
            with a ship date.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #24262b",
            paddingTop: 28,
            fontSize: 20,
            color: "#8a8d92",
          }}
        >
          <div style={{ display: "flex" }}>
            The creative storefront and studio
          </div>
          <div style={{ display: "flex", color: "#d9ff43" }}>
            zupona.ai
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
