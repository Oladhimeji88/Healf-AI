import { ASSETS } from "../data/content"
import { biomarkers, type Biomarker } from "../data/platform"
import Reveal from "./Reveal"

function status(b: Biomarker) {
  const [lo, hi] = b.optimal
  if (b.value < lo) return { text: "Below optimal", tone: "#c9822b" }
  if (b.value > hi) return { text: "Above optimal", tone: "#c9822b" }
  return { text: "Optimal", tone: "#4f8a5b" }
}

function RangeBar({ b }: { b: Biomarker }) {
  const span = b.max - b.min
  const pct = (v: number) =>
    `${Math.min(100, Math.max(0, ((v - b.min) / span) * 100))}%`
  const s = status(b)
  return (
    <li className="py-4">
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-base">{b.name}</span>
        <span className="text-sm tabular-nums">
          {b.value} <span className="text-black/50">{b.unit}</span>
        </span>
      </div>
      <div
        className="relative mt-3 h-2 rounded-full bg-black/10"
        role="img"
        aria-label={`${b.name} ${b.value} ${b.unit}, ${s.text}. Optimal ${b.optimal[0]} to ${b.optimal[1]}.`}
      >
        <div
          className="absolute inset-y-0 rounded-full bg-[#4f8a5b]/30"
          style={{
            left: pct(b.optimal[0]),
            width: `calc(${pct(b.optimal[1])} - ${pct(b.optimal[0])})`,
          }}
        />
        <div
          className="absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow"
          style={{ left: pct(b.value), background: s.tone }}
        />
      </div>
      <p className="mt-2 text-xs" style={{ color: s.tone }}>
        {s.text}
      </p>
    </li>
  )
}

export default function Bloods() {
  return (
    <section id="bloods" className="bg-canvas">
      <div className="page-section grid gap-4 py-20 lg:grid-cols-2 lg:py-28">
        <Reveal className="relative min-h-[420px] overflow-hidden rounded-[28px] lg:min-h-[640px]">
          <img
            src={`${ASSETS}/9bd6e.png`}
            alt=""
            loading="lazy"
            className="absolute inset-0 size-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-0 p-6 text-white sm:p-10">
            <p className="eyebrow !text-white/70">Healf Bloods</p>
            <h2 className="mt-3 max-w-md text-4xl font-light tracking-tight sm:text-5xl">
              Your body's data, in plain language.
            </h2>
            <p className="mt-3 max-w-md text-lg leading-7 text-white/85">
              A simple at-home test. Clinician-reviewed results that feed
              directly into your Healf Score and plan.
            </p>
            <a href="#plan" className="btn btn-light mt-6">
              Start testing
            </a>
          </div>
        </Reveal>

        <Reveal delay={100} className="rounded-[28px] bg-white p-6 sm:p-10">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="eyebrow">Sample report</p>
              <h3 className="mt-2 text-2xl font-light">Biomarker overview</h3>
            </div>
            <span className="rounded-full bg-canvas px-3 py-1 text-xs">
              Illustrative
            </span>
          </div>
          <ul className="mt-4 divide-y divide-black/10">
            {biomarkers.map((b) => (
              <RangeBar key={b.name} b={b} />
            ))}
          </ul>
          <p className="mt-4 text-xs leading-5 text-black/50">
            Example values for demonstration only. Not medical advice. Discuss
            any results with a qualified clinician.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
