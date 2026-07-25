/* ────────────────────────────────────────────────────────────────────────
 *  PROJECT MOCKUPS
 *
 *  Vector recreations of each project's real screens, drawn as inline SVG so
 *  they stay crisp at any size, need no external assets, and never shift the
 *  layout (every mockup shares the same 16/10 viewBox as its frame).
 *
 *  Replace a mockup with a real screenshot by setting `src` on the image in
 *  data/portfolio.ts — the frame prefers the photo whenever there is one.
 * ──────────────────────────────────────────────────────────────────────── */

import type { ReactNode } from "react";

export type MockupKind =
  | "flam-mobile"
  | "flam-wallet"
  | "flam-desktop"
  | "flam-web"
  | "cooper-dashboard"
  | "cooper-registro"
  | "cooper-hierarchy"
  | "cooper-widget";

/* Palette mirrors tailwind.config.ts so mockups feel native to the page. */
const C = {
  void: "#05060a",
  bg: "#0a0c12",
  surface: "#10131c",
  raised: "#171b27",
  line: "#1f2535",
  violet: "#7c5cff",
  cyan: "#22d3ee",
  white: "#f1f5f9",
  gray: "#9ca3af",
  dim: "#5b6478",
};

/* ── Shared primitives ──────────────────────────────────────────────── */

/** Placeholder text run — used where real copy would be noise. */
function Bar({
  x,
  y,
  w,
  h = 6,
  fill = C.line,
  o = 1,
}: {
  x: number;
  y: number;
  w: number;
  h?: number;
  fill?: string;
  o?: number;
}) {
  return <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={fill} opacity={o} />;
}

function Backdrop({ uid }: { uid: string }) {
  return (
    <>
      <defs>
        <radialGradient id={`${uid}-glow-a`} cx="18%" cy="12%" r="60%">
          <stop offset="0%" stopColor={C.violet} stopOpacity="0.32" />
          <stop offset="100%" stopColor={C.violet} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${uid}-glow-b`} cx="88%" cy="90%" r="55%">
          <stop offset="0%" stopColor={C.cyan} stopOpacity="0.22" />
          <stop offset="100%" stopColor={C.cyan} stopOpacity="0" />
        </radialGradient>
        <pattern id={`${uid}-grid`} width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M32 0H0V32" fill="none" stroke={C.line} strokeWidth="1" opacity="0.55" />
        </pattern>
        <linearGradient id={`${uid}-accent`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={C.violet} />
          <stop offset="100%" stopColor={C.cyan} />
        </linearGradient>
      </defs>
      <rect width="800" height="500" fill={C.bg} />
      <rect width="800" height="500" fill={`url(#${uid}-grid)`} />
      <rect width="800" height="500" fill={`url(#${uid}-glow-a)`} />
      <rect width="800" height="500" fill={`url(#${uid}-glow-b)`} />
    </>
  );
}

/**
 * Phone shell. Children are drawn in the screen's own coordinate space:
 * 248 wide × 420 tall, origin at the top-left of the visible screen.
 */
function Phone({
  x,
  y,
  uid,
  children,
}: {
  x: number;
  y: number;
  uid: string;
  children: ReactNode;
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <defs>
        <clipPath id={`${uid}-screen`}>
          <rect x="8" y="34" width="248" height="420" rx="6" />
        </clipPath>
      </defs>
      <rect
        width="264"
        height="470"
        rx="38"
        fill={C.void}
        stroke={C.line}
        strokeWidth="2"
      />
      <rect x="6" y="6" width="252" height="458" rx="33" fill={C.bg} />
      <g clipPath={`url(#${uid}-screen)`}>
        <g transform="translate(8 34)">{children}</g>
      </g>
      {/* Dynamic Island */}
      <rect x="99" y="15" width="66" height="15" rx="7.5" fill={C.void} />
      {/* Home indicator */}
      <rect x="102" y="450" width="60" height="4" rx="2" fill={C.dim} opacity="0.7" />
    </g>
  );
}

/** Desktop / browser window shell. Content origin is below the title bar. */
function Window({
  x,
  y,
  w,
  h,
  url,
  children,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  url?: string;
  children: ReactNode;
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width={w} height={h} rx="14" fill={C.surface} stroke={C.line} strokeWidth="1.5" />
      <path
        d={`M0 14a14 14 0 0 1 14-14h${w - 28}a14 14 0 0 1 14 14v20H0z`}
        fill={C.raised}
      />
      <circle cx="22" cy="17" r="4.5" fill="#f87171" opacity="0.85" />
      <circle cx="38" cy="17" r="4.5" fill="#fbbf24" opacity="0.85" />
      <circle cx="54" cy="17" r="4.5" fill="#34d399" opacity="0.85" />
      {url && (
        <>
          <rect x={w / 2 - 110} y="7" width="220" height="20" rx="10" fill={C.bg} />
          <text
            x={w / 2}
            y="21"
            textAnchor="middle"
            fill={C.gray}
            fontSize="10"
            letterSpacing="0.3"
          >
            {url}
          </text>
        </>
      )}
      <line x1="0" y1="34" x2={w} y2="34" stroke={C.line} strokeWidth="1.5" />
      <g transform="translate(0 34)">{children}</g>
    </g>
  );
}

/** Annotation callout that labels a technical detail of the screen. */
function Note({
  x,
  y,
  w = 176,
  label,
  value,
  align = "left",
}: {
  x: number;
  y: number;
  w?: number;
  label: string;
  value: string;
  align?: "left" | "right";
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width={w} height="58" rx="12" fill={C.surface} stroke={C.line} strokeWidth="1" />
      <rect
        x={align === "left" ? 0 : w - 3}
        y="14"
        width="3"
        height="30"
        rx="1.5"
        fill={C.cyan}
      />
      <text x="16" y="24" fill={C.cyan} fontSize="9" letterSpacing="1">
        {label.toUpperCase()}
      </text>
      <text x="16" y="42" fill={C.white} fontSize="12.5" fontWeight="600">
        {value}
      </text>
    </g>
  );
}

/* ── FLÅM · mobile booking flow ─────────────────────────────────────── */

function FlamMobile({ uid }: { uid: string }) {
  const experiences = [
    { name: "Fjord Cruise", meta: "2 h · Nærøyfjord", price: "690 NOK" },
    { name: "Flåm Railway", meta: "1 h · Myrdal", price: "450 NOK" },
    { name: "Kayak Tour", meta: "3 h · Aurlandsfjord", price: "890 NOK" },
  ];
  const split = [
    { name: "Fjord Cruise AS", pct: 42 },
    { name: "Flåm Railway", pct: 31 },
    { name: "Kayak Flåm", pct: 19 },
    { name: "Platform fee", pct: 8 },
  ];

  return (
    <>
      <Backdrop uid={uid} />

      <Phone x={54} y={18} uid={uid}>
        {/* Header */}
        <text x="16" y="26" fill={C.white} fontSize="16" fontWeight="700">
          Flåm
        </text>
        <text x="16" y="42" fill={C.gray} fontSize="9.5">
          12–15 June · 2 travellers
        </text>
        <circle cx="224" cy="28" r="13" fill={C.raised} stroke={C.line} />
        <circle cx="224" cy="24" r="4" fill={C.dim} />
        <path d="M216 34a8 7 0 0 1 16 0z" fill={C.dim} />

        {/* Search */}
        <rect x="16" y="56" width="216" height="30" rx="15" fill={C.surface} stroke={C.line} />
        <circle cx="34" cy="71" r="5" fill="none" stroke={C.gray} strokeWidth="1.6" />
        <line x1="38" y1="75" x2="42" y2="79" stroke={C.gray} strokeWidth="1.6" />
        <text x="52" y="75" fill={C.dim} fontSize="10.5">
          Search experiences
        </text>

        {/* Filter chips */}
        <rect x="16" y="96" width="54" height="22" rx="11" fill={C.violet} opacity="0.9" />
        <text x="43" y="111" textAnchor="middle" fill={C.white} fontSize="9.5" fontWeight="600">
          All
        </text>
        {["Fjord", "Rail", "Hike"].map((t, i) => (
          <g key={t}>
            <rect
              x={76 + i * 54}
              y="96"
              width="50"
              height="22"
              rx="11"
              fill={C.surface}
              stroke={C.line}
            />
            <text
              x={101 + i * 54}
              y="111"
              textAnchor="middle"
              fill={C.gray}
              fontSize="9.5"
            >
              {t}
            </text>
          </g>
        ))}

        {/* Experience cards */}
        {experiences.map((e, i) => {
          const y = 132 + i * 104;
          return (
            <g key={e.name}>
              <rect
                x="16"
                y={y}
                width="216"
                height="94"
                rx="14"
                fill={C.surface}
                stroke={C.line}
              />
              <rect
                x="16"
                y={y}
                width="216"
                height="46"
                rx="14"
                fill={`url(#${uid}-accent)`}
                opacity={0.55 - i * 0.12}
              />
              <path
                d={`M16 ${y + 34}l38-20 32 18 30-14 100 28v${12}H16z`}
                fill={C.void}
                opacity="0.35"
              />
              <text x="30" y={y + 66} fill={C.white} fontSize="12.5" fontWeight="600">
                {e.name}
              </text>
              <text x="30" y={y + 81} fill={C.gray} fontSize="9.5">
                {e.meta}
              </text>
              <text x="218" y={y + 74} textAnchor="end" fill={C.cyan} fontSize="11" fontWeight="600">
                {e.price}
              </text>
            </g>
          );
        })}

        {/* Tab bar */}
        <rect x="0" y="378" width="248" height="42" fill={C.surface} opacity="0.97" />
        <line x1="0" y1="378" x2="248" y2="378" stroke={C.line} />
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <rect
              x={26 + i * 56}
              y="392"
              width="16"
              height="14"
              rx="3"
              fill={i === 0 ? C.violet : C.dim}
              opacity={i === 0 ? 1 : 0.7}
            />
            <Bar x={24 + i * 56} y={410} w={20} h={3} fill={i === 0 ? C.violet : C.dim} o={0.6} />
          </g>
        ))}
      </Phone>

      {/* Checkout summary */}
      <g transform="translate(360 52)">
        <rect width="404" height="196" rx="16" fill={C.surface} stroke={C.line} strokeWidth="1.5" />
        <text x="22" y="34" fill={C.white} fontSize="14" fontWeight="700">
          Your bundle
        </text>
        <text x="382" y="34" textAnchor="end" fill={C.cyan} fontSize="10">
          3 experiences
        </text>
        {experiences.map((e, i) => (
          <g key={e.name}>
            <circle cx="30" cy={62 + i * 26} r="4" fill={C.violet} opacity={1 - i * 0.25} />
            <text x="44" y={66 + i * 26} fill={C.gray} fontSize="11">
              {e.name}
            </text>
            <text x="382" y={66 + i * 26} textAnchor="end" fill={C.white} fontSize="11">
              {e.price}
            </text>
          </g>
        ))}
        <line x1="22" y1="146" x2="382" y2="146" stroke={C.line} />
        <text x="22" y="168" fill={C.gray} fontSize="11">
          Total
        </text>
        <text x="382" y="170" textAnchor="end" fill={C.white} fontSize="16" fontWeight="700">
          2 030 NOK
        </text>
      </g>

      {/* Revenue split */}
      <g transform="translate(360 272)">
        <rect width="404" height="176" rx="16" fill={C.surface} stroke={C.line} strokeWidth="1.5" />
        <text x="22" y="32" fill={C.white} fontSize="13" fontWeight="700">
          Payout split
        </text>
        <text x="382" y="32" textAnchor="end" fill={C.cyan} fontSize="9.5">
          Stripe Connect
        </text>
        {split.map((s, i) => (
          <g key={s.name} transform={`translate(22 ${52 + i * 30})`}>
            <text y="10" fill={C.gray} fontSize="10.5">
              {s.name}
            </text>
            <rect x="176" y="2" width="150" height="9" rx="4.5" fill={C.raised} />
            <rect
              x="176"
              y="2"
              width={(150 * s.pct) / 45}
              height="9"
              rx="4.5"
              fill={i === 3 ? C.cyan : C.violet}
              opacity={i === 3 ? 0.9 : 1 - i * 0.18}
            />
            <text x="360" y="11" textAnchor="end" fill={C.white} fontSize="10.5">
              {s.pct}%
            </text>
          </g>
        ))}
      </g>
    </>
  );
}

/* ── FLÅM · offline Wallet pass ─────────────────────────────────────── */

/** Deterministic QR-ish matrix — stable between server and client renders. */
const QR_CELLS = Array.from({ length: 21 * 21 }, (_, i) => {
  const r = Math.floor(i / 21);
  const c = i % 21;
  return (r * 7 + c * 13 + ((r * c) % 5)) % 3 === 0;
});

function FlamWallet({ uid }: { uid: string }) {
  const cell = 5;
  const qrX = 70;
  const qrY = 214;

  const isFinder = (r: number, c: number) =>
    (r < 7 && c < 7) || (r < 7 && c > 13) || (r > 13 && c < 7);

  return (
    <>
      <Backdrop uid={uid} />

      <Note x={26} y={196} label="Verification" value="HMAC-signed QR" />
      <Note x={598} y={196} w={176} label="Formats" value=".pkpass · Google" align="right" />
      <path
        d="M202 225h56"
        stroke={C.line}
        strokeWidth="1.5"
        strokeDasharray="4 4"
        fill="none"
      />
      <path
        d="M542 225h56"
        stroke={C.line}
        strokeWidth="1.5"
        strokeDasharray="4 4"
        fill="none"
      />

      <Phone x={268} y={15} uid={uid}>
        <text x="16" y="26" fill={C.gray} fontSize="11">
          Wallet
        </text>
        <text x="232" y="26" textAnchor="end" fill={C.cyan} fontSize="11">
          Done
        </text>

        {/* Pass */}
        <rect x="16" y="42" width="216" height="326" rx="18" fill={C.surface} stroke={C.line} />
        <path
          d={`M16 60a18 18 0 0 1 18-18h180a18 18 0 0 1 18 18v52H16z`}
          fill={`url(#${uid}-accent)`}
        />
        <circle cx="40" cy="66" r="11" fill={C.void} opacity="0.35" />
        <path d="M34 70l6-7 6 7z" fill={C.white} opacity="0.9" />
        <text x="60" y="63" fill={C.white} fontSize="10.5" fontWeight="700" letterSpacing="0.6">
          FLÅM TOURIST CARD
        </text>
        <text x="60" y="78" fill={C.white} fontSize="8.5" opacity="0.85">
          3-day pass · All partners
        </text>

        <text x="32" y="134" fill={C.dim} fontSize="8" letterSpacing="1">
          HOLDER
        </text>
        <text x="32" y="150" fill={C.white} fontSize="12" fontWeight="600">
          Sergi Sarrió
        </text>
        <text x="216" y="134" textAnchor="end" fill={C.dim} fontSize="8" letterSpacing="1">
          VALID
        </text>
        <text x="216" y="150" textAnchor="end" fill={C.white} fontSize="12" fontWeight="600">
          12–15 Jun
        </text>
        <line x1="32" y1="170" x2="216" y2="170" stroke={C.line} />
        <text x="32" y="192" fill={C.dim} fontSize="8" letterSpacing="1">
          PASS ID
        </text>
        <text x="216" y="192" textAnchor="end" fill={C.gray} fontSize="9.5">
          FTC-2026-0417
        </text>

        {/* QR */}
        <rect x={qrX - 8} y={qrY - 8} width="124" height="124" rx="10" fill="#ffffff" />
        {QR_CELLS.map((on, i) => {
          const r = Math.floor(i / 21);
          const c = i % 21;
          if (!on || isFinder(r, c)) return null;
          return (
            <rect
              key={i}
              x={qrX + c * cell}
              y={qrY + r * cell}
              width={cell}
              height={cell}
              fill="#05060a"
            />
          );
        })}
        {[
          [0, 0],
          [0, 14],
          [14, 0],
        ].map(([r, c]) => (
          <g key={`${r}-${c}`}>
            <rect
              x={qrX + c * cell}
              y={qrY + r * cell}
              width={cell * 7}
              height={cell * 7}
              fill="#05060a"
            />
            <rect
              x={qrX + (c + 1) * cell}
              y={qrY + (r + 1) * cell}
              width={cell * 5}
              height={cell * 5}
              fill="#ffffff"
            />
            <rect
              x={qrX + (c + 2) * cell}
              y={qrY + (r + 2) * cell}
              width={cell * 3}
              height={cell * 3}
              fill="#05060a"
            />
          </g>
        ))}

        <text x="124" y="352" textAnchor="middle" fill={C.gray} fontSize="9.5">
          Scan at any partner gate
        </text>

        {/* Offline badge */}
        <rect x="58" y="382" width="132" height="26" rx="13" fill={C.surface} stroke={C.cyan} opacity="0.9" />
        <circle cx="78" cy="395" r="6" fill="none" stroke={C.cyan} strokeWidth="1.6" />
        <path d="M75 395l2.5 2.5 4-5" fill="none" stroke={C.cyan} strokeWidth="1.6" strokeLinecap="round" />
        <text x="92" y="399" fill={C.cyan} fontSize="10" fontWeight="600">
          Works offline
        </text>
      </Phone>
    </>
  );
}

/* ── FLÅM · Electron operations dashboard ───────────────────────────── */

function FlamDesktop({ uid }: { uid: string }) {
  const bars = [42, 68, 55, 88, 74, 96, 61, 80, 52];
  const kpis = [
    { label: "Passes sold", value: "1 284", delta: "+12%" },
    { label: "Gross revenue", value: "742k NOK", delta: "+8%" },
    { label: "Partners paid", value: "17", delta: "on time" },
  ];
  const rows = ["Fjord Cruise AS", "Flåm Railway", "Kayak Flåm", "Stegastein Tour", "Bakkastova"];

  return (
    <>
      <Backdrop uid={uid} />
      <Window x={40} y={38} w={720} h={424}>
        {/* Sidebar */}
        <rect x="0" y="0" width="164" height="390" fill={C.bg} />
        <line x1="164" y1="0" x2="164" y2="390" stroke={C.line} />
        <rect x="20" y="20" width="26" height="26" rx="8" fill={`url(#${uid}-accent)`} />
        <text x="56" y="38" fill={C.white} fontSize="12" fontWeight="700">
          FTC Ops
        </text>
        {["Overview", "Bookings", "Partners", "Payouts", "Settings"].map((n, i) => (
          <g key={n}>
            {i === 0 && (
              <rect x="12" y={68 + i * 34} width="140" height="28" rx="8" fill={C.violet} opacity="0.16" />
            )}
            <rect
              x="24"
              y={77 + i * 34}
              width="12"
              height="12"
              rx="3"
              fill={i === 0 ? C.violet : C.dim}
            />
            <text
              x="48"
              y={87 + i * 34}
              fill={i === 0 ? C.white : C.gray}
              fontSize="11"
              fontWeight={i === 0 ? 600 : 400}
            >
              {n}
            </text>
          </g>
        ))}
        <rect x="12" y="330" width="140" height="44" rx="10" fill={C.surface} stroke={C.line} />
        <circle cx="34" cy="352" r="10" fill={C.raised} />
        <Bar x={52} y={345} w={62} h={6} />
        <Bar x={52} y={357} w={40} h={5} fill={C.dim} o={0.5} />

        {/* Header */}
        <text x="188" y="36" fill={C.white} fontSize="15" fontWeight="700">
          Overview
        </text>
        <rect x="596" y="20" width="104" height="26" rx="13" fill={C.violet} />
        <text x="648" y="37" textAnchor="middle" fill={C.white} fontSize="10.5" fontWeight="600">
          Export report
        </text>

        {/* KPIs */}
        {kpis.map((k, i) => (
          <g key={k.label} transform={`translate(${188 + i * 176} 56)`}>
            <rect width="160" height="76" rx="12" fill={C.surface} stroke={C.line} />
            <text x="16" y="26" fill={C.gray} fontSize="10">
              {k.label}
            </text>
            <text x="16" y="52" fill={C.white} fontSize="19" fontWeight="700">
              {k.value}
            </text>
            <text x="16" y="66" fill={C.cyan} fontSize="9.5">
              {k.delta}
            </text>
          </g>
        ))}

        {/* Chart */}
        <g transform="translate(188 148)">
          <rect width="336" height="226" rx="12" fill={C.surface} stroke={C.line} />
          <text x="16" y="28" fill={C.white} fontSize="12" fontWeight="600">
            Bookings per day
          </text>
          <text x="320" y="28" textAnchor="end" fill={C.dim} fontSize="9.5">
            Last 9 days
          </text>
          {[0, 1, 2, 3].map((i) => (
            <line
              key={i}
              x1="16"
              y1={62 + i * 34}
              x2="320"
              y2={62 + i * 34}
              stroke={C.line}
              opacity="0.6"
            />
          ))}
          {bars.map((v, i) => (
            <rect
              key={i}
              x={26 + i * 34}
              y={196 - v * 1.28}
              width="18"
              height={v * 1.28}
              rx="5"
              fill={i === 5 ? C.cyan : C.violet}
              opacity={i === 5 ? 1 : 0.8}
            />
          ))}
          <line x1="16" y1="196" x2="320" y2="196" stroke={C.line} />
          {bars.map((_, i) => (
            <Bar key={i} x={30 + i * 34} y={206} w={10} h={4} fill={C.dim} o={0.6} />
          ))}
        </g>

        {/* Recent bookings */}
        <g transform="translate(540 148)">
          <rect width="160" height="226" rx="12" fill={C.surface} stroke={C.line} />
          <text x="16" y="28" fill={C.white} fontSize="12" fontWeight="600">
            Partners
          </text>
          {rows.map((r, i) => (
            <g key={r} transform={`translate(16 ${48 + i * 34})`}>
              <circle cx="8" cy="10" r="8" fill={C.raised} />
              <circle cx="8" cy="10" r="3" fill={i < 3 ? C.cyan : C.dim} />
              <text x="24" y="9" fill={C.gray} fontSize="9.5">
                {r.length > 15 ? `${r.slice(0, 14)}…` : r}
              </text>
              <Bar x={24} y={14} w={64} h={4} fill={C.line} />
              <Bar x={24} y={14} w={64 - i * 10} h={4} fill={C.violet} o={0.85} />
            </g>
          ))}
        </g>
      </Window>
    </>
  );
}

/* ── FLÅM · marketing / booking web app ─────────────────────────────── */

function FlamWeb({ uid }: { uid: string }) {
  return (
    <>
      <Backdrop uid={uid} />
      <Window x={40} y={38} w={720} h={424} url="flamtouristcard.no">
        {/* Site nav */}
        <rect x="0" y="0" width="720" height="46" fill={C.bg} />
        <line x1="0" y1="46" x2="720" y2="46" stroke={C.line} />
        <rect x="28" y="14" width="20" height="20" rx="6" fill={`url(#${uid}-accent)`} />
        <text x="56" y="29" fill={C.white} fontSize="11.5" fontWeight="700">
          FLÅM
        </text>
        {["Experiences", "The card", "Partners", "FAQ"].map((n, i) => (
          <text key={n} x={210 + i * 84} y="29" fill={C.gray} fontSize="10.5">
            {n}
          </text>
        ))}
        <rect x="590" y="12" width="100" height="24" rx="12" fill={C.violet} />
        <text x="640" y="28" textAnchor="middle" fill={C.white} fontSize="10" fontWeight="600">
          Buy the card
        </text>

        {/* Hero */}
        <text x="48" y="112" fill={C.white} fontSize="26" fontWeight="700">
          One card.
        </text>
        <text x="48" y="144" fill={C.white} fontSize="26" fontWeight="700">
          All of{" "}
          <tspan fill={C.cyan}>Flåm.</tspan>
        </text>
        <text x="48" y="174" fill={C.gray} fontSize="11">
          Plan your stay, bundle local experiences and
        </text>
        <text x="48" y="192" fill={C.gray} fontSize="11">
          carry the pass in your phone&apos;s Wallet.
        </text>
        <rect x="48" y="212" width="126" height="34" rx="17" fill={`url(#${uid}-accent)`} />
        <text x="111" y="234" textAnchor="middle" fill={C.white} fontSize="11" fontWeight="600">
          Plan my stay
        </text>
        <rect x="186" y="212" width="106" height="34" rx="17" fill="none" stroke={C.line} strokeWidth="1.5" />
        <text x="239" y="234" textAnchor="middle" fill={C.gray} fontSize="11">
          See partners
        </text>

        <rect x="392" y="80" width="284" height="170" rx="16" fill={C.surface} stroke={C.line} />
        <path
          d="M392 200l64-46 52 32 46-34 122 62v22a16 16 0 0 1-16 16H408a16 16 0 0 1-16-16z"
          fill={`url(#${uid}-accent)`}
          opacity="0.5"
        />
        <circle cx="620" cy="118" r="16" fill={C.cyan} opacity="0.5" />

        {/* Cards */}
        {["3-day pass", "Family pass", "Season pass"].map((t, i) => (
          <g key={t} transform={`translate(${48 + i * 210} 282)`}>
            <rect width="190" height="86" rx="12" fill={C.surface} stroke={C.line} />
            <text x="18" y="30" fill={C.white} fontSize="12" fontWeight="600">
              {t}
            </text>
            <Bar x={18} y={42} w={140} h={5} />
            <Bar x={18} y={54} w={104} h={5} o={0.6} />
            <text x="18" y="76" fill={C.cyan} fontSize="11" fontWeight="600">
              {["990", "2 490", "3 900"][i]} NOK
            </text>
          </g>
        ))}
      </Window>
    </>
  );
}

/* ── COOPER · dashboard ─────────────────────────────────────────────── */

function CooperDashboard({ uid }: { uid: string }) {
  const categories = [
    { name: "Housing", budget: 100, real: 92 },
    { name: "Food", budget: 100, real: 78 },
    { name: "Transport", budget: 100, real: 46 },
    { name: "Leisure", budget: 100, real: 118 },
  ];
  const flow = [58, 72, 64, 86, 70, 92, 78, 96];

  return (
    <>
      <Backdrop uid={uid} />

      <Phone x={54} y={18} uid={uid}>
        {/* Month selector */}
        <path d="M28 22l-6 6 6 6" fill="none" stroke={C.gray} strokeWidth="1.6" strokeLinecap="round" />
        <text x="124" y="33" textAnchor="middle" fill={C.white} fontSize="13" fontWeight="600">
          January 2026
        </text>
        <path d="M220 22l6 6-6 6" fill="none" stroke={C.gray} strokeWidth="1.6" strokeLinecap="round" />

        {/* Balance */}
        <rect x="16" y="52" width="216" height="92" rx="16" fill={C.surface} stroke={C.line} />
        <text x="32" y="76" fill={C.gray} fontSize="9.5">
          Balance this month
        </text>
        <text x="32" y="106" fill={C.white} fontSize="26" fontWeight="700">
          1.284,50 €
        </text>
        <circle cx="38" cy="124" r="6" fill={C.cyan} opacity="0.18" />
        <path d="M35 125l3-3 3 3" fill="none" stroke={C.cyan} strokeWidth="1.6" strokeLinecap="round" />
        <text x="50" y="128" fill={C.cyan} fontSize="9.5">
          8,4% over plan
        </text>
        <rect x="150" y="64" width="66" height="22" rx="11" fill={C.violet} opacity="0.16" />
        <text x="183" y="79" textAnchor="middle" fill={C.violet} fontSize="9.5" fontWeight="600">
          Monthly
        </text>

        {/* Budget vs real */}
        <text x="16" y="172" fill={C.white} fontSize="11.5" fontWeight="600">
          Budget vs real
        </text>
        <text x="232" y="172" textAnchor="end" fill={C.dim} fontSize="9">
          4 categories
        </text>
        {categories.map((c, i) => {
          const y = 188 + i * 40;
          const over = c.real > c.budget;
          return (
            <g key={c.name}>
              <text x="16" y={y + 10} fill={C.gray} fontSize="10">
                {c.name}
              </text>
              <text
                x="232"
                y={y + 10}
                textAnchor="end"
                fill={over ? "#fb7185" : C.white}
                fontSize="10"
              >
                {["1.180", "620", "240", "410"][i]} €
              </text>
              <rect x="16" y={y + 18} width="216" height="8" rx="4" fill={C.raised} />
              <rect
                x="16"
                y={y + 18}
                width={Math.min(216, (216 * c.real) / 130)}
                height="8"
                rx="4"
                fill={over ? "#fb7185" : C.violet}
                opacity={over ? 0.9 : 1 - i * 0.12}
              />
              <line
                x1={16 + (216 * c.budget) / 130}
                y1={y + 14}
                x2={16 + (216 * c.budget) / 130}
                y2={y + 30}
                stroke={C.cyan}
                strokeWidth="1.5"
              />
            </g>
          );
        })}

        {/* Tab bar */}
        <rect x="0" y="378" width="248" height="42" fill={C.surface} opacity="0.97" />
        <line x1="0" y1="378" x2="248" y2="378" stroke={C.line} />
        {["Home", "Log", "Plan", "More"].map((t, i) => (
          <g key={t}>
            <rect
              x={30 + i * 56}
              y="390"
              width="12"
              height="12"
              rx="3"
              fill={i === 0 ? C.violet : C.dim}
            />
            <text
              x={36 + i * 56}
              y="414"
              textAnchor="middle"
              fill={i === 0 ? C.violet : C.dim}
              fontSize="8"
            >
              {t}
            </text>
          </g>
        ))}
      </Phone>

      {/* Side card: savings hierarchy */}
      <g transform="translate(360 52)">
        <rect width="404" height="164" rx="16" fill={C.surface} stroke={C.line} strokeWidth="1.5" />
        <text x="22" y="34" fill={C.white} fontSize="14" fontWeight="700">
          Savings hierarchy
        </text>
        <text x="382" y="34" textAnchor="end" fill={C.cyan} fontSize="10">
          Level 3 of 5
        </text>
        {[
          { n: "Emergency buffer", p: 100 },
          { n: "High-interest debt", p: 100 },
          { n: "3-month fund", p: 62 },
        ].map((l, i) => (
          <g key={l.n} transform={`translate(22 ${58 + i * 34})`}>
            <circle cx="10" cy="8" r="9" fill={l.p === 100 ? C.cyan : C.violet} opacity="0.16" />
            {l.p === 100 ? (
              <path
                d="M6 8l3 3 5-6"
                fill="none"
                stroke={C.cyan}
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            ) : (
              <text x="10" y="12" textAnchor="middle" fill={C.violet} fontSize="9.5" fontWeight="700">
                3
              </text>
            )}
            <text x="30" y="12" fill={C.gray} fontSize="11">
              {l.n}
            </text>
            <rect x="236" y="4" width="96" height="8" rx="4" fill={C.raised} />
            <rect
              x="236"
              y="4"
              width={(96 * l.p) / 100}
              height="8"
              rx="4"
              fill={l.p === 100 ? C.cyan : C.violet}
            />
            <text x="360" y="12" textAnchor="end" fill={C.white} fontSize="10">
              {l.p}%
            </text>
          </g>
        ))}
      </g>

      {/* Side card: cash flow */}
      <g transform="translate(360 240)">
        <rect width="404" height="208" rx="16" fill={C.surface} stroke={C.line} strokeWidth="1.5" />
        <text x="22" y="32" fill={C.white} fontSize="13" fontWeight="700">
          Cash flow
        </text>
        <text x="382" y="32" textAnchor="end" fill={C.dim} fontSize="9.5">
          Last 8 months
        </text>
        {[0, 1, 2].map((i) => (
          <line key={i} x1="22" y1={64 + i * 36} x2="382" y2={64 + i * 36} stroke={C.line} opacity="0.6" />
        ))}
        {flow.map((v, i) => (
          <g key={i}>
            <rect
              x={34 + i * 44}
              y={172 - v}
              width="14"
              height={v}
              rx="4"
              fill={C.violet}
              opacity={0.55 + i * 0.05}
            />
            <rect
              x={52 + i * 44}
              y={172 - v * 0.62}
              width="14"
              height={v * 0.62}
              rx="4"
              fill={C.cyan}
              opacity="0.75"
            />
          </g>
        ))}
        <line x1="22" y1="172" x2="382" y2="172" stroke={C.line} />
        <circle cx="26" cy="190" r="4" fill={C.violet} />
        <text x="38" y="194" fill={C.gray} fontSize="9.5">
          Income
        </text>
        <circle cx="98" cy="190" r="4" fill={C.cyan} />
        <text x="110" y="194" fill={C.gray} fontSize="9.5">
          Expenses
        </text>
      </g>
    </>
  );
}

/* ── COOPER · movements ledger ──────────────────────────────────────── */

function CooperRegistro({ uid }: { uid: string }) {
  const tx = [
    { n: "Salary", c: "Income · Jan 31", a: "+2.400,00", up: true },
    { n: "Rent", c: "Housing · Jan 30", a: "−980,00", up: false },
    { n: "Supermarket", c: "Food · Jan 28", a: "−96,40", up: false },
    { n: "Metro pass", c: "Transport · Jan 27", a: "−40,00", up: false },
    { n: "Freelance", c: "Income · Jan 25", a: "+610,00", up: true },
    { n: "Cinema", c: "Leisure · Jan 24", a: "−24,50", up: false },
  ];

  return (
    <>
      <Backdrop uid={uid} />

      <Note x={26} y={196} label="Storage" value="SQLite, on device" />
      <Note x={598} y={196} w={176} label="Money" value="Integer cents" align="right" />
      <path d="M202 225h56" stroke={C.line} strokeWidth="1.5" strokeDasharray="4 4" />
      <path d="M542 225h56" stroke={C.line} strokeWidth="1.5" strokeDasharray="4 4" />

      <Phone x={268} y={15} uid={uid}>
        <text x="16" y="30" fill={C.white} fontSize="15" fontWeight="700">
          Registro
        </text>
        <rect x="176" y="16" width="56" height="24" rx="12" fill={C.surface} stroke={C.line} />
        <text x="204" y="32" textAnchor="middle" fill={C.gray} fontSize="9.5">
          January
        </text>

        {/* Summary */}
        <rect x="16" y="52" width="104" height="60" rx="14" fill={C.surface} stroke={C.line} />
        <text x="30" y="72" fill={C.gray} fontSize="9">
          Income
        </text>
        <text x="30" y="94" fill={C.cyan} fontSize="14" fontWeight="700">
          3.010 €
        </text>
        <rect x="128" y="52" width="104" height="60" rx="14" fill={C.surface} stroke={C.line} />
        <text x="142" y="72" fill={C.gray} fontSize="9">
          Expenses
        </text>
        <text x="142" y="94" fill={C.violet} fontSize="14" fontWeight="700">
          1.725 €
        </text>

        <text x="16" y="138" fill={C.white} fontSize="11.5" fontWeight="600">
          Movements
        </text>
        <text x="232" y="138" textAnchor="end" fill={C.dim} fontSize="9">
          32 this month
        </text>

        {tx.map((t, i) => {
          const y = 150 + i * 44;
          return (
            <g key={t.n}>
              <rect x="16" y={y} width="216" height="38" rx="12" fill={C.surface} stroke={C.line} />
              <circle cx="38" cy={y + 19} r="11" fill={t.up ? C.cyan : C.violet} opacity="0.16" />
              <path
                d={t.up ? `M34 ${y + 22}l4-5 4 5` : `M34 ${y + 17}l4 5 4-5`}
                fill="none"
                stroke={t.up ? C.cyan : C.violet}
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <text x="58" y={y + 17} fill={C.white} fontSize="11">
                {t.n}
              </text>
              <text x="58" y={y + 30} fill={C.dim} fontSize="8.5">
                {t.c}
              </text>
              <text
                x="218"
                y={y + 24}
                textAnchor="end"
                fill={t.up ? C.cyan : C.white}
                fontSize="11"
                fontWeight="600"
              >
                {t.a}
              </text>
            </g>
          );
        })}

        {/* Floating action button */}
        <circle cx="204" cy="396" r="22" fill={`url(#${uid}-accent)`} />
        <path
          d="M204 386v20M194 396h20"
          stroke={C.white}
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </Phone>
    </>
  );
}

/* ── COOPER · savings hierarchy ─────────────────────────────────────── */

function CooperHierarchy({ uid }: { uid: string }) {
  const levels = [
    { n: "Emergency buffer", s: "1.000 € · complete", p: 100 },
    { n: "High-interest debt", s: "0 € left · cleared", p: 100 },
    { n: "3-month fund", s: "3.720 € of 6.000 €", p: 62 },
    { n: "Goals & projects", s: "Locked until level 3", p: 0 },
    { n: "Long-term investing", s: "Locked until level 4", p: 0 },
  ];

  return (
    <>
      <Backdrop uid={uid} />

      <Note x={26} y={196} label="Engine" value="Pure TypeScript" />
      <Note x={598} y={196} w={176} label="Tested with" value="Vitest, no React" align="right" />
      <path d="M202 225h56" stroke={C.line} strokeWidth="1.5" strokeDasharray="4 4" />
      <path d="M542 225h56" stroke={C.line} strokeWidth="1.5" strokeDasharray="4 4" />

      <Phone x={268} y={15} uid={uid}>
        <text x="16" y="30" fill={C.white} fontSize="15" fontWeight="700">
          Hierarchy
        </text>
        <text x="16" y="48" fill={C.gray} fontSize="9.5">
          Where your next euro should go
        </text>

        {/* Progress ring summary */}
        <rect x="16" y="62" width="216" height="66" rx="14" fill={C.surface} stroke={C.line} />
        <circle cx="52" cy="95" r="20" fill="none" stroke={C.raised} strokeWidth="6" />
        <circle
          cx="52"
          cy="95"
          r="20"
          fill="none"
          stroke={C.violet}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray="125.6"
          strokeDashoffset="47.7"
          transform="rotate(-90 52 95)"
        />
        <text x="52" y="99" textAnchor="middle" fill={C.white} fontSize="11" fontWeight="700">
          62%
        </text>
        <text x="88" y="88" fill={C.white} fontSize="11.5" fontWeight="600">
          Level 3 of 5
        </text>
        <text x="88" y="104" fill={C.gray} fontSize="9.5">
          2.280 € to the next step
        </text>

        {levels.map((l, i) => {
          const y = 144 + i * 52;
          const current = l.p > 0 && l.p < 100;
          const locked = l.p === 0;
          return (
            <g key={l.n}>
              <rect
                x="16"
                y={y}
                width="216"
                height="44"
                rx="13"
                fill={current ? C.raised : C.surface}
                stroke={current ? C.violet : C.line}
                strokeWidth={current ? 1.5 : 1}
                opacity={locked ? 0.55 : 1}
              />
              <circle
                cx="38"
                cy={y + 22}
                r="11"
                fill={l.p === 100 ? C.cyan : current ? C.violet : C.dim}
                opacity={l.p === 100 ? 0.18 : current ? 0.2 : 0.14}
              />
              {l.p === 100 ? (
                <path
                  d={`M34 ${y + 22}l3 3 5-6`}
                  fill="none"
                  stroke={C.cyan}
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              ) : (
                <text
                  x="38"
                  y={y + 26}
                  textAnchor="middle"
                  fill={current ? C.violet : C.dim}
                  fontSize="10"
                  fontWeight="700"
                >
                  {i + 1}
                </text>
              )}
              <text x="58" y={y + 19} fill={locked ? C.gray : C.white} fontSize="11" fontWeight="600">
                {l.n}
              </text>
              <text x="58" y={y + 33} fill={C.dim} fontSize="8.5">
                {l.s}
              </text>
              {current && (
                <>
                  <rect x="150" y={y + 26} width="68" height="7" rx="3.5" fill={C.surface} />
                  <rect x="150" y={y + 26} width="42" height="7" rx="3.5" fill={C.violet} />
                </>
              )}
              {locked && (
                <>
                  <rect x="204" y={y + 17} width="12" height="9" rx="2" fill={C.dim} />
                  <path
                    d={`M206 ${y + 17}v-3a4 4 0 0 1 8 0v3`}
                    fill="none"
                    stroke={C.dim}
                    strokeWidth="1.4"
                  />
                </>
              )}
            </g>
          );
        })}
      </Phone>
    </>
  );
}

/* ── COOPER · iOS home-screen widget ────────────────────────────────── */

function CooperWidget({ uid }: { uid: string }) {
  const mini = [26, 38, 30, 44, 34, 48];

  return (
    <>
      <Backdrop uid={uid} />

      <Note x={26} y={196} label="Built with" value="Swift · WidgetKit" />
      <Note x={598} y={196} w={176} label="Data" value="Shared app group" align="right" />
      <path d="M202 225h56" stroke={C.line} strokeWidth="1.5" strokeDasharray="4 4" />
      <path d="M542 225h56" stroke={C.line} strokeWidth="1.5" strokeDasharray="4 4" />

      <Phone x={268} y={15} uid={uid}>
        {/* Wallpaper — soft gradients, not hard-edged discs */}
        <defs>
          <radialGradient id={`${uid}-wall-a`} cx="22%" cy="14%" r="70%">
            <stop offset="0%" stopColor={C.violet} stopOpacity="0.5" />
            <stop offset="100%" stopColor={C.violet} stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`${uid}-wall-b`} cx="86%" cy="84%" r="70%">
            <stop offset="0%" stopColor={C.cyan} stopOpacity="0.3" />
            <stop offset="100%" stopColor={C.cyan} stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect x="0" y="0" width="248" height="420" fill={C.void} />
        <rect x="0" y="0" width="248" height="420" fill={`url(#${uid}-wall-a)`} />
        <rect x="0" y="0" width="248" height="420" fill={`url(#${uid}-wall-b)`} />

        {/* Status bar */}
        <text x="24" y="20" fill={C.white} fontSize="10" fontWeight="600">
          9:41
        </text>
        <rect x="196" y="12" width="18" height="9" rx="2.5" fill={C.white} opacity="0.8" />
        <rect x="218" y="11" width="12" height="11" rx="2" fill={C.white} opacity="0.55" />

        {/* Medium widget */}
        <rect x="16" y="38" width="216" height="104" rx="20" fill={C.surface} opacity="0.96" />
        <rect
          x="16"
          y="38"
          width="216"
          height="104"
          rx="20"
          fill="none"
          stroke={C.line}
        />
        <rect x="32" y="54" width="16" height="16" rx="5" fill={`url(#${uid}-accent)`} />
        <text x="56" y="66" fill={C.white} fontSize="10.5" fontWeight="700">
          COOPER
        </text>
        <text x="216" y="66" textAnchor="end" fill={C.dim} fontSize="9">
          January
        </text>
        <text x="32" y="96" fill={C.white} fontSize="20" fontWeight="700">
          1.284,50 €
        </text>
        <text x="32" y="112" fill={C.cyan} fontSize="9">
          62% of the monthly budget
        </text>
        {mini.map((v, i) => (
          <rect
            key={i}
            x={150 + i * 12}
            y={126 - v}
            width="7"
            height={v}
            rx="3"
            fill={i === 5 ? C.cyan : C.violet}
            opacity={i === 5 ? 1 : 0.55 + i * 0.07}
          />
        ))}

        {/* Small widgets */}
        <rect x="16" y="156" width="100" height="100" rx="20" fill={C.surface} opacity="0.96" />
        <rect x="16" y="156" width="100" height="100" rx="20" fill="none" stroke={C.line} />
        <text x="32" y="180" fill={C.gray} fontSize="9">
          Next step
        </text>
        <circle cx="66" cy="212" r="20" fill="none" stroke={C.raised} strokeWidth="6" />
        <circle
          cx="66"
          cy="212"
          r="20"
          fill="none"
          stroke={C.violet}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray="125.6"
          strokeDashoffset="47.7"
          transform="rotate(-90 66 212)"
        />
        <text x="66" y="216" textAnchor="middle" fill={C.white} fontSize="11" fontWeight="700">
          62%
        </text>
        <text x="66" y="246" textAnchor="middle" fill={C.dim} fontSize="8.5">
          3-month fund
        </text>

        <rect x="132" y="156" width="100" height="100" rx="20" fill={C.surface} opacity="0.5" />
        <rect x="132" y="156" width="100" height="100" rx="20" fill="none" stroke={C.line} />
        <Bar x={148} y={176} w={52} h={6} />
        <Bar x={148} y={192} w={36} h={5} o={0.5} />
        <rect x="148" y="212" width="68" height="28" rx="8" fill={C.raised} />

        {/* App icons */}
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <rect
              x={20 + i * 56}
              y="278"
              width="44"
              height="44"
              rx="12"
              fill={i === 0 ? C.violet : C.raised}
              opacity={i === 0 ? 0.95 : 0.9 - i * 0.12}
            />
            {i === 0 ? (
              <path
                d="M34 300l6-8 6 8 6-12"
                fill="none"
                stroke={C.white}
                strokeWidth="2"
                strokeLinecap="round"
              />
            ) : (
              <rect
                x={32 + i * 56}
                y="290"
                width="20"
                height="20"
                rx="6"
                fill={C.white}
                opacity="0.14"
              />
            )}
            <Bar x={28 + i * 56} y={328} w={28} h={4} fill={C.white} o={0.45} />
          </g>
        ))}

        {/* Dock */}
        <rect x="16" y="352" width="216" height="58" rx="24" fill={C.surface} opacity="0.6" />
        {[0, 1, 2, 3].map((i) => (
          <rect
            key={i}
            x={30 + i * 52}
            y="366"
            width="34"
            height="34"
            rx="10"
            fill={C.raised}
            opacity="0.9"
          />
        ))}
      </Phone>
    </>
  );
}

/* ── Registry ───────────────────────────────────────────────────────── */

const MOCKUPS: Record<
  MockupKind,
  { render: (props: { uid: string }) => ReactNode; detail: string }
> = {
  /* `detail` is a 16/10 crop of the same drawing, zoomed on the part that
     carries the meaning — used on narrow screens, where the full composition
     would render far too small to read. */
  "flam-mobile": { render: FlamMobile, detail: "46 10 300 188" },
  "flam-wallet": { render: FlamWallet, detail: "260 5 300 188" },
  "flam-desktop": { render: FlamDesktop, detail: "220 60 480 300" },
  "flam-web": { render: FlamWeb, detail: "60 60 480 300" },
  "cooper-dashboard": { render: CooperDashboard, detail: "46 46 300 188" },
  "cooper-registro": { render: CooperRegistro, detail: "260 30 300 188" },
  "cooper-hierarchy": { render: CooperHierarchy, detail: "260 20 300 188" },
  "cooper-widget": { render: CooperWidget, detail: "260 20 300 188" },
};

export function ProjectMockup({
  kind,
  label,
  className = "",
  idPrefix = "",
}: {
  kind: MockupKind;
  label: string;
  className?: string;
  /** Keeps gradient/clip ids unique when the same mockup appears twice on a page. */
  idPrefix?: string;
}) {
  const { render: Render, detail } = MOCKUPS[kind];

  /* Both variants keep the 16/10 ratio, so swapping them never shifts layout.
     Whichever one is display:none is also dropped from the a11y tree. */
  return (
    <>
      <svg
        viewBox={detail}
        role="img"
        aria-label={label}
        className={`block h-full w-full font-sans sm:hidden ${className}`}
      >
        <title>{label}</title>
        <Render uid={`${idPrefix}${kind}-detail`} />
      </svg>
      <svg
        viewBox="0 0 800 500"
        role="img"
        aria-label={label}
        className={`hidden h-full w-full font-sans sm:block ${className}`}
      >
        <title>{label}</title>
        <Render uid={`${idPrefix}${kind}`} />
      </svg>
    </>
  );
}
