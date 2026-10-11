import Reveal from "./Reveal"

export default function FinalCta() {
  return (
    <section className="page-section pb-20">
      <Reveal>
        <div className="rounded-[32px] bg-black px-6 py-20 text-center text-white sm:px-12 lg:py-28">
          <p className="eyebrow !text-white/50">Healf</p>
          <h2 className="mx-auto mt-5 max-w-4xl text-5xl font-light leading-[1] tracking-tight sm:text-7xl">
            Define your wellbeing.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-white/65">
            Build your baseline in minutes, and let the platform do the rest.
          </p>
          <a href="#plan" className="btn btn-light mt-9">Build my baseline</a>
        </div>
      </Reveal>
    </section>
  )
}
