import { ImageResponse } from "next/og";

// Generated favicon — a violet→cyan gradient tile with the "S" monogram.
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 22,
          fontWeight: 700,
          color: "#ffffff",
          borderRadius: 7,
          backgroundImage: "linear-gradient(135deg, #7c5cff, #22d3ee)",
          fontFamily: "sans-serif",
        }}
      >
        S
      </div>
    ),
    { ...size }
  );
}
