const W = 480
const H = 160
const PAD = 12

export default function TrendChart({ data }: { data: number[] }) {
  const min = Math.min(...data) - 4
  const max = Math.max(...data) + 4
  const x = (i: number) => PAD + (i / (data.length - 1)) * (W - PAD * 2)
  const y = (v: number) => H - PAD - ((v - min) / (max - min)) * (H - PAD * 2)
  const line = data
    .map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(v).toFixed(1)}`)
    .join(" ")
  const area = `${line} L${x(data.length - 1)},${H - PAD} L${x(0)},${H - PAD} Z`
  const last = data.length - 1

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-auto w-full"
      role="img"
      aria-label={`Healf Score over ${data.length} weeks, rising from ${data[0]} to ${data[last]}`}
    >
      {[0.25, 0.5, 0.75].map((t) => (
        <line
          key={t}
          x1={PAD}
          x2={W - PAD}
          y1={H * t}
          y2={H * t}
          stroke="currentColor"
          strokeOpacity="0.08"
        />
      ))}
      <path d={area} fill="currentColor" fillOpacity="0.07" />
      <path
        d={line}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx={x(last)}
        cy={y(data[last])}
        r="5"
        fill="currentColor"
        stroke="white"
        strokeWidth="2"
      />
    </svg>
  )
}
