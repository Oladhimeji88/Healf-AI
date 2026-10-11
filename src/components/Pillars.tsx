import { ASSETS, pillars } from "../data/content"

export default function Pillars() {
  return (
    <section className="page-section py-16 lg:py-20">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {pillars.map(({ image, label }) => (
          <a
            href="#"
            className="group relative aspect-[4/5] overflow-hidden rounded-2xl"
            key={label}
          >
            <img
              src={`${ASSETS}/${image}`}
              alt=""
              className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
            />
            <span className="absolute left-3 top-3 text-2xl text-white sm:text-4xl">
              {label}
            </span>
          </a>
        ))}
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <h2 className="section-title">The Four Pillars™</h2>
        <p className="text-xl leading-8 sm:text-2xl sm:leading-9">
          Our mission is grounded in The Four Pillars™ — EAT, MOVE, MIND, SLEEP.
          With these as our foundation, we offer tools and rituals across each
          Pillar to empower your wellbeing.
        </p>
      </div>
    </section>
  )
}
