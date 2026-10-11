import { loopSteps } from "../data/platform"
import Reveal from "./Reveal"

export default function Loop() {
  return (
    <section className="bg-black text-white">
      <div className="page-section py-20 lg:py-28">
        <Reveal>
          <p className="eyebrow !text-white/50">How the platform works</p>
          <h2 className="mt-4 max-w-3xl text-4xl font-light tracking-tight sm:text-6xl">
            Not a one-off test. A loop that keeps learning.
          </h2>
        </Reveal>
        <ol className="mt-14 grid gap-px overflow-hidden rounded-[28px] bg-white/15 sm:grid-cols-2 lg:grid-cols-4">
          {loopSteps.map((step, i) => (
            <li key={step.title} className="bg-black p-6 sm:p-8">
              <Reveal delay={i * 90}>
                <span className="text-sm tabular-nums text-white/40">
                  0{i + 1}
                </span>
                <h3 className="mt-16 text-3xl font-light">{step.title}</h3>
                <p className="mt-3 leading-7 text-white/65">{step.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
        <p className="mt-6 text-sm text-white/50">
          ↻ Then repeat. Re-scoring every 90 days keeps your plan current.
        </p>
      </div>
    </section>
  )
}
