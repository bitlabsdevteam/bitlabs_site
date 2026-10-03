import { ImageResponse } from "next/og";
export const alt = "BitLabs — AI research and engineering, Tokyo";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        padding: 72,
        background: "#181a19",
        color: "#f1eee5",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 26,
        }}
      >
        <span>BITLABS</span>
        <span style={{ color: "#cebb8e" }}>
          TOKYO · AI RESEARCH & ENGINEERING
        </span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 74,
          letterSpacing: -2,
          lineHeight: 1.12,
        }}
      >
        <span style={{ color: "#cebb8e" }}>Research depth.</span>
        <span>AI that works in your business.</span>
      </div>
      <div style={{ fontSize: 23 }}>bitlabs.site</div>
    </div>,
    size,
  );
}
