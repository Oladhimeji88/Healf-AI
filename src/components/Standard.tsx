import { ASSETS } from "../data/content"
import { bannedIngredients, standardSteps } from "../data/platform"
import Reveal from "./Reveal"

export default function Standard() {
  return (
    <section className="page-section py-20 lg:py-28">
      <Reveal>
        <p className="eyebrow">The Healf Standard</p>
        <div className="mt-4 grid gap-6 lg:grid-cols-2">
          <h2 className="text-4xl font-light tracking-tight sm:text-6xl">
            If it can't earn its place, it doesn't get one.
          </h2>
          <p className="text-xl leading-8 text-black/65 lg:self-end">
            Every product on the platform passes the same three steps, so you
            never have to wonder what's worth your time.
          </p>
        </div>
      </Reveal>
      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {standardSteps.map((s, i) => (
          <Reveal key={s.title} delay={i * 90}>
            <article className="relative min-h-[480px] overflow-hidden rounded-[24px] sm:min-h-[560px]">
              <img
                src={`${ASSETS}/${s.image}`}
                alt=""
                loading="lazy"
                className="absolute inset-0 size-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <span className="absolute left-5 top-4 text-xl text-white">
                {s.number}
              </span>
              <div className="absolute bottom-0 p-5 text-white">
                <h3 className="text-3xl font-light">{s.title}</h3>
                <p className="mt-2 max-w-xs leading-6 text-white/85">
                  {s.text}
                </p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-4">
        <div className="rounded-[24px] bg-canvas p-6 sm:p-8">
          <h3 className="eyebrow">Never in anything we sell</h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {bannedIngredients.map((item) => (
              <li
                key={item}
                className="rounded-full bg-white px-3 py-1.5 text-sm"
              >
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-black/50">
            Some apply to ingestible products only.
          </p>
        </div>
      </Reveal>
    </section>
  )
}
