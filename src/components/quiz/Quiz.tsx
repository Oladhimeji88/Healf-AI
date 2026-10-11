import { useState, type FormEvent } from "react"
import { ASSETS } from "../../data/content"
import {
  PILLAR_COLORS,
  PILLAR_ORDER,
  goals,
  pillars,
  type PillarId,
  type Scores,
} from "../../data/platform"
import type { Persona } from "../../hooks/usePersona"
import ScoreRing from "../ScoreRing"

const RATINGS = ["Struggling", "Not great", "Okay", "Good", "Thriving"]
const QUESTIONS: Record<PillarId, string> = {
  eat: "How well have you been eating lately?",
  move: "How active and strong do you feel?",
  mind: "How steady is your mind and stress?",
  sleep: "How well have you been sleeping?",
}

// 1 to 5 self-rating mapped onto a 30 to 90 score band: an honest estimate, not a diagnosis.
const toScore = (rating: number) => 30 + (rating - 1) * 15

export default function Quiz({ me }: { me: Persona }) {
  const [step, setStep] = useState(0)
  const [goalId, setGoalId] = useState(me.goalId)
  const [ratings, setRatings] = useState<Record<PillarId, number>>({
    eat: 3,
    move: 3,
    mind: 3,
    sleep: 3,
  })
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  const goal = goals.find((g) => g.id === goalId) ?? goals[0]
  const scores = Object.fromEntries(
    PILLAR_ORDER.map((id) => [id, toScore(ratings[id])]),
  ) as Scores
  const total = Math.round(
    PILLAR_ORDER.reduce((sum, id) => sum + scores[id], 0) / 4,
  )
  const lowest = PILLAR_ORDER.reduce(
    (low, id) => (scores[id] < scores[low] ? id : low),
    PILLAR_ORDER[0],
  )
  const lowestLabel = pillars.find((p) => p.id === lowest)!.label

  const submit = (e: FormEvent) => {
    e.preventDefault()
    me.update({ name: name.trim(), goalId, scores, onboarded: true })
    window.location.hash = "#/dashboard"
  }

  const back = () =>
    step === 0 ? (window.location.hash = "#/") : setStep(step - 1)

  return (
    <div className="min-h-dvh bg-canvas text-black">
      <header className="px-4">
        <div className="mx-auto flex h-16 max-w-[900px] items-center justify-between">
          <a
            href="#/"
            aria-label="Healf home"
            className="w-[105px] sm:w-[130px]"
          >
            <img src={`${ASSETS}/6ade8.svg`} alt="Healf" />
          </a>
          <a
            href="#/"
            aria-label="Close quiz"
            className="grid size-9 place-items-center rounded-full border border-black/20 text-lg"
          >
            ×
          </a>
        </div>
      </header>

      <main id="main" className="mx-auto max-w-[900px] px-4 pb-16 pt-6">
        <div
          className="h-1 overflow-hidden rounded-full bg-black/10"
          role="progressbar"
          aria-label="Quiz progress"
          aria-valuemin={1}
          aria-valuemax={3}
          aria-valuenow={step + 1}
        >
          <div
            className="h-full bg-black transition-[width] duration-500"
            style={{ width: `${((step + 1) / 3) * 100}%` }}
          />
        </div>
        <p className="mt-4 text-sm text-black/55">
          Step {step + 1} of 3 · about 2 minutes
        </p>

        {step === 0 && (
          <section aria-labelledby="q-h" className="mt-8">
            <h1
              id="q-h"
              className="text-4xl font-light tracking-tight sm:text-6xl"
            >
              What would you most like to change?
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-8 text-black/65">
              There's no wrong answer. Pick the one that matters most right now.
            </p>
            <div
              role="radiogroup"
              aria-labelledby="q-h"
              className="mt-8 grid gap-3 sm:grid-cols-2"
            >
              {goals.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  role="radio"
                  aria-checked={g.id === goalId}
                  onClick={() => setGoalId(g.id)}
                  className={`rounded-2xl border p-5 text-left text-xl font-light transition ${
                    g.id === goalId
                      ? "border-black bg-black text-white"
                      : "border-black/15 bg-white hover:border-black"
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </section>
        )}

        {step === 1 && (
          <section aria-labelledby="q-h" className="mt-8">
            <h1
              id="q-h"
              className="text-4xl font-light tracking-tight sm:text-6xl"
            >
              How are the four Pillars right now?
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-8 text-black/65">
              Go with your gut. This is a starting point, and it gets sharper
              with real data.
            </p>
            <ul className="mt-8 grid gap-3">
              {PILLAR_ORDER.map((id) => (
                <li key={id} className="rounded-2xl bg-white p-5 sm:p-6">
                  <label
                    htmlFor={`r-${id}`}
                    className="flex items-center gap-2 text-xs font-semibold tracking-wide"
                  >
                    <span
                      className="size-2 rounded-full"
                      style={{ background: PILLAR_COLORS[id] }}
                    />
                    {id.toUpperCase()}
                  </label>
                  <p className="mt-2 text-xl font-light">{QUESTIONS[id]}</p>
                  <input
                    id={`r-${id}`}
                    type="range"
                    min={1}
                    max={5}
                    step={1}
                    value={ratings[id]}
                    onChange={(e) =>
                      setRatings({ ...ratings, [id]: Number(e.target.value) })
                    }
                    aria-valuetext={RATINGS[ratings[id] - 1]}
                    className="mt-4 w-full accent-black"
                  />
                  <div className="mt-1 flex justify-between text-xs text-black/50">
                    <span>{RATINGS[0]}</span>
                    <span className="font-medium text-black">
                      {RATINGS[ratings[id] - 1]}
                    </span>
                    <span>{RATINGS[4]}</span>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        {step === 2 && (
          <section aria-labelledby="q-h" className="mt-8">
            <h1
              id="q-h"
              className="text-4xl font-light tracking-tight sm:text-6xl"
            >
              Your starting Healf Score is {total}.
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-black/65">
              Your {lowestLabel} Pillar has the most room to grow, so that's
              where we'll begin. This is a self-reported estimate. Add a Healf
              Bloods test and it gets much sharper.
            </p>
            <div className="mt-8 grid gap-4 lg:grid-cols-2">
              <div className="rounded-[24px] bg-white p-6 sm:p-8">
                <ScoreRing scores={scores} caption="Based on your answers" />
              </div>
              <form
                onSubmit={submit}
                className="flex flex-col rounded-[24px] bg-black p-6 text-white sm:p-8"
              >
                <h2 className="text-2xl font-light">Your first step</h2>
                <p className="mt-2 leading-7 text-white/75">
                  {goal.protocol[lowest]}
                </p>
                <p className="mt-6 text-sm text-white/60">
                  Save your score and get your full plan.
                </p>
                <label className="mt-3 block">
                  <span className="sr-only">First name</span>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    autoComplete="given-name"
                    placeholder="First name"
                    className="w-full rounded-full border border-white/30 bg-transparent px-5 py-3 outline-none placeholder:text-white/40 focus:border-white"
                  />
                </label>
                <label className="mt-3 block">
                  <span className="sr-only">Email</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    placeholder="Email"
                    className="w-full rounded-full border border-white/30 bg-transparent px-5 py-3 outline-none placeholder:text-white/40 focus:border-white"
                  />
                </label>
                <button type="submit" className="btn mt-4 bg-white text-black">
                  See my plan
                </button>
                <p className="mt-3 text-xs leading-5 text-white/50">
                  Prototype: no account is created. Your name and answers are
                  saved on this device only.
                </p>
              </form>
            </div>
          </section>
        )}

        <div className="mt-8 flex items-center justify-between">
          <button type="button" onClick={back} className="text-sm underline">
            Back
          </button>
          {step < 2 && (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="btn btn-dark"
            >
              Continue
            </button>
          )}
        </div>
      </main>
    </div>
  )
}
