import type { Mood, Persona } from "../../hooks/usePersona"

type Option = {
  id: Mood
  label: string
  reply: string
}

const options: Option[] = [
  {
    id: "drained",
    label: "Drained",
    reply:
      "Thank you for being honest. Today, aim for the minimum: your one focus step and an early night. Rest is part of the plan.",
  },
  {
    id: "low",
    label: "Low",
    reply:
      "That's okay. Keep today light. One small step is enough, and it still counts.",
  },
  {
    id: "okay",
    label: "Okay",
    reply:
      "Steady is good. Stick with your one focus step and let the rest follow.",
  },
  {
    id: "good",
    label: "Good",
    reply: "Glad to hear it. Good days are the best time to build a habit.",
  },
  {
    id: "great",
    label: "Great",
    reply: "Love that. Notice what's working today. It's worth repeating.",
  },
]

export default function CheckIn({ me }: { me: Persona }) {
  const chosen = options.find((o) => o.id === me.mood)

  return (
    <section
      className="flex h-full flex-col rounded-[24px] bg-white p-6 sm:p-8"
      aria-labelledby="checkin-h"
    >
      <h2 id="checkin-h" className="eyebrow">
        Daily check-in
      </h2>
      <p className="mt-3 text-2xl font-light leading-8">
        How are you feeling today?
      </p>
      <div
        role="radiogroup"
        aria-label="How are you feeling today?"
        className="mt-5 flex flex-wrap gap-2"
      >
        {options.map((o) => (
          <button
            key={o.id}
            type="button"
            role="radio"
            aria-checked={o.id === me.mood}
            onClick={() => me.update({ mood: o.id })}
            className={`rounded-full border px-4 py-2 text-sm transition ${
              o.id === me.mood
                ? "border-black bg-black text-white"
                : "border-black/20 hover:border-black"
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
      <p
        className="mt-5 min-h-[3.5rem] leading-7 text-black/70"
        aria-live="polite"
      >
        {chosen
          ? chosen.reply
          : "A quick honest answer helps us keep your plan realistic."}
      </p>
    </section>
  )
}
