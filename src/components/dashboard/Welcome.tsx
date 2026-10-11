import { useState, type FormEvent } from "react"
import { goals } from "../../data/platform"
import type { Persona } from "../../hooks/usePersona"

export default function Welcome({ me }: { me: Persona }) {
  const [name, setName] = useState(me.name)
  const [goalId, setGoalId] = useState(me.goalId)

  const submit = (e: FormEvent) => {
    e.preventDefault()
    me.update({ name: name.trim(), goalId, onboarded: true })
  }

  return (
    <form onSubmit={submit} className="rounded-[24px] bg-white p-6 sm:p-10">
      <p className="eyebrow">Welcome</p>
      <h2 className="mt-3 max-w-2xl text-3xl font-light tracking-tight sm:text-4xl">
        Let's make this yours.
      </h2>
      <p className="mt-3 max-w-xl leading-7 text-black/65">
        Two quick questions so everything here, from today's focus to the tests
        we suggest, starts from you.
      </p>

      <label className="mt-8 block max-w-sm">
        <span className="text-sm">What should we call you?</span>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="given-name"
          placeholder="Your first name"
          className="mt-2 w-full rounded-full border border-black/20 px-5 py-3 outline-none focus:border-black"
        />
      </label>

      <fieldset className="mt-8">
        <legend className="text-sm">What would you most like to change?</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {goals.map((g) => (
            <button
              key={g.id}
              type="button"
              aria-pressed={g.id === goalId}
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
      </fieldset>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <button type="submit" className="btn btn-dark">
          Start my plan
        </button>
        <button
          type="button"
          onClick={() => me.update({ onboarded: true })}
          className="text-sm underline"
        >
          Skip for now
        </button>
      </div>
      <p className="mt-4 text-xs text-black/50">Saved on this device only.</p>
    </form>
  )
}
