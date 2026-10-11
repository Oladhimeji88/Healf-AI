import { ASSETS, curationSteps } from "../data/content"
import PillButton from "./PillButton"

export default function Curation() {
  return (
    <section className="page-section py-16">
      <div className="mb-8 grid gap-5 lg:grid-cols-2">
        <h2 className="section-title">Healf Curation Process™</h2>
        <p className="text-xl leading-8 sm:text-2xl lg:text-right">
          With our Healf Curation Process™, we do the work for you. Shop with
          confidence knowing every item has been tried, tested, and curated for
          you.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {curationSteps.map(({ image, number, title }) => (
          <article
            className="relative min-h-[560px] overflow-hidden rounded-lg sm:min-h-[672px]"
            key={title}
          >
            <img
              src={`${ASSETS}/${image}`}
              alt=""
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <span className="absolute left-3 top-3 text-2xl text-white">{number}</span>
            <h3 className="absolute bottom-3 left-3 text-3xl text-white sm:text-4xl">
              {title}
            </h3>
          </article>
        ))}
      </div>
      <div className="mt-5">
        <PillButton dark>Learn more</PillButton>
      </div>
    </section>
  )
}
