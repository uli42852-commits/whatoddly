import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#1B1B3A",
        }}
      >
        <div
          style={{
            width: 150,
            height: 150,
            borderRadius: "50%",
            background: "#F6E9D8",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            marginBottom: 30,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -18,
              width: 14,
              height: 14,
              borderRadius: "50%",
              background: "#F2B84B",
              display: "flex",
            }}
          />
          <div style={{ display: "flex", gap: 30, marginBottom: 20 }}>
            <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#1B1B3A", display: "flex" }} />
            <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#1B1B3A", display: "flex" }} />
          </div>
          <div style={{ width: 32, height: 6, borderRadius: 3, background: "#1B1B3A", display: "flex" }} />
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#F2B84B", letterSpacing: 2, marginBottom: 16 }}>
          whatoddly
        </div>
        <div style={{ display: "flex", fontSize: 50, fontWeight: 700, color: "#F6F3ED" }}>
          그 일이 일어날 확률,
        </div>
        <div style={{ display: "flex", fontSize: 50, fontWeight: 700, color: "#F6F3ED", marginBottom: 26 }}>
          숫자로 알려드릴게요
        </div>
        <div style={{ display: "flex", fontSize: 22, color: "#B9B6D6" }}>
          궁금한 일을 입력하고 확률을 확인해보세요
        </div>
      </div>
    ),
    { ...size }
  );
}
