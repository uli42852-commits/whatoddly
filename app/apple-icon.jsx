import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1B1B3A",
        }}
      >
        <div
          style={{
            width: 124,
            height: 124,
            borderRadius: "50%",
            background: "#F6E9D8",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -16,
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "#F2B84B",
              display: "flex",
            }}
          />
          <div style={{ display: "flex", gap: 24, marginBottom: 16 }}>
            <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#1B1B3A", display: "flex" }} />
            <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#1B1B3A", display: "flex" }} />
          </div>
          <div style={{ width: 26, height: 5, borderRadius: 3, background: "#1B1B3A", display: "flex" }} />
        </div>
      </div>
    ),
    { ...size }
  );
}
