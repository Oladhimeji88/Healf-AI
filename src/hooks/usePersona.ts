import { useCallback, useEffect, useState } from "react"
import type { PillarId, Scores } from "../data/platform"

export type Mood = "drained" | "low" | "okay" | "good" | "great"

export type Membership = {
  active: boolean
  cadenceWeeks: number
  paused: boolean
}

type State = {
  name: string
  goalId: string
  onboarded: boolean
  scores: Scores | null
  membership: Membership
  day: string
  mood: Mood | null
  done: PillarId[]
}

const KEY = "healf.persona"
const today = () => new Date().toISOString().slice(0, 10)

const fresh = (): State => ({
  name: "",
  goalId: "energy",
  onboarded: false,
  scores: null,
  membership: { active: false, cadenceWeeks: 8, paused: false },
  day: today(),
  mood: null,
  done: [],
})

function load(): State {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return fresh()
    const saved = { ...fresh(), ...JSON.parse(raw) } as State
    // Daily state (mood, completed steps) resets each morning; identity and goal persist.
    return saved.day === today()
      ? saved
      : { ...saved, day: today(), mood: null, done: [] }
  } catch {
    return fresh()
  }
}

export default function usePersona() {
  const [state, setState] = useState<State>(load)

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state))
    } catch {
      // Storage can be unavailable (private mode); the dashboard still works for the session.
    }
  }, [state])

  const update = useCallback(
    (patch: Partial<State>) => setState((s) => ({ ...s, ...patch })),
    [],
  )

  const toggleDone = useCallback(
    (id: PillarId) =>
      setState((s) => ({
        ...s,
        done: s.done.includes(id)
          ? s.done.filter((x) => x !== id)
          : [...s.done, id],
      })),
    [],
  )

  return { ...state, update, toggleDone }
}

export type Persona = ReturnType<typeof usePersona>
