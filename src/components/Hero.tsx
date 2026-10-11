import { baselineScores } from "../data/platform"
import Reveal from "./Reveal"
import ScoreRing from "./ScoreRing"

export default function Hero() {
  return (
    <section className="bg-canvas">
      <div className="mx-auto grid max-w-[1440px] items-center gap-12 px-4 py-14 sm:py-20 lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:py-28">
        <div>
          <p className="eyebrow">Wellbeing technology</p>
          <h1 className="mt-5 text-[clamp(3rem,9vw,7.25rem)] font-light leading-[0.95] tracking-tight">
            Wellbeing,
            <br />
            defined.
          </h1>
          <p className="mt-7 max-w-xl text-xl leading-8 text-black/70 sm:text-2xl sm:leading-9">
            One platform that measures your body, interprets it with clinicians,
            and guides you to what actually works, for you.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#plan" className="btn btn-dark">Build my baseline</a>
            <a href="#platform" className="btn btn-light">See how it works</a>
          </div>
          <dl className="mt-12 grid max-w-xl grid-cols-3 gap-4 border-t border-black/10 pt-6 text-sm">
            <div>
              <dt className="text-black/50">Trustpilot</dt>
              <dd className="mt-1 text-2xl font-light">4.8</dd>
            </div>
            <div>
              <dt className="text-black/50">Reviews</dt>
              <dd className="mt-1 text-2xl font-light">15,200+</dd>
            </div>
            <div>
              <dt className="text-black/50">Reviewed by</dt>
              <dd className="mt-1 text-2xl font-light">Clinicians</dd>
            </div>
          </dl>
        </div>
        <Reveal delay={120}>
          <div className="relative rounded-[28px] bg-white p-6 shadow-[0_30px_80px_-40px_rgba(0,0,0,.35)] sm:p-10">
            <ScoreRing scores={baselineScores} caption="Sample profile · illustrative data" />
            <div className="mt-6 flex items-center gap-3 rounded-2xl bg-canvas p-3 text-sm">
              <span className="grid size-8 place-items-center rounded-full bg-sleep text-white" aria-hidden="true">↑</span>
              <span>
                <b className="font-medium">Sleep +6</b> since last re-score. Magnesium and a fixed wake time are working.
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
