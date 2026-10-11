import { useCallback, useEffect, useRef, useState, type ReactNode } from "react"
import { ASSETS, formatPrice, type Product } from "../data/content"

type Props = {
  title: string
  subtitle?: ReactNode
  products: Product[]
  onAdd: (product: Product) => void
}

export default function ProductRail({ title, subtitle, products, onAdd }: Props) {
  const railRef = useRef<HTMLDivElement>(null)
  const [edges, setEdges] = useState({ start: true, end: false })

  const updateEdges = useCallback(() => {
    const el = railRef.current
    if (!el) return
    setEdges({
      start: el.scrollLeft <= 1,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 1,
    })
  }, [])

  useEffect(() => {
    updateEdges()
    window.addEventListener("resize", updateEdges)
    return () => window.removeEventListener("resize", updateEdges)
  }, [updateEdges])

  const scrollBy = (direction: 1 | -1) => {
    const el = railRef.current
    if (!el) return
    el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: "smooth" })
  }

  const headingId = `rail-${title.toLowerCase().replace(/\s+/g, "-")}`
  const noRail = edges.start && edges.end

  return (
    <section className="page-section" aria-labelledby={headingId}>
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <h2 id={headingId} className="section-title">
            {title}
          </h2>
          {subtitle && <p className="mt-2 text-base">{subtitle}</p>}
        </div>
        {!noRail && (
          <div className="hidden gap-2 sm:flex lg:hidden">
            <button
              type="button"
              className="rail-arrow disabled:opacity-30"
              aria-label={`Scroll ${title} left`}
              disabled={edges.start}
              onClick={() => scrollBy(-1)}
            >
              ‹
            </button>
            <button
              type="button"
              className="rail-arrow disabled:opacity-30"
              aria-label={`Scroll ${title} right`}
              disabled={edges.end}
              onClick={() => scrollBy(1)}
            >
              ›
            </button>
          </div>
        )}
      </div>
      <div className="product-rail" ref={railRef} onScroll={updateEdges}>
        {products.map((product) => (
          <article
            className="min-w-[78vw] snap-start sm:min-w-[310px] lg:min-w-0"
            key={product.id}
          >
            <div className="group relative aspect-[340/436] overflow-hidden rounded-lg bg-[#f5f5f5]">
              <img
                className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.025]"
                src={`${ASSETS}/${product.image}`}
                alt={product.name}
                loading="lazy"
              />
              <button
                type="button"
                onClick={() => onAdd(product)}
                className="absolute bottom-3 right-3 grid size-8 place-items-center rounded-full bg-white text-xl transition hover:bg-black hover:text-white"
                aria-label={`Add ${product.name} to plan`}
              >
                +
              </button>
            </div>
            <p className="mt-3 text-xs font-bold tracking-wide opacity-60">
              {product.brand}
            </p>
            <h3 className="mt-2 text-base leading-6">{product.name}</h3>
            <p className="mt-2">
              {formatPrice(product.price)}
              {product.oldPrice && (
                <span className="ml-2 text-neutral-500 line-through">
                  {formatPrice(product.oldPrice)}
                </span>
              )}
            </p>
            {product.badges && (
              <ul className="mt-3 flex flex-wrap gap-2">
                {product.badges.map((badge) => (
                  <li
                    className="rounded-full bg-[#f1f1f1] px-2.5 py-1 text-[11px]"
                    key={badge}
                  >
                    {badge}
                  </li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}
