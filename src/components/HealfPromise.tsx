import { ASSETS, promises, reviews } from "../data/content"

export default function HealfPromise() {
  return (
    <section className="page-section py-12">
      <div className="grid gap-6 lg:grid-cols-2">
        <h2 className="section-title">The Healf Promise</h2>
        <div>
          <p className="text-xl leading-8 sm:text-2xl sm:leading-9">
            Our experts assess every single product for purity, quality, and
            efficacy — if it isn’t the highest standard, we won’t stock it.
          </p>
          <ul className="mt-6 flex flex-col gap-4 text-base sm:flex-row sm:justify-between">
            {promises.map((promise) => (
              <li key={promise}>
                <span aria-hidden="true">✓ </span>
                {promise}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="relative mt-8 overflow-hidden rounded-2xl bg-neutral-900 px-4 py-16 text-white sm:px-10">
        <img
          src={`${ASSETS}/feaf8.png`}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-70 blur-md"
        />
        <div className="relative text-center">
          <div className="text-3xl font-bold">
            <span aria-hidden="true">★ </span>Trustpilot
          </div>
          <p className="mt-3 text-xl">
            Rated <b>4.8 (Excellent)</b> based on <b>15,200+ reviews</b> on
            Trustpilot
          </p>
        </div>
        <div className="relative mt-10 grid gap-4 md:grid-cols-3">
          {reviews.map((review) => (
            <article
              className="rounded-2xl bg-white/90 p-4 text-black"
              key={review.title}
            >
              <div className="text-[#00b67a]" role="img" aria-label="5 out of 5 stars">
                ★★★★★
              </div>
              <h3 className="mt-2 text-lg font-semibold">{review.title}</h3>
              <p className="mt-2 leading-6">{review.text}</p>
              <p className="mt-3 text-sm">— {review.author}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
