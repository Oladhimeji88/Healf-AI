import { useEffect, useState } from "react"
import useCountUp from "../hooks/useCountUp"
import { PILLAR_COLORS, PILLAR_ORDER, pillars, type Scores } from "../data/platform"

const RADII = [142, 120, 98, 76]
const STROKE = 14

export default function ScoreRing({ scores, caption }: { scores: Scores; caption: string }) {
  const [armed, setArmed] = useState(false)
  useEffect(() => {
    const id = requestAnimationFrame(() => setArmed(true))
    return () => cancelAnimationFrame(id)
  }, [])

  const total = Math.round(PILLAR_ORDER.reduce((sum, id) => sum + scores[id], 0) / 4)
  const shown = useCountUp(total)
  const label = PILLAR_ORDER.map((id) => `${id} ${scores[id]}`).join(", ")

  return (
    <div className="mx-auto w-full max-w-[360px]">
      <div className="relative aspect-square">
        <svg
          viewBox="0 0 320 320"
          className="size-full -rotate-90"
          role="img"
          aria-label={`Healf Score ${total}. ${label}`}
        >
          {PILLAR_ORDER.map((id, i) => {
            const r = RADII[i]
            const c = 2 * Math.PI * r
            return (
              <g key={id}>
                <circle cx="160" cy="160" r={r} fill="none" stroke="#e9e7e0" strokeWidth={STROKE} />
                <circle
                  cx="160"
                  cy="160"
                  r={r}
                  fill="none"
                  stroke={PILLAR_COLORS[id]}
                  strokeWidth={STROKE}
                  strokeLinecap="round"
                  strokeDasharray={c}
                  strokeDashoffset={armed ? c * (1 - scores[id] / 100) : c}
                  style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(.2,.8,.2,1)" }}
                />
              </g>
            )
          })}
        </svg>
        <div className="absolute inset-0 grid place-content-center text-center">
          <div className="text-5xl font-light leading-none tabular-nums">{shown}</div>
          <div className="mt-1.5 text-[10px] uppercase tracking-[0.16em] text-black/50">Healf Score</div>
        </div>
      </div>
      <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
        {pillars.map((p) => (
          <li key={p.id} className="flex items-center justify-between gap-3 border-b border-black/10 pb-2">
            <span className="flex items-center gap-2">
              <span className="size-2.5 rounded-full" style={{ background: PILLAR_COLORS[p.id] }} />
              {p.label}
            </span>
            <span className="tabular-nums">{scores[p.id]}</span>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-black/50">{caption}</p>
    </div>
  )
}
