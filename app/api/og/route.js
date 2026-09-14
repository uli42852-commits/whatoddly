import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") || "whatoddly";
  const p = searchParams.get("p") || "?";
  const c = searchParams.get("c") || "";

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
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 28,
            color: "#F2B84B",
            letterSpacing: 2,
            marginBottom: 24,
          }}
        >
          ✨ whatoddly
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: "#F6F3ED",
            borderRadius: 32,
            padding: "56px 80px",
            maxWidth: 980,
          }}
        >
          <div
            style={{
              fontSize: 32,
              color: "#7A7791",
              marginBottom: 16,
              textAlign: "center",
            }}
          >
            "{q}"
          </div>
          <div
            style={{
              fontSize: 128,
              fontWeight: 700,
              color: "#F26B5B",
              lineHeight: 1,
            }}
          >
            {p}%
          </div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: "#1B1B3A",
              background: "#EDE9DD",
              borderRadius: 12,
              padding: "8px 24px",
              marginTop: 20,
            }}
          >
            {c}
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
