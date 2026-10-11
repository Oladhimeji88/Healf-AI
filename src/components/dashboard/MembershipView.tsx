import { useState } from "react"
import type { Product } from "../../data/content"
import type { Persona } from "../../hooks/usePersona"
import ProductRow from "../ProductRow"

const CADENCES = [4, 8, 12]
const BENEFITS = [
  "Two Healf Bloods Core tests a year, 37 biomarkers each",
  "A 1:1 consultation after each test",
  "Next-day delivery on Healf orders",
  "Access to Healf events",
]

const addWeeks = (weeks: number) => {
  const d = new Date()
  d.setDate(d.getDate() + weeks * 7)
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long" })
}

const card = "rounded-[24px] bg-white p-6 sm:p-8"

export default function MembershipView({
  me,
  plan,
}: {
  me: Persona
  plan: Product[]
}) {
  const { active, cadenceWeeks, paused } = me.membership
  const [skipped, setSkipped] = useState<Set<string>>(new Set())
  const [confirmCancel, setConfirmCancel] = useState(false)
  const set = (patch: Partial<Persona["membership"]>) =>
    me.update({ membership: { ...me.membership, ...patch } })

  const toggleSkip = (id: string) =>
    setSkipped((prev) => {
      const next = new Set(prev)
      if (!next.delete(id)) next.add(id)
      return next
    })

  if (!active) {
    return (
      <section className={card} aria-labelledby="m-h">
        <p className="eyebrow">Healf Zone membership</p>
        <h2
          id="m-h"
          className="mt-3 max-w-xl text-3xl font-light tracking-tight sm:text-4xl"
        >
          Your results, tracked twice a year.
        </h2>
        <ul className="mt-6 max-w-xl divide-y divide-black/10 border-y border-black/10">
          {BENEFITS.map((b) => (
            <li key={b} className="py-3 leading-6">
              {b}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-lg">
          Renews yearly. Price is shown at checkout.{" "}
          <span className="text-black/55">
            Limited to one membership per Healf account.
          </span>
        </p>
        <button
          type="button"
          onClick={() => set({ active: true })}
          className="btn btn-dark mt-5"
        >
          Start membership
        </button>
        <p className="mt-3 text-xs text-black/50">
          Based on healf.com/zone. Prototype: no payment is taken.
        </p>
      </section>
    )
  }

  return (
    <div className="grid gap-4 lg:grid-cols-12">
      <section className={`${card} lg:col-span-7`} aria-labelledby="del-h">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h2 id="del-h" className="eyebrow">
            Deliveries
          </h2>
          <span
            className={`rounded-full px-3 py-1 text-xs ${
              paused ? "bg-canvas" : "bg-black text-white"
            }`}
          >
            {paused ? "Paused" : "Active"}
          </span>
        </div>
        <p className="mt-3 text-2xl font-light">
          {paused
            ? "Deliveries are paused."
            : `Next delivery: ${addWeeks(cadenceWeeks)}`}
        </p>

        <div
          role="radiogroup"
          aria-label="Delivery frequency"
          className="mt-5 flex flex-wrap items-center gap-2"
        >
          <span className="mr-1 text-sm text-black/60">Every</span>
          {CADENCES.map((w) => (
            <button
              key={w}
              type="button"
              role="radio"
              aria-checked={w === cadenceWeeks}
              onClick={() => set({ cadenceWeeks: w })}
              className={`rounded-full border px-4 py-2 text-sm transition ${
                w === cadenceWeeks
                  ? "border-black bg-black text-white"
                  : "border-black/20 hover:border-black"
              }`}
            >
              {w} weeks
            </button>
          ))}
        </div>

        {plan.length === 0 ? (
          <p className="mt-6 rounded-2xl bg-canvas p-4 text-sm leading-6 text-black/70">
            Your plan is empty, so there's nothing to deliver yet. Add what your
            data supports and it will show up here.
          </p>
        ) : (
          <ul className="mt-4 divide-y divide-black/10">
            {plan.map((p) => {
              const isSkipped = skipped.has(p.id)
              return (
                <li
                  key={p.id}
                  className={`py-4 ${isSkipped ? "opacity-50" : ""}`}
                >
                  <ProductRow
                    product={p}
                    action={
                      <button
                        type="button"
                        onClick={() => toggleSkip(p.id)}
                        aria-pressed={isSkipped}
                        aria-label={`${
                          isSkipped ? "Include" : "Skip"
                        } ${p.name} in the next delivery`}
                        className="shrink-0 text-sm underline"
                      >
                        {isSkipped ? "Include" : "Skip next"}
                      </button>
                    }
                  />
                </li>
              )
            })}
          </ul>
        )}
      </section>

      <div className="grid content-start gap-4 lg:col-span-5">
        <section className={card} aria-labelledby="ret-h">
          <h2 id="ret-h" className="eyebrow">
            Next Healf Bloods re-test
          </h2>
          <p className="mt-3 text-2xl font-light">{addWeeks(26)}</p>
          <p className="mt-2 text-sm leading-6 text-black/60">
            Included in your membership: two Core tests a year, about six months
            apart.
          </p>
        </section>

        <section className={card} aria-labelledby="bill-h">
          <h2 id="bill-h" className="eyebrow">
            Billing
          </h2>
          <p className="mt-3 flex justify-between text-lg">
            <span>Membership</span>
            <span>Renews yearly</span>
          </p>
          <p className="mt-2 text-xs text-black/50">
            Cancel before your annual cycle ends. Prototype: payments aren't
            connected.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => set({ paused: !paused })}
              className="btn btn-light"
            >
              {paused ? "Resume deliveries" : "Pause deliveries"}
            </button>
            {!confirmCancel ? (
              <button
                type="button"
                onClick={() => setConfirmCancel(true)}
                className="text-sm underline"
              >
                Cancel membership
              </button>
            ) : (
              <span className="flex items-center gap-3 text-sm" role="alert">
                Cancel your membership?
                <button
                  type="button"
                  onClick={() => {
                    set({ active: false, paused: false })
                    setConfirmCancel(false)
                  }}
                  className="underline"
                >
                  Yes, cancel
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmCancel(false)}
                  className="underline"
                >
                  Keep it
                </button>
              </span>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
