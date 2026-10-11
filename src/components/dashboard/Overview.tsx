import { useState } from "react"
import { formatPrice, type Product } from "../../data/content"
import {
  PILLAR_COLORS,
  PILLAR_ORDER,
  baselineScores,
  biomarkers,
  goals,
} from "../../data/platform"
import { RangeBar, status } from "../Bloods"
import ScoreRing from "../ScoreRing"
import TrendChart from "./TrendChart"

const trend = [61, 63, 62, 66, 68, 67, 70, 71, 72, 73, 73, 74]

const vitals = [
  { label: "Sleep", value: "7h 12m", note: "avg, last 7 nights" },
  { label: "Resting HR", value: "58 bpm", note: "−2 vs last month" },
  { label: "HRV", value: "62 ms", note: "+5 vs last month" },
  { label: "Active days", value: "5 / 7", note: "this week" },
]

const card = "rounded-[24px] bg-white p-5 sm:p-6"

export default function Overview({
  plan,
  onNavigate,
}: {
  plan: Product[]
  onNavigate: (view: "plan" | "biomarkers") => void
}) {
  const goal = goals[0]
  const [done, setDone] = useState<Set<string>>(new Set())
  const toggle = (id: string) =>
    setDone((prev) => {
      const next = new Set(prev)
      if (!next.delete(id)) next.add(id)
      return next
    })
  const attention = biomarkers.filter((b) => status(b).text !== "Optimal")
  const total = plan.reduce((sum, p) => sum + p.price, 0)

  return (
    <div className="grid gap-4 lg:grid-cols-12">
      <section className={`${card} lg:col-span-4`} aria-label="Healf Score">
        <ScoreRing
          scores={baselineScores}
          caption="Sample profile · illustrative data"
        />
      </section>

      <section className={`${card} lg:col-span-8`} aria-labelledby="trend-h">
        <div className="flex items-baseline justify-between gap-4">
          <div>
            <h2 id="trend-h" className="eyebrow">
              Score trend
            </h2>
            <p className="mt-2 text-4xl font-light tabular-nums">
              74{" "}
              <span className="text-base text-black/50">+13 in 12 weeks</span>
            </p>
          </div>
        </div>
        <div className="mt-4 text-black">
          <TrendChart data={trend} />
        </div>
        <div className="mt-1 flex justify-between text-xs text-black/50">
          <span>12 weeks ago</span>
          <span>Now</span>
        </div>
        <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-black/10 pt-5 sm:grid-cols-4">
          {vitals.map((v) => (
            <div key={v.label}>
              <dt className="text-sm text-black/55">{v.label}</dt>
              <dd className="mt-1 text-xl font-light tabular-nums">
                {v.value}
              </dd>
              <dd className="text-xs text-black/50">{v.note}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className={`${card} lg:col-span-7`} aria-labelledby="protocol-h">
        <div className="flex items-baseline justify-between gap-4">
          <div>
            <h2 id="protocol-h" className="eyebrow">
              Today's protocol
            </h2>
            <p className="mt-2 text-sm text-black/55">Goal: {goal.label}</p>
          </div>
          <p className="text-sm tabular-nums" aria-live="polite">
            {done.size} / {PILLAR_ORDER.length} done
          </p>
        </div>
        <div
          className="mt-4 h-1.5 overflow-hidden rounded-full bg-black/10"
          role="progressbar"
          aria-label="Protocol progress"
          aria-valuemin={0}
          aria-valuemax={PILLAR_ORDER.length}
          aria-valuenow={done.size}
        >
          <div
            className="h-full rounded-full bg-black transition-[width] duration-500"
            style={{ width: `${(done.size / PILLAR_ORDER.length) * 100}%` }}
          />
        </div>
        <ul className="mt-2 divide-y divide-black/10">
          {PILLAR_ORDER.map((id) => {
            const checked = done.has(id)
            return (
              <li key={id}>
                <label className="flex cursor-pointer items-start gap-4 py-4">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggle(id)}
                    className="mt-1 size-4 shrink-0 accent-black"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2 text-xs font-semibold tracking-wide">
                      <span
                        className="size-2 rounded-full"
                        style={{ background: PILLAR_COLORS[id] }}
                      />
                      {id.toUpperCase()}
                    </span>
                    <span
                      className={`mt-1 block leading-6 ${
                        checked ? "text-black/40 line-through" : ""
                      }`}
                    >
                      {goal.protocol[id]}
                    </span>
                  </span>
                </label>
              </li>
            )
          })}
        </ul>
      </section>

      <section
        className={`${card} lg:col-span-5`}
        aria-labelledby="attention-h"
      >
        <div className="flex items-baseline justify-between gap-4">
          <h2 id="attention-h" className="eyebrow">
            Needs attention
          </h2>
          <button
            type="button"
            onClick={() => onNavigate("biomarkers")}
            className="text-sm underline"
          >
            All biomarkers
          </button>
        </div>
        <ul className="mt-2 divide-y divide-black/10">
          {attention.map((b) => (
            <RangeBar key={b.name} b={b} />
          ))}
        </ul>
      </section>

      <section
        className={`${card} flex flex-wrap items-center justify-between gap-4 lg:col-span-12`}
        aria-label="Your plan summary"
      >
        <div>
          <h2 className="eyebrow">Your plan</h2>
          <p className="mt-2 text-lg">
            {plan.length === 0
              ? "No products yet. Add what your data supports."
              : `${plan.length} ${
                  plan.length === 1 ? "product" : "products"
                } · ${formatPrice(total)}`}
          </p>
        </div>
        <button
          type="button"
          onClick={() => onNavigate("plan")}
          className="btn btn-dark"
        >
          View plan
        </button>
      </section>
    </div>
  )
}
