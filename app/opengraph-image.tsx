import { ImageResponse } from "next/og";
import { brandDataUrl } from "@/lib/brand-image";

export const alt = "Opulent Financial — Turn your credit into capital.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const logo = await brandDataUrl("of-logo.png");
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: 72,
          padding: "0 88px",
          color: "#EEF2F8",
          background:
            "radial-gradient(900px 600px at 85% 0%, rgba(31,123,255,0.45), rgba(4,7,14,0) 70%), linear-gradient(160deg, #070D1A, #03060D)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain <img> */}
        <img src={logo} width={360} height={270} alt="" />
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 22, letterSpacing: 6, color: "#9FD8FF" }}>CREDIT · FUNDING · PROTECTION</div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 76, fontWeight: 700, lineHeight: 1.02, letterSpacing: -2 }}>
            <span>Turn your credit</span>
            <span style={{ color: "#5CC8FF" }}>into capital.</span>
          </div>
          <div style={{ fontSize: 26, color: "#9AA8BF" }}>Founder-led credit, funding and protection consulting.</div>
        </div>
      </div>
    ),
    size,
  );
}
