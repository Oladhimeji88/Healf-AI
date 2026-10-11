import { baselineScores } from "../data/platform"
import { ASSETS } from "../data/content"
import Reveal from "./Reveal"
import ScoreRing from "./ScoreRing"

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-black text-white">
      <img
        src={`${ASSETS}/hero-bg.jpg`}
        alt=""
        fetchPriority="high"
        className="absolute inset-0 -z-20 size-full object-cover object-[78%_center]"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/85 via-black/55 to-black/10 max-lg:from-black/80 max-lg:via-black/60 max-lg:to-black/50" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />

      <div className="mx-auto grid min-h-[640px] max-w-[1440px] items-center gap-12 px-4 py-14 sm:py-20 lg:min-h-[min(820px,calc(100dvh-4rem))] lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:py-24">
        <div>
          <p className="eyebrow !text-white/70">Wellbeing technology</p>
          <h1 className="mt-5 text-[clamp(3rem,9vw,7.25rem)] font-light leading-[0.95] tracking-tight">
            Wellbeing,
            <br />
            defined.
          </h1>
          <p className="mt-7 max-w-xl text-xl leading-8 text-white/80 sm:text-2xl sm:leading-9">
            One platform that measures your body, interprets it with clinicians,
            and guides you to what actually works, for you.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#/start" className="btn bg-white text-black">
              Build my baseline
            </a>
            <a
              href="#platform"
              className="btn border border-white/40 text-white hover:bg-white/10"
            >
              See how it works
            </a>
          </div>
          <dl className="mt-12 grid max-w-xl grid-cols-3 gap-4 border-t border-white/20 pt-6 text-sm">
            <div>
              <dt className="text-white/60">Trustpilot</dt>
              <dd className="mt-1 text-2xl font-light">4.8</dd>
            </div>
            <div>
              <dt className="text-white/60">Reviews</dt>
              <dd className="mt-1 text-2xl font-light">15,200+</dd>
            </div>
            <div>
              <dt className="text-white/60">Reviewed by</dt>
              <dd className="mt-1 text-2xl font-light">Clinicians</dd>
            </div>
          </dl>
        </div>
        <Reveal
          delay={120}
          className="w-full max-w-[320px] lg:ml-auto lg:self-end"
        >
          <div className="rounded-[28px] border border-white/15 bg-black/40 p-5 backdrop-blur-xl">
            <ScoreRing
              onDark
              scores={baselineScores}
              caption="Sample profile · illustrative data"
            />
            <div className="mt-5 flex items-center gap-3 rounded-2xl bg-white/10 p-3 text-sm">
              <span
                className="grid size-8 shrink-0 place-items-center rounded-full bg-sleep text-white"
                aria-hidden="true"
              >
                ↑
              </span>
              <span>
                <b className="font-medium">Sleep +6</b> since last re-score.
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
