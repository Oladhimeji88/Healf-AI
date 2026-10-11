import { collections } from "../data/content"

export default function Collections() {
  return (
    <section className="page-section py-14">
      <a href="#" className="text-sm font-semibold">
        Shop popular collections →
      </a>
      <ul className="mt-5 flex flex-wrap gap-x-3 text-3xl leading-[1.35] sm:text-4xl">
        {collections.map((item, index) => (
          <li key={item}>
            <a href="#" className={index === 0 ? "underline" : "hover:underline"}>
              {item}
            </a>
            {index < collections.length - 1 && ","}
          </li>
        ))}
      </ul>
    </section>
  )
}
