import { ImageResponse } from "next/og";
import { profile } from "@/data/portfolio";

// Social share card (LinkedIn, X/Twitter, Slack, etc.). Next also reuses this
// as the Twitter image when no twitter-image file is present.
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${profile.name} — ${profile.role}`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "90px",
          backgroundColor: "#05060a",
          backgroundImage:
            "radial-gradient(900px circle at 18% 12%, rgba(124,92,255,0.35), transparent 55%), radial-gradient(900px circle at 90% 100%, rgba(34,211,238,0.22), transparent 55%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 2,
            color: "#22d3ee",
            fontFamily: "monospace",
          }}
        >
          {"// portfolio"}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontSize: 96,
            fontWeight: 700,
            color: "#f5f6fb",
            lineHeight: 1.05,
          }}
        >
          {profile.name}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 12,
            fontSize: 44,
            fontWeight: 600,
            color: "#a78bfa",
          }}
        >
          {profile.role}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 40,
            height: 8,
            width: 260,
            borderRadius: 9999,
            backgroundImage: "linear-gradient(90deg, #7c5cff, #22d3ee)",
          }}
        />

        <div
          style={{
            display: "flex",
            marginTop: 40,
            maxWidth: 900,
            fontSize: 30,
            color: "#9aa2b6",
            lineHeight: 1.4,
          }}
        >
          {profile.tagline}
        </div>
      </div>
    ),
    { ...size }
  );
}
