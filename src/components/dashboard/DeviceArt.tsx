import { useId } from "react"

export type ArtKind = "square" | "round" | "ring" | "band" | "tracker"

type Props = {
  kind: ArtKind
  strap: string
  accent?: string
  knurled?: boolean
  className?: string
}

const CASE = "#1b1b1f"
const SCREEN = "#050505"

function ticks(
  count: number,
  inner: number,
  outer: number,
  width: number,
  color: string,
) {
  return Array.from({ length: count }, (_, i) => {
    const a = (i / count) * Math.PI * 2
    return (
      <line
        key={i}
        x1={100 + Math.sin(a) * inner}
        y1={80 - Math.cos(a) * inner}
        x2={100 + Math.sin(a) * outer}
        y2={80 - Math.cos(a) * outer}
        stroke={color}
        strokeWidth={width}
        strokeLinecap="round"
      />
    )
  })
}

function Rings() {
  const rings = [
    { r: 22, color: "#6f9d6a", pct: 0.78 },
    { r: 15, color: "#d9825b", pct: 0.62 },
    { r: 8, color: "#4a6a9c", pct: 0.85 },
  ]
  return (
    <g
      transform="rotate(-90 100 80)"
      fill="none"
      strokeWidth="4.5"
      strokeLinecap="round"
    >
      {rings.map(({ r, color, pct }) => (
        <g key={r}>
          <circle
            cx="100"
            cy="80"
            r={r}
            stroke="#ffffff"
            strokeOpacity="0.12"
          />
          <circle
            cx="100"
            cy="80"
            r={r}
            stroke={color}
            strokeDasharray={`${2 * Math.PI * r * pct} ${2 * Math.PI * r}`}
          />
        </g>
      ))}
    </g>
  )
}

export default function DeviceArt({
  kind,
  strap,
  accent = "#ffffff",
  knurled = false,
  className = "",
}: Props) {
  const uid = useId()
  const metal = `metal-${uid}`

  return (
    <svg
      viewBox="0 0 200 160"
      className={className}
      role="img"
      aria-hidden="true"
      fill="none"
    >
      <defs>
        <linearGradient id={metal} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#d9d9dc" />
          <stop offset="0.5" stopColor="#8c8c92" />
          <stop offset="1" stopColor="#c4c4c8" />
        </linearGradient>
      </defs>

      {kind === "square" && (
        <>
          <rect x="84" y="2" width="32" height="52" rx="10" fill={strap} />
          <rect x="84" y="106" width="32" height="52" rx="10" fill={strap} />
          <rect x="140" y="62" width="5" height="16" rx="2.5" fill={CASE} />
          <rect x="62" y="36" width="78" height="88" rx="24" fill={CASE} />
          <rect x="66" y="40" width="70" height="80" rx="21" fill={SCREEN} />
          <Rings />
        </>
      )}

      {kind === "round" && (
        <>
          <rect x="82" y="2" width="36" height="50" rx="12" fill={strap} />
          <rect x="82" y="108" width="36" height="50" rx="12" fill={strap} />
          <rect x="143" y="60" width="6" height="12" rx="3" fill={CASE} />
          <rect x="143" y="88" width="6" height="12" rx="3" fill={CASE} />
          <circle cx="100" cy="80" r="45" fill={CASE} />
          <circle cx="100" cy="80" r="41" fill="#2c2c31" />
          {knurled && ticks(48, 38, 41, 1.2, "#6b6b73")}
          <circle cx="100" cy="80" r="35" fill={SCREEN} />
          <circle
            cx="100"
            cy="80"
            r="31"
            stroke={accent}
            strokeOpacity="0.9"
            strokeWidth="3"
            strokeDasharray="150 200"
            transform="rotate(-90 100 80)"
          />
          {ticks(12, 25, 28, 1.5, "#ffffff")}
          <line
            x1="100"
            y1="80"
            x2="100"
            y2="62"
            stroke="#fff"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <line
            x1="100"
            y1="80"
            x2="114"
            y2="88"
            stroke="#fff"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle cx="100" cy="80" r="3" fill={accent} />
        </>
      )}

      {kind === "ring" && (
        <>
          <circle
            cx="100"
            cy="80"
            r="46"
            stroke={`url(#${metal})`}
            strokeWidth="22"
          />
          <circle
            cx="100"
            cy="80"
            r="35"
            stroke="#000"
            strokeOpacity="0.35"
            strokeWidth="2"
          />
          <path
            d="M62 52 A46 46 0 0 1 98 34"
            stroke="#fff"
            strokeOpacity="0.5"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <circle cx="90" cy="112" r="2.6" fill="#6f9d6a" />
          <circle cx="100" cy="114" r="2.6" fill="#6f9d6a" />
          <circle cx="110" cy="112" r="2.6" fill="#6f9d6a" />
        </>
      )}

      {kind === "band" && (
        <>
          <rect x="18" y="60" width="164" height="40" rx="20" fill={strap} />
          {[40, 52, 148, 160].map((x) => (
            <line
              key={x}
              x1={x}
              y1="68"
              x2={x}
              y2="92"
              stroke="#fff"
              strokeOpacity="0.12"
              strokeWidth="2"
              strokeLinecap="round"
            />
          ))}
          <rect x="76" y="52" width="48" height="56" rx="14" fill="#111114" />
          <circle cx="90" cy="80" r="3.5" fill={accent} />
          <circle cx="100" cy="80" r="3.5" fill={accent} fillOpacity="0.6" />
          <circle cx="110" cy="80" r="3.5" fill={accent} fillOpacity="0.3" />
        </>
      )}

      {kind === "tracker" && (
        <>
          <rect x="76" y="2" width="48" height="156" rx="22" fill={strap} />
          <rect x="82" y="46" width="36" height="68" rx="14" fill={CASE} />
          <rect x="85" y="49" width="30" height="62" rx="12" fill={SCREEN} />
          <circle cx="100" cy="68" r="6" stroke={accent} strokeWidth="2.5" />
          <rect
            x="91"
            y="82"
            width="18"
            height="3"
            rx="1.5"
            fill="#fff"
            fillOpacity="0.8"
          />
          <rect
            x="91"
            y="90"
            width="12"
            height="3"
            rx="1.5"
            fill="#fff"
            fillOpacity="0.45"
          />
          <rect
            x="91"
            y="98"
            width="15"
            height="3"
            rx="1.5"
            fill="#fff"
            fillOpacity="0.45"
          />
        </>
      )}
    </svg>
  )
}
