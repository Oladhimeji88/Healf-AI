import type { ReactNode } from "react"
import { ASSETS, formatPrice, type Product } from "../data/content"

export default function ProductRow({
  product,
  action,
}: {
  product: Product
  action: ReactNode
}) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <img
        src={`${ASSETS}/${product.image}`}
        alt=""
        loading="lazy"
        decoding="async"
        className="size-16 shrink-0 rounded-xl bg-canvas object-cover"
      />
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-bold tracking-wide text-black/50">
          {product.brand}
        </p>
        <p className="truncate text-sm">{product.name}</p>
        <p className="text-sm text-black/60">{formatPrice(product.price)}</p>
      </div>
      {action}
    </div>
  )
}
