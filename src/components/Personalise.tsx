import { useMemo, useState } from "react"
import { allProducts, type Product } from "../data/content"
import { PILLAR_COLORS, PILLAR_ORDER, goals } from "../data/platform"
import ProductRow from "./ProductRow"
import Reveal from "./Reveal"
import ScoreRing from "./ScoreRing"

type Props = {
  has: (id: string) => boolean
  onToggle: (product: Product) => void
}

export default function Personalise({ has, onToggle }: Props) {
  const [goalId, setGoalId] = useState(goals[0].id)
  const goal = goals.find((g) => g.id === goalId)!
  const matches = useMemo(
    () =>
      goal.productIds
        .map((id) => allProducts.find((p) => p.id === id))
        .filter((p): p is Product => Boolean(p)),
    [goal],
  )

  return (
    <section id="plan" className="page-section py-20 lg:py-28">
      <Reveal>
        <p className="eyebrow">Healf Intelligence</p>
        <h2 className="mt-4 max-w-3xl text-4xl font-light tracking-tight sm:text-6xl">
          Start with what you want to change. We'll show you the rest.
        </h2>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-black/65">
          Choose a goal to preview how a Healf plan is built: your score, a
          protocol across every Pillar, the tests to start with, and only the
          products your data supports.
        </p>
      </Reveal>

      <div
        role="radiogroup"
        aria-label="Your goal"
        className="mt-10 flex flex-wrap gap-2"
      >
        {goals.map((g) => (
          <button
            key={g.id}
            type="button"
            role="radio"
            aria-checked={g.id === goalId}
            onClick={() => setGoalId(g.id)}
            className={`rounded-full border px-5 py-2.5 text-sm transition ${
              g.id === goalId
                ? "border-black bg-black text-white"
                : "border-black/20 hover:border-black"
            }`}
          >
            {g.label}
          </button>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-[380px_1fr]">
        <div className="rounded-[28px] bg-canvas p-6 sm:p-8">
          <ScoreRing
            scores={goal.scores}
            caption="Sample starting point · illustrative data"
          />
        </div>

        <div className="flex min-w-0 flex-col gap-6 rounded-[28px] border border-black/10 p-6 sm:p-8">
          <p
            className="text-xl font-light leading-8 sm:text-2xl sm:leading-9"
            aria-live="polite"
          >
            {goal.insight}
          </p>

          <div>
            <h3 className="eyebrow">Your protocol</h3>
            <ul className="mt-3 divide-y divide-black/10 border-y border-black/10">
              {PILLAR_ORDER.map((id) => (
                <li
                  key={id}
                  className="grid grid-cols-[72px_1fr] items-baseline gap-4 py-3"
                >
                  <span className="flex items-center gap-2 text-xs font-semibold tracking-wide">
                    <span
                      className="size-2 rounded-full"
                      style={{ background: PILLAR_COLORS[id] }}
                    />
                    {id.toUpperCase()}
                  </span>
                  <span className="text-base leading-6">
                    {goal.protocol[id]}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="eyebrow">Tests we'd start with</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {goal.tests.map((t) => (
                <li
                  key={t}
                  className="rounded-full bg-canvas px-3 py-1.5 text-sm"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="eyebrow">Matched to this goal</h3>
            <ul className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {matches.map((p) => {
                const added = has(p.id)
                return (
                  <li
                    key={p.id}
                    className="rounded-2xl border border-black/10 p-3"
                  >
                    <ProductRow
                      product={p}
                      action={
                        <button
                          type="button"
                          onClick={() => onToggle(p)}
                          aria-pressed={added}
                          aria-label={`${added ? "Remove" : "Add"} ${p.name} ${
                            added ? "from" : "to"
                          } plan`}
                          className={`shrink-0 rounded-full px-3.5 py-2 text-xs transition ${
                            added
                              ? "bg-black text-white"
                              : "border border-black/20 hover:border-black"
                          }`}
                        >
                          {added ? "Added ✓" : "Add"}
                        </button>
                      }
                    />
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
