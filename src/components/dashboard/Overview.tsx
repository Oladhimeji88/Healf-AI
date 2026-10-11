import { formatPrice, type Product } from "../../data/content"
import {
  PILLAR_COLORS,
  PILLAR_ORDER,
  baselineScores,
  biomarkers,
  goals,
} from "../../data/platform"
import type { Persona } from "../../hooks/usePersona"
import { RangeBar, status } from "../Bloods"
import { devices as deviceList, timeAgo } from "../../data/devices"
import ScoreRing from "../ScoreRing"
import CheckIn from "./CheckIn"
import TrendChart from "./TrendChart"
import Welcome from "./Welcome"
import type { DashboardView } from "./types"

const trend = [61, 63, 62, 66, 68, 67, 70, 71, 72, 73, 73, 74]
const WEEK = ["M", "T", "W", "T", "F", "S", "S"]
const vitals = [
  {
    scope: "sleep",
    label: "Sleep",
    value: "7h 12m",
    note: "avg, last 7 nights",
  },
  {
    scope: "heart",
    label: "Resting HR",
    value: "58 bpm",
    note: "-2 vs last month",
  },
  { scope: "heart", label: "HRV", value: "62 ms", note: "+5 vs last month" },
  {
    scope: "activity",
    label: "Active days",
    value: "5 / 7",
    note: "this week",
  },
] as const

const card = "rounded-[24px] bg-white p-6 sm:p-8"

type Props = {
  me: Persona
  plan: Product[]
  onNavigate: (view: DashboardView) => void
}

export default function Overview({ me, plan, onNavigate }: Props) {
  if (!me.onboarded) return <Welcome me={me} />

  const goal = goals.find((g) => g.id === me.goalId) ?? goals[0]
  // New members have quiz scores; everyone else sees the sample profile.
  const isNew = me.scores !== null
  const scores = me.scores ?? baselineScores
  const focusScores = me.scores ?? goal.scores
  // The one step with the most room to improve: the Pillar with the lowest score.
  const focusId = PILLAR_ORDER.reduce(
    (low, id) => (focusScores[id] < focusScores[low] ? id : low),
    PILLAR_ORDER[0],
  )
  const focusDone = me.done.includes(focusId)
  const others = PILLAR_ORDER.filter((id) => id !== focusId)
  const connected =
    Object.keys(me.devices).length > 0 ? Object.keys(me.devices) : null
  const attention = biomarkers.filter((b) => status(b).text !== "Optimal")
  const total = plan.reduce((sum, p) => sum + p.price, 0)
  const todayIdx = (new Date().getDay() + 6) % 7
  const weekDone = WEEK.map((_, i) =>
    i < todayIdx ? !isNew && i !== 2 : i === todayIdx ? focusDone : false,
  )

  return (
    <div className="grid gap-4 lg:grid-cols-12">
      <section
        className="rounded-[24px] bg-black p-6 text-white sm:p-8 lg:col-span-7"
        aria-labelledby="focus-h"
      >
        <h2 id="focus-h" className="eyebrow !text-white/60">
          Your one thing today
        </h2>
        <p className="mt-4 text-3xl font-light leading-[1.15] tracking-tight sm:text-4xl">
          {goal.protocol[focusId]}
        </p>
        <p className="mt-5 flex items-start gap-2 text-white/70">
          <span
            className="mt-2 size-2 shrink-0 rounded-full"
            style={{ background: PILLAR_COLORS[focusId] }}
          />
          <span>
            Why this one: your {focusId} Pillar is the lowest right now (
            {focusScores[focusId]}), so it's the change with the most to give.
          </span>
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-5">
          <button
            type="button"
            aria-pressed={focusDone}
            onClick={() => me.toggleDone(focusId)}
            className={`btn ${
              focusDone
                ? "border border-white/40 text-white"
                : "bg-white text-black"
            }`}
          >
            {focusDone ? "Done ✓  Undo" : "Mark as done"}
          </button>
          <div className="text-right text-sm text-white/60">
            <div
              className="flex justify-end gap-1.5"
              role="img"
              aria-label={`${weekDone.filter(Boolean).length} of 7 days this week`}
            >
              {WEEK.map((d, i) => (
                <span
                  key={i}
                  className={`grid size-7 place-items-center rounded-full text-[11px] ${
                    weekDone[i]
                      ? "bg-white text-black"
                      : i === todayIdx
                        ? "border border-white/60"
                        : "border border-white/20"
                  }`}
                >
                  {d}
                </span>
              ))}
            </div>
            <p className="mt-2">
              {focusDone
                ? "Nice. That's the hard part done."
                : "Small steps, most days."}
            </p>
          </div>
        </div>
      </section>

      <div className="lg:col-span-5">
        <CheckIn me={me} />
      </div>

      <section className={`${card} lg:col-span-4`} aria-label="Healf Score">
        <ScoreRing
          scores={scores}
          caption={
            isNew
              ? "Based on your answers"
              : "Sample profile · illustrative data"
          }
        />
      </section>

      <section className={`${card} lg:col-span-8`} aria-labelledby="trend-h">
        <h2 id="trend-h" className="eyebrow">
          Your progress
        </h2>
        {isNew ? (
          <>
            <p className="mt-3 text-2xl font-light leading-8 sm:text-3xl">
              This is day one. Every journey starts with a first score.
            </p>
            <p className="mt-4 max-w-xl leading-7 text-black/65">
              Complete your one thing most days, then re-score in 12 weeks. Your
              trend will appear here. Add a Healf Bloods test to turn this
              estimate into real data.
            </p>
          </>
        ) : (
          <>
            <p className="mt-3 text-2xl font-light leading-8 sm:text-3xl">
              Up 13 points in 12 weeks. That's real progress, and it's yours.
            </p>
            <div className="mt-4 text-black">
              <TrendChart data={trend} />
            </div>
            <div className="mt-1 flex justify-between text-xs text-black/50">
              <span>12 weeks ago</span>
              <span>Now</span>
            </div>
          </>
        )}
      </section>

      <section className={`${card} lg:col-span-12`} aria-labelledby="vitals-h">
        {connected ? (
          <>
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h2 id="vitals-h" className="eyebrow">
                From your {deviceList.find((d) => d.id === connected[0])?.name}
              </h2>
              <span className="text-sm text-black/55">
                Synced {timeAgo(me.devices[connected[0]].syncedAt)} · simulated
                data
              </span>
            </div>
            <dl className="mt-5 grid grid-cols-2 gap-5 sm:grid-cols-4">
              {vitals
                .filter((v) =>
                  me.devices[connected[0]].scopes.includes(v.scope),
                )
                .map((v) => (
                  <div key={v.label}>
                    <dt className="text-sm text-black/55">{v.label}</dt>
                    <dd className="mt-1 text-2xl font-light tabular-nums">
                      {v.value}
                    </dd>
                    <dd className="text-xs text-black/50">{v.note}</dd>
                  </div>
                ))}
            </dl>
          </>
        ) : (
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 id="vitals-h" className="eyebrow">
                Connect your watch
              </h2>
              <p className="mt-2 max-w-xl text-lg leading-7">
                Link a watch or ring and your sleep and heart data will shape
                your plan automatically.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate("devices")}
              className="btn btn-dark"
            >
              Connect a device
            </button>
          </div>
        )}
      </section>

      <section className={`${card} lg:col-span-7`} aria-labelledby="data-h">
        <div className="flex items-baseline justify-between gap-4">
          <h2 id="data-h" className="eyebrow">
            What your data says
          </h2>
          <button
            type="button"
            onClick={() => onNavigate("biomarkers")}
            className="text-sm underline"
          >
            All biomarkers
          </button>
        </div>
        <ul className="mt-4 divide-y divide-black/10">
          {attention.map((b) => (
            <li key={b.name} className="py-5 first:pt-0">
              <ul>
                <RangeBar b={b} />
              </ul>
              <p className="leading-7 text-black/75">
                Your {b.name} is {b.value} {b.unit},{" "}
                {b.value < b.optimal[0] ? "below" : "above"} the {b.optimal[0]}{" "}
                to {b.optimal[1]} range where most people feel their best.
              </p>
              {b.nextStep && (
                <p className="mt-2 rounded-2xl bg-canvas p-4 text-sm leading-6">
                  <b className="font-medium">Next step:</b> {b.nextStep}
                </p>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section className={`${card} lg:col-span-5`} aria-labelledby="also-h">
        <h2 id="also-h" className="eyebrow">
          Also, if you have the energy
        </h2>
        <ul className="mt-2 divide-y divide-black/10">
          {others.map((id) => {
            const checked = me.done.includes(id)
            return (
              <li key={id}>
                <label className="flex cursor-pointer items-start gap-4 py-4">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => me.toggleDone(id)}
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
        <p className="mt-2 text-sm text-black/55">
          None of these are required. Your one thing is enough.
        </p>
      </section>

      <section
        className={`${card} flex flex-wrap items-center justify-between gap-4 lg:col-span-7`}
        aria-label="Your plan summary"
      >
        <div>
          <h2 className="eyebrow">Your plan</h2>
          <p className="mt-2 text-lg">
            {plan.length === 0
              ? "Nothing here yet. Add only what your data supports."
              : `${plan.length} ${
                  plan.length === 1 ? "product" : "products"
                } · ${formatPrice(total)}`}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          {plan.length > 0 && !me.membership.active && (
            <button
              type="button"
              onClick={() => onNavigate("membership")}
              className="text-sm underline"
            >
              Make it a membership
            </button>
          )}
          <button
            type="button"
            onClick={() => onNavigate("plan")}
            className="btn btn-dark"
          >
            View plan
          </button>
        </div>
      </section>

      <section className={`${card} lg:col-span-5`} aria-labelledby="care-h">
        <h2 id="care-h" className="eyebrow">
          You're not doing this alone
        </h2>
        <p className="mt-2 leading-7 text-black/70">
          Our clinicians review every result. Ask a question, or tell us how
          it's really going.
        </p>
        <button type="button" className="btn btn-light mt-4">
          Message your care team
        </button>
      </section>
    </div>
  )
}
