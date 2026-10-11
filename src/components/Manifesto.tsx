import Reveal from "./Reveal"

export default function Manifesto() {
  return (
    <section id="platform" className="page-section py-20 lg:py-32">
      <Reveal>
        <p className="eyebrow">Our definition</p>
        <p className="mt-6 max-w-5xl text-3xl font-light leading-[1.2] tracking-tight sm:text-5xl lg:text-6xl">
          Wellbeing isn't the absence of illness. It's your measurable capacity
          to feel, think and perform at your best, and to keep doing it for
          decades.
        </p>
        <p className="mt-8 max-w-2xl text-lg leading-8 text-black/65">
          For too long, wellbeing has been a shelf of promises. We're building
          the standard: a shared, measurable definition across four Pillars,
          and the technology to help every person move towards it.
        </p>
      </Reveal>
    </section>
  )
}
