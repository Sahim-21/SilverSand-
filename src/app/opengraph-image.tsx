import { ImageResponse } from "next/og";

export const alt = "Silver Sand Beach Homestay — Homestay in Murudeshwar";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Branded wordmark card — not a photograph of the property.
 * Replace with a real owner photo once one exists.
 */
export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#1a2b24",
        color: "#f4efe6",
        padding: "72px 80px",
        fontFamily: "Georgia, 'Times New Roman', serif",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 22,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "#c4a35a",
        }}
      >
        Murudeshwar, Karnataka
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div
          style={{ display: "flex", fontSize: 64, lineHeight: 1.1, fontWeight: 600 }}
        >
          Silver Sand Beach Homestay
        </div>
        <div style={{ display: "flex", fontSize: 32, color: "#e8dfd0" }}>
          Homestay in Murudeshwar
        </div>
      </div>
      <div style={{ display: "flex", fontSize: 24, color: "#d4b56a" }}>
        Deluxe AC Room · Book on WhatsApp
      </div>
    </div>,
    { ...size },
  );
}
