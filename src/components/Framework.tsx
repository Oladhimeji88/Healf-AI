import { useState, type KeyboardEvent } from "react"
import { ASSETS } from "../data/content"
import { PILLAR_COLORS, pillars } from "../data/platform"
import Reveal from "./Reveal"

export default function Framework() {
  const [active, setActive] = useState(0)
  const pillar = pillars[active]

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return
    const dir = e.key === "ArrowRight" ? 1 : -1
    const next = (active + dir + pillars.length) % pillars.length
    setActive(next)
    document.getElementById(`tab-${pillars[next].id}`)?.focus()
  }

  return (
    <section id="framework" className="bg-canvas">
      <div className="page-section py-20 lg:py-28">
        <Reveal>
          <p className="eyebrow">The Four Pillars™</p>
          <h2 className="mt-4 max-w-3xl text-4xl font-light tracking-tight sm:text-6xl">
            Four Pillars. One shared language for wellbeing.
          </h2>
        </Reveal>

        <div
          role="tablist"
          aria-label="The Four Pillars"
          onKeyDown={onKeyDown}
          className="mt-10 flex flex-wrap gap-2"
        >
          {pillars.map((p, i) => (
            <button
              key={p.id}
              id={`tab-${p.id}`}
              role="tab"
              type="button"
              aria-selected={i === active}
              aria-controls="pillar-panel"
              tabIndex={i === active ? 0 : -1}
              onClick={() => setActive(i)}
              className={`flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm transition ${
                i === active
                  ? "border-black bg-black text-white"
                  : "border-black/20 bg-white hover:border-black"
              }`}
            >
              <span
                className="size-2 rounded-full"
                style={{ background: PILLAR_COLORS[p.id] }}
              />
              {p.label}
            </button>
          ))}
        </div>

        <div
          id="pillar-panel"
          role="tabpanel"
          aria-labelledby={`tab-${pillar.id}`}
          className="mt-6 grid overflow-hidden rounded-[28px] bg-white lg:grid-cols-[0.8fr_1.2fr]"
        >
          <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[520px]">
            <img
              src={`${ASSETS}/${pillar.image}`}
              alt=""
              decoding="async"
              className="absolute inset-0 size-full object-cover"
            />
            <span className="absolute left-5 top-4 text-4xl text-white sm:text-5xl">
              {pillar.label}
            </span>
          </div>
          <div className="flex flex-col justify-center gap-8 p-6 sm:p-10 lg:p-14">
            <p className="text-2xl font-light leading-9 sm:text-3xl sm:leading-10">
              {pillar.definition}
            </p>
            <div>
              <h3 className="eyebrow">What we measure</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {pillar.signals.map((s) => (
                  <li
                    key={s}
                    className="rounded-full border px-3 py-1.5 text-sm"
                    style={{ borderColor: PILLAR_COLORS[pillar.id] }}
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="eyebrow">What moves it</h3>
              <ul className="mt-3 divide-y divide-black/10 border-y border-black/10">
                {pillar.levers.map((l) => (
                  <li key={l} className="py-3 text-base">
                    {l}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
