import { ASSETS, articles, moreArticles } from "../data/content"
import PillButton from "./PillButton"

export default function Journal() {
  return (
    <>
      <section className="page-section py-16 lg:py-20">
        <div className="mb-10 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <h2 className="text-4xl sm:text-5xl lg:shrink-0">The Healf Source</h2>
          <p className="max-w-xl text-lg leading-7 lg:text-right">
            Journals are supplements for your MIND. Explore our range of
            expert-written articles to support your wellbeing journey.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {articles.map((article) => (
            <article key={article.title}>
              <div className="aspect-[2/3] overflow-hidden rounded-2xl bg-neutral-100">
                <img
                  src={`${ASSETS}/${article.image}`}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="mt-4 text-xl leading-7">{article.title}</h3>
              <a
                href="#"
                className="mt-3 inline-block border-b border-black text-sm"
              >
                Read More
                <span className="sr-only">: {article.title}</span>
              </a>
            </article>
          ))}
        </div>
        <div className="mt-10">
          <PillButton dark>Read The Source</PillButton>
        </div>
      </section>

      <section className="page-section py-14">
        <a href="#" className="text-sm font-semibold">
          More from The Healf Source →
        </a>
        <ul className="mt-6">
          {moreArticles.map((title) => (
            <li key={title}>
              <a
                href="#"
                className="block border-b border-neutral-200 py-4 text-3xl leading-tight hover:pl-2 sm:text-5xl sm:leading-tight"
              >
                {title}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
